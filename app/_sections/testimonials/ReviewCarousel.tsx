"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  // Zwei identische Gruppen mit Karten, für die nahtlose Endlosschleife
  children: ReactNode;
  label: string;
};

// Pixel pro Sekunde beim automatischen Laufen
const SPEED = 30;
// So lange pausiert das Laufen nach eigenem Scrollen oder Antippen
const RESUME_DELAY = 3000;

export default function ReviewCarousel({ children, label }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  // Hover, Fokus und Ziehen pausieren dauerhaft, Scrollen und Tippen nur kurz
  const hovered = useRef(false);
  const focused = useRef(false);
  const pausedUntil = useRef(0);
  const drag = useRef<{ x: number; scrollLeft: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const pauseBriefly = () => {
    pausedUntil.current = performance.now() + RESUME_DELAY;
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Breite einer Gruppe: Ab hier wiederholt sich der Inhalt
    const half = () => scroller.scrollWidth / 2;

    // Endlosschleife auch beim eigenen Scrollen in beide Richtungen
    const wrap = () => {
      if (scroller.scrollLeft >= half()) scroller.scrollLeft -= half();
      else if (scroller.scrollLeft <= 0) scroller.scrollLeft += half();
    };

    scroller.addEventListener("scroll", wrap, { passive: true });

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Ohne Bewegungswunsch: nur manuelles Scrollen
    if (reducedMotion) {
      return () => scroller.removeEventListener("scroll", wrap);
    }

    // scrollLeft rundet auf ganze Pixel, deshalb eigene Position mitführen
    let position = scroller.scrollLeft;
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - last;
      last = now;

      const paused =
        hovered.current ||
        focused.current ||
        drag.current !== null ||
        now < pausedUntil.current;

      // Eigenes Scrollen übernehmen
      if (paused || Math.abs(scroller.scrollLeft - position) > 2) {
        position = scroller.scrollLeft;
      }

      if (!paused) {
        position += (SPEED * elapsed) / 1000;
        if (position >= half()) position -= half();
        scroller.scrollLeft = position;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", wrap);
    };
  }, []);

  // Ziehen mit gedrückter Maustaste. Finger scrollen nativ.
  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    drag.current = {
      x: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;

    event.currentTarget.scrollLeft =
      drag.current.scrollLeft - (event.clientX - drag.current.x);

    // Nach einem Sprung der Endlosschleife von der neuen Position weiterziehen
    drag.current = {
      x: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
    };
  };

  const endDrag = () => {
    if (!drag.current) return;

    drag.current = null;
    setDragging(false);
    pauseBriefly();
  };

  return (
    <div className="container">
      <div
        ref={scrollerRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") hovered.current = true;
        }}
        onPointerLeave={() => {
          hovered.current = false;
        }}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onFocus={() => {
          focused.current = true;
        }}
        onBlur={() => {
          focused.current = false;
        }}
        onTouchStart={pauseBriefly}
        onWheel={pauseBriefly}
        className={`
          overflow-x-auto
          scrollbar-none [&::-webkit-scrollbar]:hidden
          mask-[linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)]
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-green
          ${dragging ? "cursor-grabbing select-none" : "cursor-grab"}
        `}
      >
        <div className="flex w-max">{children}</div>
      </div>
    </div>
  );
}
