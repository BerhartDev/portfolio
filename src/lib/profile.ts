// Dados de contato e links. Textos visíveis ficam em messages/.
export const profile = {
  email: undefined as string | undefined, // [PREENCHER]
  github: undefined as string | undefined, // [PREENCHER] URL completa do perfil
  linkedin: "https://www.linkedin.com/in/bernardoknoblauch",
};

export const PROJECTS = ["lance", "autoavaliar", "vamosmarcar", "bekno"] as const;
export type ProjectKey = (typeof PROJECTS)[number];

export const projectLinks: Partial<Record<ProjectKey, string>> = {
  vamosmarcar: "https://vamosmarcar.com",
  bekno: "https://berhartdev.github.io/bekno-landing-page/pt/",
};

export const EXPERIENCE = ["lance", "auberge", "autoavaliar", "jerimum", "cim3", "iff"] as const;
export const EDUCATION = ["estacio", "iff"] as const;
export const LANGUAGES = ["pt", "en", "fr"] as const;
export const STACK_GROUPS = ["frontend", "backend", "cloud", "reliability", "security"] as const;

/** "https://www.exemplo.com/a/" → "exemplo.com/a" */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
