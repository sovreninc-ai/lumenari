import { ImageResponse } from "next/og";
import { getKit, getBundle, formatUSD } from "@/data/kits";

export const runtime = "nodejs";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  const kit = getKit(slug);
  const bundle = getBundle(slug);

  const name = kit?.name ?? bundle?.name ?? "Lumenari kit";
  const tagline = kit?.tagline ?? bundle?.tagline ?? "Optimization kits for your AI.";
  const price = kit?.priceCents ?? bundle?.priceCents ?? 0;
  const targets =
    kit?.aiTargets?.join(" · ") ?? (bundle ? `${bundle.kitSlugs.length} kits` : "any AI");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "70px 80px",
          background:
            "linear-gradient(135deg, #fef3c7 0%, #fdba74 25%, #ea580c 55%, #1e40af 100%)",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "#ea580c",
            }}
          >
            L
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            Lumenari
          </div>
        </div>

        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
            opacity: 0.85,
            marginBottom: 10,
          }}
        >
          Optimization Pack
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: 24,
            textShadow: "0 4px 16px rgba(0,0,0,0.35)",
            maxWidth: 1040,
          }}
        >
          {name}
        </div>

        <div
          style={{
            fontSize: 26,
            lineHeight: 1.35,
            opacity: 0.95,
            marginBottom: 30,
            maxWidth: 1040,
          }}
        >
          {tagline.length > 140 ? tagline.slice(0, 138) + "..." : tagline}
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontSize: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity: 0.95,
            }}
          >
            <span
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.18)",
                fontSize: 22,
              }}
            >
              {targets}
            </span>
            <span
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                background: "white",
                color: "#0f172a",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {price > 0 ? `${formatUSD(price)} USD` : "Bundle"}
            </span>
          </div>
          <span style={{ fontSize: 20, opacity: 0.8 }}>lumenari.io</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
