import { describe, expect, it } from "vitest";
import { formatCents } from "@/lib/money";

describe("formatCents", () => {
  it("formate des centimes en euros", () => {
    expect(formatCents(299)).toMatch(/2,99\s€/);
  });
  it("refuse les montants non entiers", () => {
    expect(() => formatCents(2.99)).toThrow();
  });
});
