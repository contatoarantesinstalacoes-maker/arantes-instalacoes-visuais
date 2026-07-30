import "server-only";

import {
  preparePublicLeadRequest,
  resolvePublicLeadClientConfig,
  sendPreparedPublicLead,
  type SiteLeadSubmission,
} from "@/lib/leads/public-lead-contract";

export async function submitLeadToArantesOs(
  submission: SiteLeadSubmission,
) {
  const config = resolvePublicLeadClientConfig(process.env);
  const prepared = preparePublicLeadRequest(submission);
  return sendPreparedPublicLead(prepared, config);
}
