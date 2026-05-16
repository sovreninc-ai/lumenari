/**
 * Stripe tax-code resolver.
 *
 * Maps every product Lumenari sells to a Stripe tax_code so `automatic_tax`
 * can compute VAT/GST/sales tax correctly per jurisdiction.
 *
 * Reference: https://stripe.com/docs/tax/tax-codes
 *
 *   - txcd_10501000 — Digital goods (downloadable software/content)
 *   - txcd_10103001 — Software as a service (subscription)
 *
 * Every Lumenari kit is a one-time digital download. Pro+ monthly + annual
 * are software subscriptions. Pro+ lifetime is a one-time payment for
 * a digital good. API platform tiers are SaaS subscriptions.
 *
 * The resolver also returns a sensible product_data payload for use inline
 * in `checkout.sessions.create()` — saves the caller from re-importing this
 * module twice.
 */

import { KITS, BUNDLES } from "@/data/kits";

export const STRIPE_TAX_CODE_DIGITAL_GOODS = "txcd_10501000";
export const STRIPE_TAX_CODE_SAAS = "txcd_10103001";

export type LumenariProductKind =
  | "kit"
  | "bundle"
  | "pro-plus-monthly"
  | "pro-plus-annual"
  | "pro-plus-lifetime"
  | "api-tier";

/** Resolve a kit/bundle slug → Stripe tax code. */
export function taxCodeForSlug(slug: string): string {
  if (KITS.some((k) => k.slug === slug)) return STRIPE_TAX_CODE_DIGITAL_GOODS;
  if (BUNDLES.some((b) => b.slug === slug)) return STRIPE_TAX_CODE_DIGITAL_GOODS;
  return STRIPE_TAX_CODE_DIGITAL_GOODS;
}

/** Resolve a known product kind → Stripe tax code. */
export function taxCodeForKind(kind: LumenariProductKind): string {
  switch (kind) {
    case "kit":
    case "bundle":
    case "pro-plus-lifetime":
      return STRIPE_TAX_CODE_DIGITAL_GOODS;
    case "pro-plus-monthly":
    case "pro-plus-annual":
    case "api-tier":
      return STRIPE_TAX_CODE_SAAS;
  }
}
