"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { track } from "@/lib/analytics";
import { useDictionary } from "@/i18n/use-dictionary";

export function ReferralLinkCopy({ shareUrl }: { shareUrl: string }) {
  const dict = useDictionary();
  const t = dict.referralLinkCopy;
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      track("referral_link_copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select the input so the user can ctrl+C.
    }
  }

  return (
    <div className="flex items-stretch gap-2">
      <input
        readOnly
        value={shareUrl}
        onClick={(e) => (e.target as HTMLInputElement).select()}
        className="flex-1 px-4 h-12 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] font-mono text-sm focus:outline-none focus:border-[var(--accent-strong)]"
        aria-label={t.aria}
      />
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center justify-center gap-2 px-5 h-12 rounded-xl bg-[var(--foreground)] text-white text-sm font-medium hover:bg-black transition-colors flex-shrink-0"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? t.copied : t.copy}
      </button>
    </div>
  );
}
