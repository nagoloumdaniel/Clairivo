import * as Sentry from "@sentry/nextjs";

type Mail = { to: string; subject: string; text: string; html: string };

/** Envoi via l'API Resend. Sans clé (développement), rien n'est envoyé et on renvoie false. */
export async function sendMail(mail: Mail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!key || !from) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, ...mail }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
    return true;
  } catch (error) {
    Sentry.captureException(error);
    return false;
  }
}
