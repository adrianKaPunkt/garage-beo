import Header from "@/app/_sections/Header";
import Hero from "./_sections/hero/Hero";
import Features from "./_sections/Features";
import Footer from "./_sections/Footer";
import Services from "./_sections/services/Services";
import About from "./_sections/About";
import Contact from "./_sections/contact/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
