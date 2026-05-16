# Lumenari SEO Strategy

The long-term organic discovery playbook. Pairs with `LAUNCH_DISCOVERY_PLAYBOOK.md`
(which is one-shot tactical work). This document is the slow compounding system
that produces traffic 6-24 months out. Owner: Chris.

Lumenari competes against SkillsMP, Agensi, and the long tail of GitHub-hosted
skill catalogs. We can't out-spend them on ads. We *can* out-publish, out-curate,
and out-structure them on search. That's this doc.

---

## 1. Strategic posture

The competitive landscape on "Claude skills" queries today (May 2026):

- **GitHub-hosted catalogs** rank well for `awesome claude skills` and similar
  because backlinks + age. Hard to displace head-to-head; we win by owning the
  *buyer* queries instead (use-case + role queries) where buyers actually search.
- **SkillsMP / Agensi** rank for "skill marketplace" but their on-page SEO is
  shallow — 80-word product descriptions, no FAQ schema, no comparison content.
  Beatable.
- **ChatGPT / OpenAI** dominate the head term `chatgpt prompts`. We don't fight
  there. We rank on the long tail: `best claude skill for [role]`, `[task] with
  claude`, `claude vs chatgpt for [use case]`.

The strategy: programmatic + editorial + structured data. Every page ships with
JSON-LD, hreflang across 6 locales, dynamic OG, and clean canonicals. We win on
machine-readability first, then content depth, then backlinks.

---

## 2. Keyword target list (50 primary)

Volumes are rough SEMrush/Ahrefs estimates (US, en-US) as of May 2026. Treat as
directional, not gospel. Recheck quarterly.

### Tier A — high intent, high volume, head-of-funnel (12)

| Keyword | Est. MSV | Difficulty | Current rank | Target page |
|---|---|---|---|---|
| claude skills | 8,100 | 32 | not ranking | `/` (homepage) |
| claude prompts | 14,800 | 38 | not ranking | `/kits` |
| best claude skills | 1,300 | 24 | not ranking | `/kits` |
| claude prompt library | 880 | 22 | not ranking | `/kits` |
| skill.md | 590 | 12 | not ranking | `/blog/skill-md-format-explained` |
| skill.md format | 320 | 8 | not ranking | `/blog/skill-md-format-explained` |
| claude vs chatgpt | 9,900 | 41 | not ranking | `/blog/claude-vs-chatgpt-sales-outreach-2026` |
| claude vs chatgpt for sales | 210 | 18 | not ranking | same as above |
| claude api use cases | 720 | 22 | not ranking | `/api-platform` |
| claude system prompts | 1,600 | 28 | not ranking | `/kits` |
| chatgpt vs claude 2026 | 480 | 24 | not ranking | `/blog/claude-vs-chatgpt-sales-outreach-2026` |
| ai skill marketplace | 390 | 18 | not ranking | `/` |

### Tier B — programmatic role queries (use-case landing pages) (20)

These are the engine of the SEO play — one page per role, prerendered across 6
locales = 300 prerendered pages out of the box. Each ranks for 2-4 long-tail
variants.

| Keyword | Est. MSV | Page |
|---|---|---|
| best claude skill for real estate agents | 70 | `/best-claude-skill-for/real-estate-agents` |
| best claude skill for recruiters | 110 | `/best-claude-skill-for/recruiters` |
| best claude skill for solopreneurs | 50 | `/best-claude-skill-for/solopreneurs` |
| best claude skill for sales | 320 | `/best-claude-skill-for/sales-cold-outreach` |
| best claude skill for freelancers | 140 | `/best-claude-skill-for/freelance-consultants` |
| best claude skill for coaches | 90 | `/best-claude-skill-for/coaches` |
| best claude skill for accountants | 60 | `/best-claude-skill-for/accountants` |
| best claude skill for lawyers | 110 | `/best-claude-skill-for/lawyers` |
| best claude skill for marketers | 170 | `/best-claude-skill-for/marketers` |
| best claude skill for copywriters | 130 | `/best-claude-skill-for/copywriters` |
| best claude skill for ecommerce | 90 | `/best-claude-skill-for/ecommerce-store-owners` |
| best claude skill for saas | 70 | `/best-claude-skill-for/saas-founders` |
| best claude skill for hr | 80 | `/best-claude-skill-for/hr-teams` |
| best claude skill for teachers | 110 | `/best-claude-skill-for/teachers` |
| best claude skill for writers | 220 | `/best-claude-skill-for/writers` |
| best claude skill for product managers | 90 | `/best-claude-skill-for/product-managers` |
| best claude skill for ux designers | 60 | `/best-claude-skill-for/ux-designers` |
| best claude skill for developers | 380 | `/best-claude-skill-for/software-engineers` |
| best claude skill for data analysts | 70 | `/best-claude-skill-for/data-analysts` |
| best claude skill for founders | 110 | `/best-claude-skill-for/founders` |

### Tier C — comparison head-to-head queries (8)

These are the comparison pages. Lower volume each but very high intent —
visitor is in the decision stage.

| Keyword | Est. MSV | Page |
|---|---|---|
| lumenari vs skillsmp | 30 | `/vs/skillsmp` |
| lumenari vs agensi | 20 | `/vs/agensi` |
| skillsmp alternative | 90 | `/vs/skillsmp` |
| agensi alternative | 40 | `/vs/agensi` |
| github skills vs marketplace | 50 | `/vs/github-skills` |
| chatgpt store alternative | 880 | `/vs/chatgpt-store` |
| claude skills marketplace | 110 | `/` |
| openai gpt store alternatives | 320 | `/vs/chatgpt-store` |

### Tier D — long-tail blog queries (10)

Editorial. Built once, refreshed every 6 months.

| Keyword | Est. MSV | Page |
|---|---|---|
| how to write a real estate listing with ai | 590 | `/blog/claude-real-estate-listing-3-minutes` |
| ai prompts for consultants | 480 | `/blog/10-prompts-freelance-consultants` |
| ai prompts for recruiters | 720 | `/blog/recruiter-60-percent-sourcing-case-study` |
| recruiter ai tools | 390 | same |
| how does claude work | 4,400 | future blog post |
| claude code skills | 590 | future blog post |
| how to install a claude skill | 210 | future blog post |
| claude skill examples | 320 | future blog post |
| claude prompts for sales | 480 | future blog post |
| claude prompts for marketing | 590 | future blog post |

---

## 3. Backlink strategy

Lumenari starts with ~0 referring domains. Six-month target: 80-120 referring
domains. Twelve-month target: 250-400.

### High-leverage backlink sources

1. **AI tool directories** (one-time submissions, listed in
   `LAUNCH_DISCOVERY_PLAYBOOK.md`). Expect ~25-40 of these to result in a
   linked listing. Quality varies — most are DR 20-50, a few (TheresAnAIForThat,
   Futurepedia) are DR 70+.

2. **Roundup placements**. Pitch yourself into "best AI tools for X" listicles
   on established blogs. Search `best ai tools for [role]` and email the top 30
   results with a 2-sentence intro + value prop + link. Conversion ~10%.

3. **Guest posts**. Three to write in Q1:
   - "What we learned curating 100 AI skill kits" — submit to Indie Hackers,
     The Hustle, FirstRound Review (long shot but worth pitching).
   - "Why the SKILL.md format is the missing piece in AI productivity" — submit
     to Towards Data Science, The Prompt Engineering Newsletter, Lenny's.
   - "Inside the marketplace where Claude users actually buy skills" — submit
     to TLDR AI, Ben's Bites, The Rundown AI.

4. **Podcast appearances**. Aim for 6-10 podcast spots in year 1. Targets:
   Indie Hackers, Build Your SaaS, The Prompt Engineer's Daily, AI Breakdown,
   Latent Space (long shot), The MFM Podcast (very long shot).

5. **HackerNews "Show HN"**. Single biggest single-shot link source if it
   front-pages. Template + timing in `LAUNCH_DISCOVERY_PLAYBOOK.md`. A single
   front-page Show HN can produce 30-80 referring domains in 48 hours.

6. **Customer case studies + co-marketing**. Once 5-10 clubs / customers are
   live, ask for a customer story page link from each of their sites.
   Conversion ~30%.

7. **Reddit / Discord / community shares**. These don't count as ranking-grade
   backlinks (nofollow) but they drive direct traffic and Google does
   measure visit signals. r/ClaudeAI, r/ChatGPTPro, r/SaaS, indie-hacker
   communities.

### Anchor text discipline

- 40% branded ("Lumenari")
- 30% naked URL
- 15% partial-match ("Claude skill marketplace", "buy AI skill kits")
- 15% generic ("here", "this tool", "check it out")

Don't engineer exact-match anchor text. Google's spam team is good now.

---

## 4. Content publishing cadence

Minimum: 1 blog post per week. Cap: 2 per week (more than that and quality
drops without a dedicated editor).

### The 4-week rolling content plan

- **Week 1**: Use-case deep dive (1500-2000 words). Picks one use-case from
  `src/data/use-cases.ts` and goes deeper than the landing page. Internal-links
  to the matching kit. Ranks long-tail queries the landing page misses.
- **Week 2**: Comparison or vs piece. "Claude vs [competitor] for [task]".
  Honest, ~1500 words.
- **Week 3**: Educational / explainer. "How to do X with AI", "SKILL.md format
  explained", "Why structured prompts beat one-shot prompts". Broad reach.
- **Week 4**: Listicle or case study. "10 prompts for [role]", "How [persona]
  saved [time] with [kit]". Shareable, social-first.

This rotation hits the four major content-marketing intents (informational,
commercial, transactional adjacent, social proof) every month.

### Editorial standards

- 1200-2000 words minimum
- One H1, 3-6 H2s, occasional H3
- One internal link per H2 minimum, all to relevant kits or landing pages
- One external link to an authoritative source (signals trust)
- Original imagery — generated OG image at minimum, ideally one diagram or
  screenshot in-post
- Schema: BlogPosting on every post (already wired)
- Author: assign to Chris by default. Later, attribute to guest contributors.

### Republishing rhythm

Every 6 months, audit the top 10 posts by traffic. Update facts, refresh
timestamps, add new internal links, expand thin sections. Google rewards
freshness on competitive queries.

---

## 5. Internal linking structure

The site is built as a four-layer hub-and-spoke:

```
                      Homepage (/)
                          |
        ┌─────────────────┼─────────────────┐
        |                 |                 |
   /kits index      /best-claude-skill-for/  /blog
        |          (50 use-case pages)       (editorial)
        |                 |                 |
   Kit detail       <─────┘                 |
   (each kit)       (each links to its      ▼
        ▲           primary kit)         Each post
        |                                 links to
        └─────────────────────────────────  1-3 kits
```

### Linking rules

1. **Every kit detail page** links up to `/kits` (breadcrumb), to its primary
   use-case landing page (`/best-claude-skill-for/[useCase]`), and laterally
   to 2-3 related kits via `recommended-tools`.
2. **Every use-case landing page** links to its recommended kit, to the matching
   comparison page, and to a related blog post if one exists.
3. **Every blog post** links to 2-3 kits and to 1 use-case landing page.
4. **Comparison pages** link to the `/kits` index and to the recommendation
   wizard.
5. **The recommendation wizard's result page** links to the kit detail + the
   matching use-case landing page (re-entry into SEO surface).

### Forbidden internal-link patterns

- Don't link from `/account/*` or `/thanks` to public SEO pages (noindex
  surfaces shouldn't pass equity).
- Don't bloat the footer with every kit link — pick 5-8 evergreen anchors only.
- Don't internal-link with the same anchor text from 20+ places. Vary anchors.

---

## 6. Schema markup roadmap

What's shipped now (in `src/lib/structured-data.ts`):

- `Organization` on homepage layout
- `Product` on every kit detail page
- `BreadcrumbList` on kit detail, blog posts, use-case, and comparison pages
- `FAQPage` on pro, api-platform, kit detail (where FAQ exists), use-case, and
  comparison pages
- `WebSite` + `SearchAction` on homepage (sitelinks search box)
- `BlogPosting` on each blog post
- `SoftwareApplication` on the API platform page

### Next 6 months — schema additions

| Schema | Where | Why |
|---|---|---|
| `AggregateRating` on Product | Kit detail | Star ratings in SERP — depends on review system being built. |
| `Review` (individual reviews) | Kit detail | Pull from customer reviews once collected. |
| `Person` (author) | Blog posts | Authorship signals — even if just Chris for now. |
| `HowTo` | Blog tutorials | Step-by-step rich results. Add to `/blog/claude-real-estate-listing-3-minutes`. |
| `VideoObject` | Wherever YouTube embeds exist | Video carousel placements. |
| `Course` | Kit detail (if kit is teaching format) | Course rich results — debatable, test on one kit first. |
| `Service` on `/pro` | Pro plan landing | Service schema for subscription product. |

### Validation cadence

Run schema validation monthly via:
- Google's Rich Results Test (`https://search.google.com/test/rich-results`)
- Schema.org validator (`https://validator.schema.org/`)

Add a CI job in Q3 that runs `schemathesis` or equivalent over a sample of
prerendered pages to catch regressions early.

---

## 7. Locale strategy

Lumenari prerenders 6 locales (en/es/pt/de/fr/ja) via the existing
`[locale]` route segment. SEO play per locale:

- **en** — primary market. 80% of effort. All keyword targets above are en-US.
- **es** — secondary. Translate top-tier blog posts and use-case pages. Latin
  America AI adoption is rising fast and competition is weaker. Expect ~20%
  of en traffic at 1/3 the effort.
- **pt** — Brazil is a top-5 ChatGPT market. Same play as es.
- **de** — slower to take off but enterprise budgets. Focus on the API
  platform page in German.
- **fr** — moderate effort.
- **ja** — Japan is a major Claude / Anthropic market. Invest in clean ja
  translations of the homepage, /kits, and the top 5 use-case pages.

Hreflang is already wired across all pages. Don't break it.

### Translation rule

Machine translations + human review = OK for v1. Pure machine translation =
not OK long-term. Schedule a translator review of all top-30-traffic pages
in months 4-6.

---

## 8. Technical SEO checklist (monthly review)

- [ ] Core Web Vitals — all 3 in green for `/`, `/kits`, top 5 kit detail pages
- [ ] Sitemap submitted in Google Search Console + Bing Webmaster Tools
- [ ] Robots.txt allows everything we want indexed; disallows /account/, /thanks
- [ ] Canonicals correct on every page (no self-referencing loops)
- [ ] Hreflang correct on every page (no broken locales)
- [ ] No 404s linked from indexed pages (run Screaming Frog quarterly)
- [ ] No duplicate H1s
- [ ] No empty meta descriptions
- [ ] OG images render correctly on Twitter Card Validator + LinkedIn Post
      Inspector
- [ ] JSON-LD validates clean for all 7 schema types on a sample of pages
- [ ] Page weight under 200KB for all non-image-heavy pages
- [ ] No layout shift on hero on mobile

### Monitoring

- Google Search Console — set up by week 1 of launch
- Bing Webmaster Tools — set up by week 2
- Plausible analytics — already wired; add a `/dashboard` route for Chris's
  weekly check
- Ahrefs / SEMrush — paid tools, defer until month 3-4 unless free trials

---

## 9. The 12-month organic traffic target

| Month | Target sessions/mo | Target referring domains | Target indexed pages |
|---|---|---|---|
| 1 (launch) | 1,500 | 20 | 350 |
| 3 | 4,000 | 50 | 400 |
| 6 | 12,000 | 120 | 500 |
| 9 | 25,000 | 200 | 600 |
| 12 | 50,000 | 350 | 750 |

Caveats:

- These targets assume 1-2 blog posts/week and active backlink work.
- Months 1-3 are nearly all direct + referral, not organic. Organic compounds
  in months 4-6.
- A successful Show HN or ProductHunt launch can pull month 3 numbers forward
  by 30-45 days but doesn't change the long-curve trajectory.

---

## 10. What I'd do first if I had 4 hours this week

If Chris reads this and has 4 hours, prioritise in this order:

1. Set up Google Search Console + Bing Webmaster Tools, submit sitemap.
2. Submit to the top 6 AI tool directories from the launch playbook.
3. Pitch one guest post to a tier-2 publication (Indie Hackers, etc.).
4. Pick 5 indie creators in the AI productivity space and DM them about
   reviewing Lumenari. Offer free Pro access.
5. Write the next blog post — should be a comparison piece, in the rotation.

That's the highest-leverage 4 hours. Reading this doc cover-to-cover is hour
five.
