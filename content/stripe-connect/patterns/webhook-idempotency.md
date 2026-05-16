# Webhook idempotency

Stripe will deliver every event at least once. Sometimes more. Your handler must be safe to run twice.

## The `processed_events` table

```sql
create table public.processed_events (
  id            text primary key,           -- Stripe's event.id
  type          text not null,              -- e.g. 'checkout.session.completed'
  processed_at  timestamptz not null default now()
);

-- Service role only — webhooks are server-only.
alter table public.processed_events enable row level security;
```

## The handler shape

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

  // 1. Idempotency check — have we already processed this event?
  const { data: seen } = await db
    .from("processed_events")
    .select("id")
    .eq("id", event.id)
    .maybeSingle();

  if (seen) {
    return Response.json({ received: true, idempotent: true });
  }

  // 2. Handle.
  try {
    await dispatch(event);
  } catch (err) {
    console.error("[stripe webhook] error processing", event.id, err);
    return new Response("Handler error", { status: 500 });
  }

  // 3. Record. ONLY after success — Stripe will retry if we 5xx.
  await db
    .from("processed_events")
    .insert({ id: event.id, type: event.type });

  return Response.json({ received: true });
}
```

## Alternative: business-key idempotency

Sometimes the natural idempotency key is in the business data — e.g., `stripe_session_id` is unique on your `purchases` table.

```ts
async function handleCheckoutCompleted(s: Stripe.Checkout.Session) {
  const { error } = await db
    .from("purchases")
    .insert({
      stripe_session_id: s.id,         // UNIQUE constraint catches duplicates
      buyer_email: s.customer_details!.email,
      amount_cents: s.amount_total!,
    });

  if (error) {
    // 23505 = unique violation. That's not an error in our model.
    if ((error as { code?: string }).code === "23505") return;
    throw error;
  }

  // Side effects (email, log entry) — these need their own idempotency
  // discipline if they're not transactional with the insert.
  await sendReceipt(s);
}
```

Both patterns work. `processed_events` is simpler when one event triggers several writes. Business-key idempotency is simpler when there's exactly one write.

## What "retry" means

Stripe retries with exponential backoff for 3 days. After that, the event sits in your Stripe Dashboard's webhook tab marked failed. You can manually replay.

The implications:
- Your handler will be hit again if you return 5xx. Don't return 5xx for "I don't care about this event."
- Return 200 + `{ received: true, ignored: true }` for events you don't want to process — that's the polite way to acknowledge.
- A persistent 5xx means an alert. Wire `processed_events` + a "events that failed N times" query into your ops dashboard.

## Testing

```ts
// Vitest / Bun:test
import { vi } from "vitest";

test("checkout.session.completed is idempotent", async () => {
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

If you skip this test, you'll find out about double-charges from a customer email. That's the wrong way to learn.

## Where webhooks come from in dev

```bash
# Locally, forward Stripe webhooks to your dev server:
stripe listen --forward-to localhost:3000/api/stripe/webhook
# The CLI prints a temporary webhook secret — that's what STRIPE_WEBHOOK_SECRET
# should be in your .env.local
```

In Vercel preview and production, configure the webhook endpoint in the Stripe dashboard and pin the secret per environment via Vercel env vars.
