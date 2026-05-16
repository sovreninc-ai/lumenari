# 样本到语气提取器

把这条提示词粘在新对话顶部(或粘进系统提示槽),然后把你的样本粘在下面。输出是一份完整的语气画像,你可以存为 `voice-profile.md`,在未来每次对话中复用。

---

## 提示词

```
你是一位品牌语气编辑。我将粘 3-5 份写作样本。你的工作是提取一份可
复用的语气画像。

规则:
- 每个观察都必须引用样本里具体一句话。**不要**无引文论断。
- 给四个语气属性轴打 1-5 分。1 或 5 都标为承重。
- 用量化方式测量句子结构(平均长度 词、变化、片段、常见开头)。
- 产出词汇签名(样本反复用的词)和禁用清单(显著缺席而 AI 默认会用的词)。
- 命名框架手法 —— 锚定语气的反复修辞动作。
- 不要原型。不要品牌本质。不要形容词堆叠("bold, witty, confident")。

输出 schema(原样使用):

# Voice Profile — [Name]
_Extracted from N samples on [date]_

## Voice-attribute scores
- 正式/口语:X(load-bearing: y/n)—— [观察]
- 严肃/俏皮:X(load-bearing: y/n)—— [观察]
- 直接/委婉:X(load-bearing: y/n)—— [观察]
- 技术/通俗:X(load-bearing: y/n)—— [观察]

## Sentence structure
- 平均长度:~N 词
- 变化:紧 / 混合 / 宽
- 片段:少 / 偶尔 / 频繁(引一例)
- 常见开头:[列出 2-3 个模式]

## Vocabulary signature
**反复用:** word1, word2, word3, word4
**从不用:** word1, word2, word3, word4

## Framing device
[1-2 句命名反复出现的动作,带引文。]

## Anti-patterns to flag
- [3-5 个具体要在未来草稿中抓的事]

## On-voice example(取自样本)
> [最强的样本句]

## Off-voice example(通用 AI 默认)
> [一句 AI 会自然产出、违反该语气的话]

---

样本在下方。每份打标签,以便我清晰引用。
```

---

## 提示词下方的输入格式

```
Sample 1 — [LinkedIn 帖 / newsletter 开头 / 落地页 / 等]
[粘样本]

Sample 2 — [标签]
[粘样本]

Sample 3 — [标签]
[粘样本]

Sample 4(可选)— [标签]
[粘样本]

Sample 5(可选)— [标签]
[粘样本]

背景:
- 谁读这套语气的输出?[受众]
- 通常用在哪?[邮件、销售页、社交等]

约束:
- [任何不准的 —— 不脏话、不第一人称、绝不点竞品名等]
```

---

## 挑样本 —— 多数人做错的部分

你喂进去的样本是你拿回的语气的天花板。挑得不好,结果就不好。

**好样本:**
- 你写过、原样还能再发的东西
- 客户、读者或团队特别说 "听起来像你最好状态" 的东西
- 落地的一篇 —— 拿到了会、拿到了回复、拿到了转发

**差样本:**
- 你赶时间写的、自己不喜欢的东西
- 因场合所需写的正式件(董事会邮件、法律通知)
- 用了你**不**希望再多的语气的一篇
- 不是你自己写的(除非你明确在匹配别人的语气 —— 在标签里写明)

**样本数量:**
- 3 是底线。少于此,观察就不接地。
- 多数语气 5 个是甜蜜点。
- 超过 7 开始稀释信号 —— AI 在它们之间取平均,丢失棱角。

---

## 范例 —— 好的输出长什么样

**输入样本:**
> Sample 1(newsletter 开头):"我交付了一个东西,然后弄坏了两次。下面是我第二次学到的。"
>
> Sample 2(LinkedIn):"Discovery call hard pass。他们要 12 个月,又说不出 success 是什么。"
>
> Sample 3(落地主标):"你不需要再多一个框架。本周就交付一件事。在这里。"

**输出画像:**

```
# Voice Profile — Solo Builder
_Extracted from 3 samples on 2026-05-14_

## Voice-attribute scores
- 正式/口语:4(load-bearing: no)—— 缩略,无俚语。"Shipped a thing" 不是 "Launched a new product"。
- 严肃/俏皮:2(load-bearing: yes)—— 零笑话。在好笑处干式。"Broke it twice" 是最接近幽默的。
- 直接/委婉:5(load-bearing: yes)—— 每个开头都先给判定。"Hard pass on the discovery call."
- 技术/通俗:2(load-bearing: no)—— 零黑话。"Define success" 而不是 "establish KPIs"。

## Sentence structure
- 平均长度:~9 词
- 变化:紧(区间 5-12)
- 片段:偶尔 —— "Here it is."
- 常见开头:动词先行("Shipped...")、判定先行("Hard pass...")、第二人称命令("You don't need...")

## Vocabulary signature
**反复用:** shipped、hard pass、here's、thing、broke、week
**从不用:** leverage、transform、unlock、framework(讽刺地用)、passion、journey、ecosystem

## Framing device
判定先行。每份样本第一句陈述结论或召唤。正文解释。例:"Hard pass on the discovery call. They wanted 12 months and wouldn't define success."

## Anti-patterns to flag
- 以 "In today's fast-paced..." 开头的任何句子
- 任何 "transform"、"unlock"、"elevate"、"leverage" 的使用
- 超过 18 词的句子(漂移信号)
- 三段式开头("First... Then... Finally...")

## On-voice example(取自样本)
> "You don't need another framework. Ship one thing this week. Here it is."

## Off-voice example(通用 AI 默认)
> "We are excited to introduce our new framework designed to help busy founders streamline their workflows and unlock their full potential."
```

这就是画像。存为 `voice-profile.md`。复用。
