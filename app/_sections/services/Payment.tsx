import Image from "next/image";
import { ReceiptText, CreditCard, CheckCircle2 } from "lucide-react";
import Button from "@/components/Button";
import PaySpotLogo from "@/components/PaySpotLogo/PaySpotLogo";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { waveMask } from "./waveMask";

// Texte in payment.points im Dictionary
const paymentPoints = [
  { icon: ReceiptText, key: "onePlace" },
  { icon: CreditCard, key: "simple" },
  { icon: CheckCircle2, key: "fast" },
] as const;

export default function Payment() {
  const t = useTranslations("payment");
  const tCommon = useTranslations("common");

  return (
    <section
      id="placanje-racuna"
      aria-labelledby="payment-title"
      className="
        relative isolate overflow-hidden
        scroll-mt-24
        bg-[linear-gradient(135deg,#a8681c_0%,#d99b32_48%,#f4cf75_100%)]
        text-white
        [--wave:48px] sm:[--wave:64px] lg:[--wave:96px]
        -mt-12 sm:-mt-16 lg:-mt-24
        pt-27.5 pb-15.5 sm:pt-31.5
        min-[701px]:pt-37 min-[701px]:pb-60 lg:pt-45
      "
      style={waveMask()}
    >
      {/* Halbtransparente Kreise im Hintergrund */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="
            absolute -left-36 -top-40
            h-112.5 w-112.5
            rounded-full
            border border-white/20
          "
        />

        <div
          className="
            absolute -left-15 -top-20
            h-70 w-70
            rounded-full
            border border-white/15
          "
        />

        <div
          className="
            absolute left-[30%] top-[15%]
            h-28 w-28
            rounded-full
            border border-white/15
          "
        />

        <div
          className="
            absolute -right-36 top-[10%]
            h-137.5 w-137.5
            rounded-full
            border border-white/20
          "
        />

        <div
          className="
            absolute -right-15 top-[25%]
            h-77.5 w-77.5
            rounded-full
            border border-white/15
          "
        />

        <div
          className="
            absolute bottom-[10%] left-[42%]
            h-40 w-40
            rounded-full
            border border-white/15
          "
        />

        <div
          className="
            absolute -bottom-52 left-[10%]
            h-110 w-110
            rounded-full
            border border-white/15
          "
        />
      </div>

      {/* Weicher Lichtakzent links */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-32 top-1/2
          h-150 w-150
          -translate-y-1/2 rounded-full
          bg-yellow-100/15
          blur-3xl
        "
      />

      {/* Dezenter Lichtakzent rechts */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-40 -top-40
          h-125 w-125
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
          {/* Überschrift rechts */}
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
            {/* Nummerierung */}
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
                  text-[#80501a]
                "
              >
                4
              </span>
            </div>

            <h2
              id="payment-title"
              className="
                mb-0
                text-4xl font-extrabold
                leading-10 tracking-tight
                sm:text-5xl
                lg:text-[clamp(40px,4vw,60px)]
                lg:leading-12
              "
            >
              <span className="text-white">{t("titleFirst")}</span>
              <span className="block text-[#68401b]">{t("titleSecond")}</span>
            </h2>
          </div>

          {/* Maskottchen links */}
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
                border border-white/20
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
                src="/images/car/payment.webp"
                alt={tCommon("mascotAlt")}
                fill
                sizes="(max-width: 1024px) 85vw, 440px"
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Text rechts */}
          <div
            className="
              mx-auto max-w-162 lg:mt-6
              lg:col-start-2 lg:row-start-2
              lg:mx-0 lg:self-start text-left
            "
          >
            <div className="mx-4 lg:mx-0">
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
              text-white/90
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
              {paymentPoints.map((point) => {
                const Icon = point.icon;

                return (
                  <div key={point.key} className="flex items-center gap-4">
                    <div
                      className="
                        flex h-11 w-11 shrink-0
                        items-center justify-center
                        rounded-xl
                        border border-white/25
                        bg-white/15
                      "
                    >
                      <Icon
                        size={20}
                        className="text-white"
                        aria-hidden="true"
                      />
                    </div>

                    <span className="font-semibold text-white">
                      {t(`points.${point.key}`)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Kontakt-Button */}
        <div className="mt-10 flex justify-center">
          <div className="flex flex-col gap-12">
            <Link
              href="https://payspot.rs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PaySpotLogo animated />
            </Link>
            <Button href="#termin" variant="primary" size="large" showArrow>
              {tCommon("actions.contactUs")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
