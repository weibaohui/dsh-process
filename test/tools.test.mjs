import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { ProcessStore } from '../src/store.js'
import { registerTools, outlineOf } from '../src/tools.js'
import { sendError } from '../src/routes.js'
import { StoreError } from '../src/store.js'

const GOOD = (name) => `
process:
  name: ${name}
  guid: 11111111-2222-3333-4444-555555555555
  display_name: ${name} 工艺
  version: 1.0.0
  complexity: light
phases:
  - id: p1
    name: 阶段
    acceptance_criteria: 有产出
    links:
      - id: a1
        name: 环节一
        prompt: 做事
        executor: atomcode
        expert_name: backend-architect
        skills: [some-skill]
        gates: [{ name: 存在, type: ai_criteria_review, min_score: 60 }]
        on_success: end
        on_gate_fail: break
        max_rework: 2
`

function makeStore() {
  const root = mkdtempSync(join(tmpdir(), 'dsh-prc-tools-'))
  const user = join(root, 'user')
  mkdirSync(user, { recursive: true })
  writeFileSync(join(user, 'demo.yaml'), GOOD('demo'))
  const store = new ProcessStore({ roots: () => ({ user, bundled: join(root, 'bundled') }), refs: async () => ({ experts: null, skills: null }), logger: console })
  return { store, user }
}

function captureTools() {
  const tools = new Map()
  return { service: { register: (t) => { tools.set(t.name, t); return () => {} } }, tools }
}

test('registerTools registers the four process_* tools', async () => {
  const { store } = makeStore()
  const { service, tools } = captureTools()
  registerTools(service, { store })
  assert.deepEqual([...tools.keys()].sort(), ['process_get', 'process_list', 'process_save', 'process_validate'])
  for (const t of tools.values()) {
    assert.equal(typeof t.execute, 'function')
    assert.equal(typeof t.output.render, 'function')
    assert.equal(t.parameters.type, 'object')
  }
})

test('process_list returns compact summaries and filters', async () => {
  const { store } = makeStore()
  const { service, tools } = captureTools()
  registerTools(service, { store })
  const r = await tools.get('process_list').execute({})
  assert.equal(r.count, 1)
  assert.equal(r.processes[0].name, 'demo')
  assert.equal(r.processes[0].complexity, 'light')
  assert.equal((await tools.get('process_list').execute({ query: '不存在的' })).count, 0)
})

test('process_get summary includes outline; yaml format returns text', async () => {
  const { store } = makeStore()
  const { service, tools } = captureTools()
  registerTools(service, { store })
  const s = await tools.get('process_get').execute({ ref: 'demo' })
  assert.equal(s.outline[0].id, 'p1')
  assert.equal(s.outline[0].links[0].executor, 'atomcode')
  assert.equal(s.outline[0].links[0].gates[0], '存在')
  const y = await tools.get('process_get').execute({ ref: 'demo', format: 'yaml' })
  assert.match(y.yaml, /name: demo/)
  await assert.rejects(() => tools.get('process_get').execute({ ref: 'ghost' }), /not_found/)
})

test('process_validate reports ok/errors', async () => {
  const { store } = makeStore()
  const { service, tools } = captureTools()
  registerTools(service, { store })
  assert.equal((await tools.get('process_validate').execute({ yaml: GOOD('v') })).ok, true)
  const bad = await tools.get('process_validate').execute({ yaml: 'phases: []' })
  assert.equal(bad.ok, false)
  assert.ok(bad.errors.some((e) => e.code === 'missing_phases'))
})

test('process_save: create / duplicate rejected / overwrite / invalid', async () => {
  const { store } = makeStore()
  const { service, tools } = captureTools()
  registerTools(service, { store })
  const r1 = await tools.get('process_save').execute({ name: 'agent-made', yaml: GOOD('agent-made') })
  assert.equal(r1.id, 'user:agent-made.yaml')
  await assert.rejects(() => tools.get('process_save').execute({ name: 'agent-made', yaml: GOOD('agent-made') }), /exists/)
  const r2 = await tools.get('process_save').execute({ name: 'agent-made', yaml: GOOD('agent-made', 'b2'), overwrite: true })
  assert.equal(r2.id, 'user:agent-made.yaml')
  await assert.rejects(() => tools.get('process_save').execute({ name: 'bad', yaml: 'phases: []' }), /invalid/)
})

test('sendError maps codes to HTTP status', () => {
  const codes = [['invalid', 400], ['not_found', 404], ['conflict', 409], ['exists', 409], ['readonly', 403], ['unavailable', 503], ['whatever', 500]]
  for (const [code, status] of codes) {
    let captured
    const res = { writeHead: (s) => { captured = s }, end: () => {} }
    sendError(res, new StoreError(code, 'msg'))
    assert.equal(captured, status)
  }
})

test('outlineOf tolerates junk', () => {
  assert.deepEqual(outlineOf(undefined), [])
  assert.deepEqual(outlineOf('text'), [])
})
