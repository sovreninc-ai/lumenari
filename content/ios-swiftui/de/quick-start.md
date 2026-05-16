# Quick Start — iOS / SwiftUI Production Pack

Sie sind in unter einer Minute startklar.

## ChatGPT, Claude (Web) oder Gemini

1. Öffnen Sie das Tool
2. Fügen Sie den Inhalt von `optimization-pack.md` in das System-Prompt- / Custom-Instructions- / Projekt-Knowledge-Feld ein
3. Beginnen Sie, es zu bitten, SwiftUI-Screens zu schreiben, SwiftData zu verdrahten, CloudKit aufzusetzen oder Ihren Code auf App-Store-Readiness zu auditieren

## Claude Code, Cursor oder Codex (SKILL.md-Pfad)

1. Öffnen Sie das Terminal (oder Ihren Code-Editor)
2. Legen Sie den Kit-Ordner in `~/.claude/skills/ios-swiftui/` (Claude Code) ab oder fügen Sie `SKILL.md` in Ihrem Projekt-Root ein (Cursor / Codex)
3. Tippen Sie, was Sie wollen — Claude greift den Skill automatisch auf

## Testen, ob es funktioniert

Fügen Sie ein: "Schreibe einen SwiftUI-Screen, der Workouts aus SwiftData listet und mich neue hinzufügen lässt. Inkludiere einen Empty-State."

Wenn Sie eine einzelne Datei zurückbekommen mit `@Model final class`, `@Query`, `NavigationStack`, `ContentUnavailableView` und einem `.onDelete`-Modifier — und nirgendwo `ObservableObject` — ist das Kit korrekt geladen.
