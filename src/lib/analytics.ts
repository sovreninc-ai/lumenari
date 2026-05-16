/**
 * Analytics helper — Plausible (primary) + PostHog (optional).
 *
 * Usage from a client component:
 *   import { track } from "@/lib/analytics";
 *   track("kit_viewed", { kit_slug: "real-estate-pro" });
 *
 * Both vendors are loaded via small `<script>` tags in the root layout.
 * The track() helper is a noop on the server and a thin wrapper on the
 * client — it doesn't break if either vendor isn't loaded.
 */

export type LumenariEvent =
  | "wizard_started"
  | "wizard_completed"
  | "kit_viewed"
  | "checkout_started"
  | "purchase_completed"
  | "pro_signup"
  | "api_key_generated"
  | "newsletter_signup"
  | "newsletter_signup_confirmed"
  | "exit_intent_modal_shown"
  | "exit_intent_modal_signup"
  | "referral_link_copied";

export type TrackProps = Record<
  string,
  string | number | boolean | null | undefined
>;

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, unknown>; callback?: () => void },
    ) => void;
    posthog?: {
      capture: (event: string, props?: Record<string, unknown>) => void;
    };
  }
}

export function track(event: LumenariEvent, props?: TrackProps): void {
  if (typeof window === "undefined") return;

  // Plausible — fire-and-forget.
  try {
    window.plausible?.(event, props ? { props } : undefined);
  } catch {
    // Plausible script blocked or not loaded yet — silently ignore.
  }

  // PostHog — optional, only if key was set.
  try {
    window.posthog?.capture(event, props);
  } catch {
    // PostHog not loaded — silently ignore.
  }
}
