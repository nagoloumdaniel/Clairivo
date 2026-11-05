import { z } from "zod";

export const UNIVERSES = [
  { id: "emploi", label: "Trouver un emploi" },
  { id: "ia", label: "Utiliser l'IA au travail" },
  { id: "freelancing", label: "Se lancer en freelance" },
  { id: "marketing-social", label: "Réseaux sociaux et marketing" },
  { id: "budget", label: "Gérer son budget" },
] as const;

// À changer à chaque modification du texte de la case de consentement.
export const CONSENT_VERSION = "2026-11-05";

const universeIds = UNIVERSES.map((u) => u.id) as [string, ...string[]];

export const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Indique ton adresse e-mail.")
    .max(254, "Cette adresse est trop longue.")
    .pipe(z.email("Cette adresse e-mail ne semble pas valide.")),
  universes: z.array(z.enum(universeIds)).max(UNIVERSES.length).default([]),
  consent: z.literal("on", { error: "Coche la case pour confirmer que tu es d'accord." }),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
