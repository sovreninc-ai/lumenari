import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { z } from "zod";
import { stripe, priceIdForKitSlug } from "@/lib/stripe";
import { env } from "@/lib/env";
import { KITS, getBundle } from "@/data/kits";
import { taxCodeForSlug } from "@/lib/stripe/tax-codes";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/locales";

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
  locale: z.string().optional(),
});

/**
 * Stripe Checkout's `locale` enum is fixed and finite. Only a subset of our
 * site locales matches a Stripe-supported value. Anything else (or anything
 * missing) → `"auto"`, which lets Stripe pick from the browser's
 * Accept-Language header. Stripe rejects values it doesn't recognize, so
 * we have to map explicitly.
 */
function stripeLocaleFor(locale: string | undefined): Stripe.Checkout.SessionCreateParams.Locale {
  switch (locale) {
    case "en":
      return "en";
    case "fr":
      return "fr";
    case "es":
      return "es";
    case "pt":
      return "pt";
    case "de":
      return "de";
    case "ja":
      return "ja";
    case "zh-CN":
      // Stripe Checkout uses `zh` (Simplified) — `zh-HK` / `zh-TW` are the
      // Traditional variants we don't currently target.
      return "zh";
    case "hi":
      // Stripe Checkout doesn't support Hindi as of 2026; fall back to
      // browser-detected locale. The translated kit content + receipt email
      // are still served in `hi` — only the Stripe Checkout UI itself
      // (powered by Stripe) reverts.
      return "auto";
    default:
      return "auto";
  }
}

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
  const { slugs, email, locale: rawLocale } = parsed;
  const slug = slugs[0];
  const buyerLocale =
    rawLocale && isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

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
    const localePathPrefix = buyerLocale === DEFAULT_LOCALE ? "" : `/${buyerLocale}`;
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      line_items: [{ price, quantity: 1 }],
      customer_email: email,
      locale: stripeLocaleFor(buyerLocale),
      allow_promotion_codes: true,
      automatic_tax: { enabled: automaticTax },
      ...(automaticTax ? { tax_id_collection: { enabled: true } } : {}),
      billing_address_collection: "required",
      success_url: `${env.siteUrl}${localePathPrefix}/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.siteUrl}${localePathPrefix}/kits/${slug}?canceled=1`,
      metadata: {
        kit_slugs: slugCsv,
        bundle_slug: bundle ? bundle.slug : "",
        is_bundle: bundle ? "true" : "false",
        lumenari_tax_code: taxCodeForSlug(slug),
        buyer_locale: buyerLocale,
      },
      payment_intent_data: {
        metadata: {
          kit_slugs: slugCsv,
          bundle_slug: bundle ? bundle.slug : "",
          buyer_locale: buyerLocale,
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
