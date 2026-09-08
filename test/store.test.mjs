import { test, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { ProcessStore, StoreError, safeRel, safeName, rewriteIdentity } from '../src/store.js'

const GOOD = (name, linkId = 'a1') => `
process:
  name: ${name}
  guid: 11111111-2222-3333-4444-555555555555
  display_name: ${name} 工艺
  version: 1.0.0
phases:
  - id: p1
    links:
      - id: ${linkId}
        prompt: 做事
        on_success: end
`

function makeStore() {
  const root = mkdtempSync(join(tmpdir(), 'dsh-prc-test-'))
  const user = join(root, 'user')
  const bundled = join(root, 'bundled')
  mkdirSync(user, { recursive: true })
  mkdirSync(join(bundled, 'software'), { recursive: true })
  writeFileSync(join(user, 'mine.yaml'), GOOD('mine'))
  const bunYaml = GOOD('bun').replace('11111111-2222-3333-4444-555555555555', '99999999-8888-7777-6666-555555555555')
  writeFileSync(join(bundled, 'software', 'bun.yaml'), bunYaml)
  const store = new ProcessStore({ roots: () => ({ user, bundled }), refs: async () => ({ experts: null, skills: null }), logger: console })
  return { store, user, bundled, root }
}

test('safeRel / safeName reject traversal and dot dirs', () => {
  assert.throws(() => safeRel('../etc/passwd.yaml'), StoreError)
  assert.throws(() => safeRel('.trash/x.yaml'), StoreError)
  assert.throws(() => safeRel('a//b.yaml'), StoreError)
  assert.throws(() => safeRel('a.txt'), StoreError)
  assert.throws(() => safeName('.hidden'), StoreError)
  assert.throws(() => safeName('a/b'), StoreError)
  assert.equal(safeName('ok-name'), 'ok-name')
  assert.equal(safeRel('software/a.yaml'), 'software/a.yaml')
})

test('scan indexes both roots with source-prefixed ids', async () => {
  const { store } = makeStore()
  await store.load()
  const snap = store.snapshot()
  assert.deepEqual(snap.processes.map((p) => p.id).sort(), ['bundled:software/bun.yaml', 'user:mine.yaml'])
  assert.equal(snap.processes[0].source, 'user')
})

test('revision bumps only when fingerprint changes', async () => {
  const { store, user } = makeStore()
  await store.load()
  const rev1 = store.revision
  await store.load()
  assert.equal(store.revision, rev1)
  writeFileSync(join(user, 'mine.yaml'), GOOD('mine', 'a2'))
  await store.load()
  assert.equal(store.revision, rev1 + 1)
})

test('get returns yaml + hash; missing id throws not_found', async () => {
  const { store } = makeStore()
  await store.load()
  const item = await store.get('user:mine.yaml')
  assert.equal(item.meta.name, 'mine')
  assert.ok(item.hash.length >= 8)
  await assert.rejects(() => store.get('user:nope.yaml'), (e) => e.code === 'not_found')
})

test('save create/update/copy + conflict + exists + invalid + readonly', async () => {
  const { store, bundled, user } = makeStore()
  await store.load()

  const created = await store.save({ mode: 'create', name: 'fresh', yaml: GOOD('fresh') })
  assert.equal(created.id, 'user:fresh.yaml')

  await assert.rejects(() => store.save({ mode: 'create', name: 'fresh', yaml: GOOD('fresh') }), (e) => e.code === 'exists')
  await assert.rejects(() => store.save({ mode: 'create', name: 'bad', yaml: 'phases: []' }), (e) => e.code === 'invalid' && e.diagnostics.errors.length > 0)

  const cur = await store.get('user:fresh.yaml')
  const updated = await store.save({ mode: 'update', id: 'user:fresh.yaml', yaml: GOOD('fresh', 'zz9'), baseHash: cur.hash })
  assert.notEqual(updated.hash, cur.hash)
  await assert.rejects(() => store.save({ mode: 'update', id: 'user:fresh.yaml', yaml: GOOD('fresh'), baseHash: cur.hash }), (e) => e.code === 'conflict' && typeof e.currentHash === 'string')

  const copied = await store.save({ mode: 'copy', fromId: 'bundled:software/bun.yaml', name: 'bun-copy' })
  assert.equal(copied.id, 'user:bun-copy.yaml')
  const copyText = readFileSync(join(user, 'bun-copy.yaml'), 'utf8')
  assert.match(copyText, /name: bun-copy/)
  const srcText = readFileSync(join(bundled, 'software', 'bun.yaml'), 'utf8')
  const guidOf = (t) => (t.match(/guid: (\S+)/) || [])[1]
  assert.notEqual(guidOf(copyText), guidOf(srcText))

  await assert.rejects(() => store.save({ mode: 'update', id: 'bundled:software/bun.yaml', yaml: GOOD('x') }), (e) => e.code === 'readonly')
})

test('rename moves file and rewrites process.name', async () => {
  const { store, user } = makeStore()
  await store.load()
  const r = await store.rename('user:mine.yaml', 'renamed')
  assert.equal(r.id, 'user:renamed.yaml')
  assert.ok(!existsSync(join(user, 'mine.yaml')))
  assert.match(readFileSync(join(user, 'renamed.yaml'), 'utf8'), /name: renamed/)
  await assert.rejects(() => store.rename('bundled:software/bun.yaml', 'x'), (e) => e.code === 'readonly')
})

test('remove moves into .trash and hides it from listing', async () => {
  const { store, user } = makeStore()
  await store.load()
  const r = await store.remove('user:mine.yaml')
  assert.match(r.trashed, /^\.trash\/mine-.*\.yaml$/)
  assert.ok(!existsSync(join(user, 'mine.yaml')))
  assert.ok(readdirSync(join(user, '.trash')).some((f) => f.startsWith('mine-')))
  assert.deepEqual(store.snapshot().processes.filter((p) => p.source === 'user'), [])
})

test('importFiles: created / exists / invalid / overwrite', async () => {
  const { store, user } = makeStore()
  await store.load()
  const files = [
    { name: 'new-one.yaml', content: GOOD('new-one') },
    { name: 'mine.yaml', content: GOOD('mine') },
    { name: 'broken.yaml', content: 'process: [' },
    { name: 'sub/dir.yaml', content: GOOD('dir') },
  ]
  const r1 = await store.importFiles(files)
  const byName = Object.fromEntries(r1.map((r) => [r.name, r.status]))
  assert.equal(byName['new-one.yaml'], 'created')
  assert.equal(byName['mine.yaml'], 'exists')
  assert.equal(byName['broken.yaml'], 'invalid')
  assert.equal(byName['sub/dir.yaml'], 'created')
  assert.ok(existsSync(join(user, 'sub', 'dir.yaml')))
  const r2 = await store.importFiles(files, { overwrite: true })
  const byName2 = Object.fromEntries(r2.map((r) => [r.name, r.status]))
  assert.equal(byName2['mine.yaml'], 'overwritten')
  assert.equal(byName2['new-one.yaml'], 'overwritten')
})

test('exportEntries returns both sources with buffers', async () => {
  const { store } = makeStore()
  await store.load()
  const all = await store.exportEntries()
  assert.equal(all.length, 2)
  assert.ok(all.every((e) => Buffer.isBuffer(e.data) && e.name.includes('/')))
  const onlyUser = await store.exportEntries((e) => e.source === 'user')
  assert.equal(onlyUser.length, 1)
})

test('watch: external write triggers reload + emit', async () => {
  const { store, user } = makeStore()
  let events = 0
  store.subscribe(() => { events++ })
  store.startWatch()
  await store.load()
  const revBefore = store.revision
  writeFileSync(join(user, 'watched.yaml'), GOOD('watched'))
  await new Promise((r) => setTimeout(r, 2500))
  assert.equal(store.revision, revBefore + 1)
  assert.ok(events >= 1)
  assert.ok(store.find('watched'))
  store.stopWatch()
})

test('find resolves id / name / guid / display_name', async () => {
  const { store } = makeStore()
  await store.load()
  assert.equal(store.find('user:mine.yaml').name, 'mine')
  assert.equal(store.find('mine').name, 'mine')
  assert.equal(store.find('99999999-8888-7777-6666-555555555555').source, 'bundled')
  assert.equal(store.find('bun 工艺').name, 'bun')
  assert.equal(store.find('missing-thing'), undefined)
})

test('rewriteIdentity keeps comments and unknown keys', () => {
  const src = '# 顶部注释\nprocess:\n  name: old  # 行内注释\n  custom_key: keep-me\nphases: []\n'
  const out = rewriteIdentity(src, { name: 'new' })
  assert.match(out, /name: new/)
  assert.match(out, /# 顶部注释/)
  assert.match(out, /# 行内注释/)
  assert.match(out, /custom_key: keep-me/)
})
