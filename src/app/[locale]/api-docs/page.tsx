import Link from "next/link";
import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { apiDocsMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  return apiDocsMetadata(safeLocale);
}

type ApiDocsDict = Dictionary["apiDocs"];

/**
 * /api-docs — public API reference.
 *
 * Apple-clean two-column docs layout. Left nav (sticky on desktop), right
 * content. Code samples for each endpoint in cURL, JavaScript, and Python.
 *
 * Highlighting is intentionally CSS-only — no `shiki` dependency for MVP.
 * The visual difference is small at the docs sizes Lumenari needs; we can
 * upgrade to a syntax-highlighted version later without breaking the layout.
 */
export default async function ApiDocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);
  const t = dict.apiDocs;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-12">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1 className="display text-4xl sm:text-5xl mt-2 mb-3">{t.title}</h1>
        <p className="text-[var(--muted)] text-lg max-w-2xl">{t.intro}</p>
      </header>

      <div className="grid lg:grid-cols-[220px_1fr] gap-10">
        <SideNav t={t} />
        <main className="max-w-3xl space-y-16">
          <Quickstart t={t} />
          <Authentication t={t} />
          <RateLimiting t={t} />
          <Endpoints t={t} />
          <ErrorCodes t={t} />
          <WebhooksPlaceholder t={t} />
        </main>
      </div>
    </div>
  );
}

function SideNav({ t }: { t: ApiDocsDict }) {
  const items: Array<{ href: string; label: string }> = [
    { href: "#quickstart", label: t.nav.quickstart },
    { href: "#authentication", label: t.nav.authentication },
    { href: "#rate-limiting", label: t.nav.rateLimiting },
    { href: "#endpoints", label: t.nav.endpoints },
    { href: "#recommend", label: t.nav.recommend },
    { href: "#list-kits", label: t.nav.listKits },
    { href: "#get-kit", label: t.nav.getKit },
    { href: "#download-kit", label: t.nav.downloadKit },
    { href: "#usage", label: t.nav.usage },
    { href: "#error-codes", label: t.nav.errorCodes },
    { href: "#webhooks", label: t.nav.webhooks },
  ];
  return (
    <nav aria-label={t.title} className="lg:sticky lg:top-24 self-start">
      <ul className="space-y-1.5 text-sm">
        {items.map((i) => (
          <li key={i.href}>
            <a
              href={i.href}
              className="block py-1 text-[var(--muted)] hover:text-[var(--foreground)] whitespace-pre"
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Quickstart({ t }: { t: ApiDocsDict }) {
  const q = t.quickstart;
  return (
    <section id="quickstart">
      <h2 className="display text-2xl sm:text-3xl mb-4">{q.heading}</h2>
      <ol className="space-y-3 text-[var(--muted)] mb-6 list-decimal pl-5">
        <li>
          {q.step1Prefix}
          <Link href="/account/api-keys" className="underline">
            {q.step1Link}
          </Link>
          {q.step1Suffix}
        </li>
        <li>
          {q.step2Prefix}
          <CodeInline>Authorization: Bearer lmn_…</CodeInline>
          {q.step2Suffix}
        </li>
        <li>{q.step3}</li>
      </ol>
      <CodeSample
        languages={{
          curl: `curl https://lumenari.io/api/v1/recommend \\
  -H "Authorization: Bearer lmn_..." \\
  -H "Content-Type: application/json" \\
  -d '{"ai_platform":"claude","use_case":"shipping a SaaS on Next.js"}'`,
          javascript: `const res = await fetch("https://lumenari.io/api/v1/recommend", {
  method: "POST",
  headers: {
    "Authorization": "Bearer lmn_...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ai_platform: "claude",
    use_case: "shipping a SaaS on Next.js",
  }),
});
const data = await res.json();`,
          python: `import requests

res = requests.post(
    "https://lumenari.io/api/v1/recommend",
    headers={"Authorization": "Bearer lmn_..."},
    json={
        "ai_platform": "claude",
        "use_case": "shipping a SaaS on Next.js",
    },
)
data = res.json()`,
        }}
      />
    </section>
  );
}

function Authentication({ t }: { t: ApiDocsDict }) {
  const a = t.authentication;
  return (
    <section id="authentication">
      <h2 className="display text-2xl sm:text-3xl mb-4">{a.heading}</h2>
      <p className="text-[var(--muted)] mb-4">
        {a.bodyPrefix} <CodeInline>lmn_</CodeInline>
        {a.bodyMiddle}{" "}
        <Link href="/account/api-keys" className="underline">
          {a.bodyLink}
        </Link>
        {a.bodySuffix}
      </p>
      <CodeSample
        languages={{
          curl: `# Header on every request
Authorization: Bearer lmn_a1b2c3d4e5f6...`,
          javascript: `headers: { "Authorization": "Bearer lmn_a1b2c3d4..." }`,
          python: `headers={"Authorization": "Bearer lmn_a1b2c3d4..."}`,
        }}
      />
      <p className="text-sm text-[var(--muted)] mt-4">{a.note}</p>
    </section>
  );
}

function RateLimiting({ t }: { t: ApiDocsDict }) {
  const r = t.rateLimiting;
  return (
    <section id="rate-limiting">
      <h2 className="display text-2xl sm:text-3xl mb-4">{r.heading}</h2>
      <p className="text-[var(--muted)] mb-4">{r.intro}</p>
      <ul className="space-y-2 mb-4 text-sm">
        <li>
          {r.bullet1Prefix}
          <CodeInline>X-RateLimit-Limit</CodeInline>
          {r.bullet1Suffix}
          <CodeInline>unlimited</CodeInline>
          {r.bullet1Close}
        </li>
        <li>
          {r.bullet2Prefix}
          <CodeInline>X-RateLimit-Remaining</CodeInline>
          {r.bullet2Suffix}
        </li>
        <li>
          {r.bullet3Prefix}
          <CodeInline>X-RateLimit-Reset</CodeInline>
          {r.bullet3Suffix}
        </li>
      </ul>
      <p className="text-[var(--muted)] mb-4">
        {r.footerPrefix}
        <CodeInline>Retry-After</CodeInline>
        {r.footerSuffix}
      </p>
    </section>
  );
}

function Endpoints({ t }: { t: ApiDocsDict }) {
  const e = t.endpoints;
  return (
    <section id="endpoints">
      <h2 className="display text-2xl sm:text-3xl mb-6">{e.heading}</h2>

      <Endpoint
        id="recommend"
        method="POST"
        path="/api/v1/recommend"
        summary={e.recommendSummary}
        labels={{
          queryParameters: e.queryParameters,
          requestBody: e.requestBody,
          example: e.example,
          response: e.response,
        }}
        body={`{
  "ai_platform": "claude",   // or chatgpt | codex | gemini | cursor | any
  "use_case": "shipping a SaaS on Next.js",
  "max_results": 3          // optional, default 3, max 10
}`}
        response={`{
  "recommendations": [
    {
      "kit_id": "ts-next-production",
      "kit_slug": "ts-next-production",
      "kit_name": "TypeScript + Next.js Production Pack",
      "score": 1.0,
      "reasoning": "Your stack matches this kit directly — App Router patterns and Supabase wiring."
    }
  ],
  "fallback": false
}`}
        languages={{
          curl: `curl https://lumenari.io/api/v1/recommend \\
  -H "Authorization: Bearer lmn_..." \\
  -H "Content-Type: application/json" \\
  -d '{"ai_platform":"claude","use_case":"shipping a SaaS","max_results":3}'`,
          javascript: `const r = await fetch("https://lumenari.io/api/v1/recommend", {
  method: "POST",
  headers: {
    "Authorization": "Bearer lmn_...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ai_platform: "claude",
    use_case: "shipping a SaaS",
    max_results: 3,
  }),
}).then(r => r.json());`,
          python: `r = requests.post(
    "https://lumenari.io/api/v1/recommend",
    headers={"Authorization": "Bearer lmn_..."},
    json={
        "ai_platform": "claude",
        "use_case": "shipping a SaaS",
        "max_results": 3,
    },
).json()`,
        }}
      />

      <Endpoint
        id="list-kits"
        method="GET"
        path="/api/v1/kits"
        summary={e.listKitsSummary}
        labels={{
          queryParameters: e.queryParameters,
          requestBody: e.requestBody,
          example: e.example,
          response: e.response,
        }}
        query={[
          { name: "limit", desc: e.query.limit },
          { name: "offset", desc: e.query.offset },
          { name: "ai_target", desc: e.query.ai_target },
          { name: "keyword", desc: e.query.keyword },
        ]}
        response={`{
  "kits": [
    {
      "id": "ts-next-production",
      "slug": "ts-next-production",
      "name": "TypeScript + Next.js Production Pack",
      "tagline": "RLS-aware App Router patterns...",
      "description": "...",
      "price_cents": 1900,
      "currency": "cad",
      "ai_targets": ["claude-code", "claude", "cursor"],
      "personas": [...],
      "keywords": [...],
      "whats_inside": [...],
      "deliverables": ["SKILL.md", ...]
    }
  ],
  "pagination": { "total": 20, "limit": 50, "offset": 0 }
}`}
        languages={{
          curl: `curl 'https://lumenari.io/api/v1/kits?limit=10&ai_target=claude' \\
  -H "Authorization: Bearer lmn_..."`,
          javascript: `const r = await fetch(
  "https://lumenari.io/api/v1/kits?limit=10&ai_target=claude",
  { headers: { Authorization: "Bearer lmn_..." } },
).then(r => r.json());`,
          python: `r = requests.get(
    "https://lumenari.io/api/v1/kits",
    headers={"Authorization": "Bearer lmn_..."},
    params={"limit": 10, "ai_target": "claude"},
).json()`,
        }}
      />

      <Endpoint
        id="get-kit"
        method="GET"
        path="/api/v1/kits/{id_or_slug}"
        summary={e.getKitSummary}
        labels={{
          queryParameters: e.queryParameters,
          requestBody: e.requestBody,
          example: e.example,
          response: e.response,
        }}
        response={`{
  "kit": {
    "id": "ts-next-production",
    "slug": "ts-next-production",
    "name": "TypeScript + Next.js Production Pack",
    ...
    "deliverables": ["SKILL.md", "memory.md", ...]
  }
}`}
        languages={{
          curl: `curl https://lumenari.io/api/v1/kits/ts-next-production \\
  -H "Authorization: Bearer lmn_..."`,
          javascript: `const r = await fetch(
  "https://lumenari.io/api/v1/kits/ts-next-production",
  { headers: { Authorization: "Bearer lmn_..." } },
).then(r => r.json());`,
          python: `r = requests.get(
    "https://lumenari.io/api/v1/kits/ts-next-production",
    headers={"Authorization": "Bearer lmn_..."},
).json()`,
        }}
      />

      <Endpoint
        id="download-kit"
        method="GET"
        path="/api/v1/kits/{id_or_slug}/download"
        summary={e.downloadKitSummary}
        notes={e.downloadKitNotes}
        labels={{
          queryParameters: e.queryParameters,
          requestBody: e.requestBody,
          example: e.example,
          response: e.response,
        }}
        languages={{
          curl: `curl https://lumenari.io/api/v1/kits/ts-next-production/download \\
  -H "Authorization: Bearer lmn_..." \\
  -o ts-next-production.md`,
          javascript: `const r = await fetch(
  "https://lumenari.io/api/v1/kits/ts-next-production/download",
  { headers: { Authorization: "Bearer lmn_..." } },
);
const markdown = await r.text();`,
          python: `r = requests.get(
    "https://lumenari.io/api/v1/kits/ts-next-production/download",
    headers={"Authorization": "Bearer lmn_..."},
)
markdown = r.text`,
        }}
      />

      <Endpoint
        id="usage"
        method="GET"
        path="/api/v1/usage"
        summary={e.usageSummary}
        labels={{
          queryParameters: e.queryParameters,
          requestBody: e.requestBody,
          example: e.example,
          response: e.response,
        }}
        response={`{
  "tier": "pro",
  "tier_name": "Pro",
  "period_start": "2026-05-01T00:00:00.000Z",
  "period_end":   "2026-06-01T00:00:00.000Z",
  "calls_used": 1240,
  "calls_remaining": 8760,
  "monthly_limit": 10000,
  "daily_breakdown": [
    { "date": "2026-05-01", "calls": 12 },
    { "date": "2026-05-02", "calls": 89 }
  ]
}`}
        languages={{
          curl: `curl https://lumenari.io/api/v1/usage \\
  -H "Authorization: Bearer lmn_..."`,
          javascript: `const r = await fetch("https://lumenari.io/api/v1/usage", {
  headers: { Authorization: "Bearer lmn_..." },
}).then(r => r.json());`,
          python: `r = requests.get(
    "https://lumenari.io/api/v1/usage",
    headers={"Authorization": "Bearer lmn_..."},
).json()`,
        }}
      />
    </section>
  );
}

function ErrorCodes({ t }: { t: ApiDocsDict }) {
  const e = t.errorCodes;
  // Status + code are technical identifiers and stay English. Only `meaning`
  // localizes, sourced from the dictionary's `rows` array.
  const technical: Array<{ status: number; code: string }> = [
    { status: 400, code: "invalid_request" },
    { status: 401, code: "missing_api_key" },
    { status: 401, code: "invalid_api_key" },
    { status: 402, code: "subscription_inactive" },
    { status: 402, code: "tier_required" },
    { status: 404, code: "not_found" },
    { status: 429, code: "rate_limit_exceeded" },
    { status: 500, code: "internal_error" },
    { status: 500, code: "content_unavailable" },
  ];
  const rows = technical.map((tech, i) => ({
    ...tech,
    meaning: e.rows[i]?.meaning ?? "",
  }));
  return (
    <section id="error-codes">
      <h2 className="display text-2xl sm:text-3xl mb-4">{e.heading}</h2>
      <p className="text-[var(--muted)] mb-4">{e.intro}</p>
      <CodeSample
        languages={{
          curl: `{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Monthly call limit of 100 exceeded. Upgrade your tier..."
  }
}`,
        }}
      />
      <div className="mt-6 rounded-2xl border border-[var(--hairline)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--surface)]">
            <tr>
              <th className="text-left font-semibold px-4 py-3 w-20">
                {e.header_http}
              </th>
              <th className="text-left font-semibold px-4 py-3 w-56">
                {e.header_code}
              </th>
              <th className="text-left font-semibold px-4 py-3">
                {e.header_meaning}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={`${r.status}-${r.code}`} className="border-t border-[var(--hairline)]">
                <td className="px-4 py-3 font-mono">{r.status}</td>
                <td className="px-4 py-3 font-mono">{r.code}</td>
                <td className="px-4 py-3 text-[var(--muted)]">{r.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function WebhooksPlaceholder({ t }: { t: ApiDocsDict }) {
  const w = t.webhooks;
  return (
    <section id="webhooks">
      <h2 className="display text-2xl sm:text-3xl mb-4">{w.heading}</h2>
      <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5">
        <p className="text-sm text-[var(--muted)]">
          {w.bodyPrefix}
          <a
            href="mailto:hello@lumenari.io?subject=Lumenari%20API%20webhooks%20interest"
            className="underline text-[var(--foreground)]"
          >
            hello@lumenari.io
          </a>
          {w.bodySuffix}
        </p>
      </div>
    </section>
  );
}

// ====================================================================
// Helpers
// ====================================================================

interface EndpointProps {
  id: string;
  method: string;
  path: string;
  summary: string;
  body?: string;
  query?: Array<{ name: string; desc: string }>;
  response?: string;
  notes?: string;
  languages: Record<string, string>;
  labels: {
    queryParameters: string;
    requestBody: string;
    example: string;
    response: string;
  };
}

function Endpoint({
  id,
  method,
  path,
  summary,
  body,
  query,
  response,
  notes,
  languages,
  labels,
}: EndpointProps) {
  return (
    <article id={id} className="mb-12 scroll-mt-24">
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-semibold ${
            method === "GET"
              ? "bg-blue-100 text-blue-900"
              : "bg-emerald-100 text-emerald-900"
          }`}
        >
          {method}
        </span>
        <code className="font-mono text-sm text-[var(--foreground)]">{path}</code>
      </div>
      <p className="text-[var(--muted)] mb-5">{summary}</p>
      {query ? (
        <div className="mb-5">
          <h4 className="text-sm font-semibold mb-2">{labels.queryParameters}</h4>
          <ul className="space-y-1.5 text-sm">
            {query.map((q) => (
              <li key={q.name}>
                <CodeInline>{q.name}</CodeInline>{" "}
                <span className="text-[var(--muted)]">— {q.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {body ? (
        <div className="mb-5">
          <h4 className="text-sm font-semibold mb-2">{labels.requestBody}</h4>
          <CodeSample languages={{ json: body }} />
        </div>
      ) : null}
      <div className="mb-5">
        <h4 className="text-sm font-semibold mb-2">{labels.example}</h4>
        <CodeSample languages={languages} />
      </div>
      {response ? (
        <div>
          <h4 className="text-sm font-semibold mb-2">{labels.response}</h4>
          <CodeSample languages={{ json: response }} />
        </div>
      ) : null}
      {notes ? (
        <p className="mt-4 text-sm text-[var(--muted)]">{notes}</p>
      ) : null}
    </article>
  );
}

function CodeInline({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-sm bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--hairline)]">
      {children}
    </code>
  );
}

/**
 * Code-tab block. Renders simple, dark-themed blocks per language. No
 * external syntax highlighter for MVP — readable and dependency-light.
 */
function CodeSample({ languages }: { languages: Record<string, string> }) {
  const entries = Object.entries(languages);
  if (entries.length === 1) {
    const [, code] = entries[0];
    return (
      <div className="rounded-xl bg-[#0a0d10] text-[#e6e6e6] p-4 overflow-x-auto">
        <pre className="font-mono text-[13px] leading-relaxed whitespace-pre">
          {code}
        </pre>
      </div>
    );
  }
  return (
    <div className="rounded-xl bg-[#0a0d10] overflow-hidden">
      <div className="flex gap-1 px-3 pt-3 text-xs">
        {entries.map(([lang]) => (
          <span
            key={lang}
            className="font-mono px-2.5 py-1 rounded-md bg-white/5 text-[#e6e6e6] capitalize"
          >
            {lang}
          </span>
        ))}
      </div>
      <div className="space-y-1">
        {entries.map(([lang, code]) => (
          <div key={lang} className="p-4 text-[#e6e6e6] overflow-x-auto">
            <p className="text-[10px] uppercase tracking-wider text-[#9ca3af] mb-2 font-mono">
              {lang}
            </p>
            <pre className="font-mono text-[13px] leading-relaxed whitespace-pre">
              {code}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
