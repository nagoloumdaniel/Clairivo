import Link from "next/link";
import { univers } from "@/lib/univers";

/** Pied de page sombre dans les deux thèmes. Seuls les liens vers des pages existantes sont affichés. */
export function Footer() {
  const lien = "inline-flex min-h-11 items-center text-[#e6dfd6] hover:text-white hover:underline dark:text-[#4a4658] dark:hover:text-[#20202a]";
  return (
    <footer className="bg-[#14131a] px-6 py-14 text-[#fff9f2] dark:bg-[#fff9f2] dark:text-[#20202a]">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 font-titre text-2xl font-bold">
            <span aria-hidden="true" className="size-4 rounded-full bg-corail" />
            Clairivo
          </p>
          <p className="mt-3 max-w-[34ch] text-[#e6dfd6] dark:text-[#4a4658]">Guides, modèles et mini-cours en français pour avancer pas à pas.</p>
        </div>
        <nav aria-label="Univers">
          <p className="font-titre font-semibold">Univers</p>
          <ul className="mt-2">
            {univers.map((u) => (
              <li key={u.id}>
                <Link href={`/catalogue?univers=${u.id}`} className={lien}>
                  {u.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Informations">
          <p className="font-titre font-semibold">Informations</p>
          <ul className="mt-2">
            <li>
              <Link href="/mentions-legales" className={lien}>
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className={lien}>
                Confidentialité
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
