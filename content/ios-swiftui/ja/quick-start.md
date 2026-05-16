# クイックスタート — iOS / SwiftUI プロダクションパック

1 分以内に稼働します。

## ChatGPT、Claude（Web）、Gemini

1. ツールを開く
2. `optimization-pack.md` の内容をシステムプロンプト / カスタム指示 / プロジェクトナレッジ欄に貼り付ける
3. SwiftUI 画面の記述、SwiftData の配線、CloudKit のセットアップ、App Store 対応のための監査を依頼し始める

## Claude Code、Cursor、Codex（SKILL.md 経由）

1. ターミナル（またはコードエディタ）を開く
2. キットフォルダを `~/.claude/skills/ios-swiftui/`（Claude Code）に配置するか、`SKILL.md` をプロジェクトルートに貼り付ける（Cursor / Codex）
3. やりたいことを入力する — Claude が自動的にスキルを認識する

## 動作確認

次を貼り付け: 「SwiftData からワークアウトをリストし、新しいものを追加できる SwiftUI 画面を書いてください。空状態を含めること。」

返ってきた単一ファイルが `@Model final class`、`@Query`、`NavigationStack`、`ContentUnavailableView`、`.onDelete` 修飾子を含み — どこにも `ObservableObject` がなければ — キットは正しく読み込まれています。
