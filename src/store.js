'use strict'

/**
 * dsh-process — 工艺库存储（host 侧）。
 *
 * 两个根目录：我的库（可写）+ 内置库（只读）。递归扫描 *.yaml / *.yml（深度可配，
 * 跳过点目录含 .trash），逐文件解析 + 校验，建内存索引。fs.watch 监听两根，
 * 200ms 防抖后重扫；索引指纹（id+hash 集合）变化才 revision++ 并广播——
 * 客户端收到变更帧后全量 refetch（taskboard 同款数据流）。
 *
 * 写路径只对我的库开放：原子写（临时文件 + rename）、baseHash 乐观锁、
 * 删除移入 .trash。所有相对路径经 safeRel 白名单校验，禁 ..、绝对路径、点目录。
 */

const fs = require('node:fs')
const fsP = require('node:fs/promises')
const { createHash, randomUUID } = require('node:crypto')
const path = require('node:path')
const YAML = require('yaml')
const { parseProcessYaml, validateProcess, extractMeta } = require('./validate.js')

const YAML_EXT = new Set(['.yaml', '.yml'])
const TRASH_DIR = '.trash'
const DEFAULT_MAX_DEPTH = 3
const DEFAULT_MAX_FILE_BYTES = 1024 * 1024
const WATCH_DEBOUNCE_MS = 200
// 文件名（不含扩展名）：不含路径分隔符/控制字符，不以点开头，≤ 80 字符
const NAME_RE = /^(?![.])[^\\/\0\r\n]{1,80}$/

class StoreError extends Error {
  constructor(code, message, extra) {
    super(message)
    this.code = code
    if (extra) Object.assign(this, extra)
  }
}

const sha1 = (buf) => createHash('sha1').update(buf).digest('hex').slice(0, 16)
const toPosix = (p) => p.split(path.sep).join('/')

/** 校验并规范化相对路径（posix 分隔）；不合法抛 invalid_path。 */
function safeRel(rel) {
  const s = String(rel || '').replace(/\\/g, '/').replace(/^\/+/, '')
  if (s === '' || s.includes('\0')) throw new StoreError('invalid_path', '路径不能为空')
  const parts = s.split('/')
  for (const part of parts) {
    if (part === '' || part === '.' || part === '..') throw new StoreError('invalid_path', `非法路径 "${rel}"`)
    if (part.startsWith('.')) throw new StoreError('invalid_path', `路径不能包含点目录/点文件 "${part}"`)
  }
  if (!YAML_EXT.has(path.posix.extname(s).toLowerCase())) throw new StoreError('invalid_path', '只接受 .yaml / .yml 文件')
  return parts.join('/')
}

/** 校验工艺文件名（不含扩展名）。 */
function safeName(name) {
  const s = String(name || '').trim()
  if (!NAME_RE.test(s) || s === '..' || s === '.') throw new StoreError('invalid_name', `非法名称 "${name}"：不能为空、不能含 / 或 \\、不能以点开头、≤ 80 字符`)
  return s
}

/** 可选子目录（如 software）。返回 posix 形式或 ''。 */
function safeDir(dir) {
  const s = String(dir || '').replace(/\\/g, '/').replace(/^\/+|\/+$/g, '')
  if (s === '') return ''
  for (const part of s.split('/')) {
    if (part === '' || part === '.' || part === '..' || part.startsWith('.')) throw new StoreError('invalid_path', `非法目录 "${dir}"`)
  }
  return s
}

function parseId(id) {
  const s = String(id || '')
  const idx = s.indexOf(':')
  if (idx <= 0) throw new StoreError('invalid_id', `非法 id "${id}"`)
  const source = s.slice(0, idx)
  if (source !== 'user' && source !== 'bundled') throw new StoreError('invalid_id', `未知来源 "${source}"`)
  return { source, relPath: safeRel(s.slice(idx + 1)) }
}

async function atomicWrite(absPath, content) {
  await fsP.mkdir(path.dirname(absPath), { recursive: true })
  const tmp = `${absPath}.tmp-${process.pid}-${Math.random().toString(36).slice(2, 8)}`
  await fsP.writeFile(tmp, content, 'utf8')
  await fsP.rename(tmp, absPath)
}

/** 用 Document API 改 process.name / guid，注释与键序不丢。 */
function rewriteIdentity(yamlText, { name, guid }) {
  const doc = YAML.parseDocument(yamlText)
  if (doc.errors.length > 0) return yamlText
  if (!doc.has('process') || !YAML.isMap(doc.get('process', true))) return yamlText
  if (name !== undefined) doc.setIn(['process', 'name'], name)
  if (guid !== undefined) doc.setIn(['process', 'guid'], guid)
  return doc.toString()
}

class ProcessStore {
  /**
   * @param {object} opts
   * @param {() => {user: string, bundled: string}} opts.roots  当前根目录（可随设置变化）
   * @param {() => Promise<{experts: Set<string>|null, skills: Set<string>|null}>} [opts.refs] 引用库解析器
   * @param {() => {maxDepth?: number, checkRefs?: boolean}} [opts.options]
   * @param {{info?: Function, warn?: Function}} [opts.logger]
   */
  constructor(opts) {
    this.rootsFn = opts.roots
    this.refsFn = opts.refs || (async () => ({ experts: null, skills: null }))
    this.optionsFn = opts.options || (() => ({}))
    this.logger = opts.logger || console
    this.maxFileBytes = opts.maxFileBytes || DEFAULT_MAX_FILE_BYTES
    this.revision = 0
    this.index = new Map()
    this.fingerprint = ''
    this.listeners = new Set()
    this.queue = Promise.resolve()
    this.watchers = []
    this.debounceTimer = null
    this.lastError = undefined
  }

  roots() {
    const r = this.rootsFn()
    return { user: path.resolve(r.user), bundled: path.resolve(r.bundled) }
  }

  subscribe(fn) {
    this.listeners.add(fn)
    return () => { this.listeners.delete(fn) }
  }

  emit() {
    for (const fn of this.listeners) {
      try { fn(this.revision) } catch (e) { this.logger.warn && this.logger.warn(`dsh-process: listener failed: ${e && e.message}`) }
    }
  }

  /**
   * 串行扫描队列：每次 load() 排一个**新**扫描，await 到的一定是「始于调用之后」的
   * 扫描结果——写操作（save/rename/remove/import）之后 await load()，响应返回时索引
   * 必然已含本次变更（在飞合并方案做不到：改名前的扫描看不到新文件，响应会漏条目）。
   */
  load() {
    const run = this.queue.then(() => this.scan())
    this.queue = run.then(() => {}, () => {})
    return run
  }

  async scan() {
    const roots = this.roots()
    const { maxDepth = DEFAULT_MAX_DEPTH, checkRefs = true } = this.optionsFn()
    const refs = checkRefs ? await this.refsFn().catch(() => ({ experts: null, skills: null })) : { experts: null, skills: null }
    const next = new Map()
    for (const source of ['user', 'bundled']) {
      const root = roots[source]
      const files = await this.walk(root, '', 0, maxDepth)
      for (const rel of files) {
        const entry = await this.readEntry(source, root, rel, refs)
        if (entry) next.set(entry.id, entry)
      }
    }
    const fp = [...next.keys()].sort().map((id) => `${id}@${next.get(id).hash}`).join('|')
    const changed = fp !== this.fingerprint
    this.index = next
    this.fingerprint = fp
    this.lastError = undefined
    if (changed || this.revision === 0) {
      this.revision += 1
      this.emit()
    }
  }

  async walk(root, rel, depth, maxDepth) {
    let dirents
    try { dirents = await fsP.readdir(rel ? path.join(root, rel) : root, { withFileTypes: true }) } catch { return [] }
    const out = []
    for (const d of dirents) {
      if (d.name.startsWith('.')) continue
      const childRel = rel ? `${rel}/${d.name}` : d.name
      if (d.isDirectory()) {
        if (depth + 1 < maxDepth) out.push(...await this.walk(root, childRel, depth + 1, maxDepth))
      } else if (d.isFile() && YAML_EXT.has(path.extname(d.name).toLowerCase())) {
        out.push(childRel)
      }
    }
    return out.sort()
  }

  async readEntry(source, root, rel, refs) {
    const abs = path.join(root, ...rel.split('/'))
    let stat
    try { stat = await fsP.stat(abs) } catch { return null }
    if (stat.size > this.maxFileBytes) {
      return this.entryFrom(source, rel, abs, stat, '', { errors: [{ code: 'too_large', message: `文件超过 ${this.maxFileBytes} 字节`, path: '', line: 1 }], warnings: [], meta: extractMeta(undefined) })
    }
    const text = await fsP.readFile(abs, 'utf8')
    const parsed = parseProcessYaml(text)
    const result = validateProcess(parsed, { refs })
    return this.entryFrom(source, rel, abs, stat, text, result)
  }

  entryFrom(source, rel, abs, stat, text, result) {
    const meta = result.meta
    const base = path.posix.basename(rel).replace(/\.ya?ml$/i, '')
    return {
      id: `${source}:${rel}`,
      source,
      relPath: rel,
      absPath: abs,
      fileName: base,
      name: meta.name || base,
      guid: meta.guid,
      display_name: meta.display_name,
      description: meta.description,
      category: meta.category,
      complexity: meta.complexity,
      version: meta.version,
      phaseCount: meta.phaseCount,
      linkCount: meta.linkCount,
      mtime: Math.round(stat.mtimeMs),
      size: stat.size,
      hash: sha1(text),
      errors: result.errors.length,
      warnings: result.warnings.length,
      diagnostics: { errors: result.errors, warnings: result.warnings },
    }
  }

  /** 列表快照（不含 absPath/diagnostics 全文）。 */
  snapshot() {
    const roots = this.roots()
    const processes = [...this.index.values()].map((e) => {
      const { absPath, diagnostics, ...rest } = e
      return rest
    }).sort((a, b) => (a.source === b.source ? a.relPath.localeCompare(b.relPath) : a.source === 'user' ? -1 : 1))
    return { revision: this.revision, roots, processes, lastError: this.lastError }
  }

  entry(id) {
    const e = this.index.get(String(id))
    if (!e) throw new StoreError('not_found', `工艺不存在：${id}`)
    return e
  }

  /** 按 id / name / guid 找条目（工具用）。 */
  find(ref) {
    const s = String(ref || '')
    if (this.index.has(s)) return this.index.get(s)
    const all = [...this.index.values()]
    return all.find((e) => e.guid && e.guid === s)
      || all.find((e) => e.source === 'user' && (e.name === s || e.fileName === s))
      || all.find((e) => e.name === s || e.fileName === s)
      || all.find((e) => e.display_name === s)
      || undefined
  }

  async get(id) {
    const e = this.entry(id)
    let text
    try { text = await fsP.readFile(e.absPath, 'utf8') } catch { throw new StoreError('not_found', `文件已不存在：${e.relPath}`) }
    const hash = sha1(text)
    let entry = e
    if (hash !== e.hash) {
      // 索引落后于磁盘：就地刷新这一条并触发重扫
      const stat = await fsP.stat(e.absPath)
      const refs = await this.refsFn().catch(() => ({ experts: null, skills: null }))
      entry = this.entryFrom(e.source, e.relPath, e.absPath, stat, text, validateProcess(parseProcessYaml(text), { refs }))
      this.index.set(entry.id, entry)
      void this.load()
    }
    const parsed = parseProcessYaml(text)
    const { absPath, diagnostics, ...meta } = entry
    return { meta, yaml: text, parsed: parsed.data, diagnostics: entry.diagnostics, hash }
  }

  async validate(yamlText) {
    const refs = await this.refsFn().catch(() => ({ experts: null, skills: null }))
    const result = validateProcess(parseProcessYaml(String(yamlText ?? '')), { refs })
    return { errors: result.errors, warnings: result.warnings, meta: result.meta }
  }

  userAbs(rel) {
    return path.join(this.roots().user, ...rel.split('/'))
  }

  async exists(abs) {
    try { await fsP.access(abs); return true } catch { return false }
  }

  /**
   * 保存到我的库。
   * mode=create：{ name, dir?, yaml }        新文件，重名 409 exists
   * mode=update：{ id, yaml, baseHash? }    已有文件，baseHash 不符 409 conflict
   * mode=copy  ：{ fromId, name, dir? }     复制（我的/内置 → 我的），换 name + 新 guid
   * 校验有 errors 一律 400 invalid（返回 diagnostics）。
   */
  async save(input) {
    const mode = input.mode || (input.id ? 'update' : 'create')
    let rel
    let text
    let expectHash
    if (mode === 'update') {
      const { source, relPath } = parseId(input.id)
      if (source !== 'user') throw new StoreError('readonly', '内置库只读，请先「复制到我的库」')
      rel = relPath
      text = String(input.yaml ?? '')
      expectHash = input.baseHash
    } else if (mode === 'create') {
      const name = safeName(input.name)
      const dir = safeDir(input.dir)
      rel = `${dir ? dir + '/' : ''}${name}.yaml`
      text = String(input.yaml ?? '')
    } else if (mode === 'copy') {
      const from = this.entry(input.fromId)
      const name = safeName(input.name)
      const dir = safeDir(input.dir !== undefined ? input.dir : (from.source === 'user' ? path.posix.dirname(from.relPath) : ''))
      rel = `${dir && dir !== '.' ? dir + '/' : ''}${name}.yaml`
      const src = await fsP.readFile(from.absPath, 'utf8')
      text = rewriteIdentity(src, { name, guid: randomUUID() })
    } else {
      throw new StoreError('invalid_input', `未知 mode "${mode}"`)
    }
    const abs = this.userAbs(rel)
    const result = await this.validate(text)
    if (result.errors.length > 0) {
      throw new StoreError('invalid', '工艺校验未通过，未保存', { diagnostics: { errors: result.errors, warnings: result.warnings } })
    }
    if (mode === 'update') {
      let current
      try { current = await fsP.readFile(abs, 'utf8') } catch { throw new StoreError('not_found', `文件已不存在：${rel}`) }
      if (expectHash && sha1(current) !== expectHash) {
        throw new StoreError('conflict', '文件已被外部修改（可能是 ntd 或其他编辑器），请重新加载后再保存', { currentHash: sha1(current) })
      }
    } else if (await this.exists(abs)) {
      throw new StoreError('exists', `已存在同名工艺：${rel}`)
    }
    await atomicWrite(abs, text)
    await this.load()
    const id = `user:${rel}`
    return { id, hash: sha1(text), diagnostics: { errors: [], warnings: result.warnings }, meta: result.meta }
  }

  async rename(id, newName) {
    const { source, relPath } = parseId(id)
    if (source !== 'user') throw new StoreError('readonly', '内置库只读')
    const name = safeName(newName)
    const dir = path.posix.dirname(relPath)
    const rel = `${dir && dir !== '.' ? dir + '/' : ''}${name}.yaml`
    const fromAbs = this.userAbs(relPath)
    const toAbs = this.userAbs(rel)
    if (rel === relPath) return { id }
    if (await this.exists(toAbs)) throw new StoreError('exists', `已存在同名工艺：${rel}`)
    let text
    try { text = await fsP.readFile(fromAbs, 'utf8') } catch { throw new StoreError('not_found', `文件已不存在：${relPath}`) }
    const next = rewriteIdentity(text, { name })
    await atomicWrite(toAbs, next)
    await fsP.unlink(fromAbs)
    await this.load()
    return { id: `user:${rel}`, hash: sha1(next) }
  }

  /** 删除 = 移入 .trash（带时间戳），返回回收站相对路径。 */
  async remove(id) {
    const { source, relPath } = parseId(id)
    if (source !== 'user') throw new StoreError('readonly', '内置库只读')
    const abs = this.userAbs(relPath)
    if (!(await this.exists(abs))) throw new StoreError('not_found', `文件已不存在：${relPath}`)
    const stamp = new Date().toISOString().replace(/[:.]/g, '-')
    const trashRel = `${TRASH_DIR}/${path.posix.basename(relPath).replace(/\.ya?ml$/i, '')}-${stamp}.yaml`
    const trashAbs = path.join(this.roots().user, ...trashRel.split('/'))
    await fsP.mkdir(path.dirname(trashAbs), { recursive: true })
    await fsP.rename(abs, trashAbs)
    await this.load()
    return { trashed: trashRel }
  }

  /**
   * 批量导入到我的库。files: [{ name, content }]；name 可带 .yaml 后缀或子目录。
   * 返回每个文件的结果：created / overwritten / skipped(exists) / invalid。
   */
  async importFiles(files, { overwrite = false } = {}) {
    if (!Array.isArray(files) || files.length === 0) throw new StoreError('invalid_input', '没有要导入的文件')
    if (files.length > 200) throw new StoreError('invalid_input', '一次最多导入 200 个文件')
    const results = []
    let changed = false
    for (const f of files) {
      const raw = String(f && f.name || '').replace(/\\/g, '/')
      const stripped = raw.replace(/\.ya?ml$/i, '')
      const item = { name: raw }
      try {
        const dir = safeDir(path.posix.dirname(stripped) === '.' ? '' : path.posix.dirname(stripped))
        const base = safeName(path.posix.basename(stripped))
        const rel = `${dir ? dir + '/' : ''}${base}.yaml`
        const text = String(f.content ?? '')
        if (Buffer.byteLength(text, 'utf8') > this.maxFileBytes) throw new StoreError('invalid', '文件过大')
        const result = await this.validate(text)
        if (result.errors.length > 0) {
          results.push({ ...item, status: 'invalid', errors: result.errors.slice(0, 5) })
          continue
        }
        const abs = this.userAbs(rel)
        const existed = await this.exists(abs)
        if (existed && !overwrite) { results.push({ ...item, status: 'exists', id: `user:${rel}` }); continue }
        await atomicWrite(abs, text)
        changed = true
        results.push({ ...item, status: existed ? 'overwritten' : 'created', id: `user:${rel}`, warnings: result.warnings.length })
      } catch (e) {
        results.push({ ...item, status: 'invalid', errors: [{ code: e.code || 'error', message: String(e && e.message || e) }] })
      }
    }
    if (changed) await this.load()
    return results
  }

  /** 导出全部：[{ name: 'user/te.yaml', data: Buffer, mtime }] */
  async exportEntries(filter) {
    const out = []
    for (const e of this.index.values()) {
      if (filter && !filter(e)) continue
      try {
        const data = await fsP.readFile(e.absPath)
        out.push({ name: `${e.source}/${e.relPath}`, data, mtime: e.mtime })
      } catch { /* 文件刚被删：跳过 */ }
    }
    return out
  }

  // ── fs.watch ──
  startWatch() {
    this.stopWatch()
    const roots = this.roots()
    for (const source of ['user', 'bundled']) {
      const root = roots[source]
      try {
        if (!fs.existsSync(root)) {
          if (source === 'user') fs.mkdirSync(root, { recursive: true })
          else continue
        }
        const w = fs.watch(root, { recursive: true, persistent: false }, () => this.scheduleReload())
        w.on('error', () => { /* 目录被删等：下次 reload 时重建 */ })
        this.watchers.push(w)
      } catch (e) {
        this.logger.warn && this.logger.warn(`dsh-process: watch ${root} failed: ${e && e.message}`)
      }
    }
  }

  stopWatch() {
    for (const w of this.watchers) { try { w.close() } catch {} }
    this.watchers = []
    if (this.debounceTimer) { clearTimeout(this.debounceTimer); this.debounceTimer = null }
  }

  scheduleReload() {
    if (this.debounceTimer) clearTimeout(this.debounceTimer)
    this.debounceTimer = setTimeout(() => { this.debounceTimer = null; void this.load() }, WATCH_DEBOUNCE_MS)
    if (typeof this.debounceTimer.unref === 'function') this.debounceTimer.unref()
  }

  /** 根目录变化后：重建 watcher + 重扫。 */
  async rerootAndReload() {
    this.startWatch()
    this.fingerprint = '' // 强制 revision++
    await this.load()
  }

  dispose() {
    this.stopWatch()
    this.listeners.clear()
  }
}

/** 引用库解析：目录名即名字。 */
async function collectDirNames(dirs) {
  const out = new Set()
  let any = false
  for (const dir of dirs) {
    try {
      const dirents = await fsP.readdir(dir, { withFileTypes: true })
      any = true
      for (const d of dirents) if (d.isDirectory() && !d.name.startsWith('.')) out.add(d.name)
    } catch { /* 库不存在 */ }
  }
  return any ? out : null
}

module.exports = { ProcessStore, StoreError, safeRel, safeName, safeDir, parseId, rewriteIdentity, collectDirNames, sha1, TRASH_DIR }
