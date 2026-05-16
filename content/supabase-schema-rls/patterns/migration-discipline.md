# Migration discipline

Every schema change is a migration. The Supabase dashboard is a viewer.

## File naming

```
supabase/migrations/0001_init.sql
supabase/migrations/0002_add_invoices.sql
supabase/migrations/0003_seasons_unique_constraint.sql
```

Zero-padded sequence, then a verb-noun description. Avoid timestamps in the filename — they're noisy and the sequence is the actual ordering.

## What a migration must do

1. **Be idempotent or transactional.** Use `if not exists` where Postgres allows it, or wrap in `begin … exception`.
2. **Be reversible if reasonable.** Add a `-- down:` comment block describing the rollback steps. Not every migration is cleanly reversible (data migrations rarely are) — document that explicitly.
3. **Re-state RLS.** If a migration adds a new table, the same file enables RLS and writes the policies. Never split table creation and RLS enable across two migrations.
4. **Seed data is also a migration.** If your seed depends on the schema, it's in a migration. Don't rely on a `seed.sql` to fill in essentials.

## The review checklist

Before merging a migration:

- [ ] `create table` paired with `enable row level security` in the same file
- [ ] Every tenant-scoped table has an index on the tenant column
- [ ] Every foreign key has `on delete` behavior chosen deliberately (cascade vs. set null vs. restrict)
- [ ] No `select *` in policies — name columns explicitly
- [ ] No `security definer` function without `set search_path = public`
- [ ] If the migration adds a column with a default, the default is set BEFORE adding `not null` (otherwise the rewrite is forced)
- [ ] If the migration adds a check constraint, existing rows pass it
- [ ] If the migration backfills data, it's wrapped in a transaction with a row-count assertion at the end

## Anti-patterns to call out in PR review

- A migration that drops a column without first verifying nothing reads it
- A migration that renames a column (use add-new + backfill + drop-old across two deploys)
- A migration that adds `unique` to an existing column without checking duplicates first
- A migration that changes a column type without an explicit `using` clause

## Rollback recipes

### Just-added column

```sql
-- Roll back 0017_add_phone.sql
begin;
alter table public.profiles drop column phone;
commit;
```

### Wrong RLS policy shipped

```sql
-- Roll back a too-permissive policy
begin;
drop policy if exists "events read by all" on public.events;
create policy "events read by org members"
  on public.events for select
  using (public.is_member_of(organization_id));
commit;
```

### A data migration that ran on the wrong rows

This is the dangerous one. Your options are:

1. Restore from the most recent point-in-time snapshot (Supabase Pro+ feature)
2. Replay an inverse migration if you saved enough state
3. Manual repair from logs

The lesson: **dry-run data migrations in staging with a recent prod snapshot before merging.**

## Local workflow

```bash
# Create a new migration file
supabase migration new add_invoices

# Apply locally
supabase db reset

# Generate types from the new schema
supabase gen types typescript --local > src/types/database.ts

# Push to staging branch (NOT prod) for verification
git push origin staging
# Vercel preview + Supabase branch DB run the new migration end-to-end
```

Never `db push` to prod from a laptop. Always go through CI.
