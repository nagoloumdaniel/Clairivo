import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/landing/site-footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Clairivo",
  robots: { index: false },
};

export default function Confidentialite() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <Link href="/" className="font-titre text-lg font-bold">
          Clairivo
        </Link>
        <h1 className="mt-10 text-4xl font-bold tracking-[-0.02em] md:text-5xl">Politique de confidentialité</h1>
        <p className="mt-4 text-encre-2">Version du 5 novembre 2026, valable pour la liste d&apos;attente.</p>
        <div className="mt-10 space-y-8 leading-7">
          <section>
            <h2 className="text-2xl font-semibold">Ce que nous collectons</h2>
            <p className="mt-3">
              Quand tu t&apos;inscris à la liste d&apos;attente : ton adresse e-mail, les sujets que tu as cochés (facultatif), la date de ton accord et la version du texte que tu as accepté. Nous ne collectons ni ton adresse IP dans la base ni ton nom.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">Pourquoi, et sur quelle base</h2>
            <p className="mt-3">
              Pour t&apos;envoyer les trois premières ressources gratuites et te prévenir de l&apos;ouverture de la boutique, puis pour choisir les sujets à écrire en premier. La base légale est ton consentement, que tu peux retirer à tout moment.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">Combien de temps</h2>
            <p className="mt-3">
              Tes données sont conservées jusqu&apos;à ce que tu te désinscrives, et au plus tard 3 ans après notre dernier contact avec toi.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">Qui y a accès</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Supabase (base de données, Paris, France).</li>
              <li>Vercel (hébergement du site, États-Unis, avec des garanties de transfert à vérifier avant ouverture).</li>
              <li>Sentry (suivi des erreurs techniques, Allemagne), sans donnée personnelle volontairement transmise.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">Tes droits</h2>
            <p className="mt-3">
              Tu peux demander l&apos;accès à tes données, leur correction, leur effacement, ou retirer ton consentement, en écrivant à l&apos;adresse de contact indiquée dans les mentions légales. Tu peux aussi saisir la CNIL (cnil.fr).
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">Cookies</h2>
            <p className="mt-3">
              Cette page d&apos;attente n&apos;utilise aucun cookie de mesure ni de publicité.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
