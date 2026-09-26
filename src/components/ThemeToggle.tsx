"use client";

import { useSyncExternalStore } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

const EVENT = "themechange";

// Escuro por padrão; claro só quando escolhido (data-theme="light", aplicado antes da pintura).
function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

/**
 * Botão só com ícone do tema atual: lua crescente no escuro, bolinha cheia no claro.
 * Os dois ícones vêm no HTML e o CSS escolhe qual mostrar, então o certo aparece antes da hidratação.
 */
export function ThemeToggle({ label }: { label: string }) {
  // null no servidor: o tema real só é conhecido no navegador.
  const theme = useSyncExternalStore(subscribe, currentTheme, () => null);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage bloqueado (modo privado): o tema vale só para esta visita.
    }
    window.dispatchEvent(new Event(EVENT));
  }

  return (
    <button type="button" className={styles.toggle} aria-pressed={theme === null ? undefined : theme === "dark"} onClick={toggle}>
      <span className="visually-hidden">{label}</span>
      <svg className={styles.moon} viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <path d="M10.5 1.2A7 7 0 1 0 14.8 11 5.6 5.6 0 0 1 10.5 1.2Z" fill="currentColor" />
      </svg>
      <svg className={styles.sun} viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <circle cx="8" cy="8" r="6" fill="currentColor" />
      </svg>
    </button>
  );
}
