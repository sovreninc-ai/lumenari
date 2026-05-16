# Prompt CMA + Trois Scénarios Travaillés de Comps

Des prompts d'analyse comparative de marché qui produisent une fourchette de prix défendable, pas un chiffre unique généré à partir de moyennes. Trois scénarios parce que les vraies annonces arrivent rarement avec des comps propres.

---

## Le master prompt CMA

Collez ceci. Le system prompt (`optimization-pack.md`) gère le ton et la structure ; celui-ci donne à l'IA les inputs dont elle a besoin.

```
Lance-moi un CMA.

Bien sujet :
- Adresse ou quartier : [nom]
- Chambres / SdB / Sqft / Terrain : [détails]
- Année de construction : [année]
- Condition (1-10) : [#]
- Caractéristiques notables qui affectent la valeur : [3-5 éléments]

Ventes comparables (3-6, vendues dans les 180 derniers jours, dans un rayon d'env. 1,6 km, profil similaire) :

Comp 1 :
- Adresse : [nom]
- Prix vendu : [montant] $
- Date vendue : [date]
- Chambres / SdB / Sqft / Terrain / Année : [détails]
- Condition : [#]
- DOM : [#]
- Une phrase sur comment ça se compare au sujet : [texte]

Comp 2 :
[même structure]

Comp 3 :
[même structure]

(continuer pour autant que tu en as, jusqu'à 6)

Actifs ou en attente actuellement (2-3 si disponibles) :

Actif 1 :
- Adresse : [nom]
- Prix listé : [montant] $
- DOM : [#]
- Une phrase sur comment ça se compare : [texte]

(continuer)

Mon avis :
[Même une estimation grossière. « Je pense que ça vaut X $ à Y $ parce que Z. » Ça ancre l'analyse à mon jugement au lieu d'un pur moyennage de données.]

Sortie que je veux :
- Fourchette de prix (bas / probable / haut)
- 2-3 phrases qui expliquent le spread
- 3-5 questions à poser au vendeur avant de finaliser le prix listé
- Tout ce que tu as remarqué dans les comps que je devrais être prêt à discuter au rendez-vous d'annonce
```

---

## Scénario 1 : Comps propres, spread serré

Vous avez 4-5 comps solides dans les 90 derniers jours, tous dans 10 % du profil du sujet. C'est le cas facile — le job de l'IA est de confirmer votre lecture et de remonter une ou deux choses que vous pourriez avoir manquées.

### Inputs

**Sujet :** ranch 3 chambres / 2 sdb / 1 640 sqft à Sugar Land, TX. Terrain de 0,18 acre. Construit en 1998. Condition 7/10 — cuisine récente, salles de bain d'origine. Garage deux places. HVAC mis à jour (2022).

**Comp 1 :** même lotissement, 1 580 sqft, vendu il y a 38 jours à 385 000 $. Mises à jour similaires. DOM 14.

**Comp 2 :** lotissement adjacent, 1 700 sqft, vendu il y a 62 jours à 402 000 $. Salles de bain entièrement rénovées (le sujet ne l'est pas). DOM 9.

**Comp 3 :** même lotissement, 1 610 sqft, vendu il y a 71 jours à 379 000 $. Cuisine d'origine. DOM 21.

**Comp 4 :** même lotissement, 1 720 sqft, vendu il y a 22 jours à 398 000 $. Piscine. DOM 7.

**Actif :** même lotissement, 1 680 sqft, listé à 409 000 $, 31 jours sur le marché. Entièrement mis à jour.

**Mon avis :** probablement 388-395k $. Le comp avec piscine et celui avec sdb rénovées tirent vers le haut ; celui avec la cuisine d'origine tire vers le bas. Je pense lister à 390k $.

### Sortie (ce que l'IA devrait produire)

```
CMA — Sujet : ranch 3/2/1640, Sugar Land

Résumé des comps :
- Comp 1 (385k $, il y a 38j, 1580 sqft) : le match le plus proche — ajustement à la baisse léger pour la sqft
- Comp 2 (402k $, il y a 62j, 1700 sqft) : tire vers le haut à cause des sdb rénovées ; le sujet ne l'est pas
- Comp 3 (379k $, il y a 71j, 1610 sqft) : tire vers le bas à cause de la cuisine plus ancienne ; le sujet est mis à jour
- Comp 4 (398k $, il y a 22j, 1720 sqft) : prime piscine d'environ 8-12k $ ; à enlever pour une comparaison juste ≈ 387-390k $
- Actif 1 à 409k $, 31 DOM : signal de plafond — entièrement mis à jour et stagne

Fourchette de prix :
- Bas : 385 000 $
- Probable : 389 000-392 000 $
- Haut : 396 000 $ (seulement avec un trafic de visites fort la première semaine)

Explication : votre sujet se situe proprement entre le comp à cuisine d'origine et le comp à sdb rénovées, ce qui est exactement là où le prix devrait atterrir. Le comp avec piscine s'ajuste à la baisse pour absence de piscine. L'actif à 409k $ stagne depuis 31 jours — c'est un signal clair que le marché ne récompensera pas un prix de rénovation complète sans sdb rénovées.

Votre lecture à 390k $ est bien soutenue. Je suggérerais de lister à 389 900 $ pour atterrir juste sous le chiffre rond, avec de la marge pour négocier à 385k $ si besoin.

Questions à poser au vendeur avant de finaliser :
1. Sont-ils fermes sur le prix ou ont-ils besoin de bouger pour une date spécifique ? Ça change la stratégie.
2. Des voisins ont-ils listé et retiré récemment ? L'activité off-market compte.
3. Sont-ils prêts à pré-lister la documentation HVAC (installation 2022) ? C'est un vrai différenciateur vs Comp 3.
4. Quel est leur plancher ? Définir le walk-away avant la semaine un.
5. Sont-ils ouverts à une pré-inspection ? Le slab-on-grade à Sugar Land sur les constructions fin années 90 fait souvent émerger des questions de fondation pendant l'inspection acheteur — anticiper peut sauver 3-5 % à la fin.

À préparer pour le rendez-vous : pourquoi l'actif à 409k $ stagne (c'est une leçon de plafond de pricing), et s'ils veulent investir soit dans les salles de bain soit dans le staging avant de passer en ligne.

---
Choses à vérifier avant publication :
- Confirmer l'estimation d'ajustement piscine contre votre marché
- Confirmer que le prix vendu de Comp 4 n'incluait pas de concessions vendeur
```

---

## Scénario 2 : Comps faibles, prix défendable quand même

Vous avez un comp OK, deux tirés par les cheveux, et vous devez aller à un rendez-vous d'annonce demain. C'est le cas dur — et l'IA est la plus utile ici parce qu'elle vous force à articuler les ajustements au lieu de deviner.

### Inputs

**Sujet :** maison contemporaine custom 5 chambres / 4 sdb / 3 800 sqft dans une petite enclave de Boulder, CO. Terrain de 0,5 acre. Construite en 2019. Vues sur la montagne depuis la suite principale et le grand salon. Condition 10/10.

**Comp 1 :** même enclave, 3 600 sqft, vendue il y a 11 mois à 2,45M $. Custom mais finitions plus anciennes (build 2016). DOM 67.

**Comp 2 :** à 1,9 km, 4 100 sqft, vendue il y a 4 mois à 2,95M $. Construction neuve, pas de vues. DOM 41.

**Comp 3 :** à 1,3 km, 3 200 sqft, vendue il y a 6 mois à 2,2M $. Build 2012, vue partielle sur la montagne. DOM 22.

**Actif :** même enclave, 4 000 sqft, listé à 3,1M $, 89 jours sur le marché.

**Mon avis :** quelque part entre 2,7M $ et 2,95M $, mais je ne sais sincèrement pas.

### Sortie

```
CMA — Sujet : maison contemporaine custom 5/4/3800, Boulder

Évaluation honnête d'emblée : c'est un set de comps mince. Le signal le plus fort est Comp 2 (construction neuve, 4 mois, 2,95M $). Mais Comp 2 n'a pas de vues et le sujet en a, et Comp 2 est 8 % plus grand. Les deux autres comps demandent des ajustements significatifs.

Résumé des comps :
- Comp 1 (2,45M $, il y a 11 mois, 3600 sqft) : bonne enclave mais transaction d'il y a 3 ans dans un marché qui a bougé ; ajustement à la hausse d'env. 8-12 % pour le temps
- Comp 2 (2,95M $, il y a 4 mois, 4100 sqft) : transaction récente la plus nette mais manque de vues et est 8 % plus grande
- Comp 3 (2,2M $, il y a 6 mois, 3200 sqft) : plus petit, plus ancien, vue partielle — directionnel seulement
- Actif à 3,1M $, 89 DOM : un vrai signal de plafond — ce niveau de pricing dans cette enclave n'a pas conclu depuis neuf mois

Fourchette de prix :
- Bas : 2,75M $
- Probable : 2,85M $-2,95M $
- Haut : 3,0M $ (agressif — nécessite des dynamiques d'offres multiples dans les 10 premiers jours)

Explication : la prime de vue dans cette enclave tourne autour de 5-8 % d'après les cycles précédents, ce qui place le sujet à parité avec Comp 2 ou légèrement au-dessus malgré une taille 8 % moindre. La transaction vieillissante de Comp 1, ajustée pour le temps, atterrit autour de 2,7-2,8M $ pour une maison légèrement plus petite et moins mise à jour, ce qui soutient le bas de la fourchette. L'actif à 3,1M $ est le point de données qui plaide contre un pricing au-dessus de 3,0M $ : une maison de taille similaire dans la même enclave n'a pas trouvé d'acheteur en trois mois à ce niveau.

Recommandation : 2 895 000 $ listé, avec un plancher défendable à 2,75M $ et un plafond stretch à 3,0M $ uniquement si la semaine 1 montre un volume de visites fort.

Questions à poser au vendeur :
1. Combien ont-ils payé, quand, et qu'ont-ils mis dedans ? Ça ancre leur attente.
2. Y a-t-il des comps off-market dans l'enclave auxquels je n'ai pas accès ? Les propriétaires de maisons custom savent parfois.
3. Combien de temps peuvent-ils attendre si ça ne se vend pas en 60 jours ? L'actif à 3,1M $ est dessus depuis 89 — votre vendeur doit comprendre ce que ça signale.
4. Sont-ils prêts à pré-lister avec une photographie professionnelle par un photographe d'architecture spécifique à Boulder ? Ça compte à ce niveau de prix.
5. Quel est leur chiffre walk-away ? Définissez-le avant de passer en ligne.

À préparer pour le rendez-vous : l'actif à 89 jours et pourquoi un pricing au-dessus de 3M $ est dur à défendre ; la prime de vue comme différenciateur clé vs Comp 2 ; le timeline du vendeur comme moteur de stratégie.

---
Choses à vérifier avant publication :
- Facteur d'ajustement temporel — confirmer contre l'indice de prix de vente Boulder year-over-year
- Historique du comp actif (réductions de prix ? off-market puis remis ?)
- Liste complète des matériaux du sujet — les contemporaines custom varient beaucoup ; les détails de spec affectent la prime
```

---

## Scénario 3 : Un comp trophée qui tire le chiffre

La maison d'un voisin vient de se vendre à un chiffre qui défie le reste du set de comps. Votre vendeur en a entendu parler et pense maintenant que sa maison vaut la même chose. Le job de l'IA ici, c'est de vous aider à avoir la conversation honnête.

### Inputs

**Sujet :** split-level 3 chambres / 2 sdb / 1 900 sqft des années 70 dans un quartier de Toronto. Cuisine d'origine, sdb d'origine, chauffage au mazout. Terrain 30 x 120.

**Comp 1 :** en face. 3 chambres / 3 sdb / 2 200 sqft. Entièrement rénové 2024 (cuisine, deux sdb, sous-sol fini, nouveau mécanique). Vendu la semaine dernière à 1,85M $. DOM 8.

**Comp 2 :** deux pâtés de maisons plus loin. 3 chambres / 2 sdb / 1 950 sqft. Cuisine mise à jour 2019, sdb d'origine. Vendu il y a 3 mois à 1,42M $. DOM 28.

**Comp 3 :** même rue, quatre maisons plus loin. 3 chambres / 2 sdb / 1 820 sqft. D'origine partout. Vendu il y a 5 mois à 1,31M $. DOM 41.

**Actif :** trois pâtés de maisons plus loin. 4 chambres / 3 sdb / 2 300 sqft, rénové, listé à 1,95M $, 18 jours sur le marché.

**Lecture du vendeur (note de l'agent) :** « Le vendeur a vu Comp 1 se vendre à 1,85M $ et veut lister à 1,79M $. »

### Sortie

```
CMA — Sujet : split-level années 70 3/2/1900, Toronto

Évaluation directe : Comp 1 n'est pas un comp pour ce bien. C'est la valeur de ce bien APRÈS 400-500k $ de travaux de rénovation.

Résumé des comps :
- Comp 1 (1,85M $, la semaine dernière, 2200 sqft, entièrement rénové 2024) : le comp trophée. S'ajuste à la baisse d'environ 400-500k $ pour le gap de rénovation, plus 50-80k $ pour le delta sqft. Ajusté à la condition du sujet : ~1,30M $-1,40M $.
- Comp 2 (1,42M $, il y a 3 mois, 1950 sqft, mises à jour partielles) : le point de données le plus pertinent. Le sujet est moins mis à jour que Comp 2. Ajustement à la baisse ~50-75k $.
- Comp 3 (1,31M $, il y a 5 mois, 1820 sqft, d'origine) : match de condition le plus proche. Ajustement temporel légèrement à la hausse ; ajustement à la baisse pour sqft légèrement plus petite. Atterrit autour de 1,32-1,35M $.
- Actif à 1,95M $ (4 chambres rénové) : pas directement pertinent — nombre de chambres différent et niveau de condition différent.

Fourchette de prix :
- Bas : 1,30M $
- Probable : 1,32M $-1,37M $
- Haut : 1,40M $ (seulement si le trafic de visites est fort dans les 10 premiers jours, avec dynamiques multi-offres)

Explication : le vendeur a ancré sur le mauvais comp. Comp 1 reflète ce qu'une maison rénovée avec une charpente similaire se vend. Le sujet, en condition d'origine avec mécanique d'origine, est dans la fourchette 1,30-1,40M $ — directement soutenu par Comp 2 et Comp 3. Lister à 1,79M $ produira des visites d'acheteurs qui entrent en s'attendant à la condition Comp 1 et repartent déçus. C'est ainsi que les maisons stagnent sur le marché 60+ jours et finissent par se vendre au prix qu'elles auraient dû avoir au départ, moins la stigmatisation de la réduction de prix.

Recommandation : Lister entre 1 349 000 $ et 1 389 000 $. Le prix de vente le plus probable est dans les 1,3M $ bas. Si le vendeur veut pousser vers 1,4M $, il doit dépenser 20-40k $ en mises à jour cosmétiques (peinture, ponçage des sols, quincaillerie de cuisine, luminaires) avant de passer en ligne.

Questions à poser au vendeur :
1. A-t-il marché dans Comp 1 ? Sinon, suggérez-lui. La différence est visible et tangible.
2. Est-il ouvert à un refresh pré-listing de 2 semaines ? 20k $ de peinture + sols retournent typiquement 40-60k $.
3. Quel est son timeline ? S'il doit bouger en 90 jours, la stratégie de pricing est différente qu'avec 9 mois.
4. Est-il prêt à regarder le net du vendeur à 1,79M $ (probablement 90+ DOM et une réduction de prix) vs 1,37M $ pricé juste (probablement 14-21 DOM et possible multi-offres) ? Le net est souvent plus proche qu'il ne pense.
5. Est-il émotionnellement attaché au chiffre 1,79M $, ou est-ce que le voisin l'a mentionné une fois et c'est resté ? Problème différent, conversation différente.

À préparer pour le rendez-vous : le delta de rénovation sur Comp 1, le calcul du net du vendeur (les 400k $ ne sont pas du vrai argent pour lui), et l'option de refresh pré-listing.

---
Choses à vérifier avant publication :
- Périmètre et coût de la rénovation de Comp 1 (à confirmer avec l'agent de l'annonce si possible — parfois « entièrement rénové » surévalue le travail)
- Spécificités du terrain du sujet (le 30x120 est-il zoné pour separance/laneway ? C'est un levier de valeur)
- Marché de Toronto — changements récents en jours-sur-le-marché pour le stock non rénové
```

---

## Quand escalader au-delà de l'IA

L'IA est un outil d'affûtage. Il y a des moments pour la poser et prendre le téléphone :

- Ventes de succession où les héritiers ne sont pas d'accord
- Ventes pré-maritales ou pilotées par divorce (souvent besoin d'une lettre d'opinion écrite, pas d'un chat CMA)
- Scénarios de teardown ou de valeur foncière — obtenez une lettre de constructeur en plus du CMA
- Tout ce où le sujet est sur un micro-marché (une rue, un immeuble, trois comps en trois ans) — appelez un appraiser local, pas l'IA

Le prompt CMA ci-dessus est conçu pour rendre le cas à 80 % plus rapide et plus défendable. Les 20 % qui sont réellement durs ont encore besoin d'une oreille humaine.
