import { cardShape, priceBox, tabBox } from "@/components/ui/product-card";

export function Skeleton({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return <div aria-hidden="true" style={style} className={`animate-pulse rounded-md bg-ligne ${className}`} />;
}

/** Même silhouette que ProductCard : image à encoches, onglet, prix, titre + badge, sous-titre. */
export function ProductCardSkeleton() {
  return (
    <div role="status" aria-label="Chargement du produit">
      <div className="relative aspect-3/4">
        <Skeleton className="h-full w-full" style={cardShape} />
        <Skeleton className="absolute left-0 top-0" style={tabBox} />
        <Skeleton className="absolute bottom-0 right-0" style={priceBox} />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <Skeleton className="h-7 w-3/5" />
        <Skeleton className="mt-1 h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="mt-2 h-4 w-4/5" />
    </div>
  );
}
