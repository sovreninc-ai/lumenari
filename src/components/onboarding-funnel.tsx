"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, RotateCcw, Check } from "lucide-react";
import { KITS, formatCAD } from "@/data/kits";
import { KitCard } from "./KitCard";
import { useDictionary } from "@/i18n/use-dictionary";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Onboarding funnel — chip-driven 3-step replacement for the open-textarea
 * wizard. Same `/api/recommend` API on the back-end; the funnel just
 * constructs a structured useCase string before posting.
 *
 * Step 1: role chips (Marketing pro, Sales pro, Developer, …).
 * Step 2: "I want help with…" chips, dynamically populated per role.
 * Step 3: AI of choice (Claude, ChatGPT, Codex, Gemini, Cursor, Any).
 * Step 3 done → call /api/recommend and render kits.
 *
 * The role-id + recommendPrefix strings stay in English on purpose — they're
 * fed into the recommender's prompt template downstream, which expects EN.
 * The user-visible label + taskChips come from the active dictionary.
 */

type RoleId =
  | "marketing"
  | "sales"
  | "developer"
  | "founder"
  | "realEstate"
  | "recruiter"
  | "solopreneur"
  | "creator"
  | "other";

interface RoleDef {
  id: RoleId;
  /** Phrase prepended in the useCase string so the recommender knows the role. */
  recommendPrefix: string;
}

const ROLES: RoleDef[] = [
  { id: "marketing", recommendPrefix: "I'm a marketing professional and" },
  { id: "sales", recommendPrefix: "I'm a sales professional and" },
  { id: "developer", recommendPrefix: "I'm a developer and" },
  { id: "founder", recommendPrefix: "I'm a startup founder and" },
  { id: "realEstate", recommendPrefix: "I'm a real estate agent and" },
  { id: "recruiter", recommendPrefix: "I'm a recruiter and" },
  { id: "solopreneur", recommendPrefix: "I'm a solopreneur and" },
  { id: "creator", recommendPrefix: "I'm a content creator and" },
  { id: "other", recommendPrefix: "My role is:" },
];

const AI_IDS = ["claude", "chatgpt", "codex", "gemini", "cursor", "any"] as const;
type AiId = (typeof AI_IDS)[number];

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
  const dict = useDictionary();
  const t = dict.onboarding;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [role, setRole] = useState<RoleDef | null>(null);
  const [otherRole, setOtherRole] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [customTask, setCustomTask] = useState("");
  const [ai, setAi] = useState<AiId | null>(null);
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

  function toggleTask(taskValue: string) {
    setTasks((prev) =>
      prev.includes(taskValue)
        ? prev.filter((x) => x !== taskValue)
        : [...prev, taskValue],
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
      setError(t.errorPickRoleAndTask);
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
        const msg = "error" in data ? data.error : t.errorGeneric;
        throw new Error(msg);
      }
      const parsed = data as RecommendResponse;
      setRecs(parsed.recommendations.slice(0, 3));
    } catch (e) {
      setError(e instanceof Error ? e.message : t.errorFetch);
    }
  }

  // After step 3 done, run fetch.
  function finishStep3() {
    startTransition(async () => {
      await fetchRecs();
    });
  }

  const currentRoleTasks: string[] = role
    ? [...((t.tasks as Partial<Record<RoleId, readonly string[]>>)[role.id] ?? [])]
    : [];

  return (
    <section
      id="wizard"
      className="mx-auto max-w-3xl px-6 py-20 border-t border-[var(--hairline)]"
    >
      <div className="flex flex-col items-center text-center mb-10">
        <span className="eyebrow">{t.eyebrow}</span>
        <h2 className="display text-3xl sm:text-4xl mt-2 mb-3">{t.title}</h2>
        <p className="text-[var(--muted)] max-w-xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <div className="rounded-3xl border border-[var(--hairline)] bg-white p-6 sm:p-9 relative overflow-hidden">
        <ProgressDots step={step} hasRecs={Boolean(recs)} />

        <AnimatePresence mode="wait">
          {recs ? (
            <motion.div key="recs" {...fadeUp}>
              <RecsView recs={recs} reset={reset} dict={dict} />
            </motion.div>
          ) : step === 1 ? (
            <motion.div key="step1" {...fadeUp}>
              <h3 className="display text-xl mb-4">{t.step1Heading}</h3>
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
                    {t.roles[r.id]}
                  </Chip>
                ))}
              </div>
            </motion.div>
          ) : step === 2 ? (
            <motion.div key="step2" {...fadeUp}>
              <h3 className="display text-xl mb-2">{t.step2Heading}</h3>
              {role?.id === "other" ? (
                <div className="mb-4">
                  <label
                    htmlFor="other-role"
                    className="text-sm text-[var(--muted)] mb-2 block"
                  >
                    {t.step2OtherLabel}
                  </label>
                  <input
                    id="other-role"
                    type="text"
                    placeholder={t.step2OtherPlaceholder}
                    value={otherRole}
                    onChange={(e) => setOtherRole(e.target.value)}
                    className="w-full rounded-2xl border border-[var(--hairline)] bg-white px-4 h-12 text-base focus:outline-none focus:ring-2 focus:ring-[var(--accent-strong)]/30 focus:border-[var(--accent-strong)]"
                  />
                </div>
              ) : null}
              <p className="text-sm text-[var(--muted)] mb-4">
                {t.step2PickAny}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {currentRoleTasks.map((taskLabel) => (
                  <Chip
                    key={taskLabel}
                    active={tasks.includes(taskLabel)}
                    onClick={() => toggleTask(taskLabel)}
                  >
                    {tasks.includes(taskLabel) ? (
                      <Check className="w-3.5 h-3.5 mr-1" />
                    ) : null}
                    {taskLabel}
                  </Chip>
                ))}
              </div>
              <input
                type="text"
                placeholder={t.step2CustomPlaceholder}
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
                  ← {t.back}
                </button>
                <button
                  type="button"
                  disabled={tasks.length === 0 && customTask.trim().length === 0}
                  onClick={() => setStep(3)}
                  className="btn-primary"
                >
                  {t.continue}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="step3" {...fadeUp}>
              <h3 className="display text-xl mb-4">{t.step3Heading}</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {AI_IDS.map((id) => (
                  <Chip
                    key={id}
                    active={ai === id}
                    onClick={() => setAi(id)}
                  >
                    {t.aiOptions[id]}
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
                  ← {t.back}
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
                  {isPending ? t.finding : t.getMyKit}
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
  dict,
}: {
  recs: Recommendation[];
  reset: () => void;
  dict: Dictionary;
}) {
  const t = dict.onboarding;
  const matched = recs
    .map((r) => ({
      rec: r,
      kit: KITS.find((k) => k.slug === r.slug),
    }))
    .filter((m) => m.kit);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="display text-xl">{t.yourKits}</h3>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {t.startOver}
        </button>
      </div>
      {matched.length === 0 ? (
        <p className="text-[var(--muted)]">{t.couldNotPick}</p>
      ) : (
        <div className="space-y-4">
          {matched.map(({ rec, kit }, i) =>
            kit ? (
              <div key={kit.slug}>
                <KitCard kit={kit} index={i} />
                {rec.reason ? (
                  <p className="text-sm text-[var(--muted)] mt-2 pl-1">
                    <strong className="text-[var(--foreground)] not-italic">
                      {t.why}
                    </strong>{" "}
                    {rec.reason}
                  </p>
                ) : null}
              </div>
            ) : null,
          )}
          <p className="text-xs text-[var(--muted)] pt-2">
            {t.proNudgePrefix} {formatCAD(1900)} {t.proNudgeSuffix}{" "}
            <a
              href="/pro"
              className="underline hover:text-[var(--foreground)]"
            >
              {t.proNudgeLink}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
