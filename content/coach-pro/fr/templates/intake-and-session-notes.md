# Formulaires d'Intake + Notes de Séance

Trois formats couverts : formulaire d'intake, notes SOAP, notes DAP, notes narratives. Choisissez le format qui matche votre certification et cas d'usage.

---

## Template de formulaire d'intake

Pour l'onboarding de première séance. À utiliser comme formulaire numérique (Google Forms / Typeform / Practice Better / Jane / SimplePractice) ou à coller dans votre portail client.

### Le prompt

```
Tu rédiges un formulaire d'intake client pour un [type de praticien] en [juridiction]. Génère un formulaire d'intake complet incluant :

1. Identification du client (nom, pronoms, méthode de contact préférée, fuseau horaire)
2. Contact d'urgence + instructions after-hours
3. Raison de chercher du [coaching / entraînement / thérapie]
4. Historique pertinent au niveau approprié à mon périmètre de pratique (pas d'historique médical sauf si je suis licencié pour ça)
5. Objectifs — à quoi ressemblerait le succès dans 3 mois
6. Expérience passée avec [coaching / entraînement / thérapie]
7. Logistique (préférence de fréquence, modalité, scheduling)
8. Reconnaissance des frais + politique d'annulation
9. Énoncé de périmètre de pratique — ce que je fais et ne fais pas
10. Consentement éclairé — confidentialité, limites à la confidentialité, conscience du signalement obligatoire si applicable
11. Reconnaissance de ligne de crise

Sors comme un formulaire numéroté propre. Chaque question devrait être répondable en 1-3 phrases.

Mes détails de pratique :
- Type de praticien : [coach de vie / entraîneur personnel / thérapeute licencié avec certification]
- Juridiction : [province/état]
- Services offerts : [ce que je fais vraiment]
- Frais : [vos frais]
- Politique d'annulation : [votre politique]
- Format de séance : [en personne / vidéo / téléphone / mix]
```

### Structure de sortie (exemple pour un coach de vie)

```
# [Nom de la Pratique] — Intake Nouveau Client

Merci d'avoir mis en place votre première séance. Veuillez compléter ce formulaire au moins 24 heures avant notre rencontre.

## 1. À propos de vous
- Nom complet
- Nom préféré (si différent)
- Pronoms
- Email
- Téléphone (utilisé seulement pour le scheduling sauf si vous me dites autrement)
- Fuseau horaire

## 2. Contact d'urgence
- Nom + relation avec vous
- Téléphone

Note : je garde des heures de séance régulières (mar-ven, 9h-17h MT). Je ne suis pas disponible pour du support de crise en dehors de ces heures. Si vous êtes en crise, contactez le 988 (US/Canada) ou rendez-vous au service d'urgence le plus proche.

## 3. Qu'est-ce qui vous amène au coaching maintenant ?
Quelques phrases sur ce sur quoi vous espérez travailler. Pas besoin d'écrire des mémoires — on y entrera ensemble.

## 4. À quoi ressemblerait "bon" dans 3 mois ?
Plus l'image est claire, plus notre première séance sera utile.

## 5. Avez-vous travaillé avec un coach ou thérapeute avant ?
- Oui / Non
- Si oui — qu'est-ce qui a marché ou pas pour vous ?

## 6. Logistique
- Fréquence préférée (hebdo / bi-hebdo / mensuelle)
- Modalité préférée (vidéo / téléphone / en personne)
- Toute contrainte de scheduling que je devrais savoir

## 7. Frais et annulation
Mon tarif est [X$] par séance. Politique d'annulation : 24 heures de préavis requises ; les séances manquées ou annulations tardives sont facturées au tarif plein.

En soumettant ce formulaire, vous reconnaissez les frais et la politique d'annulation.

## 8. Ce que je fais et ne fais pas
Je suis un coach de vie, pas un professionnel de santé mentale licencié. Le coaching est focalisé sur les objectifs present-day, la responsabilisation et la reconnaissance de patterns. Ce n'est pas un substitut à la thérapie ou aux soins médicaux.

Si à un moment je remarque quelque chose qui est en dehors de mon scope, je vous le dirai et on pourra parler d'une référence. C'est partie de comment je travaille, pas un problème.

## 9. Consentement éclairé
En soumettant ce formulaire vous confirmez :
- Vous entrez en coaching volontairement
- Vous comprenez que le coaching n'est pas de la thérapie ou des soins médicaux
- Les séances sont confidentielles, avec ces limites : je peux briser la confidentialité si j'ai raison de croire que vous ou quelqu'un d'autre êtes en danger imminent, ou si je suis légalement contraint à divulguer
- Vous êtes responsable de vos propres décisions et des actions que vous prenez en dehors de séance

## 10. Quoi que ce soit d'autre que je devrais savoir avant notre première séance ?
Optionnel. Quelques phrases si quelque chose vous vient à l'esprit.
```

Pour les thérapeutes licenciés, les formulaires d'intake sont plus longs et incluent l'historique clinique. Pour les entraîneurs personnels, échangez objectifs/historique pour évaluation fitness + screening santé (PAR-Q+) + historique de blessures.

---

## Template de note SOAP

Pour les cliniciens licenciés et praticiens en santé alliée.

### Le prompt

```
Tu rédiges une note SOAP à partir d'un contenu brut de séance.

Type de praticien : [LCSW / RP / LPC / psychologue / PT / OT / etc.]
Client : [initiales ou pseudonyme]
Séance # : [numéro]
Date : [date]
Modalité : [en personne / vidéo / téléphone]
Durée : [minutes]

Contenu brut (ce qui est ressorti en séance) :
[coller vos notes brutes — mots du client, vos observations, thèmes]

Règles :
- Longueur 200-400 mots au total
- Subjectif = expérience rapportée du client (citer avec parcimonie)
- Objectif = votre comportement observé, affect, présentation, items mesurables
- Évaluation = votre impression clinique en langage observationnel ; NE nommez PAS de diagnostic DSM-5 sauf si j'en fournis explicitement un
- Plan = prochaines étapes, travail entre séances, focus de la prochaine séance
- Signalez tout signal de crise ou événement scope-boundary explicitement
- Termine avec une ligne de signature clinicien + certification
```

### Structure de sortie (exemple)

```
# Note SOAP — Cliente J.K. — Séance 4
**Date :** 2026-05-14 | **Modalité :** Vidéo | **Durée :** 50 min

**S (Subjectif) :**
La cliente a rapporté une "semaine difficile" — décrit deux conflits de limites avec sa sœur, dont un qui l'a laissée "se sentir comme une enfant à nouveau". A rapporté du sommeil à 5-6 heures par nuit cette semaine, en baisse depuis 7-8 la semaine dernière. A nié SI/HI quand on lui a directement demandé. A rapporté une certaine anxiété accrue en milieu de semaine, résolue d'ici vendredi.

**O (Objectif) :**
La cliente s'est présentée orientée x3, affect légèrement contraint comparé aux séances précédentes. Taux de parole dans les limites normales. Engagée activement dans la résolution de problèmes la seconde moitié de séance. Pas d'agitation psychomotrice. A fait un contact visuel approprié via vidéo.

**A (Évaluation) :**
Le travail de limites avec la famille d'origine reste le thème principal. La cliente démontre une capacité améliorée à identifier le pattern en temps réel, avec un certain décalage dans l'implémentation de la limite. L'anxiété cette semaine semble situationnelle et auto-limitante. Pas de préoccupations de sécurité à ce moment.

**P (Plan) :**
Continuer Séance 5 la semaine prochaine, même heure. Entre les séances, la cliente va (1) pratiquer la phrase de limite scriptée sur laquelle on a travaillé, (2) journaler une situation où elle a remarqué le pattern avant de réagir. Focus de la prochaine séance : approfondir le script de limite + introduire le travail de clarification des valeurs si approprié. Aucune préoccupation clinique signalée.

— [Nom du Clinicien], [Certification]
```

---

## Template de note DAP

Pour counselling, travail social et tout praticien dont le workflow utilise DAP.

### Le prompt

```
Tu rédiges une note DAP à partir d'un contenu brut de séance.

[Même en-tête d'entrée que SOAP]

Règles :
- Longueur 150-300 mots
- Données = subjectif + objectif combinés (rapports du client + vos observations)
- Évaluation = impression clinique en langage observationnel
- Plan = prochaines étapes + travail entre séances
- Signalez tout signal de crise ou événement scope-boundary
```

### Structure de sortie (exemple)

```
# Note DAP — Client M.R. — Séance 8
**Date :** 2026-05-14 | **Modalité :** En personne | **Durée :** 45 min

**D (Données) :**
Le client a décrit une semaine productive. A rapporté avoir utilisé l'exercice de grounding trois fois pendant des moments de haute anxiété au travail et l'avoir trouvé "vraiment utile". Affect plus brillant que lors des séances précédentes, posture plus ouverte, engagé tout au long. A nié SI/HI au check-in routine. A soulevé un événement familial à venir comme stresseur potentiel.

**A (Évaluation) :**
Progrès continu sur la gestion de l'anxiété. Le client démontre l'internalisation des techniques de grounding et leur utilisation proactive. Anxiété anticipatoire concernant l'événement familial notée ; sera intégrée au planning de la prochaine séance. Pas de préoccupations de sécurité.

**P (Plan) :**
Séance 9 la semaine prochaine. Entre les séances, le client pratiquera le grounding quotidiennement et journalera un stresseur anticipé pour l'événement familial. Prochaine séance : prep structurée pour l'événement, incluant le langage de fixation de limites.

— [Nom du Clinicien], [Certification]
```

---

## Notes de séance narratives (pour coachs et trainers)

Quand les formats cliniques ne fittent pas votre pratique.

### Le prompt

```
Tu rédiges des notes de séance narratives à partir de contenu brut.

Type de praticien : [coach de vie / entraîneur personnel / coach nutrition / etc.]
Client : [initiales ou pseudonyme]
Séance # : [numéro]
Date : [date]
Modalité : [en personne / vidéo / téléphone]
Durée : [minutes]

Contenu brut :
[coller notes brutes]

Règles :
- Longueur 150-300 mots
- PAS format clinique (pas d'"Évaluation" — utilise "Observations" ou "Ce que j'ai remarqué")
- Reste dans le scope coaching — décrit le travail, pas les impressions cliniques
- Identifie tout engagement que le client a pris pour entre les séances
- Signale tout moment où je devrais considérer référer (tout ce qui pattern-match à la santé mentale, médical ou autre territoire licensed-scope)
```

### Structure de sortie (exemple — coach de vie)

```
# Notes de Séance — Cliente A.L. — Séance 6
**Date :** 2026-05-14 | **Modalité :** Vidéo | **Durée :** 50 min

**Sur quoi on a travaillé :**
A.L. a ouvert avec la conversation qu'elle évitait avec son business partner — elle l'a eue mardi. Elle l'a décrite comme "moins terrible que ce que j'attendais, mais je dois encore faire un suivi sur le morceau argent". On a passé la première moitié à dépaqueter ce qui a marché (clarté dans son ouverture, rester sur le sujet) et ce qui n'a pas (céder quand le partner a poussé sur la timeline).

**Ce que j'ai remarqué :**
A.L. nomme ses patterns plus vite qu'il y a trois séances. Elle a attrapé le fold mi-story sans prompt. Tend toujours à adoucir la demande quand il y a du pushback ; on va continuer à travailler là-dessus.

**Engagement entre séances :**
Elle enverra l'email de suivi sur le morceau argent d'ici vendredi. Rédigera en solo, pas d'édits de moi.

**Focus de la prochaine séance :**
Revoir l'email + la réponse du partner si elle est arrivée. Continuer le travail sur tenir la demande sous pushback.

**Notes de référence :**
Aucune. Rien signalé comme en dehors du scope coaching cette séance.

— [Nom du Coach]

*Le coaching n'est pas un substitut aux soins médicaux ou de santé mentale. Si vous êtes en crise, contactez le 988 (US/Canada) ou votre ligne d'urgence locale.*
```

---

## Quand vous choisissez mal un format

- **SOAP pour un coach** — trop clinique ; vous finirez par écrire des évaluations que vous ne pouvez pas défendre
- **Narratif pour un clinicien licencié facturant l'assurance** — ne rencontrera pas les exigences de documentation
- **DAP pour un entraîneur personnel** — overkill ; utilisez narratif
- **N'importe quoi formaté sans un disclaimer** — re-prompt ; le kit devrait en produire un par défaut
