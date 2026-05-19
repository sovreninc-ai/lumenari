"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useDictionary, useLocale } from "@/i18n/use-dictionary";

interface BuyButtonProps {
  slugs: string[];
  label?: string;
  className?: string;
  emailPrefill?: string;
}

/**
 * Posts to /api/checkout and redirects to the Stripe Checkout URL it
 * returns. Used for both single-kit "Get this kit" and the bundle CTA.
 */
export function BuyButton({
  slugs,
  label,
  className,
  emailPrefill,
}: BuyButtonProps) {
  const dict = useDictionary();
  const locale = useLocale();
  const t = dict.buyButton;
  const resolvedLabel = label ?? t.defaultLabel;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function go() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slugs, email: emailPrefill, locale }),
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
