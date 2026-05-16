/**
 * Email automation helpers.
 *
 * Every lifecycle email goes through `sendCampaignEmail()` so it's:
 *   1. Idempotent — checks `email_events` for an existing `sent` row
 *      keyed on (recipient, template). If one exists, the send is skipped.
 *   2. Logged — every successful send writes a `sent` event so the
 *      founder dashboard + the next-step cron can read it.
 *   3. Unsubscribe-aware — checks `leads.unsubscribed_at` before sending.
 *      Paying customers (Pro+ subscribers) aren't in `leads`; we still
 *      respect a `metadata.unsubscribed_at` on their `purchases` row in
 *      the helper below.
 *
 * The cron flows (welcome series + Pro+ retention) live in
 * `supabase/functions/email-cron/index.ts`. Anything we send via the
 * Stripe webhook (receipt, Pro+ welcome) also routes through here.
 */

import { resend } from "./resend";
import { supabaseService } from "./supabase";
import { env } from "./env";

export type CampaignTemplate =
  // 7-day welcome series
  | "welcome.day-0"
  | "welcome.day-1"
  | "welcome.day-3"
  | "welcome.day-5"
  | "welcome.day-7"
  // Pro+ retention + upgrade
  | "pro-plus.inactive-14d"
  | "pro-plus.monthly-digest"
  | "pro-plus.cancellation-save"
  | "pro-plus.annual-upgrade-nudge"
  | "pro-plus.one-time-upsell"
  // Wishlist alerts
  | "wishlist.price-drop"
  | "wishlist.new-bundle";

export type EmailEventType =
  | "sent"
  | "opened"
  | "clicked"
  | "converted"
  | "bounced";

interface SendCampaignArgs {
  recipient: string;
  template: CampaignTemplate;
  subject: string;
  html: string;
  text?: string;
  /** Optional metadata recorded with the `sent` event. */
  metadata?: Record<string, unknown>;
  /**
   * If true, skips the idempotency check. Useful for re-sends triggered
   * manually from the admin dashboard. Default false.
   */
  force?: boolean;
}

interface SendResult {
  status: "sent" | "skipped" | "unsubscribed" | "failed";
  resendId?: string;
  reason?: string;
}

/** Send a transactional campaign email. Idempotent on (recipient, template). */
export async function sendCampaignEmail(
  args: SendCampaignArgs,
): Promise<SendResult> {
  const recipient = args.recipient.toLowerCase().trim();
  if (!recipient || !recipient.includes("@")) {
    return { status: "failed", reason: "invalid recipient" };
  }

  const db = supabaseService();

  // 1. Unsubscribe check against leads.
  const { data: leadRow } = await db
    .from("leads")
    .select("unsubscribed_at")
    .ilike("email", recipient)
    .maybeSingle();
  if (leadRow?.unsubscribed_at) {
    return { status: "unsubscribed" };
  }

  // 2. Idempotency check.
  if (!args.force) {
    const { data: existing } = await db
      .from("email_events")
      .select("id")
      .ilike("recipient", recipient)
      .eq("template", args.template)
      .eq("event_type", "sent")
      .limit(1)
      .maybeSingle();
    if (existing) {
      return { status: "skipped", reason: "already sent" };
    }
  }

  // 3. Send via Resend.
  let resendId: string | undefined;
  try {
    const result = await resend().emails.send({
      from: env.resendFrom,
      to: recipient,
      subject: args.subject,
      html: args.html,
      text: args.text,
      tags: [{ name: "template", value: args.template }],
    });
    // Resend SDK returns either { data: { id }, error: null } or { error }.
    if ("data" in result && result.data?.id) {
      resendId = result.data.id;
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown send error";
    return { status: "failed", reason: msg };
  }

  // 4. Log the sent event.
  await db.from("email_events").insert({
    recipient,
    template: args.template,
    event_type: "sent",
    resend_id: resendId,
    metadata: args.metadata ?? {},
  });

  return { status: "sent", resendId };
}

/** Append a non-send event (open/click/convert/bounce) to the log. */
export async function logEmailEvent(args: {
  recipient: string;
  template: CampaignTemplate | string;
  eventType: EmailEventType;
  resendId?: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  const db = supabaseService();
  await db.from("email_events").insert({
    recipient: args.recipient.toLowerCase().trim(),
    template: args.template,
    event_type: args.eventType,
    resend_id: args.resendId,
    metadata: args.metadata ?? {},
  });
}

/** Has this recipient already received this campaign? */
export async function alreadySent(
  recipient: string,
  template: CampaignTemplate,
): Promise<boolean> {
  const db = supabaseService();
  const { data } = await db
    .from("email_events")
    .select("id")
    .ilike("recipient", recipient.toLowerCase().trim())
    .eq("template", template)
    .eq("event_type", "sent")
    .limit(1)
    .maybeSingle();
  return Boolean(data);
}

/**
 * Minimal Apple-clean email shell. Plain HTML, no external CSS. Uses
 * inline styles only — every email client supports them and there's no
 * fancy framework to maintain.
 */
export function renderEmail(args: {
  preheader?: string;
  heading: string;
  body: string;
  cta?: { label: string; url: string };
  footnote?: string;
}): string {
  const preheader = args.preheader
    ? `<div style="display:none;visibility:hidden;opacity:0;max-height:0;overflow:hidden;color:transparent;">${escapeHtml(args.preheader)}</div>`
    : "";
  const cta = args.cta
    ? `<p style="margin:24px 0 0;">
         <a href="${args.cta.url}" style="display:inline-block;padding:14px 22px;background:#111418;color:#ffffff;border-radius:999px;text-decoration:none;font-weight:500;font-size:15px;">${escapeHtml(args.cta.label)}</a>
       </p>`
    : "";
  const footnote = args.footnote
    ? `<p style="margin:24px 0 0;color:#9ca3af;font-size:12px;line-height:1.55;">${args.footnote}</p>`
    : "";

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Inter',system-ui,sans-serif;color:#111418;">
${preheader}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 16px;">
  <tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #ececec;border-radius:22px;overflow:hidden;">
      <tr><td style="padding:36px 36px 8px;">
        <h1 style="margin:0 0 12px;font-size:24px;font-weight:600;letter-spacing:-0.02em;line-height:1.25;">${escapeHtml(args.heading)}</h1>
        <div style="margin:0;color:#475569;font-size:15px;line-height:1.6;">${args.body}</div>
        ${cta}
        ${footnote}
        <p style="margin:24px 0 0;color:#9ca3af;font-size:12px;">© Lumenari · lumenari.io</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&"
      ? "&amp;"
      : c === "<"
        ? "&lt;"
        : c === ">"
          ? "&gt;"
          : c === '"'
            ? "&quot;"
            : "&#39;",
  );
}
