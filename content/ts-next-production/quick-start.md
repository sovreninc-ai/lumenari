# Quick Start — TypeScript + Next.js Production Pack

You'll be running in under a minute.

## ChatGPT, Claude (web), or Gemini

1. Open the tool
2. Paste the contents of `optimization-pack.md` into the system prompt / custom instructions / project knowledge field
3. Start asking it to write production-ready Next.js + Supabase code

## Claude Code, Cursor, or Codex (SKILL.md path)

1. Open Terminal (or your code editor)
2. Drop the kit folder into `~/.claude/skills/ts-next-production/` (Claude Code) or paste `SKILL.md` at your project root (Cursor / Codex)
3. Type what you want — Claude picks up the skill automatically

## Test it works

Paste: "Write me a server action that updates a `teams.name` row with Zod validation and revalidatePath."

If you get back code that returns an `ActionResult` discriminated union, uses Zod, uses the user-scoped Supabase client, and calls `revalidatePath`, the kit is loaded right.
