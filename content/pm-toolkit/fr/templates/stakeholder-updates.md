# Templates d'Updates Stakeholders

> Trois saveurs, même squelette : brief exec, détail engineering, customer-facing. Même semaine de travail compressée pour trois audiences différentes.

---

## Le squelette (les trois saveurs le partagent)

1. **Statut** — un mot (Vert / Jaune / Rouge) plus une phrase
2. **Ce qui a shippé** — outcomes, pas features
3. **Ce qui arrive** — items committed pour le cycle suivant
4. **À risque** — honnête sur ce qui pourrait glisser
5. **La demande** — une chose spécifique dont vous avez besoin de cette audience

Les différences entre les saveurs sont :

- **Longueur :** 200 / 400 / 150 mots
- **Vocabulaire :** jargon interne ok dans exec et eng ; jamais dans customer-facing
- **Profondeur sur les blockers :** l'exec reçoit le headline ; eng reçoit les détails ; customer-facing omet généralement
- **La demande :** l'exec demande décision/headcount/intro ; eng demande priorisation ou unblock ; le client demande feedback ou participation beta

---

## Saveur 1 — Brief exec (~200 mots)

### Le prompt

```
Tu écris un update stakeholders exécutif. Règles :

1. ~200 mots. Cap dur : 250.
2. Démarre avec le statut comme un mot unique : Vert / Jaune / Rouge. Puis une
   phrase sur pourquoi.
3. "Ce qui a shippé" c'est des outcomes, pas des features. "Cut tickets 'lost my view'
   47 % en 30 jours" pas "Shippé Saved Searches v1".
4. "À risque" est honnête. Si quelque chose pourrait glisser, dis-le et pourquoi.
5. Termine avec une demande spécifique. "Besoin d'une décision sur X d'ici Y." Pas "fais-moi
   savoir si tu as des questions".
6. Pas de "J'espère que cet email vous trouve bien". Pas de "revient sur".
7. Voix : direct, calme, spécifique. Des chiffres quand vous les avez.

Sors l'update uniquement.
```

### Exemple travaillé

```
**Statut : Jaune** — Launch Saved Searches sur les rails pour le 30 mai ;
travail onboarding glisse de ~2 semaines à cause de la découverte de cas limites.

**Ce qui a shippé cette période**
- Cut échecs retry webhook 78 % (fermé une catégorie d'incident P1
  qui traînait)
- Parité mobile-web pour les top 3 flows dashboard
- Activation +3pp depuis la nouvelle expérience de tooltip first-touch

**Ce qui arrive (prochaines 2 semaines)**
- Saved Searches v1 → ship 30 mai, beta avec 4 clients d'abord
- Révision onboarding v2 → ajustée pour refléter les nouveaux cas limites
- Team-shared saves → kickoff 28 mai (committed dans le renouvellement
  <Client X>)

**À risque**
- Cible complétion onboarding (+10pp) — repoussée du T2 au début T3
  à cause des cas limites first-run. Mitigation : ship la v2 avec les
  cas limites à plus fort impact ; reste au T3.
- Parité mobile-web pour les 2 flows restants glisse au T4 sauf si on
  backfill le siège engineering qu'on a perdu.

**Demande**
Besoin d'une décision d'ici vendredi sur s'il faut backfill le siège engineering
ouvert ou accepter le slip mobile-web au T4. Les deux chemins marchent ; je préférerais
ne pas porter l'ambiguïté dans le planning de l'équipe la semaine prochaine.
```

Notez ce qui se passe :

- Le statut est Jaune, pas Vert. Le PM est honnête.
- « Ce qui a shippé » fait trois lignes, chacune un outcome avec un chiffre.
- « À risque » contient de vrais risques avec mitigations, pas du boilerplate.
- La demande est spécifique — une décision, par une date, avec les options posées.

Environ 200 mots. Un exec peut le scanner en 45 secondes.

---

## Saveur 2 — Détail engineering (~400 mots)

### Le prompt

```
Tu écris un update stakeholders pour l'équipe engineering. Règles :

1. ~400 mots. Cap dur : 500.
2. Même squelette que le brief exec, mais inclus :
   - Blockers (techniques ou organisationnels), avec chemins proposés
   - Dépendances sur d'autres équipes
   - Décisions que l'équipe demande, avec options + recommandation
3. Le vocabulaire technique est ok. Ne dumb pas down pour engineering.
4. Même discipline "démarrer avec le statut". Jaune est Jaune.
5. Termine avec la demande. Pertinente pour engineering : un call de priorisation, un
   unblock, une décision de tradeoff.

Sors l'update uniquement.
```

### Exemple travaillé

```
**Statut : Jaune** — Saved Searches sur les rails pour le 30 mai ; travail onboarding
glisse ~2 semaines ; une dépendance cross-team à risque.

**Shippé cette période (outcomes + comment)**
- Échecs retry webhook cut 78 % : introduit idempotency keys +
  dead-letter queue. Le support Stripe a confirmé que le pattern s'aligne avec
  leur recommandation. Volume de pages P1 12/mois → 3/mois.
- Parité mobile-web pour top 3 flows : refactor le primitive de layout dashboard
  pour utiliser CSS Grid ; a résolu le bug de breakpoint tablette qui traînait
  comme effet de bord.
- Activation +3pp : A/B test sur tooltip first-touch fermé à 95 % de confiance.
  La variante B (contextuelle plutôt que greeting) a gagné.

**Construction en cours**
- Saved Searches v1 — backend complet ; UI 80 %. Pattern de stockage
  filter-JSON validé contre les 12 query shapes les plus utilisées. Cohorte beta
  sélectionnée : 4 clients, tous power users, opt-in.
- Révision onboarding v2 — scope ajusté pour shipper les cas limites
  à plus fort impact d'abord. Trois cas limites restent pour le T3.

**Blockers et dépendances**
- Le kickoff Team-shared saves est contingent au ship par l'équipe Permissions
  du nouveau primitive RBAC (ETA : 25 mai). Tracké hebdo.
  Fallback : ship Team-shared saves avec un modèle de partage tout-ou-rien
  plus simple, refactor vers granulaire quand RBAC arrive.
- La latence backend search à p95 a monté de 18 % sur le T1 — pas
  user-impacting encore, mais en tendance. Proposition d'une engineer-semaine pour
  investiguer avant que ça devienne un feu T3.

**Décisions nécessaires**
1. Backfill le siège engineering ouvert au T2, ou accepter le slip mobile-web
   au T4 ? Recommandation : backfill. Mobile-web est dans 2 des 4
   demandes clients top-renouvellement pour le S2.
2. Team-shared saves avec fallback modèle de partage tout-ou-rien si RBAC
   slip ? Recommandation : oui. L'engagement client est pour T3, et le
   coût de refactor est ~3 jours quand RBAC arrive.

**Demande**
Besoin des deux décisions ci-dessus d'ici vendredi. Les deux façonnent le plan du prochain sprint.
```

Ce qui est différent du brief exec :

- Inclut comment le travail a shippé, pas juste l'outcome.
- Fait remonter une tendance de latence qui n'est pas user-impacting encore — signal engineering, pas signal exec.
- Cadre les décisions avec options et une recommandation, pas comme questions ouvertes.
- La demande nomme des décisions spécifiques et une date.

---

## Saveur 3 — Customer-facing (~150 mots)

### Le prompt

```
Tu écris un update customer-facing. Règles :

1. ~150 mots. Cap dur : 200.
2. Langage simple. Pas de jargon interne. Pas de callouts de métriques qui ne
   comptent pas pour le client.
3. Démarre avec ce que le client peut utiliser maintenant (la chose qui a shippé).
4. "Ce qui arrive" avec une granularité au mois au max. Pas d'engagements sur des
   dates exactes.
5. Un canal pour le feedback. Facile à utiliser.
6. Pas de couleurs de statut. Pas de langage "à risque". Si quelque chose compte pour
   le client, cadre positivement ou omet.
7. Voix : chaleureuse mais pas effusive. Confiante mais pas insistante.

Sors l'update uniquement.
```

### Exemple travaillé

```
Bonjour à toutes et tous,

Une petite note sur ce qui est nouveau dans le dashboard ce mois-ci et ce qui
arrive ensuite.

**Ce que vous pouvez utiliser maintenant**
- Le bouton "Save this view" est live dans le dashboard pour les power users.
  Sauvegardez vos vues filtrées, nommez-les, et elles se restaureront toujours
  exactement — même si notre structure d'URL change en dessous. Jusqu'à 50
  par utilisateur.
- Mobile-web est maintenant utilisable pour les trois flows que vous utilisez le plus :
  dashboards, alerts et audit log. Les deux flows restants arrivent
  cet automne.

**Ce qui arrive ensuite**
- Vues sauvegardées partagées en équipe — partagez une vue filtrée avec votre équipe.
  Visée pour juillet.
- Expérience first-run améliorée pour les nouveaux coéquipiers que vous onboardez. Fin
  juin.

**Une petite demande**
Si vous essayez Saved Views et trouvez quelque chose qui manque ou de bizarre, répondez
à cet email. Je lis chacun personnellement et ça façonne ce qu'on
construit ensuite.

— Alex
```

Ce qui est différent :

- Pas de couleur de statut, pas de cadrage « à risque ».
- « Jusqu'à 50 par utilisateur » fait remonter une vraie limite, mais en langage client.
- « Ce qui arrive ensuite » utilise des mois, pas des trimestres ou dates spécifiques.
- La demande est directe et facile (répondre à cet email).

---

## Comment utiliser les trois dans un workflow

La plupart des semaines, vous écrivez d'abord l'update détail-engineering parce que c'est là où la matière brute vit — votre sprint planning, vos blockers, les décisions de votre équipe. Puis vous compressez.

Workflow :

1. Écrivez l'update détail-engineering (~400 mots).
2. Passez-le par l'IA : « Compresse à 200 mots pour un brief exec. Garde une demande spécifique. Lâche le vocabulaire technique. »
3. Passez-le encore par l'IA : « Réécris pour nos clients en 150 mots. Langage simple. Lâche les blockers internes. Cadre autour de ce qu'ils peuvent utiliser maintenant. »

Temps total : 30 minutes pour les trois versions. Les passages de compression attrapent les sur-prétentions — si la version exec ne peut pas dire « shippé X » sans hedging, la version engineering l'a probablement aussi surclamé.

---

## Anti-patterns que le prompt bloque

- « J'espère que cet email vous trouve bien. » — Couper.
- « Voulais juste revenir sur... » — Couper.
- « Par mon dernier email... » — Couper.
- « On continue à faire des progrès sur... » — Vague. Remplacez par un outcome et un chiffre.
- « Les choses se passent bien ! » — Le statut est une couleur, pas un sentiment. Choisissez un.
- « Faites-moi savoir si vous avez des questions. » — Pas une demande. Énoncez la vraie demande.
- « Excité de partager... » — L'exec n'a pas besoin de savoir ce que vous ressentez. Allez à la substance.

Si l'un de ceux-ci passe, prompt : « Élimine chaque phrase de remplissage et réécris avec statut, outcomes et la demande. »
