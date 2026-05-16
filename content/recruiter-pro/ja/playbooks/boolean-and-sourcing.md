# ブールとソーシング・プレイブック

多くのソーシングが質の悪い理由は、ブール文字列の質が悪いから。多くのブールが質の悪い理由は、すべての候補者を同じように LinkedIn に住んでいる前提で扱うから。このプレイブックは両方を直します — 各プラットフォームの文字列ビルダー、そしてどのプラットフォームがどの職種ファミリーのどのシニア度を見つけるかというソーシング・プレイブック。

---

## パート 1 — ブール文字列の解剖

良いブールには 4 つの動きがあります:

1. **MUST スキル / タイトル** — 必須、通常引用符付き文字列、AND で結合
2. **OPTIONAL スキル** — 網を広げる、OR で結合
3. **EXCLUSIONS** — 欲しくないもの、NOT で
4. **CONTEXT シグナル** — 企業タイプ、シニア度の指標、所在地

### どこでも機能する演算子

- `AND` — 両方の語が存在する必要
- `OR` — どちらかの語
- `NOT`（多くの検索エンジンで `-`）— 除外
- `"引用句"` — 完全一致（スペースを語の一部として扱う）
- `(括弧)` — 演算子をグループ化

### プラットフォーム固有の演算子

- LinkedIn Recruiter は UI でトグルするフィールド（Title、Skills、Company 等）としてフィルターを持ち、検索文字列内ではない
- 公開 LinkedIn 検索はキーワードフィールドで基本ブールをサポートするが制限あり
- Google X-ray 検索は site:linkedin.com/in/ とフルブールを使う
- GitHub 検索は `language:`、`location:`、`followers:>X` などのフィルターをサポート

---

## パート 2 — LinkedIn Recruiter 文字列

LinkedIn Recruiter はプラットフォーム自体がフィールドを分けてくれるため最も簡単です。

### プロンプト

```
あなたはリクルーター・コパイロットです。

LinkedIn Recruiter 検索を構築してください。

**ターゲット役職:** [タイトル]
**シニア度:** [Entry/Mid/Senior/Staff/Principal]
**必須スキル:** [リスト]
**任意スキル:** [リスト]
**欲しい業界 / 企業タイプ:** [例: 「B2B SaaS、Series A-C、50-300 名」]
**除外したい業界 / 企業タイプ:** [例: 「エンタープライズコンサルティング、エージェンシー」]
**所在地:** [都市 + 半径またはリモートどこでも]
**在籍期間の優先:** [例: 「現役職 1 年以上」]

返してほしいもの:
1. キーワードフィールド用のブール文字列
2. 各フィルターフィールド (Title、Skills、Industry、Company、Location、Years of experience) の設定
3. 最初の検索が多すぎる / 少なすぎる場合の 2〜3 個の派生
4. 注意すべき一般的なフォールスポジティブパターン
```

### 出力例 — シニアバックエンドエンジニア

> **LinkedIn Recruiter セットアップ:**
>
> **Title フィルター:** (Senior OR Sr OR Staff) AND (Backend OR "Back-end" OR "Back end" OR Server)
>
> **Skills フィルター:** Node.js、TypeScript、PostgreSQL (3 つすべて必須)
>
> **キーワードフィールドのブール:**
> ```
> ("Node.js" OR "Node" OR Typescript) AND (Postgres OR PostgreSQL) AND (AWS OR GCP) NOT ("recruiter" OR "recruiting" OR "tech evangelist")
> ```
>
> **Industry フィルター:** Computer Software、Internet、Financial Services (関連するものをトグル)
>
> **Company フィルター:** 除外: プロダクト企業経験のみが欲しいなら、エージェンシー、コンサルティング、大型エンタープライズ (Cognizant、Infosys、TCS、Accenture、Deloitte、Capgemini)
>
> **Years of Experience:** 6+ (10 でゲートキープしない。シニア品質は 6〜8 年で現れることが多い)
>
> **所在地:** 指定通り
>
> **結果が多すぎる場合の派生:**
> - 在籍期間フィルターを追加: 現職 1 年以上 (ジョブホッパー除外 + 競合に最近雇われた人を止める)
> - 所在地半径を縮める
> - 特定業界シグナルを追加 (FinTech / HealthTech 等)
>
> **結果が少なすぎる場合の派生:**
> - 必須スキルの 1 つを優先にダウングレード
> - ミッドレベル (しばしばシニア品質) に拡大
> - 企業フィルターを緩める
>
> **注意すべきフォールスポジティブ:**
> - 「Senior」が 2 年経験を意味する会社のタイトル (コンサル、エージェンシー)
> - Python または Java のみのバックエンドエンジニア (あなたのスタックは Node) — プロフィール詳細で確認
> - 「open to work」緑リング AND 現職 1 年未満 — ジョブホッパーかもしれないし、強いレイオフ候補者かもしれない。注意深く読む。

### LinkedIn Recruiter — 一般的なブールパターン

| ユースケース | 文字列例 |
|---|---|
| 特定ツールを使う人を見つける | `("Datadog" OR "PagerDuty") AND ("Kubernetes" OR "EKS")` |
| カンファレンスで **登壇する** 人を見つける | `(speaker OR keynote OR "spoke at")` |
| **オープンソース** 貢献者を見つける | `("open source" OR "OSS" OR github)` |
| 特定企業ファミリー出身者を見つける | `("ex-Stripe" OR "former Stripe" OR "previously at Stripe")` |
| リクルーターとトレーナーを除外 | `NOT (recruiter OR "talent acquisition" OR trainer OR "tech evangelist")` |

---

## パート 3 — 公開 LinkedIn 検索

Recruiter の外、または補完用。

### フォーマット

LinkedIn のキーワードフィールドはブールを受け付けますが、より制限的。2 階層を超えるネスト括弧は不可。引用句は機能。

```
("Senior Backend Engineer" OR "Senior Software Engineer") AND ("Node.js" OR Typescript) AND Postgres NOT recruiter
```

UI の所在地および現職企業フィルターと組み合わせると、驚くほど遠くまで届く。

### X-ray Google 検索（LinkedIn 検索がゲートされているとき）

Google X-ray は LinkedIn が未ログインユーザーから隠す結果を返してくれる。

```
site:linkedin.com/in/ ("Senior Backend Engineer" OR "Senior Software Engineer") "Node.js" "Postgres" "San Francisco" -intitle:"profiles" -inurl:dir/
```

派生:

- `-intitle:"profiles"` を追加して LinkedIn ディレクトリページをスキップ
- `"open to work"` を追加してオープンであることをシグナルした人を見つける
- `"intern"` を追加 — マイナス `-intern` はジュニアプロフィールを除外しない

---

## パート 4 — GitHub ソーシング

GitHub はシニアエンジニアが実際に住む場所。シグナルはコードに、bio にではない。

### 検索パターン

**言語 + 所在地:**
```
location:Toronto language:typescript followers:>50
```

**特定リポジトリへの OSS 貢献:**
- リポジトリへ
- 「Insights」→「Contributors」をクリック
- 過去 1 年のコミット数でソート
- トップ貢献者のプロフィールを採用シグナルでクロスリファレンス

**直近の活動:**
```
location:"San Francisco" language:rust followers:>100
```
それから「Most followed」でフィルター、または直近活動の貢献グラフを見る。

**チュートリアルやロングフォームを書いた人を見つける:**
- Twitter/X で GitHub リポジトリを検索: `from:@person github.com/`
- または Google で: `site:github.com "tutorial" "production" "we built"`

### GitHub プロフィールで見るもの

- 読み応えのある README を持つピン留めリポジトリ — コミュニケーションスキルあるエンジニアのシグナル
- 直近活動（過去 3 か月の貢献）
- 自分のプロジェクト + 既知プロジェクトへの OSS 貢献のミックス
- フォロワー > 50 はコミュニティプレゼンスのソフトシグナル
- 現職企業を名指す bio（クロスリファレンスを省ける）

### シグナルでないもの

- リポジトリ数だけ高い — 多くはフォーク
- bio の「AWS Certified」バッジ — 紙のシグナル
- 2 年コミットがないのに自分のプロジェクトについたスター

---

## パート 5 — ソーシング・プレイブック

どの職種ファミリーのどのシニア度をどこで見つけるか。正直な答えは常に「場合による」だが、プレイブックがそれを絞り込みます。

### エンジニアリング

| シニア度 | 主要ソース | 副次ソース | 機能するもの |
|---|---|---|---|
| Junior | LinkedIn (新卒 + ブートキャンプ) | ブートキャンプ卒業生ネットワーク (Bloc、App Academy、Lambda 等) | 直接アウトリーチ、ただし返信率は低めを想定 |
| Mid | LinkedIn Recruiter | GitHub (アクティブな貢献者) | アウトリーチで具体的プロジェクトに言及 |
| Senior | GitHub > LinkedIn | カンファレンス登壇者、OSS 貢献者 | ピア調のアウトリーチ、技術的具体性必須 |
| Staff/Principal | 紹介 + GitHub + Twitter/X | LinkedIn はほぼ機能しない — InMail は無視 | 彼らが尊重する人を雇う、温かい紹介は InMail の 10 倍 |

シニア以上のエンジニアでは、LinkedIn を先にソーシングするのをやめる。彼らの **自前コンテンツ** — ブログ投稿、OSS 貢献、カンファレンス講演から始める。LinkedIn は彼らが最後に更新する場所。

### デザイン (プロダクト / ブランド)

| シニア度 | 主要ソース | 副次ソース | 機能するもの |
|---|---|---|---|
| Junior | LinkedIn + Dribbble / Figma Community | ブートキャンプ卒業生 | ポートフォリオの具体性 |
| Mid | Dribbble + Figma Community + LinkedIn | Twitter デザインコミュニティ | 具体的作品への賛辞 |
| Senior | 個人サイト + Dribbble + Twitter | LinkedIn (低優先) | 役職でなく実作品に言及 |
| Director | 紹介 + Twitter | LinkedIn | 温かい紹介のみ |

デザイナーはポートフォリオを維持し、LinkedIn は維持しない。ポートフォリオが **ソース**。

### セールス (AE、SDR、CS)

| シニア度 | 主要ソース | 副次ソース | 機能するもの |
|---|---|---|---|
| SDR | LinkedIn + RepVue + Bravado | ネットワーキングイベント | 報酬透明性、成長パス |
| Mid AE | LinkedIn (非常にアクティブ) | RepVue (ICP 適合リサーチ) | 具体的テリトリー + 給与帯 |
| Senior AE | LinkedIn + 紹介 | 業界 Slack (RevGenius、Pavilion) | クォータ達成データ + プロダクト具体性 |
| VP/CRO | 紹介 + 投資家ネットワーク | 重度のエグゼクティブサーチ | 温かい紹介必須、コールドは 1〜2% |

LinkedIn はセールスが住む場所。プロフェッショナルアイデンティティ全体がそこにある。

### オペレーション / G&A

| シニア度 | 主要ソース | 副次ソース | 機能するもの |
|---|---|---|---|
| Junior/Mid | LinkedIn + Pavilion (ops 向け) | 業界グループ (HR なら People Geeks 等) | 具体的なスコープ記述 |
| Senior | LinkedIn + 紹介 + Pavilion | 業界コミュニティ | 出発点について率直に |
| Director/VP | 紹介 + エグゼクティブサーチ | LinkedIn (低 ROI) | ネットワーク紹介 |

Ops の人々は常にリクルーティングされるため、LinkedIn では隠れがち。コミュニティのほうがシグナルが強い。

### プロダクト (PM、プロダクトリーダーシップ)

| シニア度 | 主要ソース | 副次ソース | 機能するもの |
|---|---|---|---|
| APM/Mid | LinkedIn | Mind the Product コミュニティ | プロダクト具体性、成長パス |
| Senior | LinkedIn + Mind the Product + Lenny's Newsletter 圏 | Twitter (アクティブな PM はここに投稿) | ドメイン具体性 |
| Director/VP | 紹介 + Reforge 卒業生 | LinkedIn (低優先) | 温かい紹介 |

シニア役職の PM はとてもオンライン — Twitter、Substack、ポッドキャスト出演。公開された彼らの発言に言及。

---

## パート 6 — 多様な候補者をどこで見つけるか（ドッグホイッスルなしで）

このセクションは、見栄えのためでなく本気でファネルを広げたいリクルーター向け。

### 原則

多様なパイプラインは、既定のソース以外でソーシングすることから生まれる。保護カテゴリーでフィルタリングする検索文字列からは生まれない（多くの司法管轄区で違法、プラットフォームが許しても）。

### 役立つコミュニティ

- **エンジニアリング:** Out in Tech、Lesbians Who Tech、/dev/color、Black Tech Pipeline、Latinas in Tech、Women Who Code
- **デザイン:** People of Craft (POC デザイナー)、Hexagon (women+ in design)
- **セールス:** Sistas In Sales、Hispanic Star、Women in Sales Everywhere
- **プロダクト:** Women in Product、より大きなコミュニティ内の Product Manager ネットワーク

多くがジョブボード、Slack ワークスペース、イベントカレンダーを持つ。これらの 1 つに具体的に役職を投稿するほうが、もう 1 回 LinkedIn 検索を回すよりシグナルが 10 倍。

### **やらない** こと

- LinkedIn で「diversity」または「women」を検索 — 多くの場所で違法、合法な場所でも機能しない
- 候補者写真を可視ダイバーシティでフィルター — 違法、バイアス、データもいずれにせよ信頼性なし
- 名前を民族の代理として使う — 大きくバイアスがかかり、しばしば誤り
- それ以外は「rockstar ninja」言葉で埋まった JD の末尾に「We're an inclusive workplace」定型文 — 候補者は見抜く

### 機能するもの

- 上記のコミュニティでソーシング
- 実際にインクルーシブな職場である（育休、柔軟な働き方、実 ERG、多様なリーダーシップ）こと、それを JD で正直に反映
- 公平に支払う（給与帯を公開、交渉の強引さでなくジョブレベルでペイバンディング）
- ファネルの多様性を各段階で追跡 — ソーシング、スクリーニング、面接、オファー、受諾。ドロップオフが壊れている箇所を教えてくれる。

---

## パート 7 — ソーシングケイデンス + アウトリーチメトリクス

### 現実的な数値

シリーズ B の妥当なブランドのシニアエンジニア役職:

- 候補者ソーシングリスト 50 名
- アウトリーチ返信率: 15〜25% (報酬 + 具体的理由を含む 3 行メッセージ)
- 電話スクリーン転換: 返信の 50%
- 1 次面接転換: スクリーンの 50%
- オファー: 元の 50 名から 1〜2 名

返信率が 10% を下回るなら、問題はほぼ常に:
- 汎用アウトリーチ（候補者個別の具体的理由なし）
- 給与帯の記載なし
- 件名（「Exciting opportunity at...」）
- シニア度に合わないアウトリーチ（スタッフエンジニアへのテンプレ調アウトリーチ）

返信率が 30% を超えているなら、ソーシングが狭すぎるかもしれない。プールを広げる。

### アウトリーチケイデンス

- 1 日目: 最初のメッセージ
- 5〜7 日目: 1 回のフォローアップ（異なる角度 — 最初は問題領域でリードしたなら、フォローはチームでリード）
- 14 日目: 最終フォローアップ（短く —「まだいます、まだ興味あります、今が合わないなら気にしないでください」）
- それから止める。3 回送ったらドアを開けたまま離れる。

3 回を超えるとうるさい人になる。それを超えるリクルーターは、その会社で採用する全員にとってブランドを焼く。

---

## キットがフラグするよくあるブール / ソーシングのミス

- **AND が多すぎる。** 各 AND は絞る。5 個以上の AND は通常 50 件未満を返し、その多くは欲しいものではない。
- **NOT 節がない。** トレーナー、リクルーター、コンサルタントに溺れる。常に除外。
- **タイトルだけの検索。** 「Senior Backend Engineer」は会社間で大きく異なる。スキル + 成果でも検索する。
- **シニア以上のエンジニアを LinkedIn で検索。** 彼らの LinkedIn は古い。GitHub、カンファレンス登壇者一覧、OSS 貢献者リストでソーシングする。
- **リモート役職に所在地修飾子なし。** 「remote-anywhere」でも通常タイムゾーン制約がある。リモートだけでなくタイムゾーンでフィルター。
- **他のリクルーター全員がソーシングする同じ 50 名の LinkedIn プロフィールをソーシング。** プールが汎用 LinkedIn 検索の 1 ページ目なら、他の 10 人と競っている。もっと深くいけ。
