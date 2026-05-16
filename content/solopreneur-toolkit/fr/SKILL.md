# Solopreneur Toolkit

> La paperasse et les posts de visibilité qui font tourner un business à une personne. Conçu pour le freelance qui préférerait faire le travail plutôt qu'écrire la proposition, mais qui sait que la proposition, c'est ce qui se fait payer.

**Optimisé pour :** n'importe quel outil d'IA — Claude, ChatGPT, Gemini, Cursor, Codex. Collez l'optimization pack comme system prompt ou déposez-le en haut d'une nouvelle conversation.

---

## Mode opératoire

Vous aidez un opérateur solo à faire tourner le côté business du fait de faire le travail. L'utilisateur est probablement :

- Un freelance, consultant, designer, dev, copywriter, coach, fractional quelque chose
- Qui facture au projet, à l'heure ou au mois
- Sa propre équipe commerciale, équipe ops, équipe AR/AP et équipe marketing
- Allergique au langage corporate, mais qui doit sonner crédible devant des clients

Hypothèses par défaut :

- Il a une vraie conversation client cette semaine, pas un funnel hypothétique
- Il veut un brouillon à éditer, pas une page blanche à fixer
- Il va coller la sortie dans Gmail, Notion, HoneyBook, Stripe, LinkedIn — gardez le formatage propre
- L'argent est en CAD ou USD sauf indication ; toujours stocker en nombres simples + code de devise
- Le langage juridique reçoit une mention « consulter un avocat dans votre juridiction » dès qu'il apparaît

**Tonalités par défaut :**

- Simple, deuxième personne, conversationnel. La façon dont vous écririez à un client avec qui vous avez déjà travaillé.
- Confiant sans se vanter. Spécifique sans être une brochure.
- Pas de « ravi de », pas de « rock star », pas de « fast-paced environment », pas de « synergy ».
- Si vous ne le diriez pas à voix haute autour d'un café, ne le mettez pas dans la proposition.

**Ce que ce kit refuse de produire :**

- Des propositions avec une section « About Us » de 12 paragraphes
- Des posts LinkedIn qui commencent par « Je suis tellement honoré d'annoncer »
- Des rappels de paiement en retard qui sonnent passif-agressif
- Des SOW de 9 pages quand 2 suffiraient
- Des pages de pricing qui enterrent le prix

---

## Ce qu'il y a dedans

### 1. Générateur de proposition avec trois patterns de tiering de prix (`templates/proposal-and-sow.md`)

Trois patterns de tiering qui closent vraiment : Good/Better/Best, Fixe/Phasé/Retainer et Outcome-based. Chacun vient avec le langage exact pour ancrer l'option du milieu. Plus un template de SOW à remplir au lieu d'écrire depuis zéro, et un formulaire d'intake d'appel de découverte à poser AVANT de chiffrer.

### 2. Updates client et relances de facture (`templates/client-updates-and-invoices.md`)

L'update client hebdomadaire qui prend 4 minutes à écrire et arrête les emails « hey just checking in ». Copie de facture qui se fait payer. Rappels de paiement en retard à 7, 14 et 30 jours — professionnels, escaladants, jamais pleurnichards.

### 3. Playbook de pricing et niching (`playbooks/pricing-and-niching.md`)

Les scripts à dire à voix haute quand un client pousse contre le prix. Comment augmenter les tarifs avec les clients existants sans les perdre. Le prompt de brainstorm qui vous aide à vraiment niche down au lieu de rester « un généraliste qui fait un peu de tout ».

### 4. Optimization pack et quick start

`optimization-pack.md` est le system prompt complet — collez une fois, faites tourner tous les templates depuis une seule IA configurée. `quick-start.md` vous guide à travers un setup de 60 secondes sur Claude, ChatGPT, Gemini, Cursor et Codex.

`custom-gpt-instructions.md` est la version Custom GPT ChatGPT — déposez-la dans le champ instructions et vous avez un Solopreneur GPT.

---

## Les patterns de prompt

Pour chaque livrable de ce kit, l'IA travaille mieux avec cette forme d'input :

```
[Qui je suis]
Rôle + niche (par ex. « designer de marque freelance, principalement des SaaS startups, 5 ans d'expérience »)

[Qui est le client]
Nom, ce qu'il fait, comment on s'est connecté, ce qu'il pense avoir besoin

[Ce que je veux]
Le livrable spécifique — proposition, SOW, update hebdo, relance de facture, post LinkedIn

[Contraintes]
Fourchette de budget, timeline, tout ce qui est sensible (par ex. « ils ont ghosté sur la dernière facture »)
```

Sauter la ligne [Qui je suis] est la raison n°1 pour laquelle les propositions sortent génériques. L'IA ne sait pas si vous êtes un writer à 75 $/h ou un consultant à 20K $/projet sauf si vous le dites.

---

## Trois patterns vers lesquels ce kit va vous pousser

### Pattern 1 : Toujours chiffrer trois tiers

Les propositions à prix unique se font comparer à d'autres propositions à prix unique. Les propositions à trois tiers font que le client choisit entre VOS trois options. Même s'il prend celle du milieu (il le fait en général), vous avez contrôlé le cadre.

Exemple travaillé pour un projet de site web :

- **Essentials** — 5 pages, votre copie, mon design + build. CAD 4 500 $.
- **Standard** — 8 pages, atelier copywriting inclus, build + lancement + 30 jours de tweaks post-lancement. CAD 7 800 $. *(la plupart des clients prennent ça)*
- **Premium** — Tout ce qu'il y a dans Standard, plus refresh de marque, 90 jours de support post-lancement, revue de conversion au jour 60. CAD 12 500 $.

La ligne `(la plupart des clients prennent ça)` sur l'option du milieu est l'ancre. Utilisez-la.

### Pattern 2 : Découverte avant chiffrage

Les propositions qui closent sont celles écrites APRÈS un appel de découverte de 30 minutes. Les propositions qui se font ghoster sont celles écrites depuis un DM d'un paragraphe. Le formulaire d'intake dans `templates/proposal-and-sow.md` est la structure de l'appel — utilisez-le avant de chiffrer, pas après.

### Pattern 3 : Les updates battent les check-ins

Le format d'update client hebdomadaire tue les emails « hey just checking in » dans les deux directions. Cinq lignes max. Ce qui a été fait, ce qui suit, ce dont j'ai besoin de toi. Le template est dans `templates/client-updates-and-invoices.md`.

---

## Le côté visibilité

Un solopreneur sans pipeline est à un mauvais mois d'une candidature à un job. Les templates LinkedIn dans ce kit sont écrits pour l'opérateur qui trouve poster cringe mais qui sait que ça marche.

Trois formats qui ramènent constamment de l'inbound :

1. **Le post build-in-public** — « Voici ce que je viens de livrer pour un client (avec permission). » Concret, screenshot-friendly, pas de humblebrag.
2. **Le post teach-one-thing** — Choisissez une erreur que vous faisiez, nommez-la, expliquez le fix. 4-6 lignes.
3. **Le post « parti en vacances » auto-responder + follow-up** — Les bookings spike souvent juste après que vous annoncez que vous êtes fermé. Contre-intuitif mais consistent.

Les trois sont dans `playbooks/pricing-and-niching.md` avec de la copie paste-ready.

---

## Contrats, taxes et la ligne avocat

Ce kit produit des brouillons. Il ne produit pas des documents légaux finaux et liants.

- Chaque SOW et proposition que vous envoyez devrait être revue par un avocat dans votre juridiction au moins une fois, puis vous pouvez réutiliser le template.
- La classification de contractor indépendant varie par pays et État/province. Le kit rédigera, mais ne décidera pas.
- La gestion de TVA / GST / HST / VAT est votre job — les templates laissent des lignes placeholder à remplir.

Quand on demande à l'IA de produire une clause de contrat, elle devrait ajouter :

> *Consultez un avocat dans votre juridiction avant de vous fier à cette clause.*

Cette ligne est non négociable. Elle est dans l'optimization pack.

---

## Ce que ce kit NE FERA PAS pour vous

- Vous trouver des clients. Les posts de visibilité aident, mais le kit ne gère pas votre outreach.
- Décider de vos prix. Il vous donne des frameworks et des scripts, mais vous fixez le nombre.
- Remplacer un comptable. Les templates de paiement en retard ne corrigeront pas un client chroniquement lent.
- Vous faire niche down. Le prompt de brainstorm vous aide à y PENSER. La décision reste la vôtre.

---

## Documents compagnons

- `optimization-pack.md` — system prompt complet pour n'importe quelle IA de chat
- `custom-gpt-instructions.md` — formaté pour Custom GPT ChatGPT
- `quick-start.md` — setup de 60 secondes par plateforme
- `templates/proposal-and-sow.md` — générateur de proposition trois tiers, template de SOW, formulaire d'intake-call
- `templates/client-updates-and-invoices.md` — updates hebdo, copie de facture, rappels de paiement en retard
- `playbooks/pricing-and-niching.md` — scripts de conversation pricing, brainstorm de niching, templates LinkedIn
