const raw = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";

/** Vazio até existir um id GA4 (G-…). Sem isso o script não entra. */
export const GA_MEASUREMENT_ID = /^G-[A-Z0-9]+$/.test(raw) ? raw : "";
