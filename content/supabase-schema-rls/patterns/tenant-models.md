# Tenant models — schema-per-tenant vs. `tenant_id` column

There are two real choices for multi-tenant Postgres. Pick deliberately.

## The two options

### A. `tenant_id` column (shared schema)

Every row has a `tenant_id` column. RLS policies use it. One schema, one set of tables, one set of migrations.

**Pros**
- Cheap to scale to thousands of tenants
- Single migration touches every tenant
- Cross-tenant analytics with one query
- Backups, monitoring, and ops are simple

**Cons**
- Bug in RLS = data leak across all tenants
- Hard to give a single tenant a "data export" or hard-delete
- Tenants can't have different schemas (custom fields are JSON or a separate table)

### B. Schema-per-tenant

Each tenant has its own Postgres schema (or its own database). Migrations are applied to each.

**Pros**
- Hard boundary — RLS bug in one schema doesn't leak to another
- Easy per-tenant export, delete, migrate
- Tenants can have different schemas if you want

**Cons**
- Operational overhead grows linearly with tenants
- Cross-tenant queries are nightmarish
- Connection pool consequences (Supabase pgbouncer config matters)
- Migrations need orchestration, not a single `supabase db push`

## The decision rubric

Use schema-per-tenant if **any** of these are true:

1. Regulatory: each tenant's data must be physically separated (some healthcare, some financial)
2. Few but very large tenants (e.g., < 50 tenants, > 1M rows each)
3. Tenants will customize the schema (custom fields, columns)

Otherwise, **`tenant_id` column is correct.** It's what Sovren Sports, Lumina Reset, and TradePass all use.

## How to do `tenant_id` right

```sql
create table public.events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  -- … other columns
  created_at timestamptz not null default now()
);

-- ALWAYS index the tenant column.
create index events_organization_idx on public.events(organization_id);

-- ALWAYS enable RLS before letting traffic touch the table.
alter table public.events enable row level security;
```

The migration to add a new tenant-scoped table is always: `create table` → `create index` on tenant column → `enable row level security` → policies. In that order. If you skip step 3, you've shipped a data leak.

## How to do schema-per-tenant right

- One template schema; migrations are SQL templates that get rendered per tenant
- A registry table in the `public` schema mapping tenant slug → schema name
- A connection helper that sets `search_path` at the start of every session
- Application code that NEVER concatenates a tenant name into a SQL string (use a parameterized `set_config` instead)

This is more work. Don't take it on unless one of the rubric conditions actually fires.
