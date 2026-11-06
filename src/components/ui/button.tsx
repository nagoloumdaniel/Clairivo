"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { Loader } from "@/components/ui/loader";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "sm";

// Pastille complète, comme la navigation. Désactivé = grisé et neutre; occupé = couleurs gardées + orbite + reflet.
const base =
  "bouton inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-[background-color,color,transform,border-color] duration-150 active:translate-y-px aria-busy:pointer-events-none aria-busy:cursor-progress disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-transparent disabled:bg-encre/10 disabled:text-encre/45 disabled:hover:bg-encre/10 disabled:hover:text-encre/45";

const variants: Record<Variant, string> = {
  // Texte encre fixe : le corail ne supporte pas le texte clair (contraste 2,6).
  primary: "bg-corail text-[#20202a] hover:bg-[#ff8660] border-2 border-[#20202a]",
  secondary: "border-2 border-encre text-encre hover:bg-encre hover:text-ivoire",
  quiet: "text-encre underline decoration-2 underline-offset-4 hover:text-violet disabled:no-underline",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-7 text-base",
  sm: "min-h-11 px-5 text-sm",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md") {
  return `${base} ${variants[variant]} ${variant === "quiet" ? "min-h-11 px-1" : sizes[size]}`;
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; loading?: boolean; loadingLabel?: string };

export function Button({ variant, size, loading, loadingLabel = "Un instant…", children, className, onClick, ...rest }: Props) {
  return (
    <button
      {...rest}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      // Pas d'attribut disabled pendant le chargement : le bouton garde ses couleurs et le focus.
      onClick={(e) => (loading ? e.preventDefault() : onClick?.(e))}
      className={`${buttonClasses(variant, size)} ${className ?? ""}`}
    >
      {loading ? (
        <>
          <Loader />
          <span role="status">{loadingLabel}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function ButtonLink({ variant, size, className, ...rest }: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link {...rest} className={`${buttonClasses(variant, size)} ${className ?? ""}`} />;
}
