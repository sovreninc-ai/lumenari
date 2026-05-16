import Stripe from "stripe";
import { env } from "./env";
import { KITS, BUNDLES, type Kit, type Bundle } from "@/data/kits";

let _stripe: Stripe | null = null;

export function stripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(env.stripeSecret, {
      // Pin the API version so a future SDK bump doesn't silently change
      // webhook payload shapes.
      apiVersion: "2025-02-24.acacia",
    });
  }
  return _stripe;
}

/**
 * Resolve the Stripe Price ID for a given kit OR bundle slug.
 * Chris creates the Stripe products separately and pastes the price IDs
 * into the env vars declared on each kit/bundle (`stripePriceEnv`).
 */
export function priceIdForKitSlug(slug: string): string | null {
  // Check bundles first — same namespace as kit slugs.
  const bundle: Bundle | undefined = BUNDLES.find((b) => b.slug === slug);
  if (bundle) return process.env[bundle.stripePriceEnv] ?? null;

  const kit: Kit | undefined = KITS.find((k) => k.slug === slug);
  if (!kit) return null;
  return process.env[kit.stripePriceEnv] ?? null;
}

export function isBundleSlug(slug: string): boolean {
  return BUNDLES.some((b) => b.slug === slug);
}
