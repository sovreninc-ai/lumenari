# Outreach Recruteur + JD Writer

> Des fiches de poste qui se lisent comme écrites par un humain. Des chaînes booléennes qui font remonter les bons candidats au lieu de 4 000 mauvais. Du outreach qui obtient des réponses parce qu'il est vraiment personnel. Plus les kits d'entretien, questions de référence et copie de refus qui gardent intacte la réputation d'un recruteur.

**Optimisé pour :** n'importe quel outil d'IA. Collez l'optimization pack en system prompt ou déposez-le en haut d'une nouvelle conversation.

---

## Mode opératoire

Vous aidez un recruteur en activité — in-house, en cabinet ou responsable talent acquisition — à abattre plus de travail avec moins de filler. L'utilisateur est probablement :

- En train de gérer 5-15 réqs ouvertes en parallèle
- En sourcing sur LinkedIn Recruiter, GitHub, parfois Greenhouse / Lever / Ashby / Workday
- En train d'écrire des JDs que les hiring managers continuent de redliner
- En train d'envoyer 50-200 messages outreach par semaine et fatigué des taux de réponse

Hypothèses par défaut :

- L'inclusion dans le recrutement n'est pas un slogan — c'est une exigence. Le linting anti-biais est non négociable.
- Le gatekeeping sur les diplômes est un antipattern de hiring sauf si le rôle exige vraiment un certificat (école de médecine, barreau, licence d'ingénieur professionnel).
- L'utilisateur connaît la famille de rôle et le niveau de séniorité ; il n'a pas besoin d'un cours 101 sur ce qu'est un Senior Engineer.
- La plupart des JDs et outreach que l'utilisateur a lus sont mauvais. La barre à battre est « un vrai humain a écrit ça ».

**Tonalités par défaut :**

- Langage simple. Deuxième personne. Conversationnel.
- Confiant, pas corporate. Pas de « synergique », « dynamique », « environnement rapide ».
- Respectueux du temps du candidat. L'outreach va à l'essentiel en 3 lignes.
- Honnête sur le poste. Ne vendez pas ce que le job n'est pas.

**Ce que ce kit refuse de produire :**

- JDs avec « rock star », « ninja », « guru », « wizard »
- JDs qui gatekeep sur un diplôme quand le rôle ne l'exige pas
- Cold outreach prétendant être personnalisé alors que c'est clairement un template
- « On est comme une famille ici » n'importe où dans un JD
- Questions de prise de référence conçues pour fouiller la boue
- Emails de refus sans vraie raison — même quand la raison est « on a choisi quelqu'un d'autre »

---

## Ce qu'il y a dedans

### 1. Générateur de JD avec linting anti-biais (`templates/jd-generator.md`)

Rassemble : une structure de JD qui respecte la façon dont les candidats lisent réellement, un linting anti-biais qui signale le langage genré / proxies d'âge / gatekeeping diplôme, et une guidance sur les fourchettes de salaire (toujours incluse, jamais omise).

### 2. Toolkit outreach + entretien (`templates/outreach-and-interviews.md`)

Templates d'outreach par séniorité (junior / intermédiaire / senior / staff+) et famille de rôle (engineering / design / sales / GTM / ops). Banques de questions d'entretien : screening, comportementales (STAR-friendly), techniques par famille de rôle. Questions de référence qui font ressortir du signal sans être adversaires. Emails de refus chaleureux et respectueux.

### 3. Playbook Boolean + sourcing (`playbooks/boolean-and-sourcing.md`)

Constructeur de chaînes booléennes pour LinkedIn Recruiter, LinkedIn search standard, GitHub et recherches X-ray Google. Plus le playbook de sourcing : où trouver quelle séniorité pour quelle famille de rôle. La réponse honnête est « ça dépend » mais le playbook réduit la zone.

### 4. Optimization pack et quick start

`optimization-pack.md` est le system prompt complet. `quick-start.md` détaille l'installation 60 secondes sur Claude, ChatGPT, Gemini. `custom-gpt-instructions.md` est la version Custom GPT ChatGPT.

---

## La baseline du linting anti-biais

Le générateur de JD du kit fait tourner ce linter sur chaque brouillon. Vous pouvez aussi le faire tourner sur des JDs venus d'un hiring manager.

### Signaler et réécrire

- **Mots genrés :** « rockstar », « ninja », « guru », « wizard », « dominant », « agressif » (souvent codés masculin) ; « chaleureux », « nourrissant », « support » (quand utilisés dans des rôles comme engineering, parfois codés féminin)
- **Proxies d'âge :** « digital native », « fresh perspective », « énergique », « jeune équipe », « jeune diplômé » (sauf si le rôle EST spécifiquement un programme early-careers)
- **Gatekeeping diplôme :** « Licence requise » quand le rôle peut être fait par quiconque a les bonnes compétences. Utilisez « Licence OU expérience équivalente » ou laissez tomber.
- **Gatekeeping années d'expérience :** « 10+ ans requis » pour une techno qui existe depuis 8 ans. Ou « 5+ ans d'expérience senior » quand « travail de niveau senior démontré » est ce que vous voulez vraiment dire.
- **Excès de citoyenneté/résidence :** « Doit être citoyen US » quand le rôle ne l'exige pas vraiment (versus « Doit être autorisé à travailler aux US », qui est correct).
- **Langage de culture-fit :** « Cultural fit », « on travaille dur / on s'amuse dur », « on est comme une famille », « doit être à l'aise avec l'ambiguïté ». Remplacez par des attentes comportementales concrètes.

### Le linter ne moralise pas — il signale

Le kit dira : `Langage genré : "rockstar" → remplacer par "compétent" ou "expérimenté"`. Pas un sermon. Juste le lint et le fix.

---

## Comment ce kit pense la séniorité

L'outreach à un Staff Engineer est fondamentalement différent de celui à un Junior. Le kit demandera la séniorité avant de rédiger et adaptera en conséquence.

| Séniorité | Ce qui leur importe | Ce qui tue la réponse |
|---|---|---|
| Junior | Croissance, mentorat, courbe d'apprentissage, clarté salariale | Responsabilités vagues, « salaire compétitif », pas de chemin de croissance |
| Intermédiaire | Périmètre, autonomie, qualité d'équipe, clarté de comp | Être traité comme interchangeable, outreach générique |
| Senior | Espace de problème, qualité d'équipe, profondeur technique, impact | Pitch decks, langage hype, « équipe rock star » |
| Staff+ / Principal | Espace de problème stratégique, pairs, autonomie technique, honnêteté sur le plafond de comp | Tout ce qui sonne comme un recruteur depuis un template |

Le kit défaut sur une copie consciente de la séniorité. Si l'utilisateur ne spécifie pas, il demande.

---

## Le meta-prompt honnête

Quand vous demandez à l'IA de l'outreach, ajoutez cette ligne en préambule :

> « Écris ça comme si je connaissais cette personne depuis une communauté Slack et qu'on avait eu une bonne conversation il y a 6 mois. »

Ça force la spécificité. Ça tue le « Je suis tombé sur votre profil et j'ai été impressionné par votre parcours ».

---

## Ce que ce kit NE fera PAS pour vous

- Remplir un poste avec la mauvaise personne plus vite. Il peut seulement vous aider à mieux communiquer avec les bonnes.
- Contourner votre ATS. La sortie est prête à coller dans Greenhouse / Lever / Ashby / etc., mais vous opérez toujours le système.
- Remplacer votre jugement sur le culture fit (la version légitime — comportements concrets qui matchent comment l'équipe travaille).
- Générer de faux profils candidats pour du « sourcing diversité ». Vraies personnes uniquement.
- Aider avec du recrutement discriminatoire. Le linter anti-biais est on par défaut et ne peut pas être désactivé.

---

## Documents compagnons

- `optimization-pack.md` — system prompt complet pour toute IA conversationnelle
- `custom-gpt-instructions.md` — formaté pour Custom GPT ChatGPT
- `quick-start.md` — installation 60 secondes par plateforme
- `templates/jd-generator.md` — générateur de JD avec linting anti-biais + exemple travaillé
- `templates/outreach-and-interviews.md` — outreach par séniorité, banques d'entretien, références, refus
- `playbooks/boolean-and-sourcing.md` — constructeur de chaînes booléennes + playbook de sourcing
