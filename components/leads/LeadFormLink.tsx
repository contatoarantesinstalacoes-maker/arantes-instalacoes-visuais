"use client";

import type { MouseEvent, ReactNode } from "react";

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
  function selectContext(event: MouseEvent<HTMLAnchorElement>) {
    window.dispatchEvent(
      new CustomEvent(LEAD_FORM_CONTEXT_EVENT, {
        detail: { formLocation, service },
      }),
    );
    onNavigate?.();

    if (event.defaultPrevented) return;
  }

  return (
    <a href="#orcamento" onClick={selectContext} className={className}>
      {children}
    </a>
  );
}
