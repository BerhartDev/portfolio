"use client";

import { useSyncExternalStore } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

const QUERY = "(prefers-color-scheme: dark)";
const EVENT = "themechange";

function currentTheme(): Theme {
  const stored = document.documentElement.dataset.theme;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia(QUERY).matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

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
      <span className={styles.box} aria-hidden="true" />
      {label}
    </button>
  );
}
