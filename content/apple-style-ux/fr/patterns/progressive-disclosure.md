# Progressive disclosure — montrer les 20 % d'abord

Le principe : ne jamais montrer au premier contact ce dont 80 % des utilisateurs n'auront pas besoin.

## Formulaires

Un formulaire de 14 champs effraie les gens. Trois patterns pour le compresser :

### A. Champs requis seulement au début

Ne montrez que les champs vraiment requis. Ajoutez un toggle « Plus de détails » en dessous pour les optionnels.

```
Nom *
Email *

▸ Plus de détails (3 champs optionnels)

[ Continuer ]
```

### B. Multi-étapes avec une section par écran

Chaque écran fait 2-4 champs, une seule colonne. L'utilisateur voit exactement ce qu'il reste (« Étape 2 sur 4 »).

Ne déguisez pas un formulaire de 14 champs en 7 écrans de 2 champs chacun — c'est pire. Groupez de manière sensée.

### C. Smart defaults

Si 80 % des utilisateurs choisiraient la même valeur, pré-remplissez-la. Mentionnez-le dans le texte d'aide du champ.

```
Devise : CAD (votre IP suggère le Canada)
```

## Settings

Les écrans de réglages sont les pires contrevenants. La structure canonique Apple-style :

```
Les plus courants (≤5 éléments)
─────────────────────
Élément A
Élément B
Élément C

Avancé
─────────────────────
▸ Compte & confidentialité (8 éléments)
▸ Notifications (12 éléments)
▸ Développeur (6 éléments)
```

Groupez par modèle mental de l'utilisateur, pas par votre modèle de données interne.

## Dashboards

Un dashboard devrait répondre à une question au-dessus de la ligne de flottaison : « Comment va mon truc ? »

Tout le reste est territoire de scroll. La partie supérieure :

```
[ Grand chiffre — métrique principale ]
[ Résumé en une phrase ]
[ Un seul sparkline ou visuel ]
```

En dessous, des données plus profondes. L'utilisateur ne scrolle que s'il le veut.

## Pages de détail

Montrez l'essentiel au premier chargement. Cachez les détails denses derrière des onglets ou un expand-on-click.

Par exemple, sur une page de détail d'un kit :
- Au-dessus de la ligne : nom, tagline, prix, CTA principale
- En dessous de la ligne : ce qu'il y a dedans (5 bullets, pas 50)
- « Fichiers que vous recevrez » — liste repliée par défaut sauf si l'utilisateur clique pour déplier

## Quand NE PAS utiliser la progressive disclosure

- Infos critiques (consentement, prix, politique de remboursement) — jamais cachées.
- Erreurs — toujours immédiatement visibles.
- Confirmations requises sur les actions destructives — jamais cachées.
- Tout ce qui doit légalement être conspicu.

## Comment choisir quoi montrer

Demandez-vous : « Si l'utilisateur ne passait que 5 secondes sur cet écran, quelle est l'unique chose qu'il doit en retirer ? »

Ça va au-dessus de la ligne de flottaison, dans la plus grande taille de typo, avec le plus de contraste. Tout le reste est secondaire.
