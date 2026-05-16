import type { Kit } from "@/data/kits";

/**
 * Shared serializer used by the public API to render a kit row as JSON.
 * Lives in /lib/ rather than a route handler because Next.js App Router
 * route files only allow HTTP-verb exports.
 */
export function serializeKit(k: Kit) {
  return {
    id: k.id,
    slug: k.slug,
    name: k.name,
    tagline: k.tagline,
    description: k.description,
    price_cents: k.priceCents,
    currency: "cad",
    ai_targets: k.aiTargets,
    personas: k.personas,
    keywords: k.keywords,
    whats_inside: k.whatsInside,
    deliverables: k.deliverables,
  };
}
