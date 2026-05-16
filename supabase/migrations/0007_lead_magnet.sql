-- ====================================================================
-- Lumenari — lead magnet + email subscriber tracking (0007_lead_magnet.sql)
--
-- A `lead` is anyone who's given us their email without paying — they
-- claimed the free kit, signed up for the newsletter, or saved a kit to
-- a wishlist. Distinct from `purchases` (paying customers) because the
-- conversion funnel needs both populations and they're scored differently.
--
-- One row per email. Source captures where the lead came from. The
-- welcome series + retention automation reads `welcomed_at` to decide
-- which step to send next.
--
-- RLS: service role only. The /api/lead-magnet/claim route is the only
-- way an unauthenticated request creates a row, and it uses the service
-- role explicitly. Same pattern as `purchases`.
-- ====================================================================

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id                 uuid primary key default gen_random_uuid(),
  email              text not null unique,
  source             text not null default 'lead-magnet',
  claimed_kit_slug   text,
  resend_contact_id  text,
  welcomed_at        timestamptz default now(),
  converted_at       timestamptz,
  unsubscribed_at    timestamptz,
  metadata           jsonb default '{}'::jsonb
);

create index if not exists leads_email_idx on public.leads(lower(email));

create index if not exists leads_converted_idx
  on public.leads(converted_at)
  where converted_at is not null;

create index if not exists leads_unsubscribed_idx
  on public.leads(unsubscribed_at)
  where unsubscribed_at is null;

create index if not exists leads_welcomed_idx
  on public.leads(welcomed_at);

-- --------------------------------------------------------------------
-- Row Level Security
-- --------------------------------------------------------------------
alter table public.leads enable row level security;

drop policy if exists "leads service only" on public.leads;
create policy "leads service only"
  on public.leads for all
  using (false)
  with check (false);
