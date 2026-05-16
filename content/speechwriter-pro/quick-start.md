# Quick Start — Speechwriter Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro/Team plan unlocks Projects; works in a regular chat too). In "Custom instructions" or "Project knowledge," paste `optimization-pack.md`. Upload `frameworks/openers-structures-closers.md` and `memory.md` to project knowledge. Start a conversation. First message: name the occasion ("keynote," "town hall," "eulogy") and either paste your brief or ask Claude to run the intake.

## ChatGPT users

Open ChatGPT. "Explore GPTs" → "Create a GPT" (Plus required). In "Instructions," paste `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload the frameworks and memory docs. Save private. Open it and say: "I have a [occasion] coming up — run the brief with me."

No Plus? Paste `optimization-pack.md` at the top of a regular chat. Works the same; no persistence.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. New conversation. Paste `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me what occasion I'm writing for." For Gemini Gems: create a Gem, paste into instructions, save, use that Gem.

---

## Test it works

Paste this in:

```
I have a town hall in two weeks. CEO is delivering. Audience is the full company (about 400 people, hybrid in-person + Zoom). The hard thing is we just missed Q1 by 18% and there are rumors of a hiring freeze that I can't confirm or deny on stage. Length: 12 minutes. CEO voice: dry, plainspoken, sometimes self-deprecating — she once opened a previous all-hands with "Well, that went badly." The one thing they should remember: we're not pretending this is fine, but the plan is still the plan. Run the brief.
```

If you get back the 7 brief questions (or a confirmation that you already gave most of them, with the missing ones asked), no "thank you for sharing," no rah-rah opener proposed, and the AI flags the rumor sensitivity as a "hard thing" to handle directly — you're loaded right. If you got "What a great opportunity to inspire your team!" or three openers that all start with "Today I want to talk about" — paste the system prompt again. It didn't load.
