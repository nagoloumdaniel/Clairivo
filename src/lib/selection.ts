import type { CoverProps } from "@/components/ui/cover";
import type { Univers } from "@/lib/univers";

export type Ressource = {
  slug: string;
  titre: string;
  pour: string;
  /** Prix en centimes, TTC. 0 = gratuit. Prix provisoires du cahier des charges (chapitre 23). */
  prixCents: number;
  univers: Univers["id"];
  format: string;
  forme: CoverProps["forme"];
};

/** Palette de couverture par univers (fond, encre, accent). */
export const palettes: Record<Univers["id"], Pick<CoverProps, "fond" | "encre" | "accent">> = {
  emploi: { fond: "#FFD45A", encre: "#20202A", accent: "#F58DB7" },
  ia: { fond: "#7657E8", encre: "#FFF9F2", accent: "#FFD45A" },
  freelancing: { fond: "#75D7B0", encre: "#20202A", accent: "#FFF9F2" },
  "marketing-social": { fond: "#F58DB7", encre: "#20202A", accent: "#FFD45A" },
  budget: { fond: "#FF7048", encre: "#20202A", accent: "#FFF9F2" },
};

/** Catalogue de départ prévu (cahier des charges, chapitre 23). Rien n'est encore en vente. */
export const ressources: Ressource[] = [
  { slug: "checklist-cv-professionnel", titre: "Checklist CV professionnel", pour: "Relire son CV point par point avant d'envoyer.", prixCents: 0, univers: "emploi", format: "Checklist", forme: "cercle" },
  { slug: "modele-cv-ats", titre: "Modèle CV ATS", pour: "Un CV que les logiciels de tri savent lire.", prixCents: 399, univers: "emploi", format: "Modèle", forme: "bandes" },
  { slug: "pack-messages-candidature", titre: "Pack messages de candidature", pour: "Des messages prêts à adapter pour postuler.", prixCents: 399, univers: "emploi", format: "Pack", forme: "arcs" },
  { slug: "guide-entretien-embauche", titre: "Guide entretien d'embauche", pour: "Préparer ses réponses et ses questions.", prixCents: 499, univers: "emploi", format: "Guide", forme: "cercle" },
  { slug: "comprendre-ia-generative", titre: "Comprendre l'IA générative", pour: "Ce que ces outils font vraiment, et comment les utiliser.", prixCents: 0, univers: "ia", format: "Guide", forme: "arcs" },
  { slug: "pack-prompts-travail", titre: "Pack prompts pour le travail", pour: "Des prompts pour écrire, résumer et organiser.", prixCents: 399, univers: "ia", format: "Pack", forme: "bandes" },
  { slug: "workflows-ia-debutants", titre: "Workflows IA pour débutants", pour: "Enchaîner plusieurs outils pour une tâche complète.", prixCents: 999, univers: "ia", format: "Mini-cours", forme: "cercle" },
  { slug: "planner-budget-mensuel", titre: "Planner budget mensuel", pour: "Suivre ses revenus et ses dépenses du mois.", prixCents: 0, univers: "budget", format: "Planner", forme: "bandes" },
  { slug: "tableur-budget-avance", titre: "Tableur budget avancé", pour: "Catégories, objectifs et suivi sur l'année.", prixCents: 249, univers: "budget", format: "Tableur", forme: "arcs" },
  { slug: "checklist-lancement-freelance", titre: "Checklist lancement freelance", pour: "Ne rien oublier avant de facturer.", prixCents: 0, univers: "freelancing", format: "Checklist", forme: "bandes" },
  { slug: "construire-offre-service", titre: "Construire son offre de service", pour: "Dire clairement ce que tu vends et à qui.", prixCents: 249, univers: "freelancing", format: "Guide", forme: "cercle" },
  { slug: "trouver-premiers-clients", titre: "Trouver ses premiers clients", pour: "Une méthode pas à pas pour décrocher les premiers contrats.", prixCents: 999, univers: "freelancing", format: "Mini-cours", forme: "arcs" },
  { slug: "creer-son-portfolio", titre: "Créer son portfolio", pour: "Montrer son travail de façon claire et crédible.", prixCents: 699, univers: "freelancing", format: "Guide", forme: "bandes" },
  { slug: "calendrier-contenu-social", titre: "Calendrier de contenu social", pour: "Planifier ses publications sur le mois.", prixCents: 399, univers: "marketing-social", format: "Modèle", forme: "cercle" },
  { slug: "pack-modeles-posts", titre: "Pack modèles de posts", pour: "Des structures de posts à remplir.", prixCents: 499, univers: "marketing-social", format: "Pack", forme: "arcs" },
];
