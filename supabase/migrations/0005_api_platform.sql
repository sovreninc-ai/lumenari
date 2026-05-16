-- ====================================================================
-- Lumenari — API Platform schema (0005_api_platform.sql)
--
-- Turns the storefront's recommendation engine into a paid API product.
--
-- Tables:
--   api_tiers          enumerated subscription tiers (free / pro / business / enterprise)
--   api_accounts       paying customers — one row per email
--   api_keys           hashed API keys, multiple per account
--   api_usage_logs     one row per API call (90-day retention then aggregate/drop)
--
-- View:
--   api_usage_current_month   fast rate-limit lookup
--
-- RLS:
--   api_tiers       publicly readable (we render the pricing table)
--   everything else service-role only — dashboard hits a server route
--                   that validates the caller's email against the account
-- ====================================================================

create extension if not exists "pgcrypto";

-- --------------------------------------------------------------------
-- api_tiers
-- --------------------------------------------------------------------
create table if not exists public.api_tiers (
  id                   text primary key,
  name                 text not null,
  monthly_call_limit   int not null,          -- -1 means unlimited (enterprise)
  monthly_price_cents  int not null,
  features             jsonb not null default '[]'::jsonb,
  display_order        int not null default 0
);

insert into public.api_tiers
  (id, name, monthly_call_limit, monthly_price_cents, features, display_order)
values
  ('free',       'Free',       100,    0,
    '["100 calls/month","Personal use only","Community support"]'::jsonb, 0),
  ('pro',        'Pro',        10000,  9900,
    '["10,000 calls/month","Commercial use","Email support","Branded responses"]'::jsonb, 1),
  ('business',   'Business',   100000, 49900,
    '["100,000 calls/month","Commercial use","White-label option","Priority support","SLA"]'::jsonb, 2),
  ('enterprise', 'Enterprise', -1,     0,
    '["Unlimited calls","Dedicated Slack channel","Custom integrations","SLA + uptime guarantees","SOC2 (coming)"]'::jsonb, 3)
on conflict (id) do update set
  name                = excluded.name,
  monthly_call_limit  = excluded.monthly_call_limit,
  monthly_price_cents = excluded.monthly_price_cents,
  features            = excluded.features,
  display_order       = excluded.display_order;

-- --------------------------------------------------------------------
-- api_accounts — paying API consumers (one per email)
-- --------------------------------------------------------------------
create table if not exists public.api_accounts (
  id                     uuid primary key default gen_random_uuid(),
  email                  text not null unique,
  organization_name      text,
  tier_id                text not null default 'free' references public.api_tiers(id),
  stripe_customer_id     text unique,
  stripe_subscription_id text unique,
  subscription_status    text
    check (subscription_status in ('active','past_due','canceled','trialing','incomplete')
           or subscription_status is null),
  current_period_end     timestamptz,
  -- Magic-link token for the dashboard. Same email-based auth pattern the
  -- storefront's /library page uses — no full auth stack required.
  access_token           uuid not null default gen_random_uuid(),
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index if not exists api_accounts_tier_idx on public.api_accounts(tier_id);
create index if not exists api_accounts_email_idx on public.api_accounts(lower(email));

-- --------------------------------------------------------------------
-- api_keys — hashed credentials, multiple per account
-- --------------------------------------------------------------------
create table if not exists public.api_keys (
  id            uuid primary key default gen_random_uuid(),
  account_id    uuid not null references public.api_accounts(id) on delete cascade,
  name          text not null,                 -- "Production", "Staging", "Local dev"
  key_prefix    text not null,                 -- first 12 chars shown in UI ("lmn_a1b2c3d4")
  key_hash      text not null unique,          -- SHA-256 of full key, hex encoded
  last_used_at  timestamptz,
  revoked_at    timestamptz,
  created_at    timestamptz not null default now()
);

create index if not exists api_keys_account_idx on public.api_keys(account_id, revoked_at);
create index if not exists api_keys_hash_idx    on public.api_keys(key_hash) where revoked_at is null;

-- --------------------------------------------------------------------
-- api_usage_logs — one row per API call
-- --------------------------------------------------------------------
create table if not exists public.api_usage_logs (
  id          bigserial primary key,
  account_id  uuid not null references public.api_accounts(id) on delete cascade,
  api_key_id  uuid references public.api_keys(id) on delete set null,
  endpoint    text not null,
  status      int not null,
  duration_ms int,
  occurred_at timestamptz not null default now(),
  metadata    jsonb
);

create index if not exists api_usage_logs_account_time_idx
  on public.api_usage_logs(account_id, occurred_at desc);

-- Monthly aggregation queries use the index above with a range filter on
-- occurred_at — no separate month-truncated index needed (and date_trunc on
-- timestamptz isn't IMMUTABLE, so it can't be in an index expression anyway).

-- --------------------------------------------------------------------
-- View: api_usage_current_month
-- One row per account with this calendar month's call count.
-- --------------------------------------------------------------------
create or replace view public.api_usage_current_month as
  select account_id, count(*)::int as calls
  from public.api_usage_logs
  where occurred_at >= date_trunc('month', now())
  group by account_id;

-- --------------------------------------------------------------------
-- updated_at trigger on api_accounts
-- --------------------------------------------------------------------
drop trigger if exists api_accounts_set_updated_at on public.api_accounts;
create trigger api_accounts_set_updated_at
  before update on public.api_accounts
  for each row execute function public.set_updated_at();

-- --------------------------------------------------------------------
-- Row Level Security
-- --------------------------------------------------------------------
alter table public.api_tiers      enable row level security;
alter table public.api_accounts   enable row level security;
alter table public.api_keys       enable row level security;
alter table public.api_usage_logs enable row level security;

-- Tiers: publicly readable — we render them on the marketing page.
drop policy if exists api_tiers_public_read on public.api_tiers;
create policy api_tiers_public_read on public.api_tiers
  for select using (true);

-- Accounts, keys, logs: service-role only. The dashboard talks to a Next.js
-- server route that uses the service role + validates the caller's email,
-- matching the email-only auth pattern used elsewhere in Lumenari.
drop policy if exists api_accounts_service_only on public.api_accounts;
create policy api_accounts_service_only on public.api_accounts
  for all using (false) with check (false);

drop policy if exists api_keys_service_only on public.api_keys;
create policy api_keys_service_only on public.api_keys
  for all using (false) with check (false);

drop policy if exists api_usage_logs_service_only on public.api_usage_logs;
create policy api_usage_logs_service_only on public.api_usage_logs
  for all using (false) with check (false);
