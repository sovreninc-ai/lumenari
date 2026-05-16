# Discipline de migration

Chaque changement de schéma est une migration. Le dashboard Supabase est un viewer.

## Nommage des fichiers

```
supabase/migrations/0001_init.sql
supabase/migrations/0002_add_invoices.sql
supabase/migrations/0003_seasons_unique_constraint.sql
```

Séquence avec padding par des zéros, puis une description verbe-substantif. Évitez les timestamps dans le nom de fichier — ils sont bruyants et la séquence est l'ordre réel.

## Ce qu'une migration doit faire

1. **Être idempotente ou transactionnelle.** Utilisez `if not exists` là où Postgres le permet, ou wrappez dans `begin … exception`.
2. **Être réversible si c'est raisonnable.** Ajoutez un bloc commentaire `-- down:` décrivant les étapes de rollback. Toutes les migrations ne sont pas proprement réversibles (les migrations de données le sont rarement) — documentez-le explicitement.
3. **Réénoncer la RLS.** Si une migration ajoute une nouvelle table, le même fichier active la RLS et écrit les policies. Ne séparez jamais la création de table et l'activation de la RLS entre deux migrations.
4. **Les données de seed sont aussi une migration.** Si votre seed dépend du schéma, c'est dans une migration. Ne comptez pas sur un `seed.sql` pour fournir les éléments essentiels.

## La checklist de revue

Avant de merger une migration :

- [ ] `create table` associé à `enable row level security` dans le même fichier
- [ ] Chaque table tenant-scoped a un index sur la colonne tenant
- [ ] Chaque foreign key a un comportement `on delete` choisi délibérément (cascade vs set null vs restrict)
- [ ] Pas de `select *` dans les policies — nommer les colonnes explicitement
- [ ] Pas de fonction `security definer` sans `set search_path = public`
- [ ] Si la migration ajoute une colonne avec un default, le default est défini AVANT d'ajouter `not null` (sinon la réécriture est forcée)
- [ ] Si la migration ajoute une contrainte check, les lignes existantes la passent
- [ ] Si la migration backfill des données, elle est wrappée dans une transaction avec une assertion sur le row-count à la fin

## Anti-patterns à appeler en revue de PR

- Une migration qui drop une colonne sans avoir vérifié au préalable que rien ne la lit
- Une migration qui renomme une colonne (utilisez add-new + backfill + drop-old sur deux déploiements)
- Une migration qui ajoute `unique` à une colonne existante sans avoir vérifié les doublons au préalable
- Une migration qui change le type d'une colonne sans clause `using` explicite

## Recettes de rollback

### Colonne tout juste ajoutée

```sql
-- Roll back 0017_add_phone.sql
begin;
alter table public.profiles drop column phone;
commit;
```

### Mauvaise policy RLS livrée

```sql
-- Roll back d'une policy trop permissive
begin;
drop policy if exists "events read by all" on public.events;
create policy "events read by org members"
  on public.events for select
  using (public.is_member_of(organization_id));
commit;
```

### Une migration de données qui s'est appliquée aux mauvaises lignes

C'est la dangereuse. Vos options sont :

1. Restaurer depuis le snapshot point-in-time le plus récent (fonctionnalité Supabase Pro+)
2. Rejouer une migration inverse si vous avez sauvegardé suffisamment d'état
3. Réparation manuelle depuis les logs

La leçon : **dry-runnez les migrations de données en staging avec un snapshot prod récent avant de merger.**

## Workflow local

```bash
# Créer un nouveau fichier de migration
supabase migration new add_invoices

# Appliquer en local
supabase db reset

# Générer les types depuis le nouveau schéma
supabase gen types typescript --local > src/types/database.ts

# Pousser sur la branche staging (PAS prod) pour vérification
git push origin staging
# Le preview Vercel + la DB de branche Supabase exécutent la nouvelle migration de bout en bout
```

Ne `db push` jamais vers la prod depuis un laptop. Passez toujours par la CI.
