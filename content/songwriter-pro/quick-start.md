# Quick Start — Songwriter / Lyricist Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `frameworks/song-structure-and-rhyme.md` and `memory.md` to project knowledge so Claude has the structure templates and your vocabulary. If you have past lyrics or a catalog file, upload that too — Claude uses it as a voice reference. Start a new conversation. First message: tell Claude your lane in one sentence ("I'm a Nashville staff writer at a small pub, country, leaning Americana — pitching for artist cuts and occasional sync"), then describe what you want — "Brainstorm angles for a song about coming home that isn't generic" or "Draft V/C/B for this hook."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload `frameworks/song-structure-and-rhyme.md` and `memory.md` (plus past lyrics if you have them). Save the GPT (private is fine). Open it and start with: "I write [genre + subgenre]. Tempo/feel: [ballad/mid-tempo/uptempo]. Target use: [cut/self-release/sync]. Reference tracks: [2-3 from last 2 years]. Today I need: [angles/hook/structure/lyric/sync pitch]."

If you don't have ChatGPT Plus, just paste `optimization-pack.md` at the top of a regular chat. It'll work — you lose the persistent GPT and file uploads.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for genre, reference tracks, target use, and concept." Once it does, you're set.

For Gemini Gems specifically: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem instead of the default chat.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. Genre: country, leaning Americana. Tempo: mid-tempo, 84 BPM, half-time feel in the chorus. Reference tracks: Lori McKenna "The Bird & The Rifle," Chris Stapleton "Cold," Ashley McBryde "Light On In The Kitchen." Target: artist cut, mid-tier female vocalist 28-38. POV: 1st person, addressed to ex-partner six months after the breakup. Concept: that specific moment when you forget for ten seconds — you're reaching for your phone to text them something you saw — and then you remember.

Brainstorm 4 angles, ranked by specificity. For the top angle, give me 5 hook candidates.
```

If you get back: 4 angles each with a specific framing (not "moving on" or "letting go" — actual specific situations), each with a POV note and a hook seed, ranked with specificity scores, plus 5 hook candidates with syllable counts and cliche checks, plus a "Things to gut-check before tracking" block — the kit is loaded right. If you got "Find Your Way Back" as a hook candidate, or any rhyme using heart/start, the system prompt didn't load — try pasting it again.
