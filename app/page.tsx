import Hero from "../components/sections/Hero";
import Clients from "../components/sections/Clients";
import Experience from "../components/sections/Experience";
import Capabilities from "../components/sections/Capabilities";
import About from "../components/sections/About";
import Differentials from "../components/sections/Differentials";
import Services from "../components/sections/Services";
import Process from "../components/sections/Process";
import Numbers from "../components/sections/Numbers";
import Portfolio from "../components/sections/Portfolio";
import CTA from "../components/sections/CTA";
import Footer from "../components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Hero />
      <Clients />
      <Experience />
      <Capabilities />
      <About />
      <Differentials />
      <Services />
      <Process />
      <Numbers />
      <Portfolio />
      <CTA />
      <Footer />
    </main>
  );
}