import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { collectWriteOps, resolveArtifactEntries, readArtifactText, diffHunkStat, countLines, inside } from '../src/artifacts.js'

function tmpRoot() { return mkdtempSync(join(tmpdir(), 'dsh-prc-art-')) }

test('countLines / diffHunkStat：上下文行不计入 +/−', () => {
  assert.equal(countLines('a\nb\n'), 2)
  assert.equal(countLines(''), 0)
  assert.equal(countLines(undefined), 0)
  // oldText/newText 共享上下文行（首尾），中段才是真实改动
  const st = diffHunkStat('ctx1\nold\nctx2', 'ctx1\nnew1\nnew2\nctx2')
  assert.equal(st.deletions, 1)
  assert.equal(st.additions, 2)
  assert.deepEqual(st.del, ['old'])
  assert.deepEqual(st.add, ['new1', 'new2'])
  assert.deepEqual(st.ctx, ['ctx1']) // 前缀 1 行 + 后缀 1 行
})

test('collectWriteOps：write/edit 走 meta.diffs，write 新文件回退参数，editor 走参数，bash 不追踪', () => {
  let seq = 0
  const ev = (type, data) => ({ seq: ++seq, type, data })
  const events = [
    ev('tool/call', { callId: 'c1', name: 'write', arguments: JSON.stringify({ file_path: 'docs/new.md', content: 'l1\nl2\nl3' }) }),
    ev('tool/result', { message: { content: [{ type: 'tool-result', toolCallId: 'c1' }] }, meta: { diffs: [] } }), // 新文件：diffs 空
    ev('tool/call', { callId: 'c2', name: 'edit', arguments: '{}' }),
    ev('tool/result', { message: { content: [{ type: 'tool-result', toolCallId: 'c2' }] }, meta: { diffs: [{ path: 'docs/new.md', oldText: 'l3\nctx', newText: 'L3\nctx' }] } }),
    ev('tool/call', { callId: 'c3', name: 'str-replace-editor', arguments: JSON.stringify({ command: 'create', path: 'src/a.ts', file_text: 'x\ny' }) }),
    ev('tool/result', { message: { content: [{ type: 'tool-result', toolCallId: 'c3' }] } }), // 无 meta
    ev('tool/call', { callId: 'c4', name: 'str-replace-editor', arguments: JSON.stringify({ command: 'str_replace', path: 'src/a.ts', old_str: 'x', new_str: 'xx\nyy' }) }),
    ev('tool/result', { message: { content: [{ type: 'tool-result', toolCallId: 'c4' }] } }),
    ev('tool/call', { callId: 'c5', name: 'str-replace-editor', arguments: JSON.stringify({ command: 'view', path: 'src/a.ts' }) }),
    ev('tool/result', { message: { content: [{ type: 'tool-result', toolCallId: 'c5' }] } }), // 只读不计
    ev('tool/call', { callId: 'c6', name: 'bash', arguments: '{"command":"echo hi > f.txt"}' }),
    ev('tool/result', { message: { content: [{ type: 'tool-result', toolCallId: 'c6' }] }, meta: { diffs: [{ path: 'f.txt', oldText: '', newText: 'hi' }] } }), // bash 不追踪
    ev('tool/result', { message: { content: [{ type: 'tool-result', toolCallId: 'ghost' }] }, meta: { diffs: [{ path: 'ghost.md', oldText: '', newText: 'x' }] } }), // 无配对
  ]
  const files = collectWriteOps(events, 0)
  assert.equal(files.size, 2)
  const md = files.get('docs/new.md')
  assert.equal(md.additions, 4) // 新文件 3 行 + edit +1
  assert.equal(md.deletions, 1)
  assert.match(md.diff.join('\n'), /@@ docs\/new\.md（新文件）@@/)
  assert.match(md.diff.join('\n'), /-l3/)
  assert.match(md.diff.join('\n'), /\+L3/)
  const ts = files.get('src/a.ts')
  assert.equal(ts.additions, 4) // create 2 行 + str_replace +2
  assert.equal(ts.deletions, 1)
  assert.match(ts.diff.join('\n'), /\+xx/)
  assert.equal(files.get('f.txt'), undefined)
})

test('collectWriteOps：firstSeq 过滤早于本次 followup 的事件', () => {
  const files = collectWriteOps([
    { seq: 1, type: 'tool/call', data: { callId: 'c1', name: 'write', arguments: '{"file_path":"old.md","content":"a"}' } },
    { seq: 2, type: 'tool/result', data: { message: { content: [{ type: 'tool-result', toolCallId: 'c1' }] }, meta: { diffs: [] } } },
    { seq: 3, type: 'tool/call', data: { callId: 'c2', name: 'write', arguments: '{"file_path":"new.md","content":"a"}' } },
    { seq: 4, type: 'tool/result', data: { message: { content: [{ type: 'tool-result', toolCallId: 'c2' }] }, meta: { diffs: [] } } },
  ], 3)
  assert.equal(files.size, 1)
  assert.ok(files.has('new.md'))
})

test('resolveArtifactEntries：解析到 cwd、过滤越界、stat 出存在性', async () => {
  const cwd = tmpRoot()
  writeFileSync(join(cwd, 'a.md'), 'hello')
  const written = new Map([
    ['a.md', { additions: 5, deletions: 0, diff: ['@@ a.md @@', '+hello'] }],
    ['docs/b.md', { additions: 1, deletions: 2, diff: [] }],
    ['../evil.md', { additions: 1, deletions: 0, diff: [] }],
  ])
  const entries = await resolveArtifactEntries({ cwd, written })
  const byPath = new Map(entries.map((e) => [e.path, e]))
  assert.equal(entries.length, 2)
  assert.equal(byPath.get('a.md').exists, true)
  assert.equal(byPath.get('a.md').size, 5)
  assert.equal(byPath.get('a.md').additions, 5)
  assert.match(byPath.get('a.md').diff, /\+hello/)
  assert.equal(byPath.get('docs/b.md').exists, false)
  assert.equal(byPath.get('../evil.md'), undefined)
})

test('readArtifactText：内容 + diffstat 透传，白名单与越界拒绝', async () => {
  const cwd = tmpRoot()
  writeFileSync(join(cwd, 'a.md'), '第一行\n第二行')
  writeFileSync(join(cwd, 'bin.dat'), Buffer.from([0x00, 0x01]))
  const artifacts = await resolveArtifactEntries({ cwd, written: new Map([
    ['a.md', { additions: 2, deletions: 1, diff: '@@ a.md @@\n-旧\n+第一行\n+第二行' }],
    ['bin.dat', { additions: 1, deletions: 0, diff: '' }],
  ]) })
  const text = await readArtifactText({ cwd, artifacts, path: 'a.md' })
  assert.equal(text.content, '第一行\n第二行')
  assert.equal(text.binary, false)
  assert.equal(text.additions, 2)
  assert.equal(text.deletions, 1)
  assert.match(text.diff, /\+第二行/)

  const bin = await readArtifactText({ cwd, artifacts, path: 'bin.dat' })
  assert.equal(bin.binary, true)
  assert.equal(bin.content, undefined)

  await assert.rejects(() => readArtifactText({ cwd, artifacts, path: 'secrets.md' }), (e) => e.code === 'not_found')
  await assert.rejects(() => readArtifactText({ cwd, artifacts: [{ path: '../evil.md', exists: true }], path: '../evil.md' }), (e) => e.code === 'invalid_path')
})

test('inside：cwd 本身在内，兄弟目录不在', () => {
  const cwd = tmpRoot()
  assert.equal(inside(cwd, cwd), true)
  assert.equal(inside(cwd, join(cwd, 'a', 'b.txt')), true)
  assert.equal(inside(cwd, cwd + '-sibling/x'), false)
})
