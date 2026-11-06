import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = { title: "Créer un compte | Clairivo", robots: { index: false, follow: false } };

export default function Inscription() {
  return (
    <AuthShell
      titre="Crée ton compte."
      texte="Une minute pour garder toutes tes ressources au même endroit."
      pied={
        <>
          Déjà inscrit ?{" "}
          <Link href="/connexion" className="font-semibold text-encre underline underline-offset-4">
            Me connecter
          </Link>
        </>
      }
    >
      <AuthForm mode="inscription" />
    </AuthShell>
  );
}
