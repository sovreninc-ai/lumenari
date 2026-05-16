-- ====================================================================
-- Lumenari — retention automation pg_cron schedules (0009_retention_automation.sql)
--
-- Registers the pg_cron jobs that invoke the `email-cron` Supabase Edge
-- Function. Five flows, all delivered via the same function with a
-- ?pass=... query param so the cron logic stays in one place.
--
-- The Edge Function is idempotent on (recipient, template) via
-- email_events — running these jobs more often than scheduled is safe.
--
-- Requires:
--   • pg_cron extension (Supabase enables it by default on paid plans;
--     on free plans set `app.cron_enabled` then re-run this migration).
--   • pg_net extension to fire the HTTP call to the Edge Function.
--   • database setting `app.email_cron_url` (set via supabase secrets):
--       supabase secrets set EMAIL_CRON_URL=https://<project>.functions.supabase.co/email-cron
--     and `app.email_cron_secret` (HTTP secret for the function).
--
-- Migration is idempotent — every `cron.schedule` is preceded by an
-- `cron.unschedule` lookup so re-runs replace the job cleanly.
-- ====================================================================

-- Skip the entire migration if pg_cron isn't available — Chris can enable
-- the extension in the dashboard, then re-run.
do $$
begin
  if not exists (select 1 from pg_extension where extname = 'pg_cron') then
    raise notice 'pg_cron not enabled — skipping retention schedules. Enable pg_cron then re-run 0009_retention_automation.sql.';
    return;
  end if;
  if not exists (select 1 from pg_extension where extname = 'pg_net') then
    raise notice 'pg_net not enabled — skipping retention schedules. Enable pg_net then re-run 0009_retention_automation.sql.';
    return;
  end if;

  -- Helper inline function: unschedule a job if it exists, then schedule it.
  -- We can't create a permanent SQL helper here (would dirty the schema);
  -- we just inline the logic with EXECUTE statements.

  -- ------------------------------------------------------------------
  -- Welcome series — every day at 14:00 UTC (08:00 MT).
  -- Fires the day-1/3/5/7 nudges for any lead in-window.
  -- ------------------------------------------------------------------
  perform cron.unschedule('lumenari-welcome-series')
    where exists (select 1 from cron.job where jobname = 'lumenari-welcome-series');
  perform cron.schedule(
    'lumenari-welcome-series',
    '0 14 * * *',
    $body$
      select net.http_post(
        url := current_setting('app.email_cron_url', true) || '?pass=welcome',
        headers := jsonb_build_object(
          'content-type', 'application/json',
          'x-cron-secret', current_setting('app.email_cron_secret', true)
        ),
        body := '{}'::jsonb
      );
    $body$
  );

  -- ------------------------------------------------------------------
  -- Pro+ inactive 14d — daily at 15:00 UTC.
  -- ------------------------------------------------------------------
  perform cron.unschedule('lumenari-pro-inactive')
    where exists (select 1 from cron.job where jobname = 'lumenari-pro-inactive');
  perform cron.schedule(
    'lumenari-pro-inactive',
    '0 15 * * *',
    $body$
      select net.http_post(
        url := current_setting('app.email_cron_url', true) || '?pass=pro-inactive',
        headers := jsonb_build_object(
          'content-type', 'application/json',
          'x-cron-secret', current_setting('app.email_cron_secret', true)
        ),
        body := '{}'::jsonb
      );
    $body$
  );

  -- ------------------------------------------------------------------
  -- Monthly Pro+ digest — 1st of every month at 16:00 UTC.
  -- ------------------------------------------------------------------
  perform cron.unschedule('lumenari-monthly-digest')
    where exists (select 1 from cron.job where jobname = 'lumenari-monthly-digest');
  perform cron.schedule(
    'lumenari-monthly-digest',
    '0 16 1 * *',
    $body$
      select net.http_post(
        url := current_setting('app.email_cron_url', true) || '?pass=monthly-digest',
        headers := jsonb_build_object(
          'content-type', 'application/json',
          'x-cron-secret', current_setting('app.email_cron_secret', true)
        ),
        body := '{}'::jsonb
      );
    $body$
  );

  -- ------------------------------------------------------------------
  -- Annual upgrade nudge — weekly Mondays at 17:00 UTC.
  -- ------------------------------------------------------------------
  perform cron.unschedule('lumenari-annual-nudge')
    where exists (select 1 from cron.job where jobname = 'lumenari-annual-nudge');
  perform cron.schedule(
    'lumenari-annual-nudge',
    '0 17 * * 1',
    $body$
      select net.http_post(
        url := current_setting('app.email_cron_url', true) || '?pass=annual-nudge',
        headers := jsonb_build_object(
          'content-type', 'application/json',
          'x-cron-secret', current_setting('app.email_cron_secret', true)
        ),
        body := '{}'::jsonb
      );
    $body$
  );

  -- ------------------------------------------------------------------
  -- One-time → Pro+ upsell — weekly Thursdays at 17:00 UTC.
  -- (Cancellation save flow is event-driven via Stripe webhook —
  --  not on a cron schedule.)
  -- ------------------------------------------------------------------
  perform cron.unschedule('lumenari-one-time-upsell')
    where exists (select 1 from cron.job where jobname = 'lumenari-one-time-upsell');
  perform cron.schedule(
    'lumenari-one-time-upsell',
    '0 17 * * 4',
    $body$
      select net.http_post(
        url := current_setting('app.email_cron_url', true) || '?pass=one-time-upsell',
        headers := jsonb_build_object(
          'content-type', 'application/json',
          'x-cron-secret', current_setting('app.email_cron_secret', true)
        ),
        body := '{}'::jsonb
      );
    $body$
  );

  -- ------------------------------------------------------------------
  -- Wishlist new-bundle pass — daily at 18:00 UTC.
  -- Reads `wishlists` and emails leads when a wishlisted kit appears
  -- in a bundle they haven't been notified about. Marks notified_at to
  -- prevent repeat sends.
  -- ------------------------------------------------------------------
  perform cron.unschedule('lumenari-wishlist-bundle')
    where exists (select 1 from cron.job where jobname = 'lumenari-wishlist-bundle');
  perform cron.schedule(
    'lumenari-wishlist-bundle',
    '0 18 * * *',
    $body$
      select net.http_post(
        url := current_setting('app.email_cron_url', true) || '?pass=wishlist-bundle',
        headers := jsonb_build_object(
          'content-type', 'application/json',
          'x-cron-secret', current_setting('app.email_cron_secret', true)
        ),
        body := '{}'::jsonb
      );
    $body$
  );
end;
$$;
