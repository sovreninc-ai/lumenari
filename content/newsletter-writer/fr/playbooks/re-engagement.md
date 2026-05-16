# Playbook de Re-Engagement

> La séquence à 3 emails à envoyer aux abonnés froids avant de les sunset. Plus l'argumentaire honnête pour le sunsetting tout court.

---

## Pourquoi c'est important

Un abonné froid — quelqu'un qui n'a pas ouvert un email de vous depuis 90+ jours — est statistiquement parti. Il pourrait encore être vivant, il pourrait vaguement se souvenir d'avoir souscrit, mais il ne lit pas. Et chaque email que vous lui envoyez fait trois mauvaises choses :

1. **Tire votre taux d'ouverture vers le bas.** Les providers de boîtes mail (Gmail, Outlook) utilisent les signaux d'engagement de l'expéditeur pour décider si vos futurs emails vont dans la boîte de réception ou en spam. Les abonnés froids sont des votes silencieux contre vous.
2. **Nuit à la deliverability pour les lecteurs engagés.** Quand votre réputation d'expéditeur chute, vos lecteurs engagés commencent à voir vos emails dans Promotions ou Spam. Les gens qui veulent vraiment votre travail payent le coût de ceux qui n'en veulent pas.
3. **Gonfle les comptes vanity.** Une liste de 6 000 abonnés à 28 % d'ouverture est pire — sur chaque métrique qui compte — qu'une liste de 4 000 abonnés à 50 %. Vous optimisez pour une métrique ou l'autre.

Le sunsetting se sent mal. C'est correct. La séquence de re-engagement est la façon polie de le faire : vous donnez à l'abonné froid une vraie chance de revenir, et s'il ne le fait pas, vous le retirez.

---

## La séquence

Trois emails, 14 jours au total. Grossièrement :

- **Email 1 (Jour 0) :** le retour doux. « Vous lisez toujours ? »
- **Email 2 (Jour 7) :** la valeur spécifique. « Voilà ce que vous avez manqué. »
- **Email 3 (Jour 14) :** la notice honnête de sunset. « Dernier appel avant que je vous retire. »

Quiconque ouvre ou clique sur l'un des trois revient en actif. Quiconque n'ouvre aucun est désabonné le Jour 17.

---

## Email 1 — Le retour doux (Jour 0)

### Le prompt

```
Tu écris le premier email dans une séquence de re-engagement à 3 emails
pour des abonnés froids. Règles :

1. Ligne de sujet : direct, légèrement self-aware. Pas "On vous regrette !"
2. Corps : 100-130 mots. Reconnaît qu'ils n'ont pas lu. NE les
   culpabilise PAS. Offre un vrai choix.
3. Un lien spécifique : soit vers l'issue la plus récente soit vers une issue
   représentative (le choix "si vous n'en lisez qu'une" de l'auteur).
4. Termine avec : "Si vous préférez ne pas les recevoir, c'est ok aussi —
   répondez 'non' et je vous retirerai de la liste." Rendez ça
   vraiment facile de dire non.
5. Voix : personnelle, chaleureuse, pas désespérée. L'auteur offre, ne supplie pas.

Sors la ligne de sujet + corps. Pas de commentaire.
```

### Exemple travaillé

```
Sujet : Vous lisez toujours ?

Salut —

J'ai remarqué que tu n'as pas ouvert la newsletter depuis quelques mois. Les boîtes
de réception sont bruyantes et c'est ok ; je veux juste m'assurer que je n'envoie pas
à quelqu'un qui préférerait ne pas avoir de mes nouvelles.

Si tu es toujours intéressé, voici l'issue la plus récente que je trouve
qui vaut ton temps : <lien>

Si tu préfères ne pas les recevoir, c'est ok aussi — réponds "non"
et je te retirerai de la liste. Sans rancune.

— Alex

P.S. Dans tous les cas, merci pour l'abonnement original. Ça a compté
quand tu t'es inscrit.
```

Ce que ça fait :

- La ligne de sujet est directe. Pas mignonne. Pas désespérée.
- Ouvre avec le vrai signal (« n'a pas ouvert depuis quelques mois ») — honnête, pas accusateur.
- CTA unique : lire la dernière, ou répondre non.
- Sortie facile en bas. Le lecteur n'a pas à trouver le lien de désabonnement.
- Le P.S. est réel, pas manipulateur. L'auteur le pense.

Réponse attendue : 5-15 % des abonnés froids ouvriront ça. Environ la moitié de ceux-là cliqueront. Une petite fraction répondra « non ». Le reste reste sur la liste, en attente du prochain email.

---

## Email 2 — La valeur spécifique (Jour 7)

Pour ceux qui n'ont pas ouvert l'Email 1, l'IA suppose que la ligne de sujet a raté. Essayez un angle différent.

### Le prompt

```
Tu écris le deuxième email dans une séquence de re-engagement à 3 emails.
Le destinataire N'a PAS ouvert le premier email il y a 7 jours. Règles :

1. Angle de ligne de sujet différent de l'Email 1. Si l'Email 1 était direct
   ("Vous lisez toujours ?"), celui-ci est curiosité ou valeur-d'abord ("3 choses que
   vous avez manquées depuis <mois>").
2. Corps : 130-180 mots. Nomme 2-3 choses spécifiques qu'ils ont manquées —
   les issues les plus populaires, la pièce la plus utile, ou la prise
   la plus controversée des 90 derniers jours.
3. Un CTA : lire l'une des issues nommées.
4. Même fermeture "si tu préfères pas, réponds non".
5. Voix : toujours chaleureuse, toujours pas désespérée. Légèrement plus spécifique.

Sors la ligne de sujet + corps. Pas de commentaire.
```

### Exemple travaillé

```
Sujet : Trois choses que tu as manquées depuis février

Salut —

Tu n'as pas ouvert la newsletter depuis un moment, mais je pense que quelques-unes
des récentes pourraient atterrir si tu leur jetais un œil. En voici trois
qui ont particulièrement bien marché :

1. "Les 100 premiers lecteurs ne viennent pas de Twitter" — l'issue
   la plus partagée que j'aie jamais écrite. Le taux de réponse était 7× ma moyenne.

2. "Ce que j'ai coupé de l'issue du mois dernier" — une pièce sur tuer
   tes chéris. Une poignée de lecteurs m'ont dit que ça avait changé comment
   ils éditent.

3. "La math de la croissance newsletter à 1 400 abonnés" — un regard sobre
   sur les tactiques qui paient vraiment à cette taille.

Si l'une d'elles te semble intéressante, voici les liens : <lien 1>,
<lien 2>, <lien 3>.

Sinon — entièrement juste. Réponds "non" et je te retire de la liste.

— Alex
```

Ce que ça fait :

- La ligne de sujet est curiosité-driven, angle différent de l'Email 1.
- Nomme trois issues spécifiques avec une ligne de raison chacune. Montre que l'auteur fait du vrai travail, pas juste qu'il emaile.
- Fournit trois CTAs — le lecteur choisit. Plus de choix bat souvent un clic en re-engagement.
- Même sortie facile « réponds non ».

Réponse attendue : 3-8 % de plus des abonnés froids ouvrent ça. Combiné avec l'Email 1, vous avez maintenant atteint environ 10-20 % de la cohorte froide. Le reste est statistiquement perdu.

---

## Email 3 — La notice honnête de sunset (Jour 14)

Celui-ci compte. C'est le seul email de re-engagement où l'auteur est direct sur ce qui est sur le point de se passer.

### Le prompt

```
Tu écris le troisième et dernier email dans une séquence de re-engagement
à 3 emails. Le destinataire N'a PAS ouvert l'un des deux précédents. Règles :

1. Ligne de sujet : explicite. "Je vais te retirer de la liste."
   Le cerveau du lecteur enregistre ça comme différent d'une ligne de sujet
   normale et est plus susceptible d'ouvrir.
2. Corps : 80-120 mots. Court. Honnête. Nomme la date où le désabonnement
   se produira.
3. Un CTA : un lien ou bouton unique pour "Rester abonné" — cliquer
   le lien ou répondre avec n'importe quoi les garde sur la liste.
4. PAS de culpabilité. PAS de "on vous regrettera". PAS de ALL CAPS ou "DERNIÈRE CHANCE !!!"
5. Voix : calme, claire, légèrement self-aware. L'auteur fait de l'hygiène
   de liste, pas une rupture.

Sors la ligne de sujet + corps. Pas de commentaire.
```

### Exemple travaillé

```
Sujet : Je vais te retirer de la liste

Salut —

C'est le troisième email que j'envoie et tu n'en as ouvert aucun,
alors je fais la chose polie et je te retire de la liste le
[Date, ~3 jours d'ici].

Si tu veux rester abonné, clique ici pour confirmer : <Rester
abonné>

Si tu ne cliques pas — entièrement juste. Je préfère avoir une liste plus petite
de gens qui lisent vraiment qu'une plus grosse qui ne lit pas.

Merci pour l'inscription originale dans tous les cas.

— Alex
```

Ce que ça fait :

- La ligne de sujet est directe d'une façon que les lignes de sujet email le sont rarement. Les taux d'ouverture sur cet email sont 2-3× les taux de l'Email 2.
- Le corps est court. Nomme l'action (retrait) et la date.
- Un CTA : confirmer pour rester.
- Ferme avec la raison philosophique — l'auteur veut de l'engagement, pas du vanity.
- Pas de supplications, pas de culpabilité, pas de manipulation.

Réponse attendue : 5-10 % de la cohorte froide ouvre ça. De ceux-là, une fraction significative clique « Rester abonné ». Ceux qui ne cliquent pas se font désabonner à la date promise.

---

## Quoi faire au Jour 17

Les abonnés froids qui n'ont ouvert aucun des trois emails sont désabonnés. La plupart des plateformes (Substack, Beehiiv, ConvertKit) ont un moyen de filtrer par « n'a pas ouvert dans les X derniers emails » et de désabonner en masse.

C'est la partie qui se sent mal. Faites-le quand même.

Après le sunset :

- Votre compte de liste chute.
- Votre taux d'ouverture bondit significativement. (Outcome courant : 32 % → 47 % en un cycle.)
- Votre deliverability s'améliore sur les 4-8 semaines suivantes.
- Les lecteurs engagés — ceux pour qui vous avez vraiment écrit — commencent à voir vos emails dans la boîte de réception de façon plus fiable.

Les abonnés froids étaient le coût de la deliverability des lecteurs engagés. Le sunsetting répare ça.

---

## À quelle fréquence faire tourner ça

Pour la plupart des auteurs de newsletter : une fois par trimestre suffit. Certaines plateformes le font tourner automatiquement si vous l'activez.

Ne le faites pas tourner plus souvent que ça :

- Les séquences de re-engagement sont émotionnellement lourdes pour l'auteur. Les faire tourner mensuellement est épuisant et le math de courbe d'engagement ne change pas aussi vite.
- Un abonné qui a laissé tomber en semaine 10 et a été re-engagé en semaine 13 n'est pas vraiment froid — il est juste parfois irrégulier. Donnez à la courbe d'engagement le temps de se dérouler.

Une fois par trimestre est le rythme.

---

## Ce que ce playbook NE fera PAS

- Remplacer une welcome sequence saine. Les nouveaux abonnés qui ne s'engagent jamais dans les 30 premiers jours sont un problème différent — fixez le flow de welcome, pas la séquence de re-engagement.
- Sauver une liste avec une mauvaise acquisition. Si vous avez acheté des abonnés ou les avez gagnés avec un lead magnet trompeur, aucune séquence de re-engagement ne fixera le mismatch. Vous re-engageriez des gens qui n'étaient pas un fit dès le départ.
- Remplacer le fait de connaître votre audience. Le copy de re-engagement marche quand la proposition de valeur est réelle. Si l'auteur n'est pas clair sur ce qu'est la newsletter, l'abonné froid restera à juste titre froid.

La séquence de re-engagement est un outil pour l'hygiène de liste, pas un substitut à de l'écriture que les lecteurs veulent continuer à ouvrir.
