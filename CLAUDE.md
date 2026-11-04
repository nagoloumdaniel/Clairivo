# Clairivo

Boutique française de ressources numériques (guides, modèles, mini-cours), de 2,99 € à 9,99 € (packs jusqu'à 14,99 €).

## À lire en début de session
- `CONTEXT.md` : état, décisions, questions ouvertes.
- `ROADMAP.md` : phases, skills et agents par phase, critères de sortie.
- `cahier_des_charges_clairivo.md` : spécification source.

## Règles du projet
- Stack cible : Next.js, TypeScript, Tailwind, Motion, PostgreSQL, Drizzle, Stripe, Resend, PostHog, Sentry, Vercel.
- Paiement : Stripe (cartes Visa/Mastercard, Apple Pay, Google Pay). Prix, taxes et accès décidés côté serveur. Montants en centimes. Webhooks vérifiés et idempotents.
- Direction visuelle propre à Clairivo (palette et typographie du cahier, chapitre 9). Pas de logo inventé : il est fourni par l'utilisateur.
- Contenu réel uniquement : pas de faux avis, témoignages ou compteurs.
- Branches `feat|fix|refactor|test|docs/<slug>`. Jamais de travail sur `main`. Aucun merge ni déploiement en production sans accord explicite.
