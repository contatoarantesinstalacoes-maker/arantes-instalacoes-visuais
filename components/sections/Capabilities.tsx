const items = [
  {
    title: "Comunicação Visual",
    text: "Fachadas, ACM, letras caixa, adesivos, lonas, painéis, totens e projetos especiais."
  },
  {
    title: "Trabalhos em Altura",
    text: "Execução utilizando técnicas de acesso por cordas para locais de difícil acesso."
  },
  {
    title: "Eventos e Feiras",
    text: "Montagem de estandes, painéis, ambientações e comunicação para grandes eventos."
  },
  {
    title: "Atendimento Corporativo",
    text: "Execução para empresas, indústrias, construtoras, franquias e redes nacionais."
  },
  {
    title: "Cobertura Nacional",
    text: "Equipe preparada para atender projetos em todo o Brasil."
  },
  {
    title: "Execução Completa",
    text: "Do recebimento do projeto até a instalação final com acabamento profissional."
  },
];

export default function Capabilities() {
  return (
    <section className="bg-[#080808] py-28">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[0.3em] text-blue-500 text-sm font-bold">
            O QUE FAZEMOS
          </p>

          <h2 className="mt-5 text-5xl font-black">
            Estrutura para projetos de qualquer porte
          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {items.map((item) => (

            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-[#111] p-8"
            >
              <h3 className="text-2xl font-bold mb-5">
                {item.title}
              </h3>

              <p className="text-zinc-400 leading-7">
                {item.text}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}