# Destination charges — el primitivo correcto para splits de dos partes

Un destination charge es un único cobro en tu cuenta de plataforma, con una transferencia a una connected account integrada. El cliente ve tu marca. La connected account ve un payout limpio. Tú te llevas una application fee.

## La forma

```ts
const session = await stripe.checkout.sessions.create({
  mode: "payment",
  line_items: [{ price: PRICE_ID, quantity: 1 }],
  customer_email: buyer.email,
  payment_intent_data: {
    application_fee_amount: 6000, // USD $60 en centavos — la parte de la plataforma
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

Si `application_fee_amount = 6000` y el line item es USD $120:
- Plataforma: USD $60
- Connected account: USD $60 (menos la processing fee de Stripe, que Stripe le saca a la connected account por defecto)

Para absorber la processing fee de Stripe en la plataforma, agrega `on_behalf_of: connectedAccount.stripeId` Y setea los defaults de fee en la cuenta — ver "Responsabilidad de fees" abajo.

## Cuentas de revenue-share (ejemplo trabajado)

Calgary Villains tiene 3,000 jugadores. Lumenari Sports cobra USD $120/jugador/año. El split es 50/50 — la plataforma se lleva USD $60, el club se lleva USD $60. Stripe se lleva ~3.4% + USD $0.30 = ~USD $4.38 en una transacción de USD $120.

¿De dónde salen los USD $4.38? Dos opciones:

### Opción A — Fees de Stripe primero, después el split

```ts
// USD $120 cobrados. Stripe deduce USD $4.38. Quedan USD $115.62.
// Split 50/50 = USD $57.81 cada uno.
//
// En código: application_fee_amount = floor(115.62 / 2 * 100) = 5781
application_fee_amount: Math.floor((charge_cents - stripeFee(charge_cents)) / 2)
```

### Opción B — La plataforma absorbe la fee de su parte

```ts
// USD $120 cobrados. El split es bruto: USD $60 / USD $60.
// Los USD $4.38 de Stripe salen de los USD $60 de la plataforma, así que la plataforma neta ~USD $55.62.
//
// En código: application_fee_amount = exactamente la mitad del cobro
application_fee_amount: Math.floor(charge_cents / 2)
```

Elige B si quieres que el número del club sea predecible ("te llevas USD $60 por jugador, punto"). Es mejor historia para ventas.

## Responsabilidad de fees

Stripe te deja decidir quién paga la processing fee. El default es la connected account. Para moverla a la plataforma:

```ts
payment_intent_data: {
  transfer_data: { destination: connectedAccount.stripeId },
  on_behalf_of: connectedAccount.stripeId,
  application_fee_amount: PLATFORM_CUT_CENTS,
}
```

`on_behalf_of` hace que el cobro le pertenezca legalmente a la connected account a efectos fiscales/regulatorios pero mantiene el flujo de dinero en tu plataforma. Con esto combinado con `application_fee_amount`, la fee sale del `application_fee_amount` de la plataforma.

## Leer el resultado

```ts
// Después de que el cliente paga, recibes un evento checkout.session.completed.
const session = event.data.object as Stripe.Checkout.Session;

// El PaymentIntent tiene la info del transfer.
const pi = await stripe.paymentIntents.retrieve(session.payment_intent as string);

// El transfer real es alcanzable desde el latest_charge.
const charge = await stripe.charges.retrieve(pi.latest_charge as string);
console.log({
  amount: charge.amount, // total cobrado
  app_fee: charge.application_fee_amount, // tu parte
  transfer: charge.transfer_data?.destination, // connected account
  net_to_connected: charge.amount - (charge.application_fee_amount ?? 0)
    - (charge.balance_transaction
      // Processing fee de Stripe — trae el balance_transaction para el número exacto
      ? 0 : 0),
});
```

En la práctica, obtén la fee precisa del balance transaction:

```ts
const bt = await stripe.balanceTransactions.retrieve(charge.balance_transaction as string);
// bt.fee = total de la fee de Stripe en centavos
// bt.net = monto que llegó al balance de tu plataforma
```

## Registrarlo de tu lado

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
  stripe_fee_cents       integer,            -- traído desde balance_transaction
  currency               text default 'cad',
  created_at             timestamptz default now()
);
```

Hacé backfill de `stripe_fee_cents` desde un segundo webhook (`charge.updated` una vez que `balance_transaction` se resuelve) o trayéndolo inline si toleras un API call síncrono en el webhook handler.
