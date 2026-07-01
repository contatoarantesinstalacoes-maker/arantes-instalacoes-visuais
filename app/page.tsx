import Navbar from "../components/sections/Navbar";
import Hero from "../components/sections/Hero";
import Clients from "../components/sections/Clients";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import Portfolio from "../components/sections/Portfolio";
import Process from "../components/sections/Process";
import Testimonials from "../components/sections/Testimonials";
import FAQ from "../components/sections/FAQ";
import CTA from "../components/sections/CTA";
import Footer from "../components/sections/Footer";
import WhatsAppButton from "../components/sections/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Clients />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </>
  );
}