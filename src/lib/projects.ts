// Conteúdo dos projetos: um JSON por projeto em content/projects/, com os 4 idiomas.
// Lido com fs no build. JSON inválido derruba o build com o arquivo e o caminho do erro.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Locale } from "next-intl";
import { routing } from "@/i18n/routing";

export const SECTION_KEYS = ["context", "problem", "work", "result"] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "code"; code: string; lang?: string }
  | { type: "image"; src: string; alt: string; caption?: string; width?: number; height?: number };

export type ProjectText = {
  title: string;
  tag: string;
  summary: string;
  sections: Record<SectionKey, Block[]>;
};

export type ProjectLink = { url: string };

/** Imagem da galeria do projeto. Arquivo em public/projects/<slug>/; alt e legenda por idioma. */
export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
  caption?: Record<Locale, string>;
};

export type Project = {
  slug: string;
  order: number;
  period?: string;
  stack: string[];
  links: ProjectLink[];
  images: ProjectImage[];
} & Record<Locale, ProjectText>;

const DIR = join(process.cwd(), "content", "projects");
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

class ContentError extends Error {
  constructor(file: string, path: string, message: string) {
    super(`content/projects/${file}: ${path} ${message}`);
  }
}

type Ctx = { file: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function str(ctx: Ctx, value: unknown, path: string): string {
  if (typeof value !== "string" || !value.trim()) throw new ContentError(ctx.file, path, "deve ser texto não vazio");
  return value;
}

function optStr(ctx: Ctx, value: unknown, path: string): string | undefined {
  return value === undefined ? undefined : str(ctx, value, path);
}

function optInt(ctx: Ctx, value: unknown, path: string): number | undefined {
  if (value === undefined) return undefined;
  if (!Number.isInteger(value) || (value as number) <= 0) throw new ContentError(ctx.file, path, "deve ser um inteiro positivo");
  return value as number;
}

function int(ctx: Ctx, value: unknown, path: string): number {
  const n = optInt(ctx, value, path);
  if (n === undefined) throw new ContentError(ctx.file, path, "é obrigatório (inteiro positivo, em pixels)");
  return n;
}

function src(ctx: Ctx, value: unknown, path: string): string {
  const s = str(ctx, value, path);
  if (!s.startsWith("/")) throw new ContentError(ctx.file, path, "deve começar com / (arquivo em public/)");
  return s;
}

/** Texto nos 4 idiomas: { "pt": "…", "en": "…", "fr": "…", "es": "…" }. */
function localized(ctx: Ctx, value: unknown, path: string): Record<Locale, string> {
  const o = obj(ctx, value, path);
  return Object.fromEntries(routing.locales.map((l) => [l, str(ctx, o[l], `${path}.${l}`)])) as Record<Locale, string>;
}

function parseImage(ctx: Ctx, value: unknown, path: string): ProjectImage {
  const img = obj(ctx, value, path);
  return {
    src: src(ctx, img.src, `${path}.src`),
    width: int(ctx, img.width, `${path}.width`),
    height: int(ctx, img.height, `${path}.height`),
    alt: localized(ctx, img.alt, `${path}.alt`),
    caption: img.caption === undefined ? undefined : localized(ctx, img.caption, `${path}.caption`),
  };
}

function arr(ctx: Ctx, value: unknown, path: string): unknown[] {
  if (!Array.isArray(value)) throw new ContentError(ctx.file, path, "deve ser uma lista");
  return value;
}

function obj(ctx: Ctx, value: unknown, path: string): Record<string, unknown> {
  if (!isRecord(value)) throw new ContentError(ctx.file, path, "deve ser um objeto");
  return value;
}

function parseBlock(ctx: Ctx, value: unknown, path: string): Block {
  const b = obj(ctx, value, path);
  switch (b.type) {
    case "p":
    case "h":
      return { type: b.type, text: str(ctx, b.text, `${path}.text`) };
    case "list": {
      const items = arr(ctx, b.items, `${path}.items`).map((item, i) => str(ctx, item, `${path}.items[${i}]`));
      if (!items.length) throw new ContentError(ctx.file, `${path}.items`, "não pode ser vazia");
      return { type: "list", items };
    }
    case "quote":
      return { type: "quote", text: str(ctx, b.text, `${path}.text`), cite: optStr(ctx, b.cite, `${path}.cite`) };
    case "code":
      return { type: "code", code: str(ctx, b.code, `${path}.code`), lang: optStr(ctx, b.lang, `${path}.lang`) };
    case "image": {
      return {
        type: "image",
        src: src(ctx, b.src, `${path}.src`),
        alt: str(ctx, b.alt, `${path}.alt`),
        caption: optStr(ctx, b.caption, `${path}.caption`),
        width: optInt(ctx, b.width, `${path}.width`),
        height: optInt(ctx, b.height, `${path}.height`),
      };
    }
    default:
      throw new ContentError(ctx.file, `${path}.type`, "deve ser p, h, list, quote, code ou image");
  }
}

function parseText(ctx: Ctx, value: unknown, path: string): ProjectText {
  const t = obj(ctx, value, path);
  const s = obj(ctx, t.sections, `${path}.sections`);
  const sections = Object.fromEntries(
    SECTION_KEYS.map((key) => {
      const blocks = arr(ctx, s[key], `${path}.sections.${key}`).map((b, i) =>
        parseBlock(ctx, b, `${path}.sections.${key}[${i}]`),
      );
      if (!blocks.length) throw new ContentError(ctx.file, `${path}.sections.${key}`, "precisa de pelo menos um bloco");
      return [key, blocks];
    }),
  ) as Record<SectionKey, Block[]>;
  return {
    title: str(ctx, t.title, `${path}.title`),
    tag: str(ctx, t.tag, `${path}.tag`),
    summary: str(ctx, t.summary, `${path}.summary`),
    sections,
  };
}

function parseProject(file: string, raw: unknown): Project {
  const ctx = { file };
  const slug = file.replace(/\.json$/, "");
  if (!SLUG.test(slug)) throw new ContentError(file, "nome do arquivo", "deve ser minúsculo, com letras, números e hífens");
  const p = obj(ctx, raw, "raiz");
  if (typeof p.order !== "number") throw new ContentError(file, "order", "deve ser um número");
  const texts = Object.fromEntries(routing.locales.map((l) => [l, parseText(ctx, p[l], l)])) as Record<Locale, ProjectText>;
  return {
    slug,
    order: p.order,
    period: optStr(ctx, p.period, "period"),
    stack: arr(ctx, p.stack ?? [], "stack").map((s, i) => str(ctx, s, `stack[${i}]`)),
    links: arr(ctx, p.links ?? [], "links").map((l, i) => {
      const url = str(ctx, obj(ctx, l, `links[${i}]`).url, `links[${i}].url`);
      if (!/^https?:\/\//.test(url)) throw new ContentError(file, `links[${i}].url`, "deve começar com http:// ou https://");
      return { url };
    }),
    images: arr(ctx, p.images ?? [], "images").map((img, i) => parseImage(ctx, img, `images[${i}]`)),
    ...texts,
  };
}

function readJson(file: string): unknown {
  try {
    return JSON.parse(readFileSync(join(DIR, file), "utf8"));
  } catch (error) {
    throw new ContentError(file, "JSON", `inválido: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function loadProjects(): Project[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((file) => parseProject(file, readJson(file)))
    .sort((a, b) => a.order - b.order);
}

let cache: Project[] | undefined;

/** Todos os projetos, ordenados por `order`. No dev, relê a pasta a cada chamada para refletir edições nos JSONs. */
export function getProjects(): Project[] {
  if (process.env.NODE_ENV === "development") return loadProjects();
  cache ??= loadProjects();
  return cache;
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}
