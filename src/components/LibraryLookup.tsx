"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { useDictionary } from "@/i18n/use-dictionary";

export function LibraryLookup() {
  const dict = useDictionary();
  const t = dict.libraryLookup;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/library/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? t.couldNotSend);
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t.somethingWentWrong);
    }
  }

  if (status === "sent") {
    return (
      <div className="card text-center">
        <CheckCircle2 className="w-10 h-10 mx-auto mb-3 text-[var(--accent-strong)]" />
        <h2 className="text-xl font-semibold mb-2">{t.inboxTitle}</h2>
        <p className="text-[var(--muted)]">
          {t.inboxBodyPrefix} <strong>{email}</strong>
          {t.inboxBodySuffix}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card">
      <label htmlFor="email" className="block text-sm font-medium mb-2">
        {t.emailLabel}
      </label>
      <div className="relative">
        <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.emailPlaceholder}
          autoComplete="email"
          className="input pl-10"
        />
      </div>
      {error ? (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending" || email.length < 5}
        className="btn-primary w-full mt-5 disabled:opacity-60"
      >
        {status === "sending" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : null}
        {status === "sending" ? t.sending : t.send}
      </button>
      <p className="text-xs text-[var(--muted)] mt-3 text-center">
        {t.passwordlessNote}
      </p>
    </form>
  );
}
