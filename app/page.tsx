import Header from "@/app/_sections/Header";
import Hero from "./_sections/Hero";
import Features from "./_sections/Features";
import Footer from "./_sections/Footer";
import Services from "./_sections/Services";
import Inspection from "./_sections/Inspection";
import About from "./_sections/About";
import Gallery from "./_sections/Gallery";
import Contact from "./_sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Services />
        <Inspection />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
