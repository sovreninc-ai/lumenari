/**
 * Centralised env access. Throws loudly if a server-side var is missing at
 * runtime — better than a silent `undefined` reaching the SDK.
 */

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function optional(name: string): string | undefined {
  return process.env[name];
}

export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lumenari.io",

  // Server-only — only call the getters from server code.
  // Falls back to the NEXT_PUBLIC_-prefixed versions, since the same values
  // are exposed there for client code and are what's set in Vercel.
  get supabaseUrl() {
    return (
      optional("SUPABASE_URL") ??
      optional("NEXT_PUBLIC_SUPABASE_URL") ??
      required("SUPABASE_URL")
    );
  },
  get supabaseServiceKey() {
    return required("SUPABASE_SERVICE_ROLE_KEY");
  },
  get supabaseAnonKey() {
    return (
      optional("SUPABASE_ANON_KEY") ??
      optional("NEXT_PUBLIC_SUPABASE_ANON_KEY") ??
      required("SUPABASE_ANON_KEY")
    );
  },
  get stripeSecret() {
    return required("STRIPE_SECRET_KEY");
  },
  get stripeWebhookSecret() {
    return required("STRIPE_WEBHOOK_SECRET");
  },
  get anthropicKey() {
    return required("ANTHROPIC_API_KEY");
  },
  get resendKey() {
    return required("RESEND_API_KEY");
  },
  get resendFrom() {
    return optional("RESEND_FROM_EMAIL") ?? "Lumenari <hello@lumenari.io>";
  },
} as const;
