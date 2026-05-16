"use client";

import { useState, useTransition } from "react";
import { Bookmark, BookmarkCheck, Loader2, X } from "lucide-react";

/**
 * Save-to-wishlist button for kit detail pages.
 *
 * Click → opens a small email-capture modal (unless we have an `email` in
 * localStorage from a prior lead-magnet claim, in which case the save is
 * one-click). POSTs to /api/wishlist/save.
 */
export function SaveKitButton({
  kitSlug,
  kitName,
  source = "kit-detail",
}: {
  kitSlug: string;
  kitName: string;
  source?: string;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function trySaveWithStoredEmail() {
    if (typeof window === "undefined") {
      setOpen(true);
      return;
    }
    const stored = window.localStorage.getItem("lumenari_email");
    if (stored && stored.includes("@")) {
      submit(stored);
      return;
    }
    setOpen(true);
  }

  function submit(targetEmail: string) {
    setStatus("idle");
    setMessage(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/wishlist/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: targetEmail,
            kitSlug,
            source,
          }),
        });
        const data = (await res.json()) as
          | { ok: true; leadId: string; wishlistId: string; already?: boolean }
          | { error: string };
        if (!res.ok || !("ok" in data)) {
          throw new Error("error" in data ? data.error : "Something went wrong");
        }
        if (typeof window !== "undefined") {
          window.localStorage.setItem("lumenari_email", targetEmail);
        }
        setStatus("saved");
        setMessage(
          data.already
            ? `Already saved — it's on your /library wishlist.`
            : `Saved. We'll email you if ${kitName} drops in price or appears in a new bundle.`,
        );
        setOpen(false);
      } catch (err) {
        setStatus("error");
        setMessage(
          err instanceof Error ? err.message : "Something went wrong.",
        );
      }
    });
  }

  if (status === "saved") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-white px-4 py-2 text-sm text-[var(--muted)]">
        <BookmarkCheck className="w-4 h-4 text-[var(--accent-strong)]" />
        Saved to your library
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={trySaveWithStoredEmail}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-white px-4 py-2 text-sm font-medium hover:bg-[var(--surface)] transition-colors disabled:opacity-60"
        aria-label={`Save ${kitName} to wishlist`}
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Bookmark className="w-4 h-4" />
        )}
        {isPending ? "Saving…" : "Save kit"}
      </button>

      {status === "error" && message ? (
        <p role="alert" className="text-sm text-red-600 mt-2">
          {message}
        </p>
      ) : null}

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Save kit to your wishlist"
        >
          <div className="w-full max-w-md rounded-3xl bg-white border border-[var(--hairline)] p-6 sm:p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-[var(--surface)]"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="display text-2xl mb-2">Save {kitName} for later</h3>
            <p className="text-sm text-[var(--muted)] mb-5 leading-relaxed">
              Drop your email and we&apos;ll let you know if this kit drops in
              price or shows up in a bundle. No spam, unsubscribe anytime.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.includes("@")) {
                  setStatus("error");
                  setMessage("Please enter a valid email.");
                  return;
                }
                submit(email);
              }}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="you@work.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full border border-[var(--hairline)] bg-white px-5 h-12 text-base focus:outline-none focus:ring-2 focus:ring-[var(--accent-strong)]/30 focus:border-[var(--accent-strong)]"
              />
              <button
                type="submit"
                disabled={isPending}
                className="btn-primary justify-center"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : null}
                {isPending ? "Saving…" : "Save kit"}
              </button>
              {status === "error" && message ? (
                <p role="alert" className="text-sm text-red-600">
                  {message}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
