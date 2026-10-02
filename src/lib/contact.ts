export const TOPICS = ["job", "project", "other"] as const;
export type Topic = (typeof TOPICS)[number];

const MIN_WAIT_MS = 3_000;
const MAX_SENDS = 3;
const HOUR_MS = 60 * 60 * 1000;
const STORAGE_KEY = "portfolio-contact-sent";

const KNOWN_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "outlook.com.br",
  "hotmail.com.br",
  "live.com.br",
  "icloud.com",
  "me.com",
  "mac.com",
  "yahoo.com",
  "yahoo.com.br",
  "ymail.com",
  "proton.me",
  "protonmail.com",
  "pm.me",
  "zoho.com",
  "fastmail.com",
  "gmx.com",
  "gmx.net",
  "aol.com",
  "mail.com",
  "uol.com.br",
  "bol.com.br",
  "terra.com.br",
  "globo.com",
  "ig.com.br",
]);

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamailblock.com",
  "guerrillamail.info",
  "guerrillamail.biz",
  "guerrillamail.de",
  "guerrillamail.net",
  "guerrillamail.org",
  "sharklasers.com",
  "grr.la",
  "yopmail.com",
  "yopmail.fr",
  "10minutemail.com",
  "10minutemail.net",
  "tempmail.com",
  "temp-mail.org",
  "tempmailo.com",
  "trashmail.com",
  "trash-mail.com",
  "dispostable.com",
  "maildrop.cc",
  "getnada.com",
  "dropmail.me",
  "mohmal.com",
  "emailondeck.com",
  "fakeinbox.com",
  "throwawaymail.com",
  "mailnesia.com",
  "tempr.email",
  "inboxkitten.com",
  "spamgourmet.com",
  "mailcatch.com",
  "mintemail.com",
  "mytemp.email",
  "discard.email",
]);

export type FieldError = "name" | "email" | "emailDomain" | "message" | "messageLong" | "topic";
export type FieldErrors = Partial<Record<"name" | "email" | "message" | "topic", FieldError>>;

export type ContactDraft = {
  name: string;
  email: string;
  message: string;
  topic: string;
};

export function isTopic(value: string): value is Topic {
  return (TOPICS as readonly string[]).includes(value);
}

function listed(domain: string, list: Set<string>): boolean {
  if (list.has(domain)) return true;
  for (const item of list) if (domain.endsWith(`.${item}`)) return true;
  return false;
}

function corporateDomain(domain: string): boolean {
  if (domain.length > 253 || /^\d{1,3}(\.\d{1,3}){3}$/.test(domain)) return false;
  const labels = domain.split(".");
  const tld = labels.at(-1);
  if (labels.length < 2 || !tld || tld.length < 2) return false;
  return labels.every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label));
}

export function emailError(email: string): "email" | "emailDomain" | undefined {
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "email";
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  if (listed(domain, DISPOSABLE_DOMAINS)) return "emailDomain";
  if (listed(domain, KNOWN_DOMAINS) || corporateDomain(domain)) return undefined;
  return "emailDomain";
}

export function fieldErrors(draft: ContactDraft): FieldErrors {
  const errors: FieldErrors = {};
  if (draft.name.length < 2 || draft.name.length > 80) errors.name = "name";
  const email = emailError(draft.email);
  if (email) errors.email = email;
  if (!isTopic(draft.topic)) errors.topic = "topic";
  if (draft.message.length < 20) errors.message = "message";
  else if (draft.message.length > 2000) errors.message = "messageLong";
  return errors;
}

export function stripLinks(message: string): { text: string; stripped: boolean } {
  if (!/https?:\/\/\S+|www\.\S+/i.test(message)) return { text: message, stripped: false };
  const text = message
    .replace(/https?:\/\/\S+|www\.\S+/gi, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return { text, stripped: true };
}

function recentSends(now: number): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((stamp): stamp is number => typeof stamp === "number" && now - stamp < HOUR_MS);
  } catch {
    return [];
  }
}

export function tooFast(openedAt: number, now = Date.now()): boolean {
  return now - openedAt < MIN_WAIT_MS;
}

export function overLimit(now = Date.now()): boolean {
  return recentSends(now).length >= MAX_SENDS;
}

export function recordSend(now = Date.now()): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...recentSends(now), now]));
  } catch {
    // Storage bloqueado: o envio segue. O teto é deste navegador.
  }
}
