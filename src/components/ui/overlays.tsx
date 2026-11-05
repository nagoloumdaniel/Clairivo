"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type SheetProps = { titre: string; ouvrir: string; children: ReactNode; cote?: "centre" | "droite" };

/**
 * Modale et tiroir sur l'élément natif <dialog> : focus piégé, Échap et inertie du fond gérés par le navigateur.
 * Le tiroir (cote="droite") sert au menu mobile et aux filtres.
 */
export function Sheet({ titre, ouvrir, children, cote = "centre" }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const position =
    cote === "droite"
      ? "ml-auto mr-0 h-dvh max-h-dvh w-[min(24rem,100%)] rounded-none border-y-0 border-r-0"
      : "m-auto w-[min(32rem,calc(100%-2rem))] rounded-md";
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => ref.current?.showModal()}>
        {ouvrir}
      </Button>
      <dialog
        ref={ref}
        aria-labelledby="sheet-titre"
        onClick={(e) => e.target === ref.current && ref.current?.close()}
        className={`${position} border-2 border-encre bg-surface p-0 text-encre backdrop:bg-[#20202a]/60`}
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 id="sheet-titre" className="font-titre text-2xl font-semibold">
              {titre}
            </h2>
            <button type="button" onClick={() => ref.current?.close()} className="min-h-11 min-w-11 rounded-md font-semibold underline">
              Fermer
            </button>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </dialog>
    </>
  );
}

/** Notification brève, annoncée aux lecteurs d'écran, qui disparaît seule mais reste fermable. */
export function ToastDemo({ declencheur, message }: { declencheur: string; message: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(t);
  }, [visible]);
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setVisible(true)}>
        {declencheur}
      </Button>
      <div aria-live="polite" className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex justify-center">
        {visible && (
          <div className="pointer-events-auto flex max-w-md items-center gap-4 rounded-md border-2 border-[#20202a] bg-menthe px-5 py-3 text-[#20202a]">
            <p className="font-semibold">{message}</p>
            <button type="button" onClick={() => setVisible(false)} className="min-h-11 shrink-0 font-semibold underline">
              Fermer
            </button>
          </div>
        )}
      </div>
    </>
  );
}
