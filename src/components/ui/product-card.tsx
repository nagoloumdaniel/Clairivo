import Link from "next/link";
import type { ReactNode } from "react";
import { Cover, type CoverProps } from "@/components/ui/cover";
import { NotchedMedia } from "@/components/ui/notched-media";
import { formatCents } from "@/lib/money";

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

const boite = "flex h-9 items-center rounded-md border-2 border-encre bg-surface px-3 font-titre font-semibold";

export function ProductCard({ href, cover, titre, pour, prixCents, badge, categorie }: Props) {
  return (
    <article className="group relative">
      <NotchedMedia
        tab={<p className={`${boite} text-xs uppercase tracking-[0.08em]`}><span className="truncate">{categorie ?? cover.sujet}</span></p>}
        price={<p className={`${boite} text-base font-bold tabular-nums`}>{prixCents === 0 ? "Gratuit" : formatCents(prixCents)}</p>}
      >
        <Cover {...cover} />
      </NotchedMedia>
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
