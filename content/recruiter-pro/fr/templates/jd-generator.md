# Générateur de JD avec linting anti-biais

La plupart des JDs sont mauvais parce que les hiring managers les écrivent en 20 minutes, copient la moitié d'un autre JD et ne les lisent jamais comme un candidat le ferait. Ce template répare ça. Il fait tourner un linter anti-biais d'abord, puis produit un JD qui respecte la façon dont les candidats lisent réellement.

---

## Comment ce template fonctionne

Deux passes :

1. **Passage de lint.** Signale chaque phrase problématique dans le brief ou le brouillon de JD existant. Affiche le lint + le fix en haut de la sortie.
2. **Brouillon de JD.** Un JD propre, structuré utilisant le format standard de l'optimization pack.

Vous pouvez faire tourner lint-seulement sur un JD qu'un hiring manager vous a envoyé (le cas d'usage le plus utile en cabinet et équipes in-house).

---

## Le prompt

```
Tu es le Recruiter Co-Pilot.

Génère une description de poste.

**Titre du rôle :** [titre exact]
**Séniorité :** [Junior / Intermédiaire / Senior / Staff / Principal / Director / VP]
**Famille de rôle :** [Engineering / Product / Design / Sales / GTM / Ops / Finance / etc.]
**Stage + taille de l'entreprise :** [ex. Série B, 80 personnes, 30M$ ARR]
**Ce qu'on fait :** [une phrase]
**Pourquoi on recrute ce rôle :** [une phrase — croissance, remplacement, nouvelle équipe, nouvelle fonction]
**Lieu + modalités de travail :** [Remote / Hybride X jours à [ville] / Sur site (ville)]

**Fourchette salariale :**
- Base : [bas] - [haut] [devise]
- Equity : [fourchette, si applicable]
- Bonus/commission : [structure, si applicable]

**Top 3 choses que la personne possédera (concret, pas vague) :**
1. [outcome]
2. [outcome]
3. [outcome]

**Top 3 compétences/expérience nécessaires (outcomes, pas gatekeeping) :**
1.
2.
3.

**Nice-to-have (optionnel) :**
- [3-4 choses]

**L'équipe qu'ils rejoindront (vrai effectif, manager nommé si possible) :**
[description]

**Process d'entretien (votre vrai process, pas un template) :**
[nombre de tours, qui ils rencontrent, format]

**Quoi que ce soit d'autre à signaler :**
[ex. "on n'a pas encore de senior engineer — vous fixerez la barre", ou "le codebase est plus vieux qu'on ne voudrait"]

Brouillon existant (s'il y en a un) :
[coller — pour passage de lint]
```

---

## Ce que vous récupérez — exemple complet

Pour un rôle Senior Full-Stack Engineer dans un SaaS Série B :

### Passage de lint (depuis le brouillon du hiring manager)

> **Passage de lint sur le brouillon original :**
>
> - `"passionate"` → couper. La passion est un sentiment, pas un livrable.
> - `"rock star"` → couper. Genré (penche masculin, repousse les candidates seniors), aussi cringe corporate.
> - `"fast-paced, dynamic team"` → couper. Code pour « on est désorganisés ». Remplacer par des attentes concrètes sur le rythme.
> - `"10x developer"` → couper. Vide de sens, repousse les senior engineers réfléchis.
> - `"thrives in ambiguity"` → adoucir ou être spécifique. Les senior engineers attendent QUELQUE structure ; la phrase code souvent pour « on ne sait pas ce qu'on veut ».
> - `"wear many hats"` → couper. Code pour « on n'a pas d'équipe ». Si c'est vrai, dites-le honnêtement.
> - `"Bachelor's degree in Computer Science required"` → retirer ou changer pour « Licence OU expérience équivalente ». Les senior engineers avec 10 ans de travail démontrable ne devraient pas être gatekeepés sur un diplôme CS.
> - `"10+ years of experience"` → reconsidérer. Le rôle n'exige pas 10 ans ; un travail de qualité senior à 6-8 ans est courant. Remplacer par « travail de niveau senior démontré sur plusieurs rôles ».
> - `"work hard and play hard"` → couper. Codé comme jeune + grindy. Repousse les candidats plus âgés et les parents.
> - `"we're like a family here"` → couper. Vague et souvent un signal de problèmes de frontières. Remplacer par des normes d'équipe concrètes.
> - `"competitive salary"` → remplacer par la vraie fourchette salariale. Non négociable.

### Le JD réécrit

> **Senior Full-Stack Engineer**
>
> **À propos du rôle**
>
> Vous serez le troisième senior engineer dans une équipe de sept, travaillant sur notre stack TypeScript / React / Node / Postgres pour shipper des features que nos clients nous paient vraiment. Le quotidien : écrire du code de production, reviewer des PRs, parfois pair-programmer avec des intermédiaires sur des problèmes épineux, et posséder un domaine majeur du produit de bout en bout.
>
> **Ce que vous ferez**
>
> - Shipper des features qui touchent toute la stack — du schéma Postgres aux composants React
> - Posséder l'un de nos trois domaines produit (billing, intégrations ou workflows) dans vos 90 premiers jours
> - Fixer la barre technique dans une équipe qui passe de 7 à 12 engineers sur l'année à venir
> - Pair avec le product manager et le designer sur les décisions de scoping, pas juste sur l'implémentation
> - Mentor des engineers intermédiaires, avec environ 20 % de votre temps là-dessus (plus si vous le voulez, moins si non)
>
> **Ce qu'on cherche**
>
> - Travail de niveau senior démontré en TypeScript / React côté front et Node / Postgres côté back
> - Vous avez shippé en production dans une startup ou une équipe qui bouge vite — vous savez ce que « assez bon pour shipper » signifie
> - Vous pouvez scoper votre propre travail depuis un énoncé de problème d'un paragraphe
> - Vous écrivez du code que les autres peuvent lire et reviewer sans traducteur
> - Vous avez travaillé en remote avec une équipe sur plusieurs fuseaux horaires
>
> **Nice to have**
>
> - Expérience avec AWS (on y est ; heureux de vous mettre à niveau si non)
> - Background spécifiquement en B2B SaaS
> - Contributions open source ou un projet perso dont vous êtes fier
> - À l'aise avec infra-as-code (Terraform)
>
> **Rémunération**
>
> - Fourchette de salaire de base : USD 170 000 - 210 000 $
> - Equity : 0,05 % - 0,15 %, vesting sur 4 ans avec cliff d'1 an
> - Bonus : 10 % de bonus annuel cible lié aux OKRs entreprise
> - Avantages : santé/dentaire/vision complet (US : 100 % salarié, 80 % personnes à charge), stipend home office de 1 000 $/mois, congé illimité avec minimum 3 semaines, 16 semaines de congé parental
>
> **À propos de l'équipe**
>
> Sept engineers rapportant à [nom du Engineering Lead si public]. On fait des sprints de 2 semaines, async-first avec deux courts syncs par semaine. Pas de rotation d'on-call pour le moment — on a une petite équipe ops pour ça. Codebase de 4 ans, bien testé dans les parties qui comptent, qui devient plus propre.
>
> **Comment on recrute**
>
> 1. Intro de 30 min avec moi (le recruteur)
> 2. Entretien technique de 60 min avec deux engineers — un vrai problème sur lequel on a travaillé, pas de LeetCode
> 3. Conversation system design de 60 min
> 4. Réunion de 45 min avec l'engineering lead — culture, style de travail, vos questions pour nous
> 5. Deux courts appels de référence
>
> Investissement total : environ 4 heures sur 2-3 semaines. On prend des décisions dans les 5 jours ouvrés du dernier tour.
>
> **Modalités de travail**
>
> - Remote-first à travers US et Canada
> - Heures core : 11h - 15h Eastern, avec flexibilité autour
> - On se voit en personne deux fois par an pour un offsite entreprise de 3 jours (le dernier était à Mexico ; le prochain est à Lisbonne)
> - Pas de déplacement requis au-delà des offsites

Ce JD fait ~480 mots. Il surperformera 90 % des JDs dans la même boîte mail parce qu'il donne au candidat assez pour prendre une vraie décision avant de candidater.

---

## Exemple travaillé — passage lint-only

L'utilisateur a collé le JD original du hiring manager :

> "We're looking for a passionate rock star full-stack engineer to join our fast-paced, dynamic team. You'll be a 10x developer who thrives in ambiguity and isn't afraid to wear many hats. Must have a Bachelor's degree in Computer Science and 10+ years of experience. We work hard and play hard, and we're like a family here. Competitive salary and benefits."

L'IA renvoie :

> **Passage de lint — 9 flags en 51 mots. Recommande une réécriture complète.**
>
> 1. `passionate` — couper (vague, repousse les candidats seniors)
> 2. `rock star` — couper (genré, cringe corporate)
> 3. `fast-paced` — couper (code pour « désorganisé »)
> 4. `dynamic` — couper (ne dit rien)
> 5. `10x developer` — couper (mythe, repousse les seniors réfléchis)
> 6. `thrives in ambiguity` — signaler (parfois légitime ; généralement code pour « on ne sait pas ce qu'on veut »)
> 7. `wear many hats` — couper (code pour « pas de support d'équipe »)
> 8. `Bachelor's degree in CS required` — retirer OU changer pour « OU expérience équivalente »
> 9. `10+ years of experience` — reconsidérer (souvent discriminatoire ; la qualité senior émerge souvent à 6-8 ans)
> 10. `work hard and play hard` — couper (codé âge, codé grind)
> 11. `like a family` — couper (vague, parfois un signal de frontières)
> 12. `Competitive salary` — remplacer par la vraie fourchette
>
> Ce JD tel quel sous-performera sur le pipeline de candidats divers et recevra moins de candidats seniors que vous ne voudriez. Vous voulez que je le réécrive ?

---

## Quand le linter ne devrait pas se déclencher

Certaines phrases signalées sont légitimes en contexte. Exemples :

- « Agressif » est correct pour « roadmap produit agressive » (une vraie chose) mais pas pour « personnalité agressive » (un signal de hire qui penche biaisé).
- « Famille » est correct pour décrire des politiques family-friendly réelles (congé parental, jours enfant malade). Ce n'est PAS correct comme « on est comme une famille ».
- « Jeune diplômé » est correct pour des programmes early-careers explicitement brandés comme tels. Ce n'est PAS correct sur un rôle Senior.

Le linter notera ces cas dépendants du contexte comme « signaler, pas auto-remplacer — confirmer l'intention ».

---

## Comment utiliser ça avec les hiring managers

Un scénario courant : le hiring manager écrit le JD. Vous trouvez qu'il est mauvais. Vous ne voulez pas qu'il se sente attaqué.

Le passage de lint vous donne une façon non confrontationnelle de pousser en retour. Montrez-leur les phrases signalées avec le POURQUOI (appuyé par la recherche : le langage genré réduit les candidatures de femmes de 11 % ; « 10+ ans » filtre des candidats qualifiés qui ont 6-8 ans de travail de qualité senior ; le gatekeeping diplôme rétrécit le pipeline divers).

Vous ne dites pas au hiring manager que son écriture est mauvaise. Vous lui montrez les données sur ce que le langage fait au pool de candidats. La plupart des hiring managers mettent à jour avec plaisir une fois qu'ils le voient.

---

## Erreurs courantes que le kit signalera

- **Pas de fourchette salariale.** Demande toujours. Inclut toujours.
- **Pas de vraie section « Comment on recrute ».** Un générique « plusieurs tours » est un flag — soyez spécifique.
- **JD de plus de 800 mots.** Coupez. Les JDs longs sont de l'indécision.
- **« Bonus » listé dans la fourchette mais non expliqué.** Dites toujours la structure.
- **Fourchettes d'equity bien trop larges.** « 0,01 % - 1 % » ne dit rien au candidat. Resserrez.
- **Section « Nice to have » qui contient les vraies exigences.** Ne cachez pas les must-haves dans les nice-to-haves ; ça embrouille les candidats et gate les bons.
