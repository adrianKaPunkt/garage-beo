"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BADGE_STAMP_EVENT } from "@/components/BadgeStamp";

gsap.registerPlugin(useGSAP);

/**
 * Das Auto zuckt zusammen, wenn das Jubiläums-Badge aufgestempelt wird:
 * kurz einfedern, ein kleiner Hüpfer mit Kippen, landen, nachfedern.
 * Bei „Bewegung reduzieren“ bleibt es ruhig.
 *
 * Eigene Hülle, damit sich der Hüpfer nicht mit der Einfahrt
 * (CarEntrance) und dem Intro-Ziel ins Gehege kommt.
 */
export default function CarHop({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const car = rootRef.current;
    if (!car) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    let tl: gsap.core.Timeline | undefined;

    const hop = () => {
      tl?.kill();
      tl = gsap.timeline({
        defaults: { transformOrigin: "50% 100%" },
        onComplete: () => {
          gsap.set(car, { clearProps: "transform,transformOrigin" });
        },
      });

      // Erschrecken: einfedern
      tl.to(car, { scaleX: 1.06, scaleY: 0.9, duration: 0.08, ease: "power2.out" });
      // Hüpfer mit leichtem Kippen
      tl.to(car, {
        scaleX: 0.97,
        scaleY: 1.05,
        yPercent: -9,
        rotation: -3,
        duration: 0.22,
        ease: "power2.out",
      });
      // Landen
      tl.to(car, {
        scaleX: 1.04,
        scaleY: 0.95,
        yPercent: 0,
        rotation: 1.5,
        duration: 0.16,
        ease: "power2.in",
      });
      // Nachfedern
      tl.to(car, {
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      });
    };

    window.addEventListener(BADGE_STAMP_EVENT, hop);
    return () => {
      window.removeEventListener(BADGE_STAMP_EVENT, hop);
      tl?.kill();
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
