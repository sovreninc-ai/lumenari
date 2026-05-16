# Modelos de tenant — schema-por-tenant vs. coluna `tenant_id`

Existem duas escolhas reais para Postgres multi-tenant. Escolha deliberadamente.

## As duas opções

### A. Coluna `tenant_id` (schema compartilhado)

Toda linha tem coluna `tenant_id`. Policies RLS usam ela. Um schema, um conjunto de tabelas, um conjunto de migrations.

**Prós**
- Barato escalar para milhares de tenants
- Uma migration toca todos os tenants
- Analytics cross-tenant numa única query
- Backups, monitoramento e ops são simples

**Contras**
- Bug em RLS = vazamento entre todos os tenants
- Difícil dar a um tenant "exportação de dados" ou hard-delete
- Tenants não podem ter schemas diferentes (campos customizados são JSON ou tabela separada)

### B. Schema-por-tenant

Cada tenant tem seu próprio schema Postgres (ou banco próprio). Migrations são aplicadas em cada um.

**Prós**
- Fronteira rígida — bug de RLS num schema não vaza para outro
- Fácil exportação, exclusão, migração por tenant
- Tenants podem ter schemas diferentes se você quiser

**Contras**
- Overhead operacional cresce linearmente com tenants
- Queries cross-tenant são um pesadelo
- Consequências no pool de conexões (config do pgbouncer no Supabase importa)
- Migrations precisam de orquestração, não um simples `supabase db push`

## A rubrica de decisão

Use schema-por-tenant se **qualquer** uma destas for verdade:

1. Regulatório: os dados de cada tenant precisam estar fisicamente separados (alguns casos de saúde, alguns financeiros)
2. Poucos mas tenants muito grandes (ex.: < 50 tenants, > 1M linhas cada)
3. Tenants vão customizar o schema (campos, colunas customizadas)

Caso contrário, **coluna `tenant_id` é o certo.** É o que Sovren Sports, Lumina Reset e TradePass usam.

## Como fazer `tenant_id` direito

```sql
create table public.events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  -- … outras colunas
  created_at timestamptz not null default now()
);

-- SEMPRE indexe a coluna de tenant.
create index events_organization_idx on public.events(organization_id);

-- SEMPRE habilite RLS antes de deixar tráfego tocar a tabela.
alter table public.events enable row level security;
```

A migration para adicionar uma tabela nova com escopo de tenant é sempre: `create table` → `create index` na coluna de tenant → `enable row level security` → policies. Nessa ordem. Se você pular o passo 3, subiu um vazamento de dados.

## Como fazer schema-por-tenant direito

- Um schema template; migrations são templates SQL renderizados por tenant
- Uma tabela de registro no schema `public` mapeando slug do tenant → nome do schema
- Um helper de conexão que seta `search_path` no começo de toda sessão
- Código de aplicação que NUNCA concatena nome de tenant numa string SQL (use `set_config` parametrizado)

Isso é mais trabalho. Não embarque a menos que uma das condições da rubrica realmente bata.
