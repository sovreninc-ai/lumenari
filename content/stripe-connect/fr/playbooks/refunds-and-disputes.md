# Playbook remboursements et disputes

Quand l'argent a déjà bougé, les choses se compliquent. Voici l'arbre de décision.

## Les quatre situations courantes

### 1. Le client demande un remboursement total, pas de dispute

Remboursement initié par l'opérateur. Cas facile.

```ts
const refund = await stripe.refunds.create({
  payment_intent: pi.id,
  refund_application_fee: true, // rembourser aussi la part de la plateforme
  reverse_transfer: true,        // ramener l'argent du compte connecté
});
```

Si `reverse_transfer: true` et que le compte connecté n'a pas le solde suffisant, Stripe crée un débit et le compte connecté se retrouve avec un solde négatif jusqu'à son prochain cycle de payout.

Faites-le remonter dans votre UI admin : « Ce remboursement va prélever X $ sur le prochain payout de [Org]. »

### 2. Le client demande un remboursement partiel

Même code, avec `amount` :

```ts
const refund = await stripe.refunds.create({
  payment_intent: pi.id,
  amount: 5000, // 50 $ en centimes
  refund_application_fee: true,
  reverse_transfer: true,
});
```

Stripe rembourse proportionnellement la frais plateforme. Si le split d'origine était 50/50 (60 $/60 $ sur 120 $) et que le client récupère 50 $, le remboursement de la frais plateforme est de 25 $ et l'inversion du transfert du compte connecté est de 25 $.

Si vous voulez un split différent (p. ex. la plateforme absorbe tout le remboursement), mettez `refund_application_fee: false` et inversez manuellement :

```ts
await stripe.refunds.create({ payment_intent: pi.id, amount: 5000 });
// Pas de reverse_transfer, pas de refund_application_fee — la plateforme absorbe.
```

### 3. Le client lance un chargeback auprès de sa banque

C'est un dispute, pas un remboursement. Cycle de vie différent.

La banque du client retire l'argent de Stripe. Stripe le retire de votre plateforme. Vous recevez un webhook `charge.dispute.created`. Vous avez environ 7-14 jours pour soumettre les preuves.

```ts
async function handleDispute(d: Stripe.Dispute) {
  // 1. Notifier l'opérateur (vous) — ça demande une attention humaine.
  await sendDisputeAlert(d);

  // 2. Marquer l'achat comme disputé dans votre DB.
  await db.from("purchases")
    .update({ disputed_at: new Date().toISOString(), dispute_reason: d.reason })
    .eq("stripe_payment_intent", d.payment_intent);

  // 3. Si le compte connecté doit être au courant, notifiez-le aussi.
  await notifyConnectedAccount(d);
}
```

Quand vous soumettez les preuves, faites-le via le dashboard pour les premiers cas — le formulaire web de Stripe est plus guidé que l'API. Une fois que vous avez un processus, automatisez via `stripe.disputes.update`.

Si vous gagnez le dispute, l'argent revient. Si vous perdez, le chargeback tient et le compte connecté peut aussi perdre sa part.

### 4. Remboursement APRÈS que le payout a déjà eu lieu

Même code que les cas 1 ou 2. Stripe gère la compta. Le compte connecté se retrouve avec un solde négatif sur son ledger Stripe jusqu'à sa prochaine charge ou jusqu'à un top-up par virement bancaire.

Opérationnellement, c'est là que le service client se trompe le plus souvent. Construisez un interstitial « êtes-vous sûr ? » dans votre UI admin qui dit : « Ceci va prélever X $ sur le compte de [Org], qui a actuellement un solde de Y $. Ils seront en position de solde négatif jusqu'à leur prochain payout. »

## Edge cases

### Transaction disputée, déjà partiellement remboursée

Si vous avez déjà remboursé 50 $ d'une transaction de 120 $ et que le client conteste les 70 $ restants, Stripe dispute la charge originale entière (120 $) moins les 50 $ remboursés = 70 $ en jeu. Votre dossier de preuves doit mentionner le remboursement partiel.

### Le compte connecté quitte la plateforme en plein dispute

Deux cas :

1. **Compte en règle, départ simple :** Les disputes contre ses charges continuent d'aller à votre plateforme. Réglez, puis clôturez son compte.
2. **Compte suspendu pour fraude ou violation :** Stripe peut retenir son solde pour couvrir les disputes anticipées pendant 90 jours. Le compte connecté n'obtient pas son payout final tant que cette période n'est pas écoulée.

Documentez le flow d'offboarding avec le compte connecté avant même d'en offboarder un en production.

### Décalage de devises sur le remboursement

Si vous avez encaissé en CAD et que le compte connecté détient des payouts en USD, Stripe convertit et facture des frais FX. La plateforme absorbe en général (UX plus propre). Assurez-vous que votre calcul de montant de remboursement tient compte de la petite perte FX si vous essayez de rendre exactement le client entier.

## Ce qu'il faut faire remonter dans votre UI admin

Pour chaque transaction :

- Montant et date de la charge d'origine
- Frais plateforme, part du compte connecté, frais Stripe
- Tous remboursements (date, montant, qui a initié)
- Tous disputes (statut, deadline pour les preuves, issue)
- Bouton « Rembourser » avec une confirmation qui montre l'impact en dollars sur chaque partie

Si vous ne pouvez pas répondre à « qu'est-il arrivé à cette transaction » en moins de 30 secondes, votre UI admin n'est pas finie.
