# CMA Prompt + Three Worked Comp Scenarios

Comparative market analysis prompts that produce a defensible price range, not a single number generated from averages. Three scenarios because real listings rarely come with clean comps.

---

## The master CMA prompt

Paste this in. The system prompt (`optimization-pack.md`) handles tone and structure; this gives the AI the inputs it needs.

```
Run a CMA for me.

Subject property:
- Address or neighborhood: [name]
- Beds / Baths / Sqft / Lot: [details]
- Year built: [year]
- Condition (1-10): [#]
- Notable features that affect value: [list 3-5]

Comparable sales (3-6, sold last 180 days, within ~1 mile, similar profile):

Comp 1:
- Address: [name]
- Sold price: $[amount]
- Sold date: [date]
- Beds / Baths / Sqft / Lot / Year: [details]
- Condition: [#]
- DOM: [#]
- One sentence on how it compares to subject: [text]

Comp 2:
[same structure]

Comp 3:
[same structure]

(continue for as many as you have, up to 6)

Currently active or pending (2-3 if available):

Active 1:
- Address: [name]
- List price: $[amount]
- DOM: [#]
- One sentence on how it compares: [text]

(continue)

My read:
[Even a rough guess. "I think this is worth $X to $Y because Z." This anchors the analysis to my judgment instead of pure data averaging.]

Output I want:
- Price range (low / likely / high)
- 2-3 sentences explaining the spread
- 3-5 questions to ask the seller before finalizing list price
- Anything you noticed in the comps that I should walk into the listing appointment ready to discuss
```

---

## Scenario 1: Clean comps, tight spread

You have 4-5 strong comps within the last 90 days, all within 10% of the subject's profile. This is the easy case — the AI's job is to confirm your read and surface one or two things you might have missed.

### Inputs

**Subject:** 3-bed / 2-bath / 1,640 sqft ranch in Sugar Land, TX. 0.18 acre lot. Built 1998. Condition 7/10 — recent kitchen, original bathrooms. Two-car garage. Updated HVAC (2022).

**Comp 1:** Same subdivision, 1,580 sqft, sold 38 days ago at $385,000. Similar updates. DOM 14.

**Comp 2:** Adjacent subdivision, 1,700 sqft, sold 62 days ago at $402,000. Fully renovated baths (subject is not). DOM 9.

**Comp 3:** Same subdivision, 1,610 sqft, sold 71 days ago at $379,000. Original kitchen. DOM 21.

**Comp 4:** Same subdivision, 1,720 sqft, sold 22 days ago at $398,000. Pool. DOM 7.

**Active:** Same subdivision, 1,680 sqft, listed at $409,000, 31 days on market. Fully updated.

**My read:** Probably $388-395K. The pool comp and the renovated-bath comp are pulling up; the original-kitchen comp is pulling down. I'm thinking $390K list.

### Output (what the AI should produce)

```
CMA — Subject: 3/2/1640 ranch, Sugar Land

Comp summary:
- Comp 1 ($385K, 38d ago, 1580 sqft): closest match — minor downward adjustment for sqft
- Comp 2 ($402K, 62d ago, 1700 sqft): pull up from renovated baths; subject is not
- Comp 3 ($379K, 71d ago, 1610 sqft): pull down from older kitchen; subject is updated
- Comp 4 ($398K, 22d ago, 1720 sqft): pool premium roughly $8-12K; remove for fair compare ≈ $387-390K
- Active 1 at $409K, 31 DOM: ceiling signal — fully updated and sitting

Price range:
- Low: $385,000
- Most likely: $389,000-$392,000
- High: $396,000 (only with strong showing traffic in week one)

Explanation: Your subject sits cleanly between the original-kitchen comp and the renovated-bath comp, which is exactly where the price should land. The pool comp adjusts down for the missing pool. The active at $409K has been sitting 31 days — that's a clear ceiling signal that the market won't reward fully renovated pricing without renovated baths.

Your read of $390K is well-supported. I'd suggest pricing at $389,900 to land just below the round number, with room to negotiate to $385K if needed.

Questions to ask the seller before finalizing:
1. Are they firm on price or do they need to move by a specific date? That changes the strategy.
2. Have any neighbors listed and pulled recently? Off-market activity matters.
3. Will they pre-list the HVAC documentation (2022 install)? It's a real differentiator vs Comp 3.
4. What's their floor? Define walk-away before week one.
5. Are they open to a pre-inspection? Sugar Land slab-on-grade in late-90s builds often surfaces foundation questions during buyer inspection — getting ahead of it can save 3-5% on the back end.

Walk into the appointment ready to discuss: why the active at $409K is sitting (it's a pricing ceiling lesson), and whether they want to invest in either the bathrooms or staging before going live.

---
Things to verify before publishing:
- Confirm pool adjustment estimate against your market
- Confirm Comp 4 sold price didn't include seller concessions
```

---

## Scenario 2: Weak comps, defensible price anyway

You have one okay comp, two stretches, and you need to walk into a listing appointment tomorrow. This is the hard case — and the AI is most useful here because it forces you to articulate the adjustments instead of guessing.

### Inputs

**Subject:** 5-bed / 4-bath / 3,800 sqft custom contemporary in a small enclave in Boulder, CO. 0.5 acre lot. Built 2019. Mountain views from the primary suite and great room. Condition 10/10.

**Comp 1:** Same enclave, 3,600 sqft, sold 11 months ago at $2.45M. Custom but older finish (2016 build). DOM 67.

**Comp 2:** 1.2 miles away, 4,100 sqft, sold 4 months ago at $2.95M. New construction, no views. DOM 41.

**Comp 3:** 0.8 miles away, 3,200 sqft, sold 6 months ago at $2.20M. 2012 build, partial mountain view. DOM 22.

**Active:** Same enclave, 4,000 sqft, listed at $3.1M, 89 days on market.

**My read:** Somewhere between $2.7M and $2.95M, but I genuinely don't know.

### Output

```
CMA — Subject: 5/4/3800 custom contemporary, Boulder

Honest assessment up front: this is a thin comp set. The strongest signal is Comp 2 (new construction, 4 months old, $2.95M). But Comp 2 has no views and the subject does, and Comp 2 is 8% larger. The other two comps require significant adjustments.

Comp summary:
- Comp 1 ($2.45M, 11 months ago, 3600 sqft): right enclave but 3-year-old transaction in a market that has moved; adjust upward roughly 8-12% for time
- Comp 2 ($2.95M, 4 months ago, 4100 sqft): cleanest recent transaction but lacks views and is 8% larger
- Comp 3 ($2.20M, 6 months ago, 3200 sqft): smaller, older, partial view — directional only
- Active at $3.1M, 89 DOM: a real ceiling signal — that level of pricing in this enclave has not closed in nine months

Price range:
- Low: $2.75M
- Most likely: $2.85M-$2.95M
- High: $3.0M (aggressive — requires multiple-offer dynamics in the first 10 days)

Explanation: The view premium in this enclave runs ~5-8% based on prior cycles, which puts the subject at parity with Comp 2 or slightly above despite being 8% smaller. The aging Comp 1 transaction, when time-adjusted, lands around $2.7-2.8M for a slightly smaller and less-updated home, which supports the lower end of the range. The active at $3.1M is the data point that argues against pricing above $3.0M: a similar-sized home in the same enclave has not found a buyer in three months at that level.

Recommendation: $2,895,000 list, with a defensible floor at $2.75M and a stretch ceiling at $3.0M only if Week 1 shows strong showing volume.

Questions to ask the seller:
1. What did they pay, when, and what have they put in? This anchors their expectation.
2. Are there comps off-market in the enclave that I don't have access to? Custom-home owners sometimes know.
3. How long can they sit if it doesn't sell in 60 days? The active at $3.1M has been on for 89 — your seller needs to understand what that signals.
4. Are they willing to pre-list with professional photography by a Boulder-specific architectural photographer? It matters at this price point.
5. What's their walk-away number? Define it before going live.

Walk into the appointment ready to discuss: the 89-day active and why pricing above $3M is hard to defend; the view premium as the key differentiator vs Comp 2; the seller's timeline as the strategy driver.

---
Things to verify before publishing:
- Time adjustment factor — confirm against Boulder year-over-year sale price index
- Active comp's history (price reductions? off-market then back on?)
- Subject's full materials list — custom contemporaries vary widely; spec details affect the premium
```

---

## Scenario 3: One trophy comp pulling the number

A neighbor's house just sold for a number that defies the rest of the comp set. Your seller has heard about it and now thinks their house is worth the same. The AI's job here is to help you have the honest conversation.

### Inputs

**Subject:** 3-bed / 2-bath / 1,900 sqft 1970s split-level in a Toronto neighborhood. Original kitchen, original baths, oil heat. 30 x 120 lot.

**Comp 1:** Across the street. 3-bed / 3-bath / 2,200 sqft. Fully renovated 2024 (kitchen, two baths, finished basement, new mechanical). Sold last week at $1.85M. DOM 8.

**Comp 2:** Two blocks away. 3-bed / 2-bath / 1,950 sqft. Updated kitchen 2019, original bath. Sold 3 months ago at $1.42M. DOM 28.

**Comp 3:** Same street, four houses down. 3-bed / 2-bath / 1,820 sqft. Original throughout. Sold 5 months ago at $1.31M. DOM 41.

**Active:** Three blocks away. 4-bed / 3-bath / 2,300 sqft, renovated, listed at $1.95M, 18 days on market.

**Seller's read (the agent's note):** "Seller saw Comp 1 sell at $1.85M and wants to list at $1.79M."

### Output

```
CMA — Subject: 3/2/1900 1970s split-level, Toronto

Direct assessment: Comp 1 is not a comp for this property. It is the value of this property after $400K-500K of renovation work.

Comp summary:
- Comp 1 ($1.85M, last week, 2200 sqft, fully renovated 2024): the trophy comp. Adjusts down by approximately $400-500K for the renovation gap, plus another $50-80K for sqft delta. Adjusted to subject condition: ~$1.30M-$1.40M.
- Comp 2 ($1.42M, 3 months ago, 1950 sqft, partial updates): the most relevant data point. Subject is less updated than Comp 2. Adjust down ~$50-75K.
- Comp 3 ($1.31M, 5 months ago, 1820 sqft, original): closest condition match. Time-adjust slightly upward; adjust down for slightly smaller sqft. Lands around $1.32-1.35M.
- Active at $1.95M (4 bed renovated): not directly relevant — different bed count and condition tier.

Price range:
- Low: $1.30M
- Most likely: $1.32M-$1.37M
- High: $1.40M (only if showing traffic is strong in the first 10 days, with multi-offer dynamics)

Explanation: The seller has anchored to the wrong comp. Comp 1 reflects what a renovated home of similar bones sells for. The subject, in original condition with original mechanicals, is in the $1.30-1.40M range — directly supported by Comp 2 and Comp 3. Listing at $1.79M will produce showings from buyers who walk in expecting Comp 1 condition and leave disappointed. That's how houses sit on market for 60+ days and end up selling at the price they should have started at, minus the price-reduction stigma.

Recommendation: List between $1,349,000 and $1,389,000. The most likely sale price is in the low $1.3Ms. If the seller wants to push toward $1.4M, they need to spend $20-40K on cosmetic updates (paint, refinish floors, kitchen hardware, light fixtures) before going live.

Questions to ask the seller:
1. Have they walked through Comp 1? If not, suggest they do. The difference is visible and tangible.
2. Are they open to a 2-week pre-list refresh? $20K of paint + floors typically returns $40-60K.
3. What's their timeline? If they have to move in 90 days, pricing strategy is different than if they have 9 months.
4. Are they willing to look at the seller's net at $1.79M (likely 90+ DOM and a price drop) vs $1.37M priced right (likely 14-21 DOM and possible multi-offer)? The net is often closer than they think.
5. Are they emotionally tied to the $1.79M number, or did the neighbor mention it once and it stuck? Different problem, different conversation.

Walk into the appointment ready to discuss: the renovation delta on Comp 1, the seller's net math (the $400K isn't real money to them), and the pre-list refresh option.

---
Things to verify before publishing:
- Comp 1 renovation scope and cost (confirm with listing agent if possible — sometimes "fully renovated" overstates the work)
- Subject's lot specifics (is the 30x120 zoned for severance/laneway? That's a value lever)
- Toronto market — recent shifts in days-on-market for unrenovated stock
```

---

## When to escalate beyond the AI

The AI is a sharpening tool. There are times to put it down and pick up the phone:

- Estate sales where the heirs disagree
- Pre-marital or divorce-driven sales (often need a written letter of opinion, not a CMA chat)
- Tear-down or land-value scenarios — get a builder's letter on top of the CMA
- Anything where the subject sits in a micro-market (one street, one building, three comps in three years) — call a local appraiser, not the AI

The CMA prompt above is meant to make the 80% case faster and more defensible. The 20% that's actually hard still needs a human ear.
