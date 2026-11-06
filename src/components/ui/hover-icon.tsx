"use client";

import { useEffect, useRef, type ComponentType, type Ref } from "react";
import { ArrowRightIcon, ArrowUpRightIcon, CartIcon, ChevronDownIcon, DownloadIcon, SearchIcon, ShieldCheckIcon } from "lucide-animated";

type Handle = { startAnimation: () => void; stopAnimation: () => void };
type IconProps = { size?: number; className?: string; ref?: Ref<Handle> };

// Registre par nom : un composant serveur ne peut pas passer une icône (fonction) à un composant client.
const icones = {
  "arrow-right": ArrowRightIcon,
  "arrow-up-right": ArrowUpRightIcon,
  cart: CartIcon,
  "chevron-down": ChevronDownIcon,
  download: DownloadIcon,
  search: SearchIcon,
  shield: ShieldCheckIcon,
} satisfies Record<string, ComponentType<IconProps>>;

export type IconName = keyof typeof icones;

/**
 * Icône animée (lucide-animated) dont l'animation se joue au survol (ou focus) de l'ancêtre
 * portant `data-hover-icon`, et non seulement de l'icône elle-même.
 */
export function HoverIcon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  const Icon: ComponentType<IconProps> = icones[name];
  const icone = useRef<Handle>(null);
  const racine = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const parent = racine.current?.closest("[data-hover-icon]");
    if (!parent) return;
    const jouer = () => icone.current?.startAnimation();
    parent.addEventListener("pointerenter", jouer);
    parent.addEventListener("focusin", jouer);
    return () => {
      parent.removeEventListener("pointerenter", jouer);
      parent.removeEventListener("focusin", jouer);
    };
  }, []);
  return (
    <span ref={racine} aria-hidden="true" className="inline-flex">
      <Icon ref={icone} size={size} className={className} />
    </span>
  );
}
