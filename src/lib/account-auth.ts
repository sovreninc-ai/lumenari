import { supabaseService } from "./supabase";

/**
 * Magic-link account authentication for the API dashboard.
 *
 * Same pattern as the storefront's /library page — instead of a session,
 * the caller passes the account id + access_token on every request.
 *
 * Server routes pull both from either a JSON body or the query string and
 * validate via `resolveAccount`.
 */

export interface DashboardAccount {
  id: string;
  email: string;
  organization_name: string | null;
  tier_id: string;
  subscription_status: string | null;
  current_period_end: string | null;
  access_token: string;
  stripe_customer_id: string | null;
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function resolveAccount(
  accountId: string | null,
  token: string | null,
): Promise<DashboardAccount | null> {
  if (!accountId || !token) return null;
  if (!UUID_RE.test(accountId) || !UUID_RE.test(token)) return null;

  const db = supabaseService();
  const { data, error } = await db
    .from("api_accounts")
    .select(
      "id, email, organization_name, tier_id, subscription_status, current_period_end, access_token, stripe_customer_id",
    )
    .eq("id", accountId)
    .maybeSingle();

  if (error || !data) return null;
  if (data.access_token !== token) return null;
  return data as DashboardAccount;
}
