# Quick Start — Supabase Schema & RLS Pack

Sie sind in unter einer Minute startklar.

## ChatGPT, Claude (Web) oder Gemini

1. Öffnen Sie das Tool
2. Fügen Sie den Inhalt von `optimization-pack.md` in das System-Prompt- / Custom-Instructions- / Projekt-Knowledge-Feld ein
3. Beginnen Sie, es zu bitten, Schemas + RLS-Policies für Ihre Multi-Tenant-App zu designen

## Claude Code, Cursor oder Codex (SKILL.md-Pfad)

1. Öffnen Sie das Terminal (oder Ihren Code-Editor)
2. Legen Sie den Kit-Ordner in `~/.claude/skills/supabase-schema-rls/` (Claude Code) ab oder fügen Sie `SKILL.md` in Ihrem Projekt-Root ein (Cursor / Codex)
3. Tippen Sie, was Sie wollen — Claude greift den Skill automatisch auf

## Testen, ob es funktioniert

Fügen Sie ein: "Designe das Schema und die RLS-Policies für eine `invoices`-Tabelle in meinem Multi-Tenant-SaaS. Members können lesen; Admins können schreiben."

Wenn Sie eine Migration zurückbekommen mit `organization_id`, dem Index, aktiviertem RLS, separaten Read/Write-Policies, die `is_member_of` / `has_role` nutzen, ist das Kit korrekt geladen.
