# Meta + Schema Toolkit

Two boring fields and one JSON block that move more traffic than most article rewrites. This file gives you the prompts to generate them and the worked examples to copy from.

---

## Part 1 — Meta titles

### What good looks like

- 50-60 characters (Google truncates around 600px on desktop; ~60 chars is the safe limit)
- Primary keyword in the first half
- A reason to click that isn't just the keyword match
- No clickbait, no all-caps, no needless `[2026]`

### The prompt

```
You are the SEO Content Strategist.

Generate 5 meta title variants for this article.

**Primary keyword:** [keyword]
**Article angle:** [one sentence on what this article actually argues or delivers]
**Intent:** [informational / commercial / etc.]
**Brand suffix (optional):** [e.g., " | YourBrand" — only if it fits in the char limit]

For each variant, give me:
- The title
- Character count (with brand suffix if used)
- The hook: what makes someone click it over the top 3 results

Avoid: clickbait, all caps, generic "[YEAR]" tagging unless the topic is genuinely time-sensitive.
```

### Worked example output — "best CRM for solopreneurs"

1. **Best CRM for Solopreneurs: 7 Tested in 90 Days** (52 chars) — hook: specificity + duration as proof
2. **Best CRM for Solopreneurs (One I Cancelled Fast)** (50 chars) — hook: contrarian receipt
3. **Best CRM for Solopreneurs: The Honest Comparison** (50 chars) — hook: "honest" implies the others aren't
4. **Best CRM for Solopreneurs: $X/mo Tools Compared** (47 chars) — hook: leads with price
5. **Best CRM for Solopreneurs: Notion Won Against 6 Apps** (53 chars) — hook: gives away the answer, drives the click for "wait, what"

The strongest of these depends on which differentiator the article actually leans into. #1 is the safest default. #5 only works if Notion really did win.

---

## Part 2 — Meta descriptions

### What good looks like

- 140-160 characters
- Two-sentence promise: what you deliver + why it's worth reading
- Don't restate the H1
- Don't end with "Read more!" (Google strips it)
- Include the primary keyword once, naturally

### The prompt

```
You are the SEO Content Strategist.

Generate 3 meta description variants for this article.

**Meta title:** [title you picked]
**Primary keyword:** [keyword]
**Article angle:** [one sentence on what this article actually argues or delivers]
**Top 3 things a reader will get from the article:** [bullet list]

For each variant:
- The description
- Character count
- Which "promise" it leads with
```

### Worked example output

For the CRM article:

1. **"Paid for and used 7 CRMs for 90 days each as a one-person business. Here's the one I kept, the one I cancelled fastest, and what every comparison site got wrong."** (160 chars) — leads with the duration proof

2. **"Most 'best CRM' lists are written from press releases. I actually tested 7 — daily-use friction, real costs, real cancellation flows. The verdict surprised me."** (158 chars) — leads with the contrast/contrarian angle

3. **"The best CRM for solopreneurs isn't the one with the longest feature list. After 90 days testing 7, here's the one worth paying for and the one to skip."** (152 chars) — leads with the thesis

If you're not sure which to pick, ship #1. The verb "paid for" does a lot of work — it signals first-hand cost and effort.

---

## Part 3 — Schema generators

### Which schema to use when

| Article type | Schema |
|---|---|
| Blog post, news article | Article |
| Article with an FAQ section that genuinely answers FAQ | Article + FAQPage |
| Step-by-step instructional ("How to X") | HowTo |
| Single product review page | Product (only with REAL reviews) |
| Comparison or listicle | Article (NOT Product unless you're reviewing one specific product) |

### Article schema prompt

```
You are the SEO Content Strategist.

Generate Article JSON-LD for this page.

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

Output validation-ready JSON-LD with all required + recommended properties. Use schema.org context.
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
  "description": "Paid for and used 7 CRMs for 90 days each as a one-person business. Here's the one I kept, the one I cancelled fastest, and what every comparison site got wrong.",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://solo-saas-reviews.com/best-crm-solopreneurs"
  }
}
```

Drop that inside a `<script type="application/ld+json">` block in the page's `<head>`.

### FAQ schema prompt

Only use this if the page actually has a visible FAQ section that answers these questions. Don't ship FAQ schema for questions that aren't on the page — that's a violation and earns a manual action.

```
You are the SEO Content Strategist.

Generate FAQPage JSON-LD for this page.

**Page URL:** [URL]
**FAQ Q&A pairs:**
1. Q: [question]
   A: [the answer as written on the page — full text]
2. Q: [question]
   A: [answer]
[Etc.]

Important: every Q&A here MUST be visible on the page. If it's not on the page, don't include it. Confirm before generating if there's any ambiguity.

Output validation-ready JSON-LD.
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

### How-To schema prompt

Only use for genuinely step-by-step instructional content. "How to start a podcast" with discrete steps qualifies. "How to think about your brand" doesn't — that's an essay, not a how-to.

```
You are the SEO Content Strategist.

Generate HowTo JSON-LD for this page.

**Headline:** [the H1, must start with "How to..."]
**Description:** [one-sentence summary]
**Total time:** [estimated, in ISO 8601 duration format — e.g., PT2H for 2 hours]
**Supply (optional):** [things the user needs to have]
**Tool (optional):** [tools needed]
**Steps:** [numbered list — each step has a name, text, and optionally an image URL]

Output validation-ready JSON-LD.
```

**Worked example output** (for "How to launch a podcast in a weekend"):

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

### Product schema prompt (with the warning)

```
You are the SEO Content Strategist.

Generate Product JSON-LD for this page.

**Product name:** [name]
**Description:** [one-paragraph]
**Image URL:** [main product image]
**Brand:** [brand name]
**SKU (optional):** [if applicable]
**Price + currency:** [e.g., "29.00 USD"]
**Availability:** [InStock / OutOfStock / PreOrder]

**Reviews (only if real):**
- Aggregate rating value: [number out of 5]
- Aggregate review count: [number]
- Sample individual reviews (optional, 1-3): each with author + rating + text

CRITICAL: Do not include aggregateRating unless the page has real, visible, verifiable reviews. Fake or fabricated aggregateRating earns manual actions and is fraud. Confirm before generating.

Output validation-ready JSON-LD.
```

---

## Common schema mistakes the kit will flag

- **FAQ schema with questions that aren't on the page.** Violation. Don't.
- **HowTo schema on content that isn't actually how-to.** "How to think about pricing" is an essay; "How to migrate from HubSpot to Pipedrive" might qualify.
- **Product schema aggregateRating without real reviews.** This is one of the fastest paths to a Google manual action.
- **Article schema with `dateModified` older than `datePublished`.** Validators flag it; you also miss the freshness boost.
- **Wrong `@type` for the content.** A comparison article is an Article, not a Product.
- **Missing `mainEntityOfPage` on Article schema.** Required for richer search results.

---

## How to validate

Before shipping, run the schema through:

- Google's Rich Results Test (`search.google.com/test/rich-results`) — confirms eligibility for rich results
- Schema.org Validator (`validator.schema.org`) — confirms the JSON-LD is well-formed

If either fails, fix before publish. Don't ship broken schema; it costs you more than no schema at all.
