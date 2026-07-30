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
- solicitações do formulário passam pela rota server-side `/api/leads`;
- o WhatsApp permanece disponível como fallback explícito;
- a integração exige, somente no servidor,
  `ARANTES_OS_PUBLIC_LEADS_URL`, `ARANTES_OS_INTEGRATION_KEY` e
  `ARANTES_OS_HMAC_SECRET`;
- a ativação em produção permanece bloqueada até a PR `arantes-os#14` estar
  integrada e publicada, a credencial existir no Vault e na Vercel e um lead
  real ser confirmado no tenant correto.
