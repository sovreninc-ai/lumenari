# 利益相关者更新模板

> 三种口味、同一骨架:exec brief、engineering detail、customer-facing。同一周的工作,为三个受众压缩。

---

## 骨架(三种口味共享)

1. **Status** —— 一个词(Green / Yellow / Red)加一句话
2. **What shipped** —— 结果,不是功能
3. **What's next** —— 下一周期已承诺项
4. **At risk** —— 对可能 slip 的事诚实
5. **The ask** —— 你需要这个受众的**一个**具体事

口味间的差别:

- **长度:** 200 / 400 / 150 字
- **词汇:** exec 和 eng 可以有内部黑话;customer-facing 绝不能
- **blocker 深度:** exec 拿头条;eng 拿细节;customer-facing 通常省略
- **ask:** exec 要决策/headcount/intro;eng 要优先级或解锁;customer 要反馈或 beta 参与

---

## 口味 1 —— Exec brief(~200 字)

### 提示词

```
你在写高管利益相关者更新。规则:

1. ~200 字。硬上限:250。
2. 以单词状态开头:Green / Yellow / Red。再一句话说明原因。
3. "What shipped" 是结果,不是功能。"30 天内把 '丢失视图' 工单砍 47%"
   而不是 "Shipped Saved Searches v1"。
4. "At risk" 诚实。可能 slip 的事就说,并说原因。
5. 以一个具体 ask 结尾。"X 之前需要 Y 决策"。不要 "let me know
   if you have questions"。
6. 不写 "I hope this email finds you well"。不写 "circling back"。
7. 语气:直接、冷静、具体。有数字就用。

只输出更新。
```

### 范例

```
**Status: Yellow** —— Saved Searches 按 5/30 上线;onboarding 因发现
edge case 而滑约 2 周。

**本期交付**
- 把 webhook retry failure 砍掉 78%(关闭了一个长期 P1 事件类目)
- Top-3 仪表盘流程 mobile-web 一致
- 新 first-touch tooltip 实验带来 activation +3pp

**下两周**
- Saved Searches v1 → 5/30 上线,先与 4 位客户 beta
- Onboarding 修订 v2 → 已调整以反映新 edge case
- 团队共享保存 → 5/28 kickoff(在 <Customer X> 续约中已承诺)

**At risk**
- Onboarding 完成率目标(+10pp)—— 因首次流程 edge case 从 Q2 推到
  Q3 早期。缓解:v2 先发影响最大的几个 edge,其余 Q3。
- 剩余 2 个流程的 mobile-web 一致性会滑到 Q4,除非回填刚失去的
  工程师 seat。

**Ask**
本周五前需要决策:回填工程师 seat 还是接受 mobile-web 滑到 Q4。
两条路都可行;我宁愿不把这种不确定带进下周的团队规划。
```

注意发生了什么:

- 状态是 Yellow,不是 Green。PM 在诚实。
- "What shipped" 三行,每行一个带数字的结果。
- "At risk" 是真实风险加缓解,不是套话。
- ask 具体 —— 一个决策、一个日期、把选项摆出来。

约 200 字。一个高管 45 秒能扫完。

---

## 口味 2 —— Engineering detail(~400 字)

### 提示词

```
你在写工程团队利益相关者更新。规则:

1. ~400 字。硬上限:500。
2. 同 exec brief 骨架,但加入:
   - Blocker(技术或组织),并提建议路径
   - 对其他团队的依赖
   - 团队请决策的事,含选项 + 建议
3. 技术词汇可以用。不要为工程而降智。
4. 同样 "以状态开头" 的纪律。Yellow 就是 Yellow。
5. 以 ask 结尾。与工程相关:优先级判断、解锁、权衡决策。

只输出更新。
```

### 范例

```
**Status: Yellow** —— Saved Searches 按 5/30 上线;onboarding 滑约 2 周;
一个跨团队依赖有风险。

**本期交付(结果 + 怎么做的)**
- Webhook retry failure 砍 78%:引入 idempotency keys + dead-letter
  queue。Stripe support 确认该模式与他们推荐一致。P1 page 量 12/月 → 3/月。
- Top-3 流程 mobile-web 一致:把仪表盘布局原子重构为 CSS Grid;
  顺带解决长期的 tablet breakpoint bug。
- Activation +3pp:first-touch tooltip A/B test 在 95% 置信度收尾。
  Variant B(上下文式而非问候式)胜出。

**进行中**
- Saved Searches v1 —— 后端完成;UI 80%。Filter-JSON 存储模式已
  对最常用的 12 种查询形态验证。Beta 群已选:4 位客户,皆 power user,
  opt-in。
- Onboarding v2 修订 —— 已调整范围,先发最高影响的 edge。三个 edge
  留给 Q3。

**Blocker 与依赖**
- 团队共享保存的 kickoff 取决于 Permissions 团队上线新 RBAC 原子
  (ETA:5/25)。每周跟踪。Fallback:用更简单的全员或不开的分享模式
  先上线团队共享,等 RBAC 上线再重构到细粒度。
- 搜索后端 p95 延迟在 Q1 内攀升 18% —— 还未影响用户,但在走高。
  建议投一工程师周调查,以免成为 Q3 救火。

**决策需求**
1. Q2 内回填工程师 seat,还是接受 mobile-web 滑到 Q4?建议:回填。
   Mobile-web 在 H2 的 4 个 Top 续约客户里有 2 个明确提了。
2. 若 RBAC 滑,团队共享保存先用 fallback 全员或不开的分享模式吗?
   建议:是。客户承诺是 Q3,RBAC 落地后重构成本 ~3 天。

**Ask**
周五前要上面两个决策。两个都会塑造下个 sprint 计划。
```

与 exec brief 的不同:

- 包含**怎么做**,不只是结果。
- 暴露还没影响用户的 latency 趋势 —— 是工程信号,不是高管信号。
- 用选项 + 建议来界定决策,而不是开放问题。
- ask 点名具体决策和日期。

---

## 口味 3 —— Customer-facing(~150 字)

### 提示词

```
你在写面向客户的更新。规则:

1. ~150 字。硬上限:200。
2. 大白话。不要内部黑话。不要客户不在意的指标。
3. 以客户**现在能用**的内容开头(已上线的东西)。
4. "Coming next" 精度最多到月。不要承诺精确日期。
5. 一条反馈渠道。易用。
6. 不要状态色。不要 "at risk" 措辞。客户在意的事要么正向表达,要么省略。
7. 语气:温暖但不夸张。自信但不推销。

只输出更新。
```

### 范例

```
大家好,

简单更新一下本月仪表盘的变化和接下来的内容。

**你现在能用的**
- 仪表盘的 "保存此视图" 按钮已对 power user 上线。保存你的过滤
  视图、命名,它们会精确恢复 —— 即便底层 URL 结构变。每用户上限 50。
- 你最常用的三类流程已在 mobile-web 可用:dashboard、alert、audit log。
  剩余两类今年秋季到达。

**接下来**
- 团队共享 saved view —— 与团队分享过滤视图。瞄准 7 月。
- 你 onboarding 新同事时的首次体验改进。6 月底。

**一个小请求**
如果你试了 Saved Views 觉得少了什么或哪里怪,直接回复这封邮件。
我每封都亲自看,它会塑造我们接下来要建的内容。

— Alex
```

不同点:

- 没有状态色,没有 "at risk" 措辞。
- "Up to 50 per user" 暴露真实上限,但用客户语言。
- "Coming next" 用月,不用季度或精确日期。
- ask 直接易行(回复这封邮件)。

---

## 三个版本如何走一个工作流

多数周里,你**先**写 engineering-detail 更新,因为原材料在那 —— 你的 sprint 规划、blocker、团队决策。然后压缩。

工作流:

1. 写 engineering-detail 更新(~400 字)。
2. 让 AI 跑一遍:"压缩到 200 字给 exec brief。保留一个具体 ask。去掉技术词汇。"
3. 再让 AI 跑一遍:"用 150 字面向客户改写。大白话。去掉内部 blocker。围绕他们现在能用的东西。"

总时间:三个版本 30 分钟。压缩过程能抓出过度声称 —— 如果 exec 版无法不打折扣地说 "shipped X",那 engineering 版大概率也说过头了。

---

## 提示词会拦截的反模式

- "I hope this email finds you well." —— 砍。
- "Just wanted to circle back on..." —— 砍。
- "Per my last email..." —— 砍。
- "We continue to make progress on..." —— 模糊。用一个结果和一个数字替换。
- "Things are going well!" —— 状态是颜色,不是感觉。挑一个。
- "Let me know if you have any questions." —— 不是 ask。把真正的 ask 说出来。
- "Excited to share..." —— 高管不需要知道你对它的感觉。直接进实质。

任一漏过来,追问:"剥掉每个废话短语,围绕状态、结果和 ask 重写。"
