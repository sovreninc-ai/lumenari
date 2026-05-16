# 快速开始 — 销售陌拓 + 跟进

60 秒上手。挑你的工具。

## Claude 用户

打开 Claude。新建 Project。在 "Custom instructions" 或 "Project knowledge" 中粘贴 `optimization-pack.md` 全部内容。把 `frameworks/`、`templates/`、`playbooks/` 中的文件上传到知识库。在项目里新开对话。首条消息：一句话告诉 Claude 你的 ICP、要什么物料、prospect 特定信号。例如："ICP：Series A SaaS、50-200 员工的 VP Engineering。冷邮件。信号：他们 3 周前完成 B 轮，[VC] 领投。Value：我们通过降低 flaky test 重跑削减 CI/CD 开销。"

## ChatGPT 用户

打开 ChatGPT。点 "Explore GPTs" → "Create a GPT"（需 Plus）。在 "Instructions" 粘贴 `custom-gpt-instructions.md` 全部内容。在 "Conversation starters" 用该文件底部的 5 条。"Knowledge" 上传 `frameworks/`、`templates/`、`playbooks/` 中的 markdown。保存为私有 GPT。打开后：ICP + 物料 + 信号，同上 Claude 示例。

没 Plus？把 `optimization-pack.md` 粘普通对话顶部即可。

## Gemini、Codex、Cursor 或其他 AI 工具

新开对话。把 `optimization-pack.md` 全文作为首条消息粘上。加一句："请确认已加载，向我询问 ICP、物料、信号。"它问完，你就好了。

Gemini Gems：新建 Gem，把 `optimization-pack.md` 粘到指令字段，保存，使用该 Gem 而非默认聊天。

---

## 验证是否生效

加载完粘贴：

```
Test run.

ICP: VPs of Engineering at Series A SaaS companies, 50-200 employees, US-based, building React frontends.
Prospect: Sarah Chen, VP Engineering at Beacon Labs. 信号：她 4 天前在 LinkedIn 发文说团队扩到两倍后 CI/CD pipeline 成了瓶颈。
Value：我们把 flaky-test 重跑降低 60%，从而削减 CI 分钟与随之而来的 on-call 警报。
Proof：Linear 和 Vercel 是客户。
CTA：下周二或周三 15 分钟。
约束：< 75 词；主题行 < 40 字符。

写这封冷邮件。
```

如果返回的邮件：
- 引用 Sarah 那条具体 LinkedIn 关于 CI/CD 痛点的发文
- 用大白话讲价值，没有"transform"或"revolutionize"
- 一个具体 ask + 提议时间
- < 75 词
- 末尾附 "发送前你可能要改的两件事" 区块

…说明套件加载正确。若邮件以 "Hope this finds you well" 或 "I wanted to reach out" 开头 —— 系统提示词没加载，重粘一次。
