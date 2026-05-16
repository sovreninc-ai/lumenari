# Pack de Implementación de Stripe Connect

> La doc de Stripe cubre el happy path. Este kit cubre todo lo que pasa después: webhooks fallidos, refunds parciales, chargebacks durante un payout, cambios de contrato a mitad de temporada.

**Optimizado para:** Claude · Claude Code.

---

## Modo de operación

Estás cableando Stripe Connect a una plataforma que divide pagos entre un operador de marketplace y una o más connected accounts (clubs, creators, contractors). Supuestos por defecto:

- **Express accounts** para los sellers conectados salvo que necesiten dashboard propio con su marca (poco común)
- **Destination charges con `application_fee_amount`** para splits limpios de dos partes
- **Webhook handler idempotente** con clave en `event.id`
- **Dinero en centavos.** La moneda es explícita. CAD por defecto.
- **Webhook secret fijado por ambiente.** Nunca compartas el secret de prod con staging.

Siempre pregunta: "¿Quién es el dueño de la relación con el cliente?" — eso decide si usas destination charges (tú lo eres) o separate charges (la connected account lo es).

---

## El modelo mental

```
[ Cliente ] ──paga──> [ Tu cuenta Stripe de plataforma ] ──split──> [ Connected account ]
                                  │
                                  ├── se queda con application_fee_amount
                                  └── transfiere el resto a la connected account
```

Esto es lo que casi siempre quieres. El cliente ve tu marca. Tú manejas las disputas. La connected account solo cobra.

Evita: separate charges (donde el cliente le paga directo a la connected account). Ese modelo pone la disputa sobre la connected account y complica los refunds.

---

## Onboarding de la cuenta

```ts
// Server action: arrancar el onboarding de Express
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

  // Guarda account.id contra la fila de tu org.
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

Al regreso, escucha los webhooks `account.updated` y bloquea la UI detrás de `account.charges_enabled` Y `account.payouts_enabled`.

---

## Cobrar un pago con un split

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

La connected account nunca ve la tarjeta del cliente. La transferencia se hace automáticamente cuando el cobro se acredita.

---

## Webhooks — la regla de idempotencia

Stripe va a entregar cada evento al menos una vez. Tu handler tiene que ser seguro para correr dos veces.

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

  // 1. Revisa si ya procesamos este evento.
  const db = supabaseService();
  const { data: existing } = await db
    .from("processed_events")
    .select("id")
    .eq("id", event.id)
    .maybeSingle();

  if (existing) {
    return Response.json({ received: true, idempotent: true });
  }

  // 2. Procésalo.
  try {
    await handle(event);
  } catch (err) {
    // NO lo marques como procesado. Stripe va a reintentar.
    console.error("[stripe] handler error:", err);
    return new Response("Handler error", { status: 500 });
  }

  // 3. Registra que lo procesamos. Este es el lock de idempotencia.
  await db.from("processed_events").insert({ id: event.id, type: event.type });

  return Response.json({ received: true });
}
```

La tabla `processed_events` es simplemente `(id text primary key, type text, processed_at timestamptz default now())`.

---

## Árbol de decisión para refund + dispute

Un refund se divide entre dos partes: el `application_fee_amount` de tu plataforma y el `transfer_data.amount` de la connected account. Stripe por defecto refunda ambos proporcionalmente.

| Situación | Qué hacer |
| --- | --- |
| Refund total, acuerdo mutuo | `stripe.refunds.create({ payment_intent, refund_application_fee: true, reverse_transfer: true })` |
| Refund parcial, acuerdo mutuo | Lo mismo, pero con `amount` explícito. Pon `reverse_transfer: true` para que la connected account sea debitada proporcionalmente. |
| Disputa (chargeback) abierta | Sube evidencia. La fee normalmente se refunda automáticamente. Sigue el resultado vía el evento `charge.dispute.closed`. |
| Refund DESPUÉS de que ya pasó el payout | Mismo código — Stripe lo revierte del SIGUIENTE payout de la connected account (crea balance negativo si hace falta). |
| La connected account no tiene balance suficiente para revertir | Stripe crea un débito. El dueño de la connected account tiene que recargar o esperar. Surfacéalo en tu UI. |

---

## Edge cases que vas a encontrar eventualmente

### 1. Salida a mitad de contrato

Una connected account deja de trabajar contigo. Los clientes existentes tienen suscripciones activas. No deshabilites la cuenta de inmediato — pausa los nuevos cargos, termina el período en curso, después transfiere la relación con el cliente.

### 2. Conversión de moneda

El cliente paga en USD, la connected account quiere payouts en CAD. Stripe maneja el FX automáticamente pero cobra una fee. Decide quién la absorbe (normalmente la plataforma) y documéntalo.

### 3. Manejo de líneas de impuestos

Si tus connected accounts cobran sales tax, usa `automatic_tax: { enabled: true }` y `tax_code` en cada price. Stripe Tax después reporta el cobro por jurisdicción.

### 4. El webhook que llegó tarde

Un `payment_intent.succeeded` llega 6 horas después de que la orden se envió. Tu check de idempotencia lo cubre — pero asegúrate que el handler sea seguro aun si el estado downstream ya se movió.

---

## Docs complementarios

- `patterns/account-onboarding.md` — Express vs. Standard con los trade-offs legales/fiscales
- `patterns/destination-charges.md` — walkthrough completo del código con cuentas de revenue-share
- `patterns/webhook-idempotency.md` — la tabla `processed_events` + patrones alternativos
- `playbooks/refunds-and-disputes.md` — árbol de decisión para operadores
