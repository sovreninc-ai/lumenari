import Link from "next/link";
import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { cartMetadata } from "@/lib/seo";

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
  return cartMetadata(safeLocale);
}

/**
 * MVP note: Lumenari skips a multi-item cart in favor of straight-to-
 * Stripe-Checkout per kit. The bundle replaces the "buy multiple" use
 * case. This page is the friendly redirect for anyone who finds /cart.
 */
export default function CartPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <span className="eyebrow">Single-step checkout</span>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-5">
        We skip the cart on purpose.
      </h1>
      <p className="text-lg text-[var(--muted)] mb-10">
        Pick a kit, hit checkout, you&apos;re in the library in under a minute.
        Want more than one kit? Grab a bundle.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link href="/kits" className="btn-primary">
          Browse kits
        </Link>
        <Link href="/kits/all-eleven" className="btn-ghost">
          See the bundle
        </Link>
      </div>
    </div>
  );
}
