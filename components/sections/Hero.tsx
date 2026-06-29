export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">

      {/* Vídeo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 md:px-12">

        <div className="max-w-3xl">

          <div className="mb-6 inline-flex rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">
              Desde 2017
            </span>
          </div>

          <h1 className="text-5xl font-black leading-tight md:text-7xl">
            EXECUÇÃO
            <br />
            TÉCNICA EM
            <br />
            COMUNICAÇÃO
            <br />
            VISUAL
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300">
            Transformamos projetos em instalações executadas com precisão,
            segurança e acabamento profissional para empresas, indústrias,
            franquias, eventos e grandes marcas.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <a
              href="https://wa.me/5511932072394"
              target="_blank"
              className="rounded-xl bg-blue-600 px-8 py-4 text-center font-bold transition duration-300 hover:bg-blue-500"
            >
              Solicitar orçamento
            </a>

            <a
              href="#portfolio"
              className="rounded-xl border border-white/20 px-8 py-4 text-center font-bold transition duration-300 hover:bg-white/10"
            >
              Ver projetos
            </a>

          </div>

        </div>

      </div>

      {/* Barra inferior */}

      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/60 backdrop-blur-md">

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-6 text-center md:grid-cols-4">

          <div>
            <h3 className="text-2xl font-black">2017</h3>
            <p className="mt-1 text-sm text-zinc-400">
              Experiência no setor
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-black">IRATA</h3>
            <p className="mt-1 text-sm text-zinc-400">
              Trabalhos em altura
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-black">Corporativo</h3>
            <p className="mt-1 text-sm text-zinc-400">
              Empresas e eventos
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-black">Brasil</h3>
            <p className="mt-1 text-sm text-zinc-400">
              Atendimento sob consulta
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}