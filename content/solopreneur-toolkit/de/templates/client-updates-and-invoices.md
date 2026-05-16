# Client-Updates und Invoice-Nudges

Die langweilige Seite der Solo-Arbeit — Kunden zu sagen, was Sie getan haben, sie zu bitten zu zahlen, und sie zu jagen, wenn sie nicht zahlen. Diese Datei ist die Copy, die alle drei tut, ohne wie ein Roboter oder eine Fußmatte zu klingen.

---

## Teil 1 — Das wöchentliche Client-Update

Die einzelne Highest-Leverage-E-Mail in der Solopreneur-Arbeit. Jeden Freitag gesendet (oder welchen Tag auch immer Sie committen) wie ein Uhrwerk. Nach 3 davon stoppen "hey just checking in"-E-Mails von Ihrem Kunden. Ihr Boss hört auf, sie zu fragen, wo das Projekt ist. Sie werden Low-Anxiety für sie.

### Das Format — fünf Zeilen max

```
**Diese Woche:**
- [Konkretes Deliverable geshipt oder vorangebracht]
- [Konkretes Deliverable geshipt oder vorangebracht]

**Nächste Woche:**
- [Deliverable]
- [Deliverable]

**Brauche von Ihnen:**
- [Spezifische Entscheidung oder Asset, mit einem Datum — oder "nichts gerade jetzt"]

**Status:** On track / Watch / Blocked
**Nächstes Update:** [Datum]
```

### Fügen Sie diesen Prompt in die KI ein

```
Du bist der Solopreneur-Co-Pilot.

Schreibe ein Freitags-Client-Update für [KUNDEN-NAME] zum [PROJEKT-NAME]-Projekt. Nutze das Standard-5-Zeilen-Format.

Diese Woche habe ich:
- [BULLET 1]
- [BULLET 2]
- [BULLET 3]

Nächste Woche werde ich:
- [BULLET 1]
- [BULLET 2]

Ich brauche von ihnen:
- [ASK]

Status: [On track / Watch / Blocked — und ein Satz warum, falls nicht On track]

Halte es unter 100 Wörtern. Plain-Language. Kein "I hope this email finds you well."
```

### Ausgearbeiteter Beispiel-Output

> Subject: Brand-Refresh — Woche-2-Update
>
> **Diese Woche:**
> - First-Round-Visual-Direction geshipt (Figma-Link, Comments offen)
> - Positioning-Workshop-Notes in den Voice-Doc-Draft konsolidiert
>
> **Nächste Woche:**
> - Runde 2 der Visual-Direction basierend auf Ihrem Feedback
> - Erster Draft des Pitch-Deck-Templates
>
> **Brauche von Ihnen:**
> - Comments zum Figma-File bis Dienstag, 21. Mai
>
> **Status:** On track
> **Nächstes Update:** Freitag, 24. Mai

Diese E-Mail hat 4 Minuten zum Schreiben gedauert. Sie wird Ihnen nächste Woche 40 Minuten "wo sind wir"-Konversationen sparen.

### Wenn Status Watch oder Blocked ist

Fügen Sie immer EINEN Satz hinzu, der erklärt warum. Niemals nur "Watch." Beispiele:

- **Watch — warten seit Dienstag auf Copy vom Marketing-Team; werde nächste Woche umschuffeln, falls es bis Montag nicht landet.**
- **Blocked — die Staging-Environment wurde noch nicht provisioned. Ich habe Ihren Dev-Lead Mittwoch gemailt; können Sie sie pingen?**

Den Blocker zu benennen sagt dem Kunden, dass sie etwas tun müssen. Vagues "Watch" macht sie ängstlich.

---

## Teil 2 — Invoice-Copy

Die Invoice selbst ist meist ein Formular (Ihr Invoicing-Tool — Stripe, FreshBooks, HoneyBook, Wave, QuickBooks, was auch immer — generiert es). Die COPY, die um die Invoice herum geht, ist, was sich ändert.

### Standard-Invoice-Send-E-Mail

```
Subject: Invoice [###] — [Projektname]

Hi [Name],

Invoice [###] ist angehängt / unten verlinkt. Summary:
- [Line-Item 1]: $X
- [Line-Item 2]: $X
- **Total:** $X (Net 14)

Sie können per [akzeptierte Methoden] zahlen. Falls Sie ein anderes Format für Ihr AP-Team brauchen, lassen Sie es mich einfach wissen.

Danke,
[Sie]
```

Notes:

- **State die Net-Terms in der E-Mail**, nicht nur im Invoice-PDF. AP-Teams brauchen das schriftlich.
- **Schreiben Sie nicht "Thanks for your business!"** — es liest needy. "Thanks" allein ist okay.
- **Entschuldigen Sie sich nicht für die Invoice.** Es ist die Arbeit.

### Fügen Sie diesen Prompt in die KI ein

```
Du bist der Solopreneur-Co-Pilot.

Schreibe eine Invoice-Send-E-Mail für [KUNDEN-NAME]. Projekt: [NAME]. Total: [BETRAG] CAD/USD. Terms: Net [7/14/30]. Payment-Methoden: [STRIPE/INTERAC/ACH/CHEQUE/ETC].

Halte es unter 70 Wörter. Kein "Thanks for your business!" Keine Entschuldigungen.
```

---

## Teil 3 — Late-Payment-Reminders

Die Three-Tier-Eskalation. Jeder Tier ist eine separate E-Mail, an ihrem eigenen Tag gesendet. Niemals kombinieren.

### Tag 7 überfällig — der freundliche Nudge

Ton: Oversight annehmen, kein Bad-Faith. Die meisten Invoices, die über Net 14 slipen, sitzen in jemandes Inbox; nicht maliziös, einfach vergraben.

```
Subject: Re: Invoice [###]

Hi [Name],

Schneller Nudge — Invoice [###] vom [Datum] war am [Datum] fällig, und ich habe sie nicht durchkommen sehen. Ich weiß, wie einfach diese zu verpassen sind. Könnten Sie bei AP nachfragen und mir mitteilen, wann ich sie erwarten kann?

Falls es auf Ihrer Seite einen Hold-up gibt, happy, das durchzusprechen.

Danke,
[Sie]
```

### Tag 14 überfällig — fester, erwähnt die Policy

Ton: noch höflich. Der Kunde weiß jetzt, dass Sie tracken. Falls Sie eine Late-Fee-Policy in Ihrem SOW haben, ist das, wo sie auftaucht.

```
Subject: Invoice [###] — still outstanding

Hi [Name],

Folge nach — Invoice [###] ist jetzt 14 Tage überfällig. Per unserem SOW gilt eine 1,5% Late-Fee nach 14 Tagen; die wurde zur aktualisierten angehängten Invoice hinzugefügt.

Falls es etwas gibt, das ich tun kann, um das auf Ihrer Seite unblocken zu helfen, lassen Sie es mich wissen. Ansonsten werde ich nächste Woche zurückchecken.

Danke,
[Sie]
```

Falls Sie keine Late-Fee-Klausel haben, droppen Sie die Zeile. Bluffen Sie keine — Ihr Kunde könnte das SOW offen haben.

### Tag 30 überfällig — formal, Arbeit pausiert

Ton: noch professionell, aber die Konsequenzen sind real und gestated. Sie pausieren die Arbeit, und Sie wollen einen Phone-Call.

```
Subject: Invoice [###] — pausing work

Hi [Name],

Invoice [###] ist jetzt 30 Tage überfällig. Ab [Datum] pausiere ich weitere Arbeit an [PROJEKT], bis das Balance gesettled ist. Ich würde es viel lieber nicht tun — lassen Sie uns auf einen 15-Minuten-Call diese Woche, um es zu sortieren.

Zeiten, die ich kann: [3 Optionen].

Falls das der falsche Contact für AP ist, bitte loopen Sie ein, mit wem ich sprechen sollte.

Danke,
[Sie]
```

### Was Sie NICHT tun

- "Just following up again..." zum fünften Mal. Nach Tag 30 haben Sie drei eskalierende E-Mails gesendet. Die vierte ist der Call, keine vierte E-Mail.
- Passiv-aggressive Line-Endings ("I assume this isn't a priority?")
- Drohungen, die Sie nicht backen können ("Ich werde meinen Anwalt einbeziehen müssen.") — außer Sie werden es tatsächlich tun, und außer der Betrag es rechtfertigt.
- Public-Shaming. Tweeten Sie nicht darüber, posten Sie nicht darüber. Reputation funktioniert in beide Richtungen.

### Wann über E-Mail hinaus zu eskalieren

Falls 45 Tage überfällig und keine Response: senden Sie eine finale E-Mail, die sagt, dass Sie es einem Collections-Service oder Small-Claims-Prozess übergeben, dann tun Sie es tatsächlich. Die Drohung-ohne-Action lässt Sie weich aussehen. Die Action-ohne-Warnung ist unprofessionell. Immer eine finale E-Mail, die die Action und das Datum benennt.

---

## Teil 4 — Die "Scope-Creep"-Mid-Project-E-Mail

Angrenzend zum Invoicing. Wenn der Kunde nach "just one more thing" fragt, das nicht im SOW ist.

### Das Template

```
Subject: Re: [ihre Anfrage]

Hi [Name],

Happy, mir [die neue Sache] anzusehen. Heads-up — es ist außerhalb des Scopes, den wir im SOW vereinbart haben (Section 2: Out of Scope). Ich kann es als Change-Request handhaben:

- Option 1: Es als Flat-Add-on für $[X] hinzufügen. Fügt [Y] Tage zur Timeline hinzu.
- Option 2: Es für eine Phase 2 parken, nachdem wir den aktuellen Scope abgeschlossen haben.

Welchen Weg wollen Sie gehen?

Danke,
[Sie]
```

Note, was dieses Template NICHT tut:

- Es sagt nicht "sure, ich kann das reinquetschen." So frisst Scope-Creep Ihre Margin.
- Es entschuldigt sich nicht dafür, für neue Arbeit zu charlen.
- Es lecturet den Kunden nicht über Scope-Creep. Benennt es einfach und bietet Optionen.

---

## Cheat-Sheet — was wann zu senden

| Situation | Senden Sie das |
|---|---|
| Ende jeder Woche | Wöchentliches Update (5 Zeilen) |
| Invoice ready | Invoice-Send-E-Mail (unter 70 Wörter) |
| 7 Tage überfällig | Freundlicher Nudge |
| 14 Tage überfällig | Festerer Reminder, Policy erwähnen |
| 30 Tage überfällig | Pausing-Work-E-Mail + Call bitten |
| 45 Tage überfällig | Finale E-Mail, die Next-Action benennt |
| Kunde fragt nach Out-of-Scope | Change-Request-Offer (2 Optionen) |

Setzen Sie diese in Ihren Snippets-Manager (TextExpander, Raycast, Alfred, was auch immer). Die Reibung des Schreibens derselben E-Mail immer wieder ist, was Solopreneure Invoices slipen lässt.

---

## Häufige Fehler, die das Kit flaggen wird

- "Just checking in" — ersetze mit einem spezifischen Status oder Frage
- "I hope this email finds you well" — cut es, es fügt nichts hinzu
- "Sorry to bother you" — entschuldige dich nie dafür, Geld geschuldet zu werden
- Reminders, die keinen Dollar-Betrag oder Invoice-Nummer benennen — sei spezifisch
- Updates ohne ein Datum für das nächste Update — immer inkludieren
- Status "On track", wenn etwas tatsächlich slipt — nenne es Watch
