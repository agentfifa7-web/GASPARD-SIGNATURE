import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Providers } from "@/components/providers";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic", "normal"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "GASPARD Signature — L'art de bien vivre, autour d'une table",
    template: "%s — GASPARD Signature",
  },
  description:
    "GASPARD Signature, restaurant premium à Angré 8e Tranche, Cocody. Pizzas au feu de bois, burgers, grillades, brunch, cocktails et soirées. Réservez votre table ou commandez en ligne.",
  keywords: [
    "GASPARD Signature",
    "restaurant Abidjan",
    "restaurant Cocody",
    "restaurant Angré",
    "pizza Abidjan",
    "brunch Abidjan",
    "réservation restaurant Abidjan",
  ],
  openGraph: {
    title: "GASPARD Signature",
    description: "L'art de bien vivre, autour d'une table.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivoire text-noir">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
