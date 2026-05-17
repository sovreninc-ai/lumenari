import Link from "next/link";
import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
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
export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);
  const t = dict.cartPage;

  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <span className="eyebrow">{t.eyebrow}</span>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-5">{t.title}</h1>
      <p className="text-lg text-[var(--muted)] mb-10">{t.body}</p>
      <div className="flex items-center justify-center gap-3">
        <Link href="/kits" className="btn-primary">
          {t.browseKits}
        </Link>
        <Link href="/kits/all-eleven" className="btn-ghost">
          {t.seeBundle}
        </Link>
      </div>
    </div>
  );
}
