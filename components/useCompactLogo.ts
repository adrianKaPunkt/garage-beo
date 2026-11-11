"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { onIntroDone } from "@/components/intro/introState";
import { LOGO_MONOGRAM, LOGO_VIEWBOX } from "./GarageBeogradLogo";

// Unterhalb von lg (wie das mobile Menü im Header)
const MOBILE = "(max-width: 1023.98px)";

/**
 * Verwandelt das Logo im Header auf Handy und Tablet nach dem Intro in das
 * Monogramm „BG“. Das Intro fliegt weiterhin zum vollen Schriftzug, erst
 * danach rücken B und G zusammen. Auf dem Desktop bleibt der volle Schriftzug,
 * beim Wechsel der Fenstergröße stellt gsap.matchMedia ihn wieder her.
 * Bei „Bewegung reduzieren“ wechselt das Logo ohne Animation.
 */
export function useCompactLogo(
  containerRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useGSAP(
    () => {
      const svg = containerRef.current?.querySelector("svg");
      if (!enabled || !svg) return;

      const parts = [...svg.querySelectorAll<SVGElement>("[data-part]")];
      const letters = parts.filter((part) => /-/.test(part.dataset.part ?? ""));
      const hide = letters.filter(
        (part) =>
          !(LOGO_MONOGRAM.keep as readonly string[]).includes(
            part.dataset.part ?? "",
          ),
      );
      const b = svg.querySelector('[data-part="beo-b"]');
      // Das G im Logo hat seine Aussparung dort, wo das B im Schriftzug sitzt.
      // Im Monogramm übernimmt das G aus app/icon.svg, mit Aussparung am neuen Platz des B
      const logoG = svg.querySelector('[data-part="gar-g1"]');
      const iconG = svg.querySelector('[data-monogram="g"]');

      let cancelIntro = () => {};
      const mm = gsap.matchMedia();

      mm.add(
        {
          mobile: MOBILE,
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (!context.conditions?.mobile) return;

          const fullWidth = svg.getBoundingClientRect().width;
          const [, , vbWidth] = LOGO_MONOGRAM.viewBox.split(" ").map(Number);
          const [, , fullVbWidth] = LOGO_VIEWBOX.split(" ").map(Number);
          const compactWidth = (fullWidth * vbWidth) / fullVbWidth;

          const tl = gsap.timeline({ paused: true });

          // Startet nach 0,25 s, damit man den vollen Schriftzug noch sieht
          tl.to(
            hide,
            {
              opacity: 0,
              y: 6,
              duration: 0.35,
              ease: "power2.in",
              stagger: { each: 0.03, from: "end" },
            },
            0.25,
          )
            // Überblenden, während das B in die neue Aussparung rückt
            .to(iconG, { opacity: 1, duration: 0.35, ease: "power1.inOut" }, 0.55)
            .to(logoG, { opacity: 0, duration: 0.35, ease: "power1.inOut" }, 0.55)
            .to(
              b,
              {
                x: LOGO_MONOGRAM.b.x,
                y: LOGO_MONOGRAM.b.y,
                duration: 0.6,
                ease: "back.out(1.6)",
              },
              0.45,
            )
            .to(
              svg,
              {
                attr: { viewBox: LOGO_MONOGRAM.viewBox },
                width: compactWidth,
                duration: 0.6,
                ease: "power3.inOut",
              },
              0.45,
            );

          cancelIntro = onIntroDone(() => {
            if (context.conditions?.reduce) tl.progress(1);
            else tl.play();
          });

          // Beim Verlassen von mobil: Ausgangszustand wiederherstellen
          return () => {
            tl.progress(0).kill();
            gsap.set(svg, { clearProps: "width", attr: { viewBox: LOGO_VIEWBOX } });
          };
        },
      );

      return () => {
        cancelIntro();
        mm.revert();
      };
    },
    { scope: containerRef, dependencies: [enabled] },
  );
}
