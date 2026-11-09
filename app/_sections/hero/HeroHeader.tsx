"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useTranslations } from "next-intl";

gsap.registerPlugin(useGSAP, SplitText);

// Texte in hero.titles im Dictionary.
// Verlauf jeweils wie der Hintergrund der passenden Services-Sektion
// (TechnickiBackground, Registration, Insurance, Payment) – dort mitändern.
const heroTitles = [
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

export default function HeroHeader() {
  const t = useTranslations("hero");
  const [currentIndex, setCurrentIndex] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const currentTitle = heroTitles[currentIndex];

  useGSAP(
    () => {
      if (!titleRef.current) return;

      const split = SplitText.create(titleRef.current, {
        type: "chars",
        aria: "auto",
      });

      applyGradient(split.chars as HTMLElement[], currentTitle.gradient);

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
    "
    >
      <h1
        key={currentTitle.id}
        ref={titleRef}
        id="hero-title"
        className="
        w-full
        font-extrabold
        text-gray-900
        text-[clamp(2rem,11.5vw,3rem)]
        sm:text-[3.25rem]
        md:text-[4rem]
        lg:text-[5rem]
        xl:text-[6rem]
        leading-[1.1]
        tracking-tight
        text-center
        lg:text-left
      "
      >
        {t(`titles.${currentTitle.id}`).split("\n").map((line, index) => (
          <span key={index} className="block">
            {line}
          </span>
        ))}
      </h1>
    </div>
  );
}
