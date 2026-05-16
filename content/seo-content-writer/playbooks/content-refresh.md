# Content Refresh Playbook

The highest-leverage SEO work you can do is rarely writing new articles. It's fixing the ones you already have. This playbook tells you when to update, when to rewrite, when to consolidate, and when to delete — plus the prompt that does each one safely.

---

## The refresh decision tree

Run every candidate article through this in order. Stop at the first match.

### Step 1: Pull the data

For each article you're considering, grab:

- Current Google rank for the primary keyword (Search Console)
- Average position trend over the last 12 months
- Click-through rate
- The current top 3 SERP results
- The article's `datePublished` and `dateModified`
- Backlinks pointing to the URL (Ahrefs, Semrush, or whatever you use)

10 minutes of data collection saves you from doing the wrong refresh.

### Step 2: Run the tree

**Q1: Is the article ranking page 1 or page 2?**
- YES → **Update in place.** Preserve the URL, preserve internal links, preserve backlinks. Just refresh substance.
- NO → continue.

**Q2: Is the article ranking page 3-5, and is the intent mismatched?**
(e.g., your article is a tutorial but the SERP now rewards comparison articles)
- YES → **Rewrite around the correct intent.** Keep the URL. Treat it as a new article using the old URL's authority.
- NO → continue.

**Q3: Do you have two articles competing for the same keyword?**
- YES → **Consolidate.** Pick the stronger URL (more backlinks, better current rank). Merge the better content into it. 301 the weaker URL to the stronger one.
- NO → continue.

**Q4: Has the query fundamentally changed?**
(e.g., the feature got renamed; AI Overview is eating clicks; the SERP shifted to video)
- YES → **Major rewrite.** New angle, new format if needed. Keep URL only if the old article still has enough relevance + backlinks to justify the URL preservation.
- NO → continue.

**Q5: Is the topic deprecated?**
(e.g., the product no longer exists; the law changed; the framework was retired)
- YES → **Delete and 301** to the closest related current article. If nothing is close, return a 410 (gone).
- NO → continue.

**Q6: Is the article ranking but losing traffic year-over-year?**
- YES → **Update in place + add depth.** Probably losing clicks to a newer article. Refresh the substance, add what's missing, update the meta.
- NO → leave it alone, monitor for another quarter.

---

## Pattern 1: Update in place (the most common refresh)

For articles ranking page 1-2 that just need a freshening.

### What you do

- Update outdated stats and facts
- Replace screenshots if the UI has changed
- Add new sub-sections if the topic has new dimensions
- Strengthen weak sections (the ones with low scroll depth in PostHog/Hotjar/etc.)
- Update internal links if you've published better related content since
- Update `dateModified` schema
- DO NOT change the URL
- DO NOT remove sections that are earning the rankings

### The prompt

```
You are the SEO Content Strategist.

I'm refreshing this article in place. The URL stays. Most of the structure stays.

**Article URL:** [URL]
**Primary keyword:** [keyword]
**Current rank:** [position]
**Current SERP top 3:** [paste]
**Last published / modified:** [dates]

**The article as it stands now (paste it):**
[full article]

What I want:
1. A diff-style list of what to change (with reasons)
2. New sections you'd add or sub-sections inside existing H2s
3. Outdated facts/stats that need updating (with "source needed" flags)
4. Updated meta title and description ONLY if the current ones are weak
5. Internal-link suggestions for the new sections

Do NOT rewrite sections that are working unless you can name a specific reason they're underperforming.
```

### Worked example output

> **Diff plan:**
>
> 1. **Update H2 #3 ("Pricing comparison")** — the table has 2024 pricing. HubSpot, Pipedrive, and Salesforce have all moved. Pull current pricing from each vendor's pricing page. *(source needed: each vendor's current pricing page)*
> 2. **Add a new H2 between current #4 and #5: "What changed in 2026"** — touches on the AI features each CRM now bundles. This is what the SERP is now ranking newer articles for. ~250 words.
> 3. **Strengthen H2 #5 ("Best for under 20 contacts")** — currently 180 words, you can double this with a real-test anecdote. The PAA data shows users are searching this specific cut.
> 4. **Update internal links** — your old version links to `/crm-pricing-teardown` which now redirects. Update to the current URL `/saas-pricing-deep-dive`.
> 5. **Meta title stays** (it's working, 54 chars, primary keyword in front).
> 6. **Meta description update** — current one is the H1 reworded. Replace with: "Tested 7 CRMs for 90 days each — refreshed for 2026 with new AI features, current pricing, and the one I'd actually pick today." (153 chars)
>
> **Sections you should NOT touch:**
> - The "How I tested these" section is your E-E-A-T spine and is earning the rank. Leave it.
> - The H1 stays. It's the title earning the click.
>
> **What's missing:**
> - You don't currently address "free CRM for solopreneurs" — the PAA shows real volume on that cut. Consider adding it as an H3 inside H2 #4.

---

## Pattern 2: Rewrite around new intent

When your article is ranking page 3-5 because Google now wants a different format for this query.

### Signal that intent has shifted

- The top 3 results today are a different format than when you published
- Your CTR is below 1% even at position 5-7 (meaning you're showing but not getting clicked)
- The PAA questions have changed
- An AI Overview has appeared

### What you do

- Keep the URL (it has authority)
- New outline matching the new SERP
- New H1, new meta title, new meta description
- Add a brief redirect-context note to anyone who linked the old version, OR keep enough of the original angle as a sub-section that those backlinks still feel relevant

### The prompt

```
You are the SEO Content Strategist.

I'm rewriting this article around new intent. URL stays.

**Article URL:** [URL]
**Primary keyword:** [keyword]
**Current rank:** [position]
**Current SERP top 3:** [paste]
**The article as it stands:**
[full text]

What I observed:
- [why I think intent shifted — what changed in the SERP]

What I want:
1. Intent classification of the NEW SERP
2. A new outline (same depth as the article outliner template)
3. Which (if any) sections from the old article should be preserved verbatim
4. Updated meta title + description
5. A note on backlink continuity — should I worry about losing any of them?
```

---

## Pattern 3: Consolidate two competing articles

When you discover you've cannibalized yourself.

### How to identify

- Search Console shows two of your URLs both impressing for the same keyword
- Both URLs hover at page 2-3 and never climb
- Neither has a clear edge in content depth or backlinks

### What you do

- Pick the surviving URL (more backlinks, or the one that more cleanly matches the query)
- Merge the better content from the losing URL into the survivor
- 301 the losing URL to the survivor
- Update all internal links pointing to the loser

### The prompt

```
You are the SEO Content Strategist.

I have two articles competing for the same keyword. I need to consolidate.

**Keyword:** [primary keyword]

**Article A:**
- URL: [A]
- Current rank: [position]
- Backlinks: [count]
- Published: [date]
- [paste full article]

**Article B:**
- URL: [B]
- Current rank: [position]
- Backlinks: [count]
- Published: [date]
- [paste full article]

What I want:
1. Pick the surviving URL with reasoning
2. A unified outline pulling the best from both
3. The full merged draft
4. A list of internal links currently pointing to the loser URL that need updating
5. The 301 plan
```

---

## Pattern 4: Major rewrite (query has fundamentally changed)

The hardest call. The article still ranks but the world moved. Examples: an AI Overview now answers the query so traffic dropped 60%; the framework you wrote about got deprecated; the search behavior shifted from text to video.

### What you do

- Major rewrite, often a new angle entirely
- Decide URL fate based on backlink value: if the URL has strong backlinks, keep it and rewrite; if not, fresh URL is fine
- Update meta, schema, internal links

This isn't really a "refresh" — it's a new article using the old URL's authority. Treat it like writing a new piece, using the article outliner template (`templates/article-outliner.md`).

---

## Pattern 5: Delete and 301

When the topic is genuinely deprecated.

### Examples

- A product you reviewed shut down
- A law you wrote about was replaced
- A framework you taught was retired
- A trend article whose moment passed and you're not interested in updating it

### What you do

- 301 the URL to the closest current article
- If nothing is close, return 410 (gone) so Google removes it cleanly
- Don't just delete and let it 404 — that's wasted backlink equity

---

## The SERP-intent analyzer prompt

Use this when you can't decide WHICH refresh pattern applies.

```
You are the SEO Content Strategist.

Help me classify what kind of refresh this article needs.

**Article URL:** [URL]
**Primary keyword:** [keyword]
**Current rank:** [position]
**12-month trend:** [improving / stable / declining]
**Top 3 SERP results today:** [paste]

**The article (paste):**
[full article]

Run my refresh decision tree. Tell me:
1. Which pattern fits (update in place / intent rewrite / consolidate / major rewrite / delete)
2. The reasoning
3. The first concrete step I should take
```

The output should be a clear "pattern X because Y" answer plus the first step. If the AI hedges or says "it depends," push it: "If you had to pick one, which?"

---

## Worked example — "what is HubSpot used for"

A real refresh decision. The article ranks #4. CTR is 0.8%. The SERP top 3 is now dominated by short, definition-style answers with an AI Overview citing two of them. The article currently is 1,800 words and starts with marketing pitch.

**Decision tree run:**
- Page 1? Almost (#4). Page 2 territory.
- Intent mismatch? Yes — the SERP wants short, definitional, fact-first content. The article is longform and marketing-leaning.
- Two competing articles? No.
- Query fundamentally changed? Yes-ish — AI Overview presence has compressed click value.
- Topic deprecated? No, HubSpot still very much exists.

**Verdict:** Pattern 2 (rewrite around new intent). Keep the URL (it has 12 backlinks). Restructure as a fact-first definitional piece, with a tight 50-word answer at the top, then expansions. Drop the marketing-pitch tone. Target the featured snippet directly.

**Expected outcome:** rank climbs from #4 to #1-2, but absolute click numbers may not jump dramatically because the AI Overview is eating the click anyway. The win is brand presence in the AI citations and recovering organic for branded variant queries.

---

## Common refresh mistakes the kit will flag

- **Changing the URL of an article ranking page 1.** You'll lose the rank and the backlink equity. Refresh in place.
- **Deleting an article without 301'ing.** Wasted backlinks, 404 errors in Search Console.
- **Refreshing without checking why traffic dropped.** Sometimes the article is fine and the QUERY dropped in volume. Check Search Console total impressions before assuming the article is the problem.
- **Refreshing too often.** Once every 6-12 months is the right cadence for most articles. Refreshing monthly looks suspicious to Google and burns your time.
- **Updating `dateModified` without actually updating substance.** Google catches this and discounts the freshness signal.
- **Removing sections that are earning the rankings.** Always look at scroll depth and time-on-section data before cutting.

---

## Refresh cadence — how to plan a year

A small content team can productively refresh 4-8 articles a month. A solo operator should target 2-3 per month, prioritized by:

1. Articles that have lost the most absolute traffic in the last 90 days
2. Articles ranking position 4-15 with high CTR potential
3. Articles linked from your high-traffic pages (refreshing these compounds the internal-link benefit)
4. Articles 18+ months old that haven't been touched

Run the refresh decision tree on each one. Pick the pattern. Execute. Don't refresh and republish all of them; some will tell you to delete or consolidate. That's the playbook working.
