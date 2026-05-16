# Stripe Connect Implementation Pack

> The Stripe docs cover the happy path. This kit covers everything that happens after: failed webhooks, partial refunds, chargebacks during a payout, contract changes mid-season.

**Optimized for:** Claude · Claude Code.

---

## Operating mode

You are wiring Stripe Connect into a platform that splits payments between a marketplace operator and one or more connected accounts (clubs, creators, contractors). Default assumptions:

- **Express accounts** for connected sellers unless they need to brand their own dashboard (rare)
- **Destination charges with `application_fee_amount`** for clean two-party splits
- **Idempotent webhook handler** keyed by `event.id`
- **Money in cents.** Currency is explicit. Default CAD.
- **Webhook secret pinned per environment.** Never share the prod secret with staging.

Always ask: "Who owns the customer relationship?" — that decides whether you use destination charges (you do) or separate charges (the connected account does).

---

## The mental model

```
[ Customer ] ──pays──> [ Your platform Stripe account ] ──split──> [ Connected account ]
                                  │
                                  ├── keeps application_fee_amount
                                  └── transfers the rest to the connected account
```

This is what you almost always want. The customer sees your brand. You handle disputes. The connected account just gets paid.

Avoid: separate charges (where the customer pays the connected account directly). That model puts the dispute on the connected account and complicates refunds.

---

## Account onboarding

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

On return, listen for `account.updated` webhooks and gate UI behind `account.charges_enabled` AND `account.payouts_enabled`.

---

## Taking a payment with a split

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

The connected account never sees the customer's card. The transfer happens automatically when the charge clears.

---

## Webhooks — the idempotency rule

Stripe will deliver every event at least once. Your handler must be safe to run twice.

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

The `processed_events` table is just `(id text primary key, type text, processed_at timestamptz default now())`.

---

## Refund + dispute decision tree

A refund splits across two parties: your platform's `application_fee_amount` and the connected account's `transfer_data.amount`. Stripe defaults to refunding both proportionally.

| Situation | What to do |
| --- | --- |
| Full refund, mutual agreement | `stripe.refunds.create({ payment_intent, refund_application_fee: true, reverse_transfer: true })` |
| Partial refund, mutual agreement | Same, but with explicit `amount`. Set `reverse_transfer: true` so the connected account is debited proportionally. |
| Dispute (chargeback) opened | Submit evidence. The fee usually gets refunded automatically. Track outcome via the `charge.dispute.closed` event. |
| Refund AFTER payout already happened | Same code — Stripe reverses out of the connected account's NEXT payout (creates a negative balance if needed). |
| Connected account has insufficient balance to reverse | Stripe creates a debit. The connected account owner has to top up or wait. Surface this in your UI. |

---

## Edge cases you'll hit eventually

### 1. Mid-contract departure

A connected account stops working with you. Existing customers have ongoing subscriptions. Don't immediately disable the account — pause new charges, finish out the period, then transfer the customer relationship.

### 2. Currency conversion

Customer pays in USD, connected account wants CAD payouts. Stripe handles the FX automatically but charges a fee. Decide who eats it (usually the platform) and document it.

### 3. Tax-line handling

If your connected accounts are sales-tax-collecting, use `automatic_tax: { enabled: true }` and `tax_code` on each price. Stripe Tax then reports per-jurisdiction collections.

### 4. The webhook that came late

A `payment_intent.succeeded` arrives 6 hours after the order shipped. Your idempotency check covers it — but make sure the handler is safe even if downstream state has already moved on.

---

## Companion docs

- `patterns/account-onboarding.md` — Express vs. Standard with the legal/tax tradeoffs
- `patterns/destination-charges.md` — full code walkthrough with revenue-share math
- `patterns/webhook-idempotency.md` — the `processed_events` table + alternative patterns
- `playbooks/refunds-and-disputes.md` — operator-facing decision tree
