"use client";

import { useEffect, useState } from "react";

const phone = "5511932072394";

const whatsapp = `https://wa.me/${phone}?text=${encodeURIComponent(
  "Olá! Vim pelo site da Arantes Visual e quero solicitar um orçamento."
)}`;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "whatsapp_click", {
        button_location: "floating",
      });
    }
  };

  return (
    <a
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Solicitar orçamento"
      onClick={handleClick}
      className={`fixed bottom-6 right-5 z-[60] flex items-center gap-3 rounded-full border border-blue-400/30 bg-blue-600 px-5 py-4 text-sm font-black text-white shadow-2xl shadow-blue-600/40 transition-all duration-500 hover:scale-105 hover:bg-blue-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-20 opacity-0"
      }`}
    >
      <span className="h-3 w-3 rounded-full bg-green-400"></span>
      Orçamento
    </a>
  );
}