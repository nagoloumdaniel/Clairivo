# CONTEXT Clairivo

Mis à jour : 2026-11-05. Branche : `feat/landing-waitlist` (empilée sur `feat/foundations`, PR #6).

## État
Phase 0 terminée côté documents et Stripe test. Phase 2 (fondations) démarrée. PR ouvertes non fusionnées : #4 (`docs/phase-1-cadrage`, prix du chapitre 23 et décisions) et #5 (`docs/validation-marche`, seuils Go/Stop). Leur contenu n'est pas encore dans ce fichier tant qu'elles ne sont pas fusionnées.

## Objectif en cours
Phase 2 : socle Next.js + TypeScript strict + Tailwind + Motion, Drizzle, Vitest + Playwright, CI GitHub Actions, Sentry. Puis landing avec liste d'attente (phase 1), puis phases 3, 4, 5.

## Phase 2 : avancement (2026-11-05)
- Fait : Next.js (App Router), TypeScript strict, Tailwind, Vitest, Playwright (config + 1 test), CI GitHub Actions (lint, typecheck, test, build, audit prod niveau high), structure `src/domains/*`, schéma Drizzle complet + migration `drizzle/0000_*.sql` générée (non appliquée). `lint`, `typecheck`, `test`, `build` passent.
- `npm audit` : 5 alertes modérées en prod via Sentry (glob/minimatch), pas de correctif sans downgrade majeur. CI bloque à partir de `high`.
- Fait (suite) : projet Supabase `clairivo` créé (réf `snlovboelaxykxpewtxm`, eu-west-3 Paris). Migrations 0000 et 0001 (RLS sans politique sur les 14 tables) appliquées via le connecteur. Zolya mise en pause par toi pour libérer un slot. Sentry câblé (`@sentry/nextjs` 10.78.0, v11.10.0 cassée), actif seulement si DSN présent, masquage PII. Projet Vercel `clairivo` créé et relié au dépôt via la CLI. PR #6 en draft. Playwright passe en local.
- Fait (2026-11-05) : projet Sentry `clairivo` créé par toi dans l'org `nagos-xx` (région DE, équipe `nagos`; le connecteur ne peut pas créer de projet, 403). DSN, org, projet et token dans `.env.local`; build local OK avec envoi des source maps; événement de test envoyé.
- Fait (2026-11-05, suite) : connexion à la base testée, table de suivi Drizzle alignée (`drizzle-kit migrate` répond « applied »). Variables posées dans Vercel (environnement Preview seulement, secrets en sensitive) : `DATABASE_URL` via le pooler Supabase (aws-1, port 6543, IPv4), Sentry, auth, Stripe test. `vercel.json` fixe le preset Next.js.
- Fait (2026-11-05, Sentry) : DSN validé par un vrai événement (CLAIRIVO-1 reçu, alerte par défaut « high priority issues » déclenchée). Les 5 variables Sentry sont aussi dans Vercel en Production en plus de Preview (`SENTRY_AUTH_TOKEN` en sensitive), posées via la CLI car le connecteur Vercel ne voit pas le projet. Aucun déploiement lancé depuis; les déploiements existants n'ont pas ces valeurs.
- Reste : STRIPE_WEBHOOK_SECRET (phase 6), autres variables Production (au lancement, avec ton accord), token Sentry à régénérer (apparu dans une sortie de session), vérifier un événement depuis une preview redéployée, CI GitHub Actions qui ne démarre pas.

## Landing liste d'attente (2026-11-05, branche feat/landing-waitlist)
- Fait : page d'accueil (héros corail, éventail de 3 couvertures vectorielles, 3 ressources gratuites annoncées, vote d'univers, consentement non précoché), table `waitlist_signups` (migration 0002 appliquée, RLS), action serveur avec validation Zod et champ piège, pages `/mentions-legales` et `/confidentialite` (noindex, champs éditeur à renseigner). Lint, types, 6 tests unitaires, 3 E2E OK; inscription réelle vérifiée en base.
- Reste : double opt-in par e-mail (Resend, `confirmed_at` déjà prévu), limitation de débit anti-abus, mentions légales (éditeur, SIREN, adresse, e-mail), durée de conservation de 3 ans à valider, transfert Vercel (États-Unis) à vérifier, favicon et image Open Graph (attendent le logo), suppression d'une ligne de test `test-clairivo-tmp@example.com` dans `waitlist_signups` (suppression SQL refusée).

## Direction visuelle de la landing (implémentée, à valider visuellement)
- Concept « la couverture » : hero en aplat corail `#FF7048`, texte encre `#20202A` (jamais de blanc sur corail), éventail de 3 couvertures vectorielles originales (formats, pas de faux titres), sections de lecture sur ivoire `#FFF9F2`, mode sombre complet.
- Sora pour les titres, Inter pour le texte. Alignement à gauche, mise en page asymétrique.
- Formulaire : e-mail, vote pour un univers (emploi, IA, freelancing, marketing social, budget) pour alimenter la grille de la phase 1, case de consentement non précochée.
- Un seul moment animé (déploiement des couvertures), `prefers-reduced-motion` respecté. Aucun compteur, témoignage ou badge inventé. Pas de logo inventé : nom en texte simple en attendant.
- Titre provisoire : « Des guides courts pour avancer, dès 2,99 €. »

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
0. Chapitre 23 du cahier : prix de départ pas alignés sur la grille (ex. 2,49 € sous le plancher de 2,99 €). Proposition : appliquer la grille (2,49 → 2,99 ; 3,99 → 3,99 ; 4,99 → 4,99 ; 6,99 et 9,99 inchangés). À valider.
1. Logo : à fournir plus tard. Rien n'est inventé en attendant.
2. Franchise en base et OSS : comment s'articulent-elles au-delà de 10 000 € de ventes UE ? À confirmer auprès du SIE et dans le BOFiP.
3. TVA suisse sur les services électroniques : à rechercher avant d'ouvrir la Suisse.

## Points à confirmer
- Tarifs Stripe exacts de ton pays (chiffres de la roadmap = ordres de grandeur, non officiels).
- Disponibilité du nom Clairivo (INPI, EUIPO) et du domaine.
