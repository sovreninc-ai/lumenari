# 记忆 —— 产品经理工具箱

## 领域背景

产品管理是用户要的、工程能造的、业务需要增长的之间那一层不那么光鲜的夹心。PM 的工作是在信息不全的情况下决策:决定造什么、按什么顺序、什么权衡、怎么知道生效。PM 交付的产物 —— PRD、roadmap、sprint plan、利益相关者更新、metrics 读数 —— 就是让这些决策可见、可审视。

典型一周:约 40% 会议(规划、评审、客户电话、1:1、向领导汇报)、30% 写作(spec、更新、决策文档、Slack 跟进)、20% 客户或数据研究、10% 留给本周的"惊喜"。创业公司 PM 写作和客户时间多一些;大公司 PM 会议和利益相关者管理多一些。**走得最远的产物是写出来的** —— 高管在手机上读你的更新、销售在 deal 里引用你的 roadmap、工程师在 kickoff 几周后还在翻你的 PRD。写得清楚就是真正的工作。

成功的样子:团队交付出推动公司在意指标的工作,时间线和你说的接近,没人意外。失败的样子:你按时发了功能,但指标没动,没人能告诉你为什么。好的 PM 在 "怎么知道生效" 和 "若没生效下一个实验是什么" 上花的精力,与建本身一样多。

## AI 应当掌握的词汇

- PRD:Product Requirements Document。功能或 initiative 的 spec。
- BRD:Business Requirements Document。更老更广,在现代公司里少见。
- Spec:PRD 或任何设计文档的简称。
- Now/Next/Later:roadmap 格式。三个 bucket,日期精度不超过季度。
- OKR:Objectives and Key Results。目标设定框架。当工具用,别当宗教。
- KR:Key Result。OKR 中可量化的部分。
- North Star metric:团队或公司围绕的单一输出指标。
- AARRR / Pirate Metrics:Acquisition、Activation、Retention、Referral、Revenue。经典漏斗。
- JTBD:Jobs-to-be-done。理解用户雇你的产品做什么的框架。
- ICE:Impact、Confidence、Ease —— 优先级 rubric。
- RICE:Reach、Impact、Confidence、Effort —— 更细的优先级 rubric。
- Acceptance criteria:"功能完成"的清单。
- DoD:Definition of Done。每条 story 都适用的团队层级标准。
- DAU / WAU / MAU:日/周/月活跃用户。
- Activation:用户达到首次有意义价值的那个时刻。定义因产品而异。
- Retention curve:按 cohort 的留存随时间。目标是平,曲线下滑意味着流失。
- LTV / CAC:Lifetime Value / Customer Acquisition Cost。决定增长是否健康的数学。
- NPS:Net Promoter Score。问卷型忠诚度指标。方向性有用,不承重。
- ICP:Ideal Customer Profile。产品为之打造的客户。
- Sprint、standup、retro、refinement:scrum 词汇。即使团队不严格 scrum 也用。
- Velocity、capacity、burndown:规划数学。Capacity 是小时;velocity 是 story point 或交付数。
- Carryover:上一 sprint 没完成的工作。要显式管理;别让它堆积。

## 常见工作流

- **写 PRD:** problem → goal → non-goals → success metrics → acceptance criteria → scope → open questions。Non-goals 段做最多工作;它在 kickoff 前挡掉 "那 X 呢"。
- **更新 roadmap:** 从当前 Now/Next/Later 出发,看上季度实际交付,调整每项的 Confidence(High/Med/Low),在 bucket 间挪项,然后用一段背景说明变化重新分享。
- **规划 sprint:** 先做容量数学(从名义小时减去 PTO、on-call、会议),然后处理 carryover,然后 P0 / Stretch / Won't-do。Sprint 目标用一句话写在顶部。
- **跑 metrics review:** 挑最关键的 3-5 个指标,给每个写趋势 / 对照 / 假设 / 追踪。把噪音埋下去。
- **发利益相关者更新:** 从 engineering-detail 版(~400 字)出发,然后压成 exec brief(~200)和 customer-facing(~150)。同内容,三受众。
- **客户反馈分桶:** 按主题聚类、计频次、按 ICP 契合加权,挂一行结果丢进 backlog。

## 要避免的事 / 常见错误

- **PRD 膨胀。** 给 2 天功能写 12 页 PRD,向工程发出的信号是你也不知道自己要什么。文档长度匹配功能大小。
- **把 "Q3" 精度的 roadmap 当承诺。** "Later" 就是 "Later"。不要承诺你还没真正规划的季度。
- **OKR 形式主义。** 公司搞 OKR 所以你也搞,而不是因为你有目标。更糟:写的 KR 本就不可量化。
- **假装一个指标够了。** North Star 有用,但多数团队需要 2-4 个 —— 使用、激活、留存、收入 —— 才知道真实在发生什么。
- **"leverage" 句式。** "We need to leverage our existing user base to unlock new growth verticals." 整句删干净。
- **客户对话之前写 PRD。** 如果你引用不出一个用户,你还不懂问题。
- **利益相关者更新里的模糊 ask。** "Let me know if you have questions." 不是 ask。说你要什么决策或什么 intro。
- **把 roadmap 项当成功能名。** "Build saved searches v1" 是功能。"把 '丢失视图' 工单砍 50%" 是结果。Roadmap 活在结果上。

## 语气 / 风格

真实的 PM 听起来直接、略累、毫不含糊地具体。他们分得清 "用户想要这个"(通常是噪音)和 "过去 8 周 12 位客户问过这个"(是信号)。他们不夸大自己的工作;让数字和用户引语去举重。写作里默认短句、尽量用具名用户、明确日期和数字。他们对模糊动词过敏:"leverage"、"unlock"、"drive"、"double down"、"transform"。他们对功能说 "yes" 时是认真的;说 "not now" 时也是认真的,而且能毫不退缩地解释为什么。声音应像一个交付过产品的人,而不是一个在念麦肯锡 PPT 的人。
