import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { thanksMetadata } from "@/lib/seo";

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
  return thanksMetadata(safeLocale);
}

export default async function ThanksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);
  const t = dict.thanksPage;

  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-[var(--accent-strong)]" />
      <span className="eyebrow">{t.eyebrow}</span>
      <h1 className="display text-4xl sm:text-5xl mt-3 mb-5">{t.title}</h1>
      <p className="text-lg text-[var(--muted)] mb-10">{t.body}</p>
      <div className="flex items-center justify-center gap-3">
        <Link href="/library" className="btn-primary">
          {t.openLibrary}
        </Link>
        <Link href="/kits" className="btn-ghost">
          {t.browseMore}
        </Link>
      </div>
    </div>
  );
}
