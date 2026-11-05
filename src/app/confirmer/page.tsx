import { createHash } from "node:crypto";
import type { Metadata } from "next";
import Link from "next/link";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { waitlistSignups } from "@/db/schema";
import { SiteFooter } from "@/components/landing/site-footer";

export const metadata: Metadata = {
  title: "Confirmation | Clairivo",
  robots: { index: false },
};

async function confirm(token: string | undefined): Promise<boolean> {
  if (!token || !/^[0-9a-f]{64}$/.test(token)) return false;
  const hash = createHash("sha256").update(token).digest("hex");
  const rows = await db
    .update(waitlistSignups)
    .set({ confirmedAt: new Date(), confirmTokenHash: null })
    .where(and(eq(waitlistSignups.confirmTokenHash, hash), isNull(waitlistSignups.confirmedAt)))
    .returning({ id: waitlistSignups.id });
  return rows.length > 0;
}

export default async function Confirmer({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  const ok = await confirm(token);
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <Link href="/" className="font-titre text-lg font-bold">
          Clairivo
        </Link>
        <h1 className="mt-10 text-4xl font-bold tracking-[-0.02em] md:text-5xl">
          {ok ? "C'est confirmé." : "Ce lien ne fonctionne plus."}
        </h1>
        <p className="mt-4 max-w-xl leading-7 text-encre-2">
          {ok
            ? "Tu seras prévenu à l'ouverture, avec les trois premières ressources gratuites."
            : "Il a déjà servi ou il a expiré. Si tu as déjà confirmé, tout est en ordre. Sinon, inscris-toi de nouveau depuis l'accueil."}
        </p>
        <Link href="/" className="mt-8 inline-block font-semibold underline underline-offset-4">
          Retour à l&apos;accueil
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
