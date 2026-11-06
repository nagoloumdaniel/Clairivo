import type { ReactNode } from "react";

type Tone = "neutre" | "gratuit" | "bientot" | "serie" | "clair";

// Pastille teintée + icône à gauche. Chaque badge dit un fait vérifiable (pas de « populaire » sans donnée).
// Texte foncé en thème clair, teinte claire en thème sombre : lisible dans les deux.
const tones: Record<Tone, string> = {
  neutre: "border-encre/25 bg-encre/10 text-encre",
  gratuit: "border-menthe/50 bg-menthe/15 text-[#14684b] dark:text-menthe",
  bientot: "border-soleil/70 bg-soleil/20 text-[#7a5800] dark:text-soleil",
  serie: "border-violet/50 bg-violet/15 text-violet dark:text-[#c1b2ff]",
  // Sur un fond en dégradé: pastille claire fixe, texte encre fixe.
  clair: "border-white/70 bg-white/85 text-[#20202a]",
};

const icones: Record<Tone, ReactNode> = {
  neutre: <path d="M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  gratuit: <path d="m8 12 3 3 5-6m5 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  bientot: <path d="M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  serie: <path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 4 9 5 9-5" />,
  clair: <path d="M20 12 12 20 4 12V4h8l8 8Zm-12-4h.01" />,
};

export function Badge({ tone = "neutre", children, icon }: { tone?: Tone; children: ReactNode; icon?: ReactNode }) {
  return (
    <span className={`inline-flex min-h-7 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-semibold ${tones[tone]}`}>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {icon ?? icones[tone]}
      </svg>
      {children}
    </span>
  );
}
