/* Generated from client/index.js by scripts/build-client.mjs — do not edit by hand.
 * Regenerate with: npm run build:client
 */
window.__ModuleLoader__.load({
  id: "@weibaohui/dsh-process",
  factory: (require) => {
    var module = { exports: {} }
    var exports = module.exports
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" })
    var React = require("react")
    /**
     * @weibaohui/dsh-plugin-kit — client source（由消费者构建脚本内联进 bundle，
     * 不经 loader 运行时加载）。对外暴露 PluginKit：
     *
     *   PluginKit.substituteParams(template, params)   — {{key}} 模板插值
     *   PluginKit.makeActionShareDialog(React, opts)   — 返回 ActionShareDialog 组件
     *
     * ActionShareDialog props：
     *   title / hint / rows: [[label, value], ...] / initialPrompt
     *   params: [{ key, label?, placeholder?, multiline?, value? }]  — 可选；模板参数
     *     输入区（idle 态渲染在 prompt 上方），值实时替换进 prompt 的 {{key}} 占位符
     *   completedView: ({ job, output, close, retry }) => node  — 可选；完成态插槽，
     *     提供后 job done 不再渲染默认「输出原文」，改由插槽全权负责（如解析 AI 输出
     *     成可编辑表单 + 创建按钮），Dialog footer 同时置空，操作按钮由插槽自承
     *   run: async (prompt) => { jobId }      — 发起执行
     *   poll: async (jobId) => { status, output, code }
     *   labels: { copy, copied, run, running, done, failed, outputLabel, openSession, close }
     *   onOpenSession: (sessionId) => void                — 可选；job 出现 sessionId 时渲染「打开会话」
     *   onClose
     *
     * 全部样式内联（主题 token + 回退值），消费者无需自带 CSS。
     */
    var PluginKit = (function () {
      function substituteParams(template, params) {
        var out = String(template || '')
        for (var key in (params || {})) out = out.split('{{' + key + '}}').join(String(params[key]))
        return out
      }

      function makeActionShareDialog(React, options) {
        options = options || {}
        var h = React.createElement
        var useState = React.useState
        var useEffect = React.useEffect
        var useRef = React.useRef
        var doFetch = options.fetch || (typeof fetch !== 'undefined' ? fetch : null)
        var inputStyle = { width: '100%', minHeight: 190, resize: 'vertical', fontFamily: 'var(--dsw-font-family)', lineHeight: 1.6, fontSize: 12, background: 'var(--dsw-alias-bg-layer-2,transparent)', color: 'inherit', border: '1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.3))', borderRadius: '8px', padding: '10px', boxSizing: 'border-box' }
        var paramStyle = { width: '100%', fontFamily: 'var(--dsw-font-family)', lineHeight: 1.5, fontSize: 13, background: 'var(--dsw-alias-bg-layer-2,transparent)', color: 'inherit', border: '1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.3))', borderRadius: '8px', padding: '6px 10px', boxSizing: 'border-box' }
        var btnStyle = { background: 'transparent', color: 'inherit', border: '1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.3))', borderRadius: '8px', padding: '5px 12px', fontSize: 13, cursor: 'pointer', font: 'inherit' }
        // 主按钮亮暗跟随：与 skills-management .sk-btn-primary 同款 token 组合
        var primaryStyle = Object.assign({}, btnStyle, { background: 'var(--dsw-alias-state-business-primary,var(--dsw-alias-brand-primary,#4a7dff))', borderColor: 'transparent', color: 'var(--dsw-alias-label-primary-inverted,#fff)' })

        return function ActionShareDialog(props) {
          var title = props.title
          var hint = props.hint
          var labels = props.labels || {}
          // 模板参数定义（[{key,label,placeholder,multiline,value}]）→ 值表
          var paramDefs = Array.isArray(props.params) ? props.params : []
          var initialParamValues = {}
          for (var pi = 0; pi < paramDefs.length; pi++) {
            var def = paramDefs[pi]
            initialParamValues[def.key] = def.value !== undefined && def.value !== null ? String(def.value) : ''
          }
          var _pv = useState(initialParamValues)
          var paramValues = _pv[0]; var setParamValues = _pv[1]
          var _p = useState(props.initialPrompt || '')
          var prompt = _p[0]; var setPrompt = _p[1]
          // 「上次自动生成的 prompt」ref 镜像：effect 里比较当前 prompt 是否等于它，
          // 判断用户是否手动编辑过——未手改则参数/模板变化可安全覆盖，手改过则保留
          // 手动编辑（ntd ActionButton 的 lastGenerated 同款规则）。旧 dirty 单标记
          // 无法表达「手改后又想让参数替换生效」的场景，且要同时服务 initialPrompt
          // 异步到位的跟随行为，故统一收敛到这一处比较。
          var lastGeneratedRef = useRef(null)
          var _j = useState(null)
          var job = _j[0]; var setJob = _j[1]
          var _b = useState(false)
          var busy = _b[0]; var setBusy = _b[1]
          var _c = useState(false)
          var copied = _c[0]; var setCopied = _c[1]
          var _e = useState('')
          var error = _e[0]; var setError = _e[1]

          // 参数值/模板变化 → 重新生成 prompt；仅当用户未手改时覆盖
          useEffect(function () {
            var generated = substituteParams(props.initialPrompt || '', paramValues)
            var userEdited = lastGeneratedRef.current !== null && prompt !== lastGeneratedRef.current
            lastGeneratedRef.current = generated
            if (!userEdited) setPrompt(generated)
          }, [props.initialPrompt, paramValues])

          useEffect(function () {
            if (job === null || job.status !== 'running' || typeof props.poll !== 'function') return
            var timer = setInterval(function () {
              props.poll(job.jobId).then(function (d) {
                setJob({ jobId: job.jobId, status: d.status, output: d.output || '', code: d.code !== undefined ? d.code : null, sessionId: d.sessionId })
              }).catch(function () {})
            }, 1500)
            return function () { clearInterval(timer) }
          }, [job !== null && job.jobId])

          var setParam = function (key, value) {
            setParamValues(function (prev) {
              var next = {}
              for (var k in prev) next[k] = prev[k]
              next[key] = value
              return next
            })
          }

          var doRun = function () {
            if (typeof props.run !== 'function') return
            setBusy(true); setError('')
            props.run(prompt).then(function (r) {
              setJob({ jobId: r.jobId, status: 'running', output: '', code: null })
            }).catch(function (e) { setError(String(e && e.message)) }).finally(function () { setBusy(false) })
          }
          var canOpenSession = typeof props.onOpenSession === 'function' && job !== null && job.sessionId
          var openSession = function () { props.onOpenSession(job.sessionId) }
          var copy = function () {
            if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(prompt).then(function () { setCopied(true); setTimeout(function () { setCopied(false) }, 1500) }).catch(function () {})
            }
          }
          var statusText = job === null ? '' : job.status === 'running' ? (labels.running || 'running') : job.status === 'done' ? (labels.done || 'done') : (labels.failed || 'failed') + (job.code != null ? ' (' + job.code + ')' : '')
          // 完成态插槽：提供后 job done 由插槽全权渲染（footer 置空，操作按钮插槽自承）
          var completedSlot = typeof props.completedView === 'function' && job !== null && job.status === 'done'

          return h('div', { onClick: function (e) { if (e.target === e.currentTarget && props.onClose) props.onClose() }, style: { position: 'fixed', inset: 0, zIndex: 2147483000, background: 'rgba(0,0,0,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            h('div', { style: { width: 'min(640px,92vw)', maxHeight: '86vh', overflow: 'auto', background: 'var(--dsw-alias-bg-layer-1,#fff)', border: '1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.3))', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: 12, color: 'var(--dsw-alias-label-primary,inherit)', font: 'var(--dsw-font-family,inherit)' } },
              h('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                h('div', { style: { fontSize: 17, fontWeight: 600 } }, title || ''),
                h('button', { onClick: props.onClose, style: Object.assign({}, btnStyle, { marginLeft: 'auto', width: 28, height: 28, padding: 0, borderRadius: 28 }) }, '✕')),
              hint ? h('div', { style: { fontSize: 12, opacity: .7 } }, hint) : null,
              // 模板参数输入区（idle 态；值实时替换进 prompt，位于 prompt 上方与 ntd 同布局）
              paramDefs.length > 0 ? h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
                paramDefs.map(function (d) {
                  return h('label', { key: d.key, style: { display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, opacity: .85 } },
                    h('span', null, d.label || d.key),
                    d.multiline
                      ? h('textarea', { value: paramValues[d.key] || '', placeholder: d.placeholder || '', onChange: function (e) { setParam(d.key, e.target.value) }, spellCheck: false, style: Object.assign({}, paramStyle, { minHeight: 64, resize: 'vertical' }) })
                      : h('input', { value: paramValues[d.key] || '', placeholder: d.placeholder || '', onChange: function (e) { setParam(d.key, e.target.value) }, style: paramStyle }))
                })) : null,
              (props.rows || []).length > 0 ? h('div', { style: { display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13 } },
                props.rows.map(function (r, i) {
                  return r[1] ? h('div', { key: i }, h('b', null, r[0] + '：'), h('span', null, r[1])) : null
                })) : null,
              h('textarea', { value: prompt, onChange: function (e) { setPrompt(e.target.value) }, spellCheck: false, style: inputStyle }),
              error !== '' ? h('div', { style: { fontSize: 12, color: 'var(--dsw-alias-state-error,#c75050)' } }, error) : null,
              completedSlot
                ? props.completedView({ job: job, output: job.output || '', close: props.onClose, retry: doRun })
                : (job !== null ? h('div', null,
                    h('div', { style: { fontSize: 12, opacity: .7, margin: '4px 0' } }, (labels.outputLabel || 'Output') + ' · ' + statusText),
                    h('pre', { style: { maxHeight: 220, margin: 0, overflow: 'auto', whiteSpace: 'pre-wrap', fontSize: 12, background: 'var(--dsw-alias-bg-layer-2,transparent)', border: '1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.2))', borderRadius: '8px', padding: '8px' } }, job.output || '…')) : null),
              completedSlot ? null : h('div', { style: { display: 'flex', gap: 8 } },
                canOpenSession ? h('button', { onClick: openSession, style: btnStyle }, labels.openSession || 'Open chat') : null,
                h('button', { onClick: copy, style: btnStyle }, copied ? (labels.copied || 'Copied') : (labels.copy || 'Copy')),
                h('button', { onClick: doRun, disabled: busy || (job !== null && job.status === 'running'), style: primaryStyle }, job !== null && job.status === 'running' ? (labels.running || 'Running…') : (labels.run || 'Run')))))
        }
      }

      return { substituteParams: substituteParams, makeActionShareDialog: makeActionShareDialog }
    })()

    /**
     * @weibaohui/dsh-process — Browser half（工艺管理）。
     *
     * 三个挂载面：
     * - 侧栏入口行（DOM 注入「新会话」下方，与任务看板同一家族块；滚动数字 = 我的 | 内置）。
     * - 主页面：官方 root 级 `shell.overlay` slot（列表+详情/编辑器全页工作台；侧栏保持可点；
     *   Esc / 点会话行 / 与其他面板互斥时关闭）。
     * - 设置页 section（settings.section，M3）：根目录配置 + 打开工艺库。
     *
     * 数据流：EventSource /dsh-process/events 变更帧 → 全量 refetch + revision 追赶
     * （taskboard S16 同款）；编辑走 baseHash 乐观锁，409 给「重新加载 / 仍然覆盖」。
     *
     * React 是 loader 平台模块；plain Node（契约测试）下降级为最小 shim。
     */

    let __React = null
    try { __React = require('react') } catch {}
    if (!__React || typeof __React.createElement !== 'function') {
      __React = {
        createElement(type, props, ...kids) {
          return { type, props: props || {}, kids: kids.flat(9).filter(k => k !== null && k !== undefined && k !== false && k !== true) }
        },
        useState(init) { const v = [typeof init === 'function' ? init() : init]; return [v[0], x => { v[0] = typeof x === 'function' ? x(v[0]) : x }] },
        useEffect() {}, useMemo(fn) { return fn() }, useRef(v = null) { return { current: v } },
      }
    }
    const { createElement: h, useState, useEffect, useMemo, useRef, useCallback } = __React

    const CLIENT_NAME = '@weibaohui/dsh-process'
    const API = '/dsh-process'
    const NS = 'dshProcess'
    const PANEL_NAME = 'dsh-process'
    const ACTIVATE_EVENT = 'dsh-panel-activate'
    const ENTRY_ATTR = 'data-dsh-prc-entry'
    const PREFS_KEY = 'dsh-prc:prefs'

    // ── i18n ─────────────────────────────────────────────────────────────────

    const ZH = {
      title: '工艺库',
      entryAria: '打开工艺库',
      entryTitle: '工艺库 — 我的 {user} · 内置 {bundled}',
      count: '我的 {user} · 内置 {bundled}',
      searchPlaceholder: '搜索名称 / 描述…',
      filterAll: '全部来源', filterUser: '我的', filterBundled: '内置',
      categoryAll: '全部分类', complexityAll: '全部复杂度',
      sortDefault: '按名称', sortUpdated: '按更新时间', sortComplexity: '按复杂度', sortLinks: '按环节数',
      newTask: '新建', newBlank: '空白工艺', newFromExisting: '复制现有…',
      importBtn: '导入', exportBtn: '导出', exportAll: '全部（zip）', exportUser: '我的库（zip）', exportOne: '本工艺（yaml）',
      settingsBtn: '设置', aiBtn: 'AI 生成',
      close: '关闭', cancel: '取消', save: '保存', confirm: '确认', delete: '删除', edit: '编辑', copy: '复制', rename: '重命名',
      copyToMine: '复制到我的库', reload: '重新加载', overwrite: '仍然覆盖', discard: '放弃修改', keepEditing: '继续编辑',
      tabOverview: '概览', tabStructure: '结构', tabYaml: 'YAML',
      loading: '加载中…', emptyList: '没有匹配的工艺', emptyListHint: '试试清空筛选，或「新建 / 导入」一个工艺',
      emptyDetail: '从左侧选择一个工艺', selectFirst: '左侧选择工艺后在这里看概览、结构与 YAML',
      errOne: '处错误', warnOne: '处警告',
      readOnly: '内置 · 只读', mine: '我的', bundled: '内置',
      limits: '限额', steps: '环节执行上限', tokens: 'token 上限', unlimited: '不限',
      abnormal: '异常触发', phases: '阶段', links: '环节',
      diagnostics: '诊断', noIssues: '校验通过，没有发现问题',
      name: '名称', displayName: '显示名', guid: 'GUID', version: '版本', category: '分类', complexity: '复杂度',
      prompt: '指令 prompt', executor: '执行器', expert: '专家', skills: '技能', model: '模型',
      artifacts: '期望产物', gates: '门禁', flow: '流转', rework: '返工上限', acceptance: '验收标准', reviewPrompt: '复核提示词', reviewType: '复核方式',
      onSuccess: '成功后', onGateFail: '门禁不过', onRatingFail: '评级不过',
      flowNext: '下一环节', flowEnd: '结束', flowBreak: '中止（询问用户）',
      editorTitle: '编辑', editorCreate: '新建工艺', editorCopy: '复制工艺',
      unsaved: '未保存', saved: '已保存', validating: '校验中…',
      saveConflict: '文件已被外部修改（可能是 ntd 或其他编辑器）。', forcedHint: '覆盖将丢弃外部改动。',
      dirtyGuard: '有未保存的修改，确定放弃吗？',
      deleteConfirm: '删除后移入回收站（.trash），确定删除',
      createName: '工艺名（文件名，不含 .yaml）', createDir: '子目录（可选，如 software）', createDisplayName: '显示名（可选）',
      copyName: '新工艺名', importTitle: '导入工艺', importHint: '选择或拖入 .yaml / .yml（可多选），导入到我的库',
      importOverwrite: '覆盖同名文件', importPick: '选择文件', importResults: '导入结果',
      importCreated: '已导入', importOverwritten: '已覆盖', importExists: '同名已存在（未导入）', importInvalid: '校验未通过',
      settingsTitle: '工艺库设置', settingsUserRoot: '我的库根目录', settingsBundledRoot: '内置库根目录（只读）',
      settingsMaxDepth: '扫描深度', settingsCheckRefs: '校验专家/技能引用', settingsSaved: '设置已保存，正在重扫',
      renameTitle: '重命名工艺', newName: '新名称',
      aiTitle: 'AI 生成工艺', aiHint: '描述要解决的需求，AI 会产出一版工艺 YAML；生成后可校验并写入我的库',
      aiRequirement: '要做什么（需求描述）', aiComplexity: '复杂度（light/standard/complex…）', aiReference: '参考工艺（可选）',
      aiPreviewTitle: '生成结果预览', aiSaveName: '写入名称', aiSave: '写入我的库', aiParseFail: '输出里没有找到 YAML 代码块',
      copied: '已复制', copyYaml: '复制 YAML',
      openSession: '打开会话', aiRunning: '生成中…', aiDone: '生成完成',
      openLib: '打开工艺库', settingsSectionHint: '工艺 = ntd 的多阶段 agent 工作流模板；此处配置工艺库根目录。',
      validate: '校验', linesCount: '{n} 行',
      toastSaved: '已保存', toastForceSaved: '已覆盖保存', toastCopied: '已复制到我的库', toastRenamed: '已重命名',
      toastTrashed: '已移入回收站（.trash）', toastImported: '{n} 个工艺已导入', toastAiSaved: '已写入我的库',
      copyPrompt: '复制 Prompt', aiOutput: '输出', aiFailed: '失败', aiRequirementPh: '例如：把口头需求整理成 PRD 并拆解成开发任务',
      kitMissing: 'dsh-plugin-kit 未内联（构建问题）', nameRule: '名称不能为空、不能含 / 或 \\、不能以点开头',
      sessionUnavailable: '当前页面拿不到会话服务，无法跳转',
    }

    const EN = {
      title: 'Processes', entryAria: 'Open process library', entryTitle: 'Processes — mine {user} · bundled {bundled}',
      count: 'mine {user} · bundled {bundled}', searchPlaceholder: 'Search name / description…',
      filterAll: 'All sources', filterUser: 'Mine', filterBundled: 'Bundled',
      categoryAll: 'All categories', complexityAll: 'All complexities',
      sortDefault: 'By name', sortUpdated: 'By updated', sortComplexity: 'By complexity', sortLinks: 'By links',
      newTask: 'New', newBlank: 'Blank process', newFromExisting: 'Duplicate existing…',
      importBtn: 'Import', exportBtn: 'Export', exportAll: 'All (zip)', exportUser: 'Mine (zip)', exportOne: 'This one (yaml)',
      settingsBtn: 'Settings', aiBtn: 'AI generate',
      close: 'Close', cancel: 'Cancel', save: 'Save', confirm: 'OK', delete: 'Delete', edit: 'Edit', copy: 'Duplicate', rename: 'Rename',
      copyToMine: 'Copy to my library', reload: 'Reload', overwrite: 'Overwrite anyway', discard: 'Discard', keepEditing: 'Keep editing',
      tabOverview: 'Overview', tabStructure: 'Structure', tabYaml: 'YAML',
      loading: 'Loading…', emptyList: 'No matching processes', emptyListHint: 'Try clearing filters, or create / import one',
      emptyDetail: 'Pick a process on the left', selectFirst: 'Overview, structure and YAML show up here after you select one',
      errOne: ' error(s)', warnOne: ' warning(s)',
      readOnly: 'Bundled · read-only', mine: 'Mine', bundled: 'Bundled',
      limits: 'Limits', steps: 'max step runs', tokens: 'max tokens', unlimited: 'unlimited',
      abnormal: 'Abnormal trigger', phases: 'phases', links: 'links',
      diagnostics: 'Diagnostics', noIssues: 'No issues found',
      name: 'Name', displayName: 'Display name', guid: 'GUID', version: 'Version', category: 'Category', complexity: 'Complexity',
      prompt: 'Prompt', executor: 'Executor', expert: 'Expert', skills: 'Skills', model: 'Model',
      artifacts: 'Expected artifacts', gates: 'Gates', flow: 'Flow', rework: 'Max rework', acceptance: 'Acceptance', reviewPrompt: 'Review prompt', reviewType: 'Review',
      onSuccess: 'On success', onGateFail: 'On gate fail', onRatingFail: 'On rating fail',
      flowNext: 'next link', flowEnd: 'end', flowBreak: 'break (ask user)',
      editorTitle: 'Edit', editorCreate: 'New process', editorCopy: 'Duplicate process',
      unsaved: 'Unsaved', saved: 'Saved', validating: 'Validating…',
      saveConflict: 'The file was changed externally (ntd or another editor).', forcedHint: 'Overwriting discards those changes.',
      dirtyGuard: 'Discard unsaved changes?',
      deleteConfirm: 'Delete moves the file into .trash. Delete',
      createName: 'Process name (file name, no .yaml)', createDir: 'Sub-directory (optional, e.g. software)', createDisplayName: 'Display name (optional)',
      copyName: 'New process name', importTitle: 'Import processes', importHint: 'Pick or drop .yaml / .yml files (multi-select) into MY library',
      importOverwrite: 'Overwrite existing files', importPick: 'Choose files', importResults: 'Results',
      importCreated: 'imported', importOverwritten: 'overwritten', importExists: 'skipped (exists)', importInvalid: 'invalid',
      settingsTitle: 'Process library settings', settingsUserRoot: 'My library root', settingsBundledRoot: 'Bundled library root (read-only)',
      settingsMaxDepth: 'Scan depth', settingsCheckRefs: 'Validate expert/skill references', settingsSaved: 'Settings saved; rescanning',
      renameTitle: 'Rename process', newName: 'New name',
      aiTitle: 'AI generate process', aiHint: 'Describe the need; AI drafts a process YAML you can validate and save into MY library',
      aiRequirement: 'What should it do', aiComplexity: 'Complexity (light/standard/complex…)', aiReference: 'Reference process (optional)',
      aiPreviewTitle: 'Generated preview', aiSaveName: 'Save as', aiSave: 'Save to my library', aiParseFail: 'No YAML code block found in the output',
      copied: 'Copied', copyYaml: 'Copy YAML',
      openSession: 'Open chat', aiRunning: 'Generating…', aiDone: 'Generated',
      openLib: 'Open process library', settingsSectionHint: 'A process is an ntd multi-phase agent workflow template; configure library roots here.',
      validate: 'Validate', linesCount: '{n} lines',
      toastSaved: 'Saved', toastForceSaved: 'Overwritten and saved', toastCopied: 'Copied to my library', toastRenamed: 'Renamed',
      toastTrashed: 'Moved to .trash', toastImported: '{n} process(es) imported', toastAiSaved: 'Saved to my library',
      copyPrompt: 'Copy prompt', aiOutput: 'Output', aiFailed: 'Failed', aiRequirementPh: 'e.g. turn a verbal requirement into a PRD and split it into dev tasks',
      kitMissing: 'dsh-plugin-kit not inlined (build issue)', nameRule: 'Name must be non-empty, without / or \\, and not start with a dot',
      sessionUnavailable: 'Session service unavailable on this page',
    }

    function makeT(bound) {
      return (key, vars) => {
        let out = (bound && bound(key)) || EN[key] || ZH[key] || key
        if (vars) for (const [k, v] of Object.entries(vars)) out = out.split('{' + k + '}').join(String(v))
        return out
      }
    }

    // ── 样式 ─────────────────────────────────────────────────────────────────

    const STYLE = `
    .dsh-prc-entry { display:flex; align-items:center; gap:8px; position:relative; width:calc(100% - 8px); margin:2px 4px; padding:6px 10px; border:none; border-radius:8px; background:transparent; color:var(--dsw-text-secondary, inherit); font:inherit; font-size:13px; cursor:pointer; text-align:left; }
    .dsh-prc-entry:hover { background:var(--dsw-hover, rgba(128,128,128,.12)); color:var(--dsw-text-primary, inherit); }
    .dsh-prc-entry[data-active="true"] { background:var(--dsw-active, rgba(128,128,128,.18)); color:var(--dsw-text-primary, inherit); font-weight:500; }
    .dsh-prc-entry svg { flex:none; }
    .dsh-prc-entry-stats { margin-left:auto; display:inline-flex; align-items:center; gap:3px; font-size:11px; line-height:1; color:var(--dsw-text-secondary, gray); font-variant-numeric:tabular-nums; white-space:nowrap; }
    .dsh-prc-entry-sep { opacity:.5; }
    .dsh-prc-roll { position:relative; display:inline-block; overflow:hidden; height:12px; min-width:1ch; text-align:center; vertical-align:middle; }
    .dsh-prc-roll[data-stat="user"] { color:#3e63dd; }
    .dsh-prc-roll[data-stat="bundled"] { color:#8e8e93; }
    .dsh-prc-rn { display:block; height:12px; line-height:12px; text-align:center; }
    .dsh-prc-rn-next { position:absolute; left:0; right:0; top:100%; }
    .dsh-prc-roll[data-dir="down"] .dsh-prc-rn-next { top:auto; bottom:100%; }
    .dsh-prc-roll .dsh-prc-rn { transition:transform .3s cubic-bezier(.25,.1,.25,1); }
    .dsh-prc-roll[data-anim="1"][data-dir="up"] .dsh-prc-rn { transform:translateY(-100%); }
    .dsh-prc-roll[data-anim="1"][data-dir="down"] .dsh-prc-rn { transform:translateY(100%); }
    @media (prefers-reduced-motion: reduce) { .dsh-prc-roll .dsh-prc-rn { transition:none; } }
    [data-sidebar-collapsed] [data-dsh-prc-entry], [class*="_collapsed"] [data-dsh-prc-entry] { width:36px; height:36px; min-width:36px; margin:0 0 12px; padding:0; justify-content:center; gap:0; text-align:center; }
    [data-sidebar-collapsed] [data-dsh-prc-entry] .dsh-prc-entry-label, [data-sidebar-collapsed] [data-dsh-prc-entry] .dsh-prc-entry-stats,
    [class*="_collapsed"] [data-dsh-prc-entry] .dsh-prc-entry-label, [class*="_collapsed"] [data-dsh-prc-entry] .dsh-prc-entry-stats { display:none; }

    .dsh-prc-panel { position:absolute; top:0; bottom:0; right:0; display:flex; flex-direction:column; overflow:hidden; pointer-events:auto; background:var(--dsw-alias-bg-base, var(--dsw-bg, #fff)); color:var(--dsw-alias-label-primary, var(--dsw-text-primary, inherit)); font:var(--dsw-font-family, inherit); font-size:13px; z-index:1; }
    .dsh-prc-toolbar { display:flex; align-items:center; gap:8px; flex-wrap:wrap; padding:10px 14px; border-bottom:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.35)); background:var(--dsw-alias-bg-layer-1, transparent); }
    .dsh-prc-title { font-size:15px; font-weight:600; margin:0; }
    .dsh-prc-count { font-size:12px; color:var(--dsw-text-secondary, gray); }
    .dsh-prc-spacer { flex:1; }
    .dsh-prc-btn { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.35)); background:transparent; color:inherit; border-radius:8px; padding:5px 10px; font:inherit; font-size:13px; cursor:pointer; white-space:nowrap; }
    .dsh-prc-btn:hover { background:var(--dsw-hover, rgba(128,128,128,.12)); }
    .dsh-prc-btn[data-primary="true"] { background:var(--dsw-alias-button-primary-fill, var(--dsw-alias-brand-primary, #1f2328)); border-color:transparent; color:var(--dsw-alias-label-primary-inverted, #fff); }
    .dsh-prc-btn[data-danger="true"] { color:var(--dsw-alias-state-error, #c75050); border-color:var(--dsw-alias-state-error, #c75050); }
    .dsh-prc-btn:disabled { opacity:.5; cursor:default; }
    .dsh-prc-input, .dsh-prc-select { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.35)); background:var(--dsw-alias-bg-layer-2, transparent); color:inherit; border-radius:8px; padding:5px 8px; font:inherit; font-size:13px; }
    .dsh-prc-search { width:170px; }
    .dsh-prc-body { flex:1; display:flex; min-height:0; }
    .dsh-prc-list { width:300px; min-width:240px; overflow-y:auto; border-right:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.35)); padding:6px; box-sizing:border-box; }
    .dsh-prc-group { margin:8px 2px 4px; font-size:11px; color:var(--dsw-text-secondary, gray); display:flex; align-items:center; gap:6px; }
    .dsh-prc-row { display:flex; flex-direction:column; gap:3px; width:100%; text-align:left; border:1px solid transparent; border-left-width:3px; border-radius:8px; background:transparent; color:inherit; padding:7px 9px; margin:2px 0; cursor:pointer; font:inherit; font-size:13px; position:relative; box-sizing:border-box; }
    .dsh-prc-row:hover { background:var(--dsw-hover, rgba(128,128,128,.1)); }
    .dsh-prc-row[data-selected="true"] { background:var(--dsw-active, rgba(128,128,128,.16)); border-color:var(--dsw-alias-border-l2, rgba(128,128,128,.3)); }
    .dsh-prc-row[data-complexity="light"] { border-left-color:#3e63dd; }
    .dsh-prc-row[data-complexity="lightweight"] { border-left-color:#2aa198; }
    .dsh-prc-row[data-complexity="standard"] { border-left-color:#8e8e93; }
    .dsh-prc-row[data-complexity="medium"] { border-left-color:#d9822b; }
    .dsh-prc-row[data-complexity="complex"] { border-left-color:#8e4ec6; }
    .dsh-prc-row[data-source="bundled"] { border-left-style:dashed; }
    .dsh-prc-row-name { font-weight:500; display:flex; align-items:center; gap:6px; min-width:0; }
    .dsh-prc-row-name span.lbl { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .dsh-prc-row-meta { display:flex; gap:6px; align-items:center; font-size:11px; color:var(--dsw-text-secondary, gray); flex-wrap:wrap; }
    .dsh-prc-badge { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:6px; padding:0 5px; font-size:10px; line-height:16px; white-space:nowrap; }
    .dsh-prc-badge[data-kind="err"] { color:var(--dsw-alias-state-error, #c75050); border-color:var(--dsw-alias-state-error, #c75050); }
    .dsh-prc-badge[data-kind="warn"] { color:#b8860b; border-color:#b8860b; }
    .dsh-prc-dot { width:6px; height:6px; border-radius:6px; display:inline-block; }
    .dsh-prc-dot[data-kind="err"] { background:var(--dsw-alias-state-error, #c75050); }
    .dsh-prc-dot[data-kind="warn"] { background:#d9a514; }
    .dsh-prc-detail { flex:1; min-width:0; overflow-y:auto; padding:14px 18px; box-sizing:border-box; }
    .dsh-prc-detail-head { display:flex; align-items:flex-start; gap:10px; flex-wrap:wrap; margin-bottom:10px; }
    .dsh-prc-detail-title { font-size:17px; font-weight:600; margin:0; }
    .dsh-prc-chips { display:flex; gap:6px; align-items:center; flex-wrap:wrap; margin:6px 0 12px; }
    .dsh-prc-chip { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:999px; padding:1px 9px; font-size:11px; white-space:nowrap; }
    .dsh-prc-actions { margin-left:auto; display:flex; gap:6px; flex-wrap:wrap; }
    .dsh-prc-tabs { display:flex; gap:2px; border-bottom:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); margin-bottom:12px; }
    .dsh-prc-tab { border:none; background:transparent; color:var(--dsw-text-secondary, inherit); padding:7px 12px; font:inherit; font-size:13px; cursor:pointer; border-bottom:2px solid transparent; }
    .dsh-prc-tab[data-on="true"] { color:var(--dsw-text-primary, inherit); font-weight:600; border-bottom-color:var(--dsw-alias-brand-primary, currentColor); }
    .dsh-prc-desc { white-space:pre-wrap; line-height:1.65; margin:0 0 12px; }
    .dsh-prc-kv { display:flex; gap:8px; font-size:12px; margin:3px 0; flex-wrap:wrap; }
    .dsh-prc-kv b { opacity:.7; font-weight:500; }
    .dsh-prc-diag { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:8px; padding:8px 10px; margin:6px 0; display:flex; flex-direction:column; gap:4px; }
    .dsh-prc-diag-item { display:flex; gap:8px; align-items:baseline; cursor:pointer; font-size:12px; border:none; background:transparent; color:inherit; padding:2px 4px; border-radius:6px; text-align:left; font:inherit; width:100%; box-sizing:border-box; }
    .dsh-prc-diag-item:hover { background:var(--dsw-hover, rgba(128,128,128,.1)); }
    .dsh-prc-diag-item[data-kind="err"] .dsh-prc-diag-code { color:var(--dsw-alias-state-error, #c75050); }
    .dsh-prc-diag-item[data-kind="warn"] .dsh-prc-diag-code { color:#b8860b; }
    .dsh-prc-diag-code { font-weight:600; flex:none; }
    .dsh-prc-diag-line { opacity:.6; flex:none; min-width:34px; }
    .dsh-prc-phase { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:10px; padding:10px 12px; margin:8px 0; }
    .dsh-prc-phase-head { display:flex; align-items:baseline; gap:8px; font-weight:600; }
    .dsh-prc-phase-spec { white-space:pre-wrap; font-size:12px; opacity:.8; margin:6px 0; }
    .dsh-prc-link { border-top:1px dashed var(--dsw-alias-border-l1, rgba(128,128,128,.2)); margin-top:6px; padding-top:6px; }
    .dsh-prc-link-row { display:flex; align-items:baseline; gap:8px; width:100%; border:none; background:transparent; color:inherit; font:inherit; font-size:13px; cursor:pointer; padding:4px 2px; border-radius:6px; text-align:left; box-sizing:border-box; }
    .dsh-prc-link-row:hover { background:var(--dsw-hover, rgba(128,128,128,.1)); }
    .dsh-prc-link-id { font-family:ui-monospace, SFMono-Regular, Menlo, monospace; font-size:11px; opacity:.75; flex:none; }
    .dsh-prc-link-meta { font-size:11px; color:var(--dsw-text-secondary, gray); margin-left:auto; display:flex; gap:6px; flex-wrap:wrap; }
    .dsh-prc-link-body { padding:6px 8px 2px; display:flex; flex-direction:column; gap:6px; }
    .dsh-prc-pre { white-space:pre-wrap; line-height:1.6; font-size:12px; background:var(--dsw-alias-bg-layer-2, rgba(128,128,128,.07)); border:1px solid var(--dsw-alias-border-l1, rgba(128,128,128,.2)); border-radius:8px; padding:8px 10px; margin:0; overflow-x:auto; }
    .dsh-prc-code { font-family:ui-monospace, SFMono-Regular, Menlo, monospace; font-size:12px; line-height:1.55; border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:10px; overflow:auto; max-height:calc(100vh - 260px); background:var(--dsw-alias-bg-layer-2, rgba(128,128,128,.05)); }
    .dsh-prc-code-line { display:flex; }
    .dsh-prc-code-line[data-hl="true"] { background:rgba(217,130,43,.18); }
    .dsh-prc-code-no { flex:none; width:44px; text-align:right; padding-right:10px; color:var(--dsw-text-secondary, gray); user-select:none; opacity:.7; }
    .dsh-prc-code-tx { white-space:pre; padding-right:16px; }
    .dsh-prc-cm { color:var(--dsw-text-secondary, gray); font-style:italic; }
    .dsh-prc-key { color:#3e63dd; }
    .dsh-prc-editor { display:flex; flex-direction:column; gap:8px; flex:1; min-height:0; }
    .dsh-prc-editor-wrap { display:flex; flex:1; min-height:0; border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.35)); border-radius:10px; overflow:hidden; background:var(--dsw-alias-bg-layer-2, rgba(128,128,128,.05)); }
    .dsh-prc-gutter { flex:none; width:46px; text-align:right; padding:8px 10px 8px 0; font-family:ui-monospace, SFMono-Regular, Menlo, monospace; font-size:12px; line-height:19px; color:var(--dsw-text-secondary, gray); overflow:hidden; user-select:none; opacity:.7; box-sizing:border-box; }
    .dsh-prc-textarea { flex:1; border:none; outline:none; resize:none; background:transparent; color:inherit; font-family:ui-monospace, SFMono-Regular, Menlo, monospace; font-size:12px; line-height:19px; padding:8px 12px; white-space:pre; overflow:auto; tab-size:2; }
    .dsh-prc-status { display:flex; gap:10px; align-items:center; font-size:12px; color:var(--dsw-text-secondary, gray); flex-wrap:wrap; }
    .dsh-prc-conflict { border:1px solid var(--dsw-alias-state-error, #c75050); border-radius:8px; padding:8px 10px; display:flex; gap:8px; align-items:center; flex-wrap:wrap; font-size:12px; }
    .dsh-prc-modal-backdrop { position:fixed; inset:0; z-index:2147482900; background:rgba(0,0,0,.45); display:flex; align-items:center; justify-content:center; }
    .dsh-prc-modal { width:min(560px, 92vw); max-height:86vh; overflow:auto; background:var(--dsw-alias-bg-layer-1, #fff); color:var(--dsw-alias-label-primary, inherit); border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:14px; padding:18px; display:flex; flex-direction:column; gap:12px; font:var(--dsw-font-family, inherit); }
    .dsh-prc-modal h3 { margin:0; font-size:16px; }
    .dsh-prc-field { display:flex; flex-direction:column; gap:4px; font-size:12px; }
    .dsh-prc-field input, .dsh-prc-field select { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); background:var(--dsw-alias-bg-layer-2, transparent); color:inherit; border-radius:8px; padding:6px 10px; font:inherit; font-size:13px; }
    .dsh-prc-menuback { position:fixed; inset:0; z-index:2147482800; }
    .dsh-prc-menu { position:fixed; z-index:2147482850; background:var(--dsw-alias-bg-overlay, var(--dsw-alias-bg-layer-1, #252830)); color:var(--dsw-alias-label-primary, inherit); border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:10px; padding:4px; display:flex; flex-direction:column; min-width:150px; box-shadow:0 8px 30px rgba(0,0,0,.25); }
    .dsh-prc-menu button { border:none; background:transparent; color:inherit; text-align:left; padding:7px 10px; border-radius:7px; font:inherit; font-size:13px; cursor:pointer; white-space:nowrap; }
    .dsh-prc-menu button:hover { background:var(--dsw-hover, rgba(128,128,128,.15)); }
    .dsh-prc-toast { position:fixed; left:50%; bottom:26px; transform:translateX(-50%); z-index:2147483000; background:var(--dsw-alias-bg-overlay, #252830); color:var(--dsw-alias-label-primary, #fff); border-radius:10px; padding:8px 14px; font-size:13px; box-shadow:0 6px 24px rgba(0,0,0,.3); max-width:70vw; }
    .dsh-prc-toast[data-kind="err"] { outline:1px solid var(--dsw-alias-state-error, #c75050); }
    .dsh-prc-empty { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; color:var(--dsw-text-secondary, gray); text-align:center; padding:20px; }
    .dsh-prc-error { margin:8px 14px 0; border:1px solid var(--dsw-alias-state-error, #c75050); color:var(--dsw-alias-state-error, #c75050); border-radius:8px; padding:6px 10px; font-size:12px; }
    .dsh-prc-drop { border:2px dashed var(--dsw-alias-border-l2, rgba(128,128,128,.4)); border-radius:10px; padding:22px; text-align:center; font-size:12px; color:var(--dsw-text-secondary, gray); }
    .dsh-prc-drop[data-over="true"] { border-color:var(--dsw-alias-brand-primary, #3e63dd); }
    .dsh-prc-sec { margin:10px 0; }
    .dsh-prc-sec h4 { margin:0 0 6px; font-size:13px; }
    `

    let stylesInjected = false
    function ensureStyles() {
      if (stylesInjected || typeof document === 'undefined') return
      const el = document.createElement('style')
      el.id = 'dsh-prc-styles'
      el.textContent = STYLE
      document.head.appendChild(el)
      stylesInjected = true
    }

    // ── API 帮手 ─────────────────────────────────────────────────────────────

    async function api(path, opts) {
      const res = await fetch(API + path, {
        method: (opts && opts.method) || 'GET',
        headers: opts && opts.body ? { 'content-type': 'application/json' } : undefined,
        body: opts && opts.body ? JSON.stringify(opts.body) : undefined,
        signal: AbortSignal.timeout ? AbortSignal.timeout(30000) : undefined,
      })
      let data = {}
      try { data = await res.json() } catch { /* 空响应 */ }
      if (!res.ok) {
        const e = new Error(data.error || (res.statusText + ' (' + res.status + ')'))
        e.code = data.code
        e.status = res.status
        e.data = data
        throw e
      }
      return data
    }

    function loadPrefs() {
      try { return JSON.parse(localStorage.getItem(PREFS_KEY)) || {} } catch { return {} }
    }
    function savePrefs(prefs) {
      try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)) } catch { /* 隐身模式等 */ }
    }

    // ── Controller ───────────────────────────────────────────────────────────

    function initialState() {
      const prefs = loadPrefs()
      return {
        loaded: false, revision: 0, roots: { user: '', bundled: '' }, processes: [], lastError: undefined, error: undefined,
        panelOpen: false,
        selectedId: prefs.selectedId, tab: prefs.tab || 'overview',
        item: undefined, itemLoading: false, highlightLine: undefined,
        search: '', filters: Object.assign({ source: 'all', category: '', complexity: '' }, prefs.filters || {}),
        sortBy: prefs.sortBy || 'default',
        editor: null,
        dialog: null,
        toast: null,
        settings: undefined,
      }
    }

    class Controller {
      constructor() {
        this.state = initialState()
        this.subs = new Set()
        this.es = null
        this.seenRevision = undefined
        this.refreshInFlight = null
        this.validateTimer = null
        this.toastTimer = null
        this.disposed = false
      }
      getSnapshot() { return this.state }
      subscribe(fn) { this.subs.add(fn); return () => { this.subs.delete(fn) } }
      setState(patch) { this.state = { ...this.state, ...patch }; this.emit() }
      emit() { if (this.disposed) return; for (const fn of this.subs) { try { fn() } catch {} } }
      persist() {
        const s = this.state
        savePrefs({ selectedId: s.selectedId, tab: s.tab, filters: s.filters, sortBy: s.sortBy })
      }
      toast(text, kind) {
        this.setState({ toast: { text, kind: kind || 'ok' } })
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => { if (!this.disposed) this.setState({ toast: null }) }, 2600)
      }

      start() {
        void this.refresh()
        try { this.connectStream() } catch { /* EventSource 不可用：仅手动刷新 */ }
      }
      connectStream() {
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
      }
      async refresh() {
        if (this.refreshInFlight) return this.refreshInFlight
        this.refreshInFlight = (async () => {
          try {
            let snap
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
            }
            // 选中项跟随外部改动：非编辑态自动刷新；编辑态不打断（保存时乐观锁兜底）
            if (this.state.selectedId && !this.state.itemLoading) {
              if (this.state.editor && this.state.editor.id === this.state.selectedId) { /* 编辑中：跳过 */ }
              else if (this.state.item && this.state.item.meta.id === this.state.selectedId) {
                const fresh = snap.processes.find((p) => p.id === this.state.selectedId)
                if (fresh && this.state.item.meta.hash !== fresh.hash) void this.loadItem(this.state.selectedId)
              } else void this.loadItem(this.state.selectedId)
            }
          } catch (error) {
            this.setState({ error: String(error && error.message || error) })
          } finally {
            this.refreshInFlight = null
          }
        })()
        return this.refreshInFlight
      }
      dispose() {
        this.disposed = true
        if (this.es) { try { this.es.close() } catch {} }
        if (this.validateTimer) clearTimeout(this.validateTimer)
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.subs.clear()
      }

      // ── 面板 ──
      openPanel() {
        this.setState({ panelOpen: true })
        try { document.dispatchEvent(new CustomEvent(ACTIVATE_EVENT, { detail: PANEL_NAME })) } catch {}
        if (!this.state.loaded) void this.refresh()
      }
      closePanel() { this.setState({ panelOpen: false, dialog: null }) }
      togglePanel() { if (this.state.panelOpen) this.closePanel(); else this.openPanel() }

      // ── 选择 / 筛选 ──
      select(id) {
        if (!id) return
        const ed = this.state.editor
        if (ed && ed.id !== id) {
          // 编辑中切换：脏了先确认，干净直接关编辑器
          if (ed.dirty) {
            this.setState({ dialog: { type: 'confirm', message: this.tr('dirtyGuard'), danger: true, yes: 'discard', onYes: () => { this.setState({ editor: null, dialog: null }); this.select(id) } } })
            return
          }
          this.setState({ editor: null })
        }
        this.setState({ selectedId: id, item: undefined, itemLoading: true, highlightLine: undefined })
        this.persist()
        void this.loadItem(id)
      }
      async loadItem(id) {
        try {
          const item = await api('/item?id=' + encodeURIComponent(id))
          if (this.state.selectedId !== id) return
          this.setState({ item, itemLoading: false })
        } catch (error) {
          if (this.state.selectedId === id) this.setState({ itemLoading: false, error: String(error && error.message || error) })
        }
      }
      /** 跳到某个会话（AI 生成任务的会话）：客户端 sessions 服务 open(id)，逐次懒解析。 */
      openSession(sessionId) {
        const svc = this.sessionsSvc
        if (!svc || typeof svc.open !== 'function') { this.toast(this.tr('sessionUnavailable'), 'err'); return }
        try { svc.open(sessionId); this.closePanel() } catch (error) { this.toast(String(error && error.message || error), 'err') }
      }
      tr(key, vars) { return this.t ? this.t(key, vars) : (ZH[key] || key) }
      setTab(tab) { this.setState({ tab }); this.persist() }
      setSearch(search) { this.setState({ search }) }
      setFilter(key, value) {
        const filters = { ...this.state.filters, [key]: value }
        this.setState({ filters }); this.persist()
      }
      setSortBy(sortBy) { this.setState({ sortBy }); this.persist() }

      // ── 编辑器 ──
      openEditor(payload) {
        this.setState({
          editor: {
            mode: payload.mode, id: payload.id || null, name: payload.name || '', dir: payload.dir || '',
            text: payload.text || '', baseHash: payload.baseHash || null, original: payload.text || '',
            dirty: false, diagnostics: payload.diagnostics || null, busy: false, conflict: null, error: null,
          },
        })
        this.scheduleValidate(50)
      }
      async editSelected() {
        const item = this.state.item
        if (!item) return
        this.openEditor({ mode: 'update', id: item.meta.id, text: item.yaml, baseHash: item.hash, diagnostics: item.diagnostics })
      }
      async createBlank(name, dir, displayName) {
        try {
          const q = '?name=' + encodeURIComponent(name) + (displayName ? '&displayName=' + encodeURIComponent(displayName) : '')
          const { yaml } = await api('/skeleton' + q)
          this.setState({ dialog: null })
          this.openEditor({ mode: 'create', name, dir, text: yaml })
        } catch (error) { this.toast(String(error && error.message || error), 'err') }
      }
      setEditorText(text) {
        const ed = this.state.editor
        if (!ed) return
        this.setState({ editor: { ...ed, text, dirty: text !== ed.original, conflict: null } })
        this.scheduleValidate()
      }
      scheduleValidate(delay) {
        if (this.validateTimer) clearTimeout(this.validateTimer)
        this.validateTimer = setTimeout(() => { this.validateTimer = null; void this.validateEditor() }, delay === undefined ? 400 : delay)
      }
      async validateEditor() {
        const ed = this.state.editor
        if (!ed || ed.text.trim() === '') return
        try {
          const d = await api('/validate', { method: 'POST', body: { yaml: ed.text } })
          const cur = this.state.editor
          if (cur && cur.text === ed.text) this.setState({ editor: { ...cur, diagnostics: { errors: d.errors, warnings: d.warnings } } })
        } catch { /* 校验失败不打断输入 */ }
      }
      async saveEditor(force) {
        const ed = this.state.editor
        if (!ed || ed.busy) return
        this.setState({ editor: { ...ed, busy: true, error: null } })
        try {
          let body
          if (ed.mode === 'create') body = { mode: 'create', name: ed.name, dir: ed.dir, yaml: ed.text }
          else body = { mode: 'update', id: ed.id, yaml: ed.text, baseHash: force && ed.conflict ? ed.conflict.currentHash : ed.baseHash }
          const result = await api('/save', { method: 'POST', body })
          this.setState({ editor: null, dialog: null })
          this.select(result.id)
          void this.refresh()
          this.toast(force ? this.tr('toastForceSaved') : this.tr('toastSaved'))
        } catch (error) {
          const cur = this.state.editor
          if (!cur) return
          if (error.code === 'conflict') this.setState({ editor: { ...cur, busy: false, conflict: { currentHash: error.data && error.data.currentHash }, error: null } })
          else if (error.data && error.data.diagnostics) this.setState({ editor: { ...cur, busy: false, diagnostics: error.data.diagnostics, error: String(error.message) } })
          else this.setState({ editor: { ...cur, busy: false, error: String(error && error.message || error) } })
        }
      }
      async reloadEditor() {
        const ed = this.state.editor
        if (!ed || !ed.id) return
        try {
          const item = await api('/item?id=' + encodeURIComponent(ed.id))
          this.setState({ editor: { ...ed, text: item.yaml, original: item.yaml, baseHash: item.hash, dirty: false, conflict: null, diagnostics: item.diagnostics, error: null } })
        } catch (error) { this.toast(String(error && error.message || error), 'err') }
      }
      requestCloseEditor() {
        const ed = this.state.editor
        if (ed && ed.dirty) this.setState({ dialog: { type: 'confirm', message: this.tr('dirtyGuard'), danger: true, yes: 'discard', onYes: () => this.setState({ editor: null, dialog: null }) } })
        else this.setState({ editor: null })
      }

      // ── 动作 ──
      async copyProcess(fromId, name, dir) {
        try {
          const result = await api('/save', { method: 'POST', body: { mode: 'copy', fromId, name, dir } })
          this.setState({ dialog: null })
          this.select(result.id)
          void this.refresh()
          this.toast(this.tr('toastCopied'))
        } catch (error) { this.toast(String(error && error.message || error), 'err') }
      }
      async renameProcess(id, newName) {
        try {
          const result = await api('/rename', { method: 'POST', body: { id, newName } })
          this.setState({ dialog: null })
          this.select(result.id || id)
          void this.refresh()
          this.toast(this.tr('toastRenamed'))
        } catch (error) { this.toast(String(error && error.message || error), 'err') }
      }
      async removeProcess(id) {
        try {
          await api('/delete', { method: 'POST', body: { id } })
          this.setState({ dialog: null, selectedId: undefined, item: undefined, editor: null })
          await this.refresh()
          this.toast(this.tr('toastTrashed'))
        } catch (error) { this.toast(String(error && error.message || error), 'err') }
      }
      async importFiles(files, overwrite) {
        const results = await api('/import', { method: 'POST', body: { files, overwrite } }).then((d) => d.results)
        await this.refresh()
        return results
      }
      async loadSettings() {
        const d = await api('/settings')
        this.setState({ settings: d.settings })
        return d.settings
      }
      async saveSettings(patch) {
        const d = await api('/settings', { method: 'POST', body: patch })
        this.setState({ settings: d.settings })
        await this.refresh()
        return d.settings
      }
      aiRun(prompt) { return api('/ai-generate', { method: 'POST', body: { prompt } }).then((d) => d.jobId) }
      aiPoll(jobId) { return api('/jobs?id=' + encodeURIComponent(jobId)) }
    }

    // ── 侧栏入口行（DOM 注入，taskboard 家族同款） ─────────────────────────────

    const ICON = '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1.5" y="1.5" width="5" height="4.5" rx="1"/><rect x="9.5" y="10" width="5" height="4.5" rx="1"/><path d="M4 6v3.5A1.5 1.5 0 0 0 5.5 11h4"/></svg>'

    function sidebarRoot() {
      const column = document.querySelector('[data-pane="sidebar"], [class*="sidebarCol"], .dshDesktopUpstreamSidebar, .dshDesktopSidebarSurface')
      if (column === null) return undefined
      const logoOwner = column.querySelector('[class*="logoRow"]') && column.querySelector('[class*="logoRow"]').parentElement
      return logoOwner || (column.firstElementChild || undefined)
    }

    function newSessionButton(root) {
      const nested = root.querySelector('button[class*="newSession"]')
      if (nested) return nested
      for (const child of root.children) {
        if (child instanceof HTMLButtonElement && !child.matches('[' + ENTRY_ATTR + ']')) return child
      }
      const byAria = root.querySelector('button[aria-label="新建会话"], button[aria-label="New Session"], button[aria-label*="新会话"], button[aria-label*="new session" i]')
      if (byAria) return byAria
      const buttons = Array.from(root.querySelectorAll('button'))
      return buttons.find((b) => !b.matches('[' + ENTRY_ATTR + ']') && /新会话|新建会话|new session/i.test(b.textContent || ''))
    }

    function createEntry(controller, t) {
      const entry = document.createElement('button')
      entry.type = 'button'
      entry.setAttribute(ENTRY_ATTR, '')
      entry.className = 'dsh-prc-entry'
      entry.setAttribute('aria-label', t('entryAria'))
      entry.innerHTML = '<span class="dsh-prc-entry-icon">' + ICON + '</span><span class="dsh-prc-entry-label"></span><span class="dsh-prc-entry-stats"></span>'
      entry.addEventListener('click', () => controller.togglePanel())
      return entry
    }

    function setRollValue(slot, value) {
      const text = String(value)
      if (slot.dataset.value === text) return
      const previous = slot.dataset.value
      slot.dataset.value = text
      slot.style.minWidth = text.length + 'ch'
      if (previous === undefined) { slot.textContent = text; return }
      if (slot.dataset.busy === '1') { slot.dataset.busy = ''; slot.dataset.anim = '' }
      const oldEl = document.createElement('span'); oldEl.className = 'dsh-prc-rn'; oldEl.textContent = previous
      const newEl = document.createElement('span'); newEl.className = 'dsh-prc-rn dsh-prc-rn-next'; newEl.textContent = text
      slot.replaceChildren(oldEl, newEl)
      slot.dataset.dir = value > Number(previous) ? 'up' : 'down'
      slot.dataset.busy = '1'
      requestAnimationFrame(() => { slot.dataset.anim = '1' })
      const finish = () => {
        if (slot.dataset.busy !== '1') return
        slot.dataset.busy = ''; slot.dataset.anim = ''
        slot.textContent = slot.dataset.value || ''
      }
      slot.addEventListener('transitionend', finish, { once: true })
      setTimeout(finish, 400)
    }

    function wireEntrySync(entry, controller, t) {
      const stats = entry.querySelector('.dsh-prc-entry-stats')
      const label = entry.querySelector('.dsh-prc-entry-label')
      const slots = []
      if (stats) {
        for (let i = 0; i < 2; i++) {
          if (i > 0) { const sep = document.createElement('span'); sep.className = 'dsh-prc-entry-sep'; sep.textContent = '|'; stats.append(sep) }
          const slot = document.createElement('span')
          slot.className = 'dsh-prc-roll'
          slot.dataset.stat = i === 0 ? 'user' : 'bundled'
          stats.append(slot); slots.push(slot)
        }
      }
      const sync = () => {
        const s = controller.getSnapshot()
        if (s.panelOpen) entry.dataset.active = 'true'; else delete entry.dataset.active
        const user = s.processes.filter((p) => p.source === 'user').length
        const bundled = s.processes.filter((p) => p.source === 'bundled').length
        if (slots[0]) setRollValue(slots[0], user)
        if (slots[1]) setRollValue(slots[1], bundled)
        if (label) label.textContent = t('title')
        entry.setAttribute('aria-label', t('entryAria'))
        entry.title = t('entryTitle', { user, bundled })
      }
      return sync
    }

    function placeEntry(root, entry) {
      const button = newSessionButton(root)
      if (!button) return false
      if (entry.parentElement !== root) {
        const family = Array.from(root.children).filter((el) => el instanceof HTMLElement
          && el.matches('[' + ENTRY_ATTR + '], [data-dsh-atb-entry], [data-dsh-taskboard-entry], [data-dsh-ssh-entry]'))
        if (family.length > 0) {
          const last = family[family.length - 1]
          last.parentElement.insertBefore(entry, last.nextSibling)
        } else {
          const row = button.closest('[class*="logoRow"]')
          const base = (row && row.parentElement === root) ? row : button
          root.insertBefore(entry, base.nextSibling)
        }
      }
      return true
    }

    function mountSidebarEntry(controller, t) {
      const entry = createEntry(controller, t)
      const debug = { attempts: 0, found: false, placed: false }
      try {
        const host = globalThis.location && globalThis.location.hostname
        if (host === 'localhost' || host === '127.0.0.1') window.__prcDebug = debug
      } catch {}
      let root
      let placed = false
      const tryPlace = () => {
        debug.attempts++
        if (root && !root.isConnected) { rootObserver.disconnect(); root = undefined; placed = false }
        if (placed) {
          if (document.body.contains(entry)) return
          rootObserver.disconnect(); root = undefined; placed = false
        }
        root = root || sidebarRoot()
        if (!root) return
        debug.found = !!newSessionButton(root)
        placed = placeEntry(root, entry)
        debug.placed = placed
        if (placed) rootObserver.observe(root, { childList: true, subtree: true })
      }
      const waitObserver = new MutationObserver(() => tryPlace())
      waitObserver.observe(document.body, { childList: true, subtree: true })
      const rootObserver = new MutationObserver(() => {
        if (!root || !root.isConnected) { placed = false; tryPlace(); return }
        if (!root.contains(entry)) placed = placeEntry(root, entry)
      })
      const retry = setInterval(() => tryPlace(), 2000)
      const sync = wireEntrySync(entry, controller, t)
      const unsubscribe = controller.subscribe(sync)
      sync()
      tryPlace()
      return () => {
        clearInterval(retry)
        waitObserver.disconnect()
        rootObserver.disconnect()
        unsubscribe()
        entry.remove()
      }
    }

    // ── 工具函数 ─────────────────────────────────────────────────────────────

    function filterProcesses(state) {
      const q = state.search.trim().toLowerCase()
      const rows = state.processes.filter((p) =>
        (state.filters.source === 'all' || p.source === state.filters.source)
        && (state.filters.category === '' || p.category === state.filters.category)
        && (state.filters.complexity === '' || p.complexity === state.filters.complexity)
        && (q === '' || (p.name + ' ' + (p.display_name || '') + ' ' + (p.description || '')).toLowerCase().includes(q)))
      const rank = { light: 0, lightweight: 1, standard: 2, medium: 3, complex: 4 }
      const sorted = [...rows]
      if (state.sortBy === 'updated') sorted.sort((a, b) => b.mtime - a.mtime)
      else if (state.sortBy === 'complexity') sorted.sort((a, b) => (rank[a.complexity] ?? 9) - (rank[b.complexity] ?? 9) || a.relPath.localeCompare(b.relPath))
      else if (state.sortBy === 'links') sorted.sort((a, b) => b.linkCount - a.linkCount)
      else sorted.sort((a, b) => a.relPath.localeCompare(b.relPath))
      return sorted
    }

    const COMPLEXITY_LABEL = { light: 'light', lightweight: 'lightweight', standard: 'standard', medium: 'medium', complex: 'complex' }

    function flowLabel(t, v) {
      if (v === 'next') return t('flowNext')
      if (v === 'end') return t('flowEnd')
      if (v === 'break') return t('flowBreak')
      return String(v)
    }

    function linkExpert(ln) { return (ln && (ln.expert_name || ln.expert)) || undefined }

    /** 极轻量 YAML 着色：注释灰、键蓝、其余默认。 */
    function colorizeLine(line) {
      const trimmed = line.trimStart()
      if (trimmed.startsWith('#')) return [h('span', { className: 'dsh-prc-cm' }, line)]
      const m = line.match(/^(\s*(?:-\s+)?)([A-Za-z_][\w.-]*)(:)(.*)$/)
      if (m) {
        return [m[1], h('span', { className: 'dsh-prc-key' }, m[2] + ':'), m[4] ? colorizeScalar(m[4]) : '']
      }
      return [line]
    }
    function colorizeScalar(rest) {
      const t = rest.trim()
      if (t === '' || t === '|' || t === '>' || t === '|-' || t === '>-') return rest
      if (t.startsWith('#')) return [h('span', { className: 'dsh-prc-cm' }, rest)]
      return rest
    }

    // ── 组件 ─────────────────────────────────────────────────────────────────

    function useControllerState(controller) {
      const getSnap = useCallback(() => controller.getSnapshot(), [controller])
      const subscribe = useCallback((cb) => controller.subscribe(cb), [controller])
      return useSyncExternalStore(subscribe, getSnap)
    }
    let useSyncExternalStore = __React.useSyncExternalStore
      || ((subscribe, getSnap) => {
        const [v, setV] = useState(getSnap)
        useEffect(() => subscribe(() => setV(getSnap())), [subscribe, getSnap])
        return v
      })

    function Menu({ x, y, items, onClose }) {
      return h('div', null,
        h('div', { className: 'dsh-prc-menuback', onClick: onClose, onContextMenu: (e) => { e.preventDefault(); onClose() } }),
        h('div', { className: 'dsh-prc-menu', style: { left: Math.max(4, x) + 'px', top: Math.max(4, y) + 'px' } },
          items.map((it, i) => h('button', { key: i, onClick: () => { onClose(); it.onClick() } }, it.label))))
    }

    function anchorMenu(btn, items, onClose) {
      let pos = { x: 100, y: 100 }
      try { const r = btn.getBoundingClientRect(); pos = { x: r.left, y: r.bottom + 4 } } catch {}
      return h(Menu, { x: pos.x, y: pos.y, items, onClose })
    }

    function Toolbar({ state, controller, t }) {
      const [menu, setMenu] = useState(null) // {kind, btn}
      const categories = useMemo(() => [...new Set(state.processes.map((p) => p.category).filter(Boolean))].sort(), [state.processes])
      const user = state.processes.filter((p) => p.source === 'user').length
      const bundled = state.processes.filter((p) => p.source === 'bundled').length
      const sel = state.item && state.item.meta
      const openMenu = (kind) => (e) => setMenu(menu && menu.kind === kind ? null : { kind, btn: e.currentTarget })
      return h('div', { className: 'dsh-prc-toolbar' },
        h('h2', { className: 'dsh-prc-title' }, t('title')),
        h('span', { className: 'dsh-prc-count' }, t('count', { user, bundled })),
        h('input', { className: 'dsh-prc-input dsh-prc-search', value: state.search, placeholder: t('searchPlaceholder'), spellCheck: false, onChange: (e) => controller.setSearch(e.target.value) }),
        h('select', { className: 'dsh-prc-select', value: state.filters.source, onChange: (e) => controller.setFilter('source', e.target.value) },
          h('option', { value: 'all' }, t('filterAll')), h('option', { value: 'user' }, t('filterUser')), h('option', { value: 'bundled' }, t('filterBundled'))),
        h('select', { className: 'dsh-prc-select', value: state.filters.category, onChange: (e) => controller.setFilter('category', e.target.value) },
          h('option', { value: '' }, t('categoryAll')), categories.map((c) => h('option', { key: c, value: c }, c))),
        h('select', { className: 'dsh-prc-select', value: state.filters.complexity, onChange: (e) => controller.setFilter('complexity', e.target.value) },
          h('option', { value: '' }, t('complexityAll')), ['light', 'lightweight', 'standard', 'medium', 'complex'].map((c) => h('option', { key: c, value: c }, c))),
        h('select', { className: 'dsh-prc-select', value: state.sortBy, title: t('sortDefault'), onChange: (e) => controller.setSortBy(e.target.value) },
          h('option', { value: 'default' }, t('sortDefault')), h('option', { value: 'updated' }, t('sortUpdated')),
          h('option', { value: 'complexity' }, t('sortComplexity')), h('option', { value: 'links' }, t('sortLinks'))),
        h('div', { className: 'dsh-prc-spacer' }),
        h('button', { className: 'dsh-prc-btn', title: t('aiBtn'), onClick: () => controller.setState({ dialog: { type: 'ai' } }) }, '⚡ ' + t('aiBtn')),
        h('button', { className: 'dsh-prc-btn', 'data-primary': 'true', onClick: openMenu('new') }, '+ ' + t('newTask')),
        h('button', { className: 'dsh-prc-btn', onClick: () => controller.setState({ dialog: { type: 'import' } }) }, t('importBtn')),
        h('button', { className: 'dsh-prc-btn', onClick: openMenu('export') }, t('exportBtn')),
        h('button', { className: 'dsh-prc-btn', title: t('settingsBtn'), onClick: () => controller.setState({ dialog: { type: 'settings' } }) }, '⚙'),
        h('button', { className: 'dsh-prc-btn', title: t('close'), onClick: () => controller.closePanel() }, '✕'),
        menu === null ? null
          : menu.kind === 'new'
            ? anchorMenu(menu.btn, [
              { label: t('newBlank'), onClick: () => controller.setState({ dialog: { type: 'create' } }) },
              { label: t('newFromExisting'), onClick: () => controller.setState({ dialog: { type: 'copy', fromId: sel ? sel.id : undefined } }) },
            ], () => setMenu(null))
            : anchorMenu(menu.btn, [
              { label: t('exportAll'), onClick: () => download(API + '/export?all=1') },
              { label: t('exportUser'), onClick: () => download(API + '/export?source=user') },
              { label: t('exportOne'), onClick: () => { if (sel) download(API + '/export?id=' + encodeURIComponent(sel.id)) } },
            ], () => setMenu(null)))
    }

    function download(url) {
      const a = document.createElement('a')
      a.href = url
      a.rel = 'noopener'
      document.body.appendChild(a)
      a.click()
      a.remove()
    }

    function ListPane({ state, controller, t }) {
      const rows = filterProcesses(state)
      const userRows = rows.filter((p) => p.source === 'user')
      const bundledRows = rows.filter((p) => p.source === 'bundled')
      const onKey = (e) => {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
        e.preventDefault()
        const ids = rows.map((p) => p.id)
        if (ids.length === 0) return
        const idx = ids.indexOf(state.selectedId)
        const next = e.key === 'ArrowDown' ? ids[Math.min(ids.length - 1, idx + 1)] || ids[0] : ids[Math.max(0, idx - 1)]
        controller.select(next)
      }
      const row = (p) => h('button', {
        key: p.id, className: 'dsh-prc-row', role: 'button', tabIndex: 0,
        'data-selected': state.selectedId === p.id ? 'true' : undefined,
        'data-source': p.source, 'data-complexity': p.complexity || 'standard',
        onClick: () => controller.select(p.id),
        onKeyDown: (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) { e.preventDefault(); controller.select(p.id) } },
      },
        h('div', { className: 'dsh-prc-row-name' },
          h('span', { className: 'lbl' }, p.display_name || p.name),
          p.errors > 0 ? h('span', { className: 'dsh-prc-dot', 'data-kind': 'err', title: p.errors + t('errOne') }) : null,
          p.warnings > 0 ? h('span', { className: 'dsh-prc-dot', 'data-kind': 'warn', title: p.warnings + t('warnOne') }) : null),
        h('div', { className: 'dsh-prc-row-meta' },
          h('span', null, p.name),
          p.complexity ? h('span', { className: 'dsh-prc-badge' }, p.complexity) : null,
          p.version ? h('span', null, 'v' + p.version) : null,
          h('span', null, p.phaseCount + t('phases') + ' · ' + p.linkCount + t('links'))))
      const group = (label, items) => h('div', null,
        h('div', { className: 'dsh-prc-group' }, label, h('span', null, items.length)),
        items.map(row))
      return h('div', { className: 'dsh-prc-list', onKeyDown: onKey, tabIndex: 0 },
        rows.length === 0
          ? h('div', { style: { padding: '18px 8px', color: 'var(--dsw-text-secondary, gray)', fontSize: 12 } }, t('emptyList'), h('div', { style: { marginTop: 4, opacity: .8 } }, t('emptyListHint')))
          : [group(t('mine'), userRows), group(t('bundled'), bundledRows)])
    }

    function DiagList({ diagnostics, t, onJump }) {
      const items = [...(diagnostics.errors || []).map((d) => ({ ...d, kind: 'err' })), ...(diagnostics.warnings || []).map((d) => ({ ...d, kind: 'warn' }))]
      if (items.length === 0) return h('div', { className: 'dsh-prc-diag', style: { opacity: .75 } }, t('noIssues'))
      return h('div', { className: 'dsh-prc-diag' }, items.map((d, i) => h('button', {
        key: i, className: 'dsh-prc-diag-item', 'data-kind': d.kind,
        onClick: () => onJump && d.line && onJump(d.line),
      },
        h('span', { className: 'dsh-prc-diag-line' }, d.line ? 'L' + d.line : ''),
        h('span', { className: 'dsh-prc-diag-code' }, d.kind === 'err' ? '✗' : '⚠'),
        h('span', null, d.message),
        h('span', { style: { opacity: .5, marginLeft: 'auto', flex: 'none' } }, d.code))))
    }

    function LinkCard({ t, ln, phaseId }) {
      const [open, setOpen] = useState(false)
      const meta = []
      if (ln.executor) meta.push(ln.executor)
      if (linkExpert(ln)) meta.push(linkExpert(ln))
      if (Array.isArray(ln.skills) && ln.skills.length) meta.push(ln.skills.join(', '))
      if (ln.model) meta.push(ln.model)
      if (Array.isArray(ln.gates) && ln.gates.length) meta.push('gate×' + ln.gates.length)
      if (ln.max_rework !== undefined && ln.max_rework !== null) meta.push('rework ' + ln.max_rework)
      return h('div', { className: 'dsh-prc-link' },
        h('button', { className: 'dsh-prc-link-row', onClick: () => setOpen(!open), 'aria-expanded': open },
          h('span', { className: 'dsh-prc-link-id' }, ln.id),
          h('span', null, ln.name || ''),
          h('span', { className: 'dsh-prc-link-meta' }, meta.join(' · '))),
        !open ? null : h('div', { className: 'dsh-prc-link-body' },
          ln.prompt ? h('div', null, h('div', { style: { fontSize: 11, opacity: .65, marginBottom: 3 } }, t('prompt')), h('pre', { className: 'dsh-prc-pre' }, ln.prompt)) : null,
          h('div', { className: 'dsh-prc-kv' }, h('b', null, t('onSuccess') + ':'), flowLabel(t, ln.on_success || '—')),
          h('div', { className: 'dsh-prc-kv' }, h('b', null, t('onGateFail') + ':'), flowLabel(t, ln.on_gate_fail || '—')),
          h('div', { className: 'dsh-prc-kv' }, h('b', null, t('onRatingFail') + ':'), flowLabel(t, ln.on_rating_fail || '—')),
          ln.review_type ? h('div', { className: 'dsh-prc-kv' }, h('b', null, t('reviewType') + ':'), ln.review_type) : null,
          ln.review_prompt ? h('div', { className: 'dsh-prc-kv' }, h('b', null, t('reviewPrompt') + ':'), h('span', { style: { whiteSpace: 'pre-wrap' } }, ln.review_prompt)) : null,
          ln.acceptance_criteria ? h('div', { className: 'dsh-prc-kv' }, h('b', null, t('acceptance') + ':'), h('span', { style: { whiteSpace: 'pre-wrap' } }, ln.acceptance_criteria)) : null,
          Array.isArray(ln.expected_artifacts) && ln.expected_artifacts.length > 0 ? h('div', { className: 'dsh-prc-kv' },
            h('b', null, t('artifacts') + ':'),
            h('span', null, ln.expected_artifacts.map((a) => (a && (a.path || a.name)) || '').filter(Boolean).join(' · '))) : null,
          Array.isArray(ln.gates) && ln.gates.length > 0 ? h('div', { className: 'dsh-prc-kv' },
            h('b', null, t('gates') + ':'),
            h('span', null, ln.gates.map((g) => (g ? (g.name || '?') + (g.min_score !== undefined && g.min_score !== null ? ' ≥' + g.min_score : '') : '')).join(' · '))) : null,
          h('div', { style: { fontSize: 11, opacity: .55 } }, phaseId)))
    }

    function StructureTab({ t, parsed }) {
      const phases = parsed && Array.isArray(parsed.phases) ? parsed.phases : []
      if (phases.length === 0) return h('div', { className: 'dsh-prc-empty' }, '—')
      return h('div', null, phases.map((ph, i) => h('div', { className: 'dsh-prc-phase', key: ph.id || i },
        h('div', { className: 'dsh-prc-phase-head' },
          h('span', { className: 'dsh-prc-link-id' }, ph.id || i + 1),
          h('span', null, ph.name || ''),
          h('span', { className: 'dsh-prc-link-meta' }, (Array.isArray(ph.links) ? ph.links.length : 0) + ' ' + t('links'))),
        ph.spec ? h('div', { className: 'dsh-prc-phase-spec' }, ph.spec) : null,
        ph.acceptance_criteria ? h('div', { className: 'dsh-prc-kv' }, h('b', null, t('acceptance') + ':'), h('span', { style: { whiteSpace: 'pre-wrap' } }, ph.acceptance_criteria)) : null,
        (Array.isArray(ph.links) ? ph.links : []).map((ln, j) => h(LinkCard, { key: ln.id || j, t, ln, phaseId: ph.id })))))
    }

    function YamlView({ yaml, highlightLine }) {
      const boxRef = useRef(null)
      const lines = useMemo(() => String(yaml || '').split('\n'), [yaml])
      useEffect(() => {
        if (!highlightLine || !boxRef.current) return
        const el = boxRef.current.querySelector('[data-line="' + highlightLine + '"]')
        if (el) el.scrollIntoView({ block: 'center' })
      }, [highlightLine, yaml])
      return h('div', { className: 'dsh-prc-code', ref: boxRef },
        lines.map((line, i) => h('div', { key: i, className: 'dsh-prc-code-line', 'data-line': i + 1, 'data-hl': highlightLine === i + 1 ? 'true' : undefined },
          h('span', { className: 'dsh-prc-code-no' }, i + 1),
          h('span', { className: 'dsh-prc-code-tx' }, colorizeLine(line)))))
    }

    function OverviewTab({ t, meta, parsed, diagnostics, onJump }) {
      const limits = parsed && parsed.limits
      const abnormal = parsed && parsed.abnormal_handler
      return h('div', null,
        meta.description ? h('p', { className: 'dsh-prc-desc' }, meta.description) : null,
        h('div', { className: 'dsh-prc-kv' }, h('b', null, t('name') + ':'), meta.name),
        meta.guid ? h('div', { className: 'dsh-prc-kv' }, h('b', null, t('guid') + ':'), h('code', null, meta.guid)) : null,
        limits ? h('div', { className: 'dsh-prc-kv' }, h('b', null, t('limits') + ':'),
          (limits.max_step_executions == null ? t('unlimited') : limits.max_step_executions + ' ' + t('steps')) + ' · '
          + (limits.max_total_tokens == null ? t('unlimited') : limits.max_total_tokens + ' ' + t('tokens'))) : null,
        abnormal && Array.isArray(abnormal.trigger_on) ? h('div', { className: 'dsh-prc-kv' }, h('b', null, t('abnormal') + ':'), abnormal.trigger_on.join(', ')) : null,
        h('div', { className: 'dsh-prc-sec' }, h('h4', null, t('diagnostics')), h(DiagList, { t, diagnostics, onJump })))
    }

    function DetailPane({ state, controller, t }) {
      const item = state.item
      const meta = item && item.meta
      const isUser = meta && meta.source === 'user'
      const [confirmDelete, setConfirmDelete] = useState(false)
      const jump = (line) => { controller.setState({ highlightLine: line }); controller.setTab('yaml') }
      const copyYaml = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(item.yaml).then(() => controller.toast(t('copied'))).catch(() => {})
      }
      if (state.itemLoading) return h('div', { className: 'dsh-prc-detail' }, t('loading'))
      if (!item || !meta) return h('div', { className: 'dsh-prc-empty' }, h('div', null, t('emptyDetail')), h('div', { style: { fontSize: 12, opacity: .8 } }, t('selectFirst')))
      return h('div', { className: 'dsh-prc-detail' },
        h('div', { className: 'dsh-prc-detail-head' },
          h('h3', { className: 'dsh-prc-detail-title' }, meta.display_name || meta.name),
          h('div', { className: 'dsh-prc-actions' },
            isUser ? [
              h('button', { key: 'e', className: 'dsh-prc-btn', 'data-primary': 'true', onClick: () => controller.editSelected() }, '✎ ' + t('edit')),
              h('button', { key: 'r', className: 'dsh-prc-btn', onClick: () => controller.setState({ dialog: { type: 'rename', id: meta.id, name: meta.fileName } }) }, t('rename')),
              !confirmDelete
                ? h('button', { key: 'd', className: 'dsh-prc-btn', onClick: () => setConfirmDelete(true) }, '🗑 ' + t('delete'))
                : h('span', { key: 'dc', style: { display: 'inline-flex', gap: 6, alignItems: 'center' } },
                  h('span', { style: { fontSize: 12 } }, t('deleteConfirm') + '？'),
                  h('button', { className: 'dsh-prc-btn', 'data-danger': 'true', onClick: () => { setConfirmDelete(false); controller.removeProcess(meta.id) } }, t('confirm')),
                  h('button', { className: 'dsh-prc-btn', onClick: () => setConfirmDelete(false) }, t('cancel'))),
            ] : [
              h('button', { key: 'c', className: 'dsh-prc-btn', 'data-primary': 'true', onClick: () => controller.setState({ dialog: { type: 'copy', fromId: meta.id } }) }, '⧉ ' + t('copyToMine')),
            ],
            h('button', { key: 'x', className: 'dsh-prc-btn', onClick: copyYaml }, t('copyYaml')))),
        h('div', { className: 'dsh-prc-chips' },
          h('span', { className: 'dsh-prc-chip' }, isUser ? t('mine') : t('readOnly')),
          meta.complexity ? h('span', { className: 'dsh-prc-chip' }, t('complexity') + ': ' + meta.complexity) : null,
          meta.category ? h('span', { className: 'dsh-prc-chip' }, t('category') + ': ' + meta.category) : null,
          meta.version ? h('span', { className: 'dsh-prc-chip' }, 'v' + meta.version) : null,
          h('span', { className: 'dsh-prc-chip' }, meta.phaseCount + ' ' + t('phases') + ' · ' + meta.linkCount + ' ' + t('links')),
          item.diagnostics && item.diagnostics.errors.length > 0 ? h('span', { className: 'dsh-prc-badge', 'data-kind': 'err' }, item.diagnostics.errors.length + t('errOne')) : null,
          item.diagnostics && item.diagnostics.warnings.length > 0 ? h('span', { className: 'dsh-prc-badge', 'data-kind': 'warn' }, item.diagnostics.warnings.length + t('warnOne')) : null,
          h('span', { style: { fontSize: 11, opacity: .6 } }, meta.relPath)),
        h('div', { className: 'dsh-prc-tabs' },
          ['overview', 'structure', 'yaml'].map((tab) => h('button', { key: tab, className: 'dsh-prc-tab', 'data-on': state.tab === tab ? 'true' : undefined, onClick: () => controller.setTab(tab) },
            t('tab' + tab[0].toUpperCase() + tab.slice(1))))),
        state.tab === 'overview' ? h(OverviewTab, { t, meta, parsed: item.parsed, diagnostics: item.diagnostics, onJump: jump })
          : state.tab === 'structure' ? h(StructureTab, { t, parsed: item.parsed })
            : h(YamlView, { yaml: item.yaml, highlightLine: state.highlightLine }))
    }

    // ── 编辑器 ───────────────────────────────────────────────────────────────

    function EditorPane({ state, controller, t }) {
      const ed = state.editor
      const taRef = useRef(null)
      const gutterRef = useRef(null)
      if (!ed) return null
      const lines = ed.text.split('\n')
      const diag = ed.diagnostics || { errors: [], warnings: [] }
      const errCount = diag.errors.length
      const warnCount = diag.warnings.length
      const onScroll = () => { if (gutterRef.current && taRef.current) gutterRef.current.scrollTop = taRef.current.scrollTop }
      const jump = (line) => {
        const ta = taRef.current
        if (!ta) return
        const pos = lines.slice(0, line - 1).reduce((acc, l) => acc + l.length + 1, 0)
        ta.focus()
        ta.setSelectionRange(pos, pos)
        ta.scrollTop = Math.max(0, (line - 6) * 19)
      }
      const onKeyDown = (e) => {
        const ta = taRef.current
        if (!ta) return
        if (e.key === 'Tab') {
          e.preventDefault()
          const s = ta.selectionStart
          const next = ed.text.slice(0, s) + '  ' + ed.text.slice(ta.selectionEnd)
          controller.setEditorText(next)
          requestAnimationFrame(() => { ta.setSelectionRange(s + 2, s + 2) })
        } else if ((e.metaKey || e.ctrlKey) && (e.key === 's' || e.key === 'S')) {
          e.preventDefault()
          void controller.saveEditor(false)
        }
      }
      return h('div', { className: 'dsh-prc-detail dsh-prc-editor' },
        h('div', { className: 'dsh-prc-detail-head' },
          h('h3', { className: 'dsh-prc-detail-title' }, (ed.mode === 'create' ? t('editorCreate') : t('editorTitle')) + (ed.name ? '：' + ed.name : '')),
          h('div', { className: 'dsh-prc-actions' },
            ed.dirty ? h('span', { className: 'dsh-prc-badge', 'data-kind': 'warn' }, t('unsaved')) : null,
            h('button', { className: 'dsh-prc-btn', onClick: () => void controller.validateEditor(), disabled: ed.busy }, '✓ ' + t('validate')),
            h('button', { className: 'dsh-prc-btn', 'data-primary': 'true', onClick: () => void controller.saveEditor(false), disabled: ed.busy || errCount > 0 }, '💾 ' + t('save')),
            h('button', { className: 'dsh-prc-btn', onClick: () => controller.requestCloseEditor() }, t('cancel')))),
        ed.conflict ? h('div', { className: 'dsh-prc-conflict' },
          h('span', null, '⚠ ' + t('saveConflict') + ' ' + t('forcedHint')),
          h('button', { className: 'dsh-prc-btn', onClick: () => void controller.reloadEditor() }, t('reload')),
          h('button', { className: 'dsh-prc-btn', 'data-danger': 'true', onClick: () => void controller.saveEditor(true) }, t('overwrite'))) : null,
        ed.error ? h('div', { className: 'dsh-prc-error' }, ed.error) : null,
        h('div', { className: 'dsh-prc-editor-wrap' },
          h('div', { className: 'dsh-prc-gutter', ref: gutterRef }, lines.map((_, i) => h('div', { key: i }, i + 1))),
          h('textarea', {
            className: 'dsh-prc-textarea', ref: taRef, value: ed.text, spellCheck: false,
            onChange: (e) => controller.setEditorText(e.target.value),
            onScroll, onKeyDown,
          })),
        h('div', { className: 'dsh-prc-status' },
          h('span', null, t('linesCount', { n: lines.length })),
          ed.dirty ? null : h('span', null, t('saved')),
          errCount > 0 ? h('span', { className: 'dsh-prc-badge', 'data-kind': 'err' }, errCount + t('errOne')) : null,
          warnCount > 0 ? h('span', { className: 'dsh-prc-badge', 'data-kind': 'warn' }, warnCount + t('warnOne')) : null,
          errCount === 0 && warnCount === 0 && !ed.dirty ? h('span', { style: { opacity: .7 } }, t('noIssues')) : null),
        (errCount > 0 || warnCount > 0) ? h(DiagList, { t, diagnostics: diag, onJump: jump }) : null)
    }

    // ── 弹窗 ─────────────────────────────────────────────────────────────────

    function Modal({ title, onClose, children, width }) {
      useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
      }, [onClose])
      return h('div', { className: 'dsh-prc-modal-backdrop', onMouseDown: (e) => { if (e.target === e.currentTarget) onClose() } },
        h('div', { className: 'dsh-prc-modal', style: width ? { width: 'min(' + width + 'px, 94vw)' } : undefined, role: 'dialog', 'aria-modal': 'true' },
          h('div', { style: { display: 'flex', alignItems: 'center' } },
            h('h3', null, title),
            h('button', { className: 'dsh-prc-btn', style: { marginLeft: 'auto', width: 28, height: 28, padding: 0, borderRadius: 28 }, onClick: onClose }, '✕')),
          children))
    }

    function FieldInput({ label, value, onChange, placeholder, type }) {
      return h('label', { className: 'dsh-prc-field' }, label,
        h('input', { value, type: type || 'text', placeholder, spellCheck: false, onChange: (e) => onChange(e.target.value) }))
    }

    function CreateDialog({ state, controller, t }) {
      const [name, setName] = useState('')
      const [dir, setDir] = useState('')
      const [display, setDisplay] = useState('')
      const ok = /^[^\\/\0\r\n.][^\\/\0\r\n]{0,79}$/.test(name.trim())
      return h(Modal, { title: t('editorCreate'), onClose: () => controller.setState({ dialog: null }) },
        h(FieldInput, { label: t('createName'), value: name, onChange: setName, placeholder: 'my-process' }),
        h(FieldInput, { label: t('createDir'), value: dir, onChange: setDir, placeholder: 'software' }),
        h(FieldInput, { label: t('createDisplayName'), value: display, onChange: setDisplay }),
        h('div', { style: { display: 'flex', gap: 8, justifyContent: 'flex-end' } },
          h('button', { className: 'dsh-prc-btn', onClick: () => controller.setState({ dialog: null }) }, t('cancel')),
          h('button', { className: 'dsh-prc-btn', 'data-primary': 'true', disabled: !ok || name.trim() === '', onClick: () => void controller.createBlank(name.trim(), dir.trim(), display.trim()) }, t('confirm'))),
        !ok && name.trim() !== '' ? h('div', { className: 'dsh-prc-error' }, t('nameRule')) : null)
    }

    function CopyDialog({ state, controller, t }) {
      const dlg = state.dialog
      const from = dlg && dlg.fromId ? state.processes.find((p) => p.id === dlg.fromId) : undefined
      const [name, setName] = useState(from ? from.fileName + '-copy' : '')
      const [dir, setDir] = useState(from && from.source === 'user' ? (from.relPath.includes('/') ? from.relPath.split('/').slice(0, -1).join('/') : '') : '')
      return h(Modal, { title: t('editorCopy'), onClose: () => controller.setState({ dialog: null }) },
        h('div', { className: 'dsh-prc-kv' }, h('b', null, t('name') + ':'), from ? (from.display_name || from.name) + '（' + from.relPath + '）' : '—'),
        h(FieldInput, { label: t('copyName'), value: name, onChange: setName, placeholder: 'my-process' }),
        h(FieldInput, { label: t('createDir'), value: dir, onChange: setDir }),
        h('div', { style: { display: 'flex', gap: 8, justifyContent: 'flex-end' } },
          h('button', { className: 'dsh-prc-btn', onClick: () => controller.setState({ dialog: null }) }, t('cancel')),
          h('button', { className: 'dsh-prc-btn', 'data-primary': 'true', disabled: !from || name.trim() === '', onClick: () => void controller.copyProcess(from.id, name.trim(), dir.trim()) }, t('copy'))))
    }

    function RenameDialog({ state, controller, t }) {
      const dlg = state.dialog
      const [name, setName] = useState(dlg ? dlg.name : '')
      return h(Modal, { title: t('renameTitle'), onClose: () => controller.setState({ dialog: null }) },
        h(FieldInput, { label: t('newName'), value: name, onChange: setName }),
        h('div', { style: { display: 'flex', gap: 8, justifyContent: 'flex-end' } },
          h('button', { className: 'dsh-prc-btn', onClick: () => controller.setState({ dialog: null }) }, t('cancel')),
          h('button', { className: 'dsh-prc-btn', 'data-primary': 'true', disabled: name.trim() === '', onClick: () => void controller.renameProcess(dlg.id, name.trim()) }, t('confirm'))))
    }

    function ConfirmDialog({ state, controller, t }) {
      const dlg = state.dialog
      return h(Modal, { title: t('confirm'), onClose: () => controller.setState({ dialog: null }) },
        h('div', null, dlg.message),
        h('div', { style: { display: 'flex', gap: 8, justifyContent: 'flex-end' } },
          h('button', { className: 'dsh-prc-btn', onClick: () => controller.setState({ dialog: null }) }, dlg.yes === 'discard' ? t('keepEditing') : t('cancel')),
          h('button', { className: 'dsh-prc-btn', 'data-danger': dlg.danger ? 'true' : undefined, onClick: () => dlg.onYes() }, dlg.yes === 'discard' ? t('discard') : t('confirm'))))
    }

    function ImportDialog({ state, controller, t }) {
      const [over, setOver] = useState(false)
      const [dragOver, setDragOver] = useState(false)
      const [results, setResults] = useState(null)
      const [busy, setBusy] = useState(false)
      const doImport = async (fileList) => {
        const files = []
        for (const f of fileList) {
          if (f.size > 1024 * 1024) { files.push({ name: f.name, content: '' }); continue }
          // eslint-disable-next-line no-await-in-loop
          files.push({ name: f.name, content: await f.text() })
        }
        setBusy(true)
        try {
          const r = await controller.importFiles(files, over)
          setResults(r)
          controller.toast(t('toastImported', { n: r.filter((x) => x.status === 'created' || x.status === 'overwritten').length }))
        } catch (error) { controller.toast(String(error && error.message || error), 'err') } finally { setBusy(false) }
      }
      const statusLabel = { created: t('importCreated'), overwritten: t('importOverwritten'), exists: t('importExists'), invalid: t('importInvalid') }
      return h(Modal, { title: t('importTitle'), onClose: () => controller.setState({ dialog: null }), width: 620 },
        h('div', null, t('importHint')),
        h('label', { style: { display: 'flex', gap: 6, alignItems: 'center', fontSize: 12 } },
          h('input', { type: 'checkbox', checked: over, onChange: (e) => setOver(e.target.checked) }), t('importOverwrite')),
        h('div', {
          className: 'dsh-prc-drop', 'data-over': dragOver ? 'true' : undefined,
          onDragOver: (e) => { e.preventDefault(); setDragOver(true) },
          onDragLeave: () => setDragOver(false),
          onDrop: (e) => { e.preventDefault(); setDragOver(false); if (!busy) void doImport(Array.from(e.dataTransfer.files)) },
        },
          t('importHint'),
          h('div', { style: { marginTop: 10 } },
            h('input', { type: 'file', accept: '.yaml,.yml', multiple: true, disabled: busy, onChange: (e) => { const list = Array.from(e.target.files || []); e.target.value = ''; if (!busy) void doImport(list) } }))),
        busy ? h('div', null, t('loading')) : null,
        results ? h('div', { className: 'dsh-prc-diag' },
          h('div', { style: { fontWeight: 600 } }, t('importResults')),
          results.map((r, i) => h('div', { key: i, style: { display: 'flex', gap: 8, fontSize: 12 } },
            h('span', { style: { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, r.name),
            h('span', { style: { color: r.status === 'created' || r.status === 'overwritten' ? 'var(--dsw-alias-state-success, #2e9e5b)' : r.status === 'invalid' ? 'var(--dsw-alias-state-error, #c75050)' : 'inherit' } },
              statusLabel[r.status] || r.status),
            r.errors && r.errors.length ? h('span', { style: { opacity: .7 } }, r.errors[0].message) : null))) : null)
    }

    function SettingsDialog({ state, controller, t }) {
      const [form, setForm] = useState(state.settings)
      const [busy, setBusy] = useState(false)
      useEffect(() => { if (!state.settings) void controller.loadSettings() }, [])
      useEffect(() => { if (state.settings && !form) setForm(state.settings) }, [state.settings])
      if (!form) return h(Modal, { title: t('settingsTitle'), onClose: () => controller.setState({ dialog: null }) }, t('loading'))
      const set = (k) => (v) => setForm({ ...form, [k]: v })
      return h(Modal, { title: t('settingsTitle'), onClose: () => controller.setState({ dialog: null }) },
        h(FieldInput, { label: t('settingsUserRoot'), value: form.userRoot, onChange: set('userRoot') }),
        h(FieldInput, { label: t('settingsBundledRoot'), value: form.bundledRoot, onChange: set('bundledRoot') }),
        h('label', { className: 'dsh-prc-field' }, t('settingsMaxDepth'),
          h('select', { value: String(form.maxDepth), onChange: (e) => set('maxDepth')(Number(e.target.value)) },
            [1, 2, 3, 4, 5, 6].map((n) => h('option', { key: n, value: n }, n)))),
        h('label', { style: { display: 'flex', gap: 6, alignItems: 'center', fontSize: 12 } },
          h('input', { type: 'checkbox', checked: !!form.checkRefs, onChange: (e) => set('checkRefs')(e.target.checked) }), t('settingsCheckRefs')),
        h('div', { style: { display: 'flex', gap: 8, justifyContent: 'flex-end' } },
          h('button', { className: 'dsh-prc-btn', onClick: () => controller.setState({ dialog: null }) }, t('cancel')),
          h('button', { className: 'dsh-prc-btn', 'data-primary': 'true', disabled: busy, onClick: async () => {
            setBusy(true)
            try { await controller.saveSettings(form); controller.toast(t('settingsSaved')); controller.setState({ dialog: null }) }
            catch (error) { controller.toast(String(error && error.message || error), 'err') } finally { setBusy(false) }
          } }, t('save'))))
    }

    // ── ⚡ AI 生成（kit ActionShareDialog + completedView 预览确认） ────────────

    const AI_PROMPT = `请为下面的需求设计一个 ntd 工艺（Process：多阶段 phase、多环节 link 的 agent 工作流模板），输出严格的 YAML。

    需求：{{requirement}}
    复杂度：{{complexity}}
    {{reference}}

    硬性要求：
    1. 只输出一个 \`\`\`yaml 代码块，不要任何其他解释文字。
    2. 顶层结构：process（name / guid：生成一个 uuid v4 / display_name / description / category: software / complexity / version: 1.0.0）+ limits（max_step_executions / max_total_tokens，可为 null）+ abnormal_handler（可为 null）+ phases 列表。
    3. 每个 phase：id、name、spec、acceptance_criteria、links 列表。每个 link：id（全工艺唯一，建议简短助记如 req-01）、name、prompt（明确可执行的指令，含产物落点）、executor、expert（专家库里的名字，不确定就 null）、skills（列表）、expected_artifacts（[{name, type: file, path}]）、gates（[{name, type: ai_criteria_review, min_score}]，可选）、on_success（next / end / <环节id>）、on_gate_fail（break / <环节id> / goto:<环节id>）、on_rating_fail: break、max_rework（0-3）。
    4. on_success / on_gate_fail 引用的环节 id 必须真实存在；最后一步用 on_success: end。
    5. 阶段数量与环节粒度贴合复杂度：轻需求 1-2 阶段 3-6 环节；复杂需求 3+ 阶段。`

    function AiPreview({ controller, t, output, close }) {
      const parsedBlock = useMemo(() => {
        const blocks = [...String(output || '').matchAll(/```(?:yaml|yml)?\s*\n([\s\S]*?)```/g)]
        if (blocks.length > 0) return blocks[blocks.length - 1][1].trim()
        const s = String(output || '').trim()
        return s.startsWith('process:') || s.startsWith('#') ? s : ''
      }, [output])
      const [yaml, setYaml] = useState(parsedBlock)
      const [diag, setDiag] = useState(null)
      const [name, setName] = useState('')
      const [busy, setBusy] = useState(false)
      useEffect(() => {
        if (!yaml) { setDiag(null); return }
        let live = true
        api('/validate', { method: 'POST', body: { yaml } }).then((d) => { if (live) setDiag({ errors: d.errors, warnings: d.warnings, meta: d.meta }) }).catch(() => {})
        return () => { live = false }
      }, [yaml])
      useEffect(() => {
        if (diag && diag.meta && diag.meta.name && !name) setName(diag.meta.name)
      }, [diag])
      if (!parsedBlock) {
        return h('div', null, h('div', { className: 'dsh-prc-error' }, t('aiParseFail')), h('pre', { className: 'dsh-prc-pre', style: { maxHeight: 200 } }, String(output || '')))
      }
      const errCount = diag ? diag.errors.length : 0
      return h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, minWidth: 'min(680px, 80vw)' } },
        h('div', { style: { fontWeight: 600 } }, t('aiPreviewTitle')),
        h('textarea', { value: yaml, onChange: (e) => setYaml(e.target.value), spellCheck: false, style: { minHeight: 260, fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12, lineHeight: 1.5, border: '1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.3))', borderRadius: 8, padding: 8, background: 'var(--dsw-alias-bg-layer-2,transparent)', color: 'inherit', whiteSpace: 'pre' } }),
        diag ? h(DiagList, { t, diagnostics: diag, onJump: () => {} }) : h('div', { style: { fontSize: 12, opacity: .7 } }, t('validating')),
        h('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
          h('input', { value: name, onChange: (e) => setName(e.target.value), placeholder: t('aiSaveName'), spellCheck: false, style: { flex: 1, border: '1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.3))', background: 'var(--dsw-alias-bg-layer-2,transparent)', color: 'inherit', borderRadius: 8, padding: '6px 10px', font: 'inherit' } }),
          h('button', {
            className: 'dsh-prc-btn', 'data-primary': 'true', disabled: busy || errCount > 0 || name.trim() === '',
            onClick: async () => {
              setBusy(true)
              try {
                const result = await api('/save', { method: 'POST', body: { mode: 'create', name: name.trim(), yaml } })
                await controller.refresh()
                controller.select(result.id)
                controller.toast(t('toastAiSaved'))
                close()
              } catch (error) { controller.toast(String(error && error.message || error), 'err') } finally { setBusy(false) }
            },
          }, t('aiSave'))))
    }

    function AiDialog({ state, controller, t }) {
      const Dialog = useMemo(() => { const kit = getKit(); return kit ? kit.makeActionShareDialog(ReactGlobal || __React, {}) : null }, [])
      if (!Dialog) return h(Modal, { title: t('aiTitle'), onClose: () => controller.setState({ dialog: null }) }, h('div', { className: 'dsh-prc-error' }, t('kitMissing')))
      return h(Dialog, {
        title: '⚡ ' + t('aiTitle'),
        hint: t('aiHint'),
        params: [
          { key: 'requirement', label: t('aiRequirement'), multiline: true, placeholder: t('aiRequirementPh') },
          { key: 'complexity', label: t('aiComplexity'), placeholder: 'light' },
          { key: 'reference', label: t('aiReference'), placeholder: '' },
        ],
        initialPrompt: AI_PROMPT,
        run: (prompt) => controller.aiRun(prompt).then((jobId) => ({ jobId })),
        poll: (jobId) => controller.aiPoll(jobId),
        labels: { run: t('aiBtn'), running: t('aiRunning'), done: t('aiDone'), failed: t('aiFailed'), copy: t('copyPrompt'), copied: t('copied'), outputLabel: t('aiOutput'), openSession: t('openSession') },
        onOpenSession: (sessionId) => controller.openSession(sessionId),
        completedView: ({ job, output, close }) => h(AiPreview, { controller, t, output, close }),
        onClose: () => controller.setState({ dialog: null }),
      })
    }

    // ── 面板根 ───────────────────────────────────────────────────────────────

    function ProcessPanel({ controller, t, slotProps }) {
      const state = useControllerState(controller)
      const [left, setLeft] = useState(280)
      useEffect(() => {
        const update = () => {
          const col = document.querySelector('[class*="sidebarCol"], [data-pane="sidebar"]')
          if (col) setLeft(Math.max(0, col.getBoundingClientRect().width))
        }
        update()
        let ro
        try { ro = new ResizeObserver(update); const col = document.querySelector('[class*="sidebarCol"], [data-pane="sidebar"]'); if (col) ro.observe(col) } catch {}
        window.addEventListener('resize', update)
        return () => { if (ro) try { ro.disconnect() } catch {} ; window.removeEventListener('resize', update) }
      }, [])
      // 当前会话变化（点侧栏会话行/新会话）→ 关面板
      const useSess = slotProps && slotProps.useSessions
      const current = useSess ? useSess((s) => s.current) : undefined
      const prevCurrent = useRef(current)
      useEffect(() => {
        if (prevCurrent.current !== current && prevCurrent.current !== undefined && controller.getSnapshot().panelOpen) controller.closePanel()
        prevCurrent.current = current
      }, [current])
      // Esc 关面板（弹窗自己处理 Esc，开着弹窗时不抢）
      useEffect(() => {
        if (!state.panelOpen) return
        const onKey = (e) => {
          if (e.key !== 'Escape') return
          const s = controller.getSnapshot()
          if (s.dialog) return
          // 编辑器里按 Esc 先离开文本框（再按一次才关面板）；其他地方直接关
          if (e.target && e.target.tagName === 'TEXTAREA') { e.target.blur(); return }
          controller.closePanel()
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
      }, [state.panelOpen])
      // 面板打开时重新量一次侧栏宽（侧栏节点可能已被重建）
      useEffect(() => {
        if (!state.panelOpen) return
        const col = document.querySelector('[class*="sidebarCol"], [data-pane="sidebar"]')
        if (col) setLeft(Math.max(0, col.getBoundingClientRect().width))
      }, [state.panelOpen])
      if (!state.panelOpen) return null
      const detail = state.editor ? h(EditorPane, { state, controller, t }) : h(DetailPane, { state, controller, t })
      return h('div', { className: 'dsh-prc-panel', style: { left: left + 'px' }, 'data-dsh-prc-panel': '' },
        h(Toolbar, { state, controller, t }),
        state.error ? h('div', { className: 'dsh-prc-error' }, state.error) : null,
        state.lastError ? h('div', { className: 'dsh-prc-error' }, 'store: ' + state.lastError) : null,
        h('div', { className: 'dsh-prc-body' },
          h(ListPane, { state, controller, t }),
          detail),
        state.dialog && state.dialog.type === 'create' ? h(CreateDialog, { state, controller, t }) : null,
        state.dialog && state.dialog.type === 'copy' ? h(CopyDialog, { state, controller, t }) : null,
        state.dialog && state.dialog.type === 'rename' ? h(RenameDialog, { state, controller, t }) : null,
        state.dialog && state.dialog.type === 'confirm' ? h(ConfirmDialog, { state, controller, t }) : null,
        state.dialog && state.dialog.type === 'import' ? h(ImportDialog, { state, controller, t }) : null,
        state.dialog && state.dialog.type === 'settings' ? h(SettingsDialog, { state, controller, t }) : null,
        state.dialog && state.dialog.type === 'ai' ? h(AiDialog, { state, controller, t }) : null,
        state.toast ? h('div', { className: 'dsh-prc-toast', 'data-kind': state.toast.kind }, state.toast.text) : null)
    }

    // ── 设置页 section（M3） ─────────────────────────────────────────────────

    function SettingsSection({ t }) {
      useEffect(ensureStyles, [])
      return h('div', { style: { padding: '4px 0' } },
        h('div', { style: { fontSize: 12, opacity: .7, marginBottom: 8 } }, t('settingsSectionHint')),
        h('button', { className: 'dsh-prc-btn', onClick: () => {
          const evt = new CustomEvent('dsh-prc-toggle-panel')
          document.dispatchEvent(evt)
        } }, t('openLib')))
    }

    // ── 挂载 ─────────────────────────────────────────────────────────────────

    const name = CLIENT_NAME
    const inject = ['slots', 'locale']

    function mountOverlaySlot(ctx, controller, t) {
      ctx.effect(() => {
        try {
          ctx.slots.inject('shell.overlay', () => ctx.slots.register(
            { name: 'shell.overlay', id: 'dsh-process', order: 100, locale: NS, label: () => t('title'), inject: () => ({}) },
            function ProcessOverlaySlot(slotProps) {
              return h(ProcessPanel, { controller, t, slotProps })
            },
          ))
        } catch (e) { (globalThis.__prcErrors = globalThis.__prcErrors || []).push('overlay:' + (e && e.message)); console.error('[dsh-process] overlay slot:', e) }
      }, 'dsh-process: overlay slot')
    }

    function mountSettingsSection(ctx, t) {
      ctx.effect(() => {
        try {
          ctx.slots.inject('settings.section', () => ctx.slots.register(
            { name: 'settings.section', id: 'dsh-process', order: 93, locale: NS, label: () => t('title'), inject: () => ({}) },
            function ProcessSettingsSection() { return h(SettingsSection, { t }) },
          ))
        } catch (e) { (globalThis.__prcErrors = globalThis.__prcErrors || []).push('settings:' + (e && e.message)); console.error('[dsh-process] settings slot:', e) }
      }, 'dsh-process: settings section')
    }

    let ReactGlobal = null
    try { ReactGlobal = require('react') } catch {}

    const moduleExports = {
      name,
      inject,
      __internals: { Controller, filterProcesses, ZH, EN, AI_PROMPT, colorizeLine },
      __boot(container, opts = {}) {
        ensureStyles()
        const t = makeT(null)
        const controller = new Controller()
        controller.t = t
        if (opts.autostart !== false) controller.start()
        if (opts.open !== false) controller.openPanel()
        const root = require('react-dom/client').createRoot(container)
        root.render(h(ProcessPanel, { controller, t, slotProps: null }))
        return { controller, root }
      },
      apply(ctx) {
        ensureStyles()
        let t = makeT(null)
        try {
          if (ctx.locale && typeof ctx.locale.register === 'function') {
            ctx.locale.register(NS, 'zh', ZH)
            ctx.locale.register(NS, 'en', EN)
            const bound = typeof ctx.locale.bind === 'function' ? ctx.locale.bind(NS) : null
            if (bound) t = makeT(bound)
          }
        } catch (e) { try { console.error('[dsh-process] locale init:', e) } catch {} }
        const controller = new Controller()
        controller.t = t
        controller.start()
        try {
          const host = globalThis.location && globalThis.location.hostname
          if (host === 'localhost' || host === '127.0.0.1') window.__prc = controller
        } catch {}
        // 会话服务：动态 inject（客户端 ctx 支持；缺席时「打开会话」降级提示）
        try {
          if (typeof ctx.inject === 'function') ctx.inject(['sessions'], (scope) => { controller.sessionsSvc = scope && scope.sessions })
        } catch (e) { console.error('[dsh-process] sessions inject:', e) }
        const disposers = []
        try { disposers.push(mountSidebarEntry(controller, t)) } catch (e) { console.error('[dsh-process] sidebar mount:', e) }
        mountOverlaySlot(ctx, controller, t)
        mountSettingsSection(ctx, t)
        // 设置页按钮 → 切换面板（无 slot 通信面，走文档事件）
        const onToggle = () => controller.togglePanel()
        document.addEventListener('dsh-prc-toggle-panel', onToggle)
        // 与其他面板互斥
        const onActivate = (event) => { if (event.detail !== PANEL_NAME && controller.getSnapshot().panelOpen) controller.closePanel() }
        document.addEventListener(ACTIVATE_EVENT, onActivate)
        ctx.effect(() => () => {
          document.removeEventListener('dsh-prc-toggle-panel', onToggle)
          document.removeEventListener(ACTIVATE_EVENT, onActivate)
          for (const d of disposers) { try { d() } catch {} }
          controller.dispose()
        }, 'dsh-process: client mount')
      },
    }

    // kit 内联（构建期注入到同一 factory 作用域的 var PluginKit；plain Node 测试下缺失 → AI 对话框降级提示）
    function getKit() {
      try { return typeof PluginKit !== 'undefined' ? PluginKit : null } catch { return null }
    }

    module.exports = moduleExports

    return module.exports
  }
})
