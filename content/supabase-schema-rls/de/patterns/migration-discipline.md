# Migrations-Disziplin

Jede Schema-Änderung ist eine Migration. Das Supabase-Dashboard ist ein Viewer.

## Dateibenennung

```
supabase/migrations/0001_init.sql
supabase/migrations/0002_add_invoices.sql
supabase/migrations/0003_seasons_unique_constraint.sql
```

Zero-padded Sequence, dann eine Verb-Noun-Beschreibung. Vermeide Timestamps im Dateinamen — sie sind verrauscht, und die Sequence ist die tatsächliche Ordnung.

## Was eine Migration tun muss

1. **Idempotent oder transaktional sein.** Nutze `if not exists`, wo Postgres es erlaubt, oder wrappe in `begin … exception`.
2. **Wenn sinnvoll, reversibel sein.** Füge einen `-- down:`-Kommentar-Block hinzu, der die Rollback-Schritte beschreibt. Nicht jede Migration ist sauber reversibel (Daten-Migrationen sind es selten) — dokumentiere das explizit.
3. **RLS restate.** Wenn eine Migration eine neue Tabelle hinzufügt, aktiviert dieselbe Datei RLS und schreibt die Policies. Splitte niemals Tabellen-Erstellung und RLS-Aktivierung über zwei Migrationen.
4. **Seed-Daten sind auch eine Migration.** Wenn dein Seed vom Schema abhängt, ist es in einer Migration. Verlasse dich nicht auf eine `seed.sql`, um Essentials zu füllen.

## Die Review-Checkliste

Vor dem Mergen einer Migration:

- [ ] `create table` gepaart mit `enable row level security` in derselben Datei
- [ ] Jede tenant-gescopte Tabelle hat einen Index auf der Tenant-Spalte
- [ ] Jeder Foreign Key hat `on delete`-Verhalten bewusst gewählt (cascade vs. set null vs. restrict)
- [ ] Kein `select *` in Policies — Spalten explizit benennen
- [ ] Keine `security definer`-Funktion ohne `set search_path = public`
- [ ] Wenn die Migration eine Spalte mit Default hinzufügt, wird der Default VOR dem Hinzufügen von `not null` gesetzt (sonst wird das Rewrite erzwungen)
- [ ] Wenn die Migration einen Check-Constraint hinzufügt, bestehen existierende Zeilen ihn
- [ ] Wenn die Migration Daten backfillt, ist sie in eine Transaktion gewrappt mit einer Row-Count-Assertion am Ende

## Anti-Patterns, die im PR-Review zu callouten sind

- Eine Migration, die eine Spalte droppt, ohne vorher zu verifizieren, dass nichts sie liest
- Eine Migration, die eine Spalte umbenennt (nutze Add-New + Backfill + Drop-Old über zwei Deploys)
- Eine Migration, die `unique` zu einer existierenden Spalte hinzufügt, ohne vorher Duplikate zu prüfen
- Eine Migration, die einen Spalten-Typ ohne explizite `using`-Klausel ändert

## Rollback-Rezepte

### Gerade hinzugefügte Spalte

```sql
-- Roll back 0017_add_phone.sql
begin;
alter table public.profiles drop column phone;
commit;
```

### Falsche RLS-Policy ausgeliefert

```sql
-- Roll back a too-permissive policy
begin;
drop policy if exists "events read by all" on public.events;
create policy "events read by org members"
  on public.events for select
  using (public.is_member_of(organization_id));
commit;
```

### Eine Daten-Migration, die auf den falschen Zeilen lief

Das ist die gefährliche. Deine Optionen sind:

1. Restore aus dem neuesten Point-in-Time-Snapshot (Supabase Pro+ Feature)
2. Eine inverse Migration replayen, falls du genug State gespeichert hast
3. Manuelle Reparatur aus Logs

Die Lektion: **Daten-Migrationen in Staging mit einem aktuellen Prod-Snapshot dry-runnen, bevor sie gemergt werden.**

## Lokaler Workflow

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

Niemals `db push` zu Prod vom Laptop. Geh immer durch CI.
