export type CoverProps = {
  fond: string;
  encre: string;
  accent: string;
  format: string;
  sujet: string;
  forme: "cercle" | "arcs" | "bandes";
  droite?: boolean;
};

export function Cover({ fond, encre, accent, format, sujet, forme, droite }: CoverProps) {
  return (
    <svg viewBox="0 0 240 320" role="img" aria-label={`Couverture ${format.toLowerCase()} : ${sujet}`} className="block h-full w-full">
      <rect width="240" height="320" rx="10" fill={fond} />
      {forme === "cercle" && (
        <>
          <circle cx="150" cy="190" r="78" fill={accent} />
          <circle cx="150" cy="190" r="34" fill={fond} />
          <rect x="24" y="238" width="96" height="10" fill={encre} />
        </>
      )}
      {forme === "arcs" && (
        <>
          <path d="M24 280 A96 96 0 0 1 216 280" fill="none" stroke={accent} strokeWidth="22" />
          <path d="M60 280 A60 60 0 0 1 180 280" fill="none" stroke={encre} strokeWidth="22" />
          <circle cx="120" cy="214" r="14" fill={accent} />
        </>
      )}
      {forme === "bandes" && (
        <>
          <rect x="24" y="150" width="192" height="28" fill={accent} />
          <rect x="24" y="190" width="132" height="28" fill={encre} />
          <rect x="24" y="230" width="164" height="28" fill={accent} />
        </>
      )}
      <text x={droite ? 216 : 24} textAnchor={droite ? "end" : "start"} y="68" fill={encre} fontFamily="var(--font-inter), sans-serif" fontSize="11" fontWeight="600" letterSpacing="1.4">
        {format.toUpperCase()}
      </text>
      <text x={droite ? 216 : 24} textAnchor={droite ? "end" : "start"} y="108" fill={encre} fontFamily="var(--font-sora), sans-serif" fontSize="34" fontWeight="700">
        {sujet}
      </text>
    </svg>
  );
}
