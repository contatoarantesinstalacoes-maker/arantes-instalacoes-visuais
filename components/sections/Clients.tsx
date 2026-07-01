const clients = [
  "VITAMEDIC",
  "MIT LOG",
  "SUNRAIN",
  "GRUPO ALONSO",
  "VÉSPER",
  "PRINCIPIA",
  "YAMAM",
  "BIRKENSTOCK",
  "NESTON",
  "CACHAÇA 51",
];

export default function Clients() {
  return (
    <section className="border-y border-white/5 bg-zinc-950 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <span className="mx-auto block w-fit rounded-full border border-blue-500/40 bg-blue-500/10 px-5 py-2 text-xs font-black uppercase tracking-[0.35em] text-blue-400">
          Credibilidade
        </span>

        <h2 className="mt-8 text-center text-4xl font-black text-white md:text-6xl">
          Empresas que confiaram na Arantes Visual
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-zinc-400">
          Participamos da execução de projetos para empresas, eventos,
          hospitais, indústrias, franquias e grandes marcas, sempre mantendo
          alto padrão de qualidade e segurança.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-5">
          {clients.map((client) => (
            <div
              key={client}
              className="flex h-24 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-500/10"
            >
              <span className="px-3 text-center text-sm font-black tracking-[0.18em] text-zinc-200 md:text-base">
                {client}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-[30px] border border-white/10 bg-white/[0.03] p-8 text-center">

          <h3 className="text-2xl font-black md:text-3xl">
            Segurança, organização e acabamento profissional.
          </h3>

          <p className="mx-auto mt-5 max-w-3xl text-zinc-400">
            Cada instalação é executada com planejamento, equipamentos
            adequados e foco total na qualidade da entrega, seja em ambientes
            corporativos, centros de convenções, fachadas comerciais ou
            trabalhos em altura.
          </p>

        </div>

      </div>
    </section>
  );
}