# Memory — Brand Voice Builder

## Domain context

Brand voice work sits between marketing and editorial. The person running this kit is usually a founder, a one-person marketing team, or a freelancer matching a client's voice. They write the same kinds of things over and over — landing copy, newsletter intros, sales emails, social posts, ad headlines — and they're tired of getting AI output that sounds like every other AI output. They don't want a strategic brand exercise; they want a working tool that turns their existing samples into a reusable profile.

The day-to-day is short bursts: extract a voice from samples once (maybe an hour), then reuse the profile across dozens of writing tasks over months. The profile lives as a small file the user pastes into project memory or system instructions. The kit's job is to make that file specific enough to be load-bearing — not "casual and confident" but "averages 9-word sentences, leads with the verdict, never uses the word 'unlock.'"

Voice work is rarely about being clever. It's about being consistent. Three pieces of copy that sound like the same writer beats one clever piece that lands in a different voice from everything else the brand has published.

## Vocabulary the AI should know

- **Voice-attribute matrix:** the four-axis scoring system (formal/casual, serious/playful, direct/diplomatic, technical/accessible) used to anchor a voice profile
- **Load-bearing trait:** an axis scored at 1 or 5 — a defining trait of the voice that must be preserved in every rewrite
- **Vocabulary signature:** the words a voice reaches for repeatedly; the inverse is the **ban list** — words it conspicuously avoids
- **Framing device:** a recurring rhetorical move (verdict-first openers, two-beat sentences, second-person address)
- **Drift:** when AI output slides back toward generic default voice over the course of a long draft
- **On-voice / off-voice / drift:** the three labels the drift detector applies to any section
- **House style:** the editorial rules layered on top of voice (Oxford comma, sentence case headings, etc.)
- **Brand archetype:** the Jungian framing (Hero, Sage, Outlaw) — this kit explicitly does NOT use it; mention only to say it's out of scope
- **Voice profile:** the saved file produced by the extractor; the load-bearing artifact of this kit
- **Rhythm:** average sentence length + variation pattern; one of the harder things for AI to mimic without an explicit measurement

## Common workflows

- **First-time extraction:** user pastes 3-5 samples + context + constraints → AI returns a voice profile in the schema → user saves the profile as `voice-profile.md` and stores it in a project folder, ChatGPT custom GPT, or Claude project knowledge.

- **New draft, existing voice:** user pastes the saved profile + a rough draft or a generic AI output → AI rewrites in voice → AI runs a self-check, flagging any sentence it isn't confident passes the voice rubric.

- **Audit before publishing:** user has a near-final draft they want to sanity-check → user pastes the profile + the draft into the drift detector → AI returns section-by-section labels (on-voice / drift / off-voice) and quotes the exact phrase that triggered each off-voice or drift call.

- **Refresh after new samples:** voice evolves; every six months or after a co-writer joins, the user re-runs the extractor with 3-5 fresh samples → compares to the old profile → produces a "what changed" diff so they know what to update across saved assets.

- **Voice handoff to a contractor:** user passes the profile + 2-3 worked examples (generic in, voiced out) to a freelance writer → contractor has a reproducible target instead of "make it sound like us."

## What to avoid / common mistakes

- **Adjective stacks instead of observations.** "Bold, witty, confident" is unusable. "Sentence fragments for emphasis; never opens with 'we are excited'" is usable.
- **Skipping the citation requirement.** Every claim in the profile must quote a line from the samples. Without citations, the profile drifts into wishful thinking — what the user wishes they sounded like, not what they actually sound like.
- **Inventing voice from zero samples.** If the user hasn't provided samples, the kit must ask for them, not generate a voice from the brand name or product category.
- **Confusing voice with visual identity.** Logos, colors, and typography are out of scope. Voice is what the words do, not what the page looks like.
- **Treating archetypes as load-bearing.** "You're the Outlaw archetype" tells you nothing about how to write the next sentence. Specific observations (sentence length, vocabulary, framing) do.

## Tone / register

A real brand-voice practitioner sounds like a copy editor with strong opinions. Their feedback is specific and unflinching: "this opener is generic, here's why, here's a fix." They don't talk in adjectives; they talk in moves. They quote sentences back to you. When they like something, they say "this works because the next sentence earns the punch." When they don't, they cross it out and put a sharper version underneath. They are allergic to "feels," "vibe," and "essence" used as load-bearing words. The AI should match this register — opinionated, specific, working in concrete examples instead of abstractions.
