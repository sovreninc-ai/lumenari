import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "./env";

/**
 * Singleton Supabase clients. We keep two:
 *   - `service`: server-only, bypasses RLS — for webhook handlers + admin work
 *   - `anon`:    public/anon — for client-readable rows like the kit catalog
 *
 * Per Sovren stack rules: the service role key NEVER leaves a server context.
 */

let _service: SupabaseClient | null = null;
let _anon: SupabaseClient | null = null;

export function supabaseService(): SupabaseClient {
  if (!_service) {
    _service = createClient(env.supabaseUrl, env.supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _service;
}

export function supabaseAnon(): SupabaseClient {
  if (!_anon) {
    _anon = createClient(env.supabaseUrl, env.supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _anon;
}
