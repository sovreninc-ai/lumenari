# Meta + Schema Toolkit

दो boring fields और एक JSON block जो ज़्यादातर article rewrites से अधिक traffic move करते हैं। यह file आपको उन्हें generate करने के prompts और copy करने के worked examples देती है।

---

## Part 1 — Meta titles

### Good कैसा दिखता है

- 50-60 characters (Google desktop पर ~600px के आसपास truncate करता है; ~60 chars safe limit है)
- पहले half में primary keyword
- Click करने का एक reason जो सिर्फ keyword match न हो
- No clickbait, no all-caps, कोई बेकार `[2026]` नहीं

### Prompt

```
आप SEO Content Strategist हैं।

इस article के लिए 5 meta title variants generate करें।

**Primary keyword:** [keyword]
**Article angle:** [एक sentence में article actually क्या argue करता है या deliver करता है]
**Intent:** [informational / commercial / etc.]
**Brand suffix (optional):** [e.g., " | YourBrand" — सिर्फ अगर char limit में fit हो]

हर variant के लिए मुझे दें:
- Title
- Character count (brand suffix के साथ अगर used)
- Hook: top 3 results पर इसे click करने का कारण क्या है

Avoid: clickbait, all caps, generic "[YEAR]" tagging जब तक topic genuinely time-sensitive न हो।
```

### Worked example output — "best CRM for solopreneurs"

1. **Best CRM for Solopreneurs: 7 Tested in 90 Days** (52 chars) — hook: specificity + duration as proof
2. **Best CRM for Solopreneurs (One I Cancelled Fast)** (50 chars) — hook: contrarian receipt
3. **Best CRM for Solopreneurs: The Honest Comparison** (50 chars) — hook: "honest" implies दूसरे नहीं हैं
4. **Best CRM for Solopreneurs: $X/mo Tools Compared** (47 chars) — hook: price से lead
5. **Best CRM for Solopreneurs: Notion Won Against 6 Apps** (53 chars) — hook: answer दे देता है, "wait, what" click drive करता है

इनमें से सबसे strong depend करता है कि article actually किस differentiator पर lean करता है। #1 सबसे safe default है। #5 तभी काम करता है अगर Notion really जीता हो।

---

## Part 2 — Meta descriptions

### Good कैसा दिखता है

- 140-160 characters
- Two-sentence promise: आप क्या deliver करते हैं + क्यों पढ़ने लायक है
- H1 restate मत करें
- "Read more!" से end मत करें (Google strip करता है)
- Primary keyword एक बार naturally include करें

### Prompt

```
आप SEO Content Strategist हैं।

इस article के लिए 3 meta description variants generate करें।

**Meta title:** [जो title आपने pick किया]
**Primary keyword:** [keyword]
**Article angle:** [एक sentence में article actually क्या argue या deliver करता है]
**Top 3 चीज़ें जो एक reader article से लेगा:** [bullet list]

हर variant के लिए:
- Description
- Character count
- कौन सी "promise" से lead करता है
```

### Worked example output

CRM article के लिए:

1. **"7 CRMs के लिए pay किया और हर एक को 90 दिनों तक as a one-person business use किया। यहाँ है वो जो मैंने रखा, जो fastest cancel किया, और हर comparison site क्या miss करती है।"** (160 chars) — duration proof से lead

2. **"ज़्यादातर 'best CRM' lists press releases से लिखी जाती हैं। मैंने actually 7 test किए — daily-use friction, real costs, real cancellation flows। Verdict ने मुझे surprise किया।"** (158 chars) — contrast/contrarian angle से lead

3. **"Solopreneurs के लिए best CRM वह नहीं है जिसकी feature list सबसे लंबी हो। 90 दिनों में 7 test करने के बाद, यहाँ है वह जो pay करने लायक है और वह जो skip करें।"** (152 chars) — thesis से lead

अगर sure नहीं हो कौन सा pick करें, #1 ship करें। Verb "pay किया" बहुत work करता है — यह first-hand cost और effort signal करता है।

---

## Part 3 — Schema generators

### कब कौन सा schema use करें

| Article type | Schema |
|---|---|
| Blog post, news article | Article |
| FAQ section वाला article जो genuinely FAQ answer करता है | Article + FAQPage |
| Step-by-step instructional ("How to X") | HowTo |
| Single product review page | Product (सिर्फ REAL reviews के साथ) |
| Comparison या listicle | Article (Product नहीं जब तक एक specific product review न कर रहे) |

### Article schema prompt

```
आप SEO Content Strategist हैं।

इस page के लिए Article JSON-LD generate करें।

**Headline:** [H1]
**URL:** [full canonical URL]
**Author name:** [byline]
**Author URL:** [optional — author page या LinkedIn]
**Publisher name:** [site name]
**Publisher logo URL:** [logo image URL]
**Date published:** [YYYY-MM-DD]
**Date modified:** [YYYY-MM-DD]
**Featured image URL:** [hero image]
**Description:** [meta description]

सभी required + recommended properties के साथ validation-ready JSON-LD output करें। schema.org context use करें।
```

**Worked example output:**

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
  "description": "7 CRMs के लिए pay किया और हर एक को 90 दिनों तक as a one-person business use किया। यहाँ है वो जो मैंने रखा, जो fastest cancel किया, और हर comparison site क्या miss करती है।",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://solo-saas-reviews.com/best-crm-solopreneurs"
  }
}
```

इसे page के `<head>` में एक `<script type="application/ld+json">` block के अंदर drop करें।

### FAQ schema prompt

इसे सिर्फ तभी use करें अगर page पर actually एक visible FAQ section है जो ये questions answer करता है। उन questions के लिए FAQ schema ship मत करें जो page पर नहीं हैं — यह एक violation है और एक manual action earn करता है।

```
आप SEO Content Strategist हैं।

इस page के लिए FAQPage JSON-LD generate करें।

**Page URL:** [URL]
**FAQ Q&A pairs:**
1. Q: [question]
   A: [page पर लिखा गया answer — full text]
2. Q: [question]
   A: [answer]
[आदि।]

Important: यहाँ हर Q&A page पर visible होना MUST है। अगर page पर नहीं है, include मत करें। कोई ambiguity हो तो generating से पहले confirm करें।

Validation-ready JSON-LD output करें।
```

**Worked example output:**

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
        "text": "20 active clients से कम वाले ज़्यादातर solopreneurs को dedicated CRM की ज़रूरत नहीं है। एक spreadsheet या Notion template कम friction के साथ same volume handle करता है। Upgrade का threshold आमतौर पर तब होता है जब आप follow-ups का track खो रहे हों या जब client conversations multiple channels पर हों।"
      }
    },
    {
      "@type": "Question",
      "name": "What is the easiest CRM for solopreneurs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "90 दिनों के testing के आधार पर, सीखने में सबसे आसान HubSpot Free था, और daily-use करने में सबसे आसान FollowUpBoss और Notion CRM template के बीच tie था। 'सबसे आसान' depend करता है कि आप setup speed value करते हैं या long-term low friction।"
      }
    },
    {
      "@type": "Question",
      "name": "Is HubSpot good for solopreneurs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "100+ contacts की ओर बढ़ रहे solopreneurs के लिए yes। HubSpot Free use case के लिए overpowered है पर upgrade path steep है — paid tiers teams के लिए priced हैं, individuals के लिए नहीं। अगर आप solo रहने वाले हैं, आप free को outgrow करेंगे और paid को underuse करेंगे।"
      }
    }
  ]
}
```

### How-To schema prompt

सिर्फ genuinely step-by-step instructional content के लिए use करें। Discrete steps वाला "how to start a podcast" qualify करता है। "How to think about your brand" नहीं — वह essay है, how-to नहीं।

```
आप SEO Content Strategist हैं।

इस page के लिए HowTo JSON-LD generate करें।

**Headline:** [H1, "How to..." से start होना चाहिए]
**Description:** [एक-sentence summary]
**Total time:** [estimated, ISO 8601 duration format में — e.g., PT2H for 2 hours]
**Supply (optional):** [user को चाहिए things]
**Tool (optional):** [tools needed]
**Steps:** [numbered list — हर step में name, text, और optionally एक image URL]

Validation-ready JSON-LD output करें।
```

**Worked example output** ("How to launch a podcast in a weekend" के लिए):

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Launch a Podcast in a Weekend",
  "description": "Recording, editing, hosting, और distribution cover करने वाला two-day launch plan।",
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
      "name": "Format चुनें और पहला episode लिखें",
      "text": "Solo, interview, या co-host के बीच decide करें। एक 10-minute पहला episode लिखें जिसे आप सुनना चाहेंगे।"
    },
    {
      "@type": "HowToStep",
      "name": "Episode one record करें",
      "text": "Quiet room use करें, USB mic mouth से 6 inches दूर, single take। Recording करते समय edit मत करें।"
    },
    {
      "@type": "HowToStep",
      "name": "Edit और export करें",
      "text": "2 seconds से ज़्यादा का dead air remove करें। Audio को -16 LUFS पर normalize करें। MP3 के रूप में export, 128 kbps।"
    },
    {
      "@type": "HowToStep",
      "name": "Hosting set up करें और directories को submit करें",
      "text": "एक hosting account create करें, episode one upload करें, अपनी RSS feed generate करें, Apple Podcasts और Spotify को submit करें।"
    }
  ]
}
```

### Product schema prompt (warning के साथ)

```
आप SEO Content Strategist हैं।

इस page के लिए Product JSON-LD generate करें।

**Product name:** [name]
**Description:** [एक-paragraph]
**Image URL:** [main product image]
**Brand:** [brand name]
**SKU (optional):** [अगर applicable]
**Price + currency:** [e.g., "29.00 USD"]
**Availability:** [InStock / OutOfStock / PreOrder]

**Reviews (सिर्फ अगर real):**
- Aggregate rating value: [5 में से number]
- Aggregate review count: [number]
- Sample individual reviews (optional, 1-3): हर एक में author + rating + text

CRITICAL: aggregateRating include मत करें जब तक page पर real, visible, verifiable reviews न हों। Fake या fabricated aggregateRating manual actions earn करता है और fraud है। Generating से पहले confirm करें।

Validation-ready JSON-LD output करें।
```

---

## Common schema mistakes जो kit flag करेगा

- **FAQ schema उन questions के साथ जो page पर नहीं हैं।** Violation। मत करें।
- **HowTo schema उस content पर जो actually how-to नहीं है।** "How to think about pricing" essay है; "How to migrate from HubSpot to Pipedrive" qualify कर सकता है।
- **Product schema aggregateRating बिना real reviews के।** यह Google manual action का सबसे fast paths में से एक है।
- **Article schema `dateModified` के साथ जो `datePublished` से पुराना हो।** Validators flag करते हैं; आप freshness boost भी miss करते हैं।
- **Content के लिए गलत `@type`।** Comparison article Article है, Product नहीं।
- **Article schema पर `mainEntityOfPage` missing।** Richer search results के लिए required।

---

## कैसे validate करें

Shipping से पहले, schema को इनसे चलाएं:

- Google का Rich Results Test (`search.google.com/test/rich-results`) — rich results eligibility confirm करता है
- Schema.org Validator (`validator.schema.org`) — JSON-LD well-formed है confirm करता है

अगर कोई fail हो, publish से पहले fix करें। Broken schema ship मत करें; यह आपको no schema से अधिक cost करता है।
