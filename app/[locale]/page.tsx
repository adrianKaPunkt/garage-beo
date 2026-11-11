import { use } from "react";
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
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import GoogleRatingLink from "@/app/_sections/testimonials/GoogleRatingLink";
import ImageGallery from "@/components/ImageGallery";
import ViberButton from "@/components/ViberButton";

const location = [
  {
    src: "/images/street03.jpeg",
    alt: "Garage Beograd — ulaz u garažu sa ulice",
  },
  {
    src: "/images/street01.jpeg",
    alt: "Garage Beograd — ulaz u garažu sa ulice",
  },
];

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  setRequestLocale(locale as Locale);

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
          <Image
            className="h-auto w-full"
            src="/images/building.webp"
            alt="Zgrada Garage Beograd — tehnički pregled vozila"
            width={1756}
            height={895}
            sizes="(min-width: 1280px) 1280px, 100vw"
          />
          {/* Wie die Galerien im About-Bereich: große runde Bilder,
              zentriert, blendet beim Scrollen ein */}
          <div data-reveal className="mt-10 flex justify-center lg:mt-20">
            <ImageGallery images={location} size="xl" gap="lg" />
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
