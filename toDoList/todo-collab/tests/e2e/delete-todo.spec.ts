import { test, expect } from '@playwright/test'

test.describe('Suppression de tâche', () => {
  test.beforeEach(async ({ page }) => {
    // Accède à la page principale
    await page.goto('/')
    
    // Crée une nouvelle tâche pour les tests
    await page.getByPlaceholder('Ajouter une nouvelle tâche...').fill('Tâche à supprimer')
    await page.keyboard.press('Enter')
    
    // Vérifie que la tâche a été créée
    await expect(page.getByText('Tâche à supprimer')).toBeVisible()
  })

  test('supprime une tâche avec succès', async ({ page }) => {
    // Survole la tâche pour faire apparaître le bouton de suppression
    await page.getByText('Tâche à supprimer').hover()
    
    // Clique sur le bouton de suppression
    await page.getByLabel('Supprimer la tâche').click()
    
    // Vérifie que la tâche a été supprimée
    await expect(page.getByText('Tâche à supprimer')).not.toBeVisible()
  })

  test('supprime une tâche avec le clavier', async ({ page }) => {
    // Focus sur le bouton de suppression
    await page.getByLabel('Supprimer la tâche').focus()
    
    // Appuie sur Entrée pour supprimer
    await page.keyboard.press('Enter')
    
    // Vérifie que la tâche a été supprimée
    await expect(page.getByText('Tâche à supprimer')).not.toBeVisible()
  })

  test('affiche le message vide quand toutes les tâches sont supprimées', async ({ page }) => {
    // Supprime la tâche
    await page.getByText('Tâche à supprimer').hover()
    await page.getByLabel('Supprimer la tâche').click()
    
    // Vérifie que le message "Aucune tâche" est affiché
    await expect(page.getByText('Aucune tâche pour le moment')).toBeVisible()
  })

  test('gère les erreurs de suppression', async ({ page }) => {
    // Simule une erreur réseau
    await page.route('**/api/todos/*', (route) => {
      route.abort()
    })
    
    // Tente de supprimer la tâche
    await page.getByText('Tâche à supprimer').hover()
    await page.getByLabel('Supprimer la tâche').click()
    
    // Vérifie que la tâche est toujours visible (échec de la suppression)
    await expect(page.getByText('Tâche à supprimer')).toBeVisible()
    
    // Vérifie qu'un message d'erreur est affiché
    await expect(page.getByText('Erreur lors de la suppression')).toBeVisible()
  })
}) 