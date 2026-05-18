import { Check } from "lucide-react";
import { PRO_PLUS, type ProTier } from "@/data/subscription-tiers";
import { formatUSD } from "@/data/kits";
import { ProCheckoutButton } from "@/components/ProCheckoutButton";
import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { proMetadata } from "@/lib/seo";
import {
  JsonLd,
  FAQPageSchema,
  BreadcrumbListSchema,
} from "@/lib/structured-data";
import { siteUrl } from "@/lib/seo";

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
  return proMetadata(safeLocale);
}

/**
 * /pro — the Pro+ upgrade page.
 *
 * Apple-clean three-column layout: Monthly / Annual / Lifetime.
 * One primary CTA per column. Honest savings math. No dark patterns.
 */
export default async function ProPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);
  const t = dict.proPage;

  const base = siteUrl();
  const breadcrumb = BreadcrumbListSchema([
    { name: "Lumenari", url: `${base}/` },
    { name: "Pro+", url: `${base}/pro` },
  ]);
  const faqSchema = FAQPageSchema([...t.faq]);
  const annualSavings = `${t.annualSavingsPrefix} ${formatUSD(PRO_PLUS.monthly_cents * 12 - PRO_PLUS.annual_cents)} ${t.annualSavingsSuffix}`;

  const ctaLabel = (tier: ProTier): string => {
    switch (tier) {
      case "monthly":
        return t.ctaMonthly;
      case "annual":
        return t.ctaAnnual;
      case "lifetime":
        return t.ctaLifetime;
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <JsonLd schema={[breadcrumb, faqSchema]} />
      <header className="text-center max-w-3xl mx-auto mb-16">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1 className="display text-4xl sm:text-5xl md:text-6xl mt-3 mb-5">
          {t.headline_a} <br className="hidden sm:inline" />
          <span className="text-spectrum">{t.headline_highlight}</span>
        </h1>
        <p className="text-lg text-[var(--muted)] leading-relaxed">
          {t.subhead}
        </p>
      </header>

      <section
        className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20"
        aria-label="Pricing"
      >
        <PricingCard
          tier="monthly"
          eyebrow={t.monthly}
          price={PRO_PLUS.monthly_cents}
          cadence={t.perMonth}
          subtitle={t.tryItCancel}
          ctaLabel={ctaLabel("monthly")}
        />
        <PricingCard
          tier="annual"
          eyebrow={t.annual}
          price={PRO_PLUS.annual_cents}
          cadence={t.perYear}
          subtitle={annualSavings}
          ctaLabel={ctaLabel("annual")}
          highlight
        />
        <PricingCard
          tier="lifetime"
          eyebrow={t.lifetime}
          price={PRO_PLUS.lifetime_cents}
          cadence={t.once}
          subtitle={t.payOnce}
          ctaLabel={ctaLabel("lifetime")}
        />
      </section>

      <section className="max-w-2xl mx-auto mb-20" aria-label="What's included">
        <h2 className="display text-2xl sm:text-3xl mb-6 text-center">
          {t.whatYouGet}
        </h2>
        <ul className="space-y-4">
          {PRO_PLUS.features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[var(--accent-strong)] mt-0.5 flex-shrink-0" />
              <span className="text-[1.02rem] leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-3xl mx-auto" aria-label="Pro+ vs free">
        <h2 className="display text-2xl sm:text-3xl mb-6 text-center">
          {t.vsFree}
        </h2>
        <div className="rounded-2xl border border-[var(--hairline)] overflow-hidden">
          <ComparisonRow
            label={t.comparison.row1_label}
            free={t.comparison.row1_free}
            pro={t.comparison.row1_pro}
          />
          <ComparisonRow
            label={t.comparison.row2_label}
            free={t.comparison.row2_free}
            pro={t.comparison.row2_pro}
            alt
          />
          <ComparisonRow
            label={t.comparison.row3_label}
            free={t.comparison.row3_free}
            pro={t.comparison.row3_pro}
          />
          <ComparisonRow
            label={t.comparison.row4_label}
            free={t.comparison.row4_free}
            pro={t.comparison.row4_pro}
            alt
          />
          <ComparisonRow
            label={t.comparison.row5_label}
            free={t.comparison.row5_free}
            pro={t.comparison.row5_pro}
          />
        </div>
      </section>

      <section className="max-w-2xl mx-auto mt-24" aria-label="FAQ">
        <h2 className="display text-2xl sm:text-3xl mb-8 text-center">
          {t.faqHeading}
        </h2>
        <div className="space-y-7">
          {t.faq.map((entry) => (
            <Faq key={entry.q} q={entry.q} a={entry.a} />
          ))}
        </div>
      </section>
    </div>
  );
}

interface PricingCardProps {
  tier: ProTier;
  eyebrow: string;
  price: number;
  cadence: string;
  subtitle: string;
  ctaLabel: string;
  highlight?: boolean;
}

function PricingCard({
  tier,
  eyebrow,
  price,
  cadence,
  subtitle,
  ctaLabel,
  highlight,
}: PricingCardProps) {
  const inner = (
    <div className="rounded-3xl bg-white p-7 h-full flex flex-col">
      <span className="eyebrow">{eyebrow}</span>
      <div className="mt-4 mb-1 flex items-baseline gap-2">
        <span className="text-4xl sm:text-5xl font-semibold tracking-tight">
          {formatUSD(price)}
        </span>
        <span className="text-sm text-[var(--muted)]">{cadence}</span>
      </div>
      <p className="text-sm text-[var(--muted)] mb-8">{subtitle}</p>
      <div className="mt-auto">
        <ProCheckoutButton tier={tier} label={ctaLabel} />
      </div>
    </div>
  );

  return (
    <div
      className={`rounded-3xl p-[1px] ${
        highlight ? "bg-spectrum shadow-lg" : "bg-[var(--hairline)]"
      }`}
    >
      {inner}
    </div>
  );
}

function ComparisonRow({
  label,
  free,
  pro,
  alt,
}: {
  label: string;
  free: string;
  pro: string;
  alt?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-3 px-4 sm:px-6 py-4 text-sm ${
        alt ? "bg-[var(--surface)]" : ""
      }`}
    >
      <span className="font-medium">{label}</span>
      <span className="text-[var(--muted)] text-center">{free}</span>
      <span className="text-right font-medium">{pro}</span>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <h3 className="font-semibold mb-1.5">{q}</h3>
      <p className="text-[var(--muted)] leading-relaxed text-[0.95rem]">{a}</p>
    </div>
  );
}

