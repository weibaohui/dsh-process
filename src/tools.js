'use strict'

/**
 * dsh-process — agent 工具（host 侧）。
 *
 * 工具对象形状与 dsh-tools 注册表兼容（taskboard sdk.ts 同款结构，零 @deepseek-ai
 * 运行时依赖）：{ name, description, parameters(JSON Schema 子集), output:{schema:{},
 * render}, execute(args, exec) }。ctx.tools.register(tool) 返回 disposer。
 *
 * process_list / process_get / process_validate 只读；process_save 只写我的库，
 * 校验不过拒绝，重名且未 overwrite 拒绝。
 */

function text(s) { return [{ type: 'text', text: s }] }

function argError(msg) { return new Error(`Error: invalid arguments: ${msg}`) }

function summaryOf(e) {
  return {
    id: e.id,
    source: e.source,
    name: e.name,
    display_name: e.display_name || undefined,
    category: e.category || undefined,
    complexity: e.complexity || undefined,
    version: e.version || undefined,
    phases: e.phaseCount,
    links: e.linkCount,
    errors: e.errors || 0,
    warnings: e.warnings || 0,
    description: e.description ? e.description.slice(0, 160) : undefined,
  }
}

/** 结构摘要：阶段 → 环节（id/name/executor/expert/gates/flow），供 agent 不读全文也能按工艺推进。 */
function outlineOf(parsed) {
  if (!parsed || typeof parsed !== 'object') return []
  const phases = Array.isArray(parsed.phases) ? parsed.phases : []
  return phases.map((ph) => ({
    id: ph && ph.id,
    name: ph && ph.name,
    acceptance_criteria: ph && typeof ph.acceptance_criteria === 'string' ? ph.acceptance_criteria.trim() : undefined,
    links: (ph && Array.isArray(ph.links) ? ph.links : []).map((ln) => ({
      id: ln && ln.id,
      name: ln && ln.name,
      executor: ln && ln.executor || undefined,
      expert: ln && (ln.expert_name || ln.expert) || undefined,
      skills: ln && Array.isArray(ln.skills) && ln.skills.length ? ln.skills : undefined,
      gates: ln && Array.isArray(ln.gates) ? ln.gates.map((g) => (g && g.name) || g) : undefined,
      on_success: ln && ln.on_success || undefined,
      on_gate_fail: ln && ln.on_gate_fail || undefined,
      max_rework: ln && ln.max_rework !== undefined ? ln.max_rework : undefined,
      prompt_head: ln && typeof ln.prompt === 'string' ? ln.prompt.trim().slice(0, 120) : undefined,
    })),
  }))
}

/**
 * @param toolsService  ctx.tools（有 register）
 * @param deps { store }
 * @returns disposers[]
 */
function registerTools(toolsService, { store }) {
  const disposers = []
  const register = (tool) => {
    const d = toolsService.register(tool)
    if (typeof d === 'function') disposers.push(d)
    else if (d && typeof d.dispose === 'function') disposers.push(() => d.dispose())
  }

  register({
    name: 'process_list',
    description: 'List ntd 工艺 (Process workflow templates) available in dsh: user library (writable) and bundled library (read-only). '
      + 'Returns compact summaries (id, name, display_name, category, complexity, phases, links). '
      + 'Call this first when the user mentions 工艺 / process template / 按工艺执行.',
    parameters: {
      type: 'object',
      properties: {
        source: { type: 'string', enum: ['user', 'bundled'], description: 'Only this library (default both).' },
        category: { type: 'string', description: 'Filter by process.category (exact).' },
        query: { type: 'string', description: 'Case-insensitive substring over name / display_name / description.' },
      },
    },
    output: {
      schema: {},
      render(_args, value) { return text(JSON.stringify(value, null, 2)) },
    },
    async execute(args) {
      if (store.revision === 0) await store.load()
      const q = typeof args.query === 'string' ? args.query.trim().toLowerCase() : ''
      const rows = store.snapshot().processes.filter((e) =>
        (!args.source || e.source === args.source)
        && (!args.category || e.category === args.category)
        && (q === '' || `${e.name} ${e.display_name} ${e.description}`.toLowerCase().includes(q)))
      return { count: rows.length, processes: rows.map(summaryOf) }
    },
  })

  register({
    name: 'process_get',
    description: 'Read one 工艺 by id (e.g. "user:te.yaml"), name, or guid. format=summary (default) returns meta + phase/link outline; '
      + 'format=yaml returns the full YAML text. Use the outline to drive work phase by phase: one link = one deliverable, '
      + 'run its gates, and on failure follow on_gate_fail (break / <link id> / goto:<link id>) up to max_rework times.',
    parameters: {
      type: 'object',
      properties: {
        ref: { type: 'string', description: 'id, name, or guid of the process.' },
        format: { type: 'string', enum: ['summary', 'yaml'], description: 'summary (default) or yaml.' },
      },
      required: ['ref'],
    },
    output: {
      schema: {},
      render(args, value) {
        if (args.format === 'yaml' && typeof value.yaml === 'string') return text(value.yaml)
        return text(JSON.stringify(value, null, 2))
      },
    },
    async execute(args) {
      if (typeof args.ref !== 'string' || args.ref.trim() === '') throw argError('ref is required')
      if (store.revision === 0) await store.load()
      const entry = store.find(args.ref.trim())
      if (!entry) throw new Error(`Error: not_found: no process matches "${args.ref}"`)
      const item = await store.get(entry.id)
      if (args.format === 'yaml') return { id: item.meta.id, yaml: item.yaml }
      return {
        ...summaryOf(item.meta),
        limits: item.parsed && item.parsed.limits ? item.parsed.limits : undefined,
        abnormal_handler: item.parsed && item.parsed.abnormal_handler ? item.parsed.abnormal_handler : undefined,
        outline: outlineOf(item.parsed),
        diagnostics: item.diagnostics,
      }
    },
  })

  register({
    name: 'process_validate',
    description: 'Validate a 工艺 YAML text with the same checker the UI uses. Returns errors (block saving: syntax, missing process.name, '
      + 'empty phases, duplicate ids, dangling on_gate_fail targets) and warnings (missing guid/version, unknown keys, unknown expert/skill). '
      + 'Call before process_save.',
    parameters: {
      type: 'object',
      properties: { yaml: { type: 'string', description: 'Full YAML text of the process.' } },
      required: ['yaml'],
    },
    output: {
      schema: {},
      render(_args, value) { return text(JSON.stringify(value, null, 2)) },
    },
    async execute(args) {
      if (typeof args.yaml !== 'string') throw argError('yaml is required')
      const r = await store.validate(args.yaml)
      return { ok: r.errors.length === 0, errors: r.errors, warnings: r.warnings, meta: r.meta }
    },
  })

  register({
    name: 'process_save',
    description: 'Save a 工艺 YAML into the USER library (never the bundled one). name becomes the file name (<name>.yaml); '
      + 'validation errors reject the save; an existing file is only replaced when overwrite=true. Returns the new id.',
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'File name without extension (also expected as process.name).' },
        yaml: { type: 'string', description: 'Full YAML text.' },
        dir: { type: 'string', description: 'Optional sub-directory inside the user library, e.g. "software".' },
        overwrite: { type: 'boolean', description: 'Replace an existing file with the same name (default false).' },
      },
      required: ['name', 'yaml'],
    },
    output: {
      schema: {},
      render(_args, value) { return text(JSON.stringify(value, null, 2)) },
    },
    async execute(args) {
      if (typeof args.name !== 'string' || typeof args.yaml !== 'string') throw argError('name and yaml are required')
      if (store.revision === 0) await store.load()
      const dir = typeof args.dir === 'string' ? args.dir : ''
      const rel = `${dir ? dir.replace(/^\/+|\/+$/g, '') + '/' : ''}${args.name.trim()}.yaml`
      const existing = store.index.get(`user:${rel}`)
      try {
        if (existing) {
          if (args.overwrite !== true) throw new Error(`Error: exists: user:${rel} already exists; pass overwrite=true to replace it`)
          return await store.save({ mode: 'update', id: existing.id, yaml: args.yaml })
        }
        return await store.save({ mode: 'create', name: args.name, dir, yaml: args.yaml })
      } catch (e) {
        if (e && e.diagnostics) throw new Error(`Error: invalid: ${e.message}: ${e.diagnostics.errors.map((d) => `${d.line ? 'L' + d.line + ' ' : ''}${d.message}`).join('; ')}`)
        throw e
      }
    },
  })

  return disposers
}

module.exports = { registerTools, summaryOf, outlineOf }
