"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const items = [
  { type: "image", src: "/images/portfolio1.jpg", category: "Estandes", title: "Vitamedic" },
  { type: "image", src: "/images/portfolio2.jpg", category: "Eventos", title: "MIT LOG" },
  { type: "video", src: "/videos/video1.mp4", category: "Execução", title: "Projeto em movimento" },

  { type: "image", src: "/images/portfolio3.jpg", category: "Estandes", title: "Grupo Alonso" },
  { type: "image", src: "/images/portfolio4.jpg", category: "Corporativo", title: "Vésper" },
  { type: "video", src: "/videos/video2.mp4", category: "Bastidores", title: "Instalação técnica" },

  { type: "image", src: "/images/portfolio5.jpg", category: "Letras caixa", title: "Sunrain" },
  { type: "image", src: "/images/portfolio6.jpg", category: "Eventos", title: "Principia" },
  { type: "video", src: "/videos/video3.mp4", category: "Altura", title: "Trabalho em altura" },

  { type: "image", src: "/images/portfolio7.jpg", category: "Comunicação visual", title: "Amplacil" },
  { type: "video", src: "/videos/video4.mp4", category: "Processo", title: "Montagem e acabamento" },

  { type: "image", src: "/images/portfolio8.jpg", category: "Acesso por corda", title: "Instalação em altura" },
  { type: "image", src: "/images/portfolio9.jpg", category: "PDV", title: "Neston" },
  { type: "video", src: "/videos/video5.mp4", category: "Eventos", title: "Execução em feira" },

  { type: "image", src: "/images/portfolio10.jpg", category: "Adesivação", title: "Cachaça 51" },
  { type: "image", src: "/images/portfolio11.jpg", category: "Corporativo", title: "Grupo Yamam" },
  { type: "video", src: "/videos/video6.mp4", category: "Bastidores", title: "Instalação visual" },

  { type: "image", src: "/images/portfolio12.jpg", category: "Letras caixa", title: "Amplacil" },
  { type: "image", src: "/images/portfolio13.jpg", category: "Evento", title: "Convention Center" },
  { type: "video", src: "/videos/video7.mp4", category: "Showreel", title: "Projetos Arantes Visual" },
];

export default function Portfolio() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  const current = active !== null ? items[active] : null;

  return (
    <section id="portfolio" className="bg-black px-6 py-24 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <span className="rounded-full border border-blue-500/50 bg-blue-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.35em] text-blue-400">
            Portfólio
          </span>

          <h2 className="mt-8 text-4xl font-black leading-tight md:text-6xl">
            Projetos que executamos para empresas e grandes marcas.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl md:leading-9">
            Da instalação de fachadas corporativas ao trabalho em altura com
            acesso por corda, cada projeto representa segurança, precisão e
            acabamento de alto padrão.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              onClick={() => setActive(index)}
              className={`group overflow-hidden rounded-[32px] border border-white/10 bg-zinc-950 text-left transition duration-500 hover:-translate-y-2 hover:border-blue-500/80 ${
                index === 0 || index === 1 || index === 6
                  ? "xl:col-span-2"
                  : ""
              }`}
            >
              <div className="relative h-[360px] overflow-hidden bg-zinc-900 md:h-[420px]">
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                ) : (
                  <video
                    src={item.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {item.type === "video" && (
                  <div className="absolute left-6 top-6 rounded-full bg-blue-600 px-4 py-2 text-xs font-black uppercase tracking-widest text-white">
                    Vídeo
                  </div>
                )}
              </div>

              <div className="p-7 md:p-8">
                <span className="text-xs font-black uppercase tracking-[0.28em] text-blue-400">
                  {item.category}
                </span>

                <h3 className="mt-4 text-2xl font-black md:text-3xl">
                  {item.title}
                </h3>

                <p className="mt-5 text-base leading-8 text-zinc-400">
                  Clique para visualizar em tela cheia.
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4">
          <button
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 z-[110] rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xl font-black text-white"
          >
            ×
          </button>

          <button
            onClick={() =>
              setActive((prev) =>
                prev === null ? null : prev === 0 ? items.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 z-[110] hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/10 px-5 py-4 text-3xl md:block"
          >
            ‹
          </button>

          <button
            onClick={() =>
              setActive((prev) =>
                prev === null ? null : prev === items.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-4 top-1/2 z-[110] hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/10 px-5 py-4 text-3xl md:block"
          >
            ›
          </button>

          <div className="w-full max-w-6xl">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950">
              {current.type === "image" ? (
                <div className="relative h-[70vh] w-full">
                  <Image
                    src={current.src}
                    alt={current.title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
              ) : (
                <video
                  src={current.src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[75vh] w-full bg-black object-contain"
                />
              )}

              <div className="border-t border-white/10 p-5">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-400">
                  {current.category}
                </p>
                <h3 className="mt-2 text-2xl font-black">{current.title}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}