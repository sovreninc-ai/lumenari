# Stripe Connect Implementation Pack

> Les docs Stripe couvrent le happy path. Ce kit couvre tout ce qui vient après : webhooks en échec, remboursements partiels, chargebacks pendant un payout, changements contractuels en plein milieu de saison.

**Optimisé pour :** Claude · Claude Code.

---

## Mode opératoire

Vous câblez Stripe Connect dans une plateforme qui répartit les paiements entre un opérateur de marketplace et un ou plusieurs comptes connectés (clubs, créateurs, prestataires). Hypothèses par défaut :

- **Express accounts** pour les vendeurs connectés sauf s'ils ont besoin de brander leur propre dashboard (rare)
- **Destination charges avec `application_fee_amount`** pour des splits two-party propres
- **Webhook handler idempotent** indexé par `event.id`
- **L'argent en centimes.** La devise est explicite. CAD par défaut.
- **Webhook secret figé par environnement.** Ne partagez jamais le secret prod avec staging.

Demandez toujours : « Qui possède la relation client ? » — c'est ce qui décide entre destination charges (vous) ou separate charges (le compte connecté).

---

## Le modèle mental

```
[ Client ] ──paie──> [ Compte Stripe plateforme ] ──split──> [ Compte connecté ]
                                  │
                                  ├── garde application_fee_amount
                                  └── transfère le reste au compte connecté
```

C'est presque toujours ce que vous voulez. Le client voit votre marque. Vous gérez les disputes. Le compte connecté est juste payé.

À éviter : separate charges (où le client paie le compte connecté directement). Ce modèle met le dispute sur le compte connecté et complique les remboursements.

---

## Onboarding d'un compte

```ts
// Server action : lancer l'onboarding Express
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

  // Stocker account.id sur la ligne de votre org.
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

Au retour, écoutez les webhooks `account.updated` et gatez l'UI derrière `account.charges_enabled` ET `account.payouts_enabled`.

---

## Prendre un paiement avec un split

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

Le compte connecté ne voit jamais la carte du client. Le transfert se déclenche automatiquement quand la charge est validée.

---

## Webhooks — la règle d'idempotence

Stripe livrera chaque événement au moins une fois. Votre handler doit pouvoir s'exécuter deux fois sans dommage.

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

  // 1. Vérifier si on a déjà traité cet événement.
  const db = supabaseService();
  const { data: existing } = await db
    .from("processed_events")
    .select("id")
    .eq("id", event.id)
    .maybeSingle();

  if (existing) {
    return Response.json({ received: true, idempotent: true });
  }

  // 2. Le traiter.
  try {
    await handle(event);
  } catch (err) {
    // Ne PAS marquer comme traité. Stripe va retenter.
    console.error("[stripe] handler error:", err);
    return new Response("Handler error", { status: 500 });
  }

  // 3. Enregistrer qu'on l'a traité. C'est le verrou d'idempotence.
  await db.from("processed_events").insert({ id: event.id, type: event.type });

  return Response.json({ received: true });
}
```

La table `processed_events` est juste `(id text primary key, type text, processed_at timestamptz default now())`.

---

## Arbre de décision remboursement + dispute

Un remboursement se répartit entre deux parties : le `application_fee_amount` de votre plateforme et le `transfer_data.amount` du compte connecté. Stripe rembourse proportionnellement les deux par défaut.

| Situation | Quoi faire |
| --- | --- |
| Remboursement total, accord mutuel | `stripe.refunds.create({ payment_intent, refund_application_fee: true, reverse_transfer: true })` |
| Remboursement partiel, accord mutuel | Idem, avec un `amount` explicite. Mettez `reverse_transfer: true` pour que le compte connecté soit débité proportionnellement. |
| Dispute (chargeback) ouvert | Soumettez les preuves. Les frais sont en général remboursés automatiquement. Suivez l'issue via l'événement `charge.dispute.closed`. |
| Remboursement APRÈS que le payout a déjà eu lieu | Même code — Stripe inverse depuis le PROCHAIN payout du compte connecté (crée un solde négatif si nécessaire). |
| Le compte connecté n'a pas le solde suffisant pour l'inversion | Stripe crée un débit. Le propriétaire du compte connecté doit recharger ou attendre. Faites-le remonter dans votre UI. |

---

## Edge cases que vous croiserez inévitablement

### 1. Départ en cours de contrat

Un compte connecté arrête de travailler avec vous. Des clients existants ont des abonnements en cours. Ne désactivez pas immédiatement le compte — pausez les nouvelles charges, terminez la période, puis transférez la relation client.

### 2. Conversion de devises

Le client paie en USD, le compte connecté veut des payouts en CAD. Stripe gère le FX automatiquement mais facture des frais. Décidez qui les supporte (en général la plateforme) et documentez-le.

### 3. Gestion des lignes de taxes

Si vos comptes connectés collectent la TVA / taxe de vente, utilisez `automatic_tax: { enabled: true }` et `tax_code` sur chaque price. Stripe Tax remonte ensuite les collectes par juridiction.

### 4. Le webhook arrivé en retard

Un `payment_intent.succeeded` arrive 6 heures après l'expédition de la commande. Votre check d'idempotence couvre ça — mais assurez-vous que le handler reste safe même si l'état en aval a déjà évolué.

---

## Documents compagnons

- `patterns/account-onboarding.md` — Express vs Standard, avec les tradeoffs légaux/fiscaux
- `patterns/destination-charges.md` — walkthrough de code complet avec maths du revenue-share
- `patterns/webhook-idempotency.md` — la table `processed_events` + patterns alternatifs
- `playbooks/refunds-and-disputes.md` — arbre de décision opérateur
