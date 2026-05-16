# Boolean- und Sourcing-Playbook

Das meiste Sourcing ist schlecht, weil der Boolean-String schlecht ist. Die meisten Booleans sind schlecht, weil sie alle Kandidat:innen so behandeln, als würden sie auf LinkedIn gleich leben. Dieses Playbook fixt beides — den String-Builder für jede Plattform und das Sourcing-Playbook, welche Plattform welche Seniority für welche Rollenfamilie findet.

---

## Teil 1 — Boolean-String-Anatomie

Jeder gute Boolean hat vier Moves:

1. **MUST-have Skills/Titel** — erforderlich, meist quoted Strings, mit AND verknüpft
2. **OPTIONAL Skills** — weiten das Netz, mit OR verknüpft
3. **AUSSCHLÜSSE** — was du nicht willst, mit NOT
4. **CONTEXT-Signale** — Unternehmenstyp, Seniority-Indikatoren, Standort

### Operatoren, die überall funktionieren

- `AND` — beide Terme müssen vorhanden sein
- `OR` — einer von beiden
- `NOT` (oder `-` in den meisten Suchmaschinen) — ausschließen
- `"quoted phrase"` — exaktes Match (behandelt Spaces als Teil des Terms)
- `(Klammern)` — Operatoren gruppieren

### Plattform-spezifische Operatoren

- LinkedIn Recruiter hat Filter als Felder (Titel, Skills, Firma, etc.), die du in der UI toggelst, NICHT im Suchstring
- Public LinkedIn Search unterstützt Basic Boolean im Keywords-Feld, ist aber eingeschränkter
- Google-X-Ray-Searches nutzen site:linkedin.com/in/ und den vollen Boolean
- GitHub Search unterstützt Filter wie `language:`, `location:`, `followers:>X`

---

## Teil 2 — LinkedIn-Recruiter-Strings

LinkedIn Recruiter ist am einfachsten, weil die Plattform selbst die Felder für dich trennt.

### Der Prompt

```
Du bist der Recruiter Co-Pilot.

Bau mir eine LinkedIn-Recruiter-Suche.

**Zielrolle:** [Titel]
**Seniority:** [Entry/Mid/Senior/Staff/Principal]
**Must-have-Skills:** [Liste]
**Optionale Skills:** [Liste]
**Industrien/Firmen-Typen, die ich will:** [z. B. „B2B SaaS, Series A–C, 50–300 Mitarbeitende"]
**Industrien/Firmen-Typen, die ich ausschließen will:** [z. B. „Enterprise Consulting, Agenturen"]
**Standort:** [Stadt + Radius oder remote-anywhere]
**Tenure-Präferenz:** [z. B. „in aktueller Rolle 1+ Jahr"]

Gib mir:
1. Den Boolean-String fürs Keywords-Feld
2. Was in jedem Filter-Feld zu setzen ist (Titel, Skills, Industrie, Firma, Standort, Years of Experience)
3. 2–3 Varianten, falls meine erste Suche zu viel oder zu wenig liefert
4. Häufige False-Positive-Patterns, auf die zu achten ist
```

### Beispiel — Senior Backend Engineer

> **LinkedIn-Recruiter-Setup:**
>
> **Title-Filter:** (Senior OR Sr OR Staff) AND (Backend OR "Back-end" OR "Back end" OR Server)
>
> **Skills-Filter:** Node.js, TypeScript, PostgreSQL (alle drei erforderlich)
>
> **Keywords-Feld Boolean:**
> ```
> ("Node.js" OR "Node" OR Typescript) AND (Postgres OR PostgreSQL) AND (AWS OR GCP) NOT ("recruiter" OR "recruiting" OR "tech evangelist")
> ```
>
> **Industry-Filter:** Computer Software, Internet, Financial Services (je nach Relevanz toggeln)
>
> **Company-Filter:** AUSSCHLIESSEN: Agenturen, Consultancies, Large Enterprise (Cognizant, Infosys, TCS, Accenture, Deloitte, Capgemini), wenn du nur Produktfirmen-Erfahrung willst
>
> **Years of Experience:** 6+ (nicht bei 10 gatekeepen; Senior-Qualität entsteht oft bei 6–8 Jahren)
>
> **Standort:** wie spezifiziert
>
> **Varianten bei zu vielen Ergebnissen:**
> - Tenure-Filter hinzu: 1+ Jahr in aktueller Firma (filtert Job-Hopper + Leute raus, die gerade vom Wettbewerb eingestellt wurden)
> - Standort-Radius enger
> - Spezifisches Industriesignal hinzu (FinTech / HealthTech / etc.)
>
> **Varianten bei zu wenigen Ergebnissen:**
> - Einen Must-have-Skill streichen, als preferred behalten
> - Auf Mid-Level erweitern (oft Senior-Qualität)
> - Company-Filter lockern
>
> **False-Positives, auf die zu achten ist:**
> - „Senior" im Titel bei Firmen, wo Senior 2 YOE heißt (Consulting, Agenturen)
> - Backend Engineers, die nur Python oder Java machen (dein Stack ist Node) — in der Profil-Detail verifizieren
> - Wer „Open to Work"-Green-Ring AND unter 1 Jahr in aktueller Firma hat — könnte Job-Hopper sein; könnte starker Layoff-Kandidat sein. Sorgfältig lesen.

### LinkedIn Recruiter — häufige Boolean-Patterns

| Use Case | String-Beispiel |
|---|---|
| Leute finden, die spezifische Tools nutzen | `("Datadog" OR "PagerDuty") AND ("Kubernetes" OR "EKS")` |
| Leute finden, die auf Konferenzen SPRECHEN | `(speaker OR keynote OR "spoke at")` |
| OPEN-SOURCE-Contributors finden | `("open source" OR "OSS" OR github)` |
| Leute aus einer spezifischen Firmenfamilie finden | `("ex-Stripe" OR "former Stripe" OR "previously at Stripe")` |
| Recruiter:innen und Trainer:innen ausschließen | `NOT (recruiter OR "talent acquisition" OR trainer OR "tech evangelist")` |

---

## Teil 3 — Öffentliche LinkedIn-Suche

Für wenn du außerhalb von Recruiter bist oder ergänzt.

### Das Format

LinkedIns Keywords-Feld akzeptiert Boolean, ist aber eingeschränkter. Keine verschachtelten Klammern über zwei Ebenen hinaus. Quoted Phrases funktionieren.

```
("Senior Backend Engineer" OR "Senior Software Engineer") AND ("Node.js" OR Typescript) AND Postgres NOT recruiter
```

Kombiniert mit den Standort- und Aktuelle-Firma-Filtern in der UI kommt das überraschend weit.

### X-Ray Google Searches (wenn LinkedIn-Suche gated ist)

Das Google-X-Ray gibt dir Ergebnisse, die LinkedIn vor ausgeloggten Nutzer:innen verstecken könnte.

```
site:linkedin.com/in/ ("Senior Backend Engineer" OR "Senior Software Engineer") "Node.js" "Postgres" "San Francisco" -intitle:"profiles" -inurl:dir/
```

Varianten:

- `-intitle:"profiles"` hinzufügen, um LinkedIn-Directory-Seiten zu überspringen
- `"open to work"` hinzufügen, um Leute zu finden, die Offenheit signalisieren
- `"intern"` ohne Negation — der Negativ `-intern` filtert Junior-Profile raus

---

## Teil 4 — GitHub-Sourcing

GitHub ist, wo Senior Engineers tatsächlich leben. Das Signal ist im Code, nicht in der Bio.

### Such-Patterns

**Nach Sprache + Standort:**
```
location:Toronto language:typescript followers:>50
```

**Nach Open-Source-Beitrag zu einem spezifischen Repo:**
- Zum Repo gehen
- „Insights" → „Contributors" klicken
- Nach Commits im letzten Jahr sortieren
- Top-Contributors-Profile auf Hiring-Signale cross-referenzieren

**Nach jüngster Aktivität:**
```
location:"San Francisco" language:rust followers:>100
```
Dann nach „Most followed" filtern oder den Contributions-Graph auf jüngste Aktivität anschauen.

**Leute finden, die Tutorials oder Longform geschrieben haben:**
- Twitter/X nach GitHub-Repos suchen: `from:@person github.com/`
- Oder Google: `site:github.com "tutorial" "production" "we built"`

### Worauf in einem GitHub-Profil zu achten ist

- Pinned Repos mit READMEs, die GUT lesen — Engineer-mit-Kommunikationsskill-Signal
- Jüngste Aktivität (Contributions in letzten 3 Monaten)
- Mix aus eigenen Projekten + OSS-Beiträgen zu bekannten Projekten
- Follower > 50 ist ein weiches Signal für Community-Präsenz
- Bio, die eine aktuelle Firma nennt (spart Cross-Reference)

### Was KEIN Signal ist

- Hohe Repo-Anzahl allein — die meisten sind Forks
- „AWS Certified"-Badges in der Bio — Papiersignale
- Stars auf ihren Projekten ohne Commits in 2 Jahren

---

## Teil 5 — Das Sourcing-Playbook

Wo welche Seniority für welche Rollenfamilie zu finden ist. Die ehrliche Antwort ist immer „kommt drauf an", aber das Playbook engt es ein.

### Engineering

| Seniority | Primärquelle | Sekundärquelle | Was funktioniert |
|---|---|---|---|
| Junior | LinkedIn (Recent Grads + Bootcamp) | Bootcamp-Alumni-Netzwerke (Bloc, App Academy, Lambda, etc.) | Direkte Outreach, aber niedrigere Antwortraten erwarten |
| Mid | LinkedIn Recruiter | GitHub (aktive Contributors) | Spezifische Projekte in Outreach referenzieren |
| Senior | GitHub > LinkedIn | Konferenz-Speaker, OSS-Contributors | Peer-tonige Outreach, technische Spezifität erforderlich |
| Staff/Principal | Referrals + GitHub + Twitter/X | LinkedIn funktioniert selten — sie ignorieren InMails | Stell jemanden ein, den sie respektieren; die warme Intro ist 10× die InMail |

Für Senior+ Engineers: hör auf, zuerst auf LinkedIn zu sourcen. Beginne mit ihrem EIGENEN Content — Blogposts, OSS-Beiträge, Konferenzvorträge. Ihr LinkedIn ist der letzte Ort, den sie updaten.

### Design (Product / Brand)

| Seniority | Primärquelle | Sekundärquelle | Was funktioniert |
|---|---|---|---|
| Junior | LinkedIn + Dribbble / Figma Community | Bootcamp-Alumni | Portfolio-Spezifität |
| Mid | Dribbble + Figma Community + LinkedIn | Twitter-Design-Community | Spezifische Arbeit komplimentieren |
| Senior | Personal Sites + Dribbble + Twitter | LinkedIn (niedrige Priorität) | Ihre tatsächliche Arbeit referenzieren, nicht die Rolle |
| Director | Referrals + Twitter | LinkedIn | Nur warme Intros |

Designer:innen pflegen Portfolios, kein LinkedIn. Das Portfolio IST die Quelle.

### Sales (AE, SDR, CS)

| Seniority | Primärquelle | Sekundärquelle | Was funktioniert |
|---|---|---|---|
| SDR | LinkedIn + RepVue + Bravado | Networking Events | Comp-Transparenz, Wachstumspfad |
| Mid AE | LinkedIn (hoch aktiv hier) | RepVue (für ICP-Fit-Research) | Spezifisches Territorium + Comp-Range |
| Senior AE | LinkedIn + Referrals | Branchen-Slacks (RevGenius, Pavilion) | Quota-Attainment-Daten + Produkt-Spezifika |
| VP/CRO | Referrals + Investor-Netzwerk | Heavy Executive Search | Warme Intro erforderlich; Cold Outreach ist 1–2 % |

LinkedIn ist, wo Sales lebt. Ihre gesamte professionelle Identität ist dort.

### Operations / G&A

| Seniority | Primärquelle | Sekundärquelle | Was funktioniert |
|---|---|---|---|
| Junior/Mid | LinkedIn + Pavilion (für Ops) | Branchengruppen (z. B. People Geeks für HR) | Spezifische Scope-Beschreibung |
| Senior | LinkedIn + Referrals + Pavilion | Branchencommunities | Real-Talk zum Startzustand |
| Director/VP | Referrals + Executive Search | LinkedIn (niedriger ROI) | Netzwerk-Einführungen |

Ops-Leute verstecken sich oft auf LinkedIn, weil sie ständig rekrutiert werden. Communities sind höheres Signal.

### Product (PM, Product Leadership)

| Seniority | Primärquelle | Sekundärquelle | Was funktioniert |
|---|---|---|---|
| APM/Mid | LinkedIn | Mind the Product Community | Produkt-Spezifika, Wachstumspfad |
| Senior | LinkedIn + Mind the Product + Lenny's Newsletter Circle | Twitter (aktive PMs posten hier) | Domain-Spezifität |
| Director/VP | Referrals + Reforge-Alumni | LinkedIn (niedrige Priorität) | Warme Intros |

PMs in Senior-Rollen sind oft sehr online — Twitter, Substacks, Podcast-Auftritte. Referenziere, was sie öffentlich geteilt haben.

---

## Teil 6 — Wo diverse Kandidat:innen finden (ohne Dog-Whistling)

Diese Sektion ist für Recruiter:innen, die ihren Funnel verbreitern wollen, ohne performativen Bullshit.

### Das Prinzip

Diverse Pipelines kommen davon, an Orten zu sourcen, die nicht deine Default-Quellen sind. Sie kommen nicht von Suchstrings, die nach geschützten Kategorien filtern (in den meisten Jurisdiktionen illegal, auch wenn die Plattform es zulässt).

### Communities, die helfen

- **Engineering:** Out in Tech, Lesbians Who Tech, /dev/color, Black Tech Pipeline, Latinas in Tech, Women Who Code
- **Design:** People of Craft (POC-Designer:innen), Hexagon (Frauen+ in Design)
- **Sales:** Sistas In Sales, Hispanic Star, Women in Sales Everywhere
- **Product:** Women in Product, Product-Manager-Netzwerke in größeren Communities

Die meisten haben Job Boards, Slack-Workspaces und Event-Kalender. Du bekommst 10× mehr Signal, wenn du eine Rolle in einer dieser Communities postest, als wenn du nochmal eine LinkedIn-Suche laufen lässt.

### Was du NICHT tust

- „Diversity" oder „Frauen" auf LinkedIn suchen — vielerorts illegal, funktioniert auch dort nicht, wo legal
- Kandidatenfotos auf sichtbare Diversität filtern — illegal, biased, Daten sind ohnehin unzuverlässig
- Namen als Proxy für Ethnizität nutzen — wild biased und häufig falsch
- „Wir sind ein inklusiver Workplace"-Boilerplate unten an einer JD, die sonst voll mit „Rockstar Ninja"-Sprache ist — Kandidat:innen sehen das sofort durch

### Was funktioniert

- In den oben genannten Communities sourcen
- Einen tatsächlich inklusiven Workplace haben (Elternzeit, flexible Arbeit, echte ERGs, diverse Leadership) und in den JDs ehrlich davon erzählen
- Equitabel zahlen (Gehaltsranges publizieren; Pay-Banding nach Job-Level, nicht nach Verhandlungs-Aggressivität)
- Funnel-Diversity in jeder Stufe tracken — sourced, gescreent, interviewt, Offer, akzeptiert. Der Drop-off sagt dir, wo es kaputt ist.

---

## Teil 7 — Sourcing-Kadenz + Outreach-Metriken

### Realistische Zahlen

Für eine Senior-Engineering-Rolle bei einem Series-B-Unternehmen mit anständiger Brand:

- Sourcing-Liste von 50 Kandidat:innen
- Outreach-Antwortrate: 15–25 % (3-Zeilen-Nachricht mit Comp + spezifischem Grund)
- Phone-Screen-Conversion: 50 % der Antworten
- First-Interview-Conversion: 50 % der Screens
- Offer: 1–2 aus den ursprünglichen 50

Wenn deine Antwortrate unter 10 % ist, liegt es fast immer an:
- Generischer Outreach (kein spezifischer Grund für diese:n Kandidat:in)
- Keine Comp-Range genannt
- Subject Line („Spannende Opportunity bei…")
- Off-Brand-Outreach für die Seniority (Template-tonige Outreach an Staff Engineer)

Wenn deine Antwortrate über 30 % ist, sourcst du vielleicht zu eng. Weite den Pool.

### Outreach-Kadenz

- Tag 1: Erste Nachricht
- Tag 5–7: Ein Follow-up (anderer Winkel — z. B. erste Nachricht führte mit dem Problemraum; Follow-up führt mit dem Team)
- Tag 14: Finales Follow-up (kurz — „bin noch hier, noch interessiert, kein Stress wenn nicht der richtige Zeitpunkt")
- Dann stopp. Drei Nachrichten, dann die Tür offen lassen.

Nach drei wirst du zur Belästigung. Recruiter:innen, die über drei hinausgehen, verbrennen die Brand für alle, die bei dieser Firma einstellen.

---

## Häufige Boolean- und Sourcing-Fehler, die das Kit markieren wird

- **Zu viele ANDs.** Jedes AND verengt. 5+ AND-Klauseln liefert meist unter 50 Ergebnisse, die meisten nicht, was du willst.
- **Keine NOT-Klauseln.** Du ertrinkst in Trainer:innen, Recruiter:innen und Consultants. Immer ausschließen.
- **Title-only-Searches.** „Senior Backend Engineer" variiert wild zwischen Firmen. Such auch auf Skills + Outcomes.
- **LinkedIn nach Senior+ Engineers durchsuchen.** Ihr LinkedIn ist veraltet. Source auf GitHub, Konferenz-Rostern, OSS-Contributor-Listen.
- **Kein Standort-Qualifier auf einer Remote-Rolle.** Selbst „remote-anywhere" hat meist Zeitzonen-Constraints. Filter nach Zeitzone, nicht nur nach remote.
- **Dieselben 50 LinkedIn-Profile sourcen, die jede:r andere Recruiter:in auch sourct.** Wenn dein Pool die erste Seite einer generischen LinkedIn-Suche ist, konkurrierst du mit 10 anderen Recruiter:innen. Geh tiefer.
