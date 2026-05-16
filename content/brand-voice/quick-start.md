# Quick Start — Brand Voice Builder

You'll be running in under a minute.

## ChatGPT, Claude (web), or Gemini

1. Open the tool
2. Paste the contents of `optimization-pack.md` into the system prompt / custom instructions / project knowledge field
3. Paste 3-5 writing samples and ask it to extract a voice profile

## Claude Code, Cursor, or Codex (SKILL.md path)

1. Open Terminal (or your code editor)
2. Drop the kit folder into `~/.claude/skills/brand-voice/` (Claude Code) or paste `SKILL.md` at your project root (Cursor / Codex)
3. Type what you want — Claude picks up the skill automatically

## Test it works

Paste this: "Extract a voice profile from these three samples: (1) 'Hard pass on the demo. They wouldn't define success.' (2) 'Three weeks of silence. Sorry. Back now.' (3) 'You don't need a framework. Ship the thing.'"

If you get back a profile with four voice-attribute scores (1-5), a vocabulary signature, a ban list, and a named framing device — with each claim citing a sample — the kit is loaded right.
