const phone = "5511932072394";

const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
  "Olá! Vim pelo site da Arantes Visual e quero solicitar um orçamento para instalação de comunicação visual."
)}`;

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-35"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-10 pt-28 md:px-16 md:pb-16">
        <div className="max-w-4xl">
          <p className="mb-5 inline-flex rounded-full border border-blue-500/50 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-blue-400">
            Desde 2017 • Comunicação Visual
          </p>

          <h1 className="text-[2.7rem] font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            Instalação técnica para marcas que exigem acabamento profissional.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 md:text-2xl md:leading-10">
            Fachadas, ACM, letras caixa, adesivação, eventos, estandes e
            projetos em altura com execução segura e padrão corporativo.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={whatsappUrl}
              className="rounded-full bg-blue-600 px-8 py-5 text-center text-base font-black text-white transition hover:bg-blue-500 md:text-lg"
            >
              Solicitar orçamento pelo WhatsApp
            </a>

            <a
              href="#portfolio"
              className="rounded-full border border-white/20 px-8 py-5 text-center text-base font-black text-white transition hover:bg-white hover:text-black md:text-lg"
            >
              Ver projetos realizados
            </a>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[
            ["2017", "Experiência no setor"],
            ["IRATA", "Trabalhos em altura"],
            ["+50", "Empresas atendidas"],
            ["Brasil", "Atendimento sob consulta"],
          ].map(([title, text]) => (
            <div
              key={title}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur md:p-6"
            >
              <strong className="block break-words text-3xl font-black leading-none text-blue-500 md:text-5xl">
                {title}
              </strong>
              <span className="mt-3 block text-sm font-semibold leading-6 text-zinc-300 md:text-base">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}