# Auditoria Técnica do Site

Data da baseline: 29 de julho de 2026.

## Estado verificado

- Next.js 16 App Router, React 19, Tailwind CSS 4 e uma única página estática;
- produção em `https://arantesvisual.com.br`;
- Lighthouse mobile inicial: performance 70, acessibilidade 96,
  boas práticas 77 e SEO 100;
- build e typecheck aprovados na baseline;
- lint com quatro erros;
- nenhuma suíte de testes, workflow ou formulário;
- captação limitada a links de WhatsApp, sem integração observável com o
  Arantes OS;
- GTM configurado, Google Analytics carregado pelo container; Google Ads e Meta
  Pixel não são comprováveis pelo repositório.

## Pendências comprovadas

| Severidade | Pendência | Evidência | Tratamento |
|---|---|---|---|
| crítica | dependências com vulnerabilidades altas | `npm audit`: Next.js, Sharp, PostCSS e brace-expansion | A.1 |
| crítica | leads não entram comprovadamente no Arantes OS | não há formulário, API, webhook ou contrato | bloqueada por contrato e credencial externos |
| alta | mídia pública preserva EXIF/GPS | inspeção dos JPEGs originais | A.2 |
| alta | sete vídeos HEVC somam aproximadamente 185 MB | arquivos públicos de 15–39 MB | A.2 |
| alta | imagem do portfólio retorna 404 em produção | código usa `.jpg`, arquivo era `.JPG` | A.1 |
| alta | analytics de conversão inconsistente | Hero usa `dataLayer`; demais CTAs dependiam de `window.gtag` ausente | A.1/A.3 |
| alta | marketing carrega antes de consentimento | GTM e GA são carregados imediatamente | A.2 |
| alta | não há gate automatizado | ausência de `.github/workflows` e testes | A.1 |
| alta | headers defensivos incompletos | produção só expunha HSTS da Vercel | A.1 |
| média | TBT móvel de 2.080 ms | Lighthouse; GTM/GA dominam CPU | A.2 |
| média | modal e menu têm lacunas de teclado e foco | inspeção de `Portfolio` e `Navbar` | A.3 |
| média | contraste insuficiente no rodapé | Lighthouse WCAG AA | A.3 |
| média | Open Graph declara dimensões diferentes do arquivo | metadata 1200×630 sobre JPEG 2448×3264 | A.3 |
| média | componentes mortos e README padrão | busca de imports e conteúdo do repositório | A.3 |
| média | Google Ads e Meta Pixel não são verificáveis | IDs/configuração ausentes do código | bloqueada por acesso ao container/IDs |
| média | política de privacidade não está publicada | não há rota ou documento aprovado | bloqueada por conteúdo jurídico |
| baixa | sitemap altera `lastModified` a cada build | `new Date()` em `app/sitemap.ts` | A.3 |
| baixa | ano do rodapé é fixo | conteúdo hardcoded | A.3 |

## Limites

Não serão inventados endpoint do Arantes OS, credenciais, IDs de publicidade,
alegações comerciais, endereço completo, política jurídica ou configuração
externa do GTM.
