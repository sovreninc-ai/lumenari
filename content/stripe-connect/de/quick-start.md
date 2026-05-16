# Quick Start — Stripe Connect Implementation Pack

Sie sind in unter einer Minute startklar.

## ChatGPT, Claude (Web) oder Gemini

1. Öffnen Sie das Tool
2. Fügen Sie den Inhalt von `optimization-pack.md` in das System-Prompt- / Custom-Instructions- / Projekt-Knowledge-Feld ein
3. Beginnen Sie, es zu bitten, Ihre Stripe Connect-Flows zu designen — Onboarding, Charges, Refunds, Webhooks

## Claude Code, Cursor oder Codex (SKILL.md-Pfad)

1. Öffnen Sie das Terminal (oder Ihren Code-Editor)
2. Legen Sie den Kit-Ordner in `~/.claude/skills/stripe-connect/` (Claude Code) ab oder fügen Sie `SKILL.md` in Ihrem Projekt-Root ein (Cursor / Codex)
3. Tippen Sie, was Sie wollen — Claude greift den Skill automatisch auf

## Testen, ob es funktioniert

Fügen Sie ein: "Schreibe den Webhook-Handler für `checkout.session.completed` mit Idempotenz für meine Stripe Connect-Plattform."

Wenn Sie einen Handler zurückbekommen, der die Signatur verifiziert, eine `processed_events`-Tabelle auf die event.id prüft, in einem try/catch verarbeitet und erst nach Erfolg als verarbeitet markiert — ist das Kit korrekt geladen.
