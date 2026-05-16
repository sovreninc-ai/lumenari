# Quick Start — iOS / SwiftUI Production Pack

You'll be running in under a minute.

## ChatGPT, Claude (web), or Gemini

1. Open the tool
2. Paste the contents of `optimization-pack.md` into the system prompt / custom instructions / project knowledge field
3. Start asking it to write SwiftUI screens, wire SwiftData, set up CloudKit, or audit your code for App Store readiness

## Claude Code, Cursor, or Codex (SKILL.md path)

1. Open Terminal (or your code editor)
2. Drop the kit folder into `~/.claude/skills/ios-swiftui/` (Claude Code) or paste `SKILL.md` at your project root (Cursor / Codex)
3. Type what you want — Claude picks up the skill automatically

## Test it works

Paste this: "Write a SwiftUI screen that lists workouts from SwiftData and lets me add new ones. Include an empty state."

If you get back a single file with `@Model final class`, `@Query`, `NavigationStack`, `ContentUnavailableView`, and an `.onDelete` modifier — and no `ObservableObject` anywhere — the kit is loaded right.
