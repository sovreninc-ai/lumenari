# 快速上手 —— 60 秒配置

三段话,每段对应一个平台。挑你用的,粘贴,测试。

---

## Claude(claude.ai 或 API 中的 Claude)

新建一个 Project。命名为 "Recruiter Co-Pilot"。在该 Project 的 **Instructions** 字段中,粘贴 `optimization-pack.md` 的完整内容。保存。该 Project 下的每一次对话从此都以招聘模式运行 —— JD 写手、外联起草、面试包构造、布尔字符串生成。一次性使用时,把优化包当作新对话的第一条消息。加分项:把你现有的高效 JD 和回复率最高的外联放进 Project 知识库 —— AI 在起草新内容时会参考你团队的实际语气和品牌。

**测试:** 在该 Project 下新建对话,粘贴下方测试提示词。

---

## ChatGPT(Custom GPT 或一次性对话)

如要做 Custom GPT(Plus 或 Team):前往 "My GPTs" → "Create a GPT" → "Configure"。在 **Instructions** 字段粘贴 `custom-gpt-instructions.md`。命名为 "Recruiter Co-Pilot"。描述写:"没有官腔的 JD、能被回复的外联、面试包、布尔字符串。" 保存。一次性使用时,把 `optimization-pack.md` 作为任意普通对话的第一条消息粘贴进去。

**测试:** 打开你的新 GPT,粘贴下方测试提示词。

---

## Gemini、Cursor、Codex(或其他任意 AI)

对于 **Gemini Advanced**,新建一个 Gem。把优化包粘进 Gem 的指令字段,保存,招聘工作用这个 Gem。对于 **Cursor**,这个工具包关联较弱(Cursor 主要给代码),但如果你在 careers 页 repo 里用 MDX 写 JD,可以把优化包粘进 `.cursorrules`。对于 **Codex / GitHub Copilot Chat / 任何其他 AI**,把优化包作为新对话的第一条消息粘贴进去,新开线程时再粘贴一次。

**测试:** 用下方提示词确认配置完成。

---

## 可粘贴测试提示词

```
我在一家 30 人 Series B SaaS 招 Senior Full-Stack Engineer。Remote-first,美国 + 加拿大。技术栈:TypeScript、React、Node、Postgres on AWS。薪酬区间:USD $170-210K base + 0.05-0.15% equity。Hiring manager 写了一份 JD,我觉得很差。下面是他发的:

"We're looking for a passionate rock star full-stack engineer to join our fast-paced, dynamic team. You'll be a 10x developer who thrives in ambiguity and isn't afraid to wear many hats. Must have a Bachelor's degree in Computer Science and 10+ years of experience. We work hard and play hard, and we're like a family here. Competitive salary and benefits."

我需要:
1. 对他发的内容做偏见 lint(具体标出短语并说明原因)
2. 用工具包格式重写一份完整 JD
3. 给资深工程师冷 DM 的外联模板(开头不超过 3 行)
4. 一条 LinkedIn Recruiter 布尔字符串,定位会 TypeScript + React + Node、在创业公司交付过的资深工程师
```

你应该收到:一份 lint,标出 "passionate"、"rock star"、"fast-paced"、"10x developer"、"wear many hats"、"Bachelor's degree required"、"10+ years"、"work hard play hard" 和 "like a family",并对每条给出具体修复;然后一份约 500 字的干净 JD,带薪酬区间、真正的"你会做什么"成果导向、真实的面试流程,以及一个 working arrangement 段;再来一段三行外联,给出一个看起来真实的理由;最后一条布尔字符串,逐句解释,加上 2 个变体(以防第一条返回结果过少或过多)。

如果你拿回来的 JD 里还有 "rock star",或外联里没有提到薪酬区间,那说明优化包没被加载。重新粘贴一次。
