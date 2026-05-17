module.exports=[193695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},110585,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},68611,a=>{"use strict";let b={src:a.i(110585).default,width:256,height:256};a.s(["default",0,b])},735910,a=>{"use strict";var b=a.i(907997),c=a.i(395936),d=a.i(947359),e=a.i(432889),f=a.i(857082);async function g({params:a}){let{locale:b}=await a,c=(0,d.isLocale)(b)?b:"en";return(0,f.apiDocsMetadata)(c)}async function h({params:a}){let{locale:c}=await a,f=(0,d.isLocale)(c)?c:"en",g=(0,e.getDictionary)(f).apiDocs;return(0,b.jsxs)("div",{className:"mx-auto max-w-6xl px-6 py-16",children:[(0,b.jsxs)("header",{className:"mb-12",children:[(0,b.jsx)("span",{className:"eyebrow",children:g.eyebrow}),(0,b.jsx)("h1",{className:"display text-4xl sm:text-5xl mt-2 mb-3",children:g.title}),(0,b.jsx)("p",{className:"text-[var(--muted)] text-lg max-w-2xl",children:g.intro})]}),(0,b.jsxs)("div",{className:"grid lg:grid-cols-[220px_1fr] gap-10",children:[(0,b.jsx)(i,{t:g}),(0,b.jsxs)("main",{className:"max-w-3xl space-y-16",children:[(0,b.jsx)(j,{t:g}),(0,b.jsx)(k,{t:g}),(0,b.jsx)(l,{t:g}),(0,b.jsx)(m,{t:g}),(0,b.jsx)(n,{t:g}),(0,b.jsx)(o,{t:g})]})]})]})}function i({t:a}){let c=[{href:"#quickstart",label:a.nav.quickstart},{href:"#authentication",label:a.nav.authentication},{href:"#rate-limiting",label:a.nav.rateLimiting},{href:"#endpoints",label:a.nav.endpoints},{href:"#recommend",label:a.nav.recommend},{href:"#list-kits",label:a.nav.listKits},{href:"#get-kit",label:a.nav.getKit},{href:"#download-kit",label:a.nav.downloadKit},{href:"#usage",label:a.nav.usage},{href:"#error-codes",label:a.nav.errorCodes},{href:"#webhooks",label:a.nav.webhooks}];return(0,b.jsx)("nav",{"aria-label":a.title,className:"lg:sticky lg:top-24 self-start",children:(0,b.jsx)("ul",{className:"space-y-1.5 text-sm",children:c.map(a=>(0,b.jsx)("li",{children:(0,b.jsx)("a",{href:a.href,className:"block py-1 text-[var(--muted)] hover:text-[var(--foreground)] whitespace-pre",children:a.label})},a.href))})})}function j({t:a}){let d=a.quickstart;return(0,b.jsxs)("section",{id:"quickstart",children:[(0,b.jsx)("h2",{className:"display text-2xl sm:text-3xl mb-4",children:d.heading}),(0,b.jsxs)("ol",{className:"space-y-3 text-[var(--muted)] mb-6 list-decimal pl-5",children:[(0,b.jsxs)("li",{children:[d.step1Prefix,(0,b.jsx)(c.default,{href:"/account/api-keys",className:"underline",children:d.step1Link}),d.step1Suffix]}),(0,b.jsxs)("li",{children:[d.step2Prefix,(0,b.jsx)(q,{children:"Authorization: Bearer lmn_…"}),d.step2Suffix]}),(0,b.jsx)("li",{children:d.step3})]}),(0,b.jsx)(r,{languages:{curl:`curl https://lumenari.io/api/v1/recommend \\
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
data = res.json()`}})]})}function k({t:a}){let d=a.authentication;return(0,b.jsxs)("section",{id:"authentication",children:[(0,b.jsx)("h2",{className:"display text-2xl sm:text-3xl mb-4",children:d.heading}),(0,b.jsxs)("p",{className:"text-[var(--muted)] mb-4",children:[d.bodyPrefix," ",(0,b.jsx)(q,{children:"lmn_"}),d.bodyMiddle," ",(0,b.jsx)(c.default,{href:"/account/api-keys",className:"underline",children:d.bodyLink}),d.bodySuffix]}),(0,b.jsx)(r,{languages:{curl:`# Header on every request
Authorization: Bearer lmn_a1b2c3d4e5f6...`,javascript:'headers: { "Authorization": "Bearer lmn_a1b2c3d4..." }',python:'headers={"Authorization": "Bearer lmn_a1b2c3d4..."}'}}),(0,b.jsx)("p",{className:"text-sm text-[var(--muted)] mt-4",children:d.note})]})}function l({t:a}){let c=a.rateLimiting;return(0,b.jsxs)("section",{id:"rate-limiting",children:[(0,b.jsx)("h2",{className:"display text-2xl sm:text-3xl mb-4",children:c.heading}),(0,b.jsx)("p",{className:"text-[var(--muted)] mb-4",children:c.intro}),(0,b.jsxs)("ul",{className:"space-y-2 mb-4 text-sm",children:[(0,b.jsxs)("li",{children:[c.bullet1Prefix,(0,b.jsx)(q,{children:"X-RateLimit-Limit"}),c.bullet1Suffix,(0,b.jsx)(q,{children:"unlimited"}),c.bullet1Close]}),(0,b.jsxs)("li",{children:[c.bullet2Prefix,(0,b.jsx)(q,{children:"X-RateLimit-Remaining"}),c.bullet2Suffix]}),(0,b.jsxs)("li",{children:[c.bullet3Prefix,(0,b.jsx)(q,{children:"X-RateLimit-Reset"}),c.bullet3Suffix]})]}),(0,b.jsxs)("p",{className:"text-[var(--muted)] mb-4",children:[c.footerPrefix,(0,b.jsx)(q,{children:"Retry-After"}),c.footerSuffix]})]})}function m({t:a}){let c=a.endpoints;return(0,b.jsxs)("section",{id:"endpoints",children:[(0,b.jsx)("h2",{className:"display text-2xl sm:text-3xl mb-6",children:c.heading}),(0,b.jsx)(p,{id:"recommend",method:"POST",path:"/api/v1/recommend",summary:c.recommendSummary,labels:{queryParameters:c.queryParameters,requestBody:c.requestBody,example:c.example,response:c.response},body:`{
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
).json()`}}),(0,b.jsx)(p,{id:"list-kits",method:"GET",path:"/api/v1/kits",summary:c.listKitsSummary,labels:{queryParameters:c.queryParameters,requestBody:c.requestBody,example:c.example,response:c.response},query:[{name:"limit",desc:c.query.limit},{name:"offset",desc:c.query.offset},{name:"ai_target",desc:c.query.ai_target},{name:"keyword",desc:c.query.keyword}],response:`{
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
).json()`}}),(0,b.jsx)(p,{id:"get-kit",method:"GET",path:"/api/v1/kits/{id_or_slug}",summary:c.getKitSummary,labels:{queryParameters:c.queryParameters,requestBody:c.requestBody,example:c.example,response:c.response},response:`{
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
).json()`}}),(0,b.jsx)(p,{id:"download-kit",method:"GET",path:"/api/v1/kits/{id_or_slug}/download",summary:c.downloadKitSummary,notes:c.downloadKitNotes,labels:{queryParameters:c.queryParameters,requestBody:c.requestBody,example:c.example,response:c.response},languages:{curl:`curl https://lumenari.io/api/v1/kits/ts-next-production/download \\
  -H "Authorization: Bearer lmn_..." \\
  -o ts-next-production.md`,javascript:`const r = await fetch(
  "https://lumenari.io/api/v1/kits/ts-next-production/download",
  { headers: { Authorization: "Bearer lmn_..." } },
);
const markdown = await r.text();`,python:`r = requests.get(
    "https://lumenari.io/api/v1/kits/ts-next-production/download",
    headers={"Authorization": "Bearer lmn_..."},
)
markdown = r.text`}}),(0,b.jsx)(p,{id:"usage",method:"GET",path:"/api/v1/usage",summary:c.usageSummary,labels:{queryParameters:c.queryParameters,requestBody:c.requestBody,example:c.example,response:c.response},response:`{
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
).json()`}})]})}function n({t:a}){let c=a.errorCodes,d=[{status:400,code:"invalid_request"},{status:401,code:"missing_api_key"},{status:401,code:"invalid_api_key"},{status:402,code:"subscription_inactive"},{status:402,code:"tier_required"},{status:404,code:"not_found"},{status:429,code:"rate_limit_exceeded"},{status:500,code:"internal_error"},{status:500,code:"content_unavailable"}].map((a,b)=>({...a,meaning:c.rows[b]?.meaning??""}));return(0,b.jsxs)("section",{id:"error-codes",children:[(0,b.jsx)("h2",{className:"display text-2xl sm:text-3xl mb-4",children:c.heading}),(0,b.jsx)("p",{className:"text-[var(--muted)] mb-4",children:c.intro}),(0,b.jsx)(r,{languages:{curl:`{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Monthly call limit of 100 exceeded. Upgrade your tier..."
  }
}`}}),(0,b.jsx)("div",{className:"mt-6 rounded-2xl border border-[var(--hairline)] overflow-hidden",children:(0,b.jsxs)("table",{className:"w-full text-sm",children:[(0,b.jsx)("thead",{className:"bg-[var(--surface)]",children:(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{className:"text-left font-semibold px-4 py-3 w-20",children:c.header_http}),(0,b.jsx)("th",{className:"text-left font-semibold px-4 py-3 w-56",children:c.header_code}),(0,b.jsx)("th",{className:"text-left font-semibold px-4 py-3",children:c.header_meaning})]})}),(0,b.jsx)("tbody",{children:d.map(a=>(0,b.jsxs)("tr",{className:"border-t border-[var(--hairline)]",children:[(0,b.jsx)("td",{className:"px-4 py-3 font-mono",children:a.status}),(0,b.jsx)("td",{className:"px-4 py-3 font-mono",children:a.code}),(0,b.jsx)("td",{className:"px-4 py-3 text-[var(--muted)]",children:a.meaning})]},`${a.status}-${a.code}`))})]})})]})}function o({t:a}){let c=a.webhooks;return(0,b.jsxs)("section",{id:"webhooks",children:[(0,b.jsx)("h2",{className:"display text-2xl sm:text-3xl mb-4",children:c.heading}),(0,b.jsx)("div",{className:"rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5",children:(0,b.jsxs)("p",{className:"text-sm text-[var(--muted)]",children:[c.bodyPrefix,(0,b.jsx)("a",{href:"mailto:hello@lumenari.io?subject=Lumenari%20API%20webhooks%20interest",className:"underline text-[var(--foreground)]",children:"hello@lumenari.io"}),c.bodySuffix]})})]})}function p({id:a,method:c,path:d,summary:e,body:f,query:g,response:h,notes:i,languages:j,labels:k}){return(0,b.jsxs)("article",{id:a,className:"mb-12 scroll-mt-24",children:[(0,b.jsxs)("div",{className:"flex items-center gap-3 mb-3 flex-wrap",children:[(0,b.jsx)("span",{className:`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-semibold ${"GET"===c?"bg-blue-100 text-blue-900":"bg-emerald-100 text-emerald-900"}`,children:c}),(0,b.jsx)("code",{className:"font-mono text-sm text-[var(--foreground)]",children:d})]}),(0,b.jsx)("p",{className:"text-[var(--muted)] mb-5",children:e}),g?(0,b.jsxs)("div",{className:"mb-5",children:[(0,b.jsx)("h4",{className:"text-sm font-semibold mb-2",children:k.queryParameters}),(0,b.jsx)("ul",{className:"space-y-1.5 text-sm",children:g.map(a=>(0,b.jsxs)("li",{children:[(0,b.jsx)(q,{children:a.name})," ",(0,b.jsxs)("span",{className:"text-[var(--muted)]",children:["— ",a.desc]})]},a.name))})]}):null,f?(0,b.jsxs)("div",{className:"mb-5",children:[(0,b.jsx)("h4",{className:"text-sm font-semibold mb-2",children:k.requestBody}),(0,b.jsx)(r,{languages:{json:f}})]}):null,(0,b.jsxs)("div",{className:"mb-5",children:[(0,b.jsx)("h4",{className:"text-sm font-semibold mb-2",children:k.example}),(0,b.jsx)(r,{languages:j})]}),h?(0,b.jsxs)("div",{children:[(0,b.jsx)("h4",{className:"text-sm font-semibold mb-2",children:k.response}),(0,b.jsx)(r,{languages:{json:h}})]}):null,i?(0,b.jsx)("p",{className:"mt-4 text-sm text-[var(--muted)]",children:i}):null]})}function q({children:a}){return(0,b.jsx)("code",{className:"font-mono text-sm bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--hairline)]",children:a})}function r({languages:a}){let c=Object.entries(a);if(1===c.length){let[,a]=c[0];return(0,b.jsx)("div",{className:"rounded-xl bg-[#0a0d10] text-[#e6e6e6] p-4 overflow-x-auto",children:(0,b.jsx)("pre",{className:"font-mono text-[13px] leading-relaxed whitespace-pre",children:a})})}return(0,b.jsxs)("div",{className:"rounded-xl bg-[#0a0d10] overflow-hidden",children:[(0,b.jsx)("div",{className:"flex gap-1 px-3 pt-3 text-xs",children:c.map(([a])=>(0,b.jsx)("span",{className:"font-mono px-2.5 py-1 rounded-md bg-white/5 text-[#e6e6e6] capitalize",children:a},a))}),(0,b.jsx)("div",{className:"space-y-1",children:c.map(([a,c])=>(0,b.jsxs)("div",{className:"p-4 text-[#e6e6e6] overflow-x-auto",children:[(0,b.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-[#9ca3af] mb-2 font-mono",children:a}),(0,b.jsx)("pre",{className:"font-mono text-[13px] leading-relaxed whitespace-pre",children:c})]},a))})]})}a.s(["default",0,h,"generateMetadata",0,g,"generateStaticParams",0,function(){return d.LOCALES.map(a=>({locale:a}))}])},320779,a=>{a.n(a.i(735910))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0vy9q2z._.js.map