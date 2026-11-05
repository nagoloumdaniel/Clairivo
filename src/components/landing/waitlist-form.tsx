"use client";

import { useActionState } from "react";
import { joinWaitlist, type WaitlistState } from "@/domains/waitlist/actions";
import { UNIVERSES } from "@/domains/waitlist/schema";

const initial: WaitlistState = { status: "idle" };

export function WaitlistForm() {
  const [state, action, pending] = useActionState(joinWaitlist, initial);
  const fields = state.status === "error" ? state.fields : undefined;

  if (state.status === "success") {
    return (
      <div role="status" className="max-w-xl border-2 border-[var(--h-texte)] px-5 py-5">
        <p className="font-titre text-2xl font-semibold">C&apos;est noté.</p>
        <p className="mt-2">
          Tu seras prévenu à l&apos;ouverture, avec les trois premières ressources gratuites. Un lien de désinscription sera présent dans chaque e-mail.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="relative max-w-xl space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-semibold">
          Ton adresse e-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          aria-invalid={fields?.email ? true : undefined}
          aria-describedby={fields?.email ? "email-erreur" : undefined}
          placeholder="prenom@exemple.fr"
          className="mt-2 h-12 w-full rounded-md border-2 border-[var(--h-texte)] bg-[var(--h-champ)] px-4 text-base text-[var(--h-texte)] placeholder:text-[#5c5a68]"
        />
        {fields?.email && (
          <p id="email-erreur" className="mt-2 text-sm font-semibold text-[var(--h-erreur)]">
            {fields.email}
          </p>
        )}
      </div>

      {/* Champ piège pour les robots : caché aux humains et aux lecteurs d'écran. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Ne pas remplir
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold">
          Quel sujet t&apos;aiderait le plus ? <span className="font-normal">(facultatif, plusieurs choix possibles)</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {UNIVERSES.map((u) => (
            <label key={u.id} className="cursor-pointer">
              <input type="checkbox" name="universes" value={u.id} className="peer sr-only" />
              <span className="inline-flex min-h-11 items-center rounded-full border-2 border-[var(--h-texte)] px-4 text-sm font-medium transition-colors duration-150 peer-checked:bg-[var(--h-texte)] peer-checked:text-[#fff9f2] peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--h-texte)]">
                {u.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            aria-invalid={fields?.consent ? true : undefined}
            aria-describedby={fields?.consent ? "consent-erreur" : undefined}
            className="mt-1 size-5 shrink-0 accent-[#20202a]"
          />
          <label htmlFor="consent" className="text-sm leading-6">
            J&apos;accepte de recevoir par e-mail les ressources gratuites et des nouvelles de l&apos;ouverture de Clairivo. Je peux me désabonner à tout moment. Les détails sont dans la{" "}
            <a href="/confidentialite" className="font-semibold underline">
              politique de confidentialité
            </a>
            .
          </label>
        </div>
        {fields?.consent && (
          <p id="consent-erreur" className="mt-2 text-sm font-semibold text-[var(--h-erreur)]">
            {fields.consent}
          </p>
        )}
      </div>

      {state.status === "error" && !fields?.email && !fields?.consent && (
        <p role="alert" className="text-sm font-semibold text-[var(--h-erreur)]">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--h-texte)] px-6 text-base font-semibold text-[#fff9f2] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Inscription en cours…" : "Me prévenir à l'ouverture"}
      </button>
    </form>
  );
}
