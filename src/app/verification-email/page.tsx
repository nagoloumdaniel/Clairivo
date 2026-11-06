import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResendButton } from "@/components/auth/resend-button";

export const metadata: Metadata = { title: "Vérifie ton e-mail | Clairivo", robots: { index: false, follow: false } };

export default function VerificationEmail() {
  return (
    <AuthShell
      titre="Vérifie ta boîte mail."
      texte="À la création du compte, un lien de confirmation t'est envoyé. Ouvre-le pour activer ton accès. Pense aux courriers indésirables."
      pied={
        <Link href="/connexion" className="font-semibold text-encre underline underline-offset-4">
          Retour à la connexion
        </Link>
      }
    >
      <ResendButton />
    </AuthShell>
  );
}
