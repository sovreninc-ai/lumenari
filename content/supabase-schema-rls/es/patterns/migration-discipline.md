# Disciplina de migraciones

Cada cambio de schema es una migración. El dashboard de Supabase es un visor.

## Nomenclatura de archivos

```
supabase/migrations/0001_init.sql
supabase/migrations/0002_add_invoices.sql
supabase/migrations/0003_seasons_unique_constraint.sql
```

Secuencia con padding de ceros, después una descripción verb-noun. Evita timestamps en el nombre — generan ruido y la secuencia es el orden real.

## Lo que una migración debe hacer

1. **Ser idempotente o transaccional.** Usa `if not exists` donde Postgres lo permita, o envuelve en `begin … exception`.
2. **Ser reversible si es razonable.** Agrega un bloque de comentario `-- down:` describiendo los pasos de rollback. No toda migración es reversible limpiamente (las migraciones de datos raramente lo son) — documenta eso explícitamente.
3. **Reafirmar RLS.** Si una migración agrega una tabla nueva, el mismo archivo habilita RLS y escribe las políticas. Nunca dividas la creación de la tabla y el enable de RLS entre dos migraciones.
4. **Los datos seed también son una migración.** Si tu seed depende del schema, está en una migración. No dependas de un `seed.sql` para rellenar lo esencial.

## El checklist de review

Antes de mergear una migración:

- [ ] `create table` emparejado con `enable row level security` en el mismo archivo
- [ ] Cada tabla con scope de tenant tiene un índice en la columna de tenant
- [ ] Cada foreign key tiene un comportamiento `on delete` elegido deliberadamente (cascade vs. set null vs. restrict)
- [ ] Sin `select *` en políticas — nombra columnas explícitamente
- [ ] Sin función `security definer` sin `set search_path = public`
- [ ] Si la migración agrega una columna con default, el default se setea ANTES de agregar `not null` (de lo contrario se fuerza el rewrite)
- [ ] Si la migración agrega un check constraint, las filas existentes lo pasan
- [ ] Si la migración hace backfill de datos, está envuelta en una transacción con una aserción de row-count al final

## Anti-patrones para señalar en review de PR

- Una migración que dropea una columna sin verificar primero que nada la lee
- Una migración que renombra una columna (usa add-new + backfill + drop-old en dos deploys)
- Una migración que agrega `unique` a una columna existente sin chequear duplicados primero
- Una migración que cambia el tipo de una columna sin una cláusula `using` explícita

## Recetas de rollback

### Columna recién agregada

```sql
-- Rollback de 0017_add_phone.sql
begin;
alter table public.profiles drop column phone;
commit;
```

### Política de RLS equivocada enviada

```sql
-- Rollback de una política demasiado permisiva
begin;
drop policy if exists "events read by all" on public.events;
create policy "events read by org members"
  on public.events for select
  using (public.is_member_of(organization_id));
commit;
```

### Una migración de datos que corrió sobre las filas equivocadas

Esta es la peligrosa. Tus opciones son:

1. Restaurar desde el snapshot point-in-time más reciente (feature de Supabase Pro+)
2. Replicar una migración inversa si guardaste suficiente estado
3. Reparación manual a partir de logs

La lección: **prueba en dry-run las migraciones de datos en staging con un snapshot reciente de prod antes de mergear.**

## Flujo local

```bash
# Crear un nuevo archivo de migración
supabase migration new add_invoices

# Aplicar local
supabase db reset

# Generar types desde el nuevo schema
supabase gen types typescript --local > src/types/database.ts

# Push a la branch de staging (NO prod) para verificación
git push origin staging
# El preview de Vercel + la DB de la branch de Supabase corren la migración end-to-end
```

Nunca hagas `db push` a prod desde un laptop. Siempre pasa por CI.
