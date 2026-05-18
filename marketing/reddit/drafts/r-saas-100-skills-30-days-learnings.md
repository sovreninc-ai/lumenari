# r/SaaS — "I shipped 100 AI skill kits in 30 days — what I learned"

**Target sub:** r/SaaS
**Post type:** Case study / lessons-from-shipping
**Why this post for this sub:** r/SaaS rewards lessons-learned posts with specific numbers. Direct product posts get removed; "here's what I learned" posts survive. This is the format that lets Lumenari appear without being the subject.
**When to post:** Saturday (Self-Promo Saturday) if you want the link to be allowed openly, OR Tuesday/Wednesday with the link omitted from the post and only added in comments if asked.
**Expected karma trajectory:** 100-500. Slightly lower if posted outside the Self-Promo Saturday thread but more discoverable for downstream traffic.
**Conversion expectations:** Low direct (mostly other builders) but high signal-quality. Affiliate inquiries, integrator interest, and SaaS founders evaluating you as a potential partner often come from these posts.
**Follow-up engagement:** Expect debates about whether $14-19 kits are too cheap, questions about the bundle economics, and asks about the API. Reply with specifics.
**Handling "is this self-promo" challenges:** Post is structured as lessons. Product is mentioned only in disclosure at the end. If a mod removes for self-promo, repost in next Self-Promo Saturday thread without changes.

---

## Title

**I shipped 100 AI skill kits in 30 days — 7 things that surprised me**

(Alt title: "100 SKUs in 30 days as a solo founder — what worked, what didn't")

---

## Body

I spent the last 30 days shipping the launch catalog for a productized info kit business — 100 AI skill kits across 17 categories, plus 13 bundles. Solo. While working rotating shifts as a journeyman pipefitter. Posting the lessons because the SHIPPING discipline mattered more than any individual kit.

If you're shipping 100 of anything (kits, templates, courses, components, micro-SaaS surfaces) some of this might be useful.

### 1. The template is the entire product

I spent three weeks on the SKILL.md template before I built kit #1. Sections, formatting, the order things go in, the exact words for the standard scaffolding. Then I built kits 1-100 against the locked template.

Without the template, 100 kits would have taken 18 months. With it, 30 days. Every hour of template-design upfront saved 50+ hours downstream.

If you're building any productized info product, your first three weeks should be on the structure, not the content. The math of leverage forces you to do this.

### 2. Batch by category, not by priority

I tried doing this in priority order first — most important kit first, second most important next, etc. Bad. Switching mental models between "what does a real estate agent need" and "what does a plumber need" and "what does an SDR need" burned an hour per context-switch.

Solution: batch by category. Built all 9 dev kits in one week. All 8 trades kits the next. All 5 creator kits the week after. Context loaded once, used 5-10 times. Output quality also went up because category-specific patterns started repeating and I could refactor them mid-batch.

### 3. Testers per category > taste

Every category got one volunteer tester. Real estate agent, recruiter, plumber (my actual coworker), wedding photographer, indie dev. Free lifetime access to the bundle in exchange for honest feedback.

The kits that had testers went through 2-3 rebuilds before public release. The kits that didn't (because I couldn't find a tester for that category) are flagged internally as v1 — I'll rebuild as users come in.

Your taste is good for the categories you're inside. It's bad for everything else. Don't ship a kit nobody who actually does the job has stress-tested.

### 4. Pricing in 4 tiers, not 2

I sweated the pricing model. Landed on:

- **Single kit: $14-$19.** Buy what you need, use forever, all 4 formats.
- **Bundle: $35-$249.** Vertical packs. Margin per kit is lower; AOV is higher.
- **Pro+: ~$15/mo.** Updates, private API access, early access to new kits.
- **Free tier:** the wizard, the public REST API.

Three things I learned about the structure:

- **The free tier is a feature, not a giveaway.** The wizard converts because users self-qualify before checkout. Without the wizard, the catalog was overwhelming and bounce was 70%+.
- **Bundles outperform on AOV but UNDER-perform on volume.** Single-kit purchases dominate the unit count. Bundle math gets better the more the customer uses, but most customers want to start with one kit.
- **Subscription is the smallest revenue line, not the biggest.** Counterintuitive. The buyer pattern is one-time purchase; recurring is the minority.

If you're pricing a productized info product, single-purchase is your base case. Subscriptions are upside, not the foundation.

### 5. The recommendation engine is the actual moat

100 kits is overwhelming. A user landing on the catalog cold can't browse 100 SKUs and pick one — they bounce. The wizard fixes that: 5 questions, returns 1-3 kits ranked by fit, no email gate.

Building the wizard took as long as building 15 kits combined. It's the single highest-leverage feature I shipped.

If you have more than ~20 SKUs, the discovery layer matters more than any individual SKU. Build it early.

### 6. Multi-format is a tax you have to pay anyway

Every kit ships in 4 formats — SKILL.md (Claude/Cursor), Custom GPT (ChatGPT), optimization pack (Codex/any chat), memory.md (Gemini). 100 kits = 400 artifacts to maintain.

This was the most-debated decision internally. Single-format would have been 4x faster. But the "lock-in" objection from technical buyers is the loudest one I hear, and the multi-format ship is the answer. I had to pay the tax.

If your product crosses ecosystems (multi-LLM, multi-OS, multi-language), pay the portability tax early. Retrofitting portability is more expensive than building it in.

### 7. Killing a SKU is part of the discipline

I built a Crypto Trader kit. Lived for 9 days. Refunded 32 customers. Pulled it.

Reasons: ethical exposure was non-zero, the audience didn't want a thoughtful tool, the use pattern was treating the kit's "consider these factors" output as advice. Wrong product, wrong audience, wrong fit.

100 kits in a catalog means killing 5-10 is fine. The discipline of "this signal exists but is wrong for us" is part of curation. If you're not killing any SKUs, you're probably saying yes to too many.

---

Disclosure: the product is lumenari.io. I'm not linking it in the post body because this is a lessons-learned post, not a launch announcement. The lessons stand without the product.

Curious what others shipping productized info products are landing on. Especially: how do you handle category coverage when you can't find a tester for a niche?
