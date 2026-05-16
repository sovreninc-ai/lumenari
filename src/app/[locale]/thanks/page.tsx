import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
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

export default function ThanksPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-[var(--accent-strong)]" />
      <span className="eyebrow">You&apos;re in</span>
      <h1 className="display text-4xl sm:text-5xl mt-3 mb-5">
        Your kit is on its way.
      </h1>
      <p className="text-lg text-[var(--muted)] mb-10">
        We just emailed your receipt and a download link. Open it on the
        machine you&apos;ll be using the kit on.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link href="/library" className="btn-primary">
          Open library
        </Link>
        <Link href="/kits" className="btn-ghost">
          Browse more kits
        </Link>
      </div>
    </div>
  );
}
