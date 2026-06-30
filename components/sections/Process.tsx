const steps = [
  {
    number: "01",
    title: "Análise Técnica",
    text: "Recebemos seu projeto, entendemos a necessidade da instalação e avaliamos acesso, materiais e complexidade.",
  },
  {
    number: "02",
    title: "Planejamento",
    text: "Definimos equipe, equipamentos, cronograma e estratégia para garantir uma execução segura e eficiente.",
  },
  {
    number: "03",
    title: "Execução",
    text: "Nossa equipe realiza a instalação com precisão, alinhamento, acabamento profissional e atenção aos detalhes.",
  },
  {
    number: "04",
    title: "Entrega",
    text: "Finalizamos o projeto, realizamos a conferência completa e entregamos tudo pronto para utilização.",
  },
];

export default function Process() {
  return (
    <section className="bg-[#080808] px-6 py-28 md:px-16">
      <div className="mx-auto max-w-7xl">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-blue-400">
            COMO TRABALHAMOS
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            Um processo simples, organizado e seguro.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-300">
            Cada projeto segue um fluxo de execução que garante qualidade,
            organização e segurança do início ao fim.
          </p>

        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {steps.map((step) => (

            <div
              key={step.number}
              className="group rounded-3xl border border-white/10 bg-zinc-950 p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500"
            >

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-black">
                {step.number}
              </div>

              <h3 className="mt-8 text-2xl font-black">
                {step.title}
              </h3>

              <p className="mt-5 leading-8 text-zinc-400">
                {step.text}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}