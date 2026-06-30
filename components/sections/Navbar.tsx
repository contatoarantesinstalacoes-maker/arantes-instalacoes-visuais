"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Sobre", href: "#about" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Processo", href: "#processo" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <a href="/" className="text-xl font-black tracking-wide">
          <span className="text-white">ARANTES</span>{" "}
          <span className="text-blue-500">VISUAL</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-zinc-300 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="https://wa.me/5511932072394"
          className="hidden rounded-full bg-blue-600 px-6 py-3 text-sm font-bold transition hover:bg-blue-500 lg:block"
        >
          Solicitar orçamento
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="text-3xl text-white lg:hidden"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black lg:hidden">
          <div className="flex flex-col p-6">
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 text-zinc-300"
              >
                {item.label}
              </a>
            ))}

            <a
              href="https://wa.me/5511932072394"
              className="mt-6 rounded-full bg-blue-600 px-6 py-4 text-center font-bold"
            >
              Solicitar orçamento
            </a>
          </div>
        </div>
      )}
    </header>
  );
}