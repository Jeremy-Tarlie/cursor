# Spécification des tests

## Tests Unitaires Backend

### Modèle Todo
```typescript
describe('Todo Model', () => {
  it('crée une todo avec les champs requis')
  it('valide le format de la date de création')
  it('empêche la création sans contenu')
})
```

### API Routes
```typescript
describe('API /api/todos', () => {
  describe('GET', () => {
    it('retourne la liste des todos')
    it('trie par date de création décroissante')
  })
  
  describe('POST', () => {
    it('crée une nouvelle todo')
    it('retourne une erreur si contenu manquant')
  })
  
  describe('PATCH /:id', () => {
    it('met à jour le statut done')
    it('retourne 404 si id invalide')
  })
})
```

## Tests Unitaires Frontend

### TodoForm
```typescript
describe('TodoForm', () => {
  it('affiche le champ de saisie et le bouton')
  it('appelle onSubmit avec le contenu')
  it('vide le champ après soumission')
  it('désactive le bouton si champ vide')
})
```

### TodoList
```typescript
describe('TodoList', () => {
  it('affiche la liste des todos')
  it('affiche un message si liste vide')
  it('met à jour après ajout')
})
```

### TodoItem
```typescript
describe('TodoItem', () => {
  it('affiche le contenu et la date')
  it('permet de cocher/décocher')
  it('formate la date correctement')
})
```

## Tests E2E

### Scénario principal
```typescript
test('ajoute une nouvelle todo', async ({ page }) => {
  // 1. Visite page principale
  // 2. Remplit le formulaire
  // 3. Soumet
  // 4. Vérifie apparition dans la liste
  // 5. Vérifie mise à jour en temps réel
})
```

### Gestion erreurs
```typescript
test('gère les erreurs de saisie', async ({ page }) => {
  // 1. Teste soumission vide
  // 2. Teste caractères spéciaux
  // 3. Vérifie messages d'erreur
})
``` 