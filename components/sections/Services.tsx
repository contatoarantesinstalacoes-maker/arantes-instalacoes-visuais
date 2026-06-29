const services = [
  "Fachadas comerciais",
  "Letras caixa",
  "ACM",
  "Adesivos",
  "Lonas",
  "Painéis e totens",
];

export default function Services() {
  return (
    <section id="servicos" className="bg-[#050505] px-6 py-20 md:px-16">
        <h2 className="text-3xl font-black md:text-5xl">Serviços principais</h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-blue-500/60 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-bold">{service}</h3>
              <p className="mt-4 text-sm leading-7 text-zinc-400">
                Instalação técnica com foco em alinhamento, fixação, acabamento
                profissional e valorização da marca.
              </p>
            </div>
          ))}
        </div>
      </section>  
      );
}