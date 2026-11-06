import type { SVGProps } from "react";

/** Pictogrammes de trait (style Lucide) pour les champs et les états. Décoratifs : aria-hidden. */
function Base({ children, ...p }: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="size-5" {...p}>
      {children}
    </svg>
  );
}

type P = SVGProps<SVGSVGElement>;

export const MailIcon = (p: P) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 8 8 5.5L20 8" />
  </Base>
);
export const LockIcon = (p: P) => (
  <Base {...p}>
    <rect x="4" y="11" width="16" height="10" rx="3" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </Base>
);
export const UserIcon = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
  </Base>
);
export const EyeIcon = (p: P) => (
  <Base {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </Base>
);
export const EyeOffIcon = (p: P) => (
  <Base {...p}>
    <path d="M10.6 5.1A10 10 0 0 1 12 5c6.500 0 10 7 10 7a17 17 0 0 1-3 3.800M6.600 6.600A17 17 0 0 0 2 12s3.500 7 10 7a10 10 0 0 0 5.400-1.600" />
    <path d="M9.900 9.900a3 3 0 0 0 4.200 4.200M3 3l18 18" />
  </Base>
);
export const CheckIcon = (p: P) => (
  <Base {...p}>
    <path d="m5 12.500 4.500 4.500L19 7.500" />
  </Base>
);
export const AlertIcon = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.500v5.500M12 16.500v.01" />
  </Base>
);
export const ArrowLeftIcon = (p: P) => (
  <Base {...p}>
    <path d="M19 12H5m6-6-6 6 6 6" />
  </Base>
);
