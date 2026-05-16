# Keyword-geclusterter Artikel-Outliner

Die Outline ist, wo Rankings gewonnen oder verloren werden. Wenn die Struktur falsch ist, repariert das keine noch so clevere Formulierung. Dieses Template ist der Prompt, der „ich will für X ranken" in eine kampfbereite Outline verwandelt.

---

## Was dieses Template tut

Du gibst: ein Primär-Keyword, deinen Site-Kontext und die aktuellen Top 3–5 Ergebnisse aus der Live-SERP. Es liefert:

1. Intent-Klassifikation (informational / commercial / navigational / transactional)
2. Eine Lesung der SERP — was gewinnt und warum
3. Eine volle Outline mit H1, H2, vorgeschlagenen H3 und Key Points pro Abschnitt
4. Sekundäre Keyword-Cluster gruppiert nach H2
5. Vorschläge für interne Link-Anker (benannt, nicht generisch)
6. PAA-Chancen (People Also Ask) als FAQ-H3 herausgearbeitet
7. Meta-Title (50–60 Zeichen) und Meta-Description (140–160 Zeichen)
8. Schema-Empfehlung
9. E-E-A-T-Injection-Point — wo deine echte Erfahrung sichtbar werden muss

---

## Der Prompt

Füge das in deine KI deiner Wahl ein. Fülle die Klammerfelder aus.

```
Du bist der SEO Content Strategist.

Ich will eine Outline für einen Artikel, der auf folgendes Keyword targetiert:

**Primär-Keyword:** [Keyword]
**Geschätztes monatliches Volumen:** [N — oder „unbekannt"]
**Suchintent (meine Vermutung):** [informational / commercial / transactional / „du sagst es mir"]

**Mein Site-Kontext:**
- URL: [domain.com]
- Was wir publizieren: [Nische + Format]
- Leser-Profil: [wer sie sind, was sie wollen]
- Domain-Authority-Range: [N — oder „kleine Site / mid / large"]
- Bestehende relevante Seiten auf meiner Site (optional): [URLs und Titel listen]

**SERP-Top-Ergebnisse (aktuelle Top 5 einfügen, wenn möglich):**
1. [URL] — [Titel] — [deine Lesung: Wortzahl? Format? Winkel?]
2. [URL] — [Titel] — [Lesung]
3. [URL] — [Titel] — [Lesung]
4. [URL] — [Titel] — [Lesung]
5. [URL] — [Titel] — [Lesung]

**SERP-Features, die ich sehe:**
- Featured Snippet: [ja/nein — wenn ja, wer besitzt es]
- People Also Ask: [ja/nein — wenn ja, die 4 Fragen einfügen]
- Video Carousel: [ja/nein]
- Image Pack: [ja/nein]
- AI Overview: [ja/nein]

**Mein Differenzierungswinkel (wenn ich einen habe):**
[1–2 Sätze dazu, warum ich eine bessere Version schreiben kann — Erfahrung aus erster Hand, einzigartige Daten, gegen den Strich, etc.]

Gib mir:
1. Intent-Klassifikation (mit Ein-Satz-Begründung)
2. SERP-Read (was funktioniert, wo ist die Lücke)
3. Volle Outline (H1 + H2 mit Intent pro Abschnitt, Key Points, sekundären Keywords)
4. Interne Linkvorschläge (3–5 benannte Anker)
5. PAA-H3 falls anwendbar
6. Meta-Title + Meta-Description
7. Schema-Empfehlung
8. E-E-A-T-Injection-Plan
```

---

## Beispiel — „best CRM for solopreneurs"

So sieht ein echter Durchlauf dieses Templates end-to-end aus.

### Input

```
Primär-Keyword: best CRM for solopreneurs
Geschätztes monatliches Volumen: ~1.900
Suchintent (meine Vermutung): commercial

Mein Site-Kontext:
- URL: solo-saas-reviews.com
- Was wir publizieren: Longform-SaaS-Reviews und Vergleiche für Ein-Personen-Unternehmen
- Leser-Profil: Freelancer, Berater, Indie-Operator, die Tools evaluieren
- DA-Range: 52
- Bestehende relevante Seiten:
  - /best-invoicing-software-for-freelancers (DA-Treiber, rankt #4)
  - /honeybook-vs-dubsado (anständiger Traffic)
  - /crm-pricing-teardown (älter, rankt #11)

SERP-Top-Ergebnisse:
1. Zapier-Blog — „The 18 best CRMs for solopreneurs in 2025" — 4.200 Wörter, Listicle, schwache POV
2. HubSpot-Blog — „Best CRM for solopreneurs (and why)" — 2.800 Wörter, soft-promotional
3. Substack-Writer-Review — „I tested 5 CRMs for 90 days as a freelancer" — 1.400 Wörter, starke persönliche POV
4. Capterra-Kategorieseite — generisch
5. G2-Kategorieseite — generisch

SERP-Features:
- Featured Snippet: ja, aktuell von HubSpot gehalten, kurzer Absatz-Definition
- People Also Ask: ja — (1) What is the best free CRM for solopreneurs? (2) Do solopreneurs need a CRM? (3) Is HubSpot good for solopreneurs? (4) What is the easiest CRM to use?
- Video Carousel: nein
- Image Pack: nein
- AI Overview: ja, zitiert den Substack und HubSpot

Differenzierungswinkel: Ich habe tatsächlich 7 CRMs für jeweils 90 Tage bezahlt und genutzt. Ich habe echte Screenshots, echte Daten zu Time-to-First-Deal-Logged, echte Cancellation-Receipts.
```

### Erwarteter Output von der KI

> **Primär-Keyword:** best CRM for solopreneurs (Vol. ~1.900/Monat)
> **Intent:** Commercial. Die Anfrage impliziert, dass die Person im Evaluations-Modus ist — sie will eine Empfehlung, keine Definition. „Best" + „for [audience]" ist klassische commercial intent.
>
> **SERP-Read:**
> - Top-3-Formate: zwei Listicles + ein Personal-Review
> - Wortzahl-Range: 1.400 (Substack) bis 4.200 (Zapier). HubSpot mittig bei 2.800.
> - Das Substack-Stück auf #3 rankt nach oben trotz kürzester Länge, weil es die einzige authentische POV hat. Zapier und HubSpot fühlen sich beide an, als wären sie aus einem Brief geschrieben, nicht aus Nutzung.
> - Das Featured Snippet ist kurz und definitorisch — gewinnbar mit einer 40–50-Wort-Antwort auf „what is a CRM for solopreneurs" oder „do solopreneurs need a CRM" oben auf der Seite.
> - Das AI Overview zitiert bereits das Substack-Stück. Das sagt uns, dass Google echten Test-Content für diese Anfrage belohnt.
> - **Die Lücke:** Keiner der Top 3 hat seriöse Daten — Time-to-Value, echte Cancellation-Friction, echter Pricing-Tier-Vergleich mit den Limits der Free-Pläne. Das ist deine Öffnung.
>
> **Autor/Byline-Überlegungen:** Dieser Artikel funktioniert nur, wenn er von jemandem byline-t ist, der die 7 CRMs tatsächlich genutzt hat. Wenn das du bist, leg damit vor: „Ich bin [dein Kontext]. Über 90 Tage habe ich [Liste] bezahlt und getestet. Hier ist, was ich behielt und was ich kündigte." Wenn du nicht der Tester bist, heuere oder partnere mit einem — fake es nicht; Google riecht das immer besser.
>
> **Outline:**
>
> **H1:** Best CRM for Solopreneurs: 7 Tested for 90 Days (~58 Zeichen)
>
> **H2: Do solopreneurs actually need a CRM?**
> Intent: beantwortet die meistgestellte PAA, fängt das Featured Snippet, setzt den Rest auf.
> Key Points: 40-Wort-Antwort im ersten Absatz. Dann die ehrliche Version — die meisten Solopreneurs unter 20 Kunden brauchen noch keine, aber hier kippt es.
> Interner Link: verlinke `/crm-pricing-teardown` aus dem Anchor-Text „CRM pricing tiers"
> PAA: ja — dieser Abschnitt deckt auch PAA #2 ab
>
> **H2: How I tested these 7 CRMs**
> Intent: etabliert E-E-A-T. Das ist der Abschnitt, der Google den Rest vertrauen lässt.
> Key Points: Timeline (jeweils 90 Tage), was getestet wurde (Setup-Zeit, Time-to-First-Deal-Logged, Daily-Use-Friction, Cancellation-Friction), was nicht (Enterprise-Features, ungated Team-Pläne).
> Interner Link: noch keiner — könnte später einen verdienen mit einer Screenshot-Galerie als Subseite.
>
> **H2: The 7 CRMs, ranked**
> Intent: das Hauptfleisch. Jeder Subhead ist ein CRM mit klarem Verdikt.
> Key Points: jeder Eintrag hat einen 200-Wort-Block mit: gewähltem Tier, monatlichen Kosten, 1-Zeilen-Verdikt, was funktionierte, was brach, würde ich es behalten.
> Interner Link: verlinke `/honeybook-vs-dubsado` aus „HoneyBook vs. Dubsado deep dive" wo passend.
> Sekundäre Keywords natürlich einweben: „free CRM for freelancers", „CRM for one-person business", „simple CRM", „lightweight CRM".
>
> **H2: Free CRMs: which one I'd actually pick** (deckt PAA #1 ab)
> Intent: den „free"-Modifier-Traffic fangen, ohne den ganzen Artikel zu Free zu machen.
> Key Points: HubSpot Free ist der offensichtliche Default; das ehrliche Gotcha bei 1.000 Kontakten; was nutzen unter 25 Kunden (ein Notion-Template schlägt oft jedes Free-CRM).
> Interner Link: keiner — aber wenn du eine Notion-CRM-Template-Seite hast, verlinke sie.
>
> **H2: Is HubSpot good for solopreneurs?** (deckt PAA #3 ab)
> Intent: die marken-spezifische PAA beantworten, ohne den Artikel zu HubSpot-vs-everyone zu machen.
> Key Points: 100–150 Wörter. Ehrliche Antwort (ja, mit Caveats). Wo es Solopreneurs überdimensioniert.
>
> **H2: What I'd actually pick — and the boring reason why**
> Intent: Differenzierungs-Abschnitt. Starke Meinung, kein Zaunsitzen.
> Key Points: einen Gewinner nennen. Den Runner-up nennen. Den zu Vermeidenden nennen. Belege.
>
> **H2: How to switch CRMs without losing data**
> Intent: die Long-Tail-„how to migrate"-Intent fangen + dem Artikel praktischen Wert geben.
> Key Points: Export-Formate, was nicht übertragbar ist, der 1-wöchige Parallel-Run-Ansatz.
> Interner Link: wenn du eine `/data-migration-guide` hast, verlinken.
>
> **Häufig gestellte Fragen**
> H3: What is the easiest CRM to use for solopreneurs? *(deckt PAA #4 ab)*
> H3: How much should a solopreneur pay for a CRM?
> H3: Can I use Notion as a CRM?
> H3: When should a solopreneur upgrade from a spreadsheet to a CRM?
>
> **Meta-Title:** Best CRM for Solopreneurs: 7 Tested in 90 Days (52 Zeichen)
>
> **Meta-Description:** Paid for and used 7 CRMs for 90 days each as a one-person business. Here's the one I kept, the one I cancelled fastest, and what the comparison sites get wrong. (160 Zeichen)
>
> **Schema-Empfehlung:** Article + FAQPage. Skip Product-Schema, außer du fügst individuelle Produktreview-Seiten hinzu — der Artikel ist vergleichend, kein Einzelprodukt-Review.
>
> **E-E-A-T-Injection-Plan:**
> - First-Person-Opening: „Ich bin [Name], ich betreibe [Business-Typ], und ich zahle Tools aus eigener Tasche. Hier ist, was 90 Tage Testen mich lehrten."
> - Echte Screenshots im H2 für jedes CRM (Signup-Screen, Dashboard, Cancellation-Flow)
> - Echte Zahlen: Time-to-First-Deal-Logged, monatliche Kosten, Cancellation-Friction-Score (deine eigene Skala)
> - Autorenbio unten mit Rolle + Tenure + Link zu deinen anderen Reviews
> - Wenn du Geld von einem der CRMs genommen hast (Affiliate, Sponsoring), oben offenlegen, nicht unten

---

## Häufige Outline-Fehler, die das Kit markieren wird

- **Kein Abschnitt, der das Featured Snippet ankert.** Wenn die SERP ein Featured Snippet hat, willst du, dass dein H2 es in den ersten 40–60 Wörtern beantwortet.
- **PAA-Fragen ignoriert.** Wenn People Also Ask auf der SERP ist, lässt du einen FAQ-Section-Win auf dem Tisch.
- **Ein gigantischer Abschnitt.** Wenn ein H2 600+ Wörter darunter hat, splitten. Suchergebnisse scannen nach H2 und H3.
- **Keine internen Links benannt.** „Verlinke verwandte Inhalte" hilft niemandem. Benenne Anker und Ziel.
- **Meta-Description, die nur die H1 umformuliert.** Google schreibt die um. Schreib ein echtes Zwei-Satz-Versprechen.
- **Keine E-E-A-T-Injection.** Die Outline führt nirgendwohin, wenn kein Plan für First-Person-Erfahrung existiert.

---

## Wie du die Outline nutzt, sobald du sie hast

1. Lies sie einmal. Stimmst du mit etwas nicht überein? Bitte die KI, die Wahl zu verteidigen oder zu revidieren.
2. Fülle die Platzhalter, die DEINE Daten brauchen (echte Zahlen, echte Screenshots, echte Anekdoten).
3. Genehmige die Outline, bevor du den vollen Draft anforderst. Lass die KI nicht 2.500 Wörter schreiben und dann merken, dass die Struktur falsch ist.
4. Generiere den Draft Abschnitt für Abschnitt. Das Optimization-Pack handhabt das — jeder Abschnitt öffnet mit einer Featured-Snippet-bereiten Antwort, dann vertieft sich.
5. Lass den Draft durch den Meta- + Schema-Generator (`templates/meta-and-schema.md`) laufen, bevor du shippst.
