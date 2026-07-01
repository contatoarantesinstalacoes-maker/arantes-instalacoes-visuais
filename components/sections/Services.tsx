const services = [
  {
    title: "Fachadas Comerciais",
    text: "Instalação de fachadas para empresas, lojas, indústrias, clínicas e franquias.",
  },
  {
    title: "Letras Caixa",
    text: "Instalação de letras caixa em ACM, inox, galvanizado e acrílico com acabamento profissional.",
  },
  {
    title: "Revestimento em ACM",
    text: "Execução técnica de revestimentos, painéis e estruturas em ACM para ambientes comerciais.",
  },
  {
    title: "Adesivação",
    text: "Aplicação de adesivos, envelopamento, comunicação interna e grandes formatos.",
  },
  {
    title: "Painéis e Totens",
    text: "Instalação de painéis, totens, placas e estruturas visuais para empresas e eventos.",
  },
  {
    title: "Eventos e Estandes",
    text: "Montagem e instalação de comunicação visual para feiras, eventos e ativações de marca.",
  },
  {
    title: "Trabalhos em Altura",
    text: "Execução com acesso por cordas para locais de difícil acesso, fachadas e estruturas elevadas.",
  },
  {
    title: "Atendimento Corporativo",
    text: "Execução para empresas, indústrias, construtoras, franquias e redes nacionais.",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="bg-[#050505] px-6 py-24 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <span className="rounded-full border border-blue-500/50 bg-blue-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.32em] text-blue-400">
            Serviços
          </span>

          <h2 className="mt-8 text-4xl font-black leading-tight text-white md:text-6xl">
            Soluções completas em comunicação visual.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl md:leading-9">
            Executamos projetos para empresas que precisam de instalação segura,
            acabamento profissional e capacidade técnica para projetos de
            pequeno, médio e grande porte.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group rounded-[32px] border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-500/70 hover:bg-blue-500/10"
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-black text-white transition group-hover:scale-110">
                +
              </div>

              <h3 className="text-2xl font-black text-white">
                {service.title}
              </h3>

              <p className="mt-5 text-base leading-8 text-zinc-400">
                {service.text}
              </p>

              <a
                href="https://wa.me/5511932072394?text=Olá! Vim pelo site da Arantes Visual e quero solicitar um orçamento."
                className="mt-7 inline-flex font-black text-blue-400 transition hover:text-blue-300"
              >
                Solicitar orçamento →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}