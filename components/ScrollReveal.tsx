"use client";

import { useEffect } from "react";

/**
 * Lässt Inhaltsblöcke beim Scrollen einmalig sanft einblenden (leicht von unten).
 *
 * Erfasst automatisch die direkten Kinder jedes `.container` in <main>,
 * außer im Hero. Weitere Elemente lassen sich mit `data-reveal` markieren,
 * `data-reveal="left"` blendet stattdessen leicht von links ein, `data-reveal="right"` von rechts.
 * Enthält ein automatisch erfasster Block eigene `data-reveal`-Elemente, werden
 * nur diese animiert (z. B. Absatz für Absatz), nicht der ganze Block.
 *
 * - Nur Elemente, die beim Laden noch unterhalb des Bildschirms liegen, werden
 *   versteckt – sichtbare Inhalte flackern also nicht.
 * - Ohne JavaScript oder bei „Bewegung reduzieren“ bleibt alles sofort sichtbar.
 * - Nach dem Einblenden werden die Inline-Styles wieder entfernt.
 */

const SELECTOR = "main .container > *, main [data-reveal]";
const EXCLUDE = "#pocetna, [aria-hidden='true'], [data-no-reveal]";

const DISTANCE = "24px";
const DURATION = 700; // ms
const STAGGER = 150; // ms Abstand zwischen zwei Elementen, die kurz nacheinander sichtbar werden
const MAX_DELAY = 450; // ms, länger wartet kein Element – sonst hinken Texte beim schnellen Scrollen hinterher
const TRIGGER_AHEAD = "10%"; // Animation startet schon, kurz bevor ein Element unten ins Bild kommt
const PULSE_DURATION = 600; // ms pro Puls

export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const candidates = Array.from(
      document.querySelectorAll<HTMLElement>(SELECTOR),
    ).filter((element) => !element.closest(EXCLUDE));

    const explicit = candidates.filter((element) =>
      element.hasAttribute("data-reveal"),
    );

    // Verschachtelte Treffer nicht doppelt animieren; explizit markierte
    // Elemente haben Vorrang vor dem automatisch erfassten Elternblock
    const elements = candidates.filter((element) => {
      const isInside = (others: HTMLElement[]) =>
        others.some((other) => other !== element && other.contains(element));

      if (element.hasAttribute("data-reveal")) return !isInside(explicit);
      if (explicit.some((other) => element.contains(other))) return false;
      return !isInside(candidates);
    });

    const offset = (element: HTMLElement) =>
      element.dataset.reveal === "left"
        ? `translateX(-${DISTANCE})`
        : element.dataset.reveal === "right"
          ? `translateX(${DISTANCE})`
          : `translateY(${DISTANCE})`;

    // Nur Elemente unterhalb des sichtbaren Bereichs verstecken
    const hidden = elements.filter(
      (element) => element.getBoundingClientRect().top > window.innerHeight,
    );

    for (const element of hidden) {
      element.style.opacity = "0";
      element.style.transform = offset(element);
    }

    const reveal = (element: HTMLElement, delay: number) => {
      element.style.transition = `opacity ${DURATION}ms ease-out ${delay}ms, transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`;
      element.style.opacity = "1";
      element.style.transform = "none";

      // Aufräumen, damit eigene Transforms/Hover-Effekte wieder greifen
      window.setTimeout(
        () => {
          element.style.removeProperty("opacity");
          element.style.removeProperty("transform");
          element.style.removeProperty("transition");

          // Optional: kurzer Puls nach dem Einblenden (data-reveal-pulse)
          if (element.hasAttribute("data-reveal-pulse")) {
            element.animate(
              [
                { transform: "scale(1)" },
                { transform: "scale(1.04)" },
                { transform: "scale(1)" },
              ],
              {
                duration: PULSE_DURATION,
                iterations: 2,
                easing: "ease-in-out",
              },
            );
          }
        },
        DURATION + delay + 50,
      );
    };

    // Warteschlange: Elemente, die kurz nacheinander sichtbar werden, blenden
    // nacheinander ein – aber nie mehr als MAX_DELAY verspätet
    let queueEnd = 0;
    const schedule = (element: HTMLElement) => {
      const now = performance.now();
      const start = Math.max(now, Math.min(queueEnd + STAGGER, now + MAX_DELAY));
      queueEnd = start;
      reveal(element, start - now);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          // In Lesereihenfolge (Dokumentreihenfolge)
          .sort((a, b) =>
            a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
          )
          .forEach((element) => {
            observer.unobserve(element);
            schedule(element);
          });
      },
      // Positiver unterer Rand: löst schon aus, bevor das Element im Bild ist
      { rootMargin: `0px 0px ${TRIGGER_AHEAD} 0px`, threshold: 0 },
    );

    hidden.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      // Beim Verlassen nichts unsichtbar zurücklassen
      for (const element of hidden) {
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
        element.style.removeProperty("transition");
      }
    };
  }, []);

  return null;
}
