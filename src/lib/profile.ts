// Dados de contato e links. Textos visíveis ficam em messages/; projetos em content/projects/.
export const profile = {
  email: undefined as string | undefined, // [PREENCHER]
  github: "https://github.com/BerhartDev",
  linkedin: "https://www.linkedin.com/in/bernardoknoblauch",
};

/** Redes com ícone no topo e no rodapé, nesta ordem. Sem URL, a rede não aparece. */
export const SOCIAL_NETWORKS = ["linkedin", "github", "instagram", "leetcode", "hackthebox"] as const;
export type SocialNetwork = (typeof SOCIAL_NETWORKS)[number];

export const socialLinks: Record<SocialNetwork, string | undefined> = {
  linkedin: profile.linkedin,
  github: profile.github,
  instagram: undefined, // [PREENCHER] URL completa do perfil
  leetcode: undefined, // [PREENCHER] URL completa do perfil
  hackthebox: undefined, // [PREENCHER] URL completa do perfil
};

export const EXPERIENCE = ["lance", "auberge", "autoavaliar", "jerimum", "cim3", "iff"] as const;
export const EDUCATION = ["estacio", "iff"] as const;
export const LANGUAGES = ["pt", "en", "fr"] as const;
export const STACK_GROUPS = ["frontend", "backend", "cloud", "reliability", "security"] as const;

/** "https://www.exemplo.com/a/" → "exemplo.com/a" */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
