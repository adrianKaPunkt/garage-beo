import Image from "next/image";
import { CarFront, KeyRound, House } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import { waveMask } from "./waveMask";
import FullServiceMascot from "./FullServiceMascot";

// Texte in fullService.points im Dictionary
const fullServicePoints = [
  { icon: CarFront, key: "pickup" },
  { icon: KeyRound, key: "handling" },
  { icon: House, key: "return" },
] as const;

// Subtile Zickzack-Linien im Hintergrund: einmal beim Laden berechnet statt bei jedem Rendern
const ZIGZAG_LINES = Array.from({ length: 14 }, (_, i) => {
  const y = 90 + i * 52;
  const points = [-80, 60, 200, 340, 480, 620, 760, 900, 1040, 1180, 1320, 1520]
    .map((x, j) => `${x} ${j === 0 ? y : j % 2 ? y - 18 : y + 18}`)
    .join(" L ");
  return `M ${points}`;
});

export default function FullService() {
  const t = useTranslations("fullService");
  const tCommon = useTranslations("common");

  return (
    <section
      id="full-service"
      aria-labelledby="full-service-title"
      className="
        relative isolate overflow-hidden
        scroll-mt-24
        bg-[linear-gradient(130deg,#6f2a8a_0%,#a53384_52%,#d94f9d_100%)]
        text-white
        [--wave:48px] sm:[--wave:64px] lg:[--wave:96px]
        -mt-12 sm:-mt-16 lg:-mt-24
        pt-27.5 pb-15.5 sm:pt-31.5
        min-[701px]:pt-37 min-[701px]:pb-21 lg:pt-45 lg:pb-50
      "
      style={waveMask()}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full opacity-8"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {ZIGZAG_LINES.map((d) => (
          <path
            key={d}
            d={d}
            stroke="white"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        ))}
      </svg>

      {/* Lichtakzente links und rechts oben */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 size-155 -translate-y-1/2 rounded-full bg-pink-200/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-130 rounded-full bg-white/10 blur-3xl"
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6">
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
            <div
              aria-hidden="true"
              className="flex size-20 shrink-0 items-center justify-center rounded-full bg-pink-200 text-4xl font-bold text-[#6f2a8a]"
            >
              4
            </div>

            <h2
              id="full-service-title"
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
              <span className="text-pink-200">{t("titleFirst")}</span>
              <span className="block text-orange">{t("titleSecond")}</span>
            </h2>
          </div>

          {/* Fahrzeug links */}
          <div
            className="
              relative flex w-full
              items-center justify-center
              lg:col-start-1 lg:row-span-2 lg:row-start-1
              lg:self-center
            "
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-10 rounded-full bg-white/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute size-[85%] rounded-full border border-white/10"
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
              <FullServiceMascot />
            </div>
          </div>

          {/* Text */}
          <div
            className="
              mx-auto max-w-162 px-5
              text-center
              lg:col-start-2 lg:row-start-2
              lg:mx-0 lg:mt-6 lg:self-start lg:px-0
              lg:text-left
            "
          >
            <p className="mb-5 text-lg font-semibold sm:text-xl">
              {t("subtitle")}
            </p>

            <p className="mx-auto mb-9 max-w-140 text-base leading-relaxed text-white/85 sm:text-lg lg:mx-0">
              {t("description")}
            </p>

            {/* Leistungen – ohne Preflight hat ul Browser-Einzug und -Abstände, daher list-none p-0 my-0 */}
            <ul className="mx-auto my-0 w-fit list-none space-y-4 p-0 text-left lg:mx-0 lg:mb-10">
              {fullServicePoints.map(({ icon: Icon, key }) => (
                <li key={key} className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-pink-200/25 bg-pink-200/10">
                    <Icon
                      size={20}
                      className="text-pink-200"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="font-semibold">{t(`points.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="#kontakt" variant="primary" size="large" showArrow>
            {tCommon("actions.contactUs")}
          </Button>
        </div>
      </div>
    </section>
  );
}
