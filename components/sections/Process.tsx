const steps = [
  {
    number: "01",
    title: "Análise do projeto",
    text: "Entendemos o local, medidas, materiais, prazo e nível de complexidade da instalação.",
  },
  {
    number: "02",
    title: "Planejamento técnico",
    text: "Definimos equipe, acesso, segurança, ferramentas e melhor forma de execução.",
  },
  {
    number: "03",
    title: "Execução profissional",
    text: "Instalação com alinhamento, acabamento, segurança e atenção aos detalhes.",
  },
  {
    number: "04",
    title: "Entrega final",
    text: "Conferência do resultado, limpeza do local e validação com o cliente.",
  },
];

export default function Process() {
  return (
    <section className="bg-[#050505] px-6 py-28 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-500">
            PROCESSO
          </p>

          <h2 className="mt-5 text-4xl font-black md:text-5xl">
            Da análise à entrega final.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Cada projeto é conduzido com planejamento, segurança e foco em
            acabamento profissional.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"
            >
              <span className="text-4xl font-black text-blue-500">
                {step.number}
              </span>

              <h3 className="mt-8 text-xl font-bold">{step.title}</h3>

              <p className="mt-4 leading-7 text-zinc-400">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}