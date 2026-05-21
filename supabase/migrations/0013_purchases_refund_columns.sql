-- ====================================================================
-- Lumenari — refund tracking on purchases (0013_purchases_refund_columns.sql)
--
-- Adds two columns to `purchases` so we can react to Stripe refunds:
--
--   refunded_at              timestamptz  — set by the charge.refunded
--                                           webhook handler. The paid
--                                           download route gates on
--                                           `refunded_at IS NULL`. For
--                                           Pro+, we ALSO flip pro=false
--                                           and pro_status='cancelled'
--                                           so the library page locks
--                                           immediately.
--
--   stripe_payment_intent_id text         — populated at fulfillment time
--                                           so the refund handler can
--                                           match the refund's payment
--                                           intent back to a purchase
--                                           row without a Stripe API
--                                           round-trip per refund.
--
-- Both nullable + indexed. Service-role-only RLS already in place from
-- 0001_init.sql, no policy change required.
-- ====================================================================

alter table public.purchases
  add column if not exists refunded_at timestamptz;

alter table public.purchases
  add column if not exists stripe_payment_intent_id text;

-- Unique-but-nullable so re-fulfilling a checkout session doesn't break.
do $$
begin
  if not exists (
    select 1 from pg_indexes
    where schemaname = 'public'
      and indexname = 'purchases_stripe_payment_intent_id_key'
  ) then
    create unique index purchases_stripe_payment_intent_id_key
      on public.purchases(stripe_payment_intent_id)
      where stripe_payment_intent_id is not null;
  end if;
end$$;

-- Active-purchases index used by the download route — excludes refunded rows.
create index if not exists purchases_active_email_idx
  on public.purchases(lower(email))
  where refunded_at is null;
