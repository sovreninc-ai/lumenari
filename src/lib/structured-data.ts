/**
 * JSON-LD structured-data builders.
 *
 * Each function returns a plain JSON-serialisable object. Render it from a
 * server component as:
 *
 *   <script
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
 *   />
 *
 * The helper `<JsonLd schema={...} />` in this file does that for you.
 */

import React from "react";
import { siteUrl, SITE_NAME } from "./seo";
import { formatUSD, type Kit, type Bundle } from "@/data/kits";

type SchemaObject = Record<string, unknown>;

// ====================================================================
// React component to embed a schema block
// ====================================================================

export function JsonLd({
  schema,
}: {
  schema: SchemaObject | SchemaObject[];
}) {
  return React.createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(schema) },
  });
}

// ====================================================================
// Schemas
// ====================================================================

export function OrganizationSchema(): SchemaObject {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: base,
    logo: `${base}/logo.png`,
    sameAs: [
      "https://twitter.com/lumenari",
      "https://github.com/sovren-stack",
    ],
    description:
      "Lumenari sells curated optimization kits for Claude, ChatGPT, Cursor, Gemini and other AI tools.",
  };
}

export function WebSiteSchema(): SchemaObject {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: base,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${base}/kits?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function ProductSchema(kit: Kit): SchemaObject {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: kit.name,
    description: kit.description || kit.tagline,
    sku: kit.id,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    category: "Software / AI Prompts",
    url: `${base}/kits/${kit.slug}`,
    offers: {
      "@type": "Offer",
      price: (kit.priceCents / 100).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${base}/kits/${kit.slug}`,
      priceValidUntil: futureYearEnd(),
    },
  };
}

export function BundleProductSchema(bundle: Bundle): SchemaObject {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: bundle.name,
    description: bundle.tagline,
    sku: bundle.id,
    brand: { "@type": "Brand", name: SITE_NAME },
    category: "Software / AI Prompts / Bundle",
    url: `${base}/kits/${bundle.slug}`,
    offers: {
      "@type": "Offer",
      price: (bundle.priceCents / 100).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${base}/kits/${bundle.slug}`,
      priceValidUntil: futureYearEnd(),
    },
  };
}

export function BreadcrumbListSchema(
  items: Array<{ name: string; url: string }>,
): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function FAQPageSchema(
  faqs: Array<{ q: string; a: string }>,
): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export function BlogPostingSchema(input: {
  title: string;
  description: string;
  slug: string;
  author: string;
  publishedAt: string;
  ogImage?: string;
}): SchemaObject {
  const base = siteUrl();
  const image = input.ogImage ?? `${base}/og/blog/${input.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    image: [image],
    author: {
      "@type": "Person",
      name: input.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${base}/logo.png`,
      },
    },
    datePublished: input.publishedAt,
    dateModified: input.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${base}/blog/${input.slug}`,
    },
  };
}

export function SoftwareApplicationSchema(): SchemaObject {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Lumenari API",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    description:
      "Embed Lumenari's AI skill kit recommendation engine into your product via a simple JSON API.",
    url: `${base}/api-platform`,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      highPrice: "499.00",
      priceCurrency: "USD",
      offerCount: "4",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

// Used by the formatted price/currency display in the product schema —
// no behavioural impact on the page.
export { formatUSD };

function futureYearEnd(): string {
  const now = new Date();
  const year = now.getUTCFullYear() + 1;
  return `${year}-12-31`;
}
