const clients = [
  "Senac",
  "Baumer",
  "Dermadream",
  "Camarote Bar Brahma",
  "51 Ice",
  "Proaloe",
  "Grupo Yamam",
  "Embale",
  "Digimed",
  "Copra",
  "Poliresinas",
  "Video Systems",
];

export default function Clients() {
  return (
    <section className="bg-black px-6 py-28 md:px-16">
      <div className="mx-auto max-w-7xl">

        <div className="text-center">

          <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-blue-400">
            EMPRESAS ATENDIDAS
          </span>

          <h2 className="mt-6 text-4xl font-black md:text-6xl">
            Experiência em projetos para grandes empresas.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
            Ao longo dos anos participamos de instalações para empresas,
            hospitais, indústrias, eventos corporativos e grandes marcas,
            sempre com foco em qualidade, segurança e acabamento.
          </p>

        </div>

        <div className="mt-20 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">

          {clients.map((client) => (

            <div
              key={client}
              className="group rounded-3xl border border-white/10 bg-zinc-950 p-8 text-center transition duration-300 hover:-translate-y-2 hover:border-blue-500"
            >
              <h3 className="text-lg font-bold text-zinc-300 transition group-hover:text-white">
                {client}
              </h3>
            </div>

          ))}

        </div>

      </div>
    </section>
  );
}