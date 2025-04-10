# Todo-Collab

Application collaborative de gestion de tâches construite avec Next.js, Prisma et SQLite.

## Technologies

- **Frontend** : Next.js 14 (App Router)
- **Backend** : Prisma avec SQLite
- **Tests** : Jest, Testing Library, Playwright

## Installation

```bash
# Installation des dépendances
npm install

# Configuration de la base de données
npx prisma migrate dev

# Lancement du serveur de développement
npm run dev
```

## Workflow de développement

1. **Cadrage** (`docs/00_cadrage.md`)
   - Définition des objectifs utilisateurs
   - Spécification des données
   - Description du comportement attendu

2. **Découpage** (`docs/01_decoupage.md`)
   - Découpage technique (backend, frontend)
   - Identification des composants
   - Planning des tâches

3. **Tests** (`docs/02_tests_spec.md`)
   - Écriture des tests unitaires
   - Écriture des tests E2E
   - Validation des scénarios

4. **Développement**
   - Implémentation backend
   - Implémentation frontend
   - Tests en continu

5. **Validation**
   - Exécution de tous les tests
   - Revue de code
   - Déploiement

## Règles de contribution

- Toute nouvelle feature doit être développée avec ses tests au préalable
- Les tests doivent passer avant le merge
- Le code doit suivre les conventions TypeScript/ESLint
- Les commits doivent être clairs et atomiques

## Scripts disponibles

- `npm run dev` : Lancement du serveur de développement
- `npm run build` : Build de production
- `npm run test` : Exécution des tests unitaires
- `npm run test:e2e` : Exécution des tests E2E
- `npm run lint` : Vérification du code

## Structure du projet

```
todo-collab/
├── docs/               # Documentation
├── src/
│   ├── app/           # Pages Next.js
│   ├── components/    # Composants React
│   └── lib/          # Utilitaires et config
├── prisma/            # Schema et migrations
└── tests/
    ├── unit/         # Tests unitaires
    └── e2e/          # Tests end-to-end
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
