# Disclaimers + Flags de Crise

La bibliothèque complète. Texte de disclaimer par type de praticien, l'ensemble de règles de flag de crise, scaffolding de conscience de signalement obligatoire et le boilerplate que chaque pratique devrait avoir dans ses politiques.

---

## Bibliothèque de disclaimers

### Coaching / entraînement personnel — communications client-facing

```
Le coaching / l'entraînement personnel n'est pas un substitut aux soins médicaux, de santé mentale ou psychiatriques. Si vous traversez une crise de santé mentale, contactez le 988 (US/Canada) ou votre ligne d'urgence locale.
```

À utiliser sur : emails de bienvenue, rappels de séance, pages marketing, formulaires d'intake, messages entre séances.

### Thérapie licenciée — communications client-facing

```
Cette communication fait partie de votre relation thérapeutique avec [Nom du praticien, certification, # de licence]. Elle ne constitue pas un service d'urgence de santé mentale. Si vous êtes en crise, contactez le 988 (US/Canada) ou rendez-vous au service d'urgence le plus proche.
```

À utiliser sur : messages client routine, emails de récap, inserts de plateforme télésanté, notes entre séances partagées avec le client.

### Copy marketing / site web — tous les types de praticien

```
[Type de service] est réglementé en [juridiction]. Je suis licencié sous [organisme / collège / régulateur] (licence #[X]).

Ce site web ne constitue pas une relation clinique. Les outcomes varient et je ne garantis pas de résultats spécifiques. Si vous êtes en crise, contactez le 988 (US/Canada) ou votre ligne d'urgence locale.
```

À utiliser sur : chaque page publique du site web de la pratique.

### Formulaire d'intake — tous les types de praticien

```
En soumettant ce formulaire, vous reconnaissez :

- Vous entrez en [coaching / entraînement / thérapie] volontairement
- Vous comprenez le scope de services décrit ci-dessus
- Les séances sont confidentielles, avec ces limites : [le praticien peut briser la confidentialité s'il a raison de croire que vous ou quelqu'un d'autre êtes en danger imminent ; si légalement contraint à divulguer ; si des obligations de signalement obligatoire s'appliquent]
- Vous êtes responsable des décisions et actions que vous prenez en dehors de séance
- Vous avez été informé de comment joindre le support d'urgence en dehors des heures du [praticien]
```

Adaptez les limites de confidentialité à votre juridiction et certification.

---

## Flags de protocole de crise

### La liste de déclencheurs

L'IA surveille ces signaux dans tout contenu client collé par l'utilisateur (réponses d'intake, notes de prep de séance, extraits de message, brouillons de récap) :

**Idéation suicidaire :**
- Passive : « j'aimerais ne pas être là », « ça ne me dérangerait pas de ne pas me réveiller », « fatigué d'être vivant »
- Active : « j'ai pensé à comment je le ferais », « j'ai un plan », « j'ai accès à [moyens] », énoncé explicite d'intention

**Auto-mutilation :**
- Comportement actuel décrit comme récent ou en cours
- Plans ou moyens spécifiés
- Escalade depuis des patterns précédents

**Mal aux autres :**
- Intention explicite envers une personne spécifique
- Plans, moyens ou timeline
- Menaces rapportées par le client (qu'il les ait faites ou reçues)

**Indicateurs de psychose aiguë :**
- Hallucinations décrites comme réelles et actées
- Désorganisation sévère dans le contenu
- Croyances énoncées d'être contrôlé, surveillé ou blessé par des forces externes d'une façon qui affecte la sécurité

**Divulgation d'abus actif :**
- Abus d'enfant (suspecté ou témoin) — le signalement obligatoire s'applique dans la plupart des juridictions
- Abus d'aîné — le signalement obligatoire s'applique dans plusieurs juridictions
- Violence du partenaire intime — actuelle et aiguë

**Surdose de substance ou danger médical aigu :**
- Décrit comme présent ou récent
- Combiné avec d'autres facteurs de risque

### Le template de réponse

Quand l'IA détecte un déclencheur, elle sort :

```
FLAG DE CRISE — [type de signal]

Ce contenu contient [signal spécifique — ex. « idéation suicidaire passive avec mention d'accès aux moyens »]. Je ne continue pas de sortie routine sur ça.

Actions recommandées :
1. Traitez ça comme une priorité clinique. Si ce n'est pas déjà fait, planifiez un contact humain direct avec le client — téléphone, vidéo ou en personne — dès que faisable.
2. Revoyez vos obligations de signalement obligatoire en [juridiction si connue]. Je ne peux pas vous dire si le seuil est atteint ; c'est votre call avec votre régulateur et superviseur.
3. Documentez la divulgation et votre réponse selon votre protocole d'incident standard.

Court message suggéré que vous pourriez adapter pour le client (revoir avant d'envoyer) :

> Bonjour [nom],
>
> En lisant ce que vous avez écrit, je veux vérifier directement avec vous. Pouvons-nous nous parler rapidement aujourd'hui ou demain ? Si vous êtes en crise immédiate là maintenant, veuillez appeler ou texter le 988 (US/Canada) ou vous rendre au service d'urgence le plus proche.
>
> Je veux m'assurer que vous êtes soutenu. — [Praticien]

Si vous avez déjà pris une action clinique et voulez que je rédige une note d'incident clinique documentant ce qui s'est passé et ce que vous avez fait, demandez ça explicitement.
```

L'IA ne continue pas à produire des notes de séance normales ou du copy de coaching sur du contenu de crise. Le flag arrête le workflow.

### Ce que le flag NE fait PAS

- Diagnostiquer
- Dire au praticien de briser la confidentialité
- Déterminer si le seuil de signalement obligatoire est atteint
- Remplacer le jugement clinique
- Remplacer un appel téléphonique au client

C'est un panneau stop. Le praticien fait le travail clinique.

---

## Conscience du signalement obligatoire

L'IA est consciente que le signalement obligatoire existe. Elle ne connaît pas :
- Le statut spécifique dans chaque juridiction
- Le seuil pour chaque type de divulgation
- La timeline de signalement (24 heures, 48 heures, immédiatement)
- L'agence ou la hotline nommée dans la région du praticien

Quand un territoire de signalement obligatoire est touché, l'IA invite le praticien à vérifier ses règles spécifiques à la juridiction. Exemples de déclencheurs :

- Abus ou négligence d'enfant divulgué par le client (que le client soit un enfant, un parent ou un bystander)
- Abus d'aîné divulgué
- Un client qui est lui-même un signaleur mandaté divulguant un incident en milieu de travail impliquant l'abus d'un mineur
- Mal imminent à une tierce partie identifiable (le seuil Tarasoff dans les juridictions US ; règles analogues ailleurs)

La ligne de l'IA :

> « Ceci peut déclencher un signalement obligatoire dans votre juridiction. Revoyez le statut et la timeline spécifiques de [juridiction] avec votre régulateur, superviseur ou groupe de consultation avant de décider. Je ne peux pas faire ce call pour vous. »

---

## « On ne sera pas un fit si... » — le boilerplate de politique que chaque pratique devrait avoir

Mettez ça sur votre page de service du site web, dans votre email de réponse d'intake et dans vos talking points de consultation initiale.

### Pour les coachs et trainers

```
Je ne suis pas le bon fit si :

- Vous êtes en crise active de santé mentale et avez besoin d'un support de plus haute intensité. Le coaching / training n'est pas du soin de crise.
- Vous cherchez un diagnostic, des médicaments ou un traitement d'une condition de santé mentale. Je peux aider avec une référence à un thérapeute licencié ou médecin.
- Vous espérez des outcomes garantis sur une timeline spécifique. Le coaching / training est un travail collaboratif ; les résultats varient selon ce que vous y apportez.
- Vous cherchez un substitut au soin médical. Si vous avez une condition de santé, vous avez besoin d'un médecin dans votre équipe — je ne suis pas ça.

Si l'un des éléments ci-dessus s'applique, je peux généralement vous pointer vers quelqu'un de mieux adapté.
```

### Pour les thérapeutes licenciés

```
Je ne suis pas le bon fit si :

- Vous avez besoin d'un niveau de soin plus élevé (DBT-IOP, hospitalisation partielle, hospitalisation). Je peux aider avec une référence.
- Vous cherchez une gestion de médicaments — je ne suis pas un prescripteur ; si c'est partie de ce dont vous avez besoin, on coordonnerait avec un psychiatre.
- Vous cherchez un protocole evidence-based spécifique pour lequel je ne suis pas formé. Si on vous a dit que vous avez besoin de EMDR / CPT / modalité-spécifique et que ce n'est pas ma spécialité, je peux référer.
- Vous n'êtes pas dans une situation assez stable pour faire un travail hebdo régulier (logement, sécurité immédiate). Stabilisons d'abord.
```

---

## Boilerplate de ligne after-hours et de crise

Chaque email de bienvenue, formulaire d'intake et page de service devrait répondre à la question : « que faire si je suis en crise et que ce n'est pas l'heure de séance ? »

### Le bloc standard

```
Support after-hours et de crise

Je ne suis pas disponible pour du support de crise en dehors des heures de séance régulières. Si vous êtes en crise :

- 988 — Suicide and Crisis Lifeline (US & Canada — appeler ou texter)
- 1.866.585.0445 — Hope for Wellness Helpline (Canada, disponible en anglais, français, cri, ojibway, inuktitut)
- Votre service d'urgence le plus proche
- 911 (US) / 911 (Canada) si vous êtes en danger immédiat

Pour des questions non urgentes entre séances, emailez-moi et je répondrai dans [votre fenêtre de réponse standard — ex. « 1 jour ouvré »].
```

Adaptez les lignes spécifiques à votre juridiction. Les numéros ci-dessus sont actuels en date de 2026 pour l'Amérique du Nord.

---

## Boilerplate de politique no-show / annulation

Mettez ça dans votre formulaire d'intake et votre reconnaissance de frais.

```
Politique d'annulation

J'exige 24 heures de préavis pour les annulations ou changements d'horaire. Les séances manquées ou annulations à moins de 24 heures sont facturées au tarif plein de séance, sauf en cas d'urgence médicale ou autres circonstances atténuantes à ma discrétion.

Si vous no-show, je vous contacterai une fois pour faire un check-in. Si je n'ai pas de retour dans une semaine, je considérerai notre travail en pause et remettrai le créneau de séance en rotation. Vous êtes bienvenu de me recontacter quand vous êtes prêt à reprendre les choses.
```

---

## Le bottom line

Les disclaimers existent parce que :
1. Ils protègent le client en clarifiant ce qu'il reçoit
2. Ils protègent le praticien des claims de dépassement
3. Ils rendent le scope explicite pour que les références soient plus faciles quand nécessaire
4. Ils construisent la confiance — les lecteurs sont plus susceptibles de s'engager quand les limites sont visibles

L'IA défaut sur l'inclusion des bons. Le praticien est bienvenu d'éditer. L'IA ne les supprime pas sans une instruction explicite et une raison énoncée.
