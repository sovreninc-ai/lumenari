# Lettre de motivation + Réécriture LinkedIn

> Deux artefacts qui partagent une voix. Les lettres de motivation sont lues environ 30 % du temps — écrivez-les quand même, et faites-les courtes. LinkedIn est lu plus souvent que la lettre de motivation et compte plus que les gens ne réalisent.

---

## Partie 1 — La lettre de motivation

### Le prompt

```
Tu écris une lettre de motivation pour l'utilisateur. Règles :

1. Trois paragraphes. ~200 mots au total. Maximum 220.
2. Paragraphe 1 (~50 mots) : ouvre avec une raison spécifique pour laquelle l'utilisateur
   écrit à CETTE entreprise. Référence un produit, une personne, un launch
   récent, ou un problème auquel l'utilisateur a vraiment pensé. JAMAIS
   ouvrir avec « Je vous écris pour postuler au poste de ».
3. Paragraphe 2 (~100 mots) : une histoire concrète qui mappe l'expérience
   de l'utilisateur au JD. Outcome spécifique. Pas un récap du CV.
4. Paragraphe 3 (~50 mots) : ferme avec une étape suivante claire. Confiance
   sans arrogance. Pas de « J'adorerais l'opportunité de discuter ».
5. Voix : sonne comme si l'utilisateur l'avait écrite. Légèrement informel pour
   startups, légèrement formel pour finance ou entreprise. Jamais un
   communiqué de presse. Jamais un humblebrag.
6. Pas de buzzwords (passionné, results-driven, fast-paced, dynamique).
7. Pas de framing « compétences transférables ». Montrez juste le travail.

Sors la lettre de motivation uniquement. Pas de commentaire.
```

### Forme d'entrée

```
[Rôle cible]
Titre, entreprise, une ligne sur ce qu'ils font.

[Hook spécifique]
La chose unique sur cette entreprise par laquelle vous démarreriez. Choisissez exactement une.
Exemples :
- "J'utilise votre produit depuis 18 mois et c'est le seul
  outil dans cette catégorie qui ship à une vraie cadence."
- "J'ai travaillé sur un problème payments similaire chez <prev co> et veux
  passer les 4 prochaines années à approfondir."
- "Je suis l'écriture de <nom du hiring manager> depuis des années et le
  post récent de l'équipe sur l'architecture event-driven a clarifié certaines
  choses sur lesquelles je m'étais trompé."

[L'histoire mappée]
Un projet, deux-à-trois phrases de contexte, l'outcome.

[Énergie de signature]
Confiante, disponible, sans pression.
```

### Exemple travaillé

**Entrée :**

```
[Rôle cible]
Senior Backend Engineer, Payments — Lumenari Co (marketplace d'outillage IA,
~2M$/mois transactions)

[Hook spécifique]
"J'ai construit une stack payments Stripe Connect + Postgres dans un marketplace
faisant un volume similaire les trois dernières années, et votre récent
post de blog engineering sur les retries idempotents de webhooks est exactement la
direction architecturale vers laquelle je pousse mon équipe."

[L'histoire mappée]
Chez Acme, owné le sous-système payments traitant ~4M$/mois. Cut webhook
retry failures 78 % en ajoutant idempotency keys + dead-letter queue.
Mentoré deux engineers intermédiaires, tous deux promus senior en 18 mois.

[Énergie de signature]
Disponible pour parler cette semaine ou la prochaine ; heureux de partager plus de détail sur
le travail de retry-failure si utile.
```

**Sortie que l'IA renvoie :**

```
Maya,

Votre post engineering sur les retries idempotents de webhooks est exactement la
direction architecturale vers laquelle je pousse mon équipe depuis l'an
passé — je vous écris parce que je pense que je peux vous aider à shipper la prochaine couche
de ça.

Pour les trois dernières années j'ai owné une stack payments Stripe + Postgres
chez Acme Co, un marketplace faisant environ 4M$/mois de transactions. Le
travail dont je suis le plus fier : j'ai cut les retry failures de webhooks de 78 % sur six
mois en introduisant idempotency keys et un dead-letter queue, puis
durci la rotation d'on-call assez pour que le volume de pages P1 chute de
douze par mois à trois. En chemin j'ai mentoré deux engineers
intermédiaires ; tous deux sont maintenant seniors. Le morceau mentorship fait partie de pourquoi
je cherche — j'aimerais que le prochain rôle le rende officiel.

Je suis disponible pour parler cette semaine ou la prochaine. Heureux de partager l'architecture
retry-failure en plus de détail si ça pouvait être utile avant une
conversation.

— Alex
```

Ce que cette lettre fait bien :

- Ouvre avec une référence spécifique au contenu engineering de l'entreprise. Le hiring manager sait que vous l'avez vraiment lu.
- Le paragraphe corps nomme outils, chiffres et outcomes — pas un récap de CV.
- Mentionne le mentorship dans la voix de l'utilisateur (« le morceau mentorship fait partie de pourquoi je cherche ») parce que le JD le demandait explicitement.
- Ferme avec disponibilité et une offre douce (l'architecture retry-failure). Pas de « J'adorerais l'opportunité ».

---

## Partie 2 — Réécriture LinkedIn

Trois sections comptent, dans l'ordre : headline, section À propos et le haut d'Expérience.

### Headline (120 caractères max)

Ce que les recruteurs voient dans les résultats de recherche.

**Mauvais :**

```
Senior Software Engineer | Passionate Builder | AWS / TypeScript / React
```

**Mieux :**

```
Senior Backend Engineer — payments, Stripe, Postgres | Mentor | Calgary / Remote
```

Règles que le prompt impose :

1. Démarrer avec le rôle que vous ciblez, pas votre titre actuel si différent.
2. Trois mots-clés spécifiques ensuite — outils que vous utilisez vraiment, pas une salade de stack tech.
3. Troisième segment optionnel : lieu ou disponibilité (« Ouvert au remote NA »).
4. Pas de buzzwords. Pas de « Passionate Builder », « Code Slinger » ou « Tech Enthusiast ».

### Section À propos — les trois premières lignes sont tout

Seuls les ~210 premiers caractères s'affichent avant que « ...voir plus » coupe. Optimisez pour ceux-là.

**Prompt :**

```
Écris la section À propos LinkedIn de l'utilisateur. Règles :

1. Première phrase (~140 car. max) : énoncé de position. Ce qu'il fait,
   pour qui, et un outcome. C'est la seule ligne que beaucoup de recruteurs lisent.
2. Les deux phrases suivantes rentrent dans les ~210 premiers car. au total. Hook le
   lecteur pour cliquer « voir plus ».
3. Longueur totale : 4-6 courts paragraphes, ~150 mots.
4. Première personne, conversationnel. Sonne comme si l'utilisateur l'avait écrit, pas un
   PR.
5. Termine avec un call to action spécifique : « DM-moi si tu recrutes pour
   X », ou « J'écris sur Y sur <lien> », ou « Ouvert aux rôles senior backend
   dans l'espace payments ».
```

**Exemple travaillé :**

```
Je construis de l'infrastructure payments pour marketplaces. Pour les trois dernières
années j'ai owné une stack Stripe + Postgres traitant 4M$/mois chez
Acme Co — webhooks, on-call, mentorship, l'ensemble.

Avant Acme j'étais dans une startup fintech où j'ai appris la leçon
que chaque engineer payments apprend à la dure : l'idempotence n'est pas
optionnelle, les dead-letter queues ne sont pas optionnelles, et le runbook se
lit à 2 h du matin par quelqu'un qui ne l'a pas écrit.

Je tiens à trois choses dans un rôle :
- Des problèmes durs avec de vrais utilisateurs
- Une équipe où le mentorat fonctionne dans les deux sens
- L'autonomie de shipper sans théâtre

Actuellement à Calgary, ouvert aux rôles remote en Amérique du Nord. DM-moi
si tu recrutes pour un senior backend engineer en payments — je suis
exigeant sur où j'irais, et je préfère avoir une bonne
conversation que dix polies.
```

Ce que les premiers 210 car. (~3 lignes) montrent :

```
Je construis de l'infrastructure payments pour marketplaces. Pour les trois dernières
années j'ai owné une stack Stripe + Postgres traitant 4M$/mois chez
Acme Co — webhooks, on-call, mentorship, l'ensemble.
```

C'est le hook. Le recruteur voit rôle, outil, outcome dans le premier paragraphe et sait s'il doit lire plus.

### Section Expérience — haut des rôles actuel et plus récent

LinkedIn tronque après 2-3 lignes par rôle sauf si quelqu'un clique pour étendre. Donc les deux premières lignes de chaque rôle sont l'équivalent du tiers supérieur de votre CV.

**Prompt :**

```
Réécris les 2-3 premières puces du rôle actuel de l'utilisateur sur LinkedIn.
Règles :

1. Première puce : un résumé d'une ligne de scope et d'impact dans ce rôle.
2. Deuxième puce : l'accomplissement le plus pertinent unique pour les
   rôles que l'utilisateur cible.
3. Troisième puce (optionnelle) : un second accomplissement qui montre la range.
4. Mêmes règles de style que le CV : voix active, chiffres spécifiques, pas de
   buzzwords, vocabulaire aligné au JD.
5. Sors le texte formaté LinkedIn uniquement.
```

Sortie d'exemple travaillée :

```
Senior Backend Engineer chez Acme Co
2022 - Présent · Calgary, AB (Remote)

→ Own le sous-système payments et webhooks (Stripe + Postgres + Kafka)
  pour un marketplace faisant ~4M$/mois en transactions.
→ Cut webhook retry failures 78 % en introduisant idempotency keys
  et un dead-letter queue ; pages P1 ont chuté de 75 % sur six mois.
→ Mentor 2 engineers intermédiaires ; tous deux promus senior en 18 mois.
```

---

## Comment les deux artefacts marchent ensemble

La lettre de motivation et la section À propos LinkedIn ne devraient pas être identiques, mais elles devraient partager une voix et une position. Si votre lettre de motivation dit que vous « ownez une stack Stripe dans un marketplace faisant 4M$/mois », votre À propos LinkedIn devrait dire la même chose — formulée différemment. Les recruteurs qui lisent les deux remarqueront si vous sonnez comme deux personnes différentes.

Faites tourner le prompt de lettre de motivation et le prompt d'À propos LinkedIn dos à dos dans la même conversation. L'IA gardera la voix cohérente.

---

## Anti-patterns que le prompt bloque

- « Je vous écris pour postuler au poste de [rôle]. » — Couper à vue.
- « Je suis ravi de l'opportunité de... » — Couper.
- « Veuillez trouver ci-joint mon CV. » — Ils savent. Couper.
- « J'adorerais l'opportunité de discuter comment mes compétences... » — Couper.
- « Tech Enthusiast | Lifelong Learner | Coffee Addict » dans le headline LinkedIn — Couper.
- « Results-driven, detail-oriented self-starter passionate about... » — Couper tout.

Si l'un de ceux-ci passe, prompt : « Élimine chaque cliché de ce brouillon et réécris en langage simple. »
