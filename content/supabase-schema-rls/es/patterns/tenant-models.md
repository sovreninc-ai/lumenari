# Modelos de tenant — schema-por-tenant vs. columna `tenant_id`

Hay dos opciones reales para Postgres multi-tenant. Elige a propósito.

## Las dos opciones

### A. Columna `tenant_id` (schema compartido)

Cada fila tiene una columna `tenant_id`. Las políticas de RLS la usan. Un schema, un set de tablas, un set de migraciones.

**Pros**
- Barato escalar a miles de tenants
- Una sola migración toca a cada tenant
- Analítica cross-tenant con una sola query
- Backups, monitoreo y ops son simples

**Cons**
- Bug en RLS = data leak entre todos los tenants
- Difícil darle a un solo tenant un "export de datos" o un hard-delete
- Los tenants no pueden tener schemas distintos (los campos custom son JSON o una tabla aparte)

### B. Schema-por-tenant

Cada tenant tiene su propio schema de Postgres (o su propia base de datos). Las migraciones se aplican a cada uno.

**Pros**
- Frontera dura — un bug de RLS en un schema no filtra al otro
- Export, delete y migrate por-tenant fáciles
- Los tenants pueden tener schemas distintos si lo quieres

**Cons**
- El overhead operacional crece linealmente con los tenants
- Las queries cross-tenant son una pesadilla
- Consecuencias en el connection pool (la config de pgbouncer de Supabase importa)
- Las migraciones necesitan orquestación, no un solo `supabase db push`

## La rúbrica de decisión

Usa schema-por-tenant si **alguna** de estas es cierta:

1. Regulatorio: los datos de cada tenant deben estar separados físicamente (algo de salud, algo de finanzas)
2. Pocos tenants pero muy grandes (p. ej., < 50 tenants, > 1M filas cada uno)
3. Los tenants van a customizar el schema (custom fields, columnas)

De lo contrario, **la columna `tenant_id` es lo correcto.** Es lo que usan Sovren Sports, Lumina Reset y TradePass.

## Cómo hacer `tenant_id` bien

```sql
create table public.events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  -- … otras columnas
  created_at timestamptz not null default now()
);

-- SIEMPRE indexa la columna de tenant.
create index events_organization_idx on public.events(organization_id);

-- SIEMPRE habilita RLS antes de dejar que el tráfico toque la tabla.
alter table public.events enable row level security;
```

La migración para agregar una nueva tabla con scope de tenant es siempre: `create table` → `create index` en la columna de tenant → `enable row level security` → políticas. En ese orden. Si te saltas el paso 3, enviaste un data leak.

## Cómo hacer schema-por-tenant bien

- Un schema template; las migraciones son templates SQL que se renderizan por tenant
- Una tabla de registro en el schema `public` mapeando slug de tenant → nombre de schema
- Un helper de conexión que setea `search_path` al inicio de cada sesión
- Código de aplicación que NUNCA concatena un nombre de tenant en un string SQL (usa un `set_config` parametrizado en su lugar)

Esto es más trabajo. No lo tomes salvo que se dispare alguna de las condiciones de la rúbrica.
