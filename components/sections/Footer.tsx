const phone = "5511932072394";

const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
  "Olá! Quero solicitar um orçamento para instalação de comunicação visual."
)}`;

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030303] px-6 py-12 md:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-black">Arantes Instalações Visuais</h3>
          <p className="mt-3 max-w-xl text-zinc-400">
            Execução técnica em comunicação visual, fachadas, adesivação, ACM,
            letras caixa, eventos, estandes e trabalhos em altura.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-zinc-300 md:text-right">
          <a href={whatsappUrl} target="_blank" className="font-bold text-blue-400">
            WhatsApp: (11) 93207-2394
          </a>
          <span>São Paulo - SP</span>
          <span>Atendimento sob consulta para todo o Brasil</span>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-zinc-500">
        © 2026 Arantes Instalações Visuais. Todos os direitos reservados.
      </div>
    </footer>
  );
}