# Tenant-Modelle — Schema-per-Tenant vs. `tenant_id`-Spalte

Es gibt zwei echte Auswahlmöglichkeiten für Multi-Tenant Postgres. Wähle bewusst.

## Die zwei Optionen

### A. `tenant_id`-Spalte (geteiltes Schema)

Jede Zeile hat eine `tenant_id`-Spalte. RLS-Policies nutzen sie. Ein Schema, ein Satz Tabellen, ein Satz Migrationen.

**Pros**
- Günstig auf Tausende von Tenants zu skalieren
- Einzige Migration berührt jeden Tenant
- Cross-Tenant-Analytics mit einer Query
- Backups, Monitoring und Ops sind einfach

**Cons**
- Bug in RLS = Daten-Leak über alle Tenants hinweg
- Schwer, einem einzelnen Tenant einen "Data Export" oder Hard-Delete zu geben
- Tenants können keine unterschiedlichen Schemas haben (Custom Fields sind JSON oder eine separate Tabelle)

### B. Schema-per-Tenant

Jeder Tenant hat sein eigenes Postgres-Schema (oder seine eigene Datenbank). Migrationen werden auf jedes angewendet.

**Pros**
- Harte Grenze — RLS-Bug in einem Schema leakt nicht in ein anderes
- Einfacher Per-Tenant-Export, Delete, Migrate
- Tenants können unterschiedliche Schemas haben, wenn du willst

**Cons**
- Operativer Overhead wächst linear mit Tenants
- Cross-Tenant-Queries sind albtraumhaft
- Connection-Pool-Konsequenzen (Supabase pgbouncer-Config ist relevant)
- Migrationen brauchen Orchestrierung, kein einziges `supabase db push`

## Die Entscheidungs-Rubric

Nutze Schema-per-Tenant, wenn **irgendeine** dieser Bedingungen wahr ist:

1. Regulatorisch: die Daten jedes Tenants müssen physisch getrennt sein (manche Healthcare, manche Financial)
2. Wenige aber sehr große Tenants (z.B. < 50 Tenants, > 1M Zeilen jeder)
3. Tenants werden das Schema anpassen (Custom Fields, Spalten)

Ansonsten ist **`tenant_id`-Spalte korrekt.** Das ist, was Sovren Sports, Lumina Reset und TradePass alle nutzen.

## Wie man `tenant_id` richtig macht

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

Die Migration zum Hinzufügen einer neuen tenant-gescopten Tabelle ist immer: `create table` → `create index` auf der Tenant-Spalte → `enable row level security` → Policies. In dieser Reihenfolge. Wenn du Schritt 3 überspringst, hast du ein Daten-Leak ausgeliefert.

## Wie man Schema-per-Tenant richtig macht

- Ein Template-Schema; Migrationen sind SQL-Templates, die pro Tenant gerendert werden
- Eine Registry-Tabelle im `public`-Schema, die Tenant-Slug → Schema-Name mappt
- Ein Connection-Helper, der `search_path` zu Beginn jeder Session setzt
- Application-Code, der NIEMALS einen Tenant-Namen in einen SQL-String konkateniert (nutze stattdessen ein parametrisiertes `set_config`)

Das ist mehr Arbeit. Nimm es nicht auf dich, außer eine der Rubric-Bedingungen feuert tatsächlich.
