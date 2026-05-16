# クイックスタート — Stripe Connect 実装パック

1 分以内に稼働します。

## ChatGPT、Claude（Web）、Gemini

1. ツールを開く
2. `optimization-pack.md` の内容をシステムプロンプト / カスタム指示 / プロジェクトナレッジ欄に貼り付ける
3. Stripe Connect のフロー設計を依頼し始める — オンボーディング、チャージ、返金、webhook

## Claude Code、Cursor、Codex（SKILL.md 経由）

1. ターミナル（またはコードエディタ）を開く
2. キットフォルダを `~/.claude/skills/stripe-connect/`（Claude Code）に配置するか、`SKILL.md` をプロジェクトルートに貼り付ける（Cursor / Codex）
3. やりたいことを入力する — Claude が自動的にスキルを認識する

## 動作確認

次を貼り付け: 「Stripe Connect プラットフォーム向けに、冪等性付きで `checkout.session.completed` の webhook ハンドラーを書いてください。」

返ってきたハンドラーが署名を検証し、event.id を `processed_events` テーブルで確認し、try/catch 内で処理し、成功後にのみ処理済みとしてマークしていれば — キットは正しく読み込まれています。
