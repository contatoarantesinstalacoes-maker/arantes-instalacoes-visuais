const differentials = [
  {
    title: "Equipe Especializada",
    text: "Profissionais experientes em instalação de comunicação visual e montagem técnica.",
  },
  {
    title: "Execução em Altura",
    text: "Projetos realizados com acesso por cordas (IRATA) para locais de difícil acesso.",
  },
  {
    title: "Acabamento Profissional",
    text: "Cada instalação é finalizada com alinhamento, limpeza e atenção aos detalhes.",
  },
  {
    title: "Atendimento Corporativo",
    text: "Experiência em projetos para empresas, indústrias, hospitais, feiras e grandes marcas.",
  },
  {
    title: "Cumprimento de Prazo",
    text: "Organização e planejamento para entregar cada projeto dentro do cronograma.",
  },
  {
    title: "Segurança em Primeiro Lugar",
    text: "Execução com equipamentos certificados e procedimentos voltados à segurança da equipe e do cliente.",
  },
];

export default function Differentials() {
  return (
    <section className="bg-black px-6 py-24 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="rounded-full border border-blue-500/50 bg-blue-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.32em] text-blue-400">
            Diferenciais
          </span>

          <h2 className="mt-8 text-4xl font-black text-white md:text-6xl">
            Por que escolher a Arantes Visual?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl">
            Mais do que instalar, entregamos confiança, organização,
            responsabilidade e acabamento de alto padrão.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {differentials.map((item) => (
            <div
              key={item.title}
              className="rounded-[30px] border border-white/10 bg-zinc-950 p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:bg-blue-500/10"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white">
                ✓
              </div>

              <h3 className="text-2xl font-black text-white">
                {item.title}
              </h3>

              <p className="mt-4 leading-8 text-zinc-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}