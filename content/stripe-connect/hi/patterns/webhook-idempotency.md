# Webhook idempotency

Stripe हर event को कम से कम एक बार deliver करेगा। कभी-कभी अधिक। आपका handler दो बार run होने के लिए safe होना चाहिए।

## `processed_events` table

```sql
create table public.processed_events (
  id            text primary key,           -- Stripe's event.id
  type          text not null,              -- e.g. 'checkout.session.completed'
  processed_at  timestamptz not null default now()
);

-- Service role only — webhooks are server-only.
alter table public.processed_events enable row level security;
```

## Handler shape

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

कभी-कभी natural idempotency key business data में होती है — e.g., `stripe_session_id` आपकी `purchases` table पर unique है।

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

दोनों patterns काम करते हैं। `processed_events` तब simpler है जब एक event कई writes trigger करता है। Business-key idempotency तब simpler है जब exactly एक write हो।

## "Retry" का क्या मतलब है

Stripe 3 दिन तक exponential backoff के साथ retry करता है। उसके बाद, event आपके Stripe Dashboard के webhook tab में failed marked sit करता है। आप manually replay कर सकते हैं।

Implications:
- अगर आप 5xx return करते हैं तो आपका handler फिर से hit होगा। "मुझे इस event की परवाह नहीं" के लिए 5xx return न करें।
- उन events के लिए 200 + `{ received: true, ignored: true }` return करें जिन्हें आप process नहीं करना चाहते — यह acknowledge करने का polite तरीका है।
- एक persistent 5xx का मतलब एक alert है। `processed_events` + एक "events जो N बार failed" query को अपने ops dashboard में wire करें।

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

अगर आप यह test skip करते हैं, तो आप एक customer email से double-charges के बारे में जानेंगे। यह सीखने का गलत तरीका है।

## Dev में webhooks कहाँ से आते हैं

```bash
# Locally, forward Stripe webhooks to your dev server:
stripe listen --forward-to localhost:3000/api/stripe/webhook
# The CLI prints a temporary webhook secret — that's what STRIPE_WEBHOOK_SECRET
# should be in your .env.local
```

Vercel preview और production में, Stripe dashboard में webhook endpoint configure करें और Vercel env vars के through secret per environment pin करें।
