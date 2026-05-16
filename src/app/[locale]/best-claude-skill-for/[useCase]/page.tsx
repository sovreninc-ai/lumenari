import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { LOCALES, type Locale, isLocale } from "@/i18n/locales";
import { USE_CASES, getUseCase } from "@/data/use-cases";
import { getKit, formatCAD, type Kit } from "@/data/kits";
import { BuyButton } from "@/components/BuyButton";
import { useCaseLandingMetadata, siteUrl } from "@/lib/seo";
import {
  JsonLd,
  FAQPageSchema,
  BreadcrumbListSchema,
  ProductSchema,
} from "@/lib/structured-data";

interface PageProps {
  params: Promise<{ locale: string; useCase: string }>;
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    USE_CASES.map((u) => ({ locale, useCase: u.slug })),
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, useCase } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const u = getUseCase(useCase);
  if (!u) {
    return useCaseLandingMetadata({
      title: "Use case not found",
      useCaseSlug: useCase,
      description: "This use case isn't on Lumenari yet. Browse the full catalog.",
      locale: safeLocale,
    });
  }
  return useCaseLandingMetadata({
    title: `The best Claude skill for ${u.title}`,
    useCaseSlug: u.slug,
    description: u.description,
    locale: safeLocale,
  });
}

export default async function UseCaseLandingPage({ params }: PageProps) {
  const { locale, useCase } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const u = getUseCase(useCase);
  if (!u) notFound();

  const primaryKit = getKit(u.primaryKitSlug);
  if (!primaryKit) notFound();

  const secondaryKits: Kit[] = (u.secondaryKitSlugs ?? [])
    .map((slug) => getKit(slug))
    .filter((k): k is Kit => Boolean(k));

  const base = siteUrl();
  const localePath = safeLocale === "en" ? "" : `/${safeLocale}`;

  const breadcrumb = BreadcrumbListSchema([
    { name: "Lumenari", url: `${base}${localePath}/` },
    { name: "Use cases", url: `${base}${localePath}/kits` },
    {
      name: `Best Claude skill for ${u.title}`,
      url: `${base}${localePath}/best-claude-skill-for/${u.slug}`,
    },
  ]);
  const faqSchema = FAQPageSchema(u.faqs);
  const productSchema = ProductSchema(primaryKit);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd schema={[breadcrumb, faqSchema, productSchema]} />

      <nav className="text-sm text-[var(--muted)] mb-6">
        <Link href="/kits" className="hover:text-[var(--foreground)]">
          All kits
        </Link>
        <span className="mx-2">/</span>
        <span>{u.title}</span>
      </nav>

      <span className="eyebrow">Buyer&apos;s guide</span>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-5">
        The best Claude skill for {u.title}
      </h1>

      <div className="text-lg text-[var(--muted)] leading-relaxed mb-10 space-y-4">
        {u.pain.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Recommended kit card */}
      <section
        aria-label="Recommended kit"
        className="rounded-3xl bg-spectrum p-[1px] mb-12"
      >
        <div className="rounded-3xl bg-white p-7">
          <span className="eyebrow">Our pick</span>
          <h2 className="display text-2xl sm:text-3xl mt-2 mb-3">
            {primaryKit.name}
          </h2>
          <p className="text-[var(--muted)] leading-relaxed mb-6">
            {primaryKit.tagline}
          </p>

          <h3 className="font-semibold mb-3">Why this kit</h3>
          <ul className="space-y-2.5 mb-7">
            {primaryKit.whatsInside.slice(0, 4).map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[0.97rem]">
                <Check className="w-4 h-4 text-[var(--accent-strong)] mt-1 flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-[var(--hairline)]">
            <div>
              <div className="text-2xl font-semibold">
                {formatCAD(primaryKit.priceCents)}
              </div>
              <div className="text-sm text-[var(--muted)]">
                One-time, lifetime access.
              </div>
            </div>
            <div className="flex gap-3">
              <BuyButton
                slugs={[primaryKit.slug]}
                label="Get this kit"
                className="sm:w-48"
              />
              <Link
                href={`/kits/${primaryKit.slug}`}
                className="inline-flex items-center justify-center px-5 h-11 rounded-full border border-[var(--hairline)] hover:bg-[var(--surface)] text-sm font-medium"
              >
                See kit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary kits */}
      {secondaryKits.length > 0 ? (
        <section className="mb-14">
          <h2 className="display text-2xl mb-5">Related kits</h2>
          <ul className="space-y-3">
            {secondaryKits.map((k) => (
              <li
                key={k.slug}
                className="rounded-2xl border border-[var(--hairline)] bg-white p-5 flex items-start justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="font-semibold">{k.name}</p>
                  <p className="text-sm text-[var(--muted)]">{k.tagline}</p>
                </div>
                <Link
                  href={`/kits/${k.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium hover:text-[var(--accent-strong)] flex-shrink-0"
                >
                  See <ArrowRight className="w-4 h-4" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* FAQs */}
      <section aria-label="Frequently asked questions" className="mb-14">
        <h2 className="display text-2xl mb-6">Common questions</h2>
        <div className="space-y-6">
          {u.faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold mb-1.5">{f.q}</h3>
              <p className="text-[var(--muted)] leading-relaxed text-[0.97rem]">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison nudge */}
      <section className="rounded-2xl border border-dashed border-[var(--hairline)] p-6 text-sm text-[var(--muted)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span>
          Comparing AI tools for {u.title}? See{" "}
          <Link
            href="/vs/chatgpt-store"
            className="text-[var(--foreground)] underline underline-offset-4"
          >
            Claude vs ChatGPT
          </Link>
          .
        </span>
        <Link
          href="/kits"
          className="font-medium hover:text-[var(--foreground)] whitespace-nowrap"
        >
          Browse all kits →
        </Link>
      </section>
    </article>
  );
}
