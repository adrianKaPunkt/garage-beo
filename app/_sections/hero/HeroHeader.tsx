"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useTranslations } from "next-intl";

gsap.registerPlugin(useGSAP, SplitText);

// Texte in hero.titles im Dictionary
const heroTitles = [
  { id: "inspection", color: "inherit" },
  { id: "registration", color: "inherit" },
  { id: "insurance", color: "inherit" },
  { id: "payments", color: "inherit" },
] as const;

export default function HeroHeader() {
  const t = useTranslations("hero");
  const [currentIndex, setCurrentIndex] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!titleRef.current) return;

      const split = SplitText.create(titleRef.current, {
        type: "chars",
        aria: "auto",
      });

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

  const currentTitle = heroTitles[currentIndex];

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
        text-[3rem]
        sm:text-[3.25rem]
        md:text-[4rem]
        lg:text-[5rem]
        xl:text-[6rem]
        leading-[1.1]
        tracking-tight
        text-center
        lg:text-left
      "
        style={{ color: currentTitle.color }}
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
