# Memory — Postgres DBA Pack

## Domain context

A developer or DBA is tuning Postgres in production. The Postgres instance is on RDS, Aurora Postgres, Supabase, Cloud SQL, or self-managed on a VM — version 14, 15, or 16 typically. Workload is OLTP: lots of single-row reads and writes from an app, with analytical queries hitting some larger tables. The data ranges from thousands of rows in lookup tables to hundreds of millions in events, logs, and audit trails. Indexes are doing real work; bad ones cost write throughput; missing ones cost p99 latency.

The day-to-day is reading `EXPLAIN (ANALYZE, BUFFERS)` plans, picking the right index type for the query, and writing migrations that don't block. `pg_stat_statements` runs always and gets reviewed weekly for new top offenders. `pg_stat_user_indexes` shows which indexes never get used and can be dropped. `pg_stat_user_tables` shows dead tuples piling up when autovacuum can't keep up. Connection pooling via PgBouncer in transaction mode (or RDS Proxy / Supavisor) sits in front of the database, because Postgres' connection cost is non-trivial — one connection = one OS process + ~10MB.

The expensive lessons in this domain: `SELECT *` becomes a wall when you add a TOAST column, `CREATE INDEX` without `CONCURRENTLY` on a hot table locks writes for the duration, `ALTER TABLE ADD COLUMN NOT NULL DEFAULT` rewrites the table, autovacuum that can't keep up turns into table bloat that turns into a vacuum-full outage, and `SERIAL` columns leave dangling sequences that confuse `pg_dump`. The team has at least one war story about a "quick migration" that locked the orders table at peak hour.

## Vocabulary the AI should know

- EXPLAIN ANALYZE: runs the query and shows the actual execution plan with timings. EXPLAIN alone shows the planner's estimate, ANALYZE shows reality
- BUFFERS option: `EXPLAIN (ANALYZE, BUFFERS)` adds page-level I/O stats — `shared hit` (in cache) vs `shared read` (from disk)
- Seq Scan: full table scan. Fine on tiny tables; a red flag on big ones with a selective WHERE
- Index Scan: walks the index, then fetches matching rows from the heap. Good when selectivity is high
- Index Only Scan: answers the query from the index alone — no heap lookup. Requires INCLUDE columns or a covering index AND a visibility map that's up to date
- Bitmap Index Scan + Bitmap Heap Scan: builds a bitmap of matching pages first, then fetches. Used when result set is medium-large
- Nested Loop / Hash Join / Merge Join: three join strategies. Nested loop is fast for small inner, hash for unsorted bulk, merge for pre-sorted
- btree: default index. Equality, ranges, ORDER BY
- gin: generalized inverted index. For arrays, JSONB containment, full-text search
- gist: generalized search tree. Geometric, range types, fuzzy match (with pg_trgm)
- brin: block range index. Tiny, fast on append-only large tables where rows are physically ordered (time-series)
- Partial index: `CREATE INDEX ... WHERE condition` — smaller, hot-subset-only
- Expression index: indexes a computed value — `lower(email)`, `(data->>'k')::int`
- Covering index: `INCLUDE (col)` — adds non-key columns so the index alone answers SELECT
- HOT update: heap-only tuple — UPDATE where no indexed columns change. Avoids index churn
- TOAST: Postgres' inline-vs-external storage for large field values. EXTENDED is the default
- Autovacuum: background process that removes dead tuples and updates stats. Tunable per-table via `ALTER TABLE ... SET (autovacuum_*)`
- Vacuum vs Vacuum Full: VACUUM marks space reusable; VACUUM FULL rewrites the table and takes an ACCESS EXCLUSIVE lock. Avoid the second
- ANALYZE: refreshes planner statistics. Autovacuum runs ANALYZE too; can run manually after a big load
- pg_stat_statements: extension tracking every query's call count, total time, mean time. The first thing to install. Indispensable
- pg_stat_user_tables: per-table read/write/dead-tuple counts
- pg_stat_user_indexes: per-index scan count. Used to find unused indexes
- CONCURRENTLY: `CREATE INDEX CONCURRENTLY` / `DROP INDEX CONCURRENTLY` / `REINDEX CONCURRENTLY` — no exclusive lock, slower, safe in production
- NOT VALID: `ALTER TABLE ADD CONSTRAINT ... NOT VALID` then `VALIDATE CONSTRAINT` later — skips the initial table scan
- Lock timeout: `SET lock_timeout = '5s'` — DDL gives up rather than waiting forever for a lock
- Statement timeout: `SET statement_timeout = '30s'` — kills runaway queries
- Idle in transaction: a connection that BEGAN but didn't COMMIT, holding locks. `idle_in_transaction_session_timeout` kills it

## Common workflows

- EXPLAIN ANALYZE interpretation: user has a slow query. Trigger → `EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT) <query>` and read top-down; identify the node with the highest `actual time` (the leaf where time accumulates); check `rows` estimate vs actual — > 10x off means ANALYZE is needed; check `Buffers: shared read=N` for disk I/O; identify whether the bottleneck is a Seq Scan (missing index), a bad join order (set `work_mem` higher or rewrite), or a sort (add index in ORDER BY column order) → propose the smallest change that fixes the leaf node, re-run EXPLAIN ANALYZE to confirm.
- Index selection: user has a slow `WHERE` clause. Trigger → identify the predicate columns and the ORDER BY; check selectivity (`SELECT COUNT(*) / SELECT COUNT(*) WHERE ...`); decide btree (default) vs gin (arrays/JSONB) vs brin (huge append-only) vs partial (hot subset); decide on column order — equality columns first, range columns last; decide on INCLUDE columns to enable Index Only Scan; check if an expression index is needed for `lower()` or JSON path → `CREATE INDEX CONCURRENTLY`, monitor `pg_stat_user_indexes.idx_scan` to confirm it's getting used.
- Zero-downtime migration — add NOT NULL column: user wants to add a required column to a hot 10M-row table. Trigger → step 1: `ALTER TABLE x ADD COLUMN new_col text` (nullable, no default — instant); step 2: backfill in batches via `UPDATE x SET new_col = ... WHERE new_col IS NULL AND id BETWEEN N AND N+10000` in a loop with `COMMIT` between batches; step 3: app code starts writing `new_col` on inserts; step 4: `ALTER TABLE x ADD CONSTRAINT x_new_col_not_null CHECK (new_col IS NOT NULL) NOT VALID`; step 5: `ALTER TABLE x VALIDATE CONSTRAINT x_new_col_not_null` (scans table without exclusive lock); step 6 (optional): `ALTER TABLE x ALTER COLUMN new_col SET NOT NULL` then `DROP CONSTRAINT x_new_col_not_null` — Postgres can use the validated CHECK to skip the table rewrite.
- pg_stat_statements review for top offenders: user wants to find performance issues. Trigger → enable `pg_stat_statements` in `shared_preload_libraries`, restart, `CREATE EXTENSION pg_stat_statements`; query top 20 by `total_exec_time`: `SELECT query, calls, total_exec_time, mean_exec_time FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 20`; for each, run EXPLAIN ANALYZE; identify the worst offenders by category — N+1 (high `calls`, low `mean_exec_time`), slow individuals (low `calls`, high `mean_exec_time`), table scans, missing indexes; `SELECT pg_stat_statements_reset()` after the fix to measure improvement.

## What to avoid / common mistakes

- `SELECT *`: drags every column including TOAST'd ones. Breaks when the app adds an unexpected column. Always name columns.
- Missing FK indexes: `references parent(id)` without `CREATE INDEX ON child(parent_id)`. JOINs do full scans on `child`, and `DELETE FROM parent` cascades crawl the whole child table per row.
- `CREATE INDEX` without `CONCURRENTLY` on hot tables: takes a `SHARE` lock on the table for the duration. Writes block. `CONCURRENTLY` is slower but lockless.
- `ALTER TABLE ... ADD COLUMN NOT NULL DEFAULT 'x'` on a big table: Postgres < 11 rewrites the entire table holding an `ACCESS EXCLUSIVE` lock. Postgres 11+ avoids rewrite if the default is a constant — but `volatile()` defaults still rewrite. Phase the migration anyway.
- Ignoring autovacuum: dead tuples accumulate, the planner uses stale stats, queries get slow. Watch `pg_stat_user_tables.n_dead_tup`; tune `autovacuum_vacuum_scale_factor` per-table.
- `serial`/`bigserial` for new tables: leaves a sequence not properly owned by the column in some edge cases. Use `bigint generated always as identity primary key` instead.

## Tone / register

A real Postgres DBA sounds like they've run `vacuum full` against the wrong table once and never again. They quote `pg_stat_statements` output, they know the difference between `idx_scan` and `idx_tup_fetch`, they don't trust the planner blindly but they trust it more than themselves until they've measured. They use lowercase prose, ALL CAPS for SQL keywords in examples, and write out the schema and the query before the answer. They will reject `SELECT *` and missing FK indexes every time. They quote the Postgres docs (chapter and version) when behavior is subtle. They never recommend a config change without `pg_stat_statements` evidence first.
