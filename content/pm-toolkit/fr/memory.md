# Mémoire — Product Manager Toolkit

## Contexte du domaine

Le product management est la couche intermédiaire ingrate entre ce que les utilisateurs veulent, ce qu'engineering peut construire et ce que le business a besoin pour grandir. Le job du PM c'est la prise de décision sous information incomplète : décider quoi construire, dans quel ordre, avec quels tradeoffs et comment savoir si ça a marché. Les artefacts qu'un PM ship — PRDs, roadmaps, sprint plans, updates stakeholders, readouts de métriques — existent pour rendre ces décisions visibles et reviewables.

Une semaine typique : environ 40 % en réunions (planning, reviews, appels clients, 1:1s, readouts leadership), 30 % à écrire (specs, updates, docs de décision, threads Slack de suivi), 20 % sur de la recherche client ou data, et 10 % sur la surprise de la semaine. Les PMs en startup penchent plus vers l'écriture et le temps client ; les PMs dans de plus grandes entreprises penchent plus vers les réunions et la gestion de stakeholders. La sortie qui voyage le plus loin est écrite — les execs lisent votre update sur un téléphone, les sales reps citent votre roadmap dans des deals, les engineers référencent votre PRD des semaines après le kickoff. Écrire clairement est le vrai job.

Le succès ressemble à : l'équipe ship un travail qui fait bouger une métrique à laquelle l'entreprise tient, sur une timeline assez proche de ce que vous avez dit que vous ship pour que personne ne soit surpris. L'échec ressemble à : vous shippez la feature à temps, mais la métrique ne bouge pas, et personne ne peut vous dire pourquoi. Le bon PM passe autant d'énergie sur « comment saura-t-on que ça a marché » et « quelle est la prochaine expérience si ce n'est pas le cas » que sur la construction elle-même.

## Vocabulaire que l'IA doit connaître

- PRD : Product Requirements Document. Le spec d'une feature ou initiative.
- BRD : Business Requirements Document. Plus vieux, plus large, moins courant dans les shops modernes.
- Spec : raccourci pour PRD ou tout doc de design.
- Now/Next/Later : format de roadmap. Trois buckets, pas de dates au-delà du trimestre.
- OKR : Objectives and Key Results. Un framework de fixation d'objectifs. Utile comme outil, pas comme religion.
- KR : Key Result. La partie mesurable d'un OKR.
- North Star metric : la métrique de sortie unique autour de laquelle une équipe ou entreprise s'oriente.
- AARRR / Pirate Metrics : Acquisition, Activation, Retention, Referral, Revenue. Le funnel classique.
- JTBD : Jobs-to-be-done. Framework pour comprendre ce pour quoi les utilisateurs « embauchent » votre produit.
- ICE : Impact, Confidence, Ease — une rubrique de priorisation.
- RICE : Reach, Impact, Confidence, Effort — une rubrique de priorisation plus détaillée.
- Critères d'acceptation : la checklist pour « cette feature est-elle faite ».
- DoD : Definition of Done. Critères niveau équipe qui s'appliquent à chaque story.
- DAU / WAU / MAU : Daily / Weekly / Monthly Active Users.
- Activation : un utilisateur qui atteint le premier moment significatif de valeur. Définition spécifique au produit.
- Courbe de rétention : rétention par cohort sur le temps. Plate est l'objectif ; les courbes déclinantes signifient du churn.
- LTV / CAC : Lifetime Value / Customer Acquisition Cost. La math qui détermine si la croissance est saine.
- NPS : Net Promoter Score. Métrique de loyauté basée sur sondage. Directionnellement utile, pas load-bearing.
- ICP : Ideal Customer Profile. Le client pour qui le produit est construit.
- Sprint, standup, retro, refinement : vocabulaire scrum. À utiliser même si votre équipe n'est pas stricte sur scrum.
- Velocity, capacity, burndown : la math du planning. La capacity c'est des heures ; la velocity c'est des story points ou items shippés.
- Carryover : travail qui n'a pas fini dans le sprint précédent. Gérez-le explicitement ; ne le laissez pas s'empiler.

## Workflows courants

- **Écrire un PRD :** problème → objectif → non-objectifs → métriques de succès → critères d'acceptation → scope → questions ouvertes. La section Non-objectifs fait le plus de travail ; c'est là que vous coupez court à « mais qu'en est-il de X » avant que ça ne déraille le kickoff.
- **Mettre à jour une roadmap :** partez de la Now/Next/Later actuelle, regardez la livraison réelle du trimestre dernier, ajustez la Confiance (Haute/Moy/Basse) sur chaque item, déplacez les items entre buckets, puis re-partagez avec un paragraphe de contexte sur ce qui a changé.
- **Planifier un sprint :** math de capacité d'abord (PTO, on-call, réunions soustraits des heures nominales), puis triage du carryover, puis P0 / Stretch / Won't-do. Écrivez l'objectif du sprint en une phrase en haut.
- **Faire tourner une revue de métriques :** choisissez 3-5 métriques qui comptent le plus, écrivez tendance / comparé-à / hypothèse / suivi pour chacune. Enterrez le bruit.
- **Envoyer un update stakeholders :** partez de la version détail-engineering (~400 mots), puis compressez vers le brief exec (~200) et le customer-facing (~150). Même contenu, trois audiences.
- **Triage du feedback client :** clusterisez par thème, comptez la fréquence, pondérez par le fit ICP, déposez dans le backlog avec un outcome d'une ligne attaché.

## Ce qu'il faut éviter / erreurs courantes

- **PRD obèse.** Un PRD de 12 pages pour une feature de 2 jours signale à engineering que vous ne savez pas vraiment ce que vous voulez. Matchez la longueur du doc à la taille de la feature.
- **Roadmap avec une précision « T3 » traitée comme engagement.** « Later » signifie « Later ». Ne promettez pas un trimestre que vous n'avez pas vraiment planifié.
- **Cargo-culting OKR.** Mettre des OKRs parce que l'entreprise tourne en OKRs, pas parce que vous avez un objectif à fixer. Pire : écrire des KRs qui ne sont pas vraiment mesurables.
- **Prétendre qu'une métrique suffit.** Un North Star est utile, mais la plupart des équipes ont besoin de 2-4 métriques — usage, activation, rétention, revenu — pour savoir ce qui se passe vraiment.
- **La phrase « leverage ».** « We need to leverage our existing user base to unlock new growth verticals. » Coupez chaque mot de ça.
- **Écrire le PRD avant la conversation client.** Si vous ne pouvez pas citer un utilisateur, vous ne connaissez pas encore le problème.
- **Demandes vagues dans les updates stakeholders.** « Faites-moi savoir si vous avez des questions. » Ce n'est pas une demande. Énoncez quelle décision il vous faut ou quelle intro vous voulez.
- **Confondre items de roadmap avec noms de features.** « Build saved searches v1 » est une feature. « Cut "lost my view" tickets 50 % » est un outcome. Les roadmaps vivent sur les outcomes.

## Tonalité / registre

Un vrai PM sonne direct, légèrement fatigué et systématiquement spécifique. Il connaît la différence entre « les utilisateurs veulent ça » (qui est généralement du bruit) et « 12 clients ont demandé ça les 8 dernières semaines » (qui est du signal). Il ne survend pas son travail ; il laisse les chiffres et les citations utilisateurs faire le lifting. À l'écrit, il défaut sur des phrases courtes, des utilisateurs nommés quand possible et des dates et comptes explicites. Il est allergique aux verbes vagues : « leverage », « unlock », « drive », « double down », « transform ». Quand il dit « oui » à une feature, il le pense ; quand il dit « pas maintenant », il le pense aussi, et il peut expliquer pourquoi sans broncher. La voix devrait sonner comme quelqu'un qui a shippé du produit, pas comme quelqu'un qui lit un deck McKinsey.
