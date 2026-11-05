import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-[background-color,color,transform] duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-busy:pointer-events-none";

const variants: Record<Variant, string> = {
  // Texte encre fixe : le corail ne supporte pas le texte clair (contraste 2,6).
  primary: "bg-corail text-[#20202a] hover:bg-[#ff8660] border-2 border-[#20202a]",
  secondary: "border-2 border-encre text-encre hover:bg-encre hover:text-ivoire",
  quiet: "text-encre underline decoration-2 underline-offset-4 hover:text-violet",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 text-base",
  sm: "min-h-11 px-4 text-sm",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md") {
  return `${base} ${variants[variant]} ${variant === "quiet" ? "min-h-11 px-1" : sizes[size]}`;
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; loading?: boolean };

export function Button({ variant, size, loading, children, className, ...rest }: Props) {
  return (
    <button
      {...rest}
      aria-busy={loading || undefined}
      disabled={rest.disabled || loading}
      className={`${buttonClasses(variant, size)} ${className ?? ""}`}
    >
      {loading ? "En cours…" : children}
    </button>
  );
}

export function ButtonLink({ variant, size, className, ...rest }: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link {...rest} className={`${buttonClasses(variant, size)} ${className ?? ""}`} />;
}
