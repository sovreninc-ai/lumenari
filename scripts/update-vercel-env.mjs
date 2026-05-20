#!/usr/bin/env node
/**
 * Push env vars into the lumenari Vercel project.
 *
 * Usage:
 *   node scripts/update-vercel-env.mjs <env-file> [--prefix PREFIX] [--include KEY1,KEY2]
 *
 * By default updates every KEY=value pair in the file whose key already
 * exists on the Vercel project. Use --prefix to restrict to keys with a
 * given prefix (e.g. STRIPE_PRICE_). Use --include to allow a comma-
 * separated set of explicit keys IN ADDITION to the prefix filter.
 *
 * Each env in Vercel keeps its existing `target` array (preview,
 * production, development, etc.) — we just PATCH the value.
 *
 * Examples:
 *   # Update all STRIPE_PRICE_* + STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET
 *   node scripts/update-vercel-env.mjs stripe-env-vars-live.txt \
 *     --prefix STRIPE_PRICE_ --include STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET
 *
 *   # Update only the two non-PRICE keys
 *   node scripts/update-vercel-env.mjs stripe-secrets-live.txt \
 *     --include STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const TEAM = "team_ryHPO6DuXCTzjuhaN8JgX7Ty";
const PROJECT = "lumenari";

function parseArgs() {
  const args = process.argv.slice(2);
  if (!args.length || args[0].startsWith("--")) {
    throw new Error("First positional arg must be the env file path.");
  }
  const out = {
    file: args[0],
    prefix: null,
    include: new Set(),
  };
  for (let i = 1; i < args.length; i++) {
    const a = args[i];
    if (a === "--prefix") out.prefix = args[++i];
    else if (a === "--include") {
      for (const k of args[++i].split(",")) out.include.add(k.trim());
    } else {
      throw new Error(`Unknown arg: ${a}`);
    }
  }
  if (!out.prefix && out.include.size === 0) {
    throw new Error("Must pass at least one of --prefix or --include.");
  }
  return out;
}

function readToken() {
  const cfg = JSON.parse(
    fs.readFileSync(
      path.join(
        os.homedir(),
        "Library/Application Support/com.vercel.cli/auth.json",
      ),
      "utf8",
    ),
  );
  return cfg.token;
}

function parseEnvFile(filePath, { prefix, include }) {
  const map = {};
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq < 0) continue;
    const k = t.slice(0, eq).trim();
    const v = t
      .slice(eq + 1)
      .trim()
      .replace(/^"(.*)"$/, "$1");
    if (!v) continue;
    const matchPrefix = prefix && k.startsWith(prefix);
    const matchInclude = include.has(k);
    if (matchPrefix || matchInclude) map[k] = v;
  }
  return map;
}

async function api(p, init = {}) {
  const token = readToken();
  const url = new URL(`https://api.vercel.com${p}`);
  if (!url.searchParams.has("teamId")) url.searchParams.set("teamId", TEAM);
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON ${res.status}: ${text.slice(0, 200)}`);
  }
  if (!res.ok) {
    throw new Error(
      `HTTP ${res.status} on ${p}: ${JSON.stringify(json).slice(0, 300)}`,
    );
  }
  return json;
}

async function listEnvs() {
  const out = await api(`/v9/projects/${PROJECT}/env`);
  return out.envs;
}

async function patchEnv(id, value) {
  return api(`/v10/projects/${PROJECT}/env/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ value }),
  });
}

async function main() {
  const opts = parseArgs();
  const desired = parseEnvFile(path.resolve(opts.file), opts);
  const want = Object.keys(desired);
  console.log(`Desired keys (${want.length}):`);
  for (const k of want) console.log(`  ${k}`);

  const envs = await listEnvs();
  const byKey = new Map();
  for (const e of envs) {
    if (desired[e.key]) byKey.set(e.key, e);
  }
  console.log(`\nMatching Vercel envs: ${byKey.size}`);

  let updated = 0;
  const missing = [];
  const failures = [];

  for (const [key, value] of Object.entries(desired)) {
    const env = byKey.get(key);
    if (!env) {
      missing.push(key);
      console.log(`SKIP ${key}: not in Vercel`);
      continue;
    }
    try {
      await patchEnv(env.id, value);
      console.log(`OK   ${key} (targets ${env.target.join(",")})`);
      updated++;
    } catch (e) {
      console.error(`FAIL ${key}: ${e.message}`);
      failures.push({ key, error: e.message });
    }
  }

  fs.mkdirSync("tmp", { recursive: true });
  fs.writeFileSync(
    "tmp/vercel-env-update-summary.json",
    JSON.stringify(
      { updated, missingInVercel: missing, failures },
      null,
      2,
    ),
  );
  console.log(
    `\nUpdated: ${updated}  Missing: ${missing.length}  Failures: ${failures.length}`,
  );
  if (failures.length) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
