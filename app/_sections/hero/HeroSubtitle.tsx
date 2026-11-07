"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const subtitles = [
  { id: "fast", text: "BRZO", suffix: "BRE", animation: "shake" },
  { id: "clear", text: "JASNO", suffix: "", animation: "clarity" },
  {
    id: "simple",
    text: "JEDNOSTAVNO",
    suffix: "",
    animation: "simple",
  },
  {
    id: "oneplace",
    text: "SVE NA JEDNOM MESTU",
    suffix: "",
    animation: "cozy",
  },
] as const;

export default function HeroSubtitle() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const textRef = useRef<HTMLSpanElement>(null);
  const suffixRef = useRef<HTMLSpanElement>(null);

  const subtitle = subtitles[currentIndex];

  // React steuert den Wechsel unabhängig von GSAP
  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % subtitles.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  // GSAP steuert ausschließlich die Animation
  useGSAP(
    () => {
      const text = textRef.current;
      const suffix = suffixRef.current;

      if (!text || !suffix) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) return;

      gsap.set(suffix, { opacity: 0 });

      const tl = gsap.timeline();

      switch (subtitle.animation) {
        case "shake":
          tl.fromTo(
            text,
            { opacity: 0, x: -12 },
            {
              opacity: 1,
              x: 0,
              duration: 0.35,
              ease: "power3.out",
            },
          );

          tl.to(text, {
            keyframes: [
              { x: -4, duration: 0.06 },
              { x: 4, duration: 0.06 },
              { x: -2, duration: 0.06 },
              { x: 0, duration: 0.1 },
            ],
          });
          break;

        case "clarity":
          tl.fromTo(
            text,
            { opacity: 0, filter: "blur(8px)" },
            {
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.85,
              ease: "power2.out",
            },
          );
          break;

        case "simple":
          // JEDNOSTAVNO erscheint sanft von unten
          tl.fromTo(
            text,
            { opacity: 0, y: 16, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
            },
          );
          break;

        case "cozy":
          tl.fromTo(
            text,
            { opacity: 0, y: 12, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              ease: "power2.out",
            },
          );
          break;
      }

      // BRE erscheint kurz nach dem Hauptbegriff
      tl.fromTo(
        suffix,
        { opacity: 0, y: 6, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.2,
          ease: "back.out(1.4)",
        },
        "+=0.1",
      );

      tl.to({}, { duration: 1.5 });

      tl.to([text, suffix], {
        opacity: 0,
        y: -8,
        duration: 0.5,
        ease: "power2.inOut",
      });
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    },
  );

  return (
    <div className="mb-6 lg:mb-16 flex h-14 w-full items-center justify-center lg:h-16 lg:justify-start">
      <p className="m-0 w-full text-center text-darkgreen text-xl font-bold sm:text-2xl lg:text-left lg:text-6xl">
        <span
          key={subtitle.id}
          className="inline-flex max-w-full items-baseline justify-center gap-x-1 whitespace-nowrap lg:justify-start"
        >
          <span ref={textRef} className="inline-block">
            {subtitle.text}
          </span>

          <span ref={suffixRef} className="inline-block text-orange">
            {subtitle.suffix}
          </span>
        </span>
      </p>
    </div>
  );
}
