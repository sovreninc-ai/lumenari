# Boolean and Sourcing Playbook

Most sourcing is bad because the Boolean string is bad. Most Booleans are bad because they treat all candidates as if they live on LinkedIn the same way. This playbook fixes both — the string builder for each platform, and the sourcing playbook for which platform finds which seniority for which role family.

---

## Part 1 — Boolean string anatomy

Every good Boolean has four moves:

1. **MUST-have skills/titles** — required, usually quoted strings, joined with AND
2. **OPTIONAL skills** — broaden the net, joined with OR
3. **EXCLUSIONS** — what you don't want, with NOT
4. **CONTEXT signals** — company-type, seniority indicators, location

### Operators that work everywhere

- `AND` — both terms must be present
- `OR` — either term
- `NOT` (or `-` on most search engines) — exclude
- `"quoted phrase"` — exact match (treats spaces as part of the term)
- `(parentheses)` — group operators

### Operators specific to platforms

- LinkedIn Recruiter has filters as fields (Title, Skills, Company, etc.) that you toggle in the UI, NOT in the search string
- Public LinkedIn search supports basic Boolean in the keywords field but is more restricted
- Google X-ray searches use site:linkedin.com/in/ and the full Boolean
- GitHub search supports filters like `language:`, `location:`, `followers:>X`

---

## Part 2 — LinkedIn Recruiter strings

LinkedIn Recruiter is the easiest because the platform itself separates fields for you.

### The prompt

```
You are the Recruiter Co-Pilot.

Build me a LinkedIn Recruiter search.

**Target role:** [title]
**Seniority:** [Entry/Mid/Senior/Staff/Principal]
**Must-have skills:** [list]
**Optional skills:** [list]
**Industries/company types I want:** [e.g., "B2B SaaS, Series A-C, 50-300 employees"]
**Industries/company types I want to exclude:** [e.g., "enterprise consulting, agencies"]
**Location:** [city + radius or remote-anywhere]
**Tenure preference:** [e.g., "at current role 1+ years"]

Give me:
1. The Boolean string for the keywords field
2. What to set in each filter field (Title, Skills, Industry, Company, Location, Years of experience)
3. 2-3 variants if my first search returns too many or too few results
4. Common false-positive patterns to watch for
```

### Worked example — Senior Backend Engineer

> **LinkedIn Recruiter setup:**
>
> **Title filter:** (Senior OR Sr OR Staff) AND (Backend OR "Back-end" OR "Back end" OR Server)
>
> **Skills filter:** Node.js, TypeScript, PostgreSQL (require all three)
>
> **Keywords field Boolean:**
> ```
> ("Node.js" OR "Node" OR Typescript) AND (Postgres OR PostgreSQL) AND (AWS OR GCP) NOT ("recruiter" OR "recruiting" OR "tech evangelist")
> ```
>
> **Industry filter:** Computer Software, Internet, Financial Services (toggle as relevant)
>
> **Company filter:** EXCLUDE: agencies, consultancies, large enterprise (Cognizant, Infosys, TCS, Accenture, Deloitte, Capgemini) if you only want product company experience
>
> **Years of Experience:** 6+ (don't gatekeep at 10; senior-quality often emerges at 6-8 years)
>
> **Location:** As specified
>
> **Variants if too many results:**
> - Add tenure filter: 1+ year at current company (filters out job-hoppers + stops the people who just got hired by competitors)
> - Tighten location radius
> - Add specific industry signal (FinTech / HealthTech / etc.)
>
> **Variants if too few results:**
> - Drop one of the must-have skills, keep it as preferred
> - Expand to Mid-level (often senior-quality)
> - Loosen the company filter
>
> **False positives to watch for:**
> - "Senior" in title at companies where senior means 2 YOE (consulting, agencies)
> - Backend engineers who only do Python or Java (your stack is Node) — verify in profile detail
> - Anyone with "open to work" green ring AND under 1 year at current company — could be a job-hopper; could be a strong layoff candidate. Read carefully.

### LinkedIn Recruiter — common Boolean patterns

| Use case | String example |
|---|---|
| Find people who use specific tools | `("Datadog" OR "PagerDuty") AND ("Kubernetes" OR "EKS")` |
| Find people who SPEAK at conferences | `(speaker OR keynote OR "spoke at")` |
| Find OPEN SOURCE contributors | `("open source" OR "OSS" OR github)` |
| Find people from a specific company family | `("ex-Stripe" OR "former Stripe" OR "previously at Stripe")` |
| Exclude recruiters and trainers | `NOT (recruiter OR "talent acquisition" OR trainer OR "tech evangelist")` |

---

## Part 3 — Public LinkedIn search

For when you're outside Recruiter or supplementing.

### The format

LinkedIn's keywords field accepts Boolean but is more restricted. No nested parentheses beyond two levels. Quoted phrases work.

```
("Senior Backend Engineer" OR "Senior Software Engineer") AND ("Node.js" OR Typescript) AND Postgres NOT recruiter
```

Combined with the location and current-company filters in the UI, this gets surprisingly far.

### X-ray Google searches (when LinkedIn search is gated)

The Google X-ray gives you results LinkedIn might hide from logged-out users.

```
site:linkedin.com/in/ ("Senior Backend Engineer" OR "Senior Software Engineer") "Node.js" "Postgres" "San Francisco" -intitle:"profiles" -inurl:dir/
```

Variants:

- Add `-intitle:"profiles"` to skip LinkedIn directory pages
- Add `"open to work"` to find people who've signaled openness
- Add `"intern"` to NOT exclude — the negative `-intern` filters out junior profiles

---

## Part 4 — GitHub sourcing

GitHub is where senior engineers actually live. The signal is in the code, not the bio.

### Search patterns

**By language + location:**
```
location:Toronto language:typescript followers:>50
```

**By open-source contribution to a specific repo:**
- Go to the repo
- Click "Insights" → "Contributors"
- Sort by commits in the last year
- Cross-reference top contributors' profiles for hiring signals

**By recent activity:**
```
location:"San Francisco" language:rust followers:>100
```
Then filter by "Most followed" or look at the contributions graph for recent activity.

**Find people who've written tutorials or longform:**
- Search Twitter/X for GitHub repos: `from:@person github.com/`
- Or use Google: `site:github.com "tutorial" "production" "we built"`

### What to look for on a GitHub profile

- Pinned repos with READMEs that READ well — engineer-with-communication-skill signal
- Recent activity (contributions in last 3 months)
- A mix of own projects + OSS contributions to known projects
- Followers > 50 is a soft signal of community presence
- Bio that names a current company (saves a cross-reference)

### What's NOT signal

- High repo count alone — most are forks
- "AWS Certified" badges on their bio — paper signals
- Stars on their projects without commits in 2 years

---

## Part 5 — The sourcing playbook

Where to find which seniorities for which role families. The honest answer is always "it depends," but the playbook narrows it.

### Engineering

| Seniority | Primary source | Secondary source | What works |
|---|---|---|---|
| Junior | LinkedIn (recent grads + bootcamp) | Bootcamp alumni networks (Bloc, App Academy, Lambda, etc.) | Direct outreach, but expect lower reply rates |
| Mid | LinkedIn Recruiter | GitHub (active contributors) | Reference specific projects in outreach |
| Senior | GitHub > LinkedIn | Conference speakers, OSS contributors | Peer-toned outreach, technical specificity required |
| Staff/Principal | Referrals + GitHub + Twitter/X | LinkedIn rarely works — they ignore InMails | Hire someone they respect; the warm intro is 10x the InMail |

For senior+ engineers: stop sourcing on LinkedIn first. Start with their OWN content — blog posts, OSS contributions, conference talks. Their LinkedIn is the last place they update.

### Design (Product / Brand)

| Seniority | Primary source | Secondary source | What works |
|---|---|---|---|
| Junior | LinkedIn + Dribbble / Figma Community | Bootcamp alumni | Portfolio specificity |
| Mid | Dribbble + Figma Community + LinkedIn | Twitter design community | Compliment specific work |
| Senior | Personal sites + Dribbble + Twitter | LinkedIn (low priority) | Reference their actual work, not the role |
| Director | Referrals + Twitter | LinkedIn | Warm intros only |

Designers maintain portfolios, not LinkedIn. The portfolio IS the source.

### Sales (AE, SDR, CS)

| Seniority | Primary source | Secondary source | What works |
|---|---|---|---|
| SDR | LinkedIn + RepVue + Bravado | Networking events | Comp transparency, growth path |
| Mid AE | LinkedIn (highly active here) | RepVue (for ICP-fit research) | Specific territory + comp band |
| Senior AE | LinkedIn + referrals | Industry Slacks (RevGenius, Pavilion) | Quota attainment data + product specifics |
| VP/CRO | Referrals + investor network | Heavy executive search | Warm intro is required; cold outreach is 1-2% |

LinkedIn is where sales lives. Their entire professional identity is there.

### Operations / G&A

| Seniority | Primary source | Secondary source | What works |
|---|---|---|---|
| Junior/Mid | LinkedIn + Pavilion (for ops) | Industry groups (e.g., People Geeks for HR) | Specific scope description |
| Senior | LinkedIn + referrals + Pavilion | Industry communities | Real-talk about starting state |
| Director/VP | Referrals + executive search | LinkedIn (low ROI) | Network introductions |

Ops people often hide on LinkedIn because they're constantly recruited. Communities are higher signal.

### Product (PM, Product Leadership)

| Seniority | Primary source | Secondary source | What works |
|---|---|---|---|
| APM/Mid | LinkedIn | Mind the Product community | Product specifics, growth path |
| Senior | LinkedIn + Mind the Product + Lenny's Newsletter circle | Twitter (active PMs post here) | Domain specificity |
| Director/VP | Referrals + Reforge alumni | LinkedIn (low priority) | Warm intros |

PMs in senior roles are often very online — Twitter, Substacks, podcast appearances. Reference what they've shared publicly.

---

## Part 6 — Where to find diverse candidates (without dog-whistling it)

This section is for the recruiters trying to widen their funnel without performative bullshit.

### The principle

Diverse pipelines come from sourcing in places that aren't your default sources. They don't come from search strings that filter on protected categories (illegal in most jurisdictions, even if the platform lets you try).

### Communities that help

- **Engineering:** Out in Tech, Lesbians Who Tech, /dev/color, Black Tech Pipeline, Latinas in Tech, Women Who Code
- **Design:** People of Craft (POC designers), Hexagon (women+ in design)
- **Sales:** Sistas In Sales, Hispanic Star, Women in Sales Everywhere
- **Product:** Women in Product, Product Manager networks within larger communities

Most have job boards, Slack workspaces, and event calendars. You'll get 10x more signal posting a role to one of these specifically than running another LinkedIn search.

### What NOT to do

- Search "diversity" or "women" on LinkedIn — this is illegal in many places and doesn't work even where legal
- Filter candidate photos for visible diversity — illegal, biased, and the data is unreliable anyway
- Use names as a proxy for ethnicity — wildly biased and frequently wrong
- "We're an inclusive workplace" boilerplate at the bottom of a JD that's otherwise full of "rockstar ninja" language — candidates see right through this

### What works

- Source in the communities listed above
- Have an actual inclusive workplace (parental leave, flexible work, real ERGs, diverse leadership) and let your JDs honestly reflect it
- Pay equitably (publish salary bands; pay-banding by job level, not by negotiation aggressiveness)
- Track funnel diversity at every stage — sourced, screened, interviewed, offered, accepted. The drop-off tells you where you're broken.

---

## Part 7 — Sourcing cadence + outreach metrics

### Realistic numbers

For a senior engineering role at a Series B company with a decent brand:

- Sourcing list of 50 candidates
- Outreach reply rate: 15-25% (3-line message with comp + specific reason)
- Phone screen conversion: 50% of replies
- First interview conversion: 50% of screens
- Offer: 1-2 from the original 50

If your reply rate is under 10%, the issue is almost always:
- Generic outreach (no specific reason for this candidate)
- No comp band stated
- Subject line ("Exciting opportunity at...")
- Off-brand outreach for the seniority (template-toned outreach to a Staff Engineer)

If your reply rate is over 30%, you might be sourcing too narrowly. Widen the pool.

### Outreach cadence

- Day 1: First message
- Day 5-7: One follow-up (different angle — e.g., first message led with the problem space; follow-up leads with the team)
- Day 14: Final follow-up (short — "still here, still interested, no worries if it's not the right time")
- Then stop. Three messages, then leave the door open.

After three, you're a nuisance. Recruiters who keep going past three burn the brand for everyone hiring at that company.

---

## Common Boolean and sourcing mistakes the kit will flag

- **Too many ANDs.** Each AND narrows. 5+ AND clauses usually returns under 50 results, most of them not what you want.
- **No NOT clauses.** You'll drown in trainers, recruiters, and consultants. Always exclude.
- **Title-only searches.** "Senior Backend Engineer" varies wildly across companies. Search on skills + outcomes too.
- **Searching LinkedIn for senior+ engineers.** Their LinkedIn is stale. Source on GitHub, conference rosters, OSS contributor lists.
- **No location qualifier on a remote role.** Even "remote-anywhere" usually has time-zone constraints. Filter by time zone, not just by remote.
- **Sourcing the same 50 LinkedIn profiles every other recruiter is sourcing.** If your pool is the first page of a generic LinkedIn search, you're competing with 10 other recruiters. Go deeper.
