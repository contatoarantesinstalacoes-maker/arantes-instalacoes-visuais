"use client";

import { trackWhatsAppClick } from "@/lib/gtm";
import type { ReactNode } from "react";

export const LEAD_FORM_CONTEXT_EVENT = "arantes-lead-form-context";

type LeadFormLinkProps = {
  children: ReactNode;
  className?: string;
  formLocation: string;
  service?: string;
  onNavigate?: () => void;
};

export default function LeadFormLink({
  children,
  className,
  formLocation,
  service,
  onNavigate,
}: LeadFormLinkProps) {
  const message = service
    ? `Olá! Vim pelo site da Arantes Visual e quero um orçamento para ${service}.`
    : "Olá! Vim pelo site da Arantes Visual e quero solicitar um orçamento.";
  const href = `https://wa.me/5511962600528?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        trackWhatsAppClick(formLocation);
        onNavigate?.();
      }}
      className={className}
    >
      {children}
    </a>
  );
}
