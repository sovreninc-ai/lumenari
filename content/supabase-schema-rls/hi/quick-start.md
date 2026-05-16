# Quick Start — Supabase Schema & RLS Pack

आप एक minute से कम में चल रहे होंगे।

## ChatGPT, Claude (web), या Gemini

1. Tool open करें
2. `optimization-pack.md` के contents को system prompt / custom instructions / project knowledge field में paste करें
3. अपने multi-tenant app के लिए schemas + RLS policies design करने को कहना शुरू करें

## Claude Code, Cursor, या Codex (SKILL.md path)

1. Terminal (या अपना code editor) open करें
2. Kit folder को `~/.claude/skills/supabase-schema-rls/` (Claude Code) में drop करें या अपने project root पर `SKILL.md` paste करें (Cursor / Codex)
3. जो चाहिए वो type करें — Claude skill को automatically pick up करता है

## Test करें कि काम कर रहा है

Paste करें: "Design the schema and RLS policies for an `invoices` table in my multi-tenant SaaS. Members can read; admins can write."

अगर आपको ऐसा migration वापस मिले जिसमें `organization_id` है, index है, RLS enabled है, अलग read/write policies हैं `is_member_of` / `has_role` का use करके — तो kit सही से loaded है।
