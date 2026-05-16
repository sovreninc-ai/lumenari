# Supabase Schema & RLS Pack

> Drop this kit into a Claude or Cursor project before you write a single migration. It encodes the multi-tenant patterns and RLS idioms that took years to develop the hard way.

**Optimized for:** Claude · Claude Code.

---

## Operating mode

You are designing or modifying a Postgres schema on Supabase. Default assumptions:

- **Multi-tenant** with a tenant entity (organization, club, workspace). Every user belongs to one or more tenants.
- **RLS is non-negotiable.** Every table has it enabled before it accepts a single insert.
- **`tenant_id` column** is the default tenancy model. Schema-per-tenant is reserved for cases with regulatory isolation needs.
- **Migrations only.** All DDL goes in `supabase/migrations/000N_*.sql`. The Supabase dashboard is a viewer, not an editor.

Always ask: "What's the smallest set of users that should see this row?" before writing the table.

---

## The default schema spine

```sql
-- Every multi-tenant app needs these three tables.
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table profiles (
  -- Mirrors auth.users so RLS policies can join cleanly.
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table memberships (
  -- Many-to-many between profiles and organizations.
  -- A user can belong to multiple orgs (consultants, parents with kids on
  -- multiple teams, etc.). The `role` decides capability inside the org.
  organization_id uuid not null references organizations(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'member')),
  joined_at timestamptz not null default now(),
  primary key (organization_id, profile_id)
);

create index memberships_profile_idx on memberships(profile_id);
create index memberships_org_idx on memberships(organization_id);
```

Any new table referencing tenant-scoped data has `organization_id uuid not null references organizations(id)`.

---

## The three RLS helper functions you'll use everywhere

```sql
-- 1. is_member_of(org_id): true if the caller belongs to that org.
create or replace function public.is_member_of(org uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.memberships
    where organization_id = org and profile_id = auth.uid()
  );
$$;

-- 2. has_role(org_id, role): true if the caller has at least that role.
-- Encodes the hierarchy owner > admin > member.
create or replace function public.has_role(org uuid, min_role text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.memberships m
    where m.organization_id = org
      and m.profile_id = auth.uid()
      and case min_role
        when 'owner' then m.role = 'owner'
        when 'admin' then m.role in ('owner', 'admin')
        when 'member' then m.role in ('owner', 'admin', 'member')
        else false
      end
  );
$$;

-- 3. is_owner_of_row(row_owner_id): for resources with a single human owner.
create or replace function public.is_owner_of_row(owner uuid)
returns boolean
language sql
stable
as $$
  select owner = auth.uid();
$$;
```

`security definer` matters: it lets the function read the memberships table even when the caller's RLS would block them.

---

## Policy library

### Public read, no write

```sql
alter table public.kits enable row level security;
create policy "kits readable by all"
  on public.kits for select using (true);
```

### Tenant-scoped read

```sql
alter table public.events enable row level security;
create policy "events read by org members"
  on public.events for select
  using (public.is_member_of(organization_id));
```

### Tenant-scoped write, admin only

```sql
create policy "events created by admins"
  on public.events for insert
  with check (public.has_role(organization_id, 'admin'));

create policy "events updated by admins"
  on public.events for update
  using (public.has_role(organization_id, 'admin'))
  with check (public.has_role(organization_id, 'admin'));

create policy "events deleted by admins"
  on public.events for delete
  using (public.has_role(organization_id, 'admin'));
```

### Owner-only

```sql
create policy "tasks read by owner"
  on public.tasks for select
  using (public.is_owner_of_row(owner_id));
```

### Service role bypass (implicit)

`postgres` and the service role always bypass RLS. Webhooks and admin scripts use the service-role client. No policy needed.

---

## Mistakes you must not make

1. **Forgetting `enable row level security`.** A table without RLS enabled is public. Always pair `create table` with `alter table … enable row level security`.
2. **Writing a single permissive policy with `using (true)`.** That's the same as no RLS. The whole point is per-row predicates.
3. **Putting `auth.uid()` directly in a policy without `is_member_of`.** Means you've coupled this policy to one schema. Use the helper.
4. **Skipping the `with check` clause on INSERT/UPDATE.** `using` filters reads; `with check` filters writes. INSERT-only checks need `with check`.
5. **Forgetting the index on `tenant_id`.** RLS calls the function on every row scanned — no index means O(n) every query.

---

## Companion docs

- `patterns/tenant-models.md` — schema-per-tenant vs. `tenant_id` column, with the decision rubric
- `patterns/rls-policy-library.md` — extended catalog of policies with worked examples
- `patterns/migration-discipline.md` — review checklist + rollback recipes
- `examples/0001_init_example.sql` — a complete starter migration you can adapt
