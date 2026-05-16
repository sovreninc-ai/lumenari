# Biblioteca de policies de RLS

Um catálogo de referência. Adapte — não copie sem pensar.

## 1. Leitura pública, sem escrita pública

Para tabelas de catálogo, conteúdo voltado a marketing.

```sql
alter table public.kits enable row level security;

create policy "kits public read"
  on public.kits for select
  using (true);

-- Nenhuma policy de insert/update/delete = ninguém escreve a não ser a service role.
```

## 2. Leitura autenticada, escrita do dono

Para recursos por usuário (todos, notas, buscas salvas).

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

Observe: a cláusula `with check` evita que um atacante atualize a própria linha para virar `owner_id` para outro.

## 3. Leitura por member do tenant, escrita por admin do tenant

Para recursos compartilhados da org (events, projects, invoices).

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

## 4. Leitura por member do tenant, escrita do próprio autor (posts colaborativos)

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

## 5. Linhas pai-e-filho (um coach pode ver atletas do seu time)

Quando o predicado de acesso está numa tabela relacionada, jogue para dentro de uma função.

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

## 6. Acesso por janela de tempo (a janela de inscrição)

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

## 7. Soft delete + linhas invisíveis

Padrão: coluna `deleted_at timestamptz`. Leituras default escondem linhas deletadas.

```sql
create policy "events visible when not deleted"
  on public.events for select
  using (
    deleted_at is null
    and public.is_member_of(organization_id)
  );

-- Admins veem linhas deletadas para a UI de restore.
create policy "events visible to admin when deleted"
  on public.events for select
  using (
    deleted_at is not null
    and public.has_role(organization_id, 'admin')
  );
```

## O único teste que toda policy precisa

> Abra duas janelas do browser. Faça login como usuário da org A em uma e usuário da org B na outra. Tente ler os dados um do outro. Se algo aparecer, você tem vazamento.

Automatize isso com um teste de integração usando dois clients anon com dois JWTs diferentes.
