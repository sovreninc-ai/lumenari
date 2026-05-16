# Indexing and EXPLAIN — the four shapes that show up daily

## 1. EXPLAIN ANALYZE walkthrough — a real plan, read top-down

Query:

```sql
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT id, total_cents, created_at
FROM orders
WHERE customer_id = 12345
  AND status = 'paid'
  AND created_at > now() - interval '90 days'
ORDER BY created_at DESC
LIMIT 20;
```

Plan:

```
Limit  (cost=120532.18..120532.23 rows=20 width=24) (actual time=18234.5..18234.6 rows=20 loops=1)
  Buffers: shared hit=842 read=98421
  ->  Sort  (cost=120532.18..120653.42 rows=48496 width=24) (actual time=18234.5..18234.6 rows=20 loops=1)
        Sort Key: created_at DESC
        Sort Method: top-N heapsort  Memory: 26kB
        Buffers: shared hit=842 read=98421
        ->  Bitmap Heap Scan on orders  (cost=534.21..118201.10 rows=48496 width=24) (actual time=42.1..18102.3 rows=51234 loops=1)
              Recheck Cond: (customer_id = 12345)
              Filter: ((status = 'paid'::text) AND (created_at > (now() - '90 days'::interval)))
              Rows Removed by Filter: 1247621
              Heap Blocks: exact=84903
              Buffers: shared hit=842 read=98421
              ->  Bitmap Index Scan on idx_orders_customer  (cost=0.00..522.09 rows=1298855 width=0) (actual time=29.4..29.4 rows=1298855 loops=1)
                    Index Cond: (customer_id = 12345)
                    Buffers: shared read=512
Planning Time: 0.42 ms
Execution Time: 18234.7 ms
```

### What this tells you, top-down:

1. **Total `Execution Time: 18234.7 ms`** — 18 seconds. That's the budget.
2. **`Limit` node** does almost no work — 20 rows out, 0.1ms incremental.
3. **`Sort` node** sorts ~50k rows, fast (top-N heapsort, 26kB).
4. **`Bitmap Heap Scan` is the leaf** — `actual time=42.1..18102.3`. That's ~18 seconds.
5. **`Rows Removed by Filter: 1247621`** — the index returned 1.3M rows for the customer; only 51k matched `status='paid' AND created_at > now() - 90d`. The other ~1.25M were fetched from the heap and discarded.
6. **`Buffers: shared read=98421`** — ~770MB read from disk. That's the latency.

### The fix

The current index `idx_orders_customer (customer_id)` returns too many rows that don't match the other predicates. A composite index that includes `status` and `created_at` lets Postgres skip the unmatched rows entirely:

```sql
SET lock_timeout = '5s';

CREATE INDEX CONCURRENTLY idx_orders_customer_paid_created
  ON orders (customer_id, created_at DESC)
  WHERE status = 'paid';
```

- `customer_id` first because it's an equality predicate (most selective when combined).
- `created_at DESC` matches the ORDER BY, so the planner can walk the index in order and skip the Sort node entirely.
- `WHERE status = 'paid'` — partial index, smaller and faster than indexing all statuses.

After deploy, re-run EXPLAIN ANALYZE. The new plan should be `Index Scan ... using idx_orders_customer_paid_created` with `Buffers: shared hit=N` (cached) and < 50ms execution time.

### Optionally — Index Only Scan

If the query selects `id, total_cents, created_at` and visibility map is up to date, you can get an Index Only Scan:

```sql
CREATE INDEX CONCURRENTLY idx_orders_customer_paid_created
  ON orders (customer_id, created_at DESC)
  INCLUDE (total_cents)
  WHERE status = 'paid';
```

`id` is implicit (heap TID is fetched anyway for visibility). Add `total_cents` via `INCLUDE`. The query never touches the heap pages, just the index pages.

---

## 2. Index decision tree — pick the right type

```
Predicate is equality on a scalar column?
  → btree.

Predicate is a range or ORDER BY?
  → btree. Put the range/sort column last in a composite.

Multiple equality predicates?
  → btree composite. Order columns by selectivity (most selective first).

Equality on one column + range on another?
  → btree (equality_col, range_col).

Predicate is on a JSONB column with @> or ? operator?
  → gin on (jsonb_col).

Predicate is on an array with @> or && operator?
  → gin on (array_col).

Predicate is a full-text search (to_tsvector @@ to_tsquery)?
  → gin on (to_tsvector(...)) OR a generated tsvector column.

Predicate is fuzzy match (LIKE '%foo%', pg_trgm similarity)?
  → gin or gist with pg_trgm ops (gin_trgm_ops).

Table is huge, append-only, and queries are by created_at range?
  → brin on (created_at). Tiny index, perfect for time-series.

Hot subset of rows (e.g., WHERE deleted_at IS NULL or WHERE status='active')?
  → Make any of the above PARTIAL: ... WHERE deleted_at IS NULL.

Need to query a computed value (lower(email), data->>'k')?
  → Expression index: CREATE INDEX ON users ((lower(email)));

Want to avoid the heap fetch for SELECT col1, col2 queries?
  → Add INCLUDE (col1, col2) to the index. Enables Index Only Scan.
```

### Sanity check after creating an index

```sql
-- Did the new index get used?
SELECT relname, idx_scan, idx_tup_fetch, idx_tup_read
FROM pg_stat_user_indexes
JOIN pg_class ON pg_class.oid = indexrelid
WHERE relname = 'idx_orders_customer_paid_created';

-- After some traffic, idx_scan should climb. If it stays at 0, the planner
-- isn't choosing it — check `EXPLAIN` for the query to see why.
```

---

## 3. Zero-downtime migrations — phased patterns

### Add a NOT NULL column to a hot 50M-row table

```sql
-- =====================================================
-- Phase 1: Add nullable column (instant on PG 11+)
-- =====================================================
SET lock_timeout = '5s';
ALTER TABLE orders ADD COLUMN region text;

-- =====================================================
-- Phase 2: Backfill in batches (no locks, throttled)
-- =====================================================
-- Run from app code, not from a single SQL session,
-- so you can checkpoint and resume.
DO $$
DECLARE
  batch_size int := 10000;
  rows_updated int;
BEGIN
  LOOP
    WITH cte AS (
      SELECT id FROM orders
      WHERE region IS NULL
      LIMIT batch_size
      FOR UPDATE SKIP LOCKED
    )
    UPDATE orders o
    SET region = CASE
      WHEN o.country = 'CA' THEN 'AMER'
      WHEN o.country IN ('US', 'MX') THEN 'AMER'
      WHEN o.country IN ('GB', 'FR', 'DE') THEN 'EMEA'
      ELSE 'OTHER'
    END
    FROM cte
    WHERE o.id = cte.id;

    GET DIAGNOSTICS rows_updated = ROW_COUNT;
    COMMIT;
    EXIT WHEN rows_updated = 0;
    PERFORM pg_sleep(0.1);   -- throttle
  END LOOP;
END $$;

-- =====================================================
-- Phase 3: Deploy app code that always sets `region` on insert
-- =====================================================
-- (no SQL here — coordinate with app deploy)

-- =====================================================
-- Phase 4: Enforce NOT NULL via CHECK (no rewrite)
-- =====================================================
ALTER TABLE orders ADD CONSTRAINT orders_region_not_null
  CHECK (region IS NOT NULL) NOT VALID;

-- VALIDATE takes a SHARE UPDATE EXCLUSIVE lock, not ACCESS EXCLUSIVE.
-- Reads + writes continue. It scans the table sequentially.
ALTER TABLE orders VALIDATE CONSTRAINT orders_region_not_null;

-- =====================================================
-- Phase 5 (optional): Promote to true NOT NULL
-- =====================================================
-- PG 12+ uses the validated CHECK to skip the table scan.
ALTER TABLE orders ALTER COLUMN region SET NOT NULL;
ALTER TABLE orders DROP CONSTRAINT orders_region_not_null;
```

### Swap a column type (e.g., int → bigint)

The naive `ALTER COLUMN ... TYPE bigint` rewrites the table. Phase it:

1. Add a new column `id_bigint bigint`.
2. Backfill `UPDATE ... SET id_bigint = id` in batches.
3. Add triggers that keep `id_bigint = id` on insert/update.
4. Cut over the app to read/write `id_bigint`.
5. Drop the old column (rename `id_bigint` → `id` after dropping old `id`).

The whole process spans multiple deploys. Worth it on tables you can't afford to lock.

---

## 4. pg_stat_statements review — finding top offenders

```sql
-- Top 20 queries by total time
SELECT
  substring(query, 1, 80) AS query_start,
  calls,
  round(total_exec_time::numeric / 1000, 1) AS total_sec,
  round(mean_exec_time::numeric, 2) AS mean_ms,
  rows / NULLIF(calls, 0) AS avg_rows,
  round((100 * total_exec_time / sum(total_exec_time) OVER ())::numeric, 1) AS pct_of_total
FROM pg_stat_statements
WHERE query NOT ILIKE '%pg_stat_statements%'
  AND query NOT ILIKE '%pg_catalog%'
ORDER BY total_exec_time DESC
LIMIT 20;
```

Read it like this:

- **High `calls`, low `mean_ms`** → N+1. Fix the app, not the index.
- **Low `calls`, high `mean_ms`** → individual slow query. EXPLAIN ANALYZE it.
- **High `calls` AND high `mean_ms`** → top priority. The bleeding edge.
- **`avg_rows` near zero** → query returns nothing most of the time. Probably a polling loop on an empty queue.

After deploying fixes:

```sql
SELECT pg_stat_statements_reset();
-- Wait a day, re-run the query above, compare.
```

### Unused indexes — drop candidates

```sql
SELECT
  s.schemaname,
  s.relname AS table_name,
  s.indexrelname AS index_name,
  s.idx_scan,
  pg_size_pretty(pg_relation_size(s.indexrelid)) AS index_size
FROM pg_stat_user_indexes s
JOIN pg_index i ON i.indexrelid = s.indexrelid
WHERE s.idx_scan = 0
  AND NOT i.indisunique          -- don't drop unique indexes (they enforce constraints)
  AND NOT i.indisprimary         -- don't drop primary key indexes
ORDER BY pg_relation_size(s.indexrelid) DESC;
```

Unused for weeks AND not a constraint → candidate for `DROP INDEX CONCURRENTLY`. Indexes cost writes; the smaller the index set, the faster the inserts.
