# Tenant models — schema-per-tenant vs. `tenant_id` column

Multi-tenant Postgres के लिए दो real choices हैं। Deliberately pick करें।

## दो options

### A. `tenant_id` column (shared schema)

हर row में एक `tenant_id` column होता है। RLS policies उसे use करती हैं। एक schema, tables का एक set, migrations का एक set।

**Pros**
- हज़ारों tenants तक cheaply scale
- एक migration हर tenant को touch करती है
- एक query के साथ cross-tenant analytics
- Backups, monitoring, और ops simple

**Cons**
- RLS में bug = सभी tenants में data leak
- एक tenant को "data export" या hard-delete देना hard
- Tenants के पास अलग schemas नहीं हो सकते (custom fields JSON या एक अलग table होते हैं)

### B. Schema-per-tenant

हर tenant का अपना Postgres schema होता है (या अपना database)। Migrations हर एक को apply होते हैं।

**Pros**
- Hard boundary — एक schema में RLS bug दूसरे में leak नहीं होता
- आसान per-tenant export, delete, migrate
- अगर चाहें तो tenants के पास अलग schemas हो सकते हैं

**Cons**
- Operational overhead tenants के साथ linearly grow करता है
- Cross-tenant queries nightmarish हैं
- Connection pool consequences (Supabase pgbouncer config matter करती है)
- Migrations को orchestration चाहिए, single `supabase db push` नहीं

## Decision rubric

Schema-per-tenant use करें अगर **इनमें से कोई एक** true है:

1. Regulatory: हर tenant के data को physically separated होना चाहिए (some healthcare, some financial)
2. कम लेकिन बहुत बड़े tenants (e.g., < 50 tenants, > 1M rows each)
3. Tenants schema customize करेंगे (custom fields, columns)

नहीं तो, **`tenant_id` column correct है।** यह वही है जो Sovren Sports, Lumina Reset, और TradePass सब use करते हैं।

## `tenant_id` को सही तरह से कैसे करें

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

एक नई tenant-scoped table add करने वाली migration हमेशा यह है: `create table` → tenant column पर `create index` → `enable row level security` → policies। उसी order में। अगर आप step 3 skip करते हैं, तो आपने एक data leak ship किया है।

## Schema-per-tenant को सही तरह से कैसे करें

- एक template schema; migrations SQL templates हैं जो per tenant render होते हैं
- `public` schema में एक registry table जो tenant slug → schema name map करती है
- एक connection helper जो हर session की शुरुआत में `search_path` set करता है
- Application code जो एक SQL string में tenant name कभी concatenate न करे (इसके बजाय एक parameterized `set_config` use करें)

यह अधिक काम है। तब तक न लें जब तक rubric conditions में से कोई actually fire न करे।
