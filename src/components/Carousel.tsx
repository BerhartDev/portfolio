"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import styles from "./Carousel.module.css";

export type Slide = { src: string; width: number; height: number; alt: string; caption?: string };

type Labels = { region: string; prev: string; next: string; slides: string[] };

type Props = { id: string; slides: Slide[]; labels: Labels };

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Carrossel com scroll-snap nativo: sem JS, a faixa rola com toque, trackpad e teclado,
 * e as miniaturas são âncoras. Com JS, botões anterior/próximo, contador e miniatura ativa.
 */
export function Carousel({ id, slides, labels }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(false);
  const multiple = slides.length > 1;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    setReady(true);
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setCurrent(Math.round(el.scrollLeft / el.clientWidth)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const go = useCallback(
    (index: number) => {
      const el = track.current;
      if (!el) return;
      const target = Math.max(0, Math.min(slides.length - 1, index));
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollTo({ left: target * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
    },
    [slides.length],
  );

  // Com JS, a miniatura rola só a faixa, sem mexer na rolagem da página.
  function onThumb(event: MouseEvent<HTMLAnchorElement>, index: number) {
    event.preventDefault();
    go(index);
  }

  return (
    <section className={styles.carousel} aria-roledescription="carousel" aria-label={labels.region}>
      <div ref={track} className={styles.track} tabIndex={0} aria-label={labels.region}>
        {slides.map((slide, i) => (
          <figure
            key={slide.src}
            id={`${id}-${i + 1}`}
            className={styles.slide}
            role="group"
            aria-roledescription="slide"
            aria-label={labels.slides[i]}
          >
            <div className={styles.frame}>
              {/* Export estático sem otimização de imagem: <img> direto, com dimensões para evitar layout shift. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
              />
            </div>
            {slide.caption && <figcaption className={styles.caption}>{slide.caption}</figcaption>}
          </figure>
        ))}
      </div>

      {multiple && (
        <div className={styles.bar}>
          <p className={styles.counter} aria-live="polite" aria-atomic="true">
            <span className="visually-hidden">{labels.slides[current]}</span>
            <span aria-hidden="true">
              {pad(current + 1)} / {pad(slides.length)}
            </span>
          </p>
          {ready && (
            <div className={styles.buttons}>
              <button
                type="button"
                className={styles.button}
                onClick={() => go(current - 1)}
                disabled={current === 0}
                aria-label={labels.prev}
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                className={styles.button}
                onClick={() => go(current + 1)}
                disabled={current === slides.length - 1}
                aria-label={labels.next}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </div>
      )}

      {multiple && (
        <ol className={styles.thumbs}>
          {slides.map((slide, i) => (
            <li key={slide.src}>
              <a
                href={`#${id}-${i + 1}`}
                className={styles.thumb}
                aria-current={ready && i === current ? "true" : undefined}
                onClick={(event) => onThumb(event, i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slide.src} alt="" width={slide.width} height={slide.height} loading="lazy" decoding="async" />
                <span className="visually-hidden">{labels.slides[i]}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
