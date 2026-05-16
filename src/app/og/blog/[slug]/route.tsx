import { ImageResponse } from "next/og";
import { getBlogPost } from "@/lib/blog";

export const runtime = "nodejs";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  const title = post?.title ?? "Lumenari Blog";
  const author = post?.author ?? "Lumenari";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          background: "white",
          fontFamily: "sans-serif",
          color: "#0f172a",
          position: "relative",
        }}
      >
        {/* Spectrum bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            background:
              "linear-gradient(90deg, #fef3c7 0%, #fdba74 25%, #ea580c 55%, #1e40af 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 50,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              background:
                "linear-gradient(135deg, #fdba74 0%, #ea580c 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            L
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#475569",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Lumenari · Blog
          </div>
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.08,
            color: "#0f172a",
            maxWidth: 1040,
            flex: 1,
          }}
        >
          {title.length > 110 ? title.slice(0, 108) + "..." : title}
        </div>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            color: "#64748b",
            fontSize: 22,
          }}
        >
          <span>By {author}</span>
          <span>lumenari.io/blog</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
