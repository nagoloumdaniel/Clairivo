import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";

// Le jeton du lien arrivera en paramètre avec la phase 5 : jamais indexé, jamais transmis à un tiers.
export const metadata: Metadata = { title: "Nouveau mot de passe | Clairivo", robots: { index: false, follow: false }, referrer: "no-referrer" };

export default function ReinitialiserMotDePasse() {
  return (
    <AuthShell
      titre="Choisis un nouveau mot de passe."
      texte="Il doit contenir au moins 8 caractères. Tu seras reconnecté ensuite."
      pied={
        <Link href="/connexion" className="font-semibold text-encre underline underline-offset-4">
          Retour à la connexion
        </Link>
      }
    >
      <AuthForm mode="reinitialisation" />
    </AuthShell>
  );
}
