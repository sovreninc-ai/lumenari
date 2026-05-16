import { NextResponse } from "next/server";
import {
  requireApiKey,
  checkRateLimit,
  logUsage,
} from "@/lib/api-auth";
import { supabaseService } from "@/lib/supabase";

/**
 * GET /api/v1/usage
 *
 * Returns the calling account's current billing-period usage + a 30-day
 * daily breakdown so clients can render their own usage charts.
 *
 *   {
 *     "tier": "pro",
 *     "period_start": "2026-05-01T00:00:00.000Z",
 *     "period_end":   "2026-06-01T00:00:00.000Z",
 *     "calls_used": 1240,
 *     "calls_remaining": 8760,
 *     "monthly_limit": 10000,
 *     "daily_breakdown": [
 *       { "date": "2026-05-01", "calls": 12 },
 *       ...
 *     ]
 *   }
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ENDPOINT = "/api/v1/usage";

export async function GET(req: Request) {
  const started = Date.now();

  const auth = await requireApiKey(req);
  if (auth instanceof NextResponse) return auth;

  const limit = await checkRateLimit(auth.account, auth.tier);
  if (limit instanceof NextResponse) {
    await logUsage({
      accountId: auth.account.id,
      apiKeyId: auth.apiKey.id,
      endpoint: ENDPOINT,
      status: 429,
      durationMs: Date.now() - started,
    });
    return limit;
  }

  const db = supabaseService();

  // Calendar-month period (matches the rate-limit window in checkRateLimit).
  const now = new Date();
  const periodStart = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
  );
  const periodEnd = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1),
  );

  // Daily breakdown — last 30 days.
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { data: logs } = await db
    .from("api_usage_logs")
    .select("occurred_at")
    .eq("account_id", auth.account.id)
    .gte("occurred_at", since)
    .order("occurred_at", { ascending: true });

  const daily = new Map<string, number>();
  for (const row of (logs ?? []) as Array<{ occurred_at: string }>) {
    const day = row.occurred_at.slice(0, 10);
    daily.set(day, (daily.get(day) ?? 0) + 1);
  }

  const daily_breakdown = Array.from(daily.entries())
    .map(([date, calls]) => ({ date, calls }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const calls_used =
    auth.tier.monthly_call_limit === -1
      ? logs?.filter((l) => new Date(l.occurred_at) >= periodStart).length ?? 0
      : await currentMonthCount(auth.account.id);

  const calls_remaining =
    auth.tier.monthly_call_limit === -1
      ? -1
      : Math.max(0, auth.tier.monthly_call_limit - calls_used);

  await logUsage({
    accountId: auth.account.id,
    apiKeyId: auth.apiKey.id,
    endpoint: ENDPOINT,
    status: 200,
    durationMs: Date.now() - started,
  });

  return NextResponse.json(
    {
      tier: auth.tier.id,
      tier_name: auth.tier.name,
      period_start: periodStart.toISOString(),
      period_end: periodEnd.toISOString(),
      calls_used,
      calls_remaining,
      monthly_limit: auth.tier.monthly_call_limit,
      daily_breakdown,
    },
    { headers: limit.headers },
  );
}

async function currentMonthCount(accountId: string): Promise<number> {
  const db = supabaseService();
  const { data } = await db
    .from("api_usage_current_month")
    .select("calls")
    .eq("account_id", accountId)
    .maybeSingle();
  return (data?.calls as number | undefined) ?? 0;
}
