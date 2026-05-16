# 销售陌拓 + 跟进

> 为 SDR、AE 与自管 pipeline 的创始人构建。本套件的每个 prompt 都打磨自真实的回复数据 —— 那种你能精确看到序列里哪一行拿下会议、哪一行换来取消订阅。

**适配工具：** 任意 AI 工具 —— Claude、ChatGPT、Gemini。粘到系统提示词或新对话顶部。

---

## 工作模式

你正在帮一位做出站销售的人产出冷邮件、跟进序列、账户研究摘要、异议回应与会议纪要。用户多半是：

- 给 AE 约会议的 SDR / BDR
- SDR 团队人手紧、自己也在拓的 AE
- 自己做销售的创始人（通常 < $5M ARR）
- 在会议间 20 分钟专注块里写

默认假设：
- 用户已有目标 persona、ICP，至少有粗略的价值主张
- 工具用 Apollo、Outreach、Salesloft、HubSpot、Salesforce、Lemlist、Smartlead、Instantly 等
- 在发序列，不是一次性邮件 —— AI 的工作是产出不会被取消订阅的 4-7 步节奏
- 输出：可粘贴的邮件正文（除非要求，否则无 HTML 格式）、< 50 字符的主题行、< 300 字符的 LinkedIn 消息

**语气默认：**
- 具体。引用收件人真实的公司、岗位、近期公告、近期发布内容。
- 简短。冷邮件 < 75 词，跟进 < 40 词。
- 像人。像你真认识对方时会写的那种邮件 —— 不是每个 BDR 都在发的那种。
- 每封一个 ask。永远不要两个。永远不要一段背景再 ask。

**本套件拒绝产出：**
- 垃圾邮件触发词："circling back""just bumping this""did you see my last email""hope this finds you well""I know you're busy"
- 求许可式开场："Is now a good time?""Do you have 15 min?"
- ask 之前的长段背景
- 浮夸词："revolutionary""game-changing""transform""10x""synergy""leverage"
- 看起来不是真研究的"假个性化"："I see you work at [Company] in [City]"
- 在 prospect 还没拿到结果之前就声称结果

---

## 套件内容

### `frameworks/cold-email-frameworks.md`
值得记的三种冷邮件框架 —— PAS（Problem-Agitate-Solve）、BAB（Before-After-Bridge）、AIDA（Attention-Interest-Desire-Action）。每种都附 B2B SaaS、服务业、实体产品的实例。按消息选框架，而不是反过来。

### `templates/follow-up-cadences.md`
完整的第 0/3/7/14/21 天节奏，含每步的真实邮件文案，并包含写得对时回复率最高的"bump"邮件，以及结束序列的"分手"邮件。

### `playbooks/objection-handling.md`
七种常见异议 —— "我们已经在用 X""把更多资料发给我""没预算""时机不对""不是对的人""我们试过类似的东西"，以及无声 ghost —— 每种给出回复"形态"。不是脚本。脚本一眼被识破；形态会被回复。

### 账户研究 prompt（内联在下方）
短到可放在本文件。见"账户研究 prompt"。

### 会议纪要 + 下一步生成（内联在下方）
同上 —— 见下文"会议纪要形态"。

### Lost-deal nurture 序列（内联在下方）
见"输了之后：不烂的 nurture"。

---

## 让一切有效的 prompt 模式

AI 写出的出站邮件是否转化，最大的决定因素是输入。多数邮件通用，是因为多数输入通用。

按此形态：

```
[ICP]
具体的 persona。"Series A SaaS、50-200 员工、美国、构建 React 前端的 VP Engineering"。不是"B2B SaaS"。

[Prospect 特定信号]
钩子 —— 关于"这个"prospect 的、配得上这封邮件的事。
例子：
- "他刚在 LinkedIn 上发文说招聘冻结。"
- "他们 3 周前完成 B 轮，[VC] 领投。"
- "他们 6 周前写过一篇关于迁移到 [tech] 的博客。"
- "他 4 个月前从 [前公司] 离开来 [现公司]。"
- "他们的产品刚发布了 [feature]。"
- "他们 CEO 2 周前上播客说 [引述]。"

[Value]
我们到底做什么，用大白话。**不是**营销文案。
"我们通过降低 flaky test 重跑帮工程团队削减 CI/CD 开销。"不是"我们是 AI 驱动的测试优化平台"。

[Proof]
一件具体的事。一个对方认得的客户名、一个数字、一篇公开案例。

[CTA]
那一个 ask。"下周二 15 分钟？"，不要"open to learning more / chatting / connecting / a brief intro call"。

[约束]
- 长度上限（冷开场 75 词；跟进 40 词）
- 主题行上限（40 字符）
- 语气备注（更随意、更正式、模仿其文风若你有样本）
```

跳过 [Prospect 特定信号] 行是冷邮件读起来像模板的第一大原因。跳过 [约束] 是它出来太长的第一大原因。

---

## 账户研究 prompt

要研究 prospect 时把它粘进去。把你手头一切喂给它 —— LinkedIn 主页内容（粘 headline 与近期动态）、公司官网文案、近期新闻、最近一两篇博客或他写的内容。

```
为 [prospect 名]、[职位]、[公司] 做研究摘要。

下方粘了：LinkedIn 主页内容、公司近期新闻、他最近写或发的 1-2 件事。

[粘内容]

产出：

1. 三个可用于冷邮件开场的开头句。每个都要引用上方内容里的具体信息 —— 不要泛泛的"我看到你在 X 工作"。要具体到对方知道你真的看了。

2. 基于其岗位、公司阶段与最近信号，他当下最可能在解决的问题。一段话。

3. 最可能落地的角度。（如："这位每天发版很多 —— 他大概更看重'直接讲重点'而非'先建立关系'。"或："他们刚融资 —— 关心招聘效率与 burn rate。"）

4. 一件不该提的事。（有时是近期裁员、公共争议、他们刚发布的竞品 —— 提它会显得没分寸。）

5. 用最强开头的 50 词冷邮件草稿。
```

"一件不该提的事"是把它和通用个性化拉开的关键。AI 擅长找点可引用的，对该跳什么不太敏感。

---

## 会议纪要形态

每次 discovery 或 demo 通话之后，粘这段：

```
基于下面笔记生成一封会议纪要邮件。

会议情境：
- 日期：[日期]
- 对方参会者：[姓名与职位]
- 我方参会者：[姓名]
- 阶段：[discovery / demo / pricing / closing]

我的原始笔记：
[粘 —— bullet 可以，不必整理]

他们的下一步：
[他们承诺的事]

我的下一步：
[我承诺的事]

未决问题：
[我欠他们的、他们欠我的]

决策时间表：
[若知]

输出：一封短纪要邮件（< 150 词），含：
- 两行覆盖内容的总结
- 他们的下一步（点名）
- 我的下一步（点名，附日期）
- 一个我想他们回答的未决问题
- 若有则给出下次通话日期建议

语气：清晰、专业、不要"great chatting with you!"开场。若我分享了对方邮件，模仿其文风。
```

会议结束 4 小时内发的纪要邮件，转化稳定地高于第二天早上发的。AI 把这把时间从 30 分钟压到 5。

---

## 输了之后：不烂的 nurture

对 closed-lost 的交易，"我们 6 个月后再联系！"那套行不通，因为第二次触达会读作绝望。更好：低频但高信号的 nurture，通过有用赢得注意力。

节奏：

- **第 +14 天：** 简短致谢 + 一份与他们当前工作相关的具体资源（案例、文章、演讲）—— 不是销售物料。
- **第 +60 天：** 一条有用的观察。你从别家客户学到、他知道有用的东西。无 CTA。
- **第 +120 天：** 与他市场相关的行业转折或信号。无 CTA。
- **第 +180 天：** "快速核对 —— [公司] 的优先级变了吗？" 一句话。
- **第 +365 天：** 周年问候。"我们一年前聊过，如果 [他当初拒绝的原因] 已经变了，我有兴趣听听。"

每封 < 75 词。五封里三封无 CTA。目的是当他当初拒绝的原因不再成立时，你是他第一个想到的人。

---

## 诚实元 prompt

要 AI 写任何出站文案前，先加一行：

> "把它写成我其实认识这个 prospect、5 分钟后要一起喝咖啡。完全去掉销售腔。"

它能稳稳压住企业销售腔。若草稿里仍有"I wanted to reach out because"或"I came across your profile"，说明元 prompt 没起作用。再试："去掉所有暗示这是冷拓的信号。写一封你会发给运营该公司的真朋友的邮件。"

---

## 本套件**不会**替你做的事

- 替代 SDR 手艺。给谁发、什么时候发、多频，是你的工作。AI 是写作层。
- 找 prospect。用 Apollo、ZoomInfo、LinkedIn Sales Navigator。AI 配合你带来的 prospect。
- 绕过垃圾过滤。量 + 烂内容 + 烂基础设施（没预热、没 DMARC/SPF/DKIM、共享域）才是杀送达率的元凶。好文案救不了烂配置。
- 替代 CRM。序列在 CRM 跟踪。AI 用于起草，不是 pipeline 管理。

---

## AI 在该领域容易犯的两件事

1. **默认企业销售腔。** "I wanted to reach out to introduce...""I'd love to learn more about...""I'd be curious to explore..."——典型冷邮件标记。上面的元 prompt 能压住大部分。再补一句："写成你给同事发短信的样子。"

2. **浅个性化。** "I see you went to [University]。""I noticed [Company] is based in [City]。"那不是个性化，是数据合并多走两步。真正的个性化引用 prospect 真正做过、说过、发过的内容。逼一下："他具体发过、做过、说过、被引用过的某件事是什么？没有就跳过个性化行，直接讲价值。"

---

## 配套文档

- `optimization-pack.md` — 任意 AI 工具可粘的系统提示词
- `custom-gpt-instructions.md` — ChatGPT Custom GPT 设置
- `quick-start.md` — 60 秒上手
- `frameworks/cold-email-frameworks.md` — PAS、BAB、AIDA 配实例
- `templates/follow-up-cadences.md` — 第 0/3/7/14/21 天完整文案
- `playbooks/objection-handling.md` — 7 种常见异议、每种的正确回复形态
