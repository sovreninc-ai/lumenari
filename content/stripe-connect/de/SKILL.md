# Stripe Connect Implementation Pack

> Die Stripe-Docs decken den Happy Path ab. Dieses Kit deckt alles ab, was danach passiert: fehlgeschlagene Webhooks, partielle Refunds, Chargebacks während einer Auszahlung, Vertragsänderungen mitten in der Saison.

**Optimiert für:** Claude · Claude Code.

---

## Arbeitsmodus

Du verdrahtest Stripe Connect in eine Plattform, die Zahlungen zwischen einem Marketplace-Operator und einem oder mehreren verbundenen Accounts (Clubs, Creators, Contractors) aufteilt. Standard-Annahmen:

- **Express Accounts** für verbundene Verkäufer, außer sie müssen ihr eigenes Dashboard branden (selten)
- **Destination Charges mit `application_fee_amount`** für saubere Zwei-Parteien-Splits
- **Idempotenter Webhook-Handler** mit `event.id` als Key
- **Geld in Cents.** Währung ist explizit. Default CAD.
- **Webhook-Secret pro Environment gepinnt.** Teile niemals das Prod-Secret mit Staging.

Frage immer: "Wer besitzt die Kundenbeziehung?" — das entscheidet, ob du Destination Charges nutzt (das tust du) oder Separate Charges (das tut der verbundene Account).

---

## Das Mental Model

```
[ Customer ] ──pays──> [ Your platform Stripe account ] ──split──> [ Connected account ]
                                  │
                                  ├── keeps application_fee_amount
                                  └── transfers the rest to the connected account
```

Das ist, was du fast immer willst. Der Kunde sieht deine Marke. Du handhabst Disputes. Der verbundene Account wird einfach bezahlt.

Vermeiden: Separate Charges (wo der Kunde dem verbundenen Account direkt zahlt). Dieses Modell legt den Dispute auf den verbundenen Account und kompliziert Refunds.

---

## Account-Onboarding

```ts
// Server action: kick off Express onboarding
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

  // Store account.id against your org row.
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

Bei der Rückkehr horche auf `account.updated`-Webhooks und gate die UI hinter `account.charges_enabled` UND `account.payouts_enabled`.

---

## Eine Zahlung mit Split entgegennehmen

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

Der verbundene Account sieht die Kreditkarte des Kunden nie. Der Transfer passiert automatisch, wenn die Charge clearet.

---

## Webhooks — die Idempotenz-Regel

Stripe liefert jedes Event mindestens einmal. Dein Handler muss sicher zweimal laufen können.

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

  // 1. Check if we've already processed this event.
  const db = supabaseService();
  const { data: existing } = await db
    .from("processed_events")
    .select("id")
    .eq("id", event.id)
    .maybeSingle();

  if (existing) {
    return Response.json({ received: true, idempotent: true });
  }

  // 2. Process it.
  try {
    await handle(event);
  } catch (err) {
    // Do NOT mark as processed. Stripe will retry.
    console.error("[stripe] handler error:", err);
    return new Response("Handler error", { status: 500 });
  }

  // 3. Record we processed it. This is the idempotency lock.
  await db.from("processed_events").insert({ id: event.id, type: event.type });

  return Response.json({ received: true });
}
```

Die `processed_events`-Tabelle ist einfach `(id text primary key, type text, processed_at timestamptz default now())`.

---

## Refund- + Dispute-Entscheidungsbaum

Ein Refund splittet sich über zwei Parteien: das `application_fee_amount` deiner Plattform und das `transfer_data.amount` des verbundenen Accounts. Stripe defaultet darauf, beide proportional zu erstatten.

| Situation | Was zu tun |
| --- | --- |
| Voller Refund, einvernehmlich | `stripe.refunds.create({ payment_intent, refund_application_fee: true, reverse_transfer: true })` |
| Partieller Refund, einvernehmlich | Dasselbe, aber mit explizitem `amount`. Setze `reverse_transfer: true`, damit der verbundene Account proportional belastet wird. |
| Dispute (Chargeback) eröffnet | Evidence einreichen. Die Fee wird meist automatisch erstattet. Verfolge das Ergebnis via `charge.dispute.closed`-Event. |
| Refund NACH erfolgter Auszahlung | Derselbe Code — Stripe revertiert es aus der NÄCHSTEN Auszahlung des verbundenen Accounts (erzeugt bei Bedarf ein Negativ-Balance). |
| Verbundener Account hat unzureichendes Guthaben zum Reversen | Stripe erzeugt ein Debit. Der Besitzer des verbundenen Accounts muss aufladen oder warten. Surface das in deiner UI. |

---

## Edge Cases, die du irgendwann treffen wirst

### 1. Mid-Contract-Abgang

Ein verbundener Account hört auf, mit dir zu arbeiten. Bestehende Kunden haben laufende Subscriptions. Deaktiviere den Account nicht sofort — pausiere neue Charges, beende die Periode, dann transferiere die Kundenbeziehung.

### 2. Währungskonvertierung

Kunde zahlt in USD, verbundener Account will CAD-Auszahlungen. Stripe handhabt den FX automatisch, berechnet aber eine Fee. Entscheide, wer sie trägt (meist die Plattform) und dokumentiere es.

### 3. Tax-Line-Handling

Wenn deine verbundenen Accounts Umsatzsteuer erheben, nutze `automatic_tax: { enabled: true }` und `tax_code` auf jedem Price. Stripe Tax reportet dann per-Jurisdiktion-Collections.

### 4. Der Webhook, der spät kam

Ein `payment_intent.succeeded` kommt 6 Stunden nach Versand der Bestellung. Dein Idempotenz-Check deckt das ab — aber stelle sicher, dass der Handler sicher ist, selbst wenn der Downstream-State schon weitergezogen ist.

---

## Begleitende Dokumente

- `patterns/account-onboarding.md` — Express vs. Standard mit den Legal/Tax-Tradeoffs
- `patterns/destination-charges.md` — vollständiger Code-Walkthrough mit Revenue-Share-Mathe
- `patterns/webhook-idempotency.md` — die `processed_events`-Tabelle + alternative Patterns
- `playbooks/refunds-and-disputes.md` — operator-seitiger Entscheidungsbaum
