import Link from "next/link";
import { Download } from "lucide-react";
import { getKit } from "@/data/kits";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * `/free/download/[slug]` — landing page the welcome email links to.
 * Shows the user a single "Download your kit" button which hits the
 * server route that streams the markdown file.
 *
 * We do this through an intermediate page (instead of linking directly
 * to /api/lead-magnet/download/...) so the inbox link looks like a
 * normal URL, not an API endpoint — better for click-through and less
 * likely to trigger email-client previews that count as the user
 * "downloading" the file before they actually meant to.
 */

const FREE_MAGNET_SLUGS = new Set<string>([
  "resume-job-search",
  "solopreneur-toolkit",
]);

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ lead?: string }>;
}

export default async function FreeDownloadPage({
  params,
  searchParams,
}: PageProps) {
  const { locale, slug } = await params;
  const { lead } = await searchParams;

  if (!FREE_MAGNET_SLUGS.has(slug)) notFound();

  const kit = getKit(slug);
  if (!kit) notFound();

  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);
  const t = dict.freeDownload;

  const leadQuery = lead ? `?lead=${encodeURIComponent(lead)}` : "";
  const downloadHref = `/api/lead-magnet/download/${slug}${leadQuery}`;

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <span className="eyebrow">{t.eyebrow}</span>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-4">{kit.name}</h1>
      <p className="text-lg text-[var(--muted)] mb-10 max-w-xl mx-auto leading-relaxed">
        {kit.tagline}
      </p>
      <a
        href={downloadHref}
        className="btn-primary inline-flex justify-center"
      >
        <Download className="w-4 h-4" />
        {t.downloadLabel}
      </a>
      <p className="text-sm text-[var(--muted)] mt-10">{t.instruction}</p>
      <p className="mt-10">
        <Link
          href="/kits"
          className="text-sm font-medium hover:text-[var(--accent-strong)]"
        >
          {t.browseCatalog}
        </Link>
      </p>
    </div>
  );
}
