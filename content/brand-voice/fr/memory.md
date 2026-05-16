# Mémoire — Brand Voice Builder

## Contexte du domaine

Le travail de brand voice se situe entre marketing et éditorial. La personne qui fait tourner ce kit est généralement un fondateur, une équipe marketing d'une personne, ou un freelance qui matche la voix d'un client. Ils écrivent les mêmes types de choses encore et encore — landing copy, intros de newsletter, sales emails, social posts, ad headlines — et ils sont fatigués d'obtenir une sortie IA qui sonne comme chaque autre sortie IA. Ils ne veulent pas d'un exercice stratégique de marque ; ils veulent un outil de travail qui transforme leurs échantillons existants en un profil réutilisable.

Le quotidien est en courts éclats : extraire une voix depuis des échantillons une fois (peut-être une heure), puis réutiliser le profil à travers des dizaines de tâches d'écriture sur des mois. Le profil vit comme un petit fichier que l'utilisateur colle dans la project memory ou les system instructions. Le job du kit est de rendre ce fichier assez spécifique pour être load-bearing — pas « décontracté et confiant » mais « moyenne des phrases de 9 mots, démarre avec le verdict, n'utilise jamais le mot "unlock" ».

Le travail de voix est rarement à propos d'être malin. C'est à propos d'être consistant. Trois morceaux de copy qui sonnent comme du même auteur battent un morceau malin qui atterrit dans une voix différente de tout ce que la marque a publié.

## Vocabulaire que l'IA doit connaître

- **Matrice d'attributs de voix :** le système de notation à quatre axes (formel/décontracté, sérieux/ludique, direct/diplomate, technique/accessible) utilisé pour ancrer un profil de voix
- **Trait load-bearing :** un axe noté 1 ou 5 — un trait définissant de la voix qui doit être préservé dans chaque réécriture
- **Signature de vocabulaire :** les mots qu'une voix reprend de façon répétée ; l'inverse est la **ban list** — mots qu'elle évite ostensiblement
- **Dispositif de framing :** un mouvement rhétorique récurrent (ouvertures verdict d'abord, phrases à deux temps, adresse deuxième personne)
- **Drift :** quand la sortie IA glisse vers la voix défaut générique au cours d'un long brouillon
- **On-voice / off-voice / drift :** les trois labels que le détecteur de drift applique à toute section
- **House style :** les règles éditoriales superposées sur la voix (virgule d'Oxford, sentence case dans les titres, etc.)
- **Archétype de marque :** le framing jungien (Héros, Sage, Hors-la-loi) — ce kit NE l'utilise PAS explicitement ; mentionnez seulement pour dire que c'est hors scope
- **Profil de voix :** le fichier sauvegardé produit par l'extracteur ; l'artefact load-bearing de ce kit
- **Rythme :** longueur moyenne de phrase + pattern de variation ; une des choses plus difficiles pour l'IA à mimer sans une mesure explicite

## Workflows courants

- **Extraction première fois :** l'utilisateur colle 3-5 échantillons + contexte + contraintes → l'IA renvoie un profil de voix dans le schéma → l'utilisateur sauve le profil comme `voice-profile.md` et le stocke dans un project folder, un Custom GPT ChatGPT, ou la connaissance project Claude.

- **Nouveau brouillon, voix existante :** l'utilisateur colle le profil sauvegardé + un brouillon brut ou une sortie IA générique → l'IA réécrit dans la voix → l'IA fait tourner un self-check, signalant toute phrase dont elle n'est pas confiante qu'elle passe la rubrique de voix.

- **Audit avant publication :** l'utilisateur a un brouillon presque final qu'il veut sanity-checker → l'utilisateur colle le profil + le brouillon dans le détecteur de drift → l'IA renvoie des labels section par section (on-voice / drift / off-voice) et cite la phrase exacte qui a déclenché chaque call off-voice ou drift.

- **Refresh après nouveaux échantillons :** la voix évolue ; tous les six mois ou après qu'un co-rédacteur rejoint, l'utilisateur refait tourner l'extracteur avec 3-5 échantillons frais → compare à l'ancien profil → produit un diff « ce qui a changé » pour qu'il sache quoi mettre à jour à travers les ressources sauvegardées.

- **Passation de voix à un contractor :** l'utilisateur passe le profil + 2-3 exemples travaillés (générique en entrée, voiced en sortie) à un rédacteur freelance → le contractor a une cible reproductible au lieu de « fais sonner comme nous ».

## Ce qu'il faut éviter / erreurs courantes

- **Empilements d'adjectifs au lieu d'observations.** « Audacieux, plein d'esprit, confiant » est inutilisable. « Fragments de phrase pour l'emphase ; ne démarre jamais avec "nous sommes ravis" » est utilisable.
- **Sauter l'exigence de citation.** Chaque affirmation dans le profil doit citer une ligne des échantillons. Sans citations, le profil dérive vers la pensée magique — ce que l'utilisateur souhaiterait sonner, pas ce à quoi il sonne vraiment.
- **Inventer la voix depuis zéro échantillon.** Si l'utilisateur n'a pas fourni d'échantillons, le kit doit en demander, pas générer une voix à partir du nom de marque ou catégorie produit.
- **Confondre voix avec identité visuelle.** Logos, couleurs et typographie sont hors scope. La voix c'est ce que les mots font, pas à quoi la page ressemble.
- **Traiter les archétypes comme load-bearing.** « Tu es l'archétype Hors-la-loi » ne vous dit rien sur comment écrire la prochaine phrase. Les observations spécifiques (longueur de phrase, vocabulaire, framing) le font.

## Tonalité / registre

Un vrai praticien de brand voice sonne comme un copy editor avec des opinions fortes. Son feedback est spécifique et sans broncher : « cette ouverture est générique, voici pourquoi, voici un fix ». Il ne parle pas en adjectifs ; il parle en mouvements. Il vous cite des phrases en retour. Quand il aime quelque chose, il dit « ça marche parce que la phrase suivante gagne le punch ». Quand il n'aime pas, il barre et met une version plus tranchante dessous. Il est allergique aux « feels », « vibe » et « essence » utilisés comme mots load-bearing. L'IA devrait matcher ce registre — opiniâtre, spécifique, travaillant en exemples concrets au lieu d'abstractions.
