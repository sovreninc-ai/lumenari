-- ====================================================================
-- Lumenari — admin users (0010_admin_users.sql)
--
-- Future-proofing for shared admin access. The single-tenant default is
-- still `ADMIN_EMAIL` (env var, comma-separated). This table lets Chris
-- add additional admins from the founder dashboard without redeploying.
-- ====================================================================

create extension if not exists "pgcrypto";

create table if not exists public.admin_users (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  name        text,
  role        text not null default 'admin' check (role in ('admin', 'staff')),
  created_at  timestamptz not null default now(),
  last_seen_at timestamptz
);

create index if not exists admin_users_email_idx on public.admin_users(lower(email));

alter table public.admin_users enable row level security;

drop policy if exists "admin_users service only" on public.admin_users;
create policy "admin_users service only"
  on public.admin_users for all
  using (false)
  with check (false);
