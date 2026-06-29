const phone = "5511932072394";

const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
  "Olá! Quero solicitar um orçamento para instalação de comunicação visual."
)}`;

export default function CTA() {
  return (
    <section className="bg-[#050505] px-6 py-28 md:px-16">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-blue-500/30 bg-gradient-to-br from-blue-600/30 to-[#080808] px-8 py-16 text-center md:px-16">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-400">
          Orçamento
        </p>

        <h2 className="mt-5 text-4xl font-black md:text-6xl">
          Precisa executar um projeto de comunicação visual?
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
          Atendemos empresas, eventos, estandes, fachadas, adesivação, letras caixa,
          ACM e instalações técnicas em altura.
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          className="mt-10 inline-flex rounded-full bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-500"
        >
          Solicitar orçamento pelo WhatsApp
        </a>
      </div>
    </section>
  );
}