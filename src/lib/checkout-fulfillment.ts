/**
 * Shared Stripe Checkout fulfillment logic.
 *
 * Used by BOTH:
 *   1. The Stripe webhook (`/api/webhook/stripe`) — fires on
 *      `checkout.session.completed` and `customer.subscription.*`
 *   2. The /thanks page — fires on the post-checkout redirect when the
 *      buyer lands with `?session_id=...`. This is the fallback when the
 *      webhook does not deliver (which has been happening in test mode).
 *
 * Every code path is idempotent on Stripe identifiers:
 *   - One-off kit / bundle purchases   → unique on `purchases.stripe_session_id`
 *   - Pro+ lifetime                    → unique on `purchases.stripe_session_id`
 *   - Pro+ subscription                → keyed by `purchases.stripe_subscription_id`
 *
 * The DB has a UNIQUE constraint on `stripe_session_id` (see
 * `supabase/migrations/0001_init.sql`), so duplicate inserts are rejected at
 * the DB layer regardless of which path runs first. We additionally short-
 * circuit early via a SELECT to avoid sending duplicate emails.
 */

import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { supabaseService } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { KITS, BUNDLES, getKit } from "@/data/kits";
import { tierForPriceId, type ProTier } from "@/data/subscription-tiers";

// =====================================================================
// Result shape — lets the caller render confirmation UI on /thanks
// =====================================================================
export type FulfillmentResult =
  | {
      kind: "kit";
      email: string;
      kitSlugs: string[];
      isNew: boolean;
    }
  | {
      kind: "pro_lifetime";
      email: string;
      isNew: boolean;
    }
  | {
      kind: "pro_subscription";
      email: string;
      tier: ProTier;
      isNew: boolean;
    }
  | {
      kind: "skipped";
      reason: string;
    };

// =====================================================================
// Entry point #1 — fulfill a Stripe.Checkout.Session
// Routes between one-off kits, Pro+ lifetime, and Pro+ subscription.
// =====================================================================
export async function fulfillCheckoutSession(
  session: Stripe.Checkout.Session,
): Promise<FulfillmentResult> {
  const meta = session.metadata ?? {};

  if (meta.product === "pro_plus" && session.mode === "payment") {
    return fulfillProLifetime(session);
  }

  if (session.mode === "subscription") {
    return fulfillSubscriptionFromCheckout(session);
  }

  return fulfillKitPurchase(session);
}

// =====================================================================
// Entry point #2 — fulfill a Stripe.Subscription directly
// Called from the webhook on `customer.subscription.created/updated`.
// (The /thanks page goes through `fulfillCheckoutSession` instead.)
// =====================================================================
export async function fulfillProSubscription(
  sub: Stripe.Subscription,
): Promise<FulfillmentResult> {
  const priceId = sub.items.data[0]?.price?.id;
  if (!priceId) {
    return { kind: "skipped", reason: "no price id on subscription" };
  }

  const tier = tierForPriceId(priceId);
  if (!tier || tier === "lifetime") {
    return { kind: "skipped", reason: "not a Pro+ subscription price" };
  }

  const rawEmail = await resolveCustomerEmail(sub.customer);
  if (!rawEmail) {
    console.warn("[fulfillment] no email for subscription", sub.id);
    return { kind: "skipped", reason: "no email on subscription customer" };
  }
  const email = rawEmail.trim().toLowerCase();

  const proStatus = mapStripeStatusToProStatus(sub.status);
  const isActive = proStatus === "active" || proStatus === "trialing";
  const renewsAtUnix = readPeriodEnd(sub);
  const renewsAtIso = renewsAtUnix
    ? new Date(renewsAtUnix * 1000).toISOString()
    : null;

  const db = supabaseService();
  const { data: existing } = await db
    .from("purchases")
    .select("id, email, pro, access_token")
    .eq("stripe_subscription_id", sub.id)
    .maybeSingle();

  if (existing) {
    await db
      .from("purchases")
      .update({
        pro: isActive,
        pro_tier: tier,
        pro_status: proStatus,
        pro_renews_at: renewsAtIso,
      })
      .eq("id", existing.id);
    return {
      kind: "pro_subscription",
      email: existing.email ?? email,
      tier,
      isNew: false,
    };
  }

  const { data: inserted, error } = await db
    .from("purchases")
    .insert({
      email,
      kit_ids: [],
      stripe_subscription_id: sub.id,
      stripe_customer_id:
        typeof sub.customer === "string" ? sub.customer : null,
      currency: sub.currency ?? "usd",
      pro: isActive,
      pro_tier: tier,
      pro_status: proStatus,
      pro_renews_at: renewsAtIso,
    })
    .select("id, access_token")
    .single();

  if (error) throw error;

  if (isActive) {
    await sendProWelcomeEmail(email, tier, inserted.id, inserted.access_token);
  }

  return { kind: "pro_subscription", email, tier, isNew: true };
}

// =====================================================================
// One-off kit / bundle purchase
// =====================================================================
async function fulfillKitPurchase(
  session: Stripe.Checkout.Session,
): Promise<FulfillmentResult> {
  const rawEmail =
    session.customer_details?.email ?? session.customer_email ?? null;
  if (!rawEmail) {
    console.warn("[fulfillment] no buyer email on session", session.id);
    return { kind: "skipped", reason: "no buyer email on session" };
  }
  const email = rawEmail.trim().toLowerCase();

  const meta = session.metadata ?? {};
  const slugCsv = meta.kit_slugs ?? "";
  const slugs = slugCsv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const finalSlugs =
    slugs.length > 0 ? slugs : await inferSlugsFromLineItems(session.id);
  if (finalSlugs.length === 0) {
    console.warn("[fulfillment] no resolvable kits for session", session.id);
    return { kind: "skipped", reason: "no resolvable kits for session" };
  }

  const db = supabaseService();

  const { data: existing, error: selErr } = await db
    .from("purchases")
    .select("id, access_token")
    .eq("stripe_session_id", session.id)
    .maybeSingle();

  if (selErr) throw selErr;

  let purchaseId: string;
  let accessToken: string;
  let isNew = false;

  if (existing) {
    purchaseId = existing.id;
    accessToken = existing.access_token;
  } else {
    const { data: inserted, error: insErr } = await db
      .from("purchases")
      .insert({
        email,
        kit_ids: finalSlugs,
        stripe_session_id: session.id,
        stripe_customer_id:
          typeof session.customer === "string" ? session.customer : null,
        amount_cents: session.amount_total ?? null,
        currency: session.currency ?? "usd",
      })
      .select("id, access_token")
      .single();

    if (insErr) throw insErr;
    purchaseId = inserted.id;
    accessToken = inserted.access_token;
    isNew = true;

    const rows = finalSlugs.map((kit_id) => ({
      purchase_id: purchaseId,
      kit_id,
    }));
    const { error: ctrErr } = await db
      .from("purchase_downloads")
      .upsert(rows, { onConflict: "purchase_id,kit_id" });
    if (ctrErr) throw ctrErr;
  }

  if (isNew) {
    await sendReceiptEmail(email, finalSlugs, purchaseId, accessToken);
  }

  return { kind: "kit", email, kitSlugs: finalSlugs, isNew };
}

// =====================================================================
// Pro+ Lifetime — one-time payment, treated like a permanent Pro flip
// =====================================================================
async function fulfillProLifetime(
  session: Stripe.Checkout.Session,
): Promise<FulfillmentResult> {
  const rawEmail =
    session.customer_details?.email ?? session.customer_email ?? null;
  if (!rawEmail) {
    console.warn("[fulfillment] no Pro+ lifetime buyer email", session.id);
    return { kind: "skipped", reason: "no buyer email on session" };
  }
  const email = rawEmail.trim().toLowerCase();

  const db = supabaseService();

  const { data: existing } = await db
    .from("purchases")
    .select("id, access_token, pro")
    .eq("stripe_session_id", session.id)
    .maybeSingle();

  if (existing?.pro) {
    return { kind: "pro_lifetime", email, isNew: false };
  }

  if (existing) {
    await db
      .from("purchases")
      .update({
        pro: true,
        pro_tier: "lifetime",
        pro_status: "active",
        pro_renews_at: null,
      })
      .eq("id", existing.id);
    return { kind: "pro_lifetime", email, isNew: false };
  }

  const { data: inserted, error: insErr } = await db
    .from("purchases")
    .insert({
      email,
      kit_ids: [],
      stripe_session_id: session.id,
      stripe_customer_id:
        typeof session.customer === "string" ? session.customer : null,
      amount_cents: session.amount_total ?? null,
      currency: session.currency ?? "usd",
      pro: true,
      pro_tier: "lifetime",
      pro_status: "active",
      pro_renews_at: null,
    })
    .select("id, access_token")
    .single();

  if (insErr) throw insErr;

  await sendProWelcomeEmail(email, "lifetime", inserted.id, inserted.access_token);

  return { kind: "pro_lifetime", email, isNew: true };
}

// =====================================================================
// Pro+ Subscription (when arriving from a Checkout Session in /thanks)
// The webhook normally handles this via `customer.subscription.created`,
// but if the webhook didn't fire we need to fulfill from the session.
// =====================================================================
async function fulfillSubscriptionFromCheckout(
  session: Stripe.Checkout.Session,
): Promise<FulfillmentResult> {
  const subRef = session.subscription;
  if (!subRef) {
    return { kind: "skipped", reason: "subscription session without subscription id" };
  }
  const subId = typeof subRef === "string" ? subRef : subRef.id;

  let sub: Stripe.Subscription;
  try {
    sub = await stripe().subscriptions.retrieve(subId);
  } catch (err) {
    console.error("[fulfillment] subscription retrieve failed:", err);
    return { kind: "skipped", reason: "subscription retrieve failed" };
  }

  return fulfillProSubscription(sub);
}

// =====================================================================
// Helpers — exported where the webhook still needs them
// =====================================================================

export function mapStripeStatusToProStatus(
  status: Stripe.Subscription.Status,
): "active" | "trialing" | "past_due" | "cancelled" | "incomplete" {
  switch (status) {
    case "active":
      return "active";
    case "trialing":
      return "trialing";
    case "past_due":
    case "unpaid":
      return "past_due";
    case "canceled":
    case "paused":
      return "cancelled";
    case "incomplete":
    case "incomplete_expired":
    default:
      return "incomplete";
  }
}

export function readPeriodEnd(sub: Stripe.Subscription): number | null {
  const top = (sub as unknown as { current_period_end?: number })
    .current_period_end;
  if (typeof top === "number") return top;
  const fromItem = (
    sub.items.data[0] as unknown as { current_period_end?: number } | undefined
  )?.current_period_end;
  return typeof fromItem === "number" ? fromItem : null;
}

export async function resolveCustomerEmail(
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null,
): Promise<string | null> {
  if (!customer) return null;
  if (typeof customer !== "string") {
    if ("email" in customer && customer.email) return customer.email;
    return null;
  }
  try {
    const c = await stripe().customers.retrieve(customer);
    if (c.deleted) return null;
    return c.email ?? null;
  } catch (err) {
    console.error("[fulfillment] customer fetch failed:", err);
    return null;
  }
}

async function inferSlugsFromLineItems(sessionId: string): Promise<string[]> {
  const items = await stripe().checkout.sessions.listLineItems(sessionId, {
    limit: 10,
  });
  const out: string[] = [];
  for (const item of items.data) {
    if (!item.price?.id) continue;
    for (const bundle of BUNDLES) {
      if (process.env[bundle.stripePriceEnv] === item.price.id) {
        out.push(...bundle.kitSlugs);
      }
    }
    for (const kit of KITS) {
      if (process.env[kit.stripePriceEnv] === item.price.id) {
        out.push(kit.slug);
      }
    }
  }
  return Array.from(new Set(out));
}

async function sendReceiptEmail(
  email: string,
  slugs: string[],
  purchaseId: string,
  accessToken: string,
) {
  const links = slugs
    .map((s) => getKit(s))
    .filter((k): k is NonNullable<ReturnType<typeof getKit>> => Boolean(k))
    .map((k) => ({
      name: k.name,
      url: `${env.siteUrl}/api/download/${k.slug}?p=${purchaseId}&t=${accessToken}`,
    }));

  const libraryUrl = `${env.siteUrl}/library?p=${purchaseId}&t=${accessToken}`;

  const html = receiptTemplate({ links, libraryUrl });

  try {
    const result = await resend().emails.send({
      from: env.resendFrom,
      to: email,
      subject: "Your Lumenari kit is ready",
      html,
    });
    if (result.error) {
      console.error(
        "[fulfillment] kit receipt email rejected by Resend:",
        JSON.stringify({
          from: env.resendFrom,
          to: email,
          error: result.error,
        }),
      );
    } else {
      console.log(
        "[fulfillment] kit receipt email sent:",
        JSON.stringify({ from: env.resendFrom, to: email, id: result.data?.id }),
      );
    }
  } catch (err) {
    console.error("[fulfillment] kit receipt email threw:", err);
  }
}

async function sendProWelcomeEmail(
  email: string,
  tier: ProTier,
  purchaseId: string,
  accessToken: string,
) {
  const libraryUrl = `${env.siteUrl}/library?p=${purchaseId}&t=${accessToken}`;
  const tierLabel =
    tier === "monthly" ? "Monthly" : tier === "annual" ? "Annual" : "Lifetime";

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Inter',system-ui,sans-serif;color:#111418;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 16px;"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #ececec;border-radius:22px;overflow:hidden;">
  <tr><td style="padding:36px 36px 8px;">
    <h1 style="margin:0 0 8px;font-size:28px;font-weight:600;letter-spacing:-0.02em;">Welcome to Lumenari Pro+.</h1>
    <p style="margin:0;color:#6b7280;font-size:16px;line-height:1.55;">Your ${escapeHtml(tierLabel)} membership is active. Every kit — current and future — is yours.</p>
  </td></tr>
  <tr><td style="padding:24px 36px 36px;">
    <p style="margin:0 0 14px;"><a href="${libraryUrl}" style="display:inline-block;padding:14px 22px;background:#111418;color:#ffffff;border-radius:999px;text-decoration:none;font-weight:500;font-size:15px;">Open your library</a></p>
    <p style="margin:18px 0 0;color:#9ca3af;font-size:12px;">© Lumenari · lumenari.io</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;

  try {
    const result = await resend().emails.send({
      from: env.resendFrom,
      to: email,
      subject: "Welcome to Lumenari Pro+",
      html,
    });
    if (result.error) {
      console.error(
        "[fulfillment] pro welcome email rejected by Resend:",
        JSON.stringify({
          from: env.resendFrom,
          to: email,
          error: result.error,
        }),
      );
    } else {
      console.log(
        "[fulfillment] pro welcome email sent:",
        JSON.stringify({ from: env.resendFrom, to: email, id: result.data?.id }),
      );
    }
  } catch (err) {
    console.error("[fulfillment] pro welcome email threw:", err);
  }
}

function receiptTemplate({
  links,
  libraryUrl,
}: {
  links: { name: string; url: string }[];
  libraryUrl: string;
}): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Inter',system-ui,sans-serif;color:#111418;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 16px;">
      <tr><td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #ececec;border-radius:22px;overflow:hidden;">
          <tr><td style="padding:36px 36px 8px;">
            <h1 style="margin:0 0 8px;font-size:28px;font-weight:600;letter-spacing:-0.02em;">Your Lumenari kit is ready.</h1>
            <p style="margin:0;color:#6b7280;font-size:16px;line-height:1.55;">Thanks for picking up a kit. Your downloads are below. They'll also live in your library — no password, just your email.</p>
          </td></tr>
          <tr><td style="padding:24px 36px;">
            ${links
              .map(
                (l) => `
              <p style="margin:0 0 14px;">
                <a href="${l.url}" style="display:inline-block;padding:14px 20px;background:#111418;color:#ffffff;border-radius:999px;text-decoration:none;font-weight:500;font-size:15px;">Download ${escapeHtml(l.name)}</a>
              </p>`,
              )
              .join("")}
          </td></tr>
          <tr><td style="padding:8px 36px 36px;">
            <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.55;">
              Or open your library anytime: <a href="${libraryUrl}" style="color:#111418;">${libraryUrl}</a>
            </p>
            <p style="margin:18px 0 0;color:#9ca3af;font-size:12px;">© Lumenari · lumenari.io</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

export function escapeHtml(s: string): string {
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
