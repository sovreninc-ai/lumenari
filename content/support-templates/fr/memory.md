# Mémoire — Templates de Support Client

## Contexte du domaine

Une personne de support passe sa journée dans une queue. Les tickets arrivent via email, chat, social ou parfois téléphone. La plateforme est Zendesk, Intercom, Help Scout, Front ou pour les fondateurs solo, Gmail simple. Le job est : lire le ticket, comprendre ce dont le client a besoin, décider ce que vous pouvez faire, écrire la réponse. Répéter 30-100 fois par jour.

Les réponses dures sont celles où vous dites non — remboursements refusés, « on ne peut pas ajouter cette feature », « votre compte a été suspendu ». Les faciles sont « expédié aujourd'hui, voici le lien de tracking ». La plupart tombent entre les deux. Le ton compte plus que les gens ne pensent — le même contenu livré froid vs chaleureux produit une réaction client totalement différente.

Les fondateurs solo qui font leur propre support sont généralement plus chaleureux qu'ils n'ont besoin de l'être, et plus lents qu'ils ne devraient. Les équipes de support à l'échelle défauttent généralement sur formel et finissent par sonner comme un robot. Les deux laissent de la valeur de relation sur la table.

Il y a aussi une règle silencieuse que les meilleures personnes de support comprennent : vous ne résolvez pas juste un ticket, vous construisez (ou érodez) la perception qu'a le client de l'entreprise. Un remboursement refusé parfaitement géré peut sauver une relation. Un remboursement accordé mal géré peut quand même en perdre une.

## Vocabulaire que l'IA doit connaître

- **Ticket** : une conversation de support initiée par le client. A un statut (open, pending, solved, closed).
- **Macro** : un template de réponse sauvegardé dans Zendesk. Intercom les appelle « saved replies ». Help Scout les appelle « saved replies » aussi.
- **First response time (FRT)** : combien de temps avant que le client reçoive *une* réponse. La métrique la plus regardée dans le support.
- **Resolution time** : création du ticket à statut « solved ». Moins honnête que FRT — les agents ferment prématurément pour game-er ça.
- **CSAT** : Customer Satisfaction. Généralement un sondage 1-5 ou 1-7 envoyé après la fermeture d'un ticket. Visez 90 %+ « très satisfait ».
- **NPS** : Net Promoter Score. Échelle 0-10. Promoters (9-10), passives (7-8), detractors (0-6). Score = %promoters - %detractors.
- **Detractor recovery** : outreach aux clients qui ont donné un NPS 0-6 pour trouver ce qui ne va pas et essayer de réparer.
- **Escalade** : bumper un ticket à un rep senior, manager ou équipe spécialisée. A généralement un SLA interne de 24-48 heures.
- **SLA** : Service Level Agreement. Le temps de réponse/résolution promis, généralement contracté en entreprise.
- **Fenêtre de remboursement** : combien de jours après l'achat un remboursement est automatiquement éligible. Normes du secteur : 14 jours (SaaS), 30 jours (DTC), 365 jours pour Costco.
- **Chargeback** : quand un client dispute une charge via sa banque au lieu de demander au marchand. Coûte au marchand des frais (~15-25 $) en plus du remboursement.
- **Stripe Dashboard** : où la plupart des SaaS modernes traitent les remboursements. Un clic, l'argent revient en 5-10 jours.
- **Upsell depuis le support** : offrir un plan upgrade pendant une interaction support. Seulement approprié quand le client est content ET que l'upgrade résout son vrai problème.

## Workflows courants

- **Traiter une demande de remboursement** : lire le ticket → vérifier la date de commande et la politique de remboursement → vérifier l'historique client (première fois ? long terme ? problèmes passés ?) → décider : complet, partiel, refusé → si accordé, traiter dans Stripe/Shopify → répondre avec la résolution et la raison → si refusé, offrir 2-3 alternatives.
- **Gérer une commande perdue** : confirmer que la commande a été expédiée → vérifier le tracking → si « livré » mais que le client dit autrement, demander une photo du devant de la porte → si vraiment perdu, remplacer ou rembourser → contacter le transporteur en back-channel si ça arrive souvent.
- **Accuser une escalade** : répondre dans l'heure avec « J'ai escaladé ça à [nom/équipe] » et la timeline réaliste → ne jamais promettre un fix que vous ne pouvez pas confirmer → fixer l'attente pour la prochaine heure d'update.
- **Recovery NPS detractor** : voir un score 0-6 → répondre dans les 24 heures depuis une vraie personne (pas « merci pour votre feedback ! ») → poser une question spécifique → écouter → proposer un fix ou compensation si approprié.
- **Upsell-depuis-support (rare-mais-juste)** : le client est content de la résolution → son vrai besoin est sur un tier supérieur → mentionnez-le une fois, brièvement, avec la math → ne poussez pas.

## Ce qu'il faut éviter / erreurs courantes

- « Nous nous excusons sincèrement pour tout désagrément que cela aurait pu causer. » Cliché de support bas de gamme. Une reconnaissance spécifique bat toujours les excuses génériques.
- Démarrer avec les excuses, enterrer la résolution. Les clients veulent savoir ce que vous faites, puis pourquoi.
- « Selon notre politique... » sans expliquer la raison. Si la raison fait sens, donnez la raison. Si elle n'en fait pas, changez la politique.
- Timelines vagues : « bientôt », « sous peu », « en temps voulu ». Soyez spécifique ou silencieux.
- « N'hésitez pas à nous recontacter si vous avez des questions » comme fermeture. Remplacez par la vraie prochaine étape ou une vraie signature.
- Excuses sur plusieurs paragraphes avant la substance. Deux phrases max sur le côté excuses.
- Signatures form-letter : « l'équipe de [Entreprise] », « Customer Happiness Team ». Utilisez un vrai nom.
- Ton mélangé — démarrer formel, glisser vers chaleureux à mi-chemin. Choisissez-en un.
- Upseller quand le client est mécontent. Se lit comme cynique, tue la relation.
- « J'espère que cet email vous trouve bien. » Il a écrit avec un problème. Reconnaissez le problème.

## Tonalité / registre

Un excellent rédacteur de support matche la voix de marque sans perdre la sienne. Il écrit au niveau de lecture du client — phrases plus courtes, moins de virgules, mots simples. Il n'utilise jamais de jargon que le client n'a pas utilisé en premier. Il est chaleureux sans être saccharine, professionnel sans être froid, honnête sans être brusque. Il dit « je » quand il veut dire je, et « nous » quand il veut dire l'entreprise.

Le vocabulaire interne : tickets, macros, FRT, CSAT, escalades, chargebacks, fenêtre de remboursement. Le vocabulaire externe : « votre commande », « votre compte », « le problème », « ce qui s'est passé ». N'utilisez jamais de jargon interne dans le copy client-facing.

Les bonnes personnes de support sont légèrement plus directes que ce que la voix de marque suggère qu'elles devraient être. Elles ont appris que les clients préfèrent un « non » court et clair avec un chemin en avant qu'un long « nous regrettons de vous informer » poli.
