'use strict'

/**
 * dsh-process — 执行驱动（v0.2）。
 *
 * 发起运行 = 冻结工艺快照 + 建台账；驱动循环逐环节开全新 dsh 会话（可绑工作区/
 * 指定模型），环节完成后代码层跑门禁（ai_criteria_review 裁判会话对照 min_score），
 * 不过按 on_gate_fail 流转（break → awaiting 等人裁决；<id>/goto:<id> 回跳），
 * max_rework 由代码计数封顶，max_step_executions 全程步数上限。
 * 人可暂停/继续/停止/裁决 break（重试本环节=清零返工、跳过本环节、中止运行）。
 *
 * 会话创建沿 dsh-tasks / dsh-plugin-kit 的成熟路径（agents.create + standard
 * preset + whenIdle + 事件泵收尾部输出），裁判用独立短会话。
 */

const { randomUUID } = require('node:crypto')
const { makeAttempt, parseFlow, indexLinks, nextLinkAfter, firstLinkId, runSummary } = require('./runs.js')

const OUTPUT_TAIL_CAP = 8 * 1024
const PUMP_MS = 500
const TOUCH_THROTTLE_MS = 1500
const JUDGE_TIMEOUT_MS = 180000

/** 门禁评审输出 → {score, reason}；解析失败按 0 分（fail-safe 走返工/裁决路径）。 */
function parseJudgeOutput(text) {
  const s = String(text || '')
  const fenced = s.match(/```(?:json)?\s*\n([\s\S]*?)```/)
  const candidate = fenced ? fenced[1] : s
  const brace = candidate.lastIndexOf('{')
  if (brace >= 0) {
    const end = candidate.indexOf('}', brace)
    if (end > brace) {
      try {
        const j = JSON.parse(candidate.slice(brace, end + 1))
        const score = Math.max(0, Math.min(100, Math.round(Number(j.score))))
        if (Number.isFinite(score)) return { score, reason: String(j.reason || '').slice(0, 300) }
      } catch { /* 落到默认 */ }
    }
  }
  return { score: 0, reason: '评审输出无法解析，按不通过处理' }
}

class ExecutionService {
  /**
   * @param {object} deps
   * @param {object} deps.ctx 宿主上下文（agents / agentDefaultModel / workspaceRegistry）
   * @param {import('./runs.js').RunStore} deps.runs
   * @param {{get: Function}} deps.settings
   * @param {object} [deps.logger]
   */
  constructor({ ctx, runs, settings, logger }) {
    this.ctx = ctx
    this.runs = runs
    this.settings = settings
    this.logger = logger || console
    this.active = new Map() // runId → driveLoop promise
    const parsed = Number.parseInt(process.env.DSH_PROCESS_MAX_CONCURRENT ?? '', 10)
    this.maxConcurrent = Number.isInteger(parsed) && parsed >= 1 ? parsed : 2
  }

  /** 容量允许时从队列拉起运行；在 run 收尾后也要再 tick 一次。 */
  tick() {
    if (!this.ctx || !this.ctx.agents) return
    const queued = this.runs.byStatus('queued')
    for (const run of queued) {
      if (this.active.size >= this.maxConcurrent) break
      if (this.active.has(run.id)) continue
      run.status = 'running'
      run.startedAt = run.startedAt || Date.now()
      this.runs.touch(run)
      const p = this.driveLoop(run).catch((e) => {
        this.logger.warn && this.logger.warn(`dsh-process: run ${run.id} crashed: ${e && e.stack || e}`)
        if (run.status === 'running') this.failRun(run, 'crashed', String(e && e.message || e))
      }).finally(() => { this.active.delete(run.id); this.tick() })
      this.active.set(run.id, p)
    }
  }

  // ── 运行循环 ──────────────────────────────────────────────────────────

  async driveLoop(run) {
    const snap = run.snapshot
    let cursor = run.current && run.current.linkId && indexLinks(snap).map.has(run.current.linkId)
      ? run.current.linkId
      : firstLinkId(snap)
    if (!cursor) { this.finishRun(run, 'done', '工艺没有环节'); return }
    run.current = { phaseId: undefined, linkId: cursor, attempt: (run.rework[cursor] || 0) + 1 }
    this.runs.touch(run)

    for (;;) {
      if (run.status !== 'running') { this.settleTrail(run); return }
      const { map } = indexLinks(snap)
      const entry = map.get(cursor)
      if (!entry) { this.failRun(run, 'bad_flow', `环节 "${cursor}" 在快照中不存在`); return }

      const maxRework = Number.isInteger(entry.link.max_rework) && entry.link.max_rework >= 0 ? entry.link.max_rework : 3
      const rework = run.rework[cursor] || 0
      if (rework > maxRework) {
        this.awaitBreak(run, cursor, { name: '返工上限', score: null, minScore: null, reason: '触发' },
          `环节 "${cursor}" 超过 max_rework=${maxRework}`)
        return
      }
      if (run.limits.maxStepExecutions !== null && run.limits.maxStepExecutions !== undefined
        && run.stepCount >= run.limits.maxStepExecutions) {
        this.failRun(run, 'capped_step', `达到步数上限 max_step_executions=${run.limits.maxStepExecutions}`)
        return
      }

      run.current = { phaseId: entry.phase.id, linkId: cursor, attempt: rework + 1 }
      const attempt = makeAttempt(entry.phase.id || entry.phase.name, cursor, rework + 1)
      run.trail.push(attempt)
      run.stepCount += 1
      this.runs.touch(run)

      try {
        const output = await this.runLinkSession(run, entry, attempt)
        // ── 门禁（全部通过才算过；取最严一分）──
        const gates = Array.isArray(entry.link.gates) ? entry.link.gates : []
        let failedGate = null
        for (const gate of gates) {
          if (!gate || typeof gate !== 'object') continue
          const judge = await this.judgeGate(run, entry, gate, output)
          if (!attempt.gate || (judge.score < (attempt.gate.score ?? 101))) attempt.gate = { name: gate.name || gate.type || 'gate', score: judge.score, minScore: gate.min_score ?? 0, reason: judge.reason }
          const min = typeof gate.min_score === 'number' ? gate.min_score : 0
          if (judge.score < min) { failedGate = { gate: { name: gate.name || gate.type || 'gate', score: judge.score, minScore: min, reason: judge.reason }, linkId: cursor }; break }
        }
        if (failedGate) {
          attempt.status = 'gate_failed'
          attempt.gate = failedGate.gate
          run.rework[cursor] = (run.rework[cursor] || 0) + 1
          const route = parseFlow(entry.link.on_gate_fail) || { jump: cursor }
          if (route === 'break') {
            this.awaitBreak(run, cursor, failedGate.gate, 'on_gate_fail: break')
            return
          }
          cursor = route === 'next' ? (nextLinkAfter(snap, cursor) || cursor) : route.jump
          run.current = { phaseId: undefined, linkId: cursor, attempt: (run.rework[cursor] || 0) + 1 }
          this.runs.touch(run)
          continue
        }
        attempt.status = 'done'
        this.runs.touch(run)

        // ── 成功流转 ──
        const route = parseFlow(entry.link.on_success) || 'next'
        if (route === 'end') { this.finishRun(run, 'done'); return }
        if (route === 'break') { this.awaitBreak(run, cursor, null, 'on_success: break'); return }
        cursor = route === 'next' ? nextLinkAfter(snap, cursor) : route.jump
        if (!cursor || !map.has(cursor)) {
          if (route === 'next') { this.finishRun(run, 'done'); return }
          this.failRun(run, 'bad_flow', `流转目标 "${route.jump}" 不存在`)
          return
        }
        run.current = { phaseId: undefined, linkId: cursor, attempt: (run.rework[cursor] || 0) + 1 }
        this.runs.touch(run)
      } catch (error) {
        attempt.status = 'failed'
        attempt.error = String(error && error.message || error)
        this.settleTrail(run)
        this.failRun(run, 'link_failed', `环节 "${cursor}" 执行失败：${attempt.error}`)
        return
      }
    }
  }

  settleTrail(run) {
    for (const t of run.trail) if (t.status === 'running') { t.status = 'abandoned'; t.finishedAt = Date.now() }
  }

  finishRun(run, status, note) {
    this.settleTrail(run)
    run.status = status
    run.finishedAt = Date.now()
    run.current = null
    if (note) run.error = note
    this.runs.touch(run)
  }

  failRun(run, code, message) { this.finishRun(run, 'failed', message) }

  awaitBreak(run, linkId, gate, reason) {
    this.settleTrail(run)
    run.status = 'awaiting'
    run.pendingBreak = { linkId, gate, reason, at: Date.now() }
    this.runs.touch(run)
  }

  // ── 会话驱动 ──────────────────────────────────────────────────────────

  buildLinkPrompt(run, entry) {
    const { link, phase } = entry
    const artifacts = Array.isArray(link.expected_artifacts) && link.expected_artifacts.length > 0
      ? link.expected_artifacts.map((a) => `- ${a && a.name || 'artifact'}${a && a.path ? `（${a.path}）` : ''}`).join('\n')
      : '（本环节未声明产物）'
    return [
      `你正在执行工艺「${run.displayName || run.processName}」的一个环节，只做本环节的事，不要越界到其他环节。`,
      `环节：${phase && phase.name ? `${phase.name} / ` : ''}${link.name || link.id}（id=${link.id}）`,
      link.expert_name || link.expert ? `建议以专家「${link.expert_name || link.expert}」的标准与视角执行。` : '',
      Array.isArray(link.skills) && link.skills.length ? `可用技能：${link.skills.join(', ')}` : '',
      '',
      '【环节指令】',
      link.prompt || '（无指令，请根据环节名合理执行）',
      '',
      '【期望产物】',
      artifacts,
      link.acceptance_criteria ? `【环节验收标准】\n${link.acceptance_criteria}` : '',
      '',
      '完成后：输出一份简短执行报告——做了什么、产出了什么、在哪（文件路径）、自检结论。这是给门禁评审看的。',
    ].filter((x) => x !== '').join('\n')
  }

  async createSession({ run, title }) {
    const selection = run.model
      ? { provider: run.provider, model: run.model }
      : this.ctx.agentDefaultModel.currentSelection()
    const sessionId = 'session-' + randomUUID()
    const workspace = run.workspaceId && this.ctx.workspaceRegistry
      ? this.ctx.workspaceRegistry.get(run.workspaceId)
      : undefined
    if (run.workspaceId && !workspace) throw new Error(`workspace '${run.workspaceId}' not found`)
    const cwd = workspace ? workspace.path : this.settings.get().userRoot
    const { agent } = await this.ctx.agents.create({
      sessionId,
      meta: { cwd, agentPreset: 'standard' },
      agentOptions: { provider: selection.provider, model: selection.model },
    })
    if (workspace && typeof workspace.attachSession === 'function') {
      try { await workspace.attachSession(sessionId) } catch { /* 附加失败不影响执行 */ }
    }
    try {
      agent.session.append('session/title', { title, messageSeqs: [], source: { kind: 'user' } })
    } catch { /* 标题失败非致命 */ }
    return { agent, sessionId }
  }

  /** 执行一个环节：开会话 → followup → 事件泵收尾部 → whenIdle → 汇总报告文本。 */
  async runLinkSession(run, entry, attempt) {
    const prompt = this.buildLinkPrompt(run, entry)
    const { agent, sessionId } = await this.createSession({
      run,
      title: `${run.displayName || run.processName} · ${entry.link.name || entry.link.id}`,
    })
    attempt.sessionId = sessionId
    this.runs.touch(run)

    let tail = ''
    let lastTouch = 0
    const firstSeq = agent.session.seq
    const seen = new Set()
    const liveLine = (text) => { tail = (tail + text).slice(-OUTPUT_TAIL_CAP) }
    const eventList = () => { try { return Array.isArray(agent.session.events) ? agent.session.events : [] } catch { return [] } }
    const pump = () => {
      let changed = false
      for (const ev of eventList()) {
        if (ev.seq < firstSeq || seen.has(ev.seq)) continue
        seen.add(ev.seq)
        const d = ev.data || {}
        if (ev.type === 'assistant/chunk' && d.chunk && typeof d.chunk.text === 'string' && (d.chunk.type === 'text-delta' || d.chunk.type === 'text')) { liveLine(d.chunk.text); changed = true }
        else if (ev.type === 'tool/call') { liveLine(`\n[tool] ${String(d.name || '')} `); changed = true }
      }
      if (changed && Date.now() - lastTouch > TOUCH_THROTTLE_MS) { lastTouch = Date.now(); attempt.outputTail = tail; this.runs.touch(run) }
    }
    const timer = setInterval(pump, PUMP_MS)
    if (typeof timer.unref === 'function') timer.unref()
    try {
      agent.followup({ content: [{ type: 'text', text: prompt }], source: { kind: 'plugin', plugin: 'dsh-process' } })
      await agent.whenIdle()
    } finally {
      clearInterval(timer)
      pump()
    }
    let output = tail.trim()
    if (output === '') {
      // 兜底：从最终 assistant 消息提取可见文本（kit 同款）
      const list = eventList()
      for (let i = list.length - 1; i >= 0; i--) {
        const ev = list[i]
        const msg = ev && ev.type === 'assistant/message' && ev.data ? ev.data.message : undefined
        if (msg && msg.role === 'assistant' && Array.isArray(msg.content)) {
          const text = msg.content.filter((b) => b && (b.type === 'text' || b.type === undefined) && typeof b.text === 'string').map((b) => b.text).join('')
          if (text.trim() !== '') { output = text; break }
        }
      }
    }
    try { if (this.ctx.sessions && typeof this.ctx.sessions.flush === 'function') await this.ctx.sessions.flush(agent.session) } catch { /* 刷盘失败不致命 */ }
    attempt.outputTail = output.slice(-OUTPUT_TAIL_CAP)
    return output
  }

  /** 门禁裁判：独立短会话按 ai_criteria_review 打分。 */
  async judgeGate(run, entry, gate, output) {
    const type = gate.type || 'ai_criteria_review'
    const prompt = [
      '你是工艺门禁评审员。对下面这次环节执行打分，只输出一个 JSON 对象：{"score": 0-100整数, "reason": "一句话理由"}。',
      `门禁：${gate.name || '(未命名)'}（评审方式 ${type}）；通过分数线：${typeof gate.min_score === 'number' ? gate.min_score : 0}。`,
      '',
      `【环节指令】\n${entry.link.prompt || '(空)'}`,
      `【执行报告】\n${output || '(无输出)'}`,
    ].join('\n')
    try {
      const { agent } = await this.createSession({ run, title: `门禁评审 · ${gate.name || gate.type}` })
      const firstSeq = agent.session.seq
      const eventList = () => { try { return Array.isArray(agent.session.events) ? agent.session.events : [] } catch { return [] } }
      agent.followup({ content: [{ type: 'text', text: prompt }], source: { kind: 'plugin', plugin: 'dsh-process' } })
      const idle = agent.whenIdle()
      const timer = new Promise((resolve) => setTimeout(() => resolve('timeout'), JUDGE_TIMEOUT_MS))
      const outcome = await Promise.race([idle.then(() => 'done'), timer])
      if (outcome !== 'done') return { score: 0, reason: '评审超时，按不通过处理' }
      const list = eventList()
      let text = ''
      for (let i = list.length - 1; i >= 0; i--) {
        const ev = list[i]
        if (ev.seq < firstSeq) continue
        const msg = ev && ev.type === 'assistant/message' && ev.data ? ev.data.message : undefined
        if (msg && msg.role === 'assistant' && Array.isArray(msg.content)) {
          text = msg.content.filter((b) => b && (b.type === 'text' || b.type === undefined) && typeof b.text === 'string').map((b) => b.text).join('')
          if (text.trim() !== '') break
        }
      }
      return parseJudgeOutput(text)
    } catch (error) {
      return { score: 0, reason: `评审会话失败：${String(error && error.message || error)}` }
    }
  }

  // ── 人的操作 ──────────────────────────────────────────────────────────

  actionPause(id) {
    const run = this.runs.get(id)
    if (!run) throw new Error(`Error: not_found: ${id}`)
    if (run.status !== 'running' && run.status !== 'queued') throw new Error('Error: invalid_transition: 只能暂停运行中/排队中的运行')
    run.status = 'paused'
    this.runs.touch(run)
    return run
  }

  actionResume(id) {
    const run = this.runs.get(id)
    if (!run) throw new Error(`Error: not_found: ${id}`)
    if (run.status !== 'paused') throw new Error('Error: invalid_transition: 只能继续已暂停的运行')
    run.status = 'queued'
    run.error = undefined
    this.runs.touch(run)
    this.tick()
    return run
  }

  actionStop(id) {
    const run = this.runs.get(id)
    if (!run) throw new Error(`Error: not_found: ${id}`)
    if (['done', 'stopped', 'failed'].includes(run.status)) throw new Error('Error: invalid_transition: 运行已结束')
    this.finishRun(run, 'stopped')
    this.tick()
    return run
  }

  /** break 裁决：retry（清零返工重跑本环节）/ skip（视为通过，按 on_success 走）/ stop。 */
  actionResolveBreak(id, decision) {
    const run = this.runs.get(id)
    if (!run) throw new Error(`Error: not_found: ${id}`)
    if (run.status !== 'awaiting' || !run.pendingBreak) throw new Error('Error: invalid_transition: 运行不在等待裁决状态')
    const linkId = run.pendingBreak.linkId
    if (decision === 'stop') { run.pendingBreak = null; this.finishRun(run, 'stopped'); this.tick(); return run }
    run.pendingBreak = null
    if (decision === 'retry') {
      run.rework[linkId] = 0
      run.current = { phaseId: undefined, linkId, attempt: 1 }
    } else if (decision === 'skip') {
      // 视为通过：补一条 skipped 记录，按 on_success 流转
      const { map } = indexLinks(run.snapshot)
      const entry = map.get(linkId)
      run.trail.push(makeAttempt(entry ? entry.phase.id : undefined, linkId, (run.rework[linkId] || 0) + 1, { status: 'skipped', finishedAt: Date.now() }))
      const route = parseFlow(entry && entry.link.on_success) || 'next'
      const next = route === 'next' ? nextLinkAfter(run.snapshot, linkId) : route === 'end' ? null : route.jump
      if (!next) { this.finishRun(run, 'done'); this.tick(); return run }
      run.current = { phaseId: undefined, linkId: next, attempt: (run.rework[next] || 0) + 1 }
    } else {
      throw new Error('Error: invalid_input: decision 必须是 retry | skip | stop')
    }
    run.status = 'queued'
    this.runs.touch(run)
    this.tick()
    return run
  }

  /** 跳过某个环节（仅暂停/等待裁决/失败态可用）；retryLink 重跑某环节。 */
  actionSkipLink(id, linkId) {
    const run = this.runs.get(id)
    if (!run) throw new Error(`Error: not_found: ${id}`)
    if (run.status === 'running') throw new Error('Error: invalid_transition: 运行中请先暂停')
    const { map } = indexLinks(run.snapshot)
    const entry = map.get(linkId)
    if (!entry) throw new Error('Error: invalid_input: 环节不存在')
    run.trail.push(makeAttempt(entry.phase.id, linkId, (run.rework[linkId] || 0) + 1, { status: 'skipped', finishedAt: Date.now() }))
    const route = parseFlow(entry.link.on_success) || 'next'
    const next = route === 'next' ? nextLinkAfter(run.snapshot, linkId) : route === 'end' ? null : route.jump
    if (!next) { this.finishRun(run, 'done'); this.tick(); return run }
    run.current = { phaseId: undefined, linkId: next, attempt: (run.rework[next] || 0) + 1 }
    if (run.status !== 'queued') run.status = 'queued'
    this.runs.touch(run)
    this.tick()
    return run
  }

  actionRetryLink(id, linkId) {
    const run = this.runs.get(id)
    if (!run) throw new Error(`Error: not_found: ${id}`)
    if (run.status === 'running') throw new Error('Error: invalid_transition: 运行中请先暂停')
    const { map } = indexLinks(run.snapshot)
    if (!map.has(linkId)) throw new Error('Error: invalid_input: 环节不存在')
    run.rework[linkId] = 0
    run.current = { phaseId: undefined, linkId, attempt: 1 }
    run.status = 'queued'
    run.error = undefined
    this.runs.touch(run)
    this.tick()
    return run
  }
}

module.exports = { ExecutionService, parseJudgeOutput, runSummary }
