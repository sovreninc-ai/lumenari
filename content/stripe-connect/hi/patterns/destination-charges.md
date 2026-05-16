# Destination charges — two-party splits के लिए सही primitive

एक destination charge आपके platform account पर एक charge है, जिसमें एक connected account को transfer baked in है। Customer आपका brand देखता है। Connected account एक clean payout देखता है। आप एक application fee skim करते हैं।

## Shape

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

अगर `application_fee_amount = 6000` और line item $120 है:
- Platform: $60
- Connected account: $60 (Stripe की processing fee minus, जो Stripe default connected account से लेता है)

Stripe की processing fee को platform side पर absorb करने के लिए, `on_behalf_of: connectedAccount.stripeId` add करें AND account पर fee defaults set करें — नीचे "Fee responsibility" देखें।

## Revenue-share math (worked example)

Calgary Villains के 3,000 players हैं। Lumenari Sports $120/player/year charge करता है। Split 50/50 है — platform को $60, club को $60। Stripe एक $120 transaction पर ~3.4% + $0.30 = ~$4.38 लेता है।

$4.38 कहाँ से आता है? दो options:

### Option A — Stripe fees off the top, फिर split

```ts
// $120 charged. Stripe deducts $4.38. Remaining $115.62.
// Split 50/50 = $57.81 each.
//
// In code: application_fee_amount = floor(115.62 / 2 * 100) = 5781
application_fee_amount: Math.floor((charge_cents - stripeFee(charge_cents)) / 2)
```

### Option B — Platform अपने cut से fee लेता है

```ts
// $120 charged. Split is gross: $60 / $60.
// Stripe's $4.38 comes out of the platform's $60, so platform nets ~$55.62.
//
// In code: application_fee_amount = exactly half the charge
application_fee_amount: Math.floor(charge_cents / 2)
```

B चुनें अगर आप चाहते हैं कि club का number predictable हो ("आपको per player $60 मिलते हैं, period")। यह sales के लिए बेहतर story है।

## Fee responsibility

Stripe आपको decide करने देता है कौन processing fee pays करता है। Default connected account है। इसे platform पर shift करने के लिए:

```ts
payment_intent_data: {
  transfer_data: { destination: connectedAccount.stripeId },
  on_behalf_of: connectedAccount.stripeId,
  application_fee_amount: PLATFORM_CUT_CENTS,
}
```

`on_behalf_of` charge को tax/regulatory purposes के लिए legally connected account का बनाता है लेकिन money flow आपके platform पर रखता है। `application_fee_amount` के साथ combined किया जाए, fee platform के `application_fee_amount` से आती है।

## Result पढ़ना

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

Practice में, exact fee balance transaction से लें:

```ts
const bt = await stripe.balanceTransactions.retrieve(charge.balance_transaction as string);
// bt.fee = total Stripe fee in cents
// bt.net = amount that hit your platform balance
```

## अपनी तरफ इसे record करना

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

`stripe_fee_cents` को एक second webhook (`charge.updated` जब `balance_transaction` resolve हो जाए) से backfill करें या अगर आप webhook handler में synchronous API call sustain कर सकते हैं तो inline retrieve करके।
