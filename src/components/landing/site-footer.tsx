import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-ligne">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-encre-2 md:flex-row md:items-center md:justify-between md:px-10">
        <p>
          <span className="font-titre font-bold text-encre">Clairivo</span> · Ressources numériques en français
        </p>
        <nav aria-label="Informations légales">
          <ul className="flex gap-6">
            <li>
              <Link href="/mentions-legales" className="underline">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="underline">
                Confidentialité
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
