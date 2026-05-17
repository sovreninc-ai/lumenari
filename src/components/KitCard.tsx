"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { formatCAD, type Kit } from "@/data/kits";
import { useDictionary } from "@/i18n/use-dictionary";

const aiLabel: Record<string, string> = {
  "claude-code": "Claude Code",
  claude: "Claude",
  chatgpt: "ChatGPT",
  codex: "Codex",
  gemini: "Gemini",
  cursor: "Cursor",
  any: "Any AI",
};

interface KitCardProps {
  kit: Kit;
  reason?: string;
  index?: number;
}

export function KitCard({ kit, reason, index = 0 }: KitCardProps) {
  const dict = useDictionary();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className="card flex flex-col h-full"
    >
      <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--surface)] border border-[var(--hairline)] px-2.5 py-1">
          <Sparkles className="w-3 h-3" />
          {kit.aiTargets.map((t) => aiLabel[t] ?? t).join(" · ")}
        </span>
      </div>

      <h3 className="text-xl font-semibold tracking-tight mb-2">{kit.name}</h3>
      <p className="text-[var(--muted)] text-[0.95rem] leading-relaxed">
        {kit.tagline}
      </p>

      {reason ? (
        <div className="mt-4 rounded-xl bg-[var(--surface)] border border-[var(--hairline)] p-3 text-sm text-[var(--foreground)]">
          <span className="eyebrow block mb-1 text-[10px]">{dict.useCaseLanding.whyThisKit}</span>
          {reason}
        </div>
      ) : null}

      <div className="mt-6 pt-5 border-t border-[var(--hairline)] flex items-center justify-between">
        <span className="text-lg font-semibold">
          {formatCAD(kit.priceCents)}
        </span>
        <Link
          href={`/kits/${kit.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium hover:text-[var(--accent-strong)]"
        >
          {dict.kits.seeWhatsInside}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
