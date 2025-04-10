# Feature : Ajouter une todo

## Objectifs utilisateurs
- En tant qu'utilisateur, je veux pouvoir ajouter une nouvelle tâche à ma liste
- Je veux voir la tâche apparaître immédiatement dans la liste
- Je veux pouvoir voir quand la tâche a été créée

## Données
Le modèle `Todo` contient :
- `id` : identifiant unique
- `content` : contenu de la tâche (texte)
- `done` : état de la tâche (boolean)
- `createdAt` : date de création

## Comportement attendu
1. L'utilisateur accède à la page principale
2. Il voit un formulaire avec :
   - Un champ texte pour le contenu
   - Un bouton "Ajouter"
3. Après soumission :
   - La tâche est sauvegardée en base
   - La liste est mise à jour en temps réel
   - Le formulaire est vidé
4. La nouvelle tâche apparaît en haut de la liste avec :
   - Son contenu
   - Sa date de création
   - Une case à cocher (non cochée par défaut) 