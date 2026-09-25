"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = { className?: string; summaryClassName?: string; summary: ReactNode; children: ReactNode };

/**
 * <details> que abre sem JS. Com JS, fecha ao clicar fora, com Esc (devolvendo o foco)
 * e ao seguir um link de dentro do painel.
 */
export function Disclosure({ className, summaryClassName, summary, children }: Props) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const details = ref.current;
    if (!details) return;

    const close = (focus: boolean) => {
      if (!details.open) return;
      details.open = false;
      if (focus) details.querySelector("summary")?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!details.contains(event.target as Node)) close(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && details.open) close(details.contains(document.activeElement));
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.closest("a") && !target.closest("summary")) close(false);
    };

    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    details.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
      details.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <details ref={ref} className={className}>
      <summary className={summaryClassName}>{summary}</summary>
      {children}
    </details>
  );
}
