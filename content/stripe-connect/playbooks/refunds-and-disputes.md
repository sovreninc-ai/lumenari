# Refunds and disputes playbook

When money has already moved, things get complicated. Here's the decision tree.

## The four common situations

### 1. Customer asks for a full refund, no dispute

Operator-initiated refund. Easy case.

```ts
const refund = await stripe.refunds.create({
  payment_intent: pi.id,
  refund_application_fee: true, // refund the platform's cut too
  reverse_transfer: true,        // pull money back from the connected account
});
```

If `reverse_transfer: true` and the connected account has insufficient balance, Stripe creates a debit and the connected account ends up with a negative balance until their next payout cycle.

Surface this in your admin UI: "This refund will pull $X from [Org]'s next payout."

### 2. Customer asks for a partial refund

Same code, with `amount`:

```ts
const refund = await stripe.refunds.create({
  payment_intent: pi.id,
  amount: 5000, // $50 in cents
  refund_application_fee: true,
  reverse_transfer: true,
});
```

Stripe proportionally refunds the platform fee. If the original split was 50/50 ($60/$60 on $120) and the customer gets $50 back, the platform fee refund is $25 and the connected account's transfer reverse is $25.

If you want a different split (e.g., the platform eats the entire refund), set `refund_application_fee: false` and reverse manually:

```ts
await stripe.refunds.create({ payment_intent: pi.id, amount: 5000 });
// No reverse_transfer, no refund_application_fee — platform absorbs it.
```

### 3. Customer files a chargeback with their bank

This is a dispute, not a refund. Different lifecycle.

The customer's bank pulls the money back from Stripe. Stripe pulls from your platform. You get a `charge.dispute.created` webhook. You have ~7-14 days to submit evidence.

```ts
async function handleDispute(d: Stripe.Dispute) {
  // 1. Notify the operator (you) — this needs human attention.
  await sendDisputeAlert(d);

  // 2. Mark the purchase as disputed in your DB.
  await db.from("purchases")
    .update({ disputed_at: new Date().toISOString(), dispute_reason: d.reason })
    .eq("stripe_payment_intent", d.payment_intent);

  // 3. If the connected account should know, notify them too.
  await notifyConnectedAccount(d);
}
```

When you submit evidence, do it via the dashboard for the first few — Stripe's web form is more guided than the API. Once you have a process, automate via `stripe.disputes.update`.

If you win the dispute, the money comes back. If you lose, the chargeback stands and the connected account may also lose their share.

### 4. Refund AFTER the payout already happened

Same code as case 1 or 2. Stripe handles the accounting. The connected account ends up with a negative balance on their Stripe ledger until their next charge or until they top up via bank transfer.

Operationally, this is the place customer service goes wrong most often. Build a "are you sure?" interstitial in your admin UI that says: "This will pull $X from [Org]'s account, which currently has $Y balance. They will be in a negative balance position until their next payout."

## Edge cases

### Disputed transaction, half-refunded already

If you've already refunded $50 of a $120 transaction and the customer disputes the remaining $70, Stripe disputes the full original charge ($120) minus the refunded $50 = $70 in scope. Your evidence package should mention the partial refund.

### Connected account leaves the platform mid-dispute

Two cases:

1. **Account in good standing, just leaving:** Disputes against their charges still go to your platform. Settle, then close out their account.
2. **Account suspended for fraud or violation:** Stripe may hold their balance to cover anticipated disputes for 90 days. The connected account doesn't get their final payout until that period expires.

Document the offboarding flow with the connected account before you ever offboard one in production.

### Currency mismatch on the refund

If you charged in CAD and the connected account holds USD payouts, Stripe converts and charges an FX fee. The platform usually eats it (cleaner UX). Make sure your refund amount calculation accounts for the small FX loss if you're trying to make the customer whole exactly.

## What to surface in your admin UI

For each transaction:

- Original charge amount and date
- Platform fee, connected account share, Stripe fee
- Any refunds (date, amount, who initiated)
- Any disputes (status, evidence deadline, outcome)
- "Refund this" button with a confirmation that shows the dollar impact on each party

If you can't answer "what happened with this transaction" in under 30 seconds, your admin UI isn't done.
