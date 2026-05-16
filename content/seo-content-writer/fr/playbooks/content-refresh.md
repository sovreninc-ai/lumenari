# Playbook de refresh de contenu

Le travail SEO à plus fort levier que vous puissiez faire, c'est rarement d'écrire de nouveaux articles. C'est de réparer ceux que vous avez déjà. Ce playbook vous dit quand mettre à jour, quand réécrire, quand consolider et quand supprimer — plus le prompt qui fait chacun de ces gestes en toute sécurité.

---

## L'arbre de décision de refresh

Faites passer chaque article candidat par celui-ci dans l'ordre. Arrêtez-vous au premier match.

### Étape 1 : récupérez les données

Pour chaque article que vous considérez, attrapez :

- Le ranking Google actuel pour le mot-clé principal (Search Console)
- La tendance de position moyenne sur les 12 derniers mois
- Le taux de clic
- Le top 3 SERP actuel
- Les `datePublished` et `dateModified` de l'article
- Les backlinks pointant vers l'URL (Ahrefs, Semrush, ou ce que vous utilisez)

10 minutes de collecte de données vous évitent de faire le mauvais refresh.

### Étape 2 : faites tourner l'arbre

**Q1 : L'article ranke-t-il en page 1 ou page 2 ?**
- OUI → **Mise à jour en place.** Préservez l'URL, préservez les liens internes, préservez les backlinks. Rafraîchissez juste la substance.
- NON → continuez.

**Q2 : L'article ranke-t-il en page 3-5, avec un décalage d'intention ?**
(ex : votre article est un tutoriel mais la SERP récompense maintenant les articles de comparaison)
- OUI → **Réécrivez autour de la bonne intention.** Gardez l'URL. Traitez ça comme un nouvel article utilisant l'autorité de l'ancienne URL.
- NON → continuez.

**Q3 : Avez-vous deux articles en concurrence pour le même mot-clé ?**
- OUI → **Consolidez.** Choisissez l'URL la plus forte (plus de backlinks, meilleur rang actuel). Fusionnez le meilleur contenu dedans. 301 l'URL plus faible vers l'URL plus forte.
- NON → continuez.

**Q4 : La requête a-t-elle fondamentalement changé ?**
(ex : la fonctionnalité a été renommée ; l'AI Overview mange les clics ; la SERP a basculé vers la vidéo)
- OUI → **Réécriture majeure.** Nouvel angle, nouveau format si nécessaire. Gardez l'URL uniquement si l'ancien article a encore assez de pertinence + backlinks pour justifier la préservation de l'URL.
- NON → continuez.

**Q5 : Le sujet est-il déprécié ?**
(ex : le produit n'existe plus ; la loi a changé ; le framework a été retiré)
- OUI → **Supprimez et 301** vers l'article actuel connexe le plus proche. Si rien n'est proche, retournez un 410 (gone).
- NON → continuez.

**Q6 : L'article ranke mais perd du trafic d'une année sur l'autre ?**
- OUI → **Mise à jour en place + ajoutez de la profondeur.** Probablement perd des clics au profit d'un article plus récent. Rafraîchissez la substance, ajoutez ce qui manque, mettez à jour la meta.
- NON → laissez-le tranquille, surveillez encore un trimestre.

---

## Pattern 1 : mise à jour en place (le refresh le plus courant)

Pour les articles classés page 1-2 qui ont juste besoin d'un rafraîchissement.

### Ce que vous faites

- Mettez à jour les stats et faits obsolètes
- Remplacez les captures d'écran si l'UI a changé
- Ajoutez de nouvelles sous-sections si le sujet a de nouvelles dimensions
- Renforcez les sections faibles (celles avec une faible scroll depth dans PostHog/Hotjar/etc.)
- Mettez à jour les liens internes si vous avez publié du meilleur contenu connexe depuis
- Mettez à jour le schéma `dateModified`
- NE changez PAS l'URL
- NE retirez PAS les sections qui gagnent les rankings

### Le prompt

```
Tu es le SEO Content Strategist.

Je rafraîchis cet article en place. L'URL reste. La plupart de la structure reste.

**URL de l'article :** [URL]
**Mot-clé principal :** [mot-clé]
**Rang actuel :** [position]
**Top 3 SERP actuel :** [coller]
**Dernière publication / modification :** [dates]

**L'article tel qu'il est maintenant (coller) :**
[article complet]

Ce que je veux :
1. Une liste type diff de ce qu'il faut changer (avec raisons)
2. Nouvelles sections que tu ajouterais ou sous-sections dans les H2 existants
3. Faits/stats obsolètes à mettre à jour (avec flags « source requise »)
4. Meta title et description mis à jour UNIQUEMENT si les actuels sont faibles
5. Suggestions de liens internes pour les nouvelles sections

NE réécris PAS les sections qui marchent sauf si tu peux nommer une raison spécifique qu'elles sous-performent.
```

### Exemple de sortie travaillée

> **Plan de diff :**
>
> 1. **Mettre à jour H2 #3 (« Comparaison de pricing »)** — le tableau a un pricing de 2024. HubSpot, Pipedrive et Salesforce ont tous bougé. Tire le pricing actuel depuis la page pricing de chaque vendeur. *(source requise : page pricing actuelle de chaque vendeur)*
> 2. **Ajouter un nouveau H2 entre le #4 et le #5 actuels : « Ce qui a changé en 2026 »** — touche aux fonctionnalités IA que chaque CRM bundle maintenant. C'est ce sur quoi la SERP ranke maintenant des articles plus récents. ~250 mots.
> 3. **Renforcer H2 #5 (« Meilleur pour moins de 20 contacts »)** — actuellement 180 mots, tu peux doubler ça avec une anecdote de vrai test. Les données PAA montrent que les utilisateurs cherchent ce coupe spécifique.
> 4. **Mettre à jour les liens internes** — ton ancienne version lie vers `/crm-pricing-teardown` qui redirige maintenant. Mets à jour vers l'URL actuelle `/saas-pricing-deep-dive`.
> 5. **Meta title reste** (ça marche, 54 car., mot-clé principal devant).
> 6. **Mise à jour meta description** — l'actuelle est le H1 reformulé. Remplace par : « J'ai testé 7 CRMs pendant 90 jours chacun — rafraîchi pour 2026 avec nouvelles fonctionnalités IA, pricing actuel et celui que je choisirais vraiment aujourd'hui. » (153 car.)
>
> **Sections que tu NE dois PAS toucher :**
> - La section « Comment je les ai testés » est ta colonne E-E-A-T et gagne le rang. Laisse-la.
> - Le H1 reste. C'est le titre qui gagne le clic.
>
> **Ce qui manque :**
> - Tu ne traites pas actuellement « CRM gratuit pour solopreneurs » — la PAA montre du vrai volume sur cette coupe. Considère l'ajouter comme H3 dans le H2 #4.

---

## Pattern 2 : réécrire autour d'une nouvelle intention

Quand votre article ranke page 3-5 parce que Google veut maintenant un format différent pour cette requête.

### Signaux que l'intention a basculé

- Le top 3 d'aujourd'hui est dans un format différent de quand vous avez publié
- Votre CTR est sous 1 % même en position 5-7 (signifie que vous apparaissez mais qu'on ne clique pas)
- Les questions PAA ont changé
- Une AI Overview est apparue

### Ce que vous faites

- Gardez l'URL (elle a de l'autorité)
- Nouveau plan correspondant à la nouvelle SERP
- Nouveau H1, nouveau meta title, nouvelle meta description
- Ajoutez une brève note de contexte de redirection pour quiconque a lié l'ancienne version, OU gardez assez de l'angle original comme sous-section pour que ces backlinks restent pertinents

### Le prompt

```
Tu es le SEO Content Strategist.

Je réécris cet article autour d'une nouvelle intention. L'URL reste.

**URL de l'article :** [URL]
**Mot-clé principal :** [mot-clé]
**Rang actuel :** [position]
**Top 3 SERP actuel :** [coller]
**L'article tel qu'il est :**
[texte complet]

Ce que j'ai observé :
- [pourquoi je pense que l'intention a changé — ce qui a changé dans la SERP]

Ce que je veux :
1. Classification d'intention de la NOUVELLE SERP
2. Un nouveau plan (même profondeur que le template article outliner)
3. Quelles (s'il y en a) sections de l'ancien article devraient être préservées telles quelles
4. Meta title + description mis à jour
5. Une note sur la continuité des backlinks — devrais-je m'inquiéter d'en perdre ?
```

---

## Pattern 3 : consolider deux articles en concurrence

Quand vous découvrez que vous vous êtes cannibalisé.

### Comment identifier

- Search Console montre deux de vos URLs qui impressionnent toutes les deux pour le même mot-clé
- Les deux URLs flottent en page 2-3 et ne montent jamais
- Aucune n'a un avantage clair en profondeur de contenu ou en backlinks

### Ce que vous faites

- Choisissez l'URL survivante (plus de backlinks, ou celle qui matche le plus proprement la requête)
- Fusionnez le meilleur contenu de l'URL perdante dans la survivante
- 301 l'URL perdante vers la survivante
- Mettez à jour tous les liens internes pointant vers la perdante

### Le prompt

```
Tu es le SEO Content Strategist.

J'ai deux articles en concurrence pour le même mot-clé. Je dois consolider.

**Mot-clé :** [mot-clé principal]

**Article A :**
- URL : [A]
- Rang actuel : [position]
- Backlinks : [nombre]
- Publié : [date]
- [coller article complet]

**Article B :**
- URL : [B]
- Rang actuel : [position]
- Backlinks : [nombre]
- Publié : [date]
- [coller article complet]

Ce que je veux :
1. Choisis l'URL survivante avec raisonnement
2. Un plan unifié tirant le meilleur des deux
3. Le brouillon fusionné complet
4. Une liste des liens internes pointant actuellement vers l'URL perdante qui doivent être mis à jour
5. Le plan de 301
```

---

## Pattern 4 : réécriture majeure (la requête a fondamentalement changé)

Le call le plus difficile. L'article ranke encore mais le monde a bougé. Exemples : une AI Overview répond maintenant à la requête donc le trafic a chuté de 60 % ; le framework dont vous avez parlé a été déprécié ; le comportement de recherche est passé du texte à la vidéo.

### Ce que vous faites

- Réécriture majeure, souvent un nouvel angle entièrement
- Décidez du sort de l'URL selon la valeur des backlinks : si l'URL a de forts backlinks, gardez-la et réécrivez ; sinon, une URL fraîche convient
- Mettez à jour meta, schéma, liens internes

Ce n'est pas vraiment un « refresh » — c'est un nouvel article utilisant l'autorité de l'ancienne URL. Traitez-le comme l'écriture d'une nouvelle pièce, en utilisant le template article outliner (`templates/article-outliner.md`).

---

## Pattern 5 : supprimer et 301

Quand le sujet est vraiment déprécié.

### Exemples

- Un produit que vous avez testé a fermé
- Une loi dont vous avez parlé a été remplacée
- Un framework que vous avez enseigné a été retiré
- Un article de tendance dont le moment est passé et que vous n'êtes pas intéressé à mettre à jour

### Ce que vous faites

- 301 l'URL vers l'article actuel le plus proche
- Si rien n'est proche, retournez un 410 (gone) pour que Google la retire proprement
- Ne supprimez pas juste et laissez 404 — c'est de l'équité de backlink gaspillée

---

## Le prompt analyseur d'intention SERP

Utilisez-le quand vous ne pouvez pas décider QUEL pattern de refresh s'applique.

```
Tu es le SEO Content Strategist.

Aide-moi à classifier quel type de refresh cet article nécessite.

**URL de l'article :** [URL]
**Mot-clé principal :** [mot-clé]
**Rang actuel :** [position]
**Tendance 12 mois :** [amélioration / stable / déclin]
**Top 3 SERP aujourd'hui :** [coller]

**L'article (coller) :**
[article complet]

Fais tourner mon arbre de décision de refresh. Dis-moi :
1. Quel pattern correspond (mise à jour en place / réécriture intention / consolider / réécriture majeure / supprimer)
2. Le raisonnement
3. La première étape concrète que je devrais faire
```

La sortie devrait être une réponse claire « pattern X parce que Y » plus la première étape. Si l'IA hésite ou dit « ça dépend », poussez-la : « Si tu devais en choisir un, lequel ? »

---

## Exemple travaillé — « what is HubSpot used for »

Une vraie décision de refresh. L'article ranke #4. Le CTR est 0,8 %. Le top 3 SERP est maintenant dominé par des réponses courtes de type définition avec une AI Overview en citant deux. L'article actuel fait 1 800 mots et commence par un pitch marketing.

**Arbre de décision parcouru :**
- Page 1 ? Presque (#4). Territoire de page 2.
- Décalage d'intention ? Oui — la SERP veut du contenu court, définitionnel, faits d'abord. L'article est longform et penche marketing.
- Deux articles en concurrence ? Non.
- Requête fondamentalement changée ? Plus ou moins — la présence d'AI Overview a compressé la valeur du clic.
- Sujet déprécié ? Non, HubSpot existe toujours bien.

**Verdict :** Pattern 2 (réécrire autour d'une nouvelle intention). Garder l'URL (elle a 12 backlinks). Restructurer comme une pièce définitionnelle faits-d'abord, avec une réponse serrée de 50 mots en haut, puis des développements. Laisser tomber le ton pitch marketing. Cibler le featured snippet directement.

**Résultat attendu :** le rang grimpe de #4 à #1-2, mais les nombres absolus de clics peuvent ne pas bondir dramatiquement parce que l'AI Overview mange le clic de toute façon. Le gain c'est la présence de marque dans les citations IA et la récupération de l'organique pour les requêtes de variantes brandées.

---

## Erreurs de refresh courantes que le kit signalera

- **Changer l'URL d'un article rankant en page 1.** Vous perdrez le rang et l'équité de backlink. Rafraîchissez en place.
- **Supprimer un article sans 301'er.** Backlinks gaspillés, erreurs 404 dans Search Console.
- **Rafraîchir sans vérifier pourquoi le trafic a chuté.** Parfois l'article va bien et la REQUÊTE a chuté en volume. Vérifiez les impressions totales Search Console avant de supposer que l'article est le problème.
- **Rafraîchir trop souvent.** Une fois tous les 6-12 mois est la bonne cadence pour la plupart des articles. Rafraîchir mensuellement a l'air suspect pour Google et brûle votre temps.
- **Mettre à jour `dateModified` sans réellement mettre à jour la substance.** Google attrape ça et déprécie le signal de fraîcheur.
- **Retirer des sections qui gagnent les rankings.** Regardez toujours les données de scroll depth et de temps-par-section avant de couper.

---

## Cadence de refresh — comment planifier une année

Une petite équipe de contenu peut productivement rafraîchir 4-8 articles par mois. Un opérateur solo devrait viser 2-3 par mois, priorisés par :

1. Articles qui ont perdu le plus de trafic absolu dans les 90 derniers jours
2. Articles classés en position 4-15 avec fort potentiel CTR
3. Articles liés depuis vos pages à fort trafic (rafraîchir ceux-ci compose le bénéfice de maillage interne)
4. Articles de 18+ mois qui n'ont pas été touchés

Faites tourner l'arbre de décision de refresh sur chacun. Choisissez le pattern. Exécutez. Ne rafraîchissez et republiez pas tous ; certains vous diront de supprimer ou consolider. C'est le playbook qui marche.
