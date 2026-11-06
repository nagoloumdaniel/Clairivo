# Clairivo

Boutique française de ressources numériques : guides, modèles et mini-cours de 2,99 € à 9,99 € (packs jusqu'à 14,99 €). Le projet est en cours de construction.

## Stack

Next.js (App Router), TypeScript strict, Tailwind, Motion, PostgreSQL avec Drizzle, Stripe, Sentry, Vercel.

## Installation

```bash
npm ci
cp .env.example .env.local   # puis renseigner les valeurs
npm run dev
```

Le site tourne sur http://localhost:3000. Les variables d'environnement sont listées dans `.env.example` (noms seulement, aucun secret dans le dépôt).

## Commandes

| Commande | Rôle |
|---|---|
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |
| `npm test` | Tests unitaires (Vitest) |
| `npm run test:e2e` | Tests de bout en bout (Playwright) |
| `npm run build` | Build de production |
| `npm run db:generate` | Génère une migration Drizzle depuis `src/db/schema.ts` |
| `npm run db:migrate` | Applique les migrations (nécessite `DATABASE_URL`) |

## Structure

- `src/app` : routes et pages.
- `src/domains` : code par domaine (auth, catalogue, commandes, paiement, téléchargements, admin).
- `src/db` : schéma et client Drizzle. Montants en centimes.
- `drizzle` : migrations SQL.
- `tests` : unitaires et E2E.
- `docs` : conformité et registre des droits. Le plan est dans `ROADMAP.md`.

## Licence

Propriétaire, tous droits réservés. Voir `LICENSE`.
