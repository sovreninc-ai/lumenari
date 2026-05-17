import { Wizard } from "@/components/Wizard";
import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { siteUrl } from "@/lib/seo";

/**
 * /[locale]/wizard — the original open-textarea recommender, preserved
 * so the A/B test against the chip-driven onboarding funnel can measure
 * conversion lift before we retire one of the two.
 *
 * The chip funnel lives on the homepage at /. This wizard is the control.
 * Both call the same /api/recommend endpoint.
 */

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
  const localePath = safeLocale === "en" ? "" : `/${safeLocale}`;
  const dict = getDictionary(safeLocale);
  return {
    title: dict.wizardPage.titleTag,
    description: dict.wizardPage.descTag,
    alternates: { canonical: `${siteUrl()}${localePath}/wizard` },
    robots: "noindex, follow",
  };
}

export default async function WizardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);

  return (
    <div className="mx-auto max-w-4xl px-6 pt-12">
      <div className="text-center mb-2">
        <span className="eyebrow">{dict.wizardClassic.eyebrow}</span>
      </div>
      <Wizard />
    </div>
  );
}
