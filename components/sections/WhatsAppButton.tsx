const phone = "5511932072394";

const whatsapp = `https://wa.me/${phone}?text=${encodeURIComponent(
  "Olá! Vim pelo site da Arantes Visual e quero solicitar um orçamento."
)}`;

export default function WhatsAppButton() {
  return (
    <a
      href={whatsapp}
      target="_blank"
      aria-label="Solicitar orçamento pelo WhatsApp"
      className="fixed bottom-24 right-5 z-[60] flex items-center gap-3 rounded-full border border-blue-400/30 bg-blue-600 px-5 py-4 text-sm font-black text-white shadow-2xl shadow-blue-600/40 transition hover:scale-105 hover:bg-blue-500 md:bottom-6"
    >
      <span className="flex h-3 w-3 rounded-full bg-green-400 shadow-lg shadow-green-400/60" />
      Orçamento
    </a>
  );
}