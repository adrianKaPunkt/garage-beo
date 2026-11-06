import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  ClipboardCheck,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const inspectionPoints = [
  {
    icon: ClipboardCheck,
    text: "Detaljna kontrola vozila",
  },
  {
    icon: ShieldCheck,
    text: "Provera bezbednosti i ispravnosti",
  },
  {
    icon: Wrench,
    text: "Savremena oprema za pregled",
  },
];

export default function Tehnicki() {
  return (
    <section
      id="tehnicki-pregled"
      aria-labelledby="tehnicki-title"
      className="
        relative isolate overflow-hidden
        scroll-mt-24
        bg-[linear-gradient(125deg,#14283a_0%,#24455a_55%,#416878_100%)]
        py-20 text-white
        lg:py-28
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
          h-[650px] w-[650px]
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
          hidden w-[700px]
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

      {/* Inhalt */}
      <div
        className="
          container relative z-10
          grid grid-cols-1
          items-center gap-12
          lg:grid-cols-2
          lg:gap-16
        "
      >
        {/* Text */}
        <div className="max-w-[650px]">
          <div
            className="
              mb-6 inline-flex items-center gap-3
              rounded-full
              border border-white/20
              bg-white/5
              px-4 py-2
              text-xs font-bold
              uppercase tracking-[0.18em]
              text-green-200
            "
          >
            <span className="h-2 w-2 rounded-full bg-lime-400" />
            Naše usluge
          </div>

          <h2
            id="tehnicki-title"
            className="
              mb-6
              text-4xl font-extrabold
              leading-tight
              tracking-tight
              sm:text-5xl
              lg:text-[clamp(40px,4vw,60px)]
            "
          >
            TEHNIČKI
            <span className="block text-lime-300">PREGLED</span>
          </h2>

          <p
            className="
              mb-9 max-w-[560px]
              text-base leading-relaxed
              text-slate-200
              sm:text-lg
            "
          >
            Brz, jednostavan i pouzdan tehnički pregled vašeg vozila. Uz
            savremenu opremu i stručan tim, sve što vam je potrebno nalazi se na
            jednom mestu.
          </p>

          {/* Leistungen */}
          <div className="mb-10 space-y-4">
            {inspectionPoints.map((point) => {
              const Icon = point.icon;

              return (
                <div key={point.text} className="flex items-center gap-4">
                  <div
                    className="
                      flex h-11 w-11 shrink-0
                      items-center justify-center
                      rounded-xl
                      border border-lime-300/20
                      bg-lime-300/10
                    "
                  >
                    <Icon
                      size={20}
                      className="text-lime-300"
                      aria-hidden="true"
                    />
                  </div>

                  <span className="font-semibold text-slate-100">
                    {point.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Kontakt-Button */}
          <a
            href="#kontakt"
            className="
              group inline-flex min-h-12
              items-center justify-center gap-3
              rounded-xl bg-lime-400
              px-7 py-3
              font-extrabold text-[#14283a]
              transition-all duration-200
              hover:-translate-y-0.5
              hover:bg-lime-300
              hover:shadow-lg
              focus-visible:outline-2
              focus-visible:outline-offset-3
              focus-visible:outline-lime-300
            "
          >
            Zakažite termin
            <ArrowUpRight
              size={20}
              aria-hidden="true"
              className="
                transition-transform
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </a>
        </div>

        {/* Maskottchen */}
        <div
          className="
            relative flex w-full
            items-center justify-center
          "
        >
          {/* Licht hinter dem Maskottchen */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              inset-10 rounded-full
              bg-white/10 blur-3xl
            "
          />

          {/* Dezenter äußerer Ring */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              h-[85%] w-[85%]
              rounded-full
              border border-white/10
            "
          />

          <div
            className="
              relative aspect-square w-full
              max-w-[440px]
              transition-transform duration-500
              hover:-translate-y-2
            "
          >
            <Image
              src="/images/car/tehnicki.webp"
              alt="Garage Beograd maskota"
              fill
              sizes="(max-width: 1024px) 85vw, 440px"
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
