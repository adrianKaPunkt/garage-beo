import Image from "next/image";
import { ShieldCheck, Umbrella, ClipboardCheck } from "lucide-react";
import Button from "@/components/Button";
import { useTranslations } from "next-intl";
import InsuranceMarquee from "./InsuranceMarquee/InsuranceMarquee";

// Texte in insurance.points im Dictionary
const insurancePoints = [
  { icon: ShieldCheck, key: "protection" },
  { icon: Umbrella, key: "options" },
  { icon: ClipboardCheck, key: "simple" },
] as const;

export default function Insurance() {
  const t = useTranslations("insurance");
  const tCommon = useTranslations("common");

  return (
    <section
      id="osiguranje"
      aria-labelledby="insurance-title"
      className="
        relative isolate overflow-hidden
        scroll-mt-24
        bg-[linear-gradient(125deg,#123f36_0%,#1c624f_52%,#2c8067_100%)]
        py-15.5 text-white
        min-[701px]:py-21
      "
    >
      {/* Sanfte Wellenlinien im Hintergrund */}
      <svg
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          h-full w-full opacity-7
        "
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: 16 }, (_, i) => (
          <path
            key={i}
            d={`
              M -180 ${100 + i * 48}
              C 220 ${10 + i * 48},
                420 ${220 + i * 48},
                760 ${120 + i * 48}
              S 1190 ${10 + i * 48},
                1620 ${130 + i * 48}
            `}
            stroke="white"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Weicher Lichtakzent links */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-32 top-1/2
          h-[600px] w-[600px]
          -translate-y-1/2 rounded-full
          bg-emerald-200/10
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
              lg:col-start-1 lg:row-start-1
              lg:mx-0 lg:flex-row lg:self-end
              lg:text-left
            "
          >
            <div
              className="
                relative flex h-20 w-20 shrink-0
                items-center justify-center
                rounded-full bg-lime-300
              "
            >
              <span
                className="
                  absolute text-4xl font-bold
                  text-[#123f36]
                "
              >
                3
              </span>
            </div>

            <h2
              id="insurance-title"
              className="
                mb-0
                text-4xl font-extrabold
                leading-10
                tracking-tight
                sm:text-5xl
                lg:text-[clamp(40px,4vw,60px)]
                lg:leading-12
              "
            >
              <span className="text-lime-300">{t("titleFirst")}</span>
              <span className="block text-orange">{t("titleSecond")}</span>
            </h2>
          </div>

          {/* Maskottchen rechts */}
          <div
            className="
              relative flex w-full
              items-center justify-center
              lg:col-start-2 lg:row-span-2 lg:row-start-1
              lg:self-center
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
                motion-reduce:transform-none
              "
            >
              <Image
                // Vorläufig vorhandenes Maskottchen.
                // Später durch /images/car/insurance.webp ersetzen.
                src="/images/car/insurance.webp"
                alt={tCommon("mascotAlt")}
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
              lg:col-start-1 lg:row-start-2
              lg:mx-0 lg:self-start text-left
            "
          >
            <div className="mx-5 lg:mx-0">
              {/* Untertitel */}
              <p
                className="
              mb-5 text-lg font-semibold
              text-white sm:text-xl
              "
              >
                {t("subtitle")}
              </p>

              {/* Beschreibung */}
              <p
                className="
                mx-auto mb-9 max-w-140
                text-base leading-relaxed
                text-white/85
                sm:text-lg lg:mx-0
              "
              >
                {t("description")}
              </p>
            </div>

            {/* Leistungen */}
            <div
              className="
                mx-auto w-fit space-y-4
                text-left
                lg:mx-0 lg:mb-10
              "
            >
              {insurancePoints.map((point) => {
                const Icon = point.icon;

                return (
                  <div key={point.key} className="flex items-center gap-4">
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

                    <span
                      className="
                        font-semibold text-slate-100
                      "
                    >
                      {t(`points.${point.key}`)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Logos der Versicherungen */}
        <div className="mt-6">
          <InsuranceMarquee />
        </div>

        {/* Kontakt-Button */}
        <div className="mt-10 flex justify-center">
          <Button href="#termin" variant="primary" size="large" showArrow>
            {tCommon("actions.contactUs")}
          </Button>
        </div>
      </div>
    </section>
  );
}
