# Screenshots — Lumenari Press Kit

Eight screenshots to capture before launch. Each one is sized for the major distribution channels (ProductHunt, X, LinkedIn, blog, email, app icon).

Capture every screenshot in **light theme** with **realistic content** — real kit names, real prices, no Lorem Ipsum, no "Test Kit 1," no Chris's personal email visible.

---

## Per-channel dimensions (use for every screenshot)

| Channel | Dimensions | Notes |
|---|---|---|
| ProductHunt gallery | 1270x760 | No browser chrome. Under 1MB per file. |
| Twitter / X cards | 1600x900 | 16:9. Crops to 1200x675 in feed — keep important content centred. |
| LinkedIn share image | 1200x627 | 1.91:1. Don't put text in bottom 100px (LinkedIn overlays UI). |
| Blog header | 1920x1080 | Full HD, 16:9. Browser chrome optional. |
| Email banner | 600x200 | Wide & short. Crop hero only — full screens won't read. |
| App icon | 512x512 | Square. Use the Lumenari mark, not a screenshot. |

---

## Screenshot 1 — Homepage hero

| | |
|---|---|
| **URL** | `https://lumenari.io/` |
| **What to capture** | Above-the-fold landing screen. Tagline + primary CTA into the recommendation wizard. Show the gradient hero treatment (warm gold → spectrum orange → deep blue). |
| **Notes** | This is the "thumbnail" of Lumenari — use it as the default ProductHunt hero. Make sure the wizard CTA button is visible. No nav cookie banners or popups. |

---

## Screenshot 2 — Wizard step 1

| | |
|---|---|
| **URL** | `https://lumenari.io/wizard` (step 1) |
| **What to capture** | Clean wizard input — the first question / role selection. Empty state, ready to fill. |
| **Notes** | Sells the "free" angle. Keep it minimal — wizard should feel fast and Apple-clean. |

---

## Screenshot 3 — Wizard step 3 with results

| | |
|---|---|
| **URL** | `https://lumenari.io/wizard` (step 3 / results) |
| **What to capture** | Completed wizard showing 3-5 recommended kits with thumbnails, kit names, prices in CAD, and "View kit" CTAs. |
| **Notes** | This is the "aha moment" screenshot. Use a recognisable persona — e.g. "Real Estate Agent" — so the recommended kits make obvious sense. Show real kit names. |

---

## Screenshot 4 — Kit detail page (flagship kit)

| | |
|---|---|
| **URL** | `https://lumenari.io/kits/real-estate-listings-market-analysis` *(or)* `https://lumenari.io/kits/typescript-nextjs-production-pack` |
| **What to capture** | Full kit detail page — kit name, description, list of deliverables (4 format files), price ($14 or $19 CAD), and the buy button. Show the "4 formats" callout prominently. |
| **Notes** | Pick the kit with the best visual density. The 4-format breakdown is the differentiator — make sure it's visible in the screenshot, not below the fold. |

---

## Screenshot 5 — /pro page

| | |
|---|---|
| **URL** | `https://lumenari.io/pro` |
| **What to capture** | Pro+ subscription pricing tiers (monthly, annual, lifetime). Show feature comparison and the "Lifetime" badge if there is one. |
| **Notes** | Crop to show all three tiers in one frame. Lifetime tier is the conversation-starter — don't crop it out. |

---

## Screenshot 6 — /api-platform page

| | |
|---|---|
| **URL** | `https://lumenari.io/api-platform` |
| **What to capture** | API tier pricing (Free 100/mo → Pro $99 → Business $499 → Enterprise) **and** a sample endpoint with a code block visible. |
| **Notes** | This is the screenshot for technical / dev publications. Show real JSON response if possible. Syntax highlighting on. |

---

## Screenshot 7 — /api-docs page

| | |
|---|---|
| **URL** | `https://lumenari.io/api-docs` |
| **What to capture** | API documentation interface — endpoint list on the left, request/response example on the right. |
| **Notes** | Pairs with screenshot 6 in dev-focused articles. Show a non-trivial endpoint (e.g. `POST /v1/recommendations`). |

---

## Screenshot 8 — Bundle page (Everything-100)

| | |
|---|---|
| **URL** | `https://lumenari.io/bundles/everything-100` |
| **What to capture** | The 100-kit bundle page — visual grid of all 100 kit thumbnails, total price, savings vs buying individually. |
| **Notes** | Highest visual-impact screenshot in the catalog. The grid of 100 kits is *the* shot for "look how much is in here." Use this on LinkedIn and as the second ProductHunt gallery slide. |

---

## Production notes

- **Theme:** light only. Apple-clean. No dark mode in press materials.
- **Content:** real kit names, real prices in CAD. Never "Test Kit 1," "Sample Title," or Lorem Ipsum.
- **PII:** no email addresses, no Chris's personal info, no live customer data visible.
- **Browser frame:** ProductHunt prefers no chrome. Blog and X are fine with a clean Safari/Chrome frame. Use [Screenshot.rocks](https://screenshot.rocks/) or [Mockuuups Studio](https://mockuuups.studio/) for consistent framing.
- **File format:** PNG for UI screenshots (sharp text). JPG only for any photographic asset (founder photo, etc.).
- **Compression:** every file under **1MB**. ProductHunt rejects larger uploads. Use [Squoosh](https://squoosh.app/) or `pngquant`.
- **Retina:** capture at 2x display density, then export at the target dimensions. Don't capture at 1x and upscale.
- **Cursor:** hide the macOS cursor before capturing (`Cmd+Shift+5` → uncheck "Show Mouse Pointer").

---

## Where to host

Host all final screenshots in a public **`/marketing-assets/`** folder on lumenari.io (or push to Cloudinary if you want on-the-fly resize URLs).

**Naming convention:**

```
/marketing-assets/press-kit/
  01-homepage-hero-1270x760.png
  01-homepage-hero-1600x900.png
  01-homepage-hero-1200x627.png
  02-wizard-step1-1270x760.png
  ...
  08-bundle-everything-100-1270x760.png
```

Pattern: `{number}-{slug}-{width}x{height}.png`. Press contacts can guess the URL pattern without asking — that's the goal.
