"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { GlassIcon } from "@/components/ui/glass-icon";
import { formatCents } from "@/lib/money";
import { univers } from "@/lib/univers";

/** Tiroir du panier sur <dialog> : focus piégé, Échap et fond inerte gérés par le navigateur. */
export function CartDrawer() {
  const { ouvert, fermer, lignes, totalCents, retirer, nombre } = useCart();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (ouvert && !d.open) d.showModal();
    if (!ouvert && d.open) d.close();
  }, [ouvert]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="panier-titre"
      onClose={fermer}
      onClick={(e) => e.target === ref.current && fermer()}
      className="tiroir m-0 ml-auto h-dvh max-h-dvh w-[min(26rem,100%)] bg-transparent p-3 text-encre backdrop:bg-transparent backdrop:backdrop-blur-sm"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-encre/15 bg-surface/95 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4 px-6 pb-4 pt-6">
          <h2 id="panier-titre" className="font-titre text-2xl font-bold">
            Ton panier
            <span className="ml-2 inline-flex min-w-7 justify-center rounded-full bg-violet px-2 align-middle text-sm leading-6 text-[#fff9f2] tabular-nums">{nombre}</span>
          </h2>
          <button type="button" onClick={fermer} aria-label="Fermer le panier" className="inline-flex size-11 items-center justify-center rounded-full hover:bg-encre/10">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {lignes.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex size-24 items-center justify-center rounded-[2rem]" style={{ background: "linear-gradient(145deg, #ffb3d2, #f07aac)" }}>
              <GlassIcon id="budget" className="size-16" />
            </span>
            <p className="mt-6 font-titre text-xl font-bold">Ton panier est vide</p>
            <p className="mt-2 max-w-[28ch] text-encre-2">Choisis une ressource dans le catalogue, elle apparaîtra ici.</p>
            <Link href="/catalogue" onClick={fermer} className="mt-6 inline-flex h-12 items-center rounded-full bg-corail px-6 font-bold text-[#20202a] hover:bg-[#ff8660]">
              Voir le catalogue
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto px-4 pb-4">
              {lignes.map((l) => {
                const u = univers.find((x) => x.id === l.univers) ?? univers[0]!;
                return (
                  <li key={l.id} className="flex items-center gap-4 rounded-3xl border border-encre/10 bg-surface/70 p-3">
                    <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl" style={{ background: `linear-gradient(145deg, ${u.de}, ${u.vers})` }}>
                      <GlassIcon id={u.id} className="size-11" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-titre font-semibold">{l.titre}</p>
                      <p className="text-sm text-encre-2">{u.label}</p>
                      <p className="mt-1 font-bold tabular-nums">{formatCents(l.prixCents)}</p>
                    </div>
                    <button type="button" onClick={() => retirer(l.id)} aria-label={`Retirer ${l.titre}`} className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-encre-2 hover:bg-encre/10 hover:text-encre">
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14M10 11v5m4-5v5" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-encre/10 px-6 pb-6 pt-5">
              <p className="flex items-baseline justify-between">
                <span className="text-encre-2">Total TTC</span>
                <span className="font-titre text-3xl font-bold tabular-nums">{formatCents(totalCents)}</span>
              </p>
              <p className="mt-2 text-sm text-encre-2">Téléchargement immédiat après paiement. Le montant final est confirmé par le serveur.</p>
              <button type="button" disabled className="mt-4 inline-flex h-14 w-full items-center justify-center rounded-full bg-corail font-bold text-[#20202a] disabled:opacity-50">
                Paiement bientôt disponible
              </button>
              <button type="button" onClick={fermer} className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full font-semibold text-encre-2 hover:text-encre">
                Continuer mes achats
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
