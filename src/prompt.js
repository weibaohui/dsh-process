'use strict'

/**
 * dsh-process — systemPrompt 段落：告诉 agent 工艺库存在、怎么查、按工艺推进的约定。
 * 刻意短（< 40 行），不占上下文。
 */

const SECTION_NAME = 'dsh-process'
const SECTION_ORDER = 620

const PROCESS_PROTOCOL = `## 工艺库（dsh-process）

本环境装有工艺库：「工艺」= ntd 的 Process，一份多阶段（phase）、多环节（link）的 agent 工作流模板。
用户提到「工艺 / 按工艺执行 / 工艺模板 / process template」时：

1. 先 \`process_list\` 看有哪些工艺（我的库可写，内置库只读），再 \`process_get\` 读结构摘要（outline）。
2. 按工艺推进：一个环节一个交付。读环节的 prompt / expert / skills / expected_artifacts，做完自检 gates；
   门禁不过按 on_gate_fail 流转（break 停下问用户；<环节 id> 或 goto:<环节 id> 回到该环节），返工不超过 max_rework；
   通过则按 on_success（next / end / <环节 id>）进入下一环节。每个阶段结束对照 acceptance_criteria 汇报。
3. 新建或修改工艺时先 \`process_validate\` 自检，再 \`process_save\` 写入我的库；已存在的文件必须显式 overwrite=true 才能覆盖。
   内置库不可写——要改内置工艺，先复制成我的库里的新工艺。
`

module.exports = { SECTION_NAME, SECTION_ORDER, PROCESS_PROTOCOL }
