export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-md bg-ligne ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div role="status" aria-label="Chargement du produit" className="space-y-3">
      <Skeleton className="aspect-[3/4] w-full" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-6 w-4/5" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}
