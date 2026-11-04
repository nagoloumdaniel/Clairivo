# CONTEXT Clairivo

Mis à jour : 2026-11-05. Branche : `docs/pricing` (basée sur `docs/roadmap`).

## État
Phase de cadrage. Aucun code. Fichiers : `cahier_des_charges_clairivo.md`, `ROADMAP.md`.

## Objectif en cours
Valider la roadmap, puis phase 0 (décisions, entité, Stripe, domaine, logo).

## Décisions prises
- Paiement : Stripe direct (Payment Element + Express Checkout Element) pour Visa, Mastercard, Apple Pay, Google Pay.
- ORM : Drizzle.
- 2026-11-05 : vendeur = micro-entreprise en France.
- 2026-11-05 : prix plancher 2,99 € TTC, grille remontée (voir ROADMAP, « Grille de prix décidée »). Plafond produit 9,99 €, plafond pack 14,99 €. L'ancienne fiche à 0,99 € devient gratuite.
- 2026-11-05 : compte créé à l'achat par lien magique.
- 2026-11-05 : Inter pour le texte.
- 2026-11-05 : pays servis = Europe francophone (France, Belgique, Suisse, Luxembourg), en français.
- 2026-11-05 : landing avec liste d'attente en phase 1 acceptée.

## Questions ouvertes
1. Logo : à fournir plus tard par l'utilisateur. Rien n'est inventé en attendant.
2. Régime de TVA de la micro-entreprise pour les ventes numériques aux particuliers de l'UE (franchise en base, seuil UE, OSS) : à vérifier en phase 0 sur les sources officielles.
3. Création de la branche `main` sur GitHub (dépôt distant vide, le hook git-guard bloque le push vers main).

## Points à confirmer
- Tarifs Stripe exacts de ton pays (chiffres de la roadmap = ordres de grandeur, non officiels).
- Disponibilité du nom Clairivo (INPI, EUIPO) et du domaine.
