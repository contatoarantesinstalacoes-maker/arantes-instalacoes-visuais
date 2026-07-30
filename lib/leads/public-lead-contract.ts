import { createHmac } from "node:crypto";

export const PUBLIC_LEAD_TIMEOUT_MS = 7_000;
export const PUBLIC_LEAD_MAX_ATTEMPTS = 3;

const IDEMPOTENCY_PATTERN = /^[A-Za-z0-9._:-]{8,128}$/;
const INTEGRATION_KEY_PATTERN = /^[A-Za-z0-9._:-]{12,128}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SIGNATURE_PATTERN = /^sha256=[a-f0-9]{64}$/;
const UTM_KEYS = ["source", "medium", "campaign", "term", "content"] as const;

type UtmKey = (typeof UTM_KEYS)[number];

export type PublicLeadPayload = {
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  service: string | null;
  message: string;
  source: "website";
  landing_page: string;
  utm: Record<UtmKey, string | null>;
  consent: {
    privacy: true;
    marketing: boolean;
    captured_at: string;
    policy_version: string;
  };
};

export type SiteLeadSubmission = Omit<PublicLeadPayload, "source"> & {
  submission_id: string;
};

export type PreparedPublicLeadRequest = Readonly<{
  body: string;
  idempotencyKey: string;
}>;

export type PublicLeadClientConfig = Readonly<{
  endpoint: string;
  integrationKey: string;
  hmacSecret: string;
}>;

export type PublicLeadClientResult = {
  status: number;
  ok: boolean;
  replayed: boolean;
};

export class PublicLeadValidationError extends Error {}
export class PublicLeadConfigurationError extends Error {}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertExactKeys(
  value: Record<string, unknown>,
  keys: readonly string[],
  path: string,
) {
  const expected = new Set(keys);
  const unexpected = Object.keys(value).filter((key) => !expected.has(key));

  if (unexpected.length > 0) {
    throw new PublicLeadValidationError(
      `${path} contém campos não permitidos: ${unexpected.join(", ")}`,
    );
  }
}

function requiredString(
  value: unknown,
  field: string,
  min: number,
  max: number,
) {
  if (typeof value !== "string") {
    throw new PublicLeadValidationError(`${field} deve ser texto`);
  }

  const normalized = value.trim().replace(/\s+/g, " ");
  if (normalized.length < min || normalized.length > max) {
    throw new PublicLeadValidationError(
      `${field} deve ter entre ${min} e ${max} caracteres`,
    );
  }

  return normalized;
}

function optionalString(value: unknown, field: string, max: number) {
  if (value === null || value === undefined || value === "") return null;
  return requiredString(value, field, 1, max);
}

function normalizePhone(value: unknown) {
  const rawPhone = requiredString(value, "phone", 10, 30);
  const digits = rawPhone.replace(/\D/g, "");

  if (digits.length < 10 || digits.length > 15) {
    throw new PublicLeadValidationError("phone deve ter entre 10 e 15 dígitos");
  }

  if (rawPhone.startsWith("+")) return `+${digits}`;
  if (rawPhone.startsWith("00")) return `+${digits.slice(2)}`;
  if (digits.startsWith("55") && (digits.length === 12 || digits.length === 13)) {
    return digits;
  }
  if (digits.length === 10 || digits.length === 11) return digits;
  return `+${digits}`;
}

function normalizeEmail(value: unknown) {
  const email = optionalString(value, "email", 254);
  if (email === null) return null;

  const normalized = email.toLowerCase();
  if (!EMAIL_PATTERN.test(normalized)) {
    throw new PublicLeadValidationError("email inválido");
  }

  return normalized;
}

function normalizeLandingPage(value: unknown) {
  const landingPage = requiredString(value, "landing_page", 8, 2_048);

  try {
    const url = new URL(landingPage);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error("unsupported protocol");
    }
    url.hash = "";
    return url.toString();
  } catch {
    throw new PublicLeadValidationError("landing_page deve ser uma URL válida");
  }
}

function normalizeCapturedAt(value: unknown) {
  const capturedAt = requiredString(value, "consent.captured_at", 20, 40);
  const timestamp = Date.parse(capturedAt);

  if (!Number.isFinite(timestamp)) {
    throw new PublicLeadValidationError(
      "consent.captured_at deve ser uma data ISO válida",
    );
  }

  if (!/(?:Z|[+-]\d{2}:\d{2})$/.test(capturedAt)) {
    throw new PublicLeadValidationError(
      "consent.captured_at deve incluir o fuso horário",
    );
  }

  return new Date(timestamp).toISOString();
}

export function validateSiteLeadSubmission(
  input: unknown,
): SiteLeadSubmission {
  if (!isRecord(input)) {
    throw new PublicLeadValidationError("payload deve ser um objeto");
  }

  assertExactKeys(
    input,
    [
      "submission_id",
      "name",
      "phone",
      "email",
      "city",
      "service",
      "message",
      "landing_page",
      "utm",
      "consent",
    ],
    "payload",
  );

  const submissionId = requiredString(
    input.submission_id,
    "submission_id",
    8,
    128,
  );
  if (!IDEMPOTENCY_PATTERN.test(submissionId)) {
    throw new PublicLeadValidationError("submission_id possui formato inválido");
  }

  if (!isRecord(input.utm)) {
    throw new PublicLeadValidationError("utm deve ser um objeto");
  }
  assertExactKeys(input.utm, UTM_KEYS, "utm");

  if (!isRecord(input.consent)) {
    throw new PublicLeadValidationError("consent deve ser um objeto");
  }
  assertExactKeys(
    input.consent,
    ["privacy", "marketing", "captured_at", "policy_version"],
    "consent",
  );

  if (input.consent.privacy !== true) {
    throw new PublicLeadValidationError(
      "consent.privacy deve ser explicitamente aceito",
    );
  }
  if (typeof input.consent.marketing !== "boolean") {
    throw new PublicLeadValidationError(
      "consent.marketing deve ser booleano",
    );
  }

  const policyVersion = requiredString(
    input.consent.policy_version,
    "consent.policy_version",
    1,
    80,
  );

  return {
    submission_id: submissionId,
    name: requiredString(input.name, "name", 2, 120),
    phone: normalizePhone(input.phone),
    email: normalizeEmail(input.email),
    city: optionalString(input.city, "city", 120),
    service: optionalString(input.service, "service", 160),
    message: requiredString(input.message, "message", 10, 2_000),
    landing_page: normalizeLandingPage(input.landing_page),
    utm: {
      source: optionalString(input.utm.source, "utm.source", 200),
      medium: optionalString(input.utm.medium, "utm.medium", 200),
      campaign: optionalString(input.utm.campaign, "utm.campaign", 200),
      term: optionalString(input.utm.term, "utm.term", 200),
      content: optionalString(input.utm.content, "utm.content", 200),
    },
    consent: {
      privacy: true,
      marketing: input.consent.marketing,
      captured_at: normalizeCapturedAt(input.consent.captured_at),
      policy_version: policyVersion,
    },
  };
}

export function preparePublicLeadRequest(
  submission: SiteLeadSubmission,
): PreparedPublicLeadRequest {
  const { submission_id: submissionId, ...lead } = submission;
  const payload: PublicLeadPayload = {
    ...lead,
    source: "website",
  };

  return Object.freeze({
    body: JSON.stringify(payload),
    idempotencyKey: `site:${submissionId}`,
  });
}

export function createPublicLeadSignature(body: string, secret: string) {
  return `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
}

export function resolvePublicLeadClientConfig(
  environment: Readonly<Record<string, string | undefined>>,
): PublicLeadClientConfig {
  const endpoint = environment.ARANTES_OS_PUBLIC_LEADS_URL?.trim();
  const integrationKey = environment.ARANTES_OS_INTEGRATION_KEY?.trim();
  const hmacSecret = environment.ARANTES_OS_HMAC_SECRET?.trim();

  if (!endpoint || !integrationKey || !hmacSecret) {
    throw new PublicLeadConfigurationError(
      "integração de leads não configurada",
    );
  }
  if (!INTEGRATION_KEY_PATTERN.test(integrationKey)) {
    throw new PublicLeadConfigurationError(
      "identificador da integração inválido",
    );
  }

  let url: URL;
  try {
    url = new URL(endpoint);
  } catch {
    throw new PublicLeadConfigurationError("URL da integração inválida");
  }

  if (
    url.protocol !== "https:" &&
    !(url.protocol === "http:" &&
      (url.hostname === "127.0.0.1" || url.hostname === "localhost"))
  ) {
    throw new PublicLeadConfigurationError(
      "URL da integração deve usar HTTPS",
    );
  }

  return Object.freeze({ endpoint, integrationKey, hmacSecret });
}

function parseRetryAfter(value: string | null) {
  if (!value) return 250;
  const seconds = Number(value);
  if (!Number.isFinite(seconds) || seconds < 0) return 250;
  return Math.min(seconds * 1_000, 1_000);
}

export async function sendPreparedPublicLead(
  prepared: PreparedPublicLeadRequest,
  config: PublicLeadClientConfig,
  dependencies: {
    fetchImpl?: typeof fetch;
    sleep?: (milliseconds: number) => Promise<void>;
    timeoutMs?: number;
    now?: () => number;
  } = {},
): Promise<PublicLeadClientResult> {
  const fetchImpl = dependencies.fetchImpl ?? fetch;
  const sleep =
    dependencies.sleep ??
    ((milliseconds: number) =>
      new Promise((resolve) => setTimeout(resolve, milliseconds)));
  const timeoutMs = dependencies.timeoutMs ?? PUBLIC_LEAD_TIMEOUT_MS;
  const timestamp = Math.floor((dependencies.now?.() ?? Date.now()) / 1_000);
  const signature = createPublicLeadSignature(
    prepared.body,
    config.hmacSecret,
  );

  if (!SIGNATURE_PATTERN.test(signature)) {
    throw new Error("assinatura HMAC inválida");
  }

  const headers = Object.freeze({
    "Content-Type": "application/json",
    "X-Arantes-Integration-Key": config.integrationKey,
    "X-Arantes-Signature": signature,
    "X-Arantes-Timestamp": String(timestamp),
    "X-Arantes-Idempotency-Key": prepared.idempotencyKey,
  });

  for (let attempt = 1; attempt <= PUBLIC_LEAD_MAX_ATTEMPTS; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetchImpl(config.endpoint, {
        method: "POST",
        headers,
        body: prepared.body,
        cache: "no-store",
        signal: controller.signal,
      });

      if (
        (response.status === 429 || response.status === 503) &&
        attempt < PUBLIC_LEAD_MAX_ATTEMPTS
      ) {
        await response.body?.cancel();
        await sleep(parseRetryAfter(response.headers.get("retry-after")));
        continue;
      }

      return {
        status: response.status,
        ok: response.status === 200 || response.status === 201,
        replayed: response.status === 200,
      };
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error("limite de tentativas excedido");
}
