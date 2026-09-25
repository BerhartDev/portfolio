import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { homePath, projectsPath, type PathFor } from "@/lib/routes";
import { LocaleSwitcher } from "./LocaleSwitcher";
import styles from "./SiteHeader.module.css";
import { ThemeToggle } from "./ThemeToggle";

// Seções da home. "projects" leva à página de projetos; as outras são âncoras da home.
export const SECTIONS = ["projects", "experience", "stack", "now", "contact"] as const;

type Props = { locale: Locale; pathFor: PathFor };

export async function SiteHeader({ locale, pathFor }: Props) {
  const t = await getTranslations({ locale });
  const names = Object.fromEntries(routing.locales.map((l) => [l, t(`localeNames.${l}`)])) as Record<Locale, string>;
  const hrefs = Object.fromEntries(routing.locales.map((l) => [l, pathFor(l)])) as Record<Locale, string>;
  const isHome = pathFor === homePath;
  const home = isHome ? "" : homePath(locale);

  return (
    <header className={styles.header}>
      <a href={isHome ? "#top" : home} className={`${styles.name} link`}>
        {t("hero.name")}
      </a>
      <nav aria-label={t("nav.label")} className={styles.sections}>
        <ul>
          {SECTIONS.map((id) => {
            const href = id === "projects" ? projectsPath(locale) : `${home}#${id}`;
            const current = id === "projects" && pathFor === projectsPath;
            return (
              <li key={id}>
                <a href={href} className="link" aria-current={current ? "page" : undefined}>
                  {t(`${id}.title`)}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={styles.controls}>
        <LocaleSwitcher current={locale} label={t("nav.language")} names={names} hrefs={hrefs} />
        <ThemeToggle label={t("nav.theme")} />
      </div>
    </header>
  );
}
