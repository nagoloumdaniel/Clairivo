import Link from "next/link";
import type { ReactNode } from "react";
import { Cover, type CoverProps } from "@/components/ui/cover";
import { formatCents } from "@/lib/money";

type Props = {
  href: string;
  cover: CoverProps;
  titre: string;
  pour: string;
  /** Prix en centimes, TTC. 0 = gratuit. */
  prixCents: number;
  badge?: ReactNode;
};

export function ProductCard({ href, cover, titre, pour, prixCents, badge }: Props) {
  return (
    <article className="group relative">
      <div className="aspect-[3/4] overflow-hidden rounded-md transition-transform duration-200 group-hover:-translate-y-1">
        <Cover {...cover} />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="font-titre text-xs font-semibold uppercase tracking-[0.08em] text-encre-2">{cover.format}</span>
        {badge}
      </div>
      <h3 className="mt-1 font-titre text-xl font-semibold leading-snug">
        <Link href={href} className="after:absolute after:inset-0">
          {titre}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-encre-2">{pour}</p>
      <p className="mt-3 font-titre text-lg font-bold">{prixCents === 0 ? "Gratuit" : formatCents(prixCents)}</p>
    </article>
  );
}
