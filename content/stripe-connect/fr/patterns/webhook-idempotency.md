# Idempotence des webhooks

Stripe livrera chaque événement au moins une fois. Parfois plus. Votre handler doit pouvoir s'exécuter deux fois sans dommage.

## La table `processed_events`

```sql
create table public.processed_events (
  id            text primary key,           -- l'event.id de Stripe
  type          text not null,              -- p. ex. 'checkout.session.completed'
  processed_at  timestamptz not null default now()
);

-- Service role uniquement — les webhooks sont server-only.
alter table public.processed_events enable row level security;
```

## La forme du handler

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

  // 1. Check d'idempotence — a-t-on déjà traité cet événement ?
  const { data: seen } = await db
    .from("processed_events")
    .select("id")
    .eq("id", event.id)
    .maybeSingle();

  if (seen) {
    return Response.json({ received: true, idempotent: true });
  }

  // 2. Traiter.
  try {
    await dispatch(event);
  } catch (err) {
    console.error("[stripe webhook] error processing", event.id, err);
    return new Response("Handler error", { status: 500 });
  }

  // 3. Enregistrer. SEULEMENT après succès — Stripe retentera si on renvoie 5xx.
  await db
    .from("processed_events")
    .insert({ id: event.id, type: event.type });

  return Response.json({ received: true });
}
```

## Alternative : idempotence par clé métier

Parfois, la clé d'idempotence naturelle est dans les données métier — par exemple, `stripe_session_id` est unique sur votre table `purchases`.

```ts
async function handleCheckoutCompleted(s: Stripe.Checkout.Session) {
  const { error } = await db
    .from("purchases")
    .insert({
      stripe_session_id: s.id,         // la contrainte UNIQUE attrape les doublons
      buyer_email: s.customer_details!.email,
      amount_cents: s.amount_total!,
    });

  if (error) {
    // 23505 = violation d'unicité. Ce n'est pas une erreur dans notre modèle.
    if ((error as { code?: string }).code === "23505") return;
    throw error;
  }

  // Effets de bord (email, log) — ils ont besoin de leur propre discipline
  // d'idempotence s'ils ne sont pas transactionnels avec l'insert.
  await sendReceipt(s);
}
```

Les deux patterns fonctionnent. `processed_events` est plus simple quand un événement déclenche plusieurs writes. L'idempotence par clé métier est plus simple quand il n'y a qu'un seul write.

## Ce que veut dire « retry »

Stripe retente avec un exponential backoff pendant 3 jours. Après ça, l'événement reste dans l'onglet webhook de votre Stripe Dashboard, marqué en échec. Vous pouvez replay manuellement.

Les implications :
- Votre handler sera reçu à nouveau si vous renvoyez 5xx. Ne renvoyez pas 5xx pour « cet événement m'est égal ».
- Renvoyez 200 + `{ received: true, ignored: true }` pour les événements que vous ne voulez pas traiter — c'est la façon polie d'acquitter.
- Un 5xx persistant signifie une alerte. Câblez `processed_events` + une requête « événements qui ont échoué N fois » dans votre dashboard ops.

## Tests

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

Si vous sautez ce test, vous apprendrez l'existence des double-charges via un email client. C'est la mauvaise façon d'apprendre.

## D'où viennent les webhooks en dev

```bash
# En local, forwardez les webhooks Stripe vers votre serveur de dev :
stripe listen --forward-to localhost:3000/api/stripe/webhook
# La CLI imprime un webhook secret temporaire — c'est ce que STRIPE_WEBHOOK_SECRET
# doit valoir dans votre .env.local
```

En preview Vercel et en production, configurez l'endpoint webhook dans le dashboard Stripe et pinnez le secret par environnement via les variables d'environnement Vercel.
