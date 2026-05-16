# 求职信 + LinkedIn 重写

> 两个共享语气的交付物。求职信被读到的概率约 30% —— 还是要写,而且要短。LinkedIn 被读到的频率比求职信高,而且比人们以为的更重要。

---

## 第 1 部分 —— 求职信

### 提示词

```
你在为用户写求职信。规则:

1. 三段。总共 ~200 字。最多 220。
2. 第 1 段(~50 字):用一个具体理由开头,说明用户为什么给**这家**
   公司写信。引用一款产品、一个人、一次近期发布,或一个用户真正
   思考过的问题。**绝不**用 "I am writing to apply for the position of"
   开头。
3. 第 2 段(~100 字):一个具体故事,把用户经验映射到 JD。具体成果。
   不要是简历复述。
4. 第 3 段(~50 字):以明确下一步收尾。自信但不傲慢。
   不要 "I would love the opportunity to discuss"。
5. 语气:听起来像用户写的。给创业公司略不正式,给金融或企业略
   正式。绝不像新闻稿。绝不凡尔赛。
6. 不写 buzzword(passionate、results-driven、fast-paced、dynamic)。
7. 不要 "transferable skills" 框架。直接展示工作。

只输出求职信。不要旁白。
```

### 输入结构

```
[目标角色]
Title、公司、一句他们在做什么。

[具体钩子]
关于这家公司你**唯一**要起头的那件事。挑一件。
例子:
- "I've been using your product for 18 months and it's the only
  tool in this category that ships at a real cadence."
- "I worked on a similar payments problem at <prev co> and want to
  spend the next 4 years going deeper on it."
- "I've followed <hiring manager's name>'s writing for years and the
  team's recent post on event-driven architecture clarified some
  things I'd been wrong about."

[映射的故事]
一个项目,两到三句背景,结果。

[收尾能量]
自信、可用、低压。
```

### 范例

**输入:**

```
[目标角色]
Senior Backend Engineer, Payments — Lumenari Co(AI 工具市集,月交易
~$2M)

[具体钩子]
"I built a Stripe Connect + Postgres payments stack at a marketplace
doing similar volume for the last three years, and your recent
engineering blog post on idempotent webhook retries is exactly the
architectural direction I've been pushing my team toward."

[映射的故事]
在 Acme,own 月处理 ~$4M 的 payments 子系统。通过加 idempotency keys
+ dead-letter queue,把 webhook retry failure 砍掉 78%。带过 2 个
mid-level 工程师,18 个月内都晋升 senior。

[收尾能量]
本周或下周可聊;如有用,愿意分享更多 retry-failure 的细节。
```

**AI 返回的输出:**

```
Maya,

Your engineering post on idempotent webhook retries is exactly the
architectural direction I've been pushing my team toward for the past
year — I'm writing because I think I can help you ship the next layer
of it.

For the last three years I've owned a Stripe + Postgres payments stack
at Acme Co, a marketplace doing roughly $4M/month in transactions. The
work I'm most proud of: I cut webhook retry failures by 78% over six
months by introducing idempotency keys and a dead-letter queue, then
hardened the on-call rotation enough that P1 page volume dropped from
twelve a month to three. Along the way I mentored two mid-level
engineers; both are now seniors. The mentorship piece is part of why
I'm looking — I'd like the next role to make it official.

I'm available to talk this week or next. Happy to share the retry-
failure architecture in more detail if it would be useful before a
conversation.

— Alex
```

这封信做对了什么:

- 用一句具体引用公司工程内容开头。Hiring manager 知道你**真**读了。
- 正文段点名工具、数字和结果 —— 不是简历复述。
- 用用户的口吻提到带新("the mentorship piece is part of why I'm looking"),因为 JD 明确要求。
- 以"可用 + 软提议(retry-failure 架构)"收尾。没有 "I would love the opportunity"。

---

## 第 2 部分 —— LinkedIn 重写

三段最重要,按顺序:headline、About 段、Experience 顶部。

### Headline(最多 120 字符)

招聘人在搜索结果里看到的。

**差:**

```
Senior Software Engineer | Passionate Builder | AWS / TypeScript / React
```

**更好:**

```
Senior Backend Engineer — payments, Stripe, Postgres | Mentor | Calgary / Remote
```

提示词强制的规则:

1. 先放你**目标**的角色,而不是当前头衔(若两者不同)。
2. 接着三个具体关键词 —— 你**真的**用的工具,不是技术栈大杂烩。
3. 可选第三段:地点或可用性("Open to remote NA")。
4. 不写 buzzword。不要 "Passionate Builder"、"Code Slinger"、"Tech Enthusiast"。

### About 段 —— 前三行就是全部

只有前 ~210 字符在 "...see more" 折叠前显示。围绕这部分优化。

**提示词:**

```
为用户写 LinkedIn About 段。规则:

1. 第一句(最多 ~140 字符):定位陈述。做什么、为谁做、一个结果。
   这是很多招聘人**唯一**读到的一行。
2. 接下来两句要塞进前 ~210 字符总长内。把读者钩进去点 "see more"。
3. 总长:4-6 个短段,~150 字。
4. 第一人称,口语。听起来像用户写的,不是公关写的。
5. 以一个具体 CTA 收尾:"DM me if you're hiring for X",或
   "I write about Y at <link>",或 "Open to senior backend
   roles in the payments space"。
```

**范例:**

```
I build payments infrastructure for marketplaces. For the last three
years I've owned a Stripe + Postgres stack processing $4M/month at
Acme Co — webhooks, on-call, mentorship, the whole thing.

Before Acme I was at a fintech startup where I learned the lesson
every payments engineer learns the hard way: idempotency is not
optional, dead-letter queues are not optional, and the runbook is
read at 2 a.m. by someone who didn't write it.

I care about three things in a role:
- Hard problems with real users
- A team where mentorship cuts both ways
- The autonomy to ship without theater

Currently in Calgary, open to remote roles in North America. DM me
if you're hiring for a senior backend engineer in payments — I'm
particular about where I'd go, and I'd rather have one good
conversation than ten polite ones.
```

前 210 字符(~3 行)展示什么:

```
I build payments infrastructure for marketplaces. For the last three
years I've owned a Stripe + Postgres stack processing $4M/month at
Acme Co — webhooks, on-call, mentorship, the whole thing.
```

这就是钩子。招聘人在第一段就看到角色、工具、结果,能判断要不要往下读。

### Experience 段 —— 当前及最近角色的顶部

LinkedIn 在每个角色 2-3 行后会折叠,除非有人点展开。所以每个角色的前两行,等同于简历的上三分之一。

**提示词:**

```
重写用户当前角色在 LinkedIn 上的前 2-3 个 bullet。规则:

1. 第一个 bullet:这个角色范围和影响的一行总结。
2. 第二个 bullet:对用户目标岗位最相关的那一个成就。
3. 第三个 bullet(可选):展示广度的第二个成就。
4. 同简历风格:主动语态、具体数字、无 buzzword、与 JD 对齐的词汇。
5. 只输出 LinkedIn 格式文本。
```

范例输出:

```
Senior Backend Engineer at Acme Co
2022 - Present · Calgary, AB (Remote)

→ Own payments and webhooks subsystem (Stripe + Postgres + Kafka)
  for a marketplace doing ~$4M/month in transactions.
→ Cut webhook retry failures 78% by introducing idempotency keys
  and a dead-letter queue; P1 pages dropped 75% over six months.
→ Mentor 2 mid-level engineers; both promoted to senior in 18 months.
```

---

## 两个交付物如何配合

求职信和 LinkedIn About 不应一字不差,但要**共享**语气和定位。如果求职信说你 "own a Stripe stack at a marketplace doing $4M/month",LinkedIn About 也应该说同样的事 —— 措辞不同。同时读两者的招聘人会注意到你听起来像不像两个人。

在同一对话里先后跑求职信提示词和 LinkedIn About 提示词。AI 会保持语气一致。

---

## 提示词会拦截的反模式

- "I am writing to apply for the position of [role]." —— 见到就砍。
- "I am thrilled by the opportunity to..." —— 砍。
- "Please find attached my résumé." —— 他们知道。砍。
- "I would love the opportunity to discuss how my skills..." —— 砍。
- LinkedIn headline 里的 "Tech Enthusiast | Lifelong Learner | Coffee Addict" —— 砍。
- "Results-driven, detail-oriented self-starter passionate about..." —— 全砍。

任一漏过来,追问:"把这份草稿里所有套话都剥掉,用大白话重写。"
