# Les Sept Règles — version longue

## 1. Une action principale par écran.

Le cerveau prend quelques centaines de ms pour savoir où regarder sur un nouvel écran. S'il y a trois boutons stylés à l'identique, c'est trois cents ms perdues. S'il y a un bouton manifestement principal et un manifestement secondaire, l'utilisateur a décidé en zéro ms.

**Règle visuelle :** un seul bouton plein par écran. Tout le reste est text-link, outline ou icon.

**Anti-exemple :** le bas d'un dialog « êtes-vous sûr ? » avec trois boutons rouges pleins. Choisissez-en un.

## 2. La langue simple gagne.

La copie d'Apple se lit comme un ami qui vous dit ce qui va se passer.

| Copie corporate | Copie Apple-style |
|---|---|
| Initialiser le processus de sauvegarde | Sauvegarder maintenant |
| Configurer les préférences de notification | Choisir ce sur quoi me notifier |
| Authentification requise | Connectez-vous pour continuer |
| Une erreur s'est produite (Erreur 0x9F) | Impossible d'enregistrer. Vérifiez votre connexion et réessayez. |

Si vous ne le diriez pas à un ami dans votre cuisine, ne le mettez pas à l'écran.

## 3. Par défaut, « faites-le simplement ».

Quand 90 % des utilisateurs veulent le même résultat, demander, c'est de la friction. Exemples :

- **Mauvais :** « Voulez-vous activer l'autosave ? » (oui, évidemment)
- **Bon :** sauvegarde automatique. Affichez « Toutes les modifications enregistrées » dans le chrome.

- **Mauvais :** « Souhaitez-vous recevoir des confirmations par email ? » (oui, évidemment)
- **Bon :** envoyez la confirmation. Incluez un lien de désinscription.

- **Mauvais :** « Autoriser les notifications ? » au premier lancement
- **Bon :** attendez que l'utilisateur soit sur le point de faire quelque chose où une notification est vraiment utile, puis demandez en contexte.

L'exception, ce sont les actions irréversibles ou coûteuses — celles-là méritent une confirmation.

## 4. Le whitespace est une fonctionnalité.

La plupart des designs sont 20-30 % trop serrés. Essayez d'augmenter chaque padding de 1,25x et chaque gap de 1,5x. C'est presque toujours mieux.

**Règle pratique :** si deux éléments visuels adjacents donnent l'impression d'appartenir l'un à l'autre alors qu'ils ne devraient pas, augmentez le gap. S'ils paraissent séparés alors qu'ils ne devraient pas, diminuez-le. Ajustez jusqu'à ce que la relation soit non ambiguë.

## 5. Hiérarchie par la taille + le poids, pas par la couleur + les boîtes.

Une page peut avoir :
- Un H1 (32-48px, semibold)
- Une poignée de H2 (22-28px, semibold)
- Un texte de corps (16-17px, regular)
- Quelques captions (13-14px, regular, atténué)

C'est assez de hiérarchie pour presque n'importe quel écran. Ajouter des badges colorés, des ombres portées et des boîtes autour des choses est en général un signe que l'échelle typographique ne fait pas son travail.

## 6. Progressive disclosure.

La première fois qu'un utilisateur voit une fonctionnalité, montrez les 20 % qu'il utilisera 80 % du temps. Cachez le reste derrière :

- Un toggle « Plus d'options »
- Un deuxième écran
- Un panneau de détail à droite
- Long-press / clic droit

**Anti-exemple :** un écran de réglages avec 40 toggles dans une liste plate. Les 6 premiers devraient être évidents ; les 34 suivants devraient être dans une section « Avancé » qui s'ouvre au tap.

## 7. L'animation a une raison ou n'existe pas.

Les animations d'Apple ont l'un de ces trois jobs :
1. **Maintenir la continuité spatiale** — quand quelque chose apparaît, animez-le depuis là d'où il vient (une modal qui slide depuis le bas de l'écran, une vue détail qui slide depuis la droite).
2. **Communiquer un changement d'état** — un checkmark qui se dessine après un enregistrement réussi.
3. **Masquer une attente** — un fade-in de 200ms sur une card fraîchement chargée est mieux qu'un pop sec.

C'est tout. Le rebond au survol, le parallax pour le parallax, le glow au clic — tout ça se lit comme « on voulait avoir l'air moderne » plutôt que « on voulait être utile ».

**Règles de timing :**
- 150-250ms : la plupart des micro-interactions
- 300-400ms : les transitions de page
- > 500ms : rare et intentionnel

**Easing :** cubic-bezier(0.16, 1, 0.3, 1) pour « les choses qui doivent paraître vives et naturelles » — Apple utilise quelque chose de similaire.

---

## Comment les appliquer

Prenez un écran que vous avez livré. Lisez les règles dans l'ordre. Pour chaque règle, demandez-vous : « Où cet écran viole-t-il celle-ci ? » N'essayez pas de tout corriger d'un coup — corrigez celle qui est la plus violée.

Le même truc fonctionne pour la sortie design de votre IA. Collez ce fichier dans le system prompt et demandez : « Passe cet écran au filtre des sept règles. Dis-moi laquelle est la plus violée. »
