# Show HN Post — Lumenari

This is the actual submission. See `timing.md` for when to post and `response-playbook.md` for handling the comment thread.

---

## Title variants (ranked)

### 1. (best) `Show HN: Lumenari – Curated AI skill kits for Claude, ChatGPT, Cursor & Gemini`

Why this works on HN: it names every model the technical audience actually uses, signals the product is concrete (kits, not "AI tooling"), and avoids buzzwords. The word "curated" sets up the differentiator vs. random prompt dumps without saying "best" or "ultimate." Naming four providers in the title also seeds the multi-AI portability angle before anyone clicks.

### 2. `Show HN: Lumenari – 100 SKILL.md kits + a recommendation engine`

Specific number, specific format reference. SKILL.md is recognizable to anyone following Anthropic's recent agent docs, and "recommendation engine" invites the implementation question (heuristic vs LLM) that drives comments. Slightly narrower hook — works better if SKILL.md awareness is high in the room that day.

### 3. `Show HN: I built a catalog of 100 AI skill kits in 4 formats each`

First-person, focuses on the work done. Useful as a fallback if the brand-name-first variants feel too commercial. The "4 formats each" detail is the part HN will latch onto because it implies a real engineering decision (portability) rather than a marketing claim.

---

## Body (post text — under the title)

Lumenari is a curated catalog of 100 AI skill kits and 13 bundles for Claude, ChatGPT, Cursor, Codex, and Gemini. Each kit ships in 4 formats so you can use the same role-specific context across whichever model you happen to be in.

I'm a journeyman pipefitter in Calgary. I work rotating shifts and build software in the cracks. Over the last two years my "AI workflow" turned into a Notion page of 80+ prompts I copy-pasted into 5 different chat windows depending on what I was doing. Some lived in Cursor. Some lived in custom GPT instructions. Some were just bookmarks. None of them were portable, version-controlled, or testable.

When Anthropic published the SKILL.md format I realized the same structured-context idea works for every chat AI, not just Claude with the Agent SDK. So I built the catalog I wanted to use myself.

What's in it:
- 100 kits across 20 roles (engineering, product, ops, data, design, marketing, founder)
- 13 bundles that group related kits (e.g. "Founder Starter," "Indie Dev")
- 4 formats per kit: SKILL.md (Claude/Cursor), Custom GPT instructions (ChatGPT), optimization-pack.md (any chat), memory.md (domain context), plus a quick-start
- A free recommendation wizard — describe what you do, it suggests kits. Anthropic-backed with a heuristic fallback when the API is rate-limited or down
- A public REST API (free 100 calls/mo, paid tiers above)

The bet is that SKILL.md becomes a portable standard the way OpenAPI did for REST. Locking your prompts to one provider's UI is a short-term move. Structuring them as files you own is a long-term one.

Stack: Next.js 16, TypeScript, Tailwind v4, Supabase (Postgres + Auth + RLS), Stripe, Anthropic API for the wizard, Resend for transactional, Vercel for hosting. About 280 hours of build time before launch, mostly Sunday mornings and post-shift evenings.

Pricing (CAD; ~0.73 USD): individual kits $14 (non-dev) / $19 (dev), bundles $35–$249, Pro+ subscription monthly/annual/lifetime, API tiers Free → $99 → $499 → Enterprise.

Known limitation I'd rather call out than hide: the SKILL.md format is still young. Anthropic's spec is the closest thing to canonical, but ChatGPT's custom GPT instructions and Cursor's `.cursorrules` are different shapes underneath. The 4-format ship is a translation layer, not a magic conversion — quality varies by provider, and the Claude/Cursor versions are the most polished today.

Free wizard, no signup required: https://lumenari.io

Happy to answer anything about the SKILL.md format, the recommendation engine's fallback logic, or the multi-AI portability tradeoffs.

---

## First comment from OP — strategy

### Why post a first comment immediately

HN comments are part of the submission. The first OP comment does three jobs:

1. **Sets the AMA tone.** A submission that opens with "happy to dig into X, Y, Z" signals an active OP and invites questions instead of drive-by snark.
2. **Front-loads the technical detail HN actually wants.** The post body is short by HN convention. The first comment is where you put the stack tradeoffs, the math behind pricing, and the "things that didn't work" honesty. This is the content the upvoting cohort scrolls for.
3. **Primes specific question vectors.** End the comment with a real question. People are more likely to reply when there's an explicit invitation than when they have to invent the conversation themselves.

Post the comment within 2 minutes of the submission going live. Treat it like the second half of the post.

### First comment text (~250 words)

> OP here. A few things I figured this crowd would want to know up front.
>
> **Stack details.** Next.js 16 App Router, TypeScript strict, Tailwind v4 (not v3 — the new engine is genuinely faster), Supabase for Postgres + Auth + RLS, Stripe for payments (CAD primary, multi-currency flagged for later), Anthropic API for the recommendation wizard, Resend for email, Vercel for hosting. No edge functions yet — all server actions and route handlers. Postgres has RLS on every table; service role key never touches the frontend.
>
> **Why bet on multi-AI portability.** I tried single-provider first. Built the whole thing as Claude-only kits for two weeks. Then I caught myself pasting one into ChatGPT because that's where I was already logged in, and it half-worked but lost all the structure. The 4-format ship is the workaround for the actual user behavior — people use whichever model is in front of them. Locking to one is a UX bet I wasn't willing to make.
>
> **What didn't work in early iterations.** First version of the recommendation engine was pure LLM. Worked great when the API was healthy, fell on its face during the November Anthropic outage. Now it's heuristic-first (tag matching + role weighting) with the LLM as enrichment. Slower to build, but the wizard never returns empty.
>
> **Pricing math.** $14 CAD for a non-dev kit ≈ $10 USD. Stripe takes ~$0.59. Net is roughly the cost of one good coffee per kit. Pro+ exists because power users were buying 6+ kits and the math stopped working for them.
>
> Question for you all: if you've tried structuring your own prompts as files (SKILL.md, .cursorrules, system prompts in a repo), what convention did you land on? Curious what's working in practice vs. theory.

### Follow-up posting schedule

- **+2 minutes:** Post the first OP comment above. Treat as part of the submission.
- **+30 minutes:** Check the post. If it's at 5+ points and 2+ comments, the algorithm has noticed it. Reply to every substantive comment, in order. Don't batch.
- **+1 hour:** First lull is normal. Don't bump. Use the time to write better replies to the comments already there. If a thoughtful comment got buried, reply to it anyway — your reply pulls it back up.
- **+3 hours:** If the post made the front page, expect a wave of higher-volume / lower-quality comments. Slow down. Reply to the substantive ones, ignore the snark unless it has a real concern inside.
- **+6 hours:** Drop a second OP comment if there's a recurring question worth addressing in one place ("a few people have asked about X, here's the long answer"). Don't manufacture this — only do it if there's a genuine pattern.
- **+24 hours:** Final OP comment to thank the thread, link to anything new (e.g. a fix or a doc you wrote based on feedback), and close the loop. This is also when to email anyone who left useful feedback.

Rule: never post an OP comment that doesn't add information. Bumping is obvious and the moderators flag it.
