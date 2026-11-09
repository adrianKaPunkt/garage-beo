"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

type TehnickiMaskotProps = {
  className?: string;
  /** Größe in Pixeln, wenn keine Tailwind-Größe über className gesetzt ist. */
  size?: number;
  /** Animation ausschalten, z. B. für statische Darstellungen. */
  animate?: boolean;
};

/**
 * Fröhlich wippendes Maskottchen für Garage Beograd.
 * Die beiden transparenten Bilder müssen unter /public/images/ liegen.
 * Installieren: npm install gsap
 */
export default function TehnickiMaskot({
  className = "",
  size = 360,
  animate = true,
}: TehnickiMaskotProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate || !rootRef.current || !topRef.current) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const top = topRef.current!;
      gsap.set(top, {
        transformOrigin: "50% 79%",
        force3D: true,
      });

      // Freudiges Wippen: vier schnelle Hüpfer nur nach unten, dann eine längere Pause.
      // Die Figur geht nie über die Ausgangslage hinaus.
      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      timeline
        .to(top, { y: 8, duration: 0.2, ease: "power2.out" })
        .to(top, { y: 2, duration: 0.18, ease: "sine.inOut" })
        .to(top, { y: 9, duration: 0.2, ease: "sine.inOut" })
        .to(top, { y: 2, duration: 0.18, ease: "sine.inOut" })
        .to(top, { y: 8, duration: 0.2, ease: "sine.inOut" })
        .to(top, { y: 2, duration: 0.18, ease: "sine.inOut" })
        .to(top, { y: 9, duration: 0.2, ease: "sine.inOut" })
        .to(top, { y: 0, duration: 0.45, ease: "power2.out" });

      return () => timeline.kill();
    });

    return () => media.revert();
  }, [animate]);

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="Fröhliches Garage-Beograd-Maskottchen"
      className={`relative isolate shrink-0 ${className}`}
      style={{ width: size, maxWidth: "100%", aspectRatio: "1 / 1" }}
    >
      {/* Beide Quellen sind 627 × 627 und bleiben pixelgenau übereinander. */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src="/images/services/tehnicki-below.webp"
          alt=""
          fill
          sizes="(max-width: 640px) 80vw, 360px"
          className="object-contain select-none"
          draggable={false}
        />
      </div>
      <div
        ref={topRef}
        className="absolute inset-0 z-10 pointer-events-none will-change-transform"
        aria-hidden="true"
      >
        <Image
          src="/images/services/tehnicki-above.webp"
          alt=""
          fill
          sizes="(max-width: 640px) 80vw, 360px"
          className="object-contain select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}
