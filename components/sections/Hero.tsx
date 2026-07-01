"use client";

const phone = "5511932072394";

const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
  "Olá! Vim pelo site da Arantes Visual e quero solicitar um orçamento para instalação de comunicação visual."
)}`;

const stats = [
  ["8+", "anos de experiência"],
  ["IRATA", "acesso por cordas"],
  ["Brasil", "atendimento sob consulta"],
  ["100%", "foco em execução"],
];

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function Hero() {
  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "whatsapp_click", {
        button_location: "hero",
      });
    }
  };

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-black text-white md:min-h-screen">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/65 to-black" />

      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-5 pb-6 pt-22 md:min-h-screen md:px-16 md:pb-14 md:pt-32">
        <div className="max-w-4xl">
          <p className="mb-4 inline-flex rounded-full border border-blue-500/50 bg-blue-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-blue-400 md:text-xs md:tracking-[0.28em]">
            Desde 2017 • Comunicação Visual
          </p>

          <h1 className="max-w-4xl text-[1.95rem] font-black leading-[0.95] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl">
            Instalação técnica em comunicação visual para empresas.
          </h1>

          <div className="mt-5 max-w-2xl space-y-3 text-base leading-7 text-zinc-300 md:text-2xl md:leading-10">
            <p>
              Especialistas em fachadas comerciais, ACM, letras caixa,
              adesivação, painéis e eventos.
            </p>

            <p>
              Execução segura, precisa e profissional, inclusive em trabalhos em
              altura com acesso por corda.
            </p>
          </div>

          <div className="mt-5 grid gap-2 text-sm font-bold text-zinc-200 sm:grid-cols-3 md:text-base">
            <span>✓ IRATA</span>
            <span>✓ Atendimento em todo Brasil</span>
            <span>✓ Orçamento rápido</span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-8 md:gap-4">
            <a
              href={whatsappUrl}
              onClick={handleWhatsAppClick}
              className="rounded-full bg-blue-600 px-7 py-4 text-center text-base font-black text-white shadow-2xl shadow-blue-600/30 transition hover:bg-blue-500 md:px-9 md:py-5 md:text-lg"
            >
              Solicitar orçamento
            </a>

            <a
              href="#portfolio"
              className="rounded-full border border-white/20 px-7 py-4 text-center text-base font-black text-white transition hover:bg-white hover:text-black md:px-9 md:py-5 md:text-lg"
            >
              Ver projetos
            </a>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:mt-9 md:grid-cols-4 md:gap-4">
          {stats.map(([title, text]) => (
            <div
              key={title}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur md:p-6"
            >
              <strong className="block break-words text-3xl font-black leading-none text-blue-500 md:text-5xl">
                {title}
              </strong>

              <span className="mt-3 block text-sm font-semibold leading-5 text-zinc-300 md:text-base md:leading-6">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}