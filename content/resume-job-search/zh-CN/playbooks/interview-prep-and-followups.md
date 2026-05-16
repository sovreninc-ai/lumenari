# 面试准备 + 跟进

> STAR / 行为 / 技术面试准备,以及每次求职都需要的三封跟进信:致谢、被拒后、ghost 恢复。

---

## 第 1 部分 —— 行为面试准备(STAR)

### STAR 在实战里到底怎么用

多数人把 STAR 搞错,80% 时间花在 Situation 和 Task 上。面试官不在意铺垫。他们在意**你**做了什么、发生了什么。

正确比例:

- **Situation(10%)**:一句话。"在 Acme,我们大约 12% 的事件出现 webhook retry failure。"
- **Task(10%)**:一句话。"那个季度我是 on-call,失败每周吵醒我两次。"
- **Action(60%)**:**你**采取的具体步骤。第一人称 "I",不是 "we"。这是主菜。
- **Result(20%)**:有数字就给。对团队、客户、业务的结果。

如果你说 "we" 超过两次,面试官就不知道**你**做了什么。用 "I"。当工作确实是协作时,说 "I led" 或 "I owned the X piece while two engineers handled Y"。

### 准备提示词

```
你在帮我用 STAR 准备行为面试答案。我会给你一道题和我想讲的大致故事。
你产出一份紧凑的 STAR 答案,~200 字。

规则:
1. Situation:最多 1 句。
2. Task:最多 1 句。
3. Action:占 60%。第一人称 "I"。如果是协作,点名**我**具体 own 什么、
   别人做什么。
4. Result:以数字或具体结果结尾。如果没数字,先问我,**不要**编。
5. ~200 字。大声读 90-120 秒读完。
6. 不写 buzzword(passionate、results-driven、dynamic)。无废话。

产出答案后,问我一个面试官最可能追问的问题。如有用,建议给我答案加
一句尾巴预先回应它。
```

### 你应该备好的 6-8 个故事

任何 onsite 之前,准备 6-8 个能屈伸进不同问题的故事。多数行为题是这些主题的变体:

1. 你带过的事
2. 你与同侪或经理意见不合的事
3. 你失败的事
4. 你必须快速学习的事
5. 你做出艰难权衡的事
6. 你带过或培养过他人
7. 你在压力下交付
8. 你顶过利益相关者

每个写 3-4 句背景加结果。你不是在背稿 —— 你是在备**原材料**,让 AI 在现场能塑造成合适的答案。

### 范例

**问题:** "讲一次你和经理意见不合。"

**用户给 AI 的原材料:**

```
在 Acme,我经理想 4 周内、不带 feature flag 上 payments 新功能,
因为客户在等。我觉得不对 —— 我们从没在 payments 上不带 flag 上线
过,客户也不会因多等一周就跑。我推回,最后加了 flag,2 周内灰度上线。
第 1 周我们抓到一个 bug,如果直接 100% 上线,代价约 $80k。
```

**AI 产出的 STAR 答案:**

```
At Acme, my manager pushed to ship a new payments feature in four
weeks without a feature flag because a key customer was waiting.

I owned the deploy and disagreed — we'd never shipped a payments
change without a flag, and I didn't think the customer would feel
an extra week.

I pulled the runbook and wrote up the risk: any bug at 100% rollout
hits every customer, and our average revenue-impact incident in
payments was around $80k. I proposed flagging the feature and rolling
it from 5% to 25% to 100% over two weeks. My manager pushed back twice
on timeline pressure, but I held the line on the architecture and
offered to take the customer call myself to explain the rollout plan.
We added the flag.

In week one at 25%, we caught a webhook retry bug that would have
fired duplicate charges at full rollout. Estimated cost avoided:
roughly $80k. Customer got the feature on the original date because
we'd planned the rollout in parallel with the build. My manager and
I went on to default-flag every payments deploy after that.

(可能的追问:"你怎么处理经理的反对?" —— 我会加一句:
我问他他在优化什么,与客户明确确认,然后把架构论证写成书面,这样
我们就在数据上分歧,而不是在意见上。)
```

220 字,读约 100 秒,展现判断、ownership、沟通和结果。追问建议是加分项 —— AI 标出面试官可能深挖的地方,并给你预制回应。

---

## 第 2 部分 —— 技术面试准备

### AI 擅长什么

- 算法题模式识别 + 解释解法形状。
- 用标准 rubric 走系统设计题(功能需求、非功能需求、API、数据模型、规模、瓶颈、权衡)。
- 给你做调试或代码阅读题的 mock。
- 生成 "如果……怎么办" 的追问,让你不被现场打蒙。

### AI 不擅长什么

- 替代真正的练习。代码要自己写,白板要自己画。读 AI 的方案不等于在压力下产出。
- 预测**你**面试官会问什么。AI 能模拟平均;实际现场是它自己的样子。

### 有用的提示词模式

**系统设计:**

```
我明天在 <公司> 有系统设计面试。岗位 <senior backend>。带我过一遍
你会怎么在 45 分钟里安排这道题:"为类似 Stripe 的平台设计 webhook
delivery system。"

之后再问我 3 个我应该准备好为设计选择辩护的问题。
```

**算法:**

```
我对 DP 生疏了。给我 3 道中等难度 DP 题,每道一行提示。先**不**给
解法。我试完再回来。
```

**模拟面试:**

```
你是一位资深工程师在面试我做后端岗。问我一道调试题。我回答后,
像面试官那样追问。**不要**帮我 —— 推我。最后告诉我我的回答会落地
得怎么样。
```

"推我,不要帮我" 这一句很重要。AI 默认友好。mock 里你不要友好;你要真正面试官会问的问题。

---

## 第 3 部分 —— 三封跟进信

### 邮件 1 —— 面试后致谢(24 小时内发)

**提示词:**

```
写一封 100-130 字面试后致谢。规则:

1. 引用面试官说过的**一件具体事**。不要泛泛的 "thanks for your time"。
2. 简短强化一处契合 —— 选对话里最强的信号。
3. 留下后续问题的门。不要乞求岗位。
4. 收尾专业,不饥渴。
5. 主题行:"Thanks — <我的名> / <职位>"

我会给你:面试官姓名、岗位、他们说过的一件具体事、我想强化的一件事。
```

**范例:**

```
Subject: Thanks — Alex / Senior Backend Engineer

Maya,

Thanks for the conversation today. The bit about how you're thinking
about webhook ordering when retries arrive out of sequence stuck with
me — that's a problem I've spent more time on than is probably
healthy, and it sounds like you're approaching it the same way we
did at Acme.

If it would help the team, I'm happy to walk through the specific
retry-ordering decision tree I wrote up last year — it's the kind of
thing easier to share live than to type out. Either way, glad we
got to talk. Hope the rest of the loop goes smoothly.

— Alex
```

给每个有邮箱的面试官各发一封,按人个性化。如果只换那条具体引用,其他用同样的文字也可以 —— 但具体引用**必须**换。

### 邮件 2 —— 被拒后(收到 no 后 48 小时内发)

这封很关键。多数人不发。发的人,数月后当合适岗位开放时会拿到暖介绍和 "we'd love to keep you in mind"。

**提示词:**

```
写一封 80-100 字、对求职拒绝的优雅回复。规则:

1. 感谢时间和决定。无怨气。
2. 承认结果,不重新翻面试。
3. 留门:请求保持联系、表态未来对合适角色开放。
4. 可选:请求一条反馈。要直接("如果你有五分钟可以给我一条具体
   反馈")—— 模糊的 "any feedback would be appreciated" 得到模糊答案。
```

**范例:**

```
Maya,

Thanks for letting me know, and for the team's time on this loop.
The conversations were genuinely some of the better ones I've had
this search — appreciate the honesty about where you landed.

If a senior backend role in payments opens up later this year, I'd
welcome being on your list. And if you have five minutes for one
specific bit of feedback on what tipped it the other way, I'd find
it useful.

Best,
Alex
```

这种"一条具体反馈"的请法,大约 40% 时候能拿到回应。泛泛的 "any feedback" 大约 5%。

### 邮件 3 —— Ghost 恢复(14 天没回应时)

两阶段。第 7 天轻 ping。第 14 天真跟进。

**第 7 天(轻 ping):**

```
Maya,

Wanted to check in on the senior backend role we spoke about on
[date]. Happy to share anything else that would help.

— Alex
```

就这样。三行。不要加废话。

**第 14 天(真跟进):**

```
Subject: Quick follow-up — Senior Backend / Lumenari

Maya,

Following up on our conversation about the senior backend role on
[date]. I know loops slow down for all kinds of reasons that have
nothing to do with the candidate, so no pressure either way — just
checking whether the role is still open and where I stand.

If timing has shifted on your end, I'd rather know than not. And if
the answer is no, that's fine too; I'd appreciate the closure to
plan my search.

— Alex
```

第 14 天邮件之后一周内没回音,标失,翻篇。**不要**发第三次。信号已经足够清楚。

---

## 跟踪求职进展

简单 tracker 胜过繁琐的。五列:

| 公司 | 角色 | 投递时间 | 阶段 | 上次联系 |
|---|---|---|---|---|
| Lumenari Co | Sr Backend Eng | 2026-05-01 | Onsite 已约 | 2026-05-12 |
| Beta Co | Staff Eng | 2026-05-03 | Recruiter screen | 2026-05-08 |
| Gamma Co | Sr Backend Eng | 2026-04-25 | Ghost(第 14 天已发)| 2026-05-09 |

每次互动后更新。没它,求职第 6 周就成一团雾。

---

## 这本手册不会做的

- 替你背稿。**大声**练答案。AI 能塑形,嘴要记住。
- 告诉你要不要接 offer。那是价值观题。列一份重要事项清单并赋权重。AI 能帮列;下不了那个决定。
- 覆盖薪酬谈判。那是另一本手册,这里用错工具会很贵。当下:永远不当场答应、留 24-48 小时、用一个以市场数据为锚的反提议。
