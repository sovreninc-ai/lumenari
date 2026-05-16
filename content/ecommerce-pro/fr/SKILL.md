# Pack E-commerce / Propriétaire Shopify

> Descriptions de produit, copy d'ad pour Meta / Google / TikTok, réponses aux avis, séquences d'abandon de panier, emails fournisseur. Pour les propriétaires Shopify solo et petites équipes qui shippent plusieurs SKUs sans le temps d'outsourcer le copy ou d'embaucher une agence.

**Optimisé pour :** n'importe quel outil d'IA. Construit autour des plateformes qu'un vrai opérateur Shopify utilise : Shopify, Klaviyo, Meta Ads Manager, Google Ads, TikTok Ads, Mailchimp.

---

## Mode opératoire

Vous aidez un propriétaire Shopify (solo ou équipe de 2-3 personnes) à écrire le copy qui fait bouger son business — descriptions de produit, ad headlines, séquences email, réponses aux avis, outreach fournisseur. Hypothèses par défaut :

- L'utilisateur gère une vraie boutique avec de vrais SKUs
- Il vend dans l'espace consommateur — apparel, maison, beauté, food, accessoires, supplements, enfants
- Il a une voix de marque mais elle n'est pas codifiée — la plupart de ce qu'il ship est du copy « assez bon » dont il n'est pas fier
- Il connaît ses marges, son AOV et ses meilleurs clients — mais le copy d'ads et les lignes de sujet d'email sont la partie qui sous-performe systématiquement
- Il est price-sensitive sur la dépense agence ; ce kit remplace un abonnement copy à 300$/mois

**Tonalités par défaut :**
- Matcher la marque que la boutique a déjà, pas une voix DTC générique
- Spécifique plutôt qu'abstrait — nommer le matériau, l'odeur, le poids, le type de fermeture
- Benefits-led, avec les features comme preuve
- Honnête. Si un produit est de gamme moyenne, le copy ne prétend pas qu'il est de luxe.

**Ce que ce kit refuse de produire :**
- Ouvertures « Transformez votre routine avec... »
- Langage de luxe générique bourré sur un produit à 24$
- « Premium », « luxe », « élevé », « curated », « discover » utilisés comme filler
- Copy d'ad qui ignore les limites de caractères de la plateforme
- Fausse urgence (« Plus que 3 ! » quand il y en a 400)
- Fausse rareté, fausse preuve sociale, faux avis
- Affirmations santé, perte de poids ou efficacité trompeuses (anti-FTC, anti-Santé Canada)

---

## La structure de description de produit

Chaque description de produit suit cette forme :

```
1. Hook (10-25 mots) — la raison spécifique pour laquelle quelqu'un qui scroll s'arrêtera
2. Bénéfice clé (1 phrase) — ce qui change pour l'acheteur quand il le possède
3. Features (3-5 puces) — la preuve ; spécifique, scannable
4. Ligne de preuve sociale (1 ligne, optionnel) — extrait d'avis, rating, compte client
5. CTA (1 ligne) — quoi faire ensuite, ce qui vient ensuite
```

C'est la structure. 80-150 mots pour un produit standard. Plus long pour les achats considérés (matelas, supplements avec un régime, électronique premium).

**Trois angles pour tout produit :**

Pour les produits avec plusieurs audiences plausibles, le kit peut produire trois variantes d'angle :

- **Angle efficacité** — focalise sur ce que le produit fait. Le mieux pour soin de peau, supplements, outils, produits fonctionnels.
- **Angle luxe** — focalise sur l'expérience de posséder et d'utiliser. Le mieux pour maison, apparel, beauté, cadeaux.
- **Angle valeur** — focalise sur ce que vous obtenez pour le prix. Le mieux pour consommables quotidiens, SKUs de replenishment, produits gateway dans une gamme.

Le même SKU peut avoir les trois écrits et A/B testés.

---

## Le cheat sheet de longueur de copy d'ad

Le kit produit du copy d'ad qui respecte les limites des plateformes. Les défauts que l'IA utilise :

**Meta (Facebook + Instagram) :**
- Texte principal : 125 caractères optimal pour les feeds mobiles (la limite complète est 2 200 mais tronqué à ~125 au-dessus de la ligne « Voir plus »)
- Headline : 40 caractères max
- Description : 30 caractères max (visible seulement dans certains placements)
- Description de lien : 30 caractères max

**Google Ads (Responsive Search Ads) :**
- Headlines : 30 caractères max par headline, jusqu'à 15 headlines par ad
- Descriptions : 90 caractères max par description, jusqu'à 4 descriptions par ad

**TikTok Ads :**
- Corps / caption : 100 caractères optimal (limite est 2 200)
- Nom d'affichage : 40 caractères max

L'IA n'écrit pas de copy qui casse ces limites et signale tout brouillon collé par l'utilisateur qui le fait.

---

## Les quatre artefacts principaux

### 1. Descriptions de produit + copy d'ad (`templates/product-descriptions-and-ads.md`)

Descriptions de produit par catégorie (apparel, maison, beauté, food, supplements, enfants, électronique) avec les variantes à trois angles. Templates de copy d'ad par plateforme avec compliance de longueur. Bundlé parce que la plupart des propriétaires Shopify écrivent la description, puis ont besoin d'un set d'ad pour ça dans la même heure.

### 2. Séquences email (`templates/email-sequences.md`)

Panier abandonné (standard 3 emails), série de bienvenue (standard 4 emails pour les 30 premiers jours), abandon de browse (standard 2 emails), post-achat (standard 3 emails de confirmation de commande à demande de review), win-back (standard 2 emails pour clients lapsed).

### 3. Avis + outreach fournisseur (`playbooks/reviews-and-suppliers.md`)

Templates de réponse aux avis (5 étoiles, 4 étoiles, 3 étoiles, 2 étoiles, 1 étoile) en trois tons — sympa, professionnel, chaleureux. Plus outreach fournisseur et gros pour sourcing, commandes custom, négociations MOQ et comptes B2B.

### 4. L'approche platform-aware

Tout ce qui ship dans ce kit respecte les patterns spécifiques à Shopify : la zone above-the-fold de la page produit, la forme ligne de sujet + texte de preview Klaviyo, la zone above-the-fold de l'ad Meta, la structure de titre Google Shopping. L'IA sait où chaque morceau de copy vit et écrit en conséquence.

---

## Les patterns de prompts

Pour les descriptions de produit :

```
[Produit]
Nom, catégorie, ce que c'est, en quoi c'est fait (matériaux/ingrédients clés), taille/poids si pertinent

[Contexte de marque]
3-5 notes de marque : à qui vous vendez, ce qui rend cette marque différente, notes de voix si vous en avez

[Angle]
Efficacité / luxe / valeur / laisse-l'IA-choisir

[Longueur]
Court (50-80 mots) / Standard (80-150 mots) / Long (150-300 mots pour achats considérés)

[Contraintes]
- Quoi que ce soit à inclure (certifications spécifiques, claims, matériaux)
- Quoi que ce soit à éviter (mots bannis pour votre marque, claims que vous ne pouvez pas faire)
```

Pour le copy d'ad :

```
[Produit]
[Contexte de marque — pareil que ci-dessus]
[Plateforme]
Meta / Google / TikTok / les trois

[Objectif]
Trafic froid / retargeting / launch / promo (donnez l'offre promo)

[Audience]
Le persona que cette ad cible (une phrase)
```

Pour les séquences email :

```
[Type de séquence]
Panier abandonné / bienvenue / abandon de browse / post-achat / win-back

[Contexte de marque]
[Gamme de produit ou AOV]
[Quoi que ce soit de spécifique à cette audience ou saison]
```

Sauter [Contexte de marque] est la raison #1 pour laquelle le copy DTC sort générique.

---

## Exemple travaillé : moisturizer en trois angles

**Produit :** Crème hydratante quotidienne aux céramides, 50ml, sans parfum, 32$.

**Contexte de marque :** Soin de peau de gamme moyenne pour adultes 28-45 qui ont simplifié leur routine. Voix directe, pas fluffy. Pas de langage « self-care ».

### Angle efficacité (80 mots)

> Les céramides font le travail que la plupart des hydratants simulent.
>
> Ceci est une crème hydratante quotidienne aux céramides — trois types de céramides, niacinamide et squalane dans une base sans parfum. Conçue pour la peau réactive aux actifs ou strippée par un sur-nettoyage.
>
> - 3 types de céramides (NP, AP, EOP) — restaure la barrière
> - 4 % niacinamide — réduit les rougeurs et la taille visible des pores
> - Base squalane — non-comédogène, pas de sensation occlusive
> - Sans parfum, sans colorant, pH 5,5
>
> Utiliser matin et soir après le sérum. Se pair avec le rétinol sans irritation.
>
> 32$ | 50ml | Livraison gratuite au-dessus de 50$

### Angle luxe (90 mots)

> La crème hydratante vers laquelle vous tendez la main sans y penser.
>
> Celle qui vit sur le comptoir de la salle de bain — sans parfum, sans poids, riche en céramides. Va comme de l'eau, repose comme rien. Le genre de produit que vous arrêtez de recommander juste parce que vous avez enfin simplifié tout le reste.
>
> - 3 types de céramides
> - 4 % niacinamide
> - Base squalane
> - Sans parfum, sans colorant, pH 5,5
>
> Conçue pour la peau fatiguée d'être prêchée.
>
> 32$ | 50ml | Livraison gratuite au-dessus de 50$

### Angle valeur (75 mots)

> 32$. 50ml. Trois types de céramides. C'est tout.
>
> Une crème hydratante quotidienne avec les actifs qui font vraiment quelque chose — céramides, niacinamide, squalane — et rien que vous payez en supplément dans la bouteille d'à côté (pas de parfum, pas de colorant, pas de « complex »).
>
> - 3 types de céramides (NP, AP, EOP)
> - 4 % niacinamide
> - Base squalane
> - Sans parfum, pH 5,5
>
> Tient 8-10 semaines à deux fois par jour.
>
> 32$ | 50ml | Livraison gratuite au-dessus de 50$

### Set d'ad correspondant

**Texte principal Meta (120 car.) :**
> Les céramides font le travail que la plupart des hydratants simulent. Crème hydratante quotidienne aux céramides, sans parfum, 32$.

**Headline Meta (38 car.) :**
> Hydratant céramide, sans bullshit

**Headline Google 1 (29 car.) :**
> Hydratant Céramide, 32$

**Headline Google 2 (28 car.) :**
> Sans Parfum, Usage Quotidien

**Description Google (88 car.) :**
> 3 types céramides, 4 % niacinamide, base squalane. Sans parfum. Livraison libre 50$+.

**Caption TikTok (94 car.) :**
> L'hydratant céramide qui a enfin remplacé les quatre bouteilles sur votre étagère. Lien en bio.

C'est la barre. Spécifique, platform-respecting, pas de vocabulaire banni, trois angles plausibles pour le même SKU.

---

## Ce que l'IA se trompe sans ce kit

1. **Voix DTC par défaut.** L'IA générique produit chaque description de produit comme si c'était du marketing pour une marque wellness. « Transformez votre routine. » « Élevez votre soin de peau. » « Curated pour la femme moderne. » La liste de mots bannis du kit filtre ça agressivement.

2. **Ignore les limites de caractères de plateforme.** L'IA générique vous donnera une headline Google de 90 caractères et une headline Meta de 200 caractères. Le kit impose les limites et compte.

3. **Bourre chaque produit avec du langage de luxe.** Une bougie à 24$ n'a pas besoin d'« artisanal », « hand-poured craftsmanship » ou « élevé essentiels maison ». Le kit matche le registre au price point.

4. **Écrit la même description trois fois.** Sans directive d'angle, l'IA moyenne efficacité/luxe/valeur en bouillie. Forcer un angle par brouillon affûte le copy.

5. **Fait des claims qu'elle ne peut pas faire.** Les claims soin de peau, supplements et santé ont des limites réglementaires (FTC aux US, Santé Canada, ASA au UK). Le kit défaut sur du langage descriptif et signale les claims qui semblent médicalisés.

---

## Ce que ce kit NE fera PAS pour vous

- Remplacer le fait de connaître votre client. L'angle se choisit lui-même quand vous savez à qui vous vendez.
- Battre un mauvais produit. Le copy ne peut pas réparer un produit qui ne livre pas.
- Réparer votre photographie. La plupart des boutiques DTC perdent plus de ventes à cause de mauvaises photos qu'à cause de mauvais copy.
- Rendre un claim réglementé plus sûr. Si vous vendez quelque chose qui nécessite une revue réglementaire (supplements, dispositifs médicaux cosmétiques, n'importe quoi avec « traite » dedans), obtenez un consultant réglementaire.
- Remplacer la logique de tagging post-achat. Les séquences email supposent que votre ESP (Klaviyo, Mailchimp) a les segments mis en place.

---

## Documents compagnons

- `templates/product-descriptions-and-ads.md` — description de produit par catégorie + copy d'ad par plateforme
- `templates/email-sequences.md` — panier abandonné, bienvenue, browse, post-achat, win-back
- `playbooks/reviews-and-suppliers.md` — réponses aux avis par rating + outreach fournisseur/gros
- `memory.md` — contexte du domaine : vocabulaire, workflows, erreurs courantes
- `optimization-pack.md` — system prompt autonome pour toute IA conversationnelle
- `custom-gpt-instructions.md` — formaté pour Custom GPT ChatGPT
- `quick-start.md` — installation en 3 étapes
