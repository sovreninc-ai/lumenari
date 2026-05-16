# Quick Start — Supabase Schema & RLS Pack

You'll be running in under a minute.

## ChatGPT, Claude (web), or Gemini

1. Open the tool
2. Paste the contents of `optimization-pack.md` into the system prompt / custom instructions / project knowledge field
3. Start asking it to design schemas + RLS policies for your multi-tenant app

## Claude Code, Cursor, or Codex (SKILL.md path)

1. Open Terminal (or your code editor)
2. Drop the kit folder into `~/.claude/skills/supabase-schema-rls/` (Claude Code) or paste `SKILL.md` at your project root (Cursor / Codex)
3. Type what you want — Claude picks up the skill automatically

## Test it works

Paste: "Design the schema and RLS policies for an `invoices` table in my multi-tenant SaaS. Members can read; admins can write."

If you get back a migration with `organization_id`, the index, RLS enabled, separate read/write policies using `is_member_of` / `has_role`, the kit is loaded right.
