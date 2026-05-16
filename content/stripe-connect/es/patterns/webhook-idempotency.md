# Idempotencia de webhooks

Stripe va a entregar cada evento al menos una vez. A veces más. Tu handler tiene que ser seguro para correr dos veces.

## La tabla `processed_events`

```sql
create table public.processed_events (
  id            text primary key,           -- el event.id de Stripe
  type          text not null,              -- p. ej., 'checkout.session.completed'
  processed_at  timestamptz not null default now()
);

-- Solo service role — los webhooks son solo-server.
alter table public.processed_events enable row level security;
```

## La forma del handler

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

  // 1. Check de idempotencia — ¿ya procesamos este evento?
  const { data: seen } = await db
    .from("processed_events")
    .select("id")
    .eq("id", event.id)
    .maybeSingle();

  if (seen) {
    return Response.json({ received: true, idempotent: true });
  }

  // 2. Maneja.
  try {
    await dispatch(event);
  } catch (err) {
    console.error("[stripe webhook] error processing", event.id, err);
    return new Response("Handler error", { status: 500 });
  }

  // 3. Registra. SOLO después del éxito — Stripe reintenta si devolvemos 5xx.
  await db
    .from("processed_events")
    .insert({ id: event.id, type: event.type });

  return Response.json({ received: true });
}
```

## Alternativa: idempotencia por business key

A veces la clave natural de idempotencia está en los datos de negocio — p. ej., `stripe_session_id` es único en tu tabla `purchases`.

```ts
async function handleCheckoutCompleted(s: Stripe.Checkout.Session) {
  const { error } = await db
    .from("purchases")
    .insert({
      stripe_session_id: s.id,         // el constraint UNIQUE atrapa duplicados
      buyer_email: s.customer_details!.email,
      amount_cents: s.amount_total!,
    });

  if (error) {
    // 23505 = unique violation. Eso no es un error en nuestro modelo.
    if ((error as { code?: string }).code === "23505") return;
    throw error;
  }

  // Side effects (email, log entry) — necesitan su propia disciplina
  // de idempotencia si no son transaccionales con el insert.
  await sendReceipt(s);
}
```

Ambos patrones funcionan. `processed_events` es más simple cuando un evento dispara varias escrituras. La idempotencia por business key es más simple cuando hay exactamente una escritura.

## Qué significa "reintento"

Stripe reintenta con exponential backoff durante 3 días. Después de eso, el evento queda en la pestaña de webhooks de tu Stripe Dashboard marcado como failed. Lo puedes replayar manualmente.

Las implicancias:
- Tu handler va a ser golpeado de nuevo si devuelves 5xx. No devuelvas 5xx para "no me importa este evento".
- Devuelve 200 + `{ received: true, ignored: true }` para los eventos que no quieres procesar — esa es la forma educada de acusar recibo.
- Un 5xx persistente significa una alerta. Conecta `processed_events` + una query de "eventos que fallaron N veces" a tu dashboard de ops.

## Testing

```ts
// Vitest / Bun:test
import { vi } from "vitest";

test("checkout.session.completed es idempotente", async () => {
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

Si te saltas este test, te vas a enterar de los cargos duplicados por un email de un cliente. Esa es la forma equivocada de aprender.

## De dónde vienen los webhooks en dev

```bash
# Localmente, forwardea los webhooks de Stripe a tu dev server:
stripe listen --forward-to localhost:3000/api/stripe/webhook
# La CLI imprime un webhook secret temporal — eso es lo que debería ser
# STRIPE_WEBHOOK_SECRET en tu .env.local
```

En Vercel preview y producción, configura el endpoint del webhook en el dashboard de Stripe y fija el secret por ambiente vía variables de entorno de Vercel.
