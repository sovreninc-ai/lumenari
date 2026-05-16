# 产品描述 + 广告文案

按类目的产品描述、按平台的广告文案、字符限制强制执行。设计为**一次会话内发布** —— 写完 PDP,**同一小时内**跑广告组。

---

## 产品描述提示词

```
你在为 Shopify PDP 写产品描述。

产品:
- 名称:[name]
- 类目:[apparel / home / beauty / food / supplements / kids / electronics / accessories]
- 它是什么(一句):[paste]
- 关键材料 / 成分 / 规格:[列出对买家重要的 3-5 项]
- 尺寸 / 重量 / 变体信息:[若相关]
- 价格:[$X]

品牌背景:
- 你卖给谁:[一句话受众]
- 语气注:[3-5 条 —— 短句、直接、温暖、无俚语等]
- 不允许的:[不能做的声明、品牌不用的词等]

角度:[功效 / 奢华 / 价值 / 三种全出]

长度:[短 50-80 字 / 标准 80-150 字 / 长 150-300 字]

约束:
- 包含:[具体认证、材料、强制项]
- 避免:[品牌禁用词]

按标准结构输出描述:
1. Hook(10-25 词)
2. 关键利益(1 句)
3. 特性(3-5 bullet)
4. 社会证明(可选)
5. CTA(1 行)
```

---

## 按类目的范例

### 服装 —— merino base layer,$89

**品牌背景:** 户外性能品牌。直接、技术友好的语气。受众:30-45 岁、研究装备的徒步者、滑雪者、骑行者。

**功效角度:**
> Merino that handles a week of use before it needs a wash.
>
> 18.5-micron New Zealand merino, knit at 230 gsm — fine enough for next-to-skin comfort, dense enough to retain warmth when damp. Built for multi-day trips where laundry isn't an option.
>
> - 18.5-micron merino, 230 gsm
> - Flatlock seams, no shoulder rub under pack straps
> - Thumb loops on the cuffs
> - Tagless neck, gusseted underarm
>
> Wears odor-free for 5-7 days of active use. Hand-wash cold.
>
> $89 | XS-XXL | Ships in 1-2 business days

### 家居 —— 蜂蜡蜡烛,$24

**品牌背景:** 小批量家居品牌。温暖、低调语气。受众:28-50 岁,布置第一或第二个家,偏好天然材料。

**价值角度(匹配价位 —— 奢华角度会显得假):**
> Beeswax, cotton wick, 50-hour burn time. $24.
>
> A simple beeswax candle. No fragrance oils, no soy blends, no fancy vessel. Burns clean and slow, smells faintly of honey, throws warm light across a kitchen table for the second half of dinner.
>
> - 100% beeswax, sourced from BC
> - Cotton wick (no metal core)
> - ~50-hour burn time
> - Reusable ceramic vessel, 8oz
>
> Made in batches of 30. Restocks the first Friday of each month.
>
> $24 | Free shipping over $40

### 美妆 —— 维生素 C 精华,$58

**品牌背景:** 中端护肤品牌。具体、自信的语气。受众:28-45 岁、有护肤知识的成年人。

**功效角度:**
> 15% L-ascorbic acid, fresh-packed in dated bottles.
>
> A daily vitamin C serum in its most studied form — L-ascorbic acid at 15%, paired with ferulic acid and vitamin E to stabilize it. Brightens, evens tone, and works under SPF.
>
> - 15% L-ascorbic acid (pH 3.2)
> - 1% ferulic acid + 1% vitamin E
> - Bottled the week it ships — every bottle dated
> - Glass dropper, amber bottle (light-stable)
>
> Use AM, 4-5 drops, before moisturizer and SPF. 12-week supply at daily use.
>
> $58 | 30ml | Free shipping over $50

### 食品 —— 单源咖啡,$22

**品牌背景:** 精品咖啡烘焙商。直白的语气。受众:家用 espresso、手冲玩家、送礼买家。

**功效角度(此处"功效"意味:告诉你它喝起来什么味):**
> Ethiopia Guji, washed process, lot 24.
>
> A washed Ethiopia from the Guji region — bright, floral, the kind of cup that holds up well in a V60 or as espresso. Roasted to the lighter side of medium.
>
> - Single-origin: Guji, Ethiopia
> - Washed process
> - Tasting notes: bergamot, white grape, jasmine
> - Roasted: the day before it ships
> - Whole bean or ground to your grinder
>
> 250g bag. Best within 4-6 weeks of roast date.
>
> $22 | Free shipping over $40

### 补剂 —— 甘氨酸镁,$36

**品牌背景:** 功能性补剂品牌。直接、无废话的语气。受众:28-50 岁、看标签的成年人。

**功效角度(以及一个声明纪律的工作范例):**
> 400mg of chelated magnesium glycinate. No filler.
>
> A daily magnesium supplement in the form most gentle on digestion — glycinate, fully chelated for absorption. Two capsules deliver 400mg of elemental magnesium.
>
> - 400mg elemental magnesium (as glycinate) per 2-capsule serving
> - Third-party tested for purity
> - No fillers, no stearates, no titanium dioxide
> - 90 capsules per bottle (45-day supply)
>
> Take 1-2 capsules with dinner. Consult a healthcare provider if you have kidney conditions.
>
> $36 | Free shipping over $50

**该例注:** 描述**没说** "improves sleep"、"reduces anxiety"、"supports recovery"。那些是需要 FDA 感知框架的 structure-function 声明。工具包**默认描述性语言**。

---

## 广告文案模板

为多数 Shopify 经营者**实际**在跑的平台打造。

### Meta 广告组提示词

```
你在为以下产品写 Meta 广告组(Facebook + Instagram):

产品:[名称 + 一句描述]
品牌:[3-5 条品牌语气注]
目标:[冷流量 / 再营销 / 上新 / 促销]
促销(如有):[粘 offer]
受众:[本广告瞄准的画像 —— 一句]

输出:
- 3 个 primary text 变体(每个 125 字符为佳 —— 标注字符数)
- 3 个 headline 变体(每个最多 40 字符 —— 标注字符数)
- 1 个 description 变体(最多 30 字符 —— 标注字符数)

约束:
- 不写禁用词(transform、elevate、unlock、luxe 等)
- 前 7-10 词放钩(移动端 "See more" 上方)
- **一**个清晰下一步
```

**范例 —— moisturizer 冷流量:**

```
Primary text 1(118 字符):
Ceramides do the work most moisturizers fake. Daily ceramide moisturizer, fragrance-free, $32. Free shipping $50+.

Primary text 2(123 字符):
The moisturizer you stop reordering only because you've simplified everything else. Fragrance-free, $32. Link below.

Primary text 3(109 字符):
3 ceramide types, niacinamide, squalane. No fragrance, no dye. $32. Built for skin that's been over-stripped.

Headline 1(33 字符):
Ceramide moisturizer, $32

Headline 2(38 字符):
The one that lives on the counter

Headline 3(28 字符):
Fragrance-free. That's it.

Description(28 字符):
50ml. Free ship $50+.
```

### Google Ads 提示词

```
你在为以下产品写 Google Responsive Search Ads:

产品:[名称 + 一句描述]
搜索意图:[用户看到这个广告时在搜什么]
瞄准的关键词:[列出 3-5]
促销(如有):[粘 offer]

输出:
- 8 个 headline 变体(每个最多 30 字符 —— 标注字符数)
- 3 个 description 变体(每个最多 90 字符 —— 标注字符数)

约束:
- 每个 headline 必须独立成立(Google 会轮换)
- 整套覆盖:产品类型 + 一个利益 + 一个价格或促销信号
- 不写禁用词
```

**范例 —— moisturizer:**

```
Headline 1(28 字符): Ceramide Moisturizer, $32
Headline 2(29 字符): Fragrance-Free, Daily Use
Headline 3(30 字符): 3 Ceramide Types + Niacinamide
Headline 4(26 字符): Free Shipping Over $50
Headline 5(28 字符): Won't Pill Under SPF
Headline 6(28 字符): For Sensitive, Tired Skin
Headline 7(30 字符): No Fragrance. No Dye. No Mess.
Headline 8(29 字符): The Moisturizer You Reorder

Description 1(88 字符):
3 ceramide types, 4% niacinamide, squalane base. Unscented. Free shipping over $50.

Description 2(84 字符):
Daily ceramide moisturizer for skin tired of being stripped. $32 for 50ml. AM and PM.

Description 3(89 字符):
Fragrance-free, dye-free, pH-balanced. Pairs with retinol without irritation. Ships fast.
```

### TikTok 广告提示词

```
你在为以下产品写 TikTok 广告文案:

产品:[名称 + 一句描述]
形式:[Spark Ad 基于现有创作者帖 / 品牌直投]
钩子风格:[问题陈述 / 反主流 / before-after / 直接 callout]
受众:[一句]

输出:
- 3 个 caption 变体(每个 100 字符为佳 —— 标注字符数)
- 1 个 display name 建议(最多 40 字符)

约束:
- TikTok caption **前置**钩子
- 避免 "shop now" —— 用 "link in bio" 或产品专属语言
- 不写禁用词
```

**范例 —— moisturizer:**

```
Caption 1(97 字符):
The ceramide moisturizer that finally replaced the four bottles on your shelf. Link in bio.

Caption 2(94 字符):
Fragrance-free is the only flex. $32 daily moisturizer, three ceramide types. Tap to shop.

Caption 3(96 字符):
If your skin is reactive to everything you try, this is the one to keep. $32. Linked above.

Display name(29 字符):
Brand Name | Skincare Done Simple
```

---

## 当品牌需要不同角度

若首稿落空,**切角度并重新提示**。常见模式:

- 功效角度太临床 → 试奢华
- 奢华角度过于做作 → 试价值
- 价值角度显得便宜 → 试功效,用自信但具体的框架

同一产品可在三种不同角度下发布,你可在单一平台上 A/B 哪个最转化,再 scale。

---

## 好广告文案不做什么

- **把品牌名塞进 headline。** "Brand Name's New Premium Moisturizer" 浪费 30 字符。
- **每行都以问号结尾。** 尤其 TikTok 广告 —— 直接陈述比 "Tired of dry skin?" 转化高。
- **用感叹号充当 vibe。** 每个广告**一个**感叹号足矣。
- **无依据承诺结果。** 没有引用就坚持描述性语言。
- **三个平台跑同一份文案。** 每个平台节奏不同 —— Meta 宽松、Google 关键词驱动、TikTok 有声。
