import Link from "next/link";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const dynamic = "force-dynamic";

/**
 * `/unsubscribed` — confirmation page rendered after /api/unsubscribe
 * redirects here. Reads `?status=ok|invalid|error&email=...` from the
 * URL so we can render the right message without an extra DB hit.
 */
export default async function UnsubscribedPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string; email?: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);
  const t = dict.unsubscribed;

  const { status } = await searchParams;
  const ok = status === "ok";

  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--surface)] mb-6">
        {ok ? (
          <CheckCircle2 className="w-7 h-7 text-emerald-600" />
        ) : (
          <AlertCircle className="w-7 h-7 text-amber-600" />
        )}
      </div>
      <h1 className="display text-3xl sm:text-4xl mb-4">
        {ok ? t.okTitle : t.errorTitle}
      </h1>
      <p className="text-[var(--muted)] leading-relaxed mb-10">
        {ok ? t.okBody : t.errorBody}
      </p>
      <Link
        href="/"
        className="text-sm font-medium hover:text-[var(--accent-strong)]"
      >
        {t.backHome} →
      </Link>
    </div>
  );
}
