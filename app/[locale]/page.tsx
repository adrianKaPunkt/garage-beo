import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import Header from "@/app/_sections/Header";
import Hero from "@/app/_sections/hero/Hero";
import Features from "@/app/_sections/Features";
import Footer from "@/app/_sections/Footer";
import Services from "@/app/_sections/services/Services";
import About from "@/app/_sections/about/About";
import Contact from "@/app/_sections/contact/Contact";
import Testimonials from "@/app/_sections/testimonials/Testimonials";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import GoogleRatingBadge from "../_sections/testimonials/GoogleRatingBadge";

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  setRequestLocale(locale as Locale);

  return (
    <>
      <Header />
      <main>
        {/* Desktop: Hero + Features füllen zusammen den Bildschirm unter dem Header (lg:h-24) */}
        <div className="lg:flex lg:min-h-[calc(100svh-6rem)] lg:flex-col">
          <Hero />
          <Features />
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
        </div>
        <About />
        <Services />
        {/* Badge mittig auf der Kante zwischen Payment und Testimonials */}
        <div className="relative z-10 h-0">
          <GoogleRatingBadge
            rating={5.0}
            reviewCount={72}
            logoSrc="/logos/google.svg"
            className="absolute top-0 left-1/2 h-auto w-44 -translate-x-1/2 -translate-y-1/2 sm:w-52 lg:w-60"
          />
        </div>
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
