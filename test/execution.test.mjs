import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { RunStore, parseFlow, nextLinkAfter, firstLinkId, indexLinks } from '../src/runs.js'
import { ExecutionService, parseJudgeOutput } from '../src/execution.js'

const SNAP = {
  limits: {},
  phases: [
    { id: 'p1', name: '阶段一', links: [
      { id: 'a1', name: '环节一', prompt: '做 A', on_success: 'next', on_gate_fail: 'break' },
      { id: 'a2', name: '环节二', prompt: '做 B', gates: [{ name: '存在', type: 'ai_criteria_review', min_score: 60 }], on_success: 'end', on_gate_fail: 'a1', max_rework: 2 },
    ] },
    { id: 'p2', name: '阶段二', links: [
      { id: 'b1', prompt: '做 C', on_success: 'goto:a1' },
    ] },
  ],
}

test('parseFlow', () => {
  assert.equal(parseFlow('next'), 'next')
  assert.equal(parseFlow('end'), 'end')
  assert.equal(parseFlow('break'), 'break')
  assert.deepEqual(parseFlow('goto:a1'), { jump: 'a1' })
  assert.deepEqual(parseFlow('a1'), { jump: 'a1' })
  assert.equal(parseFlow(undefined), null)
  assert.equal(parseFlow(''), null)
})

test('firstLinkId / nextLinkAfter / indexLinks', () => {
  assert.equal(firstLinkId(SNAP), 'a1')
  assert.equal(nextLinkAfter(SNAP, 'a1'), 'a2')
  assert.equal(nextLinkAfter(SNAP, 'a2'), 'b1')       // 跨阶段
  assert.equal(nextLinkAfter(SNAP, 'b1'), null)       // 落到末尾
  assert.equal(indexLinks(SNAP).map.size, 3)
})

test('parseJudgeOutput: fenced / raw / garbage', () => {
  assert.deepEqual(parseJudgeOutput('```json\n{"score": 82, "reason": "ok"}\n```'), { score: 82, reason: 'ok' })
  assert.equal(parseJudgeOutput('结论 {"score": 120, "reason": "x"} 完').score, 100) // 钳到 100
  assert.deepEqual(parseJudgeOutput('完全无法解析'), { score: 0, reason: '评审输出无法解析，按不通过处理' })
})

/** 假宿主：agents.create 依序吐出预置回复的 agent。 */
function fakeCtx(responses) {
  let call = 0
  return {
    agents: {
      async create({ sessionId }) {
        const text = responses[Math.min(call++, responses.length - 1)]
        const agent = {
          session: { seq: 0, events: [], append() {} },
          followup() {
            this.session.events.push({ seq: ++this.session.seq, type: 'assistant/message', data: { message: { role: 'assistant', content: [{ type: 'text', text }] } } })
          },
          async whenIdle() {},
        }
        return { agent, sessionId }
      },
    },
    agentDefaultModel: { currentSelection: () => ({ provider: 'test', model: 'test-model' }) },
    workspaceRegistry: { get: () => undefined },
    sessions: {},
  }
}

function setup(responses, snapshot = SNAP) {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-prc-exec-'))
  const runs = new RunStore(join(dir, 'runs.json'), console)
  const execution = new ExecutionService({ ctx: fakeCtx(responses), runs, settings: { get: () => ({ userRoot: dir }) }, logger: console })
  const run = runs.create({ processId: 'user:x.yaml', processName: 'x', displayName: 'X 工艺', snapshotYaml: '', snapshot })
  return { runs, execution, run }
}

const SNAP_PLAIN = { limits: {}, phases: [
  { id: 'p1', name: '阶段一', links: [
    { id: 'a1', prompt: '做 A', on_success: 'next' },
    { id: 'a2', prompt: '做 B', on_success: 'next' },
  ] },
  { id: 'p2', name: '阶段二', links: [
    { id: 'b1', prompt: '做 C', on_success: 'end' },
  ] },
] }

test('driveLoop: 无门禁直通 → done', async () => {
  const { runs, execution, run } = setup(['A 报告', 'B 报告', 'C 报告'], SNAP_PLAIN)
  execution.tick()
  await execution.active.get(run.id)
  assert.equal(run.status, 'done')
  assert.deepEqual(run.trail.map((t) => t.linkId + ':' + t.status), ['a1:done', 'a2:done', 'b1:done'])
  assert.equal(run.stepCount, 3)
})

test('driveLoop: 门禁先挂后过 → 返工一轮后 done（goto 回跳）', async () => {
  const { runs, execution, run } = setup([
    'A',            // a1 会话
    'B',            // a2 会话
    '{"score": 30, "reason": "不够"}',     // a2 首次门禁裁判 → 不过 → goto:a1
    'A2',           // a1 会话（回跳）
    'B2',           // a2 返工会话
    '{"score": 90, "reason": "ok"}',     // a2 第二次裁判 → 过
  ])
  execution.tick()
  await execution.active.get(run.id)
  assert.equal(run.status, 'done', 'error=' + run.error)
  assert.equal(run.rework.a2, 1)
  const a2s = run.trail.filter((t) => t.linkId === 'a2')
  assert.equal(a2s.length, 2)
  assert.equal(a2s[0].status, 'gate_failed')
  assert.equal(a2s[0].gate.score, 30)
  assert.equal(a2s[1].status, 'done')
})

test('driveLoop: 门禁总不过 + on_gate_fail: break → awaiting，裁决 retry 后过', async () => {
  const { runs, execution, run } = setup(['A', 'B', '{"score": 10, "reason": "差"}', 'A2', 'B2', '{"score": 10, "reason": "差"}', 'A3', 'B3', '{"score": 10, "reason": "差"}', 'B4', '{"score": 99, "reason": "好"}'])
  execution.tick()
  await execution.active.get(run.id)
  assert.equal(run.status, 'awaiting')
  assert.equal(run.pendingBreak.linkId, 'a2')
  // 裁决：重试本环节（返工清零）→ 这次的裁判 99 → 过 → end
  execution.actionResolveBreak(run.id, 'retry')
  await execution.active.get(run.id)
  assert.equal(run.status, 'done', 'error=' + run.error)
})

test('driveLoop: 步数上限触发 capped_step', async () => {
  const { runs, execution, run } = setup(['A'])
  run.limits.maxStepExecutions = 2
  execution.tick()
  await execution.active.get(run.id)
  assert.equal(run.status, 'failed')
  assert.match(run.error, /max_step_executions/)
})

test('driveLoop: goto 环路依赖 on_gate_fail 缺省回跳自身', async () => {
  // b1 on_success: goto:a1；a1→a2（门禁 99 过）→end：环路可控
  const { runs, execution, run } = setup(['A', 'B', '{"score": 99, "reason": "好"}'])
  execution.tick()
  await execution.active.get(run.id)
  assert.equal(run.status, 'done', 'error=' + run.error)
})

test('pause / resume / stop 生命周期', async () => {
  const { runs, execution, run } = setup(['A', 'B'])
  runs.touch(run)
  execution.actionPause(run.id)
  assert.equal(run.status, 'paused')
  execution.actionResume(run.id)
  assert.ok(['queued', 'running'].includes(run.status))
  execution.actionStop(run.id)
  assert.equal(run.status, 'stopped')
  await assert.rejects(async () => { execution.actionResume(run.id) }, /invalid_transition/)
})

test('RunStore 持久化 round-trip + 重启恢复 paused', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-prc-store-'))
  const file = join(dir, 'runs.json')
  const runs1 = new RunStore(file, console)
  const r = runs1.create({ processId: 'p', processName: 'p', displayName: 'P', snapshotYaml: '', snapshot: SNAP })
  r.status = 'running'
  runs1.touch(r)
  await runs1.persistNow()
  const runs2 = new RunStore(file, console)
  await runs2.load()
  const loaded = runs2.get(r.id)
  assert.equal(loaded.status, 'paused')
  assert.match(loaded.error, /宿主重启/)
  assert.equal(loaded.trail.length, 0)
})
