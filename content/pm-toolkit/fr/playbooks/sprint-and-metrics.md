# Playbook Sprint Planning + Revue de Métriques

> Math de capacité honnête, objectifs de sprint qui tiennent sur une ligne, et un format de revue de métriques qui produit des readouts que les gens lisent vraiment.

---

## Partie 1 — Sprint planning

### La math de capacité que personne ne fait honnêtement

La plupart des équipes planifient sur les heures nominales, puis se demandent pourquoi elles ratent. La math qui marche :

```
Heures nominales = engineers × heures/jour × jours dans le sprint
Soustraire :
  - PTO et jours fériés (somme sur l'équipe)
  - Rotations d'on-call (10-20 % de la semaine d'un engineer d'astreinte)
  - Réunions récurrentes (~6 heures/semaine par engineer pour les équipes typiques)
  - Spillover / maintenance / non planifié (10-15 % du restant)

Ce qui reste = capacité réelle pour nouveau travail
```

Un sprint de 2 semaines avec 4 engineers à 8 heures/jour fait 320 heures nominales. La réalité est plus proche de **140-180 heures** de capacité réelle pour nouveau travail. Si votre plan de sprint suppose 320, vous reporterez la moitié du travail au sprint suivant.

### Le prompt

```
Tu planifies un sprint avec moi. Règles :

1. Commence par la math de capacité. Je te donnerai la taille de l'équipe, la longueur du sprint,
   et les absences connues. Tu calculeras nominal → capacité réelle en utilisant
   les déductions standards (on-call 15 %, réunions ~6h/eng/semaine,
   spillover 12 %).
2. Puis triage le carryover du sprint précédent. Chaque item de carryover :
   garder, retirer ou splitter.
3. Puis priorise le nouveau travail comme P0 (doit shipper), Stretch (si le temps
   le permet), Won't-do (coupe explicite pour ce sprint).
4. Objectif du sprint en une phrase en haut. Se lit proprement pour quelqu'un
   qui ne connaît pas l'équipe.
5. Sors le sprint plan comme : Objectif du Sprint → Capacité → Carryover →
   P0 → Stretch → Won't-do.
6. Pas de cargo culting de story points. Utilise des heures ou un sizing approximatif
   (S/M/L/XL) — peu importe ce que l'équipe utilise déjà.

Voix : direct, spécifique. Le plan devrait être scannable en 60 secondes.
```

### Forme d'entrée

```
[Équipe]
Engineers : <nombre + noms si utile>
Designers : <nombre>
Temps PM : <fraction de la semaine>

[Sprint]
Longueur : 1 semaine / 2 semaines
Début : <date>
Fin : <date>

[Absences connues]
- <Engineer X> : absent Mar-Mer
- <Engineer Y> : absent la première semaine entière (vacances)
- On-call ce sprint : <Engineer Z>

[Carryover du sprint dernier]
- <Item> : statut (50 % complété / bloqué / pas démarré)

[Travail candidat pour ce sprint]
- <Item> : sizing approximatif si vous l'avez
- <Item> : ...
```

### Exemple travaillé

**Entrée :**

```
[Équipe]
4 engineers (Alex, Beth, Carmen, Dev)
1 designer (Eli) — 50 % sur cette équipe ce sprint
PM : moi, ~30 % de capacité

[Sprint]
2 semaines, 19 mai - 30 mai 2026

[Absences connues]
- Dev : absent Mar-Mer de la semaine 1 (3 jours off)
- Beth : absent semaine 2 (vacances entière semaine)
- On-call : Carmen tout le sprint

[Carryover du sprint dernier]
- Saved Searches v1 UI polish (~70 % fait, bloqué sur design review)
- Webhook retry observability dashboard (~50 % fait, dépriorisé
  quand le travail retry-failure a shippé)

[Travail candidat pour ce sprint]
- Launch Saved Searches v1 (UI polish + beta rollout)
- Backend Team-shared saves (spike d'intégration RBAC)
- First-run onboarding v2 (fixes de cas limites — 3 bugs spécifiques)
- Mobile-web pour vue "Audit Log"
- Exploration UX customer-shared saves (exploration design seulement)
```

**Sortie :**

```
**Objectif du Sprint :** Shipper Saved Searches v1 à la cohorte beta d'ici le 30 mai.
Débloquer le kickoff de Team-shared saves pour le prochain sprint.

**Capacité**
- Nominal : 4 engineers × 8h × 10 jours = 320h
- Beth absent semaine 2 : −40h
- Dev absent 3 jours : −24h
- Carmen on-call (15 % sur le sprint) : −12h
- Réunions (6h/sem × 4 eng × 2 sem) : −48h
- Spillover/maintenance (12 %) : −24h
- **Capacité réelle nouveau travail : ~172h**

**Carryover (décider d'abord)**
- Saved Searches v1 UI polish (~70 % fait) → GARDER. Design review
  programmé 20 mai. P0 pour ce sprint.
- Webhook retry observability dashboard → RETIRER. Le travail original retry-failure
  a shippé ; le dashboard n'est plus haute priorité. Déplacer vers Later
  sur la roadmap.

**P0 (committed — rentre dans ~140h)**
- Saved Searches v1 UI polish + beta rollout (Alex, ~40h)
- Spike RBAC integration Team-shared saves (Beth avant vacances,
  Carmen continue, ~50h)
- Fixes de cas limites First-run onboarding v2 — 3 bugs spécifiques
  (Dev, ~30h)
- Vue Audit Log mobile-web (Carmen entre travail on-call, ~20h)

**Stretch (~30h de marge si P0 finit tôt)**
- Exploration UX customer-shared saves avec Eli (design, ~30h)
- Tech-debt : investigation latence backend search (Alex si disponible)

**Won't-do ce sprint (explicite)**
- Travail backend customer-shared saves (en attente de l'outcome du spike RBAC)
- API pour Saved Searches (Phase 2 — pas dans les engagements de ce cycle)
- Webhook retry observability dashboard (dépriorisé ; voir Carryover)

**Risques**
- Beth absente semaine 2 signifie que la complétion du spike RBAC dépend de Carmen,
  qui est aussi on-call. Si les pages spike, le spike glisse. Mitigation :
  Beth front-load le spike en semaine 1.
- Mobile-web Audit Log dépend d'un primitive de layout partagé qu'Alex
  finit pendant le polish de Saved Searches. Surveiller la passation.
```

Ce que ce plan fait :

- Objectif du sprint en une phrase en haut.
- La math de capacité est explicite et conservative.
- Le carryover est décidé en haut (garder / retirer / splitter).
- P0 rentre confortablement dans la capacité réelle, avec de la marge stretch.
- Won't-do est explicite, nommant les items qui *seraient* tentants à prendre.
- Les risques sont nommés avec mitigations, pas enterrés.

---

## Partie 2 — Revue de métriques

### À quoi ressemble du bon

Une revue de métriques n'est pas un mur de chiffres. C'est un document de deux pages qui dit :

> « Voici les 3-5 métriques qui comptent le plus. La tendance de chacune, ce qu'on pense la drive et ce qu'on regarderait ensuite. La chose que vous devriez savoir : <une chose spécifique>. »

La plupart des revues de métriques échouent en essayant de tout couvrir. Choisissez les métriques qui comptent le plus pour la question stratégique du moment, faites remonter ce qui a bougé et ignorez le bruit.

### Le prompt

```
Tu fais tourner une revue de métriques avec moi. Règles :

1. Je te donnerai 3-7 métriques et leurs valeurs (période actuelle, période
   précédente, cible s'il y en a une). Tu produiras un readout, une
   métrique à la fois.

2. Pour chaque métrique, écris :
   - Tendance : up / down / flat, avec magnitude (ex. "up 12 %")
   - Comparé à : période précédente, cible ou les deux
   - Hypothèse : 1-2 phrases. Ce que tu penses qui la drive. Si tu
     n'as pas assez d'info pour faire une hypothèse, dis-le honnêtement.
   - Suivi : ce que je voudrais checker ensuite (une coupe des données, un
     appel client, une corrélation de launch, etc.)

3. Ordonne par importance. La métrique qui a le plus bougé ou compte le plus
   pour la stratégie actuelle va en premier.

4. À la fin, écris un "headline" d'un paragraphe qui résume la
   semaine en 3-4 phrases. La chose que l'exec qui lit ça
   devrait emporter en tête.

5. Enterre le bruit. Si une métrique n'a pas bougé significativement et n'est pas
   stratégiquement pertinente, regroupe-la sous "Flat / pas de signal" en
   bas.

Voix : direct, calibré. Le langage prudent ("pourrait", "pourrait être") est
ok quand honnête ; évite la fausse certitude.
```

### Forme d'entrée

```
[Période]
Période de reporting : <ex. semaine du 6-12 mai 2026>
Comparée à : <dates de la période précédente>

[Contexte stratégique]
Ce à quoi on prête attention ce trimestre (ex. "objectif activation +10pp",
"cycle de renouvellement T2", "launch Saved Searches mi-mois")

[Métriques]
Pour chaque métrique :
- Nom
- Valeur actuelle
- Valeur précédente
- Cible (optionnel)
- Tout contexte que vous voudriez (un launch cette semaine, une anomalie connue, etc.)
```

### Exemple travaillé

**Entrée :**

```
[Période]
Semaine du 6 - 12 mai 2026
Comparée à : semaine du 29 avr - 5 mai

[Contexte stratégique]
L'objectif T2 c'est activation +10pp. On est à +6pp YTD ; on a besoin de +4pp d'ici la fin T2.
Saved Searches v1 est prévu pour le 30 mai.

[Métriques]
- WAU : 8 420 → 8 510 (+1,1 %), pas de cible
- Taux d'activation : 41 % → 39 % (-2pp), cible 47 %
- Échecs de retry webhook : 0,8 % → 0,3 % (-0,5pp), cible <1 %
- Volume de tickets support : 142 → 168 (+18 %), pas de cible
- Net new paid customers : 12 → 14 (+2), cible 15/sem
- Part de sessions mobile-web : 18 % → 21 % (+3pp), pas de cible
- Tickets "lost my view" : 6 → 8 (+2), cible informelle zéro d'ici juillet
```

**Sortie :**

```
**Headline :** L'activation a glissé de 2pp cette semaine, le premier déclin en
sept semaines — le nouveau flow first-run pourrait sur-pivoter sur les
cas limites qu'on a patchés le sprint dernier, et on devrait creuser dans le
funnel avant la prochaine expérience. Les échecs de retry webhook sont maintenant
solidement sous la cible. Launch Saved Searches sur les rails, mais les tickets
"lost my view" ont monté — rappelez que le launch est dans 18 jours.

---

**Taux d'activation** — DOWN 2pp (41 % → 39 %, cible 47 %)
- Comparé à : semaine précédente et tendance YTD (c'est le premier déclin
  depuis la semaine du 17 mars).
- Hypothèse : la révision du flow first-run shippée le 30 avr a échangé
  vitesse contre couverture — on a ajouté deux étapes d'onboarding pour gérer les cas
  limites. Soupçon qu'on a ralenti le temps médian d'activation assez pour
  faire chuter le taux. Besoin de regarder le funnel par étape.
- Suivi : pull du funnel new-user pour cette semaine vs la dernière ; comparer
  drop-off par étape. Décider d'ici vendredi s'il faut revert l'étape 4 ou
  itérer.

**Volume de tickets support** — UP 18 % (142 → 168)
- Comparé à : semaine précédente. Pas de cible baseline.
- Hypothèse : augmentation concentrée dans la catégorie "Saved Views" —
  6 → 8 — et dans les tickets liés à l'onboarding (soupçon lié à la
  chute d'activation ci-dessus). Pas une régression de qualité ; usage qui shift.
- Suivi : tagger les tickets de cette semaine par catégorie. Si l'onboarding est
  >40 % de l'augmentation, c'est la même root cause que la chute
  d'activation.

**Échecs de retry webhook** — DOWN 0,5pp (0,8 % → 0,3 %, cible <1 %)
- Comparé à : semaine précédente et cible.
- Hypothèse : le travail Idempotency + DLQ shippé il y a 2 semaines est pleinement
  en effet maintenant. Chute soutenue, pas une fluke d'une semaine.
- Suivi : marquer comme résolu ; retirer des métriques hebdo, monitorer
  mensuellement par la suite.

**Net new paid customers** — UP 2 (12 → 14, cible 15/sem)
- Comparé à : semaine précédente et cible hebdo.
- Hypothèse : proche de la cible ; rien qui crie.
- Suivi : aucun cette semaine. Surveiller le cumulé T2.

**Part de sessions mobile-web** — UP 3pp (18 % → 21 %)
- Comparé à : semaine précédente. Pas de cible formelle.
- Hypothèse : launch de parité mobile-web pour les top 3 flows
  drive une montée soutenue. Trois des quatre dernières semaines ont montré
  de la croissance.
- Suivi : pull du breakdown device-class pour la revue de la semaine prochaine ;
  vaut le coup de confirmer que c'est de l'usage incrémental, pas de la cannibalisation
  des sessions desktop.

**Flat / pas de signal**
- WAU : +1,1 %, dans la variance hebdo normale. Pas d'action.
- Tickets "lost my view" : 6 → 8. Sous le seuil de bruit pour
  l'analyse hebdo ; revisiter après le launch Saved Searches.
```

Ce que ce readout fait :

- Le headline en 3-4 phrases donne l'exec le takeaway sans scroller.
- Métriques ordonnées par importance, pas par alphabet.
- Chaque métrique a une vraie hypothèse, pas « on continuera à monitorer ».
- Les suivis sont des actions spécifiques, pas des intentions vagues.
- La métrique qui a été résolue (échecs de retry webhook) est promue hors de la liste hebdo.
- Le bruit est enterré sous « Flat / pas de signal » pour que le readout reste scannable.

---

## Comment sprint et métriques marchent ensemble

La revue de métriques devrait driver le prochain plan de sprint. Si l'activation a chuté de 2pp cette semaine et que l'hypothèse pointe vers le flow first-run, cette investigation de funnel appartient au P0 du prochain sprint, pas quelque part dans le backlog.

Workflow :

1. Faites tourner la revue de métriques vendredi ou lundi matin.
2. Identifiez les 1-2 métriques qui vous ont surpris (positivement ou négativement).
3. Convertissez chaque surprise en un suivi : un pull de données, un appel client ou une expérience.
4. Les suivis vont dans le sprint planning comme items P0 s'ils sont load-bearing pour l'objectif stratégique.

Le job du PM est de garder la boucle serrée : métriques → hypothèse → expérience → métriques. Les plans de sprint qui ne reflètent pas le signal de la semaine dernière sont comme les équipes dérivent.
