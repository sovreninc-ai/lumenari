/**
 * Founder dashboard data — every metric the /admin page renders.
 *
 * Server-only. All DB queries use the service role (we already gated
 * access at the page level via `isAdmin()`).
 */

import { supabaseService } from "./supabase";

const DAY_MS = 24 * 60 * 60 * 1000;
const MONTHLY_PRO_PLUS_CENTS = 1900;
const ANNUAL_PRO_PLUS_CENTS = 14900;

export interface AdminKPI {
  revenueTodayCents: number;
  revenueMonthCents: number;
  revenueYearCents: number;
  totalCustomers: number;
  activeProPlus: number;
  proPlusMRRCents: number;
  newsletterListSize: number;
  conversionRate30d: number; // 0..1
  proChurnRate30d: number; // 0..1
}

export interface RevenueTrendPoint {
  date: string; // ISO date
  cents: number;
}

export interface CustomerTrendPoint {
  date: string;
  newCustomers: number;
}

export interface TopKitRow {
  slug: string;
  name: string;
  saleCount: number;
  revenueCents: number;
}

export interface RecentPurchaseRow {
  id: string;
  email: string;
  kitIds: string[];
  amountCents: number | null;
  createdAt: string;
}

export interface RecentLeadRow {
  email: string;
  source: string;
  createdAt: string;
  converted: boolean;
}

export interface ActiveProRow {
  email: string;
  tier: string;
  status: string;
  startedAt: string;
  mrrCents: number;
}

export interface AdminStats {
  kpis: AdminKPI;
  revenueTrend30d: RevenueTrendPoint[];
  customerTrend90d: CustomerTrendPoint[];
  topKits30d: TopKitRow[];
  recentPurchases: RecentPurchaseRow[];
  activePro: ActiveProRow[];
  recentLeads: RecentLeadRow[];
}

interface PurchaseRowShape {
  id: string;
  email: string;
  kit_ids: string[] | null;
  amount_cents: number | null;
  created_at: string;
  pro: boolean;
  pro_tier: string | null;
  pro_status: string | null;
}

function startOfTodayUtc(): Date {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function startOfMonthUtc(): Date {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
}

function startOfYearUtc(): Date {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
}

function mrrCentsForTier(tier: string | null): number {
  switch (tier) {
    case "monthly":
      return MONTHLY_PRO_PLUS_CENTS;
    case "annual":
      return Math.round(ANNUAL_PRO_PLUS_CENTS / 12);
    default:
      // Lifetime contributes 0 to MRR (one-time revenue).
      return 0;
  }
}

export async function loadAdminStats(): Promise<AdminStats> {
  const db = supabaseService();
  const todayStart = startOfTodayUtc();
  const monthStart = startOfMonthUtc();
  const yearStart = startOfYearUtc();
  const ninetyDaysAgo = new Date(Date.now() - 90 * DAY_MS);
  const thirtyDaysAgo = new Date(Date.now() - 30 * DAY_MS);

  // Pull a single wide slice for the year — small projects fit easily.
  const { data: yearPurchases, error: yearErr } = await db
    .from("purchases")
    .select(
      "id, email, kit_ids, amount_cents, created_at, pro, pro_tier, pro_status",
    )
    .gte("created_at", yearStart.toISOString());
  if (yearErr) throw yearErr;

  const purchases = (yearPurchases ?? []) as PurchaseRowShape[];

  // Revenue aggregates.
  let revenueTodayCents = 0;
  let revenueMonthCents = 0;
  let revenueYearCents = 0;
  for (const p of purchases) {
    const cents = p.amount_cents ?? 0;
    const created = new Date(p.created_at);
    revenueYearCents += cents;
    if (created >= monthStart) revenueMonthCents += cents;
    if (created >= todayStart) revenueTodayCents += cents;
  }

  // Trend buckets.
  const revenueTrend30d: RevenueTrendPoint[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * DAY_MS);
    const key = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toISOString().slice(0, 10);
    revenueTrend30d.push({ date: key, cents: 0 });
  }
  const trendIndex = new Map(revenueTrend30d.map((r, i) => [r.date, i] as const));
  for (const p of purchases) {
    const created = new Date(p.created_at);
    if (created < thirtyDaysAgo) continue;
    const key = new Date(Date.UTC(created.getUTCFullYear(), created.getUTCMonth(), created.getUTCDate())).toISOString().slice(0, 10);
    const idx = trendIndex.get(key);
    if (idx === undefined) continue;
    revenueTrend30d[idx].cents += p.amount_cents ?? 0;
  }

  // Customer acquisition trend — fetch 90-day distinct first-purchase dates.
  const customerTrend90d: CustomerTrendPoint[] = [];
  for (let i = 89; i >= 0; i--) {
    const d = new Date(Date.now() - i * DAY_MS);
    const key = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toISOString().slice(0, 10);
    customerTrend90d.push({ date: key, newCustomers: 0 });
  }
  const customerTrendIndex = new Map(customerTrend90d.map((r, i) => [r.date, i] as const));

  const { data: ninety, error: ninetyErr } = await db
    .from("purchases")
    .select("email, created_at")
    .gte("created_at", ninetyDaysAgo.toISOString());
  if (ninetyErr) throw ninetyErr;

  // First-touch per email.
  const firstSeen = new Map<string, string>();
  for (const r of (ninety ?? []) as { email: string; created_at: string }[]) {
    const key = r.email.toLowerCase();
    const existing = firstSeen.get(key);
    if (!existing || r.created_at < existing) firstSeen.set(key, r.created_at);
  }
  for (const [, dateStr] of firstSeen) {
    const d = new Date(dateStr);
    const key = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toISOString().slice(0, 10);
    const idx = customerTrendIndex.get(key);
    if (idx === undefined) continue;
    customerTrend90d[idx].newCustomers += 1;
  }

  // Distinct customers total.
  const { data: allEmails } = await db
    .from("purchases")
    .select("email");
  const totalCustomers = new Set(
    ((allEmails ?? []) as { email: string }[]).map((e) => e.email.toLowerCase()),
  ).size;

  // Active Pro+
  const { data: activeProRows, error: proErr } = await db
    .from("purchases")
    .select("email, pro_tier, pro_status, created_at, amount_cents")
    .eq("pro", true)
    .in("pro_status", ["active", "trialing"]);
  if (proErr) throw proErr;

  const activePro: ActiveProRow[] = ((activeProRows ?? []) as Array<{
    email: string;
    pro_tier: string | null;
    pro_status: string | null;
    created_at: string;
  }>).map((r) => ({
    email: r.email,
    tier: r.pro_tier ?? "monthly",
    status: r.pro_status ?? "active",
    startedAt: r.created_at,
    mrrCents: mrrCentsForTier(r.pro_tier),
  }));

  const proPlusMRRCents = activePro.reduce((s, r) => s + r.mrrCents, 0);
  const activeProPlus = activePro.length;

  // Newsletter list size + conversion rate (leads in last 30d vs purchases).
  const { count: leadsCount } = await db
    .from("leads")
    .select("*", { count: "exact", head: true })
    .is("unsubscribed_at", null);
  const newsletterListSize = leadsCount ?? 0;

  const { count: leads30 } = await db
    .from("leads")
    .select("*", { count: "exact", head: true })
    .gte("welcomed_at", thirtyDaysAgo.toISOString());
  const { count: converted30 } = await db
    .from("leads")
    .select("*", { count: "exact", head: true })
    .gte("welcomed_at", thirtyDaysAgo.toISOString())
    .not("converted_at", "is", null);
  const conversionRate30d =
    leads30 && leads30 > 0 ? (converted30 ?? 0) / leads30 : 0;

  // Pro+ churn rate — cancellations in last 30d / starts in last 30d.
  const { count: cancels30 } = await db
    .from("purchases")
    .select("*", { count: "exact", head: true })
    .eq("pro_status", "cancelled")
    .gte("created_at", thirtyDaysAgo.toISOString());
  const { count: starts30 } = await db
    .from("purchases")
    .select("*", { count: "exact", head: true })
    .eq("pro", true)
    .gte("created_at", thirtyDaysAgo.toISOString());
  const proChurnRate30d =
    starts30 && starts30 > 0 ? (cancels30 ?? 0) / starts30 : 0;

  // Top kits last 30 days — fan out each purchase's kit_ids and bucket.
  const topMap = new Map<string, { saleCount: number; revenueCents: number }>();
  for (const p of purchases) {
    const created = new Date(p.created_at);
    if (created < thirtyDaysAgo) continue;
    const ids = p.kit_ids ?? [];
    if (ids.length === 0) continue;
    const perKit = ids.length > 0 ? (p.amount_cents ?? 0) / ids.length : 0;
    for (const id of ids) {
      const cur = topMap.get(id) ?? { saleCount: 0, revenueCents: 0 };
      cur.saleCount += 1;
      cur.revenueCents += perKit;
      topMap.set(id, cur);
    }
  }
  // Resolve names via catalog table.
  const { data: catRows } = await db
    .from("kits")
    .select("id, slug, name");
  const catalog = new Map(
    ((catRows ?? []) as { id: string; slug: string; name: string }[]).map(
      (k) => [k.id, k] as const,
    ),
  );
  const topKits30d: TopKitRow[] = Array.from(topMap.entries())
    .map(([id, agg]) => {
      const k = catalog.get(id);
      return {
        slug: k?.slug ?? id,
        name: k?.name ?? id,
        saleCount: agg.saleCount,
        revenueCents: Math.round(agg.revenueCents),
      };
    })
    .sort((a, b) => b.revenueCents - a.revenueCents)
    .slice(0, 10);

  // Recent purchases — last 25.
  const { data: recent } = await db
    .from("purchases")
    .select("id, email, kit_ids, amount_cents, created_at")
    .order("created_at", { ascending: false })
    .limit(25);
  const recentPurchases: RecentPurchaseRow[] = (
    (recent ?? []) as Array<{
      id: string;
      email: string;
      kit_ids: string[] | null;
      amount_cents: number | null;
      created_at: string;
    }>
  ).map((r) => ({
    id: r.id,
    email: r.email,
    kitIds: r.kit_ids ?? [],
    amountCents: r.amount_cents,
    createdAt: r.created_at,
  }));

  // Recent leads — last 25.
  const { data: leadsRecent } = await db
    .from("leads")
    .select("email, source, welcomed_at, converted_at")
    .order("welcomed_at", { ascending: false })
    .limit(25);
  const recentLeads: RecentLeadRow[] = (
    (leadsRecent ?? []) as Array<{
      email: string;
      source: string;
      welcomed_at: string;
      converted_at: string | null;
    }>
  ).map((r) => ({
    email: r.email,
    source: r.source,
    createdAt: r.welcomed_at,
    converted: Boolean(r.converted_at),
  }));

  return {
    kpis: {
      revenueTodayCents,
      revenueMonthCents,
      revenueYearCents,
      totalCustomers,
      activeProPlus,
      proPlusMRRCents,
      newsletterListSize,
      conversionRate30d,
      proChurnRate30d,
    },
    revenueTrend30d,
    customerTrend90d,
    topKits30d,
    recentPurchases,
    activePro: activePro
      .sort((a, b) => a.startedAt.localeCompare(b.startedAt))
      .slice(0, 25),
    recentLeads,
  };
}
