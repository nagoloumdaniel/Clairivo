export function formatCents(cents: number, currency = "EUR"): string {
  if (!Number.isInteger(cents)) throw new Error("Montant en centimes entier attendu");
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(cents / 100);
}
