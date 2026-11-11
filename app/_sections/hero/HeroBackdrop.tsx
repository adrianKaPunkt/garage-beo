"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { HERO_TITLE_EVENT, heroTitles } from "./HeroHeader";

type HeroBackdropProps = {
  children: ReactNode;
  className?: string;
};

// Dauer der Überblendung zwischen zwei Verläufen
const FADE_MS = 1200;

/**
 * Hero-Sektion, deren Hintergrund gleichzeitig mit dem Titel im HeroHeader
 * durch die Verläufe der Service-Sektionen wechselt.
 *
 * CSS kann Verläufe nicht überblenden. Deshalb trägt die Sektion selbst
 * immer schon den neuen Verlauf, und darüber blendet eine Ebene mit dem
 * alten Verlauf aus. So liest auch der Header (useSectionBackground)
 * direkt die richtige Farbe von der Sektion ab.
 */
export default function HeroBackdrop({ children, className = "" }: HeroBackdropProps) {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    let timer = 0;
    let headerTimer = 0;

    const onTitle = (event: Event) => {
      const next = (event as CustomEvent<{ index: number }>).detail.index;
      if (next === indexRef.current) return;

      setPrevious(indexRef.current);
      indexRef.current = next;
      setIndex(next);

      // Alte Ebene erst deckend zeigen, im nächsten Frame ausblenden
      setFading(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setFading(true)));

      // Header zur Mitte der Überblendung neu einfärben (er hört auf scroll)
      window.clearTimeout(headerTimer);
      headerTimer = window.setTimeout(
        () => window.dispatchEvent(new Event("scroll")),
        FADE_MS / 2,
      );

      window.clearTimeout(timer);
      timer = window.setTimeout(() => setPrevious(null), FADE_MS + 50);
    };

    window.addEventListener(HERO_TITLE_EVENT, onTitle);
    return () => {
      window.removeEventListener(HERO_TITLE_EVENT, onTitle);
      window.clearTimeout(timer);
      window.clearTimeout(headerTimer);
    };
  }, []);

  return (
    <section
      id="pocetna"
      aria-labelledby="hero-title"
      className={`relative isolate overflow-hidden ${className}`}
      style={{ backgroundImage: heroTitles[index].gradient }}
    >
      {previous !== null && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 motion-reduce:transition-none"
          style={{
            backgroundImage: heroTitles[previous].gradient,
            opacity: fading ? 0 : 1,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
          }}
        />
      )}
      {children}
    </section>
  );
}
