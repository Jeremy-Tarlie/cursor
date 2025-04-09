# Service de Gestion des Utilisateurs

Un micro-service REST pour la gestion des utilisateurs, construit avec Next.js et Prisma.

## Fonctionnalités

- CRUD complet pour les utilisateurs
- Base de données SQLite avec Prisma
- API REST avec Next.js route handlers
- Tests unitaires et e2e
- Validation des données avec Zod

## Prérequis

- Node.js 18+
- npm ou yarn

## Installation

1. Cloner le repository
2. Installer les dépendances :
```bash
npm install
```

3. Générer le client Prisma :
```bash
npm run prisma:generate
```

4. Créer la base de données et appliquer les migrations :
```bash
npm run prisma:migrate
```

## Développement

Lancer le serveur de développement :
```bash
npm run dev
```

## Tests

Exécuter les tests unitaires :
```bash
npm test
```

Exécuter les tests e2e :
```bash
npm run test:e2e
```

## API Endpoints

- `GET /api/users` - Lister tous les utilisateurs
- `POST /api/users` - Créer un nouvel utilisateur
- `GET /api/users/[id]` - Obtenir un utilisateur spécifique
- `PUT /api/users/[id]` - Mettre à jour un utilisateur
- `DELETE /api/users/[id]` - Supprimer un utilisateur

## Structure du Projet

```
.
├── app/
│   └── api/
│       └── users/
│           ├── route.ts
│           └── [id]/
│               └── route.ts
├── prisma/
│   └── schema.prisma
├── __tests__/
│   ├── unit/
│   └── e2e/
├── jest.config.js
├── jest.e2e.config.js
├── jest.setup.js
├── package.json
└── tsconfig.json
``` 