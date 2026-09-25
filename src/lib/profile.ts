// Dados de contato e links. Textos visíveis ficam em messages/; projetos em content/projects/.
export const profile = {
  email: undefined as string | undefined, // [PREENCHER]
  github: undefined as string | undefined, // [PREENCHER] URL completa do perfil
  linkedin: "https://www.linkedin.com/in/bernardoknoblauch",
};

export const EXPERIENCE = ["lance", "auberge", "autoavaliar", "jerimum", "cim3", "iff"] as const;
export const EDUCATION = ["estacio", "iff"] as const;
export const LANGUAGES = ["pt", "en", "fr"] as const;
export const STACK_GROUPS = ["frontend", "backend", "cloud", "reliability", "security"] as const;

/** "https://www.exemplo.com/a/" → "exemplo.com/a" */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
