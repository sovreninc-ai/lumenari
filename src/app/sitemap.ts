import type { MetadataRoute } from "next";
import { LOCALES, type Locale } from "@/i18n/locales";
import { KITS, BUNDLES } from "@/data/kits";
import { USE_CASES } from "@/data/use-cases";
import { COMPETITORS } from "@/data/comparisons";
import { allBlogSlugs } from "@/lib/blog";
import { localizedUrl, hreflangAlternates } from "@/lib/seo";

/**
 * Dynamic sitemap. Includes:
 *   - Homepage + /kits index + /pro + /api-platform + /api-docs + /blog
 *   - Every kit + bundle detail page
 *   - Every use-case landing
 *   - Every comparison page
 *   - Every blog post
 *
 * For each entry we emit one row per supported locale and include the
 * full hreflang map on the entry's `alternates.languages`.
 */

type Entry = MetadataRoute.Sitemap[number];

function entryFor(path: string, locale: Locale, opts?: {
  priority?: number;
  changeFrequency?: Entry["changeFrequency"];
  lastModified?: string | Date;
}): Entry {
  return {
    url: localizedUrl(locale, path),
    lastModified: opts?.lastModified ?? new Date(),
    changeFrequency: opts?.changeFrequency ?? "weekly",
    priority: opts?.priority ?? 0.7,
    alternates: {
      languages: hreflangAlternates(path),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [];

  const staticPaths: Array<{
    path: string;
    priority: number;
    changeFrequency: Entry["changeFrequency"];
  }> = [
    { path: "/", priority: 1.0, changeFrequency: "daily" },
    { path: "/kits", priority: 0.9, changeFrequency: "weekly" },
    { path: "/pro", priority: 0.8, changeFrequency: "weekly" },
    { path: "/api-platform", priority: 0.8, changeFrequency: "monthly" },
    { path: "/api-docs", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  ];

  for (const { path, priority, changeFrequency } of staticPaths) {
    for (const locale of LOCALES) {
      entries.push(entryFor(path, locale, { priority, changeFrequency }));
    }
  }

  // Kit detail pages
  for (const kit of KITS) {
    for (const locale of LOCALES) {
      entries.push(
        entryFor(`/kits/${kit.slug}`, locale, {
          priority: 0.85,
          changeFrequency: "weekly",
        }),
      );
    }
  }

  // Bundle detail pages
  for (const bundle of BUNDLES) {
    for (const locale of LOCALES) {
      entries.push(
        entryFor(`/kits/${bundle.slug}`, locale, {
          priority: 0.85,
          changeFrequency: "weekly",
        }),
      );
    }
  }

  // Use-case landing pages (programmatic SEO)
  for (const u of USE_CASES) {
    for (const locale of LOCALES) {
      entries.push(
        entryFor(`/best-claude-skill-for/${u.slug}`, locale, {
          priority: 0.6,
          changeFrequency: "monthly",
        }),
      );
    }
  }

  // Comparison pages
  for (const c of COMPETITORS) {
    for (const locale of LOCALES) {
      entries.push(
        entryFor(`/vs/${c.slug}`, locale, {
          priority: 0.6,
          changeFrequency: "monthly",
        }),
      );
    }
  }

  // Blog posts
  for (const slug of allBlogSlugs()) {
    for (const locale of LOCALES) {
      entries.push(
        entryFor(`/blog/${slug}`, locale, {
          priority: 0.7,
          changeFrequency: "monthly",
        }),
      );
    }
  }

  return entries;
}
