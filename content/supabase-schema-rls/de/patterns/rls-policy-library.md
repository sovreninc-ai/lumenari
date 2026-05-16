# RLS-Policy-Bibliothek

Ein Referenzkatalog. Adaptiere diese — kopiere nicht blind.

## 1. Public Read, kein Public Write

Für Katalog-Tabellen, Content, der als Marketing gedacht ist.

```sql
alter table public.kits enable row level security;

create policy "kits public read"
  on public.kits for select
  using (true);

-- No insert/update/delete policy = nobody can write except service role.
```

## 2. Authentifizierter Read, Owner-Write

Für Per-User-Ressourcen (Todos, Notes, gespeicherte Suchen).

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

Beachte: die `with check`-Klausel verhindert, dass ein Angreifer seine eigene Zeile aktualisiert, um `owner_id` zu jemand anderem zu flippen.

## 3. Tenant-Member-Read, Tenant-Admin-Write

Für geteilte Org-Ressourcen (Events, Projects, Invoices).

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

## 4. Tenant-Member-Read, Self-Write (Collaborative Posts)

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

## 5. Parent-and-Child-Zeilen (ein Coach kann Athleten in seinem Team sehen)

Wenn das Access-Prädikat auf einer verwandten Tabelle ist, schiebe es in eine Funktion.

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

## 6. Zeitgebundener Zugriff (das Registrierungsfenster)

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

## 7. Soft Delete + Unsichtbare Zeilen

Pattern: `deleted_at timestamptz`-Spalte. Default-Reads verstecken gelöschte Zeilen.

```sql
create policy "events visible when not deleted"
  on public.events for select
  using (
    deleted_at is null
    and public.is_member_of(organization_id)
  );

-- Admins can see deleted rows for restore UI.
create policy "events visible to admin when deleted"
  on public.events for select
  using (
    deleted_at is not null
    and public.has_role(organization_id, 'admin')
  );
```

## Der eine Test, den jede Policy braucht

> Öffne zwei Browser-Fenster. Logge dich als Nutzer aus Org A in einem und Nutzer aus Org B im anderen ein. Versuche, die Daten des jeweils anderen zu lesen. Wenn irgendetwas erscheint, hast du ein Leak.

Automatisiere das mit einem Integrationstest, der zwei anonyme Clients mit zwei unterschiedlichen JWTs nutzt.
