import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clairivo",
  description: "Guides, modèles et mini-cours en français, dès 2,99 €.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
