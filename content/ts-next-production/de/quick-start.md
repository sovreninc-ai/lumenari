# Quick Start — TypeScript + Next.js Production Pack

Sie sind in unter einer Minute startklar.

## ChatGPT, Claude (Web) oder Gemini

1. Öffnen Sie das Tool
2. Fügen Sie den Inhalt von `optimization-pack.md` in das System-Prompt- / Custom-Instructions- / Projekt-Knowledge-Feld ein
3. Beginnen Sie, es zu bitten, produktionsreifen Next.js + Supabase Code zu schreiben

## Claude Code, Cursor oder Codex (SKILL.md-Pfad)

1. Öffnen Sie das Terminal (oder Ihren Code-Editor)
2. Legen Sie den Kit-Ordner in `~/.claude/skills/ts-next-production/` (Claude Code) ab oder fügen Sie `SKILL.md` in Ihrem Projekt-Root ein (Cursor / Codex)
3. Tippen Sie, was Sie wollen — Claude greift den Skill automatisch auf

## Testen, ob es funktioniert

Fügen Sie ein: "Schreib mir eine Server Action, die eine `teams.name`-Zeile mit Zod-Validation und revalidatePath aktualisiert."

Wenn Sie Code zurückbekommen, der eine diskriminierte `ActionResult`-Union zurückgibt, Zod nutzt, den user-gescopten Supabase-Client verwendet und `revalidatePath` aufruft, ist das Kit korrekt geladen.
