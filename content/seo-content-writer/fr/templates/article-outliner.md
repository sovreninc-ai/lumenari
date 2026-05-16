# Outliner d'article par clusters de mots-clés

Le plan est l'endroit où le ranking se gagne ou se perd. Si la structure est mauvaise, aucune écriture astucieuse ne le rattrape. Ce template est le prompt qui transforme « je veux ranker sur X » en plan prêt au combat.

---

## Ce que fait ce template

Vous lui donnez : un mot-clé principal, le contexte de votre site et le top 3-5 actuel de la SERP live. Il renvoie :

1. Classification d'intention (informationnelle / commerciale / navigationnelle / transactionnelle)
2. Une lecture de la SERP — ce qui gagne et pourquoi
3. Un plan complet avec H1, H2s, H3s suggérés et points clés par section
4. Clusters de mots-clés secondaires groupés par H2
5. Suggestions d'ancres de liens internes (nommées, pas génériques)
6. Opportunités PAA (People Also Ask) remontées comme H3 de FAQ
7. Meta title (50-60 car.) et meta description (140-160 car.)
8. Recommandation de schéma
9. Point d'injection E-E-A-T — où votre vraie expérience doit apparaître

---

## Le prompt

Collez ceci dans l'IA de votre choix. Remplissez les champs entre crochets.

```
Tu es le SEO Content Strategist.

Je veux un plan pour un article ciblant :

**Mot-clé principal :** [mot-clé]
**Volume mensuel estimé :** [N — ou « inconnu »]
**Intention de recherche (mon hypothèse) :** [informationnelle / commerciale / transactionnelle / « à toi de me dire »]

**Contexte de mon site :**
- URL : [domain.com]
- Ce qu'on publie : [niche + format]
- Profil lecteur : [qui ils sont, ce qu'ils veulent]
- Ordre de grandeur Domain Authority : [N — ou « petit site / moyen / grand »]
- Pages pertinentes existantes sur mon site (optionnel) : [lister URLs et titres]

**Top SERP (coller le top 5 actuel si possible) :**
1. [URL] — [titre] — [ta lecture : nombre de mots ? format ? angle ?]
2. [URL] — [titre] — [lecture]
3. [URL] — [titre] — [lecture]
4. [URL] — [titre] — [lecture]
5. [URL] — [titre] — [lecture]

**SERP features que je vois :**
- Featured snippet : [oui/non — si oui, qui le détient]
- People Also Ask : [oui/non — si oui, coller les 4 questions]
- Carrousel vidéo : [oui/non]
- Image pack : [oui/non]
- AI Overview : [oui/non]

**Mon angle différenciateur (si j'en ai un) :**
[1-2 phrases sur pourquoi je peux écrire une meilleure version — expérience directe, données uniques, POV contraire, etc.]

Donne-moi :
1. Classification d'intention (avec justification en une phrase)
2. Lecture SERP (ce qui marche, quelle est la lacune)
3. Plan complet (H1 + H2s avec intention par section, points clés, mots-clés secondaires)
4. Suggestions de liens internes (3-5 ancres nommées)
5. H3s de PAA si applicable
6. Meta title + meta description
7. Recommandation de schéma
8. Plan d'injection E-E-A-T
```

---

## Exemple travaillé — « best CRM for solopreneurs »

Voici à quoi ressemble un vrai passage de ce template de bout en bout.

### Entrée

```
Mot-clé principal : best CRM for solopreneurs
Volume mensuel estimé : ~1 900
Intention de recherche (mon hypothèse) : commerciale

Contexte de mon site :
- URL : solo-saas-reviews.com
- Ce qu'on publie : reviews et comparaisons SaaS longform pour entreprises d'une personne
- Profil lecteur : freelances, consultants, opérateurs indépendants évaluant des outils
- Ordre de grandeur DA : 52
- Pages pertinentes existantes :
  - /best-invoicing-software-for-freelancers (driver DA, classé #4)
  - /honeybook-vs-dubsado (trafic décent)
  - /crm-pricing-teardown (plus ancien, classé #11)

Top SERP :
1. Blog Zapier — "The 18 best CRMs for solopreneurs in 2025" — 4 200 mots, listicle, POV faible
2. Blog HubSpot — "Best CRM for solopreneurs (and why)" — 2 800 mots, légèrement promo
3. Review d'un auteur Substack — "I tested 5 CRMs for 90 days as a freelancer" — 1 400 mots, fort POV personnel
4. Page catégorie Capterra — générique
5. Page catégorie G2 — générique

SERP features :
- Featured snippet : oui, actuellement détenu par HubSpot, courte définition en paragraphe
- People Also Ask : oui — (1) What is the best free CRM for solopreneurs? (2) Do solopreneurs need a CRM? (3) Is HubSpot good for solopreneurs? (4) What is the easiest CRM to use?
- Carrousel vidéo : non
- Image pack : non
- AI Overview : oui, citant le Substack et HubSpot

Angle différenciateur : j'ai vraiment payé et utilisé 7 CRMs pendant 90 jours chacun. J'ai de vraies captures, de vraies données sur le time-to-first-deal-logged, de vrais reçus d'annulation.
```

### Sortie attendue de l'IA

> **Mot-clé principal :** best CRM for solopreneurs (vol ~1 900/mois)
> **Intention :** commerciale. La requête implique que l'utilisateur est en mode évaluation — il veut une recommandation, pas une définition. « Best » + « for [audience] » est de l'intention commerciale classique.
>
> **Lecture SERP :**
> - Formats du top 3 : deux listicles + une revue personnelle
> - Plage de longueur : 1 400 (Substack) à 4 200 (Zapier). HubSpot au milieu à 2 800.
> - La pièce Substack en #3 monte en classement malgré le fait d'être la plus courte parce qu'elle a le seul POV authentique. Zapier et HubSpot ont tous deux l'air écrits depuis un brief, pas depuis l'usage.
> - Le featured snippet est court et définitionnel — gagnable avec une réponse de 40-50 mots à « qu'est-ce qu'un CRM pour solopreneurs » ou « les solopreneurs ont-ils besoin d'un CRM » près du haut de la page.
> - L'AI Overview cite déjà la pièce Substack. Ça nous dit que Google récompense le contenu de vrai test pour cette requête.
> - **La lacune :** aucun du top 3 n'a de vraies données — time-to-value, friction d'annulation réelle, comparaison de paliers tarifaires réelle avec les limites des plans gratuits. C'est votre ouverture.
>
> **Considérations auteur/byline :** cet article ne marche que s'il est signé par quelqu'un qui a réellement utilisé les 7 CRMs. Si c'est vous, ouvrez avec : « Je suis [votre contexte]. Sur 90 jours j'ai payé et testé [liste]. Voici ce que j'ai gardé et ce que j'ai annulé. » Si ce n'est pas vous, embauchez ou associez-vous avec quelqu'un — ne le simulez pas ; Google s'améliore à le flairer.
>
> **Plan :**
>
> **H1 :** Best CRM for Solopreneurs: 7 Tested for 90 Days (~58 car.)
>
> **H2 : Do solopreneurs actually need a CRM?**
> Intention : répond au PAA le plus demandé, capture le featured snippet et plante le décor pour le reste.
> Points clés : réponse de 40 mots dans le premier paragraphe. Puis la version honnête — la plupart des solopreneurs sous 20 clients n'en ont pas besoin encore, mais voici quand ça bascule.
> Lien interne : lier `/crm-pricing-teardown` depuis le texte d'ancre « CRM pricing tiers »
> PAA : oui — cette section couvre aussi le PAA #2
>
> **H2 : How I tested these 7 CRMs**
> Intention : établit l'E-E-A-T. C'est la section qui fait que Google fait confiance au reste.
> Points clés : timeline (90 jours chacun), ce qui a été testé (temps de setup, temps jusqu'au premier deal loggué, friction d'usage quotidien, friction d'annulation), ce qui ne l'a pas été (features entreprise, plans équipe sans gate).
> Lien interne : aucun encore — pourrait en mériter un avec une galerie de captures comme sous-page plus tard.
>
> **H2 : The 7 CRMs, ranked**
> Intention : la viande principale. Chaque sous-titre est un CRM avec un verdict clair.
> Points clés : chaque entrée a un bloc de 200 mots avec : palier choisi, coût mensuel, verdict en 1 ligne, ce qui a marché, ce qui a cassé, est-ce que je le garderais.
> Lien interne : lier `/honeybook-vs-dubsado` depuis « HoneyBook vs. Dubsado deep dive » là où pertinent.
> Mots-clés secondaires à tisser naturellement : « free CRM for freelancers », « CRM for one-person business », « simple CRM », « lightweight CRM ».
>
> **H2 : Free CRMs: which one I'd actually pick** (couvre PAA #1)
> Intention : capturer le trafic du modificateur « free » sans faire que tout l'article concerne le gratuit.
> Points clés : HubSpot Free est le défaut évident ; le gotcha honnête à 1 000 contacts ; quoi utiliser si vous êtes sous 25 clients (un template Notion bat souvent tout CRM gratuit).
> Lien interne : aucun — mais si vous avez une page template Notion CRM, liez-la.
>
> **H2 : Is HubSpot good for solopreneurs?** (couvre PAA #3)
> Intention : répondre au PAA spécifique à la marque sans faire de l'article du HubSpot-vs-tous.
> Points clés : 100-150 mots. Réponse honnête (oui, avec mises en garde). Là où ça surdose pour un solopreneur.
>
> **H2 : What I'd actually pick — and the boring reason why**
> Intention : section différenciateur. Opinion forte, pas d'assise sur la barrière.
> Points clés : nommez un gagnant. Nommez le second. Nommez celui à éviter. Preuves.
>
> **H2 : How to switch CRMs without losing data**
> Intention : capturer l'intention long-tail « comment migrer » + donner à l'article de la valeur pratique.
> Points clés : formats d'export, ce qui ne se transfère pas, l'approche parallel-run d'1 semaine.
> Lien interne : si vous avez une page `/data-migration-guide`, liez-la.
>
> **Foire aux questions**
> H3 : What is the easiest CRM to use for solopreneurs? *(couvre PAA #4)*
> H3 : How much should a solopreneur pay for a CRM?
> H3 : Can I use Notion as a CRM?
> H3 : When should a solopreneur upgrade from a spreadsheet to a CRM?
>
> **Meta title :** Best CRM for Solopreneurs: 7 Tested in 90 Days (52 car.)
>
> **Meta description :** Paid for and used 7 CRMs for 90 days each as a one-person business. Here's the one I kept, the one I cancelled fastest, and what the comparison sites get wrong. (160 car.)
>
> **Recommandation de schéma :** Article + FAQPage. Pas de schéma Product sauf si vous ajoutez des pages de review individuelles — l'article est comparatif, pas une review de produit unique.
>
> **Plan d'injection E-E-A-T :**
> - Ouverture à la première personne : « Je suis [nom], je gère [type d'activité] et je paie les outils de ma poche. Voici ce que 90 jours de tests m'ont appris. »
> - Vraies captures d'écran dans le H2 pour chaque CRM (écran de signup, dashboard, flow d'annulation)
> - Vrais chiffres : time-to-first-deal-logged, coût mensuel payé, score de friction d'annulation (votre propre échelle)
> - Bio d'auteur en bas avec rôle + ancienneté + lien vers vos autres reviews
> - Si vous avez pris de l'argent de n'importe quel CRM (affiliation, sponsoring), divulguez en haut, pas en bas

---

## Erreurs de plan courantes que le kit signalera

- **Aucune section ancrant le featured snippet.** Si la SERP a un featured snippet, vous voulez que votre H2 y réponde dans les 40-60 premiers mots.
- **Questions PAA ignorées.** Si People Also Ask est sur la SERP, vous laissez une victoire de section FAQ sur la table.
- **Une section géante.** Si un H2 a 600+ mots dessous, divisez-le. Les résultats de recherche scannent les H2s et H3s.
- **Aucun lien interne nommé.** « Lier vers du contenu connexe » n'aide personne. Nommez l'ancre et la cible.
- **Meta description qui réécrit juste le H1.** Google réécrit celles-ci. Écrivez une vraie promesse en deux phrases.
- **Aucune injection E-E-A-T.** Le plan ne va nulle part s'il n'y a pas de plan pour de l'expérience à la première personne.

---

## Comment utiliser le plan une fois que vous l'avez

1. Lisez-le une fois. Pas d'accord avec quelque chose ? Demandez à l'IA de défendre le choix ou de réviser.
2. Remplissez les placeholders qui ont besoin de VOS données (vrais chiffres, vraies captures, vraies anecdotes).
3. Approuvez le plan avant de demander le brouillon complet. Ne laissez pas l'IA écrire 2 500 mots et réaliser ensuite que la structure ne va pas.
4. Générez le brouillon section par section. L'optimization pack gère ça — chaque section ouvre avec une réponse prête pour featured snippet, puis approfondit.
5. Faites passer le brouillon par le générateur meta + schéma (`templates/meta-and-schema.md`) avant publication.
