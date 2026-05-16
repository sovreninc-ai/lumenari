import { Resend } from "resend";
import { env } from "./env";

let _resend: Resend | null = null;

export function resend(): Resend {
  if (!_resend) {
    _resend = new Resend(env.resendKey);
  }
  return _resend;
}
