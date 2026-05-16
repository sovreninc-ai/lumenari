# クイックスタート — Python データ分析パック

1 分以内に稼働します。

## ChatGPT、Claude（Web）、Gemini

1. ツールを開く
2. `optimization-pack.md` の内容をシステムプロンプト / カスタム指示 / プロジェクトナレッジ欄に貼り付ける
3. SQL を pandas に翻訳する、データに EDA を行う、回帰を fit する、チャートを作るなどを依頼し始める

## Claude Code、Cursor、Codex（SKILL.md 経由）

1. ターミナル（またはコードエディタ）を開く
2. キットフォルダを `~/.claude/skills/python-data/`（Claude Code）に配置するか、`SKILL.md` をプロジェクトルートに貼り付ける（Cursor / Codex）
3. やりたいことを入力する — Claude が自動的にスキルを認識する

## 動作確認

次を貼り付け: 「`user_id`、`event_date`、`revenue` カラムを持つ DataFrame `df` がある。2026 年のイベントについてユーザーごとの合計売上を出し、イベントが 3 件以上のユーザーのみ、降順でソートして。DuckDB を使って。」

返ってきたものが、`duckdb.sql("SELECT user_id, SUM(revenue) ... HAVING COUNT(*) >= 3 ...")` ブロックで、謝罪なし、`.iterrows()` なし、pandas への迂回なし — であれば、キットは正しく読み込まれています。
