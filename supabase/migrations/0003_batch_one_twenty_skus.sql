-- ====================================================================
-- Lumenari — batch 1 (kits 1-20) scale-up migration
-- 0003_batch_one_twenty_skus.sql
--
-- HISTORICAL: this migration originally seeded the 9 round-3 SKUs and
-- replaced the bundle layout. As of the 100-SKU consolidation:
--
--   * All 100 kits are now seeded in 0001_init.sql (idempotent upsert by id)
--   * All 13 final bundles are now seeded in 0002 (idempotent upsert by id)
--
-- This migration is preserved as a no-op so the migration history stays
-- linear. Re-running it is safe.
-- ====================================================================

-- Intentionally empty. See 0001_init.sql + 0002_round_two_skus_and_bundles.sql
-- for the current kit + bundle catalog.
select 1 where false;
