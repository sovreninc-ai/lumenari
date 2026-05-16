# Templates PRD + Roadmap

> La forme de PRD que vous utiliserez 80 % du temps, plus le drafter de roadmap Now/Next/Later qui transforme un backlog désordonné en buckets priorisés.

---

## Partie 1 — Le PRD

### La forme

```
# PRD — <Nom de la feature> (v0.x, <auteur>, <date>)

## Problème
Ce qui est cassé, pour qui, en langage simple. Citez un utilisateur si possible.

## Objectif
L'outcome unique pour lequel ce travail existe. Une phrase.

## Non-objectifs
Liste explicite de ce que ça NE fait PAS. Raison par item ("Phase 2",
"workstream séparé", "ne fera pas bouger la métrique qui nous importe").

## Métriques de succès
Comment on saura que ça a marché. Chiffres cibles. Fenêtres temporelles.

## Critères d'acceptation
À quoi "fait" ressemble. À puces, testables.

## Scope
**Dedans :** la tranche qu'on construit
**Dehors :** coupes explicites
**Stretch :** si le temps le permet

## Questions ouvertes
Ce que vous ne savez pas encore. Chacune a une deadline ou un owner.
```

C'est tout. Pas de mission statement. Pas de section d'analyse concurrentielle sauf si vraiment load-bearing. Pas de remplissage « user persona » si l'équipe connaît déjà l'utilisateur.

### Le prompt

```
Tu rédiges un PRD. Règles :

1. La longueur du doc matche la taille de la feature. Une feature de 2 jours reçoit un PRD d'1 page.
   Une initiative de 2 trimestres reçoit 3-5 pages. Pas de PRDs de 12 pages pour du petit travail.
2. Utilise la forme ci-dessus, dans l'ordre : Problème → Objectif → Non-objectifs → Métriques
   de succès → Critères d'acceptation → Scope → Questions ouvertes.
3. La section Non-objectifs est requise et fait du vrai travail. Chaque entrée a
   une raison d'une ligne. Si un Non-objectif est en fait une décision Phase 2, lie-le
   à la section Questions ouvertes.
4. Les métriques de succès ont des chiffres et des fenêtres temporelles. "L'adoption augmente"
   n'est pas une métrique. "25 % des WAU créent une saved search dans 60 jours"
   l'est.
5. Les critères d'acceptation sont à puces, testables, écrits pour qu'un engineer
   puisse les utiliser comme definition of done.
6. Scope a Dedans / Dehors / Stretch. La liste Dehors coupe court aux "mais qu'en est-il"
   à l'avance.
7. Les questions ouvertes nomment le decideur ou la deadline. "TBD" ne suffit pas.
8. Voix : direct, spécifique, légèrement fatigué. Pas de "leverage", "unlock",
   "double down", "transform". Pas de "j'espère que ça vous trouve bien".

Sors le PRD uniquement. Pas de commentaire sauf si je demande.
```

### Forme d'entrée

```
[Le travail]
Feature : <nom>
Utilisateur cible : <qui> (spécifique — rôle, taille du client, segment)

[Statut / contexte]
Étape : idée / esquissée / construction / ship
Signal : research / tickets / push exec / tendance métrique / concurrent
Audience pour le PRD : eng / leadership / sales

[Matière brute]
Puces, thread Slack, notes de réunion, PRD précédent. Non formaté c'est ok.

[Contraintes]
- Longueur de doc
- Tonalité
- Décisions déjà prises (ne rejouez pas)
- Décisions explicitement PAS prises encore (flag comme questions ouvertes)
```

---

### Exemple travaillé — PRD « Saved searches »

**Entrée :**

```
[Le travail]
Feature : Saved Searches dans notre dashboard SaaS
Utilisateur cible : Power users — rôles ops et analytics chez nos clients,
typiquement des équipes de 10-50 personnes qui utilisent le dashboard quotidiennement.

[Statut / contexte]
Étape : esquissée. Entendu dans 6 appels clients sur 8 semaines, 12 tickets
support dans la même fenêtre. Pas de design encore.
Audience : engineering lead + 2 engineers IC + design.

[Matière brute]
- Les clients veulent sauvegarder une vue filtrée et y revenir
- Ils veulent la nommer
- Ils veulent la partager avec leur équipe (certains, pas tous)
- Ils veulent être notifiés quand les résultats changent (certains, pas tous)
- Certains ont demandé l'API ; la plupart via UI
- Workaround actuel : bookmarker l'URL avec query params — fragile,
  casse quand on change la structure d'URL

[Contraintes]
- 1-2 pages
- Tonalité : scrappy, interne
- Décidé : c'est dans le dashboard, pas une page séparée
- Décidé : saves personnels d'abord ; team-shared est Phase 2
- Ouvert : notifications quand les résultats changent — Phase 1 ou 2 ?
```

**Sortie (extrait) :**

```
# PRD — Saved Searches (v0.5, Alex, 2026-05-14)

## Problème
Power users — rôles ops et analytics chez nos clients — font les mêmes
requêtes filtrées plusieurs fois par semaine. Aujourd'hui ils bookmarkent des URLs,
qui cassent quand on met à jour la structure de query-param. On a entendu ça
dans 6 appels clients et 12 tickets sur les 8 dernières semaines.

Citation (Maya, ops lead chez <Client>) : "Je rebuild le même filtre chaque
lundi. J'ai abandonné les bookmarks parce que la moitié a arrêté de marcher
après votre dernière release."

## Objectif
Réduire la friction "j'ai perdu ma vue filtrée" pour les power users.
Concrètement : laisser un utilisateur sauvegarder une vue filtrée nommée, y revenir, et
(Phase 2) la partager.

## Non-objectifs
- Saved searches partagées en équipe → Phase 2. Voir Questions ouvertes.
- Saved searches API-first → Phase 2. La plupart de la demande est UI.
- Saved searches cross-product (dashboard + reports) → hors scope ;
  workstream séparé.
- Analytics de saved-search (lesquelles sont les plus utilisées) → Phase 2.

## Métriques de succès
- 25 % des dashboard users actifs hebdomadaires créent au moins une saved
  search dans les 60 jours du launch
- La catégorie de tickets support "lost my view" chute de 50 % sur la même
  fenêtre de 60 jours (baseline : ~24/mois au T1 2026)
- Médiane de saved searches par power user actif ≥2 à J30

## Critères d'acceptation
- L'utilisateur peut sauvegarder la vue filtrée actuelle avec une action en un clic "Save this
  view" dans le dashboard
- La vue sauvegardée est nommée (défaut = auto-résumé des filtres ; éditable)
- Les vues sauvegardées apparaissent dans une section left-rail "My saved views"
- Rouvrir restaure l'état exact du filtre, peu importe les changements d'URL
- Les vues sauvegardées sont stockées en JSON de filtre, pas en chaînes d'URL
- Jusqu'à 50 vues sauvegardées par utilisateur ; au-dessus de la limite montre une erreur claire

## Scope
**Dedans :** Saves personnels ; UI-only ; nommés ; restorables. Cap 50/user.
**Dehors :** Team-shared. API. Notifications. Cross-product.
**Stretch :** Soft delete + restore pour saves supprimés accidentellement.

## Questions ouvertes
1. Notifications quand les résultats changent → Phase 1 ou 2 ?
   Recommandation : Phase 2. Ajoute une couche de détection de changement dont la boucle
   core save/restore n'a pas besoin. Decideur : <PM> d'ici 2026-05-21.
2. Limite de stockage par utilisateur — 50 paraissait bon ; pas de vraies données. Ouvert à
   ajuster selon le feedback engineering sur le stockage.
3. Politique de migration quand une colonne de filtre sous-jacente est renommée ou
   supprimée. Decideur : <eng lead> + <PM>, avant le kickoff.
```

Ce que ce PRD fait :

- Cite un vrai utilisateur dans la section Problème.
- Non-objectifs fait le heavy lifting — quatre coupes explicites, chacune avec une raison.
- Les métriques de succès ont des chiffres, baselines et fenêtres temporelles.
- Les critères d'acceptation sont testables.
- La section "Dehors" du Scope coupe court aux "mais qu'en est-il" à l'avance.
- Les questions ouvertes ont des decideurs et deadlines.

Ça fait 700 mots sur un PRD de 1-2 pages. Bien dimensionné pour le travail.

---

## Partie 2 — Roadmap Now / Next / Later

### Le prompt

```
Tu mets à jour une roadmap Now/Next/Later. Règles :

1. Trois colonnes : Now, Next, Later. Rien d'autre.
2. Chaque item est un outcome (ex. "Cut 'lost my view' tickets 50 %"),
   pas un nom de feature. Nom de feature entre parenthèses.
3. Chaque item a un Trimestre et une Confiance (Haute / Moy / Basse).
   La Confiance est honnête. Ne classe pas tout en Haute.
4. "Now" = committed, en cours.
5. "Next" = committed pour le cycle suivant.
6. "Later" = sur le radar, pas committed.
7. Si l'utilisateur propose de déplacer un item de Later à Now sans coupe
   correspondante, pousse en retour : "Qu'est-ce qui dans Now sort ?"
8. Sors la roadmap comme tableau markdown. Un paragraphe en dessous
   expliquant ce qui a changé depuis le dernier cycle.

Voix : direct, spécifique. Pas de "bientôt" sans un trimestre. Pas de verbes vagues.
```

### Forme d'entrée

```
[Roadmap actuelle]
Collez la Now / Next / Later existante, ou décrivez verbalement.

[Ce qui a changé]
- Nouvelles initiatives ajoutées
- Initiatives qui ont shippé
- Initiatives qui glissent ou sont dépriorisées
- Contexte stratégique (un engagement client, un mouvement concurrent, un
  changement de capacité, etc.)

[Contraintes]
- Horizon trimestre (1-2 trimestres typique)
- Réalité de capacité d'équipe (changements majeurs depuis le cycle précédent ?)
- Audience (équipe interne, leadership, sales-facing)
```

### Exemple travaillé

**Entrée :**

```
[Roadmap actuelle]
Now :
- Complétion onboarding +10pp (flow first-run révisé) — T2 26, Haute
- Cut tickets "lost my view" 50 % (Saved Searches v1) — T2 26, Haute

Next :
- Parité mobile-web pour top 5 flows dashboard — T3 26, Moy
- Rétention power-user +5pp (Team-shared saves + API) — T3 26, Moy

Later :
- Analytics in-product pour admins côté client — T4 26, Basse
- Dashboard rate-limit API pour engineers côté client — T4 26, Basse

[Ce qui a changé]
- Le travail onboarding est sur les rails mais tend vers Moy, pas Haute — on
  trouve plus de cas limites dans le flow first-run qu'attendu.
- Un client top-3 a engagé son renouvellement conditionnel au ship de Team-shared
  saves au T3. On doit avancer ça plus tôt.
- On a perdu un engineer ce trimestre. Capacité down ~20 %.

[Contraintes]
- Horizon 2 trimestres
- Audience : readout leadership
```

**Sortie :**

```
| Bucket | Outcome | Trimestre | Confiance |
|--------|---------|---------|------------|
| Now    | Cut tickets "lost my view" 50 % (Saved Searches v1)   | T2 26 | Haute |
| Now    | Complétion onboarding +10pp (flow first-run)          | T2 26 | Moy  |
| Next   | Rétention power-user +5pp (Team-shared saves + API)   | T3 26 | Moy  |
| Next   | Parité mobile-web pour top 5 flows dashboard          | T3 26 | Basse |
| Later  | Analytics in-product pour admins côté client          | T4 26 | Basse |
| Later  | Dashboard rate-limit API pour engineers côté client   | T4 26 | Basse |

**Ce qui a changé :** L'onboarding est passé de Haute à Moy confiance —
le flow first-run a plus de cas limites qu'attendu. Team-shared saves
reste dans Next (T3) mais c'est maintenant un engagement contractuel pour un renouvellement
client top-3, donc c'est la priorité pour T3 même au coût de
la parité mobile-web (maintenant Basse confiance vu la perte de capacité ~20 %
liée à la perte d'un engineer). Recommande de revisiter mobile-web au T4
sauf si on backfill.
```

Ce que cette sortie fait :

- Honnête sur la Confiance. L'onboarding a chuté à Moy à cause de nouveaux cas limites.
- Fait remonter le renouvellement client-conditionnel comme raison de prioriser Team-shared saves.
- Nomme le coup de capacité et ses conséquences simplement.
- Ne prétend pas que l'équipe peut absorber la perte sans un tradeoff.

---

## Quand sauter le PRD

Toutes les features n'ont pas besoin d'un PRD. Sautez-le quand :

- Le travail fait <2 jours et l'équipe comprend déjà l'utilisateur.
- Le travail est un bug fix ou un petit refactor.
- Le travail a été discuté à fond dans un doc de design, et le PRD ferait juste résumer.

Quand sauter le PRD mais garder l'artefact : écrivez un « quoi + pourquoi + comment on saura » en 3 puces à la place. Même le petit travail bénéficie d'un énoncé d'outcome écrit.
