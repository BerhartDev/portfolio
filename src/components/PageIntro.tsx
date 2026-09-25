import type { ReactNode } from "react";
import styles from "./PageIntro.module.css";

type Props = { eyebrow?: ReactNode; title: string; lead: string; children?: ReactNode };

/** Abertura das páginas internas: título grande, frase de apoio e detalhes opcionais. */
export function PageIntro({ eyebrow, title, lead, children }: Props) {
  return (
    <div className={styles.intro}>
      {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.text}>
        <p className={styles.lead}>{lead}</p>
        {children}
      </div>
    </div>
  );
}
