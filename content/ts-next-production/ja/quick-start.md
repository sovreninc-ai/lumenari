# クイックスタート — TypeScript + Next.js プロダクションパック

1 分以内に稼働します。

## ChatGPT、Claude（Web）、Gemini

1. ツールを開く
2. `optimization-pack.md` の内容をシステムプロンプト / カスタム指示 / プロジェクトナレッジ欄に貼り付ける
3. プロダクション対応の Next.js + Supabase コードの記述を依頼し始める

## Claude Code、Cursor、Codex（SKILL.md 経由）

1. ターミナル（またはコードエディタ）を開く
2. キットフォルダを `~/.claude/skills/ts-next-production/`（Claude Code）に配置するか、`SKILL.md` をプロジェクトルートに貼り付ける（Cursor / Codex）
3. やりたいことを入力する — Claude が自動的にスキルを認識する

## 動作確認

次を貼り付け: 「Zod バリデーションと revalidatePath を使って、`teams.name` の行を更新するサーバーアクションを書いてください。」

返ってきたコードが `ActionResult` 判別共用体を返し、Zod を使い、ユーザースコープの Supabase クライアントを使い、`revalidatePath` を呼び出していれば、キットは正しく読み込まれています。
