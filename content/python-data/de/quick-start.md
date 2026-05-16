# Quick Start — Python Data Analysis Pack

Sie sind in unter einer Minute startklar.

## ChatGPT, Claude (Web) oder Gemini

1. Öffnen Sie das Tool
2. Fügen Sie den Inhalt von `optimization-pack.md` in das System-Prompt- / Custom-Instructions- / Projekt-Knowledge-Feld ein
3. Beginnen Sie, es zu bitten, SQL in pandas zu übersetzen, EDA auf Ihren Daten zu laufen, eine Regression zu fitten oder ein Chart zu bauen

## Claude Code, Cursor oder Codex (SKILL.md-Pfad)

1. Öffnen Sie das Terminal (oder Ihren Code-Editor)
2. Legen Sie den Kit-Ordner in `~/.claude/skills/python-data/` (Claude Code) ab oder fügen Sie `SKILL.md` in Ihrem Projekt-Root ein (Cursor / Codex)
3. Tippen Sie, was Sie wollen — Claude greift den Skill automatisch auf

## Testen, ob es funktioniert

Fügen Sie ein: "Ich habe ein DataFrame `df` mit Spalten `user_id`, `event_date`, `revenue`. Gib mir Total-Revenue pro Nutzer für Events in 2026, nur Nutzer mit 3+ Events, absteigend sortiert. Nutze DuckDB."

Wenn Sie einen `duckdb.sql("SELECT user_id, SUM(revenue) ... HAVING COUNT(*) >= 3 ...")`-Block zurückbekommen ohne Entschuldigungen, kein `.iterrows()` und keinen pandas-Umweg — ist das Kit korrekt geladen.
