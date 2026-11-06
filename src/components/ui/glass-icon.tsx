import type { ReactNode } from "react";

// Tracés au format Lucide (24x24, trait 2). Un pictogramme par univers.
const traces: Record<string, ReactNode> = {
  emploi: (
    <>
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  ia: (
    <>
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
    </>
  ),
  freelancing: <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />,
  "marketing-social": (
    <>
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </>
  ),
  budget: (
    <>
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </>
  ),
};

/** Grande tuile de verre avec pictogramme : pas de fond d'image, donc aucun résidu. Taille et position via className. */
export function GlassIcon({ id, className = "" }: { id: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none flex aspect-square items-center justify-center rounded-[28%] border border-white/60 bg-gradient-to-br from-white/55 to-white/15 shadow-[0_18px_40px_-14px_rgba(32,32,42,0.45),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-md ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-[52%] text-white motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110 drop-shadow-[0_4px_8px_rgba(32,32,42,0.35)]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {traces[id]}
      </svg>
    </span>
  );
}
