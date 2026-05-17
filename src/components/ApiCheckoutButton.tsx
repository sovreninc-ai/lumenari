"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useDictionary } from "@/i18n/use-dictionary";

type Tier = "pro" | "business";

interface ApiCheckoutButtonProps {
  tier: Tier;
  label: string;
  highlight?: boolean;
}

/**
 * Pricing CTA on /api-platform.
 *
 * Two-step flow:
 *   1. Modal asks for email.
 *   2. POST /api/api-checkout → returns Stripe Checkout URL → redirect.
 *
 * If the user is already signed in to the dashboard their email will be
 * pre-filled by a future enhancement; for MVP it always asks.
 */
export function ApiCheckoutButton({ tier, label, highlight }: ApiCheckoutButtonProps) {
  const dict = useDictionary();
  const t = dict.apiCheckout;
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/api-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier,
          email,
          organization_name: organization.trim() || undefined,
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? t.couldNotStart);
      }
      window.location.href = data.url;
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : t.somethingWentWrong);
    }
  }

  const tierName = tier === "pro" ? t.proName : t.businessName;

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className={
          highlight
            ? "btn-primary w-full"
            : "w-full inline-flex items-center justify-center h-[52px] rounded-full border border-[var(--hairline)] bg-white text-[var(--foreground)] font-medium hover:bg-[var(--surface)] transition-colors"
        }
      >
        {label}
      </button>

      {show ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={() => (loading ? undefined : setShow(false))}
        >
          <form
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl"
          >
            <h3 className="text-xl font-semibold mb-1">
              {t.titleProPrefix} {tierName} {t.titleSuffix}
            </h3>
            <p className="text-sm text-[var(--muted)] mb-5">{t.body}</p>
            <label className="block text-sm font-medium mb-2">{t.email}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.placeholderEmail}
              className="input mb-3"
            />
            <label className="block text-sm font-medium mb-2">
              {t.organizationLabel}{" "}
              <span className="text-[var(--muted)] font-normal">
                {t.organizationOptional}
              </span>
            </label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder={t.placeholderOrganization}
              className="input"
            />
            {error ? (
              <p className="mt-3 text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShow(false)}
                disabled={loading}
                className="btn-ghost text-sm h-10 px-4"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={loading || email.length < 5}
                className="btn-primary text-sm h-10 px-4 disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {loading ? t.redirecting : t.continue}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
