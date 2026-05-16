import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
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
  await params;
  const kit = getKit(FREE_KIT_SLUG);

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
      <span className="eyebrow">Free kit</span>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-5">
        A free AI kit for your job search.
      </h1>
      <p className="text-lg text-[var(--muted)] leading-relaxed mb-10 max-w-2xl">
        Drop-in prompts, a SKILL.md for Claude, an optimization pack for
        ChatGPT, and a Custom GPT instruction file — all in one download.
        Tailored résumés, outreach that lands, interview prep that doesn&apos;t
        sound rehearsed.
      </p>

      <div className="rounded-3xl border border-[var(--hairline)] bg-white p-7 sm:p-9 mb-12">
        <LeadMagnetClaimForm kitSlug={FREE_KIT_SLUG} />
      </div>

      <h2 className="display text-2xl mb-5">What&apos;s inside</h2>
      <ul className="space-y-3 mb-12">
        {(kit?.whatsInside ?? defaultWhatsInside()).map((b) => (
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

      <h2 className="display text-2xl mb-3">How it works</h2>
      <ol className="space-y-3 mb-10 list-decimal pl-5 text-[var(--muted)]">
        <li>Enter your email. The kit lands in your inbox within a minute.</li>
        <li>Drag the SKILL.md into a Claude project, or paste the optimization pack into ChatGPT.</li>
        <li>Run any of the included prompts. Adjust to your situation. Send.</li>
      </ol>

      <p className="text-sm text-[var(--muted)]">
        Over the next week you&apos;ll get a few short notes from Chris (the
        founder) — what to do with the kit, how the SKILL.md format works, and
        a couple of examples from real users. Unsubscribe anytime.
      </p>
    </div>
  );
}

function defaultWhatsInside(): string[] {
  return [
    "Résumé tailoring prompts that survive ATS filters",
    "Cold-outreach templates for hiring managers + recruiters",
    "Interview prep — STAR stories, common questions, salary talk",
    "Follow-up + thank-you note patterns",
    "A Custom GPT prompt you can paste into ChatGPT today",
  ];
}
