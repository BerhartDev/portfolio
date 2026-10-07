export type ConsentStatus = "granted" | "denied";

const STORAGE_KEY = "cookie-consent";

export function getStoredConsent(): ConsentStatus | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(status: ConsentStatus): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, status);
  } catch {
    // Sem persistência neste navegador. O clique ainda vale nesta visita.
  }
}
