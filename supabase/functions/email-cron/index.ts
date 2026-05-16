// Supabase Edge Function — email-cron
//
// Invoked daily (via pg_cron or an external scheduler hitting
// /functions/v1/email-cron). Walks the lead + purchase populations and
// fires the right lifecycle email for each one.
//
// Each campaign is idempotent on (recipient, template) — re-running
// the cron mid-day costs nothing.
//
// Deploy with `supabase functions deploy email-cron`. Set the env vars
// listed in `docs/EMAIL_AUTOMATION.md`.
//
// NOTE: this Edge Function is the single delivery mechanism for both
// the 7-day welcome series and the Pro+ retention flows. See
// EMAIL_AUTOMATION.md for the rationale.

// deno-lint-ignore-file no-explicit-any

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { Resend } from "https://esm.sh/resend@4.0.1";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const RESEND_FROM = Deno.env.get("RESEND_FROM_EMAIL") ?? "Lumenari <hello@lumenari.io>";
const SITE_URL = Deno.env.get("NEXT_PUBLIC_SITE_URL") ?? "https://lumenari.io";
const CRON_SECRET = Deno.env.get("EMAIL_CRON_SECRET") ?? "";
const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") ?? "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const resend = new Resend(RESEND_API_KEY);

const DAY_MS = 24 * 60 * 60 * 1000;

type Template =
  | "welcome.day-1"
  | "welcome.day-3"
  | "welcome.day-5"
  | "welcome.day-7"
  | "pro-plus.inactive-14d"
  | "pro-plus.monthly-digest"
  | "pro-plus.annual-upgrade-nudge"
  | "pro-plus.one-time-upsell"
  | "wishlist.new-bundle";

async function alreadySent(recipient: string, template: Template) {
  const { data } = await supabase
    .from("email_events")
    .select("id")
    .ilike("recipient", recipient.toLowerCase().trim())
    .eq("template", template)
    .eq("event_type", "sent")
    .limit(1)
    .maybeSingle();
  return Boolean(data);
}

async function isUnsubscribed(email: string): Promise<boolean> {
  const { data } = await supabase
    .from("leads")
    .select("unsubscribed_at")
    .ilike("email", email.toLowerCase().trim())
    .maybeSingle();
  return Boolean(data?.unsubscribed_at);
}

async function sendEmail(args: {
  recipient: string;
  template: Template;
  subject: string;
  html: string;
  text?: string;
  metadata?: Record<string, unknown>;
}) {
  const recipient = args.recipient.toLowerCase().trim();
  if (await isUnsubscribed(recipient)) return { skipped: true, reason: "unsub" };
  if (await alreadySent(recipient, args.template)) return { skipped: true, reason: "dupe" };

  let resendId: string | undefined;
  try {
    const result: any = await resend.emails.send({
      from: RESEND_FROM,
      to: recipient,
      subject: args.subject,
      html: args.html,
      text: args.text,
      tags: [{ name: "template", value: args.template }],
    });
    resendId = result?.data?.id;
  } catch (err) {
    console.error("[email-cron] send failed:", err);
    return { skipped: false, error: String(err) };
  }

  await supabase.from("email_events").insert({
    recipient,
    template: args.template,
    event_type: "sent",
    resend_id: resendId,
    metadata: args.metadata ?? {},
  });

  return { sent: true, resendId };
}

function renderShell(args: {
  preheader?: string;
  heading: string;
  body: string;
  cta?: { label: string; url: string };
  footnote?: string;
}) {
  const preheader = args.preheader
    ? `<div style="display:none;visibility:hidden;opacity:0;max-height:0;overflow:hidden;color:transparent;">${escapeHtml(args.preheader)}</div>`
    : "";
  const cta = args.cta
    ? `<p style="margin:24px 0 0;"><a href="${args.cta.url}" style="display:inline-block;padding:14px 22px;background:#111418;color:#ffffff;border-radius:999px;text-decoration:none;font-weight:500;font-size:15px;">${escapeHtml(args.cta.label)}</a></p>`
    : "";
  const footnote = args.footnote
    ? `<p style="margin:24px 0 0;color:#9ca3af;font-size:12px;">${args.footnote}</p>`
    : "";
  return `<!doctype html><html><body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Inter',system-ui,sans-serif;color:#111418;">${preheader}<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 16px;"><tr><td align="center"><table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #ececec;border-radius:22px;overflow:hidden;"><tr><td style="padding:36px 36px 8px;"><h1 style="margin:0 0 12px;font-size:24px;font-weight:600;letter-spacing:-0.02em;line-height:1.25;">${escapeHtml(args.heading)}</h1><div style="margin:0;color:#475569;font-size:15px;line-height:1.6;">${args.body}</div>${cta}${footnote}<p style="margin:24px 0 0;color:#9ca3af;font-size:12px;">© Lumenari · lumenari.io</p></td></tr></table></td></tr></table></body></html>`;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === '"' ? "&quot;" : "&#39;",
  );
}

// =====================================================================
// Welcome-series pass: day 1 / 3 / 5 / 7
// =====================================================================
async function runWelcomeSeriesPass() {
  const now = Date.now();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, email, claimed_kit_slug, welcomed_at, unsubscribed_at, converted_at")
    .is("unsubscribed_at", null);

  if (error) {
    console.error("[email-cron] leads fetch:", error);
    return { error: error.message };
  }

  const steps: Array<{ days: number; template: Template; build: () => { subject: string; html: string; text: string } }> = [
    {
      days: 1,
      template: "welcome.day-1",
      build: () => ({
        subject: "Why a plain text file makes Claude smarter",
        html: renderShell({
          preheader: "The SKILL.md format in 90 seconds.",
          heading: "The thing that makes the kit work.",
          body: `<p>Most AI tools answer like a stranger every time you open a new chat. SKILL.md fixes that.</p><p>It's a plain markdown file Claude, Cursor, and the ChatGPT-companion format read once and adapt to. No coding. No installer. Drop it in the project, watch responses get sharper.</p>`,
          cta: { label: "See the catalog", url: `${SITE_URL}/kits` },
        }),
        text: `SKILL.md is a plain markdown file Claude reads once and adapts to. Drop it in, watch responses get sharper. Catalog: ${SITE_URL}/kits`,
      }),
    },
    {
      days: 3,
      template: "welcome.day-3",
      build: () => ({
        subject: "5 things to do with your free kit",
        html: renderShell({
          preheader: "Open it, hand it to Claude, steal the pattern.",
          heading: "5 things to do with the kit.",
          body: `<ol style="margin:0 0 0 18px;padding:0;line-height:1.8;"><li>Drag the SKILL.md into a Claude project. Run the first quick-start prompt.</li><li>Steal the prompt structure for a related niche.</li><li>Paste the optimization pack into ChatGPT.</li><li>Build a Custom GPT from the included instructions file.</li><li>Read memory.md for tone + workflow context.</li></ol>`,
          cta: { label: "Open your library", url: `${SITE_URL}/library` },
        }),
        text: `5 things: 1) drag SKILL.md into Claude 2) steal the pattern 3) paste into ChatGPT 4) build a Custom GPT 5) read memory.md. Library: ${SITE_URL}/library`,
      }),
    },
    {
      days: 5,
      template: "welcome.day-5",
      build: () => ({
        subject: "A small case study (illustrative)",
        html: renderShell({
          preheader: "What a kit looks like in practice.",
          heading: "What a kit looks like in practice.",
          body: `<p><em>Representative example — names and details illustrative, not a verified case study.</em></p><p>A recruiter dropped the Recruiter kit into Claude, rebuilt her workflow around the templates, and cut sourcing from 40 hours/week to about 16 over two weeks. Same output, less typing. The pattern repeats across roles.</p>`,
          cta: { label: "Browse the catalog", url: `${SITE_URL}/kits` },
          footnote: "Story is representative — we're collecting real cases with permission.",
        }),
        text: `Representative example: recruiter cut sourcing from 40h/wk to 16h with the Recruiter kit. ${SITE_URL}/kits`,
      }),
    },
    {
      days: 7,
      template: "welcome.day-7",
      build: () => ({
        subject: "Pro+ math — should you?",
        html: renderShell({
          preheader: "Every kit, current and future, for $19/mo.",
          heading: "The Pro+ pitch — short version.",
          body: `<p>Pro+ is <strong>$19 CAD a month</strong> and unlocks every current kit (100+) and every future one. If you'd reach for two more kits this year, you've already paid for the year.</p><p>Annual is $149 CAD (saves $79 vs monthly). Lifetime is $399 CAD.</p>`,
          cta: { label: "See Pro+", url: `${SITE_URL}/pro` },
        }),
        text: `Pro+ is $19/mo and unlocks every kit. Annual $149 saves $79. Lifetime $399. ${SITE_URL}/pro`,
      }),
    },
  ];

  let sent = 0;
  for (const lead of leads ?? []) {
    if (!lead.welcomed_at) continue;
    if (lead.converted_at) continue; // graduate to paying flow
    const age = now - new Date(lead.welcomed_at as string).getTime();
    for (const step of steps) {
      const windowStart = step.days * DAY_MS;
      const windowEnd = (step.days + 1) * DAY_MS;
      if (age >= windowStart && age < windowEnd + DAY_MS) {
        const body = step.build();
        const res = await sendEmail({
          recipient: lead.email as string,
          template: step.template,
          subject: body.subject,
          html: body.html,
          text: body.text,
          metadata: { leadId: lead.id, step: step.template },
        });
        if (res.sent) sent += 1;
      }
    }
  }
  return { sent };
}

// =====================================================================
// Pro+ inactive 14d
// =====================================================================
async function runProInactivePass() {
  const cutoff = new Date(Date.now() - 14 * DAY_MS).toISOString();
  // Active Pro+ subscribers who haven't downloaded anything in 14d.
  const { data: pros } = await supabase
    .from("purchases")
    .select("id, email, kit_ids")
    .eq("pro", true)
    .in("pro_status", ["active", "trialing"]);

  let sent = 0;
  for (const p of pros ?? []) {
    const email = p.email as string;
    // Was there a download in the last 14 days for this purchase?
    const { data: recent } = await supabase
      .from("purchase_downloads")
      .select("kit_id, last_downloaded_at")
      .eq("purchase_id", p.id)
      .gt("last_downloaded_at", cutoff)
      .limit(1);
    if (recent && recent.length > 0) continue;

    // Pick three recommendations: kits the user hasn't downloaded yet.
    const owned = new Set<string>(((p.kit_ids as string[]) ?? []));
    const { data: catalog } = await supabase
      .from("kits")
      .select("id, name, slug, ai_target")
      .order("created_at", { ascending: false })
      .limit(50);
    const recs = (catalog ?? [])
      .filter((k: any) => !owned.has(k.id))
      .slice(0, 3);
    if (recs.length === 0) continue;

    const list = recs
      .map(
        (k: any) =>
          `<li style="margin:0 0 8px;"><a href="${SITE_URL}/kits/${k.slug}" style="color:#111418;font-weight:500;">${escapeHtml(k.name)}</a></li>`,
      )
      .join("");
    const html = renderShell({
      preheader: "Quick picks from your Pro+ library.",
      heading: "Three picks for you.",
      body: `<p>Haven't seen a download in a couple of weeks — here are three Pro+ kits you might use:</p><ul style="margin:18px 0 0;padding:0 0 0 18px;">${list}</ul>`,
      cta: { label: "Open your library", url: `${SITE_URL}/library` },
    });
    const res = await sendEmail({
      recipient: email,
      template: "pro-plus.inactive-14d",
      subject: "Three kits we think you'd use",
      html,
      text: `Three Pro+ picks: ${recs.map((k: any) => `${k.name} (${SITE_URL}/kits/${k.slug})`).join(", ")}`,
      metadata: { purchaseId: p.id },
    });
    if (res.sent) sent += 1;
  }
  return { sent };
}

// =====================================================================
// Monthly digest — first of each month
// =====================================================================
async function runMonthlyDigestPass(force = false) {
  const today = new Date();
  if (!force && today.getUTCDate() !== 1) return { sent: 0, skipped: "not first of month" };

  const monthLabel = today.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

  const { data: pros } = await supabase
    .from("purchases")
    .select("email")
    .eq("pro", true)
    .in("pro_status", ["active", "trialing"]);

  let sent = 0;
  // Re-fire fresh per month — append the month label to the template id so
  // each month's digest is its own idempotency key.
  const template = `pro-plus.monthly-digest.${today.getUTCFullYear()}-${(today.getUTCMonth() + 1).toString().padStart(2, "0")}` as Template;
  for (const p of pros ?? []) {
    const html = renderShell({
      preheader: `${monthLabel} digest — fresh kits + top downloads.`,
      heading: `${monthLabel} digest`,
      body: `<p>Here's what shipped this month, and what your fellow Pro+ members are reaching for.</p><p>Reply if there's a kit you wish existed — the Pro+ list shapes what gets built next.</p>`,
      cta: { label: "Open your library", url: `${SITE_URL}/library` },
    });
    const res = await sendEmail({
      recipient: p.email as string,
      template,
      subject: `Lumenari · ${monthLabel} digest`,
      html,
      text: `Lumenari · ${monthLabel}. Library: ${SITE_URL}/library`,
    });
    if (res.sent) sent += 1;
  }
  return { sent };
}

// =====================================================================
// Annual upgrade nudge — at month 5 of monthly subscription
// =====================================================================
async function runAnnualNudgePass() {
  const cutoffMin = new Date(Date.now() - 150 * DAY_MS).toISOString(); // ~5 months
  const cutoffMax = new Date(Date.now() - 140 * DAY_MS).toISOString(); // ~4.6 months
  const { data: monthlies } = await supabase
    .from("purchases")
    .select("email, created_at")
    .eq("pro", true)
    .eq("pro_tier", "monthly")
    .in("pro_status", ["active", "trialing"])
    .gte("created_at", cutoffMin)
    .lte("created_at", cutoffMax);

  let sent = 0;
  for (const p of monthlies ?? []) {
    const html = renderShell({
      preheader: "Switch to annual — same access, one charge.",
      heading: "Switch to annual?",
      body: `<p>You've been on Pro+ monthly for five months. The annual plan saves you <strong>$79 CAD</strong> a year. Same access, one charge.</p>`,
      cta: { label: "Switch to annual", url: `${SITE_URL}/pro` },
    });
    const res = await sendEmail({
      recipient: p.email as string,
      template: "pro-plus.annual-upgrade-nudge",
      subject: "Save $79 — switch to annual?",
      html,
      text: `Annual saves $79/yr vs monthly. ${SITE_URL}/pro`,
    });
    if (res.sent) sent += 1;
  }
  return { sent };
}

// =====================================================================
// One-time → Pro+ upsell — buyers with 2+ kits
// =====================================================================
async function runOneTimeUpsellPass() {
  const { data: buyers } = await supabase
    .from("purchases")
    .select("email, kit_ids, pro")
    .eq("pro", false);

  // Group by email since one email can have multiple purchase rows.
  const totals = new Map<string, number>();
  for (const b of buyers ?? []) {
    const e = (b.email as string).toLowerCase();
    const kits = (b.kit_ids as string[]) ?? [];
    totals.set(e, (totals.get(e) ?? 0) + kits.length);
  }

  let sent = 0;
  for (const [email, count] of totals) {
    if (count < 2) continue;
    const html = renderShell({
      preheader: "Every kit for less than two more à la carte buys.",
      heading: "Pro+ math, for you specifically.",
      body: `<p>You've grabbed multiple kits. <strong>Pro+ is $19 CAD/mo and unlocks every kit (100+) plus future ones.</strong> If you'd reach for two or three more kits this year, Pro+ wins.</p>`,
      cta: { label: "See Pro+", url: `${SITE_URL}/pro` },
    });
    const res = await sendEmail({
      recipient: email,
      template: "pro-plus.one-time-upsell",
      subject: "You'd save money on Pro+",
      html,
      text: `You've grabbed ${count} kits. Pro+ is $19/mo, unlocks all 100+. ${SITE_URL}/pro`,
    });
    if (res.sent) sent += 1;
  }
  return { sent };
}

// =====================================================================
// Wishlist — new-bundle notification
//
// For every (lead, wishlisted kit) pair where the wishlisted kit is now
// part of a bundle the lead has NOT been notified about, send one email.
// We update `wishlists.notified_at` on the wishlist row to keep the pass
// idempotent across runs.
// =====================================================================
async function runWishlistBundlePass() {
  const { data: rows } = await supabase
    .from("wishlists")
    .select("id, lead_id, kit_slug, notified_at, leads(email, unsubscribed_at)")
    .is("notified_at", null);

  // Cache of kit→bundles lookups (slug → bundle slug list) to avoid
  // making N round-trips. The bundles table is small.
  const { data: bundles } = await supabase
    .from("bundles")
    .select("id, name, slug, kit_slugs, price_cents");

  let sent = 0;
  for (const r of (rows ?? []) as Array<{
    id: string;
    lead_id: string;
    kit_slug: string;
    notified_at: string | null;
    leads: { email: string; unsubscribed_at: string | null } | null;
  }>) {
    const email = r.leads?.email;
    if (!email) continue;
    if (r.leads?.unsubscribed_at) continue;

    const matching = (bundles ?? []).filter((b: any) =>
      Array.isArray(b.kit_slugs) && b.kit_slugs.includes(r.kit_slug),
    );
    if (matching.length === 0) continue;

    const list = matching
      .map(
        (b: any) =>
          `<li style="margin:0 0 8px;"><a href="${SITE_URL}/kits/${b.slug}" style="color:#111418;font-weight:500;">${escapeHtml(b.name)}</a> — $${(Number(b.price_cents) / 100).toFixed(0)} CAD</li>`,
      )
      .join("");
    const html = renderShell({
      preheader: "A kit you saved is now in a bundle.",
      heading: "A kit you saved is now in a bundle.",
      body: `<p>You saved a kit for later — it's now part of one or more bundles that ship at a discount:</p><ul style="margin:18px 0 0;padding:0 0 0 18px;">${list}</ul>`,
      cta: { label: "Open your library", url: `${SITE_URL}/library` },
    });
    const res = await sendEmail({
      recipient: email,
      template: "wishlist.new-bundle",
      subject: "A kit you saved is now in a bundle",
      html,
      text: `Bundles that include your wishlisted kit: ${matching
        .map((b: any) => `${b.name} (${SITE_URL}/kits/${b.slug})`)
        .join(", ")}`,
      metadata: { wishlistId: r.id, kitSlug: r.kit_slug },
    });
    if (res.sent || res.skipped) {
      // Mark notified so we don't churn on this row indefinitely.
      await supabase
        .from("wishlists")
        .update({ notified_at: new Date().toISOString() })
        .eq("id", r.id);
    }
    if (res.sent) sent += 1;
  }
  return { sent };
}

// =====================================================================
// HTTP handler
// =====================================================================
serve(async (req) => {
  const url = new URL(req.url);

  // Simple shared-secret auth so only the cron + Chris can fire this.
  const provided = url.searchParams.get("secret") ?? req.headers.get("x-cron-secret");
  if (CRON_SECRET && provided !== CRON_SECRET) {
    return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
  }

  const pass = url.searchParams.get("pass") ?? "all";
  // Stripe is read-only in this cron — included for future cancellation-save automation.
  if (STRIPE_SECRET_KEY) void STRIPE_SECRET_KEY;

  try {
    const out: Record<string, unknown> = {};
    if (pass === "all" || pass === "welcome") {
      out.welcome = await runWelcomeSeriesPass();
    }
    if (pass === "all" || pass === "pro-inactive") {
      out.proInactive = await runProInactivePass();
    }
    if (pass === "all" || pass === "monthly-digest") {
      out.monthlyDigest = await runMonthlyDigestPass(url.searchParams.get("force") === "1");
    }
    if (pass === "all" || pass === "annual-nudge") {
      out.annualNudge = await runAnnualNudgePass();
    }
    if (pass === "all" || pass === "one-time-upsell") {
      out.oneTimeUpsell = await runOneTimeUpsellPass();
    }
    if (pass === "all" || pass === "wishlist-bundle") {
      out.wishlistBundle = await runWishlistBundlePass();
    }
    return new Response(JSON.stringify({ ok: true, ...out }), {
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { "content-type": "application/json" } },
    );
  }
});
