import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import Header from "@/components/Header";
import Hero from "@/app/_sections/hero/Hero";
import Footer from "@/components/Footer";
import Services from "@/app/_sections/services/Services";
import About from "@/app/_sections/about/About";
import Faq from "@/app/_sections/faq/Faq";
import Contact from "@/app/_sections/contact/Contact";
import { getOpeningHours } from "@/lib/google/openingHours";
import Testimonials from "@/app/_sections/testimonials/Testimonials";
import { getImageProps } from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import GoogleRatingLink from "@/app/_sections/testimonials/GoogleRatingLink";
import ImageGallery from "@/components/ImageGallery";
import ViberButton from "@/components/ViberButton";

// Alt-Texte in common.buildingImages im Dictionary
const location = [
  {
    src: "/images/tehnicki-pregled-garage-zvezdara-ulaz01.webp",
    key: "entranceFront",
  },
  {
    src: "/images/tehnicki-pregled-garage-zvezdara-ulaz02.webp",
    key: "entranceStreet",
  },
] as const;

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  setRequestLocale(locale as Locale);

  const tImages = useTranslations("common.buildingImages");

  // Gebäudebild: gleiches Motiv in zwei Größen, der Browser wählt per <picture>
  const buildingCommon = {
    alt: tImages("building"),
    sizes: "(min-width: 1280px) 1280px, 100vw",
  };
  const {
    props: { srcSet: buildingDesktop },
  } = getImageProps({
    ...buildingCommon,
    src: "/images/tehnicki-pregled-garage-beograd-zvezdara.webp",
    width: 1756,
    height: 895,
  });
  const { props: buildingMobile } = getImageProps({
    ...buildingCommon,
    src: "/images/tehnicki-pregled-garage-beograd-zvezdara-mob.webp",
    width: 878,
    height: 448,
  });

  // Öffnungszeiten aus dem Google-Profil (Fallback: site-config)
  const openingHours = use(getOpeningHours());

  return (
    <>
      <Header compactLogoOnMobile={false} />
      <main>
        {/* Desktop: Der Hero füllt den Bildschirm unter dem Header (lg:h-24).
            Features (app/_sections/Features.tsx) ist vorerst ausgeblendet;
            „Ljubazan pristup“ steckt jetzt als „Kao kod kuće“ im Hero-Untertitel. */}
        <div className="lg:flex lg:min-h-[calc(100svh-6rem)] lg:flex-col">
          <Hero />
        </div>
        <div className="container mt-20 mb-10">
          {/* Bis 767 px die halb so große Mobil-Variante (135 statt 556 KB) */}
          <picture>
            <source media="(min-width: 768px)" srcSet={buildingDesktop} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img {...buildingMobile} className="h-auto w-full" />
          </picture>
          {/* Wie die Galerien im About-Bereich: große runde Bilder,
              zentriert, blendet beim Scrollen ein */}
          <div data-reveal className="mt-10 flex justify-center lg:mt-20">
            <ImageGallery
              images={location.map(({ src, key }) => ({
                src,
                alt: tImages(key),
              }))}
              size="xl"
              gap="lg"
            />
          </div>
        </div>
        <About />
        <Services />
        <GoogleRatingLink />
        <Testimonials />
        <Contact hours={openingHours} />
        <Faq />
      </main>
      <Footer />
      <ScrollReveal />
      {/* Schwebender Viber-Button unten rechts */}
      <ViberButton />
    </>
  );
}
