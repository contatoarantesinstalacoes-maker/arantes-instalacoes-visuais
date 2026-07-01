"use client";

const phone = "5511932072394";

const whatsapp = `https://wa.me/${phone}?text=${encodeURIComponent(
  "Olá! Gostaria de solicitar um orçamento para meu projeto de comunicação visual."
)}`;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function CTA() {
  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "whatsapp_click", {
        button_location: "cta",
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0b0b0b] to-black px-6 py-28 md:px-16">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl rounded-[40px] border border-white/10 bg-zinc-950/80 p-8 text-center backdrop-blur md:p-16">
        <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-blue-400">
          SOLICITE UM ORÇAMENTO
        </span>

        <h2 className="mt-8 text-4xl font-black leading-tight md:text-6xl">
          Vamos transformar seu projeto em realidade.
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-300">
          Executamos projetos de comunicação visual para empresas, hospitais,
          indústrias, franquias, eventos e grandes marcas, sempre com foco em
          segurança, organização e acabamento profissional.
        </p>

        <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:justify-center">
          <a
            href={whatsapp}
            onClick={handleWhatsAppClick}
            className="rounded-full bg-blue-600 px-10 py-5 text-lg font-black text-white shadow-2xl shadow-blue-600/30 transition hover:scale-105 hover:bg-blue-500"
          >
            Solicitar orçamento
          </a>

          <a
            href="#portfolio"
            className="rounded-full border border-white/20 px-10 py-5 text-lg font-black transition hover:border-blue-500 hover:bg-white hover:text-black"
          >
            Ver projetos
          </a>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-3xl font-black text-blue-500">2017</h3>
            <p className="mt-2 text-zinc-300">Experiência no mercado</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-3xl font-black text-blue-500">IRATA</h3>
            <p className="mt-2 text-zinc-300">Trabalho em altura</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-3xl font-black text-blue-500">Nacional</h3>
            <p className="mt-2 text-zinc-300">Atendimento sob consulta</p>
          </div>
        </div>
      </div>
    </section>
  );
}