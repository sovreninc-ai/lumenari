# 语气应用

有了已保存语气画像后用这个。粘画像 + 要改写的草稿。AI 产出按语气的改写并跑自检。

---

## 提示词

```
你在把一份已保存的品牌语气画像应用到一份草稿。规则:

1. 开始前**完整**读画像。承重轴(1 和 5)权重最高。
2. 用词汇签名当指南。用禁用清单当硬过滤 —— 手伸向禁用词就替换。
3. 匹配平均句长。**不要**产出平均长度 2 倍的句子。
4. 在开头使用框架手法。第一句是语气最可见的位置。
5. 改写后跑自检:对每段或每大块标 on-voice / drift / off-voice。
   引出你不确定的任何具体行。

输出格式:

## Rewrite
[按语气的版本]

## Self-check
- 第 1 段:on-voice / drift / off-voice —— [原因]
- 第 2 段:on-voice / drift / off-voice —— [原因]
- ...
- 我不确定的行:
  - "[引文]" —— [标记原因]

画像和草稿在下方。
```

---

## 提示词下方的输入

```
[语气画像]
[在此粘完整已保存画像]

[草稿]
[粘要改写的通用、粗糙或竞品口吻文案]

[目标]
这是干什么用的?读者读完该采取什么动作?

[约束(可选)]
- 长度上限
- 格式(邮件、落地主标、广告文案、推文 thread 等)
- 改写中必须保留的具体事实
```

---

## 范例

**画像(节选):**
```
Voice: Solo Builder
承重:严肃/俏皮 2(干式)、直接/委婉 5(判定先行)
平均句:9 词
反复用:shipped、hard pass、here's、thing
从不用:leverage、transform、unlock、journey、passion、ecosystem
框架:判定先行开头;正文解释
```

**草稿(通用 AI 输出):**
> "We are thrilled to announce the launch of our new productivity platform designed to help busy founders streamline their daily operations through cutting-edge AI technology, allowing them to focus on what truly matters: building their dream business and transforming their lives."

**目标:** 邮件,向我的 newsletter 宣布上线。想要点击到产品页。

**Rewrite:**
> Shipped the productivity tool. It runs the five admin tasks you waste a day on. Takes about a minute to set up. Link below.

**Self-check:**
- 第 1 句:on-voice —— 判定先行开头,4 词,用了词汇签名里的 "shipped"。
- 第 2 句:on-voice —— 11 词,第二人称,无黑话。
- 第 3 句:on-voice —— 7 词片段节奏。
- 第 4 句:on-voice —— 极简,以 CTA 收尾不推销。
- 我不确定的行:无。

---

## 每条规则的意义

**完整读画像。** AI 工具默认把任何提示词的前几行权重最重。如果画像是第 4 段、草稿是第 5 段,草稿会赢。用显式指令强制完整读能修复这一点。

**承重轴权重最高。** 严肃/俏皮 2 且承重 = 笑话是硬性 no。口语 4 但**不**承重 = 缩略可以但俚语不是承重。AI 必须知道哪些特征不可妥协。

**禁用清单作为硬过滤。** 没有硬过滤,AI 改写会通过近义词把禁用词偷渡回来。"Leverage" 被换成 "harness"。"Unlock" 变成 "tap into"。规则是:如果意义匹配禁用词,就找到不用那种语义形状的说法。

**匹配句长。** 这是最容易强制执行的节奏标记,也是 AI 最常做错的。一个 9 词平均的语气突然产出 28 词句,读起来像换了人。

**开头使用框架手法。** 第一句是语气最具诊断性的位置。如果你的语气判定先行,改写却以 "In a world where..." 开头,后面再好也没用。

**带标记的自检。** 诚实标记比错误的自信有用。说"第 3 段在漂"的改写,你能去修。声称一切都过、但第 3 段明显 off 的改写,逼你自己重读去抓。
