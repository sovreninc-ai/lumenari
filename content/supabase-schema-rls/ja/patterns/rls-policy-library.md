# RLS ポリシーライブラリ

リファレンスカタログ。これらを流用 — 盲目的にコピーしない。

## 1. 公開読み込み、公開書き込みなし

カタログテーブル、マーケティング目的のコンテンツ向け。

```sql
alter table public.kits enable row level security;

create policy "kits public read"
  on public.kits for select
  using (true);

-- insert/update/delete のポリシーなし = service role 以外、誰も書き込めない。
```

## 2. 認証済み読み込み、オーナー書き込み

ユーザーごとのリソース（todo、メモ、保存済み検索）向け。

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

注意: `with check` 句は、攻撃者が自分の行を更新して `owner_id` を他人に書き換えるのを防ぐ。

## 3. テナントメンバー読み込み、テナント admin 書き込み

共有 org リソース（events、projects、invoices）向け。

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

## 4. テナントメンバー読み込み、本人書き込み（共同投稿）

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

## 5. 親子行（コーチが自分のチームの選手を見られる）

アクセス述語が関連テーブルにある場合は、関数に押し込む。

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

## 6. 時間制限付きアクセス（登録ウィンドウ）

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

## 7. 論理削除 + 非表示行

パターン: `deleted_at timestamptz` カラム。デフォルトの読み込みでは削除済みの行を隠す。

```sql
create policy "events visible when not deleted"
  on public.events for select
  using (
    deleted_at is null
    and public.is_member_of(organization_id)
  );

-- admin は復元 UI のために削除済みの行を見られる。
create policy "events visible to admin when deleted"
  on public.events for select
  using (
    deleted_at is not null
    and public.has_role(organization_id, 'admin')
  );
```

## ポリシーごとに必要な唯一のテスト

> ブラウザを 2 つ開く。一方で org A のユーザーとしてログイン、もう一方で org B のユーザーとしてログイン。互いのデータを読もうとする。何か表示されたら漏洩。

2 つの異なる JWT を持つ 2 つの anon クライアントを使った統合テストで自動化する。
