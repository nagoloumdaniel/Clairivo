export type Univers = {
  id: "emploi" | "ia" | "freelancing" | "marketing-social" | "budget";
  label: string;
  court: string;
  phrase: string;
  /** Dégradé du fond de la carte (clair vers foncé de la même teinte). */
  de: string;
  vers: string;
  /** Texte lisible sur le dégradé. */
  texte: string;
};

export const univers: Univers[] = [
  { id: "emploi", label: "Trouver un emploi", court: "Emploi", phrase: "CV, lettres et entretiens, en clair.", de: "#ffe083", vers: "#f2b21c", texte: "#20202a" },
  { id: "ia", label: "Utiliser l'IA au travail", court: "IA", phrase: "Des prompts qui font gagner du temps.", de: "#34304a", vers: "#17161f", texte: "#fff9f2" },
  { id: "freelancing", label: "Se lancer en freelance", court: "Freelance", phrase: "Devis, contrats, premiers clients.", de: "#9bebcc", vers: "#46c398", texte: "#20202a" },
  { id: "marketing-social", label: "Réseaux sociaux et marketing", court: "Réseaux", phrase: "Calendriers et idées de posts.", de: "#b4dcff", vers: "#5aa6ec", texte: "#20202a" },
  { id: "budget", label: "Gérer son budget", court: "Budget", phrase: "Un budget mensuel en 20 minutes.", de: "#ffb3d2", vers: "#f07aac", texte: "#20202a" },
];

