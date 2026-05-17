import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { getKit } from "@/data/kits";
import { siteUrl } from "@/lib/seo";
import { LeadMagnetClaimForm } from "@/components/lead-magnet-claim-form";

/**
 * /free — the lead-magnet landing page. Single email-capture field,
 * single CTA. Resume + Job Search Pack is the chosen freebie: highest
 * TAM, lowest WTP, and the kit content already exists at `/content/
 * resume-job-search/`.
 */

const FREE_KIT_SLUG = "resume-job-search";

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
  const url = `${siteUrl()}${localePath}/free`;
  const kit = getKit(FREE_KIT_SLUG);
  const title = "Free AI kit — Resume + Job Search Pack | Lumenari";
  const description =
    kit?.tagline ??
    "A free AI optimization kit for the job market. Drop-in prompts for Claude or ChatGPT — your résumé, your outreach, your interview prep.";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
  };
}

export default async function FreeLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);
  const t = dict.free;
  const kit = getKit(FREE_KIT_SLUG);

  const bullets = kit?.whatsInside ?? t.defaultBullets;

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
      <span className="eyebrow">{t.eyebrow}</span>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-5">{t.title}</h1>
      <p className="text-lg text-[var(--muted)] leading-relaxed mb-10 max-w-2xl">
        {t.intro}
      </p>

      <div className="rounded-3xl border border-[var(--hairline)] bg-white p-7 sm:p-9 mb-12">
        <LeadMagnetClaimForm kitSlug={FREE_KIT_SLUG} />
      </div>

      <h2 className="display text-2xl mb-5">{t.whatsInside}</h2>
      <ul className="space-y-3 mb-12">
        {bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-3 leading-relaxed text-[1.02rem]"
          >
            <span
              aria-hidden
              className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-strong)] flex-shrink-0"
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <h2 className="display text-2xl mb-3">{t.howItWorks}</h2>
      <ol className="space-y-3 mb-10 list-decimal pl-5 text-[var(--muted)]">
        <li>{t.step1}</li>
        <li>{t.step2}</li>
        <li>{t.step3}</li>
      </ol>

      <p className="text-sm text-[var(--muted)]">{t.followup}</p>
    </div>
  );
}
