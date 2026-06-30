import Image from "next/image";

const features = [
  "Execução técnica para empresas e grandes marcas",
  "Equipe especializada em instalações de comunicação visual",
  "Projetos em altura com acesso por cordas (IRATA)",
  "Foco total em acabamento, alinhamento e segurança",
];

export default function About() {
  return (
   <section
  id="about"
  className="bg-[#080808] px-6 py-24 md:px-16"
>
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

        <div className="relative">

          <div className="absolute -left-6 -top-6 hidden h-40 w-40 rounded-full bg-blue-600/20 blur-3xl lg:block" />

          <div className="overflow-hidden rounded-3xl border border-white/10">

            <Image
              src="/images/portfolio1.jpg"
              alt="Arantes Instalações Visuais"
              width={900}
              height={1200}
              className="h-[620px] w-full object-cover transition duration-700 hover:scale-105"
            />

          </div>

        </div>

        <div>

          <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.3em] text-blue-400">
            QUEM SOMOS
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            Instalações visuais executadas com precisão técnica.
          </h2>

          <p className="mt-8 text-lg leading-8 text-zinc-300">
            A Arantes Instalações Visuais atua desde 2017 executando projetos de
            comunicação visual para empresas, indústrias, hospitais, eventos,
            franquias e grandes marcas.
          </p>

          <p className="mt-6 text-lg leading-8 text-zinc-300">
            Nossa missão é entregar instalações com acabamento impecável,
            organização, segurança e responsabilidade, valorizando a imagem do
            cliente em cada projeto realizado.
          </p>

          <div className="mt-10 space-y-5">

            {features.map((item) => (

              <div
                key={item}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-black">
                  ✓
                </div>

                <p className="text-base leading-7 text-zinc-200">
                  {item}
                </p>

              </div>

            ))}

          </div>

          <div className="mt-10 grid grid-cols-2 gap-4">

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">

              <h3 className="text-4xl font-black text-blue-500">
                2017
              </h3>

              <p className="mt-2 text-zinc-300">
                Início das atividades
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">

              <h3 className="text-4xl font-black text-blue-500">
                IRATA
              </h3>

              <p className="mt-2 text-zinc-300">
                Execução em altura
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}