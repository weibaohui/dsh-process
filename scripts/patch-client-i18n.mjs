import { readFileSync, writeFileSync } from 'node:fs'
let s = readFileSync('client/index.js', 'utf8')

const ZH_ADD = `  sessionUnavailable: '当前页面拿不到会话服务，无法跳转',
  viewLib: '工艺库', viewExec: '执行',
  runCreate: '▶ 按工艺执行', runWorkspace: '工作区（可选）', runStarted: '运行已发起',
  workspaceDefault: '默认（不绑定）',
  statusQueued: '排队中', statusRunning: '运行中', statusPaused: '已暂停', statusAwaiting: '等待裁决',
  statusDone: '已完成', statusStopped: '已停止', statusFailed: '失败',
  pause: '暂停', resume: '继续', stopRun: '停止运行', stopConfirm: '停止后当前环节结果作废，确定停止？',
  noRuns: '还没有运行记录', noRunsHint: '到「工艺库」打开一个工艺，点「▶ 按工艺执行」发起一次运行',
  emptyRun: '左侧选择一次运行查看看板',
  progress: '{done}/{total} 环节', attemptN: '第 {n} 次尝试', reworkN: '返工 ×{n}',
  gateLabel: '门禁', gateScore: '{score} 分（线 {min}）',
  openSession: '打开会话', outputLabel: '实时输出', retryLink: '重跑本环节', skipLink: '跳过本环节',
  breakTitle: '门禁未过，等待你的裁决', decisionRetry: '重试本环节', decisionSkip: '跳过本环节', decisionStop: '中止运行',
  linkPending: '待跑', linkDone: '完成', linkRunning: '进行中', linkGateFailed: '门禁未过', linkSkipped: '跳过', linkFailed: '失败', linkAbandoned: '中断',
  currentStep: '当前', runError: '运行异常',
}`
const EN_ADD = `  sessionUnavailable: 'Session service unavailable on this page',
  viewLib: 'Library', viewExec: 'Runs',
  runCreate: '▶ Run process', runWorkspace: 'Workspace (optional)', runStarted: 'Run started',
  workspaceDefault: 'Default (unbound)',
  statusQueued: 'Queued', statusRunning: 'Running', statusPaused: 'Paused', statusAwaiting: 'Awaiting decision',
  statusDone: 'Done', statusStopped: 'Stopped', statusFailed: 'Failed',
  pause: 'Pause', resume: 'Resume', stopRun: 'Stop run', stopConfirm: 'The running link result will be discarded. Stop?',
  noRuns: 'No runs yet', noRunsHint: 'Open a process in "Library" and click "▶ Run process"',
  emptyRun: 'Pick a run on the left to see its board',
  progress: '{done}/{total} links', attemptN: 'attempt {n}', reworkN: 'rework ×{n}',
  gateLabel: 'Gate', gateScore: '{score} (min {min})',
  openSession: 'Open chat', outputLabel: 'Live output', retryLink: 'Retry link', skipLink: 'Skip link',
  breakTitle: 'Gate failed — awaiting your decision', decisionRetry: 'Retry this link', decisionSkip: 'Skip this link', decisionStop: 'Stop run',
  linkPending: 'pending', linkDone: 'done', linkRunning: 'running', linkGateFailed: 'gate failed', linkSkipped: 'skipped', linkFailed: 'failed', linkAbandoned: 'abandoned',
  currentStep: 'current', runError: 'run error',
}`

s = s.replace(`  sessionUnavailable: '当前页面拿不到会话服务，无法跳转',
}`, ZH_ADD)
s = s.replace(`  sessionUnavailable: 'Session service unavailable on this page',
}`, EN_ADD)

writeFileSync('client/index.js', s)
console.log('i18n added:', s.includes('viewExec') && s.includes("viewExec: 'Runs'"))
