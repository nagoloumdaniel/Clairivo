import Link from "next/link";
import { CoverFan } from "@/components/landing/cover-fan";
import { SiteFooter } from "@/components/landing/site-footer";
import { WaitlistForm } from "@/components/landing/waitlist-form";

const premieres = [
  { format: "Checklist", titre: "Checklist CV professionnel", pour: "Pour relire son CV point par point avant d'envoyer une candidature." },
  { format: "Guide", titre: "Comprendre l'IA générative", pour: "Pour savoir ce que ces outils font vraiment et les utiliser sans y passer ses soirées." },
  { format: "Checklist", titre: "Checklist lancement freelance", pour: "Pour ne rien oublier avant de facturer son premier client." },
];

export default function Home() {
  return (
    <>
      <div className="hero bg-[var(--h-fond)] text-[var(--h-texte)]">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-6 md:px-10">
          <Link href="/" className="font-titre text-xl font-bold tracking-tight">
            Clairivo
          </Link>
        </header>

        <main id="contenu">
          <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-14 md:px-10 md:pb-28 md:pt-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div>
              <h1 className="max-w-[16ch] font-titre text-[clamp(2.5rem,6.2vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.03em]">
                Des guides courts pour avancer, dès 2,99&nbsp;€.
              </h1>
              <p className="mt-6 max-w-[48ch] text-lg leading-8">
                Checklists, modèles et mini-cours en français, pour postuler, travailler avec l&apos;IA ou se lancer en freelance. La boutique ouvre bientôt : laisse ton e-mail pour recevoir les trois premières ressources, gratuites.
              </p>
              <div className="mt-10">
                <WaitlistForm />
              </div>
            </div>
            <div className="order-first lg:order-none">
              <CoverFan />
            </div>
          </section>
        </main>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28" aria-labelledby="premieres">
        <h2 id="premieres" className="max-w-[20ch] text-3xl font-bold leading-tight tracking-[-0.02em] md:text-5xl">
          Trois ressources gratuites pour commencer.
        </h2>
        <ol className="mt-12 border-t border-ligne">
          {premieres.map((r) => (
            <li key={r.titre} className="grid gap-2 border-b border-ligne py-7 md:grid-cols-[10rem_1fr_1.1fr] md:items-baseline md:gap-8">
              <span className="font-titre text-sm font-semibold uppercase tracking-[0.08em] text-encre-2">{r.format}</span>
              <span className="font-titre text-2xl font-semibold tracking-[-0.01em]">{r.titre}</span>
              <span className="max-w-[44ch] text-encre-2">{r.pour}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-[60ch] text-sm text-encre-2">
          Ces trois ressources sont en préparation. Tu les reçois par e-mail à l&apos;ouverture, pas avant.
        </p>
      </section>

      <section className="bg-surface" aria-labelledby="suite">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[1fr_1.2fr]">
          <h2 id="suite" className="max-w-[18ch] text-3xl font-bold leading-tight tracking-[-0.02em] md:text-5xl">
            Tu choisis ce qu&apos;on écrit ensuite.
          </h2>
          <div className="max-w-[56ch] space-y-5 text-lg leading-8">
            <p>
              Le sujet que tu coches dans le formulaire compte vraiment : les thèmes les plus demandés passent en premier dans la boutique.
            </p>
            <p>
              Les ressources payantes coûtent de 2,99&nbsp;€ à 9,99&nbsp;€, et jusqu&apos;à 14,99&nbsp;€ pour un pack. Le prix affiché est le prix payé, sans ligne ajoutée à la fin.
            </p>
            <p>
              <a href="#contenu" className="font-semibold underline">
                Retourner au formulaire
              </a>
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
