"use client";

import { useState, type ComponentProps } from "react";
import { Field } from "@/components/ui/field";
import { EyeIcon, EyeOffIcon, LockIcon } from "@/components/ui/icons";

/** Champ mot de passe avec bascule afficher / masquer. Masqué par défaut, jamais enregistré ailleurs que dans le champ. */
export function PasswordField(props: Omit<ComponentProps<typeof Field>, "type" | "icon" | "trailing">) {
  const [visible, setVisible] = useState(false);
  return (
    <Field
      {...props}
      type={visible ? "text" : "password"}
      icon={<LockIcon />}
      autoCapitalize="none"
      spellCheck={false}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          aria-pressed={visible}
          className="inline-flex size-11 items-center justify-center rounded-full text-encre-2 hover:bg-encre/10 hover:text-encre"
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      }
    />
  );
}
