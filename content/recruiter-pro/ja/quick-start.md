# クイックスタート — 60 秒セットアップ

3 つの段落、プラットフォームごとに 1 つ。自分のものを選び、貼り付け、テストしてください。

---

## Claude (claude.ai または API 上の Claude)

新しい Project を作成。「Recruiter Co-Pilot」と命名。Project の **Instructions** 欄に `optimization-pack.md` の全内容を貼り付けます。保存。その Project 内のすべてのチャットが、リクルーターモードで動作します — JD ライター、アウトリーチドラフター、面接キットビルダー、ブール文字列ジェネレーター。単発利用なら、新しいチャットの最初のメッセージに最適化パックを貼ってください。ボーナス: 既存の好成績 JD と最も返信を集めたアウトリーチを Project のナレッジベースに投入すると、AI は新規ドラフト時にチームの実際のボイスとブランドを参照します。

**テスト:** Project 内で新しいチャットを開始し、下のテストプロンプトを貼り付けてください。

---

## ChatGPT (Custom GPT または単発チャット)

Custom GPT 用（Plus または Team）: 「My GPTs」→「Create a GPT」→「Configure」へ。**Instructions** 欄に `custom-gpt-instructions.md` を貼り付けます。「Recruiter Co-Pilot」と命名。説明:「ジャーゴンなしの JD、返信が来るアウトリーチ、面接キット、ブール文字列」。保存。単発利用なら、通常のスレッドの最初のメッセージに `optimization-pack.md` を貼ってください。

**テスト:** 新しい GPT を開き、下のテストプロンプトを貼り付けてください。

---

## Gemini、Cursor、Codex (またはその他の AI)

**Gemini Advanced** では新しい Gem を作成。Gem の Instructions 欄に最適化パックを貼り、保存し、その Gem を採用業務に使います。**Cursor** ではこのキットの当てはまりは弱い（Cursor はコード用）が、キャリアページのリポジトリで JD を MDX として書くなら、最適化パックを `.cursorrules` に貼ってください。**Codex / GitHub Copilot Chat / その他の AI** では、新しい会話の最初のメッセージに最適化パックを貼り、新しいスレッドの開始時に再度貼ってください。

**テスト:** 下のテストプロンプトでセットアップを確認してください。

---

## 貼り付け可能なテストプロンプト

```
30 名規模のシリーズ B SaaS でシニアフルスタックエンジニアを採用しています。リモート優先、米国 + カナダ。スタック: TypeScript、React、Node、AWS 上の Postgres。給与帯: USD $170-210K ベース + 0.05〜0.15% エクイティ。採用マネージャーが JD を書いたのですが、出来が悪いと思います。送ってきたものはこれ:

「We're looking for a passionate rock star full-stack engineer to join our fast-paced, dynamic team. You'll be a 10x developer who thrives in ambiguity and isn't afraid to wear many hats. Must have a Bachelor's degree in Computer Science and 10+ years of experience. We work hard and play hard, and we're like a family here. Competitive salary and benefits.」

必要なもの:
1. 送ってきたもののバイアスリント (具体的にフラグした語句と理由)
2. キットのフォーマットで完全に書き直した JD
3. シニアエンジニアにコールド DM するためのアウトリーチテンプレート (冒頭は 3 行以内)
4. TypeScript + React + Node を持ち、スタートアップで出荷経験のあるシニアエンジニア向け LinkedIn Recruiter のブール文字列
```

返ってくるはずのもの: 「passionate」「rock star」「fast-paced」「10x developer」「wear many hats」「Bachelor's degree required」「10+ years」「work hard play hard」「like a family」をフラグしたリントパス — それぞれに具体的な修正案付き。続いて給与帯、実成果ベースの「what you'll do」、実在の面接プロセス、勤務形態セクションを備えた約 500 ワードのクリーン JD。次にメッセージの理由をリアルに感じさせる 3 行のアウトリーチ。最後に各句を説明したブール文字列、加えて最初のものが少なすぎる / 多すぎるときの 2 つのバリエーション。

「rock star」がまだ残った JD が返ってきたら、または給与帯に言及のないアウトリーチが返ってきたら、最適化パックは読み込まれていません。再度貼ってください。
