"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { isIntroPlaying } from "@/components/intro/introState";

gsap.registerPlugin(useGSAP);

export default function CarEntrance({ children }: { children: ReactNode }) {
  const carRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const car = carRef.current;
    if (!car) return;

    // Läuft das Intro, fährt dessen Auto genau hierher und übergibt an
    // dieses Auto (globals.css blendet es bis dahin aus). Eine eigene
    // Einfahrt wäre doppelt, und die Ausgangsposition würde die Ziel-
    // messung des Intros verfälschen.
    if (isIntroPlaying()) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    const tl = gsap.timeline({
      defaults: {
        transformOrigin: "50% 90%",
      },
      onComplete: () => {
        gsap.set(car, {
          clearProps: "transform,transformOrigin",
        });
      },
    });

    // Auto startet in der Ferne
    tl.set(car, {
      scale: 0.12,
      x: -110,
      y: -100,
      rotation: -3,
    });

    // Beschleunigung auf den Betrachter zu
    tl.to(car, {
      scale: 0.75,
      x: -20,
      y: -15,
      rotation: 0,
      duration: 0.65,
      ease: "power2.in",
    });

    // Kurzes, weiches Abbremsen
    tl.to(car, {
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.35,
      ease: "power3.out",
    });
  }, []);

  // Ziel des Intro-Autos (components/intro/IntroOverlay.tsx)
  return (
    <div ref={carRef} data-intro-car-target>
      {children}
    </div>
  );
}
