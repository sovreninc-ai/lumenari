# 快速上手 —— 品牌语气构建器

不到一分钟就能跑起来。

## ChatGPT、Claude(网页版)或 Gemini

1. 打开工具
2. 把 `optimization-pack.md` 的内容粘到系统提示 / 自定义指令 / project knowledge 字段
3. 粘 3-5 份写作样本,让它提取语气画像

## Claude Code、Cursor 或 Codex(SKILL.md 路径)

1. 打开 Terminal(或你的编辑器)
2. 把工具包文件夹放到 `~/.claude/skills/brand-voice/`(Claude Code),或在你 project 根目录粘 `SKILL.md`(Cursor / Codex)
3. 直接说你想要什么 —— Claude 会自动加载这个 skill

## 测试是否生效

粘这条:"从这三份样本里提取语气画像:(1) 'Hard pass on the demo. They wouldn't define success.' (2) 'Three weeks of silence. Sorry. Back now.' (3) 'You don't need a framework. Ship the thing.'"

如果你拿回一份画像,带四个语气属性分(1-5)、词汇签名、禁用清单、命名的框架手法 —— 且每条都引用了样本 —— 工具包加载正确。
