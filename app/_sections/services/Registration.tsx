import Image from "next/image";
import { FileCheck2, ClipboardCheck, BadgeCheck } from "lucide-react";
import Button from "@/components/Button";

const registrationPoints = [
  {
    icon: FileCheck2,
    text: "Pomoć oko registracije vozila",
  },
  {
    icon: ClipboardCheck,
    text: "Informacije o potrebnoj dokumentaciji",
  },
  {
    icon: BadgeCheck,
    text: "Jednostavno i bez komplikacija",
  },
];

export default function Registration() {
  return (
    <section
      id="registracija-vozila"
      aria-labelledby="registration-title"
      className="
        relative isolate overflow-hidden
        scroll-mt-24
        bg-[linear-gradient(135deg,#903f42_0%,#bf625e_48%,#e69a87_100%)]
        py-15.5 text-white
        min-[701px]:py-21
      "
    >
      {/* Horizontale technische Linien */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.16)_0px,rgba(255,255,255,0.16)_1px,transparent_1px,transparent_40px)]
          opacity-35
          lg:opacity-50
        "
      />

      {/* Weicher Lichtakzent links */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-32 top-1/2
          h-[600px] w-[600px]
          -translate-y-1/2 rounded-full
          bg-orange-100/15
          blur-3xl
        "
      />

      {/* Zweiter dezenter Lichtakzent */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-40 -top-40
          h-[500px] w-[500px]
          rounded-full
          bg-white/10 blur-3xl
        "
      />

      {/* Inhalt */}
      <div className="container relative z-10">
        <div
          className="
            grid grid-cols-1
            gap-8
            lg:grid-cols-2
            lg:gap-x-16 lg:gap-y-6
          "
        >
          {/* Überschrift */}
          <div
            className="
              mx-auto flex max-w-162
              flex-col items-center gap-5
              text-center
              lg:col-start-2 lg:row-start-1
              lg:mx-0 lg:flex-row lg:self-end
              lg:text-left
            "
          >
            <div className="w-20 h-20 shrink-0 bg-amber-200 rounded-full relative flex items-center justify-center">
              <span className="absolute text-4xl font-bold text-[#903f42]">
                2
              </span>
            </div>
            <h2
              id="registration-title"
              className="
                mb-0
                text-4xl font-extrabold
                leading-10
                lg:leading-12
                tracking-tight
                sm:text-5xl
                lg:text-[clamp(40px,4vw,60px)]
              "
            >
              REGISTRACIJA
              <span className="block text-amber-200">VOZILA</span>
            </h2>
          </div>

          {/* Maskottchen: mobil unter der Überschrift, ab lg links über beide Zeilen */}
          <div
            className="
              relative flex w-full
              items-center justify-center
              lg:col-start-1 lg:row-span-2 lg:row-start-1
              lg:self-center
            "
          >
            {/* Licht hinter dem Maskottchen */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute
                aspect-square w-[70%]
                rounded-full
                bg-white/15 blur-3xl
              "
            />

            {/* Dezenter äußerer Ring */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute
                aspect-square w-[85%]
                max-w-105
                rounded-full
                border border-white/15
              "
            />

            <div
              className="
                relative aspect-square w-full
                max-w-110
                transition-transform duration-500
                hover:-translate-y-2
                motion-reduce:transform-none
              "
            >
              <Image
                src="/images/car/registration.webp"
                alt="Garage Beograd maskota sa registarskom tablicom i pečatom"
                fill
                sizes="(max-width: 1024px) 85vw, 440px"
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Text */}
          <div
            className="
              mx-auto max-w-162 lg:mt-6
              lg:col-start-2 lg:row-start-2
              lg:mx-0 lg:self-start text-left
            "
          >
            {/* Untertitel */}
            <p className="mb-5 px-1 text-lg font-semibold text-white sm:text-xl">
              Registracija vozila na jednom mestu.
            </p>

            {/* Beschreibung */}
            <p
              className="
                mx-auto mb-9 max-w-140 px-1
                text-base leading-relaxed
                lg:mx-0
                text-white/85
                sm:text-lg
              "
            >
              Olakšajte sebi proces registracije vozila. Pružamo vam potrebne
              informacije i pomoć, kako biste sve završili jednostavno, brzo i
              bez nepotrebnih komplikacija.
            </p>

            {/* Leistungen */}
            <div className="mx-auto w-fit space-y-4 text-left lg:mx-0 lg:mb-10">
              {registrationPoints.map((point) => {
                const Icon = point.icon;

                return (
                  <div key={point.text} className="flex items-center gap-4">
                    <div
                      className="
                        flex h-11 w-11 shrink-0
                        items-center justify-center
                        rounded-xl
                        border border-white/20
                        bg-white/10
                      "
                    >
                      <Icon
                        size={20}
                        className="text-amber-200"
                        aria-hidden="true"
                      />
                    </div>

                    <span className="font-semibold text-white/95">
                      {point.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Kontakt-Button */}
        <div className="mt-10 flex justify-center">
          <Button href="#termin" variant="primary" size="large" showArrow>
            Kontaktirajte nas
          </Button>
        </div>
      </div>
    </section>
  );
}
