"use client";

import { useEffect, useRef, useState } from "react";
import { useConsent } from "./ConsentProvider";
import styles from "./CookieConsentBanner.module.css";

export type ConsentLabels = {
  heading: string;
  message: string;
  accept: string;
  reject: string;
};

export function CookieConsentBanner({ labels }: { labels: ConsentLabels }) {
  const { status, setStatus } = useConsent();
  const bannerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;
    const measure = () => setHeight(banner.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(banner);
    return () => observer.disconnect();
  }, []);

  if (status !== null) return null;

  return (
    <>
      <div className={styles.spacer} style={height > 0 ? { height } : undefined} aria-hidden="true" />
      <div ref={bannerRef} className={styles.banner} role="region" aria-label={labels.heading}>
        <div className={styles.inner}>
          <p className={styles.message}>{labels.message}</p>
          <div className={styles.actions}>
            <button type="button" className={styles.button} onClick={() => setStatus("denied")}>
              {labels.reject}
            </button>
            <button type="button" className={`${styles.button} ${styles.accept}`} onClick={() => setStatus("granted")}>
              {labels.accept}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
