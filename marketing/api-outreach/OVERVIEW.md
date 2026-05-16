# Lumenari API Platform — Cold Outreach Pack

## The pitch

Every AI tool builder hits the same ceiling: their product is great, but their users don't know how to prompt it well. The output quality is bottlenecked by the user's ability to describe what they want. Devs ship vague specs, PMs paste rambling context, designers don't know what a "production-grade" anything looks like. The tool catches the blame.

Lumenari fixes this with one API call. We expose our recommendation engine and 100-kit catalog as REST endpoints — your user describes their use case in plain English, we return a curated SKILL.md/prompt-pack that turns the underlying model into a senior teammate for that role. One line of code, four delivery formats (Claude Skills, ChatGPT GPTs, Cursor rules, raw markdown), Pro tier starts at $99 CAD/mo. Your users never leave your app. You get better outputs without retraining a model or building a prompt library yourself.

---

## Priority list

### Tier 1 — email first (3)

1. **Lovable** (lovable.dev) — Text-to-app on Claude. Their users perpetually need the right Next.js/Supabase pattern. Direct fit for `ts-next-production`, `supabase-schema-rls`, `stripe-connect`.
2. **v0 (Vercel)** (v0.dev) — UI generator handing devs React. Kit recommendations at code-export time are the natural next step after "I shipped the component, now what?"
3. **Bolt.new** (bolt.new, by StackBlitz) — Full-stack generator on WebContainers. Same shape as Lovable, slightly more dev-leaning audience.

### Tier 2 — email second (7)

4. **Cursor** (cursor.com) — Highest brand bar in the set. Pitch is "recommend a kit when a user opens a fresh project."
5. **Windsurf** (windsurf.com, Codeium rebrand) — Cursor competitor leaning on price + Cascade. Less crowded inbox.
6. **Continue.dev** — Open-source assistant. White-label tier is the angle.
7. **Cline** (cline.bot) — Open-source Claude Code competitor. Free integration drives brand awareness back to us.
8. **Replit** (replit.com) — Replit Agent could surface kit hints by project template. I already use Replit for Lumina Reset.
9. **Aider** (aider.chat) — Terminal-native, git-aware. Small but loyal power-user audience.
10. **Zed** (zed.dev) — Rust editor, native Anthropic integration. Premium positioning.

### Tier 3 — longer shots (5)

11. **Notion AI** (notion.so) — Workspace agent. Embed at the "create with AI" surface.
12. **HoneyHive** (honeyhive.ai) — LLM evals + prompt versioning. Sell recommendation as a feature.
13. **Langfuse** (langfuse.com) — Open-source observability + prompt management. Same angle as HoneyHive.
14. **Granola** (granola.ai) — Meeting AI. Bridge from transcript to "what should I do with this."
15. **n8n** (n8n.io) — Workflow automation. Kits as nodes.

---

## Subject line variants (A/B test)

1. `Quick idea for [Product]`
2. `Embed kit recommendations in [Product]?`
3. `[Their product] + Lumenari?`
4. `Saw [specific recent thing] — proposal`
5. `1-line integration for [Product]`

Rule: never use the same subject twice in a tier. Rotate.

---

## Follow-up sequence

### Day 3 bump (60 words, light touch)

**Subject:** Re: [original subject]

> Bumping this. No pressure — just figured the recommendation-engine angle might be worth 15 min when you have a window.
>
> I can send a quick Loom instead if easier.
>
> — Chris

### Day 7 (100 words, value add)

**Subject:** One more thought on [Product] + kit recs

> Quick follow-up. Spent some time this week looking at how [specific thing about their product] handles [specific user friction]. The interesting wedge for us is the moment a user finishes generating something and has to figure out "now what."
>
> Lumenari's `/api/v1/recommend` endpoint is one line of code from there — user describes the next step, we return a curated kit. Free tier covers 100 calls/mo for experimenting.
>
> Worth a look? Happy to share a sandbox key.
>
> — Chris

### Day 14 (80 words, last touch)

**Subject:** Closing the loop on [Product]

> Last note from me on this one. Totally understand if the timing isn't right — building a company is its own thing.
>
> I'll leave the door open. If "AI tool users don't know how to prompt well" ever moves up the priority stack, the API is at lumenari.io/api-platform and I'm chris@lumenari.io.
>
> Best of luck with what you're shipping.
>
> — Chris

---

## Discovery call script (15 min)

**Goal:** validate fit, hand them a sandbox key, leave with a "yes/no/by when."

### Opening (2 min)
- Thanks for the time — keep this tight, 15 min max.
- Quick context on Lumenari: 100 curated kits, REST API, recommendation engine.
- "Before I demo, what made you take the call? Want to make sure I'm answering the right thing."

### Demo (5 min)
- Show `/api/v1/recommend` with a use case from THEIR product domain (pre-research this).
- Show the returned kit: structure, formats, the actual `SKILL.md`.
- Show pricing page — Free tier is 100 calls/mo, no card required.
- Show a 4-line code snippet of how it embeds.

### Questions for them (5 min)
- What's the #1 reason a user churns from [Product] in week one?
- Do you have a prompt library / system-prompt strategy internally? Is anyone owning it?
- Who would own a partnership like this on your side — eng, PM, partnerships?
- If you wanted to test this, what's blocking you from spinning up the free tier today?

### Close (3 min)
- "Two paths: I send you a sandbox key now and you ship a test next week, or we schedule a 30-min technical follow-up with whoever would build it. Which is easier?"
- Confirm next action, who owns it, by when.
- Send recap email within 1 hour.

---

## What to do when they reply

**1. "Yes, interested" → book the call.**
- Reply within 1 hour. Cal.com link, 15 min, three time slots.
- Pre-call: research their last 30 days (changelog, Twitter, launches).

**2. "Not now / not a fit"** → nurture.
- Thank them. Add to a 90-day quarterly check-in list.
- One sentence: "If [trigger event — e.g., you add prompt templates, you ship a marketplace] comes up, the door's open."

**3. "What's the integration look like?"** → send 1-pager.
- Reply with: link to /api-docs, a 4-line code sample, free tier key, offer to jump on a call once they've poked it.

**4. No reply** → automated follow-up.
- Day 3, Day 7, Day 14 sequence above. Stop after Day 14. Add to 90-day list.
