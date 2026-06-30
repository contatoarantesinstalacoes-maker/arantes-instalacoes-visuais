"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const projects = [
  {
    image: "/images/portfolio1.jpg",
    category: "Trabalho em altura",
    title: "Instalação em fachada corporativa",
    description:
      "Execução técnica utilizando acesso por cordas com total segurança e acabamento profissional.",
  },
  {
    image: "/images/portfolio2.jpg",
    category: "Letras Caixa",
    title: "Comunicação visual corporativa",
    description:
      "Instalação precisa para empresas que exigem qualidade e durabilidade.",
  },
  {
    image: "/images/portfolio3.jpg",
    category: "ACM",
    title: "Revestimento de fachada",
    description:
      "Projetos executados com alinhamento, acabamento e padrão profissional.",
  },
  {
    image: "/images/portfolio4.jpg",
    category: "Eventos",
    title: "Montagem de comunicação visual",
    description:
      "Painéis, estruturas e instalações para eventos corporativos.",
  },
  {
    image: "/images/portfolio5.jpg",
    category: "Fachadas",
    title: "Execução completa",
    description:
      "Projetos desenvolvidos para fortalecer a identidade visual das empresas.",
  },
  {
    image: "/images/portfolio6.jpg",
    category: "Projetos especiais",
    title: "Grandes instalações",
    description:
      "Execuções em ambientes corporativos e projetos de alta complexidade.",
  },
];

const slides = projects.map((project) => ({
  src: project.image,
  title: project.title,
  description: project.description,
}));

export default function Portfolio() {
  const [index, setIndex] = useState(-1);

  return (
    <section id="portfolio" className="bg-[#050505] px-6 py-28 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-blue-400">
            PORTFÓLIO
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            Projetos executados para empresas e grandes marcas.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-300">
            Toque em qualquer imagem para visualizar em tela cheia. Cada
            instalação representa nosso compromisso com segurança, organização e
            acabamento profissional.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, projectIndex) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-[32px] border border-white/10 bg-zinc-950 transition duration-500 hover:-translate-y-2 hover:border-blue-500"
            >
              <button
                type="button"
                onClick={() => setIndex(projectIndex)}
                className="block w-full overflow-hidden text-left"
                aria-label={`Abrir imagem do projeto ${project.title}`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={900}
                  height={700}
                  className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </button>

              <div className="p-7">
                <span className="text-sm font-bold uppercase tracking-[0.22em] text-blue-400">
                  {project.category}
                </span>

                <h3 className="mt-4 text-2xl font-black">{project.title}</h3>

                <p className="mt-5 leading-8 text-zinc-400">
                  {project.description}
                </p>

                <a
                  href="https://wa.me/5511932072394"
                  className="mt-8 inline-flex font-bold text-blue-400 transition hover:text-blue-300"
                >
                  Solicitar orçamento →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
      />
    </section>
  );
}