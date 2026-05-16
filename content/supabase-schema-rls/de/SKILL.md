# Supabase Schema & RLS Pack

> Legen Sie dieses Kit in ein Claude- oder Cursor-Projekt, bevor Sie eine einzige Migration schreiben. Es kodiert die Multi-Tenant-Patterns und RLS-Idiome, deren Entwicklung Jahre auf die harte Tour brauchte.

**Optimiert für:** Claude · Claude Code.

---

## Arbeitsmodus

Du designst oder modifizierst ein Postgres-Schema auf Supabase. Standard-Annahmen:

- **Multi-Tenant** mit einer Tenant-Entität (Organisation, Club, Workspace). Jeder Nutzer gehört zu einem oder mehreren Tenants.
- **RLS ist nicht verhandelbar.** Jede Tabelle hat es aktiviert, bevor sie einen einzigen Insert akzeptiert.
- **`tenant_id`-Spalte** ist das Default-Tenancy-Modell. Schema-per-Tenant ist Fällen mit regulatorischen Isolations-Anforderungen vorbehalten.
- **Nur Migrationen.** Sämtliches DDL geht in `supabase/migrations/000N_*.sql`. Das Supabase-Dashboard ist ein Viewer, kein Editor.

Frage immer: "Was ist das kleinste Set an Nutzern, das diese Zeile sehen sollte?" bevor du die Tabelle schreibst.

---

## Die Default-Schema-Wirbelsäule

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

Jede neue Tabelle, die auf tenant-gescopte Daten verweist, hat `organization_id uuid not null references organizations(id)`.

---

## Die drei RLS-Helper-Funktionen, die du überall nutzen wirst

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

`security definer` ist wichtig: es lässt die Funktion die Memberships-Tabelle lesen, selbst wenn RLS den Caller blockieren würde.

---

## Policy-Bibliothek

### Public Read, kein Write

```sql
alter table public.kits enable row level security;
create policy "kits readable by all"
  on public.kits for select using (true);
```

### Tenant-gescopter Read

```sql
alter table public.events enable row level security;
create policy "events read by org members"
  on public.events for select
  using (public.is_member_of(organization_id));
```

### Tenant-gescopter Write, nur Admin

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

### Nur-Owner

```sql
create policy "tasks read by owner"
  on public.tasks for select
  using (public.is_owner_of_row(owner_id));
```

### Service-Role-Bypass (implizit)

`postgres` und die Service-Role umgehen RLS immer. Webhooks und Admin-Skripte nutzen den Service-Role-Client. Keine Policy nötig.

---

## Fehler, die du nicht machen darfst

1. **`enable row level security` vergessen.** Eine Tabelle ohne aktiviertes RLS ist public. Paare immer `create table` mit `alter table … enable row level security`.
2. **Eine einzige permissive Policy mit `using (true)` schreiben.** Das ist dasselbe wie kein RLS. Der ganze Sinn sind per-row-Prädikate.
3. **`auth.uid()` direkt in einer Policy ohne `is_member_of` setzen.** Bedeutet, du hast diese Policy an ein Schema gekoppelt. Nutze den Helper.
4. **Die `with check`-Klausel bei INSERT/UPDATE überspringen.** `using` filtert Reads; `with check` filtert Writes. INSERT-only-Checks brauchen `with check`.
5. **Den Index auf `tenant_id` vergessen.** RLS ruft die Funktion bei jeder gescannten Zeile auf — kein Index bedeutet O(n) bei jeder Query.

---

## Begleitende Dokumente

- `patterns/tenant-models.md` — Schema-per-Tenant vs. `tenant_id`-Spalte, mit Entscheidungs-Rubric
- `patterns/rls-policy-library.md` — erweiterter Katalog von Policies mit ausgearbeiteten Beispielen
- `patterns/migration-discipline.md` — Review-Checkliste + Rollback-Rezepte
- `examples/0001_init_example.sql` — eine vollständige Starter-Migration, die du adaptieren kannst
