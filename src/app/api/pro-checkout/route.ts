import { NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { proPriceIdForTier, type ProTier } from "@/data/subscription-tiers";

/**
 * POST /api/pro-checkout
 *
 * Body: { tier: "monthly" | "annual" | "lifetime", email?: string }
 * Returns: { url: string }
 *
 * monthly + annual create a Stripe subscription (`mode: "subscription"`).
 * lifetime creates a one-time payment (`mode: "payment"`).
 *
 * The webhook handler keys off the metadata + the Stripe event type to
 * flip `purchases.pro` for the buyer's email.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  tier: z.enum(["monthly", "annual", "lifetime"]),
  email: z.string().email().optional(),
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

  const { tier, email } = parsed;
  const price = proPriceIdForTier(tier);
  if (!price) {
    return NextResponse.json(
      {
        error: `Stripe price not configured for Pro+ ${tier}. Set the env var.`,
      },
      { status: 503 },
    );
  }

  const mode: "subscription" | "payment" =
    tier === "lifetime" ? "payment" : "subscription";

  try {
    const session = await stripe().checkout.sessions.create({
      mode,
      line_items: [{ price, quantity: 1 }],
      currency: "cad",
      customer_email: email,
      allow_promotion_codes: true,
      automatic_tax: { enabled: true },
      tax_id_collection: { enabled: true },
      billing_address_collection: "required",
      success_url: `${env.siteUrl}/thanks?session_id={CHECKOUT_SESSION_ID}&pro=1`,
      cancel_url: `${env.siteUrl}/pro?canceled=1`,
      metadata: proMetadata(tier),
      // Mirror metadata onto the subscription / payment_intent so it survives
      // into the events we care about (customer.subscription.created etc.).
      ...(mode === "subscription"
        ? { subscription_data: { metadata: proMetadata(tier) } }
        : { payment_intent_data: { metadata: proMetadata(tier) } }),
    });

    if (!session.url) {
      throw new Error("Stripe returned a session without a URL");
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[pro-checkout] stripe error:", err);
    return NextResponse.json(
      { error: "Could not create checkout session" },
      { status: 500 },
    );
  }
}

function proMetadata(tier: ProTier): Record<string, string> {
  return {
    product: "pro_plus",
    pro_tier: tier,
  };
}
