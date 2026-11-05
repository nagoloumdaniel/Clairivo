import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Cover, type CoverProps } from "@/components/ui/cover";
import { formatCents } from "@/lib/money";

/** Encoches de l'image : onglet catégorie en haut à gauche, boîte prix en bas à droite. */
export const notches = { tabW: "58%", tabH: "44px", priceW: "46%", priceH: "52px", gap: "8px" };

export const cardShape: CSSProperties = {
  clipPath: `polygon(0 ${notches.tabH}, ${notches.tabW} ${notches.tabH}, ${notches.tabW} 0, 100% 0, 100% calc(100% - ${notches.priceH}), calc(100% - ${notches.priceW}) calc(100% - ${notches.priceH}), calc(100% - ${notches.priceW}) 100%, 0 100%)`,
};

export const tabBox: CSSProperties = {
  width: `calc(${notches.tabW} - ${notches.gap})`,
  height: `calc(${notches.tabH} - ${notches.gap})`,
};

export const priceBox: CSSProperties = {
  width: `calc(${notches.priceW} - ${notches.gap})`,
  height: `calc(${notches.priceH} - ${notches.gap})`,
};

type Props = {
  href: string;
  cover: CoverProps;
  titre: string;
  pour: string;
  /** Prix en centimes, TTC. 0 = gratuit. */
  prixCents: number;
  badge?: ReactNode;
  /** Libellé de l'onglet, par défaut le sujet de la couverture. */
  categorie?: string;
};

export function ProductCard({ href, cover, titre, pour, prixCents, badge, categorie }: Props) {
  return (
    <article className="group relative">
      <div className="relative aspect-3/4">
        <div className="h-full w-full rounded-md transition-transform duration-200 group-hover:-translate-y-1" style={cardShape}>
          <Cover {...cover} />
        </div>
        <p
          style={tabBox}
          className="absolute left-0 top-0 flex items-center rounded-md border-2 border-encre bg-surface px-3 font-titre text-xs font-semibold uppercase tracking-[0.08em]"
        >
          <span className="truncate">{categorie ?? cover.sujet}</span>
        </p>
        <p
          style={priceBox}
          className="absolute bottom-0 right-0 flex items-center justify-center rounded-md border-2 border-encre bg-surface px-3 font-titre text-lg font-bold tabular-nums"
        >
          {prixCents === 0 ? "Gratuit" : formatCents(prixCents)}
        </p>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <h3 className="font-titre text-xl font-semibold leading-snug">
          <Link href={href} className="after:absolute after:inset-0">
            {titre}
          </Link>
        </h3>
        {badge && <div className="shrink-0 pt-1">{badge}</div>}
      </div>
      <p className="mt-1 text-sm text-encre-2">{pour}</p>
    </article>
  );
}
