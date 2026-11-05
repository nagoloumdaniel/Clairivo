"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

/** Icônes animées avec une intention : confirmer une action. Mouvement coupé si l'utilisateur le demande. */

export function FavoriteButton({ label = "Ajouter aux favoris" }: { label?: string }) {
  const [on, setOn] = useState(false);
  const reduit = useReducedMotion();
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={label}
      onClick={() => setOn((v) => !v)}
      className="inline-flex size-11 items-center justify-center rounded-full border-2 border-encre text-encre"
    >
      <motion.svg
        key={String(on)}
        viewBox="0 0 24 24"
        className="size-6"
        initial={reduit ? false : { scale: on ? 0.6 : 1 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 14 }}
      >
        <path
          d="M12 20.5s-8-4.9-8-11A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 6.1-8 11-8 11z"
          fill={on ? "#FF7048" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </motion.svg>
    </button>
  );
}

export function SuccessCheck({ label = "Paiement confirmé" }: { label?: string }) {
  const reduit = useReducedMotion();
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label={label} className="size-16">
      <motion.circle
        cx="32"
        cy="32"
        r="28"
        fill="#75D7B0"
        stroke="#20202A"
        strokeWidth="4"
        initial={reduit ? false : { scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ transformOrigin: "center" }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M19 33 l9 9 17-19"
        fill="none"
        stroke="#20202A"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduit ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
      />
    </svg>
  );
}

export function DownloadIcon({ declencheur = "Télécharger" }: { declencheur?: string }) {
  const [n, setN] = useState(0);
  const reduit = useReducedMotion();
  return (
    <button
      type="button"
      onClick={() => setN((v) => v + 1)}
      className="inline-flex min-h-11 items-center gap-2 rounded-md border-2 border-encre px-4 font-semibold text-encre"
    >
      <svg viewBox="0 0 24 24" className="size-5 overflow-hidden" aria-hidden="true">
        <motion.g
          key={n}
          initial={reduit || n === 0 ? false : { y: -14 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d="M12 3 v11 M7 10 l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        <path d="M4 20 h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      {declencheur}
    </button>
  );
}
