# Execution Queue do Site

| Ordem | Unidade | Estado | Critério |
|---:|---|---|---|
| 1 | A.1 — segurança, integridade e gate de qualidade | concluída na PR #1 | zero vulnerabilidade alta, lint/typecheck/build/testes verdes, imagem válida e headers defensivos |
| 2 | A.2 — privacidade e entrega de mídia | concluída na PR #2 | EXIF removido, mídia compatível e reduzida, consentimento antes de analytics, performance medida |
| 3 | A.3 — acessibilidade, SEO técnico e conversão | concluída na PR #3 | modal/menu acessíveis, OG correto, tracking uniforme, código morto removido e regressão E2E |
| 4 | A.4 — integração de leads com Arantes OS | implementada em draft; ativação bloqueada externamente | cliente server-side, HMAC, idempotência, consentimento, fallback e testes concluídos; merge requer `arantes-os#14` integrada/publicada, Vault, Vercel e lead real no tenant correto |
| 5 | Google Ads e Meta Pixel | bloqueada externamente | requer IDs, acesso ao container GTM e definição de consentimento/conversões |
| 6 | política de privacidade | bloqueada por conteúdo jurídico | requer texto e controlador/finalidades aprovados |

A implementação local da A.4 está concluída. A integração real permanece
bloqueada pelas dependências externas registradas no critério da unidade.
