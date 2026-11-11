import CarEntrance from "@/components/AnimatedCar/CarEntrance";
import AnimatedCar from "@/components/AnimatedCar/AnimatedCar";
import Button from "@/components/Button";
import { useLocale, useTranslations } from "next-intl";
import AnniversaryBadge from "@/components/AnniversaryBadge";
import IntroOverlay from "@/components/intro/IntroOverlay";
import HeroBackdrop from "./HeroBackdrop";
import HeroHeader from "./HeroHeader";
import HeroSubtitle from "./HeroSubtitle";

/**
 * Neuer Hero: zuerst das Intro (Rolltor), danach wechselt der Hintergrund
 * gleichzeitig mit dem Titel durch die Farben der Service-Sektionen.
 * Aufbau wie HeroOld.tsx (bleibt als Backup), Titel und Untertitel weiß.
 */
const Hero = () => {
  const t = useTranslations("common.actions");
  const currentLanguage = useLocale();

  return (
    <>
      <IntroOverlay />

      <HeroBackdrop className="lg:grid lg:flex-1">
        {/* Technisches Raster – hell, damit es auf allen Farben wirkt */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20 lg:opacity-40
            bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)]
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
            bg-white/20 blur-3xl
            lg:block
          "
        />

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
          <AnniversaryBadge
            variant="goldCream"
            size="100%"
            language={currentLanguage}
            className="hidden w-44 justify-self-center drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)] lg:col-span-2 lg:block xl:w-75"
          />

          <div className="min-w-0">
            <HeroHeader tone="light" />
            <HeroSubtitle tone="light" />

            <div className="flex justify-center lg:justify-start">
              <Button href="#termin" variant="primary" size="large" showArrow>
                {t("bookAppointment")}
              </Button>
            </div>
          </div>

          <div className="relative w-full max-w-75 sm:max-w-95 lg:max-w-115 justify-self-center">
            {/* Mobile/Tablet: Jubiläums-Badge als „Siegel“ oben links am Auto */}
            <AnniversaryBadge
              variant="goldCream"
              size="100%"
              language={currentLanguage}
              tapToZoom
              className="absolute -right-7 -top-40 z-10 w-30 -rotate-12 origin-right drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)] sm:w-28 lg:hidden"
            />
            <CarEntrance>
              <AnimatedCar
                animated={true}
                sizes="(max-width: 700px) 280px, (max-width: 1000px) 40vw, 460px"
              />
            </CarEntrance>
          </div>
        </div>
      </HeroBackdrop>
    </>
  );
};

export default Hero;
