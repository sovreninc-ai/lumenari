import { NextResponse } from "next/server";
import { supabaseService } from "./supabase";
import { hashApiKey, looksLikeApiKey } from "./api-keys";

/**
 * Public API authentication + rate limiting helpers.
 *
 * Every /api/v1/* route uses the same shape:
 *
 *   const auth = await requireApiKey(req);
 *   if (auth instanceof NextResponse) return auth;   // 401
 *   const limit = await checkRateLimit(auth.account);
 *   if (limit instanceof NextResponse) return limit; // 429 + headers
 *   ...do work...
 *   await logUsage({ ... });
 *   return NextResponse.json(body, { headers: limit.headers });
 *
 * Errors come back as NextResponse so the route handler doesn't have to
 * write its own try/catch around auth — just `if (instanceof NextResponse)
 * return it` and continue.
 */

// --------------------------------------------------------------------
// Types
// --------------------------------------------------------------------

export interface ApiAccount {
  id: string;
  email: string;
  organization_name: string | null;
  tier_id: string;
  subscription_status: string | null;
  current_period_end: string | null;
}

export interface ApiKeyRow {
  id: string;
  account_id: string;
  name: string;
  key_prefix: string;
}

export interface ApiTier {
  id: string;
  name: string;
  monthly_call_limit: number;
  monthly_price_cents: number;
}

export interface AuthSuccess {
  account: ApiAccount;
  apiKey: ApiKeyRow;
  tier: ApiTier;
}

export interface RateLimitOk {
  ok: true;
  used: number;
  limit: number;
  remaining: number;
  resetAt: Date;
  headers: Record<string, string>;
}

// --------------------------------------------------------------------
// Error helpers
// --------------------------------------------------------------------

export function apiError(
  status: number,
  code: string,
  message: string,
  extraHeaders?: Record<string, string>,
): NextResponse {
  return NextResponse.json(
    { error: { code, message } },
    { status, headers: extraHeaders },
  );
}

// --------------------------------------------------------------------
// requireApiKey
// --------------------------------------------------------------------

export async function requireApiKey(
  req: Request,
): Promise<AuthSuccess | NextResponse> {
  const header = req.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return apiError(
      401,
      "missing_api_key",
      "Provide an API key as `Authorization: Bearer lmn_...`.",
    );
  }

  const raw = match[1].trim();
  if (!looksLikeApiKey(raw)) {
    return apiError(401, "invalid_api_key", "API key format is invalid.");
  }

  const hash = hashApiKey(raw);
  const db = supabaseService();

  const { data: keyRow, error: keyErr } = await db
    .from("api_keys")
    .select("id, account_id, name, key_prefix, revoked_at")
    .eq("key_hash", hash)
    .maybeSingle();

  if (keyErr) {
    console.error("[api-auth] key lookup failed:", keyErr);
    return apiError(500, "internal_error", "Could not validate API key.");
  }
  if (!keyRow || keyRow.revoked_at) {
    return apiError(401, "invalid_api_key", "API key is invalid or revoked.");
  }

  const { data: accountRow, error: accErr } = await db
    .from("api_accounts")
    .select(
      "id, email, organization_name, tier_id, subscription_status, current_period_end",
    )
    .eq("id", keyRow.account_id)
    .maybeSingle();

  if (accErr || !accountRow) {
    console.error("[api-auth] account lookup failed:", accErr);
    return apiError(401, "invalid_api_key", "API key is invalid or revoked.");
  }

  // Past-due / canceled subscriptions on a paid tier → block.
  if (
    accountRow.tier_id !== "free" &&
    accountRow.subscription_status &&
    !["active", "trialing"].includes(accountRow.subscription_status)
  ) {
    return apiError(
      402,
      "subscription_inactive",
      "Subscription is past_due or canceled. Update billing to resume API access.",
    );
  }

  const { data: tierRow, error: tierErr } = await db
    .from("api_tiers")
    .select("id, name, monthly_call_limit, monthly_price_cents")
    .eq("id", accountRow.tier_id)
    .maybeSingle();

  if (tierErr || !tierRow) {
    console.error("[api-auth] tier lookup failed:", tierErr);
    return apiError(500, "internal_error", "Could not resolve account tier.");
  }

  // Touch last_used_at — best effort.
  db.from("api_keys")
    .update({ last_used_at: new Date().toISOString() })
    .eq("id", keyRow.id)
    .then(
      () => null,
      (e: unknown) => console.error("[api-auth] last_used touch:", e),
    );

  return {
    account: {
      id: accountRow.id,
      email: accountRow.email,
      organization_name: accountRow.organization_name,
      tier_id: accountRow.tier_id,
      subscription_status: accountRow.subscription_status,
      current_period_end: accountRow.current_period_end,
    },
    apiKey: {
      id: keyRow.id,
      account_id: keyRow.account_id,
      name: keyRow.name,
      key_prefix: keyRow.key_prefix,
    },
    tier: tierRow as ApiTier,
  };
}

// --------------------------------------------------------------------
// checkRateLimit
// --------------------------------------------------------------------

/**
 * Returns `{ ok: true, headers }` if the caller has quota remaining,
 * or a 429 NextResponse with X-RateLimit-* headers if not.
 *
 * Enterprise (`monthly_call_limit === -1`) is unlimited.
 */
export async function checkRateLimit(
  account: ApiAccount,
  tier: ApiTier,
): Promise<RateLimitOk | NextResponse> {
  if (tier.monthly_call_limit === -1) {
    return {
      ok: true,
      used: 0,
      limit: -1,
      remaining: -1,
      resetAt: nextMonthStart(),
      headers: {
        "X-RateLimit-Limit": "unlimited",
        "X-RateLimit-Remaining": "unlimited",
        "X-RateLimit-Reset": String(Math.floor(nextMonthStart().getTime() / 1000)),
      },
    };
  }

  const db = supabaseService();
  const { data, error } = await db
    .from("api_usage_current_month")
    .select("calls")
    .eq("account_id", account.id)
    .maybeSingle();

  if (error) {
    // Fail open on the usage view so a transient DB error doesn't 429
    // legitimate traffic. We still log.
    console.error("[api-auth] usage lookup failed:", error);
  }

  const used: number = (data?.calls as number | undefined) ?? 0;
  const limit = tier.monthly_call_limit;
  const remaining = Math.max(0, limit - used);
  const resetAt = nextMonthStart();

  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(Math.floor(resetAt.getTime() / 1000)),
  };

  if (used >= limit) {
    return apiError(
      429,
      "rate_limit_exceeded",
      `Monthly call limit of ${limit} exceeded. Upgrade your tier or wait until ${resetAt.toISOString()}.`,
      {
        ...headers,
        "Retry-After": String(
          Math.max(1, Math.floor((resetAt.getTime() - Date.now()) / 1000)),
        ),
      },
    );
  }

  return { ok: true, used, limit, remaining, resetAt, headers };
}

function nextMonthStart(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
}

// --------------------------------------------------------------------
// logUsage
// --------------------------------------------------------------------

export interface LogUsageArgs {
  accountId: string;
  apiKeyId: string | null;
  endpoint: string;
  status: number;
  durationMs?: number;
  metadata?: Record<string, unknown>;
}

export async function logUsage(args: LogUsageArgs): Promise<void> {
  try {
    const db = supabaseService();
    await db.from("api_usage_logs").insert({
      account_id: args.accountId,
      api_key_id: args.apiKeyId,
      endpoint: args.endpoint,
      status: args.status,
      duration_ms: args.durationMs ?? null,
      metadata: args.metadata ?? null,
    });
  } catch (err) {
    // Never let a logging failure break the user's request.
    console.error("[api-auth] logUsage failed:", err);
  }
}
