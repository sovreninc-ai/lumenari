import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { LOCALES, type Locale, isLocale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { allBlogSlugs, getBlogPost } from "@/lib/blog";
import { getKit, formatCAD } from "@/data/kits";
import { blogPostMetadata, siteUrl } from "@/lib/seo";
import {
  JsonLd,
  BlogPostingSchema,
  BreadcrumbListSchema,
} from "@/lib/structured-data";
import { BuyButton } from "@/components/BuyButton";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    allBlogSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const post = await getBlogPost(slug);
  if (!post) {
    return blogPostMetadata({
      title: "Post not found",
      description: "This blog post isn't on Lumenari.",
      slug,
      locale: safeLocale,
      publishedAt: new Date().toISOString(),
      author: "Lumenari",
    });
  }
  return blogPostMetadata({
    title: post.title,
    description: post.description,
    slug: post.slug,
    locale: safeLocale,
    publishedAt: new Date(post.publishedAt).toISOString(),
    author: post.author,
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);
  const t = dict.blog;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const kit = getKit(post.primaryKitSlug);
  const base = siteUrl();
  const localePath = safeLocale === "en" ? "" : `/${safeLocale}`;
  const dateLocale = safeLocale === "en" ? "en-CA" : safeLocale;

  const postSchema = BlogPostingSchema({
    title: post.title,
    description: post.description,
    slug: post.slug,
    author: post.author,
    publishedAt: new Date(post.publishedAt).toISOString(),
  });
  const breadcrumb = BreadcrumbListSchema([
    { name: "Lumenari", url: `${base}${localePath}/` },
    { name: t.eyebrow, url: `${base}${localePath}/blog` },
    { name: post.title, url: `${base}${localePath}/blog/${post.slug}` },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd schema={[postSchema, breadcrumb]} />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)] mb-10"
      >
        <ArrowLeft className="w-4 h-4" /> {t.allPosts}
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-3 text-xs text-[var(--muted)] mb-3 uppercase tracking-wider">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString(dateLocale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>·</span>
          <span>{post.author}</span>
        </div>
        <h1 className="display text-4xl sm:text-5xl leading-tight mb-5">
          {post.title}
        </h1>
        <p className="text-lg text-[var(--muted)] leading-relaxed">
          {post.description}
        </p>
      </header>

      {/* Intro */}
      <div className="prose-lumenari mb-10 space-y-5 text-[1.05rem] leading-relaxed">
        {post.intro.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Body sections */}
      <div className="space-y-12 mb-12">
        {post.body.map((section) => (
          <section key={section.heading}>
            <h2 className="display text-2xl sm:text-3xl mb-5">
              {section.heading}
            </h2>
            <div className="space-y-5 text-[1.05rem] leading-relaxed">
              {section.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Outro */}
      <div className="space-y-5 text-[1.05rem] leading-relaxed mb-12">
        {post.outro.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Internal kit link CTA */}
      {kit ? (
        <aside className="rounded-3xl bg-spectrum p-[1px] mb-12">
          <div className="rounded-3xl bg-white p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="min-w-0">
              <span className="eyebrow">{t.featuredInPostEyebrow}</span>
              <h3 className="display text-xl sm:text-2xl mt-1.5 mb-1">
                {kit.name}
              </h3>
              <p className="text-[var(--muted)] text-sm">{kit.tagline}</p>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <div className="text-xl font-semibold">
                {formatCAD(kit.priceCents)}
              </div>
              <BuyButton
                slugs={[kit.slug]}
                label={t.getThisKit}
                className="w-44"
              />
            </div>
          </div>
        </aside>
      ) : null}
    </article>
  );
}
