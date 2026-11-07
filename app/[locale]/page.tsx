import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import Header from "@/app/_sections/Header";
import Hero from "@/app/_sections/hero/Hero";
import Features from "@/app/_sections/Features";
import Footer from "@/app/_sections/Footer";
import Services from "@/app/_sections/services/Services";
import About from "@/app/_sections/About";
import Contact from "@/app/_sections/contact/Contact";
import Testimonials from "@/app/_sections/testimonials/Testimonials";

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
        <Hero />
        <Features />
        <About />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
