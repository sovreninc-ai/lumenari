# Quick Start — iOS / SwiftUI Production Pack

आप एक minute से कम में चल रहे होंगे।

## ChatGPT, Claude (web), या Gemini

1. Tool open करें
2. `optimization-pack.md` के contents को system prompt / custom instructions / project knowledge field में paste करें
3. SwiftUI screens लिखने, SwiftData wire करने, CloudKit set up करने, या App Store readiness के लिए अपने code audit करने को कहना शुरू करें

## Claude Code, Cursor, या Codex (SKILL.md path)

1. Terminal (या अपना code editor) open करें
2. Kit folder को `~/.claude/skills/ios-swiftui/` (Claude Code) में drop करें या अपने project root पर `SKILL.md` paste करें (Cursor / Codex)
3. जो चाहिए वो type करें — Claude skill को automatically pick up करता है

## Test करें कि काम कर रहा है

यह paste करें: "Write a SwiftUI screen that lists workouts from SwiftData and lets me add new ones. Include an empty state."

अगर आपको एक single file वापस मिले `@Model final class`, `@Query`, `NavigationStack`, `ContentUnavailableView`, और एक `.onDelete` modifier के साथ — और कहीं भी कोई `ObservableObject` नहीं — kit सही से loaded है।
