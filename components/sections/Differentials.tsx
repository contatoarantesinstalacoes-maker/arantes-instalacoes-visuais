const items = [
  {
    title: "Execução técnica",
    text: "Instalações realizadas com planejamento, alinhamento, fixação adequada e foco em acabamento profissional.",
  },
  {
    title: "Projetos corporativos",
    text: "Experiência em comunicação visual para feiras, eventos, estandes, fachadas, empresas e grandes marcas.",
  },
  {
    title: "Trabalho em altura",
    text: "Capacidade para atuar em instalações complexas, incluindo fachadas, estruturas elevadas e projetos especiais.",
  },
  {
    title: "Atendimento nacional",
    text: "Atendemos São Paulo e projetos em outras regiões mediante orçamento, logística e planejamento de execução.",
  },
  {
    title: "Equipe e parceiros",
    text: "Estrutura preparada para montar equipe conforme o porte do projeto, mantendo padrão de entrega e responsabilidade.",
  },
  {
    title: "Foco em contratos maiores",
    text: "Atuação voltada para empresas que precisam de qualidade, previsibilidade, segurança e acabamento de alto padrão.",
  },
];

export default function Differentials() {
  return (
    <section className="bg-[#050505] px-6 py-24 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-500">
            Diferenciais
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
            Estrutura para executar projetos visuais com padrão corporativo.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            A Arantes Instalações Visuais atua para empresas que precisam de execução
            confiável, acabamento técnico e capacidade para projetos de maior porte.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:border-blue-500/60 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}