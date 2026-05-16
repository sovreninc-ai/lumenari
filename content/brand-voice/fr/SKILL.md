# Brand Voice Builder

> Donnez à l'IA 3-5 échantillons d'écriture que vous aimez vraiment, et elle produit un profil de voix réutilisable que vous pouvez appliquer à chaque future ressource. Remplace le livrable de consultant brand voice à 5 000 $ que personne n'a jamais rouvert deux fois.

**Optimisé pour :** n'importe quel outil d'IA — Claude, ChatGPT, Gemini. Meilleurs résultats quand vous sauvegardez le profil de voix extrait et le réutilisez à travers les sessions.

---

## Mode opératoire

Vous aidez un fondateur, un marketer ou un freelance à extraire un profil de voix utilisable depuis un petit nombre d'échantillons d'écriture, puis à appliquer cette voix à du nouveau contenu. Hypothèses par défaut :

- L'utilisateur a 3 à 5 échantillons qui représentent comment il veut sonner (sa propre écriture, des posts préférés des clients, un concurrent qu'il admire)
- Il n'est pas un brand strategist et ne veut pas d'un document de 50 pages
- La sortie doit être réutilisable — un fichier de profil unique que l'utilisateur peut recoller au début de toute future session
- Il fera tourner la voix sur des emails, du landing copy, de l'ad copy, des intros de blog et des social posts — pas des romans

**Tonalités par défaut :**
- Le profil est un outil de travail, pas un livrable. Des puces et de courts tableaux, pas des paragraphes sur des archétypes de marque.
- Observations concrètes uniquement — « utilise des fragments de phrase pour l'emphase » est utile ; « se sent accessible » ne l'est pas.
- Les exemples travaillés battent les adjectifs. Chaque affirmation sur la voix reçoit une ligne citée d'un échantillon.

**Ce que ce kit refuse de produire :**
- Bibles de marque de 50 pages
- Attributions d'archétype jungien (« vous êtes le Sage / Hors-la-loi / Magicien »)
- Palettes de couleurs, polices ou guidance logo — c'est la voix, pas l'identité visuelle
- Empilements d'adjectifs génériques (« audacieux, confiant, plein d'esprit, authentique »)
- Paragraphes « mission statement » ou « essence de marque »
- Un profil de voix basé sur zéro échantillon — si l'utilisateur n'en a fourni aucun, le kit en demande

---

## Les quatre artefacts principaux

### 1. Extracteur échantillon-vers-voix (`templates/sample-to-voice.md`)

Collez 3-5 échantillons. Récupérez un profil de voix structuré avec : matrice d'attributs de voix (quatre axes), tendances de structure de phrase, signatures de vocabulaire, marqueurs de rythme et dispositifs de framing récurrents. Chaque trouvaille cite une ligne spécifique des échantillons.

### 2. Prompt d'application de voix (`templates/voice-application.md`)

Collez le profil sauvegardé + un brouillon générique. Récupérez une réécriture qui matche la voix. Inclut un self-check à la fin — l'IA signale toute ligne dont elle n'est pas sûre qu'elle passe le test on-brand.

### 3. Détecteur de drift de voix (`playbooks/voice-drift-detection.md`)

Pour quand vous soupçonnez la sortie IA d'avoir glissé vers le défaut corporate. Une courte rubrique que l'IA fait tourner contre tout brouillon, notant chaque section comme on-voice / drift / off-voice et pointant vers la phrase exacte qui a déclenché le call.

### 4. Le profil de voix lui-même

Le livrable de l'étape 1. Vous sauvegardez ce fichier comme `voice-profile.md` (ou collez-le dans une project memory) et le réutilisez pour toujours. Le format est conçu pour être machine-readable sur son retour dans le prompt suivant.

---

## La matrice d'attributs de voix

Chaque profil de voix note quatre axes de 1 à 5 :

```
Formel       1 ——————— 5   Décontracté
Sérieux      1 ——————— 5   Ludique
Direct       1 ——————— 5   Diplomate
Technique    1 ——————— 5   Accessible
```

Un score de 3 signifie « atterrit au milieu sur cet axe ». Un score de 1 ou 5 signifie « c'est un trait load-bearing — ne le violez jamais ». L'IA est instruite de pondérer les 1 et les 5 le plus lourdement quand elle applique la voix à du nouveau copy.

Une sortie travaillée ressemble à :
- **Formel/Décontracté : 4** — utilise des contractions, lâche les articles pour le punch (« Construit ça pour X »), mais jamais slangy
- **Sérieux/Ludique : 2** — sec plutôt que goofy ; les rares blagues atterrissent par compréhension, pas par chute
- **Direct/Diplomate : 5** — ouvre avec la demande, pas d'échauffement
- **Technique/Accessible : 3** — utilise des mots de domaine mais les définit dans la même phrase

C'est le genre de détail qui rend un profil utile. « Authentique et audacieux » ne l'est pas.

---

## Les patterns de prompts

En extrayant une voix, la forme d'entrée est :

```
[Échantillons]
Collez 3-5 échantillons d'écriture qui sonnent comme vous voulez sonner.
Labellisez chacun (mon post LinkedIn / intro de blog préférée des clients / etc).

[Contexte]
Qui lit la sortie de cette voix ? (acheteurs B2B prospects / parents de gamins de soccer / etc.)
Pour quoi c'est généralement ? (pages de vente / newsletter hebdo / cold emails / tout ça)

[Contraintes]
Quoi que ce soit hors-limites ? (pas de gros mots / pas de première personne / ne jamais mentionner les concurrents par leur nom)
```

En appliquant une voix :

```
[Profil de voix]
Collez le profil sauvegardé.

[Brouillon]
Collez le copy brut ou générique que vous voulez réécrit.

[Objectif]
Pour quoi c'est, et quelle est l'action désirée du lecteur ?
```

Sauter le bloc [Profil de voix] est comme vous finissez avec une sortie IA générique. Le profil est la pièce load-bearing.

---

## Exemple travaillé : 3 paragraphes en entrée, profil de voix + réécriture en sortie

**Entrée — trois échantillons :**

> Échantillon 1 (LinkedIn) : « Viens de finir l'appel. Refus net. Ils voulaient un engagement de 12 mois et ne diront pas à quoi ressemble le succès. Je vous économise la même conversation : demandez ce que signifie le succès avant de demander ce que ça coûte. »

> Échantillon 2 (intro newsletter) : « Trois semaines de silence. Désolé — j'étais à fond dans la réécriture. De retour maintenant. Voilà ce qui a changé. »

> Échantillon 3 (hero de landing page) : « Vous n'avez pas besoin d'un autre framework. Vous avez besoin de shipper une chose cette semaine. La voici. »

**Profil extrait :**
- Formel/Décontracté : **4** (contractions partout, fragments pour le punch)
- Sérieux/Ludique : **2** (pas de blagues, asides secs)
- Direct/Diplomate : **5** (chaque ouverture démarre avec le verdict)
- Technique/Accessible : **2** (zéro jargon, deuxième personne, phrases courtes)
- **Structure de phrase :** moyenne ~9 mots. Usage lourd d'ouvertures à deux temps. Fragments de phrase fréquents.
- **Signatures de vocabulaire :** « refus net », « ship », « voici / voici ce qui a changé ». Évite : « leverage », « synergie », « stakeholder ».
- **Dispositif de framing :** verdict d'abord. Appelle le prochain mouvement probable du lecteur avant qu'il le fasse.
- **Anti-patterns à signaler :** toute phrase commençant par « Dans le monde actuel au rythme rapide... ». Tout usage de « transformer », « débloquer », « élever ».

**Brouillon générique à réécrire :**
> « Nous sommes ravis d'annoncer le launch de notre nouvelle plateforme conçue pour aider les fondateurs occupés à streamliner leurs opérations quotidiennes via la technologie IA de pointe. »

**Réécrit dans la voix :**
> « Nouveau truc live. C'est pour les fondateurs qui gâchent leur journée sur les mêmes cinq tâches admin. Environ une minute pour le setup. Le voici. »

C'est le test. Si vous pouvez faire tourner le même brouillon générique à travers les deux versions et sentir la différence dans vos tripes, le profil marche.

---

## Ce que l'IA se trompe sans ce kit

1. **Elle moyenne vers la voix LinkedIn.** Chaque sortie finit par sonner comme le post LinkedIn médian — vaguement inspirant, vaguement autoritaire, zéro tranchant. Le profil bloque ça en faisant que l'IA défende chaque ligne contre la rubrique de voix.
2. **Elle défaut sur une structure en trois actes.** L'IA générique adore « D'abord... Puis... Enfin... ». La plupart des voix distinctives ne bougent pas comme ça. Le profil capture les vraies tendances de structure de phrase et override le défaut.
3. **Elle utilise des mots que vous ne diriez jamais.** Sans signature de vocabulaire, l'IA vous donnera « leverage », « élever », « transformer » et « best-in-class » peu importe combien de fois vous demandez non. Le kit fait que l'IA maintient une liste de ban explicite tirée des échantillons (mots que l'utilisateur n'a jamais utilisés) et une allow list (mots qu'il reprend de façon répétée).

---

## Ce que ce kit NE fera PAS pour vous

- Écrire du copy meilleur que vos échantillons. L'extraction de voix est un plafond, pas un multiplicateur — si vos échantillons sont moyens, les réécritures seront moyennes.
- Remplacer le fait d'avoir quelque chose à dire. Une voix sans point de vue sonne étrange. Utilisez ce kit sur de l'écriture qui a déjà des opinions, pas sur du remplissage.
- Attraper chaque drift. Refaites tourner le détecteur de drift sur toute ressource à fort enjeu (page de vente, post de levée, manifeste) avant de shipper.
- Survivre à un changement de co-rédacteur. Si une personne différente écrit le prochain batch de brouillons, le profil a besoin de nouveaux échantillons de cette personne pour rester précis.

---

## Documents compagnons

- `templates/sample-to-voice.md` — prompt extracteur + schéma de sortie de profil
- `templates/voice-application.md` — appliquer un profil sauvegardé à tout brouillon
- `playbooks/voice-drift-detection.md` — rubrique pour attraper la sortie IA off-voice
- `memory.md` — contexte de domaine pour l'IA : vocabulaire, workflows, erreurs courantes
- `optimization-pack.md` — system prompt autonome pour toute IA conversationnelle
- `custom-gpt-instructions.md` — formaté pour Custom GPT ChatGPT
- `quick-start.md` — installation en 3 étapes
