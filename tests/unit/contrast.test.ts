import { describe, expect, it } from "vitest";
import { contrast } from "@/lib/contrast";

describe("contrast", () => {
  it("noir sur blanc vaut 21", () => {
    expect(contrast("#000000", "#ffffff")).toBeCloseTo(21, 1);
  });

  it("est symétrique", () => {
    expect(contrast("#20202a", "#fff9f2")).toBeCloseTo(contrast("#fff9f2", "#20202a"), 5);
  });

  it.each([
    ["encre sur ivoire", "#20202a", "#fff9f2", 4.5],
    ["gris encre sur ivoire", "#686575", "#fff9f2", 4.5],
    ["encre sur corail", "#20202a", "#ff7048", 4.5],
    ["ivoire sur violet", "#fff9f2", "#7657e8", 4.5],
    ["encre sur menthe", "#20202a", "#75d7b0", 4.5],
    ["encre sur soleil", "#20202a", "#ffd45a", 4.5],
    ["erreur sur blanc", "#b3261e", "#ffffff", 4.5],
    ["texte sombre", "#f6f0e8", "#17161d", 4.5],
    ["gris sombre", "#b5b0bf", "#17161d", 4.5],
    ["erreur sombre", "#ff9a8f", "#211f29", 4.5],
  ])("%s respecte le seuil AA", (_nom, texte, fond, min) => {
    expect(contrast(texte, fond)).toBeGreaterThanOrEqual(min);
  });
});
