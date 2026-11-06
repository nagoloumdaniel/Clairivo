"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDownIcon, MenuIcon, XIcon } from "lucide-animated";
import { useCart } from "@/components/cart/cart-provider";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { GlassIcon } from "@/components/ui/glass-icon";
import { univers } from "@/lib/univers";

const liens = [
  { href: "/catalogue", label: "Catalogue" },
  { href: "/packs", label: "Packs" },
  { href: "/aide", label: "Aide" },
];

const lienClasses = "inline-flex h-9 items-center rounded-full px-3 text-sm font-semibold leading-none text-encre transition-colors hover:bg-encre/10";

export function FloatingNav() {
  const { nombre: panier, ouvrir: onPanier } = useCart();
  const [compact, setCompact] = useState(false);
  const [menu, setMenu] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  const reduit = useReducedMotion();

  useEffect(() => {
    const f = () => setCompact(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3">
        <nav
          aria-label="Navigation principale"
          className={`glass pointer-events-auto flex w-full items-center gap-1 rounded-full pl-5 pr-2 transition-[padding,max-width] duration-300 ${compact ? "py-1.5 max-w-2xl" : "py-2 max-w-4xl"}`}
        >
          <Logo className="mr-auto" />
          <div className="hidden items-center gap-1 md:flex">
            <Link href={liens[0]!.href} className={lienClasses}>
              {liens[0]!.label}
            </Link>
            <div className="relative" onMouseEnter={() => setOuvert(true)} onMouseLeave={() => setOuvert(false)}>
              <button type="button" aria-expanded={ouvert} onClick={() => setOuvert((v) => !v)} className={`${lienClasses} gap-1`}>
                Univers <ChevronDownIcon size={16} />
              </button>
              <AnimatePresence>
                {ouvert && (
                  <motion.ul
                    initial={reduit ? false : { opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2 rounded-3xl border border-encre/15 bg-surface p-2 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.5)]"
                  >
                    {univers.map((u) => (
                      <li key={u.id}>
                        <Link href={`/catalogue?univers=${u.id}`} className="group flex items-center gap-3 rounded-2xl p-2 text-sm font-semibold text-encre hover:bg-encre/10">
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl" style={{ background: `linear-gradient(135deg, ${u.de}, ${u.vers})` }}>
                            <GlassIcon id={u.id} className="size-8 rounded-lg" />
                          </span>
                          {u.label}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            {liens.slice(1).map((l) => (
              <Link key={l.href} href={l.href} className={lienClasses}>
                {l.label}
              </Link>
            ))}
          </div>
          <Link href="/catalogue" aria-label="Rechercher" className="inline-flex size-9 items-center justify-center rounded-full text-encre hover:bg-encre/10">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          </Link>
          <Link href="/connexion" aria-label="Mon compte" className="inline-flex size-9 items-center justify-center rounded-full text-encre hover:bg-encre/10">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.600-7 8-7s8 3 8 7" /></svg>
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={onPanier}
            aria-label={`Panier, ${panier} article${panier > 1 ? "s" : ""}`}
            className="inline-flex cursor-pointer h-9 items-center gap-2 rounded-full bg-violet px-4 text-sm font-bold leading-none text-[#fff9f2]"
          >
            Panier
            <span className="inline-flex min-w-6 justify-center rounded-full bg-[#fff9f2] px-1.5 text-xs leading-5 text-[#20202a] tabular-nums">{panier}</span>
          </button>
          <button type="button" onClick={() => setMenu(true)} aria-label="Ouvrir le menu" className="inline-flex size-9 items-center justify-center rounded-full text-encre hover:bg-encre/10 md:hidden">
            <MenuIcon size={22} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduit ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-ivoire/95 px-6 pb-10 pt-5 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button type="button" onClick={() => setMenu(false)} aria-label="Fermer le menu" className="inline-flex size-11 items-center justify-center rounded-full text-encre hover:bg-encre/10">
                <XIcon size={22} />
              </button>
            </div>
            <ul className="mt-8 grid gap-2">
              {[...liens, ...univers.map((u) => ({ href: `/catalogue?univers=${u.id}`, label: u.label }))].map((l, i) => (
                <motion.li key={l.href} initial={reduit ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}>
                  <Link href={l.href} onClick={() => setMenu(false)} className="block rounded-2xl px-4 py-3 font-titre text-2xl font-semibold text-encre hover:bg-encre/10">
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
