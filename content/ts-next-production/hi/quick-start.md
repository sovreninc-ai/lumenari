# Quick Start — TypeScript + Next.js Production Pack

आप एक minute से कम में चल रहे होंगे।

## ChatGPT, Claude (web), या Gemini

1. Tool open करें
2. `optimization-pack.md` के contents को system prompt / custom instructions / project knowledge field में paste करें
3. Production-ready Next.js + Supabase code लिखने को कहना शुरू करें

## Claude Code, Cursor, या Codex (SKILL.md path)

1. Terminal (या अपना code editor) open करें
2. Kit folder को `~/.claude/skills/ts-next-production/` (Claude Code) में drop करें या अपने project root पर `SKILL.md` paste करें (Cursor / Codex)
3. जो चाहिए वो type करें — Claude skill को automatically pick up करता है

## Test करें कि काम कर रहा है

Paste करें: "Write me a server action that updates a `teams.name` row with Zod validation and revalidatePath."

अगर आपको ऐसा code वापस मिले जो एक `ActionResult` discriminated union return करता है, Zod use करता है, user-scoped Supabase client use करता है, और `revalidatePath` call करता है, तो kit सही से loaded है।
