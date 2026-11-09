import { hasAnalyticsConsent } from "@/lib/consent";

type EventData = Record<string, unknown>;

export function trackEvent(event: string, data: EventData = {}) {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;

  const win = window as typeof window & {
    dataLayer?: EventData[];
  };

  win.dataLayer = win.dataLayer || [];

  win.dataLayer.push({
    event,
    ...data,
  });
}

export function trackWhatsAppClick(location: string) {
  trackEvent("whatsapp_click", {
    button_location: location,
  });
}

export function trackPortfolioOpen(title: string) {
  trackEvent("portfolio_open", {
    project: title,
  });
}

export function trackLeadConversion(data: {
  formLocation: string;
  replayed: boolean;
}) {
  trackEvent("lead_conversion", {
    form_location: data.formLocation,
    replayed: data.replayed,
  });
}
