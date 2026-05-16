# Checklist des Sensible Defaults

La règle : ne demandez à l'utilisateur que quand la réponse compte réellement et que vous ne pouvez pas l'inférer.

## Valeurs par défaut à appliquer silencieusement

| Décision | Sensible default |
|---|---|
| Devise | Le pays détecté via l'IP de l'utilisateur, avec un switcher en un tap |
| Langue | Le header `Accept-Language` du navigateur, switcher dans les settings |
| Fuseau horaire | Détecté par le navigateur, affiché mais sans interrompre |
| Format de date | Adapté à la locale (en-CA → AAAA-MM-JJ ; en-US → MM/JJ/AAAA) |
| Onboarding première utilisation | Sauter le carrousel d'accueil ; atterrir directement sur l'état vide |
| Fréquence d'email | Transactionnel + mise à jour produit mensuelle, avec un lien de désinscription |
| Thème | Suivre `prefers-color-scheme: dark` |
| Notifications | Désactivées jusqu'à ce que l'utilisateur fasse quelque chose où ce serait utile |
| Autosave | Activé |
| Confirmation sur destructif | Activée (la dialog elle-même est la friction) |
| Format d'enregistrement | Le format qu'il a ouvert (PDF reste PDF, .md reste .md) |
| Ordre de tri | Plus récent d'abord |
| Pagination | 20 éléments par page |

Si vous vous surprenez à ajouter « voulez-vous… » à l'UI, demandez-vous : puis-je juste faire la chose et proposer Annuler ?

## Quand demander à l'utilisateur

Demandez quand :

1. **L'action est destructive et pas facilement réversible.** Supprimer un compte, purger l'historique.
2. **L'action coûte de l'argent réel.** Réserver une séance, traiter un paiement.
3. **Le choix affecte significativement le comportement ultérieur.** Choisir un nom de workspace, choisir une équipe par laquelle commencer.
4. **Vous ne pouvez sincèrement pas inférer.** Prénom. Titre de poste. Raison d'utiliser le produit.

Posez une seule question par écran. Ne fourrez pas cinq questions dans un seul formulaire.

## Comment bien demander

```
[ Question en une phrase qui sert aussi de titre ]

[ Texte de corps — uniquement si la question a besoin de contexte ]

[ La surface de choix — groupe de chips, radio ou champ texte ]

[ Bouton Continuer — désactivé tant qu'un choix n'a pas été fait ]
```

Exemples :

> **Quel sport votre club coache-t-il ?**
> Nous mettrons en place les bonnes tranches d'âge, divisions et défauts de planning.
>
> [ Soccer ] [ Hockey ] [ Basketball ] [ Baseball ] [ Autre ]
>
> [ Continuer → ]

vs la mauvaise version :

> ☐ Sélectionnez votre sport principal
> ☐ Sélectionnez votre sport secondaire (optionnel)
> ☐ Sélectionnez votre fédération
> ☐ Sélectionnez votre durée de saison typique
> ☐ Sélectionnez vos tranches d'âge (multi-select)
>
> [ Soumettre ]

La mauvaise version pose cinq questions avant la moindre réponse. La bonne version en pose une et infère le reste.

## La version la plus dure

La version la plus dure de tout ça, c'est : « que devrait faire cette IA quand l'intention de l'utilisateur est ambiguë ? »

Par défaut : choisissez l'interprétation la plus plausible, faites la chose, et dites à l'utilisateur ce que vous avez fait. Proposez de changer d'interprétation.

```
J'ai supposé que vous parliez de la saison du printemps 2026 (l'active).
Si vous vouliez parler d'une autre saison, voici comment la changer.
```

C'est ainsi que fonctionnent les surfaces « Vouliez-vous dire…? » d'Apple. Ne bloquez pas ; proposez.
