"use client";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";

/** Démo interne pour /design : exemples fictifs, jamais affichés sur le site public. */
export function CartDemo() {
  const { ajouter, ouvrir, vider, nombre } = useCart();
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="secondary" size="sm" onClick={() => ajouter({ id: "demo-cv", titre: "Exemple : modèle de CV", prixCents: 499, univers: "emploi" })}>
        Ajouter un exemple d&apos;emploi
      </Button>
      <Button variant="secondary" size="sm" onClick={() => ajouter({ id: "demo-budget", titre: "Exemple : budget mensuel", prixCents: 299, univers: "budget" })}>
        Ajouter un exemple de budget
      </Button>
      <Button variant="secondary" size="sm" onClick={ouvrir}>
        Ouvrir le panier ({nombre})
      </Button>
      <Button variant="quiet" onClick={vider}>
        Vider
      </Button>
    </div>
  );
}
