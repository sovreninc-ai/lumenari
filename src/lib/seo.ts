/**
 * Centralized SEO metadata factory.
 *
 * Every page should import a helper from here in its `generateMetadata()`.
 * Helpers produce a full Next.js `Metadata` object with canonical, hreflang
 * across all 6 locales, OG, Twitter Card, robots directives, and a dynamic
 * OG image URL.
 *
 * The canonical/alternates map intentionally points to the un-prefixed
 * default path for English (the storefront serves `en` at the root) and to
 * `/<locale>/...` for everything else, matching the middleware behavior.
 */

import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/i18n/locales";
import { getKit, getBundle, type Kit, type Bundle, formatUSD } from "@/data/kits";
import { getLocalizedKitMeta } from "@/lib/kit-i18n";

export const SITE_NAME = "Lumenari";
export const TWITTER_HANDLE = process.env.NEXT_PUBLIC_TWITTER_HANDLE ?? "@lumenari";
export const TWITTER_CREATOR =
  process.env.NEXT_PUBLIC_TWITTER_CREATOR ?? "@chrisholwell";

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://lumenari.io";
}

/**
 * Build an absolute URL for a given locale + path.
 *
 * `path` should start with `/` and NOT include the locale segment.
 * For `en` we serve at the root (no locale prefix). For everything else
 * we prefix `/<locale>`.
 */
export function localizedUrl(locale: Locale, path: string): string {
  const base = siteUrl().replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") {
    return `${base}${cleanPath === "/" ? "" : cleanPath}`;
  }
  return `${base}/${locale}${cleanPath === "/" ? "" : cleanPath}`;
}

/**
 * Build the hreflang map for the given path across every locale, plus
 * `x-default` pointing at the English version.
 */
export function hreflangAlternates(
  path: string,
): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of LOCALES) {
    map[l] = localizedUrl(l, path);
  }
  map["x-default"] = localizedUrl("en", path);
  return map;
}

interface BaseMetaInput {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
  authors?: string[];
}

function ogImageUrl(input: { type: "page" | "kit" | "blog"; slug?: string; title?: string }): string {
  const base = siteUrl().replace(/\/$/, "");
  if (input.type === "kit" && input.slug) {
    return `${base}/og/kit/${input.slug}`;
  }
  if (input.type === "blog" && input.slug) {
    return `${base}/og/blog/${input.slug}`;
  }
  const q = input.title ? `?title=${encodeURIComponent(input.title)}` : "";
  return `${base}/og/page${q}`;
}

/**
 * The base builder. Every helper below funnels through this.
 */
export function buildMetadata(input: BaseMetaInput): Metadata {
  const {
    title,
    description,
    path,
    locale,
    keywords,
    ogImage,
    ogType = "website",
    noindex = false,
    publishedTime,
    authors,
  } = input;

  const canonical = localizedUrl(locale, path);
  const languages = hreflangAlternates(path);
  const image =
    ogImage ?? ogImageUrl({ type: "page", title: title.replace(/ · Lumenari$/, "") });

  const md: Metadata = {
    title,
    description,
    keywords,
    metadataBase: new URL(siteUrl()),
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: ogType,
      locale,
      alternateLocale: LOCALES.filter((l) => l !== locale),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors && authors.length > 0 ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: TWITTER_HANDLE,
      creator: TWITTER_CREATOR,
      images: [image],
    },
    robots: noindex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
  };

  return md;
}

// ====================================================================
// Per-page helpers
// ====================================================================

export function homeMetadata(locale: Locale): Metadata {
  return buildMetadata({
    title: "Lumenari — Optimization kits for your AI",
    description:
      "Curated AI skill kits for Claude, ChatGPT, Cursor, and Gemini. Drop-in prompt packs and SKILL.md bundles that make your AI work like a senior teammate.",
    path: "/",
    locale,
    keywords: [
      "claude skills",
      "ai skill kits",
      "claude skill marketplace",
      "skill.md",
      "claude prompts",
      "chatgpt prompts",
      "cursor rules",
      "ai optimization",
      "anthropic skills",
    ],
  });
}

export function kitsIndexMetadata(locale: Locale): Metadata {
  return buildMetadata({
    title: "All kits · Lumenari",
    description:
      "Browse every Lumenari Optimization Pack — curated kits of prompts, skills, and patterns for Claude, ChatGPT, Cursor, and Gemini.",
    path: "/kits",
    locale,
    keywords: [
      "claude skill kits",
      "ai prompt packs",
      "claude marketplace",
      "skill.md bundles",
      "chatgpt prompt library",
    ],
  });
}

export async function kitMetadata(kit: Kit, locale: Locale): Promise<Metadata> {
  const localized = await getLocalizedKitMeta(kit.slug, locale);
  const name = localized?.name || kit.name;
  const tagline = localized?.tagline || kit.tagline;
  const description =
    tagline.length > 155
      ? tagline.slice(0, 152) + "..."
      : `${tagline} ${formatUSD(kit.priceCents)} USD, one-time.`.slice(0, 158);
  return buildMetadata({
    title: `${name} · Lumenari`,
    description,
    path: `/kits/${kit.slug}`,
    locale,
    keywords: [...kit.keywords, "lumenari", "claude skill", "ai prompt pack"],
    ogImage: ogImageUrl({ type: "kit", slug: kit.slug }),
    ogType: "website",
  });
}

export function bundleMetadata(bundle: Bundle, locale: Locale): Metadata {
  return buildMetadata({
    title: `${bundle.name} · Lumenari`,
    description: bundle.tagline,
    path: `/kits/${bundle.slug}`,
    locale,
    keywords: [
      "lumenari bundle",
      "ai skill bundle",
      "claude prompt pack",
      ...bundle.kitSlugs,
    ],
    ogType: "website",
  });
}

export async function kitOrBundleMetadata(
  slug: string,
  locale: Locale,
): Promise<Metadata> {
  const bundle = getBundle(slug);
  if (bundle) return bundleMetadata(bundle, locale);
  const kit = getKit(slug);
  if (kit) return kitMetadata(kit, locale);
  return buildMetadata({
    title: "Kit not found · Lumenari",
    description: "This kit doesn't exist on Lumenari. Browse the full catalog.",
    path: `/kits/${slug}`,
    locale,
    noindex: true,
  });
}

export function proMetadata(locale: Locale): Metadata {
  return buildMetadata({
    title: "Lumenari Pro+ — Every AI skill kit, one subscription",
    description:
      "One Lumenari subscription. Every Claude skill kit, current and future. Early access to new releases. Monthly, annual, or lifetime.",
    path: "/pro",
    locale,
    keywords: [
      "claude skill subscription",
      "ai prompt subscription",
      "lumenari pro",
      "skill.md library",
      "unlimited ai prompts",
    ],
  });
}

export function apiPlatformMetadata(locale: Locale): Metadata {
  return buildMetadata({
    title: "Lumenari API — Embed AI skill recommendations in your product",
    description:
      "Embed Lumenari's recommendation engine. Two lines of code. Free tier with 100 calls/month, Pro and Business for commercial use, Enterprise white-label.",
    path: "/api-platform",
    locale,
    keywords: [
      "ai recommendation api",
      "claude skill api",
      "ai tool discovery api",
      "embed ai recommendations",
      "lumenari api",
    ],
  });
}

export function apiDocsMetadata(locale: Locale): Metadata {
  return buildMetadata({
    title: "API documentation · Lumenari",
    description:
      "Endpoints, authentication, rate limits, and code samples for the Lumenari API. The same engine that powers the storefront wizard.",
    path: "/api-docs",
    locale,
    keywords: ["lumenari api docs", "ai api reference", "recommendation api"],
  });
}

export function libraryMetadata(locale: Locale): Metadata {
  return buildMetadata({
    title: "Library · Lumenari",
    description: "Access your purchased Lumenari kits.",
    path: "/library",
    locale,
    noindex: true,
  });
}

export function cartMetadata(locale: Locale): Metadata {
  return buildMetadata({
    title: "Cart · Lumenari",
    description: "Lumenari uses a streamlined single-step checkout.",
    path: "/cart",
    locale,
    noindex: true,
  });
}

export function thanksMetadata(locale: Locale): Metadata {
  return buildMetadata({
    title: "Thanks · Lumenari",
    description: "Your Lumenari kit is on its way.",
    path: "/thanks",
    locale,
    noindex: true,
  });
}

export function accountMetadata(locale: Locale): Metadata {
  return buildMetadata({
    title: "API account · Lumenari",
    description: "Manage your Lumenari API keys, usage, and subscription.",
    path: "/account/api-keys",
    locale,
    noindex: true,
  });
}

// ====================================================================
// Programmatic SEO helpers
// ====================================================================

export function useCaseLandingMetadata(input: {
  title: string;
  useCaseSlug: string;
  description: string;
  locale: Locale;
}): Metadata {
  return buildMetadata({
    title: `${input.title} · Lumenari`,
    description: input.description,
    path: `/best-claude-skill-for/${input.useCaseSlug}`,
    locale: input.locale,
    keywords: [
      "best claude skill",
      "claude for " + input.useCaseSlug.replace(/-/g, " "),
      "ai for " + input.useCaseSlug.replace(/-/g, " "),
      "claude prompts",
      "skill.md",
    ],
  });
}

export function comparisonMetadata(input: {
  competitorName: string;
  competitorSlug: string;
  description: string;
  locale: Locale;
}): Metadata {
  return buildMetadata({
    title: `Lumenari vs ${input.competitorName} — honest comparison · Lumenari`,
    description: input.description,
    path: `/vs/${input.competitorSlug}`,
    locale: input.locale,
    keywords: [
      `lumenari vs ${input.competitorSlug}`,
      `${input.competitorSlug} alternative`,
      `${input.competitorSlug} comparison`,
      "claude skill marketplace",
    ],
  });
}

export function blogIndexMetadata(locale: Locale): Metadata {
  return buildMetadata({
    title: "Blog · Lumenari",
    description:
      "Tactics, deep-dives, and case studies on getting more out of Claude, ChatGPT, Cursor, and other AI tools.",
    path: "/blog",
    locale,
    keywords: ["claude tips", "ai workflow", "skill.md guides", "claude tutorials"],
  });
}

export function blogPostMetadata(input: {
  title: string;
  description: string;
  slug: string;
  locale: Locale;
  publishedAt: string;
  author: string;
  tags?: string[];
}): Metadata {
  return buildMetadata({
    title: `${input.title} · Lumenari`,
    description: input.description,
    path: `/blog/${input.slug}`,
    locale: input.locale,
    keywords: input.tags,
    ogImage: ogImageUrl({ type: "blog", slug: input.slug }),
    ogType: "article",
    publishedTime: input.publishedAt,
    authors: [input.author],
  });
}

// Re-export helpers some callers may want
export { ogImageUrl };
