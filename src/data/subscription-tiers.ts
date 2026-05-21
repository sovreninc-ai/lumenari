/**
 * Lumenari Pro+ subscription definition.
 *
 * One product, three pricing buckets:
 *   - monthly  → Stripe subscription, $39/mo USD
 *   - annual   → Stripe subscription, $199/yr USD (~5 months of monthly)
 *   - lifetime → Stripe one-time payment, $499 USD (~12.5 months of monthly)
 *
 * Stripe price IDs come from env vars so the dashboard remains the source
 * of truth (same convention as kits in `kits.ts`).
 */

export type ProTier = "monthly" | "annual" | "lifetime";

export interface SubscriptionTier {
  id: string;
  name: string;
  monthly_cents: number;
  annual_cents: number;
  lifetime_cents: number;
  stripe_price_monthly_env: string;
  stripe_price_annual_env: string;
  stripe_price_lifetime_env: string;
  features: string[];
}

export const PRO_PLUS: SubscriptionTier = {
  id: "pro-plus",
  name: "Lumenari Pro+",
  monthly_cents: 3900,
  annual_cents: 19900,
  lifetime_cents: 49900,
  stripe_price_monthly_env: "STRIPE_PRICE_PRO_MONTHLY",
  stripe_price_annual_env: "STRIPE_PRICE_PRO_ANNUAL",
  stripe_price_lifetime_env: "STRIPE_PRICE_PRO_LIFETIME",
  features: [
    "All 100+ kits, current and future",
    "Every new kit as released",
    "Early access to upcoming kits",
    "Priority support",
    "Member-only kits (coming soon)",
  ],
};

/**
 * Resolve a Stripe price ID for a given tier. Returns null if the env var
 * isn't set yet (Chris fills these in from the Stripe dashboard before launch).
 */
export function proPriceIdForTier(tier: ProTier): string | null {
  switch (tier) {
    case "monthly":
      return process.env[PRO_PLUS.stripe_price_monthly_env] ?? null;
    case "annual":
      return process.env[PRO_PLUS.stripe_price_annual_env] ?? null;
    case "lifetime":
      return process.env[PRO_PLUS.stripe_price_lifetime_env] ?? null;
  }
}

/** Stripe price ID → tier, for webhook lookups. */
export function tierForPriceId(priceId: string): ProTier | null {
  if (priceId === process.env[PRO_PLUS.stripe_price_monthly_env]) return "monthly";
  if (priceId === process.env[PRO_PLUS.stripe_price_annual_env]) return "annual";
  if (priceId === process.env[PRO_PLUS.stripe_price_lifetime_env]) return "lifetime";
  return null;
}

/** Display helper — what the user is charged for the tier in cents. */
export function priceCentsForTier(tier: ProTier): number {
  switch (tier) {
    case "monthly":
      return PRO_PLUS.monthly_cents;
    case "annual":
      return PRO_PLUS.annual_cents;
    case "lifetime":
      return PRO_PLUS.lifetime_cents;
  }
}

// ====================================================================
// API Platform tiers
// ====================================================================
//
// Mirrors `api_tiers` rows seeded in migration 0005_api_platform.sql.
// Stripe price IDs live in env vars — set them on the Vercel project
// once the products are created in the Stripe dashboard.
//
// Free + Enterprise have no Stripe price ID. Free is the default; the
// account row is auto-provisioned on first email lookup. Enterprise is
// quoted manually — the "Talk to sales" CTA opens an email composer.

export type ApiTier = "free" | "pro" | "business" | "enterprise";

export interface ApiTierConfig {
  id: ApiTier;
  name: string;
  monthly_call_limit: number; // -1 means unlimited
  monthly_price_cents: number;
  stripe_price_env: string | null;
  features: string[];
  cta_label: string;
  display_order: number;
}

export const API_TIERS: Record<ApiTier, ApiTierConfig> = {
  free: {
    id: "free",
    name: "Free",
    monthly_call_limit: 100,
    monthly_price_cents: 0,
    stripe_price_env: null,
    features: [
      "100 calls/month",
      "Personal use only",
      "Community support",
    ],
    cta_label: "Get a key",
    display_order: 0,
  },
  pro: {
    id: "pro",
    name: "Pro",
    monthly_call_limit: 10000,
    monthly_price_cents: 9900,
    stripe_price_env: "STRIPE_PRICE_API_PRO",
    features: [
      "10,000 calls/month",
      "Commercial use",
      "Email support",
      "Branded responses",
    ],
    cta_label: "Start Pro",
    display_order: 1,
  },
  business: {
    id: "business",
    name: "Business",
    monthly_call_limit: 100000,
    monthly_price_cents: 49900,
    stripe_price_env: "STRIPE_PRICE_API_BUSINESS",
    features: [
      "100,000 calls/month",
      "Commercial use",
      "White-label option",
      "Priority support",
      "SLA",
    ],
    cta_label: "Start Business",
    display_order: 2,
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    monthly_call_limit: -1,
    monthly_price_cents: 0,
    stripe_price_env: null,
    features: [
      "Unlimited calls",
      "Dedicated Slack channel",
      "Custom integrations",
      "SLA + uptime guarantees",
      "SOC2 (coming)",
    ],
    cta_label: "Talk to sales",
    display_order: 3,
  },
};

export const API_TIER_LIST: ApiTierConfig[] = Object.values(API_TIERS).sort(
  (a, b) => a.display_order - b.display_order,
);

/** Resolve a Stripe price ID for a given API tier. Returns null if env unset. */
export function apiPriceIdForTier(tier: ApiTier): string | null {
  const env = API_TIERS[tier].stripe_price_env;
  if (!env) return null;
  return process.env[env] ?? null;
}

/** Reverse lookup — Stripe price ID → API tier, for webhook routing. */
export function apiTierForPriceId(priceId: string): ApiTier | null {
  for (const t of API_TIER_LIST) {
    if (!t.stripe_price_env) continue;
    if (process.env[t.stripe_price_env] === priceId) return t.id;
  }
  return null;
}

/** Set of all API-tier price IDs currently configured. */
export function knownApiPriceIds(): Set<string> {
  const out = new Set<string>();
  for (const t of API_TIER_LIST) {
    if (!t.stripe_price_env) continue;
    const id = process.env[t.stripe_price_env];
    if (id) out.add(id);
  }
  return out;
}

export function apiTierPrice(tier: ApiTier): number {
  return API_TIERS[tier].monthly_price_cents;
}
