const numbers = [
  {
    value: "+200",
    label: "Projetos executados",
  },
  {
    value: "+50",
    label: "Empresas atendidas",
  },
  {
    value: "100%",
    label: "Compromisso com qualidade",
  },
  {
    value: "SP",
    label: "Atendimento em São Paulo",
  },
];

export default function Numbers() {
  return (
    <section className="bg-[#050505] px-6 py-20 md:px-16">
      <div className="grid gap-5 md:grid-cols-4">
        {numbers.map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center"
          >
            <p className="text-4xl font-black text-blue-500 md:text-5xl">
              {item.value}
            </p>

            <p className="mt-3 text-sm font-semibold text-zinc-300">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}