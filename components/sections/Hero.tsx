const phone = "5511932072394";

const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
  "Olá! Vim pelo site da Arantes Visual e quero solicitar um orçamento para instalação de comunicação visual."
)}`;

const stats = [
  ["2017", "Experiência no setor"],
  ["IRATA", "Trabalhos em altura"],
  ["+50", "Empresas atendidas"],
  ["Brasil", "Atendimento sob consulta"],
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/65 to-black" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-5 pb-8 pt-28 md:px-16 md:pb-14">
        <div className="max-w-4xl">
          <p className="mb-5 inline-flex rounded-full border border-blue-500/50 bg-blue-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-blue-400 md:text-xs">
            Desde 2017 • Comunicação Visual
          </p>

          <h1 className="max-w-4xl text-[2.45rem] font-black leading-[0.95] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl">
            Instalação técnica para marcas que exigem acabamento profissional.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 md:text-2xl md:leading-10">
            Especialistas em fachadas, ACM, letras caixa e instalações em
            altura para empresas que exigem segurança, precisão e acabamento.
          </p>

          <div className="mt-6 grid gap-2 text-sm font-bold text-zinc-200 sm:grid-cols-3 md:text-base">
            <span>✓ Desde 2017</span>
            <span>✓ Trabalho em altura</span>
            <span>✓ Atendimento corporativo</span>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={whatsappUrl}
              className="rounded-full bg-blue-600 px-7 py-5 text-center text-base font-black text-white shadow-2xl shadow-blue-600/30 transition hover:bg-blue-500 md:px-9 md:text-lg"
            >
              Solicitar orçamento pelo WhatsApp
            </a>

            <a
              href="#portfolio"
              className="rounded-full border border-white/20 px-7 py-5 text-center text-base font-black text-white transition hover:bg-white hover:text-black md:px-9 md:text-lg"
            >
              Ver projetos realizados
            </a>
          </div>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
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