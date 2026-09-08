'use strict'

/**
 * dsh-process — 运行台账（v0.2 执行驱动）。
 *
 * run = 一次「按工艺驱动执行」：发起时冻结工艺快照（YAML），宿主逐环节开全新
 * dsh 会话推进，门禁/返工/流转在代码层强制。台账落 DSH_HOME/dsh-process/runs.json
 * （原子写 + 防抖），revision 变化走既有 SSE 广播。
 *
 * 纯函数部分（流转解析 / 环节查找 / 步数上限）单独导出，供单测。
 */

const fsP = require('node:fs/promises')
const path = require('node:path')
const { randomUUID } = require('node:crypto')

const FLOW_KEYWORDS = new Set(['next', 'end', 'break'])
const MAX_RUNS_KEPT = 100
const PERSIST_DEBOUNCE_MS = 300

/** 解析流转值：'next' | 'end' | 'break' | { jump: linkId }。非法/缺省返回 null（调用方决定语义）。 */
function parseFlow(value) {
  if (value === undefined || value === null || value === '') return null
  const v = String(value).trim()
  if (FLOW_KEYWORDS.has(v)) return v
  if (v.startsWith('goto:')) return { jump: v.slice(5).trim() }
  return { jump: v }
}

/** 工艺快照 → 全局环节查找表 { linkId → { phaseIndex, linkIndex, phase, link } }（保持声明序）。 */
function indexLinks(snapshot) {
  const phases = snapshot && Array.isArray(snapshot.phases) ? snapshot.phases : []
  const map = new Map()
  phases.forEach((ph, phaseIndex) => {
    const links = ph && Array.isArray(ph.links) ? ph.links : []
    links.forEach((link, linkIndex) => {
      if (link && link.id) map.set(link.id, { phaseIndex, linkIndex, phase: ph, link })
    })
  })
  return { phases, map }
}

/** on_success='next' 的下一个环节：同阶段下一个，否则下一阶段第一个；没有 → null（运行结束）。 */
function nextLinkAfter(snapshot, linkId) {
  const { phases, map } = indexLinks(snapshot)
  const cur = map.get(linkId)
  if (!cur) return null
  const phase = phases[cur.phaseIndex]
  const links = Array.isArray(phase.links) ? phase.links : []
  if (cur.linkIndex + 1 < links.length) return links[cur.linkIndex + 1].id
  for (let pi = cur.phaseIndex + 1; pi < phases.length; pi++) {
    const nextLinks = Array.isArray(phases[pi].links) ? phases[pi].links : []
    if (nextLinks.length > 0 && nextLinks[0].id) return nextLinks[0].id
  }
  return null
}

/** 工艺快照的第一个环节 id；没有环节 → null。 */
function firstLinkId(snapshot) {
  const { phases } = indexLinks(snapshot)
  for (const ph of phases) {
    const links = Array.isArray(ph.links) ? ph.links : []
    if (links.length > 0 && links[0].id) return links[0].id
  }
  return null
}

/** 环节执行记录（trail 条目）。 */
function makeAttempt(phaseId, linkId, attempt, extra) {
  return Object.assign({
    phaseId, linkId, attempt,
    status: 'running',            // running | done | gate_failed | skipped | failed | abandoned
    sessionId: undefined,
    outputTail: '',
    gate: undefined,              // { name, score, minScore, passed, reason }（最严门）
    error: undefined,
    startedAt: Date.now(),
    finishedAt: undefined,
  }, extra || {})
}

/** 摘要（列表行）。 */
function runSummary(run) {
  const done = run.trail.filter((t) => t.status === 'done').length
  const total = new Set([...indexLinks(run.snapshot).map.keys()]).size
  return {
    id: run.id, processId: run.processId, processName: run.processName, displayName: run.displayName,
    status: run.status, doneLinks: done, totalLinks: total, stepCount: run.stepCount,
    current: run.current ? { linkId: run.current.linkId, attempt: run.current.attempt } : null,
    pendingBreak: !!run.pendingBreak,
    workspaceId: run.workspaceId, error: run.error,
    createdAt: run.createdAt, updatedAt: run.updatedAt, finishedAt: run.finishedAt,
  }
}

/** 运行台账。 */
class RunStore {
  /**
   * @param {() => string} file 台账文件路径
   * @param {{info?: Function, warn?: Function}} logger
   */
  constructor(file, logger) {
    this.file = file
    this.logger = logger || console
    this.revision = 0
    this.runs = new Map()      // id → run
    this.listeners = new Set()
    this.loaded = false
    this.persistTimer = null
    this.persistChain = Promise.resolve()
  }

  subscribe(fn) { this.listeners.add(fn); return () => { this.listeners.delete(fn) } }
  emit() { for (const fn of this.listeners) { try { fn(this.revision) } catch {} } }
  touch(run) { run.updatedAt = Date.now(); this.revision += 1; this.schedulePersist(); this.emit() }

  async load() {
    let data
    try { data = JSON.parse(await fsP.readFile(this.file, 'utf8')) } catch { data = null }
    this.runs = new Map()
    if (data && Array.isArray(data.runs)) {
      for (const run of data.runs) this.runs.set(run.id, run)
    }
    // 宿主重启恢复：running/awaiting 的在飞状态不可信 → paused
    for (const run of this.runs.values()) {
      if (run.status === 'running') {
        run.status = 'paused'
        run.error = '宿主重启，运行已中断（可继续）'
        if (run.current) {
          const cur = [...run.trail].reverse().find((t) => t.status === 'running')
          if (cur) cur.status = 'abandoned'
        }
      }
    }
    this.loaded = true
    this.revision += 1
    this.emit()
  }

  schedulePersist() {
    if (this.persistTimer) return
    this.persistTimer = setTimeout(() => {
      this.persistTimer = null
      this.persistChain = this.persistChain.then(() => this.persistNow()).catch((e) => {
        this.logger.warn && this.logger.warn(`dsh-process: runs persist: ${e && e.message}`)
      })
    }, PERSIST_DEBOUNCE_MS)
    if (typeof this.persistTimer.unref === 'function') this.persistTimer.unref()
  }

  async persistNow() {
    const runs = [...this.runs.values()]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, MAX_RUNS_KEPT)
    const keep = new Set(runs.map((r) => r.id))
    for (const id of [...this.runs.keys()]) if (!keep.has(id)) this.runs.delete(id)
    await fsP.mkdir(path.dirname(this.file), { recursive: true })
    const tmp = `${this.file}.tmp-${process.pid}-${Math.random().toString(36).slice(2, 8)}`
    await fsP.writeFile(tmp, JSON.stringify({ version: 1, runs }, null, 1), 'utf8')
    await fsP.rename(tmp, this.file)
  }

  create({ processId, processName, displayName, snapshotYaml, snapshot, workspaceId, model, provider, userInput }) {
    const run = {
      id: 'run-' + randomUUID().slice(0, 8),
      processId, processName, displayName,
      snapshotYaml, snapshot,
      workspaceId: workspaceId || undefined,
      userInput: typeof userInput === 'string' && userInput.trim() !== '' ? userInput.trim().slice(0, 4000) : undefined,
      model: model || undefined, provider: provider || undefined,
      status: 'queued',            // queued|running|paused|awaiting|done|stopped|failed
      trail: [],
      stepCount: 0,
      rework: {},                  // linkId → gate-fail 重试次数
      current: null,               // { phaseId, linkId, attempt }
      pendingBreak: null,          // { linkId, gate, attempt, reason }
      limits: {
        maxStepExecutions: snapshot && snapshot.limits && Number.isInteger(snapshot.limits.max_step_executions)
          ? snapshot.limits.max_step_executions : null,
      },
      error: undefined,
      createdAt: Date.now(), updatedAt: Date.now(), finishedAt: undefined,
    }
    this.runs.set(run.id, run)
    this.touch(run)
    return run
  }

  get(id) { return this.runs.get(String(id)) }
  list() { return [...this.runs.values()].sort((a, b) => b.createdAt - a.createdAt) }
  byStatus(...statuses) { return this.list().filter((r) => statuses.includes(r.status)) }

  /** 面向 runner 的运行详情（含完整 trail）。 */
  detail(id) {
    const run = this.get(id)
    if (!run) return undefined
    return { ...run, summary: runSummary(run) }
  }
}

module.exports = {
  RunStore, runSummary, makeAttempt, parseFlow, indexLinks, nextLinkAfter, firstLinkId,
  FLOW_KEYWORDS, MAX_RUNS_KEPT,
}
