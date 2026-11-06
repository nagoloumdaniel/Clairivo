import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = { title: "Connexion | Clairivo", robots: { index: false, follow: false } };

export default function Connexion() {
  return (
    <AuthShell
      titre="Content de te revoir."
      texte="Connecte-toi pour retrouver tes ressources et tes téléchargements."
      pied={
        <>
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-semibold text-encre underline underline-offset-4">
            Créer un compte
          </Link>
        </>
      }
    >
      <AuthForm mode="connexion" />
    </AuthShell>
  );
}
