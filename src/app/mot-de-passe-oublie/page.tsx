import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = { title: "Mot de passe oublié | Clairivo", robots: { index: false, follow: false } };

export default function MotDePasseOublie() {
  return (
    <AuthShell
      titre="Mot de passe oublié ?"
      texte="Entre ton adresse e-mail. Si un compte existe, tu recevras un lien pour en choisir un nouveau."
      pied={
        <Link href="/connexion" className="font-semibold text-encre underline underline-offset-4">
          Retour à la connexion
        </Link>
      }
    >
      <AuthForm mode="oubli" />
    </AuthShell>
  );
}
