# PRD + Roadmap 模板

> 你 80% 时候会用的 PRD 形态,加上把混乱 backlog 变成已排序 bucket 的 Now/Next/Later roadmap 起草器。

---

## 第 1 部分 —— PRD

### 形态

```
# PRD — <Feature name> (v0.x, <author>, <date>)

## Problem
什么坏了、给谁,大白话。能引用用户就引用。

## Goal
这项工作要达成的**一个**结果。一句话。

## Non-goals
这项工作**不**做的事的明确列表。每条配一句原因
("Phase 2"、"另一条 workstream"、"不会撬动我们在意的指标")。

## Success metrics
怎么知道生效。目标数字。时间窗。

## Acceptance criteria
"完成"长什么样。bullet,可测试。

## Scope
**In:** 我们要建的切片
**Out:** 明确的砍项
**Stretch:** 时间允许时

## Open questions
你尚不知道的事。每条配一个 deadline 或 owner。
```

就这些。没有使命陈述。除非真承重否则不要竞品分析段。团队已经认识用户就不要 "user persona" 填充。

### 提示词

```
你在起草 PRD。规则:

1. 文档长度匹配功能大小。2 天功能就是 1 页 PRD。
   2 个季度的 initiative 是 3-5 页。**不要**给小活写 12 页 PRD。
2. 按形态顺序:Problem → Goal → Non-goals → Success metrics →
   Acceptance criteria → Scope → Open questions。
3. Non-goals 段是必需的,真的在做工作。每条配一句原因。如果一个
   Non-goal 其实是 Phase 2 决策,链到 Open Questions。
4. Success metrics 有数字和时间窗。"Adoption increases" 不是指标。
   "上线 60 天内 25% 的 WAU 创建至少一个 saved search" 才是。
5. Acceptance criteria 是 bullet、可测试,工程师能直接当
   definition of done。
6. Scope 有 In / Out / Stretch。Out 列表提前挡掉 "那 X 呢" 的问题。
7. Open questions 点名决策者或 deadline。"TBD" 不够。
8. 语气:直接、具体、略累。不写 "leverage"、"unlock"、"double down"、
   "transform"。不写 "I hope this finds you well"。

只输出 PRD。除非我问,否则不要旁白。
```

### 输入结构

```
[要做的事]
功能:<name>
目标用户:<who>(具体 —— 角色、客户规模、segment)

[状态 / 背景]
阶段:idea / sketched / building / shipping
信号:research / 工单 / 高层推动 / 指标趋势 / 竞品
PRD 读者:eng / 领导层 / 销售

[原材料]
bullet、Slack thread、会议记录、过往 PRD。无格式没关系。

[约束]
- 文档长度
- 语气
- 已定的决定(不要重审)
- 明确**未**定的决定(标为 open question)
```

---

### 范例 —— "Saved searches" PRD

**输入:**

```
[要做的事]
功能:我们 SaaS 仪表盘里的 Saved Searches
目标用户:Power user —— 客户那边的 ops 与 analytics 角色,通常是 10-50 人
团队每天用仪表盘。

[状态 / 背景]
阶段:sketched。8 周里 6 次客户电话,12 张 support 工单,都提到了。
还没设计。
读者:engineering lead + 2 个 IC engineer + design。

[原材料]
- 客户想保存过滤视图并回来
- 想给它命名
- 想与团队共享(有人,不是所有)
- 想在结果变化时收到通知(有人,不是所有)
- 有些人想要 API;多数走 UI
- 当前 workaround:把带 query param 的 URL 加书签 —— 脆弱、改 URL 结构就坏

[约束]
- 1-2 页
- 语气:粗粝、内部
- 已定:在仪表盘内,不是单独页
- 已定:先做个人保存;团队共享 Phase 2
- Open:结果变化通知 —— Phase 1 还是 2?
```

**输出(节选):**

```
# PRD —— Saved Searches (v0.5, Alex, 2026-05-14)

## Problem
Power user —— 客户那边的 ops 与 analytics 角色 —— 每周多次跑同样的
过滤查询。今天他们把 URL 加书签,我们一改 query-param 结构就坏。
过去 8 周在 6 次客户电话和 12 张工单里听到。

引语(Maya,<客户> 的 ops lead):"我每周一都得重建同一个 filter。
我已经放弃书签了,你们上次发布之后一半都坏了。"

## Goal
减少 power user 的 "我丢了过滤视图" 摩擦。
具体:让用户保存一个命名的过滤视图、回来打开、(Phase 2)分享。

## Non-goals
- 团队共享 saved search → Phase 2。见 Open Questions。
- API 优先的 saved search → Phase 2。多数需求是 UI。
- 跨产品 saved search(仪表盘 + 报表)→ 不在范围;另一条 workstream。
- Saved-search 自身分析(哪个最常用)→ Phase 2。

## Success metrics
- 上线 60 天内,有 25% 的仪表盘周活用户创建至少一个 saved search
- 同 60 天窗口内 "丢失视图" 工单类目下降 50%(基线:2026 Q1 月均 ~24 张)
- 第 30 天每位活跃 power user 中位数 saved search ≥ 2

## Acceptance criteria
- 用户能在仪表盘内以一键 "保存此视图" 保存当前过滤视图
- Saved view 命名(默认 = filter 自动摘要,用户可改)
- Saved view 出现在左栏 "我的 saved view"
- 重新打开能恢复完全的过滤状态,无视 URL 变化
- Saved view 存为 filter JSON,不存 URL 串
- 每用户上限 50 条;超过显示清晰错误

## Scope
**In:** 个人保存;仅 UI;命名;可恢复。每用户 50 上限。
**Out:** 团队共享。API。通知。跨产品。
**Stretch:** 误删的软删除 + 恢复。

## Open questions
1. 结果变化通知 → Phase 1 还是 2?
   建议:Phase 2。增加核心保存/恢复闭环不需要的变更检测层。
   决策者:<PM> 2026-05-21 前。
2. 每用户存储上限 —— 50 感觉合适;没真数据。可根据工程存储反馈调整。
3. 当底层 filter 列被改名或下线时的迁移策略。决策者:<eng lead> + <PM>,
   kickoff 前。
```

这份 PRD 做了什么:

- 在 Problem 段引用一位真实用户。
- Non-goals 段在举重 —— 四项明确砍除,每项有理由。
- Success metric 有数字、基线、时间窗。
- Acceptance criteria 可测试。
- Scope 的 "Out" 段提前挡 "那 X 呢"。
- Open question 有决策者和 deadline。

总长约 700 字,1-2 页 PRD。和工作量匹配。

---

## 第 2 部分 —— Now / Next / Later roadmap

### 提示词

```
你在更新 Now/Next/Later roadmap。规则:

1. 三列:Now、Next、Later。仅此。
2. 每项是**结果**(如 "把 '丢失视图' 工单砍 50%"),不是功能名。
   功能名放括号。
3. 每项有季度和信心(High / Med / Low)。信心要诚实。**不要**
   都打 High。
4. "Now" = 已承诺,在进行。
5. "Next" = 下一周期已承诺。
6. "Later" = 在视野,未承诺。
7. 用户提议把某项从 Later 移到 Now 而没对应砍项时,推回:
   "Now 里什么挪出去?"
8. 输出为 markdown 表格。下方用一段说明本周期变化。

语气:直接、具体。没有季度就不要写 "soon"。无模糊动词。
```

### 输入结构

```
[当前 roadmap]
粘贴现有 Now / Next / Later,或口述。

[变化]
- 新加的 initiative
- 已交付的 initiative
- 在 slip 或被降优先级的 initiative
- 战略背景(客户承诺、竞品动作、容量变化等)

[约束]
- 季度时间范围(通常 1-2 季度)
- 团队容量实际(本周期比上周期有大变化吗?)
- 受众(内部团队、领导层、销售面)
```

### 范例

**输入:**

```
[当前 roadmap]
Now:
- Onboarding 完成率 +10pp(改版首次流程)—— Q2 26, High
- 把 "丢失视图" 工单砍 50%(Saved Searches v1)—— Q2 26, High

Next:
- Top 5 仪表盘流程的 mobile-web 一致性 —— Q3 26, Med
- Power-user 留存 +5pp(团队共享 + API)—— Q3 26, Med

Later:
- 给客户侧管理员的产品内分析 —— Q4 26, Low
- 给客户侧工程师的 API 限流仪表盘 —— Q4 26, Low

[变化]
- Onboarding 工作在轨,但信心下滑到 Med —— 首次流程里发现了比预期更多
  edge case。
- 一个 Top-3 客户在续约里以 "Q3 内交付团队共享" 为条件。我们必须提前。
- 本季度损失一位工程师。容量下降 ~20%。

[约束]
- 2 季度范围
- 受众:领导层 readout
```

**输出:**

```
| 类别 | 结果 | 季度 | 信心 |
|--------|---------|---------|------------|
| Now    | 把 "丢失视图" 工单砍 50%(Saved Searches v1)   | Q2 26 | High |
| Now    | Onboarding 完成率 +10pp(首次流程)         | Q2 26 | Med  |
| Next   | Power-user 留存 +5pp(团队共享 + API)  | Q3 26 | Med  |
| Next   | Top 5 仪表盘流程的 mobile-web 一致性          | Q3 26 | Low  |
| Later  | 给客户侧管理员的产品内分析        | Q4 26 | Low  |
| Later  | 给客户侧工程师的 API 限流仪表盘      | Q4 26 | Low  |

**变化:** Onboarding 信心从 High 降到 Med —— 首次流程的 edge case 比
预期多。团队共享留在 Next(Q3),但现在是 Top-3 客户续约的合同承诺,
所以即便要牺牲 mobile-web 一致性(因失去一位工程师容量下降 ~20%,
现在信心为 Low),也要把它定为 Q3 优先级。除非回填,否则建议把
mobile-web 推到 Q4 再看。
```

这份输出做了什么:

- 对信心诚实。Onboarding 因新 edge case 掉到 Med。
- 把客户续约合同性条款作为优先 Team-shared 的原因点出来。
- 直接点明容量打击及其后果。
- 不假装团队能无代价吸收损失。

---

## 何时跳过 PRD

不是每个功能都需要 PRD。跳过的时机:

- 工作 <2 天,且团队已经理解用户。
- 工作是 bug fix 或小重构。
- 工作已在设计文档里充分讨论过,PRD 只是复述。

跳 PRD 但保留产物的时机:写一份 3 个 bullet 的 "做什么 + 为什么 + 怎么知道生效"。即便小活也受益于一份书面结果陈述。
