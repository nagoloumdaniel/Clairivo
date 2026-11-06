"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-animated";

export function ThemeToggle() {
  const [sombre, setSombre] = useState(false);
  useEffect(() => {
    // Le thème vient du DOM (script du layout) : lu une fois après l'hydratation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSombre(document.documentElement.dataset.theme === "dark");
  }, []);
  const bascule = () => {
    const suivant = sombre ? "light" : "dark";
    document.documentElement.dataset.theme = suivant;
    try {
      localStorage.setItem("theme", suivant);
    } catch {}
    setSombre(!sombre);
  };
  return (
    <button
      type="button"
      onClick={bascule}
      aria-label={sombre ? "Passer au thème clair" : "Passer au thème sombre"}
      className="inline-flex size-9 items-center justify-center rounded-full text-encre transition-colors hover:bg-encre/10"
    >
      {sombre ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </button>
  );
}
