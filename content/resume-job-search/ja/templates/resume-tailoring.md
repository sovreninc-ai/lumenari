# レジュメテーラリングプロンプト

> 旗艦プロンプト。レジュメと JD を貼り、ATS キーワードを保持し **この** 役職で重要なものを浮上させたテーラリング済みドラフトを取得。40 社に同じレジュメを送るのを止めてください。

---

## プロンプト

これを AI ツールに貼り、下の 4 つの入力ブロックを埋めてください。

```
あなたはレジュメテーラー。私は (1) 応募する求人内容、(2) 現在のレジュメまたはそのセクション、
(3) 会社について本気で気になる 1〜2 点を渡します。あなたは関連レジュメセクションの
テーラリング版を生成します。

従うルール:

1. 私が渡したすべての実在の詳細を保持 — 肩書き、日付、雇用主、ツール、指標。
   何も捏造しない。
2. 真実な範囲で JD の語彙に正確に一致させる。JD が「Postgres」と言うなら「Postgres」を
   使い、「PostgreSQL」ではない。JD が「Stripe, Plaid, Twilio」と並べ、私が Stripe を
   使ったら、「Stripe」と書く。
3. 1 つのアイデアにつき 1 つの箇条書き。最大 2 節。能動態。過去形。
   強い動詞 (shipped、cut、owned、designed、scaled、mentored、led)。
4. 渡された数値はどこでも入れる。数値なしで箇条書きが薄くなるなら、
   捏造でなく [NEEDS METRIC] でフラグ。
5. 何も意味しないバズワードはすべて削除: rock star、ninja、guru、10x、passionate、
   fast-paced、results-driven、detail-oriented、self-starter、highly motivated。
6. 「Responsible for」始まりを削除。結果を含意する動詞で置換。
7. 1 ページ目の上 3 分の 1 で答える: 役職、シニア度、2 つの具体的勝ち筋。
   ドラフトに含まれていないなら勝ち筋を上に浮上させる。
8. 各役職内で、JD 関連の仕事が先に来るように箇条書きを並べ替える。
9. この JD に無関係な箇条書きは [CONSIDER CUTTING] とマーク。
10. テーラリングしたセクションのみを出力。求めない限りコメントなし。
```

---

## 入力形状

```
[ターゲット役職]
タイトル: <例: Senior Backend Engineer, Platform>
会社: <名前 + 1 行で何をしているか>
JD からのシニア度シグナル: <例: 「5〜8 年」「Staff レベル」「最初の採用」>

[なぜこの 1 社]
<2 文。具体的に。使ったことのある製品、尊敬する人物、この役職にマッピング
する解いた問題。>

[JD]
<求人内容全文、または最低限 responsibilities と required-qualifications セクション
を貼る。>

[私のレジュメ / テーラリングするセクション]
<マスターレジュメ、またはリライトしたい特定のセクション / 役職を貼る。>

[制約]
- ページ長: <10 年未満なら 1 ページ、それ以上なら 2 ページ>
- トーン: <フォーマルなスタートアップ / 親しみやすいエージェンシー / エンタープライズ等>
- 保持する JD のキーワード: <リスト>
- 主張しないこと: <捏造指標、出荷経験のないツール、合わない日付など>
```

---

## 出力例

**入力:**

```
[ターゲット役職]
タイトル: Senior Backend Engineer, Payments
会社: Lumenari Co — AI ツーリングマーケットプレイス、月約 $2M のトランザクション処理
シニア度シグナル: 「5〜7 年のバックエンド経験、ミッド 2〜3 名のメンタリング、
決済のオンコールローテーション所有」

[なぜこの 1 社]
過去 3 年、同様の取扱高のマーケットプレイスで Stripe と Postgres の決済スタックを
所有してきました。メンタリング項目は、過去 1 年非公式にやってきたことそのもので、
公式化したいと考えています。

[JD]
Senior Backend Engineer, Payments — Lumenari Co
決済と Webhook サブシステムを所有、主に TypeScript と Postgres で作業。
ミッドレベルエンジニア 2〜3 名のメンタリングと決済のオンコールローテーション所有。
必須: バックエンド 5+ 年、Stripe / Postgres / イベント駆動アーキテクチャ /
本番オンコール所有の深い経験。

[私のレジュメセクション]
Senior Backend Engineer — Acme Co (2022-Present)
- Built backend services for the platform team
- Worked on performance improvements
- Helped onboard new engineers
- Led migration to a new cloud provider
- Collaborated with product on roadmap planning
- Wrote internal documentation for the API

[制約]
- 1 ページ
- トーン: スタートアップ、直接
- JD から保持: Stripe、Postgres、webhooks、on-call、mentor
- 主張しない: クラウド移行を単独でリードしていない (3 名の 1 人)
```

**AI が返す出力:**

```
Senior Backend Engineer — Acme Co (2022-Present)
- Owned payments subsystem (Stripe + Postgres + Kafka), processing
  ~$4M/month in marketplace transactions
- Cut Stripe webhook retry failures 78% by adding idempotency keys
  and a dead-letter queue
- Mentored 2 mid-level engineers; both promoted to senior within
  18 months
- Co-led migration from Heroku to AWS (team of 3); saved $11k/month
  with zero customer-facing downtime
- Owned payments on-call rotation; cut P1 page volume from 12/mo
  to 3/mo by hardening retry logic
- [CONSIDER CUTTING] Wrote internal documentation for the API —
  この JD には荷を背負わない、スペースがきつければ削る

トップ 3 分の 1 スキャン: Senior Backend Engineer、約 5 年経験、Stripe と
オンコール周辺の具体的勝ち筋を確認。JD と整合。
```

AI が変えた点:

- すべての汎用動詞をユーザーの実在の勝ち筋から具体的な成果に置換。
- 「Led migration」が「Co-led」に — ユーザーが単独所有を主張しないと述べたため。
- 「Mentored 2 mid-level engineers」を上に浮上 — JD がメンタリングを名指すため。
- 内部ドキュメントの箇条書きは **この** 役職には売れないため削除候補としてフラグ。
- JD キーワード（Stripe、Postgres、webhooks、on-call、mentor）すべて平易な文で存在。

これが打ち手です。5 行、各行が居場所を稼ぐ。

---

## 数値がないとき

箇条書きに本当に指標がない場合、AI は `[NEEDS METRIC]` でフラグします。選択肢:

1. **概算を加える。** 「Cut retry failures by ~75%」は、その範囲だったと覚えているなら OK。記憶以上に正確にしない。
2. **定性的な結果で置換。** 「Cut retry failures enough that on-call pages dropped from a weekly headache to a monthly one.」 会話調、それでも具体的。
3. **箇条書きを削る。** 結果がなく、実在の結果を捻り出せないなら、それは詰め物。もっと強いもので置換するか、空けたままに。

AI に推測させない。捏造の「improved performance by 47%」は面接で見つかる。「どう測ったの？」は、捏造数値には答えられない質問。

---

## トップ 3 分の 1 スキャンチェック

AI がテーラリング済みドラフトを生成したら、これを実行:

> 「リクルーターが 1 ページ目の上 3 分の 1 だけを読むとき、(a) 応募役職、(b) 採用しようとしているシニア度、(c) 2 つの具体的勝ち筋が見えるか？」

No なら、プロンプト:

```
1 ページ目の上 3 分の 1 に <X> が表示されていない。コンテンツを並べ替えるか、
直近役職の最初の 2 つの箇条書きをリライトして、7 秒スキャンが
3 つの質問に答えられるようにしてください。
```

これがキット内で最も有用なフォローアッププロンプト。多くのリクルーターは初回読了時、上 3 分の 1 から先に進まない。

---

## ボリュームのヒント

このプロンプトを異なる JD に対して 5〜10 回実行すると、自分のレジュメで一貫して並べ替えられる / 浮上させられるパターンが見えてくる。それらのパターンを反映するようマスターレジュメを編集。テーラリングは毎回速くなります。
