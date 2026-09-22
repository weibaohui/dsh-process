'use strict'

/**
 * dsh-process — 产物收集（v0.5.2，观察制）。
 *
 * 只认会话里真实发生的文件写操作，不看工艺声明：
 * - write / edit：tool/result 的 meta.diffs 带 hunk（{path, oldText, newText}，
 *   上下文行同时出现在 old/new 里；write 新建文件时 diffs 为空数组）
 * - str-replace-editor：结果不带 meta，从调用参数推（create / str_replace / insert；
 *   view 只读不算）
 *
 * 每路径累计 +行/-行（git diffstat 口径，上下文行不计）与 diff 文本块（超限截断）；
 * 台账条目 {path, additions, deletions, diff, exists, size, mtime}。
 * 预览 /run-file 双重白名单：路径必须在产物列表内，且解析后必须落在运行工作区内。
 */

const fsP = require('node:fs/promises')
const path = require('node:path')
const { StoreError } = require('./store.js')

/** 单次尝试最多记录的文件数 / 单文件 diff 文本上限 / 预览读取上限。 */
const MAX_FILES = 50
const MAX_DIFF_CHARS = 16 * 1024
const READ_MAX_BYTES = 1024 * 1024

/** 会写文件的工具 → 路径所在参数字段。 */
const WRITE_TOOLS = {
  write: ['file_path'],
  edit: ['file_path'],
  'str-replace-editor': ['path'],
}

function countLines(text) {
  const s = String(text ?? '')
  if (s === '') return 0
  const lines = s.split('\n')
  if (lines[lines.length - 1] === '') lines.pop()
  return lines.length
}

function parseArgs(raw) {
  try {
    const v = JSON.parse(String(raw || '{}'))
    return v && typeof v === 'object' ? v : {}
  } catch { return {} }
}

/** 结果 meta → hunk 列表；meta 缺席返回 null（区别于空数组）。 */
function hunkListFromMeta(meta) {
  if (!meta || typeof meta !== 'object' || !Array.isArray(meta.diffs)) return null
  return meta.diffs.filter((h) => h && typeof h === 'object' && typeof h.path === 'string')
}

/**
 * hunk 的 oldText/newText 共享上下文行：去掉公共前后缀后，
 * 剩下的 old 行即删除、new 行即新增（git diffstat 口径）。
 */
function diffHunkStat(oldText, newText) {
  const o = String(oldText ?? '').split('\n')
  const n = String(newText ?? '').split('\n')
  let pre = 0
  while (pre < o.length && pre < n.length && o[pre] === n[pre]) pre++
  let suf = 0
  while (suf < o.length - pre && suf < n.length - pre && o[o.length - 1 - suf] === n[n.length - 1 - suf]) suf++
  return {
    additions: n.length - pre - suf,
    deletions: o.length - pre - suf,
    del: o.slice(pre, o.length - suf),
    add: n.slice(pre, n.length - suf),
    ctx: o.slice(0, pre),
  }
}

/** 一个 hunk → diff 文本块（带少量上下文，git 风格 -/+ 前缀）。 */
function formatHunk(p, st) {
  const lines = [`@@ ${p} @@`]
  const ctx = st.ctx || []
  if (ctx.length > 2) {
    lines.push('  ' + ctx[0])
    if (ctx.length > 3) lines.push('  ⋯')
    lines.push('  ' + ctx[ctx.length - 1])
  } else for (const l of ctx) lines.push('  ' + l)
  for (const l of st.del) lines.push('-' + l)
  for (const l of st.add) lines.push('+' + l)
  return lines.join('\n')
}

/** 新文件整体 → diff 文本块（前 40 行）。 */
function formatWholeNew(p, content) {
  const lines = String(content ?? '').split('\n')
  if (lines[lines.length - 1] === '') lines.pop()
  const head = lines.slice(0, 40).map((l) => '+' + l)
  if (lines.length > 40) head.push(`+⋯（共 ${lines.length} 行）`)
  return `@@ ${p}（新文件）@@\n` + head.join('\n')
}

/**
 * 会话事件 → 每文件写操作累计 Map<rawPath, {additions, deletions, diff[]}。
 * tool/call 记 callId，tool/result 按 message.content[0].toolCallId 配对：
 * 有 meta.diffs 逐 hunk 统计（write 新文件 diffs 为空 → 参数 content 全计 +）；
 * str-replace-editor 无 meta → 从参数推。
 */
function collectWriteOps(events, firstSeq) {
  const calls = new Map()
  const files = new Map()
  const note = (p, additions, deletions, block) => {
    if (!p || typeof p !== 'string') return
    if (!files.has(p)) {
      if (files.size >= MAX_FILES) return
      files.set(p, { additions: 0, deletions: 0, diff: [] })
    }
    const acc = files.get(p)
    acc.additions += additions
    acc.deletions += deletions
    if (block && acc.diff.join('\n').length < MAX_DIFF_CHARS) acc.diff.push(block)
  }
  for (const ev of events || []) {
    if (!ev || ev.seq < firstSeq) continue
    const d = ev.data || {}
    if (ev.type === 'tool/call') {
      if (d.callId) calls.set(d.callId, { name: d.name, arguments: d.arguments })
    } else if (ev.type === 'tool/result') {
      const block = Array.isArray(d.message && d.message.content) ? d.message.content[0] : undefined
      const call = block && block.toolCallId ? calls.get(block.toolCallId) : undefined
      if (!call || !WRITE_TOOLS[call.name]) continue
      const hunks = hunkListFromMeta(d.meta)
      if (hunks) {
        for (const h of hunks) {
          const st = diffHunkStat(h.oldText, h.newText)
          note(h.path, st.additions, st.deletions, formatHunk(h.path, st))
        }
        if (hunks.length > 0 || call.name !== 'write') continue
        const args = parseArgs(call.arguments)
        const content = typeof args.content === 'string' ? args.content : ''
        note(args.file_path, countLines(content), 0, formatWholeNew(String(args.file_path || ''), content))
      } else if (call.name === 'str-replace-editor') {
        const args = parseArgs(call.arguments)
        const p = typeof args.path === 'string' ? args.path : ''
        if (args.command === 'create') {
          const text = typeof args.file_text === 'string' ? args.file_text : ''
          note(p, countLines(text), 0, formatWholeNew(p, text))
        } else if (args.command === 'str_replace') {
          const st = diffHunkStat(String(args.old_str ?? ''), String(args.new_str ?? ''))
          note(p, st.additions, st.deletions, formatHunk(p, st))
        } else if (args.command === 'insert') {
          const text = typeof args.new_str === 'string' ? args.new_str : ''
          note(p, countLines(text), 0, formatHunk(p, { add: text === '' ? [] : text.split('\n'), del: [], ctx: [] }))
        }
      }
    }
  }
  return files
}

/** abs 是否落在 cwd 内（含 cwd 本身）。 */
function inside(cwd, abs) {
  return abs === cwd || abs.startsWith(cwd + path.sep)
}

/** 显示路径：cwd 内相对化，否则原样（绝对路径）。 */
function displayPath(cwd, abs) {
  const rel = path.relative(cwd, abs)
  return rel !== '' && !rel.startsWith('..') ? rel : abs
}

/**
 * 写操作累计 → 产物条目（解析到 cwd、过滤越界、逐个 stat）。
 * @returns Array<{ name, path, source:'written', additions, deletions, diff, exists, size?, mtime? }>
 */
async function resolveArtifactEntries({ cwd, written }) {
  const list = []
  for (const [raw, acc] of written instanceof Map ? written : []) {
    const abs = path.resolve(cwd, raw)
    if (!inside(cwd, abs)) continue
    const diffText = Array.isArray(acc.diff) ? acc.diff.join('\n') : String(acc.diff ?? '')
    const entry = {
      name: path.basename(abs),
      path: displayPath(cwd, abs),
      source: 'written',
      additions: acc.additions,
      deletions: acc.deletions,
      diff: diffText.slice(0, MAX_DIFF_CHARS),
    }
    try {
      const st = await fsP.stat(abs)
      entry.exists = true
      entry.size = st.size
      entry.mtime = st.mtimeMs
    } catch { entry.exists = false }
    list.push(entry)
  }
  return list
}

/**
 * 读取一个产物（文本预览 + 变更统计透传）。白名单双重校验：
 * 1. path 必须与该运行产物列表中的记录完全一致；
 * 2. 解析后的绝对路径必须落在 cwd 内。
 */
async function readArtifactText({ cwd, artifacts, path: p, maxBytes = READ_MAX_BYTES }) {
  const entry = (Array.isArray(artifacts) ? artifacts : []).find((a) => a && a.path === p)
  if (!entry) throw new StoreError('not_found', '该路径不在本运行的产物列表中')
  if (!entry.exists) throw new StoreError('not_found', '文件不存在或尚未生成')
  const abs = path.resolve(cwd, entry.path)
  if (!inside(cwd, abs)) throw new StoreError('invalid_path', '路径越界')
  const st = await fsP.stat(abs)
  if (!st.isFile()) throw new StoreError('invalid_path', '不是常规文件')
  const fh = await fsP.open(abs, 'r')
  try {
    const len = Math.min(st.size, maxBytes + 1)
    const buf = Buffer.alloc(len)
    await fh.read(buf, 0, len, 0)
    const truncated = st.size > maxBytes
    const view = buf.subarray(0, Math.min(len, maxBytes))
    const binary = view.includes(0)
    return {
      path: entry.path, name: entry.name, size: st.size, mtime: st.mtimeMs,
      truncated, binary,
      content: binary ? undefined : view.toString('utf8'),
      additions: entry.additions, deletions: entry.deletions, diff: entry.diff,
    }
  } finally { await fh.close() }
}

module.exports = {
  collectWriteOps, resolveArtifactEntries, readArtifactText,
  countLines, diffHunkStat, inside, WRITE_TOOLS, MAX_DIFF_CHARS, READ_MAX_BYTES,
}
