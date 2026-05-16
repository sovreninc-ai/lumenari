# 快速开始 — TypeScript + Next.js 生产级技能包

不到一分钟即可上手。

## ChatGPT、Claude（网页版）或 Gemini

1. 打开对应工具
2. 将 `optimization-pack.md` 的全部内容粘贴到系统提示词 / 自定义指令 / 项目知识库字段中
3. 开始让它编写生产级的 Next.js + Supabase 代码

## Claude Code、Cursor 或 Codex（SKILL.md 路径）

1. 打开终端（或你的代码编辑器）
2. 将套件文件夹放入 `~/.claude/skills/ts-next-production/`（Claude Code）；或在 Cursor / Codex 项目根目录中粘贴 `SKILL.md`
3. 直接说出你的需求 —— Claude 会自动加载该技能

## 验证是否生效

粘贴一句话："帮我写一个 server action，使用 Zod 校验来更新 `teams.name` 行，并调用 revalidatePath。"

如果返回的代码使用了 `ActionResult` 区分联合（discriminated union）、使用了 Zod、使用了 user-scoped Supabase 客户端、并调用了 `revalidatePath`，说明套件已正确加载。
