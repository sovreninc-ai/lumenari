"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, RotateCcw, Check } from "lucide-react";
import { KITS, formatCAD } from "@/data/kits";
import { KitCard } from "./KitCard";

/**
 * Onboarding funnel — chip-driven 3-step replacement for the open-textarea
 * wizard. Same `/api/recommend` API on the back-end; the funnel just
 * constructs a structured useCase string before posting.
 *
 * Step 1: role chips (Marketing pro, Sales pro, Developer, …).
 * Step 2: "I want help with…" chips, dynamically populated per role.
 * Step 3: AI of choice (Claude, ChatGPT, Codex, Gemini, Cursor, Any).
 * Step 3 done → call /api/recommend and render kits.
 */

interface RoleDef {
  id: string;
  label: string;
  taskChips: string[];
  /** Phrase prepended in the useCase string so the recommender knows the role. */
  recommendPrefix: string;
}

const ROLES: RoleDef[] = [
  {
    id: "marketing",
    label: "Marketing pro",
    recommendPrefix: "I'm a marketing professional and",
    taskChips: [
      "Writing SEO content at scale",
      "Drafting brand-voice copy",
      "Building a newsletter",
      "Product copy + landing pages",
      "Campaign briefs + creative",
    ],
  },
  {
    id: "sales",
    label: "Sales pro",
    recommendPrefix: "I'm a sales professional and",
    taskChips: [
      "Cold outreach + sequences",
      "Discovery + qualification",
      "Proposal drafting",
      "Follow-up + reverse-engagement",
      "Account research briefs",
    ],
  },
  {
    id: "developer",
    label: "Developer",
    recommendPrefix: "I'm a developer and",
    taskChips: [
      "Next.js + Supabase production",
      "Stripe Connect + webhooks",
      "Supabase RLS + auth",
      "iOS / SwiftUI work",
      "Python data + ML",
      "Go / Node / Rails backend",
      "DevOps / Terraform / Kubernetes",
    ],
  },
  {
    id: "founder",
    label: "Founder",
    recommendPrefix: "I'm a startup founder and",
    taskChips: [
      "Investor updates + decks",
      "Hiring + first-team workflow",
      "Customer support patterns",
      "Solo-operator playbook",
      "Pricing + positioning",
    ],
  },
  {
    id: "real-estate",
    label: "Real estate agent",
    recommendPrefix: "I'm a real estate agent and",
    taskChips: [
      "Listing copy + descriptions",
      "CMAs + market briefs",
      "Buyer + seller outreach",
      "Open-house follow-up",
      "Lead nurture sequences",
    ],
  },
  {
    id: "recruiter",
    label: "Recruiter",
    recommendPrefix: "I'm a recruiter and",
    taskChips: [
      "Sourcing senior engineers",
      "Cold outreach to passive candidates",
      "Screening notes + scorecards",
      "Hiring-manager calibration",
      "Diverse-pipeline searches",
    ],
  },
  {
    id: "solopreneur",
    label: "Solopreneur",
    recommendPrefix: "I'm a solopreneur and",
    taskChips: [
      "Email + social drafting",
      "Client proposals + SOWs",
      "Customer support templates",
      "Product launches",
      "Newsletter + content",
    ],
  },
  {
    id: "creator",
    label: "Creator",
    recommendPrefix: "I'm a content creator and",
    taskChips: [
      "YouTube scripts + outlines",
      "Newsletter + Substack",
      "Twitter / LinkedIn threads",
      "Podcast prep + show notes",
      "Sponsor outreach",
    ],
  },
  {
    id: "other",
    label: "Something else",
    recommendPrefix: "My role is:",
    taskChips: [],
  },
];

const AI_OPTIONS = [
  { id: "claude", label: "Claude" },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "codex", label: "Codex" },
  { id: "gemini", label: "Gemini" },
  { id: "cursor", label: "Cursor" },
  { id: "any", label: "Any of them" },
] as const;

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
  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
};

export function OnboardingFunnel() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [role, setRole] = useState<RoleDef | null>(null);
  const [otherRole, setOtherRole] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [customTask, setCustomTask] = useState("");
  const [ai, setAi] = useState<string | null>(null);
  const [recs, setRecs] = useState<Recommendation[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function reset() {
    setStep(1);
    setRole(null);
    setOtherRole("");
    setTasks([]);
    setCustomTask("");
    setAi(null);
    setRecs(null);
    setError(null);
  }

  function toggleTask(t: string) {
    setTasks((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  }

  function buildUseCase(): string {
    if (!role) return "";
    const prefix =
      role.id === "other" && otherRole.trim()
        ? `My role: ${otherRole.trim()}.`
        : role.recommendPrefix;
    const taskList: string[] = [];
    if (tasks.length > 0) {
      taskList.push(...tasks);
    }
    if (customTask.trim()) {
      taskList.push(customTask.trim());
    }
    const tail =
      taskList.length > 0
        ? ` I want help with: ${taskList.join(", ")}.`
        : "";
    return `${prefix}${tail}`.trim();
  }

  async function fetchRecs() {
    setError(null);
    const useCase = buildUseCase();
    if (useCase.length < 6) {
      setError("Please pick a role and at least one task.");
      return;
    }
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
      const parsed = data as RecommendResponse;
      setRecs(parsed.recommendations.slice(0, 3));
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Couldn't fetch recommendations.",
      );
    }
  }

  // After step 3 done, run fetch.
  function finishStep3() {
    startTransition(async () => {
      await fetchRecs();
    });
  }

  return (
    <section
      id="wizard"
      className="mx-auto max-w-3xl px-6 py-20 border-t border-[var(--hairline)]"
    >
      <div className="flex flex-col items-center text-center mb-10">
        <span className="eyebrow">Find your kit in 30 seconds</span>
        <h2 className="display text-3xl sm:text-4xl mt-2 mb-3">
          Tell us about you. We&apos;ll pick the kit.
        </h2>
        <p className="text-[var(--muted)] max-w-xl leading-relaxed">
          Three taps — your role, what you&apos;re working on, and which AI
          you reach for. We recommend the closest-fit kit from the catalog.
        </p>
      </div>

      <div className="rounded-3xl border border-[var(--hairline)] bg-white p-6 sm:p-9 relative overflow-hidden">
        <ProgressDots step={step} hasRecs={Boolean(recs)} />

        <AnimatePresence mode="wait">
          {recs ? (
            <motion.div key="recs" {...fadeUp}>
              <RecsView recs={recs} reset={reset} />
            </motion.div>
          ) : step === 1 ? (
            <motion.div key="step1" {...fadeUp}>
              <h3 className="display text-xl mb-4">What&apos;s your role?</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {ROLES.map((r) => (
                  <Chip
                    key={r.id}
                    active={role?.id === r.id}
                    onClick={() => {
                      setRole(r);
                      // Move to step 2 immediately on click.
                      setStep(2);
                    }}
                  >
                    {r.label}
                  </Chip>
                ))}
              </div>
            </motion.div>
          ) : step === 2 ? (
            <motion.div key="step2" {...fadeUp}>
              <h3 className="display text-xl mb-2">
                What do you want help with?
              </h3>
              {role?.id === "other" ? (
                <div className="mb-4">
                  <label
                    htmlFor="other-role"
                    className="text-sm text-[var(--muted)] mb-2 block"
                  >
                    Tell us your role
                  </label>
                  <input
                    id="other-role"
                    type="text"
                    placeholder="e.g. nonprofit director, lawyer, teacher…"
                    value={otherRole}
                    onChange={(e) => setOtherRole(e.target.value)}
                    className="w-full rounded-2xl border border-[var(--hairline)] bg-white px-4 h-12 text-base focus:outline-none focus:ring-2 focus:ring-[var(--accent-strong)]/30 focus:border-[var(--accent-strong)]"
                  />
                </div>
              ) : null}
              <p className="text-sm text-[var(--muted)] mb-4">
                Pick any that apply, or add your own.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {(role?.taskChips ?? []).map((t) => (
                  <Chip
                    key={t}
                    active={tasks.includes(t)}
                    onClick={() => toggleTask(t)}
                  >
                    {tasks.includes(t) ? (
                      <Check className="w-3.5 h-3.5 mr-1" />
                    ) : null}
                    {t}
                  </Chip>
                ))}
              </div>
              <input
                type="text"
                placeholder="Or describe what you do (optional)…"
                value={customTask}
                onChange={(e) => setCustomTask(e.target.value)}
                className="w-full rounded-2xl border border-[var(--hairline)] bg-white px-4 h-12 text-base focus:outline-none focus:ring-2 focus:ring-[var(--accent-strong)]/30 focus:border-[var(--accent-strong)]"
              />
              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  disabled={tasks.length === 0 && customTask.trim().length === 0}
                  onClick={() => setStep(3)}
                  className="btn-primary"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="step3" {...fadeUp}>
              <h3 className="display text-xl mb-4">
                Which AI do you reach for?
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {AI_OPTIONS.map((opt) => (
                  <Chip
                    key={opt.id}
                    active={ai === opt.id}
                    onClick={() => setAi(opt.id)}
                  >
                    {opt.label}
                  </Chip>
                ))}
              </div>
              {error ? (
                <p role="alert" className="text-sm text-red-600 mb-3">
                  {error}
                </p>
              ) : null}
              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                  onClick={() => setStep(2)}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  disabled={!ai || isPending}
                  onClick={finishStep3}
                  className="btn-primary"
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : null}
                  {isPending ? "Finding kits…" : "Get my kit"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-[var(--accent-strong)] bg-[var(--accent-strong)] text-white"
          : "border-[var(--hairline)] bg-white text-[var(--foreground)] hover:bg-[var(--surface)]"
      }`}
    >
      {children}
    </button>
  );
}

function ProgressDots({ step, hasRecs }: { step: number; hasRecs: boolean }) {
  const active = hasRecs ? 4 : step;
  return (
    <div className="flex items-center gap-1.5 mb-6">
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          aria-hidden
          className={`h-1.5 rounded-full transition-all ${
            i <= active
              ? "w-8 bg-[var(--accent-strong)]"
              : "w-4 bg-[var(--hairline)]"
          }`}
        />
      ))}
    </div>
  );
}

function RecsView({
  recs,
  reset,
}: {
  recs: Recommendation[];
  reset: () => void;
}) {
  const matched = recs
    .map((r) => ({
      rec: r,
      kit: KITS.find((k) => k.slug === r.slug),
    }))
    .filter((m) => m.kit);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="display text-xl">Your kits</h3>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Start over
        </button>
      </div>
      {matched.length === 0 ? (
        <p className="text-[var(--muted)]">
          We couldn&apos;t pick a kit cleanly — try browsing the catalog
          directly.
        </p>
      ) : (
        <div className="space-y-4">
          {matched.map(({ rec, kit }, i) =>
            kit ? (
              <div key={kit.slug}>
                <KitCard kit={kit} index={i} />
                {rec.reason ? (
                  <p className="text-sm text-[var(--muted)] mt-2 pl-1">
                    <strong className="text-[var(--foreground)] not-italic">
                      Why:
                    </strong>{" "}
                    {rec.reason}
                  </p>
                ) : null}
              </div>
            ) : null,
          )}
          <p className="text-xs text-[var(--muted)] pt-2">
            Prefer the all-access route? Pro+ unlocks every kit for{" "}
            {formatCAD(1900)} CAD/month.{" "}
            <a
              href="/pro"
              className="underline hover:text-[var(--foreground)]"
            >
              See Pro+ →
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
