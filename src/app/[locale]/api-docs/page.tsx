import Link from "next/link";
import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
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
export default function ApiDocsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-12">
        <span className="eyebrow">API documentation</span>
        <h1 className="display text-4xl sm:text-5xl mt-2 mb-3">Reference</h1>
        <p className="text-[var(--muted)] text-lg max-w-2xl">
          The Lumenari API exposes our kit recommendation engine as JSON
          endpoints. Authenticate with a Bearer token. Same engine that powers
          the storefront wizard.
        </p>
      </header>

      <div className="grid lg:grid-cols-[220px_1fr] gap-10">
        <SideNav />
        <main className="max-w-3xl space-y-16">
          <Quickstart />
          <Authentication />
          <RateLimiting />
          <Endpoints />
          <ErrorCodes />
          <WebhooksPlaceholder />
        </main>
      </div>
    </div>
  );
}

function SideNav() {
  const items: Array<{ href: string; label: string }> = [
    { href: "#quickstart", label: "Quickstart" },
    { href: "#authentication", label: "Authentication" },
    { href: "#rate-limiting", label: "Rate limiting" },
    { href: "#endpoints", label: "Endpoints" },
    { href: "#recommend", label: "  · Recommend" },
    { href: "#list-kits", label: "  · List kits" },
    { href: "#get-kit", label: "  · Get kit" },
    { href: "#download-kit", label: "  · Download kit" },
    { href: "#usage", label: "  · Usage" },
    { href: "#error-codes", label: "Error codes" },
    { href: "#webhooks", label: "Webhooks" },
  ];
  return (
    <nav
      aria-label="Docs navigation"
      className="lg:sticky lg:top-24 self-start"
    >
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

function Quickstart() {
  return (
    <section id="quickstart">
      <h2 className="display text-2xl sm:text-3xl mb-4">Quickstart</h2>
      <ol className="space-y-3 text-[var(--muted)] mb-6 list-decimal pl-5">
        <li>
          <Link href="/account/api-keys" className="underline">
            Sign in
          </Link>{" "}
          and generate an API key. You see the full key once — save it.
        </li>
        <li>
          Pass it as <CodeInline>Authorization: Bearer lmn_…</CodeInline> on
          every request.
        </li>
        <li>Use the endpoints below. Free tier gives you 100 calls a month.</li>
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

function Authentication() {
  return (
    <section id="authentication">
      <h2 className="display text-2xl sm:text-3xl mb-4">Authentication</h2>
      <p className="text-[var(--muted)] mb-4">
        All endpoints require a Bearer token. Keys are 36 characters and prefixed
        with <CodeInline>lmn_</CodeInline>. Manage keys at{" "}
        <Link href="/account/api-keys" className="underline">
          your dashboard
        </Link>
        .
      </p>
      <CodeSample
        languages={{
          curl: `# Header on every request
Authorization: Bearer lmn_a1b2c3d4e5f6...`,
          javascript: `headers: { "Authorization": "Bearer lmn_a1b2c3d4..." }`,
          python: `headers={"Authorization": "Bearer lmn_a1b2c3d4..."}`,
        }}
      />
      <p className="text-sm text-[var(--muted)] mt-4">
        Keys are hashed at rest with SHA-256. We can&apos;t recover a lost key —
        revoke it and generate a new one.
      </p>
    </section>
  );
}

function RateLimiting() {
  return (
    <section id="rate-limiting">
      <h2 className="display text-2xl sm:text-3xl mb-4">Rate limiting</h2>
      <p className="text-[var(--muted)] mb-4">
        Each request returns three headers you can use to back off:
      </p>
      <ul className="space-y-2 mb-4 text-sm">
        <li>
          <CodeInline>X-RateLimit-Limit</CodeInline> — monthly cap for your tier
          (or <CodeInline>unlimited</CodeInline> on Enterprise)
        </li>
        <li>
          <CodeInline>X-RateLimit-Remaining</CodeInline> — calls left this
          billing period
        </li>
        <li>
          <CodeInline>X-RateLimit-Reset</CodeInline> — Unix timestamp when the
          quota refills (1st of next month, UTC)
        </li>
      </ul>
      <p className="text-[var(--muted)] mb-4">
        Hit the cap and you&apos;ll get HTTP 429 with a structured error body
        and a <CodeInline>Retry-After</CodeInline> header (seconds).
      </p>
    </section>
  );
}

function Endpoints() {
  return (
    <section id="endpoints">
      <h2 className="display text-2xl sm:text-3xl mb-6">Endpoints</h2>

      <Endpoint
        id="recommend"
        method="POST"
        path="/api/v1/recommend"
        summary="Get kit recommendations for an AI platform + use case."
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
        summary="Paginated list of every kit in the catalog."
        query={[
          { name: "limit", desc: "Page size, default 50, max 100" },
          { name: "offset", desc: "Pagination offset" },
          {
            name: "ai_target",
            desc: "Filter to a single AI target — claude / chatgpt / etc.",
          },
          {
            name: "keyword",
            desc: "Substring match against name + keywords",
          },
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
        summary="Full metadata for a single kit, including deliverable file list."
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
        summary="Concatenated kit content as markdown. Pro tier and above only."
        notes="Free tier returns 402 with code `tier_required`. Pro / Business / Enterprise return the full markdown body inline."
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
        summary="Calling account's current-month usage + 30-day daily breakdown."
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

function ErrorCodes() {
  const rows: Array<{ status: number; code: string; meaning: string }> = [
    { status: 400, code: "invalid_request", meaning: "Body or params failed validation." },
    { status: 401, code: "missing_api_key", meaning: "No Authorization header." },
    { status: 401, code: "invalid_api_key", meaning: "Key is malformed, unknown, or revoked." },
    { status: 402, code: "subscription_inactive", meaning: "Paid subscription is past_due or canceled." },
    { status: 402, code: "tier_required", meaning: "Endpoint needs Pro tier or above." },
    { status: 404, code: "not_found", meaning: "Kit id/slug doesn't exist." },
    { status: 429, code: "rate_limit_exceeded", meaning: "Monthly call cap hit. Retry after period reset." },
    { status: 500, code: "internal_error", meaning: "Lumenari-side failure. Try again." },
    { status: 500, code: "content_unavailable", meaning: "Kit content missing on server (please report)." },
  ];
  return (
    <section id="error-codes">
      <h2 className="display text-2xl sm:text-3xl mb-4">Error codes</h2>
      <p className="text-[var(--muted)] mb-4">
        Every error response has the same shape:
      </p>
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
              <th className="text-left font-semibold px-4 py-3 w-20">HTTP</th>
              <th className="text-left font-semibold px-4 py-3 w-56">Code</th>
              <th className="text-left font-semibold px-4 py-3">Meaning</th>
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

function WebhooksPlaceholder() {
  return (
    <section id="webhooks">
      <h2 className="display text-2xl sm:text-3xl mb-4">Webhooks</h2>
      <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5">
        <p className="text-sm text-[var(--muted)]">
          Coming soon. Subscribe to{" "}
          <a
            href="mailto:hello@lumenari.io?subject=Lumenari%20API%20webhooks%20interest"
            className="underline text-[var(--foreground)]"
          >
            hello@lumenari.io
          </a>{" "}
          to be notified when webhooks ship (catalog updates, usage thresholds,
          new kits).
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
          <h4 className="text-sm font-semibold mb-2">Query parameters</h4>
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
          <h4 className="text-sm font-semibold mb-2">Request body</h4>
          <CodeSample languages={{ json: body }} />
        </div>
      ) : null}
      <div className="mb-5">
        <h4 className="text-sm font-semibold mb-2">Example</h4>
        <CodeSample languages={languages} />
      </div>
      {response ? (
        <div>
          <h4 className="text-sm font-semibold mb-2">Response</h4>
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
