# Destination charges — 2 者分割の正しいプリミティブ

destination charge は、あなたのプラットフォームアカウント上の 1 つのチャージで、接続アカウントへの transfer が組み込まれています。顧客はあなたのブランドを見る。接続アカウントはきれいなペイアウトを見る。あなたはアプリケーション手数料を取る。

## 形

```ts
const session = await stripe.checkout.sessions.create({
  mode: "payment",
  line_items: [{ price: PRICE_ID, quantity: 1 }],
  customer_email: buyer.email,
  payment_intent_data: {
    application_fee_amount: 6000, // $60 CAD（セント） — プラットフォームの取り分
    transfer_data: {
      destination: connectedAccount.stripeId, // 'acct_…'
    },
    metadata: {
      organization_id: org.id,
      buyer_email: buyer.email,
      season_id: season.id,
    },
  },
  success_url: `${SITE}/thanks?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${SITE}/checkout?canceled=1`,
});
```

`application_fee_amount = 6000` でラインアイテムが $120 の場合:
- プラットフォーム: $60
- 接続アカウント: $60（Stripe の処理手数料を差し引く。Stripe はデフォルトで接続アカウントから手数料を取る）

プラットフォーム側で Stripe の処理手数料を吸収するには、`on_behalf_of: connectedAccount.stripeId` を追加し、アカウントの手数料デフォルトを設定する — 下記「手数料の負担」を参照。

## レベニューシェアの計算（実例）

Calgary Villains には選手 3,000 人いる。Lumenari Sports は選手 1 人あたり年 $120 を請求する。分割は 50/50 — プラットフォームが $60、クラブが $60。Stripe は $120 の取引で約 3.4% + $0.30 = 約 $4.38 を取る。

$4.38 はどこから出るか? 2 つの選択肢:

### オプション A — Stripe 手数料を先に引き、その後で分割

```ts
// $120 をチャージ。Stripe が $4.38 を差し引く。残り $115.62。
// 50/50 で分割 = それぞれ $57.81。
//
// コード上: application_fee_amount = floor(115.62 / 2 * 100) = 5781
application_fee_amount: Math.floor((charge_cents - stripeFee(charge_cents)) / 2)
```

### オプション B — プラットフォームが手数料を自分の取り分から負担

```ts
// $120 をチャージ。分割はグロス: $60 / $60。
// Stripe の $4.38 はプラットフォームの $60 から出るので、プラットフォームの実質は約 $55.62。
//
// コード上: application_fee_amount はチャージのちょうど半分
application_fee_amount: Math.floor(charge_cents / 2)
```

クラブの数字を予測可能にしたいなら（「選手 1 人あたり $60、確実に」）、B を選ぶ。営業上のストーリーとして優れている。

## 手数料の負担

Stripe は処理手数料の負担者を決められる。デフォルトは接続アカウント。プラットフォームに移すには:

```ts
payment_intent_data: {
  transfer_data: { destination: connectedAccount.stripeId },
  on_behalf_of: connectedAccount.stripeId,
  application_fee_amount: PLATFORM_CUT_CENTS,
}
```

`on_behalf_of` により、税務 / 規制目的ではチャージが接続アカウントに法的に帰属するが、資金フローはあなたのプラットフォーム上に保たれる。これと `application_fee_amount` を組み合わせると、手数料はプラットフォームの `application_fee_amount` から出る。

## 結果を読む

```ts
// 顧客が支払うと、checkout.session.completed イベントが得られる。
const session = event.data.object as Stripe.Checkout.Session;

// PaymentIntent に transfer 情報が含まれる。
const pi = await stripe.paymentIntents.retrieve(session.payment_intent as string);

// 実際の transfer は latest_charge から到達できる。
const charge = await stripe.charges.retrieve(pi.latest_charge as string);
console.log({
  amount: charge.amount, // チャージ合計
  app_fee: charge.application_fee_amount, // あなたの取り分
  transfer: charge.transfer_data?.destination, // 接続アカウント
  net_to_connected: charge.amount - (charge.application_fee_amount ?? 0)
    - (charge.balance_transaction
      // Stripe 処理手数料 — 正確な数字は balance_transaction を取得する
      ? 0 : 0),
});
```

実務では、balance transaction から正確な手数料を取得する:

```ts
const bt = await stripe.balanceTransactions.retrieve(charge.balance_transaction as string);
// bt.fee = Stripe 手数料合計（セント）
// bt.net = プラットフォーム残高に着金した金額
```

## 自分側に記録する

```sql
create table public.purchases (
  id                     uuid primary key default gen_random_uuid(),
  organization_id        uuid references public.organizations(id),
  buyer_email            text not null,
  stripe_session_id      text unique,
  stripe_payment_intent  text,
  stripe_charge_id       text,
  amount_cents           integer not null,
  platform_fee_cents     integer not null,
  stripe_fee_cents       integer,            -- balance_transaction から取得
  currency               text default 'cad',
  created_at             timestamptz default now()
);
```

`stripe_fee_cents` は 2 つ目の webhook（`balance_transaction` が解決した時点での `charge.updated`）でバックフィルするか、webhook ハンドラー内の同期 API 呼び出しが許容できるならインラインで取得する。
