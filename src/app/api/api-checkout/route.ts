import { NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { supabaseService } from "@/lib/supabase";
import { apiPriceIdForTier, type ApiTier } from "@/data/subscription-tiers";

/**
 * POST /api/api-checkout
 *
 * Body: { tier: "pro" | "business", email, organization_name? }
 * Returns: { url: string }
 *
 * Creates a Stripe Checkout Session in subscription mode for the requested
 * API tier. We provision the api_accounts row up front so the webhook can
 * upsert by email later. Metadata marks the session as an API platform
 * purchase (product = "api_platform") so the webhook routes it correctly.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  tier: z.enum(["pro", "business"]),
  email: z.string().email(),
  organization_name: z.string().max(120).optional(),
});

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
  const { tier, email, organization_name } = parsed;

  const price = apiPriceIdForTier(tier as ApiTier);
  if (!price) {
    return NextResponse.json(
      {
        error: `Stripe price not configured for API ${tier}. Set the env var.`,
      },
      { status: 503 },
    );
  }

  // Ensure an api_accounts row exists so the magic-link email after checkout
  // points at a real id. Idempotent on the unique email column.
  const db = supabaseService();
  const lowerEmail = email.toLowerCase().trim();
  const { data: existing } = await db
    .from("api_accounts")
    .select("id, stripe_customer_id")
    .ilike("email", lowerEmail)
    .maybeSingle();

  let accountId: string;
  if (existing) {
    accountId = existing.id as string;
    if (organization_name) {
      await db
        .from("api_accounts")
        .update({ organization_name })
        .eq("id", accountId);
    }
  } else {
    const { data: inserted, error: insErr } = await db
      .from("api_accounts")
      .insert({
        email: lowerEmail,
        organization_name: organization_name ?? null,
        tier_id: "free", // gets upgraded by the webhook on subscription.created
      })
      .select("id")
      .single();
    if (insErr) {
      console.error("[api-checkout] account insert failed:", insErr);
      return NextResponse.json(
        { error: "Could not provision account" },
        { status: 500 },
      );
    }
    accountId = inserted.id as string;
  }

  const metadata: Record<string, string> = {
    product: "api_platform",
    api_tier: tier,
    api_account_id: accountId,
  };

  try {
    const automaticTax = process.env.STRIPE_AUTOMATIC_TAX === "true";
    const session = await stripe().checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      customer_email: email,
      allow_promotion_codes: true,
      automatic_tax: { enabled: automaticTax },
      ...(automaticTax ? { tax_id_collection: { enabled: true } } : {}),
      billing_address_collection: "required",
      success_url: `${env.siteUrl}/account/api-keys?session_id={CHECKOUT_SESSION_ID}&welcome=1`,
      cancel_url: `${env.siteUrl}/api-platform?canceled=1`,
      metadata,
      subscription_data: { metadata },
    });

    if (!session.url) {
      throw new Error("Stripe returned a session without a URL");
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[api-checkout] stripe error:", err);
    return NextResponse.json(
      { error: "Could not create checkout session" },
      { status: 500 },
    );
  }
}
