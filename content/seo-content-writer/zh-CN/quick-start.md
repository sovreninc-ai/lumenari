# 快速上手 —— 60 秒配置

三段话,每段对应一个平台。挑你用的,粘贴,测试。

---

## Claude(claude.ai 或 API 中的 Claude)

在 Claude 中新建一个 Project。命名为 "SEO Content Strategist"。在该 Project 的 **Instructions** 字段中,粘贴 `optimization-pack.md` 的完整内容。保存。该 Project 下的每一次对话,从此都以资深 SEO 策略师的身份运行 —— 提纲器、文章写手、meta + schema 生成器、更新顾问一应俱全。如果只是一次性使用,把优化包当作新对话的第一条消息粘贴进去。加分项:把你现有的高排名文章放进 Project 的知识库;AI 在建议内部链接时会参考你实际的 URL 结构和语气。

**测试:** 在该 Project 下新建对话,粘贴下方的测试提示词。

---

## ChatGPT(Custom GPT 或一次性对话)

如要做 Custom GPT(Plus 或 Team):前往 "My GPTs" → "Create a GPT" → "Configure"。在 **Instructions** 字段粘贴 `custom-gpt-instructions.md`。命名为 "SEO Content Strategist"。描述写:"提纲、长文、meta、schema 与更新手册 —— 策略师级,不是自由撰稿人级。" 如果你希望它能读取实时 SERP,启用 web browsing(否则你需要手动粘贴 Top 10)。保存并开聊。一次性使用时,把 `optimization-pack.md` 作为任意普通对话的第一条消息粘贴进去。

**测试:** 打开你的新 GPT,粘贴下方的测试提示词。

---

## Gemini、Cursor、Codex(或其他任意 AI)

对于 **Gemini Advanced**,新建一个 Gem。把优化包粘进 Gem 的指令字段,保存,SEO 工作用这个 Gem。Gemini 的实时网页访问在这里很有用 —— 让它在你提问时拉取当前的 SERP。对于 **Cursor**,如果你希望在代码编辑器里写静态站点内容(MDX、Hugo 等)时也能得到 SEO 帮助,把优化包粘进 `.cursorrules`。对于 **Codex / GitHub Copilot Chat / 其他任意 AI**,把优化包作为新对话的第一条消息粘贴进去,每开新线程时重新粘贴一次。

**测试:** 用下方提示词确认配置完成。

---

## 可粘贴测试提示词

```
我经营一个 SaaS 对比博客。月流量中六位数,DA 大约 52。

主关键词:"best CRM for solopreneurs"
预估搜索量:~1,900/月
SERP 前 3 是:
1. Zapier 的博客(商业清单文,4,200 字,评测 12 款工具)
2. HubSpot 的博客(信息型 + 软推广,2,800 字)
3. 一个 Substack 作者的个人评测(1,400 字,亲测 5 款工具 90 天,观点非常鲜明)

我想专门超过 #3 —— 个人评测的角度是空白点。

请给我:
1. 意图分类 + SERP 解读
2. 完整提纲,含 H1、H2、内部链接建议
3. Meta 标题 + Meta 描述
4. Schema 建议
5. 一段关于 E-E-A-T 角度的说明:谁应该署名?我需要注入什么经验?

需要的地方用占位符即可。
```

你应该收到:意图被分类为商业型(并附注 #3 的个人评测角度是差异点)、一份紧凑的提纲(大概 7-9 个 H2,每段开头适配精选摘要)、3-5 条具名的内部链接建议、符合规范的 meta、推荐的 Article + FAQPage schema,以及一段直白的提醒:这只有在**你**真的花了 90 天测试过 CRM 时才成立 —— 否则工具包会建议你请一位真正测过的写手,或者与一位手上有证据的人合作。

如果你拿回来的是一份没有意图分类、没有 SERP 解读的通用清单文提纲,那说明优化包没有被加载。重新粘贴一次。
