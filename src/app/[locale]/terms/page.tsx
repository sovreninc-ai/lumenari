import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { siteUrl } from "@/lib/seo";

const LAST_UPDATED = "2026-05-15";

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
  return {
    title: "Terms of Service — Lumenari",
    description:
      "Lumenari Terms of Service — license, IP, refunds, governing law (Alberta, Canada), and acceptable use.",
    alternates: { canonical: `${siteUrl()}${localePath}/terms` },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);
  const t = dict.terms;

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 prose-lumenari">
      <span className="eyebrow">{t.eyebrow}</span>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-2">{t.title}</h1>
      <p className="text-sm text-[var(--muted)] mb-10">
        {t.lastUpdatedPrefix} {LAST_UPDATED}
      </p>

      {t.legalDisclaimer ? (
        <p className="text-sm text-[var(--muted)] italic mb-6">
          {t.legalDisclaimer}
        </p>
      ) : null}

      <p className="lead">{t.intro}</p>

      <Section title={t.s1.title}>
        <p>{t.s1.p1}</p>
        <p>{t.s1.p2}</p>
      </Section>

      <Section title={t.s2.title}>
        <p>{t.s2.p1}</p>
        <p>{t.s2.p2}</p>
      </Section>

      <Section title={t.s3.title}>
        <p>{t.s3.p1}</p>
      </Section>

      <Section title={t.s4.title}>
        <p>{t.s4.p1}</p>
        <p>{t.s4.p2}</p>
      </Section>

      <Section title={t.s5.title}>
        <p>{t.s5.intro}</p>
        <ul>
          <li>{t.s5.b1}</li>
          <li>{t.s5.b2}</li>
          <li>{t.s5.b3}</li>
          <li>{t.s5.b4}</li>
          <li>{t.s5.b5}</li>
        </ul>
        <p>{t.s5.outro}</p>
      </Section>

      <Section title={t.s6.title}>
        <p>{t.s6.p1}</p>
      </Section>

      <Section title={t.s7.title}>
        <p>{t.s7.p1}</p>
      </Section>

      <Section title={t.s8.title}>
        <p>{t.s8.p1}</p>
      </Section>

      <Section title={t.s9.title}>
        <p>{t.s9.p1}</p>
      </Section>

      <Section title={t.s10.title}>
        <p>{t.s10.p1}</p>
      </Section>

      <Section title={t.s11.title}>
        <p>{t.s11.p1}</p>
      </Section>

      <Section title={t.s12.title}>
        <p>{t.s12.p1}</p>
      </Section>

      <Section title={t.s13.title}>
        <p>{t.s13.p1}</p>
      </Section>

      <Section title={t.s14.title}>
        <p>{t.s14.p1}</p>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="display text-2xl mt-10 mb-3">{title}</h2>
      <div className="space-y-3 leading-relaxed text-[1rem]">{children}</div>
    </section>
  );
}
