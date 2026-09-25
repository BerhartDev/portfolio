import type { Block } from "@/lib/projects";
import styles from "./Blocks.module.css";

/** Blocos de texto de um artigo. Só texto puro vindo do JSON, sem HTML. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className={styles.blocks}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i}>{block.text}</p>;
          case "h":
            return (
              <h3 key={i} className={styles.h}>
                {block.text}
              </h3>
            );
          case "list":
            return (
              <ul key={i} className={styles.list}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <figure key={i} className={styles.quote}>
                <blockquote>
                  <p>{block.text}</p>
                </blockquote>
                {block.cite && <figcaption>{block.cite}</figcaption>}
              </figure>
            );
          case "code":
            return (
              <pre key={i} className={styles.code} data-lang={block.lang} tabIndex={0}>
                <code>{block.code}</code>
              </pre>
            );
          case "image":
            return (
              <figure key={i} className={styles.figure}>
                {/* Export estático sem otimização de imagem: <img> direto, com dimensões para evitar layout shift. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.src} alt={block.alt} width={block.width} height={block.height} loading="lazy" decoding="async" />
                {block.caption && <figcaption>{block.caption}</figcaption>}
              </figure>
            );
        }
      })}
    </div>
  );
}
