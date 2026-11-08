import CarEntrance from "@/components/AnimatedCar/CarEntrance";
import AnimatedCar from "@/components/AnimatedCar/AnimatedCar";
import HeroHeader from "./HeroHeader";
import HeroSubtitle from "./HeroSubtitle";
import Button from "@/components/Button";
import { useLocale, useTranslations } from "next-intl";
import GarageBeogradBadge from "@/components/GarageBeogradBadge";

const Hero = () => {
  const t = useTranslations("common.actions");
  const currentLanguage = useLocale();

  return (
    <section
      id="pocetna"
      className="
        relative isolate overflow-hidden
        lg:grid lg:flex-1
        bg-[linear-gradient(120deg,#f5faef_0%,#dff0d0_55%,#bfe39d_100%)]
      "
      aria-labelledby="hero-title"
    >
      {/* Technisches Raster – nur auf dem Desktop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15 lg:opacity-30
          bg-[linear-gradient(to_right,rgba(34,84,61,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,84,61,0.18)_1px,transparent_1px)]
          bg-size-[40px_40px]
        "
      />

      {/* Dezenter Lichtakzent hinter dem Auto */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-20 top-1/2
          hidden h-115 w-115
          -translate-y-1/2 rounded-full
          bg-white/35 blur-3xl
          lg:block
        "
      />

      {/* Bestehender Hero-Inhalt */}
      <div
        className="
          container relative z-10
          grid grid-cols-1
          lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]
          items-center
          gap-18
          lg:gap-x-[clamp(24px,4vw,64px)] lg:gap-y-4
          lg:grid-rows-[auto_1fr]
          min-h-0
          lg:min-h-133
          pt-13 pb-8
          lg:pt-25 lg:pb-10
        "
      >
        {/* Desktop: Jubiläums-Badge zentriert über Headline und Auto */}
        <GarageBeogradBadge
          size="100%"
          language={currentLanguage}
          className="hidden w-44 justify-self-center drop-shadow-[0_10px_18px_rgba(31,69,41,0.35)] lg:col-span-2 lg:block xl:w-55"
        />

        <div className="min-w-0">
          <HeroHeader />
          <HeroSubtitle />

          <div className="flex justify-center lg:justify-start">
            <Button href="#termin" variant="primary" size="large" showArrow>
              {t("bookAppointment")}
            </Button>
          </div>
        </div>

        <div className="relative w-full max-w-75 sm:max-w-95 lg:max-w-115 justify-self-center">
          {/* Mobile/Tablet: Jubiläums-Badge als „Siegel“ oben links am Auto */}
          <GarageBeogradBadge
            size="100%"
            language={currentLanguage}
            className="absolute -right-7 -top-40 z-10 w-30 -rotate-12 drop-shadow-[0_10px_18px_rgba(31,69,41,0.35)] sm:w-28 lg:hidden"
          />
          <CarEntrance>
            <AnimatedCar
              animated={true}
              sizes="(max-width: 700px) 280px, (max-width: 1000px) 40vw, 460px"
            />
          </CarEntrance>
        </div>
      </div>
    </section>
  );
};

export default Hero;
