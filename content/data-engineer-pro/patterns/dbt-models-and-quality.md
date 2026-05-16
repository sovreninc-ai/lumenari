# Patterns — dbt Models & Data Quality

Long-form reference: layered project structure, test patterns, idempotent backfill recipes, and the data contract template.

---

## The three-layer dbt project

### Layer 1: Staging (`models/staging/<source>/`)

**Purpose**: 1:1 with each raw source table, with light cleanup.

**Rules**:
- One staging model per source table. Never join two sources here.
- Light cleanup only: rename columns to project convention (`user_id` not `userId`), cast types, parse timestamps to UTC, trim whitespace, lowercase emails, normalize enums.
- No business logic. Business logic lives in intermediate or marts.
- Default materialization: `view`. Cheap, always fresh against raw.
- Naming: `stg_<source>__<table>` with double underscore.

**Example: `stg_stripe__subscriptions.sql`**

```sql
{{ config(materialized='view') }}

with source as (
    select * from {{ source('stripe', 'subscriptions') }}
),

renamed as (
    select
        id                                              as subscription_id,
        customer                                        as customer_id,
        status,
        current_period_start::timestamp_tz at time zone 'UTC' as current_period_start_at,
        current_period_end::timestamp_tz at time zone 'UTC'   as current_period_end_at,
        trial_end::timestamp_tz at time zone 'UTC'      as trial_end_at,
        created::timestamp_tz at time zone 'UTC'        as created_at,
        cancel_at_period_end,
        _fivetran_synced::timestamp_tz at time zone 'UTC' as ingested_at
    from source
)

select * from renamed
```

Notice: explicit column list, no `SELECT *`. Type casts and timezone normalization. Naming aligns to project convention.

### Layer 2: Intermediate (`models/intermediate/`)

**Purpose**: reusable building blocks between staging and marts.

**Rules**:
- Not exposed to BI tools. Internal to the dbt project.
- Common content: conformed dimensions before they get split, denormalized event streams, bridges, complex window-function logic.
- Materialization: `ephemeral` (cheap, inlined), `view` (medium reuse), `table` (expensive logic + reused often).
- Naming: `int_<domain>__<purpose>`.

**Example: `int_subscriptions__active_periods.sql`** — builds SCD-2-style active period rows from the event log.

```sql
{{ config(materialized='view') }}

with events as (
    select * from {{ ref('stg_billing__invoice_events') }}
    where event_type in ('subscription_created', 'subscription_updated', 'subscription_cancelled')
),

with_next_event as (
    select
        subscription_id,
        event_type,
        status_after,
        event_at as period_start_at,
        lead(event_at) over (
            partition by subscription_id
            order by event_at
        ) as period_end_at
    from events
)

select
    {{ dbt_utils.generate_surrogate_key(['subscription_id', 'period_start_at']) }} as subscription_period_id,
    subscription_id,
    status_after as status,
    period_start_at,
    coalesce(period_end_at, timestamp '9999-12-31 00:00:00') as period_end_at
from with_next_event
```

Notice: deterministic surrogate key via `generate_surrogate_key`. Idempotent — re-running produces the same IDs.

### Layer 3: Marts (`models/marts/<domain>/`)

**Purpose**: dimensional models exposed to analysts and BI tools.

**Rules**:
- Materialization: `table` or `incremental` for large tables.
- One grain per fact table — never mix order grain with line-item grain.
- Tested heavily: PK unique + not-null, FK relationships, accepted values, freshness.
- Naming: `fct_<grain>` for facts (events, transactions, measurements), `dim_<entity>` for dimensions (customers, products, subscriptions).

**Example: `fct_subscription_events.sql`**

```sql
{{ config(
    materialized='incremental',
    unique_key='event_id',
    incremental_strategy='merge',
    on_schema_change='append_new_columns'
) }}

with source as (
    select * from {{ ref('stg_billing__invoice_events') }}
    {% if is_incremental() %}
      where event_at > (select max(event_at) from {{ this }}) - interval '24 hours'
    {% endif %}
),

dim_join as (
    select
        e.event_id,
        e.subscription_id,
        s.customer_id,
        e.event_type,
        e.amount_cents,
        e.currency_code,
        e.event_at,
        e.ingested_at
    from source e
    left join {{ ref('dim_subscriptions') }} s
      on s.subscription_id = e.subscription_id
)

select * from dim_join
```

Notice: `unique_key` + `merge` strategy + lookback window. Re-running for any window is safe.

---

## Test pattern catalog

### Uniqueness + not-null (every PK)

```yaml
- name: event_id
  tests:
    - unique
    - not_null
```

### Foreign key relationships (every FK)

```yaml
- name: customer_id
  tests:
    - not_null
    - relationships:
        to: ref('dim_customers')
        field: customer_id
```

### Accepted values (every enum)

```yaml
- name: status
  tests:
    - accepted_values:
        values: ['active', 'trialing', 'past_due', 'canceled', 'unpaid']
```

### Recency / freshness (every event fact)

```yaml
tests:
  - dbt_utils.recency:
      datepart: hour
      field: event_at
      interval: 6
```

### Expression-based (range checks, conditional logic)

```yaml
- name: amount_cents
  tests:
    - dbt_utils.expression_is_true:
        expression: ">= 0"
```

### Custom singular test (domain logic that doesn't fit a generic test)

Place in `tests/<test_name>.sql`:

```sql
-- tests/invoice_total_matches_line_items.sql
-- Returns rows that VIOLATE the assertion.
select
    invoice_id,
    total_cents,
    sum_line_items_cents
from (
    select
        i.invoice_id,
        i.total_cents,
        sum(li.amount_cents) as sum_line_items_cents
    from {{ ref('fct_invoices') }} i
    join {{ ref('fct_invoice_line_items') }} li using (invoice_id)
    group by 1, 2
)
where total_cents <> sum_line_items_cents
```

dbt convention: a singular test passes when the query returns zero rows.

---

## Idempotent backfill recipes

### Recipe 1: dbt incremental with MERGE

The default for most warehouses. Already shown above. Re-running for any date range is safe because `unique_key` deduplicates.

To backfill 90 days:
```bash
dbt run --select fct_subscription_events --full-refresh
```

Or for a partial range, use a var:
```bash
dbt run --select fct_subscription_events --vars '{"backfill_start_date": "2025-12-01", "backfill_end_date": "2026-02-28"}'
```

And reference the var in the model:
```sql
{% if var('backfill_start_date', none) %}
  where event_at between '{{ var("backfill_start_date") }}' and '{{ var("backfill_end_date") }}'
{% elif is_incremental() %}
  where event_at > (select max(event_at) from {{ this }}) - interval '24 hours'
{% endif %}
```

### Recipe 2: Date-partitioned overwrite (Airflow task)

When the destination is a partitioned warehouse table or a partitioned S3 path:

```python
@task
def transform_for_date(execution_date: datetime):
    partition_date = execution_date.strftime("%Y-%m-%d")
    conn.execute(f"""
        DELETE FROM analytics.fct_daily_active_users
        WHERE event_date = '{partition_date}'
    """)
    conn.execute(f"""
        INSERT INTO analytics.fct_daily_active_users
        SELECT ... FROM raw.events WHERE event_date = '{partition_date}'
    """)
```

Backfill: re-run the task for each missing date. Each run is a clean delete+insert for one partition.

### Recipe 3: Deterministic surrogate keys

Anywhere a model generates a new ID, use a hash of source fields:

```sql
{{ dbt_utils.generate_surrogate_key(['source_id', 'event_timestamp', 'event_type']) }} as event_id
```

Never `gen_random_uuid()` or `nextval()` inside a transformation. Random IDs make backfills create duplicates.

---

## Data contract template

Use this at every producer-consumer seam:

```yaml
# contracts/payments-service__analytics-warehouse__events.yaml
contract:
  version: 1.2.0
  producer:
    team: payments-team
    service: payments-service
    contact: payments-team@company.com
    on_call: pagerduty:payments-service
  consumer:
    team: data-team
    service: analytics-warehouse
    contact: data-team@company.com
    on_call: pagerduty:data-eng

table: raw_payments.events

schema:
  - { name: event_id,    type: string,       nullable: false, description: "Stable UUID, idempotency key." }
  - { name: occurred_at, type: timestamp_tz, nullable: false, description: "UTC. Event time, not ingestion time." }
  - { name: type,        type: string,       nullable: false, description: "Enum. See below." }
  - { name: amount_cents,type: int64,        nullable: true,  description: "Null for non-monetary events." }
  - { name: currency,    type: string,       nullable: true,  description: "ISO 4217 (CAD, USD)." }

semantics:
  primary_key: event_id
  partition_key: occurred_at (day)
  ordering: events for the same payment_id arrive in occurred_at order
  enums:
    type: ['payment.created', 'payment.captured', 'payment.refunded', 'payment.failed']

freshness_sla:
  latency_p95: 5 minutes (event time → warehouse)
  latency_p99: 15 minutes
  staleness_threshold: 30 minutes (if exceeded, alert)
  escalation: pagerduty:data-eng

backwards_compatibility:
  additive_fields: OK without notice
  new_enum_values: OK; consumer must handle unknown enums gracefully
  field_removal: BREAKING, requires new contract version
  type_change:   BREAKING, requires new contract version
  semantic_change: BREAKING (e.g., changing what occurred_at means)

breaking_change_protocol:
  notification_window: 30 days minimum
  notification_channels: ["#data-contracts Slack", "email to consumer team"]
  parallel_publish: 30 days (old + new in parallel)
  cutover: consumer migrates by date, producer deprecates after

reviewed_at: 2026-04-15
next_review: 2026-10-15
```

Version this file in the producer's repo. The consumer's dbt source definition references the same shape — drift between the contract and the actual data is itself a test.

---

## DAG modularity rules (orchestrator-agnostic)

A good DAG:

1. **One task = one logical step.** Extract is one task. Transform is one task. Reverse-ETL is one task.
2. **Tasks are independently retryable.** If transform fails, you don't re-run extract.
3. **Tasks are independently re-runnable.** Re-running task N produces the same output, given the same input partition.
4. **Failure modes are explicit.** Don't `try/except: pass`. Fail loud, retry per task config.
5. **Dependencies are the DAG graph, not implicit ordering.** If task B reads task A's output, declare A → B.
6. **Configuration lives in code, not Airflow Variables UI.** Variables in the UI are invisible to PR review.
