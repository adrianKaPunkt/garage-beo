"use client";

import { useEffect, useState, type RefObject } from "react";

export interface SectionBackground {
  /** CSS-Hintergrund der Sektion direkt unter dem Header (Farbe oder Verlauf) */
  backgroundColor: string;
  backgroundImage: string;
  /** true bei dunklem Hintergrund → Header-Inhalte hell darstellen */
  dark: boolean;
}

const COLOR_PATTERN =
  /(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\([^()]*\)|#[0-9a-f]{3,8}\b/gi;

// Beliebige CSS-Farbe (auch oklch aus Tailwind) per Canvas in RGBA umrechnen
let canvasContext: CanvasRenderingContext2D | null = null;
const toRgba = (color: string) => {
  canvasContext ??= Object.assign(document.createElement("canvas"), {
    width: 1,
    height: 1,
  }).getContext("2d", { willReadFrequently: true });
  if (!canvasContext) return null;

  canvasContext.clearRect(0, 0, 1, 1);
  canvasContext.fillStyle = "#0000";
  canvasContext.fillStyle = color;
  canvasContext.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = canvasContext.getImageData(0, 0, 1, 1).data;
  return { r, g, b, a: a / 255 };
};

// Relative Helligkeit nach WCAG (0 = schwarz, 1 = weiß)
const luminance = ({ r, g, b }: { r: number; g: number; b: number }) => {
  const channel = (value: number) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

/**
 * Liest den Hintergrund des Elements direkt unter dem Header aus.
 *
 * Gesucht wird das oberste Element über die volle Bildschirmbreite mit
 * (weitgehend) deckendem Hintergrund – also Sektionen und Farbflächen,
 * nicht Karten, Bilder oder halbtransparente Deko-Ebenen.
 */
export function useSectionBackground(
  headerRef: RefObject<HTMLElement | null>,
): SectionBackground | null {
  const [background, setBackground] = useState<SectionBackground | null>(
    null,
  );

  useEffect(() => {
    let frame = 0;
    let lastKey = "";

    const update = () => {
      frame = 0;
      const header = headerRef.current;
      if (!header) return;

      const width = document.documentElement.clientWidth;
      const y = header.getBoundingClientRect().bottom + 1;

      for (const element of document.elementsFromPoint(width / 2, y)) {
        if (header.contains(element)) continue;
        if (element.getBoundingClientRect().width < width - 1) continue;

        const style = getComputedStyle(element);
        const image = style.backgroundImage.includes("gradient")
          ? style.backgroundImage
          : "none";

        const colors = [
          ...(image === "none" ? [] : (image.match(COLOR_PATTERN) ?? [])),
          style.backgroundColor,
        ]
          .map(toRgba)
          .filter((color) => color !== null);

        // Sichtbare Farben: beim Verlauf alle Stopps, sonst die Grundfarbe
        const visible =
          image === "none"
            ? colors.filter((color) => color.a >= 0.5)
            : colors.slice(0, -1);
        if (visible.length === 0) continue;
        if (image !== "none" && visible.some((color) => color.a < 0.5))
          continue;

        const averageLuminance =
          visible.reduce((sum, color) => sum + luminance(color), 0) /
          visible.length;

        const next = {
          backgroundColor: style.backgroundColor,
          backgroundImage: image,
          // Etwas über der rechnerischen Mitte (0.18), damit kräftige Verläufe
          // wie Registracija (Rot) helle Schrift bekommen
          dark: averageLuminance < 0.3,
        };

        const key = `${next.backgroundColor}|${next.backgroundImage}`;
        if (key !== lastKey) {
          lastKey = key;
          setBackground(next);
        }
        return;
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [headerRef]);

  return background;
}
