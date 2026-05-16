# Voice Drift Detection

For when you suspect AI output has slid back into corporate default. Run this on any draft before it goes live — especially sales pages, fundraise posts, manifestos, launch announcements.

---

## The prompt

```
You are auditing a draft for voice drift against a saved profile. Rules:

1. Compare the draft to the profile rubric. Do not be charitable. Drift is more useful to flag than to excuse.
2. Score every paragraph (or every block — section header, bullet list, CTA) as: on-voice / drift / off-voice.
3. For every drift or off-voice call, quote the exact phrase that triggered the call and name which voice rule it violated.
4. End with a "fix priority" — which 2-3 things would most improve voice consistency if fixed first.

Output format:

## Section-by-section
- [Section 1 label]: on-voice / drift / off-voice
  - Trigger: "[quoted phrase]" — violates [rule]
- [Section 2 label]: on-voice / drift / off-voice
  - Trigger: "[quoted phrase]" — violates [rule]
- ...

## Overall drift score: X/10
(10 = perfectly on-voice; 0 = unrecognizable)

## Fix priority (top 3)
1. [Specific change with example]
2. [Specific change with example]
3. [Specific change with example]

Profile and draft follow.
```

---

## Your input

```
[Voice profile]
[paste full saved profile]

[Draft]
[paste the full draft you want audited]
```

---

## The drift signals to watch for

**Banned-word smuggling.** The most common drift. The AI knows it can't use "leverage" — so it writes "harness" or "tap into" or "unlock." Same semantic shape, different word. The rule: if a sentence means the same thing a banned word would have meant, it's still drift.

**Sentence-length creep.** The voice averages 9 words. Halfway through the draft, sentences are 18 words and climbing. This is the AI defaulting back to "smooth" prose. Always check sentence length on the back half of any long draft.

**Generic openers.** "In a world where..." "Today's [audience] needs..." "We've all been there..." Any of these in a voice that scored 5 on Direct/Diplomatic is automatic off-voice.

**Three-act drift.** "First... Then... Finally..." or "Three things changed..." If your voice doesn't move that way, the AI will impose this structure anyway. Catch it.

**Adjective stacking.** "Bold, witty, and confident messaging." Voices don't talk about themselves in adjectives. If the draft has a sentence describing the brand in three-adjective rhythm, that's drift.

**Audience flattery.** "For founders who refuse to settle." "For the few who get it." If the voice profile doesn't include audience flattery as a framing device, this is drift — the AI is pandering.

**"Excited to announce."** Any voice that's not a press release in 2007 should never use this phrase. Treat as automatic off-voice.

---

## Worked example

**Profile (truncated):**
```
Voice: Solo Builder
Load-bearing: Direct/Diplomatic 5 (verdict-first openers), Serious/Playful 2 (dry, no jokes)
Avg sentence: 9 words
Ban list: leverage, transform, unlock, journey, passion, ecosystem, excited to announce
```

**Draft to audit:**
> "We're excited to share something we've been working on for a long time. In today's fast-paced world, founders are constantly juggling priorities and struggling to find the time to focus on what truly matters. That's why we built a tool that unlocks productivity and helps you transform the way you work. We can't wait for you to try it."

**Audit output:**

```
## Section-by-section
- Sentence 1: off-voice
  - Trigger: "We're excited to share" — violates ban list (auto-flag for press-release language)
- Sentence 2: off-voice
  - Trigger: "In today's fast-paced world" — violates anti-pattern list (generic opener); violates verdict-first framing device
- Sentence 3: off-voice
  - Trigger: "unlocks productivity" + "transform the way you work" — violates ban list (unlock + transform smuggled together)
- Sentence 4: drift
  - Trigger: "We can't wait for you to try it" — violates Direct/Diplomatic 5 (this is hedging warmth, not a verdict or CTA)

## Overall drift score: 1/10
(Unrecognizable as the saved voice. This reads as default AI output.)

## Fix priority (top 3)
1. Rewrite the opener as a verdict. Example: "Shipped a tool that runs the five admin tasks founders waste a day on."
2. Strip the entire middle sentence. The voice does not explain — it asserts and moves on.
3. Replace the warm closer with a direct CTA. Example: "Link below."
```

That's the test. If the audit says "perfectly on-voice" and you can see drift in the draft, the audit is wrong — re-paste the profile and run it again. Honest drift detection is more useful than a false pass.

---

## When to run drift detection

- Before any high-stakes asset ships (sales page, fundraise post, launch email, manifesto)
- On every rewrite the AI hands you for longform content (over 400 words)
- When you suspect your voice has shifted but can't articulate why — run it on three recent assets and compare
- Quarterly on your published content, as a calibration check before extracting a fresh profile
