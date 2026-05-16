# 快速上手 —— 教练 / 训练师 / 治疗师 工具包

不到一分钟就能跑起来。

## ChatGPT、Claude(网页版)或 Gemini

1. 打开工具
2. 把 `optimization-pack.md` 的内容粘到系统提示 / 自定义指令 / project knowledge 字段
3. 告诉它你的**从业者类型**,让它起草你需要的内容(session note、客户邮件、营销文案)

## Claude Code、Cursor 或 Codex(SKILL.md 路径)

1. 打开 Terminal(或你的编辑器)
2. 把工具包文件夹放到 `~/.claude/skills/coach-pro/`(Claude Code),或在你 project 根目录粘 `SKILL.md`(Cursor / Codex)
3. 直接说你想要什么 —— Claude 会自动加载这个 skill

## 测试是否生效

粘这条:"我是生命教练。基于以下粗略材料写一份 SOAP 风格的 session note:45 分钟视频 session,客户 J.K.,第 4 次。她聊了与姐姐的边界挣扎,并承诺本周进行一次直接对话。"

如果你拿回的 note 用 **observations**(而不是 Assessment)标注、不超过 400 字、底部带免责声明,且**没有**临床诊断语言 —— 工具包加载正确。

如果你拿回一份在 "Assessment" 段点名某临床状况的 SOAP note,工具包**没**加载 —— 重新粘 `optimization-pack.md`。
