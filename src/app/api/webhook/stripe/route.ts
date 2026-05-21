import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { supabaseService } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import {
  apiTierForPriceId,
  knownApiPriceIds,
  tierForPriceId,
  type ApiTier,
} from "@/data/subscription-tiers";
import { sendCancellationSaveEmail } from "@/lib/cancellation-save";
import {
  fulfillCheckoutSession,
  fulfillProSubscription,
  escapeHtml,
  readPeriodEnd,
  resolveCustomerEmail,
} from "@/lib/checkout-fulfillment";

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
 *
 * NOTE: The kit / Pro+ checkout-completed and Pro+ subscription-upsert paths
 * live in `@/lib/checkout-fulfillment` so the /thanks page can call the same
 * code when webhook delivery fails. The API platform subscription and
 * subscription-deleted paths stay here because they aren't reached from /thanks.
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
        await fulfillCheckoutSession(event.data.object as Stripe.Checkout.Session);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpsert(event.data.object as Stripe.Subscription);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      case "charge.refunded":
        await handleChargeRefunded(event.data.object as Stripe.Charge);
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
// Subscription upsert dispatcher.
//   - API platform tier?    → handleApiSubscriptionUpsert (local)
//   - Otherwise (Pro+)?     → fulfillProSubscription (shared)
// ===================================================================
async function handleSubscriptionUpsert(sub: Stripe.Subscription) {
  const priceId = sub.items.data[0]?.price?.id;
  if (!priceId) return;

  const apiTier = apiTierForPriceId(priceId);
  if (apiTier) {
    return handleApiSubscriptionUpsert(sub, apiTier);
  }

  // Pro+ subscription path — delegated to the shared fulfillment lib so
  // the /thanks page can use the same code. Idempotent on
  // `stripe_subscription_id`.
  const tier = tierForPriceId(priceId);
  if (!tier || tier === "lifetime") return; // lifetime arrives via checkout.session
  await fulfillProSubscription(sub);
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
// Charge refunded — Stripe Dashboard or API refund (full or partial)
//
// Marks the matching `purchases` row as refunded so the download route
// can deny future access. For Pro+ subscriptions and Pro+ Lifetime we
// also flip `pro=false` and `pro_status='cancelled'` so the library
// page locks immediately. One-off kit refunds set `refunded_at` only —
// the downloaded markdown is already on the customer's machine, so this
// is mostly bookkeeping + future-download lockout.
//
// Match strategy:
//   1. stripe_payment_intent_id  — set at fulfillment for sessions in
//      mode=payment (one-off kits + Pro+ Lifetime). Direct match.
//   2. stripe_customer_id + pro=true — for Pro+ subscriptions, where
//      individual charges come from invoices and the PI isn't stored
//      on the purchase row.
//
// Idempotent: re-running with refunded_at already set is a no-op.
// ===================================================================
async function handleChargeRefunded(charge: Stripe.Charge) {
  const paymentIntentId =
    typeof charge.payment_intent === "string"
      ? charge.payment_intent
      : null;
  const customerId =
    typeof charge.customer === "string" ? charge.customer : null;

  if (!paymentIntentId && !customerId) {
    console.warn(
      "[stripe webhook] charge.refunded has neither payment_intent nor customer",
      charge.id,
    );
    return;
  }

  const db = supabaseService();
  const nowIso = new Date().toISOString();

  // 1. Direct match by payment_intent_id (one-off kits + Pro+ Lifetime).
  if (paymentIntentId) {
    const { data: row } = await db
      .from("purchases")
      .select("id, email, pro, kit_ids, refunded_at")
      .eq("stripe_payment_intent_id", paymentIntentId)
      .maybeSingle();

    if (row) {
      if (row.refunded_at) {
        console.log(
          "[stripe webhook] charge.refunded already processed for purchase",
          row.id,
        );
        return;
      }
      const update: Record<string, unknown> = { refunded_at: nowIso };
      if (row.pro) {
        update.pro = false;
        update.pro_status = "cancelled";
      }
      await db.from("purchases").update(update).eq("id", row.id);
      console.log("[stripe webhook] charge.refunded", {
        purchaseId: row.id,
        email: row.email,
        wasPro: row.pro,
        kits: row.kit_ids,
      });
      return;
    }
  }

  // 2. Fallback for Pro+ subscriptions (invoice → charge → no PI stored
  // on the purchase row). Match the active Pro+ row by customer.
  if (customerId) {
    const { data: proRow } = await db
      .from("purchases")
      .select("id, email, refunded_at")
      .eq("stripe_customer_id", customerId)
      .eq("pro", true)
      .is("refunded_at", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (proRow) {
      await db
        .from("purchases")
        .update({
          refunded_at: nowIso,
          pro: false,
          pro_status: "cancelled",
        })
        .eq("id", proRow.id);
      console.log("[stripe webhook] charge.refunded (Pro+ via customer)", {
        purchaseId: proRow.id,
        email: proRow.email,
      });
      return;
    }
  }

  console.warn(
    "[stripe webhook] charge.refunded — no matching purchase row",
    { paymentIntentId, customerId },
  );
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
