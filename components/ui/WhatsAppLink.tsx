"use client";

import { trackWhatsAppClick } from "@/lib/gtm";
import type { ReactNode } from "react";

type WhatsAppLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  location: string;
};

export default function WhatsAppLink({
  children,
  className,
  href,
  location,
}: WhatsAppLinkProps) {
  return (
    <a
      href={href}
      onClick={() => trackWhatsAppClick(location)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
