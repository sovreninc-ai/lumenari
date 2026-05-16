# Recovery NPS Detractor

Un client vient de vous donner un 0-6 sur le sondage NPS. La plupart des entreprises traitent ça comme une métrique. Les malines le traitent comme une fenêtre de 90 secondes pour garder un client qui était sur le point de partir silencieusement.

Ce playbook est pour l'outreach qui arrive après qu'un score detractor atterrit dans votre queue. Ce n'est pas un mouvement de vente. C'est une conversation « qu'est-ce qui ne va pas » qui devient parfois un save.

---

## Les règles

1. **Répondez dans les 24 heures.** Après ça, le client est passé à autre chose et votre réponse se lit comme « on a remarqué que vous avez dit quelque chose de négatif ».
2. **Vraie personne, vrai nom.** « Customer Happiness Team » est la mort de la réponse.
3. **Pas de défensivité.** Il n'a pas demandé un débat. Il a demandé à être entendu.
4. **Une question spécifique.** Pas « dites-nous comment on peut s'améliorer ». C'est un sondage, pas une conversation.
5. **Écoutez quand il répond.** La plupart de la valeur est dans la réponse, pas dans votre ouverture.
6. **Pas d'upsell. Jamais.** Pas dans l'ouverture, pas dans le suivi. L'outreach detractor est le mauvais canal pour un mouvement de vente.

---

## Le message d'ouverture — trois tons

Le client a donné un score de 3 à un produit SaaS qu'il utilise depuis 18 mois. Aucun commentaire n'était joint. Vous ne savez pas encore ce qui ne va pas.

### Formel

> Sujet : Suivi de votre récent feedback
>
> Bonjour Marcus,
>
> J'ai vu votre récente réponse au sondage, où vous nous avez donné 3 sur 10. Après 18 mois en tant que client, ce n'est pas l'expérience avec laquelle je voudrais que quiconque parte.
>
> J'apprécierais la chance de comprendre ce qui ne marche pas. Si vous avez une minute pour partager, quelle est la chose unique la plus importante qui aurait rendu les 18 derniers mois meilleurs ?
>
> Pas de pression pour répondre si ce n'est pas le bon moment. Je lis chaque réponse personnellement.
>
> Cordialement,
> Sarah Chen
> Customer Support Lead

### Sympa

> Sujet : J'ai vu votre sondage — qu'est-ce qui s'est passé ?
>
> Bonjour Marcus,
>
> J'ai attrapé votre réponse NPS — un 3 après 18 mois ressort, et pas dans le sens où on voudrait.
>
> Si vous avez une minute, quelle est la chose unique la plus importante qui aurait rendu ces 18 mois meilleurs ? Pas besoin que ce soit poli — puces, une ligne, ce qui est facile. Je lis tout ce qui revient.
>
> Sarah

### Chaleureux

> Sujet : J'ai vu votre sondage — qu'est-ce qui se passe ?
>
> Bonjour Marcus,
>
> Vous nous avez donné un 3 sur le sondage après être resté 18 mois. Ça m'est resté en tête — les clients de longue date ne laissent généralement pas de scores detractor par accident.
>
> Si vous avez 30 secondes : quelle est la plus grosse chose qu'on devrait fixer pour que ce ne soit pas un 3 ? Pas besoin que ce soit une liste. Une phrase suffit. Je veux juste savoir ce qu'on a manqué.
>
> Sarah

---

## Ce que « une question spécifique » signifie

La question est calibrée. Trop large → réponses vagues. Trop étroite → vous pourriez rater le vrai problème.

**Trop large** (non) :
- « Comment pouvons-nous nous améliorer ? »
- « Qu'avez-vous pensé ? »
- « Tout feedback que vous voudriez partager ? »

**Trop étroite** (non) :
- « Était-ce le changement de prix de mars ? »
- « Le récent redesign UI vous a-t-il frustré ? »

**À peu près juste** :
- « Quelle est la chose unique la plus importante qui aurait rendu les [N mois] derniers meilleurs ? »
- « Si vous deviez choisir une chose qui retient le produit pour vous, qu'est-ce que c'est ? »
- « Qu'espériez-vous que vous n'avez pas obtenu ? »

---

## La réponse — trois réponses à « qu'est-ce qui ne va pas »

Le client a répondu. Maintenant la conversation démarre vraiment. Trois formes courantes :

### Pattern de réponse 1 : « Le prix a augmenté et la valeur non »

Le client a raison. Ne prétendez pas qu'il a tort. Validez, puis parlez d'alignement de valeur.

#### Sympa

> Bonjour Marcus,
>
> C'est juste, et le changement de prix n'a pas été bien pitché aux clients existants — je pense que vous n'êtes pas le premier à le ressentir.
>
> Quelques choses que je peux offrir :
>
> - **Grandfather votre ancien tarif** pour les 12 prochains mois — on a fait ça pour certains clients de longue date et le vôtre qualifie
> - **Bouger vers un tier inférieur** avec les features que vous utilisez vraiment
> - **Un appel de 30 minutes** pour regarder comment vous l'utilisez vraiment — parfois la valeur est là mais pas la conscience
>
> Dites-moi juste ce qui aiderait et je le mettrai en place.
>
> Sarah

Le save ici n'est pas toujours « donnez-lui l'ancien prix ». Parfois c'est juste être honnête que le changement de prix a fait mal et offrir une sortie qui le respecte.

### Pattern de réponse 2 : « Feature spécifique est cassée / manquante / lente »

Le client signale un vrai problème produit. Trois choses à faire, dans l'ordre :

1. Confirmez que vous l'avez bien entendu
2. Dites-lui le vrai statut de la chose qu'il a soulevée (en cours / sur le backlog / pas prévu, et pourquoi)
3. Si vous pouvez le router vers un workaround ou bêta, faites-le

#### Sympa

> Bonjour Marcus,
>
> Compris — le bulk import a été lent quand vous travaillez avec 5 000+ lignes. Vous n'êtes pas le seul — c'est un problème connu et il est activement travaillé. Timeline réaliste est 4-6 semaines pour le fix.
>
> En attendant, deux workarounds qui ont aidé d'autres clients :
>
> - Utilisez le endpoint API d'import CSV au lieu de l'UI — mêmes données, 10× plus rapide
> - Splittez votre fichier en chunks sous 2 000 lignes
>
> Heureuse de vous walker à travers l'approche API si c'est utile. Je flag-erai aussi votre compte pour être notifié le jour où le fix ship.
>
> Sarah

Ne dites jamais « on fera savoir à l'équipe ». Cette phrase est ce qu'un chatbot dit. Dites « j'ai flaggé ça avec l'équipe engineering » ou « c'est déjà sur la roadmap, voici le timing réaliste ».

### Pattern de réponse 3 : « Votre support a été terrible »

Le client se plaint de *vous* (ou de vos collègues). Ne devenez pas défensif. Ne blâmez pas l'agent précédent.

#### Sympa

> Bonjour Marcus,
>
> Merci de me le dire directement — je préfère l'entendre.
>
> J'ai regardé en arrière vos trois derniers tickets et je peux voir ce que vous décrivez — les temps de réponse ont dépassé là où ils devraient être et les réponses étaient moins que directes. C'est sur nous, pas sur vous.
>
> Si vous êtes ouvert, j'aimerais être votre point de contact direct pour les 60 prochains jours. Répondez à cet email avec ce dont vous avez besoin et je le gérerai personnellement. Après 60 jours, si le support est de retour là où il devrait être, on revient à la queue normale.
>
> Pas de pression dans un sens ou l'autre.
>
> Sarah

Le mouvement « point de contact direct pour 60 jours » est un des saves à plus fort levier dans le support. Vous coûte presque rien. Signifie tout pour le client.

---

## Quand le client ne répond pas

La plupart ne répondront pas. C'est ok. L'outreach compte quand même.

Si vous voulez relancer une fois (et seulement une), faites-le 5-7 jours plus tard :

> Bonjour Marcus,
>
> Je reviens au cas où mon dernier message a été enterré. Pas besoin de répondre s'il n'y a rien à partager — je voulais juste que vous sachiez que la porte est ouverte.
>
> Sarah

C'est tout. Une relance. Puis passez à autre chose. Plusieurs emails « checking in » après un score detractor signalent que vous chassez la métrique, pas le client.

---

## Interne — quoi tracker quand le client RÉPOND

Construisez une habitude. Chaque réponse detractor est taggée :

- **Catégorie de root cause** : prix, feature manquante, feature cassée, qualité de support, onboarding, autre
- **Outcome de save** : sauvé, churné, neutre
- **Ce qui a été offert** : discount, changement de plan, escalade, rep dédié, rien

Après 90 jours, regardez les données. Le pattern montre presque toujours qu'une root cause génère la plupart des scores detractor. Fixez celle-là et votre NPS bouge plus que n'importe quel save individuel.

---

## Le mindset

La recovery detractor n'est pas un exercice de gestion de métrique. C'est le rare moment où un client vous dit ce qui ne va vraiment pas avant de partir silencieusement. La plupart ne vous le diront jamais.

Un taux de réponse de 30 % est bon. Un taux de réponse de 50 % signifie que la question est bien calibrée et que la marque a mérité la confiance pour qu'on lui réponde honnêtement. Un taux de réponse de 5 % signifie que l'email se lit comme rédigé par un robot.

En cas de doute : soyez plus court, soyez plus spécifique, soyez plus humain.
