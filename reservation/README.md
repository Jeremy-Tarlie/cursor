# Application de Réservation

Une application moderne de gestion de réservations construite avec Next.js, Prisma, et PostgreSQL.

## Prérequis

- Node.js 18+
- PostgreSQL
- npm ou yarn

## Installation

1. Clonez le dépôt :
```bash
git clone [url-du-repo]
cd [nom-du-projet]
```

2. Installez les dépendances :
```bash
npm install
# ou
yarn install
```

3. Configurez les variables d'environnement :
Créez un fichier `.env` à la racine du projet avec les variables suivantes :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

4. Initialisez la base de données :
```bash
npx prisma generate
npx prisma db push
```

5. Lancez l'application en mode développement :
```bash
npm run dev
# ou
yarn dev
```

## Structure du Projet

```
/src
  /app              # Pages et routes de l'application
  /components       # Composants réutilisables
  /lib             # Utilitaires et configurations
  /styles          # Styles globaux et thème
```

## Technologies Utilisées

- Next.js 14
- TypeScript
- Prisma
- PostgreSQL
- Tailwind CSS
- Zod
- bcryptjs

## Fonctionnalités

- Authentification (inscription/connexion)
- Gestion des réservations
- Interface utilisateur moderne et responsive
- Validation des données
- Protection des routes

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

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
