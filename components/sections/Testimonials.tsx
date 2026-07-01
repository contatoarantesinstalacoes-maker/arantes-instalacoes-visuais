const testimonials = [
  {
    name: "Cliente corporativo",
    text: "Execução muito bem feita, com atenção ao acabamento e cumprimento do prazo combinado.",
  },
  {
    name: "Projeto de evento",
    text: "Equipe organizada, técnica e preparada para resolver a instalação com segurança.",
  },
  {
    name: "Instalação comercial",
    text: "Ótimo padrão de acabamento e cuidado nos detalhes da comunicação visual.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#050505] px-6 py-24 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="rounded-full border border-blue-500/50 bg-blue-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.32em] text-blue-400">
            Depoimentos
          </span>

          <h2 className="mt-8 text-4xl font-black leading-tight text-white md:text-6xl">
            Confiança construída em cada entrega.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-[32px] border border-white/10 bg-zinc-950 p-8"
            >
              <div className="text-2xl text-blue-500">★★★★★</div>

              <p className="mt-6 text-lg leading-8 text-zinc-300">
                “{item.text}”
              </p>

              <p className="mt-8 font-black text-white">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}