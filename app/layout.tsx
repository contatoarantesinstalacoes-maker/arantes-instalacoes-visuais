import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arantesvisual.com.br"),
  title: {
    default: "Arantes Visual | Comunicação Visual, Fachadas, ACM e Trabalhos em Altura",
    template: "%s | Arantes Visual",
  },
  description:
    "Instalação técnica em comunicação visual para empresas: fachadas comerciais, ACM, letras caixa, adesivação, painéis, eventos e trabalhos em altura em São Paulo e todo o Brasil sob consulta.",
  keywords: [
    "comunicação visual",
    "fachadas comerciais",
    "instalação de fachada",
    "ACM",
    "letras caixa",
    "adesivação",
    "trabalho em altura",
    "IRATA",
    "São Paulo",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Arantes Visual | Comunicação Visual Corporativa",
    description:
      "Fachadas, ACM, letras caixa, adesivação, eventos e trabalhos em altura para empresas.",
    url: "https://arantesvisual.com.br",
    siteName: "Arantes Visual",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/portfolio1.jpg",
        width: 1200,
        height: 630,
        alt: "Arantes Visual - Comunicação Visual Corporativa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arantes Visual | Comunicação Visual Corporativa",
    description:
      "Instalação técnica em comunicação visual para empresas em São Paulo e todo o Brasil sob consulta.",
    images: ["/images/portfolio1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Arantes Instalações Visuais",
  alternateName: "Arantes Visual",
  url: "https://arantesvisual.com.br",
  telephone: "+55 11 93207-2394",
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  areaServed: ["São Paulo", "Grande São Paulo", "Brasil"],
  priceRange: "$$",
  description:
    "Empresa especializada em instalação técnica de comunicação visual, fachadas, ACM, letras caixa, adesivação, eventos e trabalhos em altura.",
  sameAs: ["https://www.instagram.com/arantesvisual"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
     <body className={`${inter.className} bg-black text-white antialiased`}>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
  />

  {children}

  <GoogleTagManager gtmId="GTM-KR2LG425" />
</body>
    </html>
  );
}