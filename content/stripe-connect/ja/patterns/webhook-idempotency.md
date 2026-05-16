# Webhook の冪等性

Stripe はすべてのイベントを少なくとも 1 回配信する。時にはそれ以上。あなたのハンドラーは 2 回実行されても安全である必要がある。

## `processed_events` テーブル

```sql
create table public.processed_events (
  id            text primary key,           -- Stripe の event.id
  type          text not null,              -- 例 'checkout.session.completed'
  processed_at  timestamptz not null default now()
);

-- service role のみ — webhook はサーバー専用。
alter table public.processed_events enable row level security;
```

## ハンドラーの形

```ts
export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("No signature", { status: 400 });

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response(`Webhook error: ${(err as Error).message}`, {
      status: 400,
    });
  }

  const db = supabaseService();

  // 1. 冪等性チェック — このイベントを既に処理済みか?
  const { data: seen } = await db
    .from("processed_events")
    .select("id")
    .eq("id", event.id)
    .maybeSingle();

  if (seen) {
    return Response.json({ received: true, idempotent: true });
  }

  // 2. 処理。
  try {
    await dispatch(event);
  } catch (err) {
    console.error("[stripe webhook] error processing", event.id, err);
    return new Response("Handler error", { status: 500 });
  }

  // 3. 記録。成功後にのみ — 5xx の場合 Stripe がリトライする。
  await db
    .from("processed_events")
    .insert({ id: event.id, type: event.type });

  return Response.json({ received: true });
}
```

## 代替: ビジネスキーによる冪等性

時には自然な冪等キーがビジネスデータの中にある — 例: `stripe_session_id` が `purchases` テーブルでユニーク。

```ts
async function handleCheckoutCompleted(s: Stripe.Checkout.Session) {
  const { error } = await db
    .from("purchases")
    .insert({
      stripe_session_id: s.id,         // UNIQUE 制約が重複をキャッチ
      buyer_email: s.customer_details!.email,
      amount_cents: s.amount_total!,
    });

  if (error) {
    // 23505 = unique violation。我々のモデルではエラーではない。
    if ((error as { code?: string }).code === "23505") return;
    throw error;
  }

  // 副作用（メール送信、ログ記録） — insert とトランザクショナルでなければ
  // それぞれ独自の冪等性が必要。
  await sendReceipt(s);
}
```

どちらのパターンも機能する。`processed_events` は 1 つのイベントが複数の書き込みを引き起こす場合にシンプル。ビジネスキー冪等性は書き込みが正確に 1 つの場合にシンプル。

## 「リトライ」が意味すること

Stripe は指数バックオフで 3 日間リトライする。その後、イベントは Stripe ダッシュボードの webhook タブに失敗マーク付きで残る。手動で再生できる。

その意味合い:
- 5xx を返すと、ハンドラーが再び呼ばれる。「このイベントに興味ない」で 5xx を返してはいけない。
- 処理したくないイベントには 200 + `{ received: true, ignored: true }` を返す — それが礼儀正しい応答。
- 持続的な 5xx はアラート対象。`processed_events` + 「N 回失敗したイベント」のクエリを ops ダッシュボードに配線する。

## テスト

```ts
// Vitest / Bun:test
import { vi } from "vitest";

test("checkout.session.completed が冪等であること", async () => {
  const event = makeCheckoutEvent({ id: "evt_test_1" });
  const req = makeWebhookReq(event);

  const r1 = await POST(req);
  const r2 = await POST(req);

  expect(r1.status).toBe(200);
  expect(r2.status).toBe(200);

  const { count } = await db.from("purchases")
    .select("*", { count: "exact", head: true })
    .eq("stripe_session_id", event.data.object.id);

  expect(count).toBe(1);
});
```

このテストを省略すると、顧客のメールで二重チャージを知ることになる。それは間違った学び方。

## 開発環境での webhook

```bash
# ローカルで Stripe webhook を開発サーバーに転送:
stripe listen --forward-to localhost:3000/api/stripe/webhook
# CLI が一時 webhook シークレットを表示 — それを .env.local の
# STRIPE_WEBHOOK_SECRET に設定する
```

Vercel のプレビューと本番では、Stripe ダッシュボードで webhook エンドポイントを設定し、Vercel 環境変数で環境ごとにシークレットを固定する。
