# 🧠 Compréhension & Cadrage – Feature : Suppression d'une tâche

## 🎯 Objectif
Permettre à l'utilisateur de supprimer une tâche de sa liste de tâches, pour garder la liste à jour et pertinente.

## 👤 Utilisateurs cibles
- Utilisateur connecté
- Navigue sur la page "Liste de tâches"

## 💡 Problème à résoudre
Les utilisateurs ne peuvent pas gérer efficacement leurs tâches si celles qui sont obsolètes ou erronées ne peuvent pas être supprimées.

## ✅ Critères d’acceptation
- [ ] Un bouton "Supprimer" est visible à côté de chaque tâche.
- [ ] En cliquant dessus, la tâche disparaît immédiatement de la liste.
- [ ] La tâche est effectivement supprimée en base de données (ou dans le store/local storage selon l’implémentation).
- [ ] Confirmation visuelle de la suppression (ex : animation, message toast, etc.)

## 📱 Scénario utilisateur
### Contexte :
Je suis sur la page de liste de tâches.

### Action :
J’appuie sur le bouton "supprimer" à côté d’une tâche.

### Résultat attendu :
La tâche est supprimée de ma liste de tâches.

## 🧩 Dépendances / Contraintes
- Vérifier que la suppression est persistée (backend, localStorage ou autre)
- Prévoir un comportement de fallback en cas d’erreur réseau (si applicable)
- Accessibilité : le bouton doit être accessible via clavier et screen reader

## 📐 Wireframes ou UX
- Bouton "Supprimer" sous forme d’icône 🗑️ ou texte
- Confirmation facultative ? (à décider : suppression immédiate ou avec alerte)

## 📆 Priorité & Périmètre
- Priorité : Haute
- MVP : Suppression simple sans confirmation
