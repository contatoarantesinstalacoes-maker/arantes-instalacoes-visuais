import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arantesvisual.com.br"),
  title: "Arantes Instalações Visuais | Comunicação Visual Corporativa",
  description:
    "Especialistas em fachadas, ACM, letras caixa, adesivação, painéis, eventos e trabalhos em altura para empresas.",
  keywords: [
    "comunicação visual",
    "fachadas",
    "ACM",
    "letras caixa",
    "adesivação",
    "trabalho em altura",
    "IRATA",
    "São Paulo",
  ],
  openGraph: {
    title: "Arantes Instalações Visuais",
    description:
      "Instalação profissional de comunicação visual para empresas.",
    url: "https://arantesvisual.com.br",
    siteName: "Arantes Instalações Visuais",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}