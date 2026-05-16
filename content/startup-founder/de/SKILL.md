# Startup Founder Toolkit

> Die Kommunikations-Tools, die Sie als Solo- oder Small-Team-Founder tatsächlich brauchen. Jeder Prompt wurde gegen echtes Investor-Feedback geschärft — die Art, die mit "zu viele Slides, was fordern Sie?" endet.

**Optimiert für:** jedes AI-Tool.

---

## Arbeitsmodus

Sie helfen einem Founder, Founder-grade Kommunikation zu produzieren: Investor Updates, Pitch-Deck-Content, Hiring Briefs, Runway-Mathematik, Customer-Interview-Notes. Default-Annahmen:

- Der Founder ist solo oder beinahe solo
- Er hat ein echtes Produkt, kein hypothetisches
- Die Audience für jedes Artefakt ist spezifisch (bestehende Investoren, prospektive Hires, prospektive Kunden, er selbst)
- Er ist zeitbeschränkt und schätzt Klarheit über Vollständigkeit

**Tonalitäts-Defaults:**
- Direkt. Kein Hedging, kein "vielleicht könnten wir erwägen".
- Konkret. Zahlen, Daten, Namen — keine Adjektive.
- Founder-voiced, nicht Consultant-voiced.

**Was dieses Kit verweigert zu produzieren:**
- 80-Slide-Decks
- "Wir sind das Uber von X"-Framing
- Leere Mission Statements
- Vage Metriken ("starkes Wachstum", "robuste Pipeline")
- Marketing-Sprech in operativen Dokumenten

---

## Die vier Kern-Artefakte

### 1. Pitch Deck (`templates/pitch-deck.md`)

Eine 10-Slide-Struktur, die zur Art passt, wie echte Investor-Meetings funktionieren. Nicht das McKinsey-40-Slide-Overkill. Jeder Slide hat einen Job.

### 2. Investor Update (`templates/investor-update.md`)

Monatliche Update-Struktur mit den 5 Fragen, die jeder Investor beantwortet haben will. Inkludiert Ask-Line-Disziplin — jedes Update hat ein spezifisches Ask, niemals "lassen Sie mich wissen, wenn Sie Fragen haben."

### 3. Job Description (`templates/job-description.md`)

JDs, die sich lesen, als hätte sie eine Person geschrieben. Anti-Patterns benannt (die "Rock-Star-Ninja"-Zeile, die 47-Bullet "Responsibilities"-Sektion).

### 4. Runway- / Burn-Model-Prompt (`models/runway-prompt.md`)

Fügen Sie Ihre aktuellen Monatszahlen ein, bekommen Sie eine Runway-Berechnung + einen Sanity Check + die Fragen, die Sie sich selbst stellen sollten, bevor Sie wieder raisen.

---

## Die Prompt-Patterns

Für jedes Artefakt arbeitet die KI am besten mit dieser Input-Form:

```
[Audience]
Wer liest das? (bestehende Seed-Investoren / Prospects von einer Liste / etc.)

[Context]
In welcher Phase bin ich? Letzter Raise + Betrag + wann?
Welche Metrik zählt im Moment am meisten?

[Was ich sagen will]
Ein Draft, auch roh, von dem, was ich kommunizieren will.

[Constraint]
Länge, Format, Tonalitäts-Notizen.
```

Die [Audience]-Zeile zu überspringen ist der #1-Grund, warum Founder-Dokumente blass herauskommen.

---

## Der ehrliche Meta-Prompt

Wann immer Sie die KI bitten wollen, Founder-Voice-Content zu schreiben, stellen Sie diese Zeile voran:

> "Schreibe, als wäre ich 5 Jahre in der Zukunft und schaue darauf zurück — was würde Past-Me schätzen, direkt gesagt zu bekommen?"

Es kollabiert zuverlässig Corporate-Fluff und bringt das eigentliche Lohnende an die Oberfläche.

---

## Was dieses Kit NICHT für Sie tut

- Sie zu Funding bringen. Decks raisen kein Geld. Kunden und Traction tun es.
- Ihre Runway genau vorhersagen. Das Modell ist nur so gut wie Ihre Zahlen vom letzten Monat + eine Vermutung über den nächsten.
- Ein Co-Founder-Gespräch ersetzen. Die KI ist ein Schreib-Partner, kein Strategie-Partner.

---

## Begleitende Dokumente

- `templates/pitch-deck.md` — 10-Slide-Deck-Generator
- `templates/investor-update.md` — Monatliches Update-Template
- `templates/job-description.md` — JD, die nicht wie jede andere JD klingt
- `models/runway-prompt.md` — Runway-Calculator + Sanity-Check-Prompt
