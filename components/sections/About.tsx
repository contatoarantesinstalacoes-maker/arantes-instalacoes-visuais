const points = [
  "Execução técnica para empresas e grandes marcas",
  "Equipe especializada em comunicação visual",
  "Projetos em altura com acesso por cordas",
  "Foco total em acabamento, alinhamento e segurança",
];

export default function About() {
  return (
    <section id="about" className="bg-black px-6 py-24 md:px-16">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <span className="rounded-full border border-blue-500/50 bg-blue-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.32em] text-blue-400">
            Quem somos
          </span>

          <h2 className="mt-8 text-4xl font-black leading-tight text-white md:text-6xl">
            Instalações visuais executadas com precisão técnica.
          </h2>

          <div className="mt-6 space-y-5 text-lg leading-8 text-zinc-400 md:text-xl md:leading-9">
            <p>
              A Arantes Instalações Visuais atua desde 2017 executando projetos
              de comunicação visual para empresas, indústrias, hospitais,
              eventos, franquias e grandes marcas.
            </p>

            <p>
              Nossa missão é entregar instalações com acabamento impecável,
              organização, segurança e responsabilidade, valorizando a imagem do
              cliente em cada projeto realizado.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {points.map((point) => (
            <div
              key={point}
              className="flex gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-blue-500/60 hover:bg-blue-500/10"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-black text-white">
                ✓
              </div>

              <p className="text-lg font-bold leading-8 text-zinc-200">
                {point}
              </p>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
              <strong className="block text-4xl font-black text-blue-500">
                2017
              </strong>
              <span className="mt-3 block text-zinc-400">
                Início das atividades
              </span>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
              <strong className="block text-4xl font-black text-blue-500">
                IRATA
              </strong>
              <span className="mt-3 block text-zinc-400">
                Execução em altura
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}