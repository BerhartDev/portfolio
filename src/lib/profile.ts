// Dados de contato e links. Textos visíveis ficam em messages/; projetos em content/projects/.
export const profile = {
  email: undefined as string | undefined, // [PREENCHER]
  /** E.164 sem +. wa.me abre a conversa; o visitante ainda envia. */
  whatsapp: "5521973692691",
  github: "https://github.com/BerhartDev",
  linkedin: "https://www.linkedin.com/in/bernardoknoblauch",
  discord: "https://discord.com/users/1497263395781742663",
};

/** Blog, com a versão de cada idioma. */
export const blogUrl: Record<"pt" | "en" | "fr" | "es", string> = {
  pt: "https://beknologia.up.railway.app/pt-BR",
  en: "https://beknologia.up.railway.app/en-US",
  fr: "https://beknologia.up.railway.app/fr-FR",
  es: "https://beknologia.up.railway.app/es-ES",
};

/** Redes com ícone no topo e no rodapé, nesta ordem. Sem URL, a rede não aparece. */
export const SOCIAL_NETWORKS = ["linkedin", "github", "instagram", "leetcode", "hackthebox", "discord"] as const;
/** Ícones da seção de contato, nesta ordem. */
export const CONTACT_NETWORKS = ["whatsapp", "linkedin", "github", "discord"] as const;
export type SocialNetwork = (typeof SOCIAL_NETWORKS)[number] | (typeof CONTACT_NETWORKS)[number];

/** Provisório: o ícone aparece, mas o link leva à home do site no idioma atual. */
export const HOME_PLACEHOLDER = "home";

export const socialLinks: Record<SocialNetwork, string | undefined> = {
  whatsapp: `https://wa.me/${profile.whatsapp}`,
  linkedin: profile.linkedin,
  github: profile.github,
  discord: profile.discord,
  instagram: HOME_PLACEHOLDER, // [PREENCHER] URL completa do perfil
  leetcode: HOME_PLACEHOLDER, // [PREENCHER] URL completa do perfil
  hackthebox: HOME_PLACEHOLDER, // [PREENCHER] URL completa do perfil
};

export const EXPERIENCE = ["lance", "auberge", "autoavaliar", "jerimum", "cim3", "iff"] as const;
export const EDUCATION = ["estacio", "iff", "ihb"] as const;
export const AWARDS = ["iff2018", "feliciano2017", "nilton2013"] as const;
export const LANGUAGES = ["pt", "en", "fr"] as const;
export const STACK_GROUPS = ["backend", "frontend", "data", "cloud", "reliability", "security", "media"] as const;

/** "https://www.exemplo.com/a/" → "exemplo.com/a" */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
