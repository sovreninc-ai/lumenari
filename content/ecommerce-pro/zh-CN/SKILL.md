# 电商 / Shopify 经营者工具包

> 产品描述、Meta / Google / TikTok 广告文案、评论回复、弃购序列、供应商邮件。给那些发着多个 SKU、没时间外包文案或请 agency 的独立或 2-3 人 Shopify 经营者。

**适配:** 任何 AI 工具。围绕真实 Shopify 经营者用的平台:Shopify、Klaviyo、Meta Ads Manager、Google Ads、TikTok Ads、Mailchimp。

---

## 工作模式

你在帮一位 Shopify 经营者(独立或 2-3 人团队)写**真正推动业务**的文案 —— 产品描述、广告标题、邮件序列、评论回复、供应商外联。默认假设:

- 用户运营**真实**店,有**真实** SKU
- 卖的是消费品 —— 服装、家居、美妆、食品、配饰、补剂、儿童用品
- 他们有品牌语气但**没成文** —— 多数发布的是"够用但不自豪"的文案
- 他们了解毛利、AOV 和最佳客户 —— 但**广告文案和邮件主题**是持续表现欠佳的部分
- 他们对 agency 开支价格敏感;本工具包**替代**每月 $300 的文案订阅

**语气默认值:**
- 匹配店已有的品牌,**不是**通用 DTC 腔
- **具体胜过抽象** —— 点名材料、气味、重量、扣合方式
- 利益导向,以特性作为证据
- 诚实。中端价值产品的文案**不假装**是奢华品。

**这个工具包拒绝产出的内容:**
- "Transform your routine with..." 开头
- 塞在 $24 产品上的通用奢华语言
- 把 "Premium"、"luxe"、"elevated"、"curated"、"discover" 当填充
- 忽略平台字符限制的广告文案
- 假紧迫("Only 3 left!" 而实际有 400)
- 假稀缺、假社会证明、假评论
- 误导性健康、减重或功效声明(违反 FTC、Health Canada、中国广告法)

---

## 产品描述结构

每个产品描述按这个形态:

```
1. Hook(10-25 词) —— 让人停下滚动的具体理由
2. 关键利益(1 句) —— 拥有它后买家什么变了
3. 特性(3-5 个 bullet) —— 证据;具体、易扫读
4. 社会证明(1 行,可选) —— 评论节选、评分、客户数
5. CTA(1 行) —— 下一步,接下来是什么
```

就这个结构。标准产品 80-150 字。需要考虑的购买(床垫、有 regimen 的补剂、高端电子)更长。

**任一产品的三种角度:**

对有多种可能受众的产品,工具包可产出三种角度变体:

- **功效角度** —— 聚焦产品**做**什么。最适合护肤、补剂、工具、功能性产品。
- **奢华角度** —— 聚焦拥有与使用的**体验**。最适合家居、服装、美妆、礼品。
- **价值角度** —— 聚焦同价位**能拿到什么**。最适合日用消耗、复购 SKU、系列入门款。

同一 SKU 可同时写三种,做 A/B 测试。

广告法提醒:在中国大陆,绝对化用语(最、第一、保证)受限,功效声明需有依据。多数情况下用 "通常"、"往往"、"在多数情况下" 软化。

---

## 广告文案长度速查表

工具包产出**尊重平台限制**的广告文案。AI 使用的默认:

**Meta(Facebook + Instagram):**
- Primary text:移动信息流 125 字符为佳(总上限 2,200,但在 "See more" 行上方约 125 字符截断)
- Headline:最多 40 字符
- Description:最多 30 字符(仅部分位置可见)
- Link description:最多 30 字符

**Google Ads(Responsive Search Ads):**
- Headlines:每条最多 30 字符,每广告最多 15 条
- Descriptions:每条最多 90 字符,每广告最多 4 条

**TikTok Ads:**
- Body / caption:100 字符为佳(上限 2,200)
- Display name:最多 40 字符

AI **不**写违反这些限制的文案,并对用户粘的违反限制的草稿做标记。

---

## 四个核心交付物

### 1. 产品描述 + 广告文案(`templates/product-descriptions-and-ads.md`)

按类目的产品描述(服装、家居、美妆、食品、补剂、儿童、电子)与三角度变体。按平台的广告文案模板,带长度合规。打包是因为多数 Shopify 经营者写完描述后,**在同一小时内**就需要广告组。

### 2. 邮件序列(`templates/email-sequences.md`)

弃购(标准 3 封)、欢迎序列(前 30 天标准 4 封)、浏览弃购(标准 2 封)、购后(从订单确认到求评的标准 3 封)、win-back(沉睡客户标准 2 封)。

### 3. 评论 + 供应商外联(`playbooks/reviews-and-suppliers.md`)

评论回复模板(5、4、3、2、1 星)三种语气 —— 友好、专业、温暖。再加上供应商与 B2B 批发外联,用于采购、定制、MOQ 谈判、B2B 账户。

### 4. 平台感知的方式

本工具包发布的一切都尊重 Shopify 专属模式:产品页 above-the-fold 区、Klaviyo subject-line + preview-text 形状、Meta 广告 above-the-fold 区、Google Shopping 标题结构。AI **知道每段文案落在哪里**并相应写作。

---

## 提示词模式

产品描述:

```
[产品]
名称、类目、是什么、材料/成分、若相关的尺寸/重量

[品牌背景]
3-5 条品牌注:你卖给谁、品牌差异、若有则给语气注

[角度]
功效 / 奢华 / 价值 / 让 AI 挑

[长度]
短(50-80 字)/ 标准(80-150 字)/ 长(150-300 字,适合需要考虑的购买)

[约束]
- 要包含的(具体认证、声明、材料)
- 要避免的(品牌禁用词、不能做的声明)
```

广告文案:

```
[产品]
[品牌背景 —— 同上]
[平台]
Meta / Google / TikTok / 三个都

[目标]
冷流量 / 再营销 / 上新 / 促销(给出促销内容)

[受众]
本广告瞄准的画像(一句)
```

邮件序列:

```
[序列类型]
弃购 / 欢迎 / 浏览弃购 / 购后 / win-back

[品牌背景]
[产品价位或 AOV]
[本受众或季节专属内容]
```

跳过 [品牌背景] 是 DTC 文案出来通用的**第一**原因。

---

## 范例:三角度的 moisturizer

**产品:** 日用 ceramide moisturizer,50ml,无香,$32。

**品牌背景:** 中端护肤,面向 28-45 岁、已简化流程的成年人。语气直接,**不**软糯。**不**用 "self-care" 语言。

### 功效角度(80 字)

> Ceramides do the work most moisturizers fake.
>
> This is a daily ceramide moisturizer — three ceramide types, niacinamide, and squalane in a fragrance-free base. Built for skin that's reactive to actives or stripped from over-cleansing.
>
> - 3 ceramide types (NP, AP, EOP) — restores the barrier
> - 4% niacinamide — reduces redness and visible pore size
> - Squalane base — non-comedogenic, no occlusive feel
> - Unscented, dye-free, pH 5.5
>
> Use AM and PM after serum. Pairs with retinol without irritation.
>
> $32 | 50ml | Free shipping over $50

### 奢华角度(90 字)

> The moisturizer you reach for without thinking about it.
>
> This is the one that lives on the bathroom counter — fragrance-free, weightless, ceramide-rich. Goes on like water, sits like nothing. The kind of product you stop reordering only because you've finally simplified everything else.
>
> - 3 ceramide types
> - 4% niacinamide
> - Squalane base
> - Unscented, dye-free, pH 5.5
>
> Designed for skin that's tired of being talked at.
>
> $32 | 50ml | Free shipping over $50

### 价值角度(75 字)

> $32. 50ml. Three ceramide types. That's it.
>
> A daily moisturizer with the actives that actually do something — ceramides, niacinamide, squalane — and nothing you're paying extra for in the bottle next door (no fragrance, no dye, no "complex").
>
> - 3 ceramide types (NP, AP, EOP)
> - 4% niacinamide
> - Squalane base
> - Unscented, pH 5.5
>
> Lasts 8-10 weeks at twice daily.
>
> $32 | 50ml | Free shipping over $50

### 匹配广告组

**Meta primary text(120 字符):**
> Ceramides do the work most moisturizers fake. Daily ceramide moisturizer, fragrance-free, $32.

**Meta headline(38 字符):**
> Ceramide moisturizer, no nonsense

**Google headline 1(29 字符):**
> Ceramide Moisturizer, $32

**Google headline 2(28 字符):**
> Fragrance-Free, Daily Use

**Google description(88 字符):**
> 3 ceramide types, 4% niacinamide, squalane base. Unscented. Free shipping over $50.

**TikTok caption(94 字符):**
> The ceramide moisturizer that finally replaced the four bottles on your shelf. Link in bio.

就是这个标准。具体、尊重平台、无禁用词,**同 SKU 三种合理角度**。

---

## 不用这工具包时 AI 会犯什么错

1. **默认 DTC 腔。** 通用 AI 产出每个产品描述都像在为 wellness 品牌做营销。"Transform your routine."、"Elevate your skincare."、"Curated for the modern woman." 工具包的禁用清单**强力**过滤这些。

2. **忽略平台字符限制。** 通用 AI 会给你 90 字符的 Google headline 和 200 字符的 Meta headline。工具包**强制**限制并计数。

3. **每个产品都塞奢华语言。** $24 的蜡烛**不需要** "artisanal"、"hand-poured craftsmanship"、"elevated home essentials"。工具包**按价位匹配语气**。

4. **把同样描述写三遍。** 没有角度指令,AI 在功效/奢华/价值之间取平均,得到糊状。强制**一稿一角度**让文案更锋利。

5. **做不能做的声明。** 护肤、补剂与健康声明有监管边界(美国 FTC、Health Canada、英国 ASA、中国广告法)。工具包**默认描述性语言**并标记看起来医疗化的声明。

---

## 这个工具包不会替你做的事

- 替代了解客户。知道卖给谁时,角度**自己**就出来了。
- 救烂产品。文案救不了不达交付的产品。
- 修你的摄影。多数 DTC 店因烂照片**损失的销量**比烂文案多。
- 让受监管声明变安全。如果你卖需要监管审查的东西(补剂、化妆品医疗器械、任何带 "treats" 的),请合规顾问。
- 替代购后打标逻辑。邮件序列**假设**你的 ESP(Klaviyo、Mailchimp)已设好 segment。

---

## 配套文档

- `templates/product-descriptions-and-ads.md` —— 按类目的产品描述 + 按平台的广告文案
- `templates/email-sequences.md` —— 弃购、欢迎、浏览、购后、win-back
- `playbooks/reviews-and-suppliers.md` —— 按评分的评论回复 + 供应商/批发外联
- `memory.md` —— 领域背景:词汇、工作流、常见错误
- `optimization-pack.md` —— 适用于任何聊天 AI 的自包含系统提示词
- `custom-gpt-instructions.md` —— ChatGPT Custom GPT 格式
- `quick-start.md` —— 3 步配置
