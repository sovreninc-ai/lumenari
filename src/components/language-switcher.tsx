"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Globe } from "lucide-react";
import {
  LOCALES,
  LOCALE_NAMES,
  LOCALE_FLAGS,
  LOCALE_COOKIE,
  isLocale,
  type Locale,
} from "@/i18n/locales";

interface LanguageSwitcherProps {
  /** Optional initial locale (server-passed). Defaults to reading the cookie. */
  initialLocale?: Locale;
}

export function LanguageSwitcher({ initialLocale }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const current: Locale =
    initialLocale ?? readCookieLocale() ?? (LOCALES[0] as Locale);

  function pick(next: Locale) {
    setOpen(false);
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

    // Swap the locale segment in the URL if there is one, otherwise just
    // refresh in place (the middleware re-resolves from the cookie).
    const segments = pathname.split("/").filter(Boolean);
    let target = pathname;
    if (segments.length > 0 && isLocale(segments[0])) {
      segments[0] = next;
      target = `/${segments.join("/")}`;
    }
    startTransition(() => {
      router.replace(target);
      router.refresh();
    });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-[var(--surface)] text-sm font-medium disabled:opacity-60"
      >
        <Globe className="w-4 h-4" aria-hidden="true" />
        <span aria-hidden="true">{LOCALE_FLAGS[current]}</span>
        <span className="hidden sm:inline">{LOCALE_NAMES[current]}</span>
        <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 mt-1 min-w-[170px] rounded-2xl border border-[var(--hairline)] bg-white shadow-lg py-1 z-50"
        >
          {LOCALES.map((loc) => {
            const isCurrent = loc === current;
            return (
              <li key={loc}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isCurrent}
                  onClick={() => pick(loc)}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-[var(--surface)] ${
                    isCurrent ? "font-semibold" : ""
                  }`}
                >
                  <span aria-hidden="true">{LOCALE_FLAGS[loc]}</span>
                  <span>{LOCALE_NAMES[loc]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function readCookieLocale(): Locale | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`),
  );
  const raw = match ? decodeURIComponent(match[1]) : undefined;
  return raw && isLocale(raw) ? raw : undefined;
}
