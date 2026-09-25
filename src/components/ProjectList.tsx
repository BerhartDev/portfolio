import type { Locale } from "next-intl";
import type { Project } from "@/lib/projects";
import { projectPath } from "@/lib/routes";
import styles from "./ProjectList.module.css";

type Props = { locale: Locale; projects: Project[]; detailed?: boolean };

/** Lista de projetos: cada linha leva ao artigo. `detailed` mostra período e stack. */
export function ProjectList({ locale, projects, detailed = false }: Props) {
  return (
    <ol className={styles.list}>
      {projects.map((project, i) => {
        const text = project[locale];
        const meta = detailed ? [project.period, project.stack.join(", ")].filter(Boolean).join(" · ") : "";
        return (
          <li key={project.slug}>
            <a href={projectPath(project.slug)(locale)} className={styles.row}>
              <span className={styles.num} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.name}>{text.title}</span>
              <span className={styles.summary}>{text.summary}</span>
              <span className={styles.tag}>{text.tag}</span>
              {meta && <span className={styles.meta}>{meta}</span>}
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}
