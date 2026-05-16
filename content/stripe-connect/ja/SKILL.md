# Stripe Connect 実装パック

> Stripe のドキュメントはハッピーパスをカバーする。このキットはその後に起こることをカバーします: 失敗した webhook、部分返金、ペイアウト中のチャージバック、シーズン途中の契約変更。

**最適化対象:** Claude · Claude Code。

---

## 動作モード

あなたは、マーケットプレイス運営者と 1 つ以上の接続アカウント（クラブ、クリエイター、業務委託）の間で決済を分割するプラットフォームに Stripe Connect を組み込んでいます。デフォルトの前提:

- **Express アカウント** を接続販売者に使う。自前のダッシュボードをブランディングする必要がある場合を除く（稀）
- **`application_fee_amount` を伴う Destination charges** によるきれいな 2 者分割
- **`event.id` をキーとする冪等な webhook ハンドラー**
- **金額はセント単位。** 通貨は明示。デフォルト CAD。
- **Webhook シークレットは環境ごとに固定。** 本番のシークレットをステージングと共有しない。

常に問うこと: 「顧客との関係は誰が持つのか?」 — これが destination charges（あなた）か separate charges（接続アカウント）かを決める。

---

## メンタルモデル

```
[ 顧客 ] ──支払い──> [ あなたのプラットフォーム Stripe アカウント ] ──分割──> [ 接続アカウント ]
                                  │
                                  ├── application_fee_amount を保持
                                  └── 残りを接続アカウントに transfer
```

これがほぼ常に望む形。顧客はあなたのブランドを見る。あなたが紛争を処理する。接続アカウントは支払いを受け取るだけ。

避けるべきこと: separate charges（顧客が接続アカウントに直接支払う形）。このモデルは紛争を接続アカウントに置き、返金を複雑にする。

---

## アカウントオンボーディング

```ts
// サーバーアクション: Express オンボーディングを開始
"use server";

import { stripe } from "@/lib/stripe";

export async function startOnboarding(orgId: string) {
  const account = await stripe.accounts.create({
    type: "express",
    country: "CA",
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    business_type: "company",
    metadata: { organization_id: orgId },
  });

  // account.id を org 行に保存。
  await persistStripeAccountId(orgId, account.id);

  const link = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${SITE}/settings/payouts?refresh=1`,
    return_url: `${SITE}/settings/payouts?done=1`,
    type: "account_onboarding",
  });

  return link.url;
}
```

戻ってきたら、`account.updated` webhook を待ち受け、UI は `account.charges_enabled` と `account.payouts_enabled` の両方でゲートする。

---

## 分割付きで決済を受け取る

```ts
const session = await stripe.checkout.sessions.create({
  mode: "payment",
  customer_email: buyerEmail,
  line_items: [{ price: PRICE_ID, quantity: 1 }],
  payment_intent_data: {
    application_fee_amount: platformCutCents,
    transfer_data: { destination: connectedAccount.stripeId },
    metadata: {
      organization_id: org.id,
      buyer_email: buyerEmail,
    },
  },
  success_url: `${SITE}/thanks?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${SITE}/checkout?canceled=1`,
});
```

接続アカウントは顧客のカードを見ない。チャージが確定すると transfer が自動的に発生する。

---

## Webhook — 冪等性のルール

Stripe はすべてのイベントを少なくとも 1 回配信する。あなたのハンドラーは 2 回実行されても安全である必要がある。

```ts
// app/api/stripe/webhook/route.ts
import { stripe } from "@/lib/stripe";
import { supabaseService } from "@/lib/supabase-service";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const raw = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, env.WEBHOOK_SECRET);
  } catch (err) {
    return new Response("Bad signature", { status: 400 });
  }

  // 1. このイベントを既に処理済みかチェック。
  const db = supabaseService();
  const { data: existing } = await db
    .from("processed_events")
    .select("id")
    .eq("id", event.id)
    .maybeSingle();

  if (existing) {
    return Response.json({ received: true, idempotent: true });
  }

  // 2. 処理する。
  try {
    await handle(event);
  } catch (err) {
    // 処理済みとしてマークしない。Stripe がリトライする。
    console.error("[stripe] handler error:", err);
    return new Response("Handler error", { status: 500 });
  }

  // 3. 処理済みを記録。これが冪等性のロック。
  await db.from("processed_events").insert({ id: event.id, type: event.type });

  return Response.json({ received: true });
}
```

`processed_events` テーブルは単純に `(id text primary key, type text, processed_at timestamptz default now())`。

---

## 返金 + 紛争の判断ツリー

返金は 2 者に分割される: プラットフォームの `application_fee_amount` と接続アカウントの `transfer_data.amount`。Stripe はデフォルトで両方を比例的に返金する。

| 状況 | 対応 |
| --- | --- |
| 全額返金、合意あり | `stripe.refunds.create({ payment_intent, refund_application_fee: true, reverse_transfer: true })` |
| 部分返金、合意あり | 同じ、`amount` を明示する。`reverse_transfer: true` で接続アカウントから比例的に引き落とす。 |
| 紛争（チャージバック）発生 | 証拠を提出。通常は手数料も自動的に返金される。`charge.dispute.closed` イベントで結果を追跡。 |
| ペイアウト後の返金 | 同じコード — Stripe は接続アカウントの「次の」ペイアウトから差し引く（必要ならマイナス残高を作る）。 |
| 接続アカウントの残高不足で逆送できない | Stripe がデビットを作成。接続アカウントのオーナーが補填するか、次回まで待つ必要がある。UI で表示する。 |

---

## いずれぶつかるエッジケース

### 1. 契約途中の離脱

接続アカウントが取引を停止する。既存顧客には継続するサブスクリプションがある。アカウントを即座に無効化しない — 新規チャージを停止し、期間を全うし、その後で顧客関係を移管する。

### 2. 通貨変換

顧客が USD で支払い、接続アカウントは CAD でペイアウトを希望。Stripe は自動的に FX を処理するが、手数料が発生する。誰が負担するか（通常はプラットフォーム）を決め、文書化する。

### 3. 税ラインの取り扱い

接続アカウントが消費税を徴収する場合、各 price に `automatic_tax: { enabled: true }` と `tax_code` を設定する。Stripe Tax が管轄別の徴収を報告する。

### 4. 遅れて到着した webhook

注文出荷の 6 時間後に `payment_intent.succeeded` が届く。冪等性チェックがカバーするが — 下流の状態が既に進んでいてもハンドラーが安全であることを確認すること。

---

## 関連ドキュメント

- `patterns/account-onboarding.md` — Express vs. Standard、法務・税務のトレードオフ付き
- `patterns/destination-charges.md` — レベニューシェアの計算を含む完全なコードウォークスルー
- `patterns/webhook-idempotency.md` — `processed_events` テーブル + 代替パターン
- `playbooks/refunds-and-disputes.md` — 運営者向けの判断ツリー
