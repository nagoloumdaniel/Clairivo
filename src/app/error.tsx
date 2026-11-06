"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { ErrorScreen } from "@/components/site/error-screen";
import { Button, ButtonLink } from "@/components/ui/button";

/** Erreur inattendue : le détail part vers Sentry, l'utilisateur ne voit que la référence (digest) et une sortie. */
export default function Erreur({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <ErrorScreen
      code="500"
      titre="Quelque chose s'est mal passé."
      reference={error.digest}
      actions={
        <>
          <Button onClick={reset}>Réessayer</Button>
          <ButtonLink href="/accueil" variant="secondary">
            Retour à l&apos;accueil
          </ButtonLink>
        </>
      }
    >
      Ce n&apos;est pas de ton fait. Réessaie dans un instant, et si le problème continue, écris-nous avec la référence ci-dessous.
    </ErrorScreen>
  );
}
