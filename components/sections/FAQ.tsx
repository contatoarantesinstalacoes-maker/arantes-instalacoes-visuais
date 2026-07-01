const faqs = [
  {
    question: "Vocês atendem fora de São Paulo?",
    answer:
      "Sim. Atendemos projetos em outras regiões mediante análise de logística, prazo e escopo.",
  },
  {
    question: "Vocês fazem instalação em altura?",
    answer:
      "Sim. Trabalhamos com acesso por cordas para fachadas, estruturas elevadas e locais de difícil acesso.",
  },
  {
    question: "Vocês atendem empresas e grandes projetos?",
    answer:
      "Sim. Atuamos com empresas, indústrias, hospitais, franquias, eventos, estandes e projetos corporativos.",
  },
  {
    question: "Como solicitar orçamento?",
    answer:
      "Basta chamar pelo WhatsApp, enviar fotos, medidas, local da instalação e detalhes do projeto.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-black px-6 py-24 md:px-16">
      <div className="mx-auto max-w-5xl">
        <span className="rounded-full border border-blue-500/50 bg-blue-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.32em] text-blue-400">
          Perguntas Frequentes
        </span>

        <h2 className="mt-8 text-4xl font-black leading-tight text-white md:text-6xl">
          Dúvidas comuns antes de solicitar um orçamento.
        </h2>

        <div className="mt-14 space-y-5">
          {faqs.map((item) => (
            <div
              key={item.question}
              className="rounded-[28px] border border-white/10 bg-zinc-950 p-7"
            >
              <h3 className="text-xl font-black text-white">
                {item.question}
              </h3>

              <p className="mt-4 leading-8 text-zinc-400">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}