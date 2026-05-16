# Sourcing Strategies — Talent Acquisition Pack

Frameworks for the upstream work — talent market mapping, competitor org chart analysis, ICP for passive candidates, Boolean string library. Pair with the worked examples in `reference-workflows.md`.

---

## Talent market mapping — the 7-question framework

Before you write a single Boolean string, answer these in writing. The market map is the artifact.

1. **Who exactly are we looking for?** Title equivalents (3-8), years at level (range, not minimum), functional depth (specific tools, methodologies, scope of work), company DNA fit (stage, ARR range, scale), disqualifiers (hard nos)
2. **Where do they currently work?** Tier 1: direct competitors and obvious peers (6-12 companies). Tier 2: adjacent industries with transferable skills (6-12). Tier 3: long shots worth a Boolean run (regional banks, government, agencies — places where the rigor is there but the brand isn't)
3. **Who else is hiring this profile right now?** Look at LinkedIn job postings 4-12 weeks back, careers blogs, recent hiring-manager LinkedIn activity. If 5 peer companies just opened the same role, comp is going up and reply rates are going down
4. **What does the comp landscape look like?** Levels.fyi (verified), Glassdoor (less reliable), internal back-channel references. Establish range for base, equity, sign-on
5. **What's pulling people around the market right now?** Layoffs at specific companies (public knowledge). Recent leadership changes. Strategy pivots. RTO mandates. Acquisitions. Each creates movement
6. **What's our pipeline state today?** Warm pool (in conversation), cold target list (identified, not contacted), shallow spots (specific function / location / seniority / demographic where pool needs widening)
7. **What's our brand reality?** What does Glassdoor say. What's the Blind sentiment. Has there been a public layoff. Have we had recent press. Is the CEO controversial. Don't paper over — name it and decide how to address in outreach

If you can't answer 5 of these 7 confidently, the market map isn't ready and the Boolean string isn't either.

---

## Competitor org chart approach

Map the relevant function at your top 3-5 competitors in this shape. Use LinkedIn + Crunchbase + The Org + public blogs.

```
COMPETITOR: [Company]
Function: [e.g., Data Engineering]
Leader: [name, title, tenure, LinkedIn]
  Direct reports (managers): [names, tenure, prior companies]
    ICs visible (sample): [names, titles, tenure, prior companies, public talks/posts]

Recent moves in this function:
- [Name] joined from [prior company] in [date]
- [Name] left to [next company] in [date]
- Notable departures or arrivals

Public signal of culture / problem space:
- Engineering blog posts (last 6 months)
- Conference talks
- Hiring manager LinkedIn activity

Open roles in this function:
- [List with rough dates posted]
```

Two rules:
1. This is publicly available information. Anything that requires logging into an internal system at the competitor is off-limits
2. Don't share this map externally. It's an internal sourcing tool

---

## ICP for passive candidates — the "right person at the wrong time" rubric

Active candidates apply. Passive candidates need a reason. The ICP for a passive search is sharper than the JD.

For each role, write these on one page:

```
ICP — [Role title] — [Date]

WHO THEY ARE
- Years of experience: [range]
- Currently at: [company profile — stage, function, scope]
- Reports to: [profile of their manager — what their manager probably looks like]
- Owns currently: [scope of their current work — 3-5 bullets]

WHAT THEY WANT NEXT
- The next stretch: [what's the natural next move from their current role]
- The next learning: [what skill / scope they probably want to grow into]
- The next problem: [what kind of problem would make them say yes]
- The next environment: [bigger / smaller, more / less structure, IC track open or required, remote posture]

WHAT MIGHT MOVE THEM
- Comp delta: [our band vs their likely current comp — what's the gap]
- Equity meaningful at this stage: [yes / no — be honest]
- Brand pull or push: [are we a step up in brand, lateral, or step down? Address it]
- Manager-fit pull: [if hiring manager has a public profile worth pointing at]
- Problem-space pull: [the specific work that's better here than elsewhere]

WHAT WON'T MOVE THEM
- [List of failed levers — "more money" might not be enough if they have liquid equity. "Bigger title" might not matter for a Staff IC who values scope]

WHERE TO FIND THEM
- Primary channels: [LinkedIn Recruiter saved search, GitHub, conference attendee lists, Slack communities]
- Secondary: [referrals from existing team, alumni networks, podcast appearances]

OUTREACH ANGLE
- One specific reason to reach out: [the thing in their public profile that's the hook]
- The first message: [3 sentences max]
- Follow-up cadence: [3 messages, 5-7 days and 10-14 days spacing]
```

---

## Boolean string library

Reusable building blocks. Compose with AND / OR / NOT.

### Title chunks

**Engineering Senior IC**
```
("Senior Software Engineer" OR "Sr. Software Engineer" OR "Senior Engineer" OR "Sr. Engineer")
NOT ("Manager" OR "Director" OR "VP" OR "Head of" OR "Lead [name]" if it codes as managerial)
```

**Engineering Staff+**
```
("Staff Engineer" OR "Staff Software Engineer" OR "Sr. Staff Engineer" OR "Principal Engineer" OR "Distinguished Engineer" OR "Senior Staff Engineer")
NOT ("Manager" OR "Director" OR "VP")
```

**Engineering Manager**
```
("Engineering Manager" OR "Sr. Engineering Manager" OR "Senior Engineering Manager" OR "Manager, Engineering" OR "Software Engineering Manager")
NOT ("Director" OR "VP" OR "Head of" OR "Senior Director")
```

**Product Manager Senior**
```
("Senior Product Manager" OR "Sr. Product Manager" OR "Lead Product Manager" OR "Principal Product Manager")
NOT ("Director" OR "VP" OR "Head of" OR "Group Product Manager" [unless that's what you want])
```

**Data Engineer Senior**
```
("Senior Data Engineer" OR "Staff Data Engineer" OR "Senior Software Engineer, Data" OR "Sr. Analytics Engineer" OR "Staff Analytics Engineer")
NOT ("Manager" OR "Director")
```

**Designer Senior IC**
```
("Senior Product Designer" OR "Sr. Product Designer" OR "Staff Designer" OR "Principal Designer" OR "Senior UX Designer")
NOT ("Manager" OR "Director" OR "Head of Design")
```

### Skill chunks

**Distributed systems**
```
("distributed systems" OR "consensus" OR "Raft" OR "Paxos" OR "Kafka" OR "Spanner" OR "Cassandra" OR "DynamoDB" OR "etcd")
```

**Cloud-native infra**
```
("Kubernetes" OR "k8s" OR "Terraform" OR "AWS" OR "GCP" OR "Azure")
AND ("production" OR "at scale")
```

**Data platform / warehouse**
```
("Snowflake" OR "BigQuery" OR "Redshift" OR "Databricks")
AND ("dbt" OR "Airflow" OR "Dagster" OR "Prefect")
```

**Modern frontend**
```
("React" OR "TypeScript" OR "Next.js")
AND ("design system" OR "component library" OR "accessibility" OR "performance")
```

**Backend at scale**
```
(Go OR Rust OR Java OR Kotlin OR "Node.js")
AND ("microservices" OR "API design" OR "gRPC" OR "REST at scale")
```

### Exclusion chunks (always include)

```
NOT ("recruiter" OR "talent acquisition" OR "sourcer")
NOT ("intern" OR "student" OR "co-op")
NOT ("looking for work" OR "open to roles" [unless that's a positive signal for your context])
```

### What you do NOT include — ever

- No filters on photo, name, school in a way that codes as protected-class targeting
- No "veteran" filter unless using a compliant Veteran-Friendly outreach path
- No filters on "active in [demographic group]" Slack communities or affinity groups for the purpose of including only one group — INCLUDING is fine if you're widening; EXCLUDING is illegal
- No "parental status" proxies ("recent college grad," "early career," "fresh perspective")

If you're not sure whether a filter is OK, the answer is don't use it. Ask the AI to flag it and rewrite.

---

## Tuning the Boolean — when results look wrong

**Too few results (< 50):**
- Drop one company from a Tier 1 company filter
- Loosen title list (add adjacent titles)
- Drop one skill keyword
- Broaden location

**Too many results (> 1000):**
- Tighten skill specificity (add a tool or scope keyword)
- Add a "must include" tenure signal (current title for 18+ months)
- Tighten title list (cut entry-level titles)
- Add company tier filter if not present

**Wrong people:**
- Read the first 20 profiles. Identify the pattern of what's wrong (e.g., all results are at scale-up stage, you wanted enterprise)
- Add or remove a single keyword that captures that pattern
- Re-run, read 20 more, iterate

**Wrong seniority:**
- For IC roles drifting too senior: cap title list
- For IC roles drifting too junior: tighten on years OR add a senior-only title
- For manager roles drifting to ICs: tighten people-leadership keywords (1:1s, performance management, hiring)

Tuning is the work. The first Boolean is never the right Boolean.

---

Things to verify before any candidate outreach:
- Comp band is approved by HRBP
- The hiring manager has signed off on the calibration (titles, must-haves, deal-breakers)
- No-poach list checked (any companies you can't source from)
- Inclusive-language audit on every outreach message
