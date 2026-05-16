# 带反偏见 linting 的 JD 生成器

多数 JD 都差,因为 hiring manager 花 20 分钟写出来,一半抄自另一份 JD,而且从没以候选人视角读过一遍。这个模板修复这一点。它先跑一遍反偏见 linter,再产出尊重候选人阅读习惯的 JD。

---

## 这个模板怎么用

两遍:

1. **Lint pass。** 标出简报或现有 JD 草稿里每一处问题短语。在输出顶部展示 lint + 修复。
2. **JD 草稿。** 一份采用优化包标准格式的、结构清晰的干净 JD。

你也可以**只**对 hiring manager 发来的 JD 跑 lint(agency 和 in-house 团队最常用)。

---

## 提示词

```
你是 Recruiter Co-Pilot。

生成一份 JD。

**角色标题:** [exact title]
**级别:** [Entry / Mid / Senior / Staff / Principal / Director / VP]
**职位族:** [Engineering / Product / Design / Sales / GTM / Ops / Finance / etc.]
**公司阶段 + 规模:** [例如 Series B,80 人,$30M ARR]
**我们做什么:** [一句]
**为什么招这个岗位:** [一句 —— 扩张、替补、新团队、新职能]
**地点 + 工作方式:** [Remote / Hybrid [城市] X 天 / On-site (城市)]

**薪酬区间:**
- Base: [low] - [high] [currency]
- Equity: [范围,如适用]
- Bonus/commission: [结构,如适用]

**这个人将拥有的前 3 件事(具体,不模糊):**
1. [outcome]
2. [outcome]
3. [outcome]

**所需的前 3 项技能/经验(以成果而非门槛表达):**
1.
2.
3.

**Nice-to-have(可选):**
- [3-4 项]

**他们将加入的团队(真实人数,可公开就写经理姓名):**
[描述]

**面试流程(你真实的流程,不是模板):**
[轮数、见谁、形式]

**其他值得说明的:**
[例如 "我们还没有资深工程师 —— 你来定义标准","代码库比我们希望的老"]

现有草稿(如有):
[粘贴 —— 跑 lint]
```

---

## 你拿回的内容 —— 完整范例

针对一个 Series B SaaS 的 Senior Full-Stack Engineer 岗位:

### Lint pass(基于 hiring manager 草稿)

> **原稿 lint pass:**
>
> - `"passionate"` → 删。Passion 是感觉,不是交付物。
> - `"rock star"` → 删。性别化(偏男,劝退资深女性候选人),也带官腔尴尬。
> - `"fast-paced, dynamic team"` → 删。"我们很乱" 的密语。用具体节奏预期替代。
> - `"10x developer"` → 删。毫无意义,会劝退稳重的资深工程师。
> - `"thrives in ambiguity"` → 软化或具体化。资深工程师期待**一些**结构;这句话常常意为"我们也不知道要什么"。
> - `"wear many hats"` → 删。"我们没有团队" 的密语。如果属实,就诚实地说。
> - `"Bachelor's degree in Computer Science required"` → 删,或改成 "Bachelor's degree OR equivalent experience"。拥有 10 年可证明工作的资深工程师不应被 CS 学位卡。
> - `"10+ years of experience"` → 重新考虑。这个岗位不需要 10 年;在 6-8 年时达到资深质量很常见。改成 "demonstrated senior-level work over multiple roles"。
> - `"work hard and play hard"` → 删。暗含年轻 + 内卷。劝退年龄较大的候选人和父母。
> - `"we're like a family here"` → 删。模糊,常是边界问题的旗子。用具体的团队规范替代。
> - `"competitive salary"` → 用实际薪酬区间替换。没得商量。

### 重写后的 JD

> **Senior Full-Stack Engineer**
>
> **About the role**
>
> You'll be the third senior engineer on a team of seven, working across our TypeScript / React / Node / Postgres stack to ship features our customers actually pay us for. Day-to-day means writing production code, reviewing PRs, occasionally pairing with mids on tricky problems, and owning a major area of the product end-to-end.
>
> **What you'll do**
>
> - Ship features that touch the full stack — from Postgres schema to React components
> - Own one of our three product areas (billing, integrations, or workflows) within your first 90 days
> - Set the technical bar on a team that's growing from 7 to 12 engineers over the next year
> - Pair with the product manager and designer on scoping decisions, not just on implementation
> - Mentor mid-level engineers, with about 20% of your time on this (more if you want it, less if you don't)
>
> **What we're looking for**
>
> - Demonstrated senior-level work across TypeScript / React on the front end and Node / Postgres on the back end
> - You've shipped to production at a startup or fast-moving team — you know what "good enough to ship" means
> - You can scope your own work from a one-paragraph problem statement
> - You write code others can read and review without a translator
> - You've worked remotely with a team across multiple time zones
>
> **Nice to have**
>
> - Experience with AWS (we're on it; happy to bring you up to speed if not)
> - Background in B2B SaaS specifically
> - Open source contributions or a side project you're proud of
> - Comfort with infra-as-code (Terraform)
>
> **Compensation**
>
> - Base salary band: USD $170,000 - $210,000
> - Equity: 0.05% - 0.15%, 4-year vest with 1-year cliff
> - Bonus: 10% target annual bonus tied to company OKRs
> - Benefits: full health/dental/vision (US: 100% employee, 80% dependents), $1,000/mo home office stipend, unlimited PTO with a 3-week minimum, 16 weeks parental leave
>
> **About the team**
>
> Seven engineers reporting to [Engineering Lead name if public]. We do 2-week sprints, async-first with two short syncs a week. No on-call rotation yet — we run a small ops team for that. Codebase is 4 years old, well-tested in the parts that matter, getting cleaner.
>
> **How we hire**
>
> 1. 30-min intro with me (the recruiter)
> 2. 60-min technical interview with two engineers — a real problem we've worked on, no LeetCode
> 3. 60-min system design conversation
> 4. 45-min meeting with the engineering lead — culture, working style, your questions for us
> 5. Two short reference calls
>
> Total time investment: about 4 hours over 2-3 weeks. We make decisions within 5 business days of the final round.
>
> **Working arrangement**
>
> - Remote-first across US and Canada
> - Core hours: 11am - 3pm Eastern, with flex around that
> - We meet in person twice a year for a 3-day company offsite (last one was in Mexico City; next one is Lisbon)
> - No required travel beyond the offsites

这份 JD 约 480 字。它在同样的收件箱里通常会跑赢 90% 的 JD,因为它给了候选人在投递前做真实决定所需的信息。

---

## 范例 —— 仅 lint

用户粘了 hiring manager 的原稿:

> "We're looking for a passionate rock star full-stack engineer to join our fast-paced, dynamic team. You'll be a 10x developer who thrives in ambiguity and isn't afraid to wear many hats. Must have a Bachelor's degree in Computer Science and 10+ years of experience. We work hard and play hard, and we're like a family here. Competitive salary and benefits."

AI 返回:

> **Lint pass —— 51 个词里有 9 处旗。建议整体重写。**
>
> 1. `passionate` —— 删(模糊、劝退资深候选人)
> 2. `rock star` —— 删(性别化、官腔尴尬)
> 3. `fast-paced` —— 删("乱" 的密语)
> 4. `dynamic` —— 删(什么也没说)
> 5. `10x developer` —— 删(神话,劝退稳重资深)
> 6. `thrives in ambiguity` —— 标(有时合理;通常意为"我们也不知道要什么")
> 7. `wear many hats` —— 删("没团队支援" 的密语)
> 8. `Bachelor's degree in CS required` —— 删,或改成 "OR equivalent experience"
> 9. `10+ years of experience` —— 重新考虑(往往带歧视;资深质量常出现在 6-8 年)
> 10. `work hard and play hard` —— 删(年龄编码、内卷编码)
> 11. `like a family` —— 删(模糊,有时是边界旗)
> 12. `Competitive salary` —— 替换为实际区间
>
> 这份 JD 现状会在多元候选人 pipeline 上表现不佳,资深申请数也会少于你想要的。需要我重写吗?

---

## 什么时候 linter 不该响

某些被标的短语在上下文中是合法的。例子:

- "Aggressive" 用在 "aggressive product roadmap"(真实存在)是可以的,但用在 "aggressive personality"(招聘信号,带偏见)就不行。
- "Family" 用来描述真正的家庭友好政策(育儿假、子女病假)可以。**不**可以用作 "we're like a family"。
- "Recent graduate" 用在明确品牌化的早期职业项目上可以。**不**可以用在 Senior 角色上。

对这些上下文相关情况,linter 会标注 "flag, not auto-replace —— confirm intent"。

---

## 怎么和 hiring manager 一起用

常见场景:hiring manager 写了 JD。你觉得不行。你不想让他们觉得被攻击。

Lint pass 给你一个不正面冲突的方式去推回。把被标的短语连同**原因**一起给他们(有研究支持:性别化语言会让女性申请人下降 11%;"10+ years" 过滤掉有 6-8 年资深质量工作的合格候选人;学位门槛会压缩多元 pipeline)。

你不是在告诉 hiring manager 他们写得不好。你是在向他们展示这种语言对申请人池的数据影响。多数 hiring manager 看到之后会愉快地修改。

---

## 工具包会标记的常见错误

- **没有薪酬区间。** 始终问。始终写。
- **没有真实的 "How we hire" 段。** 泛泛的 "multiple rounds" 是旗 —— 要具体。
- **JD 超过 800 字。** 删。长 JD 是犹豫。
- **区间里有 "Bonus" 但没解释。** 始终说清结构。
- **股权区间过宽。** "0.01% - 1%" 等于没说。收紧。
- **"Nice to have" 段里塞了实际必需项。** 不要把 must-have 藏在 nice-to-have 里;会让候选人混乱、把好的人挡在外面。
