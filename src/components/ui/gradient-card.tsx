import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { GlassIcon } from "@/components/ui/glass-icon";

type Props = {
  href: string;
  titre: string;
  texte?: string;
  /** Dégradé du fond. */
  de: string;
  vers: string;
  /** Couleur du texte, choisie pour le contraste avec le dégradé. */
  couleurTexte: string;
  /** Identifiant de l'univers : choisit le pictogramme de la tuile de verre. */
  icone: string;
  etiquette?: string;
  lien?: string;
  className?: string;
  /** Taille et position de la tuile dans la carte. */
  imageClassName?: string;
  children?: ReactNode;
};

/** Carte à dégradé avec tuile de verre, sans animation de survol (décision utilisateur). */
export function GradientCard({ href, titre, texte, de, vers, couleurTexte, icone, etiquette, lien = "Découvrir", className = "", imageClassName = "", children }: Props) {
  return (
    <article
      className={`group relative isolate flex overflow-hidden rounded-3xl p-6 ${className}`}
      style={{ background: `linear-gradient(145deg, ${de}, ${vers})`, color: couleurTexte }}
    >
      <div aria-hidden="true" className="absolute -right-10 -top-10 -z-10 size-48 rounded-full bg-white/25 blur-3xl" />
      <GlassIcon id={icone} className={`absolute -z-10 ${imageClassName}`} />
      <div className="relative z-10 flex min-h-0 w-full flex-col justify-between gap-6">
        <div>
          {etiquette && (
            <Badge tone="clair">{etiquette}</Badge>
          )}
          <h3 className="mt-3 max-w-[14ch] font-titre text-2xl font-bold leading-tight md:text-3xl">
            <Link href={href} className="after:absolute after:inset-0 after:z-20">
              {titre}
            </Link>
          </h3>
          {texte && <p className="mt-2 max-w-[24ch] text-sm font-medium opacity-90">{texte}</p>}
          {children}
        </div>
        <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em]">
          {lien}
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
        </p>
      </div>
    </article>
  );
}
