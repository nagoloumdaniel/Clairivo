"use server";

import { createHash, randomBytes } from "node:crypto";
import * as Sentry from "@sentry/nextjs";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { sendMail } from "@/lib/mail";
import { allow, clientKey } from "@/lib/rate-limit";
import { CONSENT_VERSION, waitlistSchema } from "./schema";

export type WaitlistState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fields?: { email?: string; consent?: string } };

export async function joinWaitlist(_prev: WaitlistState, form: FormData): Promise<WaitlistState> {
  // Champ piège invisible : un humain ne le remplit pas. On répond « succès » pour ne rien apprendre au robot.
  if (String(form.get("website") ?? "") !== "") return { status: "success" };

  const parsed = waitlistSchema.safeParse({
    email: form.get("email") ?? "",
    universes: form.getAll("universes").map(String),
    consent: form.get("consent") ?? undefined,
  });

  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    return {
      status: "error",
      message: "Il manque une information.",
      fields: { email: flat.email?.[0], consent: flat.consent?.[0] },
    };
  }

  try {
    if (!(await allow(await clientKey("waitlist"), 5, 3600))) {
      return { status: "error", message: "Trop de tentatives. Réessaie dans une heure." };
    }

    const token = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(token).digest("hex");

    // Adresse déjà confirmée ou mail envoyé il y a moins de 15 min : aucune ligne renvoyée, on ne dit rien.
    const rows = await db.execute(sql`
      insert into waitlist_signups (email, universes, consent_version, confirm_token_hash, confirm_sent_at)
      values (${parsed.data.email}, ${parsed.data.universes}::text[], ${CONSENT_VERSION}, ${tokenHash}, now())
      on conflict (lower(email)) do update
        set confirm_token_hash = excluded.confirm_token_hash, confirm_sent_at = now()
        where waitlist_signups.confirmed_at is null
          and (waitlist_signups.confirm_sent_at is null or waitlist_signups.confirm_sent_at < now() - interval '15 minutes')
      returning email`);

    if (rows.length > 0) {
      const base = process.env.NEXT_PUBLIC_APP_URL ?? "";
      const link = `${base}/confirmer?token=${token}`;
      await sendMail({
        to: parsed.data.email,
        subject: "Confirme ton inscription à Clairivo",
        text: `Bonjour,

Pour confirmer ton inscription à la liste d'attente de Clairivo, ouvre ce lien :
${link}

Si tu n'es pas à l'origine de cette demande, ignore ce message : rien ne sera enregistré.

Clairivo`,
        html: `<p>Bonjour,</p><p>Pour confirmer ton inscription à la liste d'attente de Clairivo, ouvre ce lien :</p><p><a href="${link}">Confirmer mon inscription</a></p><p>Si tu n'es pas à l'origine de cette demande, ignore ce message : rien ne sera enregistré.</p><p>Clairivo</p>`,
      });
    }
    return { status: "success" };
  } catch (error) {
    Sentry.captureException(error);
    return { status: "error", message: "L'inscription n'a pas abouti. Réessaie dans un instant." };
  }
}
