# Policy Draft Templates

Five policy templates with worked example output. Use the prompt blocks to generate; use the worked examples to gut-check.

**Every policy below is a working draft. Not legal advice. Consult employment counsel for your jurisdiction before publishing or distributing.**

---

## How to use this file

1. Find the policy type that matches what you need
2. Copy the prompt block
3. Replace the bracketed inputs with your company's details and jurisdiction
4. Paste into your AI tool (after loading `optimization-pack.md`)
5. Compare against the worked example to gut-check
6. Send to employment counsel for jurisdiction-specific review BEFORE publishing

---

## 1. PTO / Paid Time Off Policy

### Prompt

```
Draft a PTO policy.

Company: [name, size, industry]
Jurisdiction: [state(s) / province(s) — list all where you have employees]
HRIS: [BambooHR / Rippling / Gusto / ADP Run / etc.]

PTO model:
- Accrual or front-loaded? [accrual / front-loaded / unlimited]
- If accrual: [days per year / accrual rate / cap]
- If front-loaded: [days as of January 1 / hire-date adjusted]
- If unlimited: [governance — manager approval, minimum required usage]

Roll-over and payout:
- Year-end roll-over: [Y/N — if Y, cap]
- Payout at separation: [varies by state — flag for counsel]

Sick / vacation distinction:
- Combined? [Y/N]
- If separate, sick days: [count]

Holidays:
- Company-recognized holidays: [list]
- Floating holidays: [count]

Bereavement / jury duty / military / family leave:
- Bereavement: [days, who qualifies]
- Jury duty: [paid / unpaid, length]
- Military leave: [as required by law — flag]
- Parental / family leave: [refer to separate policy or note this is the place]

Approval workflow:
- Request lead time: [days]
- Manager approval required: [Y/N]
- HRIS request flow: [HRIS name]

Constraints:
- Plain English, employee-readable
- Dual disclaimer (header + footer)
- Flag California, Massachusetts, Maine, Colorado, Illinois, DC, NY paid sick/leave laws for counsel
- Flag Ontario, Quebec, BC ESA requirements for counsel
```

### Worked example output

**Inputs used:** 85-person tech startup, headquartered in Austin, TX. Employees in TX (60), CA (15), NY (8), CO (2). HRIS: BambooHR. Front-loaded PTO model — 20 days as of Jan 1 (pro-rated for new hires). Combined sick + vacation. Roll-over cap: 5 days. Payout: state-dependent (flag for counsel). 11 company holidays + 2 floating.

**Output:**

```
PTO POLICY
Effective: 2026-01-01 | Last reviewed: 2025-11-20 | Owner: People Team

**Working draft. Not legal advice. Consult employment counsel for each jurisdiction (TX, CA, NY, CO) before publishing or distributing.**

PURPOSE
We want you to take time off. Real time off — to rest, to handle things at home, to be sick without guilt. This policy explains how we structure that time and how to request it.

WHO THIS APPLIES TO
All full-time employees in the US. Part-time employees accrue pro-rated PTO based on scheduled hours. Independent contractors are not covered.

HOW IT WORKS
You get 20 days of PTO front-loaded on January 1 each year. If you're hired mid-year, you get a pro-rated amount based on your start date (we calculate it in BambooHR — you'll see it on your profile).

Our PTO is combined — sick days, vacation days, mental health days, and personal days all come from the same bucket. We trust you to use it for what you need.

In addition, we observe 11 company holidays and give you 2 floating holidays per year (use them for cultural, religious, or personal observances we don't cover).

REQUESTING TIME OFF
1. Request through BambooHR at least 5 business days in advance for any single day, or 2 weeks in advance for anything 3+ days
2. Your manager approves or declines (usually approves — declines should be rare and explained)
3. Emergencies: text your manager and submit the BambooHR request when you're back. We're not going to count exact start time on a sick day.

ROLL-OVER AND CAP
Unused PTO rolls over up to 5 days into the following year. Beyond 5 days, the rest expires on December 31.

If your role makes it hard to take time off, that's a workload problem, not a benefit. Talk to your manager.

PAYOUT AT SEPARATION
Payout of unused PTO at separation varies by state. We'll calculate per applicable state law and your specific situation at separation. **Verify with employment counsel.**

OTHER LEAVE
- **Bereavement:** 5 days for immediate family (parent, sibling, spouse/partner, child, in-laws). 2 days for extended family. Additional time available unpaid; talk to your manager.
- **Jury duty:** paid time off for the full duration of jury service. Submit your summons through BambooHR.
- **Military leave:** as required by USERRA and applicable state law. Verify with HR.
- **Parental leave:** see Parental Leave Policy.
- **State-mandated paid sick leave:** for employees in CA, NY, CO, and any other state with paid sick leave requirements, applicable state law overlays this policy. **Verify with counsel for your jurisdiction.**

WHAT HAPPENS IF YOU NEED MORE
Talk to your manager and HR. Unpaid leave is possible. Short-term disability may apply for medical situations. Family and medical leave (FMLA) may apply if eligible (50+ employees within 75 miles, 12+ months of employment, 1,250+ hours worked in the prior 12 months).

ANTI-RETALIATION
Using PTO, requesting accommodation, or asking questions about this policy will never be held against you. Retaliation in any form is prohibited.

QUESTIONS
Slack #people or email people@[company].com. For interpretation of legal obligations, consult counsel of your own.

---
**This policy is not legal advice. Verify with employment counsel for each jurisdiction (TX, CA, NY, CO) before publication. PTO payout at separation in particular varies significantly by state. Sick leave requirements in CA, NY, and CO overlay this policy.**

---
Things to verify before sending:
- PTO payout at separation for each state (TX no requirement, CA must pay all earned, NY/CO state-specific)
- Whether the 5-day roll-over cap is enforceable in CA (CA earned vacation cannot expire — get counsel view)
- CA Healthy Workplaces Healthy Families Act (paid sick leave) — confirm combined PTO model meets sick-leave requirements
- NY Earned Safe and Sick Time Act compliance
- CO Healthy Families and Workplaces Act compliance
- Bereavement leave laws in CA (jury duty + bereavement)
```

---

## 2. Remote Work Policy

### Prompt

```
Draft a remote work policy.

Company: [name, size, industry]
Jurisdiction: [state(s) / province(s)]

Work model:
- Fully remote / hybrid / RTO with exception path
- If hybrid: [days/week in office, which days, who decides]
- Geographic restrictions: [must work from approved states/provinces? international permitted?]

Workspace standards:
- Equipment provided: [laptop, monitor, peripherals, allowance amount]
- Home office stipend: [one-time / monthly / annual amount]
- Internet / phone reimbursement: [Y/N, amount]

Working hours:
- Core hours: [time window]
- Time zone expectations: [must overlap with [TZ] team X hours]
- Right to disconnect: [Ontario Bill 88 if applicable, internal practice]

Security:
- VPN required: [Y/N]
- MFA required: [Y/N]
- Sensitive data: [where it can/cannot be processed]
- Public wifi: [permitted with VPN / not permitted for sensitive work]

Tax / payroll implications:
- Multi-state / multi-province employment: [where we're set up to employ]
- Temporary out-of-state work: [days threshold before notification]
- International work: [permitted? duration cap? counsel-required]

Performance:
- Performance is measured by output, not hours present
- Manager touchpoints: [cadence]

Constraints:
- Plain English
- Dual disclaimer
- Flag Ontario Bill 88 (disconnect, electronic monitoring at 25+ employees)
- Flag CA, NY, IL tax/payroll thresholds for counsel
```

### Worked example output

**Inputs used:** 65-person professional services firm, headquartered in Toronto, ON. Employees in ON (50), BC (3), QC (3), US: CA (8), NY (4). Hybrid model: 3 days/week in office for Toronto employees; remote employees fully remote. Equipment provided. $750 one-time home office stipend. Internet $75/month. Core hours 10 AM – 3 PM ET.

**Output:**

```
REMOTE & HYBRID WORK POLICY
Effective: 2026-09-01 | Last reviewed: 2026-08-12 | Owner: People Team

**Working draft. Not legal advice. Consult employment counsel for each jurisdiction (ON, BC, QC, CA-US, NY-US) before publishing. Ontario Bill 88 disconnect policy and electronic monitoring policy obligations apply at our headcount.**

PURPOSE
We've built a team that works across cities and time zones. This policy explains how we structure where and how we work, what equipment and reimbursements we provide, and what we expect.

WHO THIS APPLIES TO
All full-time employees. Independent contractors operate under their own agreements.

WORK MODELS

**Toronto-based employees (hybrid):**
Three days per week in our Toronto office. Tuesday and Thursday are core in-office days for everyone. Pick a third day in coordination with your team. Office hours: 8 AM – 6 PM ET.

**Out-of-Toronto employees (fully remote):**
Work from your home office in your approved jurisdiction. You're welcome to visit the Toronto office anytime; we'll reimburse travel for required in-office events.

**Geographic restrictions:**
You must work from a jurisdiction where we're set up to employ you. Approved jurisdictions: Ontario, BC, Quebec, California, New York. Working from outside an approved jurisdiction for more than 14 consecutive days requires advance approval from HR — there are tax, payroll, and employment law implications that need to be cleared first.

International work from a non-Canadian, non-US location is not permitted without case-by-case approval, including for vacation/working-from-elsewhere arrangements over 14 consecutive days.

WORKSPACE & EQUIPMENT

We provide:
- Laptop (MacBook Pro by default; Windows alternative on request)
- External monitor on request
- Keyboard, mouse, and headset

Reimbursements:
- One-time home office stipend: $750 CAD (or USD equivalent for US employees), reimbursed through Gusto/ADP at start
- Internet reimbursement: $75 CAD/month (or USD equivalent), submitted monthly
- Cell phone reimbursement: $40 CAD/month

WORKING HOURS

Core hours: 10 AM – 3 PM Eastern Time. During these hours, you should be reachable on Slack and available for meetings.

Outside core hours, work the schedule that fits your role and life. We don't track start and stop times.

**Right to disconnect (Ontario Bill 88):** outside your core hours, you are not expected to read, respond to, or engage with work communications. Managers should not expect responses to non-urgent messages outside core hours. Urgent matters that justify after-hours contact: production outage, client emergency, safety concern.

Time zone note: out-of-province US employees, your overlap with the ON team during core hours is essential. If you're in California (8 AM – 1 PM PT during our 10-3 ET core), plan accordingly.

SECURITY

When working remotely:
- VPN is required for any access to internal systems (Tailscale via SSO)
- MFA is required for all SaaS tools (configured through Okta)
- Sensitive data (client files, payroll, PII) must remain in approved tools — never local downloads, never personal cloud accounts
- Public wifi: VPN required; sensitive work should be deferred until on trusted network
- Lost or stolen equipment: report to IT immediately via Slack #it-help or +1 [phone]

**Electronic monitoring (Ontario Bill 88):** we use [tools — e.g., Slack, Google Workspace audit logs, IT device management] to support security and operational needs. Specific tools and purposes are documented separately in our Electronic Monitoring Policy.

TAX & PAYROLL IMPLICATIONS

Working from a different jurisdiction (province or state) can create employment, tax, and benefit implications for you and the company. If you're considering relocation, working from another jurisdiction for more than 14 days, or extended international work, contact HR before you go.

PERFORMANCE

Your performance is measured by output, not by hours visible online or days in the office. Your manager will hold a 1:1 with you weekly to discuss work, blockers, and growth.

ANTI-RETALIATION
Asking about remote work options, requesting accommodation, or invoking your right to disconnect will not be held against you.

QUESTIONS
Slack #people or email people@[company].com.

---
**This policy is not legal advice. Verify with employment counsel for each jurisdiction before publication. Ontario Bill 88 obligations (disconnect from work + electronic monitoring at 25+ employees) require specific written policies. Multi-jurisdiction employment (CA, NY, BC, QC) carries tax, payroll, and employment-law implications that must be reviewed by counsel and tax advisor.**

---
Things to verify before sending:
- Ontario Bill 88 disconnect policy and electronic monitoring policy — both required documents at 25+ employees
- Quebec Bill 96 French-language considerations for any QC employees (policy may need French version)
- Quebec Law 25 privacy considerations for electronic monitoring
- CA wage statement and pay timing requirements for the 8 California employees
- NY Earned Safe and Sick Time Act and other NY-specific overlays
- Whether the 14-day threshold for out-of-jurisdiction work is the right one (counsel may recommend shorter for tax)
- Internet reimbursement amount currency clarity (CAD vs USD for US employees)
```

---

## 3. Code of Conduct

### Prompt

```
Draft a code of conduct.

Company: [name, size, industry]
Jurisdiction: [primary]

Scope to cover:
- Professionalism and respect
- Conflicts of interest
- Confidentiality and trade secrets
- Intellectual property
- Use of company systems
- Outside employment / moonlighting
- Anti-harassment and anti-discrimination (cross-reference to separate policy)
- Whistleblower protections
- Reporting violations

Reporting paths:
- Manager
- HR
- Anonymous (third-party hotline?)
- Board / audit committee (for executive misconduct)

Discipline / consequences:
- Range from warning through termination, depending on facts
- Anti-retaliation

Constraints:
- Plain English, not legalese
- Dual disclaimer
- Make this readable in 5 minutes
```

### Worked example output

**Inputs used:** 120-person manufacturing company in Detroit, MI. Employees in MI (100), OH (15), Ontario (5). No anonymous third-party hotline currently — wants to add. Standard conflict-of-interest, moonlighting, and confidentiality scope.

**Output:**

```
CODE OF CONDUCT
Effective: 2026-04-01 | Last reviewed: 2026-03-10 | Owner: Legal & People Team

**Working draft. Not legal advice. Consult employment counsel for MI, OH, and ON before publishing or distributing.**

PURPOSE
This is how we expect each other to behave. It applies to every person who works here — full-time, part-time, contractors, interns, executives, board members. It applies on company time, on company systems, and at company-sponsored events. It also applies anywhere your conduct meaningfully touches your role here.

It's short on purpose. We trust adults to behave like adults. This code exists to make our expectations explicit and to provide a clear path when something goes wrong.

WHAT WE EXPECT

**Respect.** Treat your coworkers, customers, suppliers, and the public with respect. Disagreement is fine. Disrespect is not.

**Honesty.** Be honest in your work, your communications, and your representation of the company.

**Confidentiality.** Information about our business, our customers, our employees, and our finances is confidential. Don't share it outside the company without authorization. Don't use it for personal benefit. This applies during your employment and after it ends.

**No conflicts of interest.** If something in your personal life — a side business, a family connection, an investment — could conflict with your work here, disclose it. We'll figure out together whether it's actually a conflict and what to do about it. Disclosure is the answer; hiding it is the problem.

**Outside employment / moonlighting.** You can have a side gig. Tell us if it's in our industry, uses our intellectual property, conflicts with your hours here, or involves a customer, supplier, or competitor. Get advance approval from your manager and HR.

**Company resources.** Company laptops, phones, vehicles, systems, and accounts are for company work. Reasonable personal use is fine (checking email, paying a bill on lunch). Storing personal business records, conducting outside-business activity, or downloading confidential data to personal accounts is not.

**Intellectual property.** Work you create as part of your job here belongs to the company, per applicable law and your employment agreement. Patentable ideas should be disclosed before you publish or share them externally.

**Anti-harassment and anti-discrimination.** Harassment, discrimination, and retaliation are prohibited. See our separate Anti-Harassment and Anti-Discrimination Policy for the specifics.

**Compliance with law.** Comply with all laws and regulations that apply to your role and our business. If something looks wrong, raise it.

WHAT WE DON'T TOLERATE

The following are serious violations and can result in immediate discipline up to and including termination, depending on facts and circumstances:

- Theft, fraud, or misrepresentation
- Harassment, discrimination, or retaliation
- Violence, threats of violence, or weapons in the workplace
- Working under the influence of alcohol or impairing drugs (medication taken as prescribed excepted; talk to HR if you need accommodation)
- Material breach of confidentiality
- Misuse of company funds or systems

We say "depending on facts and circumstances" because every situation has context. We commit to looking at the facts, not jumping to conclusions.

REPORTING VIOLATIONS

If you see or experience something that violates this code, you have four ways to report:

1. Your manager
2. Anyone in HR (people@[company].com or in person)
3. Our anonymous third-party hotline: [hotline number / web link]. Available 24/7, in English and Spanish. Reports go directly to our Audit Committee.
4. For executive misconduct, contact the Audit Committee Chair directly: [name, contact]

You can report anonymously. You can report through any of these channels. Use whichever feels right.

ANTI-RETALIATION

Reporting a violation, participating in an investigation, or raising a concern in good faith will never be held against you. Retaliation against anyone who reports or participates is itself a violation of this code and will be treated as one.

If you experience retaliation, report it through any channel above.

HOW WE INVESTIGATE

When a concern is raised, we investigate. The depth and process depend on what's raised, but typically:

- HR or counsel reviews the initial report
- Relevant individuals are interviewed
- Evidence is preserved and reviewed
- Findings are reached
- Action is taken (or, if appropriate, the matter is closed without action)
- The reporter is informed of the outcome to the extent appropriate and lawful

We commit to investigating in good faith and as confidentially as the investigation allows.

QUESTIONS

Read this. Ask questions. Slack #people, email people@[company].com, or just walk into HR's office.

---
**This code is not legal advice. Verify with employment counsel for each jurisdiction (MI, OH, ON) before publication. The anonymous third-party hotline implementation requires vendor contract review and applicable disclosure obligations under Ontario and US whistleblower frameworks.**

---
Things to verify before sending:
- Anonymous hotline vendor selection and contract terms before referencing it in the policy
- Ontario ESA whistleblower protections + AODA accessibility of reporting channels
- Michigan and Ohio whistleblower statute alignment
- Audit Committee Chair contact path — confirm with the board before publishing
- IP language alignment with each employment agreement template (counsel review)
- Drug and alcohol language alignment with applicable state and provincial law
- Communication plan for the anonymous hotline launch
```

---

## 4. Anti-Harassment Policy

### Prompt

```
Draft an anti-harassment policy.

Company: [name, size, industry]
Jurisdiction: [state(s) / province(s)]

Must include:
- Definition of harassment (including sexual harassment) per applicable jurisdictional standards
- Protected classes per federal and state/provincial law
- Examples to make the definition concrete
- Multiple reporting paths including at least one outside the direct chain of command
- Investigation process at high level (counsel-led, confidential as possible, prompt)
- Anti-retaliation
- Consequences range from warning through termination
- Bystander expectations
- Training cadence (annual minimum; state-mandated where required)

Flag for counsel:
- CA AB 1825 / AB 2053 / SB 1343 training requirements
- NY State + NYC sexual harassment training requirements
- IL training requirements
- Ontario Occupational Health and Safety Act (OHSA) Bill 168 obligations
- Quebec An Act respecting Labour Standards (Section 81.18 et seq.)

Constraints:
- Plain English
- Cite federal frameworks (Title VII, Canadian Human Rights Act) without citing case law
- Dual disclaimer
- Lead with the reporting paths visibility (people read this when they need it)
```

### Worked example output

**Inputs used:** 200-person SaaS company headquartered in San Francisco, CA. Employees in CA (110), NY (35), TX (25), WA (15), ON (15). Recent investigation showed reporting channels weren't clear to the broader org. Need a refreshed policy.

**Output:**

```
ANTI-HARASSMENT AND ANTI-DISCRIMINATION POLICY
Effective: 2026-03-15 | Last reviewed: 2026-02-28 | Owner: People & Legal

**Working draft. Not legal advice. Consult employment counsel for each jurisdiction (CA, NY, TX, WA, ON) before publishing or distributing. Sexual harassment training requirements under CA, NY State/NYC, IL, and ON are specifically required by statute and must be addressed.**

WE TAKE THIS SERIOUSLY

Harassment and discrimination have no place here. This policy exists to make our expectations and your protections clear. If you need to use this policy, the reporting paths are at the top of this document for a reason.

REPORTING PATHS — READ THESE FIRST

If you experience or witness harassment, discrimination, or retaliation, you have multiple ways to report. You do not have to use your manager. Use whichever feels right for your situation.

1. **Your manager** — if appropriate
2. **HR** — people@[company].com, in person, or Slack DM to [name]
3. **The General Counsel** — [name], [email]
4. **The anonymous third-party hotline** — [hotline number / web link], available 24/7
5. **The Audit Committee Chair (for executive misconduct)** — [name], [email]

You may also have rights to file with external agencies, including:
- US: EEOC (Equal Employment Opportunity Commission) or your state's fair employment agency (CA DFEH, NY DHR, TX TWC, WA HRC)
- Canada / Ontario: Ontario Human Rights Tribunal, Ministry of Labour

This policy does not limit your right to file externally.

DEFINITIONS

**Harassment** is unwelcome conduct based on a protected characteristic that:
- Creates an intimidating, hostile, or offensive work environment, OR
- Affects your terms or conditions of employment

It includes verbal, written, visual, and physical conduct. It can happen in person, over Slack, in email, in video calls, at company events, on business travel, and in social settings connected to work.

**Sexual harassment** specifically includes:
- Unwelcome sexual advances
- Requests for sexual favors
- Comments, jokes, or images of a sexual nature
- Unwelcome physical contact
- Sharing sexually explicit content
- Quid pro quo (linking sexual conduct to employment outcomes)

**Discrimination** is treating you differently in any term or condition of employment (hiring, pay, promotion, assignment, discipline, termination) because of a protected characteristic.

PROTECTED CHARACTERISTICS

Across the jurisdictions where we operate, protected characteristics include but are not limited to:

- Race, color, ethnicity
- National origin and ancestry
- Religion or creed
- Sex, including pregnancy, childbirth, lactation, related conditions
- Gender, gender identity, gender expression
- Sexual orientation
- Age (40+ federally; broader in some jurisdictions)
- Disability (mental and physical)
- Genetic information
- Marital and family status
- Citizenship and immigration status (within the limits of work authorization law)
- Veteran or military status
- In specific jurisdictions: source of income, political affiliation, criminal record (verify with counsel)

This list is not exhaustive. State and provincial law may protect additional characteristics. **Consult counsel for jurisdiction-specific protected classes.**

EXAMPLES (NOT EXHAUSTIVE)

Conduct that violates this policy includes:

- Jokes, comments, or slurs about a protected characteristic
- Sexual images, memes, or content shared at work or on work tools
- Unwanted physical contact
- Stalking, repeated unwanted attention, or unwanted electronic communication
- Excluding someone from work activities because of a protected characteristic
- "Compliments" or "jokes" that target a protected characteristic
- Retaliating against someone for reporting or participating in an investigation

If you're not sure whether something is OK: it probably isn't. Ask.

WHAT WE DO WHEN A REPORT COMES IN

- We acknowledge the report quickly (within 2 business days)
- We treat the matter as confidentially as we can while still investigating it properly
- We engage legal counsel and, when appropriate, an external investigator
- We interview relevant individuals, preserve evidence, and review the facts
- We reach findings
- We take appropriate action — which may range from coaching to termination
- We communicate the outcome to the reporter to the extent appropriate and lawful
- We follow up to confirm there's no retaliation

We do not require you to confront the person who is engaging in the conduct.

ANTI-RETALIATION

Reporting, participating in an investigation, or supporting someone who reports is protected. Retaliation in any form — formal or informal, by leadership or peers, on company tools or off — is itself a violation of this policy and will be treated as one.

If you experience retaliation, report it through any channel above.

BYSTANDER EXPECTATIONS

If you witness conduct that may violate this policy:
- In the moment, if safe, you may say "that's not appropriate here" or pull the affected person aside
- Report it through any channel above — even if the affected person doesn't want to
- Don't try to investigate it yourself

CONSEQUENCES

Violations of this policy result in discipline, which can range from coaching, written warning, suspension, demotion, transfer, or termination, depending on the facts and circumstances. Executive-level violations are reviewed by the Audit Committee.

TRAINING

We require annual anti-harassment training for all employees, with additional or specific training as required by jurisdiction:

- **California:** Supervisors complete 2-hour interactive training every 2 years; all other employees complete 1-hour interactive training every 2 years (AB 1825 / SB 1343)
- **New York:** All employees complete annual interactive sexual harassment training (NY State + NYC requirements)
- **Illinois:** All employees complete annual training (Workplace Transparency Act)
- **Ontario:** Sexual harassment training required under OHSA / Bill 168; we comply with applicable requirements

QUESTIONS AND RESOURCES

Slack #people, email people@[company].com, or contact General Counsel directly. You may also contact the anonymous hotline if you prefer.

For external resources:
- EEOC: 1-800-669-4000 (US federal)
- State agencies: see jurisdiction-specific links in our People wiki

---
**This policy is not legal advice. Verify with employment counsel for each jurisdiction (CA, NY, TX, WA, ON) before publication. California, New York, Illinois, and Ontario all have specific statutory requirements for training content, frequency, and recordkeeping. Failure to meet jurisdiction-specific training requirements can result in regulatory penalties independent of any harassment claim.**

---
Things to verify before sending:
- CA AB 1825 / SB 1343 supervisor and non-supervisor training format, duration, recordkeeping, and certification requirements
- NY State and NYC training content matching the model curriculum requirements
- IL Workplace Transparency Act training content and recordkeeping
- Ontario OHSA / Bill 168 workplace harassment program requirements (separate document may be required)
- WA Healthy Starts Act and similar WA-specific protections
- TX-specific protected classes and reporting agency (TWC)
- Third-party hotline vendor language and disclosures
- General Counsel name and contact for the policy
- Audit Committee Chair name and contact for the policy
- The recent investigation outcome — make sure this policy reflects lessons learned without referencing the specific matter
```

---

## 5. Parental Leave Policy

### Prompt

```
Draft a parental leave policy.

Company: [name, size, industry]
Jurisdiction: [state(s) / province(s)]

Eligibility:
- Full-time? Part-time? Tenure requirement?
- Birthing parent vs. non-birthing parent vs. adoptive vs. foster — all covered?

Paid leave:
- Birthing parent: [weeks paid]
- Non-birthing / adoptive / foster: [weeks paid]
- Top-up of government / EI benefits where applicable (Canada)
- Short-term disability coordination (US)

Unpaid leave:
- FMLA (US, 12 weeks job-protected) — eligibility flag
- Pregnancy / parental leave under provincial law (Canada, Ontario ESA up to 78 weeks combined)

Return to work:
- Phased return option
- Right to return to same or equivalent role per jurisdictional law
- Flexible work after return

Benefits during leave:
- Health insurance continuation
- Vesting / equity treatment

Constraints:
- Plain English
- Dual disclaimer
- Flag CA PFL/SDI, NY PFL, WA PFML, CO FAMLI, DC PFL specifically
- Flag Ontario ESA Pregnancy / Parental Leave, Quebec QPIP
- Treat birthing parent and non-birthing parent equitably wherever possible
```

### Worked example output

**Inputs used:** 95-person professional services firm, Toronto-headquartered. Employees: ON (75), QC (10), BC (5), CA-US (5). Wants 18 weeks fully paid for birthing parent, 12 weeks fully paid for non-birthing/adoptive/foster, with top-up of EI/QPIP. Standard health-insurance continuation.

**Output:**

```
PARENTAL LEAVE POLICY
Effective: 2026-01-01 | Last reviewed: 2025-11-15 | Owner: People Team

**Working draft. Not legal advice. Consult employment counsel for each jurisdiction (ON, QC, BC, CA-US) before publishing or distributing. Ontario ESA Pregnancy/Parental Leave, Quebec QPIP, and California PFL/SDI all have specific statutory frameworks that overlay this policy. Verify with counsel.**

PURPOSE
Having a child is one of the biggest things that happens in a life. We want you to have time to focus on it. This policy explains how we structure paid parental leave, how it interacts with government benefits, and what your job protection looks like when you return.

WHO THIS APPLIES TO
All full-time employees who have completed 6 months of continuous service at the start of leave. Part-time employees are eligible with pro-rated benefits.

This policy applies equally to:
- Birthing parents
- Non-birthing parents
- Adoptive parents
- Foster parents (where the placement is intended to be long-term)
- Surrogacy arrangements

A child born or placed with you while you're employed here qualifies.

PAID LEAVE

**Birthing parent:** up to 18 weeks of fully paid leave. Pay is your regular base salary, paid through our normal payroll cycle.

**Non-birthing / adoptive / foster parent:** up to 12 weeks of fully paid leave. Pay is your regular base salary.

If both parents work here, both are entitled to their respective leave. We don't reduce one parent's leave because the other parent is also taking it.

INTERACTION WITH GOVERNMENT BENEFITS

In Canada, statutory benefits (EI maternity/parental in most provinces, QPIP in Quebec) cover a portion of your salary at a lower replacement rate than your full pay. Our paid leave tops up the difference so you receive 100% of your base salary throughout the paid leave window.

We will help you file for EI / QPIP as applicable. Our top-up applies up to the value of your full base salary. Top-up amounts depend on your individual benefit calculation — HR will walk you through it.

In the US (for our California employees), our paid leave is layered with CA PFL / SDI as applicable. We top up so you receive 100% of your base salary. **Confirm with counsel.**

UNPAID JOB-PROTECTED LEAVE

After paid leave ends, you may take additional unpaid job-protected leave as provided by your jurisdiction:

- **Ontario:** Pregnancy leave (up to 17 weeks for birthing parent) + Parental leave (up to 61 weeks for birthing parent or 63 weeks for non-birthing parent) under the ESA
- **Quebec:** Maternity leave (18 weeks) + Parental leave (up to 65 weeks under QPIP) + adoption leave as applicable
- **British Columbia:** Pregnancy leave + Parental leave under the BC ESA
- **California (US):** California Family Rights Act (CFRA) + FMLA where applicable + Pregnancy Disability Leave for birthing parent

The combination of paid and unpaid leave keeps your role protected for the durations specified by applicable law.

BENEFITS DURING LEAVE

During paid AND unpaid leave:
- Group health, dental, and vision benefits continue uninterrupted (we cover our standard share; you pay your standard share via payroll deduction or invoice)
- Vacation accrual continues during paid leave (Ontario: continues during entire leave under ESA)
- Equity vesting continues uninterrupted

RETURN TO WORK

You return to the same role (same title, same pay, same reporting structure, same location) unless that role no longer exists for genuine business reasons unrelated to your leave — in which case you return to an equivalent role.

Phased return: with manager approval, you may return at reduced hours for up to 4 weeks at the start of return, at full pay if the reduction is less than 20%. Beyond 4 weeks, ongoing reduced hours follow our Flexible Work Policy and may be paid at a pro-rated rate.

Flexible work after return: you can request changes to your work arrangement (location, schedule, role responsibilities). We commit to reviewing these requests in good faith.

HOW TO REQUEST LEAVE

- Notify your manager and HR ideally at least 12 weeks before the expected leave start (we understand this isn't always possible — earlier or later notice is fine where it is)
- HR will provide a leave plan: dates, benefits handling, top-up paperwork
- You and your manager will plan coverage and handoff
- We're flexible on early return, extended leave, and split leave between parents

ANTI-RETALIATION

Taking parental leave will never be held against you. Performance evaluations during a leave period reflect your work before and after, not the time away.

QUESTIONS

Slack #people or email people@[company].com.

---
**This policy is not legal advice. Verify with employment counsel for each jurisdiction (ON, QC, BC, CA-US) before publication. Ontario ESA, Quebec QPIP / civil code, BC ESA, and California CFRA/PFL/SDI all have detailed statutory frameworks that overlay this policy. Top-up calculations, vacation accrual, benefits continuation, and job-protection durations are jurisdiction-specific.**

---
Things to verify before sending:
- Ontario ESA Pregnancy + Parental Leave durations and notice requirements
- Quebec QPIP integration, particularly for Quebec employees
- BC ESA Parental Leave specifics
- California CFRA + Pregnancy Disability Leave + PFL + SDI stacking and top-up calculation
- FMLA eligibility for the 5 US employees (50 employees within 75 miles test)
- Whether the 6-month tenure requirement complies with each jurisdiction's eligibility requirements (some require less)
- Top-up tax treatment in Canada (SUB plan registration with Service Canada)
- Whether health benefit continuation during unpaid leave is at 100% employer-paid or split — confirm against current plan and broker
- Equity vesting language alignment with the equity plan document
- Communication plan to existing employees on policy improvement
```

---

## Common edits the AI will accept

When the draft comes back and you want to tune it:

- "Strip more of the legalese. Plain English pass."
- "Make the reporting paths more prominent — top of the document."
- "Add a paragraph on how this interacts with [specific jurisdiction] law and flag it for counsel."
- "Pull the disclaimers out of the body and into the footer only — keep the header callout."
- "Add a worked example for [specific scenario]."
- "Match the voice of our existing handbook — I'll paste a section for reference."

Each of these produces a noticeably better second draft.

---

## Reminder

Every policy in this file is a working draft. Counsel-review every one of them before publication. The kit's job is to make the draft faster and structurally sound. The lawyer's job is to make it ship-safe.
