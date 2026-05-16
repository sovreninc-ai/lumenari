# Destination charges — the right primitive for two-party splits

A destination charge is one charge on your platform account, with a transfer to a connected account baked in. The customer sees your brand. The connected account sees a clean payout. You skim an application fee.

## The shape

```ts
const session = await stripe.checkout.sessions.create({
  mode: "payment",
  line_items: [{ price: PRICE_ID, quantity: 1 }],
  customer_email: buyer.email,
  payment_intent_data: {
    application_fee_amount: 6000, // $60 in CAD cents — the platform's cut
    transfer_data: {
      destination: connectedAccount.stripeId, // 'acct_…'
    },
    metadata: {
      organization_id: org.id,
      buyer_email: buyer.email,
      season_id: season.id,
    },
  },
  success_url: `${SITE}/thanks?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${SITE}/checkout?canceled=1`,
});
```

If `application_fee_amount = 6000` and the line item is $120:
- Platform: $60
- Connected account: $60 (minus Stripe's processing fee, which Stripe takes from the connected account by default)

To absorb Stripe's processing fee on the platform side, add `on_behalf_of: connectedAccount.stripeId` AND set fee defaults on the account — see "Fee responsibility" below.

## Revenue-share math (worked example)

Calgary Villains has 3,000 players. Lumenari Sports charges $120/player/year. The split is 50/50 — platform gets $60, club gets $60. Stripe takes ~3.4% + $0.30 = ~$4.38 on a $120 transaction.

Where does the $4.38 come from? Two options:

### Option A — Stripe fees off the top, then split

```ts
// $120 charged. Stripe deducts $4.38. Remaining $115.62.
// Split 50/50 = $57.81 each.
//
// In code: application_fee_amount = floor(115.62 / 2 * 100) = 5781
application_fee_amount: Math.floor((charge_cents - stripeFee(charge_cents)) / 2)
```

### Option B — Platform takes the fee out of its cut

```ts
// $120 charged. Split is gross: $60 / $60.
// Stripe's $4.38 comes out of the platform's $60, so platform nets ~$55.62.
//
// In code: application_fee_amount = exactly half the charge
application_fee_amount: Math.floor(charge_cents / 2)
```

Choose B if you want the club's number to be predictable ("you get $60 per player, period"). It's the better story for sales.

## Fee responsibility

Stripe lets you decide who pays the processing fee. Default is the connected account. To shift it to the platform:

```ts
payment_intent_data: {
  transfer_data: { destination: connectedAccount.stripeId },
  on_behalf_of: connectedAccount.stripeId,
  application_fee_amount: PLATFORM_CUT_CENTS,
}
```

`on_behalf_of` makes the charge legally belong to the connected account for tax/regulatory purposes but keeps the money flow on your platform. With this combined with `application_fee_amount`, the fee comes out of the platform's `application_fee_amount`.

## Reading the result

```ts
// After the customer pays, you get a checkout.session.completed event.
const session = event.data.object as Stripe.Checkout.Session;

// The PaymentIntent has the transfer info.
const pi = await stripe.paymentIntents.retrieve(session.payment_intent as string);

// The actual transfer is reachable from the latest_charge.
const charge = await stripe.charges.retrieve(pi.latest_charge as string);
console.log({
  amount: charge.amount, // total charged
  app_fee: charge.application_fee_amount, // your cut
  transfer: charge.transfer_data?.destination, // connected account
  net_to_connected: charge.amount - (charge.application_fee_amount ?? 0)
    - (charge.balance_transaction
      // Stripe processing fee — fetch the balance_transaction for the exact number
      ? 0 : 0),
});
```

In practice, get the precise fee from the balance transaction:

```ts
const bt = await stripe.balanceTransactions.retrieve(charge.balance_transaction as string);
// bt.fee = total Stripe fee in cents
// bt.net = amount that hit your platform balance
```

## Recording it on your side

```sql
create table public.purchases (
  id                     uuid primary key default gen_random_uuid(),
  organization_id        uuid references public.organizations(id),
  buyer_email            text not null,
  stripe_session_id      text unique,
  stripe_payment_intent  text,
  stripe_charge_id       text,
  amount_cents           integer not null,
  platform_fee_cents     integer not null,
  stripe_fee_cents       integer,            -- fetched from balance_transaction
  currency               text default 'cad',
  created_at             timestamptz default now()
);
```

Backfill `stripe_fee_cents` from a second webhook (`charge.updated` once `balance_transaction` resolves) or by retrieving it inline if you can stomach a synchronous API call in the webhook handler.
