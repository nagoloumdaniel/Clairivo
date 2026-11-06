import { GradientCard } from "@/components/ui/gradient-card";
import { univers } from "@/lib/univers";

const etapes = [
  { n: "1", titre: "Tu choisis", texte: "Un univers, une ressource, un prix affiché TTC.", univers: univers[4]! },
  { n: "2", titre: "Tu paies", texte: "Carte, Apple Pay ou Google Pay, paiement sécurisé par Stripe.", univers: univers[3]! },
  { n: "3", titre: "Tu télécharges", texte: "Le lien arrive par e-mail et reste dans ton espace.", univers: univers[2]! },
];

export function Steps() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
      <h2 className="max-w-[20ch] font-titre text-4xl font-bold leading-tight tracking-tight md:text-5xl">Trois gestes et c&apos;est à toi.</h2>
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {etapes.map((e) => (
          <li key={e.n} className="flex">
            <GradientCard
              href="/catalogue"
              titre={e.titre}
              texte={e.texte}
              etiquette={`Étape ${e.n}`}
              de={e.univers.de}
              vers={e.univers.vers}
              couleurTexte={e.univers.texte}
              icone={e.univers.id}
              lien="Commencer"
              className="min-h-80 w-full"
              imageClassName="bottom-5 right-5 size-28"
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
