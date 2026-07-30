import assert from "node:assert/strict";
import { test } from "node:test";
import {
  PublicLeadConfigurationError,
  PublicLeadValidationError,
  createPublicLeadSignature,
  preparePublicLeadRequest,
  resolvePublicLeadClientConfig,
  sendPreparedPublicLead,
  validateSiteLeadSubmission,
  type PublicLeadClientConfig,
} from "../../lib/leads/public-lead-contract.ts";

const validInput = () => ({
  submission_id: "019f-site-submission",
  name: "  Maria   da Silva  ",
  phone: "(11) 99999-1234",
  email: " MARIA@EXAMPLE.COM ",
  city: " São Paulo ",
  service: "Fachadas Comerciais",
  message: "Preciso de uma fachada para minha empresa.",
  landing_page:
    "https://arantesvisual.com.br/?utm_source=google&utm_campaign=fachada#orcamento",
  utm: {
    source: "google",
    medium: "cpc",
    campaign: "fachada",
    term: null,
    content: null,
  },
  consent: {
    privacy: true,
    marketing: false,
    captured_at: new Date().toISOString(),
    policy_version: "lead-contact-v1",
  },
});

const config: PublicLeadClientConfig = {
  endpoint: "https://os.example.com/api/public/leads",
  integrationKey: "integration-key",
  hmacSecret: "hmac-secret",
};

test("valida, normaliza e prepara o contrato sem tenant", () => {
  const submission = validateSiteLeadSubmission(validInput());
  const prepared = preparePublicLeadRequest(submission);
  const payload = JSON.parse(prepared.body);

  assert.equal(submission.name, "Maria da Silva");
  assert.equal(submission.phone, "11999991234");
  assert.equal(submission.email, "maria@example.com");
  assert.equal(payload.source, "website");
  assert.equal(payload.empresa_id, undefined);
  assert.equal(payload.tenant_id, undefined);
  assert.equal(payload.submission_id, undefined);
  assert.equal(prepared.idempotencyKey, "site:019f-site-submission");
});

test("rejeita payload inválido e tentativa de escolha de tenant", () => {
  assert.throws(
    () =>
      validateSiteLeadSubmission({
        ...validInput(),
        empresa_id: "outro-tenant",
      }),
    PublicLeadValidationError,
  );

  assert.throws(
    () =>
      validateSiteLeadSubmission({
        ...validInput(),
        consent: { ...validInput().consent, privacy: false },
      }),
    PublicLeadValidationError,
  );
});

test("gera assinatura HMAC determinística sobre os bytes exatos", () => {
  const body = '{"name":"Maria","phone":"11999991234"}';
  const signature = createPublicLeadSignature(body, "secret");

  assert.equal(
    signature,
    "sha256=58b26bafc4ca82cde99e2c7c203a384586001050e2b68668c43c02c850d5a125",
  );
  assert.equal(createPublicLeadSignature(body, "secret"), signature);
  assert.notEqual(createPublicLeadSignature(`${body} `, "secret"), signature);
});

test("falha de forma segura quando faltam credenciais", () => {
  assert.throws(
    () => resolvePublicLeadClientConfig({}),
    PublicLeadConfigurationError,
  );
  assert.throws(
    () =>
      resolvePublicLeadClientConfig({
        ARANTES_OS_PUBLIC_LEADS_URL: "https://os.example.com/api/public/leads",
        ARANTES_OS_INTEGRATION_KEY: "key",
      }),
    PublicLeadConfigurationError,
  );
});

test("aceita criação 201 e replay idempotente 200", async () => {
  const prepared = preparePublicLeadRequest(
    validateSiteLeadSubmission(validInput()),
  );

  for (const [status, replayed] of [
    [201, false],
    [200, true],
  ] as const) {
    const result = await sendPreparedPublicLead(prepared, config, {
      fetchImpl: async () => new Response(null, { status }),
      now: () => 1_700_000_000_000,
    });

    assert.deepEqual(result, { status, ok: true, replayed });
  }
});

test("não repete respostas 401, 409 ou 422", async () => {
  const prepared = preparePublicLeadRequest(
    validateSiteLeadSubmission(validInput()),
  );

  for (const status of [401, 409, 422]) {
    let calls = 0;
    const result = await sendPreparedPublicLead(prepared, config, {
      fetchImpl: async () => {
        calls += 1;
        return new Response(null, { status });
      },
    });

    assert.equal(result.status, status);
    assert.equal(result.ok, false);
    assert.equal(calls, 1);
  }
});

test("repete somente 429 e 503 com corpo, chave e assinatura idênticos", async () => {
  const prepared = preparePublicLeadRequest(
    validateSiteLeadSubmission(validInput()),
  );
  const requests: Array<{
    body: BodyInit | null | undefined;
    headers: HeadersInit | undefined;
  }> = [];
  const statuses = [429, 503, 201];

  const result = await sendPreparedPublicLead(prepared, config, {
    fetchImpl: async (_url, init) => {
      requests.push({ body: init?.body, headers: init?.headers });
      return new Response(null, {
        status: statuses.shift(),
        headers: { "Retry-After": "0" },
      });
    },
    sleep: async () => undefined,
    now: () => 1_700_000_000_000,
  });

  assert.equal(result.status, 201);
  assert.equal(requests.length, 3);
  assert.deepEqual(
    requests.map((request) => request.body),
    [prepared.body, prepared.body, prepared.body],
  );

  const normalizedHeaders = requests.map((request) =>
    JSON.stringify(request.headers),
  );
  assert.equal(new Set(normalizedHeaders).size, 1);
  assert.match(
    normalizedHeaders[0],
    /X-Arantes-Idempotency-Key.*site:019f-site-submission/,
  );
});

test("limita retries de 429 e 503", async () => {
  const prepared = preparePublicLeadRequest(
    validateSiteLeadSubmission(validInput()),
  );
  let calls = 0;

  const result = await sendPreparedPublicLead(prepared, config, {
    fetchImpl: async () => {
      calls += 1;
      return new Response(null, { status: 503 });
    },
    sleep: async () => undefined,
  });

  assert.equal(result.status, 503);
  assert.equal(calls, 3);
});

test("timeout aborta a dependência sem retry silencioso", async () => {
  const prepared = preparePublicLeadRequest(
    validateSiteLeadSubmission(validInput()),
  );
  let calls = 0;

  await assert.rejects(
    sendPreparedPublicLead(prepared, config, {
      timeoutMs: 5,
      fetchImpl: async (_url, init) => {
        calls += 1;
        return new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(new DOMException("aborted", "AbortError"));
          });
        });
      },
    }),
    { name: "AbortError" },
  );
  assert.equal(calls, 1);
});
