# Supabase Schema & RLS Pack

> इस kit को एक भी migration लिखने से पहले एक Claude या Cursor project में drop करें। यह उन multi-tenant patterns और RLS idioms को encode करता है जिन्हें develop करने में सालों लगे — hard way।

**Optimized for:** Claude · Claude Code.

---

## Operating mode

आप Supabase पर एक Postgres schema design या modify कर रहे हैं। Default assumptions:

- **Multi-tenant** एक tenant entity के साथ (organization, club, workspace)। हर user एक या अधिक tenants से belong करता है।
- **RLS non-negotiable है।** हर table पर इसे एक भी insert accept करने से पहले enable किया जाता है।
- **`tenant_id` column** default tenancy model है। Schema-per-tenant उन cases के लिए reserved है जिनमें regulatory isolation की ज़रूरत है।
- **Migrations only.** सारा DDL `supabase/migrations/000N_*.sql` में जाता है। Supabase dashboard एक viewer है, editor नहीं।

हमेशा पूछें: "Users का सबसे छोटा set कौन सा है जिसे यह row देखनी चाहिए?" table लिखने से पहले।

---

## Default schema spine

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

Tenant-scoped data को reference करने वाली कोई भी नई table में `organization_id uuid not null references organizations(id)` होता है।

---

## तीन RLS helper functions जो आप हर जगह use करेंगे

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

`security definer` matter करता है: यह function को memberships table read करने देता है तब भी जब caller का RLS उन्हें block करता हो।

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

`postgres` और service role हमेशा RLS bypass करते हैं। Webhooks और admin scripts service-role client use करते हैं। कोई policy नहीं चाहिए।

---

## ऐसी गलतियाँ जो आपको नहीं करनी चाहिए

1. **`enable row level security` भूलना।** RLS enabled के बिना एक table public है। हमेशा `create table` को `alter table … enable row level security` के साथ pair करें।
2. **`using (true)` के साथ एक single permissive policy लिखना।** यह RLS नहीं होने जैसा ही है। पूरा point per-row predicates है।
3. **`is_member_of` के बिना policy में सीधे `auth.uid()` डालना।** इसका मतलब है आपने इस policy को एक schema से couple कर दिया। Helper use करें।
4. **INSERT/UPDATE पर `with check` clause skip करना।** `using` reads filter करता है; `with check` writes filter करता है। INSERT-only checks को `with check` चाहिए।
5. **`tenant_id` पर index भूलना।** RLS हर scan की हुई row पर function call करता है — कोई index नहीं मतलब हर query पर O(n)।

---

## Companion docs

- `patterns/tenant-models.md` — schema-per-tenant vs. `tenant_id` column, decision rubric के साथ
- `patterns/rls-policy-library.md` — policies का extended catalog worked examples के साथ
- `patterns/migration-discipline.md` — review checklist + rollback recipes
- `examples/0001_init_example.sql` — एक complete starter migration जिसे आप adapt कर सकते हैं
