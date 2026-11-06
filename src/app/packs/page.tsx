import type { Metadata } from "next";
import { Packs } from "@/components/home/packs";
import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = { title: "Packs | Clairivo", robots: { index: false, follow: false } };

export default function PacksPage() {
  return (
    <PageShell titre="Les packs." texte="Plusieurs ressources réunies à prix réduit, jusqu'à 14,99 €. Prix provisoires, confirmés à l'ouverture.">
      <div className="pt-8">
        <Packs />
      </div>
    </PageShell>
  );
}
