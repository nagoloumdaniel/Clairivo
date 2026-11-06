export type CategoryId = "emploi" | "ia" | "freelancing" | "marketing-social" | "budget";

const C = { encre: "#20202A", ivoire: "#FFF9F2", corail: "#FF7048", violet: "#7657E8", soleil: "#FFD45A", menthe: "#75D7B0", rose: "#F58DB7" };

const sujets: Record<CategoryId, string> = {
  emploi: "un CV et une loupe",
  ia: "une bulle de dialogue et des étincelles de calcul",
  freelancing: "un bureau avec un carnet et une horloge",
  "marketing-social": "un haut-parleur et des bulles de messages",
  budget: "une tirelire et des pièces",
};

/** Illustrations vectorielles originales, à plat, une par univers. Palette fixe de la marque. */
export function CategoryIllustration({ id, className = "" }: { id: CategoryId; className?: string }) {
  return (
    <svg viewBox="0 0 240 240" role="img" aria-label={`Illustration : ${sujets[id]}`} className={`block ${className}`}>
      {id === "emploi" && (
        <>
          <rect x="52" y="30" width="116" height="152" fill={C.ivoire} stroke={C.encre} strokeWidth="4" />
          <circle cx="86" cy="64" r="14" fill={C.rose} stroke={C.encre} strokeWidth="4" />
          <rect x="108" y="54" width="46" height="8" fill={C.encre} />
          <rect x="108" y="70" width="32" height="8" fill={C.encre} />
          <rect x="68" y="100" width="84" height="8" fill={C.violet} />
          <rect x="68" y="118" width="70" height="8" fill={C.encre} />
          <rect x="68" y="136" width="84" height="8" fill={C.encre} />
          <circle cx="164" cy="158" r="32" fill={C.soleil} fillOpacity="0.85" stroke={C.encre} strokeWidth="4" />
          <path d="M187 181 L214 208" stroke={C.encre} strokeWidth="10" strokeLinecap="round" />
        </>
      )}
      {id === "ia" && (
        <>
          <path d="M34 48 H178 V144 H92 L56 176 V144 H34 Z" fill={C.violet} stroke={C.encre} strokeWidth="4" strokeLinejoin="round" />
          <rect x="54" y="72" width="88" height="8" fill={C.ivoire} />
          <rect x="54" y="92" width="64" height="8" fill={C.ivoire} />
          <rect x="54" y="112" width="76" height="8" fill={C.ivoire} />
          <path d="M188 120 l9 22 22 9 -22 9 -9 22 -9 -22 -22 -9 22 -9 z" fill={C.soleil} stroke={C.encre} strokeWidth="4" strokeLinejoin="round" />
          <circle cx="204" cy="60" r="12" fill={C.menthe} stroke={C.encre} strokeWidth="4" />
        </>
      )}
      {id === "freelancing" && (
        <>
          <rect x="24" y="168" width="192" height="14" fill={C.encre} />
          <rect x="44" y="182" width="12" height="38" fill={C.encre} />
          <rect x="184" y="182" width="12" height="38" fill={C.encre} />
          <rect x="52" y="116" width="84" height="52" fill={C.menthe} stroke={C.encre} strokeWidth="4" />
          <rect x="52" y="116" width="14" height="52" fill={C.encre} />
          <rect x="82" y="132" width="42" height="7" fill={C.encre} />
          <rect x="82" y="148" width="30" height="7" fill={C.encre} />
          <circle cx="170" cy="100" r="44" fill={C.ivoire} stroke={C.encre} strokeWidth="4" />
          <path d="M170 72 V100 L190 112" fill="none" stroke={C.corail} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {id === "marketing-social" && (
        <>
          <path d="M40 96 H84 L148 56 V176 L84 136 H40 Z" fill={C.corail} stroke={C.encre} strokeWidth="4" strokeLinejoin="round" />
          <rect x="52" y="136" width="26" height="46" fill={C.encre} />
          <path d="M168 84 q22 36 0 72" fill="none" stroke={C.encre} strokeWidth="6" strokeLinecap="round" />
          <path d="M188 64 q36 56 0 112" fill="none" stroke={C.encre} strokeWidth="6" strokeLinecap="round" />
          <rect x="150" y="190" width="72" height="30" rx="15" fill={C.rose} stroke={C.encre} strokeWidth="4" />
          <circle cx="170" cy="205" r="4" fill={C.encre} />
          <circle cx="186" cy="205" r="4" fill={C.encre} />
          <circle cx="202" cy="205" r="4" fill={C.encre} />
        </>
      )}
      {id === "budget" && (
        <>
          <ellipse cx="110" cy="136" rx="70" ry="54" fill={C.rose} stroke={C.encre} strokeWidth="4" />
          <path d="M170 112 l26 -14 v34 l-22 -6 z" fill={C.rose} stroke={C.encre} strokeWidth="4" strokeLinejoin="round" />
          <rect x="80" y="176" width="16" height="30" fill={C.rose} stroke={C.encre} strokeWidth="4" />
          <rect x="126" y="176" width="16" height="30" fill={C.rose} stroke={C.encre} strokeWidth="4" />
          <rect x="88" y="104" width="44" height="8" fill={C.encre} />
          <circle cx="152" cy="122" r="5" fill={C.encre} />
          <circle cx="110" cy="46" r="26" fill={C.soleil} stroke={C.encre} strokeWidth="4" />
          <path d="M118 38 a12 12 0 1 0 0 16 M98 44 h16 M98 52 h16" fill="none" stroke={C.encre} strokeWidth="4" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export const categories: { id: CategoryId; label: string }[] = [
  { id: "emploi", label: "Trouver un emploi" },
  { id: "ia", label: "Utiliser l'IA au travail" },
  { id: "freelancing", label: "Se lancer en freelance" },
  { id: "marketing-social", label: "Réseaux sociaux et marketing" },
  { id: "budget", label: "Gérer son budget" },
];
