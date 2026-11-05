import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/landing/site-footer";

export const metadata: Metadata = {
  title: "Mentions légales | Clairivo",
  robots: { index: false },
};

const aRemplir = "À renseigner par l'éditeur avant la mise en ligne";

export default function MentionsLegales() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <Link href="/" className="font-titre text-lg font-bold">
          Clairivo
        </Link>
        <h1 className="mt-10 text-4xl font-bold tracking-[-0.02em] md:text-5xl">Mentions légales</h1>
        <div className="mt-10 space-y-8 leading-7">
          <section>
            <h2 className="text-2xl font-semibold">Éditeur du site</h2>
            <ul className="mt-3 space-y-1">
              <li>Nom : Daniel Nagoloum Talla (entrepreneur individuel)</li>
              <li>Statut : micro-entreprise (France)</li>
              <li>Numéro SIREN : {aRemplir}</li>
              <li>Adresse : Noisy-le-Grand, Île-de-France, France (adresse postale complète : {aRemplir})</li>
              <li>E-mail de contact : <a href="mailto:Clairivo@protonmail.com" className="underline underline-offset-4">Clairivo@protonmail.com</a></li>
              <li>Directeur de la publication : Daniel Nagoloum Talla</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">Hébergement</h2>
            <p className="mt-3">Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
            <p className="mt-2">Base de données hébergée par Supabase, dans la région de Paris (France).</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">Propriété intellectuelle</h2>
            <p className="mt-3">
              Les textes, couvertures et illustrations de Clairivo sont protégés. Toute reproduction sans accord écrit de l&apos;éditeur est interdite.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
