import { readFileSync, writeFileSync } from 'node:fs'
let s = readFileSync('client/index.js', 'utf8')
const must = (c, m) => { if (!c) { console.error('ANCHOR FAIL: ' + m); process.exit(1) } }

// ── i18n ──
must(s.includes(`  currentStep: '当前', runError: '运行异常',
}`), 'zh i18n anchor')
s = s.replace(`  currentStep: '当前', runError: '运行异常',
}`, `  currentStep: '当前', runError: '运行异常',
  tabFlow: '流程图',
  flowGate: '门禁 ≥{min}', flowRework: '返工≤{n}', flowNoGate: '无门禁',
  flowLegendForward: '正常流转', flowLegendJump: '跳转', flowLegendFail: '门禁未过回跳', flowLegendBreak: '中止（不连线）',
  flowRunCurrent: '当前环节', flowRunDone: '已完成', flowRunGateFailed: '门禁未过', flowRunSkipped: '跳过', flowRunFailed: '失败',
  flowNoParsed: '工艺无法解析，无法绘制流程图',
}`)
must(s.includes(`  currentStep: 'current', runError: 'run error',
}`), 'en i18n anchor')
s = s.replace(`  currentStep: 'current', runError: 'run error',
}`, `  currentStep: 'current', runError: 'run error',
  tabFlow: 'Flow',
  flowGate: 'gate ≥{min}', flowRework: 'rework≤{n}', flowNoGate: 'no gate',
  flowLegendForward: 'forward', flowLegendJump: 'jump', flowLegendFail: 'gate-fail back', flowLegendBreak: 'break (no edge)',
  flowRunCurrent: 'current', flowRunDone: 'done', flowRunGateFailed: 'gate failed', flowRunSkipped: 'skipped', flowRunFailed: 'failed',
  flowNoParsed: 'Process cannot be parsed — cannot draw flow',
}`)

// ── CSS ──
must(s.includes(`.dsh-prc-tail { max-height:180px; overflow:auto; margin:0; }`), 'css anchor')
s = s.replace(`.dsh-prc-tail { max-height:180px; overflow:auto; margin:0; }`, `.dsh-prc-tail { max-height:180px; overflow:auto; margin:0; }
.dsh-prc-flowwrap { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:10px; background:var(--dsw-alias-bg-layer-2, rgba(128,128,128,.05)); overflow:auto; max-height:460px; }
.dsh-prc-flowlegend { display:flex; gap:14px; flex-wrap:wrap; font-size:11px; color:var(--dsw-text-secondary, gray); margin:6px 2px 10px; align-items:center; }
.dsh-prc-flowlegend .sw { display:inline-block; width:18px; height:0; border-top:2px solid; margin-right:4px; vertical-align:middle; }
.dsh-prc-flowlegend .sw.fwd { border-color:var(--dsw-text-secondary, #94a3b8); }
.dsh-prc-flowlegend .sw.jump { border-color:#22c55e; }
.dsh-prc-flowlegend .sw.fail { border-color:var(--dsw-alias-state-error, #ef4444); border-top-style:dashed; }`)

// ── FlowGraph SVG 组件（替换占位）──
must(s.includes(`// FLOW_COMPONENTS_PLACEHOLDER`), 'flow components placeholder')
s = s.replace(`// FLOW_COMPONENTS_PLACEHOLDER`, `function flowPhaseColor(phaseId) {
  let h = 0
  for (let i = 0; i < String(phaseId || '').length; i++) h = (h * 31 + String(phaseId).charCodeAt(i)) >>> 0
  return 'hsl(' + (h % 360) + ' 45% 55%)'
}

function escXml(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/**
 * 流程图 SVG。model/layout 来自 flow-model；runState 可选（运行态高亮）：
 * { latestByLink: Map<linkId, attempt>, currentLinkId, pendingLinkId }
 */
function FlowGraph({ t, parsed, run }) {
  const [zoom, setZoom] = useState(1)
  const model = useMemo(() => buildFlowModel(parsed), [parsed])
  const layout = useMemo(() => (model ? layoutFlowGraph(model) : null), [model])
  const latest = useMemo(() => (run ? latestAttempts(run) : null), [run])
  if (!model || !layout) return h('div', { className: 'dsh-prc-empty' }, t('flowNoParsed'))

  const pos = layout.positions
  const nodeById = new Map([[START_ID, { id: START_ID, name: 'START', phaseName: '' }], [END_ID, { id: END_ID, name: 'END', phaseName: '' }], ...model.nodes.map((n) => [n.id, n])])
  const currentLinkId = run && run.current && run.current.linkId
  const stateOf = (linkId) => {
    if (!run) return null
    if (run.pendingBreak && run.pendingBreak.linkId === linkId) return 'awaiting'
    if (currentLinkId === linkId && ['running', 'queued', 'awaiting'].includes(run.status)) return 'current'
    const a = latest && latest.get(linkId)
    return a ? a.status : null
  }
  const STROKE = { forward: 'var(--dsw-text-secondary, #94a3b8)', jump: '#22c55e', fail: 'var(--dsw-alias-state-error, #ef4444)' }
  const edgePath = (e) => {
    const from = pos.get(e.from)
    const to = pos.get(e.to)
    if (!from || !to) return null
    const isBack = layout.backEdges.has(e.from + '→' + e.to)
    const isLoop = layout.loops.has(e.from + '→' + e.to)
    if (e.from === START_ID) return { d: 'M' + (from.x + FLOW_NODE_W / 2) + ' ' + (from.y + 14) + ' L' + (to.x) + ' ' + (to.y + FLOW_NODE_H / 2), label: null }
    if (e.to === END_ID) return { d: 'M' + (from.x + FLOW_NODE_W) + ' ' + (from.y + FLOW_NODE_H / 2) + ' L' + (to.x) + ' ' + (to.y + 16), label: null }
    if (isLoop) {
      const sx = from.x + FLOW_NODE_W, sy = from.y + 18
      return { d: 'M' + sx + ' ' + sy + ' C' + (sx + 46) + ' ' + sy + ' ' + (sx + 46) + ' ' + (sy + 30) + ' ' + sx + ' ' + (sy + 34), label: null }
    }
    if (isBack) {
      const sx = from.x + FLOW_NODE_W / 2, sy = from.y
      const tx = to.x + FLOW_NODE_W / 2, ty = to.y
      const lift = Math.min(LOOP_BACK_PAD - 6, 12 + (sy - ty) * 0.18)
      return { d: 'M' + sx + ' ' + sy + ' C' + sx + ' ' + (sy - lift) + ' ' + tx + ' ' + (ty - lift) + ' ' + tx + ' ' + ty, label: e.kind === 'fail' ? e.label : (e.label || '') }
    }
    const sx = from.x + FLOW_NODE_W, sy = from.y + FLOW_NODE_H / 2
    const tx = to.x, ty = to.y + FLOW_NODE_H / 2
    const dx = Math.max(28, (tx - sx) / 2)
    return { d: 'M' + sx + ' ' + sy + ' C' + (sx + dx) + ' ' + sy + ' ' + (tx - dx) + ' ' + ty + ' ' + tx + ' ' + ty, label: e.label || null }
  }

  const nodeSvg = (id) => {
    const p = pos.get(id)
    if (!p) return null
    if (id === START_ID || id === END_ID) {
      const isStart = id === START_ID
      return h('g', { key: id },
        h('rect', { x: p.x, y: p.y, width: FLOW_NODE_W, height: 30, rx: 15, fill: 'var(--dsw-alias-bg-layer-1, transparent)', stroke: 'var(--dsw-alias-border-l2, rgba(128,128,128,.4))' }),
        h('text', { x: p.x + FLOW_NODE_W / 2, y: p.y + 20, textAnchor: 'middle', fontSize: 12, fontWeight: 700, fill: 'var(--dsw-text-secondary, gray)', style: { fontFamily: 'monospace', letterSpacing: 2 } }, isStart ? '▶ START' : '■ END'))
    }
    const node = nodeById.get(id)
    const st = stateOf(id)
    const att = run && latest && latest.get(id)
    const border = st === 'current' ? '#d9822b'
      : st === 'done' || st === 'skipped' ? '#2e9e5b'
        : st === 'gate_failed' || st === 'awaiting' ? 'var(--dsw-alias-state-error, #ef4444)'
          : st === 'failed' ? 'var(--dsw-alias-state-error, #ef4444)' : 'var(--dsw-alias-border-l2, rgba(128,128,128,.35))'
    const badge = []
    if (node.gateCount > 0) badge.push(t('flowGate', { min: node.gateMin === null ? '?' : node.gateMin }))
    else badge.push(t('flowNoGate'))
    if (node.maxRework !== null) badge.push(t('flowRework', { n: node.maxRework }))
    let runBadge = null
    if (att && att.gate && att.gate.score !== null && att.gate.score !== undefined) {
      runBadge = att.gate.score + '/' + (att.gate.minScore || 0)
    }
    const meta = [node.executor, node.expert].filter(Boolean).join(' · ')
    const w = FLOW_NODE_W, hgt = FLOW_NODE_H
    return h('g', { key: id },
      h('rect', { x: p.x + 3, y: p.y + 6, width: 6, height: hgt - 12, rx: 3, fill: flowPhaseColor(node.phaseId) }),
      h('rect', { x: p.x, y: p.y, width: w, height: hgt, rx: 10, fill: 'var(--dsw-alias-bg-layer-1, #fff)', stroke: border, strokeWidth: st === 'current' ? 2.5 : 1.2 }),
      h('rect', { x: p.x - 9, y: p.y - 9, width: 22, height: 18, rx: 9, fill: 'var(--dsw-alias-bg-layer-2, #f1f5f9)', stroke: 'var(--dsw-alias-border-l1, rgba(128,128,128,.2))' }),
      h('text', { x: p.x + 2, y: p.y + 4, textAnchor: 'middle', fontSize: 10, fontWeight: 700, fill: 'var(--dsw-text-secondary, gray)', style: { fontFamily: 'monospace' } }, String(node.no).padStart(2, '0')),
      h('text', { x: p.x + 14, y: p.y + 24, fontSize: 13, fontWeight: 600, fill: 'var(--dsw-alias-label-primary, currentColor)' }, escXml(node.name.slice(0, 16))),
      h('text', { x: p.x + 14, y: p.y + 41, fontSize: 10, fill: 'var(--dsw-text-secondary, gray)' }, escXml((meta || node.phaseName || '').slice(0, 26))),
      h('text', { x: p.x + 14, y: p.y + hgt - 10, fontSize: 10, fill: node.gateCount > 0 ? '#b8860b' : 'var(--dsw-text-secondary, gray)' }, escXml(badge.join(' · ')).slice(0, 34)),
      runBadge ? h('rect', { x: p.x + w - 66, y: p.y + hgt + 6, width: 64, height: 18, rx: 9, fill: 'var(--dsw-alias-bg-layer-1, #fff)', stroke: '#2e9e5b' }),
      runBadge ? h('text', { x: p.x + w - 34, y: p.y + hgt + 19, textAnchor: 'middle', fontSize: 10, fontWeight: 700, fill: '#2e9e5b' }, runBadge) : null,
      st === 'current' ? h('circle', { cx: p.x + w - 12, cy: p.y + 12, r: 5, fill: '#d9822b' }) : null,
      st === 'done' ? h('circle', { cx: p.x + w - 12, cy: p.y + 12, r: 5, fill: '#2e9e5b' }) : null,
      (st === 'gate_failed' || st === 'awaiting' || st === 'failed') ? h('circle', { cx: p.x + w - 12, cy: p.y + 12, r: 5, fill: 'var(--dsw-alias-state-error, #ef4444)' }) : null)
  }

  const edgeSvgs = []
  for (const e of model.edges) {
    const path = edgePath(e)
    if (!path) continue
    const color = e.kind === 'fail' ? STROKE.fail : e.kind === 'jump' ? STROKE.jump : STROKE.forward
    const dashed = e.kind === 'fail' ? '6,4' : undefined
    edgeSvgs.push(h('path', { key: e.from + '→' + e.to + e.kind, d: path.d, fill: 'none', stroke: color, strokeWidth: e.kind === 'fail' ? 1.8 : 1.4, strokeDasharray: dashed, markerEnd: 'url(#dsh-prc-arrow-' + (e.kind === 'fail' ? 'f' : e.kind === 'jump' ? 'j' : 'n') + ')' }))
    if (path.label) {
      const from = pos.get(e.from), to = pos.get(e.to)
      const mx = (from.x + to.x + FLOW_NODE_W) / 2, my = Math.min(from.y, to.y) - 6
      edgeSvgs.push(h('text', { key: e.from + '→' + e.to + e.kind + 'lbl', x: mx, y: my, textAnchor: 'middle', fontSize: 10, fill: e.kind === 'fail' ? 'var(--dsw-alias-state-error, #ef4444)' : '#16a34a', fontWeight: 600 }, escXml(path.label).slice(0, 30)))
    }
  }

  return h('div', null,
    h('div', { className: 'dsh-prc-flowlegend' },
      h('span', null, h('span', { className: 'sw fwd' }), t('flowLegendForward')),
      h('span', null, h('span', { className: 'sw jump' }), t('flowLegendJump')),
      h('span', null, h('span', { className: 'sw fail' }), t('flowLegendFail')),
      h('span', null, t('flowLegendBreak')),
      h('span', { style: { marginLeft: 'auto' } },
        h('button', { className: 'dsh-prc-mini', onClick: () => setZoom(Math.max(0.5, zoom - 0.2)) }, '−'),
        h('span', { style: { margin: '0 6px' } }, Math.round(zoom * 100) + '%'),
        h('button', { className: 'dsh-prc-mini', onClick: () => setZoom(Math.min(2, zoom + 0.2)) }, '+'))),
    h('div', { className: 'dsh-prc-flowwrap' },
      h('svg', { width: layout.width * zoom, height: layout.height * zoom, viewBox: '0 0 ' + layout.width + ' ' + layout.height },
        h('defs', null,
          h('marker', { id: 'dsh-prc-arrow-n', viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, h('path', { d: 'M0 0L10 5L0 10z', fill: 'var(--dsw-text-secondary, #94a3b8)' })),
          h('marker', { id: 'dsh-prc-arrow-j', viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, h('path', { d: 'M0 0L10 5L0 10z', fill: '#22c55e' })),
          h('marker', { id: 'dsh-prc-arrow-f', viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, h('path', { d: 'M0 0L10 5L0 10z', fill: 'var(--dsw-alias-state-error, #ef4444)' }))),
        edgeSvgs,
        [START_ID, ...model.nodes.map((n) => n.id), END_ID].map((id) => nodeSvg(id)))))
}

function FlowTab({ t, parsed }) {
  return h('div', null, h(FlowGraph, { t, parsed }))
}

`)

// ── tab 接线：'flow' 加入 tab 列表 + DetailPane 渲染 ──
must(s.includes(`      ['overview', 'structure', 'yaml'].map((tab) => h('button', { key: tab, className: 'dsh-prc-tab', 'data-on': state.tab === tab ? 'true' : undefined, onClick: () => controller.setTab(tab) },`), 'tab list')
s = s.replace(`      ['overview', 'structure', 'yaml'].map((tab) => h('button', { key: tab, className: 'dsh-prc-tab', 'data-on': state.tab === tab ? 'true' : undefined, onClick: () => controller.setTab(tab) },`,
  `      ['overview', 'flow', 'structure', 'yaml'].map((tab) => h('button', { key: tab, className: 'dsh-prc-tab', 'data-on': state.tab === tab ? 'true' : undefined, onClick: () => controller.setTab(tab) },`)

must(s.includes(`        t('tab' + tab[0].toUpperCase() + tab.slice(1))))),`), 'tab label')
// tabFlow 标签特殊化（Flow → 流程图 已由 i18n key 处理：tab[0].toUpperCase()+slice(1) = 'Flow' ✓）

s = s.replace(`    state.tab === 'overview' ? h(OverviewTab, { t, meta, parsed: item.parsed, diagnostics: item.diagnostics, onJump: jump })
      : state.tab === 'structure' ? h(StructureTab, { t, parsed: item.parsed })`,
  `    state.tab === 'overview' ? h(OverviewTab, { t, meta, parsed: item.parsed, diagnostics: item.diagnostics, onJump: jump })
      : state.tab === 'flow' ? h(FlowGraph, { t, parsed: item.parsed })
        : state.tab === 'structure' ? h(StructureTab, { t, parsed: item.parsed })`)

// ── RunBoard：看板顶部嵌运行态流程图 ──
must(s.includes(`  if (run.pendingBreak) {
    children.push(h('div', { className: 'dsh-prc-break' },`), 'runboard break anchor')
s = s.replace(`  if (run.pendingBreak) {
    children.push(h('div', { className: 'dsh-prc-break' },`,
  `  children.push(h('div', { className: 'dsh-prc-sec' }, h(FlowGraph, { t, parsed: run.snapshot, run })))
  if (run.pendingBreak) {
    children.push(h('div', { className: 'dsh-prc-break' },`)

// ── __internals 导出布局纯函数（plain Node 单测）──
must(s.includes(`  __internals: { Controller, filterProcesses, ZH, EN, AI_PROMPT, colorizeLine },`), 'internals anchor')
s = s.replace(`  __internals: { Controller, filterProcesses, ZH, EN, AI_PROMPT, colorizeLine },`,
  `  __internals: { Controller, filterProcesses, ZH, EN, AI_PROMPT, colorizeLine, buildFlowModel, layoutFlowGraph, clientFlowTarget },`)

writeFileSync('client/index.js', s)
console.log('flow view wired')
