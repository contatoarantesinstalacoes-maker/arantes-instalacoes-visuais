const phone = "5511932072394";

const whatsapp = `https://wa.me/${phone}`;

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-20 md:px-16">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-4">

        <div className="lg:col-span-2">

          <h2 className="text-3xl font-black">
            Arantes Instalações Visuais
          </h2>

          <p className="mt-6 max-w-lg leading-8 text-zinc-400">
            Empresa especializada em instalações de comunicação visual,
            fachadas comerciais, ACM, letras caixa, adesivação, painéis,
            eventos corporativos e trabalhos em altura com acesso por cordas.
          </p>

          <a
            href={whatsapp}
            className="mt-8 inline-flex rounded-full bg-blue-600 px-8 py-4 font-bold transition hover:bg-blue-500"
          >
            Falar pelo WhatsApp
          </a>

        </div>

        <div>

          <h3 className="font-black uppercase tracking-widest text-white">
            Serviços
          </h3>

          <ul className="mt-6 space-y-4 text-zinc-400">

            <li>Fachadas Comerciais</li>

            <li>Letras Caixa</li>

            <li>Revestimento ACM</li>

            <li>Adesivação</li>

            <li>Painéis</li>

            <li>Eventos</li>

            <li>Trabalhos em Altura</li>

          </ul>

        </div>

        <div>

          <h3 className="font-black uppercase tracking-widest text-white">
            Contato
          </h3>

          <div className="mt-6 space-y-5 text-zinc-400">

            <p>São Paulo • SP</p>

            <p>Atendimento nacional sob consulta</p>

            <p>WhatsApp</p>

            <a
              href={whatsapp}
              className="font-bold text-blue-400 hover:text-blue-300"
            >
              (11) 93207-2394
            </a>

          </div>

        </div>

      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-zinc-500 md:flex-row">

        <p>
          © 2026 Arantes Instalações Visuais. Todos os direitos reservados.
        </p>

        <p>
          Desenvolvido para máxima performance e conversão.
        </p>

      </div>

    </footer>
  );
}