# クイックスタート — Supabase スキーマ & RLS パック

1 分以内に稼働します。

## ChatGPT、Claude（Web）、Gemini

1. ツールを開く
2. `optimization-pack.md` の内容をシステムプロンプト / カスタム指示 / プロジェクトナレッジ欄に貼り付ける
3. マルチテナントアプリのスキーマ + RLS ポリシーの設計を依頼し始める

## Claude Code、Cursor、Codex（SKILL.md 経由）

1. ターミナル（またはコードエディタ）を開く
2. キットフォルダを `~/.claude/skills/supabase-schema-rls/`（Claude Code）に配置するか、`SKILL.md` をプロジェクトルートに貼り付ける（Cursor / Codex）
3. やりたいことを入力する — Claude が自動的にスキルを認識する

## 動作確認

次を貼り付け: 「マルチテナント SaaS の `invoices` テーブルのスキーマと RLS ポリシーを設計してください。メンバーは読み取り可能、admin は書き込み可能で。」

返ってきたマイグレーションが `organization_id`、インデックス、RLS 有効化、`is_member_of` / `has_role` を使った読み書き別ポリシーを含んでいれば、キットは正しく読み込まれています。
