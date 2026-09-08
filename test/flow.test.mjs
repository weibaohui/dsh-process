import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
const m = createRequire(import.meta.url)('../client/index.js')
const { buildFlowModel, layoutFlowGraph } = m.__internals

const LINEAR = {
  process: { name: 'x' },
  phases: [
    { id: 'p1', links: [
      { id: 'a1', prompt: '', on_success: 'next' },
      { id: 'a2', prompt: '', on_success: 'end', gates: [{ name: 'g', min_score: 60 }], max_rework: 2 },
    ] },
  ],
}

const GOTO_BACK = {
  process: { name: 'y' },
  phases: [
    { id: 'p1', links: [
      { id: 's1', prompt: '', on_success: 'next', on_gate_fail: 's1' },
      { id: 's2', prompt: '', on_success: 'next', on_gate_fail: 'goto:s1' },
      { id: 's3', prompt: '', on_success: 'end', on_gate_fail: 'break' },
    ] },
  ],
}

test('buildFlowModel: 线性主干 + 门禁/返工元数据', () => {
  const m1 = buildFlowModel(LINEAR)
  assert.equal(m1.nodes.length, 2)
  assert.deepEqual(m1.edges.map((e) => e.from + '→' + e.to), ['__start→a1', 'a1→a2', 'a2→__end'])
  assert.equal(m1.nodes[1].gateMin, 60)
  assert.equal(m1.nodes[1].maxRework, 2)
  assert.deepEqual(m1.breaks, [])
})

test('buildFlowModel: goto 回边/自环/break 标注', () => {
  const m2 = buildFlowModel(GOTO_BACK)
  const kinds = m2.edges.map((e) => e.from + '→' + e.to + ':' + e.kind)
  assert.ok(kinds.includes('s1→s1:fail'), '自环 fail 边')       // on_gate_fail: s1
  assert.ok(kinds.includes('s2→s1:fail'), '回跳 fail 边')       // on_gate_fail: goto:s1
  assert.ok(kinds.includes('s3→__end:forward'))
  assert.ok(!kinds.includes('s3→s3:fail') && !kinds.includes('s3→__end:fail'), 'break 不连线')
  assert.deepEqual(m2.breaks.map((b) => b.linkId), ['s3'])
})

test('buildFlowModel: 悬空 goto 不产生边（校验器负责报错）', () => {
  const m3 = buildFlowModel({ process: { name: 'z' }, phases: [{ id: 'p', links: [{ id: 'a', prompt: '', on_success: 'ghost' }] }] })
  assert.ok(!m3.edges.some((e) => e.to === 'ghost'))
  assert.ok(m3.warnings.length > 0)
})

test('layoutFlowGraph: rank 顺序 + 回边识别', () => {
  const m2 = buildFlowModel(GOTO_BACK)
  const layout = layoutFlowGraph(m2)
  const r = (id) => layout.positions.get(id).x
  assert.ok(r('__start') < r('s1'))
  assert.ok(r('s1') < r('s2') && r('s2') < r('s3'))
  assert.ok(r('s3') < r('__end'))
  // s1→s1 自环、s2→s1 回边：都不参与分层
  assert.ok(layout.loops.has('s1→s1'))
  assert.ok(layout.backEdges.has('s2→s1'))
})

test('layoutFlowGraph: 分支跳转前向边分层', () => {
  const BRANCH = { process: { name: 'b' }, phases: [{ id: 'p', links: [
    { id: 'a', prompt: '', on_success: 'c' },
    { id: 'b', prompt: '', on_success: 'c' },
    { id: 'c', prompt: '', on_success: 'end' },
  ] }] }
  const m = buildFlowModel(BRANCH)
  const layout = layoutFlowGraph(m)
  const x = (id) => layout.positions.get(id).x
  assert.ok(x('a') < x('c') && x('b') < x('c'))
  assert.equal(x('a'), x('b'), 'a/b 同层并列（都只指向 c）')
})

test('buildFlowModel: 空坏输入返回 null', () => {
  assert.equal(buildFlowModel(null), null)
  assert.equal(buildFlowModel({}), null)
  assert.equal(buildFlowModel({ process: { name: 'x' }, phases: [] }), null)
})
