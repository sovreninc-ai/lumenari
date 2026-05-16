# Updates Client et Relances de Facture

Le côté ennuyeux du travail solo — dire aux clients ce que vous avez fait, leur demander de payer, et les chasser quand ils ne le font pas. Ce fichier est la copie qui fait les trois sans sonner comme un robot ni comme un paillasson.

---

## Partie 1 — L'update client hebdomadaire

L'email à plus fort levier dans le travail solopreneur. Envoyé chaque vendredi (ou le jour que vous engagez) comme une horloge. Après 3 de ceux-ci, les emails « hey just checking in » de votre client s'arrêtent. Leur boss arrête de leur demander où en est le projet. Vous devenez low-anxiety pour eux.

### Le format — cinq lignes max

```
**Cette semaine :**
- [Livrable concret livré ou avancé]
- [Livrable concret livré ou avancé]

**Semaine prochaine :**
- [Livrable]
- [Livrable]

**Besoin de toi :**
- [Décision spécifique ou asset, avec une date — ou « rien pour l'instant »]

**Statut :** On track / Watch / Blocked
**Prochain update :** [Date]
```

### Collez ce prompt à l'IA

```
Tu es le Solopreneur Co-Pilot.

Écris un update client du vendredi pour [NOM CLIENT] sur le projet [NOM PROJET]. Utilise le format standard 5 lignes.

Cette semaine j'ai :
- [BULLET 1]
- [BULLET 2]
- [BULLET 3]

La semaine prochaine je :
- [BULLET 1]
- [BULLET 2]

J'ai besoin d'eux :
- [DEMANDE]

Statut : [On track / Watch / Blocked — et une phrase pourquoi si pas On track]

Garde sous 100 mots. Langue simple. Pas de « I hope this email finds you well ».
```

### Exemple de sortie travaillé

> Sujet : Refresh de marque — update semaine 2
>
> **Cette semaine :**
> - Première direction visuelle livrée (lien Figma, commentaires ouverts)
> - Notes de l'atelier de positionnement consolidées dans le brouillon de doc de voix
>
> **Semaine prochaine :**
> - Round 2 de la direction visuelle basé sur tes feedback
> - Premier brouillon du template de pitch deck
>
> **Besoin de toi :**
> - Commentaires sur le fichier Figma d'ici mardi 21 mai
>
> **Statut :** On track
> **Prochain update :** vendredi 24 mai

Cet email a pris 4 minutes à écrire. Il va vous sauver 40 minutes de conversations « où on en est » la semaine prochaine.

### Quand le statut est Watch ou Blocked

Ajoutez toujours UNE phrase qui explique pourquoi. Jamais juste « Watch ». Exemples :

- **Watch — en attente de copie de l'équipe marketing depuis mardi ; je vais reshuffler la semaine prochaine si ça n'atterrit pas d'ici lundi.**
- **Blocked — l'environnement staging n'a pas encore été provisionné. J'ai emailé ton dev lead mercredi ; peux-tu lui ping ?**

Nommer le blocker dit au client qu'il doit faire quelque chose. Un « watch » vague le rend anxieux.

---

## Partie 2 — Copie de facture

La facture elle-même est principalement un formulaire (votre outil de facturation — Stripe, FreshBooks, HoneyBook, Wave, QuickBooks, whatever — la génère). La COPIE qui va autour de la facture est ce qui change.

### Email standard d'envoi de facture

```
Sujet : Facture [###] — [Nom du projet]

Salut [Nom],

La facture [###] est jointe / liée ci-dessous. Résumé :
- [Ligne 1] : X $
- [Ligne 2] : X $
- **Total :** X $ (Net 14)

Tu peux payer par [méthodes acceptées]. Si tu as besoin d'un format différent pour ton équipe AP, dis-le-moi.

Merci,
[Toi]
```

Notes :

- **Énoncez les conditions Net dans l'email**, pas seulement sur le PDF de facture. Les équipes AP en ont besoin par écrit.
- **N'écrivez pas « Merci pour votre business ! »** — ça sonne needy. « Merci » seul est OK.
- **Ne vous excusez pas pour la facture.** C'est le travail.

### Collez ce prompt à l'IA

```
Tu es le Solopreneur Co-Pilot.

Écris un email d'envoi de facture pour [NOM CLIENT]. Projet : [NOM]. Total : [MONTANT] CAD/USD. Conditions : Net [7/14/30]. Méthodes de paiement : [STRIPE/INTERAC/ACH/CHÈQUE/ETC].

Garde sous 70 mots. Pas de « Merci pour votre business ! ». Pas d'excuses.
```

---

## Partie 3 — Rappels de paiement en retard

L'escalade à trois tiers. Chaque tier est un email séparé, envoyé son propre jour. Ne combinez jamais.

### Jour 7 en retard — le nudge amical

Ton : supposer un oubli, pas de la mauvaise foi. La plupart des factures qui glissent au-delà de Net 14 sont assises dans la boîte de quelqu'un ; pas malicieux, juste enseveli.

```
Sujet : Re: Facture [###]

Salut [Nom],

Petit nudge — la facture [###] du [date] était due le [date], et je ne l'ai pas vue passer. Je sais à quel point c'est facile à manquer. Pourrais-tu checker avec AP et me dire quand je peux l'attendre ?

S'il y a un hold-up de ton côté, content d'en parler.

Merci,
[Toi]
```

### Jour 14 en retard — plus ferme, mentionne la politique

Ton : encore poli. Le client sait maintenant que vous trackez. Si vous avez une politique de frais de retard dans votre SOW, c'est ici qu'elle apparaît.

```
Sujet : Facture [###] — toujours en attente

Salut [Nom],

Suivi — la facture [###] est maintenant 14 jours en retard. Selon notre SOW, des frais de retard de 1,5 % s'appliquent après 14 jours ; c'est ajouté à la facture mise à jour ci-jointe.

S'il y a quelque chose que je peux faire pour aider à débloquer de ton côté, dis-moi. Sinon je recheckerai la semaine prochaine.

Merci,
[Toi]
```

Si vous n'avez pas de clause de frais de retard, lâchez cette ligne. Ne bluffez pas — votre client pourrait avoir le SOW ouvert.

### Jour 30 en retard — formel, le travail pause

Ton : encore professionnel, mais les conséquences sont réelles et énoncées. Vous pausez le travail, et vous voulez un appel téléphonique.

```
Sujet : Facture [###] — pause du travail

Salut [Nom],

La facture [###] est maintenant 30 jours en retard. À partir du [date], je pause le travail supplémentaire sur [PROJET] jusqu'à ce que le solde soit réglé. Je préférerais ne pas — réglons ça en un appel de 15 minutes cette semaine.

Créneaux possibles : [3 options].

Si c'est le mauvais contact pour AP, merci de boucler qui je devrais contacter.

Merci,
[Toi]
```

### Ce que vous NE FAITES PAS

- « Just following up again… » pour la cinquième fois. Après le Jour 30, vous avez envoyé trois emails escaladants. Le quatrième c'est l'appel, pas un quatrième email.
- Lignes de fin passif-agressives (« Je suppose que ce n'est pas une priorité ? »)
- Des menaces que vous ne pouvez pas tenir (« Je vais devoir impliquer mon avocat. ») — sauf si vous le ferez vraiment, et que le montant le justifie.
- Du shaming public. Ne tweetez pas dessus, ne postez pas dessus. La réputation marche dans les deux sens.

### Quand escalader au-delà de l'email

Si 45 jours en retard et pas de réponse : envoyez un dernier email disant que vous le passez à un service de recouvrement ou à un processus de petits litiges, puis faites-le vraiment. La menace-sans-action vous fait paraître mou. L'action-sans-avertissement n'est pas professionnelle. Toujours un dernier email qui nomme l'action et la date.

---

## Partie 4 — L'email « scope creep » en milieu de projet

Adjacent à la facturation. Quand le client demande « juste une chose de plus » qui n'est pas dans le SOW.

### Le template

```
Sujet : Re: [leur demande]

Salut [Nom],

Content de regarder [la nouvelle chose]. Heads up — c'est hors du scope qu'on a accepté dans le SOW (Section 2 : Out of Scope). Je peux le gérer comme une Change Request :

- Option 1 : l'ajouter en add-on flat à [X $]. Ajoute [Y] jours à la timeline.
- Option 2 : la garer pour une Phase 2 après qu'on a fini le scope actuel.

Quelle voie tu veux prendre ?

Merci,
[Toi]
```

Notez ce que ce template ne fait PAS :

- Il ne dit pas « bien sûr, je peux glisser ça ». C'est comme ça que le scope creep mange votre marge.
- Il ne s'excuse pas de facturer pour du nouveau travail.
- Il ne fait pas la leçon au client sur ce qu'est le scope creep. Le nomme juste et offre des options.

---

## Antisèche — quoi envoyer quand

| Situation | Envoyer ceci |
|---|---|
| Fin de chaque semaine | Update hebdo (5 lignes) |
| Facture prête | Email d'envoi de facture (sous 70 mots) |
| 7 jours en retard | Nudge amical |
| 14 jours en retard | Rappel plus ferme, mentionne la politique |
| 30 jours en retard | Email de pause du travail + demande d'appel |
| 45 jours en retard | Dernier email qui nomme la prochaine action |
| Client demande hors scope | Offre de Change Request (2 options) |

Mettez-les dans votre gestionnaire de snippets (TextExpander, Raycast, Alfred, whatever). La friction d'écrire le même email encore et encore est ce qui fait que les solopreneurs laissent glisser les factures.

---

## Erreurs courantes que le kit signalera

- « Just checking in » — remplacer par un statut ou une question spécifique
- « I hope this email finds you well » — couper, ça n'ajoute rien
- « Sorry to bother you » — ne jamais s'excuser d'être dû de l'argent
- Rappels qui ne nomment pas un montant en dollars ou un numéro de facture — être spécifique
- Updates sans date pour le prochain update — toujours inclure
- Statut « On track » quand quelque chose glisse vraiment — appelez ça Watch
