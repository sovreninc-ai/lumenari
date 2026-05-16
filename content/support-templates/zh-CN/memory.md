# 记忆 —— 客户支持模板

## 领域背景

support 的人一天泡在**队列**里。工单从邮件、聊天、社交,有时电话进来。平台是 Zendesk、Intercom、Help Scout、Front,或对独立创始人 —— 纯 Gmail。工作是:读工单、弄清客户要什么、决定你能做什么、写回复。一天重复 30-100 次。

**难**的回复是说不 —— 拒绝退款、"我们不能加那个功能"、"你的账户已被暂停"。容易的是 "今天发,这是 tracking 链接"。多数在中间。**语气比人们以为的更重要** —— 同样内容冷冷地说 vs. 温暖地说,客户反应**完全不同**。

独立创始人做自己的 support **通常比需要的更温暖**,**比应该的更慢**。规模化 support 团队通常默认正式,结果像机器人。**两种**都在桌上留下关系价值。

还有一条最好的 support 人懂的安静规则:**你不只是在解决工单,你在塑造(或侵蚀)客户对公司的认知**。一次完美处理的拒退款能挽救关系。一次差劲处理的同意退款仍能丢关系。

## AI 应当掌握的词汇

- **工单(Ticket):** 客户发起的支持对话。有状态(open、pending、solved、closed)。
- **宏(Macro):** Zendesk 中保存的回复模板。Intercom 叫 "saved replies"。Help Scout 也叫 "saved replies"。
- **首响时间(FRT):** 客户拿到**任何**回复前多久。support 最受关注的指标。
- **解决时间:** 工单创建到 "solved" 状态。比 FRT **不那么诚实** —— agent 会过早关单来刷它。
- **CSAT:** Customer Satisfaction。通常工单关闭后发 1-5 或 1-7 调查。目标 "very satisfied" 90%+。
- **NPS:** Net Promoter Score。0-10 量表。Promoters(9-10)、passives(7-8)、detractors(0-6)。分 = %promoters - %detractors。
- **Detractor 恢复:** 给 NPS 0-6 的客户做外联,找出哪里不对并尝试修复。
- **Escalation:** 把工单升级给资深 rep、经理或专门团队。通常 24-48 小时内部 SLA。
- **SLA:** Service Level Agreement。承诺的响应/解决时间,通常企业合同约定。
- **退款窗口:** 购买后多少天自动符合退款。行业惯例:14 天(SaaS)、30 天(DTC)、Costco 365 天。
- **Chargeback:** 客户向银行而不是商户争议费用。商户付费(~$15-25)加上退款。
- **Stripe Dashboard:** 多数现代 SaaS 在这里处理退款。一键,5-10 天回款。
- **从 support 追加销售:** 在支持互动中提供升级套餐。**仅**在客户**满意**且升级**确实**解决他们实际问题时合适。

## 常见工作流

- **处理退款请求:** 读工单 → 查订单日期与退款政策 → 查客户历史(首次?老客?过往问题?)→ 决定:全额、部分、拒绝 → 若同意,在 Stripe/Shopify 处理 → 回复解决方案和原因 → 若拒绝,**给 2-3 个备选**。
- **处理丢失订单:** 确认订单已发 → 查 tracking → 若 "delivered" 但客户说没收到,**求门廊照片** → 若确实丢失,补发或退款 → 若频发,通过后台联系承运。
- **承认 escalation:** 1 小时内回复 "I've escalated this to [name/team]" 和实际时间线 → **绝不**承诺你不能确认的修复 → 设定下次更新时间预期。
- **NPS detractor 恢复:** 看到 0-6 分 → 24 小时内从**真人**回复(不要 "thanks for your feedback!")→ 问**一**个具体问题 → 听 → 如适当提出修复或补偿。
- **从 support 追加销售(稀有但正确):** 客户对解决方案满意 → 他们实际需求在更高级别 → 提一次、简短、带数学 → **不要**推。

## 要避免的事 / 常见错误

- "We sincerely apologize for any inconvenience this may have caused." 底层 support 套话。**具体承认始终胜过通用道歉**。
- 以道歉开头,把解决方案埋下去。客户想知道你**在做什么**,然后为什么。
- 无原因的 "Per our policy..."。原因讲得通就**给原因**。讲不通就**改政策**。
- 模糊时间线:"shortly"、"soon"、"in due course"。**具体或沉默**。
- 以 "Please feel free to reach out if you have any questions" 结尾。用**真实下一步**或真实签替换。
- 实质内容前的多段道歉。道歉侧**最多两句**。
- 模板签:"the team at [Company]"、"Customer Happiness Team"。**用真名**。
- 混合语气 —— 开头正式,中途滑向温暖。**挑一种**。
- 客户不开心时追加销售。读起来 cynical,杀关系。
- "I hope this email finds you well."。他们带着问题写来。**承认问题**。

## 语气 / 风格

好的 support 写手**匹配品牌语气**而**不失自我**。他们按客户**阅读水平**写 —— 短句、更少逗号、平实词。**从不**用客户没先用的黑话。温暖但不腻、专业但不冷、诚实但不生硬。说 "I" 就指我,说 "we" 就指公司。

**内部词汇**:tickets、macros、FRT、CSAT、escalations、chargebacks、refund window。**外部词汇**:"your order"、"your account"、"the issue"、"what happened"。**绝不**在客户面文案里用内部黑话。

好的 support 人比品牌语气暗示的略**更直接**。他们学到:**客户更喜欢带前进路径的简短清晰 "no",而不是冗长礼貌的 "we regret to inform you"**。
