import { useId, type CSSProperties, type ReactNode } from "react";

/**
 * Google-Bewertungs-Badge: Creme-Fläche, gewellter Rand (dunkelgrün + Goldlinie),
 * oben Google-Logo, große Bewertung, fünf Sterne, Anzahl der Bewertungen.
 *
 * Reines SVG, nur React 18+. Die Werte kommen als Props
 * (z. B. aus der Google Places API über dein Backend).
 *
 * Google-Logo: bitte das offizielle Logo einsetzen (siehe Prop `logoSrc` / `logo`)
 * und Googles Markenrichtlinien beachten (Logo nicht verändern oder umfärben).
 */

/* ---------- Geometrie (viewBox 0 0 400 400) ---------- */

const C = 200;

/** Gewellter, geschlossener Pfad; eine Welle zeigt genau nach oben. */
export function scallopPath(
  waves: number,
  radius: number,
  depth: number,
  cx = C,
  cy = C,
): string {
  const steps = 10;
  const n = waves * steps;
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const c = Math.cos(waves * (t + Math.PI / 2));
    // Wellenberge etwas runder, Täler etwas enger – wie bei einem Siegel
    const r = radius + (c >= 0 ? depth * 0.9 * c : depth * 1.1 * c);
    pts.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]);
  }
  const f = (v: number) => v.toFixed(2);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    d +=
      ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)}` +
      ` ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)}` +
      ` ${f(p2[0])} ${f(p2[1])}`;
  }
  return `${d} Z`;
}

/** Fünfzackiger Stern, Mittelpunkt (0,0), Außenradius 1, leicht abgerundete Spitzen über strokeLinejoin */
const STAR = (() => {
  const p: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 1 : 0.46;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    p.push(`${(r * Math.cos(a)).toFixed(4)} ${(r * Math.sin(a)).toFixed(4)}`);
  }
  return `M${p.join(" L")} Z`;
})();

/* ---------- Farben & Texte ---------- */

export interface BadgeColors {
  /** Äußerer Wellenrand */
  border: string;
  /** Goldlinie innen */
  gold: string;
  /** Innenfläche */
  fill: string;
  /** Zahl und Schrift */
  text: string;
  /** Trennlinien */
  line: string;
  /** Gefüllte Sterne (oben → unten) */
  starTop: string;
  starBottom: string;
  /** Leere Sterne */
  starEmpty: string;
}

export const DEFAULT_COLORS: BadgeColors = {
  border: "#1d5230",
  gold: "#e3b448",
  fill: "#f8f3e8",
  text: "#0f3b21",
  line: "#e0b04a",
  starTop: "#f8cd4f",
  starBottom: "#e09a1b",
  starEmpty: "#e7dcc3",
};

export type RatingLanguage = "sr-Latn" | "sr-Cyrl" | "en" | "de" | "ru";

// Wort für „Bewertungen“ je Pluralform (Intl.PluralRules), fehlende Formen → other
type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & {
  other: string;
};

const COPY: Record<RatingLanguage, { reviews: PluralForms; locale: string }> =
  {
    // 1, 21 … recenzija · 2–4, 22–24 … recenzije · sonst recenzija
    "sr-Latn": {
      reviews: { one: "RECENZIJA", few: "RECENZIJE", other: "RECENZIJA" },
      locale: "sr-Latn-RS",
    },
    "sr-Cyrl": {
      reviews: { one: "РЕЦЕНЗИЈА", few: "РЕЦЕНЗИЈЕ", other: "РЕЦЕНЗИЈА" },
      locale: "sr-Cyrl-RS",
    },
    en: { reviews: { one: "REVIEW", other: "REVIEWS" }, locale: "en-US" },
    de: {
      reviews: { one: "BEWERTUNG", other: "BEWERTUNGEN" },
      locale: "de-DE",
    },
    // 1, 21 … отзыв · 2–4, 22–24 … отзыва · sonst отзывов
    ru: {
      reviews: { one: "ОТЗЫВ", few: "ОТЗЫВА", many: "ОТЗЫВОВ", other: "ОТЗЫВА" },
      locale: "ru-RU",
    },
  };

const FONT = "'Montserrat', 'Poppins', 'Helvetica Neue', Arial, sans-serif";

/* ---------- Komponente ---------- */

export interface GoogleRatingBadgeProps {
  /** Durchschnittsbewertung 0–5, z. B. 4.9 */
  rating: number;
  /** Anzahl der Bewertungen (optional; ohne Wert entfällt die untere Zeile) */
  reviewCount?: number;
  /**
   * "rounded" (Standard): ab 100 auf volle Hunderter abgerundet mit „+“, z. B. 2.347 → „2.300+“
   * "exact": genaue Zahl
   */
  countDisplay?: "rounded" | "exact";
  /** Sprache der unteren Zeile und der Tausendertrennung. Standard: "sr-Latn" */
  language?: RatingLanguage;
  /** Eigener Text unten statt „2.300+ RECENZIJA“ */
  bottomText?: string;
  /**
   * URL zum offiziellen Google-Logo (SVG/PNG), wird oben mittig in einem 130 × 44-Feld eingepasst (passend für den Schriftzug).
   * Alternativ `logo` nutzen.
   */
  logoSrc?: string;
  /** Logo als SVG-Elemente im Koordinatensystem 0–48 × 0–48 (z. B. der Inhalt einer offiziellen G-Logo-SVG) */
  logo?: ReactNode;
  /** Anzahl der Wellen. Standard: 12 */
  waves?: number;
  colors?: Partial<BadgeColors>;
  size?: number | string;
  /** Barrierefreie Beschreibung; Standard wird aus den Werten gebildet */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export default function GoogleRatingBadge({
  rating,
  reviewCount,
  countDisplay = "rounded",
  language = "sr-Latn",
  bottomText,
  logoSrc,
  logo,
  waves = 12,
  colors,
  size = 240,
  label,
  className,
  style,
}: GoogleRatingBadgeProps) {
  const col = { ...DEFAULT_COLORS, ...colors };
  const copy = COPY[language] ?? COPY["sr-Latn"];
  const uid = useId().replace(/:/g, "");
  const id = (n: string) => `grb-${uid}-${n}`;

  // Bewertung – immer mit Punkt, eine Nachkommastelle
  const value = Math.max(0, Math.min(5, Number.isFinite(rating) ? rating : 0));
  const ratingText = value.toFixed(1);

  // Anzahl
  let bottom = bottomText ?? "";
  if (bottomText == null && reviewCount != null) {
    const n = Math.max(0, Math.round(reviewCount));
    const rounded = countDisplay === "rounded" && n >= 100;
    const shown = rounded ? Math.floor(n / 100) * 100 : n;
    const num = new Intl.NumberFormat(copy.locale).format(shown);
    const form = new Intl.PluralRules(copy.locale).select(shown);
    const word = copy.reviews[form] ?? copy.reviews.other;
    bottom = `${num}${rounded ? "+" : ""} ${word}`;
  }

  // Sterne: 5 × 34 Durchmesser, 7 Abstand, Mitte y = 264
  const r = 17;
  const gap = 7;
  const rowW = 5 * r * 2 + 4 * gap;
  const x0 = C - rowW / 2;
  const sy = 264;
  const xs = [0, 1, 2, 3, 4].map((i) => x0 + r + i * (r * 2 + gap));
  const full = Math.floor(value);
  const fillW =
    full >= 5 ? rowW : full * (r * 2 + gap) + (value - full) * r * 2;

  const aria =
    label ?? `Google: ${ratingText} / 5${bottom ? ` · ${bottom}` : ""}`;

  // Drei Wellenlagen mit gleicher Phase: grüner Rand, Goldlinie, Creme-Fläche
  const depthFor = (R: number) => R * 0.042;
  const outer = scallopPath(waves, 182, depthFor(182));
  const goldEdge = scallopPath(waves, 166, depthFor(166));
  const inner = scallopPath(waves, 160, depthFor(160));

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      width={size}
      height={size}
      role="img"
      aria-label={aria}
      className={className}
      style={style}
    >
      <title>{aria}</title>
      <defs>
        <linearGradient id={id("star")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={col.starTop} />
          <stop offset="1" stopColor={col.starBottom} />
        </linearGradient>
        <clipPath id={id("stars")}>
          <rect
            x={x0 - 2}
            y={sy - r - 3}
            width={fillW + (full >= 5 ? 4 : 2)}
            height={r * 2 + 6}
          />
        </clipPath>
      </defs>

      {/* Rand */}
      <path d={outer} fill={col.border} />
      <path d={goldEdge} fill={col.gold} />
      <path d={inner} fill={col.fill} />

      {/* Google-Logo oben */}
      {logoSrc ? (
        <image
          href={logoSrc}
          x={C - 65}
          y={78}
          width={130}
          height={44}
          preserveAspectRatio="xMidYMid meet"
        />
      ) : logo ? (
        <svg x={C - 22} y={70} width={44} height={44} viewBox="0 0 48 48">
          {logo}
        </svg>
      ) : (
        <text
          x={C}
          y={104}
          textAnchor="middle"
          fill={col.text}
          fontFamily={FONT}
          fontWeight={700}
          fontSize={30}
        >
          Google
        </text>
      )}

      {/* Bewertung */}
      <text
        x={C}
        y={226}
        textAnchor="middle"
        fill={col.text}
        fontFamily={FONT}
        fontWeight={800}
        fontSize={112}
        letterSpacing={-4}
      >
        {ratingText}
      </text>

      {/* Sterne: leer + gefüllt, exakt nach Wert abgeschnitten */}
      {xs.map((x) => (
        <path
          key={`e${x}`}
          d={STAR}
          transform={`translate(${x} ${sy}) scale(${r})`}
          fill={col.starEmpty}
          stroke={col.starEmpty}
          strokeWidth={0.12}
          strokeLinejoin="round"
        />
      ))}
      <g clipPath={`url(#${id("stars")})`}>
        {xs.map((x) => (
          <path
            key={`f${x}`}
            d={STAR}
            transform={`translate(${x} ${sy}) scale(${r})`}
            fill={`url(#${id("star")})`}
            stroke={col.starBottom}
            strokeWidth={0.12}
            strokeLinejoin="round"
          />
        ))}
      </g>

      {bottom && (
        <>
          {/* Trennlinie unten */}
          <line
            x1={C - 96}
            y1={298}
            x2={C + 96}
            y2={298}
            stroke={col.line}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          <text
            x={C}
            y={324}
            textAnchor="middle"
            fill={col.text}
            fontFamily={FONT}
            fontWeight={700}
            fontSize={18}
            letterSpacing={0.5}
          >
            {bottom}
          </text>
        </>
      )}
    </svg>
  );
}
