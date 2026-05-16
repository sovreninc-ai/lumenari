# Librería de políticas de RLS

Un catálogo de referencia. Adáptalas — no las copies a ciegas.

## 1. Lectura pública, sin escritura pública

Para tablas de catálogo, contenido pensado para marketing.

```sql
alter table public.kits enable row level security;

create policy "kits public read"
  on public.kits for select
  using (true);

-- Sin política de insert/update/delete = nadie puede escribir excepto el service role.
```

## 2. Lectura autenticada, escritura del dueño

Para recursos por-usuario (todos, notas, búsquedas guardadas).

```sql
alter table public.notes enable row level security;

create policy "notes read by owner"
  on public.notes for select
  using (owner_id = auth.uid());

create policy "notes write by owner"
  on public.notes for insert
  with check (owner_id = auth.uid());

create policy "notes update by owner"
  on public.notes for update
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "notes delete by owner"
  on public.notes for delete
  using (owner_id = auth.uid());
```

Nota: la cláusula `with check` evita que un atacante actualice su propia fila para flippear `owner_id` a otra persona.

## 3. Lectura por miembro de tenant, escritura por admin de tenant

Para recursos compartidos de la org (events, projects, invoices).

```sql
alter table public.events enable row level security;

create policy "events read by org members"
  on public.events for select
  using (public.is_member_of(organization_id));

create policy "events written by org admins"
  on public.events for all
  using (public.has_role(organization_id, 'admin'))
  with check (public.has_role(organization_id, 'admin'));
```

## 4. Lectura por miembro de tenant, escritura propia (posts colaborativos)

```sql
alter table public.posts enable row level security;

create policy "posts read by org members"
  on public.posts for select
  using (public.is_member_of(organization_id));

create policy "posts inserted by org members"
  on public.posts for insert
  with check (
    public.is_member_of(organization_id)
    and author_id = auth.uid()
  );

create policy "posts edited by author or admin"
  on public.posts for update
  using (
    author_id = auth.uid()
    or public.has_role(organization_id, 'admin')
  )
  with check (
    author_id = auth.uid()
    or public.has_role(organization_id, 'admin')
  );
```

## 5. Filas padre-e-hijo (un coach puede ver atletas de su equipo)

Cuando el predicado de acceso está en una tabla relacionada, empújalo a una función.

```sql
create or replace function public.coaches_athlete(athlete uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from team_athletes ta
    join team_staff ts on ts.team_id = ta.team_id
    where ta.athlete_id = athlete
      and ts.staff_id = auth.uid()
      and ts.role in ('head_coach', 'assistant_coach')
  );
$$;

create policy "athlete profile read by coaches"
  on public.athlete_profiles for select
  using (public.coaches_athlete(athlete_id));
```

## 6. Acceso acotado en tiempo (la ventana de registración)

```sql
create policy "registration writes during open window"
  on public.registrations for insert
  with check (
    public.is_member_of(organization_id)
    and now() between
      (select registration_opens_at from seasons where id = season_id)
      and (select registration_closes_at from seasons where id = season_id)
  );
```

## 7. Soft delete + filas invisibles

Patrón: columna `deleted_at timestamptz`. Las lecturas por defecto ocultan las filas borradas.

```sql
create policy "events visible when not deleted"
  on public.events for select
  using (
    deleted_at is null
    and public.is_member_of(organization_id)
  );

-- Los admins pueden ver filas borradas para el UI de restore.
create policy "events visible to admin when deleted"
  on public.events for select
  using (
    deleted_at is not null
    and public.has_role(organization_id, 'admin')
  );
```

## El único test que toda política necesita

> Abre dos ventanas de navegador. Loguéate como usuario de la org A en una y usuario de la org B en la otra. Intenta leer los datos del otro. Si aparece algo, tienes un leak.

Automatiza eso con un test de integración usando dos clientes anónimos con dos JWTs distintos.
