"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useTranslations } from "next-intl";

gsap.registerPlugin(useGSAP, SplitText);

// Texte in hero.titles im Dictionary.
// Verlauf jeweils wie der Hintergrund der passenden Services-Sektion
// (TechnickiBackground, Registration, Insurance, FullService, Payment) – dort mitändern.
// Reihenfolge wie die Sektionen in Services.tsx.
// Auch der Hero-Hintergrund (HeroBackdrop) wechselt durch diese Verläufe.
//
// complement: Verlauf für den Titel im Hero, in der Komplementärfarbe des
//   Hintergrunds (Blau → Orange, Rot → Türkis, Grün → Rosa, Violett → Gelbgrün,
//   Gold → Blau), hell genug für den dunklen Grund.
// onLight: Hintergrund ist hell (Gold) – Titel dann dunkel, Untertitel im
//   dunkleren Markengrün statt Lime.
export const heroTitles = [
  {
    id: "inspection",
    gradient: "linear-gradient(125deg,#14283a 0%,#24455a 55%,#416878 100%)",
    complement: "linear-gradient(100deg,#ffe3a3 0%,#ffb067 55%,#ff8a3d 100%)",
    onLight: false,
  },
  {
    id: "registration",
    gradient: "linear-gradient(135deg,#903f42 0%,#bf625e 48%,#e69a87 100%)",
    complement: "linear-gradient(100deg,#e2fffa 0%,#9ff3e5 55%,#5fdccb 100%)",
    onLight: false,
  },
  {
    id: "insurance",
    gradient: "linear-gradient(125deg,#123f36 0%,#1c624f 52%,#2c8067 100%)",
    complement: "linear-gradient(100deg,#ffe3f2 0%,#ffa6d5 55%,#ff74ba 100%)",
    onLight: false,
  },
  {
    id: "fullService",
    gradient: "linear-gradient(130deg,#6f2a8a 0%,#a53384 52%,#d94f9d 100%)",
    complement: "linear-gradient(100deg,#fbffd6 0%,#e6ff80 55%,#c4f23f 100%)",
    onLight: false,
  },
  {
    id: "payments",
    gradient: "linear-gradient(135deg,#a8681c 0%,#d99b32 48%,#f4cf75 100%)",
    complement: "linear-gradient(100deg,#1a2668 0%,#283c9e 55%,#3a52c8 100%)",
    onLight: true,
  },
] as const;

/**
 * Legt einen Verlauf über alle Buchstaben, als wäre es eine Fläche:
 * Jeder Buchstabe zeigt seinen Ausschnitt (background-clip: text).
 * Direkt auf dem h1 ginge das nicht, weil die Buchstaben einzeln
 * ein- und ausgeblendet werden.
 */
function applyGradient(chars: HTMLElement[], gradient: string) {
  // Der Verlauf erscheint nur innerhalb der Buchstaben-Box. Bei engem Zeilenabstand
  // ragen Akzente (Č, Ü, Й) darüber hinaus und würden abgeschnitten. Daher die Box
  // nach oben/unten erweitern und per negativem Margin ausgleichen, damit sich das
  // Layout nicht ändert.
  chars.forEach((char) => {
    char.style.paddingBlock = "0.2em";
    char.style.marginBlock = "-0.2em";
  });

  const rects = chars.map((char) => char.getBoundingClientRect());
  const left = Math.min(...rects.map((rect) => rect.left));
  const top = Math.min(...rects.map((rect) => rect.top));
  const width = Math.max(...rects.map((rect) => rect.right)) - left;
  const height = Math.max(...rects.map((rect) => rect.bottom)) - top;

  chars.forEach((char, index) => {
    const rect = rects[index];
    char.style.backgroundImage = gradient;
    char.style.backgroundSize = `${width}px ${height}px`;
    char.style.backgroundPosition = `${left - rect.left}px ${top - rect.top}px`;
    char.style.backgroundRepeat = "no-repeat";
    char.style.setProperty("-webkit-background-clip", "text");
    char.style.backgroundClip = "text";
    char.style.color = "transparent";
  });
}

/** Wird bei jedem neuen Titel ausgelöst, detail: { index } (Position in heroTitles) */
export const HERO_TITLE_EVENT = "garage:hero-title";

type HeroHeaderProps = {
  /**
   * "gradient": Buchstaben im Verlauf der Service-Sektion (heller Hintergrund).
   * "complement": Buchstaben im Komplementär-Verlauf – für den Hero, dessen
   *   Hintergrund selbst durch die Service-Verläufe wechselt.
   * "light": weiße Buchstaben.
   */
  tone?: "gradient" | "complement" | "light";
};

export default function HeroHeader({ tone = "gradient" }: HeroHeaderProps) {
  const t = useTranslations("hero");
  const [currentIndex, setCurrentIndex] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isFirstTitle = useRef(true);
  const currentTitle = heroTitles[currentIndex];

  useGSAP(
    () => {
      if (!titleRef.current) return;

      // Hintergrund (HeroBackdrop) wechselt gleichzeitig mit dem Titel
      window.dispatchEvent(
        new CustomEvent(HERO_TITLE_EVENT, { detail: { index: currentIndex } }),
      );

      const split = SplitText.create(titleRef.current, {
        type: "chars",
        aria: "auto",
      });

      if (tone === "gradient") {
        applyGradient(split.chars as HTMLElement[], currentTitle.gradient);
      } else if (tone === "complement") {
        applyGradient(split.chars as HTMLElement[], currentTitle.complement);
      }

      const timeline = gsap.timeline({
        onComplete: () => {
          setCurrentIndex((previous) => (previous + 1) % heroTitles.length);
        },
      });

      // Buchstaben sanft nacheinander einblenden – außer beim allerersten
      // Titel: Der steht sofort da, damit er schon beim ersten Anzeigen
      // sichtbar ist (zählt für Googles „Largest Contentful Paint“; beim
      // Intro liegt er ohnehin noch unter dem Rolltor)
      if (isFirstTitle.current) {
        isFirstTitle.current = false;
      } else {
        timeline.from(split.chars, {
          opacity: 0,
          duration: 1.2,
          stagger: 0.045,
          ease: "power2.out",
        });
      }

      // Überschrift ruhig stehen lassen
      timeline.to({}, { duration: 8 });

      // Sanft nach oben ausblenden
      timeline.to(split.chars, {
        opacity: 0,
        duration: 0.5,
        stagger: 0.025,
        ease: "power2.inOut",
      });

      return () => {
        timeline.kill();
        split.revert();
      };
    },
    { dependencies: [currentIndex], revertOnUpdate: true },
  );

  const lines = t(`titles.${currentTitle.id}`).split("\n");
  const longestLine = Math.max(...lines.map((line) => line.length));
  // Durchschnittliche Breite eines Großbuchstabens in em (DM Sans, extrabold,
  // tracking-tight); kyrillische Buchstaben (Ж, Ш, Ю …) sind breiter
  const letterWidth = /[Ѐ-ӿ]/.test(lines.join("")) ? 0.8 : 0.72;

  return (
    <div
      className="
      flex
      h-32 sm:h-40 lg:h-48
      w-full
      items-end
      lg:items-center
      justify-center
      lg:justify-start
      [container-type:inline-size]
    "
    >
      <h1
        key={currentTitle.id}
        ref={titleRef}
        id="hero-title"
        className={`
        w-full
        font-extrabold
        ${
          tone === "light"
            ? "text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
            : tone === "complement"
              ? // Weiß, bis der Verlauf auf die Buchstaben gelegt ist.
                // Heller Verlauf: dunkler Schatten; dunkler Verlauf (auf Gold): heller Schein
                currentTitle.onLight
                ? "text-white drop-shadow-[0_1px_10px_rgba(255,244,214,0.45)]"
                : "text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.3)]"
              : "text-gray-900"
        }
        [--title-max:clamp(2rem,11.5vw,3rem)]
        sm:[--title-max:3.25rem]
        md:[--title-max:4rem]
        lg:[--title-max:5rem]
        xl:[--title-max:6rem]
        leading-none
        tracking-tight
        text-center
        lg:text-left
      `}
        style={{
          // Höchstens die Größe der Stufe, aber nur so groß, dass die längste
          // Zeile in die Spalte passt. So bricht kein Wort mitten durch.
          fontSize: `min(var(--title-max), calc(100cqi / ${(longestLine * letterWidth).toFixed(2)}))`,
        }}
      >
        {lines.map((line, index) => (
          <span key={index} className="block whitespace-nowrap">
            {line}
          </span>
        ))}
      </h1>
    </div>
  );
}
