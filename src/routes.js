'use strict'

/**
 * dsh-process — HTTP + SSE 路由（host 侧）。前缀 /dsh-process。
 *
 * GET  /state                 列表快照 {revision, roots, processes[]}
 * GET  /item?id=              单条 {meta, yaml, parsed, diagnostics, hash}
 * POST /validate {yaml}       {errors[], warnings[], meta}
 * POST /save {mode,...}       create / update(baseHash 乐观锁) / copy → 200 | 400 invalid | 409 conflict/exists | 403 readonly
 * POST /rename {id,newName}
 * POST /delete {id}           移入 .trash
 * POST /import {files,overwrite}
 * GET  /export?id= | ?all=1 | ?source=user   单 yaml / zip
 * GET  /skeleton?name=        新建空白骨架 yaml
 * GET|POST /settings          根目录与开关
 * GET  /models                模型下拉目录 {default, providers[]}（llm 服务缺席降级空）
 * GET  /skills                dsh 技能目录 {skills[]}（skills 服务缺席降级空）
 * GET  /events                SSE：hello{revision} / change{revision} / 25s 心跳
 * POST /ai-generate {prompt}  → {jobId}（kit 宿主执行器；服务缺席 503）
 * GET  /jobs?id=              {status, output, code, sessionId}
 */

const { StoreError, safeName } = require('./store.js')
const { runSummary } = require('./runs.js')
const { skeletonYaml } = require('./validate.js')
const { buildZip } = require('./zip.js')
const { randomUUID } = require('node:crypto')

const PREFIX = '/dsh-process'
const MAX_BODY_BYTES = 4 * 1024 * 1024
const SSE_HEARTBEAT_MS = 25_000

const STATUS_BY_CODE = {
  invalid: 400, invalid_input: 400, invalid_name: 400, invalid_path: 400, invalid_id: 400,
  not_found: 404, conflict: 409, exists: 409, readonly: 403, unavailable: 503,
}

function sendJson(res, status, payload) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
  res.end(JSON.stringify(payload))
}

function sendError(res, error) {
  const code = error && error.code && STATUS_BY_CODE[error.code] ? error.code : (error instanceof StoreError ? error.code : 'internal')
  const status = STATUS_BY_CODE[code] || 500
  const body = { error: String(error && error.message || error), code }
  if (error && error.diagnostics) body.diagnostics = error.diagnostics
  if (error && error.currentHash) body.currentHash = error.currentHash
  sendJson(res, status, body)
}

async function readJsonBody(req) {
  const chunks = []
  let received = 0
  for await (const chunk of req) {
    received += chunk.length
    if (received > MAX_BODY_BYTES) throw new StoreError('invalid_input', '请求体过大')
    chunks.push(chunk)
  }
  if (chunks.length === 0) return {}
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')) } catch { throw new StoreError('invalid_input', '请求体不是合法 JSON') }
}

function contentDisposition(filename) {
  const ascii = filename.replace(/[^\x20-\x7e]/g, '_').replace(/"/g, '')
  return `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(filename)}`
}

/**
 * @param ctx  host 上下文（需 webServer）
 * @param deps { store, settings: {get(), set(patch)}, jobs: Map, runAi: (prompt) => job | null, logger }
 * @returns disposer
 */
function registerRoutes(ctx, deps) {
  const { store, settings, jobs, runs, logger } = deps
  const clients = new Set()

  const broadcast = (event, data) => {
    const frame = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
    for (const res of clients) { try { res.write(frame) } catch { clients.delete(res) } }
  }
  const sendChange = () => broadcast('change', { revision: store.revision, runsRevision: runs.revision })
  const unsubscribe = store.subscribe(sendChange)
  const unsubscribeRuns = runs.subscribe(sendChange)
  const heartbeat = setInterval(() => {
    for (const res of clients) { try { res.write(': ping\n\n') } catch { clients.delete(res) } }
  }, SSE_HEARTBEAT_MS)
  if (typeof heartbeat.unref === 'function') heartbeat.unref()

  const sse = (req, res) => {
    res.writeHead(200, {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-store, no-transform',
      connection: 'keep-alive',
      'x-accel-buffering': 'no',
    })
    res.write(`event: hello\ndata: ${JSON.stringify({ revision: store.revision })}\n\n`)
    clients.add(res)
    req.on('close', () => { clients.delete(res) })
  }

  const handler = async (req, res) => {
    const url = new URL(req.url || '/', 'http://dsh.local')
    const idx = url.pathname.indexOf(PREFIX)
    const sub = (idx >= 0 ? url.pathname.slice(idx + PREFIX.length) : url.pathname).replace(/\/+$/, '') || '/'
    const method = req.method || 'GET'
    try {
      if (sub === '/events' && method === 'GET') return sse(req, res)
      if (sub === '/state' && method === 'GET') {
        if (store.revision === 0) await store.load()
        return sendJson(res, 200, store.snapshot())
      }
      if (sub === '/item' && method === 'GET') {
        const id = url.searchParams.get('id')
        if (!id) throw new StoreError('invalid_input', '缺少 id')
        return sendJson(res, 200, await store.get(id))
      }
      if (sub === '/validate' && method === 'POST') {
        const body = await readJsonBody(req)
        return sendJson(res, 200, await store.validate(body.yaml))
      }
      if (sub === '/save' && method === 'POST') {
        const body = await readJsonBody(req)
        return sendJson(res, 200, await store.save(body))
      }
      if (sub === '/rename' && method === 'POST') {
        const body = await readJsonBody(req)
        return sendJson(res, 200, await store.rename(body.id, body.newName))
      }
      if (sub === '/delete' && method === 'POST') {
        const body = await readJsonBody(req)
        return sendJson(res, 200, await store.remove(body.id))
      }
      if (sub === '/import' && method === 'POST') {
        const body = await readJsonBody(req)
        return sendJson(res, 200, { results: await store.importFiles(body.files, { overwrite: body.overwrite === true }) })
      }
      if (sub === '/skeleton' && method === 'GET') {
        const name = safeName(url.searchParams.get('name') || 'new-process')
        return sendJson(res, 200, { yaml: skeletonYaml({ name, displayName: url.searchParams.get('displayName') || name, guid: randomUUID() }) })
      }
      if (sub === '/export' && method === 'GET') {
        const id = url.searchParams.get('id')
        if (id) {
          const item = await store.get(id)
          res.writeHead(200, { 'content-type': 'application/yaml; charset=utf-8', 'content-disposition': contentDisposition(`${item.meta.fileName}.yaml`), 'cache-control': 'no-store' })
          return res.end(item.yaml)
        }
        const source = url.searchParams.get('source')
        const entries = await store.exportEntries(source ? (e) => e.source === source : undefined)
        if (entries.length === 0) throw new StoreError('not_found', '没有可导出的工艺')
        const zip = buildZip(entries)
        const stamp = new Date().toISOString().slice(0, 10)
        res.writeHead(200, { 'content-type': 'application/zip', 'content-disposition': contentDisposition(`dsh-process-${source || 'all'}-${stamp}.zip`), 'content-length': zip.length, 'cache-control': 'no-store' })
        return res.end(zip)
      }
      if (sub === '/settings' && method === 'GET') {
        return sendJson(res, 200, { settings: settings.get(), effectiveRoots: store.roots() })
      }
      if (sub === '/settings' && method === 'POST') {
        const body = await readJsonBody(req)
        const next = await settings.set(body)
        await store.rerootAndReload()
        return sendJson(res, 200, { settings: next, effectiveRoots: store.roots() })
      }
      if (sub === '/workspaces' && method === 'GET') {
        const registry = ctx.workspaceRegistry
        const workspaces = registry && typeof registry.list === 'function'
          ? registry.list().map((w) => ({ id: w.id, title: w.title || w.path }))
          : []
        return sendJson(res, 200, { workspaces })
      }
      // GET /models — 模型下拉目录（llm.listProviders + 逐家 listModels；缺席降级空目录；dsh-kb 同款）
      if (sub === '/models' && method === 'GET') {
        const out = { default: null, providers: [] }
        try {
          if (ctx.agentDefaultModel && typeof ctx.agentDefaultModel.currentSelection === 'function')
            out.default = ctx.agentDefaultModel.currentSelection()
        } catch { }
        try {
          const providers = ctx.llm && typeof ctx.llm.listProviders === 'function' ? ctx.llm.listProviders() : []
          for (const p of providers || []) {
            let models = []
            try { models = (await ctx.llm.listModels(p.id)) || [] } catch { }
            out.providers.push({ id: p.id, name: p.name || p.id, models: models.map((m) => ({ id: m.id, name: m.name || m.id })) })
          }
        } catch { }
        return sendJson(res, 200, out)
      }
      // GET /skills — dsh 技能目录（ctx.skills.snapshot；缺席降级空目录）
      if (sub === '/skills' && method === 'GET') {
        const out = []
        try {
          const snapshot = ctx.skills && typeof ctx.skills.snapshot === 'function' ? await ctx.skills.snapshot({}) : null
          for (const s of (snapshot && snapshot.skills) || []) {
            if (s.invocation && s.invocation.modelInvocable === false) continue
            out.push({ name: String(s.name || ''), description: typeof s.description === 'string' ? s.description.slice(0, 120) : '' })
          }
        } catch (e) { logger && logger.warn && logger.warn(`dsh-process: skills snapshot: ${e && e.message}`) }
        out.sort((a, b) => a.name.localeCompare(b.name))
        return sendJson(res, 200, { skills: out })
      }
      if (sub === '/runs' && method === 'GET') {
        return sendJson(res, 200, { revision: runs.revision, runs: runs.list().map(runSummary) })
      }
      if (sub === '/run' && method === 'GET') {
        const run = runs.detail(url.searchParams.get('id') || '')
        if (!run) throw new StoreError('not_found', '运行不存在')
        return sendJson(res, 200, { run })
      }
      if (sub === '/run-create' && method === 'POST') {
        const body = await readJsonBody(req)
        return sendJson(res, 200, { run: runSummary(await deps.createRun(body)) })
      }
      if (sub === '/run-action' && method === 'POST') {
        const body = await readJsonBody(req)
        const actions = {
          pause: () => deps.execution.actionPause(body.id),
          resume: () => deps.execution.actionResume(body.id),
          stop: () => deps.execution.actionStop(body.id),
          'resolve-break': () => deps.execution.actionResolveBreak(body.id, body.decision),
          'skip-link': () => deps.execution.actionSkipLink(body.id, body.linkId),
          'retry-link': () => deps.execution.actionRetryLink(body.id, body.linkId),
        }
        const fn = actions[body.action]
        if (!fn) throw new StoreError('invalid_input', '未知动作 "' + body.action + '"')
        return sendJson(res, 200, { run: runSummary(fn()) })
      }
      if (sub === '/ai-generate' && method === 'POST') {
        if (typeof deps.runAi !== 'function') throw new StoreError('unavailable', '当前组合缺少 agents 服务，无法 AI 生成')
        const body = await readJsonBody(req)
        if (typeof body.prompt !== 'string' || body.prompt.trim() === '') throw new StoreError('invalid_input', '缺少 prompt')
        const job = deps.runAi(body.prompt)
        return sendJson(res, 200, { jobId: job.id })
      }
      if (sub === '/jobs' && method === 'GET') {
        const job = jobs.get(url.searchParams.get('id') || '')
        if (!job) throw new StoreError('not_found', '任务不存在')
        return sendJson(res, 200, { status: job.status, output: job.output, code: job.code, sessionId: job.sessionId })
      }
      sendJson(res, 404, { error: 'not found', code: 'not_found' })
    } catch (error) {
      if (!(error instanceof StoreError) && logger && logger.warn) logger.warn(`dsh-process: ${method} ${sub}: ${error && error.stack || error}`)
      sendError(res, error)
    }
  }

  const disposeRoute = ctx.webServer.register({ kind: 'prefix', path: PREFIX, handler })
  return () => {
    unsubscribe()
    unsubscribeRuns()
    clearInterval(heartbeat)
    for (const res of clients) { try { res.end() } catch {} }
    clients.clear()
    if (typeof disposeRoute === 'function') disposeRoute()
  }
}

module.exports = { registerRoutes, PREFIX, readJsonBody, sendJson, sendError }
