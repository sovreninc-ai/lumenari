"use client";

import { useState, useTransition } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useDictionary } from "@/i18n/use-dictionary";

/**
 * Email-capture form for the /free landing page. Submits to
 * /api/lead-magnet/claim. On success, shows a confirmation state and
 * a download link that points at the in-email link (the API also
 * emails it).
 */
export function LeadMagnetClaimForm({ kitSlug }: { kitSlug: string }) {
  const dict = useDictionary();
  const t = dict.leadMagnet;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function submit() {
    setStatus("idle");
    setMessage(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/lead-magnet/claim", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, kitSlug, source: "free-landing" }),
        });
        const data = (await res.json()) as
          | { ok: true; leadId: string; warning?: string }
          | { error: string };
        if (!res.ok && !("ok" in data)) {
          throw new Error(
            "error" in data ? data.error : t.somethingWentWrong,
          );
        }
        setStatus("success");
        setMessage(
          "warning" in data && data.warning
            ? data.warning
            : t.successBodyDefault,
        );
      } catch (err) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : t.somethingWentWrong);
      }
    });
  }

  if (status === "success") {
    return (
      <div className="text-center py-4">
        <CheckCircle2 className="w-10 h-10 mx-auto text-[var(--accent-strong)] mb-3" />
        <h3 className="display text-xl mb-2">{t.successTitle}</h3>
        <p className="text-[var(--muted)] leading-relaxed max-w-md mx-auto">
          {message}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.includes("@")) {
          setStatus("error");
          setMessage(t.invalidEmail);
          return;
        }
        submit();
      }}
      className="flex flex-col sm:flex-row gap-3"
    >
      <label className="sr-only" htmlFor="lead-email">
        {t.placeholder}
      </label>
      <input
        id="lead-email"
        type="email"
        required
        autoComplete="email"
        placeholder={t.placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-full border border-[var(--hairline)] bg-white px-5 h-12 text-base focus:outline-none focus:ring-2 focus:ring-[var(--accent-strong)]/30 focus:border-[var(--accent-strong)]"
      />
      <button
        type="submit"
        disabled={isPending}
        className="btn-primary justify-center"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {isPending ? t.submitting : t.submit}
      </button>
      {status === "error" && message ? (
        <p
          role="alert"
          className="sm:order-3 w-full text-sm text-red-600 mt-1"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
