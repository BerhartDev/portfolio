"use client";

import type { Locale } from "next-intl";
import { routing } from "@/i18n/routing";
import { Disclosure } from "./Disclosure";
import styles from "./LocaleSwitcher.module.css";

type Props = { current: Locale; label: string; names: Record<Locale, string>; hrefs: Record<Locale, string> };

// Dropdown com links comuns (funcionam sem JS) para a mesma página em outro idioma.
// O clique só grava a escolha para o redirecionamento da raiz.
export function LocaleSwitcher({ current, label, names, hrefs }: Props) {
  function remember(locale: Locale) {
    try {
      localStorage.setItem("locale", locale);
    } catch {
      // Storage bloqueado: a escolha não é lembrada, a navegação segue normal.
    }
  }

  return (
    <Disclosure
      className={styles.switcher}
      summaryClassName={styles.summary}
      summary={
        <>
          <span className="visually-hidden">
            {label}: {names[current]}
          </span>
          <span aria-hidden="true">{current.toUpperCase()}</span>
          <span className={styles.chevron} aria-hidden="true">
            ↓
          </span>
        </>
      }
    >
      <ul className={styles.list}>
        {routing.locales.map((locale) => (
          <li key={locale}>
            <a
              href={hrefs[locale]}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === current ? "true" : undefined}
              className={styles.item}
              onClick={() => remember(locale)}
            >
              <span className={styles.code}>{locale.toUpperCase()}</span>
              {names[locale]}
            </a>
          </li>
        ))}
      </ul>
    </Disclosure>
  );
}
