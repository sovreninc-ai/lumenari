"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, RotateCcw } from "lucide-react";
import {
  KITS,
  BUNDLES,
  bundleSavings,
  formatCAD,
  type Kit,
} from "@/data/kits";
import { KitCard } from "./KitCard";
import { BuyButton } from "./BuyButton";

// All five platforms — see /Users/chrisholwell/Desktop/Lumenari/src/data/kits.ts
const AI_OPTIONS = [
  { id: "claude", label: "Claude" },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "codex", label: "Codex" },
  { id: "gemini", label: "Gemini" },
  { id: "cursor", label: "Cursor" },
] as const;

// Lean non-dev: the wizard is for everyone, not just engineers.
const EXAMPLE_USE_CASES: string[] = [
  "I'm a real estate agent writing listings",
  "I'm an SDR sending cold emails",
  "I'm a freelancer writing proposals",
  "I'm an SEO writer publishing 3 articles a week",
  "I'm a recruiter sourcing senior engineers",
  "I'm a founder writing investor updates",
  "I run a small construction crew and drown in safety paperwork",
  "I'm shipping a Next.js + Supabase SaaS",
];

interface Recommendation {
  slug: string;
  reason: string;
}

interface RecommendResponse {
  recommendations: Recommendation[];
  fallback?: boolean;
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
};

export function Wizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [ai, setAi] = useState<string | null>(null);
  const [useCase, setUseCase] = useState("");
  const [recs, setRecs] = useState<Recommendation[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function reset() {
    setStep(1);
    setAi(null);
    setUseCase("");
    setRecs(null);
    setError(null);
  }

  async function fetchRecs() {
    setError(null);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ai, useCase }),
      });
      const data = (await res.json()) as RecommendResponse | { error: string };
      if (!res.ok) {
        const msg = "error" in data ? data.error : "Failed to recommend";
        throw new Error(msg);
      }
      const recs = (data as RecommendResponse).recommendations ?? [];
      setRecs(recs);
      setStep(3);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
    }
  }

  return (
    <section
      id="wizard"
      className="mx-auto max-w-3xl px-6 py-16 scroll-mt-24"
      aria-label="Find your kit"
    >
      <div className="mb-8 flex items-center justify-between text-sm text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <Dot active={step >= 1} />
          <Dot active={step >= 2} />
          <Dot active={step >= 3} />
          <span className="ml-2">Step {step} of 3</span>
        </div>
        {step > 1 ? (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1 hover:text-[var(--foreground)]"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Start over
          </button>
        ) : null}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div key="step-1" {...fadeUp}>
            <h2 className="display text-3xl sm:text-4xl mb-3">
              Which AI are you using?
            </h2>
            <p className="text-[var(--muted)] mb-8">
              Pick the tool you reach for most. We&apos;ll match a kit to it.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {AI_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className="chip"
                  data-active={ai === opt.id}
                  onClick={() => setAi(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="mt-10">
              <button
                type="button"
                className="btn-primary"
                disabled={!ai}
                onClick={() => setStep(2)}
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : null}

        {step === 2 ? (
          <motion.div key="step-2" {...fadeUp}>
            <h2 className="display text-3xl sm:text-4xl mb-3">
              What are you using it for?
            </h2>
            <p className="text-[var(--muted)] mb-6">
              A sentence or two is plenty. Plain English.
            </p>
            <textarea
              className="textarea"
              placeholder="e.g. I'm a real estate agent in Calgary writing listings and following up with buyers."
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              maxLength={800}
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {EXAMPLE_USE_CASES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  className="chip text-[0.85rem]"
                  onClick={() => setUseCase(ex)}
                >
                  {ex}
                </button>
              ))}
            </div>
            {error ? (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}
            <div className="mt-10 flex items-center gap-3">
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                type="button"
                className="btn-primary"
                disabled={useCase.trim().length < 8 || isPending}
                onClick={() => startTransition(fetchRecs)}
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : null}
                {isPending ? "Thinking…" : "Show my kit"}
              </button>
            </div>
          </motion.div>
        ) : null}

        {step === 3 && recs ? (
          <motion.div key="step-3" {...fadeUp}>
            <h2 className="display text-3xl sm:text-4xl mb-3">
              Built for what you described.
            </h2>
            <p className="text-[var(--muted)] mb-10 max-w-xl">
              Buy any kit on its own, or pick a bundle below and save.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {recs.map((r, i) => {
                const kit = KITS.find((k) => k.slug === r.slug);
                if (!kit) return null;
                return (
                  <RecommendedKit
                    kit={kit}
                    reason={r.reason}
                    index={i}
                    key={kit.slug}
                  />
                );
              })}
            </div>

            <FeaturedBundles />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function Dot({ active }: { active: boolean }) {
  return (
    <span
      className="inline-block w-2 h-2 rounded-full transition-colors"
      style={{
        background: active ? "var(--foreground)" : "var(--hairline)",
      }}
    />
  );
}

function RecommendedKit({
  kit,
  reason,
  index,
}: {
  kit: Kit;
  reason: string;
  index: number;
}) {
  return (
    <div className="flex flex-col gap-3">
      <KitCard kit={kit} reason={reason} index={index} />
      <BuyButton
        slugs={[kit.slug]}
        label={`Get this kit · ${formatCAD(kit.priceCents)}`}
      />
    </div>
  );
}

function FeaturedBundles() {
  const featured = BUNDLES.filter((b) => b.featured);
  return (
    <div className="space-y-4">
      {featured.map((b, i) => (
        <motion.div
          key={b.slug}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
          className="rounded-3xl p-[1px] bg-spectrum"
        >
          <div className="rounded-3xl bg-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="max-w-md">
              <span className="eyebrow">Bundle</span>
              <h3 className="display text-xl sm:text-2xl mt-1.5 mb-1">
                {b.name}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {b.tagline}
              </p>
              <p className="text-sm mt-2">
                <strong>{formatCAD(b.priceCents)}</strong>
                <span className="text-[var(--muted)]">
                  {" "}
                  · saves {formatCAD(bundleSavings(b))}
                </span>
              </p>
            </div>
            <BuyButton
              slugs={[b.slug]}
              label={`Get bundle · ${formatCAD(b.priceCents)}`}
              className="md:w-64"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
