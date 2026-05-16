import Anthropic from "@anthropic-ai/sdk";
import { env } from "./env";

let _client: Anthropic | null = null;

export function anthropic(): Anthropic {
  if (!_client) {
    _client = new Anthropic({ apiKey: env.anthropicKey });
  }
  return _client;
}

/**
 * Model identifier — pinned so a future provider change doesn't drift
 * recommendation quality. Swap here when upgrading.
 */
export const RECOMMENDER_MODEL = "claude-3-5-sonnet-latest";
