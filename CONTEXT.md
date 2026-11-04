# CONTEXT Clairivo

Mis à jour : 2026-11-04. Branche : `docs/roadmap` (non commitée).

## État
Phase de cadrage. Aucun code. Fichiers : `cahier_des_charges_clairivo.md`, `ROADMAP.md`.

## Objectif en cours
Valider la roadmap, puis phase 0 (décisions, entité, Stripe, domaine, logo).

## Décisions prises
- Paiement : Stripe direct (Payment Element + Express Checkout Element) pour Visa, Mastercard, Apple Pay, Google Pay. Raison : les frais fixes d'un Merchant of Record écrasent les petits prix.
- ORM : Drizzle (un seul ORM).

## Questions ouvertes (réponse attendue)
1. Pays d'établissement et statut juridique du vendeur ? Reco : France en micro-entreprise si tu y résides, sinon dis-moi le pays (bloque Stripe, TVA, factures).
2. Prix plancher : garder des produits à 0,99 € ? Reco : aucun produit payant sous 1,49 € et panier multi-produits (les frais fixes pèsent 27 % à 0,99 €).
3. Stripe direct (reco) ou Merchant of Record (TVA déléguée, mais environ 5 % + 0,50 $) ?
4. Compte créé automatiquement à l'achat par lien magique (reco) ou compte obligatoire avant achat ?
5. Typographie du texte : le cahier impose Inter, la règle anti-IA le déconseille par défaut. Reco : titres Plus Jakarta Sans, texte une autre sans-serif lisible (à tester en phase 3). Tu tranches ?
6. Logo : à fournir. Je n'en invente pas.
7. Pays servis au lancement et langues (reco : France, Belgique, Suisse, Luxembourg, en français).

## Points à confirmer
- Tarifs Stripe exacts de ton pays (chiffres de la roadmap = ordres de grandeur, non officiels).
- Disponibilité du nom Clairivo (INPI, EUIPO) et du domaine.
