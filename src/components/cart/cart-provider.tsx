"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/** Une ligne du panier. Le prix ici sert à l'affichage : le serveur recalcule tout au paiement. */
export type LignePanier = { id: string; titre: string; prixCents: number; univers: string };

type Panier = {
  lignes: LignePanier[];
  nombre: number;
  totalCents: number;
  ouvert: boolean;
  ouvrir: () => void;
  fermer: () => void;
  ajouter: (l: LignePanier) => void;
  retirer: (id: string) => void;
  vider: () => void;
};

const Ctx = createContext<Panier | null>(null);
const CLE = "clairivo-panier";

function estLigne(l: unknown): l is LignePanier {
  if (typeof l !== "object" || l === null) return false;
  const o = l as Record<string, unknown>;
  return typeof o.id === "string" && typeof o.titre === "string" && Number.isInteger(o.prixCents) && typeof o.univers === "string";
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lignes, setLignes] = useState<LignePanier[]>([]);
  const [ouvert, setOuvert] = useState(false);
  const [pret, setPret] = useState(false);

  useEffect(() => {
    try {
      const brut = localStorage.getItem(CLE);
      if (brut) {
        const lu: unknown = JSON.parse(brut);
        // Lecture unique du stockage navigateur après l'hydratation.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (Array.isArray(lu)) setLignes(lu.filter(estLigne));
      }
    } catch {}
    setPret(true);
  }, []);
  useEffect(() => {
    if (!pret) return;
    try {
      localStorage.setItem(CLE, JSON.stringify(lignes));
    } catch {}
  }, [lignes, pret]);

  const ajouter = useCallback((l: LignePanier) => {
    // Ressource numérique : une seule fois par produit.
    setLignes((cur) => (cur.some((x) => x.id === l.id) ? cur : [...cur, l]));
    setOuvert(true);
  }, []);
  const retirer = useCallback((id: string) => setLignes((cur) => cur.filter((x) => x.id !== id)), []);
  const vider = useCallback(() => setLignes([]), []);

  const valeur = useMemo<Panier>(
    () => ({
      lignes,
      nombre: lignes.length,
      totalCents: lignes.reduce((t, l) => t + l.prixCents, 0),
      ouvert,
      ouvrir: () => setOuvert(true),
      fermer: () => setOuvert(false),
      ajouter,
      retirer,
      vider,
    }),
    [lignes, ouvert, ajouter, retirer, vider],
  );
  return <Ctx.Provider value={valeur}>{children}</Ctx.Provider>;
}

export function useCart(): Panier {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart doit être utilisé dans <CartProvider>");
  return c;
}
