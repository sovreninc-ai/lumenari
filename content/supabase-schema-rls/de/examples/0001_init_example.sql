-- ====================================================================
-- Beispiel-Starter-Migration für ein Multi-Tenant-SaaS.
-- Adaptiere die Namen — behalte die Struktur.
-- ====================================================================

create extension if not exists "pgcrypto";

-- --------------------------------------------------------------------
-- Core: Organizations + Memberships
-- --------------------------------------------------------------------
create table public.organizations (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  created_at  timestamptz not null default now()
);

create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at   timestamptz not null default now()
);

create table public.memberships (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  profile_id      uuid not null references public.profiles(id) on delete cascade,
  role            text not null check (role in ('owner', 'admin', 'member')),
  joined_at       timestamptz not null default now(),
  primary key (organization_id, profile_id)
);

create index memberships_profile_idx on public.memberships(profile_id);

-- --------------------------------------------------------------------
-- RLS-Helper
-- --------------------------------------------------------------------
create or replace function public.is_member_of(org uuid)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.memberships
    where organization_id = org and profile_id = auth.uid()
  );
$$;

create or replace function public.has_role(org uuid, min_role text)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.memberships m
    where m.organization_id = org
      and m.profile_id = auth.uid()
      and case min_role
        when 'owner'  then m.role = 'owner'
        when 'admin'  then m.role in ('owner', 'admin')
        when 'member' then m.role in ('owner', 'admin', 'member')
        else false
      end
  );
$$;

-- --------------------------------------------------------------------
-- Domain-Tabelle: events (eine typische tenant-gescopte Ressource)
-- --------------------------------------------------------------------
create table public.events (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title           text not null,
  starts_at       timestamptz not null,
  ends_at         timestamptz not null check (ends_at > starts_at),
  created_by      uuid references public.profiles(id),
  created_at      timestamptz not null default now()
);

create index events_organization_idx on public.events(organization_id);
create index events_starts_at_idx on public.events(starts_at);

-- --------------------------------------------------------------------
-- RLS
-- --------------------------------------------------------------------
alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.memberships enable row level security;
alter table public.events enable row level security;

-- profiles: ein Nutzer kann sein eigenes Profil lesen + aktualisieren
create policy "profiles self read" on public.profiles
  for select using (id = auth.uid());

create policy "profiles self update" on public.profiles
  for update using (id = auth.uid())
  with check (id = auth.uid());

-- organizations: Mitglieder können ihre Orgs lesen
create policy "organizations member read" on public.organizations
  for select using (public.is_member_of(id));

-- memberships: Mitglieder können ihre eigenen Memberships lesen
create policy "memberships self read" on public.memberships
  for select using (profile_id = auth.uid());

-- events: Mitglieder lesen, Admins schreiben
create policy "events member read" on public.events
  for select using (public.is_member_of(organization_id));

create policy "events admin write" on public.events
  for all
  using (public.has_role(organization_id, 'admin'))
  with check (public.has_role(organization_id, 'admin'));
