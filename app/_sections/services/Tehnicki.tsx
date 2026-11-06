import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  ClipboardCheck,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import Button from "@/components/Button";

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
      className="scroll-mt-24"
    >
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
        <div className="max-w-162 mt-24">
          <div className="flex gap-5 items-center">
            <div className="w-20 h-20 bg-lime-300 rounded-full relative flex items-center justify-center">
              <span className="absolute text-4xl font-bold text-[#14283a]">
                1
              </span>
            </div>
            <h2
              id="tehnicki-title"
              className="
            text-4xl font-extrabold
            leading-tight
            lg:leading-12
            tracking-tight
            sm:text-5xl
            lg:text-[clamp(40px,4vw,60px)]
            "
            >
              <span className="text-lime-300">TEHNIČKI</span>
              <span className="block text-orange">PREGLED</span>
            </h2>
          </div>

          <p
            className="
              mb-9 max-w-140
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
          <Button href="#kontakt" variant="primary" size="large" showArrow>
            Zakažite termin
          </Button>
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
              max-w-110
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
