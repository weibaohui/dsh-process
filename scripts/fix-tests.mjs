import { readFileSync, writeFileSync } from 'node:fs'
let s = readFileSync('test/execution.test.mjs', 'utf8')
const must = (c, m) => { if (!c) { console.error('ANCHOR FAIL: ' + m); process.exit(1) } }

const SNAP_PLAIN = `const SNAP_PLAIN = { limits: {}, phases: [
  { id: 'p1', name: '阶段一', links: [
    { id: 'a1', prompt: '做 A', on_success: 'next' },
    { id: 'a2', prompt: '做 B', on_success: 'end' },
  ] },
  { id: 'p2', name: '阶段二', links: [
    { id: 'b1', prompt: '做 C', on_success: 'end' },
  ] },
] }

test('driveLoop: 无门禁直通 → done', async () => {
  const { runs, execution, run } = setup(['A 报告', 'B 报告', 'C 报告'], SNAP_PLAIN)`

must(s.includes(`test('driveLoop: 无门禁直通 → done', async () => {
  const { runs, execution, run } = setup(['A 报告', 'B 报告', 'C 报告'])`), 'test1')
s = s.replace(`test('driveLoop: 无门禁直通 → done', async () => {
  const { runs, execution, run } = setup(['A 报告', 'B 报告', 'C 报告'])`, SNAP_PLAIN)

must(s.includes('function setup(responses) {'), 'setup')
s = s.replace(`function setup(responses) {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-prc-exec-'))
  const runs = new RunStore(join(dir, 'runs.json'), console)
  const execution = new ExecutionService({ ctx: fakeCtx(responses), runs, settings: { get: () => ({ userRoot: dir }) }, logger: console })
  const run = runs.create({ processId: 'user:x.yaml', processName: 'x', displayName: 'X 工艺', snapshotYaml: '', snapshot: SNAP })
  return { runs, execution, run }
}`, `function setup(responses, snapshot = SNAP) {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-prc-exec-'))
  const runs = new RunStore(join(dir, 'runs.json'), console)
  const execution = new ExecutionService({ ctx: fakeCtx(responses), runs, settings: { get: () => ({ userRoot: dir }) }, logger: console })
  const run = runs.create({ processId: 'user:x.yaml', processName: 'x', displayName: 'X 工艺', snapshotYaml: '', snapshot })
  return { runs, execution, run }
}`)

must(s.includes(`  const { runs, execution, run } = setup([
    'A',            // a1 会话
    'B',            // a2 会话
    'score 30',     // a2 首次门禁裁判 → 不过
    'B 重做',       // a2 返工会话
    'score 90',     // a2 第二次裁判 → 过
  ])`), 'test2')
s = s.replace(`  const { runs, execution, run } = setup([
    'A',            // a1 会话
    'B',            // a2 会话
    'score 30',     // a2 首次门禁裁判 → 不过
    'B 重做',       // a2 返工会话
    'score 90',     // a2 第二次裁判 → 过
  ])`, `  const { runs, execution, run } = setup([
    'A',            // a1 会话
    'B',            // a2 会话
    'score 30',     // a2 首次门禁裁判 → 不过 → goto:a1
    'A2',           // a1 会话（回跳）
    'B2',           // a2 返工会话
    'score 90',     // a2 第二次裁判 → 过
  ])`)

must(s.includes("setup(['A', 'score 10', 'score 10', 'score 10', 'score 10', 'score 99'])"), 'test3')
s = s.replace("setup(['A', 'score 10', 'score 10', 'score 10', 'score 10', 'score 99'])",
  "setup(['A', 'B', 'score 10', 'A2', 'B2', 'score 10', 'A3', 'B3', 'score 10', 'B4', 'score 99'])")

must(s.includes("setup(['A', 'B?', 'judge99', 'A2', 'B?', 'judge99'])"), 'test5')
s = s.replace("setup(['A', 'B?', 'judge99', 'A2', 'B?', 'judge99'])", "setup(['A', 'B', 'score 99'])")
must(s.includes("assert.ok(['done', 'awaiting', 'failed'].includes(run.status))"), 'test5 assert')
s = s.replace("assert.ok(['done', 'awaiting', 'failed'].includes(run.status))",
  "assert.equal(run.status, 'done', 'error=' + run.error)")

writeFileSync('test/execution.test.mjs', s)
console.log('tests fixed')
