import { GradientCard } from "@/components/ui/gradient-card";
import { univers } from "@/lib/univers";

const u = (id: string) => univers.find((x) => x.id === id)!;

const packs = [
  { id: "pack-emploi", titre: "Pack Trouver un emploi", texte: "CV, lettre, entretien : tout le parcours.", univers: u("emploi"), prix: "Dès 9,99 €" },
  { id: "pack-ia", titre: "Pack IA au travail", texte: "Prompts et méthodes pour gagner du temps.", univers: u("ia"), prix: "Dès 9,99 €" },
  { id: "pack-freelance", titre: "Pack Premiers clients", texte: "Devis, contrat, facture, relance.", univers: u("freelancing"), prix: "Dès 14,99 €" },
];

export function Packs() {
  return (
    <section id="packs" className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
      <h2 className="max-w-[20ch] font-titre text-4xl font-bold leading-tight tracking-tight md:text-5xl">Les packs, pour aller plus loin.</h2>
      <p className="mt-4 max-w-[52ch] text-lg text-encre-2">Plusieurs ressources réunies à prix réduit, jusqu&apos;à 14,99&nbsp;€.</p>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {packs.map((p) => (
          <li key={p.id} className="flex">
            <GradientCard
              href="/inscription"
              titre={p.titre}
              texte={p.texte}
              etiquette={p.prix}
              de={p.univers.de}
              vers={p.univers.vers}
              couleurTexte={p.univers.texte}
              icone={p.univers.id}
              lien="Me prévenir"
              className="min-h-96 w-full"
              imageClassName="bottom-5 right-5 size-28"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
