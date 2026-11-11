"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

/**
 * Lässt den Inhalt kurz pulsieren, sobald er ins Bild kommt, und beim
 * nächsten Erscheinen wieder. Bei „Bewegung reduzieren“ bleibt er ruhig.
 */
export default function PulseOnView({
  children,
  // Wie oft hintereinander
  times = 3,
  className,
}: {
  children: ReactNode;
  times?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);

  useEffect(() => {
    const element = ref.current;
    if (!inView || !element) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Web Animations API: kein CSS nötig, läuft nur dieses eine Mal ab
    const animation = element.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.08)" },
        { transform: "scale(1)" },
      ],
      { duration: 600, iterations: times, easing: "ease-in-out", delay: 200 },
    );

    return () => animation.cancel();
  }, [inView, times]);

  return (
    <span ref={ref} className={`block ${className ?? ""}`}>
      {children}
    </span>
  );
}
