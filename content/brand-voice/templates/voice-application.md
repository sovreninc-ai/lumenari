# Voice Application

Use this once you have a saved voice profile. Paste the profile + the draft you want rewritten. The AI produces a voiced rewrite and a self-check.

---

## The prompt

```
You are applying a saved brand voice profile to a draft. Rules:

1. Read the profile in full before you start. Weight load-bearing axes (1s and 5s) heaviest.
2. Use the vocabulary signature as a guide. Use the ban list as a hard filter — if you reach for a banned word, replace it.
3. Match the sentence-length average. Do not produce sentences 2x the avg length.
4. Use the framing device on the opener. The first sentence is where voice is most visible.
5. After the rewrite, run a self-check: for each paragraph or major block, label it on-voice / drift / off-voice. Quote any specific line you're unsure about.

Output format:

## Rewrite
[your voiced version]

## Self-check
- Paragraph 1: on-voice / drift / off-voice — [reason]
- Paragraph 2: on-voice / drift / off-voice — [reason]
- ...
- Lines I'm unsure about:
  - "[quoted line]" — [reason for the flag]

Profile and draft follow.
```

---

## Your input underneath

```
[Voice profile]
[paste the full saved profile here]

[Draft]
[paste the generic, rough, or competitor-flavored copy you want rewritten]

[Goal]
What is this for? What action should the reader take after reading it?

[Constraints (optional)]
- Length cap
- Format (email, landing hero, ad copy, tweet thread, etc.)
- Specific facts that must stay in the rewrite
```

---

## Worked example

**Profile (truncated):**
```
Voice: Solo Builder
Load-bearing: Serious/Playful 2 (dry), Direct/Diplomatic 5 (verdict-first)
Avg sentence: 9 words
Reaches for: shipped, hard pass, here's, thing
Never uses: leverage, transform, unlock, journey, passion, ecosystem
Framing: verdict-first opener; body explains
```

**Draft (generic AI output):**
> "We are thrilled to announce the launch of our new productivity platform designed to help busy founders streamline their daily operations through cutting-edge AI technology, allowing them to focus on what truly matters: building their dream business and transforming their lives."

**Goal:** Email announcing the launch to my newsletter. Want clicks to the product page.

**Rewrite:**
> Shipped the productivity tool. It runs the five admin tasks you waste a day on. Takes about a minute to set up. Link below.

**Self-check:**
- Sentence 1: on-voice — verdict-first opener, 4 words, uses "shipped" from vocab signature.
- Sentence 2: on-voice — 11 words, second-person, no jargon.
- Sentence 3: on-voice — 7-word fragment cadence.
- Sentence 4: on-voice — minimal, ends on a CTA without selling.
- Lines I'm unsure about: none.

---

## Why each rule matters

**Read the profile in full.** AI tools default to using the first few lines of any prompt heaviest. If the profile is paragraph 4 and the draft is paragraph 5, the draft wins. Forcing a full read with an explicit instruction fixes this.

**Weight load-bearing axes heaviest.** A voice scored 2 on Serious/Playful with a load-bearing flag means jokes are a hard no. A voice scored 4 on Casual without a load-bearing flag means contractions are fine but slang isn't load-bearing. The AI must know which traits are non-negotiable.

**Ban list as hard filter.** Without a hard filter, AI rewrites smuggle banned words back in via synonyms. "Leverage" gets replaced with "harness." "Unlock" becomes "tap into." The rule is: if the meaning matches a banned word, find a way to say it without that semantic shape.

**Match sentence length.** This is the easiest rhythm marker to enforce and the one AI gets wrong most often. A 9-word-average voice that suddenly produces a 28-word sentence reads as a different person.

**Framing device on the opener.** First sentences are where voice is most diagnostic. If your voice is verdict-first and the rewrite opens with "In a world where..." nothing else matters.

**Self-check with flags.** Honest flags are more useful than false confidence. A rewrite that says "paragraph 3 is drifting toward generic" lets you fix it. A rewrite that claims everything passes when paragraph 3 is clearly off forces you to re-read and catch it yourself.
