# クイックスタート — セールスコールドアウトリーチ + フォローアップ

60 秒以内に稼働。ツールを選んでください。

## Claude ユーザー

Claude を開く。新しいプロジェクトを作成。「カスタム指示」または「プロジェクトナレッジ」に `optimization-pack.md` の全内容を貼り付ける。`frameworks/`、`templates/`、`playbooks/` からのファイルをアップロード、Claude が参照として持てるように。プロジェクト内で新しい会話を開始。最初のメッセージ: ICP を 1 文で、欲しい成果物、プロスペクト特有のシグナルを伝える。例: 「ICP: Series A SaaS の Engineering VP、50〜200 従業員。コールドメール。シグナル: [VC] 主導の B ラウンドを 3 週間前に調達したばかり。バリュー: 脆弱なテストの再実行を減らして CI/CD 支出を削減」。

## ChatGPT ユーザー

ChatGPT を開く。「GPT を探す」 → 「GPT を作成」をクリック（Plus 必要）。「Instructions」に `custom-gpt-instructions.md` の全内容を貼り付ける。「Conversation starters」には、そのファイル末尾の 5 つを使う。「Knowledge」に `frameworks/`、`templates/`、`playbooks/` からの markdown ファイルをアップロード。GPT を保存（自分専用）。開く。最初のメッセージ: ICP + 成果物 + シグナル、上の Claude 例と同じ。

Plus がなければ、`optimization-pack.md` を通常のチャットの先頭に貼り付ける。同じ結果、永続性なし。

## Gemini、Codex、Cursor、その他の AI ツール

ツールを開く。新しい会話を開始。`optimization-pack.md` の全内容を最初のメッセージとして貼り付ける。追加: 「これを読み込んだことを確認し、ICP、成果物、シグナルを聞いてほしい」。それを行ったら準備完了。

Gemini Gems: 新しい Gem を作成、`optimization-pack.md` を instructions に貼り付け、保存、デフォルトチャットの代わりに Gem を使う。

---

## 動作確認

システムプロンプトを読み込んだら、これを貼り付け:

```
テスト実行。

ICP: Series A SaaS の Engineering 担当 VP、50〜200 従業員、米国拠点、React フロントエンドを構築。
プロスペクト: Sarah Chen、Beacon Labs の VP Engineering。シグナル: エンジニアリングチームが倍増した後、CI/CD パイプラインがボトルネックになっていることについて 4 日前に LinkedIn に投稿。
バリュー: 脆弱なテストの再実行を 60% 削減、CI 分とそれに伴うオンコールを削減。
プルーフ: Linear と Vercel が顧客。
CTA: 来週の火曜または水曜の 15 分。
制約: 75 ワード未満、件名 40 文字未満。

コールドメールを書いてください。
```

返ってきたメールが:
- CI/CD のペインに関する Sarah の特定の LinkedIn 投稿を参照
- 「transform」または「revolutionize」なしの平易な言葉でバリューを述べる
- 提案された時間付きの単一の依頼
- 75 ワード未満
- 「変えたい 2 つのもの」ブロックで終わる

...キットは正しく読み込まれている。メールが「Hope this finds you well」または「I wanted to reach out」で始まったら、システムプロンプトが読み込まれていない — 会話の先頭に再度貼り付ける。
