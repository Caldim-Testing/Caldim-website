import crypto from "crypto";

const SECRET = process.env.SESSION_SECRET || "fallback_secret_must_be_configured_in_env_32chars";
const SESSION_MAX_AGE = 8 * 60 * 60; // 8 hours, in seconds

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = `${expires}`;
  const sig = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  if (sig !== expected) return false;
  return Number(payload) > Date.now();
}

export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_MAX_AGE_SECONDS = SESSION_MAX_AGE;
