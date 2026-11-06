import { expect, test } from "@playwright/test";

test("la page d'accueil répond sans erreur console", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  const res = await page.goto("/");
  expect(res?.status()).toBe(200);
  await expect(page).toHaveTitle(/Clairivo/);
  expect(errors).toEqual([]);
});
