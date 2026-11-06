import { useId, type InputHTMLAttributes, type ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
  /** Pictogramme à gauche, décoratif. */
  icon?: ReactNode;
  /** Élément interactif à droite (ex. afficher le mot de passe). */
  trailing?: ReactNode;
};

/** Champ en pastille (même arrondi que la navigation), icône et placeholder. Bordure fixe : aucun changement au survol ni au focus. */
export function Field({ label, hint, error, icon, trailing, id, className, ...rest }: Props) {
  const auto = useId();
  const fieldId = id ?? auto;
  const describedBy = [hint && !error && `${fieldId}-aide`, error && `${fieldId}-erreur`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="block pl-5 text-sm font-semibold">
        {label}
      </label>
      <div className="group relative mt-2">
        {icon && <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-encre-2">{icon}</span>}
        <input
          {...rest}
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`h-14 w-full rounded-full border-2 bg-surface text-base text-encre transition-colors placeholder:text-encre-2 disabled:cursor-not-allowed disabled:bg-encre/5 disabled:text-encre/45 ${icon ? "pl-[3.25rem]" : "pl-6"} ${trailing ? "pr-14" : "pr-6"} ${
            error ? "border-erreur" : "border-encre/25"
          }`}
        />
        {trailing && <span className="absolute right-1.5 top-1/2 -translate-y-1/2">{trailing}</span>}
      </div>
      {hint && !error && (
        <p id={`${fieldId}-aide`} className="mt-2 pl-5 text-sm text-encre-2">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${fieldId}-erreur`} role="alert" className="mt-2 pl-5 text-sm font-semibold text-erreur">
          {error}
        </p>
      )}
    </div>
  );
}
