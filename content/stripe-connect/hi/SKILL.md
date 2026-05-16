# Stripe Connect Implementation Pack

> Stripe docs happy path cover करते हैं। यह kit उसके बाद होने वाली हर चीज़ cover करता है: failed webhooks, partial refunds, payout के दौरान chargebacks, mid-season contract changes।

**Optimized for:** Claude · Claude Code.

---

## Operating mode

आप एक platform में Stripe Connect wire कर रहे हैं जो marketplace operator और एक या अधिक connected accounts (clubs, creators, contractors) के बीच payments split करता है। Default assumptions:

- **Express accounts** connected sellers के लिए जब तक उन्हें अपना dashboard brand करना न हो (rare)
- **Destination charges with `application_fee_amount`** clean two-party splits के लिए
- **Idempotent webhook handler** `event.id` से keyed
- **Money in cents.** Currency explicit। Default CAD।
- **Webhook secret per environment pinned.** Prod secret को कभी staging के साथ share न करें।

हमेशा पूछें: "customer relationship का owner कौन है?" — यह decide करता है कि आप destination charges (आप करते हैं) या separate charges (connected account करता है) use करते हैं।

---

## Mental model

```
[ Customer ] ──pays──> [ Your platform Stripe account ] ──split──> [ Connected account ]
                                  │
                                  ├── keeps application_fee_amount
                                  └── transfers the rest to the connected account
```

यह almost हमेशा वही है जो आप चाहते हैं। Customer आपका brand देखता है। आप disputes handle करते हैं। Connected account बस paid होता है।

बचें: separate charges (जहाँ customer connected account को directly pay करता है)। वो model dispute को connected account पर डालता है और refunds को complicate करता है।

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

Return पर, `account.updated` webhooks के लिए listen करें और UI को `account.charges_enabled` AND `account.payouts_enabled` के पीछे gate करें।

---

## Split के साथ payment लेना

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

Connected account customer का card कभी नहीं देखता। Transfer automatically होता है जब charge clear होता है।

---

## Webhooks — idempotency rule

Stripe हर event को कम से कम एक बार deliver करेगा। आपका handler दो बार run होने के लिए safe होना चाहिए।

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

`processed_events` table बस `(id text primary key, type text, processed_at timestamptz default now())` है।

---

## Refund + dispute decision tree

एक refund दो parties पर split होता है: आपके platform का `application_fee_amount` और connected account का `transfer_data.amount`। Stripe default दोनों को proportionally refund करता है।

| Situation | क्या करें |
| --- | --- |
| Full refund, mutual agreement | `stripe.refunds.create({ payment_intent, refund_application_fee: true, reverse_transfer: true })` |
| Partial refund, mutual agreement | Same, लेकिन explicit `amount` के साथ। `reverse_transfer: true` set करें ताकि connected account proportionally debit हो। |
| Dispute (chargeback) opened | Evidence submit करें। Fee आमतौर पर automatically refund हो जाती है। `charge.dispute.closed` event के through outcome track करें। |
| Payout के बाद refund | Same code — Stripe connected account के NEXT payout से reverse out करता है (ज़रूरत हो तो negative balance create करता है)। |
| Connected account के पास reverse के लिए insufficient balance | Stripe एक debit create करता है। Connected account owner को top up करना है या wait करना है। इसे अपने UI में surface करें। |

---

## Edge cases जो आप eventually hit करेंगे

### 1. Mid-contract departure

एक connected account आपके साथ काम करना बंद कर देता है। Existing customers के ongoing subscriptions हैं। Account को immediately disable न करें — new charges pause करें, period finish करें, फिर customer relationship transfer करें।

### 2. Currency conversion

Customer USD में pay करता है, connected account CAD payouts चाहता है। Stripe FX को automatically handle करता है लेकिन एक fee charge करता है। Decide करें कौन इसे खाता है (आमतौर पर platform) और document करें।

### 3. Tax-line handling

अगर आपके connected accounts sales-tax-collecting हैं, हर price पर `automatic_tax: { enabled: true }` और `tax_code` use करें। Stripe Tax फिर per-jurisdiction collections report करता है।

### 4. वो webhook जो late आया

एक `payment_intent.succeeded` order ship होने के 6 hours बाद arrive होता है। आपका idempotency check इसे cover करता है — लेकिन यह सुनिश्चित करें कि handler तब भी safe है जब downstream state already आगे बढ़ गया है।

---

## Companion docs

- `patterns/account-onboarding.md` — Express vs. Standard legal/tax tradeoffs के साथ
- `patterns/destination-charges.md` — revenue-share math के साथ full code walkthrough
- `patterns/webhook-idempotency.md` — `processed_events` table + alternative patterns
- `playbooks/refunds-and-disputes.md` — operator-facing decision tree
