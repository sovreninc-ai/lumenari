"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, X, Sparkles } from "lucide-react";
import { track } from "@/lib/analytics";
import { useDictionary } from "@/i18n/use-dictionary";

/**
 * Newsletter capture surfaces.
 *   - `NewsletterFooterForm` — small horizontal form for the site footer.
 *   - `ExitIntentNewsletterModal` — one-shot per session, fires on
 *     `mouseleave` (desktop) or scroll-up gesture (mobile).
 *
 * Both POST to `/api/newsletter/subscribe`.
 */

const SESSION_FLAG = "lumenari_exit_intent_shown";

async function submit(
  email: string,
  fallback: { error: string; success: string; unreachable: string },
): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      message?: string;
      error?: string;
    };
    if (!res.ok) {
      return {
        ok: false,
        message: data.error ?? fallback.error,
      };
    }
    return {
      ok: true,
      message: data.message ?? fallback.success,
    };
  } catch {
    return { ok: false, message: fallback.unreachable };
  }
}

// =====================================================================
// Footer form
// =====================================================================
export function NewsletterFooterForm() {
  const dict = useDictionary();
  const t = dict.newsletter;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage(null);
    const result = await submit(email.trim(), {
      error: t.fallbackError,
      success: t.fallbackSuccess,
      unreachable: t.fallbackUnreachable,
    });
    setStatus(result.ok ? "ok" : "err");
    setMessage(result.message);
    if (result.ok) {
      track("newsletter_signup", { source: "footer" });
      setEmail("");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row gap-2 w-full sm:max-w-md"
      aria-label={t.formAria}
    >
      <label className="sr-only" htmlFor="newsletter-email-footer">
        {t.emailLabel}
      </label>
      <div className="relative flex-1">
        <Mail
          aria-hidden
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]"
        />
        <input
          id="newsletter-email-footer"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          className="w-full pl-9 pr-3 h-10 rounded-full border border-[var(--hairline)] bg-white text-sm focus:outline-none focus:border-[var(--accent-strong)]"
          disabled={status === "loading"}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-[var(--foreground)] text-white text-sm font-medium hover:bg-black transition-colors disabled:opacity-50 flex-shrink-0"
      >
        {status === "loading" ? t.subscribing : t.subscribe}
      </button>
      {message ? (
        <p
          role="status"
          className={`text-xs sm:absolute sm:translate-y-12 ${
            status === "err" ? "text-red-700" : "text-emerald-700"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

// =====================================================================
// Exit-intent modal
// =====================================================================
export function ExitIntentNewsletterModal() {
  const dict = useDictionary();
  const t = dict.newsletter;
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);
  const lastScrollRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_FLAG)) return;

    function show() {
      if (open) return;
      if (sessionStorage.getItem(SESSION_FLAG)) return;
      sessionStorage.setItem(SESSION_FLAG, "1");
      setOpen(true);
      track("exit_intent_modal_shown");
    }

    function onMouseLeave(e: MouseEvent) {
      // Only fire when the cursor leaves the top edge — that's the
      // "they're about to close the tab" signal.
      if (e.clientY <= 0) show();
    }

    function onScroll() {
      const y = window.scrollY;
      const dy = lastScrollRef.current - y;
      lastScrollRef.current = y;
      // Fire on a fast scroll-up gesture (mobile). Tuned conservatively.
      if (dy > 60 && y < 200) show();
    }

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage(null);
    const result = await submit(email.trim(), {
      error: t.fallbackError,
      success: t.fallbackSuccess,
      unreachable: t.fallbackUnreachable,
    });
    setStatus(result.ok ? "ok" : "err");
    setMessage(result.message);
    if (result.ok) {
      track("exit_intent_modal_signup");
      setEmail("");
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl p-8">
        <button
          type="button"
          aria-label={t.close}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-[var(--surface)]"
          onClick={() => setOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 mb-5">
          <Sparkles className="w-6 h-6 text-white" />
        </div>

        <h2 id="exit-intent-title" className="display text-2xl mb-3">
          {t.exitTitle}
        </h2>
        <p className="text-[var(--muted)] mb-5 leading-relaxed">
          {t.exitBody}
        </p>

        <form onSubmit={onSubmit} className="space-y-3">
          <label className="sr-only" htmlFor="exit-intent-email">
            {t.emailLabel}
          </label>
          <input
            id="exit-intent-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.placeholder}
            className="w-full px-4 h-12 rounded-2xl border border-[var(--hairline)] bg-white focus:outline-none focus:border-[var(--accent-strong)]"
            disabled={status === "loading"}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full inline-flex items-center justify-center h-12 rounded-2xl bg-[var(--foreground)] text-white font-medium hover:bg-black transition-colors disabled:opacity-50"
          >
            {status === "loading" ? t.subscribing : t.sendFreeKit}
          </button>
          {message ? (
            <p
              role="status"
              className={`text-sm ${
                status === "err" ? "text-red-700" : "text-emerald-700"
              }`}
            >
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
