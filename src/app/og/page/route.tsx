import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * Generic page OG image.
 *   GET /og/page?title=Some+Title
 * Always 1200×630 PNG. CSS via inline styles — `tailwindcss` isn't available
 * inside `ImageResponse`.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title =
    searchParams.get("title") ?? "Optimization kits for your AI";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #fef3c7 0%, #fdba74 35%, #ea580c 65%, #1e3a8a 100%)",
          fontFamily: "sans-serif",
          color: "#0f172a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              color: "#ea580c",
            }}
          >
            L
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: "white",
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            Lumenari
          </div>
        </div>

        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "white",
            textShadow: "0 4px 16px rgba(0,0,0,0.4)",
            maxWidth: "100%",
            wordBreak: "break-word",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.92)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <span>Optimization kits for your AI</span>
          <span style={{ fontSize: 22, opacity: 0.85 }}>lumenari.io</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
