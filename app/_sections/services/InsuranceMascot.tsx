"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type InsuranceMascotProps = {
  alt: string;
  className?: string;
};

/*
 * Positionen als Anteil der Breite (das Bild ist quadratisch, 1254 × 1254).
 * Der Aufprallpunkt liegt auf der rechten Schirmhälfte, knapp über dem Stoff.
 */
const BALL_SIZE = 0.07;
const START = { x: 0.63, y: -0.22 };
const IMPACT = { x: 0.65, y: 0.055 };
const APEX_Y = -0.07;
const END = { x: 1.02, y: 0.78 };

export default function InsuranceMascot({ alt, className = "" }: InsuranceMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const mascot = mascotRef.current;
    const ball = ballRef.current;
    if (!container || !mascot || !ball) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timeline: gsap.core.Timeline | undefined;

    const ctx = gsap.context(() => {
      // Werte als Funktionen: werden bei jeder Wiederholung neu aus der aktuellen Breite berechnet
      const w = (f: number) => () => container.offsetWidth * f;

      gsap.set(ball, { xPercent: -50, yPercent: -50 });

      timeline = gsap
        .timeline({ paused: true, repeat: -1, repeatDelay: 2.5, repeatRefresh: true })
        .set(ball, { x: w(START.x), y: w(START.y), opacity: 0, scaleX: 1, scaleY: 1 })
        .to(ball, { opacity: 1, duration: 0.15 })
        // Fallen: beschleunigt wie unter Schwerkraft
        .to(ball, { x: w(IMPACT.x), y: w(IMPACT.y), duration: 0.55, ease: "power2.in" }, "<")
        .addLabel("impact")
        // Aufprall: Ball staucht sich, Maskottchen gibt kurz nach
        .to(ball, { scaleX: 1.3, scaleY: 0.7, duration: 0.06, ease: "power1.out", yoyo: true, repeat: 1 }, "impact")
        .to(mascot, { y: 6, duration: 0.09, ease: "power2.out", yoyo: true, repeat: 1 }, "impact")
        // Abprallen: waagerecht gleichmäßig, senkrecht erst hoch, dann wieder runter → Bogen
        .to(ball, { x: w(END.x), duration: 1.05, ease: "none" }, "impact")
        .to(ball, { y: w(APEX_Y), duration: 0.38, ease: "power2.out" }, "impact")
        .to(ball, { y: w(END.y), duration: 0.67, ease: "power2.in" }, "impact+=0.38")
        .to(ball, { opacity: 0, duration: 0.25 }, "impact+=0.8");
    }, container);

    // Nur laufen lassen, solange das Maskottchen sichtbar ist
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) timeline?.play();
        else timeline?.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative aspect-square w-full ${className}`}>
      <div ref={mascotRef} className="absolute inset-0">
        <Image
          src="/images/car/insurance.webp"
          alt={alt}
          fill
          sizes="(max-width: 1024px) 85vw, 440px"
          className="object-contain drop-shadow-2xl"
        />
      </div>

      {/* Ball, der vom Schirm abprallt */}
      <div
        ref={ballRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 aspect-square rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffe2a8_0%,#f5a623_45%,#d9820f_100%)] opacity-0 shadow-lg"
        style={{ width: `${BALL_SIZE * 100}%` }}
      />
    </div>
  );
}
