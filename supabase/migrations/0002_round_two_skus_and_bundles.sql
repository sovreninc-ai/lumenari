-- ====================================================================
-- Lumenari — round 2 expansion (0002_round_two_skus_and_bundles.sql)
--
-- 1) Adds the 5 new non-dev SKUs to the catalog.
-- 2) Introduces a `bundles` table for the per-vertical bundles plus
--    the everything bundle.
-- 3) Updates RLS — bundles are publicly readable like kits.
--
-- This migration is idempotent: re-applying it upserts rows rather than
-- failing.
-- ====================================================================

-- --------------------------------------------------------------------
-- bundles
-- --------------------------------------------------------------------
create table if not exists public.bundles (
  id             text primary key,
  slug           text not null unique,
  name           text not null,
  tagline        text not null default '',
  -- Ordered list of kit slugs included in the bundle.
  kit_slugs      text[] not null,
  price_cents    integer not null check (price_cents >= 0),
  featured       boolean not null default false,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

drop trigger if exists bundles_set_updated_at on public.bundles;
create trigger bundles_set_updated_at
  before update on public.bundles
  for each row execute function public.set_updated_at();

alter table public.bundles enable row level security;

drop policy if exists "bundles public read" on public.bundles;
create policy "bundles public read"
  on public.bundles for select
  using (true);

-- --------------------------------------------------------------------
-- Drop superseded bundles from earlier layouts. Safe to re-run.
-- --------------------------------------------------------------------
delete from public.bundles
where id in (
  'developer-trio',
  'operator-pack',
  'all-eleven',
  'real-estate-power-bundle',
  'sales-and-marketing-bundle'
);

-- --------------------------------------------------------------------
-- Seed: final 13-bundle catalog (re-runnable — uses ON CONFLICT to upsert).
-- The Stripe price IDs live in env vars, not in the DB.
-- --------------------------------------------------------------------
insert into public.bundles (id, slug, name, tagline, kit_slugs, price_cents, featured) values
  ('developer-quartet', 'developer-quartet',
    'Developer Quartet',
    'TypeScript + Next.js, Supabase RLS, Stripe Connect, and iOS / SwiftUI — the production trifecta plus mobile.',
    array['ts-next-production', 'supabase-schema-rls', 'stripe-connect', 'ios-swiftui'],
    5900, true),
  ('developer-mega-stack', 'developer-mega-stack',
    'Developer Mega Stack',
    'All 20 developer kits — full-stack TS, mobile, infra, databases, APIs, security. Saves $181.',
    array['android-kotlin', 'apple-style-ux', 'data-engineer-pro', 'devops-terraform', 'go-backend', 'graphql-design', 'ios-swiftui', 'kubernetes-pro', 'ml-engineer-pro', 'node-backend', 'postgres-dba', 'python-backend', 'python-data', 'rails-backend', 'react-native-dev', 'rest-api-design', 'security-engineer', 'stripe-connect', 'supabase-schema-rls', 'ts-next-production'],
    19900, true),
  ('builders-pack', 'builders-pack',
    'Builder''s Pack',
    'Founder + PM + Apple UX + Solopreneur — the comms, taste, and admin tools every solo builder needs.',
    array['startup-founder', 'pm-toolkit', 'apple-style-ux', 'solopreneur-toolkit'],
    4500, true),
  ('sales-and-marketing-pack', 'sales-and-marketing-pack',
    'Sales & Marketing Pack',
    'Sales Outreach + SEO + Newsletter + Brand Voice — the four highest-leverage revenue-side packs.',
    array['sales-outreach-pro', 'seo-content-writer', 'newsletter-writer', 'brand-voice'],
    4500, true),
  ('real-estate-power', 'real-estate-power',
    'Real Estate Power',
    'Real Estate Pro + Investor + Solopreneur + Brand Voice — every angle of a property-driven business.',
    array['real-estate-pro', 'real-estate-investor', 'solopreneur-toolkit', 'brand-voice'],
    4500, false),
  ('career-pack', 'career-pack',
    'Career Pack',
    'Resume + Recruiter Pro + Career Coach — both sides of the hiring table plus the coach.',
    array['resume-job-search', 'recruiter-pro', 'career-coach'],
    3500, false),
  ('hospitality-events-bundle', 'hospitality-events-bundle',
    'Hospitality / Events Bundle',
    'Weddings, hospitality, and event services — the nine kits that run the business behind the magic.',
    array['wedding-planner', 'florist-pro', 'photographer-pro', 'videographer-pro', 'restaurant-owner', 'cafe-owner', 'airbnb-host', 'hotel-operator', 'event-caterer'],
    8900, false),
  ('trades-pack', 'trades-pack',
    'Trades Pack',
    'Ten trades-and-service packs — back-office firepower for hands-on operators.',
    array['contractor-gc', 'electrician-pro', 'plumber-pro', 'hvac-pro', 'roofing-pro', 'landscaper-pro', 'handyman-pro', 'auto-mechanic', 'cleaning-services', 'moving-company'],
    9900, false),
  ('operations-pack', 'operations-pack',
    'Operations Pack',
    'HR, office, PM, scrum, ops, supply chain, procurement, compliance, risk — ten kits for the people who run the company.',
    array['hr-generalist', 'office-manager', 'ea-va', 'project-manager-pmp', 'scrum-master', 'operations-manager', 'supply-chain-mgr', 'procurement-pro', 'compliance-officer', 'risk-manager'],
    8900, false),
  ('creators-pack', 'creators-pack',
    'Creator''s Pack',
    'Podcaster + YouTuber + Twitch + TikTok + Instagram + LinkedIn + Blogger — seven creator-economy packs in one.',
    array['podcaster-pro', 'youtuber-creator', 'twitch-streamer', 'tiktok-creator', 'instagram-influencer', 'linkedin-creator', 'blogger-pro'],
    5900, false),
  ('healthcare-adjacent', 'healthcare-adjacent',
    'Healthcare-Adjacent',
    'Pharmacist + NP + PT + Chiropractor + Veterinarian — five clinical-comms packs with disclaimers baked in.',
    array['pharmacist-pro', 'nurse-practitioner', 'physical-therapist', 'chiropractor-pro', 'veterinarian-pro'],
    4900, false),
  ('finance-pack', 'finance-pack',
    'Finance Pack',
    'Accountant + Financial Advisor + Mortgage Broker + Insurance Agent — the four client-facing finance practices.',
    array['accountant-bookkeeper', 'financial-advisor', 'mortgage-broker', 'insurance-agent'],
    3900, false),
  ('everything-100', 'everything-100',
    'The Lumenari Everything Bundle (100)',
    'All 100 Lumenari kits. One checkout. The headline-grabber — saves $1,241+.',
    array['ts-next-production', 'supabase-schema-rls', 'stripe-connect', 'trades-construction', 'startup-founder', 'apple-style-ux', 'real-estate-pro', 'sales-outreach-pro', 'solopreneur-toolkit', 'seo-content-writer', 'recruiter-pro', 'resume-job-search', 'pm-toolkit', 'newsletter-writer', 'ios-swiftui', 'python-data', 'support-templates', 'brand-voice', 'coach-pro', 'ecommerce-pro', 'android-kotlin', 'data-engineer-pro', 'devops-terraform', 'go-backend', 'graphql-design', 'kubernetes-pro', 'ml-engineer-pro', 'node-backend', 'postgres-dba', 'python-backend', 'qa-test-automation', 'rails-backend', 'react-native-dev', 'rest-api-design', 'security-engineer', 'accountant-bookkeeper', 'financial-advisor', 'insurance-agent', 'mortgage-broker', 'real-estate-investor', 'career-coach', 'executive-coach', 'hr-generalist', 'internal-recruiter', 'learning-development', 'talent-acquisition', 'compliance-officer', 'ea-va', 'office-manager', 'operations-manager', 'procurement-pro', 'project-manager-pmp', 'risk-manager', 'scrum-master', 'supply-chain-mgr', 'contractor-gc', 'electrician-pro', 'handyman-pro', 'hvac-pro', 'landscaper-pro', 'plumber-pro', 'roofing-pro', 'auto-mechanic', 'cleaning-services', 'moving-company', 'airbnb-host', 'cafe-owner', 'event-caterer', 'hotel-operator', 'restaurant-owner', 'florist-pro', 'photographer-pro', 'videographer-pro', 'wedding-planner', 'blogger-pro', 'instagram-influencer', 'linkedin-creator', 'podcaster-pro', 'tiktok-creator', 'twitch-streamer', 'youtuber-creator', 'author-novelist', 'comedy-writer', 'screenwriter-pro', 'songwriter-pro', 'speechwriter-pro', 'translator-localization', 'graphic-designer-pro', 'music-producer', 'voice-actor-pro', 'chiropractor-pro', 'nurse-practitioner', 'pharmacist-pro', 'physical-therapist', 'veterinarian-pro', 'estate-planning', 'home-renovation', 'personal-finance', 'travel-planner-pro', 'wedding-planning-self'],
    24900, true)
on conflict (id) do update set
  slug         = excluded.slug,
  name         = excluded.name,
  tagline      = excluded.tagline,
  kit_slugs    = excluded.kit_slugs,
  price_cents  = excluded.price_cents,
  featured     = excluded.featured,
  updated_at   = now();
