import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arantes Instalações Visuais | Comunicação Visual e Trabalhos em Altura",
  description:
    "Instalação de fachadas, letras caixa, ACM, adesivos, lonas, painéis, totens e comunicação visual corporativa em São Paulo e região.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}