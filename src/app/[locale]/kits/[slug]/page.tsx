import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import {
  KITS,
  BUNDLES,
  getKit,
  getBundle,
  bundleSavings,
  formatUSD,
  type Bundle,
} from "@/data/kits";
import { BuyButton } from "@/components/BuyButton";
import { SaveKitButton } from "@/components/save-kit-button";
import { RecommendedTools } from "@/components/recommended-tools";
import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { kitOrBundleMetadata, siteUrl } from "@/lib/seo";
import { localizeKit } from "@/lib/kit-i18n";
import {
  JsonLd,
  ProductSchema,
  BundleProductSchema,
  BreadcrumbListSchema,
} from "@/lib/structured-data";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const items = [
    ...KITS.map((k) => ({ slug: k.slug })),
    ...BUNDLES.map((b) => ({ slug: b.slug })),
  ];
  return LOCALES.flatMap((locale) =>
    items.map(({ slug }) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  return kitOrBundleMetadata(slug, safeLocale);
}

export default async function KitDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);
  const localePath = safeLocale === "en" ? "" : `/${safeLocale}`;
  const base = siteUrl();

  const bundle = getBundle(slug);
  if (bundle) {
    return (
      <BundlePage
        bundle={bundle}
        locale={safeLocale}
        localePath={localePath}
        base={base}
        dict={dict}
      />
    );
  }

  const rawKit = getKit(slug);
  if (!rawKit) notFound();
  const kit = await localizeKit(rawKit, safeLocale);

  const breadcrumb = BreadcrumbListSchema([
    { name: "Lumenari", url: `${base}${localePath}/` },
    { name: "Kits", url: `${base}${localePath}/kits` },
    { name: kit.name, url: `${base}${localePath}/kits/${kit.slug}` },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd schema={[ProductSchema(kit), breadcrumb]} />
      <Link
        href="/kits"
        className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)] mb-10"
      >
        <ArrowLeft className="w-4 h-4" /> {dict.kitDetail.allKits}
      </Link>

      <span className="eyebrow">{dict.kitDetail.eyebrow}</span>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-4">{kit.name}</h1>
      <p className="text-xl text-[var(--muted)] leading-relaxed mb-8">
        {kit.tagline}
      </p>

      <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)] mb-10">
        <span className="rounded-full bg-[var(--surface)] border border-[var(--hairline)] px-3 py-1.5">
          {dict.kitDetail.optimizedForPrefix} {kit.aiTargets.join(" · ")}
        </span>
        <span className="rounded-full bg-[var(--surface)] border border-[var(--hairline)] px-3 py-1.5">
          {dict.kitDetail.oneTimePrefix} {formatUSD(kit.priceCents)}
        </span>
      </div>

      <p className="text-lg leading-relaxed mb-10">{kit.description}</p>

      <h2 className="display text-2xl mb-5">{dict.kitDetail.whatsInside}</h2>
      <ul className="space-y-3 mb-12">
        {kit.whatsInside.map((b) => (
          <li key={b} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-[var(--accent-strong)] mt-0.5 flex-shrink-0" />
            <span className="text-[1.02rem] leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>

      <h2 className="display text-2xl mb-3">{dict.kitDetail.filesYouReceive}</h2>
      <p className="text-sm text-[var(--muted)] mb-4">
        {dict.kitDetail.filesIntro}
      </p>
      <ul className="space-y-1.5 mb-12 font-mono text-sm text-[var(--muted)]">
        {kit.deliverables.map((d) => (
          <li key={d}>· {d}</li>
        ))}
      </ul>

      <div className="rounded-2xl bg-[var(--surface)] border border-[var(--hairline)] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-2xl font-semibold">{formatUSD(kit.priceCents)}</p>
          <p className="text-sm text-[var(--muted)]">
            {dict.kitDetail.lifetimeAccess}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:w-auto">
          <SaveKitButton kitSlug={kit.slug} kitName={kit.name} />
          <BuyButton
            slugs={[kit.slug]}
            label={`${dict.kitDetail.getKitPrefix} ${kit.name.split(" ")[0]} ${dict.kitDetail.getKitSuffix}`}
            className="sm:w-64"
          />
        </div>
      </div>

      <BundleNudges currentKitSlug={kit.slug} dict={dict} />

      <RecommendedTools kit={kit} dict={dict} />
    </article>
  );
}

async function BundlePage({
  bundle,
  locale,
  localePath,
  base,
  dict,
}: {
  bundle: Bundle;
  locale: Locale;
  localePath: string;
  base: string;
  dict: Dictionary;
}) {
  const total = await Promise.all(
    bundle.kitSlugs
      .map((slug) => getKit(slug))
      .filter((k): k is NonNullable<ReturnType<typeof getKit>> => Boolean(k))
      .map((k) => localizeKit(k, locale)),
  );

  const breadcrumb = BreadcrumbListSchema([
    { name: "Lumenari", url: `${base}${localePath}/` },
    { name: "Kits", url: `${base}${localePath}/kits` },
    { name: bundle.name, url: `${base}${localePath}/kits/${bundle.slug}` },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd schema={[BundleProductSchema(bundle), breadcrumb]} />
      <Link
        href="/kits"
        className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)] mb-10"
      >
        <ArrowLeft className="w-4 h-4" /> {dict.bundleDetail.allKits}
      </Link>

      <span className="eyebrow">{dict.bundleDetail.eyebrow}</span>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-4">{bundle.name}</h1>
      <p className="text-xl text-[var(--muted)] leading-relaxed mb-10">
        {bundle.tagline}
      </p>

      <h2 className="display text-2xl mb-5">{dict.bundleDetail.whatsInside}</h2>
      <ul className="space-y-3 mb-12">
        {total.map((k) => (
          <li
            key={k.slug}
            className="flex items-start gap-3 p-4 rounded-xl border border-[var(--hairline)]"
          >
            <Check className="w-5 h-5 text-[var(--accent-strong)] mt-0.5" />
            <div>
              <p className="font-semibold">{k.name}</p>
              <p className="text-sm text-[var(--muted)]">{k.tagline}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="rounded-3xl p-[1px] bg-spectrum">
        <div className="rounded-3xl bg-white p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-3xl font-semibold">
              {formatUSD(bundle.priceCents)}
            </p>
            <p className="text-sm text-[var(--muted)]">
              {dict.bundleDetail.savesPrefix} {formatUSD(bundleSavings(bundle))}{" "}
              {dict.bundleDetail.savesSuffix}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <SaveKitButton
              kitSlug={bundle.slug}
              kitName={bundle.name}
              source="bundle-detail"
            />
            <BuyButton
              slugs={[bundle.slug]}
              label={dict.bundleDetail.getThisBundle}
              className="sm:w-64"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function BundleNudges({
  currentKitSlug,
  dict,
}: {
  currentKitSlug: string;
  dict: Dictionary;
}) {
  const matchingBundles = BUNDLES.filter((b) =>
    b.kitSlugs.includes(currentKitSlug),
  );
  if (matchingBundles.length === 0) return null;

  // Show the smallest matching bundle as the nudge (operator pack vs all-eleven).
  const nudge = matchingBundles.sort(
    (a, b) => a.kitSlugs.length - b.kitSlugs.length,
  )[0];

  return (
    <div className="mt-12 rounded-2xl border border-dashed border-[var(--hairline)] p-6 text-sm text-[var(--muted)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <span>
        {dict.kitDetail.bundleNudgePrefix}{" "}
        <strong className="text-[var(--foreground)]">{nudge.name}</strong>{" "}
        {dict.kitDetail.bundleNudgeMiddle} {nudge.kitSlugs.length}{" "}
        {dict.kitDetail.bundleNudgeKitsFor}{" "}
        <strong className="text-[var(--foreground)]">
          {formatUSD(nudge.priceCents)}
        </strong>{" "}
        {dict.kitDetail.bundleNudgeSaves}
        {formatUSD(bundleSavings(nudge))}
        {dict.kitDetail.bundleNudgeSavesClose}
      </span>
      <Link
        href={`/kits/${nudge.slug}`}
        className="font-medium hover:text-[var(--foreground)] whitespace-nowrap"
      >
        {dict.kitDetail.seeBundle}
      </Link>
    </div>
  );
}
