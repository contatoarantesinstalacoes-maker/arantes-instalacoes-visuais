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
      className="fixed bottom-5 right-5 z-[60] flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-3xl shadow-2xl shadow-green-500/30 transition hover:scale-110"
    >
      ☎
    </a>
  );
}