"use client";

import type { Locale } from "next-intl";
import { routing } from "@/i18n/routing";
import styles from "./LocaleSwitcher.module.css";

type Props = { current: Locale; label: string; names: Record<Locale, string> };

// Links comuns (funcionam sem JS). O clique só grava a escolha para o redirecionamento da raiz.
export function LocaleSwitcher({ current, label, names }: Props) {
  function remember(locale: Locale) {
    try {
      localStorage.setItem("locale", locale);
    } catch {
      // Storage bloqueado: a escolha não é lembrada, a navegação segue normal.
    }
  }

  return (
    <nav aria-label={label}>
      <ul className={styles.list}>
        {routing.locales.map((locale) => (
          <li key={locale}>
            <a
              href={`/${locale}/`}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === current ? "true" : undefined}
              className={styles.item}
              onClick={() => remember(locale)}
            >
              {locale.toUpperCase()}
              <span className="visually-hidden"> · {names[locale]}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
