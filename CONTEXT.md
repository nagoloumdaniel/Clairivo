# CONTEXT Clairivo

Mis à jour : 2026-11-05. Branche : `docs/phase-1-cadrage`.

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
- 2026-11-05 : pays servis au lancement = France, Belgique, Luxembourg, en français. Suisse reportée tant que la TVA suisse n'est pas vérifiée.
- 2026-11-05 : prix affichés = prix payés (franchise en base de TVA, pas de TVA ajoutée).
- 2026-11-05 : licence du dépôt = propriétaire (tous droits réservés).
- 2026-11-05 : landing avec liste d'attente en phase 1 acceptée.
- 2026-11-05 : prix du chapitre 23 alignés sur la grille (2,49 € devient 2,99 €, les autres inchangés).
- 2026-11-05 : éditeur = Nagoloum Talla Daniel, Noisy-le-Grand (Île-de-France), contact landhack049@gmail.com. SIREN et adresse complète à compléter pour les mentions légales.
- 2026-11-05 : compte Stripe réel déjà vérifié (KYC fait). Le développement reste en mode test. Google Pay activé et moyens superflus retirés par l'utilisateur.
- 2026-11-05 : OSS et question au SIE écartées pour l'instant par l'utilisateur (à rouvrir si les ventes UE hors France approchent 8 000 €).
- 2026-11-05 : « Clairivo » absent de l'INPI selon l'utilisateur (à confirmer sur l'EUIPO). Domaine : l'utilisateur l'achète et prévient.
- 2026-11-05 : ordre de travail = phase 1 (landing liste d'attente), phase 2 (fondations), puis phase 5.

## Phase 0 : avancement (2026-11-05)
- Fait : `docs/conformite.md` (franchise TVA, OSS, rétractation, cookies), points non vérifiés marqués.
- À faire par toi : compte Stripe et vérification d'identité, achat du domaine après recherche INPI/EUIPO, coordonnées pour les mentions légales, question au SIE sur franchise + OSS.
- Fait (2026-11-05) : `docs/registre-droits.md` (gabarit, 15 produits), recherche TVA suisse et L221-13 (sources secondaires, voir conformite.md).
- À faire par moi : lire les textes officiels de L221-13, L221-5 et art. 10 LTVA.

## Stripe (2026-11-05)
- Compte Stripe « Clairivo » connecté au connecteur MCP, mode test uniquement (`acct_1UYFNaRVHCJY7Fsk`). Pas de mode live.
- 7 produits de test créés avec la grille de prix : 2,99 / 3,99 / 4,49 / 5,99 / 6,99 / 9,99 / 14,99 EUR (métadonnée `env=test`). À remplacer par le vrai catalogue en phase 4.
- Moyens de paiement : cartes, Apple Pay, Link, Bancontact actifs. Google Pay désactivé (`available: false`). À activer dans le tableau de bord Stripe (Paramètres, Moyens de paiement), non modifiable par le connecteur.
- À désactiver dans le tableau de bord (non utiles FR/BE/LU) : Klarna, Pix, BLIK, EPS, Samsung Pay, Naver Pay, Kakao Pay, Payco, Amazon Pay, MB WAY, Satispay.
- Apple Pay : fichier de vérification de domaine à ajouter quand le domaine existe.
- Env : `.env.example` (noms) et `.env.local` (ignoré par git) synchronisés. Clés Stripe à renseigner (le connecteur ne les expose pas), webhook de test à créer en phase 6.

## Questions ouvertes
1. Logo : à fournir plus tard. Rien n'est inventé en attendant.
2. Franchise en base et OSS : comment s'articulent-elles au-delà de 10 000 € de ventes UE ? À confirmer auprès du SIE et dans le BOFiP.
3. TVA suisse sur les services électroniques : à rechercher avant d'ouvrir la Suisse.

## Points à confirmer
- Tarifs Stripe exacts de ton pays (chiffres de la roadmap = ordres de grandeur, non officiels).
- Disponibilité du nom Clairivo (INPI, EUIPO) et du domaine.
