# Mémoire — Pack CV + Job Search

## Contexte du domaine

La recherche d'emploi est deux processus parallèles qui tournent sur des timelines différentes. Le process rapide c'est le volume de candidatures : tailler des CVs, soumettre via des portails ATS, envoyer des relances, se préparer aux screens. Le process lent c'est le réseau : intros chaleureuses, coffee chats, l'ami qui connaît un hiring manager, l'ex-collègue qui vous slack un JD. La plupart des jobs en 2026 viennent du process lent. Le process rapide existe pour donner au process lent quelque chose à pointer.

Une vraie recherche d'emploi dure 3-9 mois pour des rôles intermédiaires à seniors dans un marché normal, plus long dans un marché mou. Le rythme semaine par semaine : les lundis vous triagez ce qui est arrivé le week-end et contactez 5-10 contacts chaleureux ; du mardi au jeudi vous soumettez 5-15 candidatures taillées par jour et passez des entretiens ; les vendredis vous envoyez des relances et mettez à jour le tracker. Le burnout est le plus grand risque après un licenciement — pousser 100 candidatures par semaine est comme les gens finissent démoralisés en semaine six avec rien à montrer. Mieux : 20 candidatures bien taillées, 5 intros chaleureuses, et un bon entretien informationnel par semaine.

Le succès ressemble à une offre avec des termes que vous accepteriez, idéalement avec une seconde offre en attente comme ancrage. Le signal intermédiaire c'est la vélocité d'entretiens : transformez-vous les candidatures en screens ? Les screens en onsites ? Les onsites en offres ? Quand l'un de ces taux de conversion ne va pas, c'est là qu'il faut se concentrer, pas sur soumettre davantage.

## Vocabulaire que l'IA doit connaître

- ATS : Applicant Tracking System (Greenhouse, Lever, Workday, Ashby, Taleo). Les CVs sont parsés par un logiciel avant qu'un humain ne les voie.
- JD : Job Description.
- KSA : Knowledge, Skills, Abilities — phrasing gouvernemental et grandes entreprises pour ce qu'ils recrutent.
- TC : Total Compensation (base + bonus + equity + bénéfices). Le chiffre qui compte en comparant des offres.
- OTE : On-Target Earnings — pour les rôles sales, base + commission attendue au quota.
- IC : Individual Contributor (vs people manager).
- STAR : Situation, Task, Action, Result — le format dominant d'entretien comportemental.
- BAR : Behavior, Action, Result — le cousin plus vieux de STAR, moins courant.
- Pipeline : l'ensemble des conversations actives que vous avez avec les entreprises, par étape.
- Onsite / loop : l'entretien de dernier tour, généralement 3-5 sessions dos à dos, de plus en plus virtuel.
- Take-home : un projet que l'entreprise vous demande de faire non payé. Parfois ça vaut le coup, souvent non. Les candidats seniors peuvent généralement pousser en retour.
- Recruiter screen / phone screen : le premier appel de 30 min, presque toujours avec un recruteur, pas le hiring manager.
- HM : Hiring Manager. La personne dont vous rejoindriez l'équipe. Le « oui » le plus important du loop.
- Bar raiser : le nom Amazon pour l'interviewer neutre vis-à-vis de l'équipe et qui juge si vous élèveriez la barre dans l'entreprise. D'autres entreprises ont leur version.
- Prise de référence : généralement deux références professionnelles que l'entreprise appelle après une offre verbale. Parfois ils appellent en backchannel avant — supposez qu'ils le font.
- Contre-offre : quand votre employeur actuel offre plus d'argent pour vous garder. La sagesse conventionnelle du secteur est de ne pas accepter. Les raisons pour lesquelles vous vouliez partir reviennent généralement en 6 mois.

## Workflows courants

- **Tailler un CV pour un JD :** coller CV maître + JD → prompt de tailoring → revue de préservation des mots-clés → passage d'édition humain pour tonalité et vérité → sauvegarder en `Nom-Prenom-Entreprise.pdf` → logger dans le tracker.
- **Écrire une lettre de motivation :** identifier une chose spécifique sur l'entreprise (un produit, un launch récent, une personne que vous respectez) → prompt de cover letter → 3 paragraphes, ~200 mots → check de tonalité (sonne comme vous, pas un communiqué de presse).
- **Prép pour un entretien comportemental :** lister 6-8 histoires des 5 dernières années → faire passer chacune dans la structure STAR → identifier 2-3 qui mappent au vocabulaire du JD → pratiquer à voix haute jusqu'à ce que chacune tienne en 2-3 minutes.
- **Envoyer un remerciement post-entretien :** dans les 24 heures de chaque entretien → une référence spécifique à quelque chose que l'interviewer a dit → ~120 mots → individualisé par personne si vous avez des adresses pour plusieurs.
- **Récupérer d'un ghost :** jour 7 ping léger → jour 14 vraie relance → jour 30 passez à autre chose. Mettez à jour le tracker pour ne pas accidentellement engager un lead obsolète en semaine 8.
- **Négocier une offre :** n'acceptez jamais sur l'appel → 24-48 heures pour réfléchir → répondez avec une seule contre-demande (généralement base ou equity, rarement les deux) → utilisez les offres concurrentes ou les données de marché comme ancre, pas « je mérite plus ».

## Ce qu'il faut éviter / erreurs courantes

- **Énoncés d'objectif en haut d'un CV.** « Recherche un rôle challenging où je peux tirer parti de mes compétences. » Les recruteurs sautent toute la section du haut à cause de ça. Remplacez par un résumé de 2 lignes qui nomme le rôle et 1-2 qualifications spécifiques.
- **Puces « responsable de ».** Ne dit rien au lecteur sur les outcomes. Remplacez par un verbe qui implique un résultat : shippé, cut, owné, conçu, scalé, mentoré.
- **Bourrage de puces avec des adjectifs.** « Hautement motivé, orienté résultats, soucieux du détail, self-starter. » Personne ne croit ça. Laissez tomber tout ça.
- **Mentir sur les dates ou titres.** Les prises de référence et cross-références LinkedIn attrapent ça. Le coût d'être attrapé est l'offre.
- **Un CV pour chaque candidature.** L'ATS vous filtrera par mots-clés avant qu'un humain ne vous voie. Le tailoring est l'activité à plus fort ROI dans une recherche d'emploi.
- **Ouverture de lettre de motivation « Je vous écris pour postuler au poste de X. »** Bien sûr que oui. Coupez. Ouvrez avec quelque chose de spécifique.
- **Relancer trop agressivement.** Des pings quotidiens agacent. Cadence hebdomadaire au max, et retirez-vous après deux tentatives.
- **Négocier contre vous-même.** « Je pensais à 130k mais je suis flexible. » Ne dites pas ça. Énoncez votre nombre, arrêtez de parler.
- **Oublier de mettre à jour LinkedIn avant de postuler.** Les recruteurs croisent. Si votre LinkedIn dit toujours que vous êtes à un job que vous avez quitté il y a six mois, c'est un drapeau jaune.

## Tonalité / registre

Un vrai chercheur d'emploi sonne fatigué et pragmatique. Il a déjà eu quatre conversations cette semaine et n'a pas l'énergie pour une lettre de motivation qui ouvre avec « Je suis ravi de l'opportunité ». Il veut sonner comme lui-même — compétent, spécifique et humain. Légèrement informel c'est ok pour des candidatures startup ; légèrement formel c'est ok pour finance ou entreprise. La voix ne devrait jamais sembler crachée par un chatbot. Si une puce pourrait apparaître inchangée sur 5 000 autres CVs, réécrivez-la. Si un paragraphe se lit comme un humblebrag LinkedIn, coupez-le. Visez une énergie « j'irais prendre un café avec cette personne » dans la lettre de motivation et « cette personne a clairement fait le boulot » dans le CV.
