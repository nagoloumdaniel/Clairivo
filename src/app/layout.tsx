import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Clairivo : des guides courts pour avancer, dès 2,99 €",
  description:
    "Checklists, modèles et mini-cours en français pour postuler, travailler avec l'IA ou se lancer en freelance. Inscris-toi pour recevoir les trois premières ressources gratuites.",
  openGraph: { type: "website", locale: "fr_FR", siteName: "Clairivo" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ff7048" },
    { media: "(prefers-color-scheme: dark)", color: "#17161d" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${sora.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
