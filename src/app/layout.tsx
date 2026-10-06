import type { Metadata } from "next";
import { Archivo, Barlow_Condensed } from "next/font/google";
import type { ReactNode } from "react";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import "@/styles/globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-barlow-condensed",
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Grêmio Esportivo Bagé",
  description:
    "Site dedicado ao Grêmio Esportivo Bagé: elenco, jogos, história e informações do clube.",
  // Remover ao preparar as páginas públicas e sua política de indexação.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${barlowCondensed.variable} ${archivo.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
