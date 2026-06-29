import Image from "next/image";

const projects = [
  {
    image: "/images/portfolio1.jpg",
    title: "Comunicação Visual Corporativa",
    category: "Empresas",
  },
  {
    image: "/images/portfolio2.jpg",
    title: "Projetos em Altura",
    category: "IRATA",
  },
  {
    image: "/images/portfolio3.jpg",
    title: "Eventos e Estandes",
    category: "Eventos",
  },
  {
    image: "/images/portfolio4.jpg",
    title: "Fachadas Comerciais",
    category: "Fachadas",
  },
  {
    image: "/images/portfolio5.jpg",
    title: "Letras Caixa e ACM",
    category: "Comunicação Visual",
  },
  {
    image: "/images/portfolio6.jpg",
    title: "Projetos Especiais",
    category: "Execução",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-black py-32 px-6 md:px-12">

      <div className="mx-auto max-w-7xl">

        <div className="mb-20">

          <p className="text-sm font-bold uppercase tracking-[0.35em] text-blue-500">
            PORTFÓLIO
          </p>

          <h2 className="mt-6 max-w-4xl text-5xl font-black leading-tight md:text-6xl">
            Projetos executados para empresas, eventos e grandes marcas.
          </h2>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-400">
            Cada projeto representa nosso compromisso com execução técnica,
            segurança, acabamento e organização.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          {projects.map((project) => (

            <div
              key={project.image}
              className="group overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0b0b]"
            >

              <div className="overflow-hidden">

                <Image
                  src={project.image}
                  alt={project.title}
                  width={1200}
                  height={900}
                  unoptimized
                  className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
                />

              </div>

              <div className="p-8">

                <span className="text-sm uppercase tracking-[0.25em] text-blue-500">
                  {project.category}
                </span>

                <h3 className="mt-4 text-3xl font-black">
                  {project.title}
                </h3>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}