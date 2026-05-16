import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { supabaseService } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { KITS, BUNDLES, getKit } from "@/data/kits";
import {
  tierForPriceId,
  type ProTier,
  apiTierForPriceId,
  knownApiPriceIds,
  type ApiTier,
} from "@/data/subscription-tiers";
import { sendCancellationSaveEmail } from "@/lib/cancellation-save";

/**
 * POST /api/webhook/stripe
 *
 * Stripe → Lumenari. Two product lines feed this endpoint:
 *
 *   1. One-off kit + bundle purchases via /api/checkout (mode: payment)
 *      → `checkout.session.completed` → upsert `purchases`, email buyer
 *
 *   2. Pro+ subscriptions via /api/pro-checkout (mode: subscription)
 *      → `customer.subscription.created`    → set pro=true
 *      → `customer.subscription.updated`    → track status (active/cancelled/past_due)
 *      → `customer.subscription.deleted`    → set pro=false
 *
 *   2b. Pro+ Lifetime via /api/pro-checkout (mode: payment, metadata.product=pro_plus)
 *       → `checkout.session.completed` with `product=pro_plus` → set pro=true, tier=lifetime
 *
 * Service-role DB writes. All handlers are idempotent on Stripe IDs.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(
      raw,
      sig,
      env.stripeWebhookSecret,
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.error("[stripe webhook] bad signature:", msg);
    return NextResponse.json({ error: `Webhook error: ${msg}` }, {
      status: 400,
    });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpsert(event.data.object as Stripe.Subscription);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      default:
        // Acknowledge events we don't care about.
        break;
    }
  } catch (err) {
    console.error("[stripe webhook] handler error:", err);
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// ===================================================================
// checkout.session.completed
// Routes between Pro+ Lifetime and one-off kit/bundle purchase.
// ===================================================================
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const meta = session.metadata ?? {};
  if (meta.product === "pro_plus" && session.mode === "payment") {
    return handleProLifetimeCompleted(session);
  }
  // Subscriptions surface elsewhere (customer.subscription.*), so we don't
  // double-handle them here — checkout.session.completed in subscription mode
  // arrives before subscription.created but carries less state. The API
  // platform subscription is the same: wait for customer.subscription.created.
  if (session.mode === "subscription") {
    return;
  }
  return handleKitPurchaseCompleted(session);
}

// ===================================================================
// One-off kit / bundle purchase
// ===================================================================
async function handleKitPurchaseCompleted(session: Stripe.Checkout.Session) {
  const email =
    session.customer_details?.email ??
    session.customer_email ??
    null;
  if (!email) {
    console.warn("[stripe webhook] no buyer email on session", session.id);
    return;
  }

  const meta = session.metadata ?? {};
  const slugCsv = meta.kit_slugs ?? "";
  const slugs = slugCsv.split(",").map((s) => s.trim()).filter(Boolean);

  const finalSlugs = slugs.length > 0 ? slugs : await inferSlugsFromLineItems(session.id);
  if (finalSlugs.length === 0) {
    console.warn("[stripe webhook] no resolvable kits for session", session.id);
    return;
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
        currency: session.currency ?? "cad",
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
}

// ===================================================================
// Pro+ Lifetime — one-time payment, treated like a permanent Pro flip
// ===================================================================
async function handleProLifetimeCompleted(session: Stripe.Checkout.Session) {
  const email =
    session.customer_details?.email ??
    session.customer_email ??
    null;
  if (!email) {
    console.warn("[stripe webhook] no Pro+ lifetime buyer email", session.id);
    return;
  }

  const db = supabaseService();

  // Idempotency: skip if we've already processed this exact session.
  const { data: existing } = await db
    .from("purchases")
    .select("id, access_token, pro")
    .eq("stripe_session_id", session.id)
    .maybeSingle();

  if (existing?.pro) return;

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
    return;
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
      currency: session.currency ?? "cad",
      pro: true,
      pro_tier: "lifetime",
      pro_status: "active",
      pro_renews_at: null,
    })
    .select("id, access_token")
    .single();

  if (insErr) throw insErr;

  await sendProWelcomeEmail(email, "lifetime", inserted.id, inserted.access_token);
}

// ===================================================================
// Pro+ Subscription — created / updated
// ===================================================================
async function handleSubscriptionUpsert(sub: Stripe.Subscription) {
  const priceId = sub.items.data[0]?.price?.id;
  if (!priceId) return;

  // Route API platform subscriptions to their own handler first.
  const apiTier = apiTierForPriceId(priceId);
  if (apiTier) {
    return handleApiSubscriptionUpsert(sub, apiTier);
  }

  // Otherwise: Pro+ subscription path.
  const tier = tierForPriceId(priceId);
  if (!tier || tier === "lifetime") return; // lifetime arrives via checkout.session

  // Need an email. Subscriptions don't carry one directly; pull from customer.
  const email = await resolveCustomerEmail(sub.customer);
  if (!email) {
    console.warn("[stripe webhook] no email for subscription", sub.id);
    return;
  }

  const proStatus = mapStripeStatusToProStatus(sub.status);
  const isActive = proStatus === "active" || proStatus === "trialing";
  // `current_period_end` lives on the subscription in the pinned API version.
  // Newer API versions put it on each item — read both to stay forward-compatible.
  const renewsAtUnix = readPeriodEnd(sub);

  const db = supabaseService();
  const { data: existing } = await db
    .from("purchases")
    .select("id, email, pro")
    .eq("stripe_subscription_id", sub.id)
    .maybeSingle();

  if (existing) {
    await db
      .from("purchases")
      .update({
        pro: isActive,
        pro_tier: tier,
        pro_status: proStatus,
        pro_renews_at: renewsAtUnix
          ? new Date(renewsAtUnix * 1000).toISOString()
          : null,
      })
      .eq("id", existing.id);
    return;
  }

  // First time seeing this subscription — insert a new purchase row.
  const { data: inserted, error } = await db
    .from("purchases")
    .insert({
      email,
      kit_ids: [],
      stripe_subscription_id: sub.id,
      stripe_customer_id:
        typeof sub.customer === "string" ? sub.customer : null,
      currency: sub.currency ?? "cad",
      pro: isActive,
      pro_tier: tier,
      pro_status: proStatus,
      pro_renews_at: renewsAtUnix
        ? new Date(renewsAtUnix * 1000).toISOString()
        : null,
    })
    .select("id, access_token")
    .single();

  if (error) throw error;

  if (isActive) {
    await sendProWelcomeEmail(email, tier, inserted.id, inserted.access_token);
  }
}

// ===================================================================
// Pro+ Subscription — deleted (cancelled at end of period)
// ===================================================================
async function handleSubscriptionDeleted(sub: Stripe.Subscription) {
  const priceId = sub.items.data[0]?.price?.id;
  const isApi = priceId ? knownApiPriceIds().has(priceId) : false;

  const db = supabaseService();

  if (isApi) {
    await db
      .from("api_accounts")
      .update({
        tier_id: "free",
        subscription_status: "canceled",
        current_period_end: null,
      })
      .eq("stripe_subscription_id", sub.id);
    return;
  }

  // Fetch the email before flipping pro=false so we can fire the save flow.
  const { data: row } = await db
    .from("purchases")
    .select("email")
    .eq("stripe_subscription_id", sub.id)
    .maybeSingle();

  await db
    .from("purchases")
    .update({
      pro: false,
      pro_status: "cancelled",
    })
    .eq("stripe_subscription_id", sub.id);

  // Fire the cancellation-save email (idempotent on email_events).
  if (row?.email) {
    await sendCancellationSaveEmail(row.email);
  }
}

// ===================================================================
// API Platform Subscription — created / updated
//   - Flips api_accounts.tier_id
//   - Tracks subscription_status (active / past_due / trialing / ...)
//   - On first activation, emails the buyer a magic-link to the dashboard
// ===================================================================
async function handleApiSubscriptionUpsert(
  sub: Stripe.Subscription,
  tier: ApiTier,
) {
  const email = await resolveCustomerEmail(sub.customer);
  if (!email) {
    console.warn("[stripe webhook] no email for API subscription", sub.id);
    return;
  }
  const lowerEmail = email.toLowerCase().trim();
  const subStatus = mapStripeStatusToApiStatus(sub.status);
  const periodEndUnix = readPeriodEnd(sub);
  const periodEnd = periodEndUnix
    ? new Date(periodEndUnix * 1000).toISOString()
    : null;

  const db = supabaseService();

  // Find by subscription_id first (idempotent on Stripe retries), then by
  // email (the api-checkout route provisions a free row up front).
  const { data: bySub } = await db
    .from("api_accounts")
    .select("id, access_token, tier_id, email")
    .eq("stripe_subscription_id", sub.id)
    .maybeSingle();

  const { data: byEmail } = bySub
    ? { data: null }
    : await db
        .from("api_accounts")
        .select("id, access_token, tier_id, email")
        .ilike("email", lowerEmail)
        .maybeSingle();

  const target = bySub ?? byEmail;
  const stripeCustomerId =
    typeof sub.customer === "string" ? sub.customer : null;

  if (target) {
    const wasFree = target.tier_id === "free";
    await db
      .from("api_accounts")
      .update({
        tier_id: tier,
        subscription_status: subStatus,
        current_period_end: periodEnd,
        stripe_subscription_id: sub.id,
        stripe_customer_id: stripeCustomerId,
      })
      .eq("id", target.id);

    if (wasFree && (subStatus === "active" || subStatus === "trialing")) {
      await sendApiWelcomeEmail(
        lowerEmail,
        tier,
        target.id as string,
        target.access_token as string,
      );
    }
    return;
  }

  // First-time row (rare — api-checkout normally creates it first).
  const { data: inserted, error: insErr } = await db
    .from("api_accounts")
    .insert({
      email: lowerEmail,
      tier_id: tier,
      subscription_status: subStatus,
      current_period_end: periodEnd,
      stripe_subscription_id: sub.id,
      stripe_customer_id: stripeCustomerId,
    })
    .select("id, access_token")
    .single();

  if (insErr) {
    console.error("[stripe webhook] API account insert failed:", insErr);
    return;
  }

  if (subStatus === "active" || subStatus === "trialing") {
    await sendApiWelcomeEmail(
      lowerEmail,
      tier,
      inserted.id as string,
      inserted.access_token as string,
    );
  }
}

function mapStripeStatusToApiStatus(
  status: Stripe.Subscription.Status,
): "active" | "trialing" | "past_due" | "canceled" | "incomplete" {
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
      return "canceled";
    case "incomplete":
    case "incomplete_expired":
    default:
      return "incomplete";
  }
}

async function sendApiWelcomeEmail(
  email: string,
  tier: ApiTier,
  accountId: string,
  accessToken: string,
) {
  const dashboardUrl = `${env.siteUrl}/account/api-keys?a=${accountId}&t=${accessToken}`;
  const tierLabel = tier === "pro" ? "Pro" : tier === "business" ? "Business" : tier;

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Inter',system-ui,sans-serif;color:#111418;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 16px;"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #ececec;border-radius:22px;overflow:hidden;">
  <tr><td style="padding:36px 36px 8px;">
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:600;letter-spacing:-0.02em;">Welcome to the Lumenari API.</h1>
    <p style="margin:0;color:#6b7280;font-size:15px;line-height:1.55;">Your ${escapeHtml(tierLabel)} subscription is active. Open the dashboard to generate your first API key.</p>
  </td></tr>
  <tr><td style="padding:24px 36px 36px;">
    <p style="margin:0 0 14px;">
      <a href="${dashboardUrl}" style="display:inline-block;padding:14px 22px;background:#111418;color:#ffffff;border-radius:999px;text-decoration:none;font-weight:500;font-size:15px;">Open the dashboard</a>
    </p>
    <p style="margin:18px 0 0;color:#9ca3af;font-size:12px;">© Lumenari · lumenari.io</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;

  try {
    await resend().emails.send({
      from: env.resendFrom,
      to: email,
      subject: "Welcome to the Lumenari API",
      html,
    });
  } catch (err) {
    console.error("[stripe webhook] API welcome email failed:", err);
  }
}

// ===================================================================
// Helpers
// ===================================================================
function mapStripeStatusToProStatus(
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

function readPeriodEnd(sub: Stripe.Subscription): number | null {
  const top = (sub as unknown as { current_period_end?: number })
    .current_period_end;
  if (typeof top === "number") return top;
  const fromItem = (sub.items.data[0] as unknown as { current_period_end?: number } | undefined)
    ?.current_period_end;
  return typeof fromItem === "number" ? fromItem : null;
}

async function resolveCustomerEmail(
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
    console.error("[stripe webhook] customer fetch failed:", err);
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
    await resend().emails.send({
      from: env.resendFrom,
      to: email,
      subject: "Your Lumenari kit is ready",
      html,
    });
  } catch (err) {
    console.error("[stripe webhook] email send failed:", err);
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
    await resend().emails.send({
      from: env.resendFrom,
      to: email,
      subject: "Welcome to Lumenari Pro+",
      html,
    });
  } catch (err) {
    console.error("[stripe webhook] pro welcome email failed:", err);
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
