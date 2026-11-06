import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ui/product-card";
import { palettes, type Ressource } from "@/lib/selection";
import { univers } from "@/lib/univers";

/** Grille de cartes à encoches. Les fiches produit arrivent en phase 4 : en attendant, la carte mène à l'inscription. */
export function SelectionGrid({ items }: { items: Ressource[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((r) => {
        const u = univers.find((x) => x.id === r.univers)!;
        return (
          <li key={r.slug}>
            <ProductCard
              href="/inscription"
              cover={{ ...palettes[r.univers], format: r.format, sujet: u.court, forme: r.forme }}
              titre={r.titre}
              pour={r.pour}
              prixCents={r.prixCents}
              badge={<Badge tone="bientot">Bientôt</Badge>}
            />
          </li>
        );
      })}
    </ul>
  );
}
