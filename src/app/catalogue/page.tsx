import type { Metadata } from "next";
import { SelectionGrid } from "@/components/home/selection-grid";
import { PageShell } from "@/components/site/page-shell";
import { GradientCard } from "@/components/ui/gradient-card";
import { ressources } from "@/lib/selection";
import { univers } from "@/lib/univers";

export const metadata: Metadata = { title: "Catalogue | Clairivo", robots: { index: false, follow: false } };

export default function Catalogue() {
  return (
    <PageShell titre="Le catalogue." texte="Cinq univers pour commencer. Les premières ressources arrivent à l'ouverture de la boutique, de 2,99 € à 9,99 €.">
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {univers.map((u) => (
            <li key={u.id} className="flex h-72">
              <GradientCard
                href={`/inscription`}
                titre={u.label}
                texte={u.phrase}
                etiquette="Bientôt"
                de={u.de}
                vers={u.vers}
                couleurTexte={u.texte}
                icone={u.id}
                lien="Me prévenir"
                className="w-full"
                imageClassName="bottom-4 right-4 size-28"
              />
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="ressources" className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
        <h2 id="ressources" className="font-titre text-3xl font-bold tracking-tight md:text-4xl">
          Les ressources prévues.
        </h2>
        <p className="mt-3 max-w-[56ch] text-encre-2">Prix indicatifs avant l&apos;ouverture. Rien n&apos;est encore en vente.</p>
        <div className="mt-8">
          <SelectionGrid items={ressources} />
        </div>
      </section>
    </PageShell>
  );
}
