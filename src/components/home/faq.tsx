import { HoverIcon } from "@/components/ui/hover-icon";

const questions = [
  { q: "Comment je reçois ma ressource ?", r: "Juste après le paiement, un lien de téléchargement arrive par e-mail. Tu la retrouves aussi dans ton espace." },
  { q: "Quels moyens de paiement ?", r: "Cartes Visa et Mastercard, Apple Pay et Google Pay, via Stripe. Tes données bancaires ne passent jamais par Clairivo." },
  { q: "Les prix incluent-ils la TVA ?", r: "Oui, tous les prix affichés sont TTC." },
  { q: "Puis-je me faire rembourser ?", r: "Les contenus numériques téléchargés sont couverts par le droit de rétractation selon les conditions de vente. Le détail est dans les CGV." },
];

export function Faq() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
      <h2 className="font-titre text-4xl font-bold leading-tight tracking-tight md:text-5xl">Questions fréquentes</h2>
      <div className="mt-8 grid items-start gap-3 md:grid-cols-2">
        {questions.map((x) => (
          <details key={x.q} data-hover-icon className="group rounded-3xl border border-encre/15 bg-surface px-5 py-4">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-titre text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {x.q}
              <span className="transition-transform duration-300 group-open:rotate-180">
                <HoverIcon name="chevron-down" size={22} />
              </span>
            </summary>
            <p className="mt-2 text-encre-2">{x.r}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
