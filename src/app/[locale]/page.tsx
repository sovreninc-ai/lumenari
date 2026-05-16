import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OnboardingFunnel } from "@/components/onboarding-funnel";
import { KITS } from "@/data/kits";
import { KitCard } from "@/components/KitCard";
import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { homeMetadata } from "@/lib/seo";

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
  return homeMetadata(safeLocale);
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);

  return (
    <>
      <Hero dict={dict} />
      <OnboardingFunnel />
      <FeaturedCatalog dict={dict} />
    </>
  );
}

function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, var(--sun) 0%, transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-4xl px-6 pt-16 sm:pt-24 pb-12 text-center">
        <div className="inline-flex">
          <Image
            src="/logo-mark.png"
            alt="Lumenari"
            width={160}
            height={160}
            priority
            className="rounded-full"
          />
        </div>
        <h1 className="display text-5xl sm:text-6xl md:text-7xl mt-8 mb-6">
          {dict.hero.headline_a} <br className="hidden sm:inline" />
          {dict.hero.headline_b}{" "}
          <span className="text-spectrum">{dict.hero.headline_highlight}</span>
        </h1>
        <p className="text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          {dict.hero.subhead}
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <Link href="#wizard" className="btn-primary">
            {dict.hero.ctaPrimary}
          </Link>
          <Link href="/kits" className="btn-ghost">
            {dict.hero.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedCatalog({ dict }: { dict: Dictionary }) {
  // Alphabetical by name, without mutating the source array.
  const sortedKits = [...KITS].sort((a, b) => a.name.localeCompare(b.name));
  const heading = dict.home.launchShelfHeading.replace(
    "{count}",
    String(KITS.length),
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 border-t border-[var(--hairline)]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="eyebrow">{dict.home.launchShelfEyebrow}</span>
          <h2 className="display text-3xl sm:text-4xl mt-2">{heading}</h2>
        </div>
        <Link
          href="/kits"
          className="text-sm font-medium hover:text-[var(--accent-strong)]"
        >
          {dict.home.seeAllKits} →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedKits.map((kit, i) => (
          <KitCard kit={kit} key={kit.slug} index={i} />
        ))}
      </div>
    </section>
  );
}
