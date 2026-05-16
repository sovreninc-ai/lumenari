# Playbook Boolean et Sourcing

La plupart du sourcing est mauvais parce que la chaîne booléenne est mauvaise. La plupart des booléens sont mauvais parce qu'ils traitent tous les candidats comme s'ils vivaient sur LinkedIn de la même façon. Ce playbook répare les deux — le constructeur de chaîne pour chaque plateforme et le playbook de sourcing pour quelle plateforme trouve quelle séniorité pour quelle famille de rôle.

---

## Partie 1 — Anatomie d'une chaîne booléenne

Chaque bon booléen a quatre mouvements :

1. **Compétences/titres MUST-have** — requis, généralement des chaînes entre guillemets, joints par AND
2. **Compétences OPTIONAL** — élargir le filet, joints par OR
3. **EXCLUSIONS** — ce que vous ne voulez pas, avec NOT
4. **Signaux de CONTEXTE** — type d'entreprise, indicateurs de séniorité, lieu

### Opérateurs qui marchent partout

- `AND` — les deux termes doivent être présents
- `OR` — l'un ou l'autre
- `NOT` (ou `-` sur la plupart des moteurs de recherche) — exclure
- `"phrase entre guillemets"` — match exact (traite les espaces comme partie du terme)
- `(parenthèses)` — grouper les opérateurs

### Opérateurs spécifiques aux plateformes

- LinkedIn Recruiter a des filtres comme champs (Titre, Compétences, Entreprise, etc.) que vous togglez dans l'UI, PAS dans la chaîne de recherche
- La recherche LinkedIn publique supporte du booléen basique dans le champ mots-clés mais est plus restreinte
- Les recherches X-ray Google utilisent site:linkedin.com/in/ et le booléen complet
- La recherche GitHub supporte des filtres comme `language:`, `location:`, `followers:>X`

---

## Partie 2 — Chaînes LinkedIn Recruiter

LinkedIn Recruiter est le plus facile parce que la plateforme elle-même sépare les champs pour vous.

### Le prompt

```
Tu es le Recruiter Co-Pilot.

Construis-moi une recherche LinkedIn Recruiter.

**Rôle cible :** [titre]
**Séniorité :** [Junior/Intermédiaire/Senior/Staff/Principal]
**Compétences must-have :** [liste]
**Compétences optionnelles :** [liste]
**Industries/types d'entreprise que je veux :** [ex. "B2B SaaS, Série A-C, 50-300 employés"]
**Industries/types d'entreprise à exclure :** [ex. "consulting entreprise, agences"]
**Lieu :** [ville + rayon ou remote-anywhere]
**Préférence d'ancienneté :** [ex. "au rôle actuel 1+ an"]

Donne-moi :
1. La chaîne booléenne pour le champ mots-clés
2. Que régler dans chaque champ de filtre (Titre, Compétences, Industrie, Entreprise, Lieu, Années d'expérience)
3. 2-3 variantes si ma première recherche remonte trop ou trop peu de résultats
4. Patterns de faux positifs courants à surveiller
```

### Exemple travaillé — Senior Backend Engineer

> **Setup LinkedIn Recruiter :**
>
> **Filtre Titre :** (Senior OR Sr OR Staff) AND (Backend OR "Back-end" OR "Back end" OR Server)
>
> **Filtre Compétences :** Node.js, TypeScript, PostgreSQL (exiger les trois)
>
> **Booléen champ mots-clés :**
> ```
> ("Node.js" OR "Node" OR Typescript) AND (Postgres OR PostgreSQL) AND (AWS OR GCP) NOT ("recruiter" OR "recruiting" OR "tech evangelist")
> ```
>
> **Filtre Industrie :** Computer Software, Internet, Financial Services (togglez selon pertinence)
>
> **Filtre Entreprise :** EXCLURE : agences, cabinets de conseil, grosses entreprises (Cognizant, Infosys, TCS, Accenture, Deloitte, Capgemini) si vous voulez uniquement de l'expérience en société produit
>
> **Années d'expérience :** 6+ (ne gatekeepez pas à 10 ; la qualité senior émerge souvent à 6-8 ans)
>
> **Lieu :** comme spécifié
>
> **Variantes si trop de résultats :**
> - Ajouter un filtre d'ancienneté : 1+ an à l'entreprise actuelle (filtre les job-hoppers + arrête les gens qui viennent juste d'être embauchés par des concurrents)
> - Resserrer le rayon de localisation
> - Ajouter un signal d'industrie spécifique (FinTech / HealthTech / etc.)
>
> **Variantes si trop peu de résultats :**
> - Lâcher une des compétences must-have, la garder comme préférée
> - Élargir à Mid-level (souvent de qualité senior)
> - Détendre le filtre entreprise
>
> **Faux positifs à surveiller :**
> - « Senior » dans le titre chez des entreprises où senior signifie 2 années d'expérience (consulting, agences)
> - Backend engineers qui ne font que Python ou Java (votre stack est Node) — vérifier dans le détail du profil
> - Toute personne avec le ring vert « open to work » ET moins d'1 an à l'entreprise actuelle — pourrait être un job-hopper ; pourrait être un fort candidat post-layoff. Lisez attentivement.

### LinkedIn Recruiter — patterns booléens courants

| Cas d'usage | Exemple de chaîne |
|---|---|
| Trouver des gens qui utilisent des outils spécifiques | `("Datadog" OR "PagerDuty") AND ("Kubernetes" OR "EKS")` |
| Trouver des gens qui SPEAKENT en conférence | `(speaker OR keynote OR "spoke at")` |
| Trouver des contributeurs OPEN SOURCE | `("open source" OR "OSS" OR github)` |
| Trouver des gens d'une famille d'entreprise spécifique | `("ex-Stripe" OR "former Stripe" OR "previously at Stripe")` |
| Exclure recruteurs et formateurs | `NOT (recruiter OR "talent acquisition" OR trainer OR "tech evangelist")` |

---

## Partie 3 — Recherche LinkedIn publique

Pour quand vous êtes en dehors de Recruiter ou que vous complétez.

### Le format

Le champ mots-clés de LinkedIn accepte le booléen mais est plus restreint. Pas de parenthèses imbriquées au-delà de deux niveaux. Les phrases entre guillemets fonctionnent.

```
("Senior Backend Engineer" OR "Senior Software Engineer") AND ("Node.js" OR Typescript) AND Postgres NOT recruiter
```

Combiné avec les filtres de lieu et d'entreprise actuelle dans l'UI, ça va étonnamment loin.

### Recherches X-ray Google (quand la recherche LinkedIn est gatée)

Le X-ray Google vous donne des résultats que LinkedIn pourrait cacher aux utilisateurs non connectés.

```
site:linkedin.com/in/ ("Senior Backend Engineer" OR "Senior Software Engineer") "Node.js" "Postgres" "San Francisco" -intitle:"profiles" -inurl:dir/
```

Variantes :

- Ajouter `-intitle:"profiles"` pour sauter les pages d'annuaire LinkedIn
- Ajouter `"open to work"` pour trouver les gens qui ont signalé leur ouverture
- Ajouter `"intern"` à NE PAS exclure — le négatif `-intern` filtre les profils juniors

---

## Partie 4 — Sourcing GitHub

GitHub est où les senior engineers vivent vraiment. Le signal est dans le code, pas dans la bio.

### Patterns de recherche

**Par langage + lieu :**
```
location:Toronto language:typescript followers:>50
```

**Par contribution open-source à un repo spécifique :**
- Allez sur le repo
- Cliquez « Insights » → « Contributors »
- Triez par commits dans la dernière année
- Croisez les profils des top contributors pour des signaux de hiring

**Par activité récente :**
```
location:"San Francisco" language:rust followers:>100
```
Puis filtrez par « Most followed » ou regardez le graphique de contributions pour l'activité récente.

**Trouver des gens qui ont écrit des tutoriels ou du longform :**
- Cherchez Twitter/X pour des repos GitHub : `from:@person github.com/`
- Ou utilisez Google : `site:github.com "tutorial" "production" "we built"`

### Quoi chercher sur un profil GitHub

- Repos pinnés avec des READMEs qui SE LISENT bien — signal engineer-avec-skill-de-communication
- Activité récente (contributions dans les 3 derniers mois)
- Un mix de projets perso + contributions OSS à des projets connus
- Followers > 50 est un signal doux de présence communautaire
- Bio qui nomme une entreprise actuelle (économise un cross-référencement)

### Ce qui n'est PAS du signal

- Compte de repos seul élevé — la plupart sont des forks
- Badges « AWS Certified » dans leur bio — signaux papier
- Stars sur leurs projets sans commits depuis 2 ans

---

## Partie 5 — Le playbook de sourcing

Où trouver quelles séniorités pour quelles familles de rôle. La réponse honnête est toujours « ça dépend », mais le playbook réduit la zone.

### Engineering

| Séniorité | Source principale | Source secondaire | Ce qui marche |
|---|---|---|---|
| Junior | LinkedIn (jeunes diplômés + bootcamp) | Réseaux d'anciens de bootcamps (Bloc, App Academy, Lambda, etc.) | Outreach direct, mais attendez-vous à des taux de réponse plus bas |
| Intermédiaire | LinkedIn Recruiter | GitHub (contributeurs actifs) | Référencer des projets spécifiques dans l'outreach |
| Senior | GitHub > LinkedIn | Speakers de conférences, contributeurs OSS | Outreach au ton de pair, spécificité technique requise |
| Staff/Principal | Recommandations + GitHub + Twitter/X | LinkedIn marche rarement — ils ignorent les InMails | Embauchez quelqu'un qu'ils respectent ; l'intro chaleureuse vaut 10× le InMail |

Pour les engineers senior+ : arrêtez de sourcer sur LinkedIn d'abord. Commencez par LEUR propre contenu — articles de blog, contributions OSS, talks de conférence. Leur LinkedIn est le dernier endroit qu'ils mettent à jour.

### Design (Product / Brand)

| Séniorité | Source principale | Source secondaire | Ce qui marche |
|---|---|---|---|
| Junior | LinkedIn + Dribbble / Figma Community | Anciens de bootcamp | Spécificité du portfolio |
| Intermédiaire | Dribbble + Figma Community + LinkedIn | Communauté design Twitter | Complimenter un travail spécifique |
| Senior | Sites personnels + Dribbble + Twitter | LinkedIn (priorité basse) | Référencer leur vrai travail, pas le rôle |
| Director | Recommandations + Twitter | LinkedIn | Intros chaleureuses uniquement |

Les designers maintiennent des portfolios, pas LinkedIn. Le portfolio EST la source.

### Sales (AE, SDR, CS)

| Séniorité | Source principale | Source secondaire | Ce qui marche |
|---|---|---|---|
| SDR | LinkedIn + RepVue + Bravado | Événements de networking | Transparence de la comp, chemin de croissance |
| AE Intermédiaire | LinkedIn (très actif ici) | RepVue (pour la recherche ICP-fit) | Territoire spécifique + fourchette de comp |
| AE Senior | LinkedIn + recommandations | Slacks d'industrie (RevGenius, Pavilion) | Données d'atteinte de quota + spécificités du produit |
| VP/CRO | Recommandations + réseau d'investisseurs | Executive search lourd | L'intro chaleureuse est requise ; le cold outreach c'est 1-2 % |

LinkedIn est où les sales vivent. Leur identité professionnelle entière y est.

### Operations / G&A

| Séniorité | Source principale | Source secondaire | Ce qui marche |
|---|---|---|---|
| Junior/Intermédiaire | LinkedIn + Pavilion (pour ops) | Groupes d'industrie (ex. People Geeks pour les RH) | Description de périmètre spécifique |
| Senior | LinkedIn + recommandations + Pavilion | Communautés d'industrie | Real-talk sur l'état de départ |
| Director/VP | Recommandations + executive search | LinkedIn (ROI bas) | Introductions de réseau |

Les gens d'ops se cachent souvent sur LinkedIn parce qu'ils sont constamment sollicités. Les communautés ont un signal plus élevé.

### Product (PM, Product Leadership)

| Séniorité | Source principale | Source secondaire | Ce qui marche |
|---|---|---|---|
| APM/Intermédiaire | LinkedIn | Communauté Mind the Product | Spécificités produit, chemin de croissance |
| Senior | LinkedIn + Mind the Product + cercle Lenny's Newsletter | Twitter (les PMs actifs postent ici) | Spécificité de domaine |
| Director/VP | Recommandations + anciens Reforge | LinkedIn (priorité basse) | Intros chaleureuses |

Les PMs dans des rôles seniors sont souvent très en ligne — Twitter, Substacks, apparitions en podcast. Référencez ce qu'ils ont partagé publiquement.

---

## Partie 6 — Où trouver des candidats divers (sans dog-whistler)

Cette section est pour les recruteurs qui essaient d'élargir leur funnel sans bullshit performatif.

### Le principe

Les pipelines diverses viennent du sourcing dans des endroits qui ne sont pas vos sources par défaut. Elles ne viennent pas de chaînes de recherche qui filtrent sur des catégories protégées (illégal dans la plupart des juridictions, même si la plateforme vous laisse essayer).

### Communautés qui aident

- **Engineering :** Out in Tech, Lesbians Who Tech, /dev/color, Black Tech Pipeline, Latinas in Tech, Women Who Code
- **Design :** People of Craft (designers POC), Hexagon (femmes+ en design)
- **Sales :** Sistas In Sales, Hispanic Star, Women in Sales Everywhere
- **Product :** Women in Product, réseaux Product Manager dans des communautés plus larges

La plupart ont des job boards, des workspaces Slack et des calendriers d'événements. Vous aurez 10× plus de signal en postant un rôle à une de celles-ci spécifiquement qu'en faisant tourner une autre recherche LinkedIn.

### Ce qu'il ne FAUT PAS faire

- Rechercher « diversité » ou « femmes » sur LinkedIn — c'est illégal dans plusieurs endroits et ça ne marche même pas là où c'est légal
- Filtrer les photos de candidats pour la diversité visible — illégal, biaisé, et les données ne sont pas fiables de toute façon
- Utiliser les noms comme proxy d'ethnicité — extrêmement biaisé et fréquemment faux
- Le boilerplate « On est un milieu de travail inclusif » au fond d'un JD qui est par ailleurs plein de langage « rockstar ninja » — les candidats voient à travers ça

### Ce qui marche

- Sourcer dans les communautés listées ci-dessus
- Avoir un vrai milieu de travail inclusif (congé parental, travail flexible, vrais ERGs, leadership divers) et laisser vos JDs le refléter honnêtement
- Payer équitablement (publier les fourchettes salariales ; pay-banding par niveau de job, pas par agressivité de négociation)
- Tracker la diversité du funnel à chaque étape — sourcés, screened, interviewés, offerts, acceptés. Le drop-off vous dit où vous êtes cassé.

---

## Partie 7 — Cadence de sourcing + métriques d'outreach

### Chiffres réalistes

Pour un rôle senior engineering dans une entreprise Série B avec une marque décente :

- Liste de sourcing de 50 candidats
- Taux de réponse à l'outreach : 15-25 % (message de 3 lignes avec comp + raison spécifique)
- Conversion en phone screen : 50 % des réponses
- Conversion en premier entretien : 50 % des screens
- Offre : 1-2 sur les 50 d'origine

Si votre taux de réponse est sous 10 %, le problème est presque toujours :
- Outreach générique (pas de raison spécifique pour ce candidat)
- Pas de fourchette de comp mentionnée
- Ligne de sujet (« Opportunité excitante chez... »)
- Outreach hors marque pour la séniorité (outreach ton template à un Staff Engineer)

Si votre taux de réponse est au-dessus de 30 %, vous sourcez peut-être trop étroitement. Élargissez le pool.

### Cadence d'outreach

- Jour 1 : premier message
- Jour 5-7 : une relance (angle différent — ex. premier message ouvre sur l'espace de problème ; la relance ouvre sur l'équipe)
- Jour 14 : relance finale (courte — « toujours là, toujours intéressé, pas de souci si ce n'est pas le bon moment »)
- Puis stop. Trois messages, puis laissez la porte ouverte.

Après trois, vous êtes une nuisance. Les recruteurs qui continuent au-delà de trois brûlent la marque pour tous ceux qui recrutent dans cette entreprise.

---

## Erreurs courantes de booléen et sourcing que le kit signalera

- **Trop de ANDs.** Chaque AND restreint. 5+ clauses AND remontent généralement sous 50 résultats, la plupart pas ce que vous voulez.
- **Pas de clauses NOT.** Vous vous noierez dans les formateurs, recruteurs et consultants. Excluez toujours.
- **Recherches uniquement par titre.** « Senior Backend Engineer » varie énormément d'une entreprise à l'autre. Cherchez aussi sur compétences + outcomes.
- **Chercher des senior+ engineers sur LinkedIn.** Leur LinkedIn est obsolète. Sourcez sur GitHub, listings de conférences, listes de contributeurs OSS.
- **Pas de qualifier de lieu sur un rôle remote.** Même « remote-anywhere » a généralement des contraintes de fuseau horaire. Filtrez par fuseau, pas juste par remote.
- **Sourcer les mêmes 50 profils LinkedIn que tous les autres recruteurs.** Si votre pool est la première page d'une recherche LinkedIn générique, vous êtes en concurrence avec 10 autres recruteurs. Allez plus profond.
