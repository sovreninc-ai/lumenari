import Link from "next/link";
import { Copy, Gift } from "lucide-react";
import { LOCALES, type Locale, isLocale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { supabaseService } from "@/lib/supabase";
import { siteUrl } from "@/lib/seo";
import { LibraryLookup } from "@/components/LibraryLookup";
import { ReferralLinkCopy } from "@/components/referral-link-copy";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Your referrals · Lumenari",
  description: "Share Lumenari, earn free kits. Three paid referrals = one free kit.",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ p?: string; t?: string }>;
}

interface PurchaseRow {
  id: string;
  email: string;
  access_token: string;
  referral_code: string | null;
}

interface ReferralRow {
  id: string;
  referred_purchase_id: string;
  credited: boolean;
  created_at: string;
}

interface CreditRow {
  id: string;
  reason: string;
  redeemed_at: string | null;
  created_at: string;
}

export default async function ReferralsPage({ searchParams, params }: PageProps) {
  const { p, t } = await searchParams;
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);
  const r = dict.referralsPage;

  if (!p || !t) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20">
        <span className="eyebrow">{r.eyebrow}</span>
        <h1 className="display text-4xl sm:text-5xl mt-2 mb-4">
          {r.signInTitle}
        </h1>
        <p className="text-lg text-[var(--muted)] mb-10">{r.signInBody}</p>
        <LibraryLookup />
      </div>
    );
  }

  const purchase = await loadPurchase(p, t);
  if (!purchase || !purchase.referral_code) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20">
        <span className="eyebrow">{r.eyebrow}</span>
        <h1 className="display text-4xl sm:text-5xl mt-2 mb-4">
          {r.expiredTitle}
        </h1>
        <p className="text-lg text-[var(--muted)] mb-10">{r.expiredBody}</p>
        <LibraryLookup />
      </div>
    );
  }

  const db = supabaseService();
  const [refRes, creditRes] = await Promise.all([
    db
      .from("referrals")
      .select("id, referred_purchase_id, credited, created_at")
      .eq("referrer_purchase_id", purchase.id)
      .order("created_at", { ascending: false }),
    db
      .from("purchase_credits")
      .select("id, reason, redeemed_at, created_at")
      .eq("purchase_id", purchase.id)
      .order("created_at", { ascending: false }),
  ]);

  const referrals: ReferralRow[] = (refRes.data as ReferralRow[] | null) ?? [];
  const credits: CreditRow[] = (creditRes.data as CreditRow[] | null) ?? [];

  const creditedCount = referrals.filter((rr) => rr.credited).length;
  const totalCount = referrals.length;
  const REFERRALS_FOR_FREE_KIT = 3;
  const remainingToUnlock = Math.max(
    0,
    REFERRALS_FOR_FREE_KIT - creditedCount,
  );
  const shareUrl = `${siteUrl()}/?ref=${purchase.referral_code}`;

  const dateLocale = safeLocale === "en" ? "en-CA" : safeLocale;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="eyebrow">{r.eyebrow}</span>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-3">{r.title}</h1>
      <p className="text-lg text-[var(--muted)] mb-12 max-w-xl">{r.subtitle}</p>

      {/* Share card */}
      <section
        aria-label={r.yourLink}
        className="rounded-3xl border border-[var(--hairline)] bg-white p-6 sm:p-7 mb-10"
      >
        <span className="eyebrow">{r.yourLink}</span>
        <div className="mt-3 mb-2">
          <ReferralLinkCopy shareUrl={shareUrl} />
        </div>
        <p className="text-sm text-[var(--muted)]">{r.linkExplainer}</p>
      </section>

      {/* Progress */}
      <section
        aria-label={r.progress}
        className="rounded-3xl border border-[var(--hairline)] bg-white p-6 sm:p-7 mb-10"
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <span className="eyebrow">{r.progress}</span>
            <h2 className="text-2xl font-semibold mt-1.5">
              {creditedCount} / {REFERRALS_FOR_FREE_KIT} {r.paidReferralsSuffix}
            </h2>
          </div>
          <Gift className="w-7 h-7 text-[var(--accent-strong)]" />
        </div>
        <div className="h-2 rounded-full bg-[var(--surface)] overflow-hidden mb-2">
          <div
            className="h-full bg-spectrum transition-all"
            style={{
              width: `${Math.min(100, Math.round((creditedCount / REFERRALS_FOR_FREE_KIT) * 100))}%`,
            }}
            aria-hidden
          />
        </div>
        <p className="text-sm text-[var(--muted)]">
          {remainingToUnlock === 0
            ? r.unlocked
            : r.remainingTemplate
                .replace("{count}", String(remainingToUnlock))
                .replace("{plural}", remainingToUnlock === 1 ? "" : "s")}
        </p>
      </section>

      {/* Activity */}
      <section aria-label={r.activity} className="mb-10">
        <h2 className="display text-2xl mb-4">{r.activity}</h2>
        {totalCount === 0 ? (
          <p className="text-[var(--muted)] py-4">{r.noReferrals}</p>
        ) : (
          <ul className="space-y-3">
            {referrals.map((rr) => (
              <li
                key={rr.id}
                className="rounded-xl border border-[var(--hairline)] bg-white p-4 flex items-center justify-between gap-4 text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>
                    {r.referralOnPrefix}{" "}
                    {new Date(rr.created_at).toLocaleDateString(dateLocale, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full ${
                    rr.credited
                      ? "bg-emerald-100 text-emerald-900"
                      : "bg-[var(--surface)] text-[var(--muted)]"
                  }`}
                >
                  {rr.credited ? r.credited : r.pending}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Credits */}
      {credits.length > 0 ? (
        <section aria-label={r.yourCredits} className="mb-10">
          <h2 className="display text-2xl mb-4">{r.yourCredits}</h2>
          <ul className="space-y-3">
            {credits.map((c) => (
              <li
                key={c.id}
                className="rounded-xl border border-[var(--hairline)] bg-white p-4 flex items-center justify-between gap-4"
              >
                <div className="text-sm">
                  <p className="font-medium">{r.freeKitCredit}</p>
                  <p className="text-[var(--muted)] text-xs mt-0.5">
                    {c.reason} ·{" "}
                    {new Date(c.created_at).toLocaleDateString(dateLocale)}
                  </p>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full ${
                    c.redeemed_at
                      ? "bg-[var(--surface)] text-[var(--muted)]"
                      : "bg-amber-100 text-amber-900"
                  }`}
                >
                  {c.redeemed_at ? r.redeemed : r.readyToUse}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[var(--muted)] mt-4">
            {r.redeemBodyPrefix}{" "}
            <a
              className="underline"
              href="mailto:hello@lumenari.io?subject=Redeem%20free%20kit"
            >
              hello@lumenari.io
            </a>{" "}
            {r.redeemBodySuffix}
          </p>
        </section>
      ) : null}

      <p className="text-sm text-[var(--muted)]">
        <Link href="/library" className="underline">
          {r.backToLibrary}
        </Link>
      </p>
    </div>
  );
}

async function loadPurchase(
  p: string,
  t: string,
): Promise<PurchaseRow | null> {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(p)) {
    return null;
  }
  const db = supabaseService();
  const { data, error } = await db
    .from("purchases")
    .select("id, email, access_token, referral_code")
    .eq("id", p)
    .maybeSingle();
  if (error || !data) return null;
  if (data.access_token !== t) return null;
  return data as PurchaseRow;
}

// Need the import below at the top of the file — used here so a tree-shake
// doesn't drop the icon when this page is the only user.
void Copy;
