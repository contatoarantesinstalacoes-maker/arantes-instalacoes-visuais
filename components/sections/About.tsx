export default function About() {
  return (
    <section className="bg-zinc-950 px-6 py-24 md:px-16">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-500">
            Quem somos
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
            Execução técnica para marcas que precisam de acabamento profissional.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-300">
            A Arantes Instalações Visuais nasceu da experiência prática em grandes
            projetos de comunicação visual, feiras, eventos, fachadas, adesivação,
            letras caixa, ACM e trabalhos em altura.
          </p>

          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Nosso foco é entregar instalações com organização, segurança,
            alinhamento e acabamento. Cada detalhe importa, porque a comunicação
            visual representa a imagem da empresa do cliente.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <h3 className="text-2xl font-bold">Experiência em projetos de alto padrão</h3>

          <ul className="mt-6 space-y-4 text-zinc-300">
            <li>✓ Feiras e eventos corporativos</li>
            <li>✓ Fachadas comerciais</li>
            <li>✓ Letras caixa e ACM</li>
            <li>✓ Adesivação de grandes formatos</li>
            <li>✓ Trabalho em altura</li>
            <li>✓ Atendimento local e nacional sob consulta</li>
          </ul>
        </div>
      </div>
    </section>
  );
}