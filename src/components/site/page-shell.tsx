import type { ReactNode } from "react";
import { FloatingNav } from "@/components/site/floating-nav";
import { Footer } from "@/components/site/footer";

/** Gabarit des pages intérieures : navigation, titre de page, contenu, pied de page. */
export function PageShell({ titre, texte, children }: { titre: string; texte: string; children: ReactNode }) {
  return (
    <>
      <FloatingNav />
      <main id="contenu">
        <header className="mx-auto max-w-6xl px-6 pb-4 pt-32 md:pt-40">
          <h1 className="max-w-[18ch] font-titre text-5xl font-bold leading-tight tracking-tight md:text-6xl">{titre}</h1>
          <p className="mt-4 max-w-[56ch] text-lg text-encre-2">{texte}</p>
        </header>
        {children}
      </main>
      <Footer />
    </>
  );
}
