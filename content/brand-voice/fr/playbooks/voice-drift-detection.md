# Détection de Drift de Voix

Pour quand vous soupçonnez que la sortie IA a glissé vers le défaut corporate. Faites tourner ça sur tout brouillon avant qu'il ne parte en live — surtout pour les pages de vente, posts de levée, manifestes, annonces de launch.

---

## Le prompt

```
Tu audites un brouillon pour le drift de voix contre un profil sauvegardé. Règles :

1. Compare le brouillon à la rubrique du profil. Ne sois pas charitable. Le drift est plus utile à signaler qu'à excuser.
2. Note chaque paragraphe (ou chaque bloc — en-tête de section, liste à puces, CTA) comme : on-voice / drift / off-voice.
3. Pour chaque call drift ou off-voice, cite la phrase exacte qui a déclenché le call et nomme quelle règle de voix elle a violée.
4. Termine avec une "priorité de fix" — quelles 2-3 choses amélioreraient le plus la consistance de voix si fixées en premier.

Format de sortie :

## Section par section
- [Label section 1] : on-voice / drift / off-voice
  - Déclencheur : "[phrase citée]" — viole [règle]
- [Label section 2] : on-voice / drift / off-voice
  - Déclencheur : "[phrase citée]" — viole [règle]
- ...

## Score global de drift : X/10
(10 = parfaitement on-voice ; 0 = méconnaissable)

## Priorité de fix (top 3)
1. [Changement spécifique avec exemple]
2. [Changement spécifique avec exemple]
3. [Changement spécifique avec exemple]

Profil et brouillon suivent.
```

---

## Votre entrée

```
[Profil de voix]
[coller le profil sauvegardé complet]

[Brouillon]
[coller le brouillon complet à auditer]
```

---

## Les signaux de drift à surveiller

**Contrebande de mots bannis.** Le drift le plus courant. L'IA sait qu'elle ne peut pas utiliser « leverage » — alors elle écrit « harness » ou « tap into » ou « unlock ». Même forme sémantique, mot différent. La règle : si une phrase signifie la même chose qu'un mot banni aurait signifié, c'est toujours du drift.

**Creep de longueur de phrase.** La voix moyenne 9 mots. À mi-chemin du brouillon, les phrases font 18 mots et grimpent. C'est l'IA qui défaut vers la prose « smooth ». Vérifiez toujours la longueur de phrase sur la moitié arrière de tout long brouillon.

**Ouvertures génériques.** « Dans un monde où... », « L'[audience] d'aujourd'hui a besoin... », « On y est tous passés... » Toute de celles-ci dans une voix qui a noté 5 sur Direct/Diplomate est automatiquement off-voice.

**Drift trois-actes.** « D'abord... Puis... Enfin... » ou « Trois choses ont changé... » Si votre voix ne bouge pas comme ça, l'IA imposera cette structure quand même. Attrapez-la.

**Empilement d'adjectifs.** « Messaging audacieux, plein d'esprit et confiant. » Les voix ne parlent pas d'elles-mêmes en adjectifs. Si le brouillon a une phrase décrivant la marque en rythme à trois adjectifs, c'est du drift.

**Flatterie de l'audience.** « Pour les fondateurs qui refusent de se contenter. » « Pour les rares qui comprennent. » Si le profil de voix n'inclut pas la flatterie d'audience comme dispositif de framing, c'est du drift — l'IA flatte.

**« Ravi d'annoncer ».** Toute voix qui n'est pas un communiqué de presse en 2007 ne devrait jamais utiliser cette phrase. Traiter comme automatiquement off-voice.

---

## Exemple travaillé

**Profil (tronqué) :**
```
Voix : Solo Builder
Load-bearing : Direct/Diplomate 5 (ouvertures verdict-first), Sérieux/Ludique 2 (sec, pas de blagues)
Phrase moyenne : 9 mots
Ban list : leverage, transform, unlock, journey, passion, ecosystem, excited to announce
```

**Brouillon à auditer :**
> « Nous sommes ravis de partager quelque chose sur lequel nous travaillons depuis longtemps. Dans le monde au rythme rapide d'aujourd'hui, les fondateurs jonglent constamment des priorités et luttent pour trouver le temps de se concentrer sur ce qui importe vraiment. C'est pourquoi nous avons construit un outil qui débloque la productivité et vous aide à transformer la façon dont vous travaillez. Nous avons hâte que vous l'essayiez. »

**Sortie d'audit :**

```
## Section par section
- Phrase 1 : off-voice
  - Déclencheur : "Nous sommes ravis de partager" — viole la ban list (auto-flag pour langage communiqué de presse)
- Phrase 2 : off-voice
  - Déclencheur : "Dans le monde au rythme rapide d'aujourd'hui" — viole la liste d'anti-patterns (ouverture générique) ; viole le dispositif de framing verdict-first
- Phrase 3 : off-voice
  - Déclencheur : "débloque la productivité" + "transformer la façon dont vous travaillez" — viole la ban list (unlock + transform contrebandés ensemble)
- Phrase 4 : drift
  - Déclencheur : "Nous avons hâte que vous l'essayiez" — viole Direct/Diplomate 5 (c'est de la chaleur hedgée, pas un verdict ou CTA)

## Score global de drift : 1/10
(Méconnaissable comme la voix sauvegardée. Ça se lit comme une sortie IA défaut.)

## Priorité de fix (top 3)
1. Réécrire l'ouverture comme un verdict. Exemple : "Shippé un outil qui fait tourner les cinq tâches admin sur lesquelles les fondateurs gâchent une journée."
2. Strip la phrase entière du milieu. La voix n'explique pas — elle affirme et passe à autre chose.
3. Remplacer la fermeture chaleureuse par un CTA direct. Exemple : "Lien ci-dessous."
```

C'est le test. Si l'audit dit « parfaitement on-voice » et que vous pouvez voir le drift dans le brouillon, l'audit est faux — recollez le profil et refaites tourner. La détection honnête du drift est plus utile qu'un faux pass.

---

## Quand faire tourner la détection de drift

- Avant qu'un asset à fort enjeu ne parte (page de vente, post de levée, email de launch, manifeste)
- Sur chaque réécriture que l'IA vous rend pour du contenu longform (plus de 400 mots)
- Quand vous soupçonnez que votre voix a shifté mais ne pouvez pas articuler pourquoi — faites tourner sur trois assets récents et comparez
- Trimestriellement sur votre contenu publié, comme check de calibration avant d'extraire un profil frais
