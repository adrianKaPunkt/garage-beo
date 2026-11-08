"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type AboutMascotProps = {
  className?: string;
  ariaLabel?: string;
};

const checks = [
  "/images/about/check1.webp",
  "/images/about/check2.webp",
  "/images/about/check3.webp",
];

export default function AboutMascot({ className = "" }: AboutMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = gsap.utils.toArray<HTMLElement>("[data-check]", container);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    let timeline: gsap.core.Timeline | undefined;

    const ctx = gsap.context(() => {
      gsap.set(elements, { opacity: 0 });

      // Endlosschleife: Häkchen erscheinen nacheinander ohne Übergang,
      // bleiben 2 s stehen, verschwinden und es beginnt kurz darauf von vorne
      timeline = gsap
        .timeline({ paused: true, repeat: -1, repeatDelay: 0.6 })
        .to(elements, { opacity: 1, duration: 0, stagger: 0.45 })
        .to(elements, { opacity: 0, duration: 0, delay: 2 });
    }, container);

    // Nur laufen lassen, solange das Maskottchen sichtbar ist
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) timeline?.play();
        else timeline?.pause();
      },
      {
        threshold: 0.35,
      },
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
      className={`relative mx-auto w-full max-w-65 sm:max-w-103 lg:max-w-125 ${className}`}
      role="img"
      aria-label="Ilustracija maskote Garage Beograd, koja predstavlja pouzdanog i stručnog partnera za tehnički pregled vozila"
    >
      <div className="relative aspect-[657/599] w-full">
        {/* Maskottchen */}
        <Image
          src="/images/about/car-about.webp"
          alt=""
          fill
          sizes="(max-width: 640px) 260px, (max-width: 1023px) 412px, 500px"
          className="object-contain"
        />

        {/* Nacheinander animierte Häkchen */}
        {checks.map((src, index) => (
          <div
            key={src}
            data-check
            className="pointer-events-none absolute inset-0 motion-reduce:!opacity-100 motion-reduce:!scale-100"
            aria-hidden="true"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 640px) 260px, (max-width: 1023px) 412px, 500px"
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
