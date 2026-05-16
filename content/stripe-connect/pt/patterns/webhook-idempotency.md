# Idempotência de webhook

O Stripe vai entregar cada evento pelo menos uma vez. Às vezes mais. Seu handler precisa ser seguro para rodar duas vezes.

## A tabela `processed_events`

```sql
create table public.processed_events (
  id            text primary key,           -- event.id do Stripe
  type          text not null,              -- ex.: 'checkout.session.completed'
  processed_at  timestamptz not null default now()
);

-- Apenas service role — webhooks são server-only.
alter table public.processed_events enable row level security;
```

## O formato do handler

```ts
export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("No signature", { status: 400 });

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response(`Webhook error: ${(err as Error).message}`, {
      status: 400,
    });
  }

  const db = supabaseService();

  // 1. Check de idempotência — já processamos esse evento?
  const { data: seen } = await db
    .from("processed_events")
    .select("id")
    .eq("id", event.id)
    .maybeSingle();

  if (seen) {
    return Response.json({ received: true, idempotent: true });
  }

  // 2. Trata.
  try {
    await dispatch(event);
  } catch (err) {
    console.error("[stripe webhook] error processing", event.id, err);
    return new Response("Handler error", { status: 500 });
  }

  // 3. Registra. SÓ depois do sucesso — o Stripe retenta se a gente der 5xx.
  await db
    .from("processed_events")
    .insert({ id: event.id, type: event.type });

  return Response.json({ received: true });
}
```

## Alternativa: idempotência por chave de negócio

Às vezes a chave natural de idempotência está nos dados de negócio — ex.: `stripe_session_id` é unique na sua tabela `purchases`.

```ts
async function handleCheckoutCompleted(s: Stripe.Checkout.Session) {
  const { error } = await db
    .from("purchases")
    .insert({
      stripe_session_id: s.id,         // constraint UNIQUE pega duplicatas
      buyer_email: s.customer_details!.email,
      amount_cents: s.amount_total!,
    });

  if (error) {
    // 23505 = violação de unique. Isso não é erro no nosso modelo.
    if ((error as { code?: string }).code === "23505") return;
    throw error;
  }

  // Side effects (e-mail, log entry) — esses precisam da própria disciplina
  // de idempotência se não forem transacionais com o insert.
  await sendReceipt(s);
}
```

Os dois padrões funcionam. `processed_events` é mais simples quando um evento dispara várias escritas. Idempotência por chave de negócio é mais simples quando há exatamente uma escrita.

## O que "retry" significa

O Stripe retenta com exponential backoff por 3 dias. Depois disso, o evento fica na aba de webhook do seu Stripe Dashboard marcado como failed. Você pode replay manual.

As implicações:
- Seu handler vai ser chamado de novo se você der 5xx. Não dê 5xx para "esse evento não me interessa".
- Retorne 200 + `{ received: true, ignored: true }` para eventos que você não quer processar — essa é a forma educada de reconhecer.
- Um 5xx persistente é motivo de alert. Conecte `processed_events` + uma query "eventos que falharam N vezes" ao seu dashboard de ops.

## Testando

```ts
// Vitest / Bun:test
import { vi } from "vitest";

test("checkout.session.completed is idempotent", async () => {
  const event = makeCheckoutEvent({ id: "evt_test_1" });
  const req = makeWebhookReq(event);

  const r1 = await POST(req);
  const r2 = await POST(req);

  expect(r1.status).toBe(200);
  expect(r2.status).toBe(200);

  const { count } = await db.from("purchases")
    .select("*", { count: "exact", head: true })
    .eq("stripe_session_id", event.data.object.id);

  expect(count).toBe(1);
});
```

Se você pular esse teste, vai descobrir as cobranças duplas por um e-mail do cliente. Essa é a forma errada de aprender.

## De onde vêm os webhooks em dev

```bash
# Localmente, encaminha webhooks do Stripe para seu dev server:
stripe listen --forward-to localhost:3000/api/stripe/webhook
# O CLI mostra um webhook secret temporário — esse é o que STRIPE_WEBHOOK_SECRET
# deve ser no seu .env.local
```

Em preview da Vercel e produção, configure o webhook endpoint no dashboard do Stripe e fixe o secret por ambiente via variáveis de ambiente da Vercel.
