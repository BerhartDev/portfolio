import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { blogUrl } from "@/lib/profile";
import { homePath, projectsPath, type PathFor } from "@/lib/routes";
import { Disclosure } from "./Disclosure";
import { LocaleSwitcher } from "./LocaleSwitcher";
import styles from "./SiteHeader.module.css";
import { ThemeToggle } from "./ThemeToggle";

// Links da barra. "projects" leva à página de projetos; as outras são âncoras da home.
// Trajetória e Agora ficam só na página, para a barra caber em 1024px.
const SECTIONS = ["projects", "stack", "contact"] as const;

type Props = { locale: Locale; pathFor: PathFor };

/**
 * Barra fixa no topo. Desktop: nome, links, idioma, tema e CTA de contato.
 * Mobile: nome, idioma e botão de menu que abre um painel com links, tema e CTA.
 * Toda página tem a seção #contact, então o CTA funciona em qualquer uma.
 */
export async function SiteHeader({ locale, pathFor }: Props) {
  const t = await getTranslations({ locale });
  const names = Object.fromEntries(routing.locales.map((l) => [l, t(`localeNames.${l}`)])) as Record<Locale, string>;
  const hrefs = Object.fromEntries(routing.locales.map((l) => [l, pathFor(l)])) as Record<Locale, string>;
  const isHome = pathFor === homePath;
  const home = isHome ? "" : homePath(locale);

  const links = [
    ...SECTIONS.map((id) => ({
      id: id as string,
      href: id === "projects" ? projectsPath(locale) : `${home}#${id}`,
      label: t(`${id}.title`),
      current: id === "projects" && pathFor === projectsPath,
      external: false,
    })),
    // Blog: site externo, na versão do idioma atual.
    { id: "blog", href: blogUrl[locale], label: t("nav.blog"), current: false, external: true },
  ];

  const list = (className?: string) => (
    <ul className={className}>
      {links.map(({ id, href, label, current, external }) => (
        <li key={id}>
          <a href={href} className="link" aria-current={current ? "page" : undefined} hrefLang={external ? locale : undefined}>
            {label}
            {external && <span aria-hidden="true"> ↗</span>}
          </a>
        </li>
      ))}
    </ul>
  );

  const cta = (
    <a href="#contact" className={styles.cta}>
      {t("nav.cta")}
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </a>
  );

  return (
    <header className={styles.header}>
      <a href={isHome ? "#top" : home} className={`${styles.name} link`}>
        {t("hero.name")}
      </a>
      <nav aria-label={t("nav.label")} className={styles.desktopNav}>
        {list(styles.links)}
      </nav>
      <div className={styles.controls}>
        <LocaleSwitcher current={locale} label={t("nav.language")} names={names} hrefs={hrefs} />
        <div className={styles.desktopOnly}>
          <ThemeToggle label={t("nav.theme")} />
        </div>
        <div className={styles.desktopOnly}>{cta}</div>
        <Disclosure
          className={styles.menu}
          summaryClassName={styles.burger}
          summary={
            <>
              <span className="visually-hidden">{t("nav.menu")}</span>
              <span className={styles.lines} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </>
          }
        >
          <div className={styles.panel}>
            <nav aria-label={t("nav.label")}>{list(styles.panelLinks)}</nav>
            <div className={styles.panelFoot}>
              <ThemeToggle label={t("nav.theme")} />
              {cta}
            </div>
          </div>
        </Disclosure>
      </div>
    </header>
  );
}
