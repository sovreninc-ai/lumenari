-- ====================================================================
-- Lumenari — newsletter subscribers (0012_newsletter_subscribers.sql)
--
-- A `newsletter_subscriber` is anyone who handed us their email through
-- the homepage or footer signup form. Distinct from `leads` (which is
-- tied to the free-kit lead magnet flow + Resend audience tracking) so
-- the two funnels can evolve independently and we don't have to
-- retrofit `leads` columns for newsletter-specific fields.
--
-- One row per email, lowercase-normalized at insert. `source` captures
-- where the email came from (footer, homepage, reddit, ...) for future
-- attribution work.
--
-- RLS: service role only. The /api/subscribe + /api/unsubscribe routes
-- are the only writers and they use the service role explicitly.
-- ====================================================================

create extension if not exists "pgcrypto";

create table if not exists public.newsletter_subscribers (
  id               uuid primary key default gen_random_uuid(),
  email            text not null unique,
  created_at       timestamptz not null default now(),
  confirmed_at     timestamptz,
  unsubscribed_at  timestamptz,
  source           text
);

create index if not exists newsletter_subscribers_email_idx
  on public.newsletter_subscribers(lower(email));

create index if not exists newsletter_subscribers_active_idx
  on public.newsletter_subscribers(created_at)
  where unsubscribed_at is null;

-- --------------------------------------------------------------------
-- Row Level Security — service role only.
-- --------------------------------------------------------------------
alter table public.newsletter_subscribers enable row level security;

drop policy if exists "newsletter_subscribers service only"
  on public.newsletter_subscribers;
create policy "newsletter_subscribers service only"
  on public.newsletter_subscribers for all
  using (false)
  with check (false);
