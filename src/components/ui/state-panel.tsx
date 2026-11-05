import type { ReactNode } from "react";

type Props = { titre: string; children: ReactNode; action?: ReactNode; tone?: "vide" | "erreur" };

/** États vide et erreur : dire ce qui se passe et proposer une sortie. */
export function StatePanel({ titre, children, action, tone = "vide" }: Props) {
  return (
    <div
      role={tone === "erreur" ? "alert" : "status"}
      className={`rounded-md border-2 border-dashed px-6 py-8 ${tone === "erreur" ? "border-erreur" : "border-ligne"}`}
    >
      <p className="font-titre text-xl font-semibold">{titre}</p>
      <p className="mt-2 max-w-[52ch] text-encre-2">{children}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
