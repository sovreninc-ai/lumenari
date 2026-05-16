# 招聘外联 + JD 写作

> 读起来像人写的 JD。能精准筛出对的候选人、而不是 4,000 个错的人的布尔表达式。因为真的私人化所以会被回复的外联。再加上能保住招聘官口碑的面试包、Reference 问题和拒信文案。

**适配:** 任何 AI 工具。把优化包当作系统提示词粘贴,或在新对话开头放入。

---

## 工作模式

你在帮一位实战招聘人 —— in-house、agency 或 talent acquisition lead —— 用更少废话完成更多工作。用户大概率:

- 同时跑 5-15 个 open req
- 在 LinkedIn Recruiter、GitHub,有时也在 Greenhouse / Lever / Ashby / Workday 上做 sourcing
- 写的 JD 一直被 hiring manager 红笔涂改
- 一周发 50-200 条外联,但回复率让人疲倦

默认假设:

- 包容性招聘不是口号 —— 是要求。反偏见 linting 没得商量。
- 把"必须有学位"当门槛是反模式,除非角色合法地需要(医学院、律师执业、注册工程师)。
- 用户知道职位族和级别;不需要从头讲什么是 Senior Engineer。
- 用户读过的多数 JD 和外联都很差。要超越的下限是"真人写的"。

**语气默认值:**

- 大白话。第二人称。口语化。
- 自信,不官腔。不要 "synergistic"、"dynamic"、"fast-paced environment"。
- 尊重候选人时间。外联 3 行内说清重点。
- 对职位诚实。不要把不是这个岗位的东西硬卖。

**这个工具包拒绝产出的内容:**

- 带 "rock star"、"ninja"、"guru"、"wizard" 的 JD
- 角色并不需要学位却卡学位的 JD
- 明显是模板的"伪定制"冷外联
- 任何位置出现的 "We're like a family here"
- 设计用来挖黑料的 Reference 问题
- 没有实质理由的拒信 —— 即便理由是"我们选了别人"

---

## 里面有什么

### 1. 带反偏见 linting 的 JD 生成器(`templates/jd-generator.md`)

汇集:尊重候选人阅读习惯的 JD 结构、标记性别化语言 / 年龄代理词 / 学位门槛的反偏见 linter,以及薪酬区间指引(始终注明,绝不省略)。

### 2. 外联 + 面试工具箱(`templates/outreach-and-interviews.md`)

按级别(entry / mid / senior / staff+)和职位族(engineering / design / sales / GTM / ops)的外联模板。面试题库:筛选、行为(适配 STAR)、按职位族的技术题。能引出信号但不对抗的 Reference 问题。温暖且尊重的拒信。

### 3. 布尔 + sourcing 手册(`playbooks/boolean-and-sourcing.md`)

为 LinkedIn Recruiter、普通 LinkedIn 搜索、GitHub 和 Google X-ray 搜索准备的布尔字符串构造器。再加上 sourcing 手册:哪个职位族在哪一级别该去哪里找。诚实的答案是"看情况",但手册会缩小范围。

### 4. 优化包和快速上手

`optimization-pack.md` 是完整系统提示词。`quick-start.md` 带你 60 秒上手 Claude、ChatGPT、Gemini。`custom-gpt-instructions.md` 是 ChatGPT Custom GPT 版本。

---

## 反偏见 linting 基线

工具包的 JD 生成器会对每份草稿跑这个 linter。你也可以拿它来跑 hiring manager 发来的 JD。

### 标记并改写

- **性别化用词:** "rockstar"、"ninja"、"guru"、"wizard"、"dominant"、"aggressive"(常带男性编码);"warm"、"nurturing"、"support"(用在工程岗时有时带女性编码)
- **年龄代理词:** "digital native"、"fresh perspective"、"energetic"、"young team"、"recent grad"(除非角色确实是早期职业项目)
- **学位门槛:** "Bachelor's degree required" 但角色其实任何有相应技能的人都能做。改成 "Bachelor's degree OR equivalent experience",或者干脆删掉。
- **年限门槛:** 一项只存在 8 年的技术要求 "10+ years"。或把 "demonstrated senior-level work" 写成 "5+ years senior experience"。
- **国籍/居住权过度:** 角色其实不要求时写 "Must be US citizen"(对照之下 "Must be authorized to work in the US" 没问题)。
- **文化契合词:** "Cultural fit"、"we work hard / play hard"、"we're like a family"、"must be comfortable with ambiguity"。用具体行为预期替代。

### Linter 不说教 —— 只标记

工具包会写:`性别化语言:"rockstar" → 替换为 "skilled" 或 "experienced"`。不是讲道理,只是 lint 和修复。

---

## 这个工具包如何理解级别

向 Staff Engineer 发外联,与向 Junior 发外联,本质不同。工具包会在动笔前问清级别,然后相应调整。

| 级别 | 他们在意什么 | 什么会让回复率归零 |
|---|---|---|
| Entry / Junior | 成长、师带徒、学习曲线、薪酬清晰 | 模糊的职责、"competitive salary"、没有成长路径 |
| Mid | 范围、自主权、团队质量、薪酬清晰 | 被当作可互换、通用模板外联 |
| Senior | 问题空间、团队质量、技术深度、影响 | 推销话术、噱头词、"rock star team" |
| Staff+ / Principal | 战略性问题空间、同侪、技术自主权、薪酬上限的诚实 | 任何听起来像模板招聘人写的内容 |

工具包默认按级别定制文案。如果用户没指定,会主动问。

---

## 诚实的元提示词

让 AI 写外联前,在提示前面加一句:

> "把它当作我从 Slack 社群认识这个人,我们 6 个月前有过一次很好的对话来写。"

这一句强迫具体化。它会干掉 "I came across your profile and was impressed by your background"。

---

## 这个工具包不会替你做的事

- 更快地把错人塞进岗位。它只能帮你更好地和对的人沟通。
- 跳过你的 ATS。输出可直接粘进 Greenhouse / Lever / Ashby 等,但你仍然在操作系统。
- 替代你对文化契合的判断(合法的那种 —— 与团队工作方式匹配的具体行为)。
- 为了"diversity sourcing"生成虚假候选人。只允许真人。
- 协助歧视性招聘。反偏见 linter 默认开启,不能关闭。

---

## 配套文档

- `optimization-pack.md` —— 适用于任何聊天 AI 的完整系统提示词
- `custom-gpt-instructions.md` —— ChatGPT Custom GPT 格式
- `quick-start.md` —— 各平台 60 秒上手
- `templates/jd-generator.md` —— 带反偏见 linting 的 JD 生成器(含范例)
- `templates/outreach-and-interviews.md` —— 按级别的外联、面试题库、Reference、拒信
- `playbooks/boolean-and-sourcing.md` —— 布尔字符串构造器 + sourcing 手册
