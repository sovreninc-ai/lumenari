# Descriptions d'Annonce par Type de Bien

Cinq types de biens, cinq modèles de prompts, cinq exemples de sortie travaillés. Utilisez le prompt tel quel ou comme point de départ. Les exemples travaillés vous montrent à quoi ressemble du bon avant que vous ne génériez le vôtre.

---

## Comment utiliser ce fichier

1. Trouvez le type de bien qui matche votre annonce
2. Copiez le bloc de prompt
3. Remplacez les inputs entre crochets par les détails de votre bien
4. Collez dans votre outil d'IA (après avoir chargé `optimization-pack.md` comme system prompt)
5. Comparez à l'exemple travaillé pour gut-check la sortie

Le system prompt fait le gros du travail sur structure, ton et conformité fair housing. Ces templates donnent juste à l'IA les inputs spécifiques dont elle a besoin pour chaque type de bien.

---

## 1. Maison unifamiliale (SFH)

### Prompt

```
Écris des commentaires publics MLS pour cette maison unifamiliale.

Bien :
- Adresse ou quartier : [nom]
- Chambres : [#] / SdB : [#] / Sqft : [#] / Terrain : [taille]
- Année de construction : [année]
- Style : [Craftsman / Colonial / ranch / contemporain / etc.]
- Condition : [prête à emménager / légèrement mise à jour / entièrement rénovée / besoin de travaux]

Caractéristiques qui comptent (les choses qu'un acheteur remarquerait réellement) :
- [caractéristique 1 — spécifique, pas « incroyable »]
- [caractéristique 2]
- [caractéristique 3]
- [caractéristique 4]
- [caractéristique 5]

Mécanique / mises à jour (année si vous l'avez) :
- [HVAC, toit, fenêtres, électrique, plomberie — listez ce qui est récent]

Extérieur :
- [jardin, deck, patio, garage, parking, clôture]

Spécificités d'emplacement :
- [à distance de marche de X, Y minutes du centre-ville, nom du district scolaire]

Acheteur probable :
- [soyez spécifique — « couple en move-up avec un enfant et un chien, hybride WFH »]

Plateforme : [MLS US / Realtor.ca / Zillow / Redfin]
Limite de caractères : [nombre]
```

### Exemple de sortie travaillé

**Inputs utilisés :** Craftsman 4 chambres / 2,5 sdb / 2 180 sqft à Bridgeland (Calgary), construit 2009, cuisine légèrement mise à jour 2023, sur un terrain de 0,14 acre. Wolf range, îlot en bloc de boucher, sous-sol fini avec entrée séparée, deck orienté sud, garage double détaché. 7 minutes à pied du LRT. Famille en move-up depuis un townhouse.

**Sortie (Realtor.ca, ~250 mots) :**

Un Craftsman de 2009 entretenu avec soin, situé sur un tronçon calme de Bridgeland à sept minutes à pied du LRT. La mise à jour de cuisine de 2023 a fait le travail qui compte vraiment — Wolf range gaz, îlot en bloc de boucher, armoires à fermeture en douceur — sans perdre la chaleur du plan d'origine. Le parquet court à travers le rez-de-chaussée, avec des perspectives depuis la cuisine jusqu'au deck orienté sud.

L'étage abrite quatre chambres, dont une principale avec dressing walk-in et salle de bain trois pièces ensuite. Le sous-sol est entièrement fini avec entrée séparée sur le côté de la maison, ce qui ouvre des options de suite nounou ou de séjour prolongé selon ce dont vous avez besoin.

Le terrain fait juste un peu plus de 6 000 pieds carrés, entièrement clôturé, avec un garage double détaché en bordure de ruelle arrière. Toit récent (2021), chaudière à haute efficacité et climatisation centrale. L'exposition sud à l'arrière fait que le deck capte le soleil de la fin de matinée au début de soirée — bien pour le chien, bien pour le jardin, bien pour un café un samedi.

Bridgeland a peu besoin de présentation : courte marche jusqu'à OEB, Lukes et les sentiers de la rivière ; transit jusqu'au centre-ville en moins de quinze minutes. Inglewood et East Village se font à vélo facilement. Les écoles sont zonées à Langevin et Crescent Heights — l'acheteur doit confirmer les zones actuelles avec la CBE.

---

Choses à vérifier avant publication :
- Année du toit (2021)
- Âge du HVAC
- Zone scolaire actuelle avec la CBE

---

## 2. Condo / townhouse

### Prompt

```
Écris des commentaires publics MLS pour ce condo ou townhouse.

Bien :
- Nom de l'immeuble / complexe : [nom]
- Type d'unité : [condo / townhouse / loft / penthouse]
- Chambres : [#] / SdB : [#] / Sqft : [#]
- Année de construction : [année]
- Étage : [# sur #]
- Exposition : [N/S/E/O]

Caractéristiques :
- [caractéristique 1]
- [caractéristique 2]
- [caractéristique 3]
- [caractéristique 4]

Équipements de l'immeuble (listez uniquement ceux qui intéressent l'acheteur) :
- [gym / piscine / concierge / rooftop / parking / stockage / pet-friendly avec restrictions]

Frais :
- HOA / frais de copro : [montant] $ / mois — ce que ça couvre
- Taxes foncières : [montant] $ / an (si vous l'avez ; sinon [À CONFIRMER])

Emplacement :
- [à distance de marche de X, transit, ambiance du quartier]

Acheteur probable :
- [primo-accédant, downsizer, investisseur, professionnel urbain]

Plateforme : [MLS]
Limite de caractères : [nombre]
```

### Exemple de sortie travaillé

**Inputs utilisés :** condo 2 chambres / 2 sdb / 985 sqft, 14e étage, exposition sud-est, dans un immeuble de 2017 au centre-ville d'Austin. Nouvel électroménager inox, comptoirs en quartz, lessive dans l'unité. L'immeuble a gym, piscine sur le toit, concierge 24h/24. HOA 640 $/mois inclut eau, gaz, équipements. Acheteur probable : professionnel urbain, premier condo en centre-ville, va au bureau à pied.

**Sortie (MLS US, ~150 mots) :**

Un deux-chambres orienté sud-est au quatorzième étage d'un high-rise de 2017 — lumière du lever de soleil dans la chambre, vues sur le centre-ville depuis le salon, les deux à la fois si vous avez de la chance avec la saison. Plan ouvert avec comptoirs en quartz, électroménager inox et un îlot qui accueille trois personnes. Les deux chambres sont de vraies chambres, pas une-et-une-flex ; la seconde a une fenêtre et un vrai placard.

Lessive dans l'unité, une place de garage assignée, unité de stockage séparée. Les équipements de l'immeuble suivent la liste standard — piscine sur le toit, gym, concierge 24h/24 — et l'emplacement vous met à six minutes à pied de Congress, huit de Whole Foods, quinze de l'entrée du sentier de Lady Bird.

HOA 640 $/mois couvre eau, gaz et accès aux équipements. Pet-friendly avec restrictions de poids.

---

Choses à vérifier avant publication :
- Taxes foncières (non fournies)
- Limite exacte de poids pour les animaux
- Dimensions de l'unité de stockage

---

## 3. Luxe

### Prompt

```
Écris des commentaires publics MLS pour ce bien de luxe.

Bien :
- Adresse ou quartier : [nom]
- Type : [domaine / penthouse / waterfront / construction neuve]
- Chambres : [#] / SdB : [#] / Sqft : [#] / Terrain : [taille]
- Année de construction : [année] (ou « Construction custom, achevée en [année] »)
- Architecte / constructeur : [nom si notable]

La seule caractéristique qui fait ce bien :
- [la chose unique — la vue, l'architecte, l'emplacement, l'intimité, le bord de lac]

Trois à cinq autres spécifiques notables :
- [caractéristique, avec marque ou détail]
- [caractéristique]
- [caractéristique]
- [caractéristique]

Extérieur / terrain :
- [superficie, frontage d'eau, vues, jardin, piscine, dépendances]

Smart / mécanique :
- [domotique, géothermie, solaire, EV, etc.]

Spécificités d'emplacement :
- [intimité, proximité aéroport, écoles, ville]

Acheteur probable :
- [acheteur de résidence secondaire, relocation cadre, famille qui upgrade de X $ à Y $]

Plateforme : [MLS / portail luxe / site d'agence]
Cible de mots : 250-400 mots (le luxe court plus long)
```

### Exemple de sortie travaillé

**Inputs utilisés :** maison custom 5 chambres / 5,5 sdb / 6 200 sqft à Whistler Cadenza par l'architecte Patkau Associates, achevée 2021, sur 0,42 acre adossée à Whistler Creek. Chauffage géothermique, éclairage Lutron complet, piscine intérieure de longueurs, garage quatre places avec EV, ski-in jusqu'à Creekside. Acheteur probable : acheteur de résidence secondaire depuis Vancouver ou la côte ouest US.

**Sortie (portail luxe, ~350 mots) :**

Un design de Patkau Associates achevé en 2021, posé sur un terrain Cadenza de 0,42 acre qui s'adosse directement à Whistler Creek avec accès ski-in jusqu'à Creekside. La maison est une étude de ce qu'une maison de montagne contemporaine peut être quand on donne aux architectes l'espace de travailler — longues courses en cèdre, vitrage pleine hauteur orienté vers le ruisseau et la crête, une suite principale qui s'ouvre sur un deck privé au-dessus de l'eau.

Six mille deux cents pieds carrés sur trois niveaux. Cinq chambres, chacune avec sa propre salle de bain. La cuisine est ancrée par un réfrigérateur et un congélateur colonne Sub-Zero, une cuisinière Wolf avec deux fours et un garde-manger butler qui contient un second lave-vaisselle et un évier de préparation. Grand salon avec une cheminée à bois Stuv et des plafonds de six mètres.

Le niveau inférieur abrite une piscine intérieure de longueurs avec un mur en verre sur le ruisseau, une salle de bain quatre pièces côté piscine, une salle media câblée pour Atmos et une chambre de bunk qui dort six. Cave à vin près du hall d'entrée. Éclairage Lutron complet, AV Crestron, chauffage géothermique avec radiant au sol partout et un système HRV équilibré pour l'altitude.

Garage chauffé quatre places, deux chargeurs EV et une zone d'arrivée couverte. Local à skis avec sécheurs de bottes et entrée dédiée au niveau des casiers. Aménagement paysager mature avec arbres établis sur trois côtés — l'intimité ici est rare même selon les standards Cadenza.

La télécabine de Creekside se fait à quatre minutes à pied via le sentier au fond du terrain. Whistler Village est à six minutes en voiture, l'aéroport à deux heures, Vancouver à une heure quarante-cinq.

Une maison conçue pour un acheteur qui veut que l'architecture fasse partie de l'actif.

---

Choses à vérifier avant publication :
- Confirmer que l'attribution de l'architecte est OK à publier (certaines firmes ont des directives de crédit)
- Frais HOA / strata si applicable
- Taxes foncières (non fournies)
- Statut exact du chemin ski-in (traversée de ruisseau saisonnière ?)

---

## 4. À rénover

### Prompt

```
Écris des commentaires publics MLS pour ce bien à rénover.

Bien :
- Adresse ou quartier : [nom]
- Chambres : [#] / SdB : [#] / Sqft : [#] / Terrain : [taille]
- Année de construction : [année]
- Condition : [besoin cosmétique / besoin systèmes / préoccupations structurelles]

Ce qui est solide (ne cachez pas ce qui fonctionne) :
- [fondation, toit, charpente, terrain, emplacement, mécanique récent]

Ce qui a besoin de travail (soyez direct — l'acheteur le verra de toute façon) :
- [listez honnêtement]

Signal ARV des comps :
- [rénovations récentes dans le secteur vendues à X $/sqft — ça informe le calcul de l'acheteur]

Acheteur probable :
- [flipper, propriétaire occupant sweat-equity, constructeur, famille de contractor]

Plateforme : [MLS]
Limite de caractères : [nombre]
Ton : factuel, pas d'euphémismes. « Besoin de peinture et de revêtement de sol » est OK. « Apportez votre imagination » ne l'est pas.
```

### Exemple de sortie travaillé

**Inputs utilisés :** bungalow 3 chambres / 1 sdb / 1 150 sqft de 1958 à East Vancouver, terrain 33 x 122. Cuisine d'origine, sdb d'origine, chauffage au mazout (cuve au-dessus du sol, récente), toit fait en 2019, fondation sèche. Rénovations récentes sur la rue se vendant à 1,8M $+. Acheteur probable : constructeur ou propriétaire occupant sweat-equity.

**Sortie (MLS US, ~180 mots) :**

Un bungalow de 1958 sur un terrain plat 33 x 122, prêt pour que le prochain propriétaire y mette du travail. Le toit a été remplacé en 2019. La fondation est sèche. Chauffage au mazout, avec la cuve au-dessus du sol et inspectée l'an dernier. La cuisine et la salle de bain sont d'origine. Les sols sont du parquet d'origine sous la moquette dans les pièces principales.

Trois chambres en haut, un sous-sol non fini avec potentiel d'entrée séparée, abri d'auto simple. Le terrain est zoné RT-7 avec accès latéral pour les corps de métier.

La charpente est la valeur ici. Des rénovations récentes sur le même pâté de maisons se sont vendues au nord de 1,8M $. Le prochain propriétaire est soit un constructeur qui le ramène à la structure, soit une famille de contractor qui en fait son premier projet East Van, soit un flipper avec un scope clair. Les chiffres marchent dans tous les cas si vous y allez en connaissance de cause.

Apportez un contractor à la visite. Inspection bienvenue.

---

Choses à vérifier avant publication :
- Calendrier de mise hors service de la cuve à mazout (la CB a des règles)
- Spécifiques du zonage RT-7 avec la ville
- Abri d'auto vs garage sur le titre

---

## 5. Multi-family

### Prompt

```
Écris des commentaires publics MLS pour ce bien multi-family / d'investissement.

Bien :
- Adresse ou quartier : [nom]
- Type : [duplex / triplex / fourplex / 5+]
- Total des unités : [#]
- Sqft total (immeuble) : [#]
- Terrain : [taille]
- Année de construction : [année]

Mix d'unités :
- Unité 1 : [chambres/sdb/sqft/loyer actuel ou « vacant »]
- Unité 2 : [chambres/sdb/sqft/loyer actuel ou « vacant »]
- (répéter pour toutes les unités)

Financiers (uniquement si le vendeur a approuvé le partage) :
- Loyer brut mensuel : [montant] $
- Dépenses annuelles : [montant] $
- NOI : [montant] $
- Taux de capi au prix listé : [%]

Capex / condition :
- [mises à jour récentes, maintenance différée, âge des systèmes]

Locataires :
- [mois à mois / baux à durée fixe / vacant / mix]

Acheteur probable :
- [propriétaire occupant house-hacker / investisseur / acheteur 1031 / portfolio builder]

Plateforme : [MLS / portail multi-family commercial]
Limite de caractères : [nombre]
Ton : centré investisseur. Chiffres d'emblée. Sautez la copie lifestyle.
```

### Exemple de sortie travaillé

**Inputs utilisés :** triplex à Hamilton, ON. Construit en 1962. Trois unités 2 chambres, ~750 sqft chacune. Loyers actuels : 1 400 $ / 1 650 $ / vacant. Toit 2020, chaudières 2018 (chaque unité comptée séparément), quatre places de parking. Acheteur probable : investisseur avec portfolio local existant.

**Sortie (MLS commercial, ~180 mots) :**

Un triplex en brique de 1962 dans le centre de Hamilton, trois unités deux-chambres d'environ 750 pieds carrés chacune, comptées séparément pour le gaz et l'hydro. Toit remplacé en 2020. Chaudières remplacées en 2018 sur les trois unités. Quatre places de parking hors-rue accessibles depuis la ruelle arrière.

Mix actuel d'unités et loyers : Unité 1 occupée à 1 400 $ (locataire long terme). Unité 2 occupée à 1 650 $ (bail renouvelé 2025). Unité 3 vacante, loyer de marché estimé à 1 750-1 850 $ d'après les unités deux-chambres comparables dans le secteur.

Brut stabilisé au marché : environ 4 900 $ mensuels. Le vendeur peut fournir un T12 complet et un rent roll sur demande via l'agent d'annonce.

L'immeuble a été géré par le propriétaire ces onze dernières années. Dossiers de maintenance disponibles. Deux des trois unités ont eu des mises à jour cosmétiques dans les cinq dernières années ; l'Unité 1 est en condition d'origine.

Ciblé aux investisseurs qui construisent un portfolio local ou aux propriétaires occupants à l'aise avec des tâches de propriétaire-bailleur légères. Dynamiques AGI / N12 : demandez à l'agent d'annonce.

---

Choses à vérifier avant publication :
- Confirmer que le vendeur a approuvé le partage des financiers dans les commentaires
- Chiffres T12 (ne pas lister de NOI non vérifié)
- Statut actuel à la CLI sur n'importe quelle unité de l'Ontario
- Légalité de la place de parking (certaines ruelles de Hamilton sont restreintes)

---

## Éditions courantes que l'IA acceptera

Quand le brouillon revient et que vous voulez l'ajuster :

- « Coupe les adjectifs. Remplace chacun par un spécifique. »
- « Réduis à [X] caractères. Garde le lead et le close. »
- « Plus direct. Moins lifestyle. »
- « Ajoute une ligne sur [caractéristique que vous avez oublié de mentionner]. »
- « Rends le close plus doux — pas de points d'exclamation. »
- « Donne voix à ça comme si j'avais marché dans la propriété avec l'acheteur hier. »

Chacune de ces consignes produira un second brouillon visiblement meilleur. L'IA est bien meilleure à éditer vers le spécifique qu'à générer du spécifique depuis un premier prompt mince.
