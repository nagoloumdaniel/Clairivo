"use server";

import * as Sentry from "@sentry/nextjs";
import { db } from "@/db";
import { waitlistSignups } from "@/db/schema";
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
    // Une adresse déjà inscrite est ignorée sans le dire : on ne révèle pas qui est dans la liste.
    await db
      .insert(waitlistSignups)
      .values({
        email: parsed.data.email,
        universes: parsed.data.universes,
        consentVersion: CONSENT_VERSION,
      })
      .onConflictDoNothing();
    return { status: "success" };
  } catch (error) {
    Sentry.captureException(error);
    return { status: "error", message: "L'inscription n'a pas abouti. Réessaie dans un instant." };
  }
}
