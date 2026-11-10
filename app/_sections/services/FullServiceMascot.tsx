"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type FullServiceMascotProps = {
  className?: string;
  size?: number;
};

export default function FullServiceMascot({
  className = "",
  size = 440,
}: FullServiceMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const keyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const key = keyRef.current;
    const container = containerRef.current;

    if (!key || !container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    let tween: gsap.core.Tween | undefined;

    const ctx = gsap.context(() => {
      gsap.set(key, {
        xPercent: 65,
        yPercent: 8,
        rotation: -12,
        opacity: 0,
        transformOrigin: "18% 72%",
      });

      // Schlüsselhand kommt einmal weich hervor und bleibt dann stehen (kein Überschwingen)
      tween = gsap.to(key, {
        xPercent: 0,
        yPercent: 0,
        rotation: 0,
        opacity: 1,
        duration: 1.3,
        ease: "power3.out",
        paused: true,
      });
    }, container);

    // Beim Betreten des Sichtbereichs nach 1 s starten, beim Verlassen zurücksetzen,
    // damit die Hand beim nächsten Hinscrollen wieder hervorkommt
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!tween) return;
        if (entry.isIntersecting) {
          tween.delay(1).restart(true);
        } else {
          tween.pause(0);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Maskota Garage Beograd pokazuje ključ vozila"
      className={`relative mx-auto aspect-square w-full ${className}`}
      style={{ maxWidth: size }}
    >
      {/* Schlüsselhand hinter dem Fahrzeug */}
      <div
        ref={keyRef}
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 z-0
          motion-reduce:opacity-100
        "
      >
        <Image
          src="/images/services/fullService-key.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 85vw, 440px"
          className="object-contain"
        />
      </div>

      {/* Unbewegtes Maskottchen im Vordergrund */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <Image
          src="/images/services/fullService-body.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 85vw, 440px"
          className="object-contain drop-shadow-xl"
        />
      </div>
    </div>
  );
}
