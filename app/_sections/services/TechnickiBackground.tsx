import type { ReactNode } from "react";

const TechnickiBackground = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="
        relative isolate overflow-hidden
        bg-[linear-gradient(125deg,#14283a_0%,#24455a_55%,#416878_100%)]
        py-35 text-white
        min-[701px]:py-50
      "
    >
      {/* Blueprint-Raster */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)]
          bg-size-[40px_40px]
          opacity-40
          lg:opacity-70
          "
      />

      {/* Dezenter blauer Lichtakzent */}
      <div
        aria-hidden="true"
        className="
        pointer-events-none absolute
        -right-32 top-0
        h-162.5 w-162.5
        rounded-full
        bg-cyan-200/10
        blur-3xl
        "
      />

      {/* Technische Fahrzeugzeichnung */}
      <svg
        aria-hidden="true"
        viewBox="0 0 700 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="
        pointer-events-none absolute
        -right-20 top-1/2
        hidden w-175
        -translate-y-1/2
        text-white/15
          lg:block
        "
      >
        {/* Konstruktionslinien */}
        <g stroke="currentColor" strokeWidth="1" strokeDasharray="5 7">
          <path d="M0 260H700" />
          <path d="M0 100H700" />
          <path d="M110 0V360" />
          <path d="M560 0V360" />
        </g>

        {/* Fahrzeug-Seitenansicht */}
        <g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path
            d="
              M65 235
              L90 190
              L195 172
              L255 110
              Q280 88 330 88
              H435
              Q475 90 500 128
              L550 180
              L625 195
              Q655 205 660 235
              V255
              H65Z
            "
          />

          <path d="M212 172L271 119Q285 105 315 105H340V172Z" />
          <path d="M359 105H432Q452 105 468 130L506 172H359Z" />
          <path d="M350 105V180" />
          <path d="M85 190H620" />
          <path d="M80 255H645" />

          {/* Räder */}
          <circle cx="190" cy="255" r="49" />
          <circle cx="190" cy="255" r="27" />
          <circle cx="535" cy="255" r="49" />
          <circle cx="535" cy="255" r="27" />

          {/* Details */}
          <path d="M370 190H405" />
          <path d="M272 190H305" />
          <path d="M625 211H654" />
          <path d="M92 210H125" />
        </g>

        {/* Messpunkte */}
        <g fill="currentColor">
          <circle cx="190" cy="255" r="3" />
          <circle cx="535" cy="255" r="3" />
          <circle cx="350" cy="105" r="3" />
        </g>
      </svg>

      {/* Weicher, welliger Übergang von der About-Section (gleiche Farbe wie deren unterer Bereich) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute inset-x-0 -top-px h-12 w-full sm:h-16 lg:h-24"
      >
        <path
          fill="#e7f2dd"
          d="M0 0H1440V36C1330 62 1210 76 1070 66C920 55 800 20 640 24C480 28 380 70 240 74C150 77 70 62 0 48Z"
        />
      </svg>

      {/* Inhalt */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default TechnickiBackground;
