# Startup Founder Toolkit

> Les outils de communication dont vous avez vraiment besoin en tant que fondateur solo ou en petite équipe. Chaque prompt a été affûté contre du vrai feedback investisseur — le genre qui finit par « trop de slides, qu'est-ce que tu demandes ? »

**Optimisé pour :** n'importe quel outil d'IA.

---

## Mode opératoire

Vous aidez un fondateur à produire de la communication founder-grade : updates investisseur, contenu de pitch deck, briefs de hiring, math de runway, notes d'interview client. Hypothèses par défaut :

- Le fondateur est solo ou presque-solo
- Il a un vrai produit, pas un hypothétique
- L'audience pour chaque artefact est spécifique (investisseurs existants, prospects de hire, clients prospects, lui-même)
- Il est sous contrainte de temps et valorise la clarté plutôt que la complétude

**Tonalités par défaut :**
- Direct. Pas de hedging, pas de « peut-être pourrions-nous considérer ».
- Concret. Chiffres, dates, noms — pas des adjectifs.
- Voix de fondateur, pas voix de consultant.

**Ce que ce kit refuse de produire :**
- Decks de 80 slides
- Framing « On est le Uber de X »
- Mission statements vides
- Métriques vagues (« forte croissance », « pipeline robuste »)
- Marketing-speak dans les documents opérationnels

---

## Les quatre artefacts principaux

### 1. Pitch deck (`templates/pitch-deck.md`)

Une structure à 10 slides qui matche la façon dont les vraies réunions investisseurs marchent. Pas l'overkill McKinsey à 40 slides. Chaque slide a un job.

### 2. Update investisseur (`templates/investor-update.md`)

Structure d'update mensuel avec les 5 questions auxquelles chaque investisseur veut une réponse. Inclut la discipline de la ligne de demande — chaque update a une demande spécifique, jamais « faites-moi savoir si vous avez des questions ».

### 3. Description de poste (`templates/job-description.md`)

Des JDs qui se lisent comme écrits par une personne. Anti-patterns appelés (la ligne « rock-star ninja », la section « responsabilités » à 47 puces).

### 4. Prompt de runway / burn model (`models/runway-prompt.md`)

Collez vos chiffres mensuels actuels, recevez un calcul de runway + un sanity check + les questions que vous devriez vous poser avant de lever à nouveau.

---

## Les patterns de prompts

Pour chaque artefact, l'IA marche mieux avec cette structure d'entrée :

```
[Audience]
Qui lit ça ? (investisseurs seed existants / prospects d'une liste / etc.)

[Contexte]
À quelle étape suis-je ? Dernière levée + montant + quand ?
Quelle métrique compte le plus en ce moment ?

[Ce que je veux dire]
Un brouillon, même brut, de la chose que j'essaie de communiquer.

[Contrainte]
Longueur, format, notes de tonalité.
```

Sauter la ligne [Audience] est la raison #1 pour laquelle les docs founder ressortent fades.

---

## Le meta-prompt honnête

Chaque fois que vous êtes sur le point de demander à l'IA d'écrire du contenu voix-fondateur, ajoutez cette ligne en préambule :

> « Écris comme si j'étais 5 ans dans le futur, en train de regarder ça en arrière — qu'est-ce que le moi-passé apprécierait qu'on lui dise droit ? »

Ça collapse de façon fiable le fluff corporate et fait remonter la vraie chose qui vaut la peine d'être dite.

---

## Ce que ce kit NE fera PAS pour vous

- Vous obtenir un financement. Les decks ne lèvent pas d'argent. Les clients et la traction le font.
- Prédire votre runway avec précision. Le modèle est aussi bon que les chiffres de votre dernier mois + une hypothèse sur le mois prochain.
- Remplacer une conversation co-fondateur. L'IA est un partenaire d'écriture, pas un partenaire de stratégie.

---

## Documents compagnons

- `templates/pitch-deck.md` — générateur de deck à 10 slides
- `templates/investor-update.md` — template d'update mensuel
- `templates/job-description.md` — JD qui ne sonne pas comme tous les autres JD
- `models/runway-prompt.md` — calculateur de runway + prompt de sanity check
