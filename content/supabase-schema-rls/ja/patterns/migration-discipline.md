# マイグレーション規律

すべてのスキーマ変更はマイグレーション。Supabase ダッシュボードはビューア。

## ファイル命名

```
supabase/migrations/0001_init.sql
supabase/migrations/0002_add_invoices.sql
supabase/migrations/0003_seasons_unique_constraint.sql
```

ゼロパディングのシーケンス、そして動詞-名詞の説明。ファイル名のタイムスタンプは避ける — ノイズになるし、シーケンス自体が順序を決める。

## マイグレーションが必ずすべきこと

1. **冪等またはトランザクショナルにする。** Postgres が許す箇所では `if not exists` を使うか、`begin … exception` で包む。
2. **合理的に可逆にする。** `-- down:` コメントブロックでロールバック手順を記述する。すべてのマイグレーションがきれいに可逆ではない（データマイグレーションは特に） — その場合は明示的に文書化する。
3. **RLS を改めて記述する。** マイグレーションで新テーブルを追加する場合、同じファイルで RLS を有効化しポリシーを書く。テーブル作成と RLS 有効化を 2 つのマイグレーションに分割しない。
4. **シードデータもマイグレーション。** シードがスキーマに依存しているなら、マイグレーションの中にある。必須データを `seed.sql` に頼らない。

## レビューチェックリスト

マイグレーションをマージする前に:

- [ ] `create table` と `enable row level security` が同じファイル内でペアになっている
- [ ] テナントスコープのテーブルは、テナントカラムのインデックスを持つ
- [ ] すべての外部キーで `on delete` の挙動が意図的に選ばれている（cascade vs. set null vs. restrict）
- [ ] ポリシー内で `select *` を使わない — カラムは明示的に名前を挙げる
- [ ] `security definer` 関数で `set search_path = public` がない場合は不可
- [ ] デフォルト付きカラムを追加する場合は、`not null` を付ける前にデフォルトを設定する（さもないとリライトが強制される）
- [ ] check 制約を追加する場合は、既存の行がそれを通過する
- [ ] データバックフィルを行う場合は、最後に行数のアサーションを伴ったトランザクションで包む

## PR レビューで指摘するアンチパターン

- 何も読んでいないことを先に確認せずにカラムを drop するマイグレーション
- カラム名を rename するマイグレーション（add-new + バックフィル + 2 デプロイにわたって drop-old を使う）
- 重複を先にチェックせずに既存カラムに `unique` を追加するマイグレーション
- 明示的な `using` 句なしでカラム型を変更するマイグレーション

## ロールバックレシピ

### 追加したばかりのカラム

```sql
-- 0017_add_phone.sql をロールバック
begin;
alter table public.profiles drop column phone;
commit;
```

### 誤った RLS ポリシーをデプロイ

```sql
-- 緩すぎるポリシーをロールバック
begin;
drop policy if exists "events read by all" on public.events;
create policy "events read by org members"
  on public.events for select
  using (public.is_member_of(organization_id));
commit;
```

### 誤った行に対して実行されたデータマイグレーション

これは危険なケース。選択肢は:

1. 最新のポイントインタイムスナップショットから復元（Supabase Pro+ の機能）
2. 状態を十分に保存していたなら、逆マイグレーションを再生する
3. ログからの手動修復

教訓: **データマイグレーションは、マージ前に最近の本番スナップショットを使ってステージングで dry-run する。**

## ローカルワークフロー

```bash
# 新しいマイグレーションファイルを作成
supabase migration new add_invoices

# ローカルで適用
supabase db reset

# 新しいスキーマから型を生成
supabase gen types typescript --local > src/types/database.ts

# ステージングブランチ（本番ではない）に push して検証
git push origin staging
# Vercel プレビュー + Supabase ブランチ DB が新マイグレーションをエンドツーエンドで実行
```

ノート PC から本番に `db push` してはいけない。常に CI を経由する。
