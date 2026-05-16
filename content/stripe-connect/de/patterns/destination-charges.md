# Destination Charges — das richtige Primitive für Zwei-Parteien-Splits

Eine Destination Charge ist eine Charge auf deinem Plattform-Account, mit einem eingebackenen Transfer an einen verbundenen Account. Der Kunde sieht deine Marke. Der verbundene Account sieht eine saubere Auszahlung. Du nimmst eine Application Fee.

## Die Form

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

Wenn `application_fee_amount = 6000` und das Line Item $120 ist:
- Plattform: $60
- Verbundener Account: $60 (minus Stripes Processing Fee, die Stripe standardmäßig vom verbundenen Account nimmt)

Um Stripes Processing Fee auf der Plattform-Seite zu absorbieren, füge `on_behalf_of: connectedAccount.stripeId` hinzu UND setze Fee-Defaults auf dem Account — siehe "Fee-Verantwortlichkeit" unten.

## Revenue-Share-Mathe (ausgearbeitetes Beispiel)

Calgary Villains hat 3.000 Spieler. Lumenari Sports berechnet $120/Spieler/Jahr. Der Split ist 50/50 — Plattform bekommt $60, Club bekommt $60. Stripe nimmt ~3,4% + $0,30 = ~$4,38 bei einer $120-Transaktion.

Woher kommen die $4,38? Zwei Optionen:

### Option A — Stripe-Fees oben weg, dann Split

```ts
// $120 charged. Stripe deducts $4.38. Remaining $115.62.
// Split 50/50 = $57.81 each.
//
// In code: application_fee_amount = floor(115.62 / 2 * 100) = 5781
application_fee_amount: Math.floor((charge_cents - stripeFee(charge_cents)) / 2)
```

### Option B — Plattform nimmt die Fee aus ihrem Cut

```ts
// $120 charged. Split is gross: $60 / $60.
// Stripe's $4.38 comes out of the platform's $60, so platform nets ~$55.62.
//
// In code: application_fee_amount = exactly half the charge
application_fee_amount: Math.floor(charge_cents / 2)
```

Wähle B, wenn du willst, dass die Zahl des Clubs vorhersagbar ist ("du bekommst $60 pro Spieler, Punkt"). Es ist die bessere Story für Sales.

## Fee-Verantwortlichkeit

Stripe lässt dich entscheiden, wer die Processing Fee zahlt. Default ist der verbundene Account. Um sie auf die Plattform zu verlagern:

```ts
payment_intent_data: {
  transfer_data: { destination: connectedAccount.stripeId },
  on_behalf_of: connectedAccount.stripeId,
  application_fee_amount: PLATFORM_CUT_CENTS,
}
```

`on_behalf_of` macht die Charge legal dem verbundenen Account zugehörig für Tax/Regulatorik-Zwecke, behält aber den Geldfluss auf deiner Plattform. Damit kombiniert mit `application_fee_amount` kommt die Fee aus dem `application_fee_amount` der Plattform.

## Das Ergebnis lesen

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

In der Praxis hole die präzise Fee aus der Balance Transaction:

```ts
const bt = await stripe.balanceTransactions.retrieve(charge.balance_transaction as string);
// bt.fee = total Stripe fee in cents
// bt.net = amount that hit your platform balance
```

## Es auf deiner Seite aufzeichnen

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

Backfille `stripe_fee_cents` von einem zweiten Webhook (`charge.updated`, sobald `balance_transaction` resolvet) oder indem du es inline holst, wenn du einen synchronen API-Call im Webhook-Handler verdauen kannst.
