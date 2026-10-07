import type { Locale } from "next-intl";
import { projectsPageName, type Project } from "@/lib/projects";
import { projectPath } from "@/lib/routes";
import styles from "./ProjectCards.module.css";

type Props = { locale: Locale; projects: Project[]; more: string };

/** Grade da página de projetos. O link abre o artigo; item `soon` fica sem link. */
export function ProjectCards({ locale, projects, more }: Props) {
  return (
    <ul className={styles.grid}>
      {projects.map((project) => {
        const text = project[locale];
        const image = project.images[0];
        const inner = (
          <>
            <div className={styles.cover}>
              {image && (
                // Export estático: a capa é o arquivo já publicado, sem otimização do Next.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={image.alt[locale].replace(text.title, projectsPageName(project, locale))}
                  sizes="(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw"
                  decoding="async"
                />
              )}
              <p className={styles.name}>{projectsPageName(project, locale)}</p>
            </div>
            <div className={styles.body}>
              <p className={styles.tag}>{text.tag}</p>
              <p className={styles.summary}>{text.summary}</p>
              {!project.soon && (
                <span className={styles.more}>
                  {more}
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </span>
              )}
            </div>
          </>
        );
        return (
          <li key={project.slug}>
            {project.soon ? (
              <div className={styles.card}>{inner}</div>
            ) : (
              <a href={projectPath(project.slug)(locale)} className={styles.card}>
                {inner}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
