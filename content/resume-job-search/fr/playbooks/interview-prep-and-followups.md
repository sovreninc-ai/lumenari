# Prép Entretien + Relances

> Prép entretien STAR / comportemental / technique, plus les trois emails de relance dont toute recherche d'emploi a besoin : remerciement, post-refus et ghost-recovery.

---

## Partie 1 — Prép entretien comportemental (STAR)

### Comment STAR marche vraiment en pratique

La plupart des gens se plantent sur STAR en passant 80 % de la réponse sur Situation et Task. L'interviewer s'en moque du setup. Il s'intéresse à ce que *vous* avez fait et à ce qui s'est passé.

Bon ratio :

- **Situation (10 %)** : une phrase. « Chez Acme, on voyait des échecs de retry de webhook à environ 12 % de tous les events. »
- **Task (10 %)** : une phrase. « J'étais l'engineer d'astreinte ce trimestre-là et les échecs me réveillaient deux nuits par semaine. »
- **Action (60 %)** : étapes spécifiques que *vous* avez prises. Première personne « je », pas « nous ». C'est la viande.
- **Result (20 %)** : chiffres si vous en avez. L'outcome — pour l'équipe, le client, le business.

Si vous dites « nous » plus de deux fois, l'interviewer ne sait pas ce que vous avez fait. Utilisez « je ». Quand le travail était vraiment collaboratif, dites « J'ai mené » ou « J'ai owné le morceau X pendant que deux engineers géraient Y ».

### Le prompt de prép

```
Tu m'aides à préparer des réponses d'entretien comportemental en format STAR.
Je vais te donner une question et l'histoire grossière que je veux raconter. Tu
vas produire une réponse STAR serrée en ~200 mots.

Règles :
1. Situation : 1 phrase max.
2. Task : 1 phrase max.
3. Action : 60 % de la réponse. Première personne « je ». Si le travail était
   collaboratif, nomme ce que j'ai spécifiquement owné vs ce que les autres ont fait.
4. Result : termine avec un chiffre ou un outcome concret. Si je n'ai pas
   de chiffre, demande-moi avant d'en inventer un.
5. ~200 mots. Se lit proprement à voix haute en 90-120 secondes.
6. Pas de buzzwords (passionné, orienté résultats, dynamique). Pas de remplissage.

Après avoir produit la réponse, pose-moi une question de suivi que
l'interviewer est le plus susceptible de poser. Suggère une brève queue à ma réponse
qui l'adresse préventivement si utile.
```

### Les 6-8 histoires que vous devriez avoir prêtes

Avant tout onsite, préparez 6-8 histoires que vous pouvez fléchir vers différentes questions. La plupart des questions comportementales sont des variations sur ces thèmes :

1. Une fois où vous avez mené quelque chose
2. Une fois où vous étiez en désaccord avec un pair ou un manager
3. Une fois où vous avez échoué
4. Une fois où vous avez dû apprendre vite
5. Une fois où vous avez dû faire un tradeoff difficile
6. Une fois où vous avez mentoré ou développé quelqu'un
7. Une fois où vous avez livré sous pression
8. Une fois où vous avez poussé en retour sur un stakeholder

Pour chacune, écrivez 3-4 phrases de contexte plus l'outcome. Vous ne mémorisez pas de scripts — vous préparez la matière brute pour que l'IA puisse la mettre en forme dans la bonne réponse au moment voulu.

### Exemple travaillé

**Question :** « Parle-moi d'une fois où tu étais en désaccord avec ton manager. »

**Entrée brute de l'utilisateur à l'IA :**

```
Chez Acme, mon manager voulait shipper la nouvelle feature payments en 4 semaines
sans feature flag parce que le client attendait. Je pensais que
c'était un mauvais call — on n'avait jamais shippé payments sans flag et
le client ne remarquerait pas une semaine de plus. J'ai poussé en retour, j'ai fini
par ajouter le flag, et déployé la feature sur 2 semaines. On a attrapé
un bug en semaine 1 qui aurait coûté ~80k$ si on avait shippé à 100 %.
```

**Réponse STAR que l'IA produit :**

```
Chez Acme, mon manager poussait pour shipper une nouvelle feature payments en quatre
semaines sans feature flag parce qu'un client clé attendait.

J'ownais le deploy et j'étais en désaccord — on n'avait jamais shippé un changement
payments sans flag, et je ne pensais pas que le client sentirait
une semaine en plus.

J'ai tiré le runbook et écrit le risque : tout bug à 100 % de rollout
touche tous les clients, et notre incident moyen en termes d'impact revenu en
payments tournait autour de 80k$. J'ai proposé de flagger la feature et de la dérouler
de 5 % à 25 % à 100 % sur deux semaines. Mon manager a poussé en retour deux fois
sur la pression de timeline, mais j'ai tenu la ligne sur l'architecture et
proposé de prendre l'appel client moi-même pour expliquer le plan de rollout.
On a ajouté le flag.

En semaine un à 25 %, on a attrapé un bug de retry webhook qui aurait
déclenché des facturations en double au rollout complet. Coût estimé évité :
environ 80k$. Le client a eu la feature à la date originale parce qu'on
avait planifié le rollout en parallèle du build. Mon manager et
moi avons par la suite flaggé par défaut chaque deploy payments.

(Suivi probable : « Comment as-tu géré le push back de ton manager ? » —
j'ajouterais une phrase : je lui ai demandé ce qu'il optimisait,
me suis mis d'accord là-dessus explicitement avec le client, puis j'ai fait le cas
architectural à l'écrit pour qu'on puisse être en désaccord sur des données plutôt que des opinions.)
```

Ça fait 220 mots, se lit en environ 100 secondes et montre du jugement, de l'ownership, de la communication et un outcome. La suggestion de suivi est le bonus — l'IA signale là où l'interviewer va probablement creuser et vous donne une réponse pré-construite.

---

## Partie 2 — Prép entretien technique

### Ce sur quoi l'IA est bonne

- Pattern-matching de problèmes d'algos et explication de la forme de solution.
- Walk-through de problèmes de system-design avec la rubrique standard (exigences fonctionnelles, non-fonctionnelles, API, modèle de données, échelle, bottlenecks, tradeoffs).
- Mock-interviews sur des questions de débogage ou de lecture de code.
- Générer des suivis « que ferais-tu si » pour que vous ne soyez pas surpris dans la pièce.

### Ce sur quoi l'IA est mauvaise

- Remplacer la pratique réelle. Vous devez écrire le code ou whiteboarder le design vous-même. Lire la solution de l'IA n'est pas la même chose que la produire sous pression.
- Prédire ce que *votre* interviewer demandera. L'IA peut simuler la moyenne ; la vraie pièce sera ce qu'elle sera.

### Patterns de prompts utiles

**Pour le system design :**

```
J'ai un entretien system design demain chez <entreprise>. Le rôle est
<senior backend>. Décris-moi comment tu structurerais 45 minutes sur
ce problème : « Conçois un système de delivery de webhooks pour une plateforme
type Stripe. »

Puis pose-moi 3 questions sur les choix de design que je devrais
être prêt à défendre.
```

**Pour les algorithmes :**

```
Je suis rouillé sur la programmation dynamique. Donne-moi 3 problèmes DP
de difficulté moyenne avec un hint d'une ligne chacun. Ne me montre pas encore les solutions.
Je vais essayer et revenir.
```

**Pour les mock interviews :**

```
Tu es un senior engineer qui m'interviewe pour un rôle backend. Pose-moi
une question de débogage. Après ma réponse, pose des suivis comme
l'interviewer le ferait. Ne m'aide pas — pousse-moi. Dis-moi à la fin comment
ma réponse aurait atterri.
```

La ligne « pousse-moi, ne m'aide pas » compte. L'IA défaut à être gentille. Vous ne voulez pas du gentil dans un mock ; vous voulez les questions que le vrai interviewer posera.

---

## Partie 3 — Les trois emails de relance

### Email 1 — Remerciement post-entretien (envoyer dans les 24 heures)

**Prompt :**

```
Écris un email de remerciement de 100-130 mots après un entretien d'embauche. Règles :

1. Référence une chose spécifique que l'interviewer a dite. Pas un générique
   « merci pour votre temps ».
2. Renforce brièvement une chose sur mon fit — choisis le plus fort
   signal de la conversation.
3. Ouvre la porte aux questions de suivi. Ne supplie pas pour le rôle.
4. La signature est professionnelle, pas avide.
5. Ligne de sujet : « Merci — <mon nom> / <rôle> »

Je vais te donner : le nom de l'interviewer, le rôle, une chose spécifique
qu'il a dite, et une chose que je veux renforcer.
```

**Exemple travaillé :**

```
Sujet : Merci — Alex / Senior Backend Engineer

Maya,

Merci pour la conversation aujourd'hui. Le passage sur comment vous pensez
l'ordre des webhooks quand les retries arrivent en désordre m'est resté en tête
— c'est un problème sur lequel j'ai passé plus de temps que c'est probablement
sain, et on dirait que vous l'abordez de la même façon qu'on
le faisait chez Acme.

Si ça pouvait aider l'équipe, je suis heureux de marcher à travers
l'arbre de décision spécifique de retry-ordering que j'ai rédigé l'année dernière — c'est le genre
de chose plus facile à partager en live qu'à taper. Dans tous les cas, content qu'on
ait pu parler. J'espère que la suite du loop se passe bien.

— Alex
```

Envoyez-en un à chaque interviewer dont vous avez l'email, individualisé par personne. Réutiliser le même email mot pour mot est ok si la seule chose qui change est la référence spécifique — mais la référence spécifique doit changer.

### Email 2 — Post-refus (envoyer dans les 48 heures du non)

Celui-ci compte. La plupart des gens ne l'envoient pas. Ceux qui le font reçoivent des intros chaleureuses et des suivis « on adorerait vous garder en tête » des mois plus tard quand le bon rôle s'ouvre.

**Prompt :**

```
Écris une réponse gracieuse de 80-100 mots à un refus de job. Règles :

1. Remercie-les pour le temps et la décision. Pas d'amertume.
2. Reconnais l'outcome sans revivre l'entretien.
3. Laisse la porte ouverte : demande à rester en contact, mentionne que tu serais ouvert
   au bon rôle dans le futur.
4. Optionnel : demande un feedback spécifique. Sois direct (« si tu as
   cinq minutes pour un feedback spécifique précis ») — les demandes vagues
   (« tout feedback serait apprécié ») reçoivent des réponses vagues.
```

**Exemple travaillé :**

```
Maya,

Merci de me l'avoir fait savoir, et pour le temps de l'équipe sur ce loop.
Les conversations étaient vraiment parmi les meilleures que j'ai eues
dans cette recherche — j'apprécie l'honnêteté sur où vous avez atterri.

Si un rôle senior backend en payments s'ouvre plus tard cette année, je serais
ravi d'être sur votre liste. Et si vous avez cinq minutes pour un
feedback spécifique sur ce qui a fait pencher la balance dans l'autre sens, je le trouverais
utile.

Bien à toi,
Alex
```

La demande d'un seul bit-spécifique-de-feedback est répondue environ 40 % du temps quand formulée ainsi. Le générique « tout feedback » reçoit 5 %.

### Email 3 — Ghost recovery (quand vous n'avez rien entendu pendant 14 jours)

Deux étapes. Jour 7 est un ping léger. Jour 14 est une vraie relance.

**Jour 7 (ping léger) :**

```
Maya,

Voulais checker sur le rôle senior backend dont on a parlé le
[date]. Heureux de partager toute autre chose qui aiderait.

— Alex
```

C'est tout. Trois lignes. N'ajoutez pas de remplissage.

**Jour 14 (vraie relance) :**

```
Sujet : Petit suivi — Senior Backend / Lumenari

Maya,

Suivi de notre conversation sur le rôle senior backend le
[date]. Je sais que les loops ralentissent pour toutes sortes de raisons qui n'ont
rien à voir avec le candidat, donc pas de pression dans un sens ou l'autre — je vérifie juste
si le rôle est toujours ouvert et où j'en suis.

Si le timing a changé de votre côté, je préférerais le savoir que non. Et si
la réponse est non, c'est ok aussi ; j'apprécierais la closure pour
planifier ma recherche.

— Alex
```

Si vous n'avez rien entendu dans la semaine de l'email jour-14, marquez perdu et passez à autre chose. N'envoyez pas une troisième relance. Le signal est assez clair.

---

## Tracker la recherche

Un tracker simple bat les élaborés. Cinq colonnes :

| Entreprise | Rôle | Postulé | Étape | Dernier contact |
|---------|------|---------|-------|--------------|
| Lumenari Co | Sr Backend Eng | 2026-05-01 | Onsite planifié | 2026-05-12 |
| Beta Co | Staff Eng | 2026-05-03 | Recruiter screen | 2026-05-08 |
| Gamma Co | Sr Backend Eng | 2026-04-25 | Ghosted (jour 14 envoyé) | 2026-05-09 |

Mettez-le à jour après chaque interaction. Sans ça, la semaine six de la recherche devient un brouillard.

---

## Ce que ce playbook ne fera pas

- Mémoriser un script pour vous. Pratiquez les réponses à voix haute. L'IA peut former les mots ; votre bouche doit les connaître.
- Vous dire d'accepter l'offre. C'est une question de valeurs. Faites une liste de ce qui compte et pondérez. L'IA peut vous aider à faire la liste ; elle ne peut pas faire le call.
- Couvrir la négociation de la comp. C'est un playbook séparé et le mauvais outil ici serait coûteux. Pour l'instant : n'acceptez jamais sur l'appel, prenez 24-48 heures, contrez avec une seule demande ancrée à des données de marché.
