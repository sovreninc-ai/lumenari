"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";

export function LibraryLookup() {
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
        throw new Error(data.error ?? "Could not send link");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "sent") {
    return (
      <div className="card text-center">
        <CheckCircle2 className="w-10 h-10 mx-auto mb-3 text-[var(--accent-strong)]" />
        <h2 className="text-xl font-semibold mb-2">Check your inbox.</h2>
        <p className="text-[var(--muted)]">
          If we have a record of <strong>{email}</strong>, your download links
          are on the way.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card">
      <label
        htmlFor="email"
        className="block text-sm font-medium mb-2"
      >
        Email
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
          placeholder="you@example.com"
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
        {status === "sending" ? "Sending link…" : "Send my downloads"}
      </button>
      <p className="text-xs text-[var(--muted)] mt-3 text-center">
        No password. The link is signed and good for 24 hours.
      </p>
    </form>
  );
}
