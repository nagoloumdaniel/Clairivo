import type { ReactNode } from "react";

type Tone = "neutre" | "gratuit" | "bientot" | "serie";

// Chaque badge dit un fait vérifiable. Pas de « populaire » ni de « nouveau » sans donnée réelle.
const tones: Record<Tone, string> = {
  neutre: "border-2 border-encre text-encre",
  gratuit: "bg-menthe text-[#20202a]",
  bientot: "bg-soleil text-[#20202a]",
  serie: "bg-violet text-[#fff9f2]",
};

export function Badge({ tone = "neutre", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex min-h-7 items-center rounded-full px-3 text-xs font-semibold uppercase tracking-[0.06em] ${tones[tone]}`}>
      {children}
    </span>
  );
}
