# Meta + Schema 工具箱

两个看似无聊的字段加一段 JSON,比大多数文章重写更能带来流量。本文件给你生成它们的提示词,以及可直接抄的范例。

---

## 第 1 部分 —— Meta 标题

### 什么算好

- 50-60 字符(桌面端 Google 在 600px 左右截断;~60 字符是安全上限)
- 主关键词在前半句
- 有点击理由,不仅仅是关键词匹配
- 不标题党、不全大写、不要无谓地加 `[2026]`

### 提示词

```
你是 SEO 内容策略师。

为这篇文章生成 5 个 meta 标题变体。

**主关键词:** [keyword]
**文章角度:** [一句话说明这篇文章到底主张或交付什么]
**意图:** [信息型 / 商业型 / 等]
**品牌后缀(可选):** [例如 " | YourBrand" —— 仅当能塞进字符限制]

每个变体给我:
- 标题
- 字符数(含品牌后缀,如有)
- 钩子:为什么有人会点它而不是 Top 3

避免:标题党、全大写、除非话题确实时效性强,不要泛用的 "[YEAR]" 标注。
```

### 范例输出 —— "best CRM for solopreneurs"

1. **Best CRM for Solopreneurs: 7 Tested in 90 Days**(52 字符)—— 钩子:具体数 + 持续时长作为证据
2. **Best CRM for Solopreneurs (One I Cancelled Fast)**(50 字符)—— 钩子:反向证据
3. **Best CRM for Solopreneurs: The Honest Comparison**(50 字符)—— 钩子:"诚实"暗示其他都不是
4. **Best CRM for Solopreneurs: $X/mo Tools Compared**(47 字符)—— 钩子:用价格切入
5. **Best CRM for Solopreneurs: Notion Won Against 6 Apps**(53 字符)—— 钩子:把答案剧透了,反而带动"等等,啥?"的点击

哪个最强,取决于文章真正押注的差异点。#1 是最稳的默认。#5 只有在 Notion 真的赢了时才行。

---

## 第 2 部分 —— Meta 描述

### 什么算好

- 140-160 字符
- 两句话承诺:交付什么 + 为什么值得读
- 不要重复 H1
- 不要以 "Read more!" 结尾(Google 会删)
- 自然地包含主关键词一次

### 提示词

```
你是 SEO 内容策略师。

为这篇文章生成 3 个 meta 描述变体。

**Meta 标题:** [你选的标题]
**主关键词:** [keyword]
**文章角度:** [一句话说明这篇文章到底主张或交付什么]
**读者会从文章中得到的 Top 3:** [bullet 列表]

每个变体:
- 描述
- 字符数
- 它以哪个"承诺"切入
```

### 范例输出

对于上面那篇 CRM 文章:

1. **"Paid for and used 7 CRMs for 90 days each as a one-person business. Here's the one I kept, the one I cancelled fastest, and what every comparison site got wrong."**(160 字符)—— 以时长证据切入

2. **"Most 'best CRM' lists are written from press releases. I actually tested 7 — daily-use friction, real costs, real cancellation flows. The verdict surprised me."**(158 字符)—— 以对比/反主流切入

3. **"The best CRM for solopreneurs isn't the one with the longest feature list. After 90 days testing 7, here's the one worth paying for and the one to skip."**(152 字符)—— 以观点切入

拿不准就发 #1。"paid for" 这个动词工作量很大 —— 它暗示了第一手的成本和精力。

---

## 第 3 部分 —— Schema 生成器

### 何时用哪种 schema

| 文章类型 | Schema |
|---|---|
| 博客文章、新闻文章 | Article |
| 带有真正回答 FAQ 的 FAQ 段的文章 | Article + FAQPage |
| 分步指导("如何做 X") | HowTo |
| 单品评测页 | Product(只有有**真实**评价时) |
| 对比或清单 | Article(除非你只评测某一款产品,否则**不要**用 Product) |

### Article schema 提示词

```
你是 SEO 内容策略师。

为该页生成 Article JSON-LD。

**Headline:** [the H1]
**URL:** [full canonical URL]
**Author name:** [byline]
**Author URL:** [optional — author page or LinkedIn]
**Publisher name:** [site name]
**Publisher logo URL:** [logo image URL]
**Date published:** [YYYY-MM-DD]
**Date modified:** [YYYY-MM-DD]
**Featured image URL:** [hero image]
**Description:** [meta description]

输出可校验的 JSON-LD,包含所有必需 + 推荐字段。使用 schema.org context。
```

**范例输出:**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Best CRM for Solopreneurs: 7 Tested in 90 Days",
  "image": "https://solo-saas-reviews.com/images/crm-test-hero.jpg",
  "author": {
    "@type": "Person",
    "name": "Chris Holwell",
    "url": "https://solo-saas-reviews.com/author/chris-holwell"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Solo SaaS Reviews",
    "logo": {
      "@type": "ImageObject",
      "url": "https://solo-saas-reviews.com/logo.png"
    }
  },
  "datePublished": "2026-05-14",
  "dateModified": "2026-05-14",
  "description": "Paid for and used 7 CRMs for 90 days each as a one-person business. Here's the one I kept, the one I cancelled fastest, and what every comparison site got wrong.",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://solo-saas-reviews.com/best-crm-solopreneurs"
  }
}
```

把它放在页面 `<head>` 内的 `<script type="application/ld+json">` 块里。

### FAQ schema 提示词

只有页面上确实有可见的 FAQ 段、并真的回答了这些问题时才用。不要为页面上没有的问题发 FAQ schema —— 那是违规,会招来人工处罚。

```
你是 SEO 内容策略师。

为该页生成 FAQPage JSON-LD。

**Page URL:** [URL]
**FAQ Q&A pairs:**
1. Q: [question]
   A: [the answer as written on the page — full text]
2. Q: [question]
   A: [answer]
[等等]

重要:这里每一个 Q&A 都**必须**在页面上可见。如果页面上没有,就不要写进来。如有任何不确定,先确认再生成。

输出可校验的 JSON-LD。
```

**范例输出:**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do solopreneurs need a CRM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most solopreneurs under 20 active clients don't need a dedicated CRM. A spreadsheet or a Notion template handles the same volume with less friction. The threshold to upgrade tends to be when you're losing track of follow-ups or when client conversations span multiple channels."
      }
    },
    {
      "@type": "Question",
      "name": "What is the easiest CRM for solopreneurs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Based on 90 days of testing, the easiest to learn was HubSpot Free, and the easiest to keep using daily was a tie between FollowUpBoss and a Notion CRM template. 'Easiest' depends on whether you value setup speed or long-term low friction."
      }
    },
    {
      "@type": "Question",
      "name": "Is HubSpot good for solopreneurs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes for solopreneurs growing toward 100+ contacts. HubSpot Free is overpowered for the use case but the upgrade path is steep — the paid tiers are priced for teams, not individuals. If you're staying solo, you'll outgrow free and underuse paid."
      }
    }
  ]
}
```

### How-To schema 提示词

只在内容确实是分步指导时才用。"How to start a podcast" 拥有独立步骤,符合。"How to think about your brand" 不符合 —— 那是文章,不是 how-to。

```
你是 SEO 内容策略师。

为该页生成 HowTo JSON-LD。

**Headline:** [the H1,必须以 "How to..." 开头]
**Description:** [一句话总结]
**Total time:** [估计,ISO 8601 时长格式 —— 例如 PT2H 表示 2 小时]
**Supply (optional):** [用户需要拥有的东西]
**Tool (optional):** [需要的工具]
**Steps:** [带编号列表 —— 每步含 name、text,可选 image URL]

输出可校验的 JSON-LD。
```

**范例输出**(对于 "How to launch a podcast in a weekend"):

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Launch a Podcast in a Weekend",
  "description": "A two-day launch plan covering recording, editing, hosting, and distribution.",
  "totalTime": "PT16H",
  "supply": [
    { "@type": "HowToSupply", "name": "USB microphone" },
    { "@type": "HowToSupply", "name": "Quiet recording space" }
  ],
  "tool": [
    { "@type": "HowToTool", "name": "Audacity or GarageBand" },
    { "@type": "HowToTool", "name": "Buzzsprout or Transistor account" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Pick the format and write the first episode",
      "text": "Decide between solo, interview, or co-host. Write a 10-minute first episode you'd want to listen to."
    },
    {
      "@type": "HowToStep",
      "name": "Record episode one",
      "text": "Use a quiet room, USB mic 6 inches from your mouth, single take. Don't edit while recording."
    },
    {
      "@type": "HowToStep",
      "name": "Edit and export",
      "text": "Remove dead air over 2 seconds. Normalize audio to -16 LUFS. Export as MP3, 128 kbps."
    },
    {
      "@type": "HowToStep",
      "name": "Set up hosting and submit to directories",
      "text": "Create a hosting account, upload episode one, generate your RSS feed, submit to Apple Podcasts and Spotify."
    }
  ]
}
```

### Product schema 提示词(附警告)

```
你是 SEO 内容策略师。

为该页生成 Product JSON-LD。

**Product name:** [name]
**Description:** [一段]
**Image URL:** [主图]
**Brand:** [品牌名]
**SKU (optional):** [如适用]
**Price + currency:** [例如 "29.00 USD"]
**Availability:** [InStock / OutOfStock / PreOrder]

**Reviews(只在真实情况下):**
- Aggregate rating value: [5 分制]
- Aggregate review count: [数量]
- Sample individual reviews (可选,1-3 条):每条含 author + rating + text

关键:除非页面上有真实、可见、可核实的评价,否则不要包含 aggregateRating。伪造或捏造 aggregateRating 会招来人工处罚,且属于欺诈。生成前先确认。

输出可校验的 JSON-LD。
```

---

## 工具包会标记的常见 schema 错误

- **FAQ schema 带有页面上没有的问题。** 违规。不要。
- **HowTo schema 用在并非真正 how-to 的内容上。** "How to think about pricing" 是文章;"How to migrate from HubSpot to Pipedrive" 可能符合。
- **没有真实评价的 Product schema aggregateRating。** 这是引发 Google 人工处罚最快的路径之一。
- **Article schema 的 `dateModified` 早于 `datePublished`。** 校验器会标;你也错失了新鲜度加成。
- **`@type` 选错。** 对比文是 Article,不是 Product。
- **Article schema 缺 `mainEntityOfPage`。** 富搜索结果所必需。

---

## 如何校验

发布前,把 schema 跑一遍:

- Google Rich Results Test(`search.google.com/test/rich-results`)—— 确认是否符合富结果资格
- Schema.org 校验器(`validator.schema.org`)—— 确认 JSON-LD 格式正确

任一失败,先修再发。不要发坏掉的 schema;它比完全没有 schema 更糟。
