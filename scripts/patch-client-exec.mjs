import { readFileSync, writeFileSync } from 'node:fs'
let s = readFileSync('client/index.js', 'utf8')
const must = (cond, msg) => { if (!cond) { console.error('ANCHOR FAIL: ' + msg); process.exit(1) } }

// 1. initialState
must(s.includes(`    settings: undefined,
  }
}`), 'initialState')
s = s.replace(`    settings: undefined,
  }
}`, `    settings: undefined,
    view: prefs.view || 'lib',
    runs: { revision: -1, list: [] },
    runId: prefs.runId, run: undefined, runLoading: false,
  }
}`)

// 2. constructor + persist
s = s.replace(`    this.seenRevision = undefined
    this.refreshInFlight = null`, `    this.seenRevision = undefined
    this.seenRunsRevision = undefined
    this.refreshInFlight = null`)
s = s.replace(`    savePrefs({ selectedId: s.selectedId, tab: s.tab, filters: s.filters, sortBy: s.sortBy })`,
  `    savePrefs({ selectedId: s.selectedId, tab: s.tab, filters: s.filters, sortBy: s.sortBy, view: s.view, runId: s.runId })`)

// 3. stream handler + refresh（runs 一并追赶）
s = s.replace(`  connectStream() {
    const es = new EventSource(API + '/events')
    this.es = es
    es.addEventListener('hello', (e) => {
      try { this.seenRevision = JSON.parse(e.data).revision } catch {}
      void this.refresh()
    })
    es.addEventListener('change', (e) => {
      try { this.seenRevision = JSON.parse(e.data).revision } catch {}
      void this.refresh()
    })
    es.onerror = () => { /* EventSource 自动重连；hello 里对齐 gap */ }
  }`, `  connectStream() {
    const es = new EventSource(API + '/events')
    this.es = es
    const onFrame = (e) => {
      try { const d = JSON.parse(e.data); this.seenRevision = d.revision; this.seenRunsRevision = d.runsRevision } catch {}
      void this.refresh()
    }
    es.addEventListener('hello', onFrame)
    es.addEventListener('change', onFrame)
    es.onerror = () => { /* EventSource 自动重连；hello 里对齐 gap */ }
  }`)

s = s.replace(`        let snap
        // revision 追赶：变更帧落在请求飞行中时，旧响应可能落后（taskboard S16）
        for (let round = 0; round < 3; round++) {
          snap = await api('/state')
          const keep = this.state.selectedId && snap.processes.some((p) => p.id === this.state.selectedId)
            ? this.state.selectedId : undefined
          this.setState({
            loaded: true, revision: snap.revision, roots: snap.roots, processes: snap.processes,
            lastError: snap.lastError, error: undefined, selectedId: keep,
          })
          if (this.seenRevision === undefined || snap.revision >= this.seenRevision) break
        }`, `        let snap
        // revision 追赶：变更帧落在请求飞行中时，旧响应可能落后（taskboard S16）
        for (let round = 0; round < 3; round++) {
          const [stateRsp, runsRsp] = await Promise.all([api('/state'), api('/runs')])
          snap = stateRsp
          const keep = this.state.selectedId && snap.processes.some((p) => p.id === this.state.selectedId)
            ? this.state.selectedId : undefined
          this.setState({
            loaded: true, revision: snap.revision, roots: snap.roots, processes: snap.processes,
            lastError: snap.lastError, error: undefined, selectedId: keep,
            runs: { revision: runsRsp.revision, list: runsRsp.runs },
          })
          const libCaughtUp = this.seenRevision === undefined || snap.revision >= this.seenRevision
          const runsCaughtUp = this.seenRunsRevision === undefined || runsRsp.revision >= this.seenRunsRevision
          if (libCaughtUp && runsCaughtUp) break
        }
        // 运行看板：活跃运行随帧刷新；静态运行只取一次
        if (this.state.view === 'exec' && this.state.runId) {
          const active = ['queued', 'running', 'awaiting'].includes((this.state.run && this.state.run.status) || '')
          if (active || !this.state.run) void this.loadRun(this.state.runId)
        }`)

// 4. controller methods（追加在 aiPoll 之后）
s = s.replace(`  aiRun(prompt) { return api('/ai-generate', { method: 'POST', body: { prompt } }).then((d) => d.jobId) }
  aiPoll(jobId) { return api('/jobs?id=' + encodeURIComponent(jobId)) }
}`, `  aiRun(prompt) { return api('/ai-generate', { method: 'POST', body: { prompt } }).then((d) => d.jobId) }
  aiPoll(jobId) { return api('/jobs?id=' + encodeURIComponent(jobId)) }

  // ── 执行视图（v0.2）──
  setView(view) { this.setState({ view }); this.persist() }
  selectRun(id) {
    if (!id) return
    this.setState({ runId: id, run: undefined, runLoading: true })
    this.persist()
    void this.loadRun(id)
  }
  async loadRun(id) {
    try {
      const d = await api('/run?id=' + encodeURIComponent(id))
      if (this.state.runId !== id) return
      this.setState({ run: d.run, runLoading: false })
    } catch (error) {
      if (this.state.runId === id) this.setState({ runLoading: false, error: String(error && error.message || error) })
    }
  }
  async runAction(action, body) {
    const d = await api('/run-action', { method: 'POST', body: { action, ...body } })
    if (this.state.runId === d.run.id) void this.loadRun(d.run.id)
    void this.refresh()
    return d.run
  }
  async createRun(body) {
    const d = await api('/run-create', { method: 'POST', body })
    this.setState({ dialog: null, view: 'exec', runId: d.run.id, run: undefined, runLoading: true })
    this.persist()
    void this.loadRun(d.run.id)
    this.toast(this.tr('runStarted'))
    return d.run
  }
}`)

// 5. Toolbar：视图切换 tabs（放在 count 之后）
s = s.replace(`    h('span', { className: 'dsh-prc-count' }, t('count', { user, bundled })),
    h('input', { className: 'dsh-prc-input dsh-prc-search'`, `    h('span', { className: 'dsh-prc-count' }, t('count', { user, bundled })),
    h('div', { className: 'dsh-prc-tabs', style: { borderBottom: 'none', margin: '0 4px' } },
      h('button', { className: 'dsh-prc-tab', 'data-on': state.view === 'lib' ? 'true' : undefined, onClick: () => controller.setView('lib') }, t('viewLib')),
      h('button', { className: 'dsh-prc-tab', 'data-on': state.view === 'exec' ? 'true' : undefined, onClick: () => controller.setView('exec') }, t('viewExec'))),
    h('input', { className: 'dsh-prc-input dsh-prc-search'`)

// 6. ProcessPanel：视图切换 + 新建运行对话框
s = s.replace(`    h('div', { className: 'dsh-prc-body' },
      h(ListPane, { state, controller, t }),
      detail),`, `    h('div', { className: 'dsh-prc-body' },
      state.view === 'exec' ? h(ExecView, { state, controller, t }) : h('div', { style: { display: 'contents' } }, h(ListPane, { state, controller, t }), detail)),`)

s = s.replace(`    state.dialog && state.dialog.type === 'ai' ? h(AiDialog, { state, controller, t }) : null,`,
`    state.dialog && state.dialog.type === 'ai' ? h(AiDialog, { state, controller, t }) : null,
    state.dialog && state.dialog.type === 'newrun' ? h(NewRunDialog, { state, controller, t }) : null,`)

// 7. DetailPane：加「▶ 按工艺执行」按钮（库视图，所有来源可运行）
s = s.replace(`        h('button', { key: 'x', className: 'dsh-prc-btn', onClick: copyYaml }, t('copyYaml')))),`,
`        h('button', { key: 'r', className: 'dsh-prc-btn', 'data-primary': 'true', title: t('runCreate'), onClick: () => controller.setState({ dialog: { type: 'newrun', processId: meta.id } }) }, t('runCreate')),
        h('button', { key: 'x', className: 'dsh-prc-btn', onClick: copyYaml }, t('copyYaml')))),`)

writeFileSync('client/index.js', s)
console.log('controller/toolbar/panel patched')
