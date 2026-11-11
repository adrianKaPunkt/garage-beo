"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * true, sobald das Element mindestens zu `threshold` (Standard: zur Hälfte)
 * sichtbar ist. Wieder false erst, wenn es ganz aus dem Bild ist. So startet
 * eine Animation beim nächsten Erscheinen neu, aber nicht schon, wenn man
 * an der Kante hin und her scrollt.
 */
export function useInView(
  ref: RefObject<Element | null>,
  { enabled = true, threshold = 0.5 } = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= threshold) setInView(true);
        else if (!entry.isIntersecting) setInView(false);
      },
      { threshold: [0, threshold] },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, enabled, threshold]);

  return inView;
}
