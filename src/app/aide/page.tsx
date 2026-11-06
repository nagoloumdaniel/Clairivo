import type { Metadata } from "next";
import { Faq } from "@/components/home/faq";
import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = { title: "Aide | Clairivo", robots: { index: false, follow: false } };

export default function Aide() {
  return (
    <PageShell titre="Besoin d'aide ?" texte="Les réponses aux questions les plus courantes. Pour le reste, écris-nous.">
      <div className="pt-10">
        <Faq />
      </div>
      <p className="mx-auto max-w-6xl px-6 pb-20 text-lg">
        Une autre question ?{" "}
        <a href="mailto:Clairivo@protonmail.com" className="font-semibold underline underline-offset-4">
          Clairivo@protonmail.com
        </a>
      </p>
    </PageShell>
  );
}
