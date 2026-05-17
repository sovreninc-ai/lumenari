import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LOCALES, type Locale, isLocale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { listBlogPosts } from "@/lib/blog";
import { blogIndexMetadata } from "@/lib/seo";
import { JsonLd, BreadcrumbListSchema } from "@/lib/structured-data";
import { siteUrl } from "@/lib/seo";

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
  return blogIndexMetadata(safeLocale);
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);
  const t = dict.blog;
  const posts = listBlogPosts();

  const base = siteUrl();
  const localePath = safeLocale === "en" ? "" : `/${safeLocale}`;
  const breadcrumb = BreadcrumbListSchema([
    { name: "Lumenari", url: `${base}${localePath}/` },
    { name: t.eyebrow, url: `${base}${localePath}/blog` },
  ]);

  const dateLocale = safeLocale === "en" ? "en-CA" : safeLocale;

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <JsonLd schema={breadcrumb} />
      <span className="eyebrow">{t.eyebrow}</span>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-4">{t.title}</h1>
      <p className="text-lg text-[var(--muted)] mb-12 max-w-xl">{t.subtitle}</p>

      <ul className="space-y-6">
        {posts.map((p) => (
          <li
            key={p.slug}
            className="rounded-2xl border border-[var(--hairline)] bg-white p-6 sm:p-7"
          >
            <Link
              href={`/blog/${p.slug}`}
              className="block group focus:outline-none"
            >
              <div className="flex items-center gap-3 text-xs text-[var(--muted)] mb-2">
                <time dateTime={p.publishedAt}>
                  {new Date(p.publishedAt).toLocaleDateString(dateLocale, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <span>·</span>
                <span>{p.author}</span>
              </div>
              <h2 className="display text-2xl sm:text-3xl mb-2 group-hover:text-[var(--accent-strong)] transition-colors">
                {p.title}
              </h2>
              <p className="text-[var(--muted)] leading-relaxed mb-3">
                {p.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--foreground)]">
                {t.readPost} <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
