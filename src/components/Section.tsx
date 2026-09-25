import type { ReactNode } from "react";
import styles from "./Section.module.css";

type Props = { id: string; index: number; title: string; children: ReactNode };

export function Section({ id, index, title, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={styles.section}>
      <header className={styles.head}>
        <span className={styles.index} aria-hidden="true">
          {String(index).padStart(2, "0")} /
        </span>
        <h2 id={`${id}-title`} className={styles.title}>
          {title}
        </h2>
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
