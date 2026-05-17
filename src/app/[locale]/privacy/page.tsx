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
    title: "Privacy Policy — Lumenari",
    description:
      "Lumenari Privacy Policy — what we collect, why, retention, deletion-right process, third parties (Stripe, Resend, Plausible, Anthropic, Supabase).",
    alternates: { canonical: `${siteUrl()}${localePath}/privacy` },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);
  const t = dict.privacy;

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
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

      <p className="lead leading-relaxed text-[1.05rem]">{t.intro}</p>

      <Section title={t.s1.title}>
        <p>{t.s1.intro}</p>
        <ul>
          <li>{t.s1.b1}</li>
          <li>{t.s1.b2}</li>
          <li>{t.s1.b3}</li>
          <li>{t.s1.b4}</li>
          <li>{t.s1.b5}</li>
          <li>{t.s1.b6}</li>
        </ul>
        <p>{t.s1.outro}</p>
      </Section>

      <Section title={t.s2.title}>
        <ul>
          <li>{t.s2.b1}</li>
          <li>{t.s2.b2}</li>
          <li>{t.s2.b3}</li>
          <li>{t.s2.b4}</li>
          <li>{t.s2.b5}</li>
        </ul>
        <p>{t.s2.outro}</p>
      </Section>

      <Section title={t.s3.title}>
        <p>{t.s3.intro}</p>
        <ul>
          <li>{t.s3.b1}</li>
          <li>{t.s3.b2}</li>
          <li>{t.s3.b3}</li>
          <li>{t.s3.b4}</li>
          <li>{t.s3.b5}</li>
          <li>{t.s3.b6}</li>
        </ul>
      </Section>

      <Section title={t.s4.title}>
        <p>{t.s4.intro}</p>
        <ul>
          <li>{t.s4.b1}</li>
          <li>{t.s4.b2}</li>
          <li>{t.s4.b3}</li>
        </ul>
        <p>{t.s4.outro}</p>
      </Section>

      <Section title={t.s5.title}>
        <ul>
          <li>{t.s5.b1}</li>
          <li>{t.s5.b2}</li>
          <li>{t.s5.b3}</li>
          <li>{t.s5.b4}</li>
          <li>{t.s5.b5}</li>
        </ul>
      </Section>

      <Section title={t.s6.title}>
        <p>{t.s6.intro}</p>
        <ul>
          <li>{t.s6.b1}</li>
          <li>{t.s6.b2}</li>
          <li>{t.s6.b3}</li>
          <li>{t.s6.b4}</li>
          <li>{t.s6.b5}</li>
          <li>{t.s6.b6}</li>
          <li>{t.s6.b7}</li>
        </ul>
        <p>{t.s6.outro}</p>
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
