"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { isIntroPlaying, onIntroDone } from "@/components/intro/introState";

gsap.registerPlugin(useGSAP);

/** Wird im Moment des Aufpralls ausgelöst (z. B. damit das Auto hüpft) */
export const BADGE_STAMP_EVENT = "garage:badge-stamp";

type BadgeStampProps = {
  children: ReactNode;
  /** Klassen für die Hülle (Position, Größe, Sichtbarkeit je Bildschirm) */
  className?: string;
  /**
   * Endgültige Schräglage in Grad (z. B. -12 für das „Siegel“ am Auto).
   * Nicht per Tailwind `rotate-…` setzen: GSAP würde sie überschreiben.
   */
  rotate?: number;
};

/**
 * Stempel-Effekt für das Jubiläums-Badge: Es kommt groß und gedreht von
 * oben, knallt auf seinen Platz und federt nach. Beim Aufprall läuft ein
 * goldener Ring nach außen und ein Lichtstreifen zieht darüber.
 *
 * Startet, sobald das Intro fertig ist (Rolltor oben, Auto an seinem
 * Platz), ohne Intro kurz nach dem Laden. Bei „Bewegung reduzieren“
 * steht das Badge einfach da.
 *
 * Die Animation liegt auf dieser Hülle, nicht auf dem SVG: Das Badge
 * nutzt für Hover und Antippen selbst die CSS-Eigenschaft `scale`.
 */
export default function BadgeStamp({
  children,
  className = "",
  rotate = 0,
}: BadgeStampProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reducedMotion) return;

      const ring = root.querySelector("[data-stamp-ring]");
      const shine = root.querySelector("[data-stamp-shine]");
      const introWasPlaying = isIntroPlaying();

      gsap.set(root, { opacity: 0 });

      const tl = gsap.timeline({
        paused: true,
        // Die Schräglage bleibt als transform stehen, nur die Deckkraft weg
        onComplete: () => {
          gsap.set(root, { clearProps: "opacity" });
        },
      });

      // Anflug: groß, gedreht, beschleunigt nach unten
      tl.fromTo(
        root,
        { opacity: 0, scale: 2.6, rotation: rotate - 18, y: -40 },
        { opacity: 1, scale: 0.9, rotation: rotate + 4, y: 0, duration: 0.36, ease: "power4.in" },
      );

      // Aufprall: federt auf seine Größe zurück und dreht sich in seine Lage
      tl.addLabel("impact");
      tl.call(
        () => {
          // Nur das sichtbare Badge meldet sich (Desktop- und Handy-Badge
          // stecken beide im Hero, eins ist immer ausgeblendet)
          if (root.offsetParent !== null) {
            window.dispatchEvent(new Event(BADGE_STAMP_EVENT));
          }
        },
        undefined,
        "impact",
      );
      tl.to(
        root,
        { scale: 1, rotation: rotate, duration: 0.7, ease: "elastic.out(1, 0.45)" },
        "impact",
      );

      // Goldener Ring läuft vom Badge nach außen
      if (ring) {
        tl.fromTo(
          ring,
          { scale: 0.7, opacity: 0.9 },
          { scale: 1.8, opacity: 0, duration: 0.65, ease: "power2.out" },
          "impact",
        );
      }

      // Lichtstreifen zieht diagonal über das Badge
      if (shine) {
        // Der Streifen ist halb so breit wie das Badge und startet links
        // daneben: um 300 % seiner Breite verschoben ist er rechts ganz
        // draußen. Am Ende zusätzlich unsichtbar, damit nichts stehen bleibt.
        tl.fromTo(
          shine,
          { xPercent: 0, opacity: 1 },
          { xPercent: 300, duration: 0.8, ease: "power2.inOut" },
          "impact+=0.12",
        );
        tl.set(shine, { opacity: 0 });
      }

      // Nach dem Intro kurz warten, bis das Auto steht; ohne Intro nach dem Laden
      let call: gsap.core.Tween | undefined;
      const stopWaiting = onIntroDone(() => {
        call = gsap.delayedCall(introWasPlaying ? 0.2 : 0.6, () => tl.play());
      });

      return () => {
        stopWaiting();
        call?.kill();
        tl.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      data-stamp
      // `relative` nur, wenn die Hülle nicht selbst positioniert ist
      // (sonst würde es ein `absolute` aus className überstimmen)
      className={`${/\b(absolute|fixed|sticky)\b/.test(className) ? "" : "relative"} will-change-transform ${className}`}
      // Auch ohne JavaScript und bei „Bewegung reduzieren“ schräg
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      {children}

      {/* Aufprall-Ring */}
      <span
        data-stamp-ring
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full border-4 border-[#f2c661] opacity-0"
      />

      {/* Lichtstreifen, auf die Kreisform des Badges beschnitten */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[4%] overflow-hidden rounded-full"
      >
        <span
          data-stamp-shine
          className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 mix-blend-screen"
        />
      </span>
    </div>
  );
}
