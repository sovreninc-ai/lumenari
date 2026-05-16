# Email automations — index

Wave 3 deliverable #1 + #2 + #8 all funnel through one place.

See **[`EMAIL_AUTOMATION.md`](./EMAIL_AUTOMATION.md)** for the full design doc
(delivery mechanism, idempotency model, cron schedule, env vars).

## Quick reference

| Flow                          | Where it fires             | Cadence                  | Template id                          |
|-------------------------------|----------------------------|--------------------------|--------------------------------------|
| Welcome Day 0                 | `/api/lead-magnet/claim`   | Inline at signup         | `welcome.day-0`                      |
| Welcome Day 1 / 3 / 5 / 7     | `email-cron` Edge Function | Daily 14:00 UTC          | `welcome.day-1` … `welcome.day-7`    |
| Pro+ inactive 14d             | `email-cron`               | Daily 15:00 UTC          | `pro-plus.inactive-14d`              |
| Monthly Pro+ digest           | `email-cron`               | 1st of month, 16:00 UTC  | `pro-plus.monthly-digest.YYYY-MM`    |
| Cancellation save (50% off)   | Stripe webhook             | On `subscription.deleted`| `pro-plus.cancellation-save`         |
| Annual upgrade nudge          | `email-cron`               | Mondays 17:00 UTC        | `pro-plus.annual-upgrade-nudge`      |
| One-time → Pro+ upsell        | `email-cron`               | Thursdays 17:00 UTC      | `pro-plus.one-time-upsell`           |
| Wishlist → new-bundle alert   | `email-cron`               | Daily 18:00 UTC          | `wishlist.new-bundle`                |

## pg_cron schedules

Registered in migration **`0009_retention_automation.sql`**. The migration is
idempotent — re-running replaces the jobs.

The cron jobs call `current_setting('app.email_cron_url')` and pass
`x-cron-secret: current_setting('app.email_cron_secret')`. Set both via the
Supabase dashboard (Settings → Database → Custom Postgres Config) or `supabase
secrets set` before applying 0009.

## Idempotency model

Every `sendEmail()` call inside the cron checks `email_events` for an existing
`(recipient, template, event_type='sent')` row before sending. A successful
send writes that row. Re-running a pass cannot double-send.

The wishlist new-bundle pass also writes `wishlists.notified_at` so it never
re-evaluates the same row twice.
