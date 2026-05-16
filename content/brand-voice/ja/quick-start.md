# クイックスタート — ブランドボイスビルダー

1 分以内に稼働します。

## ChatGPT、Claude (web)、または Gemini

1. ツールを開く
2. `optimization-pack.md` の内容をシステムプロンプト / カスタム指示 / プロジェクトナレッジ欄に貼り付け
3. 3〜5 個の書き物サンプルを貼り、ボイスプロファイルの抽出を依頼

## Claude Code、Cursor、または Codex (SKILL.md パス)

1. ターミナル（またはコードエディタ）を開く
2. キットフォルダを `~/.claude/skills/brand-voice/` に投入（Claude Code）または `SKILL.md` をプロジェクトルートに貼る（Cursor / Codex）
3. 欲しいものを入力 — Claude が自動的にスキルを拾う

## 動作確認

これを貼る:「次の 3 つのサンプルからボイスプロファイルを抽出して: (1) 'Hard pass on the demo. They wouldn't define success.' (2) 'Three weeks of silence. Sorry. Back now.' (3) 'You don't need a framework. Ship the thing.'」

4 つのボイス属性スコア（1〜5）、語彙シグネチャ、禁止リスト、名前付きフレーミングデバイスを持つプロファイルが返ってきて、各主張がサンプルを引用していれば、キットは正しく読み込まれています。
