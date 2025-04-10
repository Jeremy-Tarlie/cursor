import { test, expect } from '@playwright/test'

test.describe('Application Todo', () => {
  test.beforeEach(async ({ page }) => {
    // Nettoyer la base de données et aller à la page d'accueil
    await page.goto('/')
  })

  test('affiche le titre et le message vide initial', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Mes tâches' })).toBeVisible()
    await expect(page.getByText('Aucune tâche pour le moment')).toBeVisible()
  })

  test('ajoute une nouvelle tâche', async ({ page }) => {
    const todoContent = 'Faire les courses'
    
    // Remplir et soumettre le formulaire
    await page.getByPlaceholder('Que souhaitez-vous faire ?').fill(todoContent)
    await page.getByRole('button', { name: 'Ajouter' }).click()

    // Vérifier que la tâche apparaît
    const todoItem = page.getByText(todoContent).first()
    await expect(todoItem).toBeVisible()
    
    // Vérifier la date de création
    const dateText = page.getByText(/Créée/).first()
    await expect(dateText).toBeVisible()
    
    // Vérifier que le formulaire est vidé
    await expect(page.getByPlaceholder('Que souhaitez-vous faire ?')).toHaveValue('')
  })

  test('gère les erreurs de saisie', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Ajouter' })
    
    // Le bouton doit être désactivé si vide
    await expect(button).toBeDisabled()
    
    // Remplir avec des espaces
    await page.getByPlaceholder('Que souhaitez-vous faire ?').fill('   ')
    await expect(button).toBeDisabled()
  })

  test('permet de basculer l\'état d\'une tâche', async ({ page }) => {
    // Créer une tâche
    const todoContent = 'Tâche à cocher'
    await page.getByPlaceholder('Que souhaitez-vous faire ?').fill(todoContent)
    await page.getByRole('button', { name: 'Ajouter' }).click()

    // Attendre que la tâche soit visible
    const todoItem = page.getByText(todoContent).first()
    await expect(todoItem).toBeVisible()

    // Trouver la checkbox dans le même conteneur que le texte
    const todoContainer = todoItem.locator('xpath=ancestor::div[contains(@class, "flex")]')
    const checkbox = todoContainer.getByRole('checkbox')
    
    // Vérifier l'état initial
    await expect(checkbox).toBeVisible()
    await expect(checkbox).not.toBeChecked()

    // Cocher la tâche
    await checkbox.click()
    await expect(checkbox).toBeChecked()

    // Vérifier le style barré
    await expect(todoItem).toHaveClass(/line-through/)

    // Décocher la tâche
    await checkbox.click()
    await expect(checkbox).not.toBeChecked()
    await expect(todoItem).not.toHaveClass(/line-through/)
  })

  test('conserve l\'état après rechargement', async ({ page }) => {
    // Créer une tâche
    const todoContent = 'Tâche persistante'
    await page.getByPlaceholder('Que souhaitez-vous faire ?').fill(todoContent)
    await page.getByRole('button', { name: 'Ajouter' }).click()

    // Attendre que la tâche soit visible
    const todoItem = page.getByText(todoContent).first()
    await expect(todoItem).toBeVisible()

    // Trouver et cocher la checkbox
    const todoContainer = todoItem.locator('xpath=ancestor::div[contains(@class, "flex")]')
    const checkbox = todoContainer.getByRole('checkbox')
    await expect(checkbox).toBeVisible()
    await checkbox.click()
    await expect(checkbox).toBeChecked()

    // Recharger la page
    await page.reload()

    // Retrouver la tâche et vérifier son état
    const newTodoItem = page.getByText(todoContent).first()
    await expect(newTodoItem).toBeVisible()
    const newTodoContainer = newTodoItem.locator('xpath=ancestor::div[contains(@class, "flex")]')
    const newCheckbox = newTodoContainer.getByRole('checkbox')
    await expect(newCheckbox).toBeChecked()
    await expect(newTodoItem).toHaveClass(/line-through/)
  })
}) 