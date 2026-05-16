# Quick Start — Coach / Trainer / Therapist Pack

You'll be running in under a minute.

## ChatGPT, Claude (web), or Gemini

1. Open the tool
2. Paste the contents of `optimization-pack.md` into the system prompt / custom instructions / project knowledge field
3. Tell it your practitioner type and ask it to draft what you need (session note, client email, marketing copy)

## Claude Code, Cursor, or Codex (SKILL.md path)

1. Open Terminal (or your code editor)
2. Drop the kit folder into `~/.claude/skills/coach-pro/` (Claude Code) or paste `SKILL.md` at your project root (Cursor / Codex)
3. Type what you want — Claude picks up the skill automatically

## Test it works

Paste this: "I'm a life coach. Write a SOAP-style session note from this rough material: 45-min video session with client J.K., session 4. She talked about boundary struggles with her sister and committed to one direct conversation this week."

If you get back a note labeled as **observations** (not Assessment), under 400 words, with a disclaimer at the bottom, and no clinical diagnosis language — the kit is loaded right.

If you get a SOAP note with an "Assessment" section that names a clinical condition, the kit isn't loaded — re-paste `optimization-pack.md`.
