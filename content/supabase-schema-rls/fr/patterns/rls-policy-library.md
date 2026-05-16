# Bibliothèque de policies RLS

Un catalogue de référence. Adaptez-les — ne copiez pas aveuglément.

## 1. Lecture publique, pas d'écriture publique

Pour les tables de catalogue, le contenu destiné au marketing.

```sql
alter table public.kits enable row level security;

create policy "kits public read"
  on public.kits for select
  using (true);

-- Aucune policy insert/update/delete = personne ne peut écrire sauf le service role.
```

## 2. Lecture authentifiée, écriture par l'owner

Pour les ressources par utilisateur (todos, notes, recherches sauvegardées).

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

Remarquez : la clause `with check` empêche un attaquant de mettre à jour sa propre ligne pour basculer `owner_id` vers quelqu'un d'autre.

## 3. Lecture par les membres du tenant, écriture par les admins du tenant

Pour les ressources partagées de l'org (events, projects, invoices).

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

## 4. Lecture par les membres du tenant, écriture par soi-même (posts collaboratifs)

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

## 5. Lignes parent-enfant (un coach peut voir les athlètes de son équipe)

Quand le prédicat d'accès porte sur une table liée, poussez-le dans une fonction.

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

## 6. Accès délimité dans le temps (la fenêtre d'inscription)

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

## 7. Soft delete + lignes invisibles

Pattern : colonne `deleted_at timestamptz`. Les lectures par défaut masquent les lignes supprimées.

```sql
create policy "events visible when not deleted"
  on public.events for select
  using (
    deleted_at is null
    and public.is_member_of(organization_id)
  );

-- Les admins peuvent voir les lignes supprimées pour l'UI de restauration.
create policy "events visible to admin when deleted"
  on public.events for select
  using (
    deleted_at is not null
    and public.has_role(organization_id, 'admin')
  );
```

## L'unique test que chaque policy nécessite

> Ouvrez deux fenêtres de navigateur. Connectez-vous comme utilisateur de l'org A dans l'une et utilisateur de l'org B dans l'autre. Essayez de lire les données de l'autre. Si quoi que ce soit apparaît, vous avez une fuite.

Automatisez ça avec un test d'intégration utilisant deux clients anon avec deux JWT différents.
