"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { ProTier } from "@/data/subscription-tiers";
import { useDictionary } from "@/i18n/use-dictionary";

interface ProCheckoutButtonProps {
  tier: ProTier;
  label?: string;
  className?: string;
  emailPrefill?: string;
}

/**
 * Posts to /api/pro-checkout, redirects to the Stripe Checkout URL.
 * Subscription mode for monthly/annual, payment mode for lifetime.
 */
export function ProCheckoutButton({
  tier,
  label,
  className,
  emailPrefill,
}: ProCheckoutButtonProps) {
  const dict = useDictionary();
  const t = dict.proCheckout;
  const resolvedLabel = label ?? t.defaultLabel;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function go() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/pro-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, email: emailPrefill }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? t.checkoutFailed);
      }
      window.location.assign(data.url);
    } catch (e) {
      const msg = e instanceof Error ? e.message : t.checkoutFailed;
      setError(msg);
      setLoading(false);
    }
  }

  return (
    <div className={className ?? ""}>
      <button
        type="button"
        onClick={go}
        disabled={loading}
        className="btn-primary w-full disabled:opacity-60"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {loading ? t.opening : resolvedLabel}
      </button>
      {error ? (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
