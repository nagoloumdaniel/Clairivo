"use client";

import { motion, useReducedMotion } from "motion/react";

type CoverProps = {
  fond: string;
  encre: string;
  accent: string;
  format: string;
  sujet: string;
  forme: "cercle" | "arcs" | "bandes";
  droite?: boolean;
};

function Cover({ fond, encre, accent, format, sujet, forme, droite }: CoverProps) {
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
      <text x={droite ? 216 : 24} textAnchor={droite ? "end" : "start"} y="44" fill={encre} fontFamily="var(--font-inter), sans-serif" fontSize="11" fontWeight="600" letterSpacing="1.4">
        {format.toUpperCase()}
      </text>
      <text x={droite ? 216 : 24} textAnchor={droite ? "end" : "start"} y="86" fill={encre} fontFamily="var(--font-sora), sans-serif" fontSize="34" fontWeight="700">
        {sujet}
      </text>
    </svg>
  );
}

const covers: { cover: CoverProps; x: number | string; r: number; y: number }[] = [
  { cover: { fond: "#FFD45A", encre: "#20202A", accent: "#F58DB7", format: "Checklist", sujet: "Emploi", forme: "cercle" }, x: "-78%", r: -8, y: 14 },
  { cover: { fond: "#7657E8", encre: "#FFF9F2", accent: "#FFD45A", format: "Guide", sujet: "IA", forme: "arcs" }, x: 0, r: 0, y: 0 },
  { cover: { fond: "#75D7B0", encre: "#20202A", accent: "#FFF9F2", format: "Checklist", sujet: "Freelance", forme: "bandes", droite: true }, x: "78%", r: 8, y: 18 },
];

export function CoverFan() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-[4/3.6] w-full max-w-[30rem]">
      {covers.map(({ cover, x, r, y }, i) => (
        <motion.div
          key={cover.sujet}
          className="absolute left-1/2 top-1/2 w-[32%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_14px_18px_rgba(32,32,42,0.28)]"
          style={{ aspectRatio: "3 / 4", zIndex: i === 1 ? 2 : 1 }}
          initial={reduce ? { x, y, rotate: r } : { x: 0, y: 0, rotate: 0 }}
          animate={{ x, y, rotate: r }}
          transition={reduce ? { duration: 0 } : { duration: 0.9, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
        >
          <Cover {...cover} />
        </motion.div>
      ))}
    </div>
  );
}
