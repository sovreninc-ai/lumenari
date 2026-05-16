-- ====================================================================
-- Lumenari — email event log (0008_email_events.sql)
--
-- Append-only event table for every outbound transactional + lifecycle
-- email. Used by:
--   - Welcome series cron: skip a step if its `sent` row already exists.
--   - Pro+ retention cron: same idempotency story.
--   - Founder dashboard: open + click + conversion stats per campaign.
--   - Customer support: "did we send X to this email?" lookups.
--
-- Event types:
--   sent       — Resend accepted the send (we got an id back)
--   opened     — Resend webhook reported an open
--   clicked    — Resend webhook reported a click
--   converted  — The user did the conversion action this email pushed
--                (bought a kit, upgraded to Pro+, claimed a coupon, etc.)
--   bounced    — Resend webhook reported a hard bounce
--
-- `template` is the campaign identifier (e.g. "welcome.day-3",
-- "pro-plus.inactive-14d", "cancellation.save"). The retention cron
-- queries `(recipient, template)` to ensure idempotency.
-- ====================================================================

create extension if not exists "pgcrypto";

create table if not exists public.email_events (
  id            uuid primary key default gen_random_uuid(),
  recipient     text not null,
  template      text not null,
  event_type    text not null check (
    event_type in ('sent', 'opened', 'clicked', 'converted', 'bounced')
  ),
  resend_id     text,
  metadata      jsonb default '{}'::jsonb,
  occurred_at   timestamptz not null default now()
);

create index if not exists email_events_recipient_template_idx
  on public.email_events(lower(recipient), template);

create index if not exists email_events_template_time_idx
  on public.email_events(template, occurred_at desc);

create index if not exists email_events_type_time_idx
  on public.email_events(event_type, occurred_at desc);

create index if not exists email_events_resend_id_idx
  on public.email_events(resend_id)
  where resend_id is not null;

-- --------------------------------------------------------------------
-- Row Level Security — service role only.
-- --------------------------------------------------------------------
alter table public.email_events enable row level security;

drop policy if exists "email_events service only" on public.email_events;
create policy "email_events service only"
  on public.email_events for all
  using (false)
  with check (false);
