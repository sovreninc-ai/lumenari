module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},10585,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},68611,a=>{"use strict";let b={src:a.i(10585).default,width:256,height:256};a.s(["default",0,b])},35910,a=>{"use strict";var b=a.i(7997),c=a.i(95936),d=a.i(47359),e=a.i(57082);async function f({params:a}){let{locale:b}=await a,c=(0,d.isLocale)(b)?b:"en";return(0,e.apiDocsMetadata)(c)}function g(){return(0,b.jsx)("nav",{"aria-label":"Docs navigation",className:"lg:sticky lg:top-24 self-start",children:(0,b.jsx)("ul",{className:"space-y-1.5 text-sm",children:[{href:"#quickstart",label:"Quickstart"},{href:"#authentication",label:"Authentication"},{href:"#rate-limiting",label:"Rate limiting"},{href:"#endpoints",label:"Endpoints"},{href:"#recommend",label:"  · Recommend"},{href:"#list-kits",label:"  · List kits"},{href:"#get-kit",label:"  · Get kit"},{href:"#download-kit",label:"  · Download kit"},{href:"#usage",label:"  · Usage"},{href:"#error-codes",label:"Error codes"},{href:"#webhooks",label:"Webhooks"}].map(a=>(0,b.jsx)("li",{children:(0,b.jsx)("a",{href:a.href,className:"block py-1 text-[var(--muted)] hover:text-[var(--foreground)] whitespace-pre",children:a.label})},a.href))})})}function h(){return(0,b.jsxs)("section",{id:"quickstart",children:[(0,b.jsx)("h2",{className:"display text-2xl sm:text-3xl mb-4",children:"Quickstart"}),(0,b.jsxs)("ol",{className:"space-y-3 text-[var(--muted)] mb-6 list-decimal pl-5",children:[(0,b.jsxs)("li",{children:[(0,b.jsx)(c.default,{href:"/account/api-keys",className:"underline",children:"Sign in"})," ","and generate an API key. You see the full key once — save it."]}),(0,b.jsxs)("li",{children:["Pass it as ",(0,b.jsx)(o,{children:"Authorization: Bearer lmn_…"})," on every request."]}),(0,b.jsx)("li",{children:"Use the endpoints below. Free tier gives you 100 calls a month."})]}),(0,b.jsx)(p,{languages:{curl:`curl https://lumenari.io/api/v1/recommend \\
  -H "Authorization: Bearer lmn_..." \\
  -H "Content-Type: application/json" \\
  -d '{"ai_platform":"claude","use_case":"shipping a SaaS on Next.js"}'`,javascript:`const res = await fetch("https://lumenari.io/api/v1/recommend", {
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
const data = await res.json();`,python:`import requests

res = requests.post(
    "https://lumenari.io/api/v1/recommend",
    headers={"Authorization": "Bearer lmn_..."},
    json={
        "ai_platform": "claude",
        "use_case": "shipping a SaaS on Next.js",
    },
)
data = res.json()`}})]})}function i(){return(0,b.jsxs)("section",{id:"authentication",children:[(0,b.jsx)("h2",{className:"display text-2xl sm:text-3xl mb-4",children:"Authentication"}),(0,b.jsxs)("p",{className:"text-[var(--muted)] mb-4",children:["All endpoints require a Bearer token. Keys are 36 characters and prefixed with ",(0,b.jsx)(o,{children:"lmn_"}),". Manage keys at"," ",(0,b.jsx)(c.default,{href:"/account/api-keys",className:"underline",children:"your dashboard"}),"."]}),(0,b.jsx)(p,{languages:{curl:`# Header on every request
Authorization: Bearer lmn_a1b2c3d4e5f6...`,javascript:'headers: { "Authorization": "Bearer lmn_a1b2c3d4..." }',python:'headers={"Authorization": "Bearer lmn_a1b2c3d4..."}'}}),(0,b.jsx)("p",{className:"text-sm text-[var(--muted)] mt-4",children:"Keys are hashed at rest with SHA-256. We can't recover a lost key — revoke it and generate a new one."})]})}function j(){return(0,b.jsxs)("section",{id:"rate-limiting",children:[(0,b.jsx)("h2",{className:"display text-2xl sm:text-3xl mb-4",children:"Rate limiting"}),(0,b.jsx)("p",{className:"text-[var(--muted)] mb-4",children:"Each request returns three headers you can use to back off:"}),(0,b.jsxs)("ul",{className:"space-y-2 mb-4 text-sm",children:[(0,b.jsxs)("li",{children:[(0,b.jsx)(o,{children:"X-RateLimit-Limit"})," — monthly cap for your tier (or ",(0,b.jsx)(o,{children:"unlimited"})," on Enterprise)"]}),(0,b.jsxs)("li",{children:[(0,b.jsx)(o,{children:"X-RateLimit-Remaining"})," — calls left this billing period"]}),(0,b.jsxs)("li",{children:[(0,b.jsx)(o,{children:"X-RateLimit-Reset"})," — Unix timestamp when the quota refills (1st of next month, UTC)"]})]}),(0,b.jsxs)("p",{className:"text-[var(--muted)] mb-4",children:["Hit the cap and you'll get HTTP 429 with a structured error body and a ",(0,b.jsx)(o,{children:"Retry-After"})," header (seconds)."]})]})}function k(){return(0,b.jsxs)("section",{id:"endpoints",children:[(0,b.jsx)("h2",{className:"display text-2xl sm:text-3xl mb-6",children:"Endpoints"}),(0,b.jsx)(n,{id:"recommend",method:"POST",path:"/api/v1/recommend",summary:"Get kit recommendations for an AI platform + use case.",body:`{
  "ai_platform": "claude",   // or chatgpt | codex | gemini | cursor | any
  "use_case": "shipping a SaaS on Next.js",
  "max_results": 3          // optional, default 3, max 10
}`,response:`{
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
}`,languages:{curl:`curl https://lumenari.io/api/v1/recommend \\
  -H "Authorization: Bearer lmn_..." \\
  -H "Content-Type: application/json" \\
  -d '{"ai_platform":"claude","use_case":"shipping a SaaS","max_results":3}'`,javascript:`const r = await fetch("https://lumenari.io/api/v1/recommend", {
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
}).then(r => r.json());`,python:`r = requests.post(
    "https://lumenari.io/api/v1/recommend",
    headers={"Authorization": "Bearer lmn_..."},
    json={
        "ai_platform": "claude",
        "use_case": "shipping a SaaS",
        "max_results": 3,
    },
).json()`}}),(0,b.jsx)(n,{id:"list-kits",method:"GET",path:"/api/v1/kits",summary:"Paginated list of every kit in the catalog.",query:[{name:"limit",desc:"Page size, default 50, max 100"},{name:"offset",desc:"Pagination offset"},{name:"ai_target",desc:"Filter to a single AI target — claude / chatgpt / etc."},{name:"keyword",desc:"Substring match against name + keywords"}],response:`{
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
}`,languages:{curl:`curl 'https://lumenari.io/api/v1/kits?limit=10&ai_target=claude' \\
  -H "Authorization: Bearer lmn_..."`,javascript:`const r = await fetch(
  "https://lumenari.io/api/v1/kits?limit=10&ai_target=claude",
  { headers: { Authorization: "Bearer lmn_..." } },
).then(r => r.json());`,python:`r = requests.get(
    "https://lumenari.io/api/v1/kits",
    headers={"Authorization": "Bearer lmn_..."},
    params={"limit": 10, "ai_target": "claude"},
).json()`}}),(0,b.jsx)(n,{id:"get-kit",method:"GET",path:"/api/v1/kits/{id_or_slug}",summary:"Full metadata for a single kit, including deliverable file list.",response:`{
  "kit": {
    "id": "ts-next-production",
    "slug": "ts-next-production",
    "name": "TypeScript + Next.js Production Pack",
    ...
    "deliverables": ["SKILL.md", "memory.md", ...]
  }
}`,languages:{curl:`curl https://lumenari.io/api/v1/kits/ts-next-production \\
  -H "Authorization: Bearer lmn_..."`,javascript:`const r = await fetch(
  "https://lumenari.io/api/v1/kits/ts-next-production",
  { headers: { Authorization: "Bearer lmn_..." } },
).then(r => r.json());`,python:`r = requests.get(
    "https://lumenari.io/api/v1/kits/ts-next-production",
    headers={"Authorization": "Bearer lmn_..."},
).json()`}}),(0,b.jsx)(n,{id:"download-kit",method:"GET",path:"/api/v1/kits/{id_or_slug}/download",summary:"Concatenated kit content as markdown. Pro tier and above only.",notes:"Free tier returns 402 with code `tier_required`. Pro / Business / Enterprise return the full markdown body inline.",languages:{curl:`curl https://lumenari.io/api/v1/kits/ts-next-production/download \\
  -H "Authorization: Bearer lmn_..." \\
  -o ts-next-production.md`,javascript:`const r = await fetch(
  "https://lumenari.io/api/v1/kits/ts-next-production/download",
  { headers: { Authorization: "Bearer lmn_..." } },
);
const markdown = await r.text();`,python:`r = requests.get(
    "https://lumenari.io/api/v1/kits/ts-next-production/download",
    headers={"Authorization": "Bearer lmn_..."},
)
markdown = r.text`}}),(0,b.jsx)(n,{id:"usage",method:"GET",path:"/api/v1/usage",summary:"Calling account's current-month usage + 30-day daily breakdown.",response:`{
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
}`,languages:{curl:`curl https://lumenari.io/api/v1/usage \\
  -H "Authorization: Bearer lmn_..."`,javascript:`const r = await fetch("https://lumenari.io/api/v1/usage", {
  headers: { Authorization: "Bearer lmn_..." },
}).then(r => r.json());`,python:`r = requests.get(
    "https://lumenari.io/api/v1/usage",
    headers={"Authorization": "Bearer lmn_..."},
).json()`}})]})}function l(){return(0,b.jsxs)("section",{id:"error-codes",children:[(0,b.jsx)("h2",{className:"display text-2xl sm:text-3xl mb-4",children:"Error codes"}),(0,b.jsx)("p",{className:"text-[var(--muted)] mb-4",children:"Every error response has the same shape:"}),(0,b.jsx)(p,{languages:{curl:`{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Monthly call limit of 100 exceeded. Upgrade your tier..."
  }
}`}}),(0,b.jsx)("div",{className:"mt-6 rounded-2xl border border-[var(--hairline)] overflow-hidden",children:(0,b.jsxs)("table",{className:"w-full text-sm",children:[(0,b.jsx)("thead",{className:"bg-[var(--surface)]",children:(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{className:"text-left font-semibold px-4 py-3 w-20",children:"HTTP"}),(0,b.jsx)("th",{className:"text-left font-semibold px-4 py-3 w-56",children:"Code"}),(0,b.jsx)("th",{className:"text-left font-semibold px-4 py-3",children:"Meaning"})]})}),(0,b.jsx)("tbody",{children:[{status:400,code:"invalid_request",meaning:"Body or params failed validation."},{status:401,code:"missing_api_key",meaning:"No Authorization header."},{status:401,code:"invalid_api_key",meaning:"Key is malformed, unknown, or revoked."},{status:402,code:"subscription_inactive",meaning:"Paid subscription is past_due or canceled."},{status:402,code:"tier_required",meaning:"Endpoint needs Pro tier or above."},{status:404,code:"not_found",meaning:"Kit id/slug doesn't exist."},{status:429,code:"rate_limit_exceeded",meaning:"Monthly call cap hit. Retry after period reset."},{status:500,code:"internal_error",meaning:"Lumenari-side failure. Try again."},{status:500,code:"content_unavailable",meaning:"Kit content missing on server (please report)."}].map(a=>(0,b.jsxs)("tr",{className:"border-t border-[var(--hairline)]",children:[(0,b.jsx)("td",{className:"px-4 py-3 font-mono",children:a.status}),(0,b.jsx)("td",{className:"px-4 py-3 font-mono",children:a.code}),(0,b.jsx)("td",{className:"px-4 py-3 text-[var(--muted)]",children:a.meaning})]},`${a.status}-${a.code}`))})]})})]})}function m(){return(0,b.jsxs)("section",{id:"webhooks",children:[(0,b.jsx)("h2",{className:"display text-2xl sm:text-3xl mb-4",children:"Webhooks"}),(0,b.jsx)("div",{className:"rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5",children:(0,b.jsxs)("p",{className:"text-sm text-[var(--muted)]",children:["Coming soon. Subscribe to"," ",(0,b.jsx)("a",{href:"mailto:hello@lumenari.io?subject=Lumenari%20API%20webhooks%20interest",className:"underline text-[var(--foreground)]",children:"hello@lumenari.io"})," ","to be notified when webhooks ship (catalog updates, usage thresholds, new kits)."]})})]})}function n({id:a,method:c,path:d,summary:e,body:f,query:g,response:h,notes:i,languages:j}){return(0,b.jsxs)("article",{id:a,className:"mb-12 scroll-mt-24",children:[(0,b.jsxs)("div",{className:"flex items-center gap-3 mb-3 flex-wrap",children:[(0,b.jsx)("span",{className:`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-semibold ${"GET"===c?"bg-blue-100 text-blue-900":"bg-emerald-100 text-emerald-900"}`,children:c}),(0,b.jsx)("code",{className:"font-mono text-sm text-[var(--foreground)]",children:d})]}),(0,b.jsx)("p",{className:"text-[var(--muted)] mb-5",children:e}),g?(0,b.jsxs)("div",{className:"mb-5",children:[(0,b.jsx)("h4",{className:"text-sm font-semibold mb-2",children:"Query parameters"}),(0,b.jsx)("ul",{className:"space-y-1.5 text-sm",children:g.map(a=>(0,b.jsxs)("li",{children:[(0,b.jsx)(o,{children:a.name})," ",(0,b.jsxs)("span",{className:"text-[var(--muted)]",children:["— ",a.desc]})]},a.name))})]}):null,f?(0,b.jsxs)("div",{className:"mb-5",children:[(0,b.jsx)("h4",{className:"text-sm font-semibold mb-2",children:"Request body"}),(0,b.jsx)(p,{languages:{json:f}})]}):null,(0,b.jsxs)("div",{className:"mb-5",children:[(0,b.jsx)("h4",{className:"text-sm font-semibold mb-2",children:"Example"}),(0,b.jsx)(p,{languages:j})]}),h?(0,b.jsxs)("div",{children:[(0,b.jsx)("h4",{className:"text-sm font-semibold mb-2",children:"Response"}),(0,b.jsx)(p,{languages:{json:h}})]}):null,i?(0,b.jsx)("p",{className:"mt-4 text-sm text-[var(--muted)]",children:i}):null]})}function o({children:a}){return(0,b.jsx)("code",{className:"font-mono text-sm bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--hairline)]",children:a})}function p({languages:a}){let c=Object.entries(a);if(1===c.length){let[,a]=c[0];return(0,b.jsx)("div",{className:"rounded-xl bg-[#0a0d10] text-[#e6e6e6] p-4 overflow-x-auto",children:(0,b.jsx)("pre",{className:"font-mono text-[13px] leading-relaxed whitespace-pre",children:a})})}return(0,b.jsxs)("div",{className:"rounded-xl bg-[#0a0d10] overflow-hidden",children:[(0,b.jsx)("div",{className:"flex gap-1 px-3 pt-3 text-xs",children:c.map(([a])=>(0,b.jsx)("span",{className:"font-mono px-2.5 py-1 rounded-md bg-white/5 text-[#e6e6e6] capitalize",children:a},a))}),(0,b.jsx)("div",{className:"space-y-1",children:c.map(([a,c])=>(0,b.jsxs)("div",{className:"p-4 text-[#e6e6e6] overflow-x-auto",children:[(0,b.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-[#9ca3af] mb-2 font-mono",children:a}),(0,b.jsx)("pre",{className:"font-mono text-[13px] leading-relaxed whitespace-pre",children:c})]},a))})]})}a.s(["default",0,function(){return(0,b.jsxs)("div",{className:"mx-auto max-w-6xl px-6 py-16",children:[(0,b.jsxs)("header",{className:"mb-12",children:[(0,b.jsx)("span",{className:"eyebrow",children:"API documentation"}),(0,b.jsx)("h1",{className:"display text-4xl sm:text-5xl mt-2 mb-3",children:"Reference"}),(0,b.jsx)("p",{className:"text-[var(--muted)] text-lg max-w-2xl",children:"The Lumenari API exposes our kit recommendation engine as JSON endpoints. Authenticate with a Bearer token. Same engine that powers the storefront wizard."})]}),(0,b.jsxs)("div",{className:"grid lg:grid-cols-[220px_1fr] gap-10",children:[(0,b.jsx)(g,{}),(0,b.jsxs)("main",{className:"max-w-3xl space-y-16",children:[(0,b.jsx)(h,{}),(0,b.jsx)(i,{}),(0,b.jsx)(j,{}),(0,b.jsx)(k,{}),(0,b.jsx)(l,{}),(0,b.jsx)(m,{})]})]})]})},"generateMetadata",0,f,"generateStaticParams",0,function(){return d.LOCALES.map(a=>({locale:a}))}])},20779,a=>{a.n(a.i(35910))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0vy9q2z._.js.map