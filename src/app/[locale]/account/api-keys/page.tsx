import Link from "next/link";
import { Code2, BookOpen, Crown } from "lucide-react";
import { resolveAccount } from "@/lib/account-auth";
import { supabaseService } from "@/lib/supabase";
import { AccountSignIn } from "@/components/AccountSignIn";
import { ApiKeysManager } from "@/components/ApiKeysManager";
import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { accountMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  return accountMetadata(safeLocale);
}

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ a?: string; t?: string }>;
}

interface ApiTierRow {
  id: string;
  name: string;
  monthly_call_limit: number;
  monthly_price_cents: number;
  features: string[];
}

interface ApiKeyRow {
  id: string;
  name: string;
  key_prefix: string;
  last_used_at: string | null;
  created_at: string;
  revoked_at: string | null;
}

export default async function ApiAccountPage({ searchParams }: PageProps) {
  const { a, t } = await searchParams;

  if (!a || !t) {
    return <SignInView />;
  }
  const account = await resolveAccount(a, t);
  if (!account) {
    return (
      <SignInView notice="That link is expired or invalid. Enter your email below for a fresh one." />
    );
  }

  const db = supabaseService();

  const [tierRes, keysRes, usageRes] = await Promise.all([
    db
      .from("api_tiers")
      .select("id, name, monthly_call_limit, monthly_price_cents, features")
      .eq("id", account.tier_id)
      .maybeSingle(),
    db
      .from("api_keys")
      .select("id, name, key_prefix, last_used_at, created_at, revoked_at")
      .eq("account_id", account.id)
      .order("created_at", { ascending: false }),
    db
      .from("api_usage_current_month")
      .select("calls")
      .eq("account_id", account.id)
      .maybeSingle(),
  ]);

  const tier: ApiTierRow | null = (tierRes.data as ApiTierRow | null) ?? null;
  const keys: ApiKeyRow[] = (keysRes.data as ApiKeyRow[] | null) ?? [];
  const callsUsed: number = (usageRes.data?.calls as number | undefined) ?? 0;
  const limit = tier?.monthly_call_limit ?? 100;
  const unlimited = limit === -1;
  const pct = unlimited ? 0 : Math.min(100, Math.round((callsUsed / limit) * 100));

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="eyebrow">API account</span>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-3">
        {account.organization_name ?? account.email.split("@")[0]}
      </h1>
      <p className="text-[var(--muted)] mb-10">
        Signed in as <span className="text-[var(--foreground)] font-medium">{account.email}</span>
      </p>

      {/* Tier + usage card */}
      <section className="mb-12 rounded-3xl border border-[var(--hairline)] bg-white p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <span className="eyebrow">Current tier</span>
            <h2 className="text-2xl font-semibold mt-1 flex items-center gap-2">
              {tier?.name ?? "Free"}
              {tier?.id === "business" || tier?.id === "enterprise" ? (
                <Crown className="w-5 h-5 text-[var(--accent-strong)]" />
              ) : null}
            </h2>
          </div>
          {tier?.id !== "enterprise" ? (
            <Link
              href="/api-platform"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-white px-4 py-2 text-sm font-medium hover:bg-[var(--surface)] transition-colors flex-shrink-0"
            >
              {tier?.id === "free" ? "Upgrade" : "Change plan"}
            </Link>
          ) : null}
        </div>

        <div className="mb-2 flex items-baseline justify-between text-sm">
          <span className="text-[var(--muted)]">This month</span>
          <span className="font-medium">
            {callsUsed.toLocaleString()}{" "}
            <span className="text-[var(--muted)]">
              / {unlimited ? "∞" : limit.toLocaleString()} calls
            </span>
          </span>
        </div>
        <div className="h-2 rounded-full bg-[var(--surface)] overflow-hidden">
          <div
            className="h-full bg-spectrum transition-all"
            style={{ width: `${unlimited ? 0 : pct}%` }}
            aria-hidden
          />
        </div>
        {!unlimited && pct >= 80 ? (
          <p className="mt-3 text-xs text-amber-700">
            You&apos;ve used {pct}% of your monthly quota. Consider upgrading
            before you hit the limit.
          </p>
        ) : null}
      </section>

      {/* API keys */}
      <section className="mb-12">
        <ApiKeysManager
          accountId={account.id}
          accessToken={account.access_token}
          initialKeys={keys}
        />
      </section>

      {/* Quick links */}
      <section className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/api-docs"
          className="rounded-2xl border border-[var(--hairline)] bg-white p-5 hover:border-[var(--accent-strong)] transition-colors flex items-start gap-3"
        >
          <BookOpen className="w-5 h-5 text-[var(--accent-strong)] mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold mb-1">API documentation</p>
            <p className="text-sm text-[var(--muted)]">
              Endpoints, examples, rate limits.
            </p>
          </div>
        </Link>
        <Link
          href="/api-platform"
          className="rounded-2xl border border-[var(--hairline)] bg-white p-5 hover:border-[var(--accent-strong)] transition-colors flex items-start gap-3"
        >
          <Code2 className="w-5 h-5 text-[var(--accent-strong)] mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold mb-1">Pricing & tiers</p>
            <p className="text-sm text-[var(--muted)]">
              Compare Free, Pro, Business, Enterprise.
            </p>
          </div>
        </Link>
      </section>
    </div>
  );
}

function SignInView({ notice }: { notice?: string } = {}) {
  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <span className="eyebrow">API account</span>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-4">
        Sign in to manage your keys.
      </h1>
      <p className="text-lg text-[var(--muted)] mb-8">
        Enter your email and we&apos;ll send a one-click sign-in link.
      </p>
      {notice ? (
        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {notice}
        </div>
      ) : null}
      <AccountSignIn />
    </div>
  );
}
