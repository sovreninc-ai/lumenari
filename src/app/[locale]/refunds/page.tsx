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
    title: "Refund Policy — Lumenari",
    description:
      "Lumenari refund policy. 14-day full refund if the kit hasn't been downloaded. Honest, plain-English terms.",
    alternates: { canonical: `${siteUrl()}${localePath}/refunds` },
  };
}

export default async function RefundsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);
  const t = dict.refunds;

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
        <ul>
          <li>{t.s1.b1}</li>
          <li>{t.s1.b2}</li>
          <li>{t.s1.b3}</li>
        </ul>
      </Section>

      <Section title={t.s2.title}>
        <ul>
          <li>{t.s2.b1}</li>
          <li>{t.s2.b2}</li>
          <li>{t.s2.b3}</li>
          <li>{t.s2.b4}</li>
        </ul>
      </Section>

      <Section title={t.s3.title}>
        <ul>
          <li>{t.s3.b1}</li>
          <li>{t.s3.b2}</li>
          <li>{t.s3.b3}</li>
        </ul>
      </Section>

      <Section title={t.s4.title}>
        <p>{t.s4.p1}</p>
      </Section>

      <Section title={t.s5.title}>
        <p>{t.s5.intro}</p>
        <ul>
          <li>{t.s5.b1}</li>
          <li>{t.s5.b2}</li>
          <li>{t.s5.b3}</li>
        </ul>
        <p>{t.s5.outro}</p>
      </Section>

      <Section title={t.s6.title}>
        <p>{t.s6.p1}</p>
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
