'use strict'

/**
 * dsh-process — 工艺 YAML 校验器（纯函数，无 IO）。
 *
 * ntd 才是 schema 权威；这里只做结构级检查，分两档：
 * - errors   阻止保存：YAML 语法错 / 缺 process.name / phases 为空 / 环节缺 id /
 *            id 重复 / on_success·on_gate_fail·on_rating_fail 指向不存在的环节。
 * - warnings 只提示：缺 guid·display_name·version、未知复杂度、未知键、阶段无环节、
 *            expert/skills 引用在库里找不到、max_rework/min_score 类型不对。
 *
 * 行号：用 YAML.LineCounter 把节点 offset 换成 1-based 行号，供编辑器定位。
 */

const YAML = require('yaml')

const TOP_KEYS = new Set(['process', 'limits', 'abnormal_handler', 'phases'])
const PROCESS_KEYS = new Set(['name', 'guid', 'display_name', 'description', 'category', 'complexity', 'version'])
const LIMIT_KEYS = new Set(['max_step_executions', 'max_total_tokens'])
const PHASE_KEYS = new Set(['id', 'name', 'spec', 'spec_ref', 'acceptance_criteria', 'links'])
const LINK_KEYS = new Set([
  'id', 'name', 'step_template', 'prompt', 'executor', 'expert', 'expert_name', 'skills', 'model',
  'review_type', 'expected_artifacts', 'gates', 'on_success', 'on_gate_fail', 'on_rating_fail',
  'max_rework', 'acceptance_criteria', 'review_prompt',
])
const COMPLEXITIES = new Set(['light', 'lightweight', 'standard', 'medium', 'complex'])
const FLOW_KEYWORDS = new Set(['next', 'end', 'break'])
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const isMap = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)
const isNonEmptyString = (v) => typeof v === 'string' && v.trim() !== ''

/**
 * 解析文本为 Document + 普通对象；语法错误带行号返回，不抛。
 * @returns {{ doc: import('yaml').Document, data: any, lineCounter: YAML.LineCounter, syntaxErrors: Array<{code,message,line,col}> }}
 */
function parseProcessYaml(text) {
  const lineCounter = new YAML.LineCounter()
  const doc = YAML.parseDocument(String(text ?? ''), { lineCounter, prettyErrors: true, uniqueKeys: true })
  const syntaxErrors = doc.errors.map((e) => {
    const pos = e.linePos && e.linePos[0] ? e.linePos[0] : (Array.isArray(e.pos) ? lineCounter.linePos(e.pos[0]) : { line: 1, col: 1 })
    return { code: 'yaml_syntax', message: String(e.message || e).split('\n')[0], line: pos.line, col: pos.col, path: '' }
  })
  let data
  try { data = doc.errors.length === 0 ? doc.toJS({ maxAliasCount: 1000 }) : undefined } catch (e) {
    syntaxErrors.push({ code: 'yaml_syntax', message: String(e && e.message || e), line: 1, col: 1, path: '' })
  }
  return { doc, data, lineCounter, syntaxErrors }
}

/** 节点路径 → 1-based 行号（找不到返回 undefined）。 */
function lineOf(doc, lineCounter, path) {
  try {
    const node = doc.getIn(path, true)
    const range = node && node.range
    if (!range) return undefined
    return lineCounter.linePos(range[0]).line
  } catch { return undefined }
}

/** 解析流转值：next/end/break 关键字、`goto:<id>`、或直接 `<id>`。返回引用的环节 id 或 null。 */
function flowTarget(value) {
  if (typeof value !== 'string') return null
  const v = value.trim()
  if (v === '' || FLOW_KEYWORDS.has(v)) return null
  return v.startsWith('goto:') ? v.slice(5).trim() : v
}

/**
 * 从已解析对象提取列表元信息。
 * @param data 解析后的普通对象（可能 undefined）
 */
function extractMeta(data) {
  const p = isMap(data) && isMap(data.process) ? data.process : {}
  const phases = isMap(data) && Array.isArray(data.phases) ? data.phases : []
  let linkCount = 0
  for (const ph of phases) if (isMap(ph) && Array.isArray(ph.links)) linkCount += ph.links.length
  return {
    name: isNonEmptyString(p.name) ? p.name.trim() : '',
    guid: typeof p.guid === 'string' ? p.guid : '',
    display_name: isNonEmptyString(p.display_name) ? p.display_name.trim() : '',
    description: typeof p.description === 'string' ? p.description.trim() : '',
    category: isNonEmptyString(p.category) ? p.category.trim() : '',
    complexity: isNonEmptyString(p.complexity) ? p.complexity.trim() : '',
    version: p.version === undefined || p.version === null ? '' : String(p.version),
    phaseCount: phases.length,
    linkCount,
  }
}

/**
 * 校验一份工艺。
 * @param {string|{doc,data,lineCounter,syntaxErrors}} input 文本或 parseProcessYaml 结果
 * @param {{ refs?: { experts?: Set<string>|null, skills?: Set<string>|null } }} [options]
 * @returns {{ errors: Diag[], warnings: Diag[], meta: object }}  Diag = {code, message, path, line?}
 */
function validateProcess(input, options = {}) {
  const parsed = typeof input === 'string' ? parseProcessYaml(input) : input
  const { doc, data, lineCounter } = parsed
  const errors = [...parsed.syntaxErrors]
  const warnings = []
  const refs = options.refs || {}
  const at = (path) => lineOf(doc, lineCounter, path)
  const err = (code, message, path) => errors.push({ code, message, path: path.join('.'), line: at(path) })
  const warn = (code, message, path) => warnings.push({ code, message, path: path.join('.'), line: at(path) })

  if (errors.length > 0 || data === undefined) {
    return { errors, warnings, meta: extractMeta(undefined) }
  }
  if (!isMap(data)) {
    err('not_a_map', '顶层必须是映射（process / phases …）', [])
    return { errors, warnings, meta: extractMeta(undefined) }
  }
  for (const key of Object.keys(data)) {
    if (!TOP_KEYS.has(key)) warn('unknown_key', `未知顶层键 "${key}"`, [key])
  }

  // ── process ──
  if (!isMap(data.process)) {
    err('missing_process', '缺少 process 块', ['process'])
  } else {
    const p = data.process
    for (const key of Object.keys(p)) {
      if (!PROCESS_KEYS.has(key)) warn('unknown_key', `process 下未知键 "${key}"`, ['process', key])
    }
    if (!isNonEmptyString(p.name)) err('missing_name', 'process.name 必填且不能为空', ['process', 'name'])
    else if (/[\\/]/.test(p.name)) err('bad_name', 'process.name 不能包含路径分隔符', ['process', 'name'])
    if (!isNonEmptyString(p.guid)) warn('missing_guid', '建议填写 process.guid（UUID，ntd 用它标识工艺身份）', ['process', 'guid'])
    else if (!UUID_RE.test(p.guid)) warn('bad_guid', 'process.guid 不是 UUID 格式', ['process', 'guid'])
    if (!isNonEmptyString(p.display_name)) warn('missing_display_name', '建议填写 process.display_name（界面显示名）', ['process', 'display_name'])
    if (p.version === undefined || p.version === null || String(p.version).trim() === '') warn('missing_version', '建议填写 process.version', ['process', 'version'])
    if (isNonEmptyString(p.complexity) && !COMPLEXITIES.has(p.complexity.trim())) {
      warn('unknown_complexity', `复杂度 "${p.complexity}" 不在常见取值（light / lightweight / standard / medium / complex）`, ['process', 'complexity'])
    }
  }

  // ── limits / abnormal_handler ──
  if (data.limits !== undefined && data.limits !== null) {
    if (!isMap(data.limits)) warn('bad_limits', 'limits 应为映射', ['limits'])
    else {
      for (const key of Object.keys(data.limits)) {
        if (!LIMIT_KEYS.has(key)) warn('unknown_key', `limits 下未知键 "${key}"`, ['limits', key])
        else if (data.limits[key] !== null && !(Number.isInteger(data.limits[key]) && data.limits[key] >= 0)) {
          warn('bad_limit', `limits.${key} 应为非负整数或 null`, ['limits', key])
        }
      }
    }
  }
  if (data.abnormal_handler !== undefined && data.abnormal_handler !== null && !isMap(data.abnormal_handler)) {
    warn('bad_abnormal_handler', 'abnormal_handler 应为映射或 null', ['abnormal_handler'])
  }

  // ── phases / links ──
  if (!Array.isArray(data.phases) || data.phases.length === 0) {
    err('missing_phases', 'phases 必须是非空列表', ['phases'])
    return { errors, warnings, meta: extractMeta(data) }
  }
  const phaseIds = new Map()
  const linkIds = new Map()
  const flowRefs = []
  data.phases.forEach((ph, pi) => {
    const pPath = ['phases', pi]
    if (!isMap(ph)) { err('bad_phase', `第 ${pi + 1} 个阶段不是映射`, pPath); return }
    for (const key of Object.keys(ph)) {
      if (!PHASE_KEYS.has(key)) warn('unknown_key', `阶段 "${ph.id || pi + 1}" 下未知键 "${key}"`, [...pPath, key])
    }
    if (!isNonEmptyString(ph.id)) err('missing_phase_id', `第 ${pi + 1} 个阶段缺少 id`, [...pPath, 'id'])
    else if (phaseIds.has(ph.id)) err('duplicate_phase_id', `阶段 id 重复 "${ph.id}"`, [...pPath, 'id'])
    else phaseIds.set(ph.id, pi)
    if (!Array.isArray(ph.links) || ph.links.length === 0) {
      warn('empty_phase', `阶段 "${ph.id || pi + 1}" 没有环节`, [...pPath, 'links'])
      return
    }
    ph.links.forEach((ln, li) => {
      const lPath = [...pPath, 'links', li]
      if (!isMap(ln)) { err('bad_link', `阶段 "${ph.id}" 第 ${li + 1} 个环节不是映射`, lPath); return }
      for (const key of Object.keys(ln)) {
        if (!LINK_KEYS.has(key)) warn('unknown_key', `环节 "${ln.id || li + 1}" 下未知键 "${key}"`, [...lPath, key])
      }
      if (!isNonEmptyString(ln.id)) err('missing_link_id', `阶段 "${ph.id}" 第 ${li + 1} 个环节缺少 id`, [...lPath, 'id'])
      else if (linkIds.has(ln.id)) err('duplicate_link_id', `环节 id 重复 "${ln.id}"`, [...lPath, 'id'])
      else linkIds.set(ln.id, lPath)
      if (!isNonEmptyString(ln.prompt)) warn('empty_prompt', `环节 "${ln.id || li + 1}" 没有 prompt`, [...lPath, 'prompt'])
      if (ln.max_rework !== undefined && ln.max_rework !== null && !(Number.isInteger(ln.max_rework) && ln.max_rework >= 0)) {
        warn('bad_max_rework', `环节 "${ln.id}" 的 max_rework 应为非负整数`, [...lPath, 'max_rework'])
      }
      if (ln.skills !== undefined && ln.skills !== null && !Array.isArray(ln.skills)) {
        warn('bad_skills', `环节 "${ln.id}" 的 skills 应为列表`, [...lPath, 'skills'])
      }
      if (Array.isArray(ln.gates)) {
        ln.gates.forEach((g, gi) => {
          if (!isMap(g)) { warn('bad_gate', `环节 "${ln.id}" 第 ${gi + 1} 个门禁不是映射`, [...lPath, 'gates', gi]); return }
          if (g.min_score !== undefined && g.min_score !== null && typeof g.min_score !== 'number') {
            warn('bad_min_score', `环节 "${ln.id}" 门禁 "${g.name || gi + 1}" 的 min_score 应为数字`, [...lPath, 'gates', gi, 'min_score'])
          }
        })
      } else if (ln.gates !== undefined && ln.gates !== null) {
        warn('bad_gates', `环节 "${ln.id}" 的 gates 应为列表`, [...lPath, 'gates'])
      }
      for (const field of ['on_success', 'on_gate_fail', 'on_rating_fail']) {
        const target = flowTarget(ln[field])
        if (target !== null) flowRefs.push({ field, target, path: [...lPath, field], linkId: ln.id })
      }
      // 引用校验（库缺席 → 跳过）
      const expertName = isNonEmptyString(ln.expert_name) ? ln.expert_name.trim() : (isNonEmptyString(ln.expert) ? ln.expert.trim() : '')
      if (expertName !== '' && refs.experts instanceof Set && refs.experts.size > 0 && !refs.experts.has(expertName)) {
        warn('unknown_expert', `环节 "${ln.id}" 引用的专家 "${expertName}" 在专家库里找不到`, [...lPath, isNonEmptyString(ln.expert_name) ? 'expert_name' : 'expert'])
      }
      if (Array.isArray(ln.skills) && refs.skills instanceof Set && refs.skills.size > 0) {
        ln.skills.forEach((s, si) => {
          if (isNonEmptyString(s) && !refs.skills.has(s.trim())) {
            warn('unknown_skill', `环节 "${ln.id}" 引用的技能 "${s}" 在技能库里找不到`, [...lPath, 'skills', si])
          }
        })
      }
    })
  })
  for (const ref of flowRefs) {
    if (!linkIds.has(ref.target) && !phaseIds.has(ref.target)) {
      err('dangling_flow', `环节 "${ref.linkId}" 的 ${ref.field} 指向不存在的环节 "${ref.target}"`, ref.path)
    }
  }
  return { errors, warnings, meta: extractMeta(data) }
}

/** 新建空白工艺骨架（带注释说明每个字段）。 */
function skeletonYaml({ name, displayName, guid }) {
  const safeName = String(name || 'new-process')
  return `# 工艺（Process）定义 —— ntd 格式。每个阶段（phase）包含若干环节（link），
# 环节按 on_success / on_gate_fail 流转；门禁（gates）不过会按 max_rework 返工。
process:
  name: ${YAML.stringify(safeName).trim()}
  guid: ${guid}
  display_name: ${YAML.stringify(displayName || safeName).trim()}
  description: |
    一句话说明这个工艺适合什么场景。
  category: software        # 分类，用于筛选
  complexity: light         # light | lightweight | medium | complex
  version: 1.0.0
limits:
  max_step_executions: null # 环节执行总次数上限（null = 不限）
  max_total_tokens: null    # token 总量上限（null = 不限）
abnormal_handler: null      # 如 { trigger_on: [capped_step, capped_token, failed] }
phases:
  - id: phase-1
    name: 阶段 1
    spec: |
      这个阶段要达成什么。
    acceptance_criteria: |
      阶段验收标准。
    links:
      - id: link-1
        name: 环节 1
        prompt: |
          交给 agent 的指令。
        executor: null        # 执行器，如 atomcode
        expert: null          # 专家名（对应专家库）
        skills: []            # 技能名列表（对应技能库）
        model: null
        review_type: ai       # ai | human | none
        expected_artifacts: []
        gates: []             # 如 { name: 方案存在, type: ai_criteria_review, min_score: 60 }
        on_success: end       # next | end | <环节 id> | goto:<环节 id>
        on_gate_fail: break   # break | <环节 id> | goto:<环节 id>
        on_rating_fail: break
        max_rework: 2
        acceptance_criteria: ''
        review_prompt: ''
`
}

module.exports = { parseProcessYaml, validateProcess, extractMeta, skeletonYaml, flowTarget, lineOf, COMPLEXITIES }
