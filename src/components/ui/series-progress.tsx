/** Progression dans une série : « 2 sur 5 ». Le texte porte l'information, la barre la renforce. */
export function SeriesProgress({ done, total, label }: { done: number; total: number; label: string }) {
  const safeTotal = Math.max(total, 1);
  const pct = Math.min(100, Math.round((done / safeTotal) * 100));
  return (
    <div>
      <p className="text-sm font-semibold">
        {label} : {done} sur {total}
      </p>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        className="mt-2 h-3 overflow-hidden rounded-full border-2 border-encre"
      >
        <div className="h-full bg-violet transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
