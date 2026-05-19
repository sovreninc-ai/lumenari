/**
 * Pulls a localized kit title + tagline out of the translated SKILL.md files
 * that ship in `content/<slug>/<locale>/`. The translated kit metadata isn't
 * stored as structured data — the translators wrote it as the H1 and the
 * first blockquote of the SKILL.md. Treat those as the source of truth:
 *
 *   # Annonces Immobilières + Analyse de Marché      ← name
 *
 *   > Conçu pour les agents en exercice qui...       ← tagline
 *
 * Description and `whatsInside` aren't translated as structured fields,
 * so callers fall back to English for those.
 *
 * Behaviour:
 *  - Returns `null` if the locale is English, or if no translated SKILL.md
 *    exists for that (slug, locale). The caller falls back to `kit.name` /
 *    `kit.tagline` straight from `src/data/kits.ts`.
 *  - Cached in-process per (slug, locale) — these files are static at deploy
 *    time, no point hitting the disk repeatedly.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/locales";
import type { Kit } from "@/data/kits";

export interface LocalizedKitMeta {
  name: string;
  tagline: string;
}

const cache = new Map<string, LocalizedKitMeta | null>();

function cacheKey(slug: string, locale: Locale) {
  return `${slug}::${locale}`;
}

export async function getLocalizedKitMeta(
  slug: string,
  locale: Locale,
): Promise<LocalizedKitMeta | null> {
  if (locale === DEFAULT_LOCALE) return null;
  const key = cacheKey(slug, locale);
  if (cache.has(key)) return cache.get(key) ?? null;

  const file = path.join(
    process.cwd(),
    "content",
    slug,
    locale,
    "SKILL.md",
  );

  let raw: string;
  try {
    raw = await readFile(file, "utf8");
  } catch {
    cache.set(key, null);
    return null;
  }

  const parsed = parseSkillHeader(raw);
  cache.set(key, parsed);
  return parsed;
}

/**
 * Convenience: apply localized name/tagline onto a Kit. Returns a shallow
 * copy with translated fields where they exist, English otherwise.
 */
export async function localizeKit(kit: Kit, locale: Locale): Promise<Kit> {
  const meta = await getLocalizedKitMeta(kit.slug, locale);
  if (!meta) return kit;
  return {
    ...kit,
    name: meta.name || kit.name,
    tagline: meta.tagline || kit.tagline,
  };
}

/**
 * Pull `# Title` and the first `> blockquote` out of a SKILL.md.
 *
 * The translated files all follow the same shape: H1 on line 1, blank line,
 * then a single-line (or rarely two-line) blockquote that acts as the kit's
 * tagline. We tolerate small drift — extra leading whitespace, a multi-line
 * blockquote — but stop at the first non-blockquote line.
 */
function parseSkillHeader(raw: string): LocalizedKitMeta | null {
  const lines = raw.split(/\r?\n/);

  let name: string | null = null;
  const taglineParts: string[] = [];
  let sawBlockquote = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!name) {
      if (line.startsWith("# ")) {
        name = line.slice(2).trim();
      } else if (line === "") {
        continue;
      } else {
        return null;
      }
      continue;
    }

    if (line.startsWith("> ")) {
      taglineParts.push(line.slice(2).trim());
      sawBlockquote = true;
      continue;
    }
    if (line.startsWith(">")) {
      taglineParts.push(line.slice(1).trim());
      sawBlockquote = true;
      continue;
    }

    if (sawBlockquote) break;
    if (line === "") continue;
    return null;
  }

  if (!name) return null;
  const tagline = taglineParts.join(" ").trim();
  return { name, tagline };
}
