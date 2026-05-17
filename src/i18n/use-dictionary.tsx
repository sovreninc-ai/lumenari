"use client";

/**
 * Locale + dictionary context for client components.
 *
 * The root layout wraps the tree with `<LocaleProvider>`, passing the
 * resolved locale. Any `'use client'` component then calls
 * `useDictionary()` to read the localized strings without prop-drilling.
 *
 * Server components should keep using `getDictionary(locale)` directly —
 * this provider exists only for the client tree.
 */

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { getDictionary, type Dictionary } from "./dictionaries";
import { DEFAULT_LOCALE, type Locale } from "./locales";

interface LocaleContextValue {
  locale: Locale;
  dict: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const value = useMemo<LocaleContextValue>(
    () => ({ locale, dict: getDictionary(locale) }),
    [locale],
  );
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

/**
 * Read the active dictionary. Falls back to the default locale's dictionary
 * if used outside of a `<LocaleProvider>` (e.g. tests, isolated stories).
 */
export function useDictionary(): Dictionary {
  const ctx = useContext(LocaleContext);
  if (ctx) return ctx.dict;
  return getDictionary(DEFAULT_LOCALE);
}

/** Read the active locale code. Defaults to `en` when no provider is mounted. */
export function useLocale(): Locale {
  const ctx = useContext(LocaleContext);
  if (ctx) return ctx.locale;
  return DEFAULT_LOCALE;
}
