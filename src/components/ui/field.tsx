import { useId, type InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; error?: string };

export function Field({ label, hint, error, id, ...rest }: Props) {
  const auto = useId();
  const fieldId = id ?? auto;
  const describedBy = [hint && `${fieldId}-aide`, error && `${fieldId}-erreur`].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={fieldId} className="block text-sm font-semibold">
        {label}
      </label>
      {hint && (
        <p id={`${fieldId}-aide`} className="mt-1 text-sm text-encre-2">
          {hint}
        </p>
      )}
      <input
        {...rest}
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`mt-2 h-12 w-full rounded-md border-2 bg-surface px-4 text-base text-encre placeholder:text-encre-2 disabled:opacity-50 ${error ? "border-erreur" : "border-encre"}`}
      />
      {error && (
        <p id={`${fieldId}-erreur`} className="mt-2 text-sm font-semibold text-erreur">
          {error}
        </p>
      )}
    </div>
  );
}
