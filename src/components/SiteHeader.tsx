import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { LocaleSwitcher } from "./LocaleSwitcher";
import styles from "./SiteHeader.module.css";
import { ThemeToggle } from "./ThemeToggle";

export const SECTIONS = ["projects", "experience", "stack", "now", "contact"] as const;

export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const names = Object.fromEntries(routing.locales.map((l) => [l, t(`localeNames.${l}`)])) as Record<Locale, string>;

  return (
    <header className={styles.header}>
      <a href="#top" className={`${styles.name} link`}>
        {t("hero.name")}
      </a>
      <nav aria-label={t("nav.label")} className={styles.sections}>
        <ul>
          {SECTIONS.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className="link">
                {t(`${id}.title`)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.controls}>
        <LocaleSwitcher current={locale} label={t("nav.language")} names={names} />
        <ThemeToggle label={t("nav.theme")} />
      </div>
    </header>
  );
}
