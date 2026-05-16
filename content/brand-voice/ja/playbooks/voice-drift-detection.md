# ボイスドリフト検出

AI 出力が企業デフォルトに戻った疑いがあるとき向け。出荷前の任意のドラフトに実行 — 特にセールスページ、資金調達投稿、マニフェスト、ローンチ告知。

---

## プロンプト

```
保存済みプロファイルに対してドラフトのボイスドリフトを監査します。ルール:

1. ドラフトをプロファイルルーブリックと比較。寛大にならない。ドリフトは
   弁解するよりフラグするほうが有用。
2. すべての段落 (またはブロック — セクションヘッダー、箇条書きリスト、CTA)
   を on-voice / drift / off-voice でスコアリング。
3. すべての drift または off-voice 判定について、判定を引き起こした正確な
   語句を引用し、どのボイスルールに違反したかを名指す。
4. 「修正優先順位」で終える — 先に直せばボイス一貫性が最も改善する 2〜3 個。

出力フォーマット:

## セクション別
- [セクション 1 ラベル]: on-voice / drift / off-voice
  - トリガー: 「[引用語句]」 — [ルール] に違反
- [セクション 2 ラベル]: on-voice / drift / off-voice
  - トリガー: 「[引用語句]」 — [ルール] に違反
- ...

## 全体ドリフトスコア: X/10
(10 = 完全に on-voice、0 = 認識不能)

## 修正優先順位 (トップ 3)
1. [例付きの具体的変更]
2. [例付きの具体的変更]
3. [例付きの具体的変更]

プロファイルとドラフトを以下に。
```

---

## あなたの入力

```
[ボイスプロファイル]
[保存済みプロファイル全体を貼る]

[ドラフト]
[監査したい全ドラフトを貼る]
```

---

## 注視すべきドリフトシグナル

**禁止単語の密輸。** 最も一般的なドリフト。AI は「leverage」を使えないと知る — そこで「harness」「tap into」「unlock」と書く。同じ意味の形、違う単語。ルール: 文が禁止単語と同じ意味を持つなら、それは依然ドリフト。

**文長のクリープ。** ボイスは平均 9 ワード。ドラフトの半ばで、文は 18 ワード、しかも上昇中。これは AI が「滑らか」な散文に戻る既定動作。長いドラフトの後半では常に文長を確認。

**汎用冒頭。**「In a world where...」「Today's [audience] needs...」「We've all been there...」 直接的 / 外交的で 5 のボイスでこれらは自動的に off-voice。

**三幕ドリフト。**「First... Then... Finally...」または「Three things changed...」 ボイスがそう動かないなら、AI はとにかくこの構造を押し付ける。捕まえる。

**形容詞スタッキング。**「Bold, witty, and confident messaging.」 ボイスは形容詞で自分自身を語らない。ドラフトに 3 形容詞リズムでブランドを記述する文があれば、それはドリフト。

**読者へのお世辞。**「For founders who refuse to settle.」「For the few who get it.」 ボイスプロファイルが読者へのお世辞をフレーミングデバイスに含まないなら、これはドリフト — AI が媚びている。

**「Excited to announce.」** 2007 年のプレスリリースでないボイスは、この句を決して使うべきでない。自動 off-voice として扱う。

---

## 出力例

**プロファイル（短縮）:**
```
Voice: Solo Builder
荷を背負う: 直接的/外交的 5 (評決先行冒頭)、シリアス/プレイフル 2 (ドライ、冗談なし)
平均文: 9 ワード
禁止リスト: leverage、transform、unlock、journey、passion、ecosystem、excited to announce
```

**監査するドラフト:**
> 「We're excited to share something we've been working on for a long time. In today's fast-paced world, founders are constantly juggling priorities and struggling to find the time to focus on what truly matters. That's why we built a tool that unlocks productivity and helps you transform the way you work. We can't wait for you to try it.」

**監査出力:**

```
## セクション別
- 文 1: off-voice
  - トリガー: 「We're excited to share」 — 禁止リストに違反 (プレスリリース言語の自動フラグ)
- 文 2: off-voice
  - トリガー: 「In today's fast-paced world」 — アンチパターンリスト (汎用冒頭) に違反、評決先行フレーミングデバイスに違反
- 文 3: off-voice
  - トリガー: 「unlocks productivity」 + 「transform the way you work」 — 禁止リスト (unlock + transform を一緒に密輸) に違反
- 文 4: drift
  - トリガー: 「We can't wait for you to try it」 — 直接的/外交的 5 に違反 (これはヘッジ的な温かさで、評決でも CTA でもない)

## 全体ドリフトスコア: 1/10
(保存済みボイスとして認識不能。これは既定 AI 出力として読める。)

## 修正優先順位 (トップ 3)
1. 冒頭を評決としてリライト。例: 「Shipped a tool that runs the five admin tasks founders waste a day on.」
2. 中央の文をまるごと剥がす。このボイスは説明しない — 主張して進む。
3. 温かい締めを直接 CTA に置換。例: 「Link below.」
```

それがテスト。監査が「完全に on-voice」と言うのにドラフトにドリフトが見えるなら、監査が間違っている — プロファイルを再度貼り、もう一度実行。正直なドリフト検出は偽の通過より有用。

---

## ドリフト検出を実行するとき

- 高ステーク資産が出荷される前 (セールスページ、資金調達投稿、ローンチメール、マニフェスト)
- AI がロングフォームコンテンツ (400 ワード超) で渡すすべてのリライトに
- ボイスがシフトした疑いはあるが理由を言葉にできないとき — 直近 3 つの資産に実行して比較
- 新鮮なプロファイルを抽出する前のキャリブレーションチェックとして、四半期ごとに公開コンテンツに
