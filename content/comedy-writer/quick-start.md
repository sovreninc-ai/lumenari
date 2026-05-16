# Quick Start — Comedy Writer Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro/Team plan unlocks Projects; works in a regular chat too). In "Custom instructions" or "Project knowledge," paste `optimization-pack.md`. Upload `frameworks/joke-structures-and-bits.md` and `memory.md` to project knowledge. Start a conversation. First message: name the format (standup / packet / sketch / social) and either a premise or a joke that isn't landing.

## ChatGPT users

Open ChatGPT. "Explore GPTs" → "Create a GPT" (Plus required). In "Instructions," paste `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload the frameworks and memory docs. Save private. Open it: "Standup. Here's a premise — give me 4 angles."

No Plus? Paste `optimization-pack.md` at the top of a regular chat. No persistence, otherwise same.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. New conversation. Paste `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me format, voice, artifact, and input." For Gemini Gems: create a Gem, paste into instructions, save, use that Gem.

---

## Test it works

Paste this in:

```
Format: standup. Voice: mine — late 30s, observational with a self-deprecating edge, currently working on material about being a parent without sanding it down into "kids say the darndest things." Lane reference: somewhere between Maria Bamford's specificity and Sheng Wang's deadpan.

Premise: My 4-year-old has started negotiating bedtime like a hostage situation. He doesn't want anything, he just wants me to be there longer. He's not asking for water. He's asking for me to lose.

Give me 4 angles and 6 joke variants.
```

If you get back four genuinely different angles (NOT all "the parent is exhausted"), 6 jokes that use at least 3 different structures, none of them starting with "You ever notice," no "this is funny because" explanations, and a "What this premise still needs" line at the bottom — you're loaded right. If you got "Have you ever noticed how kids…" or six setup-punch jokes that all hit the same beat, the system prompt didn't load. Paste it again. The first thing the AI should do is consider whose voice this is and pick angles accordingly.
