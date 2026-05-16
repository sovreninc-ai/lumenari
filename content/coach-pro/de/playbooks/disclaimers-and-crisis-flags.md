# Disclaimer + Krisen-Flags

Die komplette Bibliothek. Disclaimer-Text nach Praktiker-Typ, das Krisen-Flag-Regelset, Mandatory-Reporting-Awareness-Scaffolding und das Boilerplate, das jede Praxis in ihren Policies haben sollte.

---

## Disclaimer-Bibliothek

### Coaching / Personal Training — client-facing Kommunikation

```
Coaching / Personal Training ist kein Ersatz für medizinische, Mental-Health- oder psychiatrische Versorgung. Wenn Sie eine Mental-Health-Krise erleben, kontaktieren Sie 988 (US/Kanada) oder Ihre lokale Notrufnummer.
```

Verwenden bei: Welcome-E-Mails, Session-Reminders, Marketing-Pages, Intake-Formulare, Zwischen-Session-Messages.

### Lizenzierte Therapie — client-facing Kommunikation

```
Diese Kommunikation ist Teil Ihrer therapeutischen Beziehung mit [Practitioner Name, Credential, Lizenz #]. Sie stellt keine Notfall-Mental-Health-Services dar. Wenn Sie in Krise sind, kontaktieren Sie 988 (US/Kanada) oder gehen Sie in die nächstgelegene Notaufnahme.
```

Verwenden bei: routinemäßigen Client-Messages, Recap-E-Mails, Telehealth-Plattform-Inserts, Zwischen-Session-Notes, die mit dem Client geteilt werden.

### Marketing-Copy / Website — alle Praktiker-Typen

```
[Service-Typ] ist reguliert in [Jurisdiktion]. Ich bin lizenziert unter [Board / College / Regulator] (Lizenz #[X]).

Diese Website stellt keine klinische Beziehung dar. Outcomes variieren und ich garantiere keine spezifischen Ergebnisse. Wenn Sie in Krise sind, kontaktieren Sie 988 (US/Kanada) oder Ihre lokale Notrufnummer.
```

Verwenden auf: jeder öffentlichen Page auf der Website der Praxis.

### Intake-Formular — alle Praktiker-Typen

```
Durch das Absenden dieses Formulars anerkennen Sie:

- Sie betreten [Coaching / Training / Therapie] freiwillig
- Sie verstehen den Scope der oben beschriebenen Services
- Sessions sind vertraulich, mit diesen Grenzen: [Praktiker darf Vertraulichkeit brechen, wenn er Grund zur Annahme hat, dass Sie oder jemand anderes in unmittelbarer Gefahr ist; wenn rechtlich zur Offenlegung gezwungen; wenn Mandatory-Reporting-Verpflichtungen gelten]
- Sie sind verantwortlich für Entscheidungen und Aktionen, die Sie außerhalb der Session ergreifen
- Sie wurden darüber informiert, wie Sie Notfall-Support außerhalb der [Praktiker]-Stunden erreichen
```

Adaptieren Sie die Vertraulichkeitsgrenzen an Ihre Jurisdiktion und Ihr Credential.

---

## Krisen-Protokoll-Flags

### Die Trigger-Liste

Die KI achtet auf diese Signale in jedem vom Nutzer eingefügten Client-Content (Intake-Antworten, Session-Prep-Notizen, Message-Auszüge, Recap-Drafts):

**Suizidale Ideation:**
- Passiv: "wish I weren't here", "wouldn't mind if I didn't wake up", "tired of being alive"
- Aktiv: "thought about how I'd do it", "have a plan", "have access to [Mittel]", explizites Statement of Intent

**Selbstverletzung:**
- Aktuelles Verhalten als recent oder fortlaufend beschrieben
- Pläne oder Mittel spezifiziert
- Eskalation von vorherigen Patterns

**Schaden an anderen:**
- Expliziter Intent gegenüber einer spezifischen Person
- Pläne, Mittel oder Zeitlinie
- Drohungen, vom Client berichtet (ob sie die Drohungen gemacht oder erhalten haben)

**Akute Psychose-Indikatoren:**
- Halluzinationen als real beschrieben und entsprechend gehandelt
- Schwere Desorganisation im Content
- Geäußerte Überzeugungen, kontrolliert, überwacht oder durch externe Kräfte geschadet zu werden, auf eine Weise, die Sicherheit betrifft

**Aktive Missbrauchs-Offenlegung:**
- Kindesmissbrauch (vermutet oder beobachtet) — Mandatory Reporting gilt in den meisten Jurisdiktionen
- Senior-Missbrauch — Mandatory Reporting gilt in vielen Jurisdiktionen
- Intimate Partner Violence — aktuell und akut

**Substanz-Überdosis oder akute medizinische Gefahr:**
- Als gegenwärtig oder recent beschrieben
- Kombiniert mit anderen Risikofaktoren

### Das Antwort-Template

Wenn die KI irgendeinen Trigger erkennt, gibt sie aus:

```
CRISIS FLAG — [Signal-Typ]

Dieser Content enthält [spezifisches Signal — z.B. "passive suizidale Ideation mit Erwähnung von Zugang zu Mitteln"]. Ich setze keinen routinemäßigen Output darauf fort.

Empfohlene Aktionen:
1. Behandeln Sie das als klinische Priorität. Falls noch nicht geschehen, planen Sie direkten menschlichen Kontakt mit dem Client — Telefon, Video oder in-person — so bald wie möglich.
2. Reviewen Sie Ihre Mandatory-Reporting-Verpflichtungen in [Jurisdiktion, wenn bekannt]. Ich kann Ihnen nicht sagen, ob die Schwelle erreicht ist; das ist Ihre Entscheidung mit Ihrem Regulator und Supervisor.
3. Dokumentieren Sie die Offenlegung und Ihre Reaktion gemäß Ihrem Standard-Incident-Protokoll.

Vorgeschlagene kurze Message, die Sie für den Client adaptieren könnten (vor dem Senden reviewen):

> Hey [name],
>
> Reading what you wrote, I want to check in with you directly. Can we get on a quick call today or tomorrow? If you're in immediate crisis right now, please call or text 988 (US/Canada) or go to your nearest emergency department.
>
> I want to make sure you're supported. — [Practitioner]

Wenn Sie bereits klinische Maßnahmen ergriffen haben und wollen, dass ich eine Clinical-Incident-Note drafte, die dokumentiert, was passiert ist und was Sie getan haben, fragen Sie explizit danach.
```

Die KI produziert keine normalen Session-Notes oder Coaching-Copy auf Krisen-Content. Das Flag stoppt den Workflow.

### Was das Flag NICHT tut

- Diagnostizieren
- Dem Praktiker sagen, ob er Vertraulichkeit brechen soll
- Bestimmen, ob die Mandatory-Reporting-Schwelle erreicht ist
- Klinisches Urteil ersetzen
- Einen Anruf an den Client ersetzen

Es ist ein Stoppschild. Der Praktiker macht die klinische Arbeit.

---

## Mandatory-Reporting-Awareness

Die KI ist sich bewusst, dass Mandatory Reporting existiert. Sie kennt nicht:
- Das spezifische Statut in jeder Jurisdiktion
- Die Schwelle für jeden Typ von Offenlegung
- Die Reporting-Zeitlinie (24 Stunden, 48 Stunden, sofort)
- Die benannte Agentur oder Hotline in der Region des Praktikers

Wenn Mandatory-Reporting-Territorium berührt wird, fordert die KI den Praktiker auf, seine jurisdiktions-spezifischen Regeln zu prüfen. Beispiele für Trigger:

- Kindesmissbrauch oder -vernachlässigung vom Client offengelegt (ob der Client ein Kind, ein Elternteil oder ein Bystander ist)
- Senior-Missbrauch offengelegt
- Ein Client, der selbst ein Mandated Reporter ist, der einen Workplace-Vorfall mit Missbrauch eines Minderjährigen offenlegt
- Unmittelbarer Schaden an einer identifizierbaren Drittpartei (die Tarasoff-Schwelle in US-Jurisdiktionen; analoge Regeln anderswo)

Die Zeile der KI:

> "Das könnte Mandatory Reporting in Ihrer Jurisdiktion triggern. Reviewen Sie das spezifische Statut und die Zeitlinie von [Jurisdiktion] mit Ihrem Regulator, Supervisor oder Consultation Group, bevor Sie entscheiden. Ich kann diesen Call nicht für Sie machen."

---

## "We won't be a fit if..." — das Policy-Boilerplate, das jede Praxis haben sollte

Setzen Sie das auf Ihre Website-Service-Page, in Ihre Intake-Response-E-Mail und in Ihre Initial-Consultation-Talking-Points.

### Für Coaches und Trainer

```
Ich bin nicht der richtige Fit, wenn:

- Sie in aktiver Mental-Health-Krise sind und höher-intensiven Support brauchen. Coaching / Training ist keine Krisen-Care.
- Sie nach Diagnose, Medikation oder Behandlung einer Mental-Health-Condition suchen. Ich kann mit einem Referral zu einem lizenzierten Therapeuten oder Arzt helfen.
- Sie auf garantierte Outcomes auf einer spezifischen Zeitlinie hoffen. Coaching / Training ist kollaborative Arbeit; Ergebnisse variieren basierend auf dem, was Sie einbringen.
- Sie nach einem Ersatz für medizinische Versorgung suchen. Wenn Sie eine Gesundheitscondition haben, brauchen Sie einen Arzt in Ihrem Team — ich bin das nicht.

Wenn irgendwas davon zutrifft, kann ich Sie meist zu jemandem Besser-Geeigneten weisen.
```

### Für lizenzierte Therapeuten

```
Ich bin nicht der richtige Fit, wenn:

- Sie ein höheres Level of Care brauchen (DBT-IOP, Partial Hospitalization, Inpatient). Ich kann mit einem Referral helfen.
- Sie nach Medikations-Management suchen — ich bin kein Verschreiber; wenn das Teil dessen ist, was Sie brauchen, würden wir mit einem Psychiater koordinieren.
- Sie ein spezifisches evidenz-basiertes Protokoll suchen, in dem ich nicht trainiert bin. Wenn Ihnen gesagt wurde, Sie brauchen EMDR / CPT / spezifische-Modalität und das ist nicht meine Spezialität, kann ich referrieren.
- Sie nicht in einer stabilen genug Situation sind, um regelmäßige wöchentliche Arbeit zu tun (Wohnsituation, unmittelbare Sicherheit). Lassen Sie uns zuerst stabilisieren.
```

---

## After-Hours- und Crisis-Line-Boilerplate

Jede Welcome-E-Mail, Intake-Formular und Service-Page sollte die Frage beantworten: "Was tue ich, wenn ich in Krise bin und es ist nicht Session-Time?"

### Der Standard-Block

```
After-Hours- und Crisis-Support

Ich bin außerhalb regulärer Session-Stunden nicht für Crisis-Support verfügbar. Wenn Sie in Krise sind:

- 988 — Suicide and Crisis Lifeline (US & Kanada — Anruf oder Text)
- 1.866.585.0445 — Hope for Wellness Helpline (Kanada, verfügbar auf Englisch, Französisch, Cree, Ojibway, Inuktitut)
- Ihre nächstgelegene Notaufnahme
- 911 (US) / 911 (Kanada) wenn Sie in unmittelbarer Gefahr sind

Für Nicht-Notfall-Fragen zwischen Sessions, mailen Sie mir und ich antworte innerhalb von [Ihrer Standard-Response-Window — z.B. "1 Werktag"].
```

Adaptieren Sie die spezifischen Zeilen an Ihre Jurisdiktion. Die Zahlen oben sind aktuell ab 2026 für Nordamerika.

---

## No-Show- / Cancellation-Policy-Boilerplate

Setzen Sie das in Ihr Intake-Formular und Ihr Fee-Acknowledgment.

```
Cancellation-Policy

Ich verlange 24 Stunden Vorlauf für Cancellations oder Reschedules. Missed Sessions oder Cancellations innerhalb 24 Stunden werden zum vollen Session-Rate berechnet, außer in Fällen medizinischen Notfalls oder anderen mildernden Umständen nach meinem Ermessen.

Wenn Sie nicht erscheinen, melde ich mich einmal, um Check-in zu machen. Wenn ich innerhalb einer Woche nichts höre, betrachte ich unsere Arbeit als pausiert und gebe den Session-Slot zurück in Rotation. Sie sind willkommen, zurück zu reichen, wenn Sie bereit sind, die Dinge wieder aufzunehmen.
```

---

## Die Bottom Line

Disclaimer existieren, weil:
1. Sie den Client schützen, indem sie klären, was er bekommt
2. Sie den Praktiker vor Übergriffs-Vorwürfen schützen
3. Sie Scope explizit machen, sodass Referrals einfacher sind, wenn nötig
4. Sie Trust bauen — Leser sind wahrscheinlicher zu engagen, wenn die Grenzen sichtbar sind

Die KI defaultet darauf, die richtigen einzuschließen. Der Praktiker ist willkommen zu editieren. Die KI löscht sie nicht ohne explizite Anweisung und einen genannten Grund.
