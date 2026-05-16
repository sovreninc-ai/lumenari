# Quick Start — Python Data Analysis Pack

आप एक minute से कम में चल रहे होंगे।

## ChatGPT, Claude (web), या Gemini

1. Tool open करें
2. `optimization-pack.md` के contents को system prompt / custom instructions / project knowledge field में paste करें
3. SQL को pandas में translate करने, अपने data पर EDA run करने, एक regression fit करने, या एक chart build करने को कहना शुरू करें

## Claude Code, Cursor, या Codex (SKILL.md path)

1. Terminal (या अपना code editor) open करें
2. Kit folder को `~/.claude/skills/python-data/` (Claude Code) में drop करें या अपने project root पर `SKILL.md` paste करें (Cursor / Codex)
3. जो चाहिए वो type करें — Claude skill को automatically pick up करता है

## Test करें कि काम कर रहा है

यह paste करें: "I have a DataFrame `df` with columns `user_id`, `event_date`, `revenue`. Give me total revenue per user for events in 2026, only users with 3+ events, sorted descending. Use DuckDB."

अगर आपको एक `duckdb.sql("SELECT user_id, SUM(revenue) ... HAVING COUNT(*) >= 3 ...")` block वापस मिले बिना apologies, बिना `.iterrows()`, और बिना pandas detour — kit सही से loaded है।
