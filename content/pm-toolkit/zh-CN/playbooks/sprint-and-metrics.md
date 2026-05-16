# Sprint 规划 + Metrics Review 手册

> 诚实的容量数学、能塞进一行的 sprint 目标,以及能让人**真的**读的 metrics 读数格式。

---

## 第 1 部分 —— Sprint 规划

### 没人诚实做的容量数学

多数团队按名义小时排,然后纳闷为什么 miss。靠谱的数学:

```
名义小时 = 工程师数 × 小时/天 × sprint 天数
减:
  - PTO 与节假日(团队合计)
  - On-call 轮岗(on-call 工程师当周的 10-20%)
  - 固定会议(典型团队每工程师约 6 小时/周)
  - 遗留 / 维护 / 计划外(剩余的 10-15%)

剩下的 = 实际可投新工作容量
```

4 名工程师、每日 8 小时的 2 周 sprint,名义 320 小时。实际更接近 **140-180 小时** 可投新工作。如果你按 320 排,会有一半工作 carry 到下一个 sprint。

### 提示词

```
你和我一起做 sprint 规划。规则:

1. 先做容量数学。我会告诉你团队规模、sprint 长度、已知缺勤。
   你用标准扣减(on-call 15%,会议 ~6h/eng/周,遗留 12%)
   计算名义 → 实际容量。
2. 然后分类上一 sprint 的 carryover。每条:keep、drop、或 split。
3. 然后给新工作排优先级 P0(必须发)、Stretch(时间允许)、
   Won't-do(本 sprint 明确不做)。
4. Sprint 目标用一句话放顶部。让不熟悉团队的人也能读懂。
5. 按 Sprint Goal → Capacity → Carryover → P0 → Stretch → Won't-do 输出。
6. 不要 story-point 形式主义。用小时或粗略尺寸(S/M/L/XL)—— 团队
   已经在用什么就用什么。

语气:直接、具体。计划应 60 秒可扫读。
```

### 输入结构

```
[团队]
工程师:<人数 + 必要时姓名>
设计师:<人数>
PM 时间:<本周占比>

[Sprint]
长度:1 周 / 2 周
开始:<date>
结束:<date>

[已知缺勤]
- <Engineer X>:周二-周三外出
- <Engineer Y>:第一周整周外出(休假)
- 本 sprint on-call:<Engineer Z>

[上一 sprint carryover]
- <Item>:状态(50% 完成 / blocked / 没开始)

[本 sprint 候选工作]
- <Item>:有粗略尺寸就给
- <Item>:...
```

### 范例

**输入:**

```
[团队]
4 名工程师(Alex、Beth、Carmen、Dev)
1 名设计师(Eli)—— 本 sprint 在本团队 50%
PM:我,~30% 容量

[Sprint]
2 周,2026 年 5 月 19 - 5 月 30

[已知缺勤]
- Dev:第 1 周周二-周三外出(3 天)
- Beth:第 2 周整周外出(休假)
- On-call:Carmen 整 sprint

[上一 sprint carryover]
- Saved Searches v1 UI 打磨(~70%,卡在 design review)
- Webhook retry 可观测性仪表盘(~50%,在 retry-failure 工作上线后降优先级)

[本 sprint 候选工作]
- Saved Searches v1 上线(UI 打磨 + beta rollout)
- 团队共享保存后端(RBAC 集成 spike)
- 首次 onboarding v2(edge case 修复 —— 3 个具体 bug)
- "Audit Log" 视图的 mobile-web
- 客户共享保存 UX 探索(仅设计探索)
```

**输出:**

```
**Sprint Goal:** 5/30 前把 Saved Searches v1 发到 beta 群。为下个
sprint 的团队共享保存 kickoff 解锁。

**Capacity**
- 名义:4 工程师 × 8h × 10 天 = 320h
- Beth 第 2 周缺:−40h
- Dev 缺 3 天:−24h
- Carmen on-call(整 sprint 15%):−12h
- 会议(6h/周 × 4 eng × 2 周):−48h
- 遗留/维护(12%):−24h
- **实际新工作容量:~172h**

**Carryover(先决定)**
- Saved Searches v1 UI 打磨(~70%)→ KEEP。design review 已约 5/20。
  本 sprint P0。
- Webhook retry 可观测性仪表盘 → DROP。原 retry-failure 工作已上;
  仪表盘不再高优。挪到 roadmap 的 Later。

**P0(已承诺 —— 约 140h)**
- Saved Searches v1 UI 打磨 + beta rollout(Alex,~40h)
- 团队共享保存 RBAC 集成 spike(Beth 休假前推进,Carmen 接,~50h)
- 首次 onboarding v2 edge case 修复 —— 3 个具体 bug(Dev,~30h)
- Mobile-web Audit Log 视图(Carmen 在 on-call 间隙,~20h)

**Stretch(P0 早完时约 30h 余量)**
- 与 Eli 一起做客户共享保存 UX 探索(设计,~30h)
- 技术债:搜索后端 latency 调查(Alex 如有空)

**本 sprint 不做(明确)**
- 客户共享保存的后端工作(等 RBAC spike 结果)
- Saved Searches API(Phase 2 —— 不在本周期承诺)
- Webhook retry 可观测性仪表盘(已降优先级;见 Carryover)

**风险**
- Beth 第 2 周缺,RBAC spike 完结靠 Carmen,而她同时 on-call。如果 page
  飙升,spike 会滑。缓解:Beth 在第 1 周前置 spike。
- Mobile-web Audit Log 依赖一个共享布局原子,Alex 在 Saved Searches
  打磨时收尾。注意交接。
```

这份计划做了什么:

- Sprint 目标一句话放顶部。
- 容量数学明确且保守。
- Carryover 开头先决定(keep / drop / split)。
- P0 舒适地塞进实际容量,留有 stretch 空间。
- Won't-do 明确,点名那些容易**想**接的项目。
- 风险被点名并带缓解,而不是埋藏。

---

## 第 2 部分 —— Metrics review

### 什么算好

Metrics review **不**是数字墙。它是一份两页文档,说:

> "这是当下最重要的 3-5 个指标。每个的趋势、我们认为是什么在推动、接下来想看什么。你**最该**知道的事:<一件具体事>。"

多数 metrics review 失败,是因为试图覆盖一切。挑出对当前战略问题最重要的指标,把动过的顶起来,忽略噪音。

### 提示词

```
你和我一起做 metrics review。规则:

1. 我会给你 3-7 个指标和数值(当前周期、上一周期、目标如有)。
   你逐个产出读数。

2. 对每个指标,写:
   - 趋势:上 / 下 / 平,带量级(例如 "上 12%")
   - 对照:上一周期、目标,或两者
   - 假设:1-2 句。你认为是什么在推动。信息不够就诚实说。
   - 追踪:你接下来想查什么(数据切片、客户电话、上线相关性等)

3. 按重要性排序。动得最多或对当前战略最关键的放前面。

4. 末尾写一段 "headline" 用 3-4 句总结本周。一个高管读完这段
   就应该带走的东西。

5. 把噪音埋下去。如果指标没有意义性移动且无战略相关,放在底部
   的 "Flat / no signal" 下。

语气:直接、有校准。在诚实时可以打折("可能"、"也许");避免
错误的确定。
```

### 输入结构

```
[周期]
报告周期:<例如 2026 年 5/6 - 5/12 周>
对照:<上一周期日期>

[战略背景]
本季度我们在关注的(例如 "activation +10pp 目标"、"Q2 续约周期"、
"月中 Saved Searches 上线")

[指标]
每个指标:
- 名称
- 当前值
- 上一值
- 目标(可选)
- 你想给的上下文(本周一次上线、已知异常等)
```

### 范例

**输入:**

```
[周期]
2026 年 5/6 - 5/12 周
对照:4/29 - 5/5 周

[战略背景]
Q2 目标 activation +10pp。YTD 在 +6pp,Q2 末前需 +4pp。
Saved Searches v1 排 5/30。

[指标]
- WAU:8,420 → 8,510(+1.1%),无目标
- 激活率:41% → 39%(-2pp),目标 47%
- Webhook retry failure:0.8% → 0.3%(-0.5pp),目标 <1%
- Support ticket 量:142 → 168(+18%),无目标
- 新增付费客户:12 → 14(+2),目标 15/周
- Mobile-web session 占比:18% → 21%(+3pp),无目标
- "丢失视图" 工单:6 → 8(+2),非正式目标 7 月前归零
```

**输出:**

```
**Headline:** 激活率本周掉了 2pp,是七周来首次下滑 —— 新的首次流程
可能过度照顾了上 sprint 修补的 edge case,我们应该在下次实验前钻
funnel。Webhook retry failure 已稳在目标下方。Saved Searches 上线在轨,
但 "丢失视图" 工单略升 —— 提醒一下,上线还有 18 天。

---

**激活率** —— 下 2pp(41% → 39%,目标 47%)
- 对照:上周与 YTD 趋势(自 3/17 周以来首次下滑)。
- 假设:4/30 上线的首次流程改版用速度换了覆盖 —— 我们加了两步
  来处理 edge case。怀疑中位数 time-to-activation 慢得足够拉低
  激活率。需要按步看 funnel。
- 追踪:取本周与上周的新用户 funnel;按步比较 drop-off。周五前决定
  回滚第 4 步还是迭代。

**Support ticket 量** —— 上 18%(142 → 168)
- 对照:上周。无基线目标。
- 假设:增长集中在 "Saved Views" 类目 —— 6 → 8 —— 与 onboarding
  相关工单(怀疑与上面激活下滑同源)。不是质量退化;用量在变。
- 追踪:给本周工单按类目打标。若 onboarding 占增长 >40%,与
  激活下滑同根。

**Webhook retry failure** —— 下 0.5pp(0.8% → 0.3%,目标 <1%)
- 对照:上周与目标。
- 假设:两周前上线的 idempotency + DLQ 工作已完全生效。是持续下降,
  不是一周波动。
- 追踪:标记为已解决;从每周指标里下,后续按月监测。

**新增付费客户** —— 上 2(12 → 14,目标 15/周)
- 对照:上周与周目标。
- 假设:接近目标,没什么尖叫的。
- 追踪:本周无。盯 Q2 累计。

**Mobile-web session 占比** —— 上 3pp(18% → 21%)
- 对照:上周。无正式目标。
- 假设:Top-3 流程 mobile-web 一致性上线在推动持续上升。最近 4 周
  中 3 周增长。
- 追踪:下周拉 device-class 拆分;值得确认是增量使用,而非桌面 session
  的吃单。

**Flat / no signal**
- WAU:+1.1%,在正常周波动内。无动作。
- "丢失视图" 工单:6 → 8。低于周度分析的噪声阈;Saved Searches
  上线后再看。
```

这份读数做了什么:

- Headline 3-4 句给高管,不用滚动就拿到结论。
- 指标按重要性而非字母排序。
- 每个指标有真实假设,不是 "我们继续监测"。
- 追踪是具体动作,不是模糊意愿。
- 已解决的指标(webhook retry failure)从每周列表毕业。
- 噪音埋在 "Flat / no signal" 下,让读数保持易扫读。

---

## sprint 与 metrics 如何配合

Metrics review 应该驱动下一个 sprint 计划。如果激活率本周掉 2pp 且假设指向首次流程,那个 funnel 调查应进下个 sprint 的 P0,而不是 backlog 某处。

工作流:

1. 周五或周一早上跑 metrics review。
2. 找出令你意外(正向或负向)的 1-2 个指标。
3. 把每个意外转成追踪:数据拉取、客户电话或实验。
4. 追踪如对战略目标承重,进 sprint 规划做 P0。

PM 的工作是把循环收紧:metrics → 假设 → 实验 → metrics。不反映上周信号的 sprint 计划,就是团队漂移的方式。
