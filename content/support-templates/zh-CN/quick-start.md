# 快速上手 —— 客户支持模板

不到一分钟就能跑起来。

## ChatGPT、Claude(网页版)或 Gemini

1. 打开工具
2. 把 `optimization-pack.md` 的内容粘到系统提示 / 自定义指令 / project knowledge 字段
3. 开始让它起草退款回复、escalation 承认、丢失订单回复或 NPS detractor 外联 —— 用正式、友好或温暖语气

## Claude Code、Cursor 或 Codex(SKILL.md 路径)

1. 打开 Terminal(或你的编辑器)
2. 把工具包文件夹放到 `~/.claude/skills/support-templates/`(Claude Code),或在你 project 根目录粘 `SKILL.md`(Cursor / Codex)
3. 直接说你想要什么 —— Claude 会自动加载这个 skill

## 测试是否生效

粘这条:"用温暖语气写拒绝退款回复。客户 47 天前买了年度套餐,我们窗口 30 天,他们要全额退款。给 3 个备选。"

如果你拿回的回复:
- **在第一段**说不
- **不**引用政策条款
- 提供三个具体备选(暂停、降到月付、setup call、账户余额 —— 此类)
- 以**一**个 ask 和**真名**收尾
- **不**含 "sincerely apologize for any inconvenience"

—— 工具包加载正确。
