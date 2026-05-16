# 快速开始 — Supabase Schema & RLS 技能包

不到一分钟即可上手。

## ChatGPT、Claude（网页版）或 Gemini

1. 打开对应工具
2. 将 `optimization-pack.md` 的全部内容粘贴到系统提示词 / 自定义指令 / 项目知识库字段中
3. 开始让它为你的多租户应用设计 schema + RLS 策略

## Claude Code、Cursor 或 Codex（SKILL.md 路径）

1. 打开终端（或你的代码编辑器）
2. 将套件文件夹放入 `~/.claude/skills/supabase-schema-rls/`（Claude Code）；或在 Cursor / Codex 项目根目录中粘贴 `SKILL.md`
3. 直接说出你的需求 —— Claude 会自动加载该技能

## 验证是否生效

粘贴一句话："为我的多租户 SaaS 中的 `invoices` 表设计 schema 和 RLS 策略。成员可读，admin 可写。"

如果返回的迁移文件中包含 `organization_id` 列、对应索引、启用了 RLS，并使用 `is_member_of` / `has_role` 分别给出读和写的策略，说明套件已正确加载。
