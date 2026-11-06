const themes = [
  "CV et lettres de motivation",
  "Entretiens d'embauche",
  "Prompts pour l'IA",
  "Devis et contrats freelance",
  "Calendriers éditoriaux",
  "Budget mensuel",
  "Checklists",
  "Modèles à remplir",
  "Mini-cours",
];

/** Bande lente et infinie : la liste est dupliquée, la seconde copie est masquée aux lecteurs d'écran. */
export function Marquee() {
  return (
    <section aria-label="Thèmes couverts" className="overflow-hidden border-y border-encre/15 bg-surface py-5">
      <div className="defile flex">
        {[0, 1].map((copie) => (
          <ul key={copie} aria-hidden={copie === 1} className="flex shrink-0 items-center">
            {themes.map((t, i) => (
              <li key={t} className="flex items-center">
                <span className="px-6 font-titre text-xl font-semibold text-encre md:text-2xl">{t}</span>
                <span aria-hidden="true" className="size-3 rounded-full" style={{ background: ["#ff7048", "#7657e8", "#ffd45a", "#75d7b0", "#f58db7"][i % 5] }} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
