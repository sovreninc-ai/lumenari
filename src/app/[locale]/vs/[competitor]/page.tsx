import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X, ArrowRight } from "lucide-react";
import { LOCALES, type Locale, isLocale } from "@/i18n/locales";
import { COMPETITORS, getCompetitor } from "@/data/comparisons";
import { comparisonMetadata, siteUrl } from "@/lib/seo";
import {
  JsonLd,
  BreadcrumbListSchema,
  FAQPageSchema,
} from "@/lib/structured-data";

interface PageProps {
  params: Promise<{ locale: string; competitor: string }>;
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    COMPETITORS.map((c) => ({ locale, competitor: c.slug })),
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, competitor } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const c = getCompetitor(competitor);
  if (!c) {
    return comparisonMetadata({
      competitorName: competitor,
      competitorSlug: competitor,
      description:
        "We couldn't find that comparison. Browse the Lumenari catalog.",
      locale: safeLocale,
    });
  }
  return comparisonMetadata({
    competitorName: c.name,
    competitorSlug: c.slug,
    description: c.description,
    locale: safeLocale,
  });
}

export default async function ComparisonPage({ params }: PageProps) {
  const { locale, competitor } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const c = getCompetitor(competitor);
  if (!c) notFound();

  const base = siteUrl();
  const localePath = safeLocale === "en" ? "" : `/${safeLocale}`;

  const breadcrumb = BreadcrumbListSchema([
    { name: "Lumenari", url: `${base}${localePath}/` },
    { name: "Compare", url: `${base}${localePath}/kits` },
    {
      name: `Lumenari vs ${c.name}`,
      url: `${base}${localePath}/vs/${c.slug}`,
    },
  ]);
  const faqSchema = FAQPageSchema(c.faqs);

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <JsonLd schema={[breadcrumb, faqSchema]} />

      <nav className="text-sm text-[var(--muted)] mb-6">
        <Link href="/kits" className="hover:text-[var(--foreground)]">
          All kits
        </Link>
        <span className="mx-2">/</span>
        <span>Lumenari vs {c.name}</span>
      </nav>

      <span className="eyebrow">Honest comparison</span>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-5">
        Lumenari vs {c.name}
      </h1>
      <p className="text-lg text-[var(--muted)] leading-relaxed mb-12 max-w-2xl">
        {c.positioning}
      </p>

      {/* Feature table */}
      <section aria-label="Feature comparison" className="mb-16">
        <div className="rounded-2xl border border-[var(--hairline)] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--surface)]">
              <tr>
                <th className="text-left font-semibold px-4 py-3 w-1/3">
                  Feature
                </th>
                <th className="text-left font-semibold px-4 py-3 w-1/3">
                  Lumenari
                </th>
                <th className="text-left font-semibold px-4 py-3 w-1/3">
                  {c.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-t border-[var(--hairline)] ${i % 2 === 1 ? "bg-[var(--surface)]/50" : ""}`}
                >
                  <td className="px-4 py-3 font-medium">{row.feature}</td>
                  <td className="px-4 py-3">{row.lumenari}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {row.competitor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pros / advantages */}
      <section className="grid md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="display text-2xl mb-5">Where Lumenari wins</h2>
          <ul className="space-y-3">
            {c.lumenariAdvantages.map((adv) => (
              <li key={adv} className="flex items-start gap-2.5">
                <Check className="w-5 h-5 text-[var(--accent-strong)] mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{adv}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="display text-2xl mb-5">Where {c.name} wins</h2>
          <ul className="space-y-3">
            {c.competitorStrengths.map((s) => (
              <li key={s} className="flex items-start gap-2.5">
                <X className="w-5 h-5 text-[var(--muted)] mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed text-[var(--muted)]">
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section aria-label="FAQ" className="mb-14">
        <h2 className="display text-2xl mb-6">Common questions</h2>
        <div className="space-y-6">
          {c.faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold mb-1.5">{f.q}</h3>
              <p className="text-[var(--muted)] leading-relaxed text-[0.97rem]">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-spectrum p-[1px]">
        <div className="rounded-3xl bg-white p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="display text-2xl mb-1">See the catalog yourself.</h2>
            <p className="text-[var(--muted)]">
              20+ kits, 6 bundles, four formats per kit.
            </p>
          </div>
          <Link
            href="/kits"
            className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full bg-[var(--foreground)] text-white font-medium hover:bg-black transition-colors flex-shrink-0"
          >
            Browse all kits <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </article>
  );
}
