import type { ReactNode } from "react";
import { Logo } from "@/components/site/logo";

/**
 * Écran d'erreur plein page (404, 500, accès refusé...) : dit ce qui se passe en langage simple,
 * ne révèle jamais de détail technique et propose toujours une sortie (`actions`).
 */
export function ErrorScreen({ code, titre, children, actions, reference }: { code: string; titre: string; children: ReactNode; actions: ReactNode; reference?: string }) {
  return (
    <div className="flex min-h-dvh flex-col px-6 py-6 sm:px-10">
      <Logo />
      <main id="contenu" className="mx-auto my-auto flex w-full max-w-xl flex-col items-center py-10 text-center">
        <span
          aria-hidden="true"
          className="bg-clip-text font-titre text-[clamp(7rem,28vw,15rem)] font-extrabold leading-none tracking-tighter text-transparent"
          style={{ backgroundImage: "linear-gradient(145deg, #ffc83d 10%, #ff6b3d 55%, #7c5cf0)" }}
        >
          {code}
        </span>
        <h1 className="mt-4 font-titre text-3xl font-bold leading-tight sm:text-4xl">{titre}</h1>
        <p className="mt-3 max-w-[44ch] text-encre-2">{children}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>
        {reference && <p className="mt-8 text-sm text-encre-2">Référence à nous communiquer : {reference}</p>}
      </main>
    </div>
  );
}
