# Supabase Schema & RLS 技能包

> 在写第一行迁移之前，请把本套件放入 Claude 或 Cursor 项目中。它编码了多年踩坑总结出的多租户模式与 RLS 范式。

**适配工具：** Claude · Claude Code。

---

## 工作模式

你正在设计或修改运行在 Supabase 上的 Postgres schema。默认假设：

- **多租户**，存在一个租户实体（organization、club、workspace）。每个用户属于一个或多个租户。
- **RLS 没有商量余地。** 每张表在接收第一条 insert 之前都已启用 RLS。
- **`tenant_id` 列** 是默认的租户模型。schema-per-tenant 仅保留给有强监管隔离需求的场景。
- **只用迁移文件。** 所有 DDL 都放在 `supabase/migrations/000N_*.sql`。Supabase dashboard 仅用于查看，不用于编辑。

在写表之前永远先问：「这一行最应该被哪一小撮用户看到？」

---

## 默认 schema 骨架

```sql
-- 任何多租户应用都需要这三张表。
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table profiles (
  -- 镜像 auth.users 以便 RLS 策略可以干净地 join。
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table memberships (
  -- profiles 与 organizations 之间的多对多关系。
  -- 一个用户可以属于多个 org（顾问、孩子在多支球队的家长等）。
  -- `role` 决定该用户在该 org 内的权限。
  organization_id uuid not null references organizations(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'member')),
  joined_at timestamptz not null default now(),
  primary key (organization_id, profile_id)
);

create index memberships_profile_idx on memberships(profile_id);
create index memberships_org_idx on memberships(organization_id);
```

任何引用租户数据的新表都包含 `organization_id uuid not null references organizations(id)`。

---

## 你几乎到处都会用到的三个 RLS 辅助函数

```sql
-- 1. is_member_of(org_id)：若调用者属于该 org，则返回 true。
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

-- 2. has_role(org_id, role)：若调用者至少具备指定角色，则返回 true。
-- 角色层级：owner > admin > member。
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

-- 3. is_owner_of_row(row_owner_id)：用于具有单一用户所有者的资源。
create or replace function public.is_owner_of_row(owner uuid)
returns boolean
language sql
stable
as $$
  select owner = auth.uid();
$$;
```

`security definer` 很重要：它允许函数在调用者的 RLS 本会拦截 memberships 表时仍能读取该表。

---

## 策略库

### 公开读，禁止写

```sql
alter table public.kits enable row level security;
create policy "kits readable by all"
  on public.kits for select using (true);
```

### 租户范围内可读

```sql
alter table public.events enable row level security;
create policy "events read by org members"
  on public.events for select
  using (public.is_member_of(organization_id));
```

### 租户范围写，仅限 admin

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

### 仅所有者可访问

```sql
create policy "tasks read by owner"
  on public.tasks for select
  using (public.is_owner_of_row(owner_id));
```

### Service role 隐式绕过

`postgres` 与 service role 始终绕过 RLS。Webhook 与管理脚本使用 service-role 客户端。无需策略。

---

## 绝不能犯的错误

1. **忘记 `enable row level security`。** 没启用 RLS 的表等于公开表。`create table` 一定要配 `alter table … enable row level security`。
2. **只写一条 `using (true)` 的宽松策略。** 这等于没有 RLS。RLS 的意义在于按行的判定。
3. **在策略中直接写 `auth.uid()` 而不通过 `is_member_of`。** 这把策略与某种 schema 绑死。请走辅助函数。
4. **在 INSERT/UPDATE 上漏掉 `with check`。** `using` 过滤读、`with check` 过滤写。仅 INSERT 的判定必须放在 `with check`。
5. **忘记给 `tenant_id` 加索引。** RLS 会在每行扫描时调用函数 —— 没索引就是每次查询 O(n)。

---

## 配套文档

- `patterns/tenant-models.md` — schema-per-tenant 与 `tenant_id` 列的对比及选择依据
- `patterns/rls-policy-library.md` — 带实例的策略扩展目录
- `patterns/migration-discipline.md` — 评审清单 + 回滚方案
- `examples/0001_init_example.sql` — 可直接改造的完整起步迁移
