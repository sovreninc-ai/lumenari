# 快速上手 —— Newsletter Writer

不到一分钟就能跑起来。挑你的 AI。

## ChatGPT、Claude(网页版)或 Gemini

1. 打开工具
2. 把 `optimization-pack.md` 的内容粘到系统提示 / 自定义指令 / project knowledge 字段
3. 开始让它给一期做提纲、生成 subject-line 变体,或重写前两行

## Claude Code、Cursor 或 Codex(SKILL.md 路径)

1. 打开 Terminal(或你的编辑器)
2. 把工具包文件夹放到 `~/.claude/skills/newsletter-writer/`(Claude Code),或在你 project 根目录粘 `SKILL.md`(Cursor / Codex)
3. 直接说你想要什么 —— Claude 会自动加载这个 skill

## 测试是否生效

粘这条:"给我一期 'how to find your first 100 readers' 的 5 个 subject-line 变体。我的 list 1,400,健康开率 48%。"

如果你拿回 5 个变体,每个按模式打标(数字 / 反主流 / 好奇 / 身份 / 紧迫),每个带预期开率判定和风险 —— 且变体里**没出现** "you won't believe" —— 工具包加载正确。
