import { expect, test } from "@playwright/test";

test("la page d'accueil répond sans erreur console", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  const res = await page.goto("/");
  expect(res?.status()).toBe(200);
  await expect(page).toHaveTitle(/Clairivo/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Des guides courts");
  expect(errors).toEqual([]);
});

test("le formulaire signale un e-mail invalide et l'absence de consentement", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Ton adresse e-mail").fill("pas-un-mail");
  await page.getByRole("button", { name: "Me prévenir à l'ouverture" }).click();
  await expect(page.getByText("Cette adresse e-mail ne semble pas valide.")).toBeVisible();
  await expect(page.getByText("Coche la case pour confirmer")).toBeVisible();
});

test("les pages légales existent", async ({ page }) => {
  for (const path of ["/mentions-legales", "/confidentialite"]) {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
  }
});
