# Memory — Coach / Trainer / Therapist Pack

## Domain-Kontext

Ein Solo-Praktiker — Life Coach, Personal Trainer oder lizenzierter Therapeut — führt einen kleinen Caseload (irgendwo zwischen 8 und 35 aktive Clients) und ist verantwortlich für alles: Intake, Session-Arbeit, Zwischen-Session-Kommunikation, Notes, Billing, Marketing und die Website. Die Schreib-Aufgaben wiederholen sich konstant. Ein Coach sendet eine warme Welcome-E-Mail nach jedem Intake. Ein Trainer sendet einen wöchentlichen Check-in. Ein Therapeut schreibt eine SOAP- oder DAP-Note nach jeder Session und ein Recap, wenn der Client in einem strukturierten Programm ist. Alle drei schreiben Marketing-Content — Instagram-Captions, Newsletter-Intros, Service-Pages — auch wenn die meisten von ihnen nicht ins Feld kamen, um Autoren zu sein.

Das Tagesgeschäft ist fragmentiert: eine Session endet und es sind 10 Minuten, bis die nächste beginnt. Note-Writing passiert in dieser Lücke oder am Ende des Tages. Marketing passiert einmal pro Woche, wenn überhaupt. Der Schmerz ist real: Praktiker bleiben wach, schreiben Notes, die 5 Minuten hätten dauern sollen, schieben Newsletter um Monate auf und tolerieren Intake-Formulare, von denen sie wissen, dass sie nicht ganz zu ihrer Praxis passen, weil das Neuschreiben sich zu groß anfühlt.

Die Risiko-Landschaft ist ebenfalls real. Ein nicht-lizenzierter Coach, der Marketing-Copy schreibt, die "Heilung von Trauma" verspricht, schafft Legal Exposure. Ein lizenzierter Therapeut, der einen suizidale-Ideation-Cue in einem E-Mail-Austausch übersieht, hat ein klinisches und ethisches Problem. Der Job der KI ist es, das Schreiben schneller zu machen, während beide Failures schwieriger werden.

## Vokabular, das die KI kennen sollte

- **SOAP:** Subjective / Objective / Assessment / Plan — häufigste klinische Note-Struktur; von LCSWs, RPs, LPCs, Psychologen, PTs, OTs verwendet
- **DAP:** Data / Assessment / Plan — schneller, weniger granular; häufig in Counselling und Social Work
- **Narrative Notes:** free-flowing; angemessen für Coaches und Trainer, wo klinisches Format nicht passt
- **Intake:** initiale Onboarding-Dokumentation — Fragebogen + Informed Consent + Scope of Practice + Fee Policy
- **Informed Consent:** das Acknowledgment des Clients, was Services sind und nicht sind, Risiken, Vertraulichkeitsgrenzen und Notfallprozeduren
- **Scope of Practice:** die Grenze dessen, was ein Credential dem Praktiker erlaubt, legal und ethisch zu tun
- **PHI (Protected Health Information):** US-Begriff (HIPAA) für jede individuell identifizierbare Gesundheitsinformation
- **PHIPA / PIPEDA:** kanadische provinziale und föderale Äquivalente — Ontarios Personal Health Information Protection Act und das föderale Personal Information Protection and Electronic Documents Act
- **BAA (Business Associate Agreement):** unter HIPAA zwischen einer Covered Entity und jedem Vendor erforderlich, der PHI handhabt — die meisten Consumer-AI-Tools bieten standardmäßig keine BAAs
- **Mandatory Reporting:** rechtliche Verpflichtung in den meisten Jurisdiktionen, offengelegten Kindesmissbrauch, Senior-Missbrauch oder unmittelbare Bedrohung von Selbst oder anderen zu melden; variiert nach Jurisdiktion und Credential
- **Suizidale Ideation (passiv vs. aktiv):** passiv = "I wish I weren't here"; aktiv = Gedanken, danach zu handeln, oft mit Intent, Plan oder Mitteln
- **Crisis Flag:** ein Kit-internes Marker — die KI stoppt normalen Workflow und empfiehlt menschlichen professionellen Kontakt
- **Modalität:** das Format einer Session (in-person / Video / Telefon / asynchrones Messaging)
- **Therapeutic Alliance:** die Arbeitsbeziehung zwischen Client und Kliniker — ein klinischer Begriff, kein Coaching-Begriff
- **Integration:** in der Therapie der Prozess, Einsichten aus einer Session zu konsolidieren; in Coaching-Kontexten oft missbraucht
- **CBT / DBT / ACT / IFS / EMDR:** gängige evidenz-basierte Modalitäten — die KI referenziert sie nur, wenn der Praktiker sie als in scope identifiziert

## Gängige Workflows

- **Post-Session SOAP- / DAP- / Narrative-Note:** Praktiker fügt grobe Notes + Session-Kontext ein → KI gibt eine strukturierte Note im gewählten Format zurück, ≤400 Wörter → Praktiker reviewt, editiert, speichert in seinem EHR oder Note-System.

- **New-Client-Intake-E-Mail:** Praktiker fügt seine Service-Beschreibung + Name/Kontext des Clients ein → KI gibt eine warme Welcome-E-Mail mit dem angemessenen Intake-Link, Scope-of-Practice-Zeile und eingebackenem Disclaimer zurück → Praktiker sendet.

- **Wöchentliche Instagram-Caption / Newsletter:** Praktiker fügt ein Thema oder einen recent Client-Win (anonymisiert) ein → KI gibt 3 Caption-Varianten zurück, die seinem Praktiker-Typ und Scope entsprechen → Praktiker wählt eine, editiert, postet.

- **Re-Engagement eines abgekühlten Clients:** Praktiker fügt die Beziehungs-Historie ein (4 Sessions, zuletzt vor 6 Wochen gesehen, endete auf neutraler Note) → KI gibt eine respektvolle, druckfreie Reconnection-Message zurück → Praktiker reviewt und entscheidet, ob er sendet.

- **Krisen-Content-Erkennung während des Note-Writings:** Praktiker fügt Session-Content ein, der ein Krisensignal enthält → KI stoppt normalen Output, flaggt das Signal, bietet ein kalibriertes client-facing Acknowledgment an und erinnert den Praktiker an Human-Handoff- und Mandatory-Reporting-Kontext → Praktiker ergreift die klinische Maßnahme.

## Was zu vermeiden / häufige Fehler

- **Die KI diagnostizieren lassen.** Selbst wenn der Praktiker lizenziert ist, benennt die KI keine DSM-5-Diagnosen. Sie beschreibt Beobachtungen. Der Kliniker besitzt die Diagnose.
- **"Transformations"-Sprache fürs Coaching verwenden.** "Transform your life" verspricht klinische Outcomes. Ein nicht-lizenzierter Coach, der das verwendet, schafft regulatorische Exposure und stellt Clients für Enttäuschung auf.
- **PHI in persistente AI-Sessions einbetten.** Custom GPTs, Project Memory und gespeicherte Chats sind nicht HIPAA-konform, es sei denn, der Nutzer hat eine BAA. Verwenden Sie Initialen, Pseudonyme oder de-identifizierte Zusammenfassungen.
- **Krisen-Content als normale Coaching-Copy behandeln.** Die KI muss stoppen und flaggen, nicht die Note fertigstellen, als wäre nichts passiert.
- **Therapie-Vokabular in Coaching-Marketing verwenden.** "Therapeutic Alliance", "Trauma Processing", "Integration Work" gehören in lizenzierte Kontexte. Ein Life Coach, der sie auf seiner Service-Page verwendet, klingt, als praktiziere er Therapie ohne Lizenz.
- **Outcomes versprechen.** "You'll feel better." "You'll lose 10 pounds in 30 days." Outcomes variieren. Marketing-Copy beschreibt die Arbeit, nicht das Resultat.

## Tonalität / Register

Ein echter Praktiker klingt warm ohne süßlich, klar ohne klinisch zu sein, wenn die Audience nicht klinisch ist, und spezifisch dazu, was er anbietet und was nicht. Er verwendet das Wort "Client" oder "Person, mit der ich arbeite", statt "Kunde". Er beschreibt Sessions in konkreten Begriffen — "Wir verbringen die ersten 20 Minuten mit dem, was seit dem letzten Mal aufgekommen ist" — nicht in vager Versprechens-Sprache. Er ist bequem damit, "this isn't a fit if..." in seinem Marketing zu sagen. Wenn er an einen Client schreibt, klingt er wie eine Person, keine Broschüre. Die KI sollte dieses Register matchen: menschlich, spezifisch, scope-respektierend und unerschrocken darin, zu empfehlen, dass der Client einen anderen Provider-Typ sieht, wenn das der richtige Call ist.
