# Migration discipline

हर schema change एक migration है। Supabase dashboard एक viewer है।

## File naming

```
supabase/migrations/0001_init.sql
supabase/migrations/0002_add_invoices.sql
supabase/migrations/0003_seasons_unique_constraint.sql
```

Zero-padded sequence, फिर एक verb-noun description। Filename में timestamps avoid करें — वे noisy हैं और sequence ही actual ordering है।

## एक migration को क्या करना चाहिए

1. **Idempotent या transactional हो।** जहाँ Postgres allow करे वहाँ `if not exists` use करें, या `begin … exception` में wrap करें।
2. **Reasonable हो तो reversible हो।** Rollback steps describe करते हुए एक `-- down:` comment block add करें। हर migration cleanly reversible नहीं होती (data migrations rarely होती हैं) — उसे explicitly document करें।
3. **RLS को re-state करें।** अगर एक migration नई table add करती है, तो वही file RLS enable करती है और policies लिखती है। Table creation और RLS enable को कभी दो migrations में split न करें।
4. **Seed data भी एक migration है।** अगर आपका seed schema पर depend करता है, वो एक migration में है। Essentials भरने के लिए `seed.sql` पर rely न करें।

## Review checklist

एक migration merge करने से पहले:

- [ ] `create table` उसी file में `enable row level security` के साथ paired है
- [ ] हर tenant-scoped table पर tenant column पर एक index है
- [ ] हर foreign key के लिए `on delete` behavior deliberately चुना गया है (cascade vs. set null vs. restrict)
- [ ] Policies में कोई `select *` नहीं — columns को explicitly name करें
- [ ] कोई `security definer` function `set search_path = public` के बिना नहीं
- [ ] अगर migration default के साथ एक column add करती है, तो default `not null` add करने से पहले set होता है (नहीं तो rewrite forced हो जाता है)
- [ ] अगर migration एक check constraint add करती है, तो existing rows उसे pass करती हैं
- [ ] अगर migration data backfill करती है, तो वह end पर एक row-count assertion के साथ एक transaction में wrapped है

## PR review में call out करने वाले anti-patterns

- एक migration जो column drop करे बिना पहले verify किए कि कुछ उसे read नहीं करता
- एक migration जो column rename करे (दो deploys में add-new + backfill + drop-old use करें)
- एक migration जो existing column पर `unique` add करे बिना पहले duplicates check किए
- एक migration जो explicit `using` clause के बिना column type बदले

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

### एक data migration जो गलत rows पर चली

यह dangerous वाली है। आपके options हैं:

1. सबसे recent point-in-time snapshot से restore करें (Supabase Pro+ feature)
2. एक inverse migration replay करें अगर आपने काफी state save की थी
3. Logs से manual repair

Lesson: **merge करने से पहले staging में recent prod snapshot के साथ data migrations dry-run करें।**

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

Laptop से कभी `db push` to prod न करें। हमेशा CI के through जाएँ।
