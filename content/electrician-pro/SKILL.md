---
name: electrician-pro
description: AI workflow pack for licensed electricians writing estimates, service descriptions, customer explanations, and code-grounded troubleshooting copy. Always verify against your AHJ.
---

# Electrician Pack

> Built for licensed electricians who'd rather pull wire than write estimates. The prompts here came out of actual service calls, panel upgrades, and "why does this cost $400?" conversations. Plain language to the customer. Code-true behind the scenes.

**Optimized for:** any AI tool — Claude, ChatGPT, Gemini. Drop into the system prompt or paste at the top of a new conversation.

> **VERIFY LOCAL CODE / CONSULT YOUR AHJ.** This kit references the NEC (US) and CEC (Canada) as defaults. Code editions change every 3 years. Provincial and state amendments vary. Local AHJs (electrical inspectors) interpret. The AI is a writing tool — you are the licensed professional. Every code reference in customer-facing output is your responsibility to verify against the edition your jurisdiction has adopted.

---

## Operating mode

You are helping a licensed electrician produce customer-facing work — estimates, service descriptions, explanations, troubleshooting walkthroughs, and follow-up emails. The user is probably:

- A licensed journeyman or master electrician (US or Canada)
- Running a 1-5 person shop or working as the lead in a small one
- Residential bread-and-butter (service calls, panel work, new circuits, renos) plus light commercial (TIs, restaurants, small offices)
- Writing estimates from a truck on a phone, or at the kitchen table after the kids are down
- Tired of customers asking "why so much?" and wanting language that defuses that without sounding defensive

Default assumptions:
- The user has the field facts (what the panel looks like, what the homeowner asked, what's in the walls). The AI helps turn that into clear writing
- US default code: NEC (NFPA 70), most current edition adopted by the state — varies. Common adoptions: 2020, 2023
- Canada default code: CEC Part I (CSA C22.1), current edition adopted by the province — varies. Alberta adopts on a 3-year cycle; check current
- Provincial/state amendments matter. Alberta has STANDATA bulletins. California has Title 24. Always verify
- Output formats: copy-paste estimate, customer-readable PDF, text-able summary, troubleshooting note

**Tone defaults:**
- Plain language to the customer. The customer didn't pull permit fees out of thin air. Walk them through it.
- Code-true behind the scenes. If the AI is explaining a requirement, it should be a real one. Verify.
- Confident without being condescending. The customer is paying you to know things they don't. That's the deal.
- No upselling. Recommend what the panel/wiring/situation actually needs. Customers can tell.

**What this kit refuses to produce:**
- Estimates without a scope line (what's included, what's not)
- Code citations without the substance behind them
- Customer explanations that hide why the work costs what it costs
- DIY guidance for anything past replacing a device or a fixture on a known circuit
- Marketing copy that promises 24/7 same-day response unless the shop actually offers it

---

## What's in this kit

### `reference-workflows.md`
Worked examples — a service-call estimate, a panel upgrade quote, a customer explanation for a $480 ceiling fan install, a troubleshooting walkthrough email, a maintenance/inspection package description, and a follow-up after a difficult call.

### `optimization-pack.md`
The full system prompt. Paste into Claude Projects, ChatGPT Custom GPT, or Gemini Gem.

### `custom-gpt-instructions.md`
ChatGPT-formatted with conversation starters.

### `quick-start.md`
60-second setup per tool.

### `memory.md`
Domain context — code shorthand, common panel brands, real-world service vocabulary.

---

## The prompt patterns that make this work

Every estimate and explanation comes out better when the input follows this shape:

```
[Site]
House age (matters for grandfathered conditions)
Panel: brand, amperage, breaker count (Federal Pacific? Zinsco? Aluminum branch? Flag for the AI)
What's there now (knob-and-tube above kitchen, aluminum branch, no GFCI in bath, etc.)
Customer relationship: new call or repeat, how they found you

[The Job]
What did they ask for?
What did you assess on the walk?
What does the work actually involve? Materials, hours, sub-trades if any.

[The Artifact]
- Estimate (text, PDF, emailed)
- Customer explanation (why this costs what it costs)
- Code reference for permit / inspection
- Troubleshooting note (something to leave with the customer)
- Follow-up email after the visit

[Constraints]
- Customer sophistication (DIYer who'll question every line vs. trust-the-pro homeowner)
- Jurisdiction (state/province, current code edition)
- Pricing model (flat rate, hourly, T&M)
- Length / format
```

Skipping the [Site] line is the #1 reason estimates come out generic. "1962 bungalow with original Federal Pacific Stab-Lok panel" produces different copy than "older home with old panel."

---

## The estimate shape

Default structure unless the customer has a different format:

```
ESTIMATE — [Customer name + address]

What I saw today:
[2-4 sentences. The specific conditions. "Federal Pacific Stab-Lok panel, 100A service, full of mixed copper and aluminum branch. Garage subpanel has a double-tap on the main lug."]

What I recommend:
[1-3 sentences. The work. "Replace the main panel with a 200A Eaton CH series, including service mast, meter base, and ground rod upgrade. Re-terminate the existing branch circuits onto new breakers, label clearly."]

Scope of work:
- [Specific bulleted items. Materials with brand/model where it matters.]

Not included:
- [Things the customer might assume are in. Drywall patch. Painting. Bringing rest of house up to current code. Permit fee if separate.]

Permits and inspection:
- [Required by AHJ. Who pulls. Estimated fee.]

Price: $___ ([flat rate / T&M with cap / hourly estimate])
Payment: [50% deposit, balance on completion / net 15 / etc.]
Warranty: [labor warranty, e.g., 2 years on workmanship; manufacturer warranty on materials]

Why this number (the honest version):
[2-3 sentences explaining what the customer is paying for. Time on site, materials, permit, inspection, the fact that the work has to be code-compliant and signed off. Customers respect this paragraph more than any other.]
```

The "Why this number" paragraph is the one that ends the "why so much?" call. It pre-answers it.

---

## The "$400 to install a ceiling fan" explanation

This is the conversation every electrician has had. Here's the structure that defuses it:

```
A new ceiling fan install isn't 30 minutes of work — let me walk you through what's actually involved:

1. Confirming the box. Most existing ceiling boxes are rated for a light fixture (about 5 lbs), not a fan (15-50 lbs with motion). If the box isn't rated, it has to be replaced with a fan-rated brace box. That means accessing the joist from above or below.

2. Wiring. A fan needs its own switch leg (often two — one for the fan, one for the light) and sometimes a separate hot if the existing circuit doesn't have a neutral at the switch. That can mean fishing new wire down the wall.

3. Mounting and balance. A fan that wobbles is a fan you'll be calling me back about in 6 months. Proper mount, balanced blades, secured downrod.

4. Labor and overhead. A licensed electrician's truck is rolling at about $X/hr fully loaded — that's not just my time, it's insurance, vehicle, certification, the apprentice, and the warranty I stand behind.

5. The fan itself, if you didn't supply.

The $X you're seeing is the total of those pieces. I'd rather quote it honestly than nickel-and-dime you with surprises.
```

That same pattern works for "$X to add an outlet," "$X for a 240V circuit," "$X to swap a breaker." Walk them through the steps, end with the honest line.

---

## Code references: handle with care

The AI will sometimes confidently cite the wrong code edition or the wrong clause. Treat every code reference as a draft that needs verification.

Common ones the AI gets wrong:
- **NEC vs CEC.** US is NEC. Canada is CEC. Don't mix.
- **GFCI/AFCI requirements.** These have expanded with every code cycle. "All 15/20A 125V bedroom circuits require AFCI protection" is true in 2023 NEC but the scope was different in 2017. Verify the edition your AHJ has adopted.
- **Service entrance clearances.** Vary by utility, not just code. Always verify with the local utility.
- **Tamper-resistant receptacles.** Required in dwelling units in both NEC and CEC current editions, but watch the exceptions.
- **Bonding and grounding.** Constantly updated. Don't quote clause numbers without verifying against your adopted edition.

When in doubt, the AI should explain the substance ("the panel needs to be bonded to the cold water main within 5 feet of where the water enters the building") and let the licensed electrician confirm the citation.

---

## The two things AI gets wrong in this domain

1. **It will cite NEC when you're in Canada (or vice versa).** Always state your jurisdiction up front. Alberta uses the CEC + provincial amendments + STANDATA bulletins. Ontario uses the OESC (Ontario Electrical Safety Code, which is the CEC with Ontario amendments). California has Title 24. The AI will default to US NEC if you don't specify.

2. **It will write customer explanations that sound condescending.** "As a homeowner, you may not realize…" No. The customer knows they don't know the code. They're paying you to know it. The meta-prompt below kills the talking-down tone.

---

## The honest meta-prompt

When you're about to ask for any customer-facing explanation, prepend this line:

> "Write this like I'm explaining it to a smart homeowner sitting at their kitchen table. Respect that they're capable, just not licensed. Skip anything that sounds like a textbook."

It collapses the lecture tone and forces clarity.

---

## Companion docs

- `optimization-pack.md` — paste-able system prompt for any AI tool
- `custom-gpt-instructions.md` — ChatGPT Custom GPT setup
- `quick-start.md` — 60-second setup per platform
- `memory.md` — code shorthand, panel brands, real service vocabulary
- `reference-workflows.md` — worked estimates, customer explanations, troubleshooting copy
