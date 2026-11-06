import Link from "next/link";
import { HoverIcon } from "@/components/ui/hover-icon";
import { GlassIcon } from "@/components/ui/glass-icon";
import { univers } from "@/lib/univers";

/** Position des cartes en éventail : rotation, décalage vertical, délai de flottement. */
const eventail = [
  { r: "-14deg", y: "translate-y-[22%]", d: "0s" },
  { r: "-7deg", y: "translate-y-[6%]", d: "-1.2s" },
  { r: "0deg", y: "-translate-y-[4%]", d: "-2.4s" },
  { r: "7deg", y: "translate-y-[6%]", d: "-3.6s" },
  { r: "14deg", y: "translate-y-[22%]", d: "-4.8s" },
];

/** Le héros est sombre dans les deux thèmes : texte clair fixe, contrastes calculés sur #14131a. */
export function Hero() {
  return (
    <section className="relative isolate flex h-svh min-h-[44rem] flex-col justify-between overflow-hidden bg-[#14131a] pt-28 text-[#fff9f2] md:pt-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -left-32 top-10 size-[28rem] rounded-full bg-violet/45 blur-[120px]" />
        <div className="absolute -right-24 top-32 size-[26rem] rounded-full bg-corail/35 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 size-[24rem] rounded-full bg-menthe/20 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 text-center">
        <h1 className="font-titre text-[clamp(2.25rem,6vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.03em]">
          <span className="sm:whitespace-nowrap">Des ressources courtes</span> <span className="sm:whitespace-nowrap">pour <span className="text-soleil">avancer</span></span>.
        </h1>
        <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-8 text-[#e6dfd6]">
          Emploi, IA, freelance, réseaux sociaux, budget. Tu télécharges, tu appliques, tu avances le jour même.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 lg:flex-row lg:gap-4">
        <form action="/catalogue" role="search" className="glass-dark flex h-14 w-full max-w-xl items-center gap-2 rounded-full p-1.5 pl-5 lg:w-[34rem]">
          <label htmlFor="recherche-hero" className="sr-only">
            Rechercher une ressource
          </label>
          <input
            id="recherche-hero"
            name="q"
            type="search"
            placeholder="Un CV, un devis, un budget…"
            className="min-w-0 flex-1 bg-transparent py-2 text-base text-[#fff9f2] placeholder:text-[#c9c2d3]"
          />
          <button type="submit" className="inline-flex h-11 items-center gap-2 rounded-full bg-corail px-5 font-bold text-[#20202a] hover:bg-[#ff8660]">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            Chercher
          </button>
        </form>
          <Link
            href="/catalogue"
            data-hover-icon
            className="inline-flex h-14 shrink-0 items-center gap-2 rounded-full border border-white/30 px-6 font-semibold hover:bg-white/10"
          >
            Voir le catalogue
            <HoverIcon name="arrow-right" size={18} />
          </Link>
        </div>
      </div>

      <ul className="mx-auto mt-8 flex w-full max-w-5xl translate-y-[25%] items-end justify-center px-4" aria-label="Les cinq univers">
        {univers.map((u, i) => (
          <li key={u.id} className={`-mx-2 w-[22%] min-w-0 md:-mx-3 md:w-[19%] ${eventail[i]!.y}`}>
            <Link
              href={`/catalogue?univers=${u.id}`}
              aria-label={u.label}
              className="glass-dark group block aspect-[3/4] rounded-2xl p-2 md:rounded-3xl md:p-3"
              style={{ transform: `rotate(${eventail[i]!.r})`, background: `linear-gradient(160deg, ${u.de}, ${u.vers})` }}
            >
              <span className="flex size-full items-center justify-center"><GlassIcon id={u.id} className="w-3/5" /></span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
