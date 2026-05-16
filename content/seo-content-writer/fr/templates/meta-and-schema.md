# Toolkit Meta + Schéma

Deux champs ennuyeux et un bloc JSON qui font bouger plus de trafic que la plupart des réécritures d'articles. Ce fichier vous donne les prompts pour les générer et les exemples travaillés à copier.

---

## Partie 1 — Meta titles

### À quoi ressemble du bon

- 50-60 caractères (Google tronque autour de 600px sur desktop ; ~60 car. est la limite sûre)
- Mot-clé principal dans la première moitié
- Une raison de cliquer qui n'est pas juste le match de mot-clé
- Pas de clickbait, pas de tout en majuscules, pas de `[2026]` inutile

### Le prompt

```
Tu es le SEO Content Strategist.

Génère 5 variantes de meta title pour cet article.

**Mot-clé principal :** [mot-clé]
**Angle de l'article :** [une phrase sur ce que cet article argumente ou livre réellement]
**Intention :** [informationnelle / commerciale / etc.]
**Suffixe de marque (optionnel) :** [ex. " | YourBrand" — uniquement si ça rentre dans la limite de car.]

Pour chaque variante, donne-moi :
- Le titre
- Nombre de caractères (avec suffixe de marque si utilisé)
- Le hook : ce qui pousse quelqu'un à cliquer dessus plutôt que sur le top 3

Évite : clickbait, tout en majuscules, tag générique « [ANNÉE] » sauf si le sujet est vraiment sensible au temps.
```

### Sortie d'exemple travaillé — « best CRM for solopreneurs »

1. **Best CRM for Solopreneurs: 7 Tested in 90 Days** (52 car.) — hook : spécificité + durée comme preuve
2. **Best CRM for Solopreneurs (One I Cancelled Fast)** (50 car.) — hook : preuve à contre-courant
3. **Best CRM for Solopreneurs: The Honest Comparison** (50 car.) — hook : « honest » implique que les autres ne le sont pas
4. **Best CRM for Solopreneurs: $X/mo Tools Compared** (47 car.) — hook : démarre avec le prix
5. **Best CRM for Solopreneurs: Notion Won Against 6 Apps** (53 car.) — hook : donne la réponse, pousse au clic pour « attends, quoi »

Le plus fort dépend du différenciateur sur lequel l'article s'appuie vraiment. Le #1 est le défaut le plus sûr. Le #5 ne marche que si Notion a vraiment gagné.

---

## Partie 2 — Meta descriptions

### À quoi ressemble du bon

- 140-160 caractères
- Promesse en deux phrases : ce que vous livrez + pourquoi ça vaut la peine d'être lu
- Ne reformulez pas le H1
- Ne finissez pas par « En savoir plus ! » (Google le supprime)
- Incluez le mot-clé principal une fois, naturellement

### Le prompt

```
Tu es le SEO Content Strategist.

Génère 3 variantes de meta description pour cet article.

**Meta title :** [titre choisi]
**Mot-clé principal :** [mot-clé]
**Angle de l'article :** [une phrase sur ce que cet article argumente ou livre réellement]
**Top 3 des choses qu'un lecteur tirera de l'article :** [liste à puces]

Pour chaque variante :
- La description
- Nombre de caractères
- Avec quelle « promesse » elle ouvre
```

### Sortie d'exemple travaillé

Pour l'article CRM :

1. **« Paid for and used 7 CRMs for 90 days each as a one-person business. Here's the one I kept, the one I cancelled fastest, and what every comparison site got wrong. »** (160 car.) — ouvre avec la preuve de durée

2. **« Most 'best CRM' lists are written from press releases. I actually tested 7 — daily-use friction, real costs, real cancellation flows. The verdict surprised me. »** (158 car.) — ouvre avec l'angle de contraste/contre-courant

3. **« The best CRM for solopreneurs isn't the one with the longest feature list. After 90 days testing 7, here's the one worth paying for and the one to skip. »** (152 car.) — ouvre avec la thèse

Si vous ne savez pas lequel choisir, publiez le #1. Le verbe « paid for » fait beaucoup de travail — il signale un coût et un effort directs.

---

## Partie 3 — Générateurs de schéma

### Quel schéma utiliser quand

| Type d'article | Schéma |
|---|---|
| Blog post, article de news | Article |
| Article avec une section FAQ qui répond vraiment aux FAQs | Article + FAQPage |
| Instructionnel étape par étape (« How to X ») | HowTo |
| Page de review de produit unique | Product (uniquement avec de VRAIS avis) |
| Comparaison ou listicle | Article (PAS Product sauf si vous reviewez un produit spécifique) |

### Prompt schéma Article

```
Tu es le SEO Content Strategist.

Génère du JSON-LD Article pour cette page.

**Headline :** [le H1]
**URL :** [URL canonique complète]
**Nom de l'auteur :** [byline]
**URL de l'auteur :** [optionnel — page auteur ou LinkedIn]
**Nom du publisher :** [nom du site]
**URL du logo publisher :** [URL de l'image logo]
**Date de publication :** [AAAA-MM-JJ]
**Date de modification :** [AAAA-MM-JJ]
**URL image principale :** [hero image]
**Description :** [meta description]

Sors du JSON-LD prêt à la validation avec toutes les propriétés requises + recommandées. Utilise le contexte schema.org.
```

**Sortie d'exemple travaillé :**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Best CRM for Solopreneurs: 7 Tested in 90 Days",
  "image": "https://solo-saas-reviews.com/images/crm-test-hero.jpg",
  "author": {
    "@type": "Person",
    "name": "Chris Holwell",
    "url": "https://solo-saas-reviews.com/author/chris-holwell"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Solo SaaS Reviews",
    "logo": {
      "@type": "ImageObject",
      "url": "https://solo-saas-reviews.com/logo.png"
    }
  },
  "datePublished": "2026-05-14",
  "dateModified": "2026-05-14",
  "description": "Paid for and used 7 CRMs for 90 days each as a one-person business. Here's the one I kept, the one I cancelled fastest, and what every comparison site got wrong.",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://solo-saas-reviews.com/best-crm-solopreneurs"
  }
}
```

Déposez ça dans un bloc `<script type="application/ld+json">` dans le `<head>` de la page.

### Prompt schéma FAQ

Utilisez-le uniquement si la page a vraiment une section FAQ visible qui répond à ces questions. Ne publiez pas de schéma FAQ pour des questions qui ne sont pas sur la page — c'est une violation et ça vaut une action manuelle.

```
Tu es le SEO Content Strategist.

Génère du JSON-LD FAQPage pour cette page.

**URL de la page :** [URL]
**Paires Q/R de FAQ :**
1. Q : [question]
   R : [la réponse telle qu'écrite sur la page — texte complet]
2. Q : [question]
   R : [réponse]
[Etc.]

Important : chaque Q/R ici DOIT être visible sur la page. Si ce n'est pas sur la page, ne l'inclus pas. Confirme avant de générer s'il y a la moindre ambiguïté.

Sors du JSON-LD prêt à la validation.
```

**Sortie d'exemple travaillé :**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do solopreneurs need a CRM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most solopreneurs under 20 active clients don't need a dedicated CRM. A spreadsheet or a Notion template handles the same volume with less friction. The threshold to upgrade tends to be when you're losing track of follow-ups or when client conversations span multiple channels."
      }
    },
    {
      "@type": "Question",
      "name": "What is the easiest CRM for solopreneurs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Based on 90 days of testing, the easiest to learn was HubSpot Free, and the easiest to keep using daily was a tie between FollowUpBoss and a Notion CRM template. 'Easiest' depends on whether you value setup speed or long-term low friction."
      }
    },
    {
      "@type": "Question",
      "name": "Is HubSpot good for solopreneurs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes for solopreneurs growing toward 100+ contacts. HubSpot Free is overpowered for the use case but the upgrade path is steep — the paid tiers are priced for teams, not individuals. If you're staying solo, you'll outgrow free and underuse paid."
      }
    }
  ]
}
```

### Prompt schéma How-To

Utilisez-le uniquement pour du contenu instructionnel vraiment étape par étape. « How to start a podcast » avec des étapes discrètes qualifie. « How to think about your brand » non — c'est un essai, pas un how-to.

```
Tu es le SEO Content Strategist.

Génère du JSON-LD HowTo pour cette page.

**Headline :** [le H1, doit commencer par "How to..."]
**Description :** [résumé en une phrase]
**Temps total :** [estimé, en format de durée ISO 8601 — ex. PT2H pour 2 heures]
**Fournitures (optionnel) :** [choses dont l'utilisateur a besoin]
**Outils (optionnel) :** [outils nécessaires]
**Étapes :** [liste numérotée — chaque étape a un nom, un texte et optionnellement une URL d'image]

Sors du JSON-LD prêt à la validation.
```

**Sortie d'exemple travaillé** (pour « How to launch a podcast in a weekend ») :

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Launch a Podcast in a Weekend",
  "description": "A two-day launch plan covering recording, editing, hosting, and distribution.",
  "totalTime": "PT16H",
  "supply": [
    { "@type": "HowToSupply", "name": "USB microphone" },
    { "@type": "HowToSupply", "name": "Quiet recording space" }
  ],
  "tool": [
    { "@type": "HowToTool", "name": "Audacity or GarageBand" },
    { "@type": "HowToTool", "name": "Buzzsprout or Transistor account" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Pick the format and write the first episode",
      "text": "Decide between solo, interview, or co-host. Write a 10-minute first episode you'd want to listen to."
    },
    {
      "@type": "HowToStep",
      "name": "Record episode one",
      "text": "Use a quiet room, USB mic 6 inches from your mouth, single take. Don't edit while recording."
    },
    {
      "@type": "HowToStep",
      "name": "Edit and export",
      "text": "Remove dead air over 2 seconds. Normalize audio to -16 LUFS. Export as MP3, 128 kbps."
    },
    {
      "@type": "HowToStep",
      "name": "Set up hosting and submit to directories",
      "text": "Create a hosting account, upload episode one, generate your RSS feed, submit to Apple Podcasts and Spotify."
    }
  ]
}
```

### Prompt schéma Product (avec l'avertissement)

```
Tu es le SEO Content Strategist.

Génère du JSON-LD Product pour cette page.

**Nom du produit :** [nom]
**Description :** [un paragraphe]
**URL de l'image :** [image produit principale]
**Marque :** [nom de marque]
**SKU (optionnel) :** [si applicable]
**Prix + devise :** [ex. "29.00 USD"]
**Disponibilité :** [InStock / OutOfStock / PreOrder]

**Avis (uniquement si réels) :**
- Valeur de rating agrégé : [nombre sur 5]
- Nombre d'avis agrégés : [nombre]
- Échantillons d'avis individuels (optionnel, 1-3) : chacun avec auteur + rating + texte

CRITIQUE : N'inclus pas aggregateRating sauf si la page a de vrais avis, visibles et vérifiables. Un aggregateRating fabriqué vaut des actions manuelles et c'est de la fraude. Confirme avant de générer.

Sors du JSON-LD prêt à la validation.
```

---

## Erreurs de schéma courantes que le kit signalera

- **Schéma FAQ avec des questions qui ne sont pas sur la page.** Violation. Non.
- **Schéma HowTo sur du contenu qui n'est pas vraiment du how-to.** « How to think about pricing » est un essai ; « How to migrate from HubSpot to Pipedrive » peut qualifier.
- **Schéma Product aggregateRating sans vrais avis.** L'un des chemins les plus rapides vers une action manuelle Google.
- **Schéma Article avec `dateModified` plus ancien que `datePublished`.** Les validateurs le signalent ; vous ratez aussi le boost de fraîcheur.
- **Mauvais `@type` pour le contenu.** Un article de comparaison est un Article, pas un Product.
- **`mainEntityOfPage` manquant sur le schéma Article.** Requis pour des résultats de recherche plus riches.

---

## Comment valider

Avant de publier, faites passer le schéma par :

- Google's Rich Results Test (`search.google.com/test/rich-results`) — confirme l'éligibilité aux résultats enrichis
- Schema.org Validator (`validator.schema.org`) — confirme que le JSON-LD est bien formé

Si l'un échoue, corrigez avant publication. Ne publiez pas de schéma cassé ; ça vous coûte plus que pas de schéma du tout.
