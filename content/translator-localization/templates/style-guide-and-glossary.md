# Style Guide, Glossary, Locale Notes, Quote Templates

The reference doc. Four templates with worked examples.

---

## 1. Style guide template (10 sections)

Use as scaffolding to draft a target-locale style guide from client samples.

```
STYLE GUIDE — [BRAND NAME] — [TARGET LOCALE, e.g., ES-MX]
Source: [e.g., EN-US]
Version: [date]

1. REGISTER
   Rule: [e.g., informal "tú" across all consumer-facing touchpoints; formal "usted" reserved for legal and onboarding compliance copy]
   Right: "Tu cuenta está lista."
   Wrong: "Su cuenta está lista." (in consumer marketing)

2. TONE
   Rule: warm, capable, slightly direct — mirror the EN brand's "smart friend, not a finance bro" register
   Right: "Llevamos tus números. Tú llevas tu vida."
   Wrong: "Maximice su potencial financiero." (corporate-stiff)

3. GRAMMAR CHOICES
   Rule: prefer short sentences. Active voice. Comma usage per RAE conventions. No Oxford comma equivalent.
   Right: "Ahorra automáticamente. Vive con menos estrés."
   Wrong: "Mediante el uso de nuestra plataforma, podrá usted, gracias a sus funcionalidades..."

4. NUMBERS, DATES, CURRENCY
   Rule: decimal comma (1.234,56). Date format DD/MM/AAAA. Currency: MX$1,234.56 written, $1,234.56 MXN in tables. 24-hour clock for technical contexts, 12-hour for consumer.
   Right: "El plan cuesta $199 MXN al mes."
   Wrong: "El plan cuesta MXN 199.00 / month."

5. CAPITALIZATION
   Rule: sentence case for everything except proper nouns. Product names retain English capitalization. UI button labels: sentence case.
   Right: "Crear cuenta nueva"
   Wrong: "Crear Cuenta Nueva"

6. PRODUCT AND BRAND NAMES
   Rule: [Brand] kept in source. Product features: translated unless market research indicates retention (e.g., "Smart Save" → "Ahorro Inteligente").
   Right: "Activa Ahorro Inteligente desde tu panel de [Brand]."
   Wrong: "Activa Smart Save desde tu panel de [Brand]." (in MX market)

7. TERMINOLOGY APPROACH
   Rule: prefer native MX-Spanish terms over anglicisms. Anglicisms accepted: "email," "online," "app." Anglicisms refused: "feature" (use "función"), "fee" (use "comisión" or "cargo").
   Right: "Te enviamos un correo con los detalles."
   Wrong: "Te mandamos un email con la feature nueva."

8. TYPOGRAPHY AND PUNCTUATION
   Rule: comillas angulares (« ») in formal contexts; comillas inglesas (" ") accepted for digital. Em-dash with spaces — like this. Two spaces never used.
   Right: «Sus términos», o "sus términos" en digital.
   Wrong: "Sus términos" en contexto formal impreso.

9. CULTURAL ADAPTATIONS
   Rule: avoid US holiday references unless localized (Thanksgiving → omit or replace). Sports metaphors: soccer-first (futbol), avoid baseball-as-default. Don't use "huevos" colloquially in payment contexts.
   Right: "Como un buen tiro de tres en el último minuto."
   Wrong: "Como un home run en la novena entrada." (works in MX but reads less universally)

10. FORBIDDEN LANGUAGE
    - "Coger" in payment/action verbs (regional — strong sexual connotation in MX, neutral in ES)
    - "Ahorita" in formal/legal copy (too colloquial)
    - Any reference to "el ama de casa" — outdated gender framing
    - "Soltar tu dinero" — implies losing it
    - "Smart" untranslated when "Inteligente" works
```

---

## 2. Glossary template

```
| SOURCE | TARGET | POS | DOMAIN | RATIONALE | FORBIDDEN | CONTEXT |
| --- | --- | --- | --- | --- | --- | --- |
| Account | Cuenta | n | UI/general | Standard SaaS convention; "perfil" reserved for user-profile-specific contexts | "Perfil" (means profile, not account); "Sesión" (means session) | "Crea tu cuenta gratis." |
| Submit | Enviar | v | UI | "Enviar" works for forms and messages; "Aceptar" reserved for confirmations | "Someter" (Latinate/legal, wrong register); "Mandar" (colloquial, ambiguous) | Button on signup form: "Enviar" |
| Fee | Comisión | n | financial | Brand uses "comisión" for transaction fees, "cargo" for late/penalty fees | "Tarifa" (means rate/tariff); "Cuota" (means recurring dues, not transaction fee) | "Sin comisión por transferencia." |
| Dashboard | Panel | n | UI | "Panel" preferred over "tablero" in MX SaaS context | "Tablero" (regional, less standard); "Dashboard" (untranslated, against style guide) | "Abre tu panel para ver el resumen." |
| Onboarding | Bienvenida / Inducción | n | product/HR | "Bienvenida" for consumer; "Inducción" for B2B/HR — context-dependent | "Onboarding" untranslated (refused per style guide §7) | "Completa tu bienvenida en 3 pasos." |
| Plan (subscription) | Plan | n | financial/UI | English cognate works in MX SaaS; widely accepted | "Suscripción" (broader term, use for the subscription concept) | "Elige el plan que más te conviene." |
```

The RATIONALE column is mandatory. Empty rationale = the entry isn't ready for the termbase.

---

## 3. Per-string locale notes — software

Worked example for a project management SaaS, EN-US > FR-FR.

```
STRING ID: dashboard.welcome
SOURCE: "Hey {username}, welcome back!"
NOTES FOR LINGUIST:
- Placeholder {username} must remain in same position; do not translate
- Register: informal "tu" matches brand voice for consumer-facing copy
- Length: max 60 characters in UI per dev team
- "Hey" doesn't have a clean FR-FR equivalent — "Salut" is too casual, "Bonjour" too formal; recommend "Re-coucou {username}" or "Content de te revoir, {username}"
- Punctuation: FR convention requires a space before the exclamation mark

STRING ID: tasks.count
SOURCE: "You have 3 new tasks"
NOTES FOR LINGUIST:
- This needs ICU MessageFormat in code, not just translation — dev team has been notified
- Plural forms required for FR: zero / one / other
  - 0: "Vous n'avez aucune nouvelle tâche"
  - 1: "Vous avez 1 nouvelle tâche"
  - other: "Vous avez {count} nouvelles tâches"
- Register: "vous" (this string appears in a notifications context where formal is preferred per style guide)

STRING ID: button.submit
SOURCE: "Submit"
NOTES FOR LINGUIST:
- Used in 4 places: signup form, password reset, feedback form, support ticket
- Recommend "Envoyer" across all four
- Length: max 12 characters in narrow button cells

STRING ID: delete.confirm
SOURCE: "Delete 1 project? This cannot be undone."
NOTES FOR LINGUIST:
- Plural form required for "1 project" — ICU plural needed
- "This cannot be undone" — convention is "Cette action est irréversible." not literal translation
- Register: "vous" (destructive action; formal preferred even in informal brand voice)
```

---

## 4. Per-string locale notes — game text

Worked example for an action-RPG, EN-US > JA.

```
LINE ID: npc.blacksmith.greeting
SOURCE: "Took you long enough."
CHARACTER: Hilda, blacksmith, 50s, gruff but warm; speaks down to the player slightly because she's known the family for generations
NOTES FOR LINGUIST:
- Length restricted: 18 chars for subtitle; lip-flap-synced for voiced version
- Register: ぞんざい男言葉 / casual feminine — Hilda uses 「だね」 endings and slight 「だろ」 informality, NOT 「ですわ」 or formal feminine
- Sarcasm marker: the line is mild teasing, not actual annoyance — needs to land warm
- Recommended: 「ようやく来たねぇ。」 or 「遅かったじゃないか。」

LINE ID: combat.bark.crit
SOURCE: "Eat this!"
CHARACTER: Player character (customizable; voiced separately by gender option)
NOTES FOR LINGUIST:
- TWO recordings needed: masculine and feminine player voice options
- Length: very short — 6-8 chars max for action subtitle
- Recommended masc: 「くらえ!」  Recommended fem: 「これでも!」
- Avoid: 「お食べ!」 (too literal/silly)

LINE ID: cinematic.villain.monologue.07
SOURCE: "You think your family loved you? They left you with me."
CHARACTER: Argath, villain, mid-60s, classically educated, manipulator
NOTES FOR LINGUIST:
- Register: formal 男性語 / scholarly masculine — uses わし or 私 (depending on era setting), 「だ・である」 endings, occasional archaic vocabulary
- Subtext: he's trying to wound, not inform — the line should feel chosen, not casual
- Lip-flap sync: 4 seconds, 2 sentence breaks
- Sensitivity flag: implied family abandonment — read for tone against JP localization sensitivity standards
```

---

## 5. Project quote template

Worked example: medical device documentation, EN-US > DE-DE, 18,000 source words.

```
QUOTE — [CLIENT NAME] — Project ID [###]
Date: [date]
Language pair: EN-US > DE-DE
Domain: Medical device technical documentation
Source word count: 18,000 (verified via memoQ analysis)

BASE
Rate: €0.16/source word
Subtotal: €2,880.00

MARKUP MATRIX
+ Complexity surcharge (medical/technical): +20% = +€576.00
  Rationale: regulated content requires terminology research, MDR alignment, and reviewer credentialing.
+ Rush surcharge: +0% (turnaround inside standard 12 working-day window)
+ Format surcharge: +5% = +€144.00
  Rationale: source includes 14 figures requiring DTP coordination with client design.
+ Rights surcharge: +0% (internal documentation use; no broadcast or perpetual marketing rights)
- Repetition discount (per CAT analysis):
  - 100% TM matches (2,200 words): -€264.00 at 25% rate
  - 95-99% fuzzy (1,400 words): -€89.60 at 60% rate
  - 85-94% fuzzy (800 words): -€38.40 at 70% rate
  - No-match (13,600 words): full rate

NET SUBTOTAL: €3,208.00

TAX/VAT: per client jurisdiction (TBD by client; quote excludes VAT)

TOTAL: €3,208.00

DELIVERY: [date, 14 working days from PO]

INCLUDED:
- One round of translator-side revisions
- Internal QA pass against client style guide
- Terminology research and termbase update (deliverable: updated termbase)
- Source-ambiguity flag list delivered with translation

NOT INCLUDED:
- DTP / layout (quoted separately by client's design team)
- Regulatory review by client's medical/legal team
- Voice talent, narration, or audio
- On-screen text in graphics (translatable text inside images)

PAYMENT TERMS:
Net 30 from invoice date. Invoice issued on delivery.

ASSUMPTIONS TO CONFIRM BEFORE PO:
- DE-DE locale (not DE-AT or DE-CH) — please confirm
- Reference materials: I'll be using the termbase you sent on [date] and the 2023 user manual as voice reference. If a more recent style guide exists, please share before kickoff.
- File handoff: I expect XLIFF from memoQ. If you need another format, surcharge may apply.
```

The markup matrix and the "assumptions to confirm" section are what keep this quote from getting renegotiated mid-project.
