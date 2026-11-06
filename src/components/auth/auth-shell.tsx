import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/site/logo";
import { GlassIcon } from "@/components/ui/glass-icon";
import { univers } from "@/lib/univers";

/**
 * Page d'authentification en deux volets, exactement de la hauteur de l'écran sur grand écran :
 * panneau sombre coloré (desktop) et formulaire centré. `pied` accueille le lien vers l'autre page.
 */
export function AuthShell({ titre, texte, children, pied }: { titre: string; texte: string; children: ReactNode; pied?: ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:h-dvh lg:grid-cols-[1.05fr_1fr] lg:overflow-hidden">
      <aside className="relative isolate hidden overflow-hidden bg-[#14131a] p-10 text-[#fff9f2] lg:flex lg:flex-col lg:justify-between">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute -left-24 top-0 size-[26rem] rounded-full bg-violet/45 blur-[120px]" />
          <div className="absolute -right-20 bottom-10 size-[24rem] rounded-full bg-corail/35 blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 size-[20rem] rounded-full bg-menthe/20 blur-[120px]" />
        </div>
        <Link href="/accueil" aria-label="Clairivo, accueil" className="inline-flex items-center gap-2 font-titre text-xl font-bold">
          <span aria-hidden="true" className="size-3.5 rounded-full bg-corail" />
          Clairivo
        </Link>
        <div>
          <h2 className="max-w-[14ch] font-titre text-5xl font-bold leading-[1.05] tracking-[-0.02em]">
            Tes ressources, <span className="text-soleil">toujours à portée.</span>
          </h2>
          <p className="mt-5 max-w-[40ch] text-lg text-[#e6dfd6]">Retrouve tes achats, télécharge-les à nouveau et suis ta progression dans un seul espace.</p>
          <ul className="mt-10 flex gap-3" aria-hidden="true">
            {univers.map((u, i) => (
              <li key={u.id} className="flex size-20 items-center justify-center rounded-3xl" style={{ background: `linear-gradient(150deg, ${u.de}, ${u.vers})`, transform: `rotate(${(i - 2) * 5}deg)` }}>
                <GlassIcon id={u.id} className="size-14" />
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-[#c9c2d3]">Paiement sécurisé par Stripe. Téléchargement immédiat.</p>
      </aside>

      <main id="contenu" className="flex flex-col px-6 py-6 sm:px-10 lg:min-h-0 lg:overflow-y-auto">
        <div className="lg:hidden">
          <Logo />
        </div>
        <div className="mx-auto my-auto flex w-full max-w-md flex-col py-6">
          <h1 className="font-titre text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{titre}</h1>
          <p className="mt-2 text-encre-2">{texte}</p>
          <div className="mt-6">{children}</div>
          {pied && <p className="mt-5 text-center text-encre-2">{pied}</p>}
        </div>
      </main>
    </div>
  );
}
