import type { ReactNode } from "react";

type Props = { children: ReactNode; tab: ReactNode; price: ReactNode; className?: string };

/**
 * Zone image à 2 encoches (onglet en haut à gauche, prix en bas à droite).
 * Les encoches s'adaptent à la largeur de leur contenu ; elles sont peintes en ivoire, la carte se pose donc sur fond ivoire.
 */
export function NotchedMedia({ children, tab, price, className = "" }: Props) {
  return (
    <div className={`relative aspect-3/4 ${className}`}>
      <div className="h-full w-full overflow-hidden rounded-xl">{children}</div>
      <div className="notch notch-tl">{tab}</div>
      <div className="notch notch-br">{price}</div>
    </div>
  );
}
