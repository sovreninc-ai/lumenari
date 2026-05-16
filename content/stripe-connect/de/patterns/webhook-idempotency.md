# Webhook-Idempotenz

Stripe liefert jedes Event mindestens einmal. Manchmal mehrmals. Dein Handler muss sicher zweimal laufen können.

## Die `processed_events`-Tabelle

```sql
create table public.processed_events (
  id            text primary key,           -- Stripe's event.id
  type          text not null,              -- e.g. 'checkout.session.completed'
  processed_at  timestamptz not null default now()
);

-- Service role only — webhooks are server-only.
alter table public.processed_events enable row level security;
```

## Die Handler-Form

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

## Alternative: Business-Key-Idempotenz

Manchmal ist der natürliche Idempotenz-Key in den Business-Daten — z.B. `stripe_session_id` ist unique auf deiner `purchases`-Tabelle.

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

Beide Patterns funktionieren. `processed_events` ist einfacher, wenn ein Event mehrere Writes auslöst. Business-Key-Idempotenz ist einfacher, wenn es genau einen Write gibt.

## Was "Retry" bedeutet

Stripe retryed mit exponentiellem Backoff für 3 Tage. Danach sitzt das Event in deinem Stripe-Dashboard-Webhook-Tab, als failed markiert. Du kannst manuell replayen.

Die Implikationen:
- Dein Handler wird wieder getroffen, wenn du 5xx zurückgibst. Gib nicht 5xx zurück für "Mich interessiert dieses Event nicht."
- Gib 200 + `{ received: true, ignored: true }` zurück für Events, die du nicht verarbeiten willst — das ist der höfliche Weg zu acknowledgen.
- Ein persistentes 5xx bedeutet einen Alert. Verdrahte `processed_events` + eine "Events, die N-mal gefailed haben"-Query in dein Ops-Dashboard.

## Testen

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

Wenn du diesen Test überspringst, wirst du von Doppelbuchungen aus einer Kunden-E-Mail erfahren. Das ist die falsche Art zu lernen.

## Woher Webhooks im Dev kommen

```bash
# Locally, forward Stripe webhooks to your dev server:
stripe listen --forward-to localhost:3000/api/stripe/webhook
# The CLI prints a temporary webhook secret — that's what STRIPE_WEBHOOK_SECRET
# should be in your .env.local
```

In Vercel Preview und Production konfiguriere den Webhook-Endpoint im Stripe-Dashboard und pinne das Secret pro Environment via Vercel-Env-Vars.
