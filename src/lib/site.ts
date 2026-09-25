const DEV_FALLBACK = "http://localhost:3000";

function resolveSiteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  if (value && value.startsWith("http")) return value;

  // Em build de deploy (Vercel ou Cloudflare Pages), URL ausente é erro: canonical e sitemap sairiam errados.
  if (process.env.VERCEL || process.env.CF_PAGES) {
    throw new Error("NEXT_PUBLIC_SITE_URL não definida. Configure a URL pública do site (ex.: https://dominio.com).");
  }
  return DEV_FALLBACK;
}

export const SITE_URL = resolveSiteUrl();
