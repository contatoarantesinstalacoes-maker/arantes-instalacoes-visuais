const clients = [
  "Dermadream",
  "Embale",
  "Grupo Yamam",
  "Grupo Gran",
  "Nexti",
  "Senac",
  "Baumer",
  "Copra",
  "Poliresinas",
  "Video Systems",
  "Digimed",
  "Camarote Bar Brahma",
];

export default function Clients() {
  return (
    <section className="bg-[#080808] py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <p className="uppercase tracking-[0.35em] text-blue-500 text-sm font-bold">
            EXPERIÊNCIA COMPROVADA
          </p>

          <h2 className="mt-6 text-4xl md:text-6xl font-black">
            Projetos executados para
            <br />
            empresas de diversos segmentos.
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg text-zinc-400 leading-8">
            Ao longo da nossa trajetória participamos da execução de projetos
            para indústrias, hospitais, instituições de ensino, eventos,
            estandes, centros corporativos e grandes marcas.
          </p>

        </div>

        <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">

          {clients.map((client) => (

            <div
              key={client}
              className="flex h-28 items-center justify-center rounded-3xl border border-white/10 bg-zinc-900 transition duration-300 hover:border-blue-500 hover:-translate-y-1"
            >
              <span className="text-center text-lg font-semibold text-zinc-200">
                {client}
              </span>
            </div>

          ))}

        </div>

      </div>

    </section>
  );
}