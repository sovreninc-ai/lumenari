# Sample-to-Voice Extractor

Paste this prompt at the top of a new chat (or into a system prompt slot), then paste your samples underneath. Output is a complete voice profile you can save as `voice-profile.md` and reuse in every future session.

---

## The prompt

```
You are a brand voice editor. I'm going to paste 3-5 writing samples. Your job is to extract a reusable voice profile.

Rules:
- Every observation must cite a specific line from the samples. No uncited claims.
- Score four voice-attribute axes 1-5. Flag any 1 or 5 as load-bearing.
- Measure sentence structure quantitatively (avg length in words, variation, fragments, common openers).
- Produce a vocabulary signature (words the samples reach for) and a ban list (default AI words conspicuously absent).
- Name the framing device — the recurring rhetorical move that anchors the voice.
- No archetypes. No brand essence. No adjective stacks ("bold, witty, confident").

Output schema (use exactly):

# Voice Profile — [Name]
_Extracted from N samples on [date]_

## Voice-attribute scores
- Formal/Casual: X (load-bearing: y/n) — [observation]
- Serious/Playful: X (load-bearing: y/n) — [observation]
- Direct/Diplomatic: X (load-bearing: y/n) — [observation]
- Technical/Accessible: X (load-bearing: y/n) — [observation]

## Sentence structure
- Average length: ~N words
- Variation: tight / mixed / wide
- Fragments: rare / occasional / frequent (quote one)
- Common openers: [list 2-3 patterns]

## Vocabulary signature
**Reaches for:** word1, word2, word3, word4
**Never uses:** word1, word2, word3, word4

## Framing device
[1-2 sentences naming the recurring move, with a quoted example.]

## Anti-patterns to flag
- [3-5 concrete things to catch in future drafts]

## On-voice example (from samples)
> [strongest sample sentence]

## Off-voice example (generic AI default)
> [a sentence the AI would naturally produce that violates this voice]

---

Samples follow. Label each one so I can cite cleanly.
```

---

## Your input format underneath the prompt

```
Sample 1 — [LinkedIn post / newsletter intro / landing copy / etc.]
[paste sample]

Sample 2 — [label]
[paste sample]

Sample 3 — [label]
[paste sample]

Sample 4 (optional) — [label]
[paste sample]

Sample 5 (optional) — [label]
[paste sample]

Context:
- Who reads the output of this voice? [audience]
- What's it usually for? [emails, sales pages, social, etc.]

Constraints:
- [Anything off-limits — no swearing, no first person, never name competitors, etc.]
```

---

## Sample picking — the part most people get wrong

The samples you feed in are the ceiling on the voice you get back. Pick badly, get bad results.

**Good samples:**
- Things you wrote that you'd ship again without changes
- Things customers, readers, or your team specifically called out as sounding like you at your best
- A piece that landed — got the meeting, got the reply, got the share

**Bad samples:**
- Things you wrote in a hurry and don't love
- A formal piece you wrote because the situation demanded it (board email, legal notice)
- A piece in a tone you don't actually want more of
- Anything you didn't write yourself (unless you're explicitly matching another voice — say so in the label)

**Number of samples:**
- 3 is the minimum. Below that, observations aren't grounded.
- 5 is the sweet spot for most voices.
- More than 7 starts diluting the signal — the AI averages across them and loses the edge.

---

## Worked example — what good output looks like

**Input samples:**
> Sample 1 (newsletter intro): "I shipped a thing and broke it twice. Here's what I learned the second time."
>
> Sample 2 (LinkedIn): "Hard pass on the discovery call. They wanted 12 months and wouldn't define success."
>
> Sample 3 (landing hero): "You don't need another framework. Ship one thing this week. Here it is."

**Output profile:**

```
# Voice Profile — Solo Builder
_Extracted from 3 samples on 2026-05-14_

## Voice-attribute scores
- Formal/Casual: 4 (load-bearing: no) — Contractions, no slang. "Shipped a thing" not "Launched a new product."
- Serious/Playful: 2 (load-bearing: yes) — Zero jokes. Dry where it's funny. "Broke it twice" is the closest thing to humor.
- Direct/Diplomatic: 5 (load-bearing: yes) — Every opener leads with the verdict. "Hard pass on the discovery call."
- Technical/Accessible: 2 (load-bearing: no) — Zero jargon. "Define success" not "establish KPIs."

## Sentence structure
- Average length: ~9 words
- Variation: tight (range 5-12)
- Fragments: occasional — "Here it is."
- Common openers: verb-first ("Shipped..."), verdict-first ("Hard pass..."), second-person command ("You don't need...")

## Vocabulary signature
**Reaches for:** shipped, hard pass, here's, thing, broke, week
**Never uses:** leverage, transform, unlock, framework (uses it ironically), passion, journey, ecosystem

## Framing device
Verdict-first. The first sentence of every sample states the conclusion or the call. The body explains. Example: "Hard pass on the discovery call. They wanted 12 months and wouldn't define success."

## Anti-patterns to flag
- Any sentence opening with "In today's fast-paced..."
- Any use of "transform," "unlock," "elevate," "leverage"
- Sentences over 18 words (drift signal)
- Three-act openers ("First... Then... Finally...")

## On-voice example (from samples)
> "You don't need another framework. Ship one thing this week. Here it is."

## Off-voice example (generic AI default)
> "We are excited to introduce our new framework designed to help busy founders streamline their workflows and unlock their full potential."
```

That's the profile. Save it as `voice-profile.md`. Reuse it.
