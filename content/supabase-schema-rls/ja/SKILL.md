# Supabase スキーマ & RLS パック

> 最初のマイグレーションを書く前に、このキットを Claude や Cursor のプロジェクトに投入してください。長い試行錯誤の末に身につけたマルチテナントのパターンと RLS の定石を凝縮しています。

**最適化対象:** Claude · Claude Code。

---

## 動作モード

あなたは Supabase 上で Postgres のスキーマを設計または変更しています。デフォルトの前提:

- **マルチテナント** で、テナントエンティティ（organization、club、workspace）を持つ。各ユーザーは 1 つ以上のテナントに所属する。
- **RLS は譲れない。** すべてのテーブルは、最初の insert を受け入れる前に RLS を有効化する。
- **`tenant_id` カラム** がデフォルトのテナンシーモデル。テナント別スキーマは、規制上の隔離が必要な場合に限定する。
- **マイグレーションのみ。** すべての DDL は `supabase/migrations/000N_*.sql` に記述する。Supabase ダッシュボードはビューアであってエディタではない。

テーブルを書く前に、必ず問うこと: 「この行を見るべき最小のユーザー集合は誰か?」

---

## デフォルトのスキーマの背骨

```sql
-- すべてのマルチテナントアプリにはこの 3 つのテーブルが必要。
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table profiles (
  -- auth.users をミラーすることで RLS ポリシーがきれいに join できる。
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table memberships (
  -- profiles と organizations の多対多。
  -- 1 人のユーザーが複数の org に所属できる（コンサルタント、
  -- 複数チームに子を持つ親など）。`role` が org 内の権限を決める。
  organization_id uuid not null references organizations(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'member')),
  joined_at timestamptz not null default now(),
  primary key (organization_id, profile_id)
);

create index memberships_profile_idx on memberships(profile_id);
create index memberships_org_idx on memberships(organization_id);
```

テナントスコープのデータを参照する新規テーブルは、`organization_id uuid not null references organizations(id)` を持つ。

---

## どこでも使う 3 つの RLS ヘルパー関数

```sql
-- 1. is_member_of(org_id): 呼び出し元がその org に所属していれば true。
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

-- 2. has_role(org_id, role): 呼び出し元が少なくともその role を持っていれば true。
-- 階層 owner > admin > member をエンコードしている。
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

-- 3. is_owner_of_row(row_owner_id): 単一の人間のオーナーを持つリソース用。
create or replace function public.is_owner_of_row(owner uuid)
returns boolean
language sql
stable
as $$
  select owner = auth.uid();
$$;
```

`security definer` が重要: 呼び出し元の RLS で memberships テーブルがブロックされる場合でも、この関数が読めるようにする。

---

## ポリシーライブラリ

### 公開読み込み、書き込み不可

```sql
alter table public.kits enable row level security;
create policy "kits readable by all"
  on public.kits for select using (true);
```

### テナントスコープでの読み込み

```sql
alter table public.events enable row level security;
create policy "events read by org members"
  on public.events for select
  using (public.is_member_of(organization_id));
```

### テナントスコープでの書き込み（admin のみ）

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

### オーナー限定

```sql
create policy "tasks read by owner"
  on public.tasks for select
  using (public.is_owner_of_row(owner_id));
```

### service role のバイパス（暗黙）

`postgres` と service role は常に RLS をバイパスする。webhook と管理スクリプトは service-role クライアントを使う。ポリシー不要。

---

## してはならない誤り

1. **`enable row level security` を忘れる。** RLS が無効のテーブルは公開状態。`create table` は `alter table … enable row level security` と必ずペアにすること。
2. **`using (true)` の許容ポリシーを 1 つだけ書く。** これは RLS なしと同じ。要点は行ごとの述語にある。
3. **`auth.uid()` を `is_member_of` を介さずに直接ポリシーへ書く。** このポリシーが 1 つのスキーマに結合されてしまう。ヘルパーを使うこと。
4. **INSERT/UPDATE で `with check` 句を省略する。** `using` は読み込みをフィルタし、`with check` は書き込みをフィルタする。INSERT 専用チェックには `with check` が必要。
5. **`tenant_id` のインデックスを忘れる。** RLS はスキャンされる行ごとに関数を呼ぶ — インデックスなしでは毎回 O(n)。

---

## 関連ドキュメント

- `patterns/tenant-models.md` — テナント別スキーマ vs. `tenant_id` カラム、判断基準付き
- `patterns/rls-policy-library.md` — ポリシーの拡張カタログと実例
- `patterns/migration-discipline.md` — レビューチェックリスト + ロールバックレシピ
- `examples/0001_init_example.sql` — 出発点として流用できる完全なスターターマイグレーション
