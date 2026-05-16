# Meta- + Schema-Toolkit

Zwei langweilige Felder und ein JSON-Block, die mehr Traffic bewegen als die meisten Artikel-Rewrites. Diese Datei gibt dir die Prompts zur Generierung und die Beispiele zum Kopieren.

---

## Teil 1 — Meta-Titles

### Wie gut aussieht

- 50–60 Zeichen (Google kürzt bei ca. 600 px auf Desktop; ~60 Zeichen ist die sichere Grenze)
- Primär-Keyword in der ersten Hälfte
- Ein Klickgrund, der nicht nur das Keyword-Match ist
- Kein Clickbait, kein All-Caps, kein überflüssiges `[2026]`

### Der Prompt

```
Du bist der SEO Content Strategist.

Generiere 5 Meta-Title-Varianten für diesen Artikel.

**Primär-Keyword:** [Keyword]
**Artikel-Winkel:** [ein Satz, was der Artikel tatsächlich argumentiert oder liefert]
**Intent:** [informational / commercial / etc.]
**Brand-Suffix (optional):** [z. B. „ | YourBrand" — nur wenn es ins Zeichenlimit passt]

Für jede Variante:
- Der Title
- Zeichenzahl (mit Brand-Suffix falls genutzt)
- Der Hook: was macht einen Klick gegenüber den Top 3?

Vermeide: Clickbait, All-Caps, generisches „[JAHR]"-Tagging, außer das Thema ist wirklich zeitkritisch.
```

### Beispielausgabe — „best CRM for solopreneurs"

1. **Best CRM for Solopreneurs: 7 Tested in 90 Days** (52 Zeichen) — Hook: Spezifität + Dauer als Beleg
2. **Best CRM for Solopreneurs (One I Cancelled Fast)** (50 Zeichen) — Hook: konträrer Beleg
3. **Best CRM for Solopreneurs: The Honest Comparison** (50 Zeichen) — Hook: „honest" impliziert, andere sind es nicht
4. **Best CRM for Solopreneurs: $X/mo Tools Compared** (47 Zeichen) — Hook: führt mit dem Preis
5. **Best CRM for Solopreneurs: Notion Won Against 6 Apps** (53 Zeichen) — Hook: verrät die Antwort, treibt den Klick aus „Moment, was"

Welcher am stärksten ist, hängt davon ab, auf welchen Differenzierer der Artikel tatsächlich setzt. #1 ist der sichere Default. #5 funktioniert nur, wenn Notion wirklich gewonnen hat.

---

## Teil 2 — Meta-Descriptions

### Wie gut aussieht

- 140–160 Zeichen
- Zwei-Satz-Versprechen: was du lieferst + warum lesenswert
- Wiederhol nicht die H1
- Ende nicht mit „Jetzt lesen!" (Google streicht das)
- Primär-Keyword einmal, natürlich

### Der Prompt

```
Du bist der SEO Content Strategist.

Generiere 3 Meta-Description-Varianten für diesen Artikel.

**Meta-Title:** [Titel, den du gewählt hast]
**Primär-Keyword:** [Keyword]
**Artikel-Winkel:** [ein Satz dazu, was der Artikel tatsächlich argumentiert oder liefert]
**Top 3 Dinge, die ein Leser aus dem Artikel bekommt:** [Bullet-Liste]

Für jede Variante:
- Die Description
- Zeichenzahl
- Mit welchem „Versprechen" sie führt
```

### Beispielausgabe

Für den CRM-Artikel:

1. **„Paid for and used 7 CRMs for 90 days each as a one-person business. Here's the one I kept, the one I cancelled fastest, and what every comparison site got wrong."** (160 Zeichen) — führt mit dem Duration-Beleg

2. **„Most 'best CRM' lists are written from press releases. I actually tested 7 — daily-use friction, real costs, real cancellation flows. The verdict surprised me."** (158 Zeichen) — führt mit dem Kontrast/Kontrarier-Winkel

3. **„The best CRM for solopreneurs isn't the one with the longest feature list. After 90 days testing 7, here's the one worth paying for and the one to skip."** (152 Zeichen) — führt mit der These

Wenn unsicher, ship #1. Das Verb „paid for" macht viel Arbeit — es signalisiert Erstkosten und Aufwand aus erster Hand.

---

## Teil 3 — Schema-Generatoren

### Welches Schema wann nutzen

| Artikel-Typ | Schema |
|---|---|
| Blogpost, Newsartikel | Article |
| Artikel mit einer FAQ-Sektion, die FAQ tatsächlich beantwortet | Article + FAQPage |
| Schritt-für-Schritt instructional („Wie man X macht") | HowTo |
| Einzelprodukt-Review-Seite | Product (nur mit ECHTEN Reviews) |
| Vergleich oder Listicle | Article (NICHT Product, außer du reviewst ein spezifisches Produkt) |

### Article-Schema-Prompt

```
Du bist der SEO Content Strategist.

Generiere Article-JSON-LD für diese Seite.

**Headline:** [die H1]
**URL:** [volle canonical URL]
**Autorname:** [Byline]
**Autor-URL:** [optional — Autorenseite oder LinkedIn]
**Publisher-Name:** [Site-Name]
**Publisher-Logo-URL:** [Logo-Bild-URL]
**Datum veröffentlicht:** [YYYY-MM-DD]
**Datum modifiziert:** [YYYY-MM-DD]
**Featured-Image-URL:** [Hero-Bild]
**Description:** [Meta-Description]

Output: validierungsbereites JSON-LD mit allen erforderlichen + empfohlenen Properties. Nutze den schema.org-Context.
```

**Beispielausgabe:**

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

Pack das in einen `<script type="application/ld+json">`-Block im `<head>` der Seite.

### FAQ-Schema-Prompt

Nur nutzen, wenn die Seite tatsächlich eine sichtbare FAQ-Sektion hat, die diese Fragen beantwortet. Liefere kein FAQ-Schema für Fragen, die nicht auf der Seite sind — das ist ein Verstoß und bringt eine Manual Action.

```
Du bist der SEO Content Strategist.

Generiere FAQPage-JSON-LD für diese Seite.

**Seiten-URL:** [URL]
**FAQ-F&A-Paare:**
1. F: [Frage]
   A: [die Antwort, wie sie auf der Seite steht — voller Text]
2. F: [Frage]
   A: [Antwort]
[Usw.]

Wichtig: Jede F&A hier MUSS auf der Seite sichtbar sein. Wenn sie nicht da ist, nicht inkludieren. Bei Unsicherheit vor Generierung rückfragen.

Output: validierungsbereites JSON-LD.
```

**Beispielausgabe:**

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

### How-To-Schema-Prompt

Nur für wirklich Schritt-für-Schritt instructional Content nutzen. „Wie man einen Podcast startet" mit diskreten Schritten qualifiziert. „Wie man über seine Marke denkt" nicht — das ist ein Essay, kein How-To.

```
Du bist der SEO Content Strategist.

Generiere HowTo-JSON-LD für diese Seite.

**Headline:** [die H1, muss mit „Wie man…" oder „How to…" beginnen]
**Description:** [Ein-Satz-Zusammenfassung]
**Gesamtzeit:** [geschätzt, in ISO-8601-Duration-Format — z. B. PT2H für 2 Stunden]
**Supply (optional):** [Dinge, die der Nutzer haben muss]
**Tool (optional):** [benötigte Tools]
**Schritte:** [nummerierte Liste — jeder Schritt hat Name, Text und optional eine Bild-URL]

Output: validierungsbereites JSON-LD.
```

**Beispielausgabe** (für „How to launch a podcast in a weekend"):

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

### Product-Schema-Prompt (mit der Warnung)

```
Du bist der SEO Content Strategist.

Generiere Product-JSON-LD für diese Seite.

**Produktname:** [Name]
**Description:** [ein Absatz]
**Bild-URL:** [Haupt-Produktbild]
**Marke:** [Markenname]
**SKU (optional):** [falls anwendbar]
**Preis + Währung:** [z. B. „29.00 USD"]
**Verfügbarkeit:** [InStock / OutOfStock / PreOrder]

**Reviews (nur wenn echt):**
- Aggregate Rating Value: [Zahl von 5]
- Aggregate Review Count: [Zahl]
- Beispielhafte einzelne Reviews (optional, 1–3): jeweils Autor + Rating + Text

KRITISCH: Inkludiere kein aggregateRating, außer die Seite hat echte, sichtbare, verifizierbare Reviews. Falsches oder fabriziertes aggregateRating bringt Manual Actions und ist Betrug. Bei Unsicherheit vor Generierung rückfragen.

Output: validierungsbereites JSON-LD.
```

---

## Häufige Schema-Fehler, die das Kit markieren wird

- **FAQ-Schema mit Fragen, die nicht auf der Seite sind.** Verstoß. Lass es.
- **HowTo-Schema auf Content, der nicht wirklich how-to ist.** „Wie man über Pricing denkt" ist ein Essay; „Wie man von HubSpot zu Pipedrive migriert" qualifiziert eher.
- **Product-Schema-aggregateRating ohne echte Reviews.** Einer der schnellsten Wege zu einer Google Manual Action.
- **Article-Schema mit `dateModified` älter als `datePublished`.** Validatoren markieren das; du verlierst auch den Freshness-Boost.
- **Falsches `@type` für den Content.** Ein Vergleichsartikel ist ein Article, kein Product.
- **Fehlendes `mainEntityOfPage` im Article-Schema.** Erforderlich für reichere Suchergebnisse.

---

## Wie validieren

Vor dem Versand das Schema durchlaufen lassen durch:

- Googles Rich Results Test (`search.google.com/test/rich-results`) — bestätigt Eligibility für Rich Results
- Schema.org Validator (`validator.schema.org`) — bestätigt, dass das JSON-LD wohlgeformt ist

Wenn eins davon failt, vor Publish fixen. Versende kein kaputtes Schema; es kostet dich mehr als kein Schema.
