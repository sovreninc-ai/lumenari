import { randomBytes, createHash, timingSafeEqual } from "node:crypto";

/**
 * API key shape:
 *   lmn_<32 hex chars>
 *
 * We never store the raw key — only a SHA-256 hash. The first 12 chars
 * ("lmn_a1b2c3d4") are stored separately as `key_prefix` so the dashboard
 * can show a humane identifier without exposing the secret.
 *
 * Caller flow:
 *   const { key, prefix, hash } = generateApiKey();
 *   await db.from("api_keys").insert({ key_prefix: prefix, key_hash: hash, ... });
 *   return key  // shown to the user ONCE
 */

export interface GeneratedApiKey {
  /** Full key. Returned to the user once. Never stored raw. */
  key: string;
  /** First 12 characters — safe to store and display. */
  prefix: string;
  /** SHA-256 hex digest of the full key. Stored. */
  hash: string;
}

const PREFIX = "lmn_";
const RAW_BYTES = 16; // 32 hex chars

export function generateApiKey(): GeneratedApiKey {
  const raw = randomBytes(RAW_BYTES).toString("hex");
  const key = `${PREFIX}${raw}`;
  return {
    key,
    prefix: key.slice(0, 12),
    hash: hashApiKey(key),
  };
}

export function hashApiKey(rawKey: string): string {
  return createHash("sha256").update(rawKey, "utf8").digest("hex");
}

/**
 * Constant-time compare between a freshly hashed candidate and the stored
 * hash. Both inputs are hex SHA-256 → same length, so `timingSafeEqual` is
 * safe to call directly.
 */
export function verifyApiKey(rawKey: string, storedHash: string): boolean {
  const candidate = hashApiKey(rawKey);
  if (candidate.length !== storedHash.length) return false;
  try {
    return timingSafeEqual(
      Buffer.from(candidate, "hex"),
      Buffer.from(storedHash, "hex"),
    );
  } catch {
    return false;
  }
}

/** Cheap pre-check so we don't hit Postgres for obvious garbage. */
export function looksLikeApiKey(raw: string): boolean {
  return /^lmn_[0-9a-f]{32}$/i.test(raw);
}
