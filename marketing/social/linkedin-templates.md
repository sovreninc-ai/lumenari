# Lumenari — 5 Evergreen LinkedIn Post Structures

Each structure includes: when to use it, the skeleton, and a worked example using a real Lumenari kit/product.

Voice: Chris, first person. Premium but accessible. Story before assertion. Specific over hand-wavy. Sounds like a person, not a corporate bot.

---

## 1. Story-Lesson-CTA

**When to use it:** When you have a small, true (or hypothetical-flagged) anecdote that points to a bigger lesson. Best for posts where the lesson is the value and the CTA is genuinely soft (reply, DM, try a thing).

**Skeleton:**
```
[OPEN — 1-2 sentences setting the scene with a specific moment, person, or quote.]

[STORY — 3-5 short paragraphs. Concrete details. Names if you have them. The action that happened.]

[TURN — 1 sentence that pivots from "here's what happened" to "here's what it taught me."]

[LESSON — 2-3 paragraphs unpacking the insight. Make it stand alone — readers should be able to use it without buying anything.]

[CTA — 1 paragraph. Soft. A question, an invitation, a "DMs are open." Never aggressive.]
```

**Worked example (using the Sales Cold Outreach kit):**

> I rebuilt the Sales Cold Outreach kit three times before I'd let anyone pay for it.
>
> Version one was a sequence generator. You'd paste a prospect, the kit would output a 5-touch sequence. It worked. Reply rates from beta users were average — the same 5-7% you'd get from any decent template library.
>
> Version two added persona detection by seniority. Slightly better. Still average.
>
> Version three flipped the order. Before writing anything, the kit pulls you through a research pass: company news in the last 30 days, the prospect's role-level pain, the trigger event that makes now the right time. ONLY THEN does it write the email. Beta reply rates went from "fine" to "actually excited."
>
> Here's the lesson I should have caught in version one.
>
> Most cold-outreach AI tools are trying to make bad outreach faster. The kit makes it slower at the front and better at the back. The win wasn't a cleverer template — it was forcing the structural change that good SDRs already know to make and bad SDRs skip.
>
> This is the pattern I keep finding when I build kits. The leverage isn't in the AI being smarter. It's in the structure forcing the human to do the right work in the right order. The model fills in the blanks faster, but the workflow is the actual product.
>
> If you run an SDR team and your reply rates are stuck under 8%, my hypothesis is that your team is sending more, faster, when they should be sending fewer, better. Happy to argue this in the comments — and if you want to test the kit on a real prospect list before buying, my DMs are open.

---

## 2. Listicle-with-narrative

**When to use it:** When you have 3-7 distinct points but they need connective tissue to feel like one post, not a slide deck. The numbered points are the spine; the prose around them is what makes it readable.

**Skeleton:**
```
[OPEN — 1-2 sentences naming the topic and your angle. Promise the value upfront.]

[FRAMING — 1 short paragraph on why this list exists. What experience produced it.]

1. **[Point 1 headline]**
[1-2 sentences of context.]

2. **[Point 2 headline]**
[1-2 sentences of context.]

3. **[Point 3 headline]**
[1-2 sentences of context.]

[continue for 4-7 points]

[CLOSE — 1-2 paragraphs tying the list back to a single thesis. Optional CTA.]
```

**Worked example (using the SKILL.md format decision):**

> When I started building Lumenari, I had to pick a canonical format for the kits. I want to break down the decision because the format choice ended up shaping everything else.
>
> The three options on the table were JSON system prompts, YAML config files, and markdown with sections (SKILL.md). Markdown won. Here's why.
>
> 1. **Authoring matters more than parsing.**
> Most kits get edited by humans, not machines. A format that's easy to read and edit beats a format that's easy to parse, especially when the consumer (an LLM) is fine with either.
>
> 2. **Lowest-common-denominator portability.**
> Every model can read markdown. Every IDE can render it. Every git workflow handles it natively. The moment you reach for JSON or YAML, you've added a tooling tax that doesn't pay for itself.
>
> 3. **The convergence signal was already there.**
> Anthropic was leaning hard into SKILL.md natively. Cursor was experimenting. Markdown wasn't the standard yet, but the smart tools were converging on it. Better to be early on the right side of a convergence than late.
>
> 4. **The downside I accepted.**
> Markdown is loose. It can't enforce structure the way a JSON schema can. A poorly-written SKILL.md is just a poorly-written doc. I mitigate this with internal linting and a strict template, but the format itself doesn't enforce anything.
>
> 5. **The downstream consequence I didn't plan for.**
> Because SKILL.md is the canonical format, the Custom GPT, optimization pack, and memory.md exports for non-Claude models are all derived from it. One source, four formats, bounded maintenance tax. That only works because the source is human-readable.
>
> Six months in, the bet is looking right. SKILL.md is becoming the de-facto format for portable AI skills, and Lumenari was early.
>
> If you're building in the AI skills space and trying to pick a format, my recommendation is the same one I made for myself: pick the one that's easiest to author, accept the looseness, and trust that the ecosystem will converge to the readable thing.

---

## 3. Contrarian-take

**When to use it:** When you have a defensible opinion that goes against a popular belief in your audience's industry. Use sparingly — too many contrarian posts and you become the contrarian guy, not the builder. Always offer the alternative, not just the dunk.

**Skeleton:**
```
[OPEN — Name the popular belief in 1-2 sentences. State it fairly, not as a strawman.]

[POSITION — 1 sentence stating your contrarian take. Direct. No hedging.]

[WHY THE BELIEF EXISTS — 2-3 sentences acknowledging WHY the popular belief took hold. Earn the right to disagree.]

[WHY IT'S WRONG (OR INCOMPLETE) — 2-3 paragraphs of reasoning. Use specifics, examples, numbers.]

[WHAT TO DO INSTEAD — 1-2 paragraphs of practical alternative. Don't leave the reader with just a critique.]

[CLOSE — Invitation to disagree. You want replies on this one.]
```

**Worked example (using the "10,000 prompts" comparison):**

> The popular belief in the AI tooling market right now: bigger packs are better deals. The "10,000 ChatGPT prompts for $19" pages on Gumroad reinforce it. More prompts, same price — must be value.
>
> Here's my take: those packs are not deals. They're search problems you now own.
>
> The reason the belief exists is intuitive — for almost any other product category, more is more. A 1,000-recipe cookbook beats a 100-recipe cookbook. A larger app store beats a smaller one. Volume = value.
>
> But AI prompts don't behave like recipes or apps. A prompt's value is conditional on three things: it fits your role, it fits your model, and it's structured deeply enough to do real work. A 12,000-prompt PDF where every prompt is one to three sentences fails on all three. You can't curate it. You can't search it. You don't know which prompts were tested vs. invented. By the time you've evaluated 50 of them, you've burned more hours than the pack saved.
>
> Curated catalogs solve a different problem. Lumenari has 100 kits. That number is deliberate — small enough that I can pressure-test every kit personally, wide enough to cover 17 categories of real work. The wizard routes you to the right 1-3 kits in under a minute. Buying decisions take seconds, not afternoons.
>
> What to do instead: stop buying volume. Buy curation. If you can't tell the seller "this kit will produce X output for me in Y context," you're not buying a tool — you're buying potential. Potential is cheap.
>
> If you're working with one of the giant packs and disagree, tell me what you've gotten out of it. I'd genuinely like to know if the volume model works for someone, because the math doesn't make sense to me.

---

## 4. Founder-update

**When to use it:** Weekly or bi-weekly. Builds in-public credibility. Three sections: what you shipped, what you learned, what's next. Honest about what didn't work.

**Skeleton:**
```
[OPEN — Time anchor. "This week on [project]." or "Week N update."]

**What I shipped:**
- [Concrete item 1]
- [Concrete item 2]
- [Concrete item 3]
[Continue 3-6 items.]

**What I learned:**
[1-2 paragraphs on the most useful thing the week taught you. Could be a customer signal, a bug, a market reaction, a personal insight.]

**What broke / what didn't work:**
[1 paragraph. Honesty here is what makes the update credible. Don't fake humility — share something real.]

**What's next:**
- [Item 1]
- [Item 2]
- [Item 3]

[CLOSE — Optional question to readers. "What did you ship this week?" works.]
```

**Worked example (using a typical Lumenari week):**

> Week 8 update on Lumenari.
>
> **What I shipped:**
> - 3 new kits (Veterinarian, Estate Planning, Travel Planning) — catalog now at 103 published
> - Wizard now routes 5 more roles correctly (small-firm CPAs, freelance UX designers, IT helpdesk leads, fitness coaches, public school teachers)
> - Stripe checkout latency cut from 1.4-1.8s to 700-900ms via cached price lookups and pre-warmed sessions
> - Fixed an unstable-pagination bug in the public REST API that was breaking integrators
>
> **What I learned:**
>
> The wizard's tag accuracy matters more than the kit count. The 5 newly-routed roles weren't missing kits — they were missing tags. The Personal Finance kit was always the right answer for small-firm CPAs handling client books, but the tagging didn't surface it. Spent two hours retagging existing kits and unlocked more value than I would have shipping a new one.
>
> The lesson generalizes: in a curated catalog, discoverability is at least as important as inventory. If the right kit exists but the right buyer can't find it, the catalog has the same problem as a 10,000-prompt PDF.
>
> **What broke:**
>
> The Custom GPT export pipeline produced two malformed exports this week — one for the Brand Voice Builder, one for the Recruiter Outreach kit. Both were caught by my own QA pass before they shipped, but the failure rate is too high. The pipeline gets a rebuild next week.
>
> **What's next:**
>
> - Custom GPT format v2 (the rebuild)
> - The Real Estate bundle ($79 for 3 existing kits)
> - SKILL.md authoring guide for Pro+ subscribers
> - First batch of guest-authored kit candidates (review pass)
>
> What did you ship this week? Curious what other solo builders are working on.

---

## 5. Case-study

**When to use it:** When you have a real (or hypothetical-flagged) user outcome with numbers. The post should read like a mini-narrative: who, what they tried before, what changed, the numbers, the lesson. NEVER fake real outcomes — flag hypotheticals clearly.

**Skeleton:**
```
[OPEN — 1 sentence setting up that this is a case study. Flag hypothetical if relevant: "[hypothetical, but representative of beta feedback]".]

**The user:** [Persona, role, context, scale of operation.]

**The before state:** [What they were doing without the kit. Specific behaviors. Specific frustrations. Time/money cost if known.]

**The intervention:** [Which Lumenari kit, what it cost, how they set it up.]

**What changed:** [Bullet list of specific workflow changes. Concrete, not abstract.]

**The numbers:** [Quantified outcomes. Time saved, revenue gained, quality improvement, whatever's measurable.]

**The lesson:** [1-2 paragraphs. The generalizable insight that goes beyond this one user.]

**The honest caveat:** [1 paragraph. What didn't work, what the kit doesn't do, what you'd want to be honest about. This is what separates a credible case study from a sales pitch.]

[CTA — Optional. Often "if you're a [persona] and want to test it, reply or DM."]
```

**Worked example (using the Photographer kit):**

> Case study — [hypothetical, based on a beta tester's feedback].
>
> **The user:** Wedding photographer, 28 weddings per year, mid-Pacific Northwest. Solo operator. Husband helps occasionally with second-shooting.
>
> **The before state:** Inquiries came in via her website contact form. Each inquiry triggered a 30-60 minute back-and-forth: pricing questions, package details, date checks, vibe-feel-out conversations. She was averaging 3-4 days to send the first reply, and her booking rate per inquiry was tracking lower than her market peers.
>
> Her hypothesis: slow inquiry replies were costing her bookings. Brides who got her reply 3 days later had often already paid a deposit elsewhere.
>
> **The intervention:** Bought the Lumenari Photographer kit. $19. Built her voice profile into the kit using 5 of her past inquiry replies — the kit has a built-in flow for this.
>
> **What changed:**
> - Inquiry replies: from 40 minutes per email and 3-day delay → 18 minutes per email and same-day reply
> - Reply quality stayed in her voice (testers couldn't tell which were AI-assisted vs. fully human-written)
> - Pricing conversations got easier — the kit has scripts for the "I love your work but it's outside my budget" message that she'd previously dreaded
>
> **The numbers at 90 days:**
> - Inquiry response time: down from 2-3 days to same-day
> - Booking rate per inquiry: up roughly 25%
> - Estimated extra weddings booked over the 90-day window: 4
> - At her average booking value (~$4K), that's $16K in incremental revenue
>
> The kit cost $19.
>
> **The lesson:** the value of an AI kit isn't always "do the work for you." Sometimes it's "let you respond faster than your competitors." For a wedding photographer, speed of the first reply IS the competitive moat. The kit removed the friction that was making her slow.
>
> **The honest caveat:** her voice profile took about an hour to set up properly. Worth doing well — a half-built voice profile produces replies that don't sound like her, and that's worse than slow. The kit doesn't shortcut that setup, and shouldn't.
>
> If you're a creative running a service business and your inquiry replies are costing you bookings, reply here. I'd rather publish a real case study than another hypothetical one.

---

*See also: `30-day-calendar.md` for the full 30-day execution and `tweet-templates.md` for Twitter/X formats.*
