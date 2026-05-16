# RLS 策略库

参考目录。请根据实际情况改造 —— 不要盲目复制。

## 1. 公开读，禁止公开写

适用于目录表、面向营销的内容。

```sql
alter table public.kits enable row level security;

create policy "kits public read"
  on public.kits for select
  using (true);

-- 没有 insert/update/delete 策略 = 除了 service role 谁也不能写。
```

## 2. 已认证可读，所有者可写

适用于每个用户独立的资源（todo、笔记、保存的搜索）。

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

注意：`with check` 子句可阻止攻击者把自己拥有的行的 `owner_id` 改成别人。

## 3. 租户成员可读，租户 admin 可写

适用于组织内共享的资源（events、projects、invoices）。

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

## 4. 租户成员可读，本人可写（协作型帖子）

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

## 5. 父子行（教练可见其球队的运动员）

当访问谓词依赖于关联表时，请把它放进一个函数。

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

## 6. 限时访问（报名窗口）

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

## 7. 软删除 + 行不可见

模式：使用 `deleted_at timestamptz` 列。默认读取隐藏已删除的行。

```sql
create policy "events visible when not deleted"
  on public.events for select
  using (
    deleted_at is null
    and public.is_member_of(organization_id)
  );

-- Admin 可在恢复 UI 中看到已删除的行。
create policy "events visible to admin when deleted"
  on public.events for select
  using (
    deleted_at is not null
    and public.has_role(organization_id, 'admin')
  );
```

## 每条策略必备的测试

> 打开两个浏览器窗口。一个登录为 org A 的用户，另一个登录为 org B 的用户。尝试相互读取数据。任何能读到的都是泄漏。

用两个 anon 客户端 + 两个不同 JWT 写一条集成测试将其自动化。
