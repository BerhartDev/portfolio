const PUBLIC_SITE_URL = "https://bernardoknoblauch.com";
const DEV_FALLBACK = "http://localhost:3000";

function resolveSiteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  if (value && value.startsWith("http")) return value;
  // Produção usa o domínio mesmo sem a variável no provedor. Local, sem env, fica no localhost.
  if (process.env.NODE_ENV === "production") return PUBLIC_SITE_URL;
  return DEV_FALLBACK;
}

export const SITE_URL = resolveSiteUrl();
