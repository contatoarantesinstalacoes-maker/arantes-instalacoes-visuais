import {
  PublicLeadConfigurationError,
  PublicLeadValidationError,
  validateSiteLeadSubmission,
} from "@/lib/leads/public-lead-contract";
import { submitLeadToArantesOs } from "@/lib/leads/arantes-os-client.server";

export const runtime = "nodejs";

const RESPONSE_HEADERS = {
  "Cache-Control": "no-store",
  "Content-Type": "application/json",
};

function json(data: Record<string, unknown>, status: number) {
  return Response.json(data, {
    status,
    headers: RESPONSE_HEADERS,
  });
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "content_type_invalid" }, 415);
  }

  try {
    const rawBody = await request.text();
    if (rawBody.length === 0 || rawBody.length > 12_000) {
      return json({ error: "payload_invalid" }, 422);
    }

    const submission = validateSiteLeadSubmission(JSON.parse(rawBody));
    const result = await submitLeadToArantesOs(submission);

    if (result.ok) {
      return json(
        {
          success: true,
          replayed: result.replayed,
        },
        result.status,
      );
    }

    return json(
      {
        error:
          result.status === 409
            ? "idempotency_conflict"
            : result.status === 422
              ? "payload_rejected"
              : result.status === 429
                ? "rate_limited"
                : result.status === 401
                  ? "integration_unauthorized"
                  : "dependency_unavailable",
        whatsapp_fallback: true,
      },
      [401, 409, 422, 429, 503].includes(result.status)
        ? result.status
        : 503,
    );
  } catch (error) {
    if (
      error instanceof PublicLeadValidationError ||
      error instanceof SyntaxError
    ) {
      return json({ error: "payload_invalid" }, 422);
    }

    if (error instanceof PublicLeadConfigurationError) {
      return json(
        { error: "integration_unavailable", whatsapp_fallback: true },
        503,
      );
    }

    return json(
      { error: "dependency_unavailable", whatsapp_fallback: true },
      503,
    );
  }
}
