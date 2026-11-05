import { describe, expect, it } from "vitest";
import { waitlistSchema } from "@/domains/waitlist/schema";

describe("waitlistSchema", () => {
  it("normalise l'e-mail et accepte un consentement coché", () => {
    const r = waitlistSchema.parse({ email: "  Jean@Exemple.FR ", universes: ["ia"], consent: "on" });
    expect(r.email).toBe("jean@exemple.fr");
    expect(r.universes).toEqual(["ia"]);
  });

  it("refuse sans consentement", () => {
    expect(waitlistSchema.safeParse({ email: "a@b.fr", universes: [] }).success).toBe(false);
  });

  it("refuse un e-mail invalide ou vide", () => {
    expect(waitlistSchema.safeParse({ email: "pas-un-mail", consent: "on" }).success).toBe(false);
    expect(waitlistSchema.safeParse({ email: "", consent: "on" }).success).toBe(false);
  });

  it("refuse un univers inconnu", () => {
    expect(waitlistSchema.safeParse({ email: "a@b.fr", universes: ["x"], consent: "on" }).success).toBe(false);
  });
});
