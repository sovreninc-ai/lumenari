# Extracteur Sample-to-Voice

Collez ce prompt en haut d'une nouvelle conversation (ou dans un slot system prompt), puis collez vos échantillons en dessous. La sortie est un profil de voix complet que vous pouvez sauvegarder comme `voice-profile.md` et réutiliser dans chaque future session.

---

## Le prompt

```
Tu es un brand voice editor. Je vais coller 3-5 échantillons d'écriture. Ton job est d'extraire un profil de voix réutilisable.

Règles :
- Chaque observation doit citer une ligne spécifique des échantillons. Pas d'affirmations non citées.
- Note quatre axes d'attributs de voix 1-5. Signale tout 1 ou 5 comme load-bearing.
- Mesure la structure de phrase quantitativement (longueur moyenne en mots, variation, fragments, ouvertures courantes).
- Produis une signature de vocabulaire (mots que les échantillons reprennent) et une ban list (mots IA défaut ostensiblement absents).
- Nomme le dispositif de framing — le mouvement rhétorique récurrent qui ancre la voix.
- Pas d'archétypes. Pas d'essence de marque. Pas d'empilements d'adjectifs ("audacieux, plein d'esprit, confiant").

Schéma de sortie (utilise exactement) :

# Voice Profile — [Nom]
_Extrait de N échantillons le [date]_

## Scores d'attributs de voix
- Formel/Décontracté : X (load-bearing : o/n) — [observation]
- Sérieux/Ludique : X (load-bearing : o/n) — [observation]
- Direct/Diplomate : X (load-bearing : o/n) — [observation]
- Technique/Accessible : X (load-bearing : o/n) — [observation]

## Structure de phrase
- Longueur moyenne : ~N mots
- Variation : serrée / mixte / large
- Fragments : rare / occasionnel / fréquent (citez un)
- Ouvertures courantes : [listez 2-3 patterns]

## Signature de vocabulaire
**Reprend :** mot1, mot2, mot3, mot4
**N'utilise jamais :** mot1, mot2, mot3, mot4

## Dispositif de framing
[1-2 phrases nommant le mouvement récurrent, avec un exemple cité.]

## Anti-patterns à signaler
- [3-5 choses concrètes à attraper dans les futurs brouillons]

## Exemple on-voice (depuis les échantillons)
> [phrase d'échantillon la plus forte]

## Exemple off-voice (défaut IA générique)
> [une phrase que l'IA produirait naturellement qui viole cette voix]

---

Échantillons suivent. Labellise chacun pour que je puisse citer proprement.
```

---

## Votre format d'entrée sous le prompt

```
Échantillon 1 — [post LinkedIn / intro newsletter / landing copy / etc.]
[coller l'échantillon]

Échantillon 2 — [label]
[coller l'échantillon]

Échantillon 3 — [label]
[coller l'échantillon]

Échantillon 4 (optionnel) — [label]
[coller l'échantillon]

Échantillon 5 (optionnel) — [label]
[coller l'échantillon]

Contexte :
- Qui lit la sortie de cette voix ? [audience]
- Pour quoi c'est généralement ? [emails, pages de vente, social, etc.]

Contraintes :
- [Quoi que ce soit hors limites — pas de gros mots, pas de première personne, ne jamais nommer les concurrents, etc.]
```

---

## Choix des échantillons — la partie que la plupart des gens ratent

Les échantillons que vous nourrissez sont le plafond sur la voix que vous récupérez. Choisissez mal, récupérez de mauvais résultats.

**Bons échantillons :**
- Choses que vous avez écrites que vous shipperiez à nouveau sans changements
- Choses que les clients, lecteurs ou votre équipe ont spécifiquement nommées comme sonnant comme vous à votre meilleur
- Une pièce qui a atterri — a obtenu la réunion, a obtenu la réponse, a obtenu le share

**Mauvais échantillons :**
- Choses que vous avez écrites à la hâte et que vous n'aimez pas
- Une pièce formelle que vous avez écrite parce que la situation l'exigeait (email board, notice juridique)
- Une pièce dans un ton dont vous ne voulez pas vraiment plus
- Tout ce que vous n'avez pas écrit vous-même (sauf si vous matchez explicitement une autre voix — dites-le dans le label)

**Nombre d'échantillons :**
- 3 est le minimum. En dessous, les observations ne sont pas ancrées.
- 5 est le sweet spot pour la plupart des voix.
- Plus de 7 commence à diluer le signal — l'IA moyenne à travers et perd le tranchant.

---

## Exemple travaillé — à quoi ressemble une bonne sortie

**Échantillons d'entrée :**
> Échantillon 1 (intro newsletter) : « J'ai shippé un truc et l'ai cassé deux fois. Voilà ce que j'ai appris la seconde fois. »
>
> Échantillon 2 (LinkedIn) : « Refus net sur l'appel de discovery. Ils voulaient 12 mois et ne voulaient pas définir le succès. »
>
> Échantillon 3 (hero de landing) : « Vous n'avez pas besoin d'un autre framework. Ship une chose cette semaine. La voici. »

**Profil de sortie :**

```
# Voice Profile — Solo Builder
_Extrait de 3 échantillons le 2026-05-14_

## Scores d'attributs de voix
- Formel/Décontracté : 4 (load-bearing : non) — Contractions, pas de slang. « Shippé un truc » pas « Launched a new product ».
- Sérieux/Ludique : 2 (load-bearing : oui) — Zéro blague. Sec là où c'est drôle. « L'ai cassé deux fois » est la chose la plus proche de l'humour.
- Direct/Diplomate : 5 (load-bearing : oui) — Chaque ouverture démarre avec le verdict. « Refus net sur l'appel de discovery. »
- Technique/Accessible : 2 (load-bearing : non) — Zéro jargon. « Définir le succès » pas « établir des KPIs ».

## Structure de phrase
- Longueur moyenne : ~9 mots
- Variation : serrée (range 5-12)
- Fragments : occasionnel — « La voici. »
- Ouvertures courantes : verbe-d'abord (« Shippé... »), verdict-d'abord (« Refus net... »), commande deuxième personne (« Vous n'avez pas besoin... »)

## Signature de vocabulaire
**Reprend :** shippé, refus net, voici, truc, cassé, semaine
**N'utilise jamais :** leverage, transform, unlock, framework (l'utilise ironiquement), passion, journey, ecosystem

## Dispositif de framing
Verdict-d'abord. La première phrase de chaque échantillon énonce la conclusion ou l'appel. Le corps explique. Exemple : « Refus net sur l'appel de discovery. Ils voulaient 12 mois et ne voulaient pas définir le succès. »

## Anti-patterns à signaler
- Toute phrase ouvrant avec « Dans le monde au rythme rapide d'aujourd'hui... »
- Tout usage de « transformer », « unlock », « élever », « leverage »
- Phrases de plus de 18 mots (signal de drift)
- Ouvertures trois-actes (« D'abord... Puis... Enfin... »)

## Exemple on-voice (depuis les échantillons)
> « Vous n'avez pas besoin d'un autre framework. Ship une chose cette semaine. La voici. »

## Exemple off-voice (défaut IA générique)
> « Nous sommes ravis d'introduire notre nouveau framework conçu pour aider les fondateurs occupés à streamliner leurs workflows et unlock leur plein potentiel. »
```

C'est le profil. Sauvegardez-le comme `voice-profile.md`. Réutilisez-le.
