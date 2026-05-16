# Pack de Schema y RLS de Supabase

> Coloca este kit en un proyecto de Claude o Cursor antes de escribir una sola migración. Codifica los patrones multi-tenant y los modismos de RLS que tomaron años de aprender por las malas.

**Optimizado para:** Claude · Claude Code.

---

## Modo de operación

Estás diseñando o modificando un schema de Postgres en Supabase. Supuestos por defecto:

- **Multi-tenant** con una entidad tenant (organización, club, workspace). Cada usuario pertenece a uno o más tenants.
- **RLS no es negociable.** Cada tabla lo tiene habilitado antes de aceptar un solo insert.
- **Columna `tenant_id`** es el modelo de tenancy por defecto. El schema-por-tenant queda reservado para casos con necesidades de aislamiento regulatorio.
- **Solo migraciones.** Todo el DDL va en `supabase/migrations/000N_*.sql`. El dashboard de Supabase es un visor, no un editor.

Siempre pregunta: "¿Cuál es el conjunto más pequeño de usuarios que debería ver esta fila?" antes de escribir la tabla.

---

## La columna vertebral del schema por defecto

```sql
-- Toda app multi-tenant necesita estas tres tablas.
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table profiles (
  -- Espeja auth.users para que las políticas de RLS puedan hacer join limpiamente.
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table memberships (
  -- Muchos-a-muchos entre profiles y organizations.
  -- Un usuario puede pertenecer a múltiples orgs (consultores, padres con hijos en
  -- múltiples equipos, etc.). El `role` decide la capacidad dentro de la org.
  organization_id uuid not null references organizations(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'member')),
  joined_at timestamptz not null default now(),
  primary key (organization_id, profile_id)
);

create index memberships_profile_idx on memberships(profile_id);
create index memberships_org_idx on memberships(organization_id);
```

Cualquier tabla nueva que referencie datos con scope de tenant tiene `organization_id uuid not null references organizations(id)`.

---

## Las tres funciones helper de RLS que usarás en todos lados

```sql
-- 1. is_member_of(org_id): true si el caller pertenece a esa org.
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

-- 2. has_role(org_id, role): true si el caller tiene al menos ese rol.
-- Codifica la jerarquía owner > admin > member.
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

-- 3. is_owner_of_row(row_owner_id): para recursos con un único dueño humano.
create or replace function public.is_owner_of_row(owner uuid)
returns boolean
language sql
stable
as $$
  select owner = auth.uid();
$$;
```

El `security definer` importa: permite que la función lea la tabla memberships incluso cuando el RLS del caller lo bloquearía.

---

## Librería de políticas

### Lectura pública, sin escritura

```sql
alter table public.kits enable row level security;
create policy "kits readable by all"
  on public.kits for select using (true);
```

### Lectura con scope de tenant

```sql
alter table public.events enable row level security;
create policy "events read by org members"
  on public.events for select
  using (public.is_member_of(organization_id));
```

### Escritura con scope de tenant, solo admin

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

### Solo dueño

```sql
create policy "tasks read by owner"
  on public.tasks for select
  using (public.is_owner_of_row(owner_id));
```

### Bypass del service role (implícito)

`postgres` y el service role siempre bypasean RLS. Los webhooks y los scripts admin usan el cliente service-role. No hace falta política.

---

## Errores que no debes cometer

1. **Olvidar `enable row level security`.** Una tabla sin RLS habilitado es pública. Siempre acompaña `create table` con `alter table … enable row level security`.
2. **Escribir una sola política permisiva con `using (true)`.** Eso es igual a no tener RLS. El punto entero son los predicados por fila.
3. **Poner `auth.uid()` directamente en una política sin `is_member_of`.** Significa que acoplaste esa política a un schema. Usa el helper.
4. **Saltarse la cláusula `with check` en INSERT/UPDATE.** `using` filtra lecturas; `with check` filtra escrituras. Los checks de INSERT necesitan `with check`.
5. **Olvidar el índice en `tenant_id`.** RLS llama la función en cada fila escaneada — sin índice, es O(n) cada query.

---

## Docs complementarios

- `patterns/tenant-models.md` — schema-por-tenant vs. columna `tenant_id`, con el cuadro de decisión
- `patterns/rls-policy-library.md` — catálogo extendido de políticas con ejemplos trabajados
- `patterns/migration-discipline.md` — checklist de review + recetas de rollback
- `examples/0001_init_example.sql` — una migración inicial completa que puedes adaptar
