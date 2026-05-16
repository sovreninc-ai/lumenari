# Destination charges — a primitiva certa para splits entre duas partes

Um destination charge é uma cobrança na sua conta da plataforma, já com uma transferência para uma connected account embutida. O cliente vê sua marca. A connected account vê um payout limpo. Você fica com uma application fee.

## O formato

```ts
const session = await stripe.checkout.sessions.create({
  mode: "payment",
  line_items: [{ price: PRICE_ID, quantity: 1 }],
  customer_email: buyer.email,
  payment_intent_data: {
    application_fee_amount: 6000, // $60 em centavos CAD — o corte da plataforma
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

Se `application_fee_amount = 6000` e o line item é $120:
- Plataforma: $60
- Connected account: $60 (menos a fee de processamento do Stripe, que o Stripe pega da connected account por default)

Para a plataforma absorver a fee de processamento do Stripe, adicione `on_behalf_of: connectedAccount.stripeId` E configure defaults de fee na conta — veja "Responsabilidade pela fee" abaixo.

## Matemática de revenue-share (exemplo trabalhado)

Calgary Villains tem 3.000 jogadores. Lumenari Sports cobra $120/jogador/ano. O split é 50/50 — plataforma fica com $60, clube fica com $60. O Stripe pega ~3,4% + $0,30 = ~$4,38 numa transação de $120.

De onde sai o $4,38? Duas opções:

### Opção A — fees do Stripe saem antes, depois divide

```ts
// $120 cobrados. Stripe deduz $4,38. Restam $115,62.
// Split 50/50 = $57,81 para cada.
//
// Em código: application_fee_amount = floor(115.62 / 2 * 100) = 5781
application_fee_amount: Math.floor((charge_cents - stripeFee(charge_cents)) / 2)
```

### Opção B — Plataforma absorve a fee a partir do próprio corte

```ts
// $120 cobrados. Split é bruto: $60 / $60.
// Os $4,38 do Stripe saem dos $60 da plataforma, então a plataforma fica com ~$55,62 líquido.
//
// Em código: application_fee_amount = exatamente metade da cobrança
application_fee_amount: Math.floor(charge_cents / 2)
```

Escolha B se você quer que o número do clube seja previsível ("você recebe $60 por jogador, ponto"). É a história melhor para vendas.

## Responsabilidade pela fee

O Stripe deixa você decidir quem paga a fee de processamento. Default é a connected account. Para passar para a plataforma:

```ts
payment_intent_data: {
  transfer_data: { destination: connectedAccount.stripeId },
  on_behalf_of: connectedAccount.stripeId,
  application_fee_amount: PLATFORM_CUT_CENTS,
}
```

`on_behalf_of` faz a cobrança legalmente pertencer à connected account para fins fiscais/regulatórios, mas mantém o fluxo de dinheiro na sua plataforma. Com isso combinado com `application_fee_amount`, a fee sai do `application_fee_amount` da plataforma.

## Lendo o resultado

```ts
// Depois que o cliente paga, você recebe um evento checkout.session.completed.
const session = event.data.object as Stripe.Checkout.Session;

// O PaymentIntent tem a info de transfer.
const pi = await stripe.paymentIntents.retrieve(session.payment_intent as string);

// A transferência real é alcançável pelo latest_charge.
const charge = await stripe.charges.retrieve(pi.latest_charge as string);
console.log({
  amount: charge.amount, // total cobrado
  app_fee: charge.application_fee_amount, // seu corte
  transfer: charge.transfer_data?.destination, // connected account
  net_to_connected: charge.amount - (charge.application_fee_amount ?? 0)
    - (charge.balance_transaction
      // Fee de processamento do Stripe — busque a balance_transaction para o número exato
      ? 0 : 0),
});
```

Na prática, pegue a fee exata da balance transaction:

```ts
const bt = await stripe.balanceTransactions.retrieve(charge.balance_transaction as string);
// bt.fee = total da fee do Stripe em centavos
// bt.net = valor que caiu no saldo da plataforma
```

## Registrando do seu lado

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
  stripe_fee_cents       integer,            -- buscado da balance_transaction
  currency               text default 'cad',
  created_at             timestamptz default now()
);
```

Faça backfill de `stripe_fee_cents` a partir de um segundo webhook (`charge.updated` quando a `balance_transaction` resolve) ou retornando inline se você aguenta uma chamada de API síncrona no webhook handler.
