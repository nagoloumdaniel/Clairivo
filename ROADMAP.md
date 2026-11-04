# Roadmap Clairivo : de l'idée à la première vente

Dernière mise à jour : 4 novembre 2026. Source : `cahier_des_charges_clairivo.md` (v1.0).

Cette roadmap suit l'ordre réel du travail. Chaque phase indique l'objectif, les tâches, les skills et agents à utiliser, et les critères de sortie. On ne passe à la phase suivante que si les critères de sortie sont remplis. Les durées sont indicatives pour une personne qui développe seule avec Claude Code.

Légende : **[Toi]** = action que seul le fondateur peut faire (identité, argent, documents officiels). **[Claude]** = travail réalisable dans le dépôt.

---

## Vue d'ensemble

| Phase | Contenu | Durée | Bloquant pour la première vente ? |
|---|---|---|---|
| 0 | Décisions, juridique, marque, domaine | 1 à 2 sem. | Oui |
| 1 | Validation du marché (landing + liste d'attente) | 1 à 2 sem. (en parallèle de 0) | Non, mais conseillée |
| 2 | Fondations techniques | 3 à 5 jours | Oui |
| 3 | Direction artistique et design system | 1 sem. | Oui |
| 4 | Catalogue, recherche, fiches produit | 1 à 1,5 sem. | Oui |
| 5 | Comptes et authentification | 3 à 4 jours | Oui |
| 6 | Paiement : cartes, Apple Pay, Google Pay | 1 à 1,5 sem. | Oui |
| 7 | Livraison numérique et bibliothèque | 4 à 5 jours | Oui |
| 8 | Facturation, TVA, e-mails transactionnels | 4 à 5 jours | Oui |
| 9 | Back-office P0 | 1 sem. | Oui |
| 10 | Production des 15 premiers produits | en parallèle dès la phase 2 | Oui |
| 11 | Légal, cookies, RGPD, pages d'erreur | 3 à 4 jours | Oui |
| 12 | SEO, performance, accessibilité | 3 à 4 jours | Oui |
| 13 | Tests, sécurité, recette complète | 1 sem. | Oui |
| 14 | Déploiement en production | 2 à 3 jours | Oui |
| 15 | Lancement et première vente | 1 à 3 sem. | C'est l'objectif |
| 16 | Après la première vente (P1 du back-office, croissance) | continu | Non |

Total réaliste jusqu'à la mise en ligne : 8 à 11 semaines. La première vente dépend ensuite surtout de l'acquisition, pas du code.

---

## Moyens de paiement : décision et architecture

### Ce que tu veux : Visa, Mastercard, Apple Pay, Google Pay

Tous les quatre passent par un seul prestataire. Recommandation : **Stripe** avec le **Payment Element** et l'**Express Checkout Element**, moyens de paiement dynamiques activés dans le Dashboard.

- Visa et Mastercard : cartes classiques, authentification 3D Secure (SCA) gérée par Stripe.
- Apple Pay : fonctionne sur Safari iOS/macOS. Il faut enregistrer le domaine de production dans Stripe (fichier de vérification servi en HTTPS). Ne marche donc pas sur localhost ni sur les URLs de preview non enregistrées.
- Google Pay : fonctionne sur Chrome/Android avec une carte enregistrée dans le compte Google. Pas d'approbation Google séparée pour une intégration web via Stripe.
- Bonus gratuits à activer : Stripe Link (paiement mémorisé en un clic). PayPal en option plus tard si la demande existe.
- Le bouton Apple Pay / Google Pay apparaît en haut de la fiche produit et du checkout (achat en un geste, sans formulaire). C'est le plus gros gain de conversion mobile.
- Aucun numéro de carte ne touche ton serveur (Clairivo reste hors du périmètre PCI le plus lourd, SAQ A).

### Grille de prix décidée (prix plancher 2,99 €)

Décision du 5 novembre 2026 : aucun produit payant sous 2,99 € TTC. Les prix du cahier ont été remontés d'un cran, avec une échelle terminée en ,99 :

| Ancien prix | Nouveau prix | Part des frais Stripe (estimation) |
|---|---|---|
| 0,99 € (fiche) | Gratuit (aimant à clients) | n/a |
| 1,49 € | 2,99 € | ~10 % |
| 1,99 € | 3,99 € | ~8 % |
| 2,99 € | 4,99 € | ~6,5 % |
| 3,99 € | 6,99 € | ~5 % |
| 4,99 € (mini-formation) | 9,99 € | ~4 % |
| Packs (jusqu'à 4,99 €) | 7,99 € à 14,99 € | ~3 à 5 % |

Les frais sont calculés avec un tarif type Stripe cartes européennes (environ 1,5 % + 0,25 €). **À vérifier sur stripe.com/pricing pour ton compte.** À cela s'ajoutent la TVA (20 % en France si tu y es assujetti), les coûts de contenu et l'acquisition.

Pourquoi ces marges : le frais fixe de 0,25 € pèse trois fois moins qu'à 0,99 €. Les packs (plafond 14,99 €) tirent le panier moyen vers le haut, et c'est là que la marge se fait. Les 5 produits gratuits restent le moteur d'acquisition. Les prix sont des hypothèses : le test de la phase 15 (premières ventes) décide s'il faut ajuster, avec `ab-testing` et un seuil fixé d'avance.

Micro-entreprise : vérifier en phase 0 sur impots.gouv.fr et le guichet OSS le régime de TVA applicable aux ventes de contenus numériques aux particuliers de l'UE (franchise en base, seuil des 10 000 € de ventes à distance dans l'UE, passage à l'OSS). Les textes officiels font référence, avec date de consultation dans `docs/conformite.md`.

### Stripe direct ou « Merchant of Record » (Paddle, Lemon Squeezy, Polar)

| | Stripe direct + Stripe Tax | Merchant of Record |
|---|---|---|
| Qui est le vendeur légal | Toi | Le prestataire |
| TVA UE / monde | Tu t'enregistres (guichet OSS en UE) et déclares | Le prestataire collecte et reverse |
| Frais indicatifs | environ 1,5 % + 0,25 € (+ frais Stripe Tax) | environ 5 % + 0,50 $ (à vérifier) |
| Sur un produit à 3,99 € | ~8 % | ~17 % ou plus |
| Contrôle de l'expérience (Apple Pay, UX) | Total | Partiel, checkout du prestataire |

Les frais fixes d'un Merchant of Record pèsent encore beaucoup sur des prix de 2,99 € à 4,99 €. **Décision : Stripe direct**, avec Stripe Tax pour le calcul de la TVA. Cela suppose une entité légale qui vend et déclare la TVA (phase 0). Sources à revalider avant décision : pages tarifs officielles de Stripe, Paddle, Lemon Squeezy, Polar (les chiffres des blogs comparatifs divergent).

### Flux de paiement cible (sécurité)

1. Le panier est envoyé au serveur (IDs de produits uniquement). Le serveur recalcule prix, remises et taxes depuis la base. Le navigateur ne décide jamais d'un montant.
2. Le serveur crée une commande `pending` et un PaymentIntent Stripe avec une clé d'idempotence.
3. Le client confirme le paiement (carte, Apple Pay, Google Pay) avec le Payment Element.
4. Stripe appelle le webhook. Le serveur vérifie la signature, déduplique l'événement (table `PaymentEvent` avec contrainte unique sur l'ID d'événement Stripe).
5. Seul le webhook vérifié passe la commande en `paid`, crée l'`Entitlement`, déclenche la facture et l'e-mail. Le retour navigateur affiche seulement un état « en cours de confirmation ».
6. Événements à gérer : `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`, `charge.dispute.created`, `charge.dispute.closed`.

---

## Phase 0 : Décisions, juridique, marque, domaine

**Objectif** : lever tout ce qui bloque le paiement et la facturation avant d'écrire du code de commerce.

**Tâches**
1. **[Toi]** Répondre aux 10 décisions du chapitre 26 du cahier (pays d'établissement, statut, modèle de distribution, pays servis, budget mensuel, etc.).
2. **[Toi]** Créer l'entité vendeuse (ex. micro-entreprise en France, ou équivalent du pays retenu). Sans entité, pas de compte Stripe live, pas de facture, pas de TVA.
3. **[Toi]** Recherche d'antériorité du nom « Clairivo » : INPI, EUIPO, réseaux sociaux. Acheter le domaine (`clairivo.com` puis `.fr`) seulement après vérification. Skill `domain-name-brainstormer` si le nom change.
4. **[Toi]** Fournir le logo (je n'en invente jamais). Je génère ensuite tous les dérivés par un script reproductible (favicons, OG image, icônes PWA, apple-touch).
5. **[Toi]** Ouvrir le compte Stripe, finir la vérification d'identité (KYC), activer Apple Pay et Google Pay dans les paramètres des moyens de paiement.
6. **[Claude]** Recherche en ligne de la conformité du pays de vente : droit de rétractation sur contenu numérique (case de renonciation expresse avant livraison immédiate), TVA services électroniques et guichet OSS, RGPD, CNIL cookies. Citer articles et dates de consultation dans `docs/conformite.md`.
7. **[Claude]** Choisir une seule licence de code (`LICENSE`), proposer des options avec recommandation.
8. **[Claude]** Registre des droits des 15 premiers produits : contenu propriétaire (modèle C du cahier) en priorité. Pas d'affiliation ni de licence tierce au lancement.

**Skills / agents** : `brainstorming`, `domain-name-brainstormer`, agent `Legal Compliance Checker` (aide à la recherche, pas un avis juridique), agent `Tax Strategist` pour cadrer la TVA, `Payments & Billing Engineer` pour valider l'architecture de paiement.

**Sortie** : entité créée, Stripe live en attente d'activation, domaine acheté, logo reçu, `docs/conformite.md` rédigé, décisions 1 à 10 notées dans `CONTEXT.md`.

---

## Phase 1 : Validation du marché (en parallèle de la phase 0)

**Objectif** : vérifier qu'il y a de la demande avant de produire 25 contenus.

**Tâches**
1. **[Claude]** Fiche de recherche et grille de notation (cahier 22.2 et 22.3) pour les 5 univers : IA, emploi, freelancing, marketing social, budget/organisation. Données réelles seulement (Google Trends, suggestions, avis concurrents). Sources citées.
2. **[Claude]** Landing page d'attente d'une page : promesse, 3 ressources gratuites annoncées, inscription e-mail avec consentement séparé, aucune fausse disponibilité ni faux compteur.
3. **[Toi]** 10 à 20 entretiens courts avec des cibles (étudiants, freelances).
4. **[Toi]** Poster 5 à 10 contenus sur TikTok / LinkedIn / Instagram, mesurer clics et inscriptions.

**Skills / agents** : `customer-research`, `competitor-profiling`, `marketing-psychology`, `seo-audit`, `copywriting`, `cro`, `lead-magnets`, `free-tools`, `signup`, agent `UX Researcher`.

**Sortie** : rapport `docs/validation-marche.md` avec les 3 thèmes prioritaires et les premières offres. Seuil de décision défini avant de mesurer (ex. X inscriptions pour Y visites).

---

## Phase 2 : Fondations techniques

**Objectif** : socle propre, déployable, testable dès le premier jour.

**Tâches**
1. Branche `feat/foundations`. Dépôt GitHub : description, topics, README initial, modèles d'issues/PR.
2. Next.js (App Router) + TypeScript strict + Tailwind. Structure par domaine (auth, catalogue, commandes, paiement, téléchargements, admin) et non par type de fichier.
3. Base : **PostgreSQL** (Neon ou Supabase, choix à valider selon le coût et la région UE). ORM : **Drizzle** (recommandation, un seul ORM pour tout le projet). Montants en centimes (entiers), devise sur chaque commande.
4. Schéma initial des chapitres 12 et 30.2 : `User`, `Product`, `ProductVersion`, `ProductFile`, `Category`, `Series`, `Order`, `OrderItem` (photographie du prix), `Payment`, `PaymentEvent`, `Entitlement`, `Invoice`, `Refund`, `AuditLog`, etc. Contraintes d'unicité, clés étrangères, index. Migrations testées sur une base de test.
5. Variables d'environnement documentées (`.env.example`, noms seulement). Aucun secret dans le dépôt.
6. CI GitHub Actions : lint, typecheck, tests unitaires, build, `npm audit`.
7. Tests : Vitest (unitaire/intégration), Playwright (E2E).
8. Sentry branché dès maintenant (erreurs front et serveur, masquage des données personnelles).
9. `CONTEXT.md` et `CLAUDE.md` projet à jour.

**Skills / agents** : `using-git-worktrees`, `writing-plans`, `executing-plans`, `react-best-practices`, `composition-patterns`, `lean-build`, `test-driven-development`, agents `Software Architect`, `Backend Architect`, `Database Optimizer`, `DevOps Automator`.

**Sortie** : `npm run build` et la CI passent, migrations appliquées sur la base de test, page d'accueil vide déployée en preview.

---

## Phase 3 : Direction artistique et design system

**Objectif** : une identité propre à Clairivo, pas un template.

**Tâches**
1. Recherche d'inspiration réelle avant de dessiner (Awwwards, Mobbin, Dribbble, boutiques de produits numériques) avec sources citées. Rester éditorial, coloré, premium (cahier chapitre 9).
2. Tokens : palette du cahier (`#FFF9F2`, `#FF7048`, `#7657E8`, `#FFD45A`, `#75D7B0`, `#F58DB7`, `#20202A`, `#686575`, `#E9E4E0`), couleurs sémantiques, échelle d'espacement unique, rayons, ombres, mode clair et sombre complet. Contraste WCAG 2.2 AA vérifié pour chaque couple.
3. Typographie : titres Plus Jakarta Sans ou Sora, texte Inter (décision du 5 novembre 2026, conforme au cahier). Éviter l'effet « défaut » par un vrai travail de hiérarchie, d'espacement et de graisses, validé avec `anti-vibecode`.
4. Composants : bouton, champ, carte produit, badge honnête, barre de progression de série, modale, tiroir mobile, skeleton, toast, états vide/erreur/chargement.
5. Illustrations vectorielles originales par catégorie (à partir de ta direction, pas de banque d'images mélangée). Icônes animées avec intention.
6. Mouvement : Motion (Framer Motion) pour hero, cartes, filtres, succès de paiement, favoris. `prefers-reduced-motion` respecté. Durées courtes.
7. Maquettes Figma des écrans clés : accueil, catalogue, fiche produit, checkout, bibliothèque, admin.

**Skills à invoquer** (ordre) : `anti-vibecode`, `impeccable`, `frontend-design`, `taste-skill`, `bencium-innovative-ux-designer`, `emil-design-eng`, `apple-design`, `motion-design`, `motion-doctrine`, `animation-vocabulary`, `find-animation-opportunities` puis `improve-animations`, `brand-guidelines`, `theme-factory`, `web-design-guidelines`, `figma-implement-design`, `better` en fin d'écran. Agents `UI Designer`, `UX Architect`, `Brand Guardian`, `ui-ux-checker`, `UI Finish-Gate Reviewer`.

**Sortie** : Storybook ou page `/design` avec tous les composants, mode sombre vérifié, aucun des 43 signes « look IA » (liste `ui-anti-ia.md`).

---

## Phase 4 : Catalogue, recherche, fiches produit, séries

**Objectif** : trouver et comprendre un produit en quelques secondes.

**Tâches**
1. Pages : accueil, catalogue, catégorie, fiche produit, série, à propos, comment on sélectionne les ressources, FAQ, contact.
2. Fiche produit complète (cahier 8.1) : problème traité, résultat attendu, public, niveau, durée, format, sommaire, aperçu, auteur, date de mise à jour, prix TTC, ce qui est gratuit et payant dans la série, remboursement applicable.
3. Recherche : PostgreSQL full-text (`tsvector`) avec synonymes et tolérance aux fautes (`pg_trgm`). Pas de moteur externe au départ.
4. Filtres combinables (thème, format, niveau, prix, durée), tri, pagination serveur, état vide utile.
5. Séries : progression visuelle, épisode gratuit, prix du pack avec déduction de ce qui est déjà acheté (règle 11 du cahier).
6. Mode découverte sans compte : on voit contenu et prix avant toute inscription.
7. Aucun badge « populaire » sans donnée réelle. Aucun faux avis.

**Skills / agents** : `frontend-design`, `composition-patterns`, `react-best-practices`, `site-architecture`, `copywriting`, `copy-editing`, `cro`, `onboarding`, `pricing`, `offers`, `schema`. Agents `Frontend Developer`, `ui-ux-checker`.

**Sortie** : parcours accueil → catégorie → fiche fonctionnel sur 320 px à 1440 px, tests E2E des filtres, aucune erreur console.

---

## Phase 5 : Comptes et authentification

**Tâches**
1. Better Auth (ou solution équivalente éprouvée) : e-mail + mot de passe, Google OAuth, vérification d'e-mail, mot de passe oublié, déconnexion de tous les appareils, suppression de compte.
2. Sessions en cookies HTTP-only, SameSite, Secure. Limitation de débit sur connexion et réinitialisation. Hachage Argon2id.
3. Rôles et permissions (propriétaire, admin, etc.) vérifiés côté serveur. MFA obligatoire pour les administrateurs.
4. Achat invité possible ? Recommandation : compte léger créé automatiquement à l'achat avec lien magique par e-mail, pour réduire la friction (à valider).
5. Consentement marketing séparé, case non précochée.

**Skills / agents** : `signup`, `security-audit`, `security-review`, `test-driven-development`, agents `Senior SecOps Engineer`, `security-auditor`, `qa-e2e`.

**Sortie** : cases 20.1 du cahier cochées avec preuves, test d'accès direct à l'API admin refusé pour un utilisateur normal.

---

## Phase 6 : Paiement (Visa, Mastercard, Apple Pay, Google Pay)

**Objectif** : encaisser de façon fiable, sans double commande, sans accès gratuit par erreur.

**Tâches**
1. Panier côté serveur + achat direct « Acheter maintenant » depuis la fiche.
2. Intégration Stripe en mode test : PaymentIntent, Payment Element, Express Checkout Element (Apple Pay et Google Pay en tête de page), moyens de paiement dynamiques.
3. Enregistrement du domaine pour Apple Pay (fichier `apple-developer-merchantid-domain-association` servi en HTTPS sur le domaine de production et sur un sous-domaine de staging avec HTTPS).
4. Case de consentement légal pour contenu numérique livré immédiatement (renonciation au droit de rétractation), horodatée et stockée avec la commande. Texte validé avec les sources officielles de la phase 0.
5. Prix, remises et taxes recalculés côté serveur. Stripe Tax pour la TVA, jamais de taux codé en dur.
6. Webhook : vérification de signature, table de déduplication des événements, traitement idempotent, file de reprise en cas d'échec.
7. Prévention des doubles achats (déjà possédé), clé d'idempotence par tentative.
8. Page de succès animée, page d'échec avec reprise du paiement, état « confirmation en cours » tant que le webhook n'est pas arrivé.
9. Remboursement total et partiel depuis l'admin, avec motif, traçabilité et révocation d'accès selon la politique annoncée.
10. Codes promo (pourcentage ou montant fixe, limites, dates) validés côté serveur.
11. Radar (antifraude Stripe) activé, règles de base.
12. Tests : cartes de test Stripe (succès, refus, 3DS requis, 3DS échoué), webhook rejoué deux fois, webhook avec mauvaise signature, montant falsifié côté client, double clic.
13. Tests manuels réels : iPhone Safari avec Apple Pay, Android Chrome avec Google Pay, carte Visa, carte Mastercard, en mode test puis un paiement réel de faible montant en production (voir phase 14).

**Skills / agents** : `test-driven-development`, `systematic-debugging`, `security-audit`, `cro`, `paywalls`, `pricing`, `popups` (pour éviter ses pièges), agents `Payments & Billing Engineer` (revue de l'architecture), `API Tester`, `security-auditor`, `qa-e2e`, `Reality Checker` avant de déclarer le paiement prêt.

**Sortie** : cases 20.3 cochées, rapport de tests avec les scénarios ci-dessus, Apple Pay et Google Pay visibles sur appareils compatibles en staging HTTPS.

---

## Phase 7 : Livraison numérique et bibliothèque

**Tâches**
1. Stockage privé (bucket S3 compatible ou Supabase Storage privé). Aucun fichier payant en URL publique.
2. Téléchargement via route serveur : vérification de l'`Entitlement` à chaque requête, puis URL signée courte durée (quelques minutes). Journal `DownloadEvent`. Limite raisonnable contre le partage.
3. Versionnage des fichiers : remplacer un fichier sans perdre l'achat.
4. Bibliothèque personnelle : achats, téléchargements, favoris, séries en cours, « Continuer mon parcours ».
5. Lecture PDF mobile soignée (aperçu intégré si possible).
6. Scan des fichiers à l'import (taille, type MIME réel, antivirus si disponible).
7. Les produits gratuits suivent la règle d'accès choisie (compte requis ou non). Recommandation : aperçu sans compte, téléchargement après compte, pour construire la liste e-mail avec consentement.

**Skills / agents** : `security-audit`, `test-driven-development`, `onboarding`, agents `Backend Architect`, `security-auditor`, `qa-e2e`.

**Sortie** : cases 20.4 cochées, test d'IDOR (utilisateur A ne peut pas lire le fichier de l'utilisateur B), lien expiré refusé.

---

## Phase 8 : Facturation, TVA, e-mails transactionnels

**Tâches**
1. Facture PDF générée après paiement confirmé : numérotation unique et continue, mentions obligatoires du pays vendeur, ventilation HT/TVA/TTC, lien depuis la bibliothèque. Avoir lié à la facture pour tout remboursement. Une facture émise ne se modifie jamais.
2. Configuration TVA validée en phase 0 (OSS si ventes B2C UE, seuils, lieu du client). Stripe Tax en calcul, tes déclarations restent à ta charge ou celle de ton comptable.
3. E-mails (Resend ou équivalent) : confirmation de commande, lien de téléchargement, facture, remboursement, vérification de compte, mot de passe oublié. Domaine d'envoi authentifié (SPF, DKIM, DMARC). Séparation stricte transactionnel / marketing.
4. Journal `EmailLog`, échecs d'envoi remontés dans l'admin.
5. Export comptable CSV (ventes, TVA, frais Stripe, remboursements) et rapprochement avec les versements Stripe.
6. Rendu des e-mails testé (Gmail, Apple Mail, Outlook, mode sombre).

**Skills / agents** : `emails`, `copywriting`, `copy-editing`, `markdown-to-pdf` (ou moteur HTML vers PDF), agents `Payments & Billing Engineer`, `Bookkeeper & Controller`, `Email Marketing Strategist`, `PDF Engine Architect`.

**Sortie** : un achat de test produit une commande, une facture PDF, un e-mail et un accès, une seule fois, même avec webhook rejoué.

---

## Phase 9 : Back-office P0

**Objectif** : pouvoir vendre et gérer les clients, rien de plus (cahier chapitre 33, priorité P0).

**Tâches**
1. Route `/admin` protégée côté serveur, MFA, rôles de base.
2. Produits : créer, modifier, dupliquer, prévisualiser, publier, programmer, archiver, versions de fichiers, licence et source (`LicenseRecord`), prix sans effet rétroactif.
3. Catégories, séries, packs.
4. Commandes : recherche, filtres, fiche détaillée, renvoi d'e-mail et de lien, remboursement, notes internes. Pas de suppression physique d'une commande payée.
5. Utilisateurs : consultation, suspension, demandes RGPD.
6. Paiements : liste des transactions, lien vers Stripe.
7. Journal d'activité des actions sensibles (prix, remboursement, export, rôle).
8. Tableau de bord minimal : chiffre d'affaires, commandes, paiements échoués (données réelles, définition du calcul affichée).
9. Responsive : tiroir mobile, listes en cartes sur petit écran.

**Skills / agents** : `bencium-controlled-ux-designer`, `composition-patterns`, `dataviz`, `data:build-dashboard`, `security-audit`, agents `Frontend Developer`, `Backend Architect`, `security-auditor`, `ui-ux-checker`.

**Sortie** : cases 32 du cahier (celles de P0) cochées, test d'accès non autorisé sur chaque route admin.

---

## Phase 10 : Production des 15 premiers produits (démarre dès la phase 2)

**Objectif** : un catalogue de lancement petit mais solide. Cible : 15 produits, 5 gratuits, 3 séries, 3 packs, 5 catégories (cahier chapitre 23).

**Tâches**
1. Pipeline éditorial du chapitre 22 : problème, recherche, vérification des droits, rédaction, relecture, vérification factuelle, mise en page, test avec 2 ou 3 lecteurs, publication.
2. Liste de départ (cahier 23) : checklist CV, modèle CV ATS, pack candidatures, guide entretien, comprendre l'IA générative, pack prompts, workflows IA, planner budget, tableur budget avancé, checklist freelance, offre de service, premiers clients, calendrier social, modèles de posts, portfolio.
3. Chaque produit : couverture originale, aperçu gratuit, sommaire, fiche de contrôle éditorial (auteur, source, droit, date de vérification, limites).
4. Contenus financiers, juridiques ou santé : prudents, datés, sourcés sur des sites officiels, sans promesse de gain.
5. Humaniser les textes : pas de formules d'IA, pas de tirets cadratins en série, pas de jargon creux.
6. Un produit « vitrine » de très haute qualité vaut mieux que quinze moyens. Soigner d'abord les 3 qui vont servir à l'acquisition.

**Skills / agents** : `content-research-writer`, `copywriting`, `copy-editing`, `content-strategy`, `canvas-design`, `anthropic-skills:pdf`, `anthropic-skills:docx`, `anthropic-skills:xlsx`, agents `Content Creator`, `Research Synthesist`, `Brand Guardian`. Relecture humaine obligatoire : **[Toi]**.

**Sortie** : 15 produits `ready` avec fiche de droits complète, aucun contenu sans preuve de droit.

---

## Phase 11 : Légal, cookies, RGPD, pages d'erreur

**Tâches**
1. Pages complètes et réelles : mentions légales, CGV, politique de confidentialité, politique cookies (liste réelle des traceurs), remboursement et rétractation, accessibilité. **[Toi]** : raison sociale, adresse, numéro d'immatriculation, hébergeur, médiateur de la consommation.
2. Bandeau de consentement : accepter, refuser, personnaliser (aussi simple à refuser qu'à accepter), aucun traceur non essentiel avant accord, choix modifiable, preuve conservée (`ConsentRecord`).
3. Analytics respectueux (PostHog configuré avec consentement ou mode sans cookie). Aucune donnée personnelle dans les événements.
4. Registre des traitements, durées de conservation, procédure d'export et d'effacement, liste des sous-traitants (Stripe, hébergeur, e-mail, analytics).
5. Pages d'erreur 404, 500, 401, 403, 429, maintenance, hors-ligne, avec le design du projet et un chemin de sortie.
6. Veille légale datée dans `docs/conformite.md` (nouvelles lois, échéances).
7. Aucune promesse non tenable : pas de faux compte à rebours, de fausse rareté, de faux avis.

**Skills / agents** : `copywriting`, `copy-editing`, `security-review`, agents `Legal Compliance Checker`, `Senior SecOps Engineer`.

**Sortie** : pages en ligne, bandeau testé (aucun cookie non essentiel avant accord, vérifié dans l'onglet réseau), liens du footer tous vivants.

---

## Phase 12 : SEO, performance, accessibilité

**Tâches**
1. SEO technique : title/meta uniques, H1 à Hn, canonical, `robots.txt`, `sitemap.xml` automatique, JSON-LD (`Product`, `Offer`, `Organization`, `BreadcrumbList`, `FAQPage` seulement si visible), OG image par page, favicon, textes alternatifs. `noindex` sur panier, compte, admin, pages de résultats de recherche.
2. Contenu indexable dans le HTML rendu (SSR/SSG pour accueil, catégories, fiches, guides). Pas de centaines de pages générées automatiquement.
3. Quelques vrais articles-guides liés aux produits (intention de recherche réelle) pour le long terme.
4. Core Web Vitals (p75) : LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1. Images AVIF/WebP, polices optimisées, JS limité, aucune animation lourde au premier rendu. Mesurer en labo et sur le terrain une fois en production.
5. Accessibilité WCAG 2.2 AA : clavier, focus visible, labels, contrastes, titres, reduced-motion, cibles tactiles. L'automatique (axe) est un point de départ, pas une preuve : parcours manuel clavier et lecteur d'écran sur l'achat.
6. Sécurité web : en-têtes (CSP, HSTS, etc.), Cloudflare (WAF, DDoS), Turnstile sur inscription et contact.

**Skills / agents** : `seo-audit`, `schema`, `site-architecture`, `ai-seo`, `programmatic-seo` (à éviter ici, seulement pour garder la ligne), `web-perf`, `web-design-guidelines`, `better`, `cloudflare`, `turnstile-spin`, `design:accessibility-review`, agents `seo-auditor`, `SEO Specialist`, `Performance Benchmarker`, `ui-ux-checker`.

**Sortie** : audit SEO propre, Lighthouse mobile ≥ 90 en performance et accessibilité sur accueil, catalogue, fiche et checkout, rapport d'accessibilité.

---

## Phase 13 : Tests, sécurité, recette complète

**Tâches**
1. Suite de régression complète (unitaires, intégration, E2E Playwright) : inscription, recherche, achat gratuit, achat payant, échec de paiement, remboursement, téléchargement, suppression de compte.
2. Responsive : 320, 375, 768, 1024, 1280, 1440 px, navigation tactile, paiement mobile, aucun débordement horizontal.
3. Revue sécurité consolidée (OWASP ASVS niveau adapté) : authentification, IDOR, CSRF, XSS, injection, SSRF, uploads, secrets, headers, rate limiting, abus de règles métier (réutilisation de codes promo, remboursement supérieur au payé). Tests actifs uniquement sur environnement de test, jamais en production.
4. `npm audit`, vérification des dépendances, aucun secret dans l'historique git.
5. Test de restauration de sauvegarde réel (pas seulement la sauvegarde).
6. Test de charge ciblé sur catalogue et checkout (outil k6 ou équivalent, sur staging).
7. Recette des chapitres 20 et 32 du cahier : chaque case cochée avec preuve.
8. Évaluation finale par un agent indépendant qui part du principe « NEEDS WORK » tant que les preuves manquent.

**Skills / agents** : `verification-before-completion`, `verify-and-stop`, `requesting-code-review`, `receiving-code-review`, `code-review`, `security-review`, `webapp-testing`, `audit-test`, `engineering:testing-strategy`, `engineering:deploy-checklist`, agents `qa-e2e`, `Test Automation Engineer`, `security-auditor`, `reviewer`, `Evidence Collector`, `Reality Checker`.

**Sortie** : rapport de recette signé avec preuves, zéro bug bloquant sur le parcours d'achat, PR vers `main` prête (jamais mergée sans ton accord explicite).

---

## Phase 14 : Déploiement en production

**Tâches**
1. Hébergement Next.js (Vercel recommandé), base PostgreSQL en région UE, stockage privé UE, variables d'environnement de production (noms documentés, valeurs jamais en clair dans le dépôt).
2. Domaine, HTTPS, DNS, redirections `www`, SPF/DKIM/DMARC.
3. Stripe : passage en mode live, clés live, webhook live avec secret propre, enregistrement du domaine de production pour Apple Pay, vérification de Google Pay, Radar actif.
4. Sauvegardes automatiques de la base et du stockage, alertes de sauvegarde en échec, surveillance de disponibilité, Sentry en production.
5. Déploiement progressif : d'abord accès restreint (liste blanche ou mot de passe), puis ouverture.
6. **Test de paiement réel de bout en bout** avec ta propre carte, produit à bas prix : paiement, e-mail, facture, téléchargement, puis remboursement. Refaire avec Apple Pay sur iPhone et Google Pay sur Android. Vérifier la ligne dans Stripe, dans l'admin, dans la compta.
7. Procédure d'incident et de retour arrière documentée.
8. **Aucun déploiement en production sans ton accord explicite.**

**Skills / agents** : `engineering:deploy-checklist`, `engineering:incident-response`, `cloudflare`, `web-perf`, agents `DevOps Automator`, `Database Reliability Engineer`, `Infrastructure Maintainer`, outils MCP Vercel / Supabase ou Neon pour inspecter l'état (lecture d'abord).

**Sortie** : site en ligne, un achat réel remboursé avec succès, monitoring actif, sauvegarde restaurée une fois avec succès.

---

## Phase 15 : Lancement et première vente

**Objectif** : une vente réelle d'un inconnu.

**Étapes concrètes**
1. **Cercle proche (J0 à J7)** : 20 à 30 personnes de ta cible reçoivent le lien et un code de lancement authentique et limité. Demander des retours sur le parcours, pas des achats de complaisance. Corriger tout ce qui bloque.
2. **Liste d'attente (J1)** : e-mail à ceux qui se sont inscrits en phase 1 : les produits gratuits d'abord, puis l'offre payante.
3. **Contenu organique (J1 à J21)** : 3 posts par semaine sur les 2 canaux les plus prometteurs de la phase 1. Chaque post renvoie vers une ressource gratuite précise, pas vers l'accueil. Formats du cahier 10.4 : « 3 erreurs à éviter », méthode en 5 étapes, démo de template.
4. **Communautés** : participation utile (Reddit, groupes LinkedIn, Discord étudiants), sans spam, en respectant les règles de chaque espace.
5. **Mesure** : événements du cahier 18.2 branchés, tableau d'entonnoir : visite, fiche, panier, paiement, achat. Chercher où les gens s'arrêtent.
6. **Première vente** : repérer la commande, vérifier de bout en bout (paiement, facture, e-mail, téléchargement). Envoyer un message personnel de remerciement avec demande d'avis vérifié.
7. **Rétrospective** : qu'est-ce qui a déclenché l'achat, quelle page, quelle source, quel produit.

**Skills / agents** : `launch`, `social`, `content-strategy`, `lead-magnets`, `emails`, `community-marketing`, `directory-submissions`, `product-marketing`, `marketing-plan`, `attribution`, `analytics`, `public-relations`, `captions-overlay` et `video` (courtes vidéos de démo), agents `Growth Hacker`, `TikTok Strategist`, `LinkedIn Content Creator`, `Instagram Curator`, `Reddit Community Builder`, `Analytics Reporter`.

**Sortie** : première vente réelle encaissée, factures et compta cohérentes, rétrospective écrite.

---

## Phase 16 : Après la première vente

Dans cet ordre, selon les chiffres réels :
1. **P1 du back-office** : dashboard KPI complet, paniers abandonnés, coupons avancés, exports, support par tickets.
2. Favoris, progression de séries, recommandations simples, avis vérifiés, newsletter.
3. Tests A/B avec seuil de décision fixé d'avance (`ab-testing`, `cro`).
4. Relance de panier uniquement si la base légale le permet.
5. Parrainage seulement quand la marge le permet.
6. Moyens de paiement locaux (selon pays cibles : mobile money en Afrique francophone via un prestataire local, SEPA, PayPal), après mesure de la demande.
7. Affiliation clairement signalée, puis espace créateur seulement si la demande est prouvée (cahier 26 : pas de marketplace ouverte au début).
8. Abonnement facultatif seulement si un usage récurrent est démontré.

---

## Règles de travail sur tout le projet

- Aucun développement sur `main`. Une branche par phase : `feat|fix|refactor|test|docs/<slug>`. PR par phase avec tests, résultats, captures et limites. **Aucun merge sans ton accord explicite.**
- Tâche non triviale : sous-agents (exploration, plan, implémentation, `reviewer`, `security-auditor`, `qa-e2e`, `seo-auditor`, `ui-ux-checker`).
- Après chaque tâche : tests adaptés, revue sécurité ciblée, E2E des parcours touchés, preuves avant de dire « terminé ».
- Montants en centimes, prix et droits décidés par le serveur, webhooks idempotents, aucune donnée de carte chez Clairivo.
- `CONTEXT.md`, README et docs mis à jour à chaque avancement notable.
- Contenu réel uniquement : pas de faux avis, faux compteurs, faux témoignages.

## Questions ouvertes

Voir `CONTEXT.md`. Décisions du 5 novembre 2026 : micro-entreprise en France, Stripe direct, prix plancher 2,99 €, compte créé à l'achat par lien magique, Inter pour le texte, logo fourni plus tard, pays servis : Europe francophone (France, Belgique, Suisse, Luxembourg).
