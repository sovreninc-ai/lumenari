# Stripe Connect: onboarding de conta

Duas opções reais: Express e Standard. (Custom existe; você não quer, a menos que tenha um time de compliance.)

## Express — o default certo

Você é dono da relação com o cliente e da marca. A connected account usa um dashboard Stripe enxuto para payouts e documentos fiscais.

**Prós**
- Onboarding é um form hospedado de 5 minutos
- Você controla branding, UX, lidar com disputas
- Menor carga de compliance na connected account
- Connected accounts podem ser pessoas físicas ou pequenas empresas

**Contras**
- A connected account não consegue customizar totalmente a experiência Stripe
- Algumas features avançadas (receita recorrente no nível da connected) precisam de config adicional

Use Express quando: sua plataforma é dona do cliente, você cuida do suporte, a connected account é o "fornecedor".

## Standard — quando a connected account é o merchant

A connected account tem um dashboard Stripe completo. Ela lida com as próprias disputas, com o próprio setup fiscal. Você é mais uma fonte de indicação do que uma plataforma de verdade.

**Prós**
- Connected account tem acesso completo ao Stripe
- Menos responsabilidade da plataforma

**Contras**
- Cliente vê o branding da connected account nos recibos
- Disputas vão para a connected account — sua plataforma tem menos visibilidade
- Onboarding é mais longo (signup real no Stripe)

Use Standard quando: a connected account já opera o próprio negócio e você só está habilitando ela a receber pagamentos pela sua plataforma.

## Indo de criar conta até a primeira cobrança

```ts
// 1. Cria a connected account
const account = await stripe.accounts.create({
  type: "express",
  country: "CA",
  email: org.contactEmail,
  capabilities: {
    card_payments: { requested: true },
    transfers: { requested: true },
  },
  business_type: org.businessType, // 'individual' | 'company'
  metadata: { organization_id: org.id },
});

// 2. Persiste o ID da conta junto à org
await db.from("organizations")
  .update({ stripe_account_id: account.id })
  .eq("id", org.id);

// 3. Gera um link de onboarding
const link = await stripe.accountLinks.create({
  account: account.id,
  refresh_url: `${SITE}/settings/payouts?refresh=1`,
  return_url: `${SITE}/settings/payouts?done=1`,
  type: "account_onboarding",
});

// 4. Redireciona o usuário. Ele volta para /settings/payouts.
return redirect(link.url);
```

## Verificando que a conta está mesmo pronta

Escute o webhook `account.updated`. A prontidão para cobrar tem duas flags:

```ts
const ready =
  account.charges_enabled === true && account.payouts_enabled === true;
```

Os dois precisam ser true. `charges_enabled` sem `payouts_enabled` significa que o Stripe aceita pagamentos mas não consegue pagar — o que normalmente significa que a connected account não terminou a verificação bancária.

Trave sua UI em `ready`. Não deixe uma org começar a cobrar se o Stripe não está pronto para pagá-la.

## Imposto e legal

- **A plataforma** geralmente é responsável por coletar sales tax se é dona da relação com o cliente (Express).
- **A connected account** é responsável se ela é dona da relação (Standard).
- **Coleta de W-9 / W-8 / T1** é feita pelo Stripe durante o onboarding para connected accounts US/Canadenses.
- **Emissão de 1099-K (US) / T4A (Canada)** é tratada pelo Stripe — você não emite manualmente para suas connected accounts.

Se sua plataforma está fazendo > USD $20K e > 200 transações por connected account por ano (threshold US 1099-K), o Stripe cuida do formulário. Verifique se o endereço no cadastro está correto antes do fim do ano.
