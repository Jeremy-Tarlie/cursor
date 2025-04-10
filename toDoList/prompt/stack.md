Crée un projet nommé `todo-collab` en TypeScript avec les technologies suivantes :
- **Frontend** : Next.js (avec app router, server actions autorisées)
- **Backend/DB** : Prisma avec SQLite pour commencer
- **Tests** :
  - TU backend : Jest
  - TU frontend : Testing Library
  - E2E : Playwright

Le projet doit suivre un workflow test-first avec TU + E2E et une organisation claire :

1. Un dossier `docs/` avec :
   - `00_cadrage.md` : description de la feature “ajouter une todo” (objectifs utilisateurs, données, comportement attendu).
   - `01_decoupage.md` : découpage en sous-tâches (backend, frontend, tests).
   - `02_tests_spec.md` : plan des tests à rédiger (unitaires + E2E).

2. Un dossier `frontend/` intégré dans le projet Next.js :
   - Page principale `/` avec une liste de todos
   - Formulaire pour ajouter une todo
   - Affichage en live (polling ou WebSocket, selon simplicité)

3. Prisma :
   - Modèle `Todo` avec `id`, `content`, `done`, `createdAt`
   - Seeder de données
   - API via route `/api/todos` pour CRUD

4. Un dossier `tests/` :
   - `unit/` : TU Prisma + composants React
   - `e2e/` : scénario complet d’ajout de todo avec Playwright (remplir, valider, voir apparaître)

5. Un `README.md` qui documente :
   - Le workflow : cadrage → découpage → tests → dev → validation
   - Une règle de contribution : **toute feature doit être développée avec ses tests TU/E2E au préalable**

Structure claire et fichiers prêts à être remplis.

