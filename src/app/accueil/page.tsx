import type { Metadata } from "next";
import { Faq } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { Packs } from "@/components/home/packs";
import { Selection } from "@/components/home/selection";
import { Steps } from "@/components/home/steps";
import { UniversBento } from "@/components/home/univers-bento";
import { FloatingNav } from "@/components/site/floating-nav";
import { Footer } from "@/components/site/footer";

// Aperçu de design : hors index tant que l'utilisateur n'a pas validé.
export const metadata: Metadata = { title: "Accueil (aperçu)", robots: { index: false, follow: false } };

export default function Accueil() {
  return (
    <>
      <FloatingNav />
      <main id="contenu">
        <Hero />
        <Marquee />
        <UniversBento />
        <Selection />
        <Packs />
        <Steps />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
