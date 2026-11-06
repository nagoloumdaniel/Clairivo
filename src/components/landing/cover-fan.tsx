"use client";

import { motion, useReducedMotion } from "motion/react";

import { Cover, type CoverProps } from "@/components/ui/cover";

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
