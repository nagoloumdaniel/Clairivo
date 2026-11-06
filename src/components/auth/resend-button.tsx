"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ATTENTE = 30;

/** Renvoi du lien : bouton grisé avec décompte entre deux envois (limite côté serveur à venir en phase 5). */
export function ResendButton() {
  const [reste, setReste] = useState(ATTENTE);
  const [chargement, setChargement] = useState(false);

  useEffect(() => {
    if (reste <= 0) return;
    const t = window.setTimeout(() => setReste((r) => r - 1), 1000);
    return () => window.clearTimeout(t);
  }, [reste]);

  const renvoyer = () => {
    setChargement(true);
    window.setTimeout(() => {
      setChargement(false);
      setReste(ATTENTE);
    }, 1400);
  };

  return (
    <Button variant="secondary" onClick={renvoyer} loading={chargement} loadingLabel="Envoi…" disabled={reste > 0 && !chargement} className="w-full">
      {reste > 0 ? `Renvoyer le lien (${reste} s)` : "Renvoyer le lien"}
    </Button>
  );
}
