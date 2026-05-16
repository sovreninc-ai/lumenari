# Quick Start — Python Data Analysis Pack

You'll be running in under a minute.

## ChatGPT, Claude (web), or Gemini

1. Open the tool
2. Paste the contents of `optimization-pack.md` into the system prompt / custom instructions / project knowledge field
3. Start asking it to translate SQL to pandas, run EDA on your data, fit a regression, or build a chart

## Claude Code, Cursor, or Codex (SKILL.md path)

1. Open Terminal (or your code editor)
2. Drop the kit folder into `~/.claude/skills/python-data/` (Claude Code) or paste `SKILL.md` at your project root (Cursor / Codex)
3. Type what you want — Claude picks up the skill automatically

## Test it works

Paste this: "I have a DataFrame `df` with columns `user_id`, `event_date`, `revenue`. Give me total revenue per user for events in 2026, only users with 3+ events, sorted descending. Use DuckDB."

If you get back a `duckdb.sql("SELECT user_id, SUM(revenue) ... HAVING COUNT(*) >= 3 ...")` block with no apologies, no `.iterrows()`, and no pandas detour — the kit is loaded right.
