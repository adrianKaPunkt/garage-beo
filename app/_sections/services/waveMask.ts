import type { CSSProperties } from "react";

/**
 * Wellige Oberkante für Sections mit Farbverlauf.
 *
 * Die Section wird oben per CSS-Maske wellenförmig ausgeschnitten. Zusammen mit
 * einem negativen Margin in Höhe von --wave überlappt sie die vorherige Section,
 * deren Hintergrund dann durch die Welle scheint – ohne Farbkante.
 *
 * Die Section braucht dafür die CSS-Variable --wave, einen negativen Margin-Top
 * in derselben Höhe und entsprechend mehr Padding-Top.
 */

// Pfade im viewBox 0 0 1440 120; die Fläche unterhalb der Linie bleibt sichtbar
const WAVE_PATHS = {
  default:
    "M0 72C180 34 360 18 560 40C760 62 900 104 1100 98C1240 94 1350 70 1440 52V120H0Z",
  mirrored:
    "M0 52C90 70 200 94 340 98C540 104 680 62 880 40C1080 18 1260 34 1440 72V120H0Z",
} as const;

export function waveMask(
  variant: keyof typeof WAVE_PATHS = "default",
): CSSProperties {
  const svg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="${WAVE_PATHS[variant]}"/></svg>`,
  );

  return {
    maskImage: `url("data:image/svg+xml,${svg}"), linear-gradient(#000, #000)`,
    maskSize: "100% var(--wave), 100% calc(100% - var(--wave) + 1px)",
    maskPosition: "top, bottom",
    maskRepeat: "no-repeat",
  };
}
