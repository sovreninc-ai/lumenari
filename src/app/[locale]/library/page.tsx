import Link from "next/link";
import { Bookmark, Crown, Download, Sparkles } from "lucide-react";
import { LibraryLookup } from "@/components/LibraryLookup";
import { supabaseService } from "@/lib/supabase";
import { KITS, getKit, getBundle, formatCAD, type Kit } from "@/data/kits";
import { env } from "@/lib/env";
import { isLocale, type Locale } from "@/i18n/locales";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { libraryMetadata } from "@/lib/seo";

interface WishlistItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: string | null;
  kind: "kit" | "bundle";
}

async function loadWishlistForEmail(email: string): Promise<WishlistItem[]> {
  const db = supabaseService();
  const { data: lead } = await db
    .from("leads")
    .select("id")
    .ilike("email", email.toLowerCase().trim())
    .maybeSingle();
  if (!lead) return [];
  const { data: rows } = await db
    .from("wishlists")
    .select("id, kit_slug")
    .eq("lead_id", lead.id)
    .order("created_at", { ascending: false });
  type Row = { id: string; kit_slug: string };
  return ((rows as Row[] | null) ?? []).flatMap<WishlistItem>((r) => {
    const kit = getKit(r.kit_slug);
    const bundle = getBundle(r.kit_slug);
    if (!kit && !bundle) return [];
    return [
      {
        id: r.id,
        slug: r.kit_slug,
        name: kit?.name ?? bundle?.name ?? r.kit_slug,
        tagline: kit?.tagline ?? bundle?.tagline ?? "",
        price: kit
          ? formatCAD(kit.priceCents)
          : bundle
            ? formatCAD(bundle.priceCents)
            : null,
        kind: kit ? "kit" : "bundle",
      },
    ];
  });
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  return libraryMetadata(safeLocale);
}

interface LibraryPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ p?: string; t?: string }>;
}

interface PurchaseRow {
  id: string;
  email: string;
  kit_ids: string[];
  access_token: string;
  pro: boolean;
  pro_tier: string | null;
  pro_status: string | null;
}

export default async function LibraryPage({ params, searchParams }: LibraryPageProps) {
  const { locale } = await params;
  const { p, t } = await searchParams;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);

  if (!p || !t) {
    return <LookupView dict={dict} />;
  }

  const purchase = await loadPurchase(p, t);
  if (!purchase) {
    return <LookupView dict={dict} notice={dict.libraryPage.expiredNotice} />;
  }

  const wishlist = await loadWishlistForEmail(purchase.email);
  return <SignedInLibrary purchase={purchase} wishlist={wishlist} dict={dict} />;
}

function LookupView({
  dict,
  notice,
}: {
  dict: Dictionary;
  notice?: string;
}) {
  const t = dict.libraryPage;
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <span className="eyebrow">{t.eyebrow}</span>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-4">{t.welcomeBack}</h1>
      <p className="text-lg text-[var(--muted)] mb-10">{t.enterEmail}</p>
      {notice ? (
        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {notice}
        </div>
      ) : null}
      <LibraryLookup />
    </div>
  );
}

function SignedInLibrary({
  purchase,
  wishlist,
  dict,
}: {
  purchase: PurchaseRow;
  wishlist: WishlistItem[];
  dict: Dictionary;
}) {
  const t = dict.libraryPage;
  const isPro = purchase.pro && purchase.pro_status !== "cancelled";
  // Pro+ → entire catalog. Otherwise → only what they bought.
  const accessibleKits: Kit[] = isPro
    ? KITS
    : KITS.filter((k) => purchase.kit_ids.includes(k.slug));

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="flex items-center justify-between gap-4 mb-2">
        <span className="eyebrow">{t.eyebrow}</span>
        {isPro ? <ProBadge tier={purchase.pro_tier} dict={dict} /> : null}
      </div>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-4">
        {isPro ? t.everythingUnlocked : t.yourKits}
      </h1>
      <p className="text-lg text-[var(--muted)] mb-10">
        {isPro ? t.proSubtitle : t.standardSubtitle}
      </p>

      {!isPro ? (
        <Link
          href="/pro"
          className="mb-10 inline-flex items-center gap-2 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] px-5 py-4 text-sm hover:border-[var(--accent-strong)] transition-colors"
        >
          <Sparkles className="w-4 h-4 text-[var(--accent-strong)]" />
          <span>
            {t.upgradeNudgePrefix} <strong>{t.upgradeNudgeCta}</strong> →
          </span>
        </Link>
      ) : null}

      <ul className="space-y-3">
        {accessibleKits.map((k) => (
          <li
            key={k.slug}
            className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--hairline)] bg-white p-4 sm:p-5"
          >
            <div className="min-w-0">
              <p className="font-semibold truncate">{k.name}</p>
              <p className="text-sm text-[var(--muted)] truncate">{k.tagline}</p>
            </div>
            <a
              href={`${env.siteUrl}/api/download/${k.slug}?p=${purchase.id}&t=${purchase.access_token}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--foreground)] text-white px-4 py-2 text-sm font-medium hover:bg-black transition-colors flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">{t.download}</span>
            </a>
          </li>
        ))}
      </ul>

      {wishlist.length > 0 ? (
        <section className="mt-16">
          <div className="flex items-center gap-2 mb-2">
            <Bookmark className="w-5 h-5 text-[var(--accent-strong)]" />
            <h2 className="display text-2xl">{t.wishlistHeading}</h2>
          </div>
          <p className="text-sm text-[var(--muted)] mb-6">{t.wishlistBody}</p>
          <ul className="space-y-3">
            {wishlist
              .filter(
                (w) => !accessibleKits.some((k) => k.slug === w.slug),
              )
              .map((w) => (
                <li
                  key={w.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-dashed border-[var(--hairline)] bg-white p-4 sm:p-5"
                >
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{w.name}</p>
                    <p className="text-sm text-[var(--muted)] truncate">
                      {w.tagline}
                    </p>
                  </div>
                  <Link
                    href={`/kits/${w.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline)] px-4 py-2 text-sm font-medium hover:bg-[var(--surface)] flex-shrink-0"
                  >
                    {w.price ?? t.wishlistView}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function ProBadge({ tier, dict }: { tier: string | null; dict: Dictionary }) {
  const t = dict.libraryPage;
  const label =
    tier === "lifetime"
      ? t.proBadgeLifetime
      : tier === "annual"
        ? t.proBadgeAnnual
        : t.proBadge;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 text-xs font-semibold">
      <Crown className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

async function loadPurchase(p: string, t: string): Promise<PurchaseRow | null> {
  // Cheap UUID-shape check so we don't hit Postgres for obviously-bad input.
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(p)) {
    return null;
  }

  const db = supabaseService();
  const { data, error } = await db
    .from("purchases")
    .select(
      "id, email, kit_ids, access_token, pro, pro_tier, pro_status",
    )
    .eq("id", p)
    .maybeSingle();

  if (error || !data) return null;
  if (data.access_token !== t) return null;
  return data as PurchaseRow;
}
