import { readFileSync, writeFileSync } from 'node:fs'
let s = readFileSync('client/index.js', 'utf8')
const must = (cond, msg) => { if (!cond) { console.error('ANCHOR FAIL: ' + msg); process.exit(1) } }

// ── CSS ──
const CSS_ANCHOR = `.dsh-prc-sec h4 { margin:0 0 6px; font-size:13px; }
`
must(s.includes(CSS_ANCHOR), 'css anchor')
s = s.replace(CSS_ANCHOR, CSS_ANCHOR + `
.dsh-prc-runlist { width:280px; min-width:220px; overflow-y:auto; border-right:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.35)); padding:6px; box-sizing:border-box; }
.dsh-prc-runrow { display:flex; flex-direction:column; gap:3px; width:100%; text-align:left; border:1px solid transparent; border-radius:8px; background:transparent; color:inherit; padding:7px 9px; margin:2px 0; cursor:pointer; font:inherit; font-size:12px; box-sizing:border-box; }
.dsh-prc-runrow:hover { background:var(--dsw-hover, rgba(128,128,128,.1)); }
.dsh-prc-runrow[data-selected="true"] { background:var(--dsw-active, rgba(128,128,128,.16)); border-color:var(--dsw-alias-border-l2, rgba(128,128,128,.3)); }
.dsh-prc-pill { border-radius:999px; padding:1px 8px; font-size:10px; white-space:nowrap; border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); }
.dsh-prc-pill[data-status="running"] { color:#d9822b; border-color:#d9822b; }
.dsh-prc-pill[data-status="queued"] { color:#3e63dd; border-color:#3e63dd; }
.dsh-prc-pill[data-status="awaiting"] { color:#c75050; border-color:#c75050; }
.dsh-prc-pill[data-status="paused"] { color:#b8860b; border-color:#b8860b; }
.dsh-prc-pill[data-status="done"] { color:#2e9e5b; border-color:#2e9e5b; }
.dsh-prc-pill[data-status="stopped"] { color:var(--dsw-text-secondary, gray); }
.dsh-prc-pill[data-status="failed"] { color:var(--dsw-alias-state-error, #c75050); border-color:var(--dsw-alias-state-error, #c75050); }
.dsh-prc-board { flex:1; min-width:0; overflow-y:auto; padding:14px 18px; box-sizing:border-box; }
.dsh-prc-runhead { display:flex; align-items:flex-start; gap:10px; flex-wrap:wrap; margin-bottom:8px; }
.dsh-prc-break { border:1px solid var(--dsw-alias-state-error, #c75050); border-radius:10px; padding:10px 12px; margin:8px 0; display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
.dsh-prc-linkcard { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:8px; padding:6px 9px; margin:4px 0; display:flex; flex-direction:column; gap:4px; }
.dsh-prc-linkcard[data-state="running"] { border-color:#d9822b; }
.dsh-prc-linkcard[data-state="done"] { opacity:.82; }
.dsh-prc-linkcard[data-state="gate_failed"] { border-color:var(--dsw-alias-state-error, #c75050); }
.dsh-prc-linktop { display:flex; align-items:baseline; gap:8px; flex-wrap:wrap; }
.dsh-prc-linktop .grow { flex:1; }
.dsh-prc-mini { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); background:transparent; color:inherit; border-radius:6px; padding:2px 7px; font:inherit; font-size:11px; cursor:pointer; white-space:nowrap; }
.dsh-prc-mini:hover { background:var(--dsw-hover, rgba(128,128,128,.12)); }
.dsh-prc-tail { max-height:180px; overflow:auto; margin:0; }
`)

// ── 组件（插在设置页 section 之前）──
const ANCHOR = `// ── 设置页 section（M3） ─────────────────────────────────────────────────`
must(s.includes(ANCHOR), 'components anchor')

const COMPONENTS = `// ── 执行视图（v0.2）─────────────────────────────────────────────────────

const LINK_STATE_KEY = { running: 'linkRunning', done: 'linkDone', gate_failed: 'linkGateFailed', skipped: 'linkSkipped', failed: 'linkFailed', abandoned: 'linkAbandoned' }

function StatusPill({ t, status }) {
  return h('span', { className: 'dsh-prc-pill', 'data-status': status }, t('status' + status[0].toUpperCase() + status.slice(1)))
}

/** 每个环节的最新一次执行记录。 */
function latestAttempts(run) {
  const map = new Map()
  for (const t of run.trail || []) {
    const prev = map.get(t.linkId)
    if (!prev || t.startedAt >= prev.startedAt) map.set(t.linkId, t)
  }
  return map
}

function runProgress(run) {
  const latest = latestAttempts(run)
  const total = new Set([...indexLinksOf(run).keys()]).size
  let done = 0
  for (const [linkId] of indexLinksOf(run)) {
    const st = latest.get(linkId) && latest.get(linkId).status
    if (st === 'done' || st === 'skipped') done++
  }
  return { done, total }
}
function indexLinksOf(run) {
  const phases = run.snapshot && Array.isArray(run.snapshot.phases) ? run.snapshot.phases : []
  const map = new Map()
  for (const ph of phases) for (const ln of (Array.isArray(ph.links) ? ph.links : [])) if (ln.id) map.set(ln.id, { phase: ph, link: ln })
  return map
}

function RunList({ state, controller, t }) {
  const runs = state.runs.list
  return h('div', { className: 'dsh-prc-runlist' },
    runs.length === 0
      ? h('div', { style: { padding: '16px 8px', color: 'var(--dsw-text-secondary, gray)', fontSize: 12 } }, t('noRuns'), h('div', { style: { marginTop: 4, opacity: .8 } }, t('noRunsHint')))
      : runs.map((r) => h('button', {
        key: r.id, className: 'dsh-prc-runrow', 'data-selected': state.runId === r.id ? 'true' : undefined,
        onClick: () => controller.selectRun(r.id),
      },
      h('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
        h('span', { className: 'dsh-prc-pill', 'data-status': r.status }, t('status' + r.status[0].toUpperCase() + r.status.slice(1))),
        h('span', { style: { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 } }, r.displayName || r.processName)),
      h('div', { style: { display: 'flex', gap: 6, color: 'var(--dsw-text-secondary, gray)', fontSize: 11 } },
        h('span', null, t('progress', { done: r.doneLinks, total: r.totalLinks })),
        h('span', null, new Date(r.updatedAt).toLocaleTimeString())))))
}

function LinkCard({ t, run, phase, link, attempt, controller }) {
  const [open, setOpen] = useState(false)
  const st = attempt ? attempt.status : 'pending'
  const isCurrent = run.current && run.current.linkId === link.id && ['running', 'queued', 'awaiting'].includes(run.status)
  const rework = (run.rework && run.rework[link.id]) || 0
  const active = ['queued', 'running', 'awaiting', 'paused'].includes(run.status)
  return h('div', { className: 'dsh-prc-linkcard', 'data-state': st },
    h('div', { className: 'dsh-prc-linktop' },
      h('span', { className: 'dsh-prc-link-id' }, link.id),
      h('span', { style: { fontWeight: 500 } }, link.name || ''),
      isCurrent ? h('span', { className: 'dsh-prc-badge', 'data-kind': 'warn' }, t('currentStep')) : null,
      h('span', { className: 'grow' }),
      attempt && attempt.attempt > 1 ? h('span', { style: { fontSize: 11, opacity: .7 } }, t('attemptN', { n: attempt.attempt })) : null,
      rework > 0 ? h('span', { style: { fontSize: 11, color: '#b8860b' } }, t('reworkN', { n: rework })) : null,
      attempt && attempt.gate && attempt.gate.score !== null && attempt.gate.score !== undefined
        ? h('span', { className: 'dsh-prc-badge', 'data-kind': attempt.gate.score >= (attempt.gate.minScore || 0) ? 'ok' : 'err', title: attempt.gate.reason },
          t('gateLabel') + ' ' + attempt.gate.score + ' / ' + (attempt.gate.minScore || 0)) : null,
      h('span', { style: { fontSize: 11, opacity: .75 } }, t(LINK_STATE_KEY[st] || 'linkPending'))),
    h('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
      attempt && attempt.sessionId ? h('button', { className: 'dsh-prc-mini', onClick: () => controller.openSession(attempt.sessionId) }, t('openSession')) : null,
      attempt && attempt.outputTail ? h('button', { className: 'dsh-prc-mini', onClick: () => setOpen(!open) }, (open ? '▾ ' : '▸ ') + t('outputLabel')) : null,
      !active && attempt ? h('button', { className: 'dsh-prc-mini', onClick: () => void controller.runAction('retry-link', { id: run.id, linkId: link.id }) }, t('retryLink')) : null,
      !active && st !== 'pending' ? h('button', { className: 'dsh-prc-mini', onClick: () => void controller.runAction('skip-link', { id: run.id, linkId: link.id }) }, t('skipLink')) : null),
    open && attempt && attempt.outputTail ? h('pre', { className: 'dsh-prc-pre dsh-prc-tail' }, attempt.outputTail) : null)
}

function RunBoard({ state, controller, t }) {
  const run = state.run
  if (state.runLoading) return h('div', { className: 'dsh-prc-board' }, t('loading'))
  if (!run) return h('div', { className: 'dsh-prc-empty' }, t('emptyRun'))
  const latest = latestAttempts(run)
  const phases = Array.isArray(run.snapshot && run.snapshot.phases) ? run.snapshot.phases : []
  const { done, total } = runProgress(run)
  const active = ['queued', 'running', 'awaiting', 'paused'].includes(run.status)
  return h('div', { className: 'dsh-prc-board' },
    h('div', { className: 'dsh-prc-runhead' },
      h('h3', { className: 'dsh-prc-detail-title' }, run.displayName || run.processName),
      h(StatusPill, { t, status: run.status }),
      h('span', { className: 'dsh-prc-count' }, t('progress', { done, total })),
      h('div', { className: 'dsh-prc-actions' },
        run.status === 'running' || run.status === 'queued' ? h('button', { className: 'dsh-prc-btn', onClick: () => void controller.runAction('pause', { id: run.id }) }, t('pause')) : null,
        run.status === 'paused' ? h('button', { className: 'dsh-prc-btn', 'data-primary': 'true', onClick: () => void controller.runAction('resume', { id: run.id }) }, t('resume')) : null,
        active ? h('button', { className: 'dsh-prc-btn', 'data-danger': 'true', onClick: () => void controller.runAction('stop', { id: run.id }) }, t('stopRun')) : null)),
    h('div', { className: 'dsh-prc-chips' },
      h('span', { className: 'dsh-prc-chip' }, run.processId),
      run.error ? h('span', { className: 'dsh-prc-badge', 'data-kind': 'err' }, t('runError') + ': ' + run.error) : null,
      h('span', { style: { fontSize: 11, opacity: .6 } }, new Date(run.updatedAt).toLocaleString()))),
    run.pendingBreak ? h('div', { className: 'dsh-prc-break' },
      h('span', { style: { fontWeight: 600 } }, '⚠ ' + t('breakTitle')),
      h('span', { style: { fontSize: 12 } },
        run.pendingBreak.linkId + (run.pendingBreak.gate && run.pendingBreak.gate.score !== null && run.pendingBreak.gate.score !== undefined
          ? ' · ' + t('gateLabel') + ' ' + run.pendingBreak.gate.score + ' / ' + (run.pendingBreak.gate.minScore || 0) : '')
        + ' · ' + (run.pendingBreak.reason || '')),
      h('div', { className: 'dsh-prc-actions' },
        h('button', { className: 'dsh-prc-btn', 'data-primary': 'true', onClick: () => void controller.runAction('resolve-break', { id: run.id, decision: 'retry' }) }, t('decisionRetry')),
        h('button', { className: 'dsh-prc-btn', onClick: () => void controller.runAction('resolve-break', { id: run.id, decision: 'skip' }) }, t('decisionSkip')),
        h('button', { className: 'dsh-prc-btn', 'data-danger': 'true', onClick: () => void controller.runAction('resolve-break', { id: run.id, decision: 'stop' }) }, t('decisionStop')))) : null,
    phases.map((ph, i) => h('div', { className: 'dsh-prc-phase', key: ph.id || i },
      h('div', { className: 'dsh-prc-phase-head' },
        h('span', { className: 'dsh-prc-link-id' }, ph.id || i + 1),
        h('span', null, ph.name || ''),
        h('span', { className: 'dsh-prc-link-meta' }, (Array.isArray(ph.links) ? ph.links.length : 0) + ' ' + t('links'))),
      (Array.isArray(ph.links) ? ph.links : []).map((ln) => h(LinkCard, {
        key: ln.id, t, run, phase, link: ln, attempt: latest.get(ln.id), controller,
      })))))
}

function ExecView({ state, controller, t }) {
  return h('div', { style: { display: 'contents' } },
    h(RunList, { state, controller, t }),
    state.runId && (state.runLoading || state.run) ? h(RunBoard, { state, controller, t })
      : state.runId ? h('div', { className: 'dsh-prc-empty' }, t('loading')) : h('div', { className: 'dsh-prc-empty' }, t('emptyRun')))
}

function NewRunDialog({ state, controller, t }) {
  const dlg = state.dialog
  const [workspaces, setWorkspaces] = useState(null)
  const [ws, setWs] = useState('')
  useEffect(() => {
    api('/workspaces').then((d) => setWorkspaces(d.workspaces || [])).catch(() => setWorkspaces([]))
  }, [])
  const proc = state.processes.find((p) => p.id === dlg.processId)
  const [busy, setBusy] = useState(false)
  return h(Modal, { title: t('runCreate') + '：' + (proc ? (proc.display_name || proc.name) : ''), onClose: () => controller.setState({ dialog: null }) },
    h('div', { className: 'dsh-prc-kv' }, h('b', null, t('name') + ':'), proc ? proc.relPath : '—'),
    h('label', { className: 'dsh-prc-field' }, t('runWorkspace'),
      h('select', { value: ws, onChange: (e) => setWs(e.target.value) },
        workspaces === null ? h('option', { value: '' }, t('loading')) : [
          h('option', { key: '_', value: '' }, t('workspaceDefault')),
          workspaces.map((w) => h('option', { key: w.id, value: w.id }, w.title)),
        ])),
    h('div', { style: { fontSize: 12, opacity: .7 } }, '每个环节开一个全新会话执行；门禁由评审会话打分，不过按 on_gate_fail 流转，返工不超过 max_rework。'),
    h('div', { style: { display: 'flex', gap: 8, justifyContent: 'flex-end' } },
      h('button', { className: 'dsh-prc-btn', onClick: () => controller.setState({ dialog: null }) }, t('cancel')),
      h('button', { className: 'dsh-prc-btn', 'data-primary': 'true', disabled: busy || !proc, onClick: async () => {
        setBusy(true)
        try { await controller.createRun({ processId: dlg.processId, workspaceId: ws || undefined }) } catch (error) { controller.toast(String(error && error.message || error), 'err') } finally { setBusy(false) }
      } }, t('runCreate'))))
}

` + ANCHOR
s = s.replace(ANCHOR, COMPONENTS)

writeFileSync('client/index.js', s)
console.log('exec components appended')
