# Workspace de Test et Développement

Ce repository contient plusieurs projets de test et de développement. Voici un aperçu de la structure et des différents projets :

## Structure du Repository

```
.
├── cursorTest/     # Système d'authentification et réservations
├── generate_img/   # Générateur d'images
├── other_test/    # Application CRUD
├── testCursor/    # Outil de traduction
└── toDoList/    # Gestion de tache
```

## Description des Projets

### 🔐 cursorTest
Application de gestion d'authentification (connexion/inscription) avec redirection vers un système de réservations. Permet aux utilisateurs de :
- Créer un compte
- Se connecter
- Accéder à l'interface de réservation

### 🖼️ generate_img
Application de génération d'images automatisée. Ce projet permet de créer des images à partir de différents paramètres et configurations.

### 📝 other_test
Application CRUD (Create, Read, Update, Delete) développée avec Next.js. Permet de :
- Créer des entrées
- Lire les données
- Mettre à jour les informations
- Supprimer des éléments

### 🌐 testCursor
Application de traduction permettant de convertir du texte entre différentes langues.

### 📝 toDoList
Application de gestion de tâches permettant de :
- Ajouter des tâches
- Marquer les tâches comme terminées
- Supprimer des tâches
- Organiser les tâches par priorité ou catégorie

## Configuration

Le repository utilise un fichier `.gitignore` configuré pour ignorer :
- Les dépendances (`node_modules`)
- Les fichiers de build et de production
- Les fichiers d'environnement (`.env`)
- Les fichiers de logs
- Les fichiers système
- Les fichiers d'IDE et d'éditeurs
- Les dossiers de cache

## Technologies Utilisées

- **cursorTest**: Authentification et gestion des réservations
- **generate_img**: Génération d'images, jest
- **other_test**: Next.js, CRUD operations, jest
- **testCursor**: Services de traduction
- **toDoList**: Next.js, playwright, jest

## Contribution

Pour contribuer à l'un de ces projets :
1. Clonez le repository
2. Créez une nouvelle branche pour vos modifications
3. Soumettez une pull request avec vos changements

## Note

Ces projets sont principalement utilisés pour des tests et du développement expérimental. La documentation spécifique à chaque projet peut être trouvée dans leurs dossiers respectifs. 