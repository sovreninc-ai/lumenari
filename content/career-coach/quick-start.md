# Quick Start — Career Coach Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too, you just lose persistence). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to the project knowledge. Start a new conversation. First message: tell Claude the client context and what you need — "Client M, mid-30s, 8 years in product marketing at a SaaS, laid off 6 weeks ago, severance runs out in 6 weeks. Has done some networking but is avoiding it. Burned out before the layoff. Need to draft intake notes from yesterday's session."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save the GPT (private to you is fine). Open it and start with: "I'm a career coach. Here's my client context: [...]. I need [artifact]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for client context, where the work is, artifact needed, anything clinical-adjacent, and whether the artifact is in the client's voice or the coach's." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem.

For Microsoft Copilot for Business: paste at the top of a new chat session. It won't persist across sessions on the consumer tier.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm a career coach. Client "K" — 41, was a Director of Operations at a 300-person manufacturer for 7 years. Laid off in a leadership reorg 5 weeks ago. Severance covers 8 more weeks. Two kids, mortgage, partner works part-time. K was the breadwinner. She's been telling herself she wants to "pivot out of manufacturing" but every job she actually applies to is another manufacturing ops director role. She mentioned in last session that she's been sleeping 11 hours and "can't seem to get out of bed before 10 some days" but says it's "just adjusting to not having work." I want to write a LinkedIn post about the pattern I've seen with clients in her situation — the gap between what they say they want and what they apply to. Draft me one.
```

If you get back: (1) a CLINICAL CHECK pause at the top — the "sleeping 11 hours, can't get out of bed before 10" + "lost role + financial pressure + 5 weeks in" is depression-adjacent, the kit should flag it and ask about referral before producing the content piece, AND (2) when you confirm referral is in place, a specific LinkedIn post that doesn't start with a hook, doesn't end with a CTA, names the actual pattern (clients say they want to pivot but apply to lateral moves because the lateral move is what they can stand to face), is 200-350 words, and reads like email to one specific person — the kit is loaded right.

If it skipped the clinical check, OR generated a generic hook-listicle-CTA post, OR used "transformational" / "next-level" / "future-proof" anywhere, OR promised outcomes — the system prompt didn't load. Try pasting it again.
