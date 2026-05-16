# Pacote de Schema & RLS do Supabase

> Coloque este kit num projeto Claude ou Cursor antes de escrever uma única migration. Ele codifica os padrões multi-tenant e os idiomas de RLS que levaram anos para serem desenvolvidos do jeito difícil.

**Otimizado para:** Claude, Claude Code.

---

## Modo de operação

Você está desenhando ou modificando um schema Postgres no Supabase. Pressupostos padrão:

- **Multi-tenant** com uma entidade de tenant (organização, clube, workspace). Todo usuário pertence a um ou mais tenants.
- **RLS é inegociável.** Toda tabela tem RLS habilitado antes de aceitar um único insert.
- **Coluna `tenant_id`** é o modelo padrão de tenancy. Schema-por-tenant é reservado para casos com necessidade de isolamento regulatório.
- **Apenas migrations.** Todo DDL vai em `supabase/migrations/000N_*.sql`. O dashboard do Supabase é um visualizador, não um editor.

Sempre pergunte: "Qual o menor conjunto de usuários que deveria ver esta linha?" antes de escrever a tabela.

---

## A espinha dorsal padrão do schema

```sql
-- Toda app multi-tenant precisa dessas três tabelas.
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table profiles (
  -- Espelha auth.users para que policies de RLS façam join sem dor.
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table memberships (
  -- Muitos-para-muitos entre profiles e organizations.
  -- Um usuário pode pertencer a múltiplas orgs (consultores, pais com filhos
  -- em vários times etc.). O `role` decide o que pode dentro da org.
  organization_id uuid not null references organizations(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'member')),
  joined_at timestamptz not null default now(),
  primary key (organization_id, profile_id)
);

create index memberships_profile_idx on memberships(profile_id);
create index memberships_org_idx on memberships(organization_id);
```

Qualquer tabela nova que referencie dados sob escopo de tenant tem `organization_id uuid not null references organizations(id)`.

---

## As três helper functions de RLS que você vai usar em todo lugar

```sql
-- 1. is_member_of(org_id): true se o chamador pertence àquela org.
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

-- 2. has_role(org_id, role): true se o chamador tem pelo menos aquele role.
-- Codifica a hierarquia owner > admin > member.
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

-- 3. is_owner_of_row(row_owner_id): para recursos com um único dono humano.
create or replace function public.is_owner_of_row(owner uuid)
returns boolean
language sql
stable
as $$
  select owner = auth.uid();
$$;
```

`security definer` importa: permite que a função leia a tabela memberships mesmo quando o RLS do chamador o bloquearia.

---

## Biblioteca de policies

### Leitura pública, sem escrita

```sql
alter table public.kits enable row level security;
create policy "kits readable by all"
  on public.kits for select using (true);
```

### Leitura sob escopo de tenant

```sql
alter table public.events enable row level security;
create policy "events read by org members"
  on public.events for select
  using (public.is_member_of(organization_id));
```

### Escrita sob escopo de tenant, só admin

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

### Apenas o dono

```sql
create policy "tasks read by owner"
  on public.tasks for select
  using (public.is_owner_of_row(owner_id));
```

### Bypass da service role (implícito)

`postgres` e a service role sempre bypassam o RLS. Webhooks e scripts de admin usam o client com service-role. Sem necessidade de policy.

---

## Erros que você não pode cometer

1. **Esquecer `enable row level security`.** Uma tabela sem RLS habilitado é pública. Sempre pareie `create table` com `alter table … enable row level security`.
2. **Escrever uma única policy permissiva com `using (true)`.** Isso é o mesmo que não ter RLS. Todo o ponto são predicados por linha.
3. **Colocar `auth.uid()` direto numa policy sem `is_member_of`.** Significa que você acoplou essa policy a um esquema. Use o helper.
4. **Pular a cláusula `with check` no INSERT/UPDATE.** `using` filtra leituras; `with check` filtra escritas. Checks só de INSERT precisam de `with check`.
5. **Esquecer o índice em `tenant_id`.** RLS chama a função em cada linha escaneada — sem índice, é O(n) toda query.

---

## Docs complementares

- `patterns/tenant-models.md` — schema-por-tenant vs. coluna `tenant_id`, com a rubrica de decisão
- `patterns/rls-policy-library.md` — catálogo estendido de policies com exemplos resolvidos
- `patterns/migration-discipline.md` — checklist de revisão + receitas de rollback
- `examples/0001_init_example.sql` — uma migration inicial completa que você pode adaptar
