# Stripe Connect: アカウントオンボーディング

現実的な選択肢は 2 つ: Express と Standard。（Custom も存在するが、コンプライアンスチームがいない限り選びたくない。）

## Express — 正しいデフォルト

あなたが顧客との関係とブランドを所有する。接続アカウントはペイアウトと税書類のために、簡素化された Stripe ダッシュボードを使う。

**長所**
- オンボーディングは 5 分でホスト型フォームを完了
- ブランディング、UX、紛争対応をあなたが管理
- 接続アカウントのコンプライアンス負担が低い
- 接続アカウントは個人または小規模事業者でよい

**短所**
- 接続アカウントが Stripe 体験を完全にカスタマイズできない
- 一部の高度な機能（接続レベルの定期収益）は追加設定が必要

Express を使う場面: あなたのプラットフォームが顧客を所有し、サポートを担当し、接続アカウントが「サプライヤー」である場合。

## Standard — 接続アカウントが merchant の場合

接続アカウントは完全な Stripe ダッシュボードを持つ。自前で紛争に対応し、税務設定を行う。あなたは真のプラットフォームというより、紹介元のような立場。

**長所**
- 接続アカウントが完全な Stripe アクセスを持つ
- プラットフォームの責任が低い

**短所**
- 顧客のレシートに接続アカウントのブランドが表示される
- 紛争は接続アカウントに行く — プラットフォームの可視性が下がる
- オンボーディングが長い（本格的な Stripe サインアップ）

Standard を使う場面: 接続アカウントが既に自身のビジネスを運営しており、あなたはプラットフォーム経由で支払いを受けられるようにしているだけの場合。

## アカウント作成から最初のチャージへ

```ts
// 1. 接続アカウントを作成
const account = await stripe.accounts.create({
  type: "express",
  country: "CA",
  email: org.contactEmail,
  capabilities: {
    card_payments: { requested: true },
    transfers: { requested: true },
  },
  business_type: org.businessType, // 'individual' | 'company'
  metadata: { organization_id: org.id },
});

// 2. アカウント ID を org に保存
await db.from("organizations")
  .update({ stripe_account_id: account.id })
  .eq("id", org.id);

// 3. オンボーディングリンクを生成
const link = await stripe.accountLinks.create({
  account: account.id,
  refresh_url: `${SITE}/settings/payouts?refresh=1`,
  return_url: `${SITE}/settings/payouts?done=1`,
  type: "account_onboarding",
});

// 4. ユーザーをリダイレクト。/settings/payouts に戻ってくる。
return redirect(link.url);
```

## アカウントが実際に準備完了か確認する

`account.updated` webhook を待ち受ける。チャージの準備状況は 2 つのフラグを持つ:

```ts
const ready =
  account.charges_enabled === true && account.payouts_enabled === true;
```

両方が true である必要がある。`charges_enabled` のみで `payouts_enabled` がない場合、Stripe は支払いを受け付けるがペイアウトできないことを意味する — 通常は接続アカウントが銀行口座の確認を完了していない。

`ready` で UI をゲートする。Stripe が支払う準備ができていないのに、org がチャージを開始できるようにしない。

## 税務と法務

- **プラットフォーム** が通常、顧客との関係を所有する場合（Express）に消費税の徴収責任を負う。
- **接続アカウント** が顧客との関係を所有する場合（Standard）に責任を負う。
- **W-9 / W-8 / T1 の収集** は、米国 / カナダの接続アカウントについて Stripe がオンボーディング時に実施する。
- **1099-K（米国）/ T4A（カナダ）** の発行は Stripe が処理する — 接続アカウントに手動で発行する必要はない。

プラットフォームが接続アカウントごとに年間 $20K かつ 200 取引を超える場合（米国 1099-K の閾値）、Stripe がフォームを処理する。年末前に登録住所が正しいことを確認すること。
