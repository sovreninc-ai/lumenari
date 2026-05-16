"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

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
        throw new Error(data.error ?? "Could not start checkout");
      }
      window.location.href = data.url;
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

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
              Start the {tier === "pro" ? "Pro" : "Business"} plan
            </h3>
            <p className="text-sm text-[var(--muted)] mb-5">
              We&apos;ll send your API key to this email after checkout.
            </p>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourcompany.com"
              className="input mb-3"
            />
            <label className="block text-sm font-medium mb-2">
              Organization <span className="text-[var(--muted)] font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="Acme, Inc."
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
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || email.length < 5}
                className="btn-primary text-sm h-10 px-4 disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {loading ? "Redirecting…" : "Continue to checkout"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
