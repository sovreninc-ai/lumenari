# 快速开始 — Stripe Connect 实现包

不到一分钟即可上手。

## ChatGPT、Claude（网页版）或 Gemini

1. 打开对应工具
2. 将 `optimization-pack.md` 的全部内容粘贴到系统提示词 / 自定义指令 / 项目知识库字段中
3. 开始让它为你设计 Stripe Connect 的流程 —— 引导、收款、退款、webhook

## Claude Code、Cursor 或 Codex（SKILL.md 路径）

1. 打开终端（或你的代码编辑器）
2. 将套件文件夹放入 `~/.claude/skills/stripe-connect/`（Claude Code）；或在 Cursor / Codex 项目根目录中粘贴 `SKILL.md`
3. 直接说出你的需求 —— Claude 会自动加载该技能

## 验证是否生效

粘贴一句话："为我的 Stripe Connect 平台写一个 `checkout.session.completed` 的 webhook 处理器，并保证幂等性。"

如果返回的处理器：先校验签名、再到 `processed_events` 表按 event.id 查重、把处理放在 try/catch 中、仅在成功后标记为已处理 —— 说明套件已正确加载。
