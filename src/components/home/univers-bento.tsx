import { GradientCard } from "@/components/ui/gradient-card";
import { univers } from "@/lib/univers";

/** Galerie alignée sur 6 colonnes : 2 cartes de 3 colonnes, puis 3 cartes de 2 colonnes, hauteurs fixes par rangée. */
const cases = ["md:col-span-3 md:h-80", "md:col-span-3 md:h-80", "md:col-span-2 md:h-72", "md:col-span-2 md:h-72", "md:col-span-2 md:h-72"];
const images = [
  "bottom-5 right-6 size-44",
  "bottom-5 right-6 size-44",
  "bottom-4 right-4 size-24",
  "bottom-4 right-4 size-24",
  "bottom-4 right-4 size-24",
];

export function UniversBento() {
  return (
    <section id="univers" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <h2 className="max-w-[20ch] font-titre text-4xl font-bold leading-tight tracking-tight md:text-5xl">Cinq univers, un objectif à la fois.</h2>
      <p className="mt-4 max-w-[52ch] text-lg text-encre-2">Choisis ce que tu veux régler cette semaine. Chaque univers regroupe des ressources courtes, faites pour être appliquées tout de suite.</p>
      <ul className="mt-10 grid gap-4 md:grid-cols-6">
        {univers.map((u, i) => (
          <li key={u.id} className={`flex h-72 ${cases[i]!}`}>
            <GradientCard
              href={`/catalogue?univers=${u.id}`}
              titre={u.label}
              texte={u.phrase}
              de={u.de}
              vers={u.vers}
              couleurTexte={u.texte}
              icone={u.id}
              lien="Explorer"
              className="w-full"
              imageClassName={images[i]!}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
