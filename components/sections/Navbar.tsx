"use client";

import { trackWhatsAppClick } from "@/lib/gtm";
import Link from "next/link";
import { useEffect, useState } from "react";

const phone = "5511932072394";

const whatsapp = `https://wa.me/${phone}?text=${encodeURIComponent(
  "Olá! Vim pelo site da Arantes Visual e quero solicitar um orçamento."
)}`;

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
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/85 shadow-2xl shadow-black/40 backdrop-blur-xl"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
        <Link href="/" className="leading-none">
          <div className="text-lg font-black tracking-[0.18em] md:text-xl">
            <span className="text-white">ARANTES</span>
            <span className="text-blue-500"> VISUAL</span>
          </div>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
            Instalações Visuais
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-bold text-zinc-300 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={whatsapp}
          onClick={() => trackWhatsAppClick("navbar")}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-500 lg:block"
        >
          Solicitar orçamento
        </a>

        <button
          onClick={() => setOpen((current) => !current)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-2xl text-white lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-black/95 backdrop-blur-xl lg:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-6">
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-5 text-lg font-bold text-zinc-300"
              >
                {item.label}
              </a>
            ))}

            <a
              href={whatsapp}
              onClick={() => trackWhatsAppClick("navbar_mobile")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 rounded-full bg-blue-600 px-6 py-5 text-center text-lg font-black text-white"
            >
              Solicitar orçamento
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
