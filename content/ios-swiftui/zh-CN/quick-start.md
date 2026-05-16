# 快速开始 — iOS / SwiftUI 生产级技能包

不到一分钟即可上手。

## ChatGPT、Claude（网页版）或 Gemini

1. 打开对应工具
2. 将 `optimization-pack.md` 的全部内容粘贴到系统提示词 / 自定义指令 / 项目知识库字段中
3. 开始让它写 SwiftUI 屏幕、接 SwiftData、配置 CloudKit、或为 App Store 审核做代码审计

## Claude Code、Cursor 或 Codex（SKILL.md 路径）

1. 打开终端（或你的代码编辑器）
2. 将套件文件夹放入 `~/.claude/skills/ios-swiftui/`（Claude Code）；或在 Cursor / Codex 项目根目录中粘贴 `SKILL.md`
3. 直接说出你的需求 —— Claude 会自动加载该技能

## 验证是否生效

粘贴一句："写一个 SwiftUI 屏幕，从 SwiftData 列出 workouts 并允许新增，包含空状态。"

如果返回的单文件包含 `@Model final class`、`@Query`、`NavigationStack`、`ContentUnavailableView` 与 `.onDelete`，并且代码中没有任何 `ObservableObject` —— 说明套件已正确加载。
