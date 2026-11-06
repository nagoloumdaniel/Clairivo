import { expect, test } from "@playwright/test";

test.describe("connexion", () => {
  test("signale e-mail invalide et mot de passe vide", async ({ page }) => {
    await page.goto("/connexion");
    await page.getByRole("button", { name: "Me connecter" }).click();
    await expect(page.getByText("Entre une adresse e-mail valide.")).toBeVisible();
    await expect(page.getByText("Entre ton mot de passe.")).toBeVisible();
  });

  test("le bouton passe en chargement puis affiche l'avis honnête", async ({ page }) => {
    await page.goto("/connexion");
    await page.getByLabel("Adresse e-mail").fill("a@exemple.fr");
    await page.locator('input[name="mdp"]').fill("abcdefgh");
    await page.getByRole("button", { name: "Me connecter" }).click();
    await expect(page.locator('button[type="submit"][aria-busy="true"]')).toContainText("Connexion…");
    await expect(page.getByText("Tes informations n'ont pas été envoyées.")).toBeVisible();
  });

  test("le mot de passe est masqué puis affichable", async ({ page }) => {
    await page.goto("/connexion");
    const champ = page.locator('input[name="mdp"]');
    await expect(champ).toHaveAttribute("type", "password");
    await page.getByRole("button", { name: "Afficher le mot de passe" }).click();
    await expect(champ).toHaveAttribute("type", "text");
  });

  test("lien mot de passe oublié", async ({ page }) => {
    await page.goto("/connexion");
    await page.getByRole("link", { name: "Mot de passe oublié ?" }).click();
    await expect(page).toHaveURL(/mot-de-passe-oublie/);
  });
});

test.describe("inscription", () => {
  test("exige 8 caractères et n'affiche pas d'aide sous le champ", async ({ page }) => {
    await page.goto("/inscription");
    await expect(page.getByText("8 caractères minimum.")).toHaveCount(0);
    await page.getByLabel("Prénom").fill("Awa");
    await page.getByLabel("Adresse e-mail").fill("a@exemple.fr");
    await page.locator('input[name="mdp"]').fill("court");
    await page.getByRole("button", { name: "Créer mon compte" }).click();
    await expect(page.getByText("Choisis au moins 8 caractères.")).toBeVisible();
  });

  test("pas de bouton Google", async ({ page }) => {
    await page.goto("/inscription");
    await expect(page.getByText("Google")).toHaveCount(0);
  });

  test("la bordure du champ et sa forme ne changent pas au focus", async ({ page }) => {
    await page.goto("/inscription");
    const champ = page.getByLabel("Adresse e-mail");
    const avant = await champ.evaluate((e) => { const c = getComputedStyle(e); return [c.borderColor, c.borderRadius, c.outlineStyle]; });
    await champ.focus();
    const apres = await champ.evaluate((e) => { const c = getComputedStyle(e); return [c.borderColor, c.borderRadius, c.outlineStyle]; });
    expect(apres).toEqual(avant);
  });
});

test("réinitialisation : les deux mots de passe doivent correspondre", async ({ page }) => {
  await page.goto("/reinitialiser-mot-de-passe");
  await page.locator('input[name="mdp"]').fill("abcdefgh");
  await page.locator('input[name="confirmation"]').fill("autrechose");
  await page.getByRole("button", { name: "Enregistrer le mot de passe" }).click();
  await expect(page.getByText("Les deux mots de passe ne sont pas identiques.")).toBeVisible();
});

test("pages auth non indexables", async ({ page }) => {
  for (const p of ["/connexion", "/inscription", "/mot-de-passe-oublie", "/reinitialiser-mot-de-passe", "/verification-email"]) {
    await page.goto(p);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  }
});

test("la page 404 affiche un grand 404 et une sortie", async ({ page }) => {
  const res = await page.goto("/cette-page-nexiste-pas");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("n'existe pas");
  await expect(page.getByRole("link", { name: "Retour à l'accueil" })).toBeVisible();
});

test("les pages de la navigation existent", async ({ page }) => {
  for (const p of ["/catalogue", "/packs", "/aide"]) {
    const res = await page.goto(p);
    expect(res?.status(), p).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

test("le tiroir du panier glisse, sans voile sombre, et la main s'affiche sur le bouton", async ({ page }) => {
  await page.goto("/accueil");
  const bouton = page.getByRole("button", { name: /Panier/ });
  await expect(bouton).toHaveCSS("cursor", "pointer");
  await bouton.click();
  const tiroir = page.locator("dialog");
  await expect(tiroir).toHaveAttribute("open", "");
  await expect(tiroir).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
  expect(await tiroir.evaluate((e) => getComputedStyle(e, "::backdrop").backgroundColor)).toBe("rgba(0, 0, 0, 0)");
  expect(await tiroir.evaluate((e) => getComputedStyle(e, "::backdrop").backdropFilter)).toContain("blur");
  await page.getByRole("button", { name: "Fermer le panier" }).click();
  await expect(tiroir).not.toHaveAttribute("open", "");
});
