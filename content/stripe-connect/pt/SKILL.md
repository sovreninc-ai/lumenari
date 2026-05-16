# Pacote de Implementação do Stripe Connect

> Os docs do Stripe cobrem o happy path. Este kit cobre tudo o que vem depois: webhooks falhando, refunds parciais, chargebacks durante um payout, mudanças de contrato no meio da temporada.

**Otimizado para:** Claude, Claude Code.

---

## Modo de operação

Você está conectando o Stripe Connect a uma plataforma que divide pagamentos entre um operador de marketplace e uma ou mais connected accounts (clubes, creators, contratados). Pressupostos padrão:

- **Express accounts** para sellers conectados, a menos que precisem brandar o próprio dashboard (raro)
- **Destination charges com `application_fee_amount`** para splits limpos entre duas partes
- **Webhook handler idempotente** com chave em `event.id`
- **Dinheiro em centavos.** Moeda é explícita. Default CAD.
- **Webhook secret fixado por ambiente.** Nunca compartilhe o secret de prod com staging.

Sempre pergunte: "Quem é dono da relação com o cliente?" — isso decide se você usa destination charges (você é dono) ou separate charges (a connected account é dona).

---

## O modelo mental

```
[ Cliente ] ──paga──> [ Sua conta Stripe da plataforma ] ──split──> [ Connected account ]
                                  │
                                  ├── fica com application_fee_amount
                                  └── transfere o resto para a connected account
```

Isso é o que você quase sempre quer. O cliente vê sua marca. Você lida com disputas. A connected account só recebe.

Evite: separate charges (em que o cliente paga direto a connected account). Esse modelo coloca a disputa na connected account e complica refunds.

---

## Onboarding de conta

```ts
// Server action: dispara o onboarding Express
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

  // Persista account.id na linha da sua org.
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

No retorno, escute webhooks `account.updated` e libere a UI somente atrás de `account.charges_enabled` E `account.payouts_enabled`.

---

## Cobrando um pagamento com split

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

A connected account nunca vê o cartão do cliente. A transferência acontece automaticamente quando a charge libera.

---

## Webhooks — a regra de idempotência

O Stripe vai entregar todo evento pelo menos uma vez. Seu handler precisa ser seguro para rodar duas vezes.

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

  // 1. Verifica se já processamos esse evento.
  const db = supabaseService();
  const { data: existing } = await db
    .from("processed_events")
    .select("id")
    .eq("id", event.id)
    .maybeSingle();

  if (existing) {
    return Response.json({ received: true, idempotent: true });
  }

  // 2. Processa.
  try {
    await handle(event);
  } catch (err) {
    // NÃO marque como processado. O Stripe vai retentar.
    console.error("[stripe] handler error:", err);
    return new Response("Handler error", { status: 500 });
  }

  // 3. Registra que processamos. Esse é o lock de idempotência.
  await db.from("processed_events").insert({ id: event.id, type: event.type });

  return Response.json({ received: true });
}
```

A tabela `processed_events` é só `(id text primary key, type text, processed_at timestamptz default now())`.

---

## Árvore de decisão de refund + dispute

Um refund se divide entre duas partes: o `application_fee_amount` da sua plataforma e o `transfer_data.amount` da connected account. O Stripe default refunda os dois proporcionalmente.

| Situação | O que fazer |
| --- | --- |
| Refund total, acordo mútuo | `stripe.refunds.create({ payment_intent, refund_application_fee: true, reverse_transfer: true })` |
| Refund parcial, acordo mútuo | Mesma coisa, mas com `amount` explícito. Setar `reverse_transfer: true` para a connected account ser debitada proporcionalmente. |
| Disputa (chargeback) aberta | Submeta a evidência. A fee normalmente é refundada automaticamente. Acompanhe o resultado via evento `charge.dispute.closed`. |
| Refund DEPOIS do payout já ter saído | Mesmo código — o Stripe reverte do PRÓXIMO payout da connected account (gera saldo negativo se necessário). |
| Connected account com saldo insuficiente para reverter | O Stripe gera um débito. O dono da connected account precisa colocar saldo ou esperar. Mostre isso na sua UI. |

---

## Edge cases que você vai encontrar

### 1. Saída no meio do contrato

Uma connected account para de trabalhar com você. Clientes existentes têm assinaturas em andamento. Não desabilite a conta imediatamente — pause novas cobranças, finalize o período, depois transfira a relação com o cliente.

### 2. Conversão de moeda

Cliente paga em USD, connected account quer payouts em CAD. O Stripe lida com FX automaticamente mas cobra fee. Decida quem absorve (normalmente a plataforma) e documente.

### 3. Tratamento de linha de imposto

Se suas connected accounts coletam sales-tax, use `automatic_tax: { enabled: true }` e `tax_code` em cada price. Aí o Stripe Tax reporta a coleta por jurisdição.

### 4. O webhook que chegou atrasado

Um `payment_intent.succeeded` chega 6 horas depois do pedido ter sido enviado. Seu check de idempotência cobre — mas garanta que o handler é seguro mesmo se o estado downstream já tiver evoluído.

---

## Docs complementares

- `patterns/account-onboarding.md` — Express vs. Standard com os tradeoffs legais/tributários
- `patterns/destination-charges.md` — walkthrough completo de código com a matemática de revenue-share
- `patterns/webhook-idempotency.md` — a tabela `processed_events` + padrões alternativos
- `playbooks/refunds-and-disputes.md` — árvore de decisão voltada ao operador
