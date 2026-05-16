# Playbook de refunds e disputes

Quando o dinheiro já se moveu, a coisa fica complicada. Aqui está a árvore de decisão.

## As quatro situações comuns

### 1. Cliente pede refund total, sem dispute

Refund iniciado pelo operador. Caso fácil.

```ts
const refund = await stripe.refunds.create({
  payment_intent: pi.id,
  refund_application_fee: true, // devolve também o corte da plataforma
  reverse_transfer: true,        // puxa o dinheiro de volta da connected account
});
```

Se `reverse_transfer: true` e a connected account não tem saldo suficiente, o Stripe cria um débito e a connected account fica com saldo negativo até o próximo ciclo de payout.

Mostre isso na sua admin UI: "Este refund vai puxar $X do próximo payout de [Org]."

### 2. Cliente pede refund parcial

Mesmo código, com `amount`:

```ts
const refund = await stripe.refunds.create({
  payment_intent: pi.id,
  amount: 5000, // $50 em centavos
  refund_application_fee: true,
  reverse_transfer: true,
});
```

O Stripe refunda a fee da plataforma proporcionalmente. Se o split original era 50/50 ($60/$60 em $120) e o cliente recebe $50 de volta, o refund da fee da plataforma é $25 e o reverse do transfer da connected account é $25.

Se você quer um split diferente (ex.: a plataforma absorve o refund inteiro), set `refund_application_fee: false` e reverse manual:

```ts
await stripe.refunds.create({ payment_intent: pi.id, amount: 5000 });
// Sem reverse_transfer, sem refund_application_fee — plataforma absorve.
```

### 3. Cliente abre chargeback com o banco

Isso é dispute, não refund. Ciclo de vida diferente.

O banco do cliente puxa o dinheiro de volta do Stripe. O Stripe puxa da sua plataforma. Você recebe um webhook `charge.dispute.created`. Você tem ~7-14 dias para enviar evidência.

```ts
async function handleDispute(d: Stripe.Dispute) {
  // 1. Notifica o operador (você) — isso precisa de atenção humana.
  await sendDisputeAlert(d);

  // 2. Marca a compra como disputada no seu DB.
  await db.from("purchases")
    .update({ disputed_at: new Date().toISOString(), dispute_reason: d.reason })
    .eq("stripe_payment_intent", d.payment_intent);

  // 3. Se a connected account precisa saber, notifica ela também.
  await notifyConnectedAccount(d);
}
```

Quando enviar a evidência, faça pelo dashboard nas primeiras vezes — o form web do Stripe é mais guiado que a API. Quando você tiver um processo, automatize via `stripe.disputes.update`.

Se você vencer a dispute, o dinheiro volta. Se perder, o chargeback fica e a connected account também pode perder a parte dela.

### 4. Refund DEPOIS do payout já ter saído

Mesmo código dos casos 1 ou 2. O Stripe cuida da contabilidade. A connected account fica com saldo negativo no ledger do Stripe até a próxima cobrança ou até colocar fundos via transferência bancária.

Operacionalmente, esse é o lugar onde o customer service erra mais. Construa um interstitial "tem certeza?" na sua admin UI que diz: "Isso vai puxar $X da conta de [Org], que atualmente tem saldo de $Y. Ela vai ficar em saldo negativo até o próximo payout."

## Edge cases

### Transação disputada, já parcialmente refundada

Se você já refundou $50 de uma transação de $120 e o cliente disputa os $70 restantes, o Stripe disputa o valor original total ($120) menos o $50 refundado = $70 em escopo. Sua evidência deve mencionar o refund parcial.

### Connected account sai da plataforma no meio de uma dispute

Dois casos:

1. **Conta em bom estado, só saindo:** disputes contra as cobranças dela ainda vão para a sua plataforma. Resolva, depois feche a conta.
2. **Conta suspensa por fraude ou violação:** o Stripe pode reter o saldo dela para cobrir disputes esperadas por 90 dias. A connected account não recebe o payout final até esse período expirar.

Documente o fluxo de offboarding com a connected account antes mesmo de fazer um em produção.

### Mismatch de moeda no refund

Se você cobrou em CAD e a connected account guarda payouts em USD, o Stripe converte e cobra uma FX fee. A plataforma normalmente absorve (UX mais limpa). Garanta que o cálculo do valor do refund considere a pequena perda de FX se você está tentando deixar o cliente inteiro exatamente.

## O que mostrar na sua admin UI

Para cada transação:

- Valor da cobrança original e data
- Fee da plataforma, parte da connected account, fee do Stripe
- Qualquer refund (data, valor, quem iniciou)
- Qualquer dispute (status, deadline da evidência, resultado)
- Botão "Refundar isso" com uma confirmação que mostra o impacto em dólares em cada parte

Se você não consegue responder "o que aconteceu com essa transação" em menos de 30 segundos, sua admin UI não está pronta.
