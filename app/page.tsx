import FAQ from "../components/sections/FAQ";
import Testimonials from "../components/sections/Testimonials";
import Clients from "@/components/sections/Clients";
import WhatsAppButton from "../components/sections/WhatsAppButton";
import Navbar from "../components/sections/Navbar";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import Portfolio from "../components/sections/Portfolio";
import Process from "../components/sections/Process";
import CTA from "../components/sections/CTA";
import Footer from "../components/sections/Footer";

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