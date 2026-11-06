import { NotchedMedia } from "@/components/ui/notched-media";

export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-xl bg-ligne ${className}`} />;
}

/** Même silhouette que ProductCard : image à encoches, onglet, prix, titre + badge, sous-titre. */
export function ProductCardSkeleton() {
  return (
    <div role="status" aria-label="Chargement du produit">
      <NotchedMedia tab={<Skeleton className="h-9 w-24" />} price={<Skeleton className="h-9 w-20" />}>
        <Skeleton className="h-full w-full rounded-none" />
      </NotchedMedia>
      <div className="mt-3 flex items-start justify-between gap-3">
        <Skeleton className="h-7 w-3/5" />
        <Skeleton className="mt-1 h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="mt-2 h-4 w-4/5" />
    </div>
  );
}
