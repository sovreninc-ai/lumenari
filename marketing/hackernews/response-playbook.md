# Response Playbook — Handling the HN Comment Thread

Companion to `show-hn-post.md` and `timing.md`. The post and the timing get you on the front page. This document is what keeps you there and turns the thread into actual signups.

The principle behind every response below: **HN respects honesty, specificity, and signal density. It penalizes deflection, marketing voice, and any whiff of defensiveness.** Optimize for the lurker reading the thread two days later, not the commenter you're replying to.

---

## Archetype 1 — Skeptical "isn't this just X?"

**Pattern recognition:** Comment frames the product as a thin wrapper, a known-pattern repackage, or a solved problem. Examples: "isn't this just GPT prompts you can write yourself?", "this is awesome-chatgpt-prompts with a Stripe page on it", "isn't this what system prompts already do?"

**Tone notes:** Don't get defensive. The skeptic is asking the question every lurker is also asking — your reply is for the lurkers. Concede the surface-level truth, then explain the actual difference with specifics.

**Variant A:**

> Fair question. The surface-level answer is yes — every kit is, at the bottom, structured text you could write yourself. So is every Stripe integration, but most people don't roll their own payment infrastructure. The actual value is (1) the structure — SKILL.md isn't just a prompt, it's a contract with sections the model knows how to use, and (2) the cross-format ship — the same role-context works in Claude, ChatGPT, Cursor, Codex, and Gemini without me re-translating each time I switch tools. If you'd write your own, you absolutely should. The catalog is for people whose Notion page of prompts has gotten out of hand.

**Variant B:**

> Honestly, yeah — for an experienced prompt-writer, this is automating something you could do manually. Same way Linear is "just a Postgres table you could build in a weekend." The bet isn't that the format is unreplicable. It's that (a) most people don't structure their context as files at all and (b) the four-format translation is annoying enough to maintain by hand that nobody does. If you've already built your own equivalent, the recommendation wizard is free — might still surface a role-pack you hadn't thought to build.

---

## Archetype 2 — "Why not just use [competitor]"

**Pattern recognition:** Direct comparison to ChatGPT Store / OpenAI custom GPTs / awesome-chatgpt-prompts on GitHub / "I just write my own system prompts." Often phrased as "what does this do that X doesn't?"

**Tone notes:** Take the competitor seriously. Acknowledge what they do well. Then name the specific gap, ideally one that's structural (not "we have better UX").

**Variant A — vs. ChatGPT Store / Custom GPTs:**

> Custom GPTs are great if you live inside ChatGPT. Two things they don't do: (1) export — your custom GPT instructions are locked to OpenAI's UI; you can't take them to Claude or Cursor without manual rewriting, and (2) the catalog is unfiltered. There are tens of thousands of custom GPTs and the discovery surface ranks by popularity, not by role-fit. Lumenari is curated (100 kits, role-specific) and every kit ships in 4 formats. If you're an OpenAI-only shop forever, Custom GPTs are probably enough. If you switch tools depending on the task, the portability matters.

**Variant B — vs. awesome-chatgpt-prompts / GitHub repos:**

> awesome-chatgpt-prompts is genuinely useful and I've pulled from it. The gap I kept hitting is that it's a flat list of one-shot prompts, not structured role-context. Asking ChatGPT to "act as a Linux terminal" is not the same as giving Claude a SKILL.md with sections for capabilities, constraints, and example flows that the agent loop actually reads differently. Different layer of the stack. Free repos are great for ideas; the catalog is for people who want the structured-file version maintained for them across providers.

---

## Archetype 3 — Pricing pushback

**Pattern recognition:** "$14 for a markdown file is overpriced", "$249 for everything is too cheap, must be low quality", "subscription should be cheaper / shouldn't exist", "why CAD?"

**Tone notes:** Don't apologize for the price. Don't rationalize. Show the math. Pricing is one of the few topics where "here's the spreadsheet" lands better than "here's the philosophy."

**Variant A — "$14 is too much for a markdown file":**

> Reasonable pushback. The math: a non-dev kit is ~$14 CAD ≈ $10 USD. Stripe takes ~$0.59. Each kit is 4 formats (SKILL.md, Custom GPT instructions, optimization-pack, memory.md, quick-start), human-curated, and tested by me before shipping. Roughly 6–10 hours of work per kit for the first version, plus ongoing updates as model behavior shifts. If a kit saves you 30 minutes once, the math works. If it doesn't, the recommendation wizard is free — try a kit's quick-start in the wizard before buying. I'd rather you not buy than buy and regret it.

**Variant B — "$249 lifetime is suspiciously cheap":**

> The bundle math is intentionally aggressive. The bet is that people who buy the everything-bundle become the loudest advocates and the highest-signal feedback channel — both of which are worth more than the marginal $50 I could squeeze by pricing it higher. Pro+ subscription exists for people who want ongoing updates and new kits as I add them; the lifetime is a snapshot. If I'm wrong about the bundle math, I'll learn it from the unit economics in the next 90 days.

**Variant C — "subscription should be cheaper":**

> Pro+ is for people who want every new kit as I publish them, plus the API access tier. If you only need the kits that exist today, the one-time bundles are better value — I'd actively recommend them over the subscription for most users. The subscription is priced for ongoing-update value, not catalog-access value.

**Variant D — "why CAD?":**

> Calgary-based, sole proprietor, CAD is my home currency and what Stripe defaults to for me. USD is supported at checkout. Multi-currency is on the list but isn't urgent — most buyers are USD or EUR and Stripe handles the conversion cleanly enough that adding native pricing for every currency is more accounting overhead than it's worth right now.

---

## Archetype 4 — Feature request

**Pattern recognition:** "Would love to see X", "any plans for Y?", "this would be great if it had Z." Often a sign the commenter is interested enough to invest mental energy.

**Tone notes:** Don't promise dates. Don't say "great idea, adding to roadmap" — that's the marketing voice HN hates. Be specific about what you're already building, what you've considered and decided against, and what you'd need to see to prioritize the request.

**Variant A — "you should support Llama / local models":**

> Considered it. The constraint is the recommendation wizard — Anthropic's API gives me reliable structured output that I haven't gotten consistently from local models without much heavier prompt engineering. Could ship the kits themselves as local-model-compatible (most of them already are; SKILL.md is text), but the wizard would have to fall back to the heuristic path for local-model users. Open to it if there's enough demand. What's the local model you'd want it to target — Llama 3.3, Qwen, something else?

**Variant B — "add a CLI / MCP server":**

> A CLI is on the list, mainly for the API tier (the public REST API is already there; a CLI would just be a wrapper). MCP server is more interesting because it would let Claude itself reach into the catalog — that's a few weeks of work to do properly. If you'd actually use either, drop a note at chris@lumenari.io and I'll prioritize based on the volume of those notes more than anything else.

---

## Archetype 5 — Technical question about SKILL.md format

**Pattern recognition:** "What's actually in a SKILL.md?", "how is this different from a system prompt?", "is this Anthropic-spec or your own?" These are the gold-standard comments — engage deeply, this is your chance to teach.

**Tone notes:** Be a guide, not a salesperson. Reference the actual spec. Use a real example if the comment goes deep enough. The lurkers reading this thread are exactly the people who will become advocates if you teach them something.

**Variant A:**

> SKILL.md is Anthropic's structured format for giving an agent loop a defined capability — distinct from a system prompt because it's loaded conditionally based on the agent's read of when it's needed, not always-on. Sections include `name`, `description`, `when_to_use`, plus the body of capabilities and constraints. Anthropic published the spec alongside the Agent SDK; Cursor's `.cursorrules` is conceptually similar but flatter. I'm using Anthropic's structure as the canonical version and translating to the other formats. The bet is that as more AI tools adopt agent-loop architectures, the structured-skill pattern becomes the standard the way OpenAPI did for HTTP APIs. Could be wrong, but it's a more durable bet than "always-on system prompts forever."

**Variant B — when asked for a concrete example:**

> Sure — a "code-reviewer" SKILL.md has roughly: name, description, when_to_use ("invoke before any PR is opened"), then sections for what to check (security, performance, readability, test coverage), what to ignore (style if there's a linter, micro-optimizations), and 2–3 worked examples of good vs. bad reviews. The agent loads this when it determines a code review is happening, applies the structure, and returns output that matches the worked-example format. Difference from a system prompt: it's targeted ("here's how to do this one thing well") rather than broad ("you are a helpful assistant who…"). Composable, and the agent can hold dozens of them without bloating a single context window.

---

## Archetype 6 — Architecture question

**Pattern recognition:** "Why Anthropic and not OpenAI for the wizard?", "what are your rate limits?", "how does the heuristic fallback work?", "Postgres for a catalog this size — why not just static JSON?"

**Tone notes:** This is the audience you built for. Match their depth. Don't simplify — if they asked about rate limits, give the actual numbers.

**Variant A — "Why Anthropic for the wizard?":**

> Three reasons: (1) Anthropic's structured-output reliability has been better in my testing for the specific shape the wizard needs (a ranked list of kit IDs with reasoning per pick), (2) latency on Sonnet has been stable enough to keep wizard responses under 3s p95, and (3) since the catalog is built around SKILL.md and Anthropic published that spec, there's a coherence to using their model for the recommendation layer. Could swap to GPT-5 or Gemini if Anthropic costs spike — the wizard interface is provider-abstracted on purpose.

**Variant B — "How does the heuristic fallback work?":**

> Tag-and-role matching with weighted scoring. Every kit has structured tags (role, domain, tools, AI provider) and a weight. The wizard takes the user's free-text input, runs lightweight intent extraction (keyword match against the tag taxonomy, no LLM), scores every kit against the extracted intent, and returns the top N. Loses the conversational nuance of the LLM path but never returns empty and never costs me an API call. In practice the heuristic fires maybe 2% of the time — outages plus rate-limit windows. The cohort that hits the fallback never knows.

**Variant C — "Postgres for a catalog this size, really?":**

> Fair — 100 kits is not a Postgres-scale problem. The reason it's there: the API tier needs query patterns (filter by role, by AI provider, by tag, by price range), and the recommendation wizard needs to join kit metadata with user history when a logged-in user runs it. Could've done it with static JSON + a search index, but I'd be migrating to Postgres in 6 months anyway. RLS is also doing real work — Pro+ subscribers see different content than free users, and I'd rather enforce that at the row level than in app code.

---

## Archetype 7 — "Are these AI-generated?"

**Pattern recognition:** "Are the kits themselves written by AI?", "did you LLM-generate the catalog?", sometimes phrased as accusation, sometimes genuine curiosity.

**Tone notes:** Tell the truth. The honest answer is the strongest answer. HN's BS detector for AI-slop catalogs is calibrated; trying to claim "100% human" when AI was involved gets you destroyed. Trying to hide AI-assistance gets you destroyed worse.

**Variant A:**

> Honest answer: human-curated, AI-assisted refinement, and every kit was tested by me before shipping. The structure of each kit (sections, taxonomy, role-fit) is mine. The first draft of the prose inside is often AI-assisted — I'd be lying if I said I wrote 100 kits from scratch in 280 hours otherwise. But every kit was then run through its target model on real tasks, edited based on what actually worked vs. what sounded good, and shipped only when the output quality matched my bar. The 4-format translation is the same loop — automated first pass, human edit, model test. AI-assisted, human-accountable.

**Variant B — shorter / more direct:**

> AI-assisted drafting, human curation and testing. I won't pretend a solo founder wrote 100 polished kits longhand — that's not the honest story. The honest story is I built a tight authoring loop, generated drafts, edited every one, ran every one against its target model on real tasks, and only shipped the ones that produced output I'd actually use myself. If a kit doesn't hold up, refund it — I'd rather know than ship slop.

---

## Archetype 8 — Hostile / troll comments

**Pattern recognition:** Pure snark with no question. "lol another AI wrapper", "$14 for a markdown file is a scam", "this whole space is grift." Usually short, usually low-effort.

**Tone notes:** The rule is **engage only if there's a legitimate concern buried in the snark.** If there is, respond to the concern and ignore the tone. If there isn't, don't reply. The upvote cohort adjudicates trolls faster than you can — replying just bumps the bad comment.

**When there's a concern buried in it:**

> The concern under the snark — that the AI tooling space has a lot of low-effort wrappers — is fair, and it's the exact reason I built a curated catalog instead of generating thousands of prompts. If a specific kit doesn't hold up to that bar, refund it; I'd rather know. If it's the whole category that's the issue, fair, this probably isn't for you.

**When there's no concern, just snark:**

> [Don't reply. The vote system handles it.]

---

## Archetype 9 — Positive feedback

**Pattern recognition:** "This is awesome", "bought a kit, works great", "love the format." Easy to skim past, but these are leverage — every reply that turns a positive comment into a longer thread increases the post's comment count, which feeds the algorithm.

**Tone notes:** Thank specifically (not generically), and ask a follow-up question that opens the thread back up. The follow-up is the real work — it converts a one-shot compliment into a conversation other people read.

**Variant A — generic positive comment:**

> Thanks — much appreciated. Curious which kit (or which role-pack) you tried first? The recommendation wizard is the part I'm least sure about — would love to know whether it surfaced what you actually needed or whether you ended up browsing manually.

**Variant B — specific positive feedback ("I bought the founder bundle"):**

> Glad the founder bundle landed. That one was the hardest to scope — the founder role is broad enough that "what does a founder need" almost has no answer. Did the kits in there cover the stuff you actually do day-to-day, or were there gaps? Want to make sure v2 of that bundle reflects real usage rather than my guesses.

---

## Archetype 10 — "Have you tried X" suggestions

**Pattern recognition:** "Have you looked at LangChain / DSPy / Promptfoo / [some tool]?" Usually well-meaning, sometimes a flex.

**Tone notes:** Say what you tried. Say what worked. Say what didn't. Treat it as a real engineering conversation, not a deflection. If you haven't tried it, say that and ask what specifically it would solve.

**Variant A — when you've tried it:**

> Tried Promptfoo for testing the kits in the early days. Worked well for single-turn evals, less well for the multi-format ship since each kit needs to be tested in 4 different runtime contexts and Promptfoo's harness assumes a single target. Ended up with a homegrown test runner that wraps each format's actual API surface. Not opposed to going back to Promptfoo if they add multi-target support — the eval reporting was nicer than mine.

**Variant B — when you haven't:**

> Haven't tried it. What's the specific gap it would close — is it the recommendation engine layer, the format translation, or the testing loop? Happy to look at it if it solves a real problem; not going to pull it in just because it's adjacent.

---

## What NOT to do

- **Don't argue.** If a comment is wrong, you have one shot to correct it with facts. If they push back, let it go. Arguing on HN is a losing game even when you're right — it makes you look defensive and tanks the thread.
- **Don't bump.** Don't reply to your own post to push it back to /new. Mods notice. The penalty is invisible and permanent.
- **Don't ban-list anyone.** Even the most hostile commenter gets the same treatment as everyone else.
- **Don't ask for upvotes.** Anywhere. Not in the post, not in replies, not in DMs to friends. HN actively detects vote rings and the penalty is killing the post outright.
- **Don't link your other social channels.** Don't say "follow me on Twitter for updates." HN is allergic to that move. The link to lumenari.io in the post is enough.
- **Don't post the same comment twice.** If two different commenters ask the same question, write two different replies. Copy-paste replies signal a checked-out OP.

---

## When to step away

If you're rage-typing, stop. Close the tab. Set a 60-minute timer. Come back.

Specific tells you should step away:
- You've started a reply with "Actually," or "No,"
- You're typing faster than you're thinking
- You've drafted the same reply three times
- The comment is making you feel personally attacked rather than professionally challenged

The thread will still be there in an hour. A reply that posted at +47 minutes after the comment instead of +3 minutes does not lose you anything, and your future self will write a better one.

---

## The HN charity rule

Assume the most charitable interpretation of every comment.

- "This is just X" probably means "I haven't seen the difference yet — explain it to me."
- "This is overpriced" probably means "I'd buy it if you justified the price."
- "Why not use Y" probably means "I want to know your reasoning so I can decide if you've thought about this."
- Even "lol another AI wrapper" probably means "I've seen too many bad ones — convince me yours isn't."

Reply to the charitable version. The lurkers — your real audience in this thread — read your reply against the charitable version too. If the commenter actually was being hostile, the contrast between their tone and yours makes you look better, not them.

This is the entire game. Optimize for the lurker, write to the charitable version, stay specific, and let the upvotes do the rest.
