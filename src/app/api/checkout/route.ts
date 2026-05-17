import { NextResponse } from "next/server";
import { z } from "zod";
import { stripe, priceIdForKitSlug } from "@/lib/stripe";
import { env } from "@/lib/env";
import { KITS, getBundle } from "@/data/kits";
import { taxCodeForSlug } from "@/lib/stripe/tax-codes";

/**
 * POST /api/checkout
 *
 * Body: { slugs: string[], email?: string }
 * Returns: { url: string }  (Stripe Checkout Session URL)
 *
 * MVP rule: one kit per checkout OR one bundle. We don't try to compose
 * many SKUs in one session — bundles handle that case at a discount.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  slugs: z.array(z.string()).min(1).max(1),
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
  const { slugs, email } = parsed;
  const slug = slugs[0];

  // Validate the slug is a real kit or a real bundle.
  const bundle = getBundle(slug);
  const kit = bundle ? null : KITS.find((k) => k.slug === slug);
  if (!bundle && !kit) {
    return NextResponse.json({ error: "Unknown kit" }, { status: 404 });
  }

  const price = priceIdForKitSlug(slug);
  if (!price) {
    return NextResponse.json(
      {
        error:
          "Stripe price not configured for this kit yet. Set the env var.",
      },
      { status: 503 },
    );
  }

  // For metadata, expand a bundle into its kit slugs so the webhook can
  // record exactly what the buyer gets access to.
  const includedKitSlugs = bundle ? bundle.kitSlugs : [slug];
  const slugCsv = includedKitSlugs.join(",");

  try {
    const taxCode = taxCodeForSlug(slug);
    void taxCode; // Tax code is set on the Stripe Product, not the line item;
    // we attach it via Product metadata in the dashboard so it persists across
    // sessions. `automatic_tax` below is what actually enables tax calc.
    const automaticTax = process.env.STRIPE_AUTOMATIC_TAX === "true";
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      line_items: [{ price, quantity: 1 }],
      customer_email: email,
      allow_promotion_codes: true,
      automatic_tax: { enabled: automaticTax },
      ...(automaticTax ? { tax_id_collection: { enabled: true } } : {}),
      billing_address_collection: "required",
      success_url: `${env.siteUrl}/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.siteUrl}/kits/${slug}?canceled=1`,
      metadata: {
        kit_slugs: slugCsv,
        bundle_slug: bundle ? bundle.slug : "",
        is_bundle: bundle ? "true" : "false",
        lumenari_tax_code: taxCodeForSlug(slug),
      },
      payment_intent_data: {
        metadata: {
          kit_slugs: slugCsv,
          bundle_slug: bundle ? bundle.slug : "",
        },
      },
    });

    if (!session.url) {
      throw new Error("Stripe returned a session without a URL");
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] stripe error:", err);
    return NextResponse.json(
      { error: "Could not create checkout session" },
      { status: 500 },
    );
  }
}
