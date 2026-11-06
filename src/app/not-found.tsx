import type { Metadata } from "next";
import { ErrorScreen } from "@/components/site/error-screen";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page introuvable | Clairivo", robots: { index: false } };

export default function NotFound() {
  return (
    <ErrorScreen
      code="404"
      titre="Cette page n'existe pas."
      actions={
        <>
          <ButtonLink href="/accueil">Retour à l&apos;accueil</ButtonLink>
          <ButtonLink href="/connexion" variant="secondary">
            Mon compte
          </ButtonLink>
        </>
      }
    >
      Le lien est peut-être ancien ou mal tapé. Reprends depuis l&apos;accueil, tes ressources sont toujours là.
    </ErrorScreen>
  );
}
