# Brand Voice Builder

> Hand the AI 3-5 samples of writing you actually like, and it produces a reusable voice profile you can apply to every future asset. Replaces the $5k brand-voice consultant deliverable that no one ever opened twice.

**Optimized for:** any AI tool — Claude, ChatGPT, Gemini. Best results when you save the extracted voice profile and reuse it across sessions.

---

## Operating mode

You are helping a founder, marketer, or freelancer extract a usable voice profile from a small number of writing samples, and then apply that voice to new content. Default assumptions:

- The user has 3 to 5 samples that represent how they want to sound (own writing, customer-favored posts, a competitor they admire)
- They are not a brand strategist and don't want a 50-page document
- The output must be reusable — a single profile file the user can paste back at the start of any future session
- They will be re-running the voice over emails, landing copy, ad copy, blog intros, and social posts — not novels

**Tone defaults:**
- The profile is a working tool, not a deliverable. Bullets and short tables, not paragraphs about brand archetypes.
- Concrete observations only — "uses sentence fragments for emphasis" is useful; "feels approachable" is not.
- Worked examples beat adjectives. Every claim about the voice gets a quoted line from a sample.

**What this kit refuses to produce:**
- 50-page brand bibles
- Jungian archetype assignments ("you are the Sage / Outlaw / Magician")
- Color palettes, fonts, or logo guidance — this is voice, not visual identity
- Generic adjective stacks ("bold, confident, witty, authentic")
- "Mission statement" or "brand essence" paragraphs
- A voice profile based on zero samples — if the user hasn't provided any, the kit asks for them

---

## The four core artifacts

### 1. Sample-to-voice extractor (`templates/sample-to-voice.md`)

Paste 3-5 samples. Get back a structured voice profile with: voice-attribute matrix (four axes), sentence-structure tendencies, vocabulary signatures, rhythm markers, and recurring framing devices. Each finding cites a specific line from the samples.

### 2. Voice application prompt (`templates/voice-application.md`)

Paste the saved profile + a generic draft. Get back a rewrite that matches the voice. Includes a self-check at the end — the AI flags any line it isn't sure passes the on-brand test.

### 3. Voice drift detector (`playbooks/voice-drift-detection.md`)

For when you suspect AI output has slipped back into corporate default. A short rubric the AI runs against any draft, scoring each section as on-voice / drift / off-voice and pointing to the exact phrase that triggered the call.

### 4. The voice profile itself

The deliverable from step 1. You save this file as `voice-profile.md` (or paste it into a project memory) and reuse it forever. The format is designed to be machine-readable on its way back into the next prompt.

---

## The voice-attribute matrix

Every voice profile scores four axes from 1 to 5:

```
Formal       1 ——————— 5   Casual
Serious      1 ——————— 5   Playful
Direct       1 ——————— 5   Diplomatic
Technical    1 ——————— 5   Accessible
```

A score of 3 means "lands in the middle on this axis." A score of 1 or 5 means "this is a load-bearing trait — never violate it." The AI is instructed to weight 1s and 5s heaviest when applying voice to new copy.

A worked output looks like:
- **Formal/Casual: 4** — uses contractions, drops articles for punch ("Built this for X"), but never slangy
- **Serious/Playful: 2** — dry rather than goofy; the few jokes land via understatement, not punchlines
- **Direct/Diplomatic: 5** — opens with the ask, no warm-up
- **Technical/Accessible: 3** — uses domain words but defines them in the same sentence

That's the kind of detail that makes a profile useful. "Authentic and bold" is not.

---

## The prompt patterns

When extracting a voice, the input shape is:

```
[Samples]
Paste 3-5 samples of writing that sound the way you want to sound.
Label each one (own LinkedIn post / customer-favored blog intro / etc).

[Context]
Who reads this voice's output? (prospective B2B buyers / parents of soccer kids / etc.)
What's it usually for? (sales pages / weekly newsletter / cold emails / all of the above)

[Constraints]
Anything off-limits? (no swearing / no first person / never mention competitors by name)
```

When applying a voice:

```
[Voice profile]
Paste the saved profile.

[Draft]
Paste the rough or generic copy you want rewritten.

[Goal]
What is this for, and what's the desired action from the reader?
```

Skipping the [Voice profile] block is how you end up with generic AI output. The profile is the load-bearing piece.

---

## Worked example: 3 paragraphs in, voice profile + rewrite out

**Input — three samples:**

> Sample 1 (LinkedIn): "Just finished the call. Hard pass. They wanted a 12-month engagement and won't say what success looks like. Saving you the same conversation: ask what success means before you ask what it costs."

> Sample 2 (newsletter intro): "Three weeks of silence. Sorry — was deep in the rewrite. Back now. Here's what changed."

> Sample 3 (landing-page hero): "You don't need another framework. You need to ship one thing this week. Here's the thing."

**Extracted profile:**
- Formal/Casual: **4** (contractions everywhere, fragments for punch)
- Serious/Playful: **2** (no jokes, dry asides)
- Direct/Diplomatic: **5** (every opener leads with the verdict)
- Technical/Accessible: **2** (zero jargon, second-person, short sentences)
- **Sentence structure:** average ~9 words. Heavy use of two-beat openers. Frequent sentence fragments.
- **Vocabulary signatures:** "hard pass," "ship," "here's the thing/what changed." Avoids: "leverage," "synergy," "stakeholder."
- **Framing device:** verdict-first. Calls the reader's likely next move before they make it.
- **Anti-patterns to flag:** any sentence starting with "In today's fast-paced..." Any use of "transform," "unlock," "elevate."

**Generic draft to rewrite:**
> "We are excited to announce the launch of our new platform designed to help busy founders streamline their daily operations through cutting-edge AI technology."

**Rewritten in voice:**
> "New thing live. It's for founders who waste their day on the same five admin tasks. Takes about a minute to set up. Here it is."

That's the test. If you can run the same generic draft through both versions and feel the difference in your gut, the profile works.

---

## What the AI gets wrong without this kit

1. **It averages toward LinkedIn voice.** Every output ends up sounding like the median LinkedIn post — vaguely inspirational, vaguely authoritative, zero edge. The profile blocks this by making the AI defend each line against the voice rubric.
2. **It defaults to three-act structure.** Generic AI loves "First... Then... Finally..." Most distinctive voices don't move that way. The profile captures actual sentence-structure tendencies and overrides the default.
3. **It uses words you'd never say.** Without a vocabulary signature, the AI will hand you "leverage," "elevate," "transform," and "best-in-class" no matter how many times you ask it not to. The kit makes the AI maintain an explicit ban list pulled from the samples (words the user never used) and an allow list (words they reach for repeatedly).

---

## What this kit will NOT do for you

- Write copy that's better than your samples. Voice extraction is a ceiling, not a multiplier — if your samples are mid, the rewrites will be mid.
- Replace having something to say. A voice without a point of view sounds eerie. Use this kit on writing that already has opinions, not on filler.
- Catch every drift. Re-run the drift detector on any high-stakes asset (sales page, fundraise post, manifesto) before you ship.
- Survive a co-writer change. If a different person is writing the next batch of drafts, the profile needs new samples from that person to remain accurate.

---

## Companion docs

- `templates/sample-to-voice.md` — extractor prompt + profile-output schema
- `templates/voice-application.md` — apply a saved profile to any draft
- `playbooks/voice-drift-detection.md` — rubric for catching off-voice AI output
- `memory.md` — domain context for the AI: vocabulary, workflows, common mistakes
- `optimization-pack.md` — self-contained system prompt for any chat AI
- `custom-gpt-instructions.md` — ChatGPT Custom GPT formatted
- `quick-start.md` — 3-step setup
