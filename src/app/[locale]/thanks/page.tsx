import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { thanksMetadata } from "@/lib/seo";
import { stripe } from "@/lib/stripe";
import {
  fulfillCheckoutSession,
  type FulfillmentResult,
} from "@/lib/checkout-fulfillment";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  return thanksMetadata(safeLocale);
}

/**
 * /thanks — post-checkout landing page.
 *
 * Stripe redirects here with `?session_id={CHECKOUT_SESSION_ID}` (and
 * `&pro=1` for Pro+ checkouts). The Stripe webhook normally fulfills the
 * purchase, but webhook delivery has been unreliable in test mode and
 * customers were landing here without a kit email. This page is the
 * fallback fulfillment path:
 *
 *   1. Retrieve the Checkout Session server-side
 *   2. If `payment_status === "paid"` (one-off) or the subscription is
 *      active (Pro+), call the SAME fulfillment code the webhook uses
 *   3. The DB has UNIQUE constraints on `stripe_session_id` and
 *      `stripe_subscription_id`, plus pre-insert SELECTs, so when the
 *      webhook does eventually fire there are no duplicates and no
 *      duplicate emails.
 */
export default async function ThanksPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string; pro?: string }>;
}) {
  const { locale } = await params;
  const { session_id: sessionId } = await searchParams;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);
  const t = dict.thanksPage;

  // Try to fulfill from the session id. We swallow errors and fall back to
  // the generic success message — the webhook is a backstop, and we don't
  // want to block the post-checkout UX on a transient API hiccup.
  let result: FulfillmentResult | null = null;
  let unpaid = false;

  if (sessionId) {
    try {
      const session = await stripe().checkout.sessions.retrieve(sessionId);

      // For subscriptions Stripe sets payment_status === "no_payment_required"
      // when the first invoice is still being finalised. Treat the
      // subscription path as fulfillable whenever we're in subscription mode
      // (the shared lib re-checks the subscription status).
      const paid = session.payment_status === "paid";
      const subscription = session.mode === "subscription";

      if (paid || subscription) {
        result = await fulfillCheckoutSession(session);
      } else {
        unpaid = true;
      }
    } catch (err) {
      console.error("[/thanks] fulfillment failed:", err);
      // Fall through to the generic success message.
    }
  }

  const confirmation = renderConfirmation(result, unpaid, t);

  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-[var(--accent-strong)]" />
      <span className="eyebrow">{t.eyebrow}</span>
      <h1 className="display text-4xl sm:text-5xl mt-3 mb-5">{t.title}</h1>
      <p className="text-lg text-[var(--muted)] mb-6">{t.body}</p>
      {confirmation ? (
        <p
          className="text-sm text-[var(--muted)] mb-10 max-w-md mx-auto"
          data-testid="thanks-confirmation"
        >
          {confirmation}
        </p>
      ) : (
        <div className="mb-10" />
      )}
      <div className="flex items-center justify-center gap-3">
        <Link href="/library" className="btn-primary">
          {t.openLibrary}
        </Link>
        <Link href="/kits" className="btn-ghost">
          {t.browseMore}
        </Link>
      </div>
    </div>
  );
}

function renderConfirmation(
  result: FulfillmentResult | null,
  unpaid: boolean,
  t: ReturnType<typeof getDictionary>["thanksPage"],
): string | null {
  if (unpaid) {
    return t.paymentPending;
  }
  if (!result) return null;
  switch (result.kind) {
    case "kit":
      return t.emailedTo.replace("{email}", result.email);
    case "pro_lifetime":
    case "pro_subscription":
      return t.proWelcomeSentTo.replace("{email}", result.email);
    case "skipped":
      return null;
  }
}
