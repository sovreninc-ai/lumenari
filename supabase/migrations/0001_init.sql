-- ====================================================================
-- Lumenari — initial schema (0001_init.sql)
--
-- Tables:
--   kits                 catalog of purchasable Optimization Packs
--   kit_files            files shipped to the buyer per kit
--   purchases            one row per Stripe Checkout Session
--   purchase_downloads   per-kit download counter for a purchase
--
-- RLS policy:
--   kits / kit_files     publicly readable (the catalog is the storefront)
--   purchases            readable only when the request supplies the
--                        matching email + token via a signed link;
--                        service role inserts on webhook receipt
--   purchase_downloads   service role only — buyer hits an API route
--                        that decrements an HMAC-signed token
--
-- All schema changes must go through migration files per the Sovren stack
-- rules. Never edit in the Supabase dashboard.
-- ====================================================================

create extension if not exists "pgcrypto";

-- --------------------------------------------------------------------
-- kits
-- --------------------------------------------------------------------
create table if not exists public.kits (
  id              text primary key,
  slug            text not null unique,
  name            text not null,
  description     text not null default '',
  price_cents     integer not null check (price_cents >= 0),
  ai_target       text not null default 'any',
  bundle_only     boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- --------------------------------------------------------------------
-- kit_files — manifest of deliverables per kit
-- --------------------------------------------------------------------
create table if not exists public.kit_files (
  id          uuid primary key default gen_random_uuid(),
  kit_id      text not null references public.kits(id) on delete cascade,
  file_path   text not null,
  file_name   text not null,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists kit_files_kit_id_idx on public.kit_files(kit_id);

-- --------------------------------------------------------------------
-- purchases — one row per Stripe Checkout Session
-- --------------------------------------------------------------------
create table if not exists public.purchases (
  id                  uuid primary key default gen_random_uuid(),
  email               text not null,
  kit_ids             text[] not null,
  stripe_session_id   text unique,
  stripe_customer_id  text,
  amount_cents        integer,
  currency            text default 'cad',
  -- Random URL token used to gate the buyer's library page.
  -- The login-by-email flow emails this token to the purchaser.
  access_token        uuid not null default gen_random_uuid(),
  created_at          timestamptz not null default now()
);

create index if not exists purchases_email_idx on public.purchases(lower(email));
create index if not exists purchases_session_idx on public.purchases(stripe_session_id);

-- --------------------------------------------------------------------
-- purchase_downloads — counter + audit trail per kit per purchase
-- --------------------------------------------------------------------
create table if not exists public.purchase_downloads (
  purchase_id        uuid not null references public.purchases(id) on delete cascade,
  kit_id             text not null references public.kits(id) on delete cascade,
  download_count     integer not null default 0,
  last_downloaded_at timestamptz,
  primary key (purchase_id, kit_id)
);

-- --------------------------------------------------------------------
-- updated_at triggers (kits only — others are append-mostly)
-- --------------------------------------------------------------------
create or replace function public.set_updated_at() returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists kits_set_updated_at on public.kits;
create trigger kits_set_updated_at
  before update on public.kits
  for each row execute function public.set_updated_at();

-- --------------------------------------------------------------------
-- Row Level Security
-- --------------------------------------------------------------------
alter table public.kits enable row level security;
alter table public.kit_files enable row level security;
alter table public.purchases enable row level security;
alter table public.purchase_downloads enable row level security;

-- Public read on the catalog (the storefront IS the public face)
drop policy if exists "kits public read" on public.kits;
create policy "kits public read"
  on public.kits for select
  using (true);

drop policy if exists "kit_files public read" on public.kit_files;
create policy "kit_files public read"
  on public.kit_files for select
  using (true);

-- Purchases: by default no one can read directly. The library page hits
-- a server route that uses the service role + validates email+token,
-- which keeps the buyer flow simple without requiring a full auth stack
-- for MVP.
drop policy if exists "purchases service only" on public.purchases;
create policy "purchases service only"
  on public.purchases for all
  using (false)
  with check (false);

drop policy if exists "purchase_downloads service only" on public.purchase_downloads;
create policy "purchase_downloads service only"
  on public.purchase_downloads for all
  using (false)
  with check (false);

-- --------------------------------------------------------------------
-- Seed: catalog rows.
-- Re-runnable — uses ON CONFLICT to upsert.
-- The Stripe price IDs live in env vars, not in the DB.
-- --------------------------------------------------------------------
insert into public.kits (id, slug, name, description, price_cents, ai_target, bundle_only) values
  ('ts-next-production', 'ts-next-production', 'TypeScript + Next.js Production Pack',
    'A senior-engineer companion for shipping production Next.js + Supabase apps. Drop the SKILL.md into your project and Claude starts writing code that matches your file structure, respects your auth boundary, and ships clean PRs.',
    1900, 'claude-code', false),
  ('supabase-schema-rls', 'supabase-schema-rls', 'Supabase Schema & RLS Pack',
    'Everything Chris has learned modelling multi-tenant Postgres for Sovren Sports and TradePass, distilled into a SKILL.md the AI can lean on.',
    1900, 'claude-code', false),
  ('stripe-connect', 'stripe-connect', 'Stripe Connect Implementation Pack',
    'The Stripe docs cover the happy path. This kit covers everything that happens after: failed webhooks, partial refunds, chargebacks while a payout is in flight, contract changes mid-season.',
    1900, 'claude-code', false),
  ('trades-construction', 'trades-construction', 'Trades & Construction Workflow Pack',
    'Built by a journeyman pipefitter who got tired of writing the same toolbox-talks, fit-for-duty letters, and orientation packets over and over.',
    1400, 'any', false),
  ('startup-founder', 'startup-founder', 'Startup Founder Toolkit',
    'The communication tools you actually need as a solo or small-team founder. Each prompt was sharpened against real investor feedback.',
    1400, 'any', false),
  ('apple-style-ux', 'apple-style-ux', 'Apple-Style UX Pack',
    'The taste primer Chris uses on every product. Walks the AI through the actual Apple HIG decisions — what to put on screen, what to hide, how to write the button.',
    1900, 'any', false),
  ('real-estate-pro', 'real-estate-pro', 'Real Estate Listings + Market Analysis',
    'Built for agents and brokers who''d rather be showing houses than writing copy.',
    1400, 'any', false),
  ('sales-outreach-pro', 'sales-outreach-pro', 'Sales Cold Outreach + Follow-up',
    'The frameworks that turn ''just touching base'' into actual meetings. PAS, BAB, AIDA — each adapted for the modern AI workflow.',
    1400, 'any', false),
  ('solopreneur-toolkit', 'solopreneur-toolkit', 'Solopreneur Toolkit',
    'Everything a freelancer, consultant, or indie operator needs to run the business side of their business.',
    1400, 'any', false),
  ('seo-content-writer', 'seo-content-writer', 'SEO Content Writer',
    'Built for content marketers who ship 3+ articles a week and can''t afford one of them to be wasted.',
    1400, 'any', false),
  ('recruiter-pro', 'recruiter-pro', 'Recruiter Outreach + JD Writer',
    'Built with input from in-house and agency recruiters who''d been burned by generic AI tools.',
    1400, 'any', false),
  ('resume-job-search', 'resume-job-search', 'Resume + Job Search Pack',
    'Everything you''d hand a friend job-hunting in a tough market. Tailoring is the move — generic résumés get filtered out before a human reads them.',
    1400, 'any', false),
  ('pm-toolkit', 'pm-toolkit', 'Product Manager Toolkit',
    'Built for PMs who are sick of writing the same PRD shape from scratch every time. Drop-in prompts for every artifact a PM ships.',
    1400, 'any', false),
  ('newsletter-writer', 'newsletter-writer', 'Newsletter / Substack Writer',
    'For solo newsletter writers shipping weekly. Each prompt was sharpened against real Substack/Beehiiv metrics — opens, clicks, and unsubs.',
    1400, 'any', false),
  ('ios-swiftui', 'ios-swiftui', 'iOS / SwiftUI Production Pack',
    'For indie iOS devs and small teams shipping SwiftUI apps. Built to make Claude/Cursor produce idiomatic Swift, not RxJava-flavored Kotlin-isms.',
    1900, 'claude-code', false),
  ('python-data', 'python-data', 'Python Data Analysis Pack',
    'Built for analysts and data scientists who pair with AI for half their notebooks. Replaces the constant ''how do I do this in pandas'' loop.',
    1900, 'claude-code', false),
  ('support-templates', 'support-templates', 'Customer Support Templates',
    'For support leads and solo founders handling tickets. Every template comes in three tones so the same response fits a Series A SaaS or a candle subscription.',
    1400, 'any', false),
  ('brand-voice', 'brand-voice', 'Brand Voice Builder',
    'Replaces the consultant who used to charge $5k for a ''voice & tone'' document. Feed it samples, get a voice-attribute matrix and on-brand vs. off-brand examples.',
    1400, 'any', false),
  ('coach-pro', 'coach-pro', 'Coach / Trainer / Therapist Pack',
    'Built for life coaches, trainers, and licensed therapists who run a solo practice. Includes explicit not-professional-advice scaffolding so the AI never overreaches.',
    1400, 'any', false),
  ('ecommerce-pro', 'ecommerce-pro', 'E-commerce / Shopify Owner Pack',
    'For solo and small-team Shopify owners shipping multiple SKUs. Replaces a $300/mo copywriting subscription that never quite gets your brand voice right.',
    1400, 'any', false),
  ('android-kotlin', 'android-kotlin', 'Android / Kotlin Pack',
    'Drop this kit at the root of your project as `SKILL.md` or paste it into your AI''s system prompt. It teaches Claude (or any code-capable model) to write modern Android — Jetpack Compose, Material 3, Coroutines, Hilt, Room — not 2017 XML Fragments with AsyncTask.',
    1900, 'claude-code', false),
  ('data-engineer-pro', 'data-engineer-pro', 'Data Engineer Pack',
    'Drop this kit at the root of your data repo as `SKILL.md` or paste it into your AI''s system prompt. It teaches Claude (or any code-capable model) to build ELT pipelines and dbt projects that survive a Monday morning backfill — staging layer respected, contracts honored, tests written first.',
    1900, 'claude-code', false),
  ('devops-terraform', 'devops-terraform', 'DevOps / Terraform / AWS Pack',
    'Drop this kit at the root of your infrastructure repo as `SKILL.md` or paste it into your AI''s system prompt. It teaches Claude (or any code-capable model) to write Terraform the way a platform team that''s been burned a few times writes it — small modules, scoped IAM, remote state, no surprises in `plan`.',
    1900, 'claude-code', false),
  ('go-backend', 'go-backend', 'Go Backend Pack',
    'Drop this kit at the root of your project as `SKILL.md` or paste it into your AI''s system prompt. It teaches Claude (or any code-capable model) to write idiomatic Go — context everywhere, errors wrapped with `%w`, no panic for control flow, graceful shutdown by default.',
    1900, 'claude-code', false),
  ('graphql-design', 'graphql-design', 'GraphQL API Design Pack',
    'Drop this kit at the root of your project as `SKILL.md` or paste it into your AI''s system prompt. It teaches Claude (or any code-capable model) to design GraphQL schemas that don''t blow up on day 2 — DataLoader on every resolver, Relay-style pagination, nullable-by-design, deprecation instead of breaking changes.',
    1900, 'claude-code', false),
  ('kubernetes-pro', 'kubernetes-pro', 'Kubernetes Pack',
    'Drop this kit at the root of your manifests repo as `SKILL.md` or paste it into your AI''s system prompt. It teaches Claude (or any code-capable model) to write Kubernetes the way a team that''s been on call for it writes it — pinned tags, bounded resources, GitOps-only changes, real observability.',
    1900, 'claude-code', false),
  ('ml-engineer-pro', 'ml-engineer-pro', 'Machine Learning Engineer Pack',
    'Drop this kit at the root of your ML repo as `SKILL.md` or paste it into your AI''s system prompt. It teaches Claude (or any code-capable model) to ship ML systems the way you''d want a senior ML engineer to ship them — with model cards, real eval frameworks, prompts versioned like code, and drift monitoring that fires before customers notice.',
    1900, 'claude-code', false),
  ('node-backend', 'node-backend', 'Node.js Backend Pack',
    'Drop this kit at the root of your project as `SKILL.md` or paste it into your AI''s system prompt. It teaches Claude (or any code-capable model) to write Node + TypeScript backends that don''t fall over at 100 RPS, don''t leak secrets, and don''t lose requests on shutdown.',
    1900, 'claude-code', false),
  ('postgres-dba', 'postgres-dba', 'Postgres DBA Pack',
    'Drop this kit at the root of your project as `SKILL.md` or paste it into your AI''s system prompt. It teaches Claude (or any code-capable model) to tune Postgres the way a DBA who''s been paged at 3am tunes it — EXPLAIN ANALYZE first, indexes second, migrations last and carefully.',
    1900, 'claude-code', false),
  ('python-backend', 'python-backend', 'Python Backend Pack (Django / FastAPI)',
    'Drop this kit at the root of your project as `SKILL.md` or paste it into your AI''s system prompt. It teaches Claude (or any code-capable model) to write Python backends that don''t N+1, don''t block the event loop, and don''t ship with sync ORM calls inside async routes.',
    1900, 'claude-code', false),
  ('qa-test-automation', 'qa-test-automation', 'QA / Test Automation Pack',
    'Drop this kit at the root of your test repo as `SKILL.md` or paste it into your AI''s system prompt. It teaches Claude (or any code-capable model) to write Playwright and Cypress tests that don''t flake on a Monday morning, test plans that catch real bugs, and CI shards that finish before the coffee gets cold.',
    1400, 'any', false),
  ('rails-backend', 'rails-backend', 'Ruby on Rails Pack',
    'Drop this kit at the root of your project as `SKILL.md` or paste it into your AI''s system prompt. It teaches Claude (or any code-capable model) to write Rails 7/8 the way an actual Rails team writes it — convention-first, Hotwire-default, no service-object cargo cult.',
    1900, 'claude-code', false),
  ('react-native-dev', 'react-native-dev', 'React Native / Mobile Dev Pack',
    'Drop this kit at the root of your project as `SKILL.md` or paste it into your AI''s system prompt. It teaches Claude (or any code-capable model) to write React Native that runs cleanly on iOS and Android — not browser React copy-pasted into a Metro bundle.',
    1900, 'claude-code', false),
  ('rest-api-design', 'rest-api-design', 'REST API Design Pack',
    'Drop this kit at the root of your API project as `SKILL.md` or paste it into your AI''s system prompt. It teaches Claude (or any code-capable model) to design REST APIs that survive contact with web clients, mobile apps, and third-party partners — without turning into RPC or breaking on the next sprint.',
    1900, 'claude-code', false),
  ('security-engineer', 'security-engineer', 'Security Engineer Pack',
    'Drop this kit at the root of your repo as `SKILL.md` or paste it into your AI''s system prompt. It teaches Claude (or any code-capable model) to think like a security engineer: threat-model before features, allowlist before blacklist, and write security review notes that actually catch bugs.',
    1900, 'claude-code', false),
  ('accountant-bookkeeper', 'accountant-bookkeeper', 'Accountant + Bookkeeper Pack',
    'AI workflow pack for solo and small-firm accountants and bookkeepers — client intake, monthly close summaries, advisory comms, engagement letter clauses, and AR follow-up. Built to keep the audit trail clean and the client comms calm.',
    1400, 'any', false),
  ('financial-advisor', 'financial-advisor', 'Financial Advisor Pack',
    'AI workflow pack for fee-only and dually-registered financial advisors — client review prep, market-summary comms, retirement-plan check-ins, meeting agendas, follow-up notes. NOT INVESTMENT ADVICE — consult a licensed fee-only CFP, CFA, or IAR for any specific recommendation. The AI does not predict markets, does not recommend specific securities, and does not replace your fiduciary judgment.',
    1400, 'any', false),
  ('insurance-agent', 'insurance-agent', 'Insurance Agent (P&C / Life) Pack',
    'AI workflow pack for licensed P&C and Life/Health insurance agents — quote walkthroughs, policy explainers, renewal outreach, claim-event communication, life-event reviews. NOT LEGAL OR COVERAGE ADVICE — consult your underwriter or licensed agent. The AI does not interpret policy language as binding, does not predict claim outcomes, and does not recommend dropping coverage.',
    1400, 'any', false),
  ('mortgage-broker', 'mortgage-broker', 'Mortgage Broker Pack',
    'AI workflow pack for working mortgage brokers — client intake, pre-approval drafts, refi outreach, rate-update comms, jurisdiction-aware (US and Canada). NOT licensed mortgage advice for your specific situation — consult a licensed mortgage broker. Rates and terms are illustrative, never binding.',
    1400, 'any', false),
  ('real-estate-investor', 'real-estate-investor', 'Real Estate Investor Pack',
    'AI workflow pack for small-to-mid real estate investors — LOIs, seller outreach, partner pitches, and deal-analysis prompts. Built for the operator running 1-50 doors or 1-10 flips a year.',
    1400, 'any', false),
  ('career-coach', 'career-coach', 'Career Coach Pack',
    'AI workflow pack for solo career coaches and small coaching practices. Client intake, content marketing, accountability check-ins, resume + LinkedIn review notes, networking-outreach drafts. Built for the practitioner working with mid-career professionals in transition.',
    1400, 'any', false),
  ('executive-coach', 'executive-coach', 'Executive Coach Pack',
    'AI workflow pack for ICF / EMCC / CCE-credentialed executive coaches working with VP / C-level clients. Session prep, client comms, leadership-framework writeups, 360-feedback synthesis, contracting language, boundary-holding scripts.',
    1400, 'any', false),
  ('hr-generalist', 'hr-generalist', 'HR Generalist Pack',
    'AI workflow pack for HR generalists — policy drafts, internal announcements, handbook updates, employee comms, and performance review templates. Built to surface what''s risky and flag it before you send.',
    1400, 'any', false),
  ('internal-recruiter', 'internal-recruiter', 'Internal Recruiter Pack',
    'AI workflow pack for embedded corporate recruiters — hiring-manager intake, JD calibration with inclusive-language audit, offer-letter prep, candidate communication at every stage, debrief facilitation. The req-closing side of the function.',
    1400, 'any', false),
  ('learning-development', 'learning-development', 'L&D Specialist Pack',
    'AI workflow pack for L&D specialists and learning designers — training-program outlines, learning-objective drafts (Bloom''s-aligned), facilitator guides, post-session surveys, manager-enablement comms, and the Kirkpatrick measurement nobody actually does.',
    1400, 'any', false),
  ('talent-acquisition', 'talent-acquisition', 'Talent Acquisition Specialist Pack',
    'AI workflow pack for Talent Acquisition Specialists — sourcing strategy, talent market mapping, candidate marketing, employer-brand content, and pipeline-health storytelling. The strategic cut of the recruiting function, not the req-closing cut.',
    1400, 'any', false),
  ('compliance-officer', 'compliance-officer', 'Compliance Officer Pack',
    'AI workflow pack for compliance officers — policy drafts, audit-readiness checklists (SOC 2, ISO 27001, HIPAA, GDPR, PIPEDA), and employee training summaries. NOT LEGAL ADVICE — consult qualified counsel, your firm''s compliance officer, and the relevant regulator. Regulated industries vary (healthcare/HIPAA, financial services/SOX/Dodd-Frank, EU/GDPR, Canadian PIPEDA); the AI does not certify compliance and does not replace the human compliance professional''s regulator relationship.',
    1400, 'any', false),
  ('ea-va', 'ea-va', 'Executive Assistant / Virtual Assistant Pack',
    'AI workflow pack for executive assistants and virtual assistants — calendar coordination, email triage drafts, travel itineraries, expense follow-ups, gatekeeping comms. Built to protect the principal''s time without sounding like a robot.',
    1400, 'any', false),
  ('office-manager', 'office-manager', 'Office Manager Pack',
    'AI workflow pack for office managers — vendor outreach, internal comms, small-event planning, facilities tickets, supply orders. Built for the person who''s quietly running the room.',
    1400, 'any', false),
  ('operations-manager', 'operations-manager', 'Operations Manager Pack',
    'AI workflow pack for working Operations Managers — SOPs that someone can actually follow, KPI reviews that surface signal not noise, escalation matrices, and leadership briefings that don''t bury bad news.',
    1400, 'any', false),
  ('procurement-pro', 'procurement-pro', 'Procurement Specialist Pack',
    'AI workflow pack for procurement specialists — RFx documents (RFI/RFQ/RFP), supplier communications, contract review checklists, and savings reports that survive finance scrutiny. Not a substitute for legal counsel on contract terms.',
    1400, 'any', false),
  ('project-manager-pmp', 'project-manager-pmp', 'Project Manager (PMP-Style) Pack',
    'AI workflow pack for project managers — charters, status reports, RAID logs, change requests, stakeholder comms. PMP-aware structure without the certification-exam voice.',
    1400, 'any', false),
  ('risk-manager', 'risk-manager', 'Risk Manager Pack',
    'AI workflow pack for enterprise risk managers — risk registers, mitigation plans, board summaries with heat maps, incident postmortems, and scenario-planning prompts. The AI doesn''t replace ERM frameworks (ISO 31000, COSO ERM, NIST RMF, FAIR) or D&O liability assessment — that''s the human risk manager''s job. Built to write risk language that''s neither CYA nor dismissive — clear-eyed, at the right altitude, with probability talk that holds up.',
    1400, 'any', false),
  ('scrum-master', 'scrum-master', 'Scrum Master Pack',
    'AI workflow pack for working Scrum Masters — retro formats, sprint review prep, blocker escalation language, ceremony agendas, and the stakeholder conversations that keep velocity from being weaponized.',
    1400, 'any', false),
  ('supply-chain-mgr', 'supply-chain-mgr', 'Supply Chain Manager Pack',
    'AI workflow pack for working Supply Chain Managers — vendor evaluation, RFP/RFQ drafting, supplier scorecards, supply disruption comms, and the category strategy work that actually moves the cost line.',
    1400, 'any', false),
  ('contractor-gc', 'contractor-gc', 'General Contractor Pack',
    'Bidding, scope of work, change orders, subcontractor coordination, and owner updates for small and mid-size GCs. Built around the change-order-discipline triangle that protects margin on residential and light-commercial work.',
    1400, 'any', false),
  ('electrician-pro', 'electrician-pro', 'Electrician Pack',
    'Service descriptions, code-referenced explanations, customer estimates, and trust-building copy for licensed electricians. Defaults to verifying local code (NEC/CEC) and your AHJ — never quotes code without a verification flag.',
    1400, 'any', false),
  ('handyman-pro', 'handyman-pro', 'Handyman / Maintenance Pack',
    'Small-job quoting, local social-post marketing, and scope-discipline language for solo handymen and small crews. The Green/Yellow/Red framework keeps you out of jobs that should go to a licensed trade.',
    1400, 'any', false),
  ('hvac-pro', 'hvac-pro', 'HVAC Tech Pack',
    'Install proposals, maintenance contracts, and seasonal upsell language for HVAC contractors and service techs. Includes the Manual J / AHRI match / cold-climate heat-pump education most homeowners are missing.',
    1400, 'any', false),
  ('landscaper-pro', 'landscaper-pro', 'Landscape + Yard Care Pack',
    'Service contracts, snow contracts, design-build proposals, and weather-driven schedule comms for landscape companies. Built around the seasonal rhythm — weather is the boss and the writing reflects it.',
    1400, 'any', false),
  ('plumber-pro', 'plumber-pro', 'Plumber Pack',
    'Emergency-and-scheduled service descriptions, troubleshooting customer comms, and transparent pricing language for licensed plumbers. Pairs the empathy script that water-damage calls require with the technical clarity homeowners trust.',
    1400, 'any', false),
  ('roofing-pro', 'roofing-pro', 'Roofing Contractor Pack',
    'Inspection reports, supplement requests, deductible-education copy, and customer-friendly warranty docs for roofing contractors. Strict lane discipline on insurance work — refers claim advice to a licensed public adjuster or attorney.',
    1400, 'any', false),
  ('auto-mechanic', 'auto-mechanic', 'Auto Mechanic Pack',
    'Repair estimates, customer-friendly explanations of technical issues, follow-up notes, and declined-repair documentation for independent shops. The 4-part explanation pattern that closes the trust gap with skeptical customers.',
    1400, 'any', false),
  ('cleaning-services', 'cleaning-services', 'Cleaning Service Owner Pack',
    'Service quotes (recurring, one-time, deep, move-out), client retention emails, and one-page staff training docs for residential and commercial cleaning companies. Engineered around the month-3 retention cliff.',
    1400, 'any', false),
  ('moving-company', 'moving-company', 'Moving + Junk Removal Pack',
    'Quote requests, inventory walkthroughs, day-of customer comms, and neutral claims-response language for small moving and junk-removal companies. Refuses interstate-tariff guidance — defers to USDOT/FMCSA and counsel.',
    1400, 'any', false),
  ('airbnb-host', 'airbnb-host', 'Airbnb / Short-Term Rental Host Pack',
    'Listing copy, guest comms (pre-arrival, mid-stay, post-stay), house manuals, and review-response language for STR hosts running 1-5 properties. Designed for the 5-star streak without turning your house into a hotel.',
    1400, 'any', false),
  ('cafe-owner', 'cafe-owner', 'Cafe / Coffee Shop Pack',
    'Drink menus, seasonal launches, loyalty program copy, and Instagram posts for specialty cafes. Avoids twee coffee-shop talk while staying warm and specific to your roaster and bake program.',
    1400, 'any', false),
  ('event-caterer', 'event-caterer', 'Event Caterer Pack',
    'Proposals (drop-off, buffet, plated, stationed), dietary-accommodation menus, vendor-coordination emails, and post-event follow-up for event caterers. Confident chef-led voice without the chef-bro edge.',
    1400, 'any', false),
  ('hotel-operator', 'hotel-operator', 'Hotel / B&B Operator Pack',
    'Booking confirmations, concierge comms, OTA vs direct-site marketing, and review-handling language for independent hotels, B&Bs, and boutique inns. Includes accessibility-compliance guardrails (ADA + Canadian equivalents).',
    1400, 'any', false),
  ('restaurant-owner', 'restaurant-owner', 'Restaurant Owner Pack',
    'Menu descriptions, supplier emails, staff scheduling notes, and customer-review responses for independent restaurant owners. Built by someone who has worked the line — speaks plainly about razor-thin margins.',
    1400, 'any', false),
  ('florist-pro', 'florist-pro', 'Florist Pack',
    'AI workflow pack for working florists writing arrangement descriptions, event proposals, seasonal marketing, and supplier RFQs without sounding like a stock photo caption.',
    1400, 'any', false),
  ('photographer-pro', 'photographer-pro', 'Photographer Pack',
    'AI workflow pack for working photographers — wedding, portrait, commercial — handling proposals, shot lists, delivery emails, gallery announcements, and pricing conversations without sounding like a stock site.',
    1400, 'any', false),
  ('videographer-pro', 'videographer-pro', 'Videographer / Filmmaker Pack',
    'AI workflow pack for working videographers and filmmakers — pitch decks, treatments, client recap emails, edit-review notes, and the comms that keep projects from going sideways.',
    1400, 'any', false),
  ('wedding-planner', 'wedding-planner', 'Wedding Planner Pack',
    'AI workflow pack for wedding planners running intake, vendor coordination, timelines, day-of run-of-show, and contract negotiation without losing the thread.',
    1400, 'any', false),
  ('blogger-pro', 'blogger-pro', 'Blogger / SEO Site Owner Pack',
    'Built for the person running a niche site doing 50k-500k pageviews a month from search. Sharpened against the editorial decisions that move RPM, not the "ultimate SEO guide" content that fills marketing blogs. The prompts in this pack are written for someone who''s already published 200 posts and knows what works — they just need to do it faster.',
    1400, 'any', false),
  ('instagram-influencer', 'instagram-influencer', 'Instagram Creator Pack',
    'Built for creators who treat Instagram as a craft, not a content factory. The prompts here were sharpened against the captions, story sequences, and brand pitch emails that move 10k-following accounts into real partnerships — not the "5 secrets to grow your IG" advice that''s been recycled since the algorithm cared about likes.',
    1400, 'any', false),
  ('linkedin-creator', 'linkedin-creator', 'LinkedIn Content Creator Pack',
    'Built for the B2B operator, founder, or consultant who''s posting 3-5x a week to build a pipeline that doesn''t depend on cold outreach. Sharpened against the posts that actually get DMs from buyers — not the ones that get 800 likes from other creators trying to sell you a LinkedIn course.',
    1400, 'any', false),
  ('podcaster-pro', 'podcaster-pro', 'Podcaster Pack',
    'Built for indie podcasters who are also the producer, the editor, the booker, the social manager, and the person who still has a day job. The prompts here were sharpened against the stuff that actually moves downloads — pre-interview research that makes guests open up, show notes people copy-paste, social clips that get reposted — not the LinkedIn-podcaster fluff that fills every Substack about "growing your show."',
    1400, 'any', false),
  ('tiktok-creator', 'tiktok-creator', 'TikTok Creator Pack',
    'Built for creators who actually post — 3-7 times a week, watching their retention graph the next morning, deleting underperformers, riding trends that fit and skipping the ones that don''t. The prompts here were sharpened against the hooks, captions, and trend-fit decisions that move accounts from 5k to 500k — not the "how to go viral" advice you''ve already scrolled past a hundred times.',
    1400, 'any', false),
  ('twitch-streamer', 'twitch-streamer', 'Twitch / Live Streamer Pack',
    'Built for streamers who actually stream — the kind of people who go live four to six nights a week and treat the channel like a craft, not a hustle deck. The prompts here were sharpened against the bios, schedule posts, and sponsor decks that move chatters into subs and brands into paid deals — not the "level up your stream" advice that''s been recycled since 2017.',
    1400, 'any', false),
  ('youtuber-creator', 'youtuber-creator', 'YouTuber Pack',
    'Built for long-form YouTubers who treat their channel like a craft, not a content treadmill. The prompts here were sharpened against the actual scripts, titles, and thumbnails that earn double-digit CTR on cold audiences — not the "10 tips to grow your YouTube channel" energy that''s already polluted the algorithm.',
    1400, 'any', false),
  ('author-novelist', 'author-novelist', 'Author / Novelist Pack',
    'Built for the fiction writer who has a manuscript or a serious draft and is trying to make it land — character work that holds up, a plot that earns its turns, a query letter that gets requests instead of form rejections. Sharpened against the queries that have actually gotten agent calls in the last two years, not the "10 query letter mistakes" content that fills every writing blog.',
    1400, 'any', false),
  ('comedy-writer', 'comedy-writer', 'Comedy Writer Pack',
    'Built for working comedy writers — late-night packet submitters, standups developing 5-minute sets, sketch writers, sitcom hopefuls, and social-first comedians making a living 30 seconds at a time. The patterns in this pack were sharpened against actual produced material, not AI''s idea of what a joke looks like. If the AI''s last attempt was a knock-knock joke, this kit is the antidote.',
    1400, 'any', false),
  ('screenwriter-pro', 'screenwriter-pro', 'Screenwriter Pack',
    'Built for the working or aspiring screenwriter — features, TV pilots, shorts — who needs loglines that pop, beat sheets that hold, and treatments that read like the writer has been in a room before. Sharpened against the loglines, treatments, and pilot scripts that have actually gotten meetings in the last two years, not the "10 logline mistakes" content that fills every screenwriting blog.',
    1400, 'any', false),
  ('songwriter-pro', 'songwriter-pro', 'Songwriter / Lyricist Pack',
    'Built for the working songwriter — pop, country, Americana, indie, sync — who needs to turn an idea into a song that actually sings and might actually get cut. Sharpened against the songs that have placed in the last two years on Music Row, in sync libraries, and on indie releases that move — not the "how to write a hit" content that fills every songwriting blog.',
    1400, 'any', false),
  ('speechwriter-pro', 'speechwriter-pro', 'Speechwriter Pack',
    'Built for people who write speeches that have to land in real rooms — keynotes that follow a CEO who went over time, eulogies written in 36 hours, town halls where layoffs are the subtext, wedding toasts that have to be funny without becoming a roast. The patterns in this pack were sharpened against the openers and closers that actually got remembered, and the ones that died in the second row.',
    1400, 'any', false),
  ('translator-localization', 'translator-localization', 'Translator / Localization Pack',
    'Built for working translators and localization PMs who can already translate — the AI''s job here is to handle the surrounding work that eats your week: style-guide drafts, glossary management, locale-specific notes for software and game strings, and the project quotes that decide whether a project is profitable. The patterns in this pack were sharpened against the briefs that arrive at 4pm Friday with "small project, quick turnaround" in the subject line.',
    1400, 'any', false),
  ('graphic-designer-pro', 'graphic-designer-pro', 'Graphic Designer / Illustrator Pack',
    'Built for working designers and illustrators running client work — brand identity, web, print, illustration — who spend more time writing about design than designing. The patterns in this pack were sharpened against the discovery calls, proposals, and rationale docs that actually closed projects, not the ones that got ghosted. If your last brief said "modern and clean," this kit is the antidote.',
    1400, 'any', false),
  ('music-producer', 'music-producer', 'Music Producer Pack',
    'AI workflow pack for working music producers — client onboarding, session plans, mix-revision comms, sample-clearance language, and the documentation that keeps records from getting stuck in revision hell.',
    1400, 'any', false),
  ('voice-actor-pro', 'voice-actor-pro', 'Voice Actor Pack',
    'Built for working VO artists who self-tape 5-15 auditions a week and need a thinking partner who actually understands specs, character work, and the difference between a demo that books and a demo that gets skipped at 0:08. The prompts in this pack were sharpened against the kind of copy that comes through P2P sites at midnight with a noon deadline.',
    1400, 'any', false),
  ('chiropractor-pro', 'chiropractor-pro', 'Chiropractor Pack',
    'Built for chiropractors writing the new-patient intake summary between appointments, drafting a treatment plan the patient understands and the insurer respects, and producing patient education that''s evidence-anchored rather than reflexive. The prompts in this pack are sharpened against the documentation and conversations that actually move patients through a course of care — not the textbook version.',
    1400, 'any', false),
  ('nurse-practitioner', 'nurse-practitioner', 'Nurse Practitioner Pack',
    'Built for NPs who are documenting between patients, writing the after-visit summary that has to actually help, and producing patient education that the patient will read instead of toss. The prompts in this pack are sharpened against the visit notes, handouts, and care plans that get written between encounters — not the textbook version.',
    1400, 'any', false),
  ('pharmacist-pro', 'pharmacist-pro', 'Pharmacist Pack',
    'Built for pharmacists who are doing real counseling between phone rings, processing a tech''s queue, writing a prior-auth letter that has to land, and starting an MTM consult with a patient who''s holding seven bottles. The prompts in this pack were sharpened against the conversations and paperwork that actually move drugs from the shelf into a patient''s hands — not the textbook version.',
    1400, 'any', false),
  ('physical-therapist', 'physical-therapist', 'Physical Therapist Pack',
    'Built for PTs who are writing a home-exercise program between patients, scaffolding a SOAP note 20 minutes after the patient left, and drafting a discharge summary the referring physician will actually read. The prompts in this pack are sharpened against the exercise sheets, daily notes, and discharge documents that get turned out between treatments — not the textbook version.',
    1400, 'any', false),
  ('veterinarian-pro', 'veterinarian-pro', 'Veterinarian / Vet Tech Pack',
    'Built for the DVM or RVT writing a discharge after a 14-patient surgical day, drafting client education for a new diagnosis, and producing the financial-options script that has to be honest without being cold. The prompts in this pack are sharpened against the discharge instructions, exam-room conversations, and end-of-life talks that happen on actual veterinary days — not the textbook version.',
    1400, 'any', false),
  ('estate-planning', 'estate-planning', 'Estate Planning + Will Conversations Pack',
    'Built for people preparing to make or update a will, getting ready to talk to family about end-of-life wishes, or stepping into an executor role. The prompts here came from real kitchen-table conversations and real first-meeting attorney intakes — not legalese, not avoidance.',
    1400, 'any', false),
  ('home-renovation', 'home-renovation', 'Home Renovation Planning Pack',
    'Built for homeowners taking on a renovation — kitchen, bath, addition, basement, exterior. The prompts here came out of real scope docs, real change orders, and the moment in week 6 when "while we''re at it" was about to add $11,000 to the budget.',
    1400, 'any', false),
  ('personal-finance', 'personal-finance', 'Personal Finance / Budgeting Pack',
    'Built for people managing their own money — building a budget, paying down debt, saving toward real goals, navigating CAD or USD personal finance. The prompts here came out of working spreadsheets that actually got people out of credit-card debt, not "just cut your latte" advice.',
    1400, 'any', false),
  ('travel-planner-pro', 'travel-planner-pro', 'Travel Planning Pack',
    'Built for people planning their own trips — weekenders, two-week explorers, multi-stop loops, families herding small humans through airports. The prompts here came out of itineraries that actually worked when the rain rolled in, the kid melted down, or the original plan fell apart at 11 AM.',
    1400, 'any', false),
  ('wedding-planning-self', 'wedding-planning-self', 'Wedding Planning (DIY) Pack',
    'Built for engaged couples planning their own wedding without a full-service planner. The prompts here came out of real budget spreadsheets that hit $5K, $30K, and $80K weddings — not the Pinterest-shaped fantasy that gets people in trouble three months out.',
    1400, 'any', false)
on conflict (id) do update set
  slug         = excluded.slug,
  name         = excluded.name,
  description  = excluded.description,
  price_cents  = excluded.price_cents,
  ai_target    = excluded.ai_target,
  bundle_only  = excluded.bundle_only,
  updated_at   = now();
