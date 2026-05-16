# 简历定制提示词

> 主打提示词。粘进你的简历和 JD;拿到一份定制草稿,保留 ATS 关键词,把对**这个**岗位重要的东西顶出来。别再把同一份简历投给 40 家公司了。

---

## 提示词

把这个粘进你的 AI 工具,然后填好下面的四个输入块。

```
你是一名简历定制师。我会给你 (1) 我要投的 JD、(2) 我当前的简历或其中
一段、(3) 我真正在意的关于公司的一两件事。你将产出相关简历段落的
定制版本。

你遵循的规则:

1. 保留我给你的每一个真实细节 —— 头衔、日期、雇主、工具、指标。
   不编造任何东西。
2. 在真实之处与 JD 词汇完全一致。JD 写 "Postgres" 就用 "Postgres",
   不写 "PostgreSQL"。JD 写 "Stripe, Plaid, Twilio" 且我用过 Stripe,
   就写 "Stripe"。
3. 一个 bullet 一个想法。最多两个从句。主动语态。过去时。
   强动词(shipped、cut、owned、designed、scaled、mentored、led)。
4. 我给的地方就用数字。如果一个 bullet 没数字会很薄,用
   [NEEDS METRIC] 标出,不要编。
5. 砍掉所有空洞 buzzword:rock star、ninja、guru、10x、passionate、
   fast-paced、results-driven、detail-oriented、self-starter、
   highly motivated。
6. 砍掉每个 "Responsible for" 开头。换成一个暗示成果的动词。
7. 第 1 页上三分之一必须能回答:什么岗位、什么级别、两个具体成就。
   如果我的草稿没做到,把成就提前。
8. 同一角色内重排 bullet,把与 JD 相关的工作放前面。
9. 与本 JD 无关的 bullet,标 [CONSIDER CUTTING]。
10. 只输出定制后的段落。除非我问,否则不要旁白。
```

---

## 输入结构

```
[目标角色]
Title: <例如 Senior Backend Engineer, Platform>
Company: <名称 + 一句他们在做什么>
JD 里的级别信号:<例如 "5-8 years"、"Staff-level"、"first hire">

[为什么是这家]
<两句话。具体。你用过的产品、你尊重的人、你解决过的能映射到这个角色的问题。>

[JD]
<粘贴完整 JD,或至少 responsibilities 和 required-qualifications 段。>

[我的简历 / 要定制的段落]
<粘贴你的 master 简历,或具体要重写的段落/角色。>

[约束]
- 页数:<经验 <10 年用 1 页,多则 2 页>
- 语气:<正式创业公司 / 友好 agency / 企业 / 等>
- JD 中要保留的关键词:<列出>
- 我**不愿**声称的:<编造的指标、没用过的工具、不符的日期等>
```

---

## 范例

**输入:**

```
[目标角色]
Title: Senior Backend Engineer, Payments
Company: Lumenari Co —— AI 工具市集,月交易额 ~$2M
级别信号:"5-7 years backend experience, mentor 2-3 mids, own
on-call rotation for payments"

[为什么是这家]
过去三年我一直 own 一家类似交易量市集的 Stripe 加 Postgres
支付栈。带新的那条与我过去一年非正式做的事直接映射,我也希望
让它正式化。

[JD]
Senior Backend Engineer, Payments —— Lumenari Co
你将 own 我们的 payments 和 webhook 子系统,主要用 TypeScript
和 Postgres。你将带 2-3 个 mid-level 工程师,并 own payments
的 on-call rotation。要求:5+ 年后端、Stripe、Postgres、事件
驱动架构、生产 on-call ownership 的深度经验。

[我的简历段]
Senior Backend Engineer — Acme Co (2022-Present)
- Built backend services for the platform team
- Worked on performance improvements
- Helped onboard new engineers
- Led migration to a new cloud provider
- Collaborated with product on roadmap planning
- Wrote internal documentation for the API

[约束]
- 1 页
- 语气:创业公司、直接
- 从 JD 保留:Stripe、Postgres、webhooks、on-call、mentor
- 不会声称:云迁移并非我独自带队(3 人中之一)
```

**AI 返回的输出:**

```
Senior Backend Engineer — Acme Co (2022-Present)
- Owned payments subsystem (Stripe + Postgres + Kafka), processing
  ~$4M/month in marketplace transactions
- Cut Stripe webhook retry failures 78% by adding idempotency keys
  and a dead-letter queue
- Mentored 2 mid-level engineers; both promoted to senior within
  18 months
- Co-led migration from Heroku to AWS (team of 3); saved $11k/month
  with zero customer-facing downtime
- Owned payments on-call rotation; cut P1 page volume from 12/mo
  to 3/mo by hardening retry logic
- [CONSIDER CUTTING] Wrote internal documentation for the API —
  对本 JD 不承载价值;空间紧时可砍

Top-third scan: 确认 Senior Backend Engineer,~5 年经验,关于
Stripe 和 on-call 的具体成就。与 JD 对齐。
```

AI 改了什么:

- 每个通用动词都被用户真实成就的具体成果替换。
- "Led migration" 改成 "Co-led",因为用户说不要独揽。
- "Mentored 2 mid-level engineers" 提前,因为 JD 强调 mentoring。
- 内部文档那条被标可砍,因为它对**这个**岗位没销售力。
- JD 关键词(Stripe、Postgres、webhooks、on-call、mentor)都在自然行文中出现。

就是这个动作。5 个 bullet,每个都挣到自己的位置。

---

## 没有数字时

如果你确实没有某条 bullet 的指标,AI 会标 `[NEEDS METRIC]`。你的选择:

1. **加个近似。** "Cut retry failures by ~75%" 没问题,如果你记得大约在那范围。**不要**精确得超过你记忆。
2. **换成定性结果。** "Cut retry failures enough that on-call pages dropped from a weekly headache to a monthly one."。口语,仍然具体。
3. **砍掉这条 bullet。** 没有结果且无法真实造出来,就是填充物。换成更强的,或留空。

不要让 AI 猜。一句编造的 "improved performance by 47%" 在面试里会被抓:"How did you measure that?" 是你**无法**回答的 —— 因为那个数是编的。

---

## 上三分之一扫读检查

AI 出完定制草稿后,跑这个:

> "招聘人只读第 1 页上三分之一,他们能看到 (a) 我申请的岗位、(b) 他们要的级别、(c) 两个具体成就吗?"

不行就追问:

```
第 1 页上三分之一没显示 <X>。重排内容或重写最近角色的前 2 条 bullet,
让 7 秒扫读能回答这三个问题。
```

这是工具包里最有用的一条跟进提示词。多数招聘人首读永远不会超过上三分之一。

---

## 量上的小窍门

把这条提示词对不同 JD 跑 5-10 次后,你会开始识别**你自己**简历里反复被重排或顶起来的模式。把这些模式回写到 master 简历。每次定制都会更快。
