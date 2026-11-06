import Link from "next/link";

/** Logo adopté : point corail + mot Clairivo. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/accueil" aria-label="Clairivo, accueil" className={`inline-flex h-9 items-center gap-2 font-titre text-xl font-bold leading-none text-encre ${className}`}>
      <span aria-hidden="true" className="size-3.5 rounded-full bg-corail" />
      Clairivo
    </Link>
  );
}
