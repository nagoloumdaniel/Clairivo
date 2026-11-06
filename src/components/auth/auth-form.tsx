"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { MailIcon, UserIcon } from "@/components/ui/icons";
import { PasswordField } from "@/components/ui/password-field";

type Mode = "connexion" | "inscription" | "oubli" | "reinitialisation";
type Erreurs = Partial<Record<"nom" | "email" | "mdp" | "confirmation", string>>;

const MDP_MIN = 8;
const MDP_MAX = 128;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const boutons: Record<Mode, { texte: string; chargement: string }> = {
  connexion: { texte: "Me connecter", chargement: "Connexion…" },
  inscription: { texte: "Créer mon compte", chargement: "Création…" },
  oubli: { texte: "Envoyer le lien", chargement: "Envoi…" },
  reinitialisation: { texte: "Enregistrer le mot de passe", chargement: "Enregistrement…" },
};

/**
 * Formulaires d'authentification. Les comptes ouvrent avec la phase 5 : tant que le serveur n'existe pas,
 * on valide les champs côté navigateur, on simule l'attente et on dit honnêtement que rien n'est envoyé.
 * Les valeurs ne sont jamais stockées ni journalisées; la vraie validation se fera aussi côté serveur.
 */
export function AuthForm({ mode }: { mode: Mode }) {
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [chargement, setChargement] = useState(false);
  const [envoye, setEnvoye] = useState(false);
  const b = boutons[mode];

  const valider = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chargement) return;
    const f = new FormData(e.currentTarget);
    const nom = String(f.get("nom") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const mdp = String(f.get("mdp") ?? "");
    const confirmation = String(f.get("confirmation") ?? "");
    const r: Erreurs = {};
    if (mode === "inscription" && nom.length < 2) r.nom = "Indique ton prénom.";
    if ((mode === "connexion" || mode === "inscription" || mode === "oubli") && !EMAIL.test(email)) r.email = "Entre une adresse e-mail valide.";
    if (mode === "connexion" && mdp.length === 0) r.mdp = "Entre ton mot de passe.";
    if ((mode === "inscription" || mode === "reinitialisation") && mdp.length < MDP_MIN) r.mdp = `Choisis au moins ${MDP_MIN} caractères.`;
    if (mdp.length > MDP_MAX) r.mdp = `Pas plus de ${MDP_MAX} caractères.`;
    if (mode === "reinitialisation" && !r.mdp && confirmation !== mdp) r.confirmation = "Les deux mots de passe ne sont pas identiques.";
    setErreurs(r);
    setEnvoye(false);
    if (Object.keys(r).length > 0) return;
    setChargement(true);
    window.setTimeout(() => {
      setChargement(false);
      setEnvoye(true);
    }, 1400);
  };

  return (
    <form onSubmit={valider} noValidate className="space-y-4">
      {mode === "connexion" && (
        <>
          <button type="button" disabled className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-full border-2 border-encre/15 bg-encre/5 font-semibold text-encre/45">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 opacity-60">
              <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.2Z" />
              <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z" />
              <path fill="#FBBC05" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9l3.3-2.6Z" />
              <path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.9 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5l3.3 2.6C7.2 7.8 9.4 6 12 6Z" />
            </svg>
            Continuer avec Google (bientôt)
          </button>
          <p className="flex items-center gap-4 text-sm text-encre-2" aria-hidden="true">
            <span className="h-px flex-1 bg-encre/15" />
            ou avec ton e-mail
            <span className="h-px flex-1 bg-encre/15" />
          </p>
        </>
      )}

      {mode === "inscription" && <Field label="Prénom" name="nom" placeholder="Ton prénom" icon={<UserIcon />} autoComplete="given-name" maxLength={60} error={erreurs.nom} />}
      {mode !== "reinitialisation" && (
        <Field label="Adresse e-mail" name="email" type="email" placeholder="prenom@exemple.fr" icon={<MailIcon />} autoComplete="email" inputMode="email" maxLength={254} error={erreurs.email} />
      )}
      {mode !== "oubli" && (
        <PasswordField
          label={mode === "reinitialisation" ? "Nouveau mot de passe" : "Mot de passe"}
          name="mdp"
          placeholder={mode === "connexion" ? "Ton mot de passe" : `${MDP_MIN} caractères minimum`}
          autoComplete={mode === "connexion" ? "current-password" : "new-password"}
          maxLength={MDP_MAX}
          error={erreurs.mdp}
        />
      )}
      {mode === "reinitialisation" && (
        <PasswordField label="Confirmation" name="confirmation" placeholder="Retape le mot de passe" autoComplete="new-password" maxLength={MDP_MAX} error={erreurs.confirmation} />
      )}
      {mode === "connexion" && (
        <p className="text-right text-sm">
          <Link href="/mot-de-passe-oublie" className="font-semibold text-violet underline underline-offset-4 dark:text-[#c1b2ff]">
            Mot de passe oublié ?
          </Link>
        </p>
      )}

      <Button type="submit" className="w-full" loading={chargement} loadingLabel={b.chargement}>
        {b.texte}
      </Button>

      {envoye && (
        <p role="status" className="rounded-3xl border border-soleil/70 bg-soleil/20 px-5 py-3 text-sm font-semibold">
          Les comptes ouvrent très bientôt. Tes informations n&apos;ont pas été envoyées.
        </p>
      )}
    </form>
  );
}
