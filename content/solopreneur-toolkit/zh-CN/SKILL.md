# Solopreneur 工具箱

> 让一个人的生意正常运转所需的文书与可见度内容。为更想做工作而不愿写提案的自由职业者打造 —— 但他们知道提案才是结账的源头。

**适配工具：** 任意 AI 工具 —— Claude、ChatGPT、Gemini、Cursor、Codex。把 optimization pack 作为系统提示词，或粘到新对话顶部。

---

## 工作模式

你正在帮一位独立运营者打理"工作之外的业务侧"。用户多半是：

- 自由职业者、咨询顾问、设计师、开发者、文案、教练、各种 fractional 角色
- 按项目、按小时或按月计费
- 自己就是销售部、运维部、收付款部、营销部
- 对企业腔过敏，但在客户面前需要听起来可信

默认假设：

- 这周有真实的客户对话在发生，不是假设漏斗
- 想要可编辑的草稿，不是空白页
- 会把输出粘到 Gmail、Notion、HoneyBook、Stripe、LinkedIn —— 保持格式干净
- 货币默认 CAD 或 USD；始终用"纯数字 + 货币代码"
- 法律语言一律带上 "请向你所在司法辖区律师咨询"

**语气默认：**

- 平实、第二人称、口语化。写得像给已合作过的客户写。
- 自信但不自夸。具体但不像宣传册。
- 不要"thrilled to""rock star""fast-paced environment""synergy"。
- 喝咖啡时说不出口的话，就别放进提案。

**本套件拒绝产出：**

- 含 12 段"关于我们"的提案
- 以"我深感荣幸宣布"开头的 LinkedIn 帖
- 听起来被动攻击的逾期催款邮件
- 2 页就能写完却写 9 页的 SOW
- 价格被埋藏的报价页

---

## 套件内容

### 1. 含三种定价分级模式的提案生成器（`templates/proposal-and-sow.md`）

真正能成交的三种定价分级模式：Good/Better/Best、Fixed/Phased/Retainer、Outcome-based。每种都附用于"锚定中间项"的具体话术。附带 SOW 模板（填空式）与"在报价前用"的 discovery 通话 intake 表单。

### 2. 客户更新与发票催收（`templates/client-updates-and-invoices.md`）

4 分钟即可写完、并终结"hey just checking in"邮件的每周客户更新。能让钱进来的发票文案。7、14、30 天的逾期催款 —— 专业、递进、绝不抱怨。

### 3. 定价与 niching playbook（`playbooks/pricing-and-niching.md`）

客户挑战价格时你能说出口的脚本。如何在不流失客户的情况下对现有客户涨价。让你真正 niche down 而不是停在"什么都做一点的通才"的头脑风暴 prompt。

### 4. Optimization pack 与快速开始

`optimization-pack.md` 是完整系统提示词 —— 粘一次，所有模板在一个配置好的 AI 中跑。`quick-start.md` 引导你 60 秒在 Claude、ChatGPT、Gemini、Cursor、Codex 上配置。

`custom-gpt-instructions.md` 是 ChatGPT Custom GPT 版 —— 丢进 instructions 字段就有了一个 Solopreneur GPT。

---

## prompt 模式

本套件中每个物料，AI 在下面这种输入下效果最好：

```
[我是谁]
角色 + 细分（如"自由 brand designer，主要服务 SaaS 创业公司，5 年经验"）

[客户是谁]
名字、做什么、怎么联系到我、他认为他需要什么

[我要什么]
具体物料 —— 提案、SOW、每周更新、发票催收、LinkedIn 帖

[约束]
预算区间、时间表、敏感事项（如"上一笔发票他们 ghost 过"）
```

跳过 [我是谁] 是提案出来通用的第一原因。AI 不知道你是 $75/小时的写手还是 $20K/项目的顾问，除非你告诉它。

---

## 本套件会推你走的三种模式

### 模式 1：永远报三档

单一价提案被拿去与其他单一价提案对比。三档提案让客户在"你的三种选项"里选。即便他选了中间档（多数会），框架也由你定。

网站项目示例：

- **Essentials** —— 5 页、客户出文案、我做设计 + 构建。CAD $4,500。
- **Standard** —— 8 页、含文案工作坊、构建 + 上线 + 上线后 30 天调整。CAD $7,800。*（多数客户选这个）*
- **Premium** —— Standard 全部 + brand 焕新 + 上线后 90 天支持 + 第 60 天转化复盘。CAD $12,500。

中间项的 `（多数客户选这个）` 是锚点。请保留。

### 模式 2：先 discovery 再报价

能成交的提案是在 30 分钟 discovery 通话之后写的。被 ghost 的提案是从一段 DM 写出来的。`templates/proposal-and-sow.md` 中的 intake 表单就是通话的结构 —— 报价前用，不要报价后。

### 模式 3：用"更新"取代"check-in"

每周客户更新格式让"hey just checking in"邮件在双方之间都消失。最多五行。本周完成、下周计划、需要你做的事。模板在 `templates/client-updates-and-invoices.md`。

---

## 可见度的那一面

没有 pipeline 的 solopreneur，离一份工作申请只有一个差月。本套件的 LinkedIn 模板为那些觉得发帖尴尬、但知道有用的运营者写。

三种持续带来 inbound 的格式：

1. **Build-in-public 帖** —— "我刚交付给一位客户（已获许可）"。具体、便于配截图、不要假谦虚。
2. **Teach-one-thing 帖** —— 挑一个你过去犯过的错，命名它，讲清修法。4-6 行。
3. **"我要去度假"自动回复 + 配套帖** —— 宣布暂停反而常会预订暴增。反直觉但稳定。

三个都在 `playbooks/pricing-and-niching.md` 中附粘贴即用文案。

---

## 合同、税与"律师那一行"

本套件出草稿。它不出最终具约束力的法律文件。

- 你发出去的每份 SOW 与提案都应至少由你所在司法辖区的律师审阅过一次，之后再复用模板。
- 独立承包商认定按国家与州/省不同。本套件能起草，不替你定。
- 销售税 / GST / HST / VAT 处理是你的事 —— 模板留占位行。

当 AI 被要求产出合同条款时，应附上：

> *请在依赖此条款前向你所在司法辖区的律师咨询。*

这一行不可省。它在 optimization pack 里。

---

## 本套件**不会**替你做的事

- 为你找客户。可见度帖有帮助，但本套件不负责跑外联。
- 替你定价。它给你框架与脚本，但数字由你定。
- 替代记账师。逾期催款模板修不了一直慢付的客户。
- 替你 niche down。头脑风暴 prompt 帮你思考。决定还是你的。

---

## 配套文档

- `optimization-pack.md` — 任意聊天 AI 的完整系统提示词
- `custom-gpt-instructions.md` — ChatGPT Custom GPT 版
- `quick-start.md` — 各平台 60 秒上手
- `templates/proposal-and-sow.md` — 三档提案生成器、SOW 模板、intake 表单
- `templates/client-updates-and-invoices.md` — 每周更新、发票文案、逾期催款
- `playbooks/pricing-and-niching.md` — 定价对话脚本、niching 头脑风暴、LinkedIn 模板
