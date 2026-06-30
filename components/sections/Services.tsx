const services = [
  {
    title: "Fachadas Comerciais",
    description:
      "Instalação completa de fachadas comerciais com acabamento preciso, segurança e valorização da identidade da empresa.",
  },
  {
    title: "Letras Caixa",
    description:
      "Instalação de letras caixa em ACM, inox, galvanizado e acrílico para empresas, clínicas, hospitais e franquias.",
  },
  {
    title: "Revestimento em ACM",
    description:
      "Execução técnica de revestimentos em ACM para fachadas, pórticos, totens e projetos corporativos.",
  },
  {
    title: "Adesivação",
    description:
      "Aplicação de adesivos em vitrines, paredes, veículos, ambientes corporativos e grandes formatos.",
  },
  {
    title: "Painéis • Totens • Eventos",
    description:
      "Montagem de estruturas promocionais, painéis, estandes e comunicação visual para eventos corporativos.",
  },
  {
    title: "Trabalhos em Altura",
    description:
      "Equipe qualificada para instalações em altura utilizando técnicas de acesso por cordas com foco em segurança.",
  },
];

export default function Services() {
  return (
    <section
      id="servicos"
      className="bg-black px-6 py-28 md:px-16"
    >
      <div className="mx-auto max-w-7xl">

        <div className="max-w-3xl">

          <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-blue-400">
            SERVIÇOS
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            Soluções completas em comunicação visual.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-300">
            Executamos projetos para empresas, indústrias, hospitais, franquias,
            centros comerciais, eventos e grandes marcas.
          </p>

        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {services.map((service) => (

            <div
              key={service.title}
              className="group rounded-3xl border border-white/10 bg-zinc-950 p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:bg-zinc-900"
            >

              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-black">
                +
              </div>

              <h3 className="text-2xl font-black">
                {service.title}
              </h3>

              <p className="mt-5 leading-8 text-zinc-400">
                {service.description}
              </p>

              <a
                href="https://wa.me/5511932072394"
                className="mt-8 inline-flex font-bold text-blue-400 transition group-hover:text-blue-300"
              >
                Solicitar orçamento →
              </a>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}