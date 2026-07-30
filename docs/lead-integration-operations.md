# Operação da integração de leads

## Configuração canônica

- endpoint: `https://www.arantesos.com.br/api/public/leads`;
- projeto Vercel: `arantes-instalacoes-visuais-yae1`;
- domínio de produção: `https://arantesvisual.com.br`;
- variáveis exclusivamente server-side:
  `ARANTES_OS_PUBLIC_LEADS_URL`, `ARANTES_OS_INTEGRATION_KEY` e
  `ARANTES_OS_HMAC_SECRET`;
- ambientes configurados: Preview e Production.

Os valores da chave de integração e do segredo HMAC não pertencem ao
repositório, ao bundle do navegador, ao HTML, aos logs ou ao analytics. O
segredo correspondente permanece no Supabase Vault.

## Homologação

Em 30 de julho de 2026, uma submissão real claramente marcada como teste foi
executada no preview. O Arantes OS confirmou:

- ingestão concluída no tenant esperado;
- origem `website`, landing page e UTMs persistidas;
- consentimento de privacidade e marketing persistido com a versão da política;
- cliente e lead reconciliados, com responsabilidade da Aline;
- replay da mesma chave retornando `200`;
- nenhum cliente ou lead duplicado.

O Production Gate aprovou auditoria de dependências, lint, typecheck, testes
unitários, E2E, build e inspeção do bundle.

## Rotação

1. provisionar uma nova integração `site_leads` para o mesmo tenant;
2. armazenar o novo segredo somente no Supabase Vault;
3. atualizar a chave e o segredo criptografados em Preview;
4. publicar um preview e validar criação, replay e tenant;
5. atualizar as mesmas variáveis em Production e promover o deployment;
6. revogar a integração anterior somente após a validação em produção.

Nunca registrar, copiar para documentação ou prefixar com `NEXT_PUBLIC_` a
chave ou o segredo.

## Fallback

Falhas de autenticação, conflito, validação, rate limit, indisponibilidade ou
timeout mantêm o formulário em estado de erro e apresentam o link explícito do
WhatsApp. Nenhum evento `lead_conversion` é emitido nesse caminho. O operador
deve consultar a auditoria do endpoint pelo `correlation_id`, sem registrar
dados pessoais ou credenciais.

## Rollback

1. promover no mesmo projeto Vercel o deployment de produção anterior;
2. manter o WhatsApp disponível durante a reversão;
3. não excluir ingestões, clientes, leads ou auditorias já persistidos;
4. restaurar as variáveis anteriores apenas se a integração correspondente
   continuar ativa e não revogada;
5. repetir uma submissão de homologação e o replay antes de encerrar o
   incidente.
