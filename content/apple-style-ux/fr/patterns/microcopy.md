# Patterns de microcopie

## Boutons

Les boutons décrivent un résultat, pas une action système. Ils commencent par un verbe.

| Mauvais | Bon |
|---|---|
| Soumettre | Envoyer l'invitation |
| OK | Enregistrer les modifications |
| Traiter | Payer maintenant |
| Confirmer | Annuler l'inscription |
| Oui | Supprimer l'événement |

La règle : lisez la copie du bouton en isolation. Pouvez-vous dire ce qui va se passer ? Sinon, réécrivez.

Pour les actions destructives, le verbe lui-même fait l'avertissement : « Supprimer le compte » — et non « Êtes-vous sûr ? » deux fois de suite.

## États vides

Un état vide est la première impression de l'utilisateur sur un écran. Ne la gâchez pas avec « Aucun élément trouvé. »

La forme :

```
[ Icône — modeste, pas décorative ]

Titre qui explique ce que fait cet écran
quand il a du contenu (1 phrase)

Phrase de corps qui explique comment y arriver.

[ La CTA qui les y emmène ]
```

Exemples :

> **Votre bibliothèque est vide pour l'instant.**
> Dès que vous achetez un kit, chaque téléchargement dont vous aurez besoin vit ici.
> [ Parcourir les kits → ]

> **Aucun événement cette semaine.**
> Quand votre coach planifie un entraînement ou un match, il apparaîtra ici.
> [ Voir à venir → ]

## Erreurs

Un bon message d'erreur répond à trois questions :
1. Que s'est-il passé ?
2. À qui la faute (système ou moi) ?
3. Que faire maintenant ?

```
Impossible d'enregistrer votre brouillon.
Nous avons perdu la connexion. Réessayez — votre texte est toujours là.
[ Réessayer ] [ Sauvegarder une copie hors ligne ]
```

Choses à éviter :
- « Quelque chose a mal tourné » — inutile
- Codes d'erreur seuls — pour le support, pas pour l'utilisateur (mettez-les dans les détails, pas dans le titre)
- Reprocher implicitement à l'utilisateur (« entrée invalide » — invalide selon quel critère ?)
- Stack traces

## Onboarding

Chaque étape d'onboarding a un seul job. Ne combinez pas les jobs.

Le pattern d'onboarding d'Apple est en général :
1. **Écran d'accueil / proposition de valeur** — ce que cette app fait, en une phrase
2. **L'unique demande de permission qui compte** — et seulement celle-là
3. **Le premier écran utile** — pas un tutoriel, le vrai produit

Anti-pattern : un carrousel à 5 écrans qui explique chaque fonctionnalité. L'utilisateur n'a pas encore gagné la patience pour les lire.

Si une fonctionnalité a besoin d'explication, expliquez-la inline la première fois qu'elle apparaît, avec un « Compris » ou « OK » pour dismiss.

## Dialogs de confirmation

Réservez-les aux actions irréversibles ou coûteuses. Chacune est une taxe de friction.

Forme :

```
Ce qui est sur le point de se passer (1-2 phrases, spécifique)

[ Annuler ] [ Verbe-l'action ]
```

Exemple :

> **Supprimer cet événement ?**
> Les 14 RSVP et les fichiers uploadés seront aussi supprimés.
>
> [ Annuler ] [ Supprimer l'événement ]

Remarquez : le bouton principal est le verbe de l'action, pas « Oui ». L'annulation est secondaire, pas pondérée à égalité.

## États de chargement

Trois saveurs :

1. **< 200ms** — ne montrez rien. L'œil ne le remarquera pas.
2. **200ms - 2s** — un spinner subtil ou un skeleton à la place du contenu manquant.
3. **> 2s** — message explicite : « Génération de vos recommandations de kits… » — pour que l'utilisateur sache que quelque chose se passe pour lui.

Les spinners indéterminés sont honnêtes uniquement quand on ne peut vraiment pas estimer. Si vous pouvez estimer, utilisez une barre de progression.

## États de succès

Une action réussie n'a pas besoin d'une modal qui se congratule. Un toast, un checkmark, un slide-in subtil disant « Enregistré » suffisent.

Réservez les états célébratoires aux vrais jalons (première facture payée, centième client, etc.) — et même là, gardez-les brefs.
