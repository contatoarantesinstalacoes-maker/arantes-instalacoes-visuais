export const ANALYTICS_CONSENT_STORAGE_KEY =
  "arantes-analytics-consent-v1";
export const ANALYTICS_CONSENT_EVENT = "arantes-analytics-consent";
export const LEAD_CONSENT_POLICY_VERSION = "lead-contact-v1";

export type AnalyticsConsent = "accepted" | "rejected" | null;

export function getAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return null;

  const savedConsent = window.localStorage.getItem(
    ANALYTICS_CONSENT_STORAGE_KEY,
  );

  return savedConsent === "accepted" || savedConsent === "rejected"
    ? savedConsent
    : null;
}

export function hasAnalyticsConsent() {
  return getAnalyticsConsent() === "accepted";
}
