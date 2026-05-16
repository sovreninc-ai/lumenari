import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  KITS,
  BUNDLES,
  bundleSavings,
  formatCAD,
} from "@/data/kits";
import { KitCard } from "@/components/KitCard";
import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { kitsIndexMetadata } from "@/lib/seo";

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
  return kitsIndexMetadata(safeLocale);
}

export default async function KitsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);

  const featured = BUNDLES.filter((b) => b.featured);
  const others = BUNDLES.filter((b) => !b.featured);
  // Alphabetical by name, without mutating the source array.
  const sortedKits = [...KITS].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10">
        <span className="eyebrow">{dict.kits.eyebrowShelf}</span>
        <h1 className="display text-4xl sm:text-5xl mt-2 mb-3">
          {dict.kits.catalogTitle}
        </h1>
        <p className="text-[var(--muted)] max-w-xl">
          {dict.kits.catalogSubtitle}
        </p>
      </div>

      <h2 className="eyebrow mb-4">{dict.kits.individualKits}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedKits.map((kit, i) => (
          <KitCard kit={kit} key={kit.slug} index={i} />
        ))}
      </div>

      <h2 className="eyebrow mt-20 mb-4">{dict.kits.featuredBundles}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {featured.map((b) => (
          <BundleCard
            key={b.slug}
            bundleSlug={b.slug}
            seeBundleLabel={dict.kits.seeBundle}
            savesLabel={dict.wizard.saves}
          />
        ))}
      </div>

      {others.length > 0 ? (
        <>
          <h2 className="eyebrow mt-16 mb-4">{dict.kits.moreBundles}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {others.map((b) => (
              <BundleCard
                key={b.slug}
                bundleSlug={b.slug}
                variant="compact"
                seeBundleLabel={dict.kits.seeBundle}
                savesLabel={dict.wizard.saves}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function BundleCard({
  bundleSlug,
  variant = "featured",
  seeBundleLabel,
  savesLabel,
}: {
  bundleSlug: string;
  variant?: "featured" | "compact";
  seeBundleLabel: string;
  savesLabel: string;
}) {
  const bundle = BUNDLES.find((b) => b.slug === bundleSlug);
  if (!bundle) return null;

  const isFeatured = variant === "featured";

  return (
    <div
      className={`rounded-3xl p-[1px] ${isFeatured ? "bg-spectrum" : "bg-[var(--hairline)]"}`}
    >
      <div className="rounded-3xl bg-white p-6 sm:p-7 h-full flex flex-col">
        <span className="eyebrow">Bundle</span>
        <h3 className="display text-xl sm:text-2xl mt-1.5 mb-2">
          {bundle.name}
        </h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
          {bundle.tagline}
        </p>
        <div className="mt-auto pt-4 border-t border-[var(--hairline)] flex items-center justify-between">
          <div>
            <div className="text-xl font-semibold">
              {formatCAD(bundle.priceCents)}
            </div>
            <div className="text-xs text-[var(--muted)]">
              {savesLabel} {formatCAD(bundleSavings(bundle))}
            </div>
          </div>
          <Link
            href={`/kits/${bundle.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium hover:text-[var(--accent-strong)]"
          >
            {seeBundleLabel} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
