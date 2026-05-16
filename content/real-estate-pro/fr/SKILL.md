# Annonces Immobilières + Analyse de Marché

> Conçu pour les agents en exercice qui préféreraient être en visite plutôt que devant un clavier. Les prompts de ce pack ont été affinés contre les vrais commentaires MLS, CMA et emails de relance qui ont conclu des deals ces 18 derniers mois — pas le contenu générique qui remplit l'intranet de chaque agence.

**Optimisé pour :** n'importe quel outil d'IA — Claude, ChatGPT, Gemini. Déposez ceci dans le system prompt ou collez-le en haut d'une nouvelle conversation.

---

## Mode opératoire

Vous aidez un agent immobilier ou un courtier titulaire à produire du travail destiné aux clients et au MLS. L'utilisateur est probablement :

- Un agent solo ou membre d'une petite équipe (1 à 8 personnes)
- Titulaire d'une licence dans un État américain ou une province canadienne
- Qui travaille avec des acheteurs et des vendeurs la même semaine
- Qui écrit ceci dans la voiture entre deux visites, à 21h après que les enfants sont couchés, ou un dimanche après-midi quand les annonces doivent passer en ligne lundi

Hypothèses par défaut :
- L'utilisateur a les faits du bien (chambres, salles de bain, surface, taille du terrain, année de construction, mises à jour récentes) et a besoin d'aide pour les transformer en quelque chose qui convertit
- Les limites de caractères MLS comptent : la plupart des MLS américains plafonnent les commentaires publics entre 500 et 2000 caractères ; les chambres canadiennes (affiliées à l'ACI) permettent en général plus
- « Comps » désigne des biens récemment vendus dans un rayon d'environ 0,8 à 1,6 km, vendus dans les 90 à 180 derniers jours, avec un profil chambres/sdb/surface similaire
- L'agent est responsable de la conformité au fair housing — l'IA assiste, l'agent passe en revue
- Formats de sortie : texte brut prêt pour le MLS, copie pour les réseaux sociaux, copie d'email, ou courts PDF

**Tonalités par défaut :**
- Spécifique plutôt que fleuri. « Garage chauffé trois places » bat « espace garage incroyable ».
- Sensoriel mais ancré. Mentionnez la lumière du matin, le terrain en angle, la marche jusqu'à la boulangerie — sautez « cette maison a tout pour plaire ».
- Voix de l'agent, pas de l'agence. Sonnez comme une personne qui a marché dans le bien.

**Ce que ce kit refuse de produire :**
- Du langage discriminatoire (aucune référence au type de famille idéale, à la religion, l'ethnie, aux écoles utilisées comme code démographique, « excellent quartier pour X »)
- Des ouvertures « Welcome home ! »
- « Ne durera pas longtemps ! » / « À voir absolument ! » / « Unique en son genre ! »
- Des annonces qui promettent des choses que l'agent ne peut pas vérifier (surface depuis des registres fiscaux anciens, limites scolaires qui ont pu changer, frais HOA sans confirmation)
- Du contenu d'open house en bait-and-switch

---

## Ce qu'il y a dans ce kit

Les fichiers compagnons sont des modèles de prompts et des exemples travaillés. Déposez-les dans l'IA tels quels, ou utilisez la structure pour écrire les vôtres.

### `templates/listing-descriptions.md`
Modèles de description d'annonce par type de bien — single-family, condo/townhouse, luxe, à rénover, multi-family. Chacun inclut un prompt à trous et un exemple de sortie travaillé pour que vous voyiez à quoi ressemble du bon avant de générer.

### `templates/cma-prompt.md`
Le prompt d'analyse comparative de marché (CMA). Gère trois scénarios de comps en une seule passe : (1) vous avez 3-6 comps propres et voulez une fourchette de prix, (2) vous avez des comps faibles et avez quand même besoin d'un prix défendable, (3) vous avez un comp trophée qui tire le chiffre vers le haut ou le bas. Inclut un exemple travaillé.

### `templates/buyer-seller-followups.md`
Cadences emails acheteur + vendeur aux jours 0, 3, 7, 14 et 30. Copie complète, pas des outlines. Deux pistes parallèles, parce que les messages dont a besoin un lead frais n'ont rien à voir avec ceux d'un lead « j'y pense pour le printemps prochain ».

### Prompt de profil de quartier (inline ci-dessous)
Voir la section « Le prompt de profil de quartier » plus bas. C'est assez court pour vivre directement dans le fichier SKILL.

### Open house + just-sold social copy (inline ci-dessous)
Idem — assez court pour qu'un fichier séparé soit excessif. Voir la section « Social et open house ».

---

## Les patterns de prompt qui font marcher tout ça

Chaque annonce, CMA et email de relance sort mieux quand l'input suit cette forme :

```
[Bien]
Adresse (ou juste quartier + tranche de prix si vous voulez rester discret)
Type : SFH / condo / townhouse / multi-family / terrain / luxe
Chambres / SdB / Surface / Terrain / Année de construction
3-5 caractéristiques qui comptent vraiment (pas « électroménager inox » — dites « Wolf range, table à induction »)
3-5 caractéristiques qui sont des faiblesses mais que vous devez divulguer quand même

[Audience]
Quel est l'acheteur le plus probable ?
Primo-accédants sous X $, famille en move-up, downsizer, investisseur, acheteur de résidence secondaire.
Soyez spécifique. « Couple avec un enfant, un chien, hybride-WFH, veut un jardin » bat « familles ».

[Objectif]
Quel est le livrable ?
Commentaires publics MLS (US : généralement sous 1000 chars ; Canada : plus long OK)
Description Realtor.ca / Zillow / Redfin
Légende Instagram
Email blast à ma liste d'acheteurs
Postcard « just listed »

[Contraintes]
Limite de caractères, rappel fair housing, formules imposées par l'agence, ligne de capture de lead.
```

Sauter la ligne [Audience] est la raison n°1 pour laquelle les commentaires MLS sortent génériques. « Famille en move-up avec deux enfants » produit une copie différente de « empty-nester qui downsize depuis une maison de 4000 sqft ».

---

## Le raccourci CMA

Quand vous demandez à une IA de faire un CMA, donnez-lui les données exactement dans cette forme et vous obtiendrez une fourchette de prix défendable dès le premier passage :

```
Bien sujet :
Adresse, chambres, sdb, surface, terrain, année, condition (1-10), caractéristiques notables.

Comps (3-6, vendus dans les 180 derniers jours, dans un rayon d'env. 1,6 km, profil similaire) :
Pour chacun : adresse, prix vendu, date vendue, chambres, sdb, surface, terrain, année, condition, jours sur le marché, et UNE phrase sur ce qui le rend comparable ou où il diffère.

Actifs ou en attente (2-3) :
Même format. Prix listé pour les actifs, prix de contrat si disponible pour les en attente.

Mon avis :
« Je pense que ça vaut X $ à Y $ parce que Z. » Même si vous n'êtes pas sûr, écrivez une estimation.
```

La ligne « Mon avis » est critique. Elle ancre l'IA à votre jugement au lieu de générer un prix depuis des moyennes brutes, ce qui est la façon dont on finit avec un CMA qui ne survit pas au rendez-vous d'annonce.

---

## Le meta-prompt honnête

Avant de demander à l'IA n'importe quelle copie destinée au client, ajoutez cette ligne en préambule :

> « Écris ça comme si tu avais marché dans la propriété avec moi hier. Utilise les détails que je t'ai donnés. Saute tout ce que je n'ai pas dit. »

Ça réduit fiablement les clichés immobiliers et force l'IA à utiliser vos vrais inputs au lieu de recycler des phrases toutes faites du genre « primary suite luxueuse ».

---

## Fair housing et garde-fous légaux

L'agent est responsable de la conformité. L'IA assiste. Mais ce kit refuse de produire certaines choses même quand on le lui demande :

- Aucun langage qui oriente vers ou loin des classes protégées. US : race, couleur, religion, sexe, handicap, statut familial, origine nationale (Fair Housing Act). Canada : classes protégées similaires sous les codes provinciaux des droits de la personne ; l'Ontario ajoute la réception d'aide publique.
- Aucune affirmation sur la qualité des écoles. « À distance de marche de l'école élémentaire » est OK. « Écoles les mieux notées » ne l'est pas — les limites changent, les notes sont subjectives, et ça code comme un signal démographique.
- Pas de « parfait pour les jeunes familles » ou « idéal pour célibataire ». Décrivez le bien, pas l'acheteur.
- Aucune affirmation vérifiable (frais HOA, surface depuis des sources pas à jour, taille de terrain depuis des relevés obsolètes, taxes) sans une note « à vérifier avec X » dans le brouillon de l'agent.

Si vous êtes un agent canadien, l'IA suivra le Code d'éthique de l'ACI et votre régulateur provincial (RECO en Ontario, OREA, RECA en Alberta, BCFSA en CB). Précisez votre juridiction d'emblée.

---

## Le prompt de profil de quartier

Pour les dossiers d'annonce, les emails de bienvenue acheteur et le contenu « je viens d'arriver dans la région ». Collez ceci :

```
Génère un profil de quartier d'une page pour [nom du quartier, ville]. Audience : un acheteur qui déménage de l'extérieur et veut savoir à quoi ressemble la vie au quotidien, pas juste des stats.

Couvre, dans cet ordre, en 2-4 phrases chacune :
1. Ce que ça donne d'y vivre (mix architectural, ambiance des rues, vibe — décris, ne note pas)
2. Walkability et transports (spécifique : « 10 min à pied jusqu'à la ligne X, 25 min jusqu'au centre-ville »)
3. Où les gens font les courses, prennent un café, vont chez le coiffeur, promènent le chien
4. Écoles qui desservent le secteur (NOMME-les ; ne les classe pas ; rappelle à l'acheteur de vérifier les zones)
5. Pattern de ventes récentes : prix de vente médian, jours sur le marché typiques, % au-dessus/en-dessous du prix listé (90 derniers jours)
6. Ce qu'il y a à proximité que les acheteurs demandent souvent (parcs, hôpitaux, grandes surfaces, accès à l'aéroport)
7. Un compromis honnête que quelqu'un qui vit là pourrait mentionner

Saute : tout ce qui touche à la démographie des résidents. Pas de « parfait pour les familles ». Pas de « en plein essor ». Pas de « très recherché ».
```

La ligne « un compromis honnête » est ce qui fait que le profil donne l'impression qu'un vrai humain l'a écrit au lieu d'une copie marketing.

---

## Social et open house

Deux patterns qui couvrent 90 % de ce dont vous avez besoin.

**Promo d'open house (légende Instagram / Facebook) :**

```
Génère une légende d'open house pour :
- Adresse (ou nom de rue seulement)
- Date, heure de début, heure de fin
- 3 attraits spécifiques (pas « cuisine incroyable » — nomme la vraie chose : « nouvelle plaque à induction, garde-manger walk-in, îlot en bloc de boucher »)
- Prix
- Hashtags : ville, quartier, « openhouse », tag de mon agence

Garde-la sous 150 mots. Termine par un call-to-action doux — pas « DM moi !! » — quelque chose comme « Passez, apportez vos questions ».
```

**Post just-sold (Instagram / LinkedIn) :**

```
Génère un post just-sold pour [adresse ou quartier + tranche de prix].

Cadre : un bref arc narratif — combien de temps sur le marché, ce que les acheteurs cherchaient, ce qui a fait que celui-ci a marché.
Saute : se vanter du prix, l'énergie « encore un de bouclé ! », tout nom de client ou détail identifiant sans permission.
Termine par : une seule ligne offrant d'aider la prochaine personne qui cherche dans ce secteur.

Version LinkedIn : 80-120 mots, professionnel.
Version Instagram : 50-80 mots, image-driven.
```

---

## Ce que ce kit NE FERA PAS pour vous

- Remplacer votre connaissance locale du marché. L'IA n'a aucune idée que le cul-de-sac inonde au printemps ou que l'école vient d'avoir un nouveau directeur.
- Tirer des données MLS en temps réel. Vous lui fournissez les comps ; elle travaille avec ce que vous lui donnez.
- Donner des conseils juridiques. Si une clause vous semble bizarre, demandez à votre courtier ou à un avocat immobilier.
- Générer des signatures, divulgations ou contrats. Utilisez vos formulaires.
- Remplacer un rendez-vous d'annonce. Le prompt CMA affine vos chiffres ; il ne remplace pas le fait d'être assis à la table de cuisine de quelqu'un.

---

## Les deux choses que l'IA rate dans ce domaine

1. **Elle inventera des faits sur le quartier.** Si vous demandez un profil de quartier sans lui donner votre connaissance locale, elle inventera avec assurance des noms de cafés, des lignes de transport et des zones scolaires. Donnez-lui toujours les noms. Si vous ne pouvez pas, marquez tout ce qui est généré comme « à vérifier avant envoi ».

2. **Elle part par défaut sur du fleuri.** Les sorties d'IA en immobilier tendent vers « stunning », « boasts », « nestled », « must-see ». Le meta-prompt ci-dessus en tue la plupart. Si un brouillon contient encore ces mots, demandez : « Enlève chaque adjectif qui ne fait pas de travail. Remplace par des spécifiques. »

---

## Documents compagnons

- `optimization-pack.md` — system prompt à coller pour n'importe quel outil d'IA
- `custom-gpt-instructions.md` — setup pour Custom GPT ChatGPT
- `quick-start.md` — setup de 60 secondes par plateforme
- `templates/listing-descriptions.md` — copie d'annonce par type de bien, avec exemples travaillés
- `templates/cma-prompt.md` — prompt CMA + trois scénarios de comps travaillés
- `templates/buyer-seller-followups.md` — cadences d'emails j0/3/7/14/30 pour les deux pistes
