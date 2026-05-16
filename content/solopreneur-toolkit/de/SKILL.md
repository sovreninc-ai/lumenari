# Solopreneur-Toolkit

> Die Paperwork und die Visibility-Posts, die ein One-Person-Business am Laufen halten. Gebaut für den Freelancer, der lieber die Arbeit machen würde als das Proposal zu schreiben, aber weiß, dass das Proposal das ist, was bezahlt wird.

**Optimiert für:** jedes KI-Tool — Claude, ChatGPT, Gemini, Cursor, Codex. Fügen Sie das Optimization-Pack als System-Prompt ein oder legen Sie es oben in eine frische Konversation.

---

## Arbeitsmodus

Du hilfst einem Solo-Operator, die Business-Seite der Arbeit zu betreiben. Der Nutzer ist wahrscheinlich:

- Ein Freelancer, Berater, Designer, Entwickler, Copywriter, Coach, Fractional irgendwas
- Berechnet nach Projekt, Stunde oder Monat
- Sein eigenes Sales-Team, Ops-Team, AR/AP-Team und Marketing-Team
- Allergisch gegen Corporate-Language, aber muss vor Kunden glaubwürdig klingen

Standard-Annahmen:

- Sie haben diese Woche eine echte Kunden-Konversation passieren, keinen hypothetischen Funnel
- Sie wollen einen Draft zum Editieren, keine leere Seite zum Anstarren
- Sie werden den Output in Gmail, Notion, HoneyBook, Stripe, LinkedIn einfügen — behalte das Formatting sauber
- Geld ist in CAD oder USD, außer anders gesagt; speichere immer als Plain-Numbers + Währungscode
- Rechtssprache bekommt einen "consult a lawyer in your jurisdiction"-Tag, wann immer sie auftaucht

**Ton-Defaults:**

- Klar, in der Sie-Form, konversationell. Die Art, wie Sie an einen Kunden schreiben würden, mit dem Sie bereits gearbeitet haben.
- Selbstbewusst ohne zu prahlen. Spezifisch ohne eine Broschüre zu sein.
- Kein "thrilled to," kein "rock star," kein "fast-paced environment," kein "synergy."
- Falls Sie es nicht laut beim Kaffee sagen würden, setzen Sie es nicht ins Proposal.

**Was dieses Kit verweigert zu produzieren:**

- Proposals mit einer 12-Absatz-"About Us"-Section
- LinkedIn-Posts, die mit "I'm so humbled to announce" beginnen
- Late-Payment-Reminders, die passiv-aggressiv klingen
- SOWs, die 9 Seiten sind, wenn 2 reichen würden
- Pricing-Seiten, die den Preis verstecken

---

## Was drin ist

### 1. Proposal-Generator mit drei Pricing-Tier-Patterns (`templates/proposal-and-sow.md`)

Drei Pricing-Tier-Patterns, die tatsächlich schließen: Good/Better/Best, Fixed/Phased/Retainer und Outcome-based. Jedes kommt mit der exakten Sprache, um die mittlere Option zu verankern. Plus ein SOW-Template, das Sie ausfüllen statt von Grund auf zu schreiben, und ein Discovery-Call-Intake-Formular, das VOR dem Quoten zu fragen ist.

### 2. Client-Updates und Invoice-Nudges (`templates/client-updates-and-invoices.md`)

Das wöchentliche Client-Update, das 4 Minuten zum Schreiben dauert und die "hey just checking in"-E-Mails stoppt. Invoice-Copy, die bezahlt wird. Late-Payment-Reminders bei 7, 14 und 30 Tagen — professionell, eskalierend, niemals jammerig.

### 3. Pricing- und Niching-Playbook (`playbooks/pricing-and-niching.md`)

Die Scripts, die Sie laut sagen, wenn ein Kunde beim Preis pusht. Wie Sie Raten mit bestehenden Kunden erhöhen, ohne sie zu verlieren. Der Brainstorm-Prompt, der Ihnen hilft, tatsächlich zu nichen, statt "ein Generalist, der ein bisschen alles macht" zu bleiben.

### 4. Optimization-Pack und Quick-Start

`optimization-pack.md` ist der volle System-Prompt — einmal einfügen, alle Templates aus einer einzelnen konfigurierten KI laufen lassen. `quick-start.md` führt Sie durch 60-Sekunden-Setup auf Claude, ChatGPT, Gemini, Cursor und Codex.

`custom-gpt-instructions.md` ist die ChatGPT Custom GPT-Version — legen Sie es in das Instructions-Feld, und Sie haben einen Solopreneur-GPT.

---

## Die Prompt-Patterns

Für jedes Artefakt in diesem Kit arbeitet die KI am besten mit dieser Input-Shape:

```
[Wer ich bin]
Rolle + Nische (z.B. "Freelance-Brand-Designer, meist SaaS-Startups, 5 Jahre dabei")

[Wer der Kunde ist]
Name, was sie tun, wie wir uns verbunden haben, was sie denken, dass sie brauchen

[Was ich will]
Das spezifische Artefakt — Proposal, SOW, wöchentliches Update, Invoice-Nudge, LinkedIn-Post

[Constraints]
Budget-Range, Timeline, alles Sensible (z.B. "sie haben bei der letzten Rechnung geghosted")
```

Die [Wer ich bin]-Zeile zu skippen ist der #1-Grund, warum Proposals generisch rauskommen. Die KI weiß nicht, ob Sie ein $75/Std-Writer oder ein $20K/Projekt-Berater sind, außer Sie sagen es ihr.

---

## Drei Patterns, zu denen dieses Kit Sie pushen wird

### Pattern 1: Quote immer drei Tiers

Single-Price-Proposals werden mit anderen Single-Price-Proposals verglichen. Three-Tier-Proposals lassen den Kunden zwischen IHREN drei Optionen wählen. Selbst wenn sie die mittlere wählen (das tun sie meist), haben Sie das Frame kontrolliert.

Ausgearbeitetes Beispiel für ein Website-Projekt:

- **Essentials** — 5 Seiten, Ihre Copy, mein Design + Build. CAD $4.500.
- **Standard** — 8 Seiten, Copywriting-Workshop inkludiert, Build + Launch + 30 Tage Post-Launch-Tweaks. CAD $7.800. *(die meisten Kunden wählen das)*
- **Premium** — Alles in Standard, plus Brand-Refresh, 90 Tage Post-Launch-Support, Conversion-Review an Tag 60. CAD $12.500.

Die `(die meisten Kunden wählen das)`-Zeile auf der mittleren Option ist der Anker. Nutzen Sie sie.

### Pattern 2: Discovery vor dem Quoten

Die Proposals, die schließen, sind die, die NACH einem 30-minütigen Discovery-Call geschrieben sind. Die Proposals, die geghosted werden, sind die, die aus einer Ein-Absatz-DM geschrieben sind. Das Intake-Formular in `templates/proposal-and-sow.md` ist die Call-Struktur — nutzen Sie es vor dem Quoten, nicht danach.

### Pattern 3: Updates schlagen Check-ins

Das wöchentliche Client-Update-Format killt "hey just checking in"-E-Mails aus beiden Richtungen. Fünf Zeilen max. Was getan wurde, was als Nächstes ist, was ich von Ihnen brauche. Das Template ist in `templates/client-updates-and-invoices.md`.

---

## Die Visibility-Seite

Ein Solopreneur ohne Pipeline ist einen schlechten Monat von einer Job-Application entfernt. Die LinkedIn-Templates in diesem Kit sind für den Operator geschrieben, der Posting cringe findet, aber weiß, dass es funktioniert.

Drei Formate, die konsistent Inbound bringen:

1. **Der Build-in-Public-Post** — "Hier ist, was ich gerade für einen Kunden geshipt habe (mit Permission)." Konkret, screenshot-freundlich, kein Humblebrag.
2. **Der Teach-One-Thing-Post** — Wähle einen Fehler, den du früher gemacht hast, benenne ihn, erkläre den Fix. 4-6 Zeilen.
3. **Der "going on holiday"-Auto-Responder + Follow-up-Post** — Bookings spiken oft direkt, nachdem Sie ankündigen, dass Sie zu sind. Kontraintuitiv aber konsistent.

Alle drei sind in `playbooks/pricing-and-niching.md` mit paste-ready Copy.

---

## Contracts, Steuern und die Lawyer-Line

Dieses Kit produziert Drafts. Es produziert keine finalen, bindenden Legal-Dokumente.

- Jedes SOW und Proposal, das Sie senden, sollte mindestens einmal von einem Anwalt in Ihrer Jurisdiktion reviewt werden, dann können Sie das Template wiederverwenden.
- Independent-Contractor-Classification variiert nach Land und State/Provinz. Das Kit wird draften, aber nicht entscheiden.
- Sales-Tax / GST / HST / VAT-Handling ist Ihr Job — die Templates lassen Placeholder-Lines, die Sie ausfüllen.

Wenn die KI gefragt wird, eine Contract-Clause zu produzieren, sollte sie anhängen:

> *Konsultieren Sie einen Anwalt in Ihrer Jurisdiktion, bevor Sie sich auf diese Klausel verlassen.*

Diese Zeile ist nicht verhandelbar. Sie ist im Optimization-Pack.

---

## Was dieses Kit NICHT für Sie tun wird

- Ihnen Kunden finden. Visibility-Posts helfen, aber das Kit betreibt nicht Ihren Outreach.
- Ihre Preise entscheiden. Es gibt Ihnen Frameworks und Scripts, aber Sie setzen die Zahl.
- Einen Buchhalter ersetzen. Late-Payment-Templates fixen keinen chronisch langsamen Kunden.
- Sie zum Nichen bringen. Der Brainstorm-Prompt hilft Ihnen, DARÜBER nachzudenken. Die Entscheidung gehört noch Ihnen.

---

## Begleitende Dokumente

- `optimization-pack.md` — voller System-Prompt für jede Chat-KI
- `custom-gpt-instructions.md` — ChatGPT Custom GPT formatiert
- `quick-start.md` — 60-Sekunden-Setup pro Plattform
- `templates/proposal-and-sow.md` — Three-Tier-Proposal-Generator, SOW-Template, Intake-Call-Formular
- `templates/client-updates-and-invoices.md` — Wöchentliche Updates, Invoice-Copy, Late-Payment-Reminders
- `playbooks/pricing-and-niching.md` — Pricing-Konversations-Scripts, Niching-Brainstorm, LinkedIn-Templates
