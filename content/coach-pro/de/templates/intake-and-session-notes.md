# Intake-Formulare + Session-Notes

Drei Formate abgedeckt: Intake-Formular, SOAP-Notes, DAP-Notes, narrative Notes. Wählen Sie das Format, das zu Ihrem Credential und Use Case passt.

---

## Intake-Formular-Template

Für First-Session-Onboarding. Verwenden als digitales Formular (Google Forms / Typeform / Practice Better / Jane / SimplePractice) oder fügen Sie es in Ihr Client-Portal ein.

### Der Prompt

```
Sie draften ein Client-Intake-Formular für einen [Praktiker-Typ] in [Jurisdiktion]. Generieren Sie ein komplettes Intake-Formular, das einschließt:

1. Client-Identifikation (Name, Pronomen, bevorzugte Kontaktmethode, Zeitzone)
2. Notfallkontakt + After-Hours-Anweisungen
3. Grund für die Suche nach [Coaching / Training / Therapie]
4. Relevante Historie auf dem Level, das meinem Scope of Practice angemessen ist (keine medizinische Historie, es sei denn, ich bin dafür lizenziert)
5. Ziele — wie Erfolg in 3 Monaten aussähe
6. Vergangene Erfahrung mit [Coaching / Training / Therapie]
7. Logistik (Frequenz-Präferenz, Modalität, Scheduling)
8. Fee-Acknowledgment + Cancellation-Policy
9. Scope-of-Practice-Statement — was ich tue und nicht tue
10. Informed Consent — Vertraulichkeit, Grenzen der Vertraulichkeit, Mandatory-Reporting-Awareness, falls anwendbar
11. Crisis-Line-Acknowledgment

Geben Sie als sauberes nummeriertes Formular aus. Jede Frage sollte in 1-3 Sätzen beantwortbar sein.

Meine Praxis-Details:
- Praktiker-Typ: [Life Coach / Personal Trainer / lizenzierter Therapeut mit Credential]
- Jurisdiktion: [Provinz/Bundesstaat]
- Angebotene Services: [was ich tatsächlich tue]
- Fee: [Ihr Fee]
- Cancellation-Policy: [Ihre Policy]
- Session-Format: [in-person / Video / Telefon / Mix]
```

### Output-Struktur (Beispiel für einen Life Coach)

```
# [Praxis-Name] — New Client Intake

Danke, dass Sie Ihre erste Session aufsetzen. Bitte vervollständigen Sie dieses Formular mindestens 24 Stunden bevor wir uns treffen.

## 1. Über Sie
- Voller Name
- Bevorzugter Name (falls anders)
- Pronomen
- E-Mail
- Telefon (nur für Scheduling verwendet, es sei denn, Sie sagen mir anders)
- Zeitzone

## 2. Notfallkontakt
- Name + Beziehung zu Ihnen
- Telefon

Hinweis: Ich halte reguläre Session-Stunden (Di-Fr, 9-17 Uhr MT). Ich bin für Crisis-Support außerhalb dieser Stunden nicht verfügbar. Wenn Sie in Krise sind, kontaktieren Sie 988 (US/Kanada) oder gehen Sie in die nächstgelegene Notaufnahme.

## 3. Was bringt Sie gerade jetzt zum Coaching?
Ein paar Sätze, woran Sie arbeiten möchten. Keine Notwendigkeit, Memoirs zu schreiben — wir kommen zusammen rein.

## 4. Wie würde "gut" in 3 Monaten aussehen?
Je klarer das Bild, desto nützlicher unsere erste Session.

## 5. Haben Sie schon einmal mit einem Coach oder Therapeuten gearbeitet?
- Ja / Nein
- Wenn ja — was hat für Sie funktioniert oder nicht funktioniert?

## 6. Logistik
- Bevorzugte Frequenz (wöchentlich / zweiwöchentlich / monatlich)
- Bevorzugte Modalität (Video / Telefon / in-person)
- Scheduling-Constraints, die ich wissen sollte

## 7. Gebühren und Cancellation
Mein Fee ist [$X] pro Session. Cancellation-Policy: 24 Stunden Vorlauf erforderlich; Missed Sessions oder späte Cancellations werden zum vollen Rate berechnet.

Durch das Absenden dieses Formulars anerkennen Sie Fee und Cancellation-Policy.

## 8. Was ich tue und nicht tue
Ich bin ein Life Coach, kein lizenzierter Mental-Health-Profi. Coaching ist fokussiert auf gegenwärtige Ziele, Accountability und Pattern-Recognition. Es ist kein Ersatz für Therapie oder medizinische Versorgung.

Wenn ich an irgendeinem Punkt etwas bemerke, das außerhalb meines Scope ist, sage ich Ihnen das, und wir können über ein Referral sprechen. Das ist Teil meiner Arbeitsweise, kein Problem.

## 9. Informed Consent
Durch das Absenden dieses Formulars bestätigen Sie:
- Sie betreten Coaching freiwillig
- Sie verstehen, dass Coaching keine Therapie oder medizinische Versorgung ist
- Sessions sind vertraulich, mit diesen Grenzen: Ich darf Vertraulichkeit brechen, wenn ich Grund zur Annahme habe, dass Sie oder jemand anderes in unmittelbarer Gefahr ist, oder wenn ich rechtlich zur Offenlegung gezwungen bin
- Sie sind verantwortlich für Ihre eigenen Entscheidungen und die Aktionen, die Sie außerhalb der Session ergreifen

## 10. Sonst noch etwas, das ich vor unserer ersten Session wissen sollte?
Optional. Ein paar Sätze, falls etwas in den Sinn kommt.
```

Für lizenzierte Therapeuten sind Intake-Formulare länger und schließen klinische Historie ein. Für Personal Trainer tauschen Sie Ziele/Historie gegen Fitness-Assessment + Health-Screening (PAR-Q+) + Verletzungs-Historie.

---

## SOAP-Note-Template

Für lizenzierte Kliniker und Allied-Health-Praktiker.

### Der Prompt

```
Sie draften eine SOAP-Note aus rohem Session-Content.

Praktiker-Typ: [LCSW / RP / LPC / Psychologe / PT / OT / etc.]
Client: [Initialen oder Pseudonym]
Session #: [Nummer]
Datum: [Datum]
Modalität: [in-person / Video / Telefon]
Dauer: [Minuten]

Roher Content (was in der Session aufkam):
[fügen Sie Ihre groben Notizen ein — Worte des Clients, Ihre Beobachtungen, Themen]

Regeln:
- Länge 200-400 Wörter total
- Subjective = vom Client berichtete Erfahrung (sparsam zitieren)
- Objective = Ihr beobachtetes Verhalten, Affekt, Präsentation, messbare Items
- Assessment = Ihr klinischer Eindruck in beobachtender Sprache; benennen Sie KEINE DSM-5-Diagnose, es sei denn, ich liefere eine explizit
- Plan = nächste Schritte, Zwischen-Session-Arbeit, Fokus der nächsten Session
- Flaggen Sie alle Krisensignale oder Scope-Grenz-Ereignisse explizit
- Schließen Sie mit einer Clinician-Signature-Zeile + Credential
```

### Output-Struktur (Beispiel)

```
# SOAP Note — Client J.K. — Session 4
**Datum:** 2026-05-14 | **Modalität:** Video | **Dauer:** 50 Min

**S (Subjective):**
Client reported a "rough week" — described two boundary conflicts with her sister, including one that left her "feeling like a kid again." Reported sleep at 5-6 hours per night this week, down from 7-8 last week. Denied SI/HI when asked directly. Reported some increased anxiety mid-week, resolved by Friday.

**O (Objective):**
Client presented oriented x3, affect mildly constricted compared to prior sessions. Speech rate within normal limits. Engaged actively in problem-solving the second half of session. No psychomotor agitation. Made appropriate eye contact via video.

**A (Assessment):**
Boundary work with family-of-origin remains the primary theme. Client demonstrating improved capacity to identify the pattern in real-time, with some lag in implementing the boundary. Anxiety this week appears situational and self-limiting. No safety concerns at this time.

**P (Plan):**
Continue Session 5 next week, same time. Between sessions, client will (1) practice the scripted boundary phrase we worked on, (2) journal one situation where she noticed the pattern before reacting. Next session focus: deepen the boundary script + introduce values clarification work if appropriate. No clinical concerns flagged.

— [Clinician Name], [Credential]
```

---

## DAP-Note-Template

Für Counselling, Social Work und jeden Praktiker, dessen Workflow DAP verwendet.

### Der Prompt

```
Sie draften eine DAP-Note aus rohem Session-Content.

[Gleicher Input-Header wie SOAP]

Regeln:
- Länge 150-300 Wörter
- Data = kombiniert Subjective + Objective (Client-Berichte + Ihre Beobachtungen)
- Assessment = klinischer Eindruck in beobachtender Sprache
- Plan = nächste Schritte + Zwischen-Session-Arbeit
- Flaggen Sie alle Krisensignale oder Scope-Grenz-Ereignisse
```

### Output-Struktur (Beispiel)

```
# DAP Note — Client M.R. — Session 8
**Datum:** 2026-05-14 | **Modalität:** In-person | **Dauer:** 45 Min

**D (Data):**
Client described a productive week. Reported using the grounding exercise three times during high-anxiety moments at work and finding it "actually helpful." Affect brighter than in previous sessions, posture more open, engaged throughout. Denied SI/HI on routine check-in. Brought up an upcoming family event as a potential stressor.

**A (Assessment):**
Continued progress on anxiety management. Client demonstrating internalization of grounding techniques and using them proactively. Anticipatory anxiety re: family event noted; will integrate into next-session planning. No safety concerns.

**P (Plan):**
Session 9 next week. Between sessions, client will practice grounding daily and journal one anticipated stressor for the family event. Next session: structured prep for the event, including boundary-setting language.

— [Clinician Name], [Credential]
```

---

## Narrative Session-Notes (für Coaches und Trainer)

Wenn klinische Formate nicht zu Ihrer Praxis passen.

### Der Prompt

```
Sie draften narrative Session-Notes aus rohem Content.

Praktiker-Typ: [Life Coach / Personal Trainer / Nutrition Coach / etc.]
Client: [Initialen oder Pseudonym]
Session #: [Nummer]
Datum: [Datum]
Modalität: [in-person / Video / Telefon]
Dauer: [Minuten]

Roher Content:
[grobe Notizen einfügen]

Regeln:
- Länge 150-300 Wörter
- KEIN klinisches Format (kein "Assessment" — verwenden Sie "Observations" oder "What I noticed")
- Bleiben Sie im Coaching-Scope — beschreiben Sie die Arbeit, nicht klinische Eindrücke
- Identifizieren Sie alle Commitments, die der Client für zwischen Sessions gemacht hat
- Flaggen Sie alle Momente, in denen ich Referral erwägen sollte (alles, was Pattern-matched zu Mental-Health, medizinischem oder anderem lizenzierten Scope-Territorium)
```

### Output-Struktur (Beispiel — Life Coach)

```
# Session Notes — Client A.L. — Session 6
**Datum:** 2026-05-14 | **Modalität:** Video | **Dauer:** 50 Min

**Woran wir gearbeitet haben:**
A.L. opened with the conversation she'd been avoiding with her business partner — she had it Tuesday. She described it as "less terrible than I expected, but I still need to follow up on the money piece." We spent the first half unpacking what worked (clarity in her opening, sticking to the topic) and what didn't (folding when the partner pushed back on the timeline).

**Was ich bemerkt habe:**
A.L. is naming her patterns faster than three sessions ago. She caught the fold mid-story without prompting. Still tends to soften the ask when there's pushback; we'll keep working on this.

**Zwischen-Session-Commitment:**
She'll send the follow-up email about the money piece by Friday. Will draft it solo, no edits from me.

**Fokus der nächsten Session:**
Review the email + the partner's response if it's come in. Continue work on holding the ask under pushback.

**Referral-Notes:**
Keine. Nichts wurde diese Session als außerhalb des Coaching-Scope geflaggt.

— [Coach Name]

*Coaching ist kein Ersatz für medizinische oder Mental-Health-Versorgung. Wenn Sie in Krise sind, kontaktieren Sie 988 (US/Kanada) oder Ihre lokale Notrufnummer.*
```

---

## Wenn Sie das Format falsch wählen

- **SOAP für einen Coach** — zu klinisch; Sie schreiben am Ende Assessments, die Sie nicht verteidigen können
- **Narrativ für einen lizenzierten Kliniker, der Versicherung abrechnet** — wird Dokumentations-Anforderungen nicht erfüllen
- **DAP für einen Personal Trainer** — Overkill; verwenden Sie Narrativ
- **Alles ohne Disclaimer formatiert** — neu prompten; das Kit sollte standardmäßig einen produzieren
