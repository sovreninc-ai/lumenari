# Email automation — delivery mechanism

**Decision:** every lifecycle email (welcome series + Pro+ retention + wishlist alerts) is sent by a single Supabase Edge Function `email-cron` invoked daily by `pg_cron` (or any external scheduler hitting its HTTPS endpoint).

We did **not** use Resend audience automations. Resend's audience-rule engine is great for simple "X days after signup" sends, but breaks down once the conditions look at Supabase state (active Pro+ status, download history, kit count). A single cron over our own DB keeps the logic + idempotency + observability in one place — and the same function powers all eight retention flows from Wave 3 deliverable #2.

## How it works

1. `supabase/functions/email-cron/index.ts` — the Edge Function. Runs all passes by default; accepts `?pass=welcome|pro-inactive|monthly-digest|annual-nudge|one-time-upsell` to scope a run.
2. Every send goes through `sendEmail()` inside the function, which:
   - Checks `leads.unsubscribed_at` for the recipient. Skip if unsubscribed.
   - Checks `email_events` for an existing `sent` row keyed `(recipient, template)`. Skip if found.
   - Sends via Resend.
   - Inserts a `sent` row in `email_events` with the Resend message id.
3. Day-0 of the welcome series (the initial download email) is sent inline from the `/api/lead-magnet/claim` API route. Days 1, 3, 5, 7 fire from the cron when the lead's `welcomed_at` falls into the right age window.
4. Monthly digest template id is suffixed with `YYYY-MM` so each month's digest is a separate idempotency key.

## Cron schedule

Run **daily at 14:00 UTC** (07:00 Calgary):

```sql
select cron.schedule(
  'lumenari-email-cron-daily',
  '0 14 * * *',
  $$ select net.http_post(
       url := 'https://<project-ref>.supabase.co/functions/v1/email-cron',
       headers := jsonb_build_object(
         'content-type', 'application/json',
         'x-cron-secret', '<EMAIL_CRON_SECRET>'
       )
     ); $$
);
```

Requires the `pg_net` extension and a non-empty `EMAIL_CRON_SECRET` (the function rejects unauthenticated requests).

## Environment variables required on the Edge Function

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=Lumenari <hello@lumenari.io>
NEXT_PUBLIC_SITE_URL=https://lumenari.io
EMAIL_CRON_SECRET=<long random string>
STRIPE_SECRET_KEY=  # currently unused inside the function, included for future cancellation-save coupons
```

Set them with:

```
supabase secrets set --env-file ./supabase/functions/email-cron/.env
```

## Manual fire from the founder dashboard

The same logic — sans cron — can be triggered from `/admin` once the dashboard's "Re-run automations now" button is wired (post-launch). It just hits the function endpoint with `?force=1`.

## Campaign list

| Template                          | Trigger                                                                            |
|-----------------------------------|------------------------------------------------------------------------------------|
| `welcome.day-0`                   | `/api/lead-magnet/claim` POST — immediate                                          |
| `welcome.day-1`                   | Cron — 1 day after `leads.welcomed_at`                                             |
| `welcome.day-3`                   | Cron — 3 days after `leads.welcomed_at`                                            |
| `welcome.day-5`                   | Cron — 5 days after `leads.welcomed_at`                                            |
| `welcome.day-7`                   | Cron — 7 days after `leads.welcomed_at` (Pro+ pitch)                               |
| `pro-plus.inactive-14d`           | Cron — Pro+ user with no downloads in 14 days                                      |
| `pro-plus.monthly-digest.YYYY-MM` | Cron — first of each month, every active Pro+ subscriber                           |
| `pro-plus.cancellation-save`      | Stripe webhook `customer.subscription.deleted` (handler in `/api/webhook/stripe`)  |
| `pro-plus.annual-upgrade-nudge`   | Cron — monthly Pro+ between days 140-150 since `created_at`                        |
| `pro-plus.one-time-upsell`        | Cron — non-Pro+ email with 2+ purchased kits                                       |
| `wishlist.price-drop`             | Manual / future cron when a kit's `price_cents` decreases                          |
| `wishlist.new-bundle`             | Manual / future cron when a kit joins a new bundle                                 |

## Bypassing idempotency

Pass `force=true` to `sendCampaignEmail()` (Next.js library) — used for the manual "Re-send" affordance on `/admin`. The cron itself never forces.

## Unsubscribe flow

For now, an "unsubscribe" reply lands in `hello@lumenari.io` and Chris flips `leads.unsubscribed_at` manually via SQL. A future iteration: add an unsubscribe link in the email footer that hits `/api/leads/unsubscribe?email=<>&token=<HMAC>`.
