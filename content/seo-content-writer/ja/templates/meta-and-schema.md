# メタ + スキーマツールキット

退屈な 2 つのフィールドと 1 つの JSON ブロックが、多くの記事リライトより多くのトラフィックを動かします。このファイルは、それらを生成するプロンプトと、コピー元になる出力例を提供します。

---

## パート 1 — メタタイトル

### 良い状態とは

- 50〜60 文字（Google はデスクトップで約 600px で切り捨て、約 60 文字が安全圏）
- 主要キーワードは前半に
- キーワード一致だけでなく、クリックする理由
- クリックベイト禁止、全大文字禁止、無用な `[2026]` 禁止

### プロンプト

```
あなたは SEO コンテンツストラテジストです。

この記事のメタタイトル候補を 5 案生成してください。

**主要キーワード:** [キーワード]
**記事の角度:** [この記事が実際に主張または届けるものを 1 文で]
**インテント:** [情報型 / 商業型 / 等]
**ブランド接尾辞 (任意):** [例: 「 | YourBrand」 — 文字数に収まる場合のみ]

各案について示してください:
- タイトル
- 文字数 (ブランド接尾辞を使う場合はそれ込み)
- フック: 上位 3 件を差し置いてクリックさせる何
- 何

避けるもの: クリックベイト、全大文字、トピックが本当に時間敏感でない限りの汎用 [YEAR] タグ。
```

### 出力例 —「best CRM for solopreneurs」

1. **Best CRM for Solopreneurs: 7 Tested in 90 Days** (52 文字) — フック: 具体性 + 期間が証拠
2. **Best CRM for Solopreneurs (One I Cancelled Fast)** (50 文字) — フック: 対立的な証跡
3. **Best CRM for Solopreneurs: The Honest Comparison** (50 文字) — フック: 「honest」は他は違うことを示唆
4. **Best CRM for Solopreneurs: $X/mo Tools Compared** (47 文字) — フック: 価格で攻める
5. **Best CRM for Solopreneurs: Notion Won Against 6 Apps** (53 文字) — フック: 答えを出して「待って、何？」でクリック誘発

最強のものは、記事が実際に押す差別化要素に依存。#1 が最も安全な既定値。#5 は Notion が本当に勝っていたときだけ機能する。

---

## パート 2 — メタディスクリプション

### 良い状態とは

- 140〜160 文字
- 二文構成の約束: 何を届けるか + 読む価値の理由
- H1 を言い換えない
- 「続きを読む！」で終えない（Google が剥がす）
- 主要キーワードを 1 回、自然に含める

### プロンプト

```
あなたは SEO コンテンツストラテジストです。

この記事のメタディスクリプション案を 3 つ生成してください。

**メタタイトル:** [選んだタイトル]
**主要キーワード:** [キーワード]
**記事の角度:** [この記事が実際に主張または届けるものを 1 文で]
**読者が記事から得る上位 3 つ:** [箇条書き]

各案について:
- 説明文
- 文字数
- どの「約束」で攻めるか
```

### 出力例

CRM 記事用:

1. **「Paid for and used 7 CRMs for 90 days each as a one-person business. Here's the one I kept, the one I cancelled fastest, and what every comparison site got wrong.」** (160 文字) — 期間の証拠で攻める

2. **「Most 'best CRM' lists are written from press releases. I actually tested 7 — daily-use friction, real costs, real cancellation flows. The verdict surprised me.」** (158 文字) — 対比 / 対立的視点で攻める

3. **「The best CRM for solopreneurs isn't the one with the longest feature list. After 90 days testing 7, here's the one worth paying for and the one to skip.」** (152 文字) — テーゼで攻める

どれを選ぶか迷うなら #1 を出荷。「paid for」という動詞が多くの仕事をする — 一次的なコストと労力を示すから。

---

## パート 3 — スキーマジェネレーター

### いつどのスキーマを使うか

| 記事種別 | スキーマ |
|---|---|
| ブログ投稿、ニュース記事 | Article |
| FAQ セクションが本当に質問に答える記事 | Article + FAQPage |
| ステップバイステップの教示型 (「How to X」) | HowTo |
| 単一商品レビューページ | Product (実レビューがある場合のみ) |
| 比較またはリスト記事 | Article (特定の 1 商品をレビューするのでない限り Product ではない) |

### Article スキーマプロンプト

```
あなたは SEO コンテンツストラテジストです。

このページの Article JSON-LD を生成してください。

**ヘッドライン:** [H1]
**URL:** [完全な canonical URL]
**著者名:** [バイライン]
**著者 URL:** [任意 — 著者ページまたは LinkedIn]
**発行者名:** [サイト名]
**発行者ロゴ URL:** [ロゴ画像 URL]
**公開日:** [YYYY-MM-DD]
**更新日:** [YYYY-MM-DD]
**アイキャッチ画像 URL:** [ヒーロー画像]
**説明:** [メタディスクリプション]

必須 + 推奨プロパティをすべて含む検証対応 JSON-LD を出力。schema.org コンテキストを使用。
```

**出力例:**

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

これをページの `<head>` 内の `<script type="application/ld+json">` ブロックに入れます。

### FAQ スキーマプロンプト

これは、これらの質問に答える可視 FAQ セクションが実際にページにある場合にのみ使う。ページにない質問の FAQ スキーマを出荷しない — 違反であり、手動アクションを招きます。

```
あなたは SEO コンテンツストラテジストです。

このページの FAQPage JSON-LD を生成してください。

**ページ URL:** [URL]
**FAQ の Q&A ペア:**
1. Q: [質問]
   A: [ページに書かれている通りの回答全文]
2. Q: [質問]
   A: [回答]
[以下同様]

重要: ここのすべての Q&A はページ上で可視でなければならない。ページにないなら含めない。曖昧さがあれば生成前に確認する。

検証対応 JSON-LD を出力。
```

**出力例:**

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

### How-To スキーマプロンプト

本当にステップバイステップの教示型コンテンツにのみ使う。離散ステップのある「How to start a podcast」は該当する。「How to think about your brand」は該当しない — それはエッセイで、How-to ではない。

```
あなたは SEO コンテンツストラテジストです。

このページの HowTo JSON-LD を生成してください。

**ヘッドライン:** [H1、必ず「How to...」で始まる]
**説明:** [1 文要約]
**総所要時間:** [推定、ISO 8601 期間形式 — 例: 2 時間なら PT2H]
**用意するもの (任意):** [ユーザーが持つ必要のあるもの]
**ツール (任意):** [必要なツール]
**ステップ:** [番号付きリスト — 各ステップは名前、テキスト、任意で画像 URL]

検証対応 JSON-LD を出力。
```

**出力例**（「How to launch a podcast in a weekend」用）:

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

### Product スキーマプロンプト（警告付き）

```
あなたは SEO コンテンツストラテジストです。

このページの Product JSON-LD を生成してください。

**商品名:** [名前]
**説明:** [1 段落]
**画像 URL:** [メイン商品画像]
**ブランド:** [ブランド名]
**SKU (任意):** [該当する場合]
**価格 + 通貨:** [例: 「29.00 USD」]
**在庫:** [InStock / OutOfStock / PreOrder]

**レビュー (実在の場合のみ):**
- 集計評価値: [5 点満点中の数値]
- 集計レビュー数: [数値]
- サンプル個別レビュー (任意、1〜3): 各々著者 + 評価 + テキスト

重要: ページに実在し可視で検証可能なレビューがない限り aggregateRating を含めない。偽の、または捏造した aggregateRating は手動アクションを招き、不正にあたる。生成前に確認する。

検証対応 JSON-LD を出力。
```

---

## キットがフラグするよくあるスキーマミス

- **ページにない質問の FAQ スキーマ。** 違反。やらない。
- **How-to でないコンテンツに HowTo スキーマ。** 「How to think about pricing」はエッセイ。「How to migrate from HubSpot to Pipedrive」は該当しうる。
- **実レビューのない Product スキーマの aggregateRating。** Google の手動アクションへの最短ルートの一つ。
- **`dateModified` が `datePublished` より古い Article スキーマ。** バリデーターがフラグ。鮮度ブーストも失う。
- **コンテンツに対する `@type` の取り違え。** 比較記事は Article で、Product ではない。
- **Article スキーマに `mainEntityOfPage` がない。** リッチ検索結果に必要。

---

## 検証方法

出荷前に、スキーマを次にかけてください:

- Google の Rich Results Test (`search.google.com/test/rich-results`) — リッチ結果の適格性を確認
- Schema.org Validator (`validator.schema.org`) — JSON-LD が整形式かを確認

いずれかが失敗したら、公開前に修正。壊れたスキーマを出荷しない。スキーマなしより損失が大きい。
