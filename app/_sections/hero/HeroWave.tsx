/**
 * Welliger Übergang vom Hero in die nächste Sektion.
 *
 * Zwei Wellen in der Farbe des Seitenhintergrunds (--bg): hinten eine
 * halbtransparente, vorne eine deckende. Jede SVG ist doppelt so breit wie
 * der Bildschirm und enthält zwei gleiche Wellenperioden; um die Hälfte
 * verschoben sieht sie wieder genauso aus. So laufen die Wellen nahtlos
 * (Animation in globals.css, bei „Bewegung reduzieren“ aus).
 */

// Zwei Perioden à 1440 Einheiten, unten bis zum Rand gefüllt
const BACK_WAVE =
  "M0 46 C240 86 480 86 720 46 C960 6 1200 6 1440 46 C1680 86 1920 86 2160 46 C2400 6 2640 6 2880 46 L2880 120 L0 120 Z";
const FRONT_WAVE =
  "M0 70 C200 30 520 30 720 70 C920 110 1240 110 1440 70 C1640 30 1960 30 2160 70 C2360 110 2680 110 2880 70 L2880 120 L0 120 Z";

export default function HeroWave() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[clamp(48px,7vw,110px)] overflow-hidden"
    >
      <svg
        className="hero-wave hero-wave--slow absolute bottom-0 left-0 h-full w-[200%]"
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
      >
        <path d={BACK_WAVE} fill="var(--bg)" fillOpacity="0.45" />
      </svg>
      <svg
        className="hero-wave absolute bottom-0 left-0 h-full w-[200%]"
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
      >
        <path d={FRONT_WAVE} fill="var(--bg)" />
      </svg>
    </div>
  );
}
