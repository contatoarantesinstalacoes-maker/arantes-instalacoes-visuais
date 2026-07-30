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

## Evidências da unidade A.4

- todos os CTAs de orçamento levam ao formulário integrado e o WhatsApp
  permanece disponível como fallback;
- `/api/leads` é uma rota Node.js server-side e nenhuma credencial usa prefixo
  `NEXT_PUBLIC_`;
- o tenant não faz parte do contrato aceito pelo site e continua sendo
  resolvido exclusivamente pela integração no Arantes OS;
- o payload é normalizado, serializado uma única vez e assinado com HMAC
  SHA-256 sobre os bytes exatos;
- timestamp, assinatura, corpo e chave idempotente permanecem idênticos nos
  retries limitados a `429` e `503`;
- origem `website`, landing page, UTMs e consentimento versionado são
  persistidos no contrato enviado;
- nenhum log contém credencial, assinatura, corpo integral ou dado pessoal;
- eventos de conversão de lead só entram no `dataLayer` após consentimento e
  confirmação `200` ou `201`;
- testes unitários cobrem contrato, HMAC, idempotência, timeout e respostas da
  dependência; Playwright cobre formulário, fallback, consentimento, UTMs,
  acessibilidade e viewports.

## Evidências da unidade A.2

- o GTM só é renderizado depois de consentimento explícito;
- recusa e reabertura de preferências permanecem disponíveis;
- imagens públicas são redimensionadas e regravadas sem EXIF/GPS;
- vídeos do portfólio são entregues em H.264 e sem preload antecipado;
- o hero móvel usa imagem otimizada e não solicita vídeo de fundo.
- cache explícito de 24 horas com `stale-while-revalidate` de sete dias para
  imagens e vídeos;
- Lighthouse local de produção após A.2: 580 KiB transferidos, TBT de 1.400 ms,
  boas práticas 100 e SEO 100. O score sintético de performance foi 60 e não é
  comparável diretamente ao baseline remoto por usar ambiente diferente.

## Evidências da unidade A.3

- diálogo do portfólio possui nome acessível, foco inicial e restaurado, trap de
  foco, fechamento por `Escape` e navegação por setas;
- menu móvel fecha por `Escape`;
- Open Graph usa imagem real 1200×630, e FAQ possui dados estruturados;
- todo CTA de WhatsApp e abertura de portfólio envia evento pelo `dataLayer`;
- contraste do rodapé foi corrigido e o ano deixou de ser fixo;
- sitemap não publica data artificial a cada build;
- cinco componentes e uma dependência sem uso foram removidos;
- regressão automatizada usa Axe, teclado, desktop e mobile.
- Content Security Policy restringe scripts, conexões, mídia, frames e
  formulários às origens necessárias.

## Limites

Não serão inventadas credenciais, IDs de publicidade, alegações comerciais,
endereço completo, política jurídica ou configuração externa do GTM. A A.4 não
pode ser integrada nem ativada até o endpoint do Arantes OS e a credencial da
integração estarem comprovadamente disponíveis.
