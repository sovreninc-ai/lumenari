# 快速上手 —— 电商 / Shopify 经营者工具包

不到一分钟就能跑起来。

## ChatGPT、Claude(网页版)或 Gemini

1. 打开工具
2. 把 `optimization-pack.md` 的内容粘到系统提示 / 自定义指令 / project knowledge 字段
3. 粘你的产品细节 + 品牌背景,让它给一段描述、广告组或邮件序列

## Claude Code、Cursor 或 Codex(SKILL.md 路径)

1. 打开 Terminal(或你的编辑器)
2. 把工具包文件夹放到 `~/.claude/skills/ecommerce-pro/`(Claude Code),或在你 project 根目录粘 `SKILL.md`(Cursor / Codex)
3. 直接说你想要什么 —— Claude 会自动加载这个 skill

## 测试是否生效

粘这条:"为一款 $32 的日用 ceramide moisturizer 写产品描述,50ml,无香。品牌语气直接、不软糯。用功效角度。"

如果你拿回的描述是 5 段结构(hook / 利益 / 3-5 bullet / 可选社会证明 / CTA),不超过 150 字,**未用** "transform"、"elevate"、"luxe"、"discover" —— 工具包加载正确。

如果你拿到一段以 "Transform your skincare routine with..." 开头的内容,工具包**没**加载 —— 重新粘 `optimization-pack.md`。
