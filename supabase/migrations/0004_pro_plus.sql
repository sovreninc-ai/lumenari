-- ====================================================================
-- Lumenari — Pro+ subscription columns (0004_pro_plus.sql)
--
-- Adds Pro+ membership state to the existing `purchases` table. We re-use
-- `purchases` rather than spinning up a new `subscriptions` table because
-- MVP-Lumenari keys access by email, not by user ID — so a single row can
-- represent "this email is Pro+" cleanly alongside their one-off kits.
--
-- One row per Stripe subscription (or per lifetime payment) via the
-- `stripe_subscription_id` UNIQUE constraint. Webhooks upsert on that key.
--
-- pro_status semantics:
--   active        → can download everything
--   trialing      → can download everything (Stripe trial)
--   past_due      → still has access; we'll dunning-email separately
--   cancelled     → access removed (also flips `pro` to false)
--   incomplete    → checkout not finished; ignore
-- ====================================================================

alter table public.purchases
  add column if not exists pro boolean not null default false;

alter table public.purchases
  add column if not exists pro_tier text
  check (pro_tier in ('monthly', 'annual', 'lifetime') or pro_tier is null);

alter table public.purchases
  add column if not exists pro_status text
  check (pro_status in ('active', 'trialing', 'past_due', 'cancelled', 'incomplete') or pro_status is null);

alter table public.purchases
  add column if not exists pro_renews_at timestamptz;

alter table public.purchases
  add column if not exists stripe_subscription_id text;

-- UNIQUE constraint on stripe_subscription_id so webhook upserts are idempotent.
-- Use a partial unique index because most purchase rows won't have a subscription.
do $$
begin
  if not exists (
    select 1 from pg_indexes
    where schemaname = 'public'
      and indexname = 'purchases_stripe_subscription_id_key'
  ) then
    create unique index purchases_stripe_subscription_id_key
      on public.purchases(stripe_subscription_id)
      where stripe_subscription_id is not null;
  end if;
end$$;

-- Index for the "is this email Pro+" lookup used on every download.
create index if not exists purchases_pro_email_idx
  on public.purchases(lower(email))
  where pro = true;
