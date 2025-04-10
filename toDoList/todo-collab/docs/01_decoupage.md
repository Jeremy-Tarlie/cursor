# Découpage technique

## Backend (Prisma + API Routes)

1. Configuration Prisma
   - Définition du modèle `Todo`
   - Migration initiale
   - Génération du client Prisma

2. API Routes
   - POST `/api/todos` : création d'une todo
   - GET `/api/todos` : liste des todos
   - PATCH `/api/todos/[id]` : mise à jour du statut
   - DELETE `/api/todos/[id]` : suppression

## Frontend (Next.js)

1. Components
   - `TodoList` : conteneur principal
   - `TodoForm` : formulaire d'ajout
   - `TodoItem` : affichage d'une todo

2. Server Actions
   - Action de création de todo
   - Action de mise à jour
   - Action de suppression

3. Data Fetching
   - Polling toutes les 5 secondes pour la liste
   - Optimistic updates pour une meilleure UX

## Tests

1. Tests Unitaires Backend
   - Modèle Prisma
   - Routes API
   - Server Actions

2. Tests Unitaires Frontend
   - Rendu des composants
   - Interactions utilisateur
   - Validation formulaire

3. Tests E2E
   - Scénario complet d'ajout
   - Vérification mise à jour liste
   - Test des erreurs 