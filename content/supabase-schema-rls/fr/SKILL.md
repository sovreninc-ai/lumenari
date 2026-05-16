# Supabase Schema & RLS Pack

> Déposez ce kit dans un projet Claude ou Cursor avant d'écrire la moindre migration. Il encode les patterns multi-tenant et les idiomes RLS qui ont mis des années à se forger, à la dure.

**Optimisé pour :** Claude · Claude Code.

---

## Mode opératoire

Vous concevez ou modifiez un schéma Postgres sur Supabase. Hypothèses par défaut :

- **Multi-tenant** avec une entité tenant (organization, club, workspace). Chaque utilisateur appartient à un ou plusieurs tenants.
- **La RLS est non négociable.** Chaque table l'a activée avant d'accepter le moindre insert.
- **Colonne `tenant_id`** : c'est le modèle de tenancy par défaut. Schema-per-tenant est réservé aux cas avec besoin d'isolation réglementaire.
- **Migrations uniquement.** Tout le DDL va dans `supabase/migrations/000N_*.sql`. Le dashboard Supabase est un viewer, pas un éditeur.

Demandez toujours : « Quel est le plus petit ensemble d'utilisateurs qui devraient voir cette ligne ? » avant d'écrire la table.

---

## La colonne vertébrale par défaut du schéma

```sql
-- Toute app multi-tenant a besoin de ces trois tables.
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table profiles (
  -- Mirror de auth.users pour que les policies RLS puissent join proprement.
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table memberships (
  -- Many-to-many entre profiles et organizations.
  -- Un utilisateur peut appartenir à plusieurs orgs (consultants, parents avec enfants
  -- dans plusieurs équipes, etc.). Le `role` détermine la capacité dans l'org.
  organization_id uuid not null references organizations(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'member')),
  joined_at timestamptz not null default now(),
  primary key (organization_id, profile_id)
);

create index memberships_profile_idx on memberships(profile_id);
create index memberships_org_idx on memberships(organization_id);
```

Toute nouvelle table référençant des données tenant-scoped a `organization_id uuid not null references organizations(id)`.

---

## Les trois fonctions helper RLS que vous utiliserez partout

```sql
-- 1. is_member_of(org_id) : true si l'appelant appartient à cette org.
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

-- 2. has_role(org_id, role) : true si l'appelant a au moins ce rôle.
-- Encode la hiérarchie owner > admin > member.
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

-- 3. is_owner_of_row(row_owner_id) : pour les ressources avec un unique propriétaire humain.
create or replace function public.is_owner_of_row(owner uuid)
returns boolean
language sql
stable
as $$
  select owner = auth.uid();
$$;
```

`security definer` est important : il permet à la fonction de lire la table memberships même si la RLS de l'appelant la bloquait.

---

## Bibliothèque de policies

### Lecture publique, pas d'écriture

```sql
alter table public.kits enable row level security;
create policy "kits readable by all"
  on public.kits for select using (true);
```

### Lecture tenant-scoped

```sql
alter table public.events enable row level security;
create policy "events read by org members"
  on public.events for select
  using (public.is_member_of(organization_id));
```

### Écriture tenant-scoped, admin uniquement

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

### Owner uniquement

```sql
create policy "tasks read by owner"
  on public.tasks for select
  using (public.is_owner_of_row(owner_id));
```

### Contournement par le service role (implicite)

`postgres` et le service role contournent toujours la RLS. Les webhooks et scripts admin utilisent le client service-role. Aucune policy nécessaire.

---

## Erreurs à ne pas commettre

1. **Oublier `enable row level security`.** Une table sans RLS activée est publique. Associez toujours `create table` à `alter table … enable row level security`.
2. **Écrire une unique policy permissive avec `using (true)`.** C'est l'équivalent de pas de RLS. Le but, ce sont les prédicats par ligne.
3. **Mettre `auth.uid()` directement dans une policy sans `is_member_of`.** Vous couplez cette policy à un seul schéma. Utilisez le helper.
4. **Sauter la clause `with check` sur INSERT/UPDATE.** `using` filtre les reads ; `with check` filtre les writes. Les contrôles à l'INSERT ont besoin de `with check`.
5. **Oublier l'index sur `tenant_id`.** La RLS appelle la fonction sur chaque ligne scannée — pas d'index = O(n) à chaque requête.

---

## Documents compagnons

- `patterns/tenant-models.md` — schema-per-tenant vs colonne `tenant_id`, avec le critère de décision
- `patterns/rls-policy-library.md` — catalogue étendu de policies avec exemples travaillés
- `patterns/migration-discipline.md` — checklist de revue + recettes de rollback
- `examples/0001_init_example.sql` — une migration starter complète, à adapter
