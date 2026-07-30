# Arantes Instalações Visuais

Site institucional e de conversão da Arantes Instalações Visuais, publicado em
`https://arantesvisual.com.br`.

## Stack

- Next.js 16 com App Router;
- React 19;
- Tailwind CSS 4;
- Playwright e Axe para regressão E2E, responsiva e de acessibilidade.

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test:e2e
npm run build
npm run test:production-gate
```

O Production Gate executa auditoria de dependências, lint, typecheck, E2E e
build. O mesmo gate é obrigatório em pull requests e pushes para `main`.

## Analytics e privacidade

O Google Tag Manager só é carregado após consentimento explícito. Eventos de
conversão usam o `dataLayer` canônico definido em `lib/gtm.ts`. IDs de Google
Ads ou Meta Pixel não pertencem ao código e devem ser configurados no container
autorizado.

## Operação

- auditoria técnica: `docs/site-audit.md`;
- fila canônica: `docs/execution-queue.md`;
- leads atualmente entram pelo WhatsApp;
- a integração direta com o Arantes OS permanece bloqueada até existir contrato
  autenticado, endpoint, consentimento aprovado e ambiente de teste.
