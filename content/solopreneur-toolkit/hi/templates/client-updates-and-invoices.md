# Client Updates और Invoice Nudges

Solo work का boring side — clients को बताना कि आपने क्या किया है, उन्हें pay करने को कहना, और जब वे नहीं करते उन्हें chase करना। यह file वो copy है जो तीनों को बिना एक robot या doormat sounding किए करती है।

---

## Part 1 — weekly client update

Solopreneur work में single highest-leverage email। हर Friday (या जो भी day आप commit करते हैं) clockwork जैसे भेजी जाती है। इनमें से 3 के बाद, आपके client से "hey just checking in" emails रुक जाती हैं। उनका boss उनसे पूछना बंद कर देता है कि project कहाँ है। आप उनके लिए low-anxiety बन जाते हैं।

### Format — maximum पाँच lines

```
**This week:**
- [Concrete deliverable shipped या moved forward]
- [Concrete deliverable shipped या moved forward]

**Next week:**
- [Deliverable]
- [Deliverable]

**Need from you:**
- [Specific decision या asset, एक date के साथ — या "अभी कुछ नहीं"]

**Status:** On track / Watch / Blocked
**Next update:** [Date]
```

### AI को यह prompt paste करें

```
आप Solopreneur Co-Pilot हैं।

[PROJECT NAME] project पर [CLIENT NAME] के लिए एक Friday client update लिखें। Standard 5-line format use करें।

This week मैंने:
- [BULLET 1]
- [BULLET 2]
- [BULLET 3]

Next week मैं कर रहा:
- [BULLET 1]
- [BULLET 2]

मुझे उनसे चाहिए:
- [ASK]

Status: [On track / Watch / Blocked — और अगर On track नहीं तो एक sentence क्यों]

इसे 100 words से कम रखें। Plain language। कोई "I hope this email finds you well" नहीं।
```

### Worked example output

> Subject: Brand refresh — week 2 update
>
> **This week:**
> - First-round visual direction shipped (Figma link, comments open)
> - Positioning workshop notes voice-doc draft में consolidated
>
> **Next week:**
> - आपकी feedback के आधार पर visual direction का Round 2
> - Pitch deck template का First draft
>
> **Need from you:**
> - Figma file पर Tuesday May 21 तक Comments
>
> **Status:** On track
> **Next update:** Friday May 24

उस email को लिखने में 4 minutes लगे। यह आपको next week की "where are we at" conversations के 40 minutes save करेगी।

### जब status Watch या Blocked हो

हमेशा क्यों explain करता एक sentence add करें। केवल "Watch" नहीं। Examples:

- **Watch — Tuesday से marketing team से copy का wait कर रहा; अगर Monday तक land नहीं हुई तो next week reshuffle करूँगा।**
- **Blocked — staging environment अभी provision नहीं हुआ। मैंने Wed आपके dev lead को email किया; क्या आप उन्हें ping कर सकते हैं?**

Blocker को name करना client को बताता है कि उन्हें कुछ करना है। Vague "watch" उन्हें anxious बनाता है।

---

## Part 2 — Invoice copy

Invoice खुद ज़्यादातर एक form है (आपका invoicing tool — Stripe, FreshBooks, HoneyBook, Wave, QuickBooks, whatever — इसे generate करता है)। COPY जो invoice के around जाती है वो बदलती है।

### Standard invoice send email

```
Subject: Invoice [###] — [Project name]

Hi [Name],

Invoice [###] attached / नीचे linked है। Summary:
- [Line item 1]: $X
- [Line item 2]: $X
- **Total:** $X (Net 14)

आप [methods accepted] से pay कर सकते हैं। अगर आपकी AP team को एक अलग format चाहिए, बस मुझे बताएँ।

Thanks,
[You]
```

Notes:

- **Email में net terms state करें**, सिर्फ invoice PDF पर नहीं। AP teams को यह writing में चाहिए।
- **"Thanks for your business!" न लिखें** — यह needy पढ़ता है। अकेला "Thanks" fine है।
- **Invoice के लिए apologize न करें।** यह काम है।

### AI को यह prompt paste करें

```
आप Solopreneur Co-Pilot हैं।

[CLIENT NAME] के लिए एक invoice send email लिखें। Project: [NAME]। Total: [AMOUNT] CAD/USD। Terms: Net [7/14/30]। Payment methods: [STRIPE/INTERAC/ACH/CHEQUE/ETC]।

70 words से कम रखें। कोई "Thanks for your business!" नहीं। कोई apologies नहीं।
```

---

## Part 3 — Late-payment reminders

Three-tier escalation। हर tier एक separate email है, अपने day पर भेजी गई। कभी combine न करें।

### Day 7 past due — friendly nudge

Tone: oversight assume करें, bad faith नहीं। ज़्यादातर invoices जो Net 14 के past slip होते हैं किसी के inbox में sitting हैं; malicious नहीं, बस buried।

```
Subject: Re: Invoice [###]

Hi [Name],

Quick nudge — [date] से invoice [###] [date] को due थी, और मैंने इसे आते नहीं देखा। मैं जानता हूँ इन्हें miss करना कितना easy है। क्या आप AP के साथ check in कर सकते हैं और मुझे बता सकते हैं कब expect करूँ?

अगर आपके end पर एक hold-up है, इसे बात करने को happy हूँ।

Thanks,
[You]
```

### Day 14 past due — firmer, policy mentions

Tone: अभी भी polite। Client अब जानता है कि आप track कर रहे हैं। अगर आपकी SOW में एक late-fee policy है, यहाँ वो दिखती है।

```
Subject: Invoice [###] — still outstanding

Hi [Name],

Following up — invoice [###] अब 14 days past due है। हमारी SOW के अनुसार, 14 दिनों के बाद एक 1.5% late fee applies; वो attached updated invoice में add की गई है।

अगर आपके side पर इसे unblock करने में मैं कुछ कर सकता हूँ, मुझे बताएँ। नहीं तो मैं next week check back करूँगा।

Thanks,
[You]
```

अगर आपके पास एक late-fee clause नहीं है, वो line drop करें। एक bluff न करें — आपके client के पास SOW open हो सकता है।

### Day 30 past due — formal, work pauses

Tone: अभी भी professional, लेकिन consequences real और stated हैं। आप work pause कर रहे हैं, और आप एक phone call चाहते हैं।

```
Subject: Invoice [###] — pausing work

Hi [Name],

Invoice [###] अब 30 days past due है। [date] के as of, मैं balance settled होने तक [PROJECT] पर further work pause कर रहा हूँ। मैं rather न करूँ — चलिए इसे sort करने को इस week एक 15-minute call पर हों।

मुझे जो times काम करते हैं: [3 options]।

अगर यह AP के लिए गलत contact है, please loop in जिससे मुझे बात करनी चाहिए।

Thanks,
[You]
```

### क्या आप नहीं करते

- पाँचवी बार "Just following up again..."। Day 30 के बाद, आपने तीन escalating emails भेजी हैं। चौथी call है, एक चौथी email नहीं।
- Passive-aggressive line endings ("I assume this isn't a priority?")
- Threats जो आप back up नहीं कर सकते ("I'll have to involve my lawyer.") — जब तक आप actually नहीं करेंगे, और जब तक amount justify नहीं करता।
- Public shaming। इसके बारे में tweet न करें, post न करें। Reputation दोनों तरह काम करती है।

### Email से beyond कब escalate करें

अगर 45 days past due और कोई response नहीं: एक final email भेजें कहते हुए आप इसे एक collections service या small-claims process को hand कर रहे हैं, फिर actually करें। Action-without-warning unprofessional है। हमेशा एक final email action और date naming।

---

## Part 4 — "scope creep" mid-project email

Invoicing के adjacent। जब client "just one more thing" के लिए माँगे जो SOW में नहीं है।

### Template

```
Subject: Re: [उनकी request]

Hi [Name],

[नई चीज़] देखने को happy हूँ। Heads up — यह उस scope के बाहर है जिस पर हम SOW में agreed थे (Section 2: Out of Scope)। मैं इसे एक Change Request के रूप में handle कर सकता हूँ:

- Option 1: इसे $[X] के flat add-on के रूप में add करें। Timeline में [Y] days adds होते हैं।
- Option 2: हमारे current scope finish करने के बाद इसे Phase 2 के लिए park करें।

आप किस way जाना चाहते हैं?

Thanks,
[You]
```

Note क्या यह template नहीं करता:

- यह "sure, मैं इसे squeeze in कर सकता हूँ" नहीं कहता। वो है कैसे scope creep आपका margin खाता है।
- यह नए work के लिए charge करने के लिए apologize नहीं करता।
- यह client को lecture नहीं देता कि scope creep क्या है। बस इसे name करता है और options offer करता है।

---

## Cheat sheet — कब क्या भेजें

| Situation | यह भेजें |
|---|---|
| हर week का end | Weekly update (5 lines) |
| Invoice ready | Invoice send email (70 words से कम) |
| 7 days past due | Friendly nudge |
| 14 days past due | Firmer reminder, policy mention |
| 30 days past due | Pausing-work email + एक call के लिए ask |
| 45 days past due | Next action naming Final email |
| Client out-of-scope माँगे | Change Request offer (2 options) |

इन्हें अपने snippets manager (TextExpander, Raycast, Alfred, whatever) में रखें। एक ही email बार-बार लिखने का friction वो है जो solopreneurs को invoices slide करने देता है।

---

## Common mistakes जो kit flag करेगी

- "Just checking in" — एक specific status या question से replace करें
- "I hope this email finds you well" — cut करें, यह कुछ add नहीं करता
- "Sorry to bother you" — owed money होने के लिए कभी apologize न करें
- Reminders जो एक dollar amount या invoice number name नहीं करते — specific रहें
- Next update के लिए date के बिना Updates — हमेशा include करें
- "On track" का Status जब कुछ actually slip हो रहा है — इसे Watch कहें
