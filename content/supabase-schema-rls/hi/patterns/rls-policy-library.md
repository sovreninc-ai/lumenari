# RLS policy library

एक reference catalog। इन्हें adapt करें — blindly copy न करें।

## 1. Public read, no public write

Catalog tables के लिए, marketing के लिए meant content।

```sql
alter table public.kits enable row level security;

create policy "kits public read"
  on public.kits for select
  using (true);

-- No insert/update/delete policy = nobody can write except service role.
```

## 2. Authenticated read, owner write

Per-user resources के लिए (todos, notes, saved searches)।

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

ध्यान दें: `with check` clause एक attacker को अपनी row update करके `owner_id` किसी और को flip करने से रोकता है।

## 3. Tenant member read, tenant admin write

Shared org resources के लिए (events, projects, invoices)।

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

## 4. Tenant member read, self write (collaborative posts)

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

## 5. Parent-and-child rows (एक coach अपनी team के athletes देख सकता है)

जब access predicate एक related table पर हो, उसे एक function में push करें।

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

## 6. Time-bound access (registration window)

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

## 7. Soft delete + invisible rows

Pattern: `deleted_at timestamptz` column। Default reads deleted rows छिपाते हैं।

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

## हर policy को एक test की ज़रूरत

> दो browser windows open करें। एक में org A के user के रूप में log in करें और दूसरे में org B के user के रूप में। एक-दूसरे का data read करने की कोशिश करें। अगर कुछ appear हो, आपके पास leak है।

उसे दो अलग JWTs के साथ दो anon clients use करते हुए एक integration test से automate करें।
