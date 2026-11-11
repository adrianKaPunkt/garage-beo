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
export const heroTitles = [
  {
    id: "inspection",
    gradient: "linear-gradient(125deg,#14283a 0%,#24455a 55%,#416878 100%)",
  },
  {
    id: "registration",
    gradient: "linear-gradient(135deg,#903f42 0%,#bf625e 48%,#e69a87 100%)",
  },
  {
    id: "insurance",
    gradient: "linear-gradient(125deg,#123f36 0%,#1c624f 52%,#2c8067 100%)",
  },
  {
    id: "fullService",
    gradient: "linear-gradient(130deg,#6f2a8a 0%,#a53384 52%,#d94f9d 100%)",
  },
  {
    id: "payments",
    gradient: "linear-gradient(135deg,#a8681c 0%,#d99b32 48%,#f4cf75 100%)",
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
   * "light": weiße Buchstaben – für den Hero, dessen Hintergrund selbst
   * durch die Verläufe wechselt.
   */
  tone?: "gradient" | "light";
};

export default function HeroHeader({ tone = "gradient" }: HeroHeaderProps) {
  const t = useTranslations("hero");
  const [currentIndex, setCurrentIndex] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
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
      }

      const timeline = gsap.timeline({
        onComplete: () => {
          setCurrentIndex((previous) => (previous + 1) % heroTitles.length);
        },
      });

      // Buchstaben sanft nacheinander einblenden
      timeline.from(split.chars, {
        opacity: 0,
        duration: 1.2,
        stagger: 0.045,
        ease: "power2.out",
      });

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
        ${tone === "light" ? "text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]" : "text-gray-900"}
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
