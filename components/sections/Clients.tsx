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
    <section className="border-y border-white/5 bg-zinc-950 py-14">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs font-black uppercase tracking-[0.35em] text-blue-400">
          Empresas e projetos executados
        </p>

        <h2 className="mt-4 text-center text-3xl font-black text-white md:text-5xl">
          Experiência em grandes marcas e projetos corporativos
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-center text-zinc-400">
          Ao longo dos últimos anos participamos da instalação de projetos de
          comunicação visual para empresas, eventos, feiras e ambientes
          corporativos em diferentes regiões do Brasil.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
          {clients.map((client) => (
            <div
              key={client}
              className="flex h-24 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-blue-500 hover:bg-blue-500/10"
            >
              <span className="text-center text-sm font-black tracking-wider text-zinc-300 md:text-base">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}