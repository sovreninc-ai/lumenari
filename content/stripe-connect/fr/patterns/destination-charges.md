# Destination charges — la bonne primitive pour les splits two-party

Une destination charge est une charge unique sur le compte de votre plateforme, avec un transfert vers un compte connecté intégré. Le client voit votre marque. Le compte connecté voit un payout propre. Vous prélevez une application fee.

## La forme

```ts
const session = await stripe.checkout.sessions.create({
  mode: "payment",
  line_items: [{ price: PRICE_ID, quantity: 1 }],
  customer_email: buyer.email,
  payment_intent_data: {
    application_fee_amount: 6000, // 60 $ en centimes CAD — la part de la plateforme
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

Si `application_fee_amount = 6000` et que le line item est à 120 $ :
- Plateforme : 60 $
- Compte connecté : 60 $ (moins les frais de traitement Stripe, que Stripe prélève par défaut sur le compte connecté)

Pour absorber les frais de traitement Stripe côté plateforme, ajoutez `on_behalf_of: connectedAccount.stripeId` ET configurez les fee defaults sur le compte — voir « Responsabilité des frais » ci-dessous.

## Maths du revenue-share (exemple travaillé)

Calgary Villains compte 3 000 joueurs. Lumenari Sports facture 120 $/joueur/an. Le split est 50/50 — la plateforme touche 60 $, le club touche 60 $. Stripe prélève ~3,4 % + 0,30 $ = ~4,38 $ sur une transaction de 120 $.

D'où viennent les 4,38 $ ? Deux options :

### Option A — Frais Stripe en premier, puis split

```ts
// 120 $ encaissés. Stripe déduit 4,38 $. Reste 115,62 $.
// Split 50/50 = 57,81 $ chacun.
//
// En code : application_fee_amount = floor(115.62 / 2 * 100) = 5781
application_fee_amount: Math.floor((charge_cents - stripeFee(charge_cents)) / 2)
```

### Option B — La plateforme paie les frais sur sa part

```ts
// 120 $ encaissés. Split en brut : 60 $ / 60 $.
// Les 4,38 $ de Stripe sortent des 60 $ de la plateforme, qui net donc ~55,62 $.
//
// En code : application_fee_amount = exactement la moitié de la charge
application_fee_amount: Math.floor(charge_cents / 2)
```

Choisissez B si vous voulez que le chiffre du club soit prévisible (« vous touchez 60 $ par joueur, point »). C'est la meilleure histoire pour la vente.

## Responsabilité des frais

Stripe vous laisse décider qui paie les frais de traitement. Par défaut, c'est le compte connecté. Pour basculer la charge vers la plateforme :

```ts
payment_intent_data: {
  transfer_data: { destination: connectedAccount.stripeId },
  on_behalf_of: connectedAccount.stripeId,
  application_fee_amount: PLATFORM_CUT_CENTS,
}
```

`on_behalf_of` fait que la charge appartient légalement au compte connecté à des fins fiscales/réglementaires mais garde le flux d'argent sur votre plateforme. Avec ça combiné à `application_fee_amount`, les frais sont prélevés sur le `application_fee_amount` de la plateforme.

## Lire le résultat

```ts
// Après le paiement du client, vous recevez un événement checkout.session.completed.
const session = event.data.object as Stripe.Checkout.Session;

// Le PaymentIntent contient les infos de transfert.
const pi = await stripe.paymentIntents.retrieve(session.payment_intent as string);

// Le transfert effectif est accessible depuis le latest_charge.
const charge = await stripe.charges.retrieve(pi.latest_charge as string);
console.log({
  amount: charge.amount, // total encaissé
  app_fee: charge.application_fee_amount, // votre part
  transfer: charge.transfer_data?.destination, // compte connecté
  net_to_connected: charge.amount - (charge.application_fee_amount ?? 0)
    - (charge.balance_transaction
      // Frais de traitement Stripe — récupérez la balance_transaction pour le chiffre exact
      ? 0 : 0),
});
```

En pratique, récupérez le frais exact depuis la balance transaction :

```ts
const bt = await stripe.balanceTransactions.retrieve(charge.balance_transaction as string);
// bt.fee = frais Stripe total en centimes
// bt.net = montant qui a atterri sur le solde de votre plateforme
```

## L'enregistrer de votre côté

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
  stripe_fee_cents       integer,            -- récupéré depuis balance_transaction
  currency               text default 'cad',
  created_at             timestamptz default now()
);
```

Faites le backfill de `stripe_fee_cents` depuis un second webhook (`charge.updated` une fois que `balance_transaction` est résolue) ou en le récupérant inline si vous tolérez un appel API synchrone dans le webhook handler.
