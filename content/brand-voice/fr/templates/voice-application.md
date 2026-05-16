# Application de Voix

Utilisez ceci une fois que vous avez un profil de voix sauvegardé. Collez le profil + le brouillon que vous voulez réécrit. L'IA produit une réécriture voiced et un self-check.

---

## Le prompt

```
Tu appliques un profil de brand voice sauvegardé à un brouillon. Règles :

1. Lis le profil en entier avant de commencer. Pondère les axes load-bearing (1s et 5s) le plus lourdement.
2. Utilise la signature de vocabulaire comme guide. Utilise la ban list comme filtre dur — si tu reprends un mot banni, remplace-le.
3. Matche la moyenne de longueur de phrase. Ne produis pas de phrases 2× la longueur moyenne.
4. Utilise le dispositif de framing sur l'ouverture. La première phrase est où la voix est la plus visible.
5. Après la réécriture, fais tourner un self-check : pour chaque paragraphe ou bloc majeur, labellise-le on-voice / drift / off-voice. Cite toute ligne spécifique dont tu n'es pas sûr.

Format de sortie :

## Réécriture
[ta version voiced]

## Self-check
- Paragraphe 1 : on-voice / drift / off-voice — [raison]
- Paragraphe 2 : on-voice / drift / off-voice — [raison]
- ...
- Lignes dont je ne suis pas sûr :
  - "[ligne citée]" — [raison du flag]

Profil et brouillon suivent.
```

---

## Votre entrée en dessous

```
[Profil de voix]
[coller le profil sauvegardé complet ici]

[Brouillon]
[coller le copy générique, brut ou flavored concurrent que vous voulez réécrit]

[Objectif]
Pour quoi c'est ? Quelle action le lecteur doit prendre après avoir lu ?

[Contraintes (optionnel)]
- Cap de longueur
- Format (email, hero de landing, ad copy, tweet thread, etc.)
- Faits spécifiques qui doivent rester dans la réécriture
```

---

## Exemple travaillé

**Profil (tronqué) :**
```
Voix : Solo Builder
Load-bearing : Sérieux/Ludique 2 (sec), Direct/Diplomate 5 (verdict-first)
Phrase moyenne : 9 mots
Reprend : shippé, refus net, voici, truc
N'utilise jamais : leverage, transform, unlock, journey, passion, ecosystem
Framing : ouverture verdict-first ; le corps explique
```

**Brouillon (sortie IA générique) :**
> « Nous sommes ravis d'annoncer le launch de notre nouvelle plateforme de productivité conçue pour aider les fondateurs occupés à streamliner leurs opérations quotidiennes via la technologie IA de pointe, leur permettant de se concentrer sur ce qui importe vraiment : construire leur business de rêve et transformer leurs vies. »

**Objectif :** Email annonçant le launch à ma newsletter. Veut des clics vers la page produit.

**Réécriture :**
> Shippé l'outil de productivité. Il fait tourner les cinq tâches admin sur lesquelles vous gâchez une journée. Environ une minute pour le setup. Lien ci-dessous.

**Self-check :**
- Phrase 1 : on-voice — ouverture verdict-first, 4 mots, utilise « shippé » depuis la signature de vocab.
- Phrase 2 : on-voice — 11 mots, deuxième personne, pas de jargon.
- Phrase 3 : on-voice — cadence fragment de 7 mots.
- Phrase 4 : on-voice — minimal, finit sur un CTA sans vendre.
- Lignes dont je ne suis pas sûr : aucune.

---

## Pourquoi chaque règle compte

**Lis le profil en entier.** Les outils d'IA défaut à utiliser les premières lignes de tout prompt le plus lourdement. Si le profil est le paragraphe 4 et le brouillon le paragraphe 5, le brouillon gagne. Forcer une lecture complète avec une instruction explicite fixe ça.

**Pondère les axes load-bearing le plus lourdement.** Une voix notée 2 sur Sérieux/Ludique avec un flag load-bearing signifie que les blagues sont un non dur. Une voix notée 4 sur Décontracté sans flag load-bearing signifie que les contractions sont ok mais le slang n'est pas load-bearing. L'IA doit savoir quels traits sont non négociables.

**Ban list comme filtre dur.** Sans filtre dur, les réécritures IA font contrebande des mots bannis en synonymes. « Leverage » est remplacé par « harness ». « Unlock » devient « tap into ». La règle : si la signification matche un mot banni, trouvez une façon de le dire sans cette forme sémantique.

**Matche la longueur de phrase.** C'est le marqueur de rythme le plus facile à imposer et celui que l'IA rate le plus souvent. Une voix moyenne de 9 mots qui produit soudainement une phrase de 28 mots se lit comme une personne différente.

**Dispositif de framing sur l'ouverture.** Les premières phrases sont où la voix est la plus diagnostique. Si votre voix est verdict-first et que la réécriture ouvre avec « Dans un monde où... » rien d'autre ne compte.

**Self-check avec flags.** Les flags honnêtes sont plus utiles que la fausse confiance. Une réécriture qui dit « le paragraphe 3 dérive vers le générique » vous laisse le fixer. Une réécriture qui clame que tout passe quand le paragraphe 3 est clairement off vous force à relire et l'attraper vous-même.
