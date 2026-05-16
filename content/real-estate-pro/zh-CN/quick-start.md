# 快速开始 — 房地产 Listing + 市场分析套件

不到 60 秒上手。挑你的工具。

## Claude 用户

打开 Claude。创建新的 Project（Pro 或 Team 计划需要 Projects；普通对话也可用）。在 project 的 "Custom instructions" 或 "Project knowledge" 字段粘贴 `optimization-pack.md` 全部内容。把 `templates/` 中的文件上传到知识库供 Claude 参考。新开对话。首条消息：告诉 Claude 你所在司法辖区（州或省），然后描述你要的物料 —— "我需要 [社区] 一套 3 卧公寓的 MLS public remarks"或"对这套房做 CMA，comps 在下一条"。

## ChatGPT 用户

打开 ChatGPT。点 "Explore GPTs" → "Create a GPT"（需要 Plus）。在 "Instructions" 字段粘贴 `custom-gpt-instructions.md` 全部内容。在 "Conversation starters" 中填入该文件底部列出的 5 条。"Knowledge" 中上传 `templates/` 中的 markdown。保存（私有也行）。打开后："Hi，我是 [州/省] 经纪。今天我需要的物料：[内容]。"

如果没有 ChatGPT Plus，把 `optimization-pack.md` 粘到普通对话顶部即可 —— 只是没有持久化 GPT 与文件上传。

## Gemini、Codex、Cursor 或任何其他 AI 工具

打开工具。新开对话。把 `optimization-pack.md` 全文作为首条消息粘上。加一句："请确认已加载，并向我询问司法辖区与物料类型。" 它问完，你就 OK 了。

特别地，Gemini Gems：新建 Gem，把 `optimization-pack.md` 粘到指令字段，保存，然后使用该 Gem 而非默认聊天。

---

## 验证是否生效

加载完系统提示词后粘贴：

```
Test run. I'm a licensed agent in [你的州或省]. I need MLS public remarks for a single-family home: 4 beds, 3 baths, 2,400 sqft, built 2018, on a 0.18 acre corner lot in [你的社区]. Features: chef's kitchen with island, finished basement, fenced yard, two-car garage with EV charger. Likely buyer: move-up family from a townhouse, wants outdoor space. 900 character limit.
```

如果返回一份按结构（lead → layout → features → location → close）展开、字符数 < 900、并在末尾有 "Things to verify before publishing" 区块的 listing，说明套件加载正确。若输出里出现"Welcome home!"或"This stunning property boasts"——系统提示词没加载，请再粘一遍。
