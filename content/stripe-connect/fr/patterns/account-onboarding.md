# Stripe Connect : onboarding de comptes

Deux vraies options : Express et Standard. (Custom existe ; vous n'en voulez pas, sauf si vous avez une équipe compliance.)

## Express — le bon choix par défaut

Vous possédez la relation client et la marque. Le compte connecté utilise un dashboard Stripe allégé pour les payouts et les documents fiscaux.

**Pour**
- L'onboarding est un formulaire hébergé qui prend 5 minutes
- Vous contrôlez le branding, l'UX, la gestion des disputes
- Charge de compliance plus faible sur le compte connecté
- Les comptes connectés peuvent être des particuliers ou des petites entreprises

**Contre**
- Le compte connecté ne peut pas pleinement customiser son expérience Stripe
- Certaines fonctionnalités avancées (revenus récurrents au niveau connecté) nécessitent une config supplémentaire

Utilisez Express quand : votre plateforme possède le client, vous gérez le support, le compte connecté est le « fournisseur ».

## Standard — quand le compte connecté est le marchand

Le compte connecté a un dashboard Stripe complet. Il gère ses propres disputes, sa propre configuration fiscale. Vous êtes plus une source de référencement qu'une vraie plateforme.

**Pour**
- Le compte connecté a un accès Stripe complet
- Responsabilité plateforme plus faible

**Contre**
- Le client voit le branding du compte connecté dans les reçus
- Les disputes vont au compte connecté — votre plateforme a moins de visibilité
- L'onboarding est plus long (vraie inscription Stripe)

Utilisez Standard quand : le compte connecté opère déjà son propre business et vous lui permettez juste de prendre des paiements via votre plateforme.

## De la création de compte au premier paiement

```ts
// 1. Créer le compte connecté
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

// 2. Persister l'ID du compte sur l'org
await db.from("organizations")
  .update({ stripe_account_id: account.id })
  .eq("id", org.id);

// 3. Générer un lien d'onboarding
const link = await stripe.accountLinks.create({
  account: account.id,
  refresh_url: `${SITE}/settings/payouts?refresh=1`,
  return_url: `${SITE}/settings/payouts?done=1`,
  type: "account_onboarding",
});

// 4. Rediriger l'utilisateur. Il revient sur /settings/payouts.
return redirect(link.url);
```

## Vérifier que le compte est vraiment prêt

Écoutez le webhook `account.updated`. La préparation aux charges a deux flags :

```ts
const ready =
  account.charges_enabled === true && account.payouts_enabled === true;
```

Les deux doivent être à true. `charges_enabled` sans `payouts_enabled` signifie que Stripe acceptera des paiements mais ne peut pas payer — ce qui veut généralement dire que le compte connecté n'a pas terminé la vérification bancaire.

Gatez votre UI sur `ready`. Ne laissez pas une org commencer à encaisser si Stripe n'est pas prêt à les payer.

## Taxes et juridique

- **La plateforme** est généralement responsable de la collecte de la taxe de vente si elle possède la relation client (Express).
- **Le compte connecté** est responsable s'il possède la relation client (Standard).
- **Collecte des W-9 / W-8 / T1** : faite par Stripe pendant l'onboarding pour les comptes connectés US/canadiens.
- **Émission des 1099-K (US) / T4A (Canada)** : gérée par Stripe — vous n'émettez pas manuellement ces documents pour vos comptes connectés.

Si votre plateforme dépasse 20 000 $ et 200 transactions par compte connecté par an (seuil US du 1099-K), Stripe s'occupe du formulaire. Vérifiez que l'adresse au dossier est correcte avant la fin d'année.
