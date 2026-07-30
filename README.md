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
npm run test:unit
npm run test:e2e
npm run build
npm run test:bundle
npm run test:production-gate
```

O Production Gate executa auditoria de dependências, lint, typecheck, testes
unitários, E2E, build e inspeção do bundle do navegador. O mesmo gate é
obrigatório em pull requests e pushes para `main`.

## Analytics e privacidade

O Google Tag Manager só é carregado após consentimento explícito. Eventos de
conversão usam o `dataLayer` canônico definido em `lib/gtm.ts`. IDs de Google
Ads ou Meta Pixel não pertencem ao código e devem ser configurados no container
autorizado.

## Operação

- auditoria técnica: `docs/site-audit.md`;
- fila canônica: `docs/execution-queue.md`;
- operação da integração de leads: `docs/lead-integration-operations.md`;
- solicitações do formulário passam pela rota server-side `/api/leads`;
- o WhatsApp permanece disponível como fallback explícito;
- a integração exige, somente no servidor,
  `ARANTES_OS_PUBLIC_LEADS_URL`, `ARANTES_OS_INTEGRATION_KEY` e
  `ARANTES_OS_HMAC_SECRET`;
- as três variáveis estão configuradas como segredos criptografados nos
  ambientes Preview e Production do projeto Vercel
  `arantes-instalacoes-visuais-yae1`;
- a integração foi homologada no preview em 30 de julho de 2026 com criação
  real, reconciliação no tenant correto e replay idempotente sem duplicar
  cliente ou lead.
