import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseProcessYaml, validateProcess, extractMeta, skeletonYaml } from '../src/validate.js'

const MINIMAL = `
process:
  name: demo
  guid: 0b701417-8a5e-417f-97c0-1a8f74497e48
  display_name: 演示工艺
  version: 1.0.0
  complexity: light
phases:
  - id: p1
    name: 阶段一
    links:
      - id: a1
        name: 环节一
        prompt: 做事
        on_success: end
        on_gate_fail: break
`

test('valid minimal process: no errors', () => {
  const r = validateProcess(MINIMAL)
  assert.deepEqual(r.errors, [])
  assert.equal(r.meta.name, 'demo')
  assert.equal(r.meta.phaseCount, 1)
  assert.equal(r.meta.linkCount, 1)
})

test('syntax error carries line number', () => {
  const r = validateProcess('process: [破\n  name: :::\n')
  assert.equal(r.errors.length > 0, true)
  assert.equal(r.errors[0].code, 'yaml_syntax')
  assert.equal(r.errors[0].line, 1)
})

test('missing process.name and empty phases are errors', () => {
  const r = validateProcess('process:\n  display_name: x\nphases: []\n')
  assert.ok(r.errors.some((e) => e.code === 'missing_name'))
  assert.ok(r.errors.some((e) => e.code === 'missing_phases'))
})

test('duplicate link id is an error with line', () => {
  const r = validateProcess(MINIMAL + '      - id: a1\n        prompt: x\n')
  const dup = r.errors.find((e) => e.code === 'duplicate_link_id')
  assert.ok(dup)
  assert.equal(dup.line, 17)
})

test('dangling on_gate_fail / goto targets are errors', () => {
  const r = validateProcess(`
process:
  name: x
phases:
  - id: p
    links:
      - id: a
        prompt: x
        on_gate_fail: goto:nope
      - id: b
        prompt: x
        on_success: ghost
`)
  const codes = r.errors.map((e) => e.code)
  assert.ok(codes.includes('dangling_flow'))
  assert.equal(r.errors.filter((e) => e.code === 'dangling_flow').length, 2)
})

test('warnings: missing guid/version + unknown expert/skill (refs provided)', () => {
  const r = validateProcess(`
process:
  name: x
phases:
  - id: p
    links:
      - id: a
        prompt: x
        expert: 幽灵专家
        skills: [不存在技能]
`, { refs: { experts: new Set(['backend-architect']), skills: new Set(['real-skill']) } })
  const codes = r.warnings.map((w) => w.code)
  assert.ok(codes.includes('missing_guid'))
  assert.ok(codes.includes('missing_version'))
  assert.ok(codes.includes('unknown_expert'))
  assert.ok(codes.includes('unknown_skill'))
})

test('unknown expert is NOT flagged when refs absent', () => {
  const r = validateProcess(MINIMAL + '        expert: 任何人\n')
  assert.ok(!r.warnings.some((w) => w.code === 'unknown_expert'))
})

test('flow keywords next/end/break never dangling', () => {
  const r = validateProcess(MINIMAL.replace('on_success: end', 'on_success: next'))
  assert.deepEqual(r.errors, [])
})

test('skeleton parses cleanly and carries the name', () => {
  const yaml = skeletonYaml({ name: 'my-new', displayName: '我的新工艺', guid: '11111111-2222-3333-4444-555555555555' })
  const r = validateProcess(yaml)
  assert.deepEqual(r.errors, [])
  assert.equal(r.meta.name, 'my-new')
  assert.equal(r.meta.display_name, '我的新工艺')
})

test('extractMeta tolerates garbage', () => {
  assert.equal(extractMeta(undefined).name, '')
  assert.equal(extractMeta('text').phaseCount, 0)
})

test('parseProcessYaml returns doc even when broken', () => {
  const p = parseProcessYaml('a: [1, 2')
  assert.equal(p.syntaxErrors.length, 1)
  assert.equal(p.data, undefined)
})
