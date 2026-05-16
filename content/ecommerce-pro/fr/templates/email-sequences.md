# Séquences Email

Les cinq séquences que chaque boutique Shopify a besoin de faire tourner. Panier abandonné, série de bienvenue, abandon de browse, post-achat, win-back. Chacune est mise en place pour Klaviyo (ou Mailchimp) — la structure est platform-agnostic.

Chaque email inclut : ligne de sujet (sous 50 car.), texte de preview (sous 90 car.), corps. Le kit produit le set complet en un prompt ou un email à la fois selon le besoin de l'utilisateur.

---

## Séquence panier abandonné (3 emails)

Le flow à plus fort levier en DTC. Le taux de récupération standard du secteur est 10-15 % des paniers abandonnés ; les flows bien tunés atteignent 20 %+.

**Heures d'envoi :** 1 heure après l'abandon, 24 heures après, 72 heures après.

### Le prompt

```
Tu écris une séquence panier abandonné à 3 emails.

Marque : [3-5 notes de voix]
AOV moyen : [X$ — affecte si l'email 3 devrait inclure un discount]
Catégorie de produit : [apparel / maison / beauté / food / supplements / etc.]
Objections courantes : [listez 2-3 choses sur lesquelles les clients hésitent — coût d'expédition, incertitude de sizing, politique de retour, questions d'ingrédients]

Sors 3 emails :
- Email 1 (envoi 1 heure après abandon) : nudge amical, pas de discount, focus sur le produit qu'ils ont laissé
- Email 2 (envoi 24 heures après) : addresser l'objection la plus probable
- Email 3 (envoi 72 heures après) : incentive — discount, livraison gratuite ou preuve sociale selon AOV

Pour chacun : ligne de sujet (sous 50 car.), texte de preview (sous 90 car.), corps (120-200 mots).
Pas de mots bannis. Pas de fausse urgence.
```

### Exemple travaillé — marque beauté, AOV 60$

**Email 1 (1 heure après) :**
```
Sujet (32 car.) : Ton panier s'est-il égaré ?
Preview (78 car.) : La crème hydratante céramide que tu regardais est toujours là quand tu es prêt.

Bonjour [prénom],

On dirait que tu regardais la crème hydratante céramide plus tôt. Elle est toujours dans ton panier si tu veux reprendre là où tu en étais.

Quelques choses que les gens veulent généralement savoir avant de commander :
- Livraison gratuite au-dessus de 50$
- Politique de retour 60 jours, même sur flacons ouverts
- Expédition dans 1-2 jours ouvrés depuis Toronto

[Retourne à ton panier →]

Si tu as décidé que ce n'était pas le bon fit, pas de souci. On est facile à joindre si tu veux demander n'importe quoi.

— [Marque]
```

**Email 2 (24 heures après — adresser l'objection « est-ce que c'est bon pour ma peau ») :**
```
Sujet (44 car.) : À propos de la crème hydratante dans ton panier
Preview (82 car.) : Petite note sur ce qui fait que la nôtre marche pour les peaux sensibles et over-strippées.

Bonjour [prénom],

Petite note — la question la plus courante qu'on reçoit sur la crème hydratante céramide est « ça marchera-t-il pour moi ? »

Elle est conçue pour :
- Peau réactive aux actifs ou au parfum
- Personnes qui utilisent du rétinol ou d'autres actifs qui ont besoin d'une base à faible irritation
- Quiconque a été en over-cleansing ou en strippage de la barrière

Ce n'est probablement pas le bon fit si :
- Tu cherches une crème occlusive lourde pour la nuit
- Tu veux un gel fortement hydratant — c'est une crème hydratante équilibrée, pas une bombe d'hydratation

Si ça correspond, [le flacon dans ton panier] est là.

Si tu veux demander n'importe quoi avant de commander, réponds à cet email. Je les lis.

— [Nom du fondateur]
```

**Email 3 (72 heures après — incentive doux) :**
```
Sujet (37 car.) : Une dernière note avant qu'on lâche
Preview (76 car.) : 10 % sur le panier que tu as démarré, plus un rappel rapide de pourquoi les gens restent.

Bonjour [prénom],

Je vais laisser celui-ci dans tes mains. Le panier que tu as démarré il y a quelques jours — on le tiendra les 48 prochaines heures avec 10 % off si tu le veux.

Utilise le code STILLHERE au checkout.

Pour ce que ça vaut : on a un rating 4,8 étoiles sur 1 400+ avis, et la crème hydratante est notre produit le plus recommandé (la plupart des clients reviennent pour un second flacon en 10 semaines).

[Utilise STILLHERE sur ton panier →]

Dans tous les cas, j'espère que tu trouveras ce que tu cherches.

— [Marque]
```

---

## Série de bienvenue (4 emails sur 30 jours)

Envoyée aux abonnés email première fois (signups via pop-up, formulaire footer ou post-achat). 4 emails sur 30 jours.

**Heures d'envoi :** immédiatement, jour 3, jour 10, jour 28.

### Le prompt

```
Tu écris une série de bienvenue à 4 emails pour nouveaux abonnés.

Marque : [3-5 notes de voix]
Story de marque (1-3 phrases) : [coller — ce qui fait exister cette marque]
Gamme de produit : [3-5 catégories ou produits hero]
Incentive de sign-up : [ce qu'on a promis — 10 % off, livraison gratuite, etc.]

Sors 4 emails :
- Email 1 (immédiat) : merci + code d'incentive premier achat
- Email 2 (jour 3) : story de marque — lecture de 1 minute max
- Email 3 (jour 10) : best-sellers ou comment choisir ce qui est bon pour toi
- Email 4 (jour 28) : communauté / demande de review / CTA de referral

Pour chacun : ligne de sujet (sous 50 car.), texte de preview (sous 90 car.), corps (150-250 mots).
Pas de mots bannis.
```

### Exemple travaillé — marque home goods, incentive de sign-up : livraison gratuite

**Email 1 (immédiat) :**
```
Sujet (28 car.) : Bienvenue — ton code est en bas
Preview (75 car.) : Livraison gratuite sur ta première commande, plus un récap de ce qu'on fait.

Bonjour [prénom],

Bienvenue. Utilise le code FIRSTSHIP au checkout pour la livraison gratuite sur ta première commande.

On fait des home goods petits lots — bougies, céramiques, textiles — depuis une boutique à Vancouver. Tout est fait en lots de 20-40, et la plupart se vend en un mois après le réassort.

Quelques choses qui valent la peine de savoir :
- Les nouveaux lots arrivent le premier vendredi de chaque mois
- On emaile les abonnés 24 heures avant la sortie publique
- Les retours sont acceptés sur bougies non ouvertes et textiles non utilisés dans les 30 jours

Si tu as des questions avant de commander, réponds à cet email. Ça arrive sur mon bureau.

— [Nom du fondateur]

[Code : FIRSTSHIP — Livraison gratuite, première commande]
```

**Email 2 (jour 3 — story de marque) :**
```
Sujet (33 car.) : Comment cet endroit a vu le jour
Preview (85 car.) : Une courte story sur pourquoi on fait des bougies à la cire d'abeille et céramiques slow-fire en 2026.

[150-200 mots de story de marque — gardez ancré ; pas de langage « passion » ; montrez la vraie raison pour laquelle la marque existe]
```

**Email 3 (jour 10 — best-sellers / guidance) :**
```
Sujet (42 car.) : Si tu ne sais pas par où commencer...
Preview (88 car.) : Quelques-unes de nos choses les plus recommandées, plus ce avec quoi les gens les pairent.

[150-250 mots de guide produit ; 3-4 best-sellers avec des raisons d'une ligne]
```

**Email 4 (jour 28 — referral / CTA de review) :**
```
Sujet (37 car.) : Une petite demande si tu as commandé
Preview (89 car.) : Si quelque chose que tu as acheté a bien atterri — nous le dirais-tu ?

[Courte demande pour un review sur ce qu'ils ont acheté, OU un CTA de referral s'ils n'ont pas encore acheté]
```

---

## Abandon de browse (2 emails)

Envoyés aux abonnés qui ont vu un produit mais ne l'ont pas ajouté au panier. Intent plus bas que l'abandon de panier — le ton est plus doux.

**Heures d'envoi :** 4 heures après une vue de produit, 48 heures après.

### Prompt compact

```
Marque : [3-5 notes de voix]
Produit vu : [nom du produit + description d'une phrase]
Raison courante pour laquelle quelqu'un browse sans ajouter : [coller — prix, sizing, ingrédients, n'avait pas le temps]

Sors :
- Email 1 (4 heures après la vue) : léger message "juste pour que tu aies le lien"
- Email 2 (48 heures après la vue) : un morceau d'info utile (un extrait d'avis, une réponse d'une ligne à une objection courante)

Chacun : sujet sous 50 car., preview sous 90 car., corps 80-150 mots.
Pas de mots bannis. Pas de discount dans cette séquence.
```

---

## Séquence post-achat (3 emails)

Envoyée après la complétion de la commande. Confirmation de commande, notification d'expédition, demande de review.

**Heures d'envoi :** immédiatement, à la confirmation d'expédition, 10-14 jours après livraison (pour consommables) ou 21-30 jours après livraison (pour achats considérés).

### Le pattern

Les deux premiers (confirmation de commande, expédition) sont principalement transactionnels mais le kit les rend plus chaleureux que les templates Shopify par défaut. Le troisième (demande de review) est où l'écriture compte.

```
Marque : [notes de voix]
Produit qui vient d'être livré : [nom]
Plateforme de review : [Judge.me / Yotpo / Loox / Shopify natif]
Incentive (s'il y en a) : [discount sur prochain achat, entrée dans un tirage au sort, aucun]

Sors un email de demande de review :
- Sujet (sous 50 car.)
- Preview (sous 90 car.)
- Corps (100-180 mots)
- Un CTA clair unique pour laisser un avis
- Reconnais que les avis sont une petite demande et une vraie aide
- Pas de mots bannis
- Ne promets pas que l'avis sera publié ou qu'il devrait être 5 étoiles
```

### Exemple travaillé — marque supplements

```
Sujet (39 car.) : J'espère que le magnésium se passe bien
Preview (88 car.) : Deux semaines plus tard est quand la plupart des gens remarquent — petite demande si tu as une sec.

Bonjour [prénom],

Deux semaines plus tard c'est généralement quand les gens commencent à remarquer si le magnésium fait ce qu'ils espéraient, ou si ce n'est pas le bon fit.

Si tu as 60 secondes, voudrais-tu laisser un avis rapide ? Honnête est plus utile aux autres personnes que positif — si ça n'a pas marché pour toi, on préférerait savoir.

[Laisse un avis →]

Et si quelque chose est apparu — le mauvais produit, problèmes de capsules, n'importe quoi — réponds à cet email et on règlera ça.

Merci de nous avoir essayés.

— [Fondateur]
```

---

## Win-back (2 emails)

Envoyés aux clients qui n'ont pas commandé depuis 60-120 jours (selon la catégorie — consommables = plus court, considéré = plus long).

**Heures d'envoi :** 60 jours lapsed, 90 jours lapsed.

### Le prompt

```
Marque : [notes de voix]
Fréquence moyenne de commande pour cette marque : [toutes les X semaines pour consommables, etc.]
Produits les plus susceptibles d'être recommandés : [listez 2-3]

Sors 2 emails :
- Email 1 (60 jours) : check-in sans pression, demande si tout va bien
- Email 2 (90 jours) : incentive à faible friction — 15 % off, livraison gratuite ou rappel de réassort

Chacun : sujet sous 50 car., preview sous 90 car., corps 100-180 mots.
Pas de mots bannis. N'implique pas que le client est en retard. Respecte l'autonomie.
```

### Exemple travaillé — marque café

**Email 1 (60 jours) :**
```
Sujet (38 car.) : Pas de pression — petit check-in
Preview (75 car.) : Je m'assure juste que ta situation café n'a pas dégénéré depuis le printemps.

Bonjour [prénom],

Ça fait environ deux mois depuis ta dernière commande — voulais checker. Pas de pression pour recommander ; juste m'assurer qu'on n'a pas raté quelque chose quelque part.

Si tu en as manqué et que tu as été occupé, [l'Ethiopia Guji que tu as acheté la dernière fois est toujours au menu]. Si tu essaies quelque chose de nouveau d'un autre torréfacteur, c'est super — fais-moi savoir ce que tu as fini par aimer et je pourrais l'ajouter à une liste de sourcing.

— [Fondateur]
```

---

## Ce que les bonnes séquences email ne font pas

- **Discount sur l'email 1.** Entraîner le client à attendre le discount et vous l'avez entraîné à ne jamais payer plein tarif.
- **Envoyer le même copy générique peu importe la catégorie.** Un panier abandonné supplements devrait sonner différent d'un panier abandonné bougie.
- **Utiliser de faux compteurs de countdown.** Les clients voient à travers et la confiance s'érode.
- **Enterrer le lien de désabonnement.** Rendez-le trouvable. Le boost de qualité de liste dû aux désabonnements propres vaut le petit hit de taille de liste.
- **Envoyer l'email win-back comme si le client vous devait quelque chose.** Respectez l'autonomie. Le client a le droit de ne pas revenir.
