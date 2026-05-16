-- ====================================================================
-- Lumenari — wishlists (0011_wishlists.sql)
--
-- Non-buyers (and Pro+/one-time buyers who haven't purchased a specific
-- kit) can "save" a kit. We track the saves in `wishlists`, keyed by
-- `lead_id` so it ties back to the email-capture flow on /free and to
-- any newsletter signup. A unique (lead_id, kit_slug) constraint keeps
-- duplicates out without us having to dedupe in app code.
--
-- The retention cron reads this table to fire the price-drop and
-- new-bundle notifications.
--
-- RLS: service role only, same as the other lead-driven tables. Reads
-- on /library go through a server route that asserts the lead identity
-- via the same signed link the welcome email uses.
-- ====================================================================

create extension if not exists "pgcrypto";

create table if not exists public.wishlists (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid not null references public.leads(id) on delete cascade,
  kit_slug      text not null,
  source        text not null default 'kit-detail',
  notified_at   timestamptz,
  metadata      jsonb default '{}'::jsonb,
  created_at    timestamptz not null default now()
);

-- Idempotent upsert key.
create unique index if not exists wishlists_lead_kit_unique
  on public.wishlists(lead_id, kit_slug);

create index if not exists wishlists_lead_idx
  on public.wishlists(lead_id);

create index if not exists wishlists_kit_idx
  on public.wishlists(kit_slug);

create index if not exists wishlists_notified_idx
  on public.wishlists(notified_at)
  where notified_at is null;

-- --------------------------------------------------------------------
-- Row Level Security
-- --------------------------------------------------------------------
alter table public.wishlists enable row level security;

drop policy if exists "wishlists service only" on public.wishlists;
create policy "wishlists service only"
  on public.wishlists for all
  using (false)
  with check (false);

-- --------------------------------------------------------------------
-- Helper view: most-wishlisted kits (used by the admin dashboard).
-- Idempotent via `create or replace view`.
-- --------------------------------------------------------------------
create or replace view public.wishlist_kit_counts as
select
  kit_slug,
  count(*)::int as save_count,
  count(*) filter (where notified_at is null)::int as unsent_count,
  max(created_at) as last_saved_at
from public.wishlists
group by kit_slug;
