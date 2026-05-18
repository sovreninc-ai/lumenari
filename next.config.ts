import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Node-only modules that don't bundle cleanly under Turbopack. `archiver`
  // is pure ESM with no default export; `pdfkit` ships CJS that depends on
  // Node's fs at module init. Both are server-only and live behind App
  // Router route handlers, so excluding them from bundling is safe.
  serverExternalPackages: ["archiver", "pdfkit"],
};

export default nextConfig;
