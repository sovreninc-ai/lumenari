import { Check } from "lucide-react";
import { PRO_PLUS, type ProTier } from "@/data/subscription-tiers";
import { formatCAD } from "@/data/kits";
import { ProCheckoutButton } from "@/components/ProCheckoutButton";
import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
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

const PRO_FAQS = [
  {
    q: "Do I keep my kits if I cancel?",
    a: "Anything you purchased one-off is yours forever — Pro+ doesn't change that. If you cancel Pro+, you keep access to the kits you'd purchased before subscribing; access to kits you only had via Pro+ ends with your billing period.",
  },
  {
    q: "What counts as a 'new kit'?",
    a: "Every fresh kit we publish to the Lumenari catalog. We're shipping toward 100+ kits — Pro+ members get all of them as they land.",
  },
  {
    q: "Can I switch tiers later?",
    a: "Yes. You can move between monthly and annual in your account. Lifetime is one-time — if you grab it later we'll credit your previous Pro+ subscription against it.",
  },
  {
    q: "What's the refund policy?",
    a: "14-day, no questions asked, on all tiers. Email hello@lumenari.io.",
  },
];

/**
 * /pro — the Pro+ upgrade page.
 *
 * Apple-clean three-column layout: Monthly / Annual / Lifetime.
 * One primary CTA per column. Honest savings math. No dark patterns.
 */
export default function ProPage() {
  const base = siteUrl();
  const breadcrumb = BreadcrumbListSchema([
    { name: "Lumenari", url: `${base}/` },
    { name: "Pro+", url: `${base}/pro` },
  ]);
  const faqSchema = FAQPageSchema(PRO_FAQS);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <JsonLd schema={[breadcrumb, faqSchema]} />
      <header className="text-center max-w-3xl mx-auto mb-16">
        <span className="eyebrow">Lumenari Pro+</span>
        <h1 className="display text-4xl sm:text-5xl md:text-6xl mt-3 mb-5">
          Every kit. Every release. <br className="hidden sm:inline" />
          <span className="text-spectrum">One subscription.</span>
        </h1>
        <p className="text-lg text-[var(--muted)] leading-relaxed">
          Pro+ unlocks the entire Lumenari catalog — including every new kit we
          ship — for the cost of a couple of one-off kits a year.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20" aria-label="Pricing">
        <PricingCard
          tier="monthly"
          eyebrow="Monthly"
          price={PRO_PLUS.monthly_cents}
          cadence="/month"
          subtitle="Try it. Cancel any time."
        />
        <PricingCard
          tier="annual"
          eyebrow="Annual"
          price={PRO_PLUS.annual_cents}
          cadence="/year"
          subtitle={`Save ${formatCAD(PRO_PLUS.monthly_cents * 12 - PRO_PLUS.annual_cents)} vs monthly.`}
          highlight
        />
        <PricingCard
          tier="lifetime"
          eyebrow="Lifetime"
          price={PRO_PLUS.lifetime_cents}
          cadence="once"
          subtitle="Pay once. Yours forever."
        />
      </section>

      <section className="max-w-2xl mx-auto mb-20" aria-label="What's included">
        <h2 className="display text-2xl sm:text-3xl mb-6 text-center">
          What you get
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
          Pro+ vs. one-off kits
        </h2>
        <div className="rounded-2xl border border-[var(--hairline)] overflow-hidden">
          <ComparisonRow
            label="Access to all current kits"
            free="Pay per kit"
            pro="Included"
          />
          <ComparisonRow
            label="Every new kit, automatically"
            free="Pay per kit"
            pro="Included"
            alt
          />
          <ComparisonRow
            label="Early access to upcoming kits"
            free="—"
            pro="Yes"
          />
          <ComparisonRow
            label="Priority support"
            free="Standard"
            pro="Priority"
            alt
          />
          <ComparisonRow
            label="Member-only kits"
            free="—"
            pro="Coming soon"
          />
        </div>
      </section>

      <section className="max-w-2xl mx-auto mt-24" aria-label="FAQ">
        <h2 className="display text-2xl sm:text-3xl mb-8 text-center">
          Common questions
        </h2>
        <div className="space-y-7">
          <Faq
            q="Do I keep my kits if I cancel?"
            a="Anything you purchased one-off is yours forever — Pro+ doesn't change that. If you cancel Pro+, you keep access to the kits you'd purchased before subscribing; access to kits you only had via Pro+ ends with your billing period."
          />
          <Faq
            q="What counts as a 'new kit'?"
            a="Every fresh kit we publish to the Lumenari catalog. We're shipping toward 100+ kits — Pro+ members get all of them as they land."
          />
          <Faq
            q="Can I switch tiers later?"
            a="Yes. You can move between monthly and annual in your account. Lifetime is one-time — if you grab it later we'll credit your previous Pro+ subscription against it."
          />
          <Faq
            q="What's the refund policy?"
            a="14-day, no questions asked, on all tiers. Email hello@lumenari.io."
          />
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
  highlight?: boolean;
}

function PricingCard({
  tier,
  eyebrow,
  price,
  cadence,
  subtitle,
  highlight,
}: PricingCardProps) {
  const inner = (
    <div className="rounded-3xl bg-white p-7 h-full flex flex-col">
      <span className="eyebrow">{eyebrow}</span>
      <div className="mt-4 mb-1 flex items-baseline gap-2">
        <span className="text-4xl sm:text-5xl font-semibold tracking-tight">
          {formatCAD(price)}
        </span>
        <span className="text-sm text-[var(--muted)]">{cadence}</span>
      </div>
      <p className="text-sm text-[var(--muted)] mb-8">{subtitle}</p>
      <div className="mt-auto">
        <ProCheckoutButton tier={tier} label={ctaLabel(tier)} />
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

function ctaLabel(tier: ProTier): string {
  switch (tier) {
    case "monthly":
      return "Start monthly";
    case "annual":
      return "Go annual";
    case "lifetime":
      return "Get lifetime";
  }
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
