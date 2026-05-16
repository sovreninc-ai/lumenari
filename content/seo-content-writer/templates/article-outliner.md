# Keyword-Clustered Article Outliner

The outline is where ranking is won or lost. If the structure is wrong, no amount of clever writing fixes it. This template is the prompt that turns "I want to rank for X" into a fight-ready outline.

---

## What this template does

You give it: a primary keyword, your site context, and the current top 3-5 results from the live SERP. It returns:

1. Intent classification (informational / commercial / navigational / transactional)
2. A read of the SERP — what's winning and why
3. A full outline with H1, H2s, suggested H3s, and key points per section
4. Secondary keyword clusters grouped by H2
5. Internal-link anchor suggestions (named, not generic)
6. PAA (People Also Ask) opportunities surfaced as FAQ H3s
7. Meta title (50-60 chars) and meta description (140-160 chars)
8. Schema recommendation
9. E-E-A-T injection point — where your real experience needs to show up

---

## The prompt

Paste this into your AI of choice. Fill in the bracketed fields.

```
You are the SEO Content Strategist.

I want an outline for an article targeting:

**Primary keyword:** [keyword]
**Estimated monthly volume:** [N — or "unknown"]
**Search intent (my guess):** [informational / commercial / transactional / "you tell me"]

**My site context:**
- URL: [domain.com]
- What we publish: [niche + format]
- Reader profile: [who they are, what they want]
- Domain Authority ballpark: [N — or "small site / mid / large"]
- Existing relevant pages on my site (optional): [list URLs and titles]

**SERP top results (paste the current top 5 if possible):**
1. [URL] — [title] — [your read: word count? format? angle?]
2. [URL] — [title] — [read]
3. [URL] — [title] — [read]
4. [URL] — [title] — [read]
5. [URL] — [title] — [read]

**SERP features I can see:**
- Featured snippet: [yes/no — if yes, who owns it]
- People Also Ask: [yes/no — if yes, paste the 4 questions]
- Video carousel: [yes/no]
- Image pack: [yes/no]
- AI Overview: [yes/no]

**My differentiator angle (if I have one):**
[1-2 sentences on why I can write a better version — first-hand experience, unique data, contrarian POV, etc.]

Give me:
1. Intent classification (with a one-sentence justification)
2. SERP read (what's working, what's the gap)
3. Full outline (H1 + H2s with intent per section, key points, secondary keywords)
4. Internal link suggestions (3-5 named anchors)
5. PAA H3s if applicable
6. Meta title + meta description
7. Schema recommendation
8. E-E-A-T injection plan
```

---

## Worked example — "best CRM for solopreneurs"

Here's what a real run of this template looks like end-to-end.

### Input

```
Primary keyword: best CRM for solopreneurs
Estimated monthly volume: ~1,900
Search intent (my guess): commercial

My site context:
- URL: solo-saas-reviews.com
- What we publish: longform SaaS reviews and comparisons for one-person businesses
- Reader profile: freelancers, consultants, indie operators evaluating tools
- DA ballpark: 52
- Existing relevant pages:
  - /best-invoicing-software-for-freelancers (DA driver, ranks #4)
  - /honeybook-vs-dubsado (decent traffic)
  - /crm-pricing-teardown (older, ranks #11)

SERP top results:
1. Zapier blog — "The 18 best CRMs for solopreneurs in 2025" — 4,200 words, listicle, weak POV
2. HubSpot blog — "Best CRM for solopreneurs (and why)" — 2,800 words, soft-promotional
3. Substack writer review — "I tested 5 CRMs for 90 days as a freelancer" — 1,400 words, strong personal POV
4. Capterra category page — generic
5. G2 category page — generic

SERP features:
- Featured snippet: yes, currently held by HubSpot, short paragraph definition
- People Also Ask: yes — (1) What is the best free CRM for solopreneurs? (2) Do solopreneurs need a CRM? (3) Is HubSpot good for solopreneurs? (4) What is the easiest CRM to use?
- Video carousel: no
- Image pack: no
- AI Overview: yes, citing the Substack and HubSpot

Differentiator angle: I actually paid for and used 7 CRMs for 90 days each. I have real screenshots, real data on time-to-first-deal-logged, real cancellation receipts.
```

### Expected output from the AI

> **Primary keyword:** best CRM for solopreneurs (vol ~1,900/mo)
> **Intent:** Commercial. The query implies the user is in evaluation mode — they want a recommendation, not a definition. "Best" + "for [audience]" is classic commercial intent.
>
> **SERP read:**
> - Top 3 formats: two listicles + one personal review
> - Word count range: 1,400 (Substack) to 4,200 (Zapier). HubSpot in the middle at 2,800.
> - The Substack piece at #3 is ranking up despite being the shortest because it has the only authentic POV. Zapier and HubSpot both feel like they were written from a brief, not from use.
> - The featured snippet is short and definitional — winnable with a 40-50 word answer to "what is a CRM for solopreneurs" or "do solopreneurs need a CRM" near the top of the page.
> - The AI Overview already cites the Substack piece. That tells us Google is rewarding real-test content for this query.
> - **The gap:** none of the top 3 has serious data — time-to-value, real cancellation friction, real pricing-tier comparison with the limits of free plans. That's your opening.
>
> **Author/byline considerations:** This article only works if it's bylined by someone who actually used the 7 CRMs. If that's you, lead with it: "I'm a [your context]. Over 90 days I paid for and tested [list]. Here's what I kept and what I cancelled." If you're not the tester, hire or partner with one — don't fake it; Google's getting better at smelling it.
>
> **Outline:**
>
> **H1:** Best CRM for Solopreneurs: 7 Tested for 90 Days (~58 chars)
>
> **H2: Do solopreneurs actually need a CRM?**
> Intent: answers the most-asked PAA, captures the featured snippet, and sets up the rest.
> Key points: 40-word answer in the first paragraph. Then the honest version — most solopreneurs under 20 clients don't need one yet, but here's when it flips.
> Internal link: link to `/crm-pricing-teardown` from anchor text "CRM pricing tiers"
> PAA: yes — this section also covers PAA #2
>
> **H2: How I tested these 7 CRMs**
> Intent: establishes E-E-A-T. This is the section that makes Google trust the rest.
> Key points: timeline (90 days each), what got tested (setup time, time to first deal logged, daily-use friction, cancellation friction), what didn't (enterprise features, ungated team plans).
> Internal link: none yet — could earn one with a screenshot gallery as a sub-page later.
>
> **H2: The 7 CRMs, ranked**
> Intent: the main meat. Each subhead is one CRM with a clear verdict.
> Key points: each entry has a 200-word block with: tier picked, monthly cost, 1-line verdict, what worked, what broke, would I keep it.
> Internal link: link to `/honeybook-vs-dubsado` from "HoneyBook vs. Dubsado deep dive" where relevant.
> Secondary keywords to weave naturally: "free CRM for freelancers," "CRM for one-person business," "simple CRM," "lightweight CRM."
>
> **H2: Free CRMs: which one I'd actually pick** (covers PAA #1)
> Intent: capture the "free" modifier traffic without making the whole article about free.
> Key points: HubSpot Free is the obvious default; the honest gotcha at 1,000 contacts; what to use if you're under 25 clients (a Notion template often beats every free CRM).
> Internal link: none — but if you have a Notion CRM template page, link it.
>
> **H2: Is HubSpot good for solopreneurs?** (covers PAA #3)
> Intent: answer the brand-specific PAA without making the article HubSpot-vs-everyone.
> Key points: 100-150 words. Honest answer (yes, with caveats). Where it overserves a solopreneur.
>
> **H2: What I'd actually pick — and the boring reason why**
> Intent: differentiator section. Strong opinion, no fence-sitting.
> Key points: name one winner. Name the runner-up. Name the one to avoid. Receipts.
>
> **H2: How to switch CRMs without losing data**
> Intent: capture the long-tail "how to migrate" intent + give the article practical value.
> Key points: export formats, what doesn't transfer, the 1-week parallel-run approach.
> Internal link: if you have a `/data-migration-guide` page, link it.
>
> **Frequently asked questions**
> H3: What is the easiest CRM to use for solopreneurs? *(covers PAA #4)*
> H3: How much should a solopreneur pay for a CRM?
> H3: Can I use Notion as a CRM?
> H3: When should a solopreneur upgrade from a spreadsheet to a CRM?
>
> **Meta title:** Best CRM for Solopreneurs: 7 Tested in 90 Days (52 chars)
>
> **Meta description:** Paid for and used 7 CRMs for 90 days each as a one-person business. Here's the one I kept, the one I cancelled fastest, and what the comparison sites get wrong. (160 chars)
>
> **Schema recommendation:** Article + FAQPage. Skip Product schema unless you're adding individual product review pages — the article is comparative, not a single-product review.
>
> **E-E-A-T injection plan:**
> - First-person opening: "I'm [name], I run [business type], and I pay for tools out of pocket. Here's what 90 days of testing taught me."
> - Real screenshots in the H2 for each CRM (signup screen, dashboard, cancellation flow)
> - Real numbers: time-to-first-deal-logged, monthly cost paid, cancellation friction score (your own scale)
> - Author bio at the bottom with role + tenure + a link to your other reviews
> - If you've taken money from any of the CRMs (affiliate, sponsorship), disclose at the top, not the bottom

---

## Common outline mistakes the kit will flag

- **No section anchoring the featured snippet.** If the SERP has a featured snippet, you want your H2 to answer it in the first 40-60 words.
- **PAA questions ignored.** If People Also Ask is on the SERP, you're leaving an FAQ section win on the table.
- **One giant section.** If an H2 has 600+ words under it, split it. Search results scan for H2s and H3s.
- **No internal links named.** "Link to related content" doesn't help anyone. Name the anchor and the target.
- **Meta description that just rewrites the H1.** Google rewrites those. Write a real two-sentence promise.
- **No E-E-A-T injection.** The outline goes nowhere if there's no plan for first-person experience.

---

## How to use the outline once you have it

1. Read it once. Disagree with anything? Ask the AI to defend the choice or revise.
2. Fill in the placeholders that need YOUR data (real numbers, real screenshots, real anecdotes).
3. Approve the outline before asking for the full draft. Don't let the AI write 2,500 words and then realize the structure is off.
4. Generate the draft section-by-section. The optimization pack handles this — each section opens with a featured-snippet-ready answer, then deepens.
5. Run the draft past the meta + schema generator (`templates/meta-and-schema.md`) before shipping.
